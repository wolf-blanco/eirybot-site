import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getSiteKnowledgeString } from './knowledge';

export async function getContext(query: string): Promise<string> {
    // In a real RAG, we would vector search here.
    // For this size of site, dumping the whole context is fine and faster.
    const knowledge = getSiteKnowledgeString();
    return knowledge;
}
