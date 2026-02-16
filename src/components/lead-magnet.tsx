"use client";

import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { colWebLeads, colErrorLog } from "@/lib/paths";

type Props = {
    locale: "es" | "en";
};

export default function LeadMagnet({ locale }: Props) {
    const isEs = locale === "es";
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            await addDoc(colWebLeads(), {
                email: email.trim().toLowerCase(),
                nombre: name.trim(),
                source: "lead_magnet_whatsapp_guide",
                locale,
                url: typeof window !== "undefined" ? window.location.href : "",
                createdAt: serverTimestamp(),
                // Default values for required fields in existing logic
                telefono: "",
                rubro: "",
                consentimiento: "Lead Magnet Download",
            });
            setSuccess(true);
            // Here you would typically trigger the download or redirect
        } catch (err: any) {
            console.error(err);
            setError(true);
            try {
                await addDoc(colErrorLog(), {
                    message: err?.message,
                    context: "lead_magnet",
                    createdAt: serverTimestamp(),
                });
            } catch { }
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center my-12">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {isEs ? "¡Gracias por suscribirte!" : "Thanks for subscribing!"}
                </h3>
                <p className="text-green-700 mb-6">
                    {isEs
                        ? "Hemos enviado la guía a tu correo electrónico."
                        : "We have sent the guide to your email address."}
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-green-800 font-semibold underline hover:text-green-900"
                >
                    {isEs ? "Descargar otra vez" : "Download again"}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-violet-900 via-fuchsia-900 to-violet-900 rounded-3xl p-8 md:p-12 text-white my-16 shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <span className="inline-block bg-fuchsia-500/20 text-fuchsia-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                        {isEs ? "Recurso Gratuito" : "Free Resource"}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        {isEs
                            ? "Descarga la Checklist de Automatización 2026"
                            : "Download the 2026 Automation Checklist"}
                    </h3>
                    <p className="text-violet-200 text-lg mb-6">
                        {isEs
                            ? "No empieces desde cero. Obtén la lista exacta de respuestas automáticas que usamos para cerrar ventas."
                            : "Don't start from scratch. Get the exact list of automated replies we use to close sales."}
                    </p>
                    <ul className="space-y-3 mb-2">
                        {[
                            isEs ? "Plantillas de bienvenida" : "Welcome templates",
                            isEs ? "Manejo de objeciones de precio" : "Price objection handling",
                            isEs ? "Seguimiento automático" : "Automatic follow-up"
                        ].map(item => (
                            <li key={item} className="flex items-center gap-2 text-violet-100">
                                <span className="bg-green-500/20 text-green-400 rounded-full p-0.5">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-violet-100 mb-1 pl-1">
                                {isEs ? "Tu Nombre" : "Your Name"}
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={isEs ? "Ej: Juan Pérez" : "Ex: John Doe"}
                                className="w-full rounded-xl border-none bg-white/10 py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-violet-100 mb-1 pl-1">
                                {isEs ? "Tu Mejor Correo" : "Your Best Email"}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full rounded-xl border-none bg-white/10 py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-fuchsia-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                isEs ? "DESCARGAR GRATIS →" : "DOWNLOAD FREE →"
                            )}
                        </button>
                        <p className="text-xs text-center text-violet-300 mt-2">
                            {isEs
                                ? "🔒 Tus datos están 100% seguros. Cero spam."
                                : "🔒 Your data is 100% secure. Zero spam."}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
