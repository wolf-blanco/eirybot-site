import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
    const { locale: raw } = await params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Automatización de Procesos con IA - EiryBot" : "AI Process Automation - EiryBot",
        description: locale === "es"
            ? "Optimiza tu flujo de trabajo integrando WhatsApp con tus herramientas favoritas como CRM y Google Sheets."
            : "Optimize your workflow by integrating WhatsApp with your favorite tools like CRM and Google Sheets.",
        locale,
        path: locale === "es" ? "/automatizacion-procesos" : "/process-automation",
    });
}

export default async function ProcessAutomationPillar({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const t = getDict(locale);
    const base = `/${locale}`;

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative bg-violet-900 py-24 px-4 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-fuchsia-400/10 blur-[120px]" />
                <div className="mx-auto max-w-7xl relative z-10">
                    <h1 className="text-4xl font-extrabold md:text-6xl mb-6">
                        {locale === "es" ? "Automatiza tus" : "Automate your"} <span className="text-fuchsia-400">{locale === "es" ? "Procesos" : "Processes"}</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-violet-100 mb-10 leading-relaxed">
                        {locale === "es"
                            ? "Conecta WhatsApp con tu ecosistema digital. Olvida el copiado manual y los errores humanos."
                            : "Connect WhatsApp with your digital ecosystem. Forget manual copying and human errors."}
                    </p>
                    <Link href={`${base}/contact`} className="rounded-full bg-white px-8 py-4 text-lg font-bold text-violet-900 hover:bg-violet-50 transition">
                        {locale === "es" ? "Ver Integraciones" : "See Integrations"}
                    </Link>
                </div>
            </section>

            {/* INTEGRATIONS GRID */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-violet-900 mb-4">{locale === "es" ? "Integración sin fricción" : "Frictionless Integration"}</h2>
                    <p className="text-gray-600">{locale === "es" ? "Tu chatbot se conecta con lo que ya usas" : "Your chatbot connects with what you already use"}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {["Google Sheets", "HubSpot / CRM", "Calendar", "Zapier", "ERP", "Webhook", "Email", "Slack"].map((tool, i) => (
                        <div key={i} className="p-8 rounded-xl bg-violet-50 border border-violet-100 font-bold text-violet-800 shadow-sm">
                            {tool}
                        </div>
                    ))}
                </div>
            </section>

            {/* BEFORE/AFTER */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
                        <h3 className="text-red-600 font-bold mb-4">✕ {locale === "es" ? "Antes" : "Before"}</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li>{locale === "es" ? "• Carga manual de datos" : "• Manual data entry"}</li>
                            <li>{locale === "es" ? "• Olvidos en seguimientos" : "• Missed follow-ups"}</li>
                            <li>{locale === "es" ? "• Leads perdidos por demora" : "• Leads lost to delays"}</li>
                        </ul>
                    </div>
                    <div className="bg-violet-100 p-8 rounded-3xl shadow-sm border border-violet-300">
                        <h3 className="text-violet-700 font-bold mb-4">✓ {locale === "es" ? "Con EiryBot" : "With EiryBot"}</h3>
                        <ul className="space-y-4 text-sm text-violet-900 font-medium">
                            <li>{locale === "es" ? "• Sincronización inmediata" : "• Immediate sync"}</li>
                            <li>{locale === "es" ? "• Recordatorios automáticos" : "• Automatic reminders"}</li>
                            <li>{locale === "es" ? "• Cero pérdida de data" : "• Zero data loss"}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center px-4">
                <h2 className="text-3xl font-bold text-violet-900 mb-8">{locale === "es" ? "¿Optimizamos tu flujo hoy?" : "Shall we optimize your flow today?"}</h2>
                <Link href={`${base}/contact`} className="rounded-full bg-fuchsia-600 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-fuchsia-500 transition">
                    {locale === "es" ? "Hablar con un experto" : "Talk to an expert"}
                </Link>
            </section>
        </div>
    );
}
