import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import { systemPrompt } from '@/lib/ai/prompt';
import { getContext } from '@/lib/ai/context';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    console.log("POST /api/chat called - v2");
    try {
        const { messages } = await req.json();
        console.log("Received raw messages:", messages.length);

        // Convert to CoreMessages to handle 'parts' vs 'content' string automatically
        const coreMessages = await convertToModelMessages(messages);
        const lastMessage = coreMessages[coreMessages.length - 1];

        // Extract text safely from CoreMessage
        let lastUserContent = "";
        if (typeof lastMessage.content === 'string') {
            lastUserContent = lastMessage.content;
        } else if (Array.isArray(lastMessage.content)) {
            lastUserContent = lastMessage.content
                .filter(part => part.type === 'text')
                .map(part => (part as any).text)
                .join('\n');
        }

        console.log("Extracted context query:", lastUserContent);

        const context = await getContext(lastUserContent);
        console.log("Context retrieved, length:", context.length);

        // Inject context into the system prompt dynamically
        const dynamicSystemPrompt = `
${systemPrompt}

## Relevant Context from Website:
${context}
`;

        console.log("Calling streamText...");
        const result = await streamText({
            model: openai('gpt-4o'),
            system: dynamicSystemPrompt,
            messages: coreMessages,
        });

        console.log("Returning response stream via toUIMessageStreamResponse");
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error in /api/chat:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 });
    }
}
