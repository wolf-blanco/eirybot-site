import Link from "next/link";
import Image from "next/image";
import { getDict, type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import PillarSection from "@/components/pillar/section";
import FeatureCard from "@/components/pillar/feature-card";
import FAQAccordion from "@/components/pillar/faq-accordion";
import FloatingMascot from "@/components/pillar/floating-mascot";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
    const { locale: raw } = await params;
    const locale = raw === "en" ? "en" : "es";

    return constructMetadata({
        title: locale === "es" ? "Chatbot para WhatsApp IA: Vende y Responde 24/7 - EiryBot" : "AI WhatsApp Chatbot: Sell and Respond 24/7 - EiryBot",
        description: locale === "es"
            ? "Convierte tu WhatsApp en una máquina de ventas. Captura leads, califica prospectos y agenda citas automáticamente con inteligencia artificial."
            : "Turn your WhatsApp into a sales machine. Capture leads, qualify prospects, and book appointments automatically with AI.",
        locale,
        pathEs: "/whatsapp-chatbot",
        pathEn: "/whatsapp-chatbot",
    });
}

export default async function WhatsAppChatbotPillar({ params }: any) {
    const { locale: raw } = await params;
    const locale = (raw === "en" ? "en" : "es") as Locale;
    const t = getDict(locale);
    const base = `/${locale}`;

    return (
        <div className="bg-white overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-fuchsia-600 uppercase bg-fuchsia-100 rounded-full">
                            {locale === "es" ? "Automatización Inteligente" : "Smart Automation"}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-violet-900 leading-[1.1] mb-6">
                            {locale === "es" ? "Chatbot para WhatsApp que" : "WhatsApp Chatbot that"} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                                {locale === "es" ? "responde y vende 24/7" : "responds and sells 24/7"}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            {locale === "es"
                                ? "No permitas que tus leads se enfríen. Deja que nuestra IA califique a tus prospectos y agende reuniones mientras tú te enfocas en cerrar tratos."
                                : "Don't let your leads go cold. Let our AI qualify your prospects and book meetings while you focus on closing deals."}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`${base}/contact`} className="px-8 py-5 bg-violet-700 text-white rounded-full font-bold shadow-xl shadow-violet-700/20 hover:bg-violet-600 hover:-translate-y-1 transition-all duration-300">
                                {locale === "es" ? "Empezar ahora" : "Get started now"}
                            </Link>
                            <a href="https://scan.eirybot.com" className="px-8 py-5 bg-white text-violet-900 border border-violet-100 rounded-full font-bold shadow-sm hover:bg-violet-50 transition-all">
                                {locale === "es" ? "EiryScan Login" : "EiryScan Login"}
                            </a>
                        </div>
                    </div>
                    <div className="relative animate-fade-in delay-200">
                        <FloatingMascot src="/robot8.png" alt="EiryBot Mascot" />
                    </div>
                </div>
            </section>

            {/* QUÉ RESUELVE */}
            <PillarSection id="features" bg="white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-violet-900 mb-4">
                        {locale === "es" ? "¿Qué puedes automatizar?" : "What can you automate?"}
                    </h2>
                    <div className="w-20 h-1.5 bg-fuchsia-500 mx-auto rounded-full" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        title={locale === "es" ? "Captura de Leads" : "Lead Capture"}
                        description={locale === "es" ? "Detecta automáticamente el interés y guarda los datos de contacto sin intervención humana." : "Automatically detect interest and save contact data without human intervention."}
                        icon="/MASCOTA-EIRYBOT_1.png"
                    />
                    <FeatureCard
                        title={locale === "es" ? "Calificación 24/7" : "24/7 Qualification"}
                        description={locale === "es" ? "Filtra a los curiosos y mantén solo a los prospectos listos para comprar en tu radar." : "Filter out the curious and keep only the prospects ready to buy on your radar."}
                        icon="/MASCOTA-EIRYBOT_2.png"
                    />
                    <FeatureCard
                        title={locale === "es" ? "Derivación a Ventas" : "Sales Routing"}
                        description={locale === "es" ? "Notifica a tu equipo humano al instante cuando un lead calificado requiere atención personalizada." : "Notify your human team instantly when a qualified lead requires personalized attention."}
                        icon="/MASCOTA-EIRYBOT_3.png"
                    />
                    <FeatureCard
                        title={locale === "es" ? "Seguimientos" : "Follow-ups"}
                        description={locale === "es" ? "Envía recordatorios automáticos de citas y re-engancha a leads que dejaron de responder." : "Send automatic appointment reminders and re-engage leads who stopped responding."}
                        icon="/MASCOTA-EIRYBOT_4.png"
                    />
                </div>
            </PillarSection>

            {/* CÓMO FUNCIONA */}
            <PillarSection bg="gray">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-violet-900 mb-8 leading-tight">
                            {locale === "es" ? "De cero a automatizado en 4 simples pasos" : "From zero to automated in 4 simple steps"}
                        </h2>
                        <div className="space-y-8">
                            {[
                                { n: "01", t: locale === "es" ? "Conexión a tu línea" : "Line Connection", d: locale === "es" ? "Enlazamos tu WhatsApp Business API de forma segura." : "We securely link your WhatsApp Business API." },
                                { n: "02", t: locale === "es" ? "Entrenamiento de IA" : "AI Training", d: locale === "es" ? "Entrenamos a la IA con tu base de conocimientos y tono de marca." : "We train the AI with your knowledge base and brand tone." },
                                { n: "03", t: locale === "es" ? "Simulación de Flujos" : "Flow Simulation", d: locale === "es" ? "Probamos los escenarios comunes de tus clientes." : "We test common customer scenarios." },
                                { n: "04", t: locale === "es" ? "Lanzamiento y Optimización" : "Launch & Optimization", d: locale === "es" ? "Activamos el bot y refinamos las respuestas con data real." : "We activate the bot and refine responses with real data." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6">
                                    <span className="text-4xl font-black text-violet-200">{step.n}</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-violet-900 mb-2">{step.t}</h3>
                                        <p className="text-gray-600">{step.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-violet-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px]" />
                        <div className="text-white space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-2 text-sm text-violet-200">Preview: Lead Gen Flow</span>
                            </div>
                            <div className="p-4 bg-violet-800 rounded-2xl rounded-bl-none max-w-[80%]">
                                {locale === "es" ? "Hola! Busco información sobre el curso." : "Hi! I'm looking for info about the course."}
                            </div>
                            <div className="p-4 bg-fuchsia-600 rounded-2xl rounded-br-none ml-auto max-w-[80%] shadow-lg">
                                {locale === "es" ? "¡Hola! Con gusto. Para darte la mejor info, ¿para cuántas personas buscas el entrenamiento?" : "Hello! Gladly. To give you the best info, how many people are you looking to train?"}
                            </div>
                            <div className="p-4 bg-violet-800 rounded-2xl rounded-bl-none max-w-[80%]">
                                {locale === "es" ? "Para un equipo de 10 personas." : "For a team of 10 people."}
                            </div>
                            <div className="p-4 bg-fuchsia-600 rounded-2xl rounded-br-none ml-auto max-w-[80%] shadow-lg">
                                {locale === "es" ? "Excelente. Un equipo de ese tamaño aplica para nuestro descuento corporativo. ¿Te gustaría agendar una llamada breve mañana para explicarte los detalles?" : "Excellent. A team that size qualifies for our corporate discount. Would you like to schedule a brief call tomorrow to explain the details?"}
                            </div>
                        </div>
                    </div>
                </div>
            </PillarSection>

            {/* CASOS DE USO */}
            <PillarSection bg="white">
                <h2 className="text-3xl md:text-5xl font-black text-center text-violet-900 mb-16">
                    {locale === "es" ? "Soluciones por Industria" : "Solutions by Industry"}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group p-10 rounded-[2.5rem] bg-violet-50 hover:bg-violet-900 hover:text-white transition-all duration-500">
                        <h3 className="text-2xl font-bold mb-4">{locale === "es" ? "Inmobiliarias" : "Real Estate"}</h3>
                        <p className="opacity-80 mb-6 leading-relaxed">
                            {locale === "es"
                                ? "Califica leads según presupuesto y zona, agenda visitas a propiedades físicamente y envía fichas técnicas por PDF automáticamente."
                                : "Qualify leads by budget and area, schedule physical property visits, and send technical PDFs automatically."}
                        </p>
                        <Link href={`${base}/blog/real-estate-chatbot`} className="inline-flex items-center font-bold text-fuchsia-600 group-hover:text-fuchsia-400">
                            {locale === "es" ? "Ver caso de estudio" : "View case study"} <span className="ml-2">→</span>
                        </Link>
                    </div>
                    <div className="group p-10 rounded-[2.5rem] bg-fuchsia-50 hover:bg-violet-900 hover:text-white transition-all duration-500">
                        <h3 className="text-2xl font-bold mb-4">{locale === "es" ? "Salud y Clínicas" : "Health & Clinics"}</h3>
                        <p className="opacity-80 mb-6 leading-relaxed">
                            {locale === "es"
                                ? "Agenda citas médicas, valida seguros, envía recordatorios para reducir el ausentismo y entrega resultados de laboratorio por chat."
                                : "Schedule medical appointments, validate insurance, send reminders to reduce no-shows, and deliver lab results via chat."}
                        </p>
                        <Link href={`${base}/blog/clinic-chatbot`} className="inline-flex items-center font-bold text-fuchsia-600 group-hover:text-fuchsia-400">
                            {locale === "es" ? "Ver caso de estudio" : "View case study"} <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </PillarSection>

            {/* MÉTRICAS */}
            <PillarSection bg="violet">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-8">
                        {locale === "es" ? "Resultados directos en tu negocio" : "Direct business results"}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-5xl font-black text-fuchsia-400 mb-2">95%</div>
                            <p className="text-violet-200 text-sm font-bold uppercase tracking-widest">{locale === "es" ? "Ahorro de Tiempo" : "Time Savings"}</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-fuchsia-400 mb-2">&lt; 10s</div>
                            <p className="text-violet-200 text-sm font-bold uppercase tracking-widest">{locale === "es" ? "Tiempo Respuesta" : "Response Time"}</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-fuchsia-400 mb-2">3x</div>
                            <p className="text-violet-200 text-sm font-bold uppercase tracking-widest">{locale === "es" ? "Más Conversión" : "More Conversion"}</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-fuchsia-400 mb-2">0</div>
                            <p className="text-violet-200 text-sm font-bold uppercase tracking-widest">{locale === "es" ? "Leads Perdidos" : "Lost Leads"}</p>
                        </div>
                    </div>
                </div>
            </PillarSection>

            <PillarSection bg="white">
                <h2 className="text-3xl md:text-5xl font-black text-center text-violet-900 mb-16">FAQ</h2>
                <FAQAccordion items={[
                    {
                        q: locale === "es" ? "¿Es difícil de configurar?" : "Is it hard to set up?",
                        a: locale === "es" ? "En absoluto. Nosotros nos encargamos de toda la configuración técnica y el entrenamiento de la IA. Tú solo nos das la información de tu negocio." : "Not at all. We handle all the technical configuration and AI training. You just provide us with your business information."
                    },
                    {
                        q: locale === "es" ? "¿Funciona en cualquier WhatsApp?" : "Does it work on any WhatsApp?",
                        a: locale === "es" ? "Utilizamos la API oficial de WhatsApp Business (Cloud API), lo que garantiza mayor seguridad, escalabilidad y evita el bloqueo de tu número." : "We use the official WhatsApp Business API (Cloud API), ensuring greater security, scalability, and preventing your number from being blocked."
                    },
                    {
                        q: locale === "es" ? "¿Puede integrarse con mi CRM?" : "Can it integrate with my CRM?",
                        a: locale === "es" ? "Sí, nos conectamos vía API o Webhooks con HubSpot, Salesforce, Zoho y cualquier sistema que permita integraciones externas." : "Yes, we connect via API or Webhooks with HubSpot, Salesforce, Zoho, and any system that allows external integrations."
                    },
                    {
                        q: locale === "es" ? "¿Qué pasa si la IA no sabe la respuesta?" : "What if the AI doesn't know the answer?",
                        a: locale === "es" ? "El sistema está diseñado para detectar cuando un humano es necesario y transferir la conversación a un agente real de inmediato." : "The system is designed to detect when a human is needed and transfer the conversation to a real agent immediately."
                    }
                ]} locale={locale} />
            </PillarSection>

            {/* FINAL CTA */}
            <section className="py-24 px-4 bg-violet-900 relative overflow-hidden text-center">
                <div className="absolute -left-20 -top-20 w-96 h-96 bg-fuchsia-600/20 blur-[130px] rounded-full" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        {locale === "es" ? "¿Listo para escalar tu atención?" : "Ready to scale your support?"}
                    </h2>
                    <p className="text-xl text-violet-100 mb-12">
                        {locale === "es" ? "Únete a las empresas que ya están vendiendo más gracias a la IA." : "Join the companies already selling more thanks to AI."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href={`${base}/contact`} className="px-12 py-5 bg-fuchsia-600 text-white rounded-full font-black text-lg shadow-2xl shadow-fuchsia-600/30 hover:bg-fuchsia-500 hover:scale-105 transition-all">
                            {locale === "es" ? "PROGRAMAR DEMO GRATIS" : "SCHEDULE FREE DEMO"}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
