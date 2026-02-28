import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
    const { locale: raw } = await params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Atención al Cliente 24/7 con IA - EiryBot" : "24/7 AI Customer Support - EiryBot",
        description: locale === "es"
            ? "Ofrece una experiencia de cliente excepcional sin interrupciones. Respuestas inmediatas a cualquier hora."
            : "Offer an exceptional client experience without interruptions. Immediate responses at any time.",
        locale,
        path: locale === "es" ? "/atencion-cliente-24-7" : "/24-7-customer-support",
    });
}

export default async function SupportPillar({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const t = getDict(locale);
    const base = `/${locale}`;

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="py-24 px-4 bg-gradient-to-b from-white to-violet-50">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-fuchsia-600 font-bold tracking-widest uppercase text-sm">{locale === "es" ? "Disponibilidad Total" : "Total Availability"}</span>
                    <h1 className="mt-4 text-5xl md:text-7xl font-black text-violet-900 mb-8 leading-tight">
                        {locale === "es" ? "Atención al Cliente" : "Customer Support"} <br /><span className="text-violet-600">24 / 7 / 365</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-600 italic">
                        {locale === "es"
                            ? "Porque tus clientes no duermen, nosotros tampoco."
                            : "Because your customers don't sleep, we don't either."}
                    </p>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link href={`${base}/contact`} className="px-8 py-4 bg-violet-700 text-white rounded-full font-bold shadow-xl hover:bg-violet-800 transition">
                            {locale === "es" ? "Activar 24/7" : "Activate 24/7"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* CORE VALUE */}
            <section className="py-20 px-4 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold text-violet-900 mb-6">{locale === "es" ? "Reduce la fricción, aumenta la lealtad" : "Reduce friction, increase loyalty"}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {locale === "es"
                                ? "El 70% de los clientes prefieren respuestas rápidas a respuestas perfectas. EiryBot entrega ambas al instante, eliminando los cuellos de botella."
                                : "70% of customers prefer fast answers over perfect ones. EiryBot delivers both instantly, eliminating bottlenecks."}
                        </p>
                        <ul className="space-y-4">
                            {["Handoff humano impecable", "Escalabilidad ilimitada", "Multilenguaje nativo", "Empatía artificial"].map((p, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-violet-800">
                                    <div className="h-2 w-2 rounded-full bg-fuchsia-500" /> {locale === "es" ? p : "Native feature"}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-violet-900 flex items-center justify-center p-12 text-white shadow-2xl">
                            <div className="text-center">
                                <div className="text-6xl font-bold mb-4">0s</div>
                                <p className="text-violet-200">{locale === "es" ? "Tiempos de espera promedio" : "Average wait times"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-20 px-4 bg-violet-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">{locale === "es" ? "¿Cansado de los tickets pendientes?" : "Tired of pending tickets?"}</h2>
                    <p className="mb-10 text-violet-100">{locale === "es" ? "Transforma tu soporte hoy mismo." : "Transform your support today."}</p>
                    <Link href={`${base}/contact`} className="px-12 py-5 bg-fuchsia-600 rounded-full font-black text-white hover:bg-fuchsia-500 transition shadow-fuchsia-600/20 shadow-lg">
                        {locale === "es" ? "CONFIGURAR AHORA" : "SETUP NOW"}
                    </Link>
                </div>
            </section>
        </div>
    );
}
