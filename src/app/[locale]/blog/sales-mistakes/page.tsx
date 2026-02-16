import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import LeadMagnet from "@/components/lead-magnet";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es"
            ? "5 Errores Estúpidos que Matan tus Ventas en WhatsApp (2026)"
            : "5 Stupid Mistakes That Kill Your WhatsApp Sales (2026)",
        description: locale === "es"
            ? "Descubre por qué tus clientes te dejan en visto y cómo corregirlo hoy mismo. Deja de perder dinero por mala atención."
            : "Find out why customers ghost you and how to fix it today. Stop losing money due to poor service.",
        locale,
        path: "/blog/sales-mistakes",
    });
}

export default async function BlogPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Article */}
            <header className="bg-red-50 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-red-700 uppercase bg-red-100 rounded-full">
                        {isEs ? "Ventas & Estrategia" : "Sales & Strategy"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {isEs
                            ? "5 Errores que Hacen que tus Clientes te Dejen en 'Visto'"
                            : "5 Mistakes That Make Your Customers Leave You on 'Read'"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {isEs
                            ? "¿Sientes que trabajas mucho pero cierras poco? Probablemente estás cometiendo el error #3 ahora mismo."
                            : "Feel like you work hard but close little? You're probably making mistake #3 right now."}
                    </p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Content */}
                <div className="prose prose-lg prose-red mx-auto text-gray-700">
                    <p className="lead text-xl font-medium text-gray-900 mb-8">
                        {isEs
                            ? "WhatsApp es el canal de ventas más poderoso del mundo, pero también el más peligroso. Un mal mensaje y... bloqueo."
                            : "WhatsApp is the most powerful sales channel in the world, but also the most dangerous. One bad message and... block."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Error #1: El Saludo Robot (El Malo)</h2>
                    <p>
                        {isEs
                            ? "Nada grita 'no me importas' como un mensaje automático que dice: *'Gracias por escribirnos, nuestro horario es de 9 a 5'*. Si el cliente escribe a las 5:01 PM, acabas de perder una venta."
                            : "Nothing screams 'I don't care' like an automated message saying: *'Thanks for contacting us, our hours are 9 to 5'*. If the client writes at 5:01 PM, you just lost a sale."}
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 my-4 text-sm">
                        <strong>{isEs ? "Solución:" : "Solution:"}</strong> {isEs ? "Usa IA para responder dudas básicas 24/7, no solo para dar la hora." : "Use AI to answer basic questions 24/7, not just to tell the time."}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Error #2: Enviar 'La Biblia' de Texto</h2>
                    <p>
                        {isEs
                            ? "Nadie lee párrafos de 20 líneas en el móvil. Si envías toda tu información de golpe, el cliente se abruma y no responde."
                            : "No one reads 20-line paragraphs on mobile. If you send all your info at once, the client gets overwhelmed and doesn't reply."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Error #3: No hacer seguimiento (Follow-up)</h2>
                    <p>
                        {isEs
                            ? "El 80% de las ventas requieren al menos 5 'toques'. La mayoría de los vendedores se rinden después del primero. Si no preguntas '¿qué te pareció?', no venderás."
                            : "80% of sales require at least 5 'touches'. Most salespeople give up after the first one. If you don't ask 'what did you think?', you won't sell."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Error #4: Tardar más de 5 minutos</h2>
                    <p>
                        {isEs
                            ? "La vida útil de un lead online es de 5 minutos. Después de eso, las probabilidades de contactarlo caen 10x. Tu competencia sí responde rápido."
                            : "The lifespan of an online lead is 5 minutes. After that, the odds of contacting them drop 10x. Your competition does reply fast."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Error #5: Asumir que 'Visto' es 'No'</h2>
                    <p>
                        {isEs
                            ? "A veces la gente está ocupada. Un doble check azul sin respuesta no es un rechazo, es una distracción. Vuelve a escribir mañana."
                            : "Sometimes people are busy. A blue double check with no reply isn't a rejection, it's a distraction. Write again tomorrow."}
                    </p>

                    <div className="my-10 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {isEs ? "¿Cometes estos errores?" : "Making these mistakes?"}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {isEs
                                ? "EiryBot corrige los 5 errores automáticamente. Responde en segundos, corto, persuasivo y 24/7."
                                : "EiryBot fixes all 5 mistakes automatically. Replies in seconds, short, persuasive and 24/7."}
                        </p>
                        <Link
                            href="https://demo.eirybot.com" target="_blank"
                            className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-violet-600 transition shadow-lg"
                        >
                            {isEs ? "PROBAR DEMO EN VIVO" : "TRY LIVE DEMO"}
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {isEs ? "Bonus: La Herramienta Secreta" : "Bonus: The Secret Tool"}
                    </h2>
                    <p>
                        {isEs
                            ? "Para solucionar esto necesitas sistematizar. No puedes estar pegado al teléfono todo el día."
                            : "To fix this you need to systematize. You can't be glued to the phone all day."}
                    </p>

                    {/* Lead Magnet Integration */}
                    <LeadMagnet locale={locale} />

                </div>
            </div>
        </article>
    );
}
