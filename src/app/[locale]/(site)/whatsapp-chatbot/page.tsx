import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
    const { locale: raw } = await params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "WhatsApp Chatbot para Negocios - EiryBot" : "WhatsApp Chatbot for Business - EiryBot",
        description: locale === "es"
            ? "Automatiza tu atención al cliente y ventas en WhatsApp con nuestra solución de Chatbot con IA."
            : "Automate your customer service and sales on WhatsApp with our AI Chatbot solution.",
        locale,
        path: "/whatsapp-chatbot",
    });
}

export default async function WhatsAppChatbotPillar({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const t = getDict(locale);
    const base = `/${locale}`;

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative overflow-hidden bg-violet-50 py-20 px-4">
                <div className="mx-auto max-w-7xl text-center">
                    <h1 className="text-4xl font-extrabold text-violet-900 md:text-6xl mb-6 leading-tight">
                        {locale === "es" ? "Revoluciona tu WhatsApp con" : "Revolutionize your WhatsApp with"} <span className="text-fuchsia-600">IA Chatbots</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
                        {locale === "es"
                            ? "No es solo un bot de botones. Es una inteligencia capaz de entender, responder y vender las 24 horas del día."
                            : "Not just a button bot. It's an intelligence capable of understanding, responding, and selling 24/7."}
                    </p>
                    <div className="mt-10">
                        <Link href={`${base}/contact`} className="rounded-full bg-violet-700 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-violet-700/20 hover:bg-violet-600 transition">
                            {locale === "es" ? "Empezar ahora" : "Get started now"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* WHAT IT AUTOMATES */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-violet-900 mb-12">
                    {locale === "es" ? "¿Qué puedes automatizar?" : "What can you automate?"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { t: locale === "es" ? "Captura de Leads" : "Lead Capture", d: locale === "es" ? "Cualifica prospectos al instante." : "Instantly qualify prospects." },
                        { t: locale === "es" ? "Preguntas Frecuentes" : "FAQ Support", d: locale === "es" ? "Respuestas 24/7 sin esperas." : "24/7 answers without waiting." },
                        { t: locale === "es" ? "Derivación Inteligente" : "Smart Routing", d: locale === "es" ? "Pasa al humano solo lo necesario." : "Handoff to humans only when needed." },
                        { t: locale === "es" ? "Seguimientos" : "Follow-ups", d: locale === "es" ? "Mantén el interés automáticamente." : "Keep interest alive automatically." }
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-violet-100 bg-white shadow-sm">
                            <h3 className="font-bold text-violet-700 mb-2">{item.t}</h3>
                            <p className="text-gray-600 text-sm">{item.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* METRICS */}
            <section className="bg-violet-900 py-20 px-4 text-white text-center">
                <h2 className="text-3xl font-bold mb-12">{locale === "es" ? "Resultados que puedes medir" : "Results you can measure"}</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div>
                        <div className="text-5xl font-black text-fuchsia-400 mb-2">100%</div>
                        <p className="text-violet-100">{locale === "es" ? "Automatización inicial" : "Initial automation"}</p>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-fuchsia-400 mb-2">&lt; 1 min</div>
                        <p className="text-violet-100">{locale === "es" ? "Tiempo de respuesta" : "Response time"}</p>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-fuchsia-400 mb-2">24 / 7</div>
                        <p className="text-violet-100">{locale === "es" ? "Disponibilidad total" : "Total availability"}</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-violet-900 mb-12">FAQ</h2>
                <div className="space-y-6">
                    {[
                        {
                            q: locale === "es" ? "¡Es difícil de configurar?" : "Is it hard to set up?",
                            a: locale === "es" ? "No, nosotros nos encargamos de todo el entrenamiento inicial." : "No, we handle all the initial training for you."
                        },
                        {
                            q: locale === "es" ? "¿Funciona en cualquier WhatsApp?" : "Does it work on any WhatsApp?",
                            a: locale === "es" ? "Sí, a través de la API oficial para mayor seguridad y escalabilidad." : "Yes, through the official API for maximum security and scalability."
                        },
                        {
                            q: locale === "es" ? "¿Puede agendar citas?" : "Can it book appointments?",
                            a: locale === "es" ? "Totalmente, se integra con Calendar y otros CRM." : "Absolutely, it integrates with Calendar and other CRMs."
                        },
                        {
                            q: locale === "es" ? "¿Suena a robot?" : "Does it sound like a robot?",
                            a: locale === "es" ? "Nuestros agentes usan lenguaje natural para ser amigables y eficientes." : "Our agents use natural language to be friendly and efficient."
                        },
                        {
                            q: locale === "es" ? "¿Cómo se activa?" : "How is it activated?",
                            a: locale === "es" ? "Hablas con nosotros, diseñamos el flujo y en pocos días está en vivo." : "Talk to us, we design the flow, and it goes live in a few days."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="border-b border-violet-100 pb-4">
                            <h4 className="font-bold text-violet-800 mb-2">{faq.q}</h4>
                            <p className="text-gray-600 text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-20 px-4 bg-fuchsia-50 text-center">
                <h2 className="text-3xl font-bold text-violet-900 mb-6">{locale === "es" ? "¿Listo para escalar?" : "Ready to scale?"}</h2>
                <Link href={`${base}/contact`} className="inline-block rounded-full bg-violet-700 px-10 py-4 text-xl font-bold text-white shadow-xl hover:bg-violet-600 transition">
                    {locale === "es" ? "Agendar Demo Gratis" : "Book Free Demo"}
                </Link>
            </section>
        </div>
    );
}
