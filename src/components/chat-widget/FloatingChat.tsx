'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { AnimatePresence, motion } from 'framer-motion';

export function FloatingChat() {
    // Generate a unique chat ID for this session
    const [chatId] = useState(() => typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).substring(7));
    useEffect(() => console.log("FloatingChat mounted. Assigned ChatID:", chatId), [chatId]);

    const { messages, sendMessage, status } = useChat({
        // @ts-ignore
        api: `/api/chat?chatId=${chatId}`,
        headers: { 'x-chat-id': chatId },
        onFinish: () => console.log("Chat finished"),
        onError: (error) => console.error("Chat error:", error),
    });
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const isLoading = status === 'submitted' || status === 'streaming';

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const text = inputValue;
        setInputValue(""); // Optimistically clear input

        try {
            // sendMessage from AbstractChat expects { text: string } for user messages
            await sendMessage({ text } as any, {
                body: {
                    chatId,
                    metadata: {
                        referrer: document.referrer,
                        currentUrl: window.location.href,
                        language: navigator.language,
                        screen: `${window.screen.width}x${window.screen.height}`
                    }
                },
                headers: { 'x-chat-id': chatId }
            });
        } catch (err) {
            console.error("Failed to send message:", err);
            setInputValue(text); // Restore input on error
        }
    };

    // Helper to extract text from message parts
    const getMessageText = (message: any) => {
        if (typeof message.content === 'string') return message.content;
        if (Array.isArray(message.parts)) {
            return message.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join('');
        }
        return '';
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl border border-violet-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-violet-700 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full absolute bottom-0 right-0 border border-violet-700 z-10"></div>
                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
                                        <img src="/MASCOTA-EIRYBOT_4.png" alt="Bot" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">EiryBot Assistant</h3>
                                    <p className="text-[10px] text-violet-200">Online | AI Powered</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-sm text-gray-400 p-6">
                                    <img src="/MASCOTA-EIRYBOT_4.png" alt="Bot" className="w-16 h-16 opacity-50 mb-4 grayscale" />
                                    <p className="font-medium text-gray-500">¡Hola! Soy EiryBot.</p>
                                    <p className="text-xs mt-1">¿En qué puedo ayudarte hoy?</p>
                                </div>
                            )}
                            {messages.map((m) => (
                                <ChatBubble key={m.id} role={m.role} content={getMessageText(m)} />
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 text-xs text-gray-400 pl-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t bg-white">
                            <div className="flex gap-2">
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="bg-violet-600 text-white p-2 rounded-full disabled:opacity-50 hover:bg-violet-700 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-[9px] text-center text-gray-300 mt-2">
                                Powered by EirybotAI-4o
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 flex items-center justify-center hover:scale-105 transition-transform hover:bg-violet-500 overflow-hidden border-2 border-white"
            >
                {isOpen ? (
                    <span className="text-2xl font-bold">✕</span>
                ) : (
                    <img src="/MASCOTA-EIRYBOT_4.png" alt="Chat" className="w-full h-full object-cover" />
                )}
            </button>
        </div>
    );
}
