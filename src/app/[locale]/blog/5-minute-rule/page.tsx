import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import LeadMagnet from "@/components/lead-magnet";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es"
            ? "La Regla de los 5 Minutos: Por Qué Pierdes el 80% de tus Ventas"
            : "The 5-Minute Rule: Why You Lose 80% of Your Sales",
        description: locale === "es"
            ? "Estadísticas brutales: si no respondes en 5 minutos, tu lead se enfría. Aprende a solucionar esto automáticamente."
            : "Brutal stats: if you don't reply in 5 minutes, your lead goes cold. Learn how to fix this automatically.",
        locale,
        path: "/blog/5-minute-rule",
    });
}

export default async function BlogPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";

    return (
        <article className="min-h-screen bg-white">
            <header className="bg-orange-50/50 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-700 uppercase bg-orange-100 rounded-full">
                        {isEs ? "Ventas & Conversión" : "Sales & Conversion"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {isEs
                            ? "La Regla de los 5 Minutos: O Respondes Ahora o Pierdes Dinero"
                            : "The 5-Minute Rule: Reply Now or Lose Money"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {isEs
                            ? "El cliente moderno es impaciente. Si tardas una hora en contestar, ya compró en otro lado. Aquí están los datos."
                            : "The modern customer is impatient. If you take an hour to reply, they've already bought elsewhere. Here are the facts."}
                    </p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="prose prose-lg prose-orange mx-auto text-gray-700">
                    <p className="lead text-xl font-medium text-gray-900 mb-8">
                        {isEs
                            ? "Imagina que entras a una tienda física, preguntas el precio de algo y el vendedor se queda mirándote en silencio por 4 horas. ¿Te quedarías? No. Te irías."
                            : "Imagine walking into a physical store, asking for a price, and the salesperson stares at you in silence for 4 hours. Would you stay? No. You'd leave."}
                    </p>
                    <p>
                        {isEs
                            ? "Eso es exactamente lo que haces cuando tardas en responder un WhatsApp. En internet, la inmediatez no es un lujo, es la norma."
                            : "That is exactly what you do when you take too long to reply to a WhatsApp. On the internet, immediacy is not a luxury, it's the norm."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">El Dato que Duele (Fuente: Harvard Business Review)</h2>
                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg my-6">
                        <p className="text-xl md:text-2xl font-bold text-center leading-relaxed">
                            "{isEs
                                ? "Las empresas que contactan a un lead en los primeros 5 minutos tienen 100 veces más probabilidades de calificarlo que las que tardan 30 minutos."
                                : "Companies that contact a lead within the first 5 minutes are 100x more likely to qualify them than those who take 30 minutes."}"
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Por qué fallamos</h2>
                    <p>
                        {isEs
                            ? "No es culpa tuya. Es físicamente imposible estar pegado al teléfono 24/7. Tienes que dormir, comer y... bueno, trabajar."
                            : "It's not your fault. It's physically impossible to be glued to your phone 24/7. You have to sleep, eat, and... well, work."}
                    </p>
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>{isEs ? "Horario Laboral:" : "Business Hours:"}</strong> {isEs ? "El 40% de las consultas llegan fuera de hora." : "40% of queries come after hours."}</li>
                        <li><strong>{isEs ? "Volumen:" : "Volume:"}</strong> {isEs ? "Cuando tienes 50 chats abiertos, alguno se te escapa." : "When you have 50 open chats, some slip through."}</li>
                        <li><strong>{isEs ? "Fatiga:" : "Fatigue:"}</strong> {isEs ? "Responder lo mismo 100 veces cansa." : "Answering the same thing 100 times is tiring."}</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">La Solución Automática</h2>
                    <p>
                        {isEs
                            ? "Aquí es donde EiryBot cambia el juego. No necesitas contratar a tres personas para cubrir turnos rotativos. Necesitas un agente de IA que:"
                            : "This is where EiryBot changes the game. You don't need to hire three people for rotating shifts. You need an AI agent that:"}
                    </p>
                    <ol className="list-decimal pl-4 space-y-2 font-medium text-gray-900">
                        <li>{isEs ? "Responda en < 5 segundos (Literalmente)." : "Replies in < 5 seconds (Literally)."}</li>
                        <li>{isEs ? "Nunca duerma (24/7 real)." : "Never sleeps (True 24/7)."}</li>
                        <li>{isEs ? "Hable con empatía y personalidad (nada de 'Hola, soy un robot')." : "Speaks with empathy and personality (no 'Hello, I am a robot')."}</li>
                    </ol>

                    <div className="my-10 text-center">
                        <p className="font-bold text-lg mb-4">
                            {isEs ? "¿Estás listo para dejar de perder ventas nocturnas?" : "Ready to stop losing overnight sales?"}
                        </p>
                        <Link
                            href="https://demo.eirybot.com" target="_blank"
                            className="inline-block bg-orange-600 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition shadow-lg"
                        >
                            {isEs ? "SOLUCIONAR ESTO AHORA" : "FIX THIS NOW"}
                        </Link>
                    </div>

                    <LeadMagnet locale={locale} />
                </div>
            </div>
        </article>
    );
}
