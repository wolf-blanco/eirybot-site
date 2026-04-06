import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import LeadMagnet from "@/components/lead-magnet";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
    const { locale: raw } = await props.params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "El costo oculto de apagar WhatsApp el fin de semana - EiryBot" : "The hidden cost of turning off WhatsApp on weekends - EiryBot",
        description: locale === "es"
            ? "Descubre cuánto dinero pierde tu empresa al no tener atención automatizada de viernes a lunes."
            : "Discover how much money your company loses by not having automated support from Friday to Monday.",
        locale,
        pathEs: "/blog/weekend-hidden-costs",
        pathEn: "/blog/weekend-hidden-costs",
    });
}

export default async function BlogPost(props: any) {
    const { locale: raw } = await props.params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const isEs = locale === "es";

    return (
        <article className="min-h-screen bg-white">
            <header className="bg-violet-50/50 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-violet-700 uppercase bg-violet-100 rounded-full">
                        {isEs ? "Estrategia Comercial" : "Business Strategy"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {isEs
                            ? "¿Cuánto dinero pierde tu empresa por apagar WhatsApp el fin de semana?"
                            : "How much money does your company lose by turning off WhatsApp on the weekend?"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {isEs
                            ? "Tus clientes buscando comprar no respetan el horario de oficina de lunes a viernes. Matemáticamente, estás perdiendo el 28% del mes."
                            : "Customers looking to buy do not respect standard Monday to Friday office hours. Mathematically, you are losing 28% of the month."}
                    </p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="prose prose-lg prose-violet mx-auto text-gray-700">
                    <p className="lead text-xl font-medium text-gray-900 mb-8">
                        {isEs
                            ? "Llega el viernes a las 6:00 PM. El equipo comercial de tu empresa cierra sus computadoras, el teléfono de atención al cliente entra boca abajo a un cajón, y todos se van a descansar. Es justo y necesario."
                            : "It's Friday at 6:00 PM. Your company's sales team closes their laptops, the customer service phone goes face down in a drawer, and everyone goes to rest. It's fair and necessary."}
                    </p>
                    <p>
                        {isEs
                            ? "Pero hay un pequeño problema: el consumidor moderno no sabe de horarios. De hecho, el sábado por la tarde y el domingo en la mañana suelen ser los momentos de mayor investigación de compra de servicios y productos B2B de alto valor."
                            : "But there's a small problem: the modern consumer knows no hours. In fact, Saturday afternoon and Sunday morning are often peak times for high-value B2B purchase research."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{isEs ? "Matemática Simple: El 28% Que Regalas" : "Simple Math: The 28% You Give Away"}</h2>
                    <p>
                        {isEs ? "Piénsalo así:" : "Think about it like this:"}
                    </p>
                    <ul className="list-disc pl-4 space-y-2">
                        <li>{isEs ? "Un mes tiene unos 30 días." : "A month has about 30 days."}</li>
                        <li>{isEs ? "8 de esos días son sábado o domingo." : "8 of those days are Saturday or Sunday."}</li>
                        <li><strong>{isEs ? "8 dividido 30 = 26.6% del tiempo." : "8 divided by 30 = 26.6% of the time."}</strong></li>
                    </ul>
                    <p>
                        {isEs 
                            ? "Esto sin siquiera sumar las horas muertas desde las 6 PM hasta las 9 AM de lunes a viernes. Dejar un mensaje en visto hasta el lunes por la mañana ya no funciona en la era de la inmediatez." 
                            : "This is without even counting the dead hours from 6 PM to 9 AM on weekdays. Leaving a message on read until Monday morning no longer works in the era of immediacy."}
                    </p>

                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg my-6">
                        <p className="text-xl font-bold text-center leading-relaxed">
                            "{isEs
                                ? "La regla es cruel, pero cierta: si no respondes tú, le responden a tu competencia."
                                : "The rule is cruel but true: if you don't answer, they text your competition."}"
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{isEs ? "¿Cuándo se cae realmente la venta?" : "When does the sale actually drop?"}</h2>
                    <p>
                        {isEs
                            ? "Imagina a un Lead calificado escribiéndote el sábado a las 2:00 PM para preguntar precios o disponibilidad. No hay respuesta. El cliente sigue su búsqueda en Google y le escribe a la competencia, quien da la casualidad que tiene un mensaje de autorespuesta o un vendedor de turno."
                            : "Imagine a qualified Lead messaging you on Saturday at 2:00 PM for pricing or availability. No answer. The client continues searching on Google and texts your competitor, who happens to have an autoresponder or an on-duty rep."}
                    </p>
                    <p>
                        {isEs 
                            ? "Para cuando llega tu equipo el Lunes a las 9:00 AM y responden 'Hola, ¿en qué podemos ayudarte?', el cliente ya compró en otro lado, o ya no tiene la misma intención de compra. Te dejan el temido doble check azul." 
                            : "By the time your team arrives Monday at 9:00 AM and replies 'Hello, how can we help?', the client has already bought elsewhere, or lost the purchasing intent. They leave you on read."}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{isEs ? "El Empleado que No Duerme" : "The Employee That Doesn't Sleep"}</h2>
                    <p>
                        {isEs
                            ? "No tienes que obligar a tus vendedores a trabajar el domingo. Esa no es la solución. La solución es poner tecnología en el frente."
                            : "You don't have to force your sales reps to work Sundays. That's not the solution. The solution is putting technology on the frontline."}
                    </p>
                    <p>
                        {isEs 
                            ? "Tener un chatbot de IA es como contratar a un recepcionista súper estrella que trabaja sábados, domingos, y de madrugada, que conoce cada aspecto de tu negocio, y cuyo único objetivo es:" 
                            : "Having an AI chatbot is like hiring a superstar receptionist who works Saturdays, Sundays, and overnight, knows every aspect of your business, and whose only goal is:"}
                    </p>

                    <ol className="list-decimal pl-4 space-y-2 font-medium text-gray-900">
                        <li>{isEs ? "Responder instantáneamente a las preguntas de ventas (Precios, ubicaciones, servicios)." : "Instantly answer sales questions (pricing, locations, services)."}</li>
                        <li>{isEs ? "Pedirle los datos claves al cliente (Email, Nombre, Presupuesto)." : "Ask for key client data (Email, Name, Budget)."}</li>
                        <li>{isEs ? "Agendar una llamada directamente en el calendario de tus vendedores para el lunes en la mañana." : "Directly book a call in your reps' calendar for Monday morning."}</li>
                    </ol>

                    <p className="mt-8 font-bold">
                        {isEs 
                            ? "El lunes, en lugar de contestar mensajes vacíos, tu equipo encuentra reuniones ya agendadas y leads calificados esperándolos." 
                            : "On Monday, instead of replying to empty messages, your team finds pre-booked meetings and qualified leads waiting for them."}
                    </p>

                    <div className="my-10 text-center">
                        <Link
                            href="https://scan.eirybot.com" target="_blank"
                            className="inline-block bg-violet-700 text-white font-bold py-4 px-8 rounded-full hover:bg-violet-800 transition shadow-lg"
                        >
                            {isEs ? "¿CÓMO FUNCIONARIA PARA MI EMPRESA?" : "HOW WOULD THIS WORK FOR MY COMPANY?"}
                        </Link>
                    </div>

                    <LeadMagnet locale={locale} />
                </div>
            </div>
        </article>
    );
}
