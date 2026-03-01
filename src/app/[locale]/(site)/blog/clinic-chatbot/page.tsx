import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Chatbots para Clínicas y Salud - EiryBot" : "Clinic & Health Chatbots - EiryBot",
        description: locale === "es"
            ? "Reduce el ausentismo y facilita el agendamiento de turnos médicos con inteligencia artificial."
            : "Reduce no-shows and facilitate medical appointment booking with AI.",
        locale,
        pathEs: "/blog/clinic-chatbot",
        pathEn: "/blog/clinic-chatbot",
    });
}

export default async function ClinicChatbotPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";
    const base = `/${locale}`;

    return (
        <article className="max-w-4xl mx-auto px-4 py-20">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-6 leading-tight">
                    {isEs ? "Chatbot para clínicas: turnos, recordatorios y resultados" : "Chatbots for clinics: appointments, reminders, and outcomes"}
                </h1>
                <div className="flex justify-center gap-4 text-sm text-gray-500 mb-8">
                    <span>{isEs ? "Casos" : "Case Studies"}</span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "Atención 24/7 en salud" : "24/7 Support in Healthcare"}</h2>
                <p>{isEs ? "Las clínicas a menudo saturan sus líneas telefónicas durante las mañanas. Un chatbot permite que la mayoría de los trámites se realicen sin intervención de recepción." : "Clinics often clog their phone lines during the mornings. A chatbot allows most procedures to be done without front desk intervention."}</p>

                <h3 className="text-xl font-bold mt-8 mb-3">{isEs ? "Beneficios clave" : "Key Benefits"}</h3>
                <ol>
                    <li><strong>{isEs ? "Reducción de Ausentismo:" : "Reduction in No-shows:"}</strong> {isEs ? "Recordatorios automáticos 24h antes del turno." : "Automatic reminders 24h before the appointment."}</li>
                    <li><strong>{isEs ? "Entrega de Resultados:" : "Results Delivery:"}</strong> {isEs ? "Acceso seguro a PDFs de laboratorio por WhatsApp." : "Secure access to lab PDFs via WhatsApp."}</li>
                    <li><strong>{isEs ? "Triaje inicial:" : "Initial Triage:"}</strong> {isEs ? "Deriva urgencias al humano y consultas de rutina al bot." : "Direct emergencies to humans and routine inquiries to the bot."}</li>
                </ol>

                <div className="my-16 p-8 bg-violet-900 text-white rounded-3xl text-center shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">{isEs ? "Mejora tu Atención al Cliente" : "Improve your Customer Support"}</h3>
                    <p className="mb-6 opacity-90">{isEs ? "Descubre cómo nuestra infraestructura 24/7 ayuda a clínicas." : "Discover how our 24/7 infrastructure helps clinics."}</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href={`${base}/atencion-cliente-24-7`} className="px-6 py-3 bg-fuchsia-600 text-white rounded-full font-bold hover:bg-fuchsia-500 transition">
                            {isEs ? "Ver Pilar: Atención 24/7" : "View Pillar: 24/7 Support"}
                        </Link>
                        <Link href={`${base}/contact`} className="px-6 py-3 bg-violet-800 border border-violet-700 text-violet-100 rounded-full font-bold hover:bg-violet-700 transition">
                            {isEs ? "Contactar" : "Contact us"}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
