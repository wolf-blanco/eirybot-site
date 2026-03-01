import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDict, type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import PillarSection from "@/components/pillar/section";
import FeatureCard from "@/components/pillar/feature-card";
import FAQAccordion from "@/components/pillar/faq-accordion";
import FloatingMascot from "@/components/pillar/floating-mascot";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
    const { locale: raw } = await params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Automatización de Procesos con IA: Eficiencia Total - EiryBot" : "AI Process Automation: Total Efficiency - EiryBot",
        description: locale === "es"
            ? "Lleva tu negocio al siguiente nivel automatizando flujos de trabajo. Conecta WhatsApp con CRM, Google Sheets y más."
            : "Take your business to the next level by automating workflows. Connect WhatsApp with CRM, Google Sheets, and more.",
        locale,
        pathEs: "/automatizacion-procesos",
        pathEn: "/process-automation",
    });
}

export default async function ProcessAutomationPillar({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;

    // SEO Redirection for localized slugs
    if (locale === "en") {
        redirect("/en/process-automation");
    }

    const t = getDict(locale);
    const base = `/${locale}`;

    return (
        <div className="bg-white overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-violet-600 uppercase bg-violet-100 rounded-full">
                            {locale === "es" ? "Orquestación Digital" : "Digital Orchestration"}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-violet-900 leading-[1.1] mb-6">
                            {locale === "es" ? "Automatización de procesos con" : "Process automation with"} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                {locale === "es" ? "IA y control total" : "AI and total control"}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            {locale === "es"
                                ? "Elimina las tareas repetitivas. Conecta tus canales de comunicación con tus herramientas operativas y deja que la IA trabaje por ti."
                                : "Eliminate repetitive tasks. Connect your communication channels with your operational tools and let AI work for you."}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`${base}/contact`} className="px-8 py-5 bg-violet-700 text-white rounded-full font-bold shadow-xl shadow-violet-700/20 hover:bg-violet-600 hover:-translate-y-1 transition-all duration-300">
                                {locale === "es" ? "Hablar con un experto" : "Talk to an expert"}
                            </Link>
                            <Link href={`${base}/services`} className="px-8 py-5 bg-white text-violet-900 border border-violet-100 rounded-full font-bold shadow-sm hover:bg-violet-50 transition-all">
                                {locale === "es" ? "Nuestros servicios" : "Our services"}
                            </Link>
                        </div>
                    </div>
                    <div className="relative animate-fade-in delay-200">
                        <FloatingMascot src="/robot5.png" alt="EiryBot Automation Mascot" />
                    </div>
                </div>
            </section>

            {/* QUÉ RESUELVE */}
            <PillarSection bg="white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-violet-900 mb-4">
                        {locale === "es" ? "Menos trabajo manual, más resultados" : "Less manual work, more results"}
                    </h2>
                    <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title={locale === "es" ? "Orquestación de Datos" : "Data Orchestration"}
                        description={locale === "es" ? "Sincroniza información entre WhatsApp, CRM y Hojas de Cálculo sin errores manuales." : "Sync information between WhatsApp, CRM, and Spreadsheets without manual errors."}
                        icon="/MASCOTA-EIRYBOT_4.png"
                    />
                    <FeatureCard
                        title={locale === "es" ? "Alertas Inteligentes" : "Smart Alerts"}
                        description={locale === "es" ? "Recibe notificaciones críticas en tiempo real cuando un proceso requiere atención humana." : "Receive real-time critical notifications when a process requires human attention."}
                        icon="/MASCOTA-EIRYBOT_1.png"
                    />
                    <FeatureCard
                        title={locale === "es" ? "Auditoría en Tiempo Real" : "Real-time Auditing"}
                        description={locale === "es" ? "Mantén un registro impecable de cada interacción y movimiento de datos en tu negocio." : "Keep an impeccable record of every interaction and data movement in your business."}
                        icon="/MASCOTA-EIRYBOT_3.png"
                    />
                </div>
            </PillarSection>

            {/* INTEGRATIONS */}
            <PillarSection bg="gray">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-violet-900 mb-4">
                        {locale === "es" ? "Tu ecosistema, conectado" : "Your ecosystem, connected"}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto italic">
                        {locale === "es" ? "Nos integramos con las herramientas que ya usas cada día." : "We integrate with the tools you already use every day."}
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {[
                        "Google Sheets", "HubSpot", "Salesforce", "Zapier",
                        "Calendar", "Slack", "Monday.com", "Custom API"
                    ].map((tool, i) => (
                        <div key={i} className="flex items-center justify-center p-8 bg-white rounded-3xl border border-violet-50 shadow-sm font-bold text-violet-900 hover:text-fuchsia-600 hover:border-fuchsia-100 transition-all duration-300">
                            {tool}
                        </div>
                    ))}
                </div>
            </PillarSection>

            {/* BEFORE / AFTER */}
            <PillarSection bg="white">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-violet-900 leading-tight">
                            {locale === "es" ? "Transforma tu flujo operativo" : "Transform your operational flow"}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {locale === "es"
                                ? "La mayoría de las empresas pierden 20 horas semanales en tareas que una IA podría resolver en segundos. EiryBot no solo responde, ejecuta."
                                : "Most companies lose 20 hours a week on tasks that an AI could solve in seconds. EiryBot doesn't just respond, it executes."}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 italic text-sm text-red-900">
                            <h4 className="font-black mb-4 uppercase tracking-wider">{locale === "es" ? "Sin Automatización" : "Without Automation"}</h4>
                            <ul className="space-y-3 opacity-70">
                                <li>• {locale === "es" ? "Carga manual de leads" : "Manual lead entry"}</li>
                                <li>• {locale === "es" ? "Errores en el CRM" : "CRM errors"}</li>
                                <li>• {locale === "es" ? "Seguimientos olvidados" : "Forgotten follow-ups"}</li>
                                <li>• {locale === "es" ? "Caos en la data" : "Data chaos"}</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-green-50 border border-green-100 text-sm text-green-900">
                            <h4 className="font-black mb-4 uppercase tracking-wider">{locale === "es" ? "Con EiryBot" : "With EiryBot"}</h4>
                            <ul className="space-y-3">
                                <li className="font-bold">✓ {locale === "es" ? "Sincronización instantánea" : "Instant sync"}</li>
                                <li className="font-bold">✓ {locale === "es" ? "Alertas de ventas" : "Sales alerts"}</li>
                                <li className="font-bold">✓ {locale === "es" ? "Reportes automáticos" : "Automatic reports"}</li>
                                <li className="font-bold">✓ {locale === "es" ? "Escalabilidad real" : "Real scalability"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PillarSection>

            {/* METRICS & FAQ */}
            <PillarSection bg="violet">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black mb-12">
                            {locale === "es" ? "Impacto directo en KPIs" : "Direct impact on KPIs"}
                        </h2>
                        <div className="space-y-8">
                            {[
                                { label: locale === "es" ? "Reducción trabajo manual" : "Manual work reduction", value: "80%" },
                                { label: locale === "es" ? "Precisión de datos" : "Data accuracy", value: "100%" },
                                { label: locale === "es" ? "Velocidad de proceso" : "Process speed", value: "10x" }
                            ].map((kpi, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <span className="text-violet-200 text-lg">{kpi.label}</span>
                                    <span className="text-4xl font-black text-fuchsia-400">{kpi.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black mb-12 text-white">FAQ</h2>
                        <FAQAccordion items={[
                            {
                                q: locale === "es" ? "¿Qué procesos se pueden automatizar?" : "What processes can be automated?",
                                a: locale === "es" ? "Cualquier flujo que involucre entrada de datos por chat y salida hacia un sistema externo (CRM, Sheets, ERP, Email)." : "Any flow involving data input via chat and output to an external system (CRM, Sheets, ERP, Email)."
                            },
                            {
                                q: locale === "es" ? "¿Es seguro para mis datos?" : "Is it secure for my data?",
                                a: locale === "es" ? "Totalmente. Utilizamos encriptación de extremo a extremo y cumplimos con los estándares de seguridad de las APIs oficiales." : "Absolutely. We use end-to-end encryption and comply with official API security standards."
                            },
                            {
                                q: locale === "es" ? "¿Cuánto tiempo toma la implementación?" : "How long does implementation take?",
                                a: locale === "es" ? "Dependiendo de la complejidad, un flujo estándar puede estar listo en menos de 7 días hábiles." : "Depending on complexity, a standard flow can be ready in less than 7 business days."
                            }
                        ]} locale={locale} />
                    </div>
                </div>
            </PillarSection>

            {/* FINAL CTA */}
            <section className="py-24 px-4 bg-fuchsia-600 relative overflow-hidden text-center">
                <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/10 blur-[130px] rounded-full" />
                <div className="relative z-10 max-w-4xl mx-auto text-white">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                        {locale === "es" ? "¿Optimizamos tu flujo operativo?" : "Scale your operations today"}
                    </h2>
                    <p className="text-xl text-fuchsia-100 mb-12">
                        {locale === "es" ? "Deja de perder tiempo en procesos manuales y empieza a crecer de verdad." : "Stop wasting time on manual processes and start truly growing."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href={`${base}/contact`} className="px-12 py-5 bg-white text-fuchsia-600 rounded-full font-black text-lg shadow-2xl hover:bg-violet-50 hover:scale-105 transition-all">
                            {locale === "es" ? "HABLEMOS DE TU PROYECTO" : "LET'S TALK ABOUT YOUR PROJECT"}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
