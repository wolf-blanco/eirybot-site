import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Deja de Perder Leads Fuera de Horario - EiryBot" : "Stop Losing Leads After Hours - EiryBot",
        description: locale === "es"
            ? "Cómo un chatbot IA puede capturar oportunidades de venta mientras tu equipo descansa."
            : "How an AI chatbot can capture sales opportunities while your team rests.",
        locale,
        pathEs: "/blog/stop-losing-leads",
        pathEn: "/blog/stop-losing-leads",
    });
}

export default async function StopLosingLeadsPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";
    const base = `/${locale}`;

    return (
        <article className="max-w-4xl mx-auto px-4 py-20 bg-white">
            <header className="mb-12 border-b border-gray-100 pb-12">
                <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-6 leading-tight">
                    {isEs ? "Cómo evitar perder leads fuera de horario (WhatsApp 24/7)" : "How to stop losing leads after hours (WhatsApp 24/7)"}
                </h1>
                <p className="text-xl text-gray-500">
                    {isEs ? "El costo de no responder al instante es más alto de lo que piensas." : "The cost of not responding instantly is higher than you think."}
                </p>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "Vender mientras duermes" : "Selling While You Sleep"}</h2>
                <p>{isEs ? "La mayoría de los leads inmobiliarios y de servicios llegan después de las 7:00 PM, cuando las personas están fuera del trabajo revisando sus redes sociales." : "Most real estate and service leads arrive after 7:00 PM, when people are off work and checking their social media."}</p>

                <p>{isEs ? "Si esperas hasta el día siguiente para responder, la intención de compra ha bajado significativamente." : "If you wait until the next day to respond, the buying intent has dropped significantly."}</p>

                <div className="my-16 p-8 bg-gradient-to-br from-violet-50 to-white rounded-[2rem] border border-violet-100 shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-violet-900 mb-4">{isEs ? "¿Tu negocio está disponible 24/7?" : "Is your business available 24/7?"}</h3>
                    <p className="mb-8">{isEs ? "Asegúrate de que ningún lead se quede sin respuesta." : "Ensure no lead goes unanswered."}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href={`${base}/atencion-cliente-24-7`} className="px-6 py-4 bg-violet-700 text-white rounded-2xl font-bold hover:bg-violet-600 transition">
                            {isEs ? "Ver Pilar: Atención 24/7" : "View Pillar: 24/7 Support"}
                        </Link>
                        <Link href={`${base}/contact`} className="px-6 py-4 bg-fuchsia-600 text-white rounded-2xl font-bold hover:bg-fuchsia-500 transition">
                            {isEs ? "Hablar con ventas" : "Talk to Sales"}
                        </Link>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-violet-800 mt-10 mb-4">{isEs ? "El efecto de la gratificación instantánea" : "The Instant Gratification Effect"}</h2>
                <p>{isEs ? "Un chatbot con IA no solo dice 'espera', sino que resuelve dudas y captura información de contacto real." : "An AI chatbot doesn't just say 'wait', it solves doubts and captures real contact info."}</p>
            </div>
        </article>
    );
}
