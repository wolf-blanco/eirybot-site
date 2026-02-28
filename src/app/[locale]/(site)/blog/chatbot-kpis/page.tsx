import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Cómo medir un chatbot: KPIs que importan" : "How to measure a chatbot: KPIs that matter",
        description: locale === "es" ? "Aprende qué métricas de chatbot realmente afectan tu balance final y cómo mejorarlas." : "Learn which chatbot metrics actually affect your bottom line and how to improve them.",
        locale,
        path: "/blog/chatbot-kpis",
    });
}

export default async function ChatbotKpisPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";
    const base = `/${locale}`;

    return (
        <article className="max-w-4xl mx-auto px-4 py-20 bg-white">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-6 leading-tight">
                    {isEs ? "Cómo medir un chatbot: KPIs que importan" : "How to measure a chatbot: KPIs that matter"}
                </h1>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "Métricas de vanidad vs Métricas de negocio" : "Vanity Metrics vs Business Metrics"}</h2>
                <p>{isEs ? "Muchas empresas se enfocan en cuántos mensajes respondió el bot. Pero lo que importa es cuántas ventas generó o cuánto tiempo ahorró al equipo humano." : "Many companies focus on how many messages the bot answered. But what matters is how many sales it generated or how much time it saved the human team."}</p>

                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 my-8">
                    <h3 className="font-bold text-gray-900 mb-4">{isEs ? "Los 3 KPIs Ganadores" : "The 3 Winning KPIs"}</h3>
                    <ul className="space-y-4">
                        <li><strong>{isEs ? "Tasa de Resolución (Resolution Rate):" : "Resolution Rate:"}</strong> {isEs ? "% de chats resueltos sin pasar a un humano." : "% of chats solved without human handoff."}</li>
                        <li><strong>{isEs ? "Costo por Conversación:" : "Cost per Conversation:"}</strong> {isEs ? "Comparativa vs personal humano." : "Comparison vs human staff."}</li>
                        <li><strong>{isEs ? "Tasa de Conversión de Lead:" : "Lead Conversion Rate:"}</strong> {isEs ? "De consulta a contacto cualificado." : "From inquiry to qualified lead."}</li>
                    </ul>
                </div>

                <div className="my-16 p-8 bg-violet-900 text-white rounded-3xl text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">{isEs ? "¿Quieres ver tus KPIs en tiempo real?" : "Want to see your KPIs in real time?"}</h3>
                    <p className="mb-6 opacity-80">{isEs ? "EiryBot incluye un panel de analíticas integrado." : "EiryBot includes an integrated analytics panel."}</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href={`${base}/automatizacion-procesos`} className="px-6 py-3 bg-fuchsia-600 text-white rounded-full font-bold hover:bg-fuchsia-500 transition shadow-fuchsia-600/30 shadow-lg">
                            {isEs ? "Pilar: Automatización" : "Automation Pillar"}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
