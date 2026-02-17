"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

type CaseStudy = {
    id: string;
    logo: string;
    logoWidth: number;
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
        id: "spalla",
        logo: "/logos/spalla.png",
        logoWidth: 120,
        company: "Spalla",
        location: "Argentina / Chile",
        typeEs: "Indumentaria & Retail",
        typeEn: "Retail & Fashion",
        quoteEs:
            "Logramos atender al 100% de las consultas fuera de horario y recuperar el 40% de los carritos abandonados automáticamente.",
        quoteEn:
            "We managed to answer 100% of after-hours inquiries and recover 40% of abandoned carts automatically.",
        statEs: "+40% Recupero de carritos",
        statEn: "+40% Cart recovery",
        color: "bg-fuchsia-50",
    },
    {
        id: "openpark",
        logo: "/logos/open_park.png",
        logoWidth: 140,
        company: "Open Park",
        location: "Buenos Aires",
        typeEs: "Clubes & Wellness",
        typeEn: "Clubs & Wellness",
        quoteEs:
            "La gestión de socios y reservas se simplificó drásticamente. El bot resuelve dudas frecuentes liberando a la recepción.",
        quoteEn:
            "Member management and bookings were drastically simplified. The bot resolves FAQs, freeing up the front desk.",
        statEs: "-70% Consultas repetitivas",
        statEn: "-70% Repetitive queries",
        color: "bg-violet-50",
    },
    {
        id: "eurolab",
        logo: "/logos/eurolab.png",
        logoWidth: 130,
        company: "Eurolab",
        location: "Buenos Aires",
        typeEs: "Laboratorio & Salud",
        typeEn: "Health & Labs",
        quoteEs:
            "Automatizar la entrega de resultados y turnos mejoró la experiencia del paciente y redujo el ausentismo.",
        quoteEn:
            "Automating result delivery and appointments improved patient experience and reduced absenteeism.",
        statEs: "Atención 24/7 real",
        statEn: "True 24/7 support",
        color: "bg-blue-50",
    },
];

export default function Testimonials({ locale }: { locale: Locale }) {
    const isEs = locale === "es";
    const [active, setActive] = useState(0);
    const [fade, setFade] = useState(false);

    // Auto-rotate
    useEffect(() => {
        const t = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setActive((prev) => (prev + 1) % cases.length);
                setFade(false);
            }, 300);
        }, 6000);
        return () => clearInterval(t);
    }, []);

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
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-center text-2xl font-bold text-violet-900 md:text-3xl">
                    {isEs
                        ? "Empresas que escalan con EiryBot"
                        : "Companies scaling with EiryBot"}
                </h2>

                <div className="mt-12 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:mx-auto md:max-w-5xl">
                    <div className="grid md:grid-cols-[1.2fr,1fr]">
                        {/* Left: Content */}
                        <div
                            className={`flex flex-col justify-center p-8 transition-opacity duration-300 md:p-12 ${fade ? "opacity-50" : "opacity-100"
                                }`}
                        >
                            <div className="mb-6 h-12">
                                {/* Placeholder for logo if image fails or generic text */}
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-gray-400">{c.company}</span>
                                </div>
                            </div>

                            <blockquote className="text-xl font-medium leading-relaxed text-gray-800 md:text-2xl">
                                "{isEs ? c.quoteEs : c.quoteEn}"
                            </blockquote>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-10 w-1 rounded-full bg-fuchsia-500" />
                                <div>
                                    <p className="font-semibold text-violet-900">{c.company}</p>
                                    <p className="text-sm text-gray-500">
                                        {c.location} • {isEs ? c.typeEs : c.typeEn}
                                    </p>
                                </div>
                            </div>

                            {/* Stat Badge */}
                            <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                                <span>📈 {isEs ? c.statEs : c.statEn}</span>
                            </div>
                        </div>

                        {/* Right: Visual Background (simple for now) */}
                        <div
                            className={`relative hidden min-h-[300px] items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600 p-10 md:flex ${fade ? "opacity-90" : "opacity-100"
                                }`}
                        >
                            <div className="text-center text-white">
                                <div className="text-6xl font-black opacity-20">
                                    {active + 1} / {cases.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dots / Navigation */}
                <div className="mt-8 flex justify-center gap-3">
                    {cases.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => changeActive(i)}
                            className={`h-3 w-3 rounded-full transition-all ${active === i ? "w-8 bg-violet-600" : "bg-gray-300 hover:bg-violet-300"
                                }`}
                            aria-label={`View case study ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
