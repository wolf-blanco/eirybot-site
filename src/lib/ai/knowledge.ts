
import es from '@/messages/es';
// @ts-ignore
import siteKnowledgeData from './site-knowledge.json';

export const siteKnowledge = {
    mainContent: es,
    indexedPages: siteKnowledgeData.pages || []
};

// Basic tokenizer (split by space, lowercase, remove punctuation)
function getKeywords(text: string): string[] {
    return text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 3); // Ignore small words
}

export function getSiteKnowledgeString(query: string = "") {
    // If no query, return a summary or main content only
    if (!query) {
        return `
## Main Messages (i18n):
${JSON.stringify(siteKnowledge.mainContent, null, 2)}
`;
    }

    const queryKeywords = getKeywords(query);
    console.log(`Searching knowledge for keywords: ${queryKeywords.join(", ")}`);

    // Score pages based on keyword matches
    const scoredPages = siteKnowledge.indexedPages.map((page: any) => {
        const contentLower = page.content.toLowerCase();
        let score = 0;

        queryKeywords.forEach(qKw => {
            // Simple inclusion check
            if (contentLower.includes(qKw)) score += 1;

            // Boost for title/path matches
            if (page.path.toLowerCase().includes(qKw)) score += 5;
        });

        return { ...page, score };
    });

    // Filter relevant pages (score > 0) and sort by score desc
    // Take top 3 most relevant pages
    const relevantPages = scoredPages
        .filter((p: any) => p.score > 0)
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 3);

    console.log(`Found ${relevantPages.length} relevant pages.`);

    // Construct context
    let context = `
## Main Messages (i18n):
${JSON.stringify(siteKnowledge.mainContent, null, 2)}

## Relevant Site Content:
`;

    // Add pages until max length is reached
    // Safe limit: 10,000 characters is roughly 2.5k - 3k tokens. 
    // Request limit was ~34k tokens (which is huge, likely >100k chars).
    // Let's safe limit to 15,000 chars to start.
    const MAX_CONTEXT_LENGTH = 15000;

    for (const page of relevantPages) {
        const pageContent = `\n--- Page: ${page.path} ---\n${page.content}\n`;

        if (context.length + pageContent.length > MAX_CONTEXT_LENGTH) {
            console.log("Max context length reached, stopping addition.");
            break;
        }

        context += pageContent;
    }

    if (context.length < 200) {
        return "Not enough relevant context found on the website. Use general knowledge but mention you are an expert on EiryBot.";
    }

    return context;
}
