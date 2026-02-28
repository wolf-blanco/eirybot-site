import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Checklist para elegir proveedor de chatbot" : "Chatbot vendor checklist",
        description: locale === "es" ? "Evita estafas y promesas vacías. Lo que debes preguntar antes de contratar una solución de IA para WhatsApp." : "Avoid scams and empty promises. What you should ask before hiring an AI WhatsApp solution.",
        locale,
        path: "/blog/chatbot-vendor-checklist",
    });
}

export default async function VendorChecklistPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";
    const base = `/${locale}`;

    return (
        <article className="max-w-4xl mx-auto px-4 py-20 bg-white">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-6 leading-tight">
                    {isEs ? "Checklist para elegir proveedor de chatbot (sin humo)" : "Chatbot vendor checklist (no fluff)"}
                </h1>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-center">
                <p className="max-w-2xl mx-auto text-xl italic mb-12">
                    {isEs ? "No todas las soluciones de IA son iguales. Aquí te decimos cómo filtrar." : "Not all AI solutions are equal. Here is how you filter them."}
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="p-8 border border-gray-100 rounded-3xl">
                        <h3 className="font-bold text-violet-700 mb-4">{isEs ? "Lo Básico" : "The Basics"}</h3>
                        <ul className="space-y-4 text-sm">
                            <li>- {isEs ? "API Oficial de WhatsApp" : "Official WhatsApp API"}</li>
                            <li>- {isEs ? "Manejo de audios y archivos" : "Audio and file handling"}</li>
                            <li>- {isEs ? "Entrenamiento con tus datos" : "Training with your data"}</li>
                        </ul>
                    </div>
                    <div className="p-8 border border-gray-100 rounded-3xl">
                        <h3 className="font-bold text-violet-700 mb-4">{isEs ? "Lo Avanzado" : "The Advanced"}</h3>
                        <ul className="space-y-4 text-sm">
                            <li>- {isEs ? "Handoff a humano suave" : "Smooth human handoff"}</li>
                            <li>- {isEs ? "Integraciones nativas (CRM)" : "Native integrations (CRM)"}</li>
                            <li>- {isEs ? "Dashboard de KPIs en tiempo real" : "Real-time KPIs dashboard"}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20">
                    <Link href={`${base}/whatsapp-chatbot`} className="text-violet-700 font-bold underline">
                        {isEs ? "Leer más sobre WhatsApp Chatbots" : "Read more about WhatsApp Chatbots"}
                    </Link>
                </div>

                <div className="my-16 p-8 bg-black text-white rounded-3xl text-center shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">{isEs ? "¿EiryBot es para ti?" : "Is EiryBot for you?"}</h3>
                    <p className="mb-6 opacity-70">{isEs ? "Descubre por qué somos la solución robusta que buscas." : "Discover why we are the robust solution you seek."}</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href={`${base}/contact`} className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition">
                            {isEs ? "Hablar con nosotros" : "Talk to us"}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
