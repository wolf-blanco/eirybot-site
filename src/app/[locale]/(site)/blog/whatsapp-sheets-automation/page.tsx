import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "WhatsApp + Google Sheets: flujo real" : "WhatsApp + Google Sheets: a real workflow",
        description: locale === "es" ? "Aprende a sincronizar tus conversaciones de WhatsApp con Google Sheets automáticamente." : "Learn how to sync your WhatsApp conversations with Google Sheets automatically.",
        locale,
        path: "/blog/whatsapp-sheets-automation",
    });
}

export default async function WhatsappSheetsPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";
    const base = `/${locale}`;

    return (
        <article className="max-w-4xl mx-auto px-4 py-20 bg-white">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-6 leading-tight">
                    {isEs ? "WhatsApp + Google Sheets: flujo real de captura de leads" : "WhatsApp + Google Sheets: a real lead-capture workflow"}
                </h1>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "Centraliza tu data sin pagar por un CRM caro" : "Centralize your data without a costly CRM"}</h2>
                <p>{isEs ? "Muchos emprendedores comienzan gestionando todo en una hoja de cálculo. El problema es el traspaso manual de WhatsApp a la tabla." : "Many entrepreneurs start by managing everything in a spreadsheet. The bottleneck is manual transfer from WhatsApp to the table."}</p>

                <h3 className="text-xl font-bold mt-8 mb-3">{isEs ? "Pasos para automatizar" : "Steps to Automate"}</h3>
                <ol>
                    <li>{isEs ? "Bot captura nombre, teléfono y servicio interesado." : "Bot captures name, phone, and interested service."}</li>
                    <li>{isEs ? "Webhook envía la data a Google Sheets." : "Webhook sends data to Google Sheets."}</li>
                    <li>{isEs ? "Notificación automática al vendedor." : "Automatic notification to the salesperson."}</li>
                </ol>

                <div className="my-16 p-8 bg-violet-50 rounded-3xl border border-violet-200 text-center">
                    <h3 className="text-2xl font-bold text-violet-900 mb-4">{isEs ? "¿Quieres automatizar tus procesos?" : "Want to automate your processes?"}</h3>
                    <p className="mb-6">{isEs ? "Descubre cómo integrar EiryBot con tus aplicaciones favoritas." : "Discover how to integrate EiryBot with your favorite apps."}</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href={`${base}/automatizacion-procesos`} className="px-6 py-3 bg-violet-700 text-white rounded-full font-bold hover:bg-violet-600 transition">
                            {isEs ? "Ver Pilar: Automatización" : "View Pillar: Automation"}
                        </Link>
                        <Link href={`${base}/contact`} className="px-6 py-3 bg-white border border-violet-200 text-gray-700 rounded-full font-bold hover:bg-violet-50 transition">
                            {isEs ? "Contactanos" : "Contact us"}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
