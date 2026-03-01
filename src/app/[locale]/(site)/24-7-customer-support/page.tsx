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
        title: locale === "es" ? "Atención al Cliente 24/7 con IA: Respuestas al Instante - EiryBot" : "24/7 AI Customer Support: Instant Responses - EiryBot",
        description: locale === "es"
            ? "No hagas esperar a tus clientes. Implementa soporte 24/7 con inteligencia artificial que resuelve dudas y escala a humanos solo cuando es necesario."
            : "Don't keep your customers waiting. Implement 24/7 AI support that resolves doubts and scales to humans only when necessary.",
        locale,
        pathEs: "/atencion-cliente-24-7",
        pathEn: "/24-7-customer-support",
    });
}

export default async function SupportPillarEN({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;

    // SEO Redirection for localized slugs
    if (locale === "es") {
        redirect("/es/atencion-cliente-24-7");
    }

    const t = getDict(locale);
    const base = `/${locale}`;

    return (
        <div className="bg-white overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-br from-fuchsia-50 via-white to-violet-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-fuchsia-600 uppercase bg-fuchsia-100 rounded-full">
                            Total Availability
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-violet-900 leading-[1.1] mb-6">
                            24/7 Customer Support <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-violet-600">
                                without growing your team
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            Because your customers don't sleep, we don't either. EiryBot delivers immediate responses at any time, eliminating bottlenecks.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`${base}/contact`} className="px-8 py-5 bg-violet-700 text-white rounded-full font-bold shadow-xl shadow-violet-700/20 hover:bg-violet-600 hover:-translate-y-1 transition-all duration-300">
                                Activate now
                            </Link>
                            <Link href={`${base}/about`} className="px-8 py-5 bg-white text-violet-900 border border-violet-100 rounded-full font-bold shadow-sm hover:bg-violet-50 transition-all">
                                About us
                            </Link>
                        </div>
                    </div>
                    <div className="relative animate-fade-in delay-200">
                        <FloatingMascot src="/robot4.png" alt="EiryBot Support Mascot" />
                    </div>
                </div>
            </section>

            {/* CORE VALUE */}
            <PillarSection bg="white">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Human Handoff"
                        description="Seamless transfer to your real agents when the query requires human empathy or complexity."
                        icon="/MASCOTA-EIRYBOT_2.png"
                    />
                    <FeatureCard
                        title="Scalability"
                        description="Support 1 or 10,000 customers simultaneously without degrading service quality."
                        icon="/MASCOTA-EIRYBOT_1.png"
                    />
                    <FeatureCard
                        title="Multi-language"
                        description="Speak your customers' language natively, breaking geographic barriers."
                        icon="/MASCOTA-EIRYBOT_3.png"
                    />
                </div>
            </PillarSection>

            {/* MÉTRICA DESTACADA */}
            <PillarSection bg="gray">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="aspect-square rounded-[3rem] bg-violet-900 flex items-center justify-center p-12 text-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                            <div className="text-center">
                                <div className="text-8xl font-black mb-4 text-fuchsia-400">0s</div>
                                <p className="text-violet-200 text-xl font-bold uppercase tracking-widest leading-tight">
                                    Waiting times
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-violet-900 mb-6">
                            Speed is the new loyalty
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            70% of customers prefer a fast answer over a perfect one. EiryBot allows you to give both instantly.
                        </p>
                        <ul className="space-y-4">
                            {[
                                { es: "Resolución en el primer contacto", en: "First-contact resolution" },
                                { es: "Disponibilidad festivos y noches", en: "Holiday and night availability" },
                                { es: "Reducción de fatiga del equipo", en: "Team fatigue reduction" }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-bold text-violet-800">
                                    <span className="text-fuchsia-500">✓</span> {item.en}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </PillarSection>

            {/* CASOS DE USO */}
            <PillarSection bg="white">
                <h2 className="text-3xl md:text-5xl font-black text-center text-violet-900 mb-16">
                    Who uses our support?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { t: "Retail", d: "Order status and returns." },
                        { t: "SaaS Software", d: "Basic technical query resolution." },
                        { t: "Travel", d: "Check-ins and booking changes." },
                        { t: "Banking", d: "Balance queries and locks." }
                    ].map((caseItem, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-violet-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-violet-100">
                            <h4 className="font-black text-violet-900 mb-2">{caseItem.t}</h4>
                            <p className="text-sm text-gray-600">{caseItem.d}</p>
                        </div>
                    ))}
                </div>
            </PillarSection>

            {/* FAQ */}
            <PillarSection bg="gray">
                <h2 className="text-3xl md:text-5xl font-black text-center text-violet-900 mb-16">FAQ</h2>
                <FAQAccordion items={[
                    {
                        q: "How does the human handoff work?",
                        a: "When the bot detects a complex query or the customer requests an agent, the system notifies your team via dashboard or Slack, sending the full chat context."
                    },
                    {
                        q: "Can you train it in multiple languages?",
                        a: "Yes, the AI is polyglot by nature. We can configure it to detect the customer's language and respond accordingly."
                    },
                    {
                        q: "Do you measure customer satisfaction?",
                        a: "Yes, we include automatic CSAT surveys at the end of each session so you can measure the real impact."
                    }
                ]} locale={locale} />
            </PillarSection>

            {/* FINAL CTA */}
            <section className="py-24 px-4 bg-violet-900 relative overflow-hidden text-center">
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-fuchsia-600/20 blur-[130px] rounded-full" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        Tired of pending tickets?
                    </h2>
                    <p className="text-xl text-violet-100 mb-12">
                        Transform your support today and give your customers the immediacy they deserve.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href={`${base}/contact`} className="px-12 py-5 bg-fuchsia-600 text-white rounded-full font-black text-lg shadow-2xl shadow-fuchsia-600/30 hover:bg-fuchsia-50 hover:scale-105 transition-all">
                            SETUP NOW
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
