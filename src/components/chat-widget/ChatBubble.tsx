import { cn } from "@/lib/utils";

interface ChatBubbleProps {
    role: "user" | "assistant" | "system" | "data";
    content: string;
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
    if (role === "system" || role === "data") return null;

    // Function to parse markdown links: [Label](url)
    const renderContent = (text: string) => {
        // Split by the markdown link pattern
        const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

        return parts.map((part, index) => {
            // Check if this part is a markdown link
            const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

            if (match) {
                const [_, label, url] = match;
                return (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-2 block w-full rounded-lg bg-violet-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-violet-700 active:scale-95"
                    >
                        {label}
                    </a>
                );
            }

            // Normal text
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div
            className={cn(
                "flex w-full items-start gap-2",
                role === "user" ? "justify-end" : "justify-start"
            )}
        >
            {role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-violet-100 overflow-hidden border border-violet-200">
                    <img src="/MASCOTA-EIRYBOT_4.png" alt="Bot" className="w-full h-full object-cover" />
                </div>
            )}
            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    role === "user"
                        ? "bg-violet-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                )}
            >
                <div className="whitespace-pre-wrap">{renderContent(content)}</div>
            </div>
        </div>
    );
}
