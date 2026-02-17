"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

type CaseStudy = {
    id: string;
    logo: string;
    company: string;
    location: string;
    typeEs: string;
    typeEn: string;
    quoteEs: string;
    quoteEn: string;
    statEs: string;
    statEn: string;
    color: string;
};

const cases: CaseStudy[] = [
    {
        id: "openpark",
        logo: "/images/openpark.png",
        company: "Open Park",
        location: "Buenos Aires",
        typeEs: "Parques & Gimnasios",
        typeEn: "Parks & Wellness",
        quoteEs:
            "EiryBot captura y estructura los datos de cada consulta, derivando automáticamente el lead al CRM. Logramos un flujo continuo sin registros manuales.",
        quoteEn:
            "EiryBot captures and structures data from every query, automatically routing leads to our CRM. We achieved a continuous flow without manual data entry.",
        statEs: "⚡ Gestión 100% Automática",
        statEn: "⚡ 100% Automated Workflow",
        color: "bg-violet-50 text-violet-700 border-violet-100 ring-violet-200",
    },
    {
        id: "eurolab",
        logo: "/images/eurolab.png",
        company: "Eurolab",
        location: "Argentina",
        typeEs: "Laboratorio & Farma",
        typeEn: "Health & Pharma",
        quoteEs:
            "Entregamos más de 200.000 cupones por WhatsApp, asegurando que cada uno quedara asociado a una persona para su canje en farmacia.",
        quoteEn:
            "We delivered over 200,000 coupons via WhatsApp, ensuring each one was uniquely linked to a verified person for pharmacy redemption.",
        statEs: "🎟️ +200k Cupones Entregados",
        statEn: "🎟️ +200k Coupons Delivered",
        color: "bg-blue-50 text-blue-700 border-blue-100 ring-blue-200",
    },
    {
        id: "spalla",
        logo: "/images/spalla.png",
        company: "Spalla",
        location: "Argentina",
        typeEs: "Inmobiliaria",
        typeEn: "Real Estate",
        quoteEs:
            "Mirando el tablero en tiempo real descubrí un error crítico de presupuesto en una campaña el mismo día. Me vino 10 puntos para evitar pérdidas.",
        quoteEn:
            "Watching the real-time dashboard, I caught a critical budget error in a campaign on the very same day. It was perfect for preventing losses.",
        statEs: "📊 Control de Inversión",
        statEn: "📊 Investment Control",
        color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 ring-fuchsia-200",
    },
];

export default function Testimonials({ locale }: { locale: Locale }) {
    const isEs = locale === "es";
    const [active, setActive] = useState(0);
    const [fade, setFade] = useState(false);

    // Auto-rotate
    useEffect(() => {
        const t = setInterval(() => {
            changeActive((active + 1) % cases.length);
        }, 8000);
        return () => clearInterval(t);
    }, [active]);

    const changeActive = (idx: number) => {
        if (idx === active) return;
        setFade(true);
        setTimeout(() => {
            setActive(idx);
            setFade(false);
        }, 300);
    };

    const c = cases[active];

    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-4xl px-4">

                {/* Title style matching Home Hero */}
                <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl text-gray-900">
                    {isEs ? "Resultados que" : "Results that"}{" "}
                    <span className="bg-gradient-to-r from-fuchsia-600 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
                        {isEs ? "escalan tu negocio" : "scale your business"}
                    </span>
                </h2>

                <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white p-8 shadow-xl shadow-violet-900/5 md:p-12">

                    {/* Subtle gradient background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-violet-50/30 opacity-60" />

                    {/* Quote Icon */}
                    <div className="pointer-events-none absolute right-6 top-4 text-8xl leading-none text-violet-100 opacity-60 font-serif">
                        ”
                    </div>

                    <div
                        className={`relative z-10 flex flex-col items-center text-center transition-all duration-300 transform ${fade ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                            }`}
                    >
                        {/* Logo */}
                        <div className="relative mb-6 h-16 w-32 grayscale transition-all duration-500 hover:grayscale-0">
                            <Image
                                src={c.logo}
                                alt={c.company}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Info */}
                        <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
                                {isEs ? c.typeEs : c.typeEn} — {c.location}
                            </p>
                        </div>

                        {/* Quote */}
                        <blockquote className="max-w-2xl text-xl font-medium leading-relaxed text-gray-700 md:text-2xl">
                            "{isEs ? c.quoteEs : c.quoteEn}"
                        </blockquote>

                        {/* Stat Badge */}
                        <div className={`mt-8 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-bold shadow-sm ${c.color} ring-1`}>
                            {isEs ? c.statEs : c.statEn}
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="mt-10 flex justify-center gap-2.5">
                        {cases.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => changeActive(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-8 bg-gradient-to-r from-violet-600 to-fuchsia-600" : "w-2 bg-gray-200 hover:bg-violet-300"
                                    }`}
                                aria-label={`View case ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
