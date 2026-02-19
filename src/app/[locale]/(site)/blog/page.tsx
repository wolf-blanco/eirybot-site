import Link from "next/link";
import Image from "next/image";
import { getDict, type Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(props: any): Promise<import("next").Metadata> {
  const { locale: raw } = await props.params;
  const locale = raw === "en" ? "en" : "es";

  return constructMetadata({
    title: locale === "es" ? "Blog de Automatización y Ventas - EiryBot" : "Automation & Sales Blog - EiryBot",
    description: locale === "es"
      ? "Aprende estrategias de automatización, ventas por WhatsApp y CRM para crecer tu negocio."
      : "Learn automation strategies, WhatsApp sales and CRM tips to grow your business.",
    locale,
    path: "/blog",
  });
}

export default async function BlogIndexPage(props: any) {
  const { locale: raw } = await props.params;
  const locale = (raw === "en" ? "en" : "es") as Locale;

  const posts = [
    {
      slug: "case-study-clubs-clinics",
      title: locale === "es"
        ? "Caso de Estudio: Cómo Clubs y Clínicas Escalaron con IA"
        : "Case Study: How Clubs and Clinics Scaled with AI",
      excerpt: locale === "es"
        ? "Datos reales de Open Park y Eurolab: 100% de automatización y más de 200k cupones entregados sin intervención humana."
        : "Real data from Open Park and Eurolab: 100% automation and over 200k coupons delivered without human intervention.",
      date: "2026-02-17",
      image: "/images/openpark.png",
      readTime: locale === "es" ? "6 min lectura" : "6 min read"
    },
    {
      slug: "5-minute-rule",
      title: locale === "es"
        ? "La Regla de los 5 Minutos: Por Qué Pierdes el 80% de tus Ventas"
        : "The 5-Minute Rule: Why You Lose 80% of Your Sales",
      excerpt: locale === "es"
        ? "Estadísticas brutales: si no respondes en 5 minutos, tu lead se enfría. Aprende a solucionar esto automáticamente."
        : "Brutal stats: if you don't reply in 5 minutes, your lead goes cold. Learn how to fix this automatically.",
      date: "2026-02-17",
      image: "/robot3.png",
      readTime: locale === "es" ? "4 min lectura" : "4 min read"
    },
    {
      slug: "chatbots-vs-agents",
      title: locale === "es"
        ? "Chatbots vs Agentes de IA: ¿Cuál es la Diferencia Real?"
        : "Chatbots vs AI Agents: What is the Real Difference?",
      excerpt: locale === "es"
        ? "Olvída los 'Menú de Botones'. Descubre por qué los Agentes de IA (como EiryBot) venden más y frustran menos."
        : "Forget 'Button Menus'. Discover why AI Agents (like EiryBot) sell more and frustrate less.",
      date: "2026-02-17",
      image: "/robot5.png",
      readTime: locale === "es" ? "5 min lectura" : "5 min read"
    },
    {
      slug: "whatsapp-automation-guide",
      title: locale === "es"
        ? "Guía Completa: Automatizar Ventas en WhatsApp (2026)"
        : "Complete Guide: Automating WhatsApp Sales (2026)",
      excerpt: locale === "es"
        ? "Descubre cómo dejar de perder clientes por no responder a tiempo. Estrategias probadas para clínicas, inmobiliarias y servicios."
        : "Discover how to stop losing customers by not replying on time. Proven strategies for clinics, real estate and services.",
      date: "2026-02-15",
      image: "/robot4.png",
      readTime: locale === "es" ? "5 min lectura" : "5 min read"
    },
    {
      slug: "sales-mistakes",
      title: locale === "es"
        ? "5 Errores Estúpidos que Matan tus Ventas en WhatsApp"
        : "5 Stupid Mistakes That Kill Your WhatsApp Sales",
      excerpt: locale === "es"
        ? "¿Trabajas mucho pero cierras poco? Descubre por qué el 'Saludo Robot' y los textos largos están matando tu negocio."
        : "Work hard but close little? Discover why 'Robot Greetings' and long texts are killing your business.",
      date: "2026-02-16",
      image: "/robot5.png",
      readTime: locale === "es" ? "4 min lectura" : "4 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-violet-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-violet-900 mb-6">
            EiryBot <span className="text-fuchsia-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {locale === "es"
              ? "Consejos prácticos para vender más y trabajar menos con Inteligencia Artificial."
              : "Practical tips to sell more and work less with Artificial Intelligence."}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="relative h-48 bg-violet-100 flex items-center justify-center p-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={200}
                  height={200}
                  className="object-contain h-full w-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-1 rounded-full uppercase tracking-wider">
                    {locale === "es" ? "Guías" : "Guides"}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition leading-tight">
                  <Link href={`/${locale}/blog/${post.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-violet-700 font-semibold text-sm group-hover:gap-2 transition-all">
                  {locale === "es" ? "Leer artículo" : "Read article"}
                  <span className="ml-1">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
