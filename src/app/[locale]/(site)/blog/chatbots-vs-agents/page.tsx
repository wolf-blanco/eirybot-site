import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import LeadMagnet from "@/components/lead-magnet";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es"
            ? "Chatbots vs Agentes de IA: ¿Cuál es la Diferencia Real?"
            : "Chatbots vs AI Agents: What is the Real Difference?",
        description: locale === "es"
            ? "Olvída los 'Menú de Botones'. Descubre por qué los Agentes de IA (como EiryBot) venden más y frustran menos."
            : "Forget 'Button Menus'. Discover why AI Agents (like EiryBot) sell more and frustrate less.",
        locale,
        path: "/blog/chatbots-vs-agents",
    });
}

export default async function BlogPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";

    return (
        <article className="min-h-screen bg-white">
            <header className="bg-blue-50/50 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full">
                        {isEs ? "Tecnología & Futuro" : "Technology & Future"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {isEs
                            ? "Chatbots Tontos vs Agentes Inteligentes: La Guerra ha Terminado"
                            : "Dumb Chatbots vs Smart Agents: The War is Over"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {isEs
                            ? "Todos odiamos llamar a un banco y hablar con una máquina. Pero la nueva IA no es eso. Es algo completamente diferente."
                            : "We all hate calling a bank and talking to a machine. But the new AI is not that. It's something completely different."}
                    </p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="prose prose-lg prose-blue mx-auto text-gray-700">
                    <p className="lead text-xl font-medium text-gray-900 mb-8">
                        {isEs
                            ? "Seguramente has tenido esta experiencia: Escribes a una empresa y te responden con: 'Presione 1 para Ventas, 2 para Soporte'. Presionas 1. 'Gracias. Presione A para Precios...'. Es frustrante."
                            : "You've surely had this experience: You text a business and get: 'Press 1 for Sales, 2 for Support'. You press 1. 'Thanks. Press A for Pricing...'. It's frustrating."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">El Chatbot Tradicional (El Viejo)</h2>
                    <ul className="list-disc pl-4 space-y-2">
                        <li>❌ <strong>{isEs ? "Rígido:" : "Rigid:"}</strong> {isEs ? "Solo entiende palabras exactas o botones." : "Only understands exact words or buttons."}</li>
                        <li>❌ <strong>{isEs ? "Sin Memoria:" : "No Memory:"}</strong> {isEs ? "No recuerda lo que le dijiste hace 2 mensajes." : "Doesn't remember what you said 2 messages ago."}</li>
                        <li>❌ <strong>{isEs ? "Frustrante:" : "Frustrating:"}</strong> {isEs ? "Termina con el cliente gritando 'QUIERO HUMANO'." : "Ends with the customer screaming 'I WANT HUMAN'."}</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">El Agente de IA (EiryBot)</h2>
                    <p>
                        {isEs
                            ? "Un Agente de IA usa Modelos de Lenguaje (LLMs) para *entender* la intención, no solo palabras clave."
                            : "An AI Agent uses Large Language Models (LLMs) to *understand* intent, not just keywords."}
                    </p>
                    <ul className="list-disc pl-4 space-y-2 text-green-700 font-medium">
                        <li>✅ <strong>{isEs ? "Conversacional:" : "Conversational:"}</strong> {isEs ? "Puedes hablarle como a una persona. Entiende jerga, errores de ortografía y audios." : "You can talk to it like a person. It understands slang, typos, and audio."}</li>
                        <li>✅ <strong>{isEs ? "Contextual:" : "Contextual:"}</strong> {isEs ? "Sabe si eres un cliente nuevo o recurrente." : "Knows if you're a new or returning customer."}</li>
                        <li>✅ <strong>{isEs ? "Persuasivo:" : "Persuasive:"}</strong> {isEs ? "No solo responde, *vende*. Intenta agendar la cita o cerrar el trato." : "It doesn't just answer, it *sells*. It tries to book the appointment or close the deal."}</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{isEs ? "Comparativa Visual" : "Visual Comparison"}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 font-bold">
                                <tr>
                                    <th className="p-3">Feature</th>
                                    <th className="p-3 text-red-600">Chatbot</th>
                                    <th className="p-3 text-violet-700">AI Agent (EiryBot)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-3 font-medium">Tecnología</td>
                                    <td className="p-3">Árbol de Decisión (If/Else)</td>
                                    <td className="p-3">Deep Learning (LLM)</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium">Flexibilidad</td>
                                    <td className="p-3">Nula</td>
                                    <td className="p-3">Total</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium">Objetivo</td>
                                    <td className="p-3">Filtrar (Desviar tráfico)</td>
                                    <td className="p-3">Convertir (Vender)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="my-10 p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center">
                        <h3 className="text-xl font-bold text-blue-900 mb-2">
                            {isEs ? "¿Quieres probar la diferencia?" : "Want to taste the difference?"}
                        </h3>
                        <p className="text-blue-700 mb-4">
                            {isEs
                                ? "Habla con EiryBot ahora mismo y trata de confundirlo. Verás que no puedes."
                                : "Talk to EiryBot right now and try to confuse it. You'll see you can't."}
                        </p>
                        <Link
                            href="https://demo.eirybot.com" target="_blank"
                            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition"
                        >
                            {isEs ? "HABLAR CON LA IA" : "TALK TO AI"}
                        </Link>
                    </div>

                    <LeadMagnet locale={locale} />
                </div>
            </div>
        </article>
    );
}
