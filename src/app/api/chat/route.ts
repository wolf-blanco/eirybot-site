
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import { systemPrompt } from '@/lib/ai/prompt';
import { getContext } from '@/lib/ai/context';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, doc, setDoc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    console.log("POST /api/chat called - v3 (Persistence + RateLimit)");
    try {
        // --- Rate Limiting Start ---
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const limitRef = doc(db, 'rate_limits', ip);
        const limitSnap = await getDoc(limitRef);
        const now = Timestamp.now();

        if (limitSnap.exists()) {
            const data = limitSnap.data();
            const blockedUntil = data.blockedUntil;

            // 1. Check if user is currently blocked
            if (blockedUntil && now.toMillis() < blockedUntil.toMillis()) {
                const waitMinutes = Math.ceil((blockedUntil.toMillis() - now.toMillis()) / 60000);
                return new Response(JSON.stringify({
                    error: "Too Many Requests",
                    details: `You are blocked for ${waitMinutes} more minutes.`
                }), { status: 429 });
            }

            // 2. Check window
            const windowStart = data.windowStart;
            const timeSinceWindow = now.toMillis() - windowStart.toMillis();

            if (timeSinceWindow > 60000) {
                // Window expired (> 1 min), reset count
                await setDoc(limitRef, {
                    count: 1,
                    windowStart: now,
                    blockedUntil: null
                }, { merge: true });
            } else {
                // Within window, increment count
                const newCount = (data.count || 0) + 1;

                if (newCount > 10) {
                    // Rule: > 10 msgs in 1 min -> Block for 1 hour
                    const blockUntil = new Timestamp(now.seconds + 3600, 0); // +1 hour

                    await setDoc(limitRef, {
                        count: newCount,
                        blockedUntil: blockUntil
                    }, { merge: true });

                    return new Response(JSON.stringify({
                        error: "Too Many Requests",
                        details: "Rate limit exceeded. Blocked for 1 hour."
                    }), { status: 429 });
                } else {
                    // Increment safely
                    await setDoc(limitRef, { count: newCount }, { merge: true });
                }
            }
        } else {
            // First time seeing this IP
            await setDoc(limitRef, {
                count: 1,
                windowStart: now,
                blockedUntil: null,
                createdAt: serverTimestamp()
            });
        }
        // --- Rate Limiting End ---

        // Extract chatId from URL query params, body, or headers
        const { searchParams } = new URL(req.url);

        const bodyRef = await req.clone();
        const jsonBody = await bodyRef.json();

        let chatId = searchParams.get('chatId') || req.headers.get('x-chat-id') || jsonBody.chatId;

        const { messages, chatId: bodyChatId } = await req.json();

        if (!chatId && bodyChatId) {
            chatId = bodyChatId;
        }

        console.log("Received messages:", messages.length, "ChatID:", chatId);

        // Required: chatId must be present to save history
        if (!chatId) {
            console.warn("No chatId provided - session will be ephemeral");
        }

        // Convert to CoreMessages
        const coreMessages = await convertToModelMessages(messages);
        const lastMessage = coreMessages[coreMessages.length - 1];

        let lastUserContent = "";
        if (typeof lastMessage.content === 'string') {
            lastUserContent = lastMessage.content;
        } else if (Array.isArray(lastMessage.content)) {
            lastUserContent = lastMessage.content
                .filter(part => part.type === 'text')
                .map(part => (part as any).text)
                .join('\n');
        }

        // 1. Save User Message to Firestore
        if (chatId && lastUserContent) {
            console.log("Attempting to save user message. Project:", db.app.options.projectId, "ChatID:", chatId);

            // Capture Metadata (IP, Location, Device) - Passive
            const userAgent = req.headers.get('user-agent') || 'unknown';
            const country = req.headers.get('x-vercel-ip-country') || 'unknown';
            const city = req.headers.get('x-vercel-ip-city') || 'unknown';

            // Extract Client-Side Metadata from Body (if available)
            const clientMeta = jsonBody.metadata || {};

            // Save metadata asynchronously (fire and forget)
            setDoc(doc(db, 'eirybot-IA', chatId), {
                metadata: {
                    ip,
                    userAgent,
                    location: { country, city },
                    client: clientMeta,
                },
                updatedAt: serverTimestamp()
            }, { merge: true }).catch(e => console.error("Error saving metadata:", e));

            await addDoc(collection(db, 'eirybot-IA', chatId, 'messages'), {
                role: 'user',
                content: lastUserContent,
                createdAt: serverTimestamp()
            })
                .then(() => console.log("User message saved."))
                .catch(e => console.error("Error saving user message:", e));
        }

        const context = await getContext(lastUserContent);

        const dynamicSystemPrompt = `
${systemPrompt}

## Relevant Context from Website:
${context}
`;

        const result = streamText({
            model: openai('gpt-4o'),
            system: dynamicSystemPrompt,
            messages: coreMessages,
            onFinish: async ({ response }) => {
                console.log("onFinish called. ChatID:", chatId);
                if (!chatId) return;

                // 2. Passive Lead Capture (Regex)
                if (lastUserContent) {
                    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
                    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

                    const emailMatch = lastUserContent.match(emailRegex);
                    const phoneMatch = lastUserContent.match(phoneRegex);

                    if (emailMatch || phoneMatch) {
                        const leadData: any = { updatedAt: serverTimestamp() };
                        if (emailMatch) leadData.email = emailMatch[0];
                        if (phoneMatch && phoneMatch[0].length > 6) leadData.phone = phoneMatch[0];

                        console.log("Passive lead capture found:", leadData);
                        await setDoc(doc(db, 'eirybot-IA', chatId), { lead: leadData }, { merge: true })
                            .then(() => console.log("Lead saved."))
                            .catch(e => console.error("Error saving lead:", e));
                    }
                }

                // 3. Save Assistant Message
                const generatedMessages = response.messages;
                console.log("Saving assistant messages:", generatedMessages.length);

                for (const msg of generatedMessages) {
                    let content = "";
                    if (typeof msg.content === 'string') {
                        content = msg.content;
                    } else if (Array.isArray(msg.content)) {
                        content = msg.content
                            .filter(part => part.type === 'text')
                            .map(part => (part as any).text)
                            .join('');
                    }

                    if (content) {
                        await addDoc(collection(db, 'eirybot-IA', chatId, 'messages'), {
                            role: msg.role,
                            content: content,
                            createdAt: serverTimestamp()
                        })
                            .then(() => console.log("Assistant message saved."))
                            .catch(e => console.error("Error saving assistant message:", e));
                    }
                }
            },
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error in /api/chat:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 });
    }
}
