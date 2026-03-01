import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Chatbot para Inmobiliarias: Guía de Uso - EiryBot" : "Real Estate Chatbot Guide - EiryBot",
        description: locale === "es"
            ? "Descubre cómo las inmobiliarias están agendando más visitas y calificando leads automáticamente."
            : "Discover how real estate agencies are booking more visits and qualifying leads automatically.",
        locale,
        pathEs: "/blog/real-estate-chatbot",
        pathEn: "/blog/real-estate-chatbot",
    });
}

export default async function RealEstateChatbotPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";
    const base = `/${locale}`;

    return (
        <article className="max-w-4xl mx-auto px-4 py-20">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-6 leading-tight">
                    {isEs ? "Chatbot para inmobiliarias: qué automatizar primero (con ejemplos)" : "Real estate chatbots: what to automate first (with examples)"}
                </h1>
                <div className="flex gap-4 text-sm text-gray-500 mb-8">
                    <span>{isEs ? "Guía" : "Guide"}</span>
                    <span>•</span>
                    <span>6 min read</span>
                </div>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "1. El embudo inmobiliario y el cuello de botella" : "1. The Real Estate Funnel and the Bottleneck"}</h2>
                <p>{isEs ? "En el sector inmobiliario, la velocidad lo es todo. Un lead que pregunta por una propiedad y no recibe respuesta en 10 minutos es un lead que probablemente ya contactó a otra agencia." : "In real estate, speed is everything. A lead who inquires about a property and doesn't get a response in 10 minutes is a lead who has likely already contacted another agency."}</p>

                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "2. Qué automatizar primero" : "2. What to Automate First"}</h2>
                <ul>
                    <li><strong>{isEs ? "Cualificación inicial:" : "Initial Qualification:"}</strong> {isEs ? "¿Busca comprar o alquilar? ¿En qué zona? ¿Presupuesto?" : "Buy or rent? What area? Budget?"}</li>
                    <li><strong>{isEs ? "Envío de fichas técnicas:" : "Sending Property Specs:"}</strong> {isEs ? "Automatiza el envío de PDFs con fotos y precios." : "Automate sending PDFs with photos and prices."}</li>
                    <li><strong>{isEs ? "Agendamiento de visitas:" : "Booking Visits:"}</strong> {isEs ? "Conecta con tu calendario para que el cliente elija el horario." : "Connect to your calendar so the client can choose their slot."}</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-3">{isEs ? "Ejemplo real de flujo" : "Real Flow Example"}</h3>
                <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100 italic">
                    "{isEs ? "Hola, vi la casa en Miraflores. ¿Sigue disponible?" : "Hi, I saw the house in Miraflores. Is it still available?"}" <br />
                    <strong>Robot:</strong> "{isEs ? "¡Hola! Sí, sigue disponible. ¿Te gustaría ver la ficha técnica o agendar una visita?" : "Hi! Yes, it's available. Would you like to see the spec sheet or book a visit?"}"
                </div>

                <div className="my-16 p-8 bg-fuchsia-50 rounded-3xl border border-fuchsia-100 text-center">
                    <h3 className="text-2xl font-bold text-violet-900 mb-4">{isEs ? "¿Quieres automatizar tu inmobiliaria?" : "Want to automate your real estate business?"}</h3>
                    <p className="mb-6">{isEs ? "Conoce más sobre nuestra solución especializada." : "Learn more about our specialized solution."}</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href={`${base}/whatsapp-chatbot`} className="px-6 py-3 bg-violet-700 text-white rounded-full font-bold hover:bg-violet-600 transition">
                            {isEs ? "Ver Pilar: WhatsApp Chatbot" : "View Pillar: WhatsApp Chatbot"}
                        </Link>
                        <Link href={`${base}/contact`} className="px-6 py-3 bg-white border border-violet-200 text-violet-700 rounded-full font-bold hover:bg-violet-50 transition">
                            {isEs ? "Contacto" : "Contact"}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
