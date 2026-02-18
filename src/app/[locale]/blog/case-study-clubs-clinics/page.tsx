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
            ? "Caso de Estudio: Cómo Clubs y Clínicas Escalaron con IA (Resultados Reales)"
            : "Case Study: How Clubs and Clinics Scaled with AI (Real Results)",
        description: locale === "es"
            ? "Datos reales de Open Park y Eurolab: 100% de automatización y más de 200k cupones entregados sin intervención humana."
            : "Real data from Open Park and Eurolab: 100% automation and over 200k coupons delivered without human intervention.",
        locale,
        path: "/blog/case-study-clubs-clinics",
    });
}

export default async function BlogPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Article */}
            <header className="bg-violet-50/50 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-violet-700 uppercase bg-violet-100 rounded-full">
                        {isEs ? "Casos de Éxito" : "Success Stories"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {isEs
                            ? "De 'Desbordados' a 'Automatizados': La Historia de Open Park y Eurolab"
                            : "From 'Overwhelmed' to 'Automated': The Story of Open Park and Eurolab"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {isEs
                            ? "¿Es posible atender a 10,000 personas sin contratar más personal? La respuesta corta: Sí. La respuesta larga: Sigue leyendo."
                            : "Is it possible to serve 10,000 people without hiring more staff? Short answer: Yes. Long answer: Keep reading."}
                    </p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Content */}
                <div className="prose prose-lg prose-violet mx-auto text-gray-700">
                    <p className="lead text-xl font-medium text-gray-900 mb-8">
                        {isEs
                            ? "En el mundo de los negocios físicos (Gimnasios, Laboratorios, Clínicas), el volumen de consultas por WhatsApp puede volverse inmanejable muy rápido. Aquí es donde entra la IA."
                            : "In the world of physical businesses (Gyms, Labs, Clinics), WhatsApp query volume can become unmanageable very quickly. This is where AI comes in."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Caso #1: Open Park (Wellness & Fitness)</h2>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="/images/openpark.png" alt="Open Park" width={60} height={60} className="rounded-full bg-gray-50 p-1" />
                            <div>
                                <h3 className="text-lg font-bold m-0">El Desafío</h3>
                                <p className="text-sm text-gray-500 m-0">Buenos Aires, Argentina</p>
                            </div>
                        </div>
                        <p>
                            {isEs
                                ? "Open Park recibía cientos de consultas diarias: precios, horarios, clases. Su equipo de ventas pasaba el 70% del tiempo respondiendo lo mismo en lugar de cerrar ventas de membresías."
                                : "Open Park received hundreds of daily inquiries: prices, schedules, classes. Their sales team spent 70% of their time answering the same things instead of closing memberships."}
                        </p>
                        <div className="mt-4 p-4 bg-violet-50 rounded-xl border-l-4 border-violet-500">
                            <strong>{isEs ? "Resultado con EiryBot:" : "Result with EiryBot:"}</strong>
                            <ul className="m-0 mt-2 pl-4 list-disc text-sm">
                                <li>{isEs ? "⚡ Gestión 100% Automática de consultas de rutina." : "⚡ 100% Automated routine query management."}</li>
                                <li>{isEs ? "🔄 Derivación automática de leads calificados al CRM." : "🔄 Automatic routing of qualified leads to CRM."}</li>
                                <li>{isEs ? "🟢 Flujo continuo 24/7 sin intervención humana." : "🟢 Continuous 24/7 flow without human intervention."}</li>
                            </ul>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Caso #2: Eurolab (Salud & Farma)</h2>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="/images/eurolab.png" alt="Eurolab" width={60} height={60} className="rounded-full bg-gray-50 p-1" />
                            <div>
                                <h3 className="text-lg font-bold m-0">El Desafío</h3>
                                <p className="text-sm text-gray-500 m-0">Laboratorio Internacional</p>
                            </div>
                        </div>
                        <p>
                            {isEs
                                ? "Necesitaban distribuir una campaña masiva de descuentos en farmacias. Hacerlo manualmente por WhatsApp era imposible dada la escala."
                                : "They needed to distribute a massive pharmacy discount campaign. Doing it manually via WhatsApp was impossible given the scale."}
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                            <strong>{isEs ? "Resultado con EiryBot:" : "Result with EiryBot:"}</strong>
                            <ul className="m-0 mt-2 pl-4 list-disc text-sm">
                                <li>{isEs ? "🎟️ +200,000 Cupones entregados automáticamente." : "🎟️ +200,000 Coupons delivered automatically."}</li>
                                <li>{isEs ? "✅ Validación de identidad única por usuario." : "✅ Unique identity validation per user."}</li>
                                <li>{isEs ? "📈 Tasa de canje superior a campañas de email tradicionales." : "📈 Redemption rate superior to traditional email campaigns."}</li>
                            </ul>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                        {isEs ? "¿Qué tienen en común?" : "What do they have in common?"}
                    </h2>
                    <p>
                        {isEs
                            ? "Ambos entendieron que la velocidad de respuesta es clave. No se trata de reemplazar a los humanos, sino de liberarlos para que hagan trabajo de alto valor (cerrar ventas, atender casos complejos)."
                            : "Both understood that speed to lead is key. It's not about replacing humans, but freeing them to do high-value work (closing sales, handling complex cases)."}
                    </p>

                    <div className="my-10 p-8 bg-gradient-to-br from-violet-900 to-indigo-900 rounded-3xl text-center text-white shadow-xl">
                        <h3 className="text-2xl font-bold mb-4">
                            {isEs ? "¿Quieres resultados así en tu negocio?" : "Want results like these in your business?"}
                        </h3>
                        <p className="text-violet-100 mb-6 max-w-lg mx-auto">
                            {isEs
                                ? "No importa si eres una clínica, un gimnasio o una inmobiliaria. La automatización es el siguiente paso lógico."
                                : "It doesn't matter if you're a clinic, a gym, or real estate. Automation is the next logical step."}
                        </p>
                        <Link
                            href="https://demo.eirybot.com" target="_blank"
                            className="inline-block bg-white text-violet-900 font-bold py-3 px-8 rounded-full hover:bg-violet-50 transition shadow-lg transform hover:scale-105"
                        >
                            {isEs ? "PROBAR DEMO GRATIS" : "TRY FREE DEMO"}
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {isEs ? "Conclusión" : "Conclusion"}
                    </h2>
                    <p>
                        {isEs
                            ? "La tecnología ya está aquí. La pregunta es: ¿vas a usarla para escalar o vas a dejar que tu competencia lo haga primero? EiryBot no es solo un chat, es tu mejor empleado digital."
                            : "The technology is already here. The question is: are you going to use it to scale or let your competition do it first? EiryBot isn't just a chat, it's your best digital employee."}
                    </p>

                    {/* Lead Magnet Integration */}
                    <LeadMagnet locale={locale} />

                </div>
            </div>
        </article>
    );
}
