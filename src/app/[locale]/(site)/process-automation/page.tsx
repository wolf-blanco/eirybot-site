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
        title: locale === "es" ? "Chatbot para WhatsApp IA: Vende y Responde 24/7 - EiryBot" : "AI Process Automation: Total Efficiency - EiryBot",
        description: "Take your business to the next level by automating workflows. Connect WhatsApp with CRM, Google Sheets, and more.",
        locale,
        pathEs: "/automatizacion-procesos",
        pathEn: "/process-automation",
    });
}

export default async function ProcessAutomationPillarEN({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;

    // SEO Redirection for localized slugs
    if (locale === "es") {
        redirect("/es/automatizacion-procesos");
    }

    const t = getDict(locale);
    const base = `/${locale}`;

    // Content is exact same as automatizacion-procesos but for EN slug
    return (
        <div className="bg-white overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-violet-600 uppercase bg-violet-100 rounded-full">
                            Digital Orchestration
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-violet-900 leading-[1.1] mb-6">
                            Process automation with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                AI and total control
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            Eliminate repetitive tasks. Connect your communication channels with your operational tools and let AI work for you.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`${base}/contact`} className="px-8 py-5 bg-violet-700 text-white rounded-full font-bold shadow-xl shadow-violet-700/20 hover:bg-violet-600 hover:-translate-y-1 transition-all duration-300">
                                Talk to an expert
                            </Link>
                            <Link href={`${base}/services`} className="px-8 py-5 bg-white text-violet-900 border border-violet-100 rounded-full font-bold shadow-sm hover:bg-violet-50 transition-all">
                                Our services
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
                        Less manual work, more results
                    </h2>
                    <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Data Orchestration"
                        description="Sync information between WhatsApp, CRM, and Spreadsheets without manual errors."
                        icon="/MASCOTA-EIRYBOT_4.png"
                    />
                    <FeatureCard
                        title="Smart Alerts"
                        description="Receive real-time critical notifications when a process requires human attention."
                        icon="/MASCOTA-EIRYBOT_1.png"
                    />
                    <FeatureCard
                        title="Real-time Auditing"
                        description="Keep an impeccable record of every interaction and data movement in your business."
                        icon="/MASCOTA-EIRYBOT_3.png"
                    />
                </div>
            </PillarSection>

            {/* INTEGRATIONS */}
            <PillarSection bg="gray">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-violet-900 mb-4">
                        Your ecosystem, connected
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto italic">
                        We integrate with the tools you already use every day.
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
                            Transform your operational flow
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Most companies lose 20 hours a week on tasks that an AI could solve in seconds. EiryBot doesn't just respond, it executes.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 italic text-sm text-red-900">
                            <h4 className="font-black mb-4 uppercase tracking-wider">Without Automation</h4>
                            <ul className="space-y-3 opacity-70">
                                <li>• Manual lead entry</li>
                                <li>• CRM errors</li>
                                <li>• Forgotten follow-ups</li>
                                <li>• Data chaos</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-green-50 border border-green-100 text-sm text-green-900">
                            <h4 className="font-black mb-4 uppercase tracking-wider">With EiryBot</h4>
                            <ul className="space-y-3">
                                <li className="font-bold">✓ Instant sync</li>
                                <li className="font-bold">✓ Sales alerts</li>
                                <li className="font-bold">✓ Automatic reports</li>
                                <li className="font-bold">✓ Real scalability</li>
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
                            Direct impact on KPIs
                        </h2>
                        <div className="space-y-8">
                            {[
                                { label: "Manual work reduction", value: "80%" },
                                { label: "Data accuracy", value: "100%" },
                                { label: "Process speed", value: "10x" }
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
                                q: "What processes can be automated?",
                                a: "Any flow involving data input via chat and output to an external system (CRM, Sheets, ERP, Email)."
                            },
                            {
                                q: "Is it secure for my data?",
                                a: "Absolutely. We use end-to-end encryption and comply with official API security standards."
                            },
                            {
                                q: "How long does implementation take?",
                                a: "Depending on complexity, a standard flow can be ready in less than 7 business days."
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
                        Scale your operations today
                    </h2>
                    <p className="text-xl text-fuchsia-100 mb-12">
                        Stop wasting time on manual processes and start truly growing.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href={`${base}/contact`} className="px-12 py-5 bg-white text-fuchsia-600 rounded-full font-black text-lg shadow-2xl hover:bg-violet-50 hover:scale-105 transition-all">
                            LET'S TALK ABOUT YOUR PROJECT
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
