import Image from "next/image";
import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import LeadMagnet from "@/components/lead-magnet";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es"
            ? "Guía Completa: Automatizar Ventas en WhatsApp (2026)"
            : "Complete Guide: Automating WhatsApp Sales (2026)",
        description: locale === "es"
            ? "Aprende cómo configurar un chatbot con IA para WhatsApp que responda 24/7, califique leads y aumente tus ventas sin esfuerzo."
            : "Learn how to set up an AI chatbot for WhatsApp that replies 24/7, qualifies leads and boosts sales effortlessly.",
        locale,
        path: "/blog/whatsapp-automation-guide",
    });
}

export default async function BlogPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Article */}
            <header className="bg-violet-50 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-violet-700 uppercase bg-violet-100 rounded-full">
                        {isEs ? "Guía Definitiva 2026" : "Ultimate Guide 2026"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {isEs
                            ? "Cómo Automatizar tus Ventas en WhatsApp sin Perder el Toque Humano"
                            : "How to Automate WhatsApp Sales Without Losing the Human Touch"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {isEs
                            ? "Deja de responder las mismas preguntas 100 veces al día. Descubre cómo la IA puede convertirse en tu mejor vendedor."
                            : "Stop answering the same questions 100 times a day. Discover how AI can become your best salesperson."}
                    </p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Content */}
                <div className="prose prose-lg prose-violet mx-auto text-gray-700">
                    <p className="lead text-xl font-medium text-gray-900 mb-8">
                        {isEs
                            ? "¿Te pasa que pierdes ventas porque tardaste 2 horas en responder? ¿O te pasas el fin de semana pegado al celular contestando 'precio'?"
                            : "Do you lose sales because you took 2 hours to reply? Or do you spend your weekend glued to your phone answering 'price'?"}
                    </p>

                    <p>
                        {isEs
                            ? "No estás solo. El 70% de los clientes compran al negocio que responde primero. Pero, ¿cómo puedes ser el primero si tienes que dormir, comer o atender tu negocio?"
                            : "You are not alone. 70% of customers buy from the business that responds first. But how can you be first if you need to sleep, eat, or run your business?"}
                    </p>

                    <p>
                        {isEs
                            ? "Aquí es donde entra la **Automatización con IA para WhatsApp**. Y no, no hablamos de esos bots tontos que dicen 'Presione 1'. Hablamos de inteligencia real."
                            : "This is where **AI Automation for WhatsApp** comes in. And no, we're not talking about those dumb bots that say 'Press 1'. We're talking real intelligence."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {isEs ? "El Problema: La Velocidad lo es Todo" : "The Problem: Speed is Everything"}
                    </h2>
                    <p>
                        {isEs
                            ? "En 2026, los clientes no esperan. Si no respondes en 5 minutos, buscan a tu competencia. Pero contratar personal para cubrir 24/7 es costoso."
                            : "In 2026, customers don't wait. If you don't reply in 5 minutes, they check your competitor. But hiring staff to cover 24/7 is expensive."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {isEs ? "La Solución: Tu Agente de IA (EiryBot)" : "The Solution: Your AI Agent (EiryBot)"}
                    </h2>
                    <p>
                        {isEs
                            ? "Imagina entrenar a un empleado que:"
                            : "Imagine training an employee who:"}
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                        <li>{isEs ? "Nunca duerme." : "Never sleeps."}</li>
                        <li>{isEs ? "Conoce todo tu catálogo de memoria." : "Knows your entire catalog by heart."}</li>
                        <li>{isEs ? "Puede agendar citas en tu Google Calendar." : "Can book appointments on your Google Calendar."}</li>
                        <li>{isEs ? "Habla múltiples idiomas fluidamente." : "Speaks multiple languages fluently."}</li>
                    </ul>

                    <div className="my-10 p-6 bg-violet-50 rounded-2xl border border-violet-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="shrink-0 w-24 md:w-32">
                            <Image src="/robot4.png" alt="EiryBot" width={150} height={150} className="w-full h-auto" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-violet-900 mb-2">
                                {isEs ? "¿Listo para probarlo?" : "Ready to try it?"}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {isEs
                                    ? "EiryBot se configura en minutos y puedes probarlo gratis hoy mismo."
                                    : "EiryBot sets up in minutes and you can try it for free today."}
                            </p>
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-block bg-violet-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-violet-600 transition"
                            >
                                {isEs ? "Agendar Demo Gratis" : "Book Free Demo"}
                            </Link>
                        </div>
                    </div>

                    {/* Lead Magnet Integration */}
                    <LeadMagnet locale={locale} />

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {isEs ? "3 Pasos para Empezar Hoy" : "3 Steps to Start Today"}
                    </h2>
                    <ol className="list-decimal pl-6 space-y-4">
                        <li>
                            <strong>{isEs ? "Centraliza tu Información" : "Centralize Your Info"}</strong>:
                            {isEs ? " Reúne tus PDFs, precios y preguntas frecuentes." : " Gather your PDFs, prices and FAQs."}
                        </li>
                        <li>
                            <strong>{isEs ? "Conecta EiryBot" : "Connect EiryBot"}</strong>:
                            {isEs ? " Vincula tu WhatsApp Business con un código QR." : " Link your WhatsApp Business via QR code."}
                        </li>
                        <li>
                            <strong>{isEs ? "Observa y Optimiza" : "Watch and Optimize"}</strong>:
                            {isEs ? " Revisa las conversaciones en tu panel y mejora las respuestas." : " Review conversations in your dashboard and improve answers."}
                        </li>
                    </ol>
                </div>

                {/* Share / CTA Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                    <p className="text-lg font-medium text-gray-900 mb-6">
                        {isEs
                            ? "¿Te gustó este artículo? ¡Compártelo o empieza tu transformación hoy!"
                            : "Liked this article? Share it or start your transformation today!"}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href={`/${locale}/services`}
                            className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition"
                        >
                            {isEs ? "Ver Servicios" : "View Services"}
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="bg-violet-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-violet-600 hover:shadow-xl transition"
                        >
                            {isEs ? "Contactar Ventas" : "Contact Sales"}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
