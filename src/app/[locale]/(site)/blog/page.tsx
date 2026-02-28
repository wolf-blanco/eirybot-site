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
  const isEs = locale === "es";

  const posts = [
    {
      slug: "case-study-clubs-clinics",
      category: isEs ? "Casos" : "Cases",
      title: isEs ? "Caso de Estudio: Cómo Clubs y Clínicas Escalaron con IA" : "Case Study: How Clubs and Clinics Scaled with AI",
      excerpt: isEs ? "Datos reales de Open Park y Eurolab: 100% de automatización y más de 200k cupones entregados." : "Real data from Open Park and Eurolab: 100% automation and 200k+ coupons delivered.",
      date: "2026-02-17",
      image: "/images/openpark.png",
      featured: true,
    },
    {
      slug: "real-estate-chatbot",
      category: isEs ? "Guías" : "Guides",
      title: isEs ? "Chatbot para inmobiliarias: qué automatizar primero" : "Real estate chatbots: what to automate first",
      excerpt: isEs ? "Descubre cómo acelerar tus ventas inmobiliarias con ejemplos reales de IA en WhatsApp." : "Speed up real estate sales with real AI WhatsApp automation examples.",
      date: "2026-02-28",
      image: "/robot3.png",
    },
    {
      slug: "clinic-chatbot",
      category: isEs ? "Casos" : "Cases",
      title: isEs ? "Chatbot para clínicas: turnos y resultados" : "Chatbots for clinics: appointments and results",
      excerpt: isEs ? "Mejora la experiencia del paciente automatizando turnos por WhatsApp." : "Improve patient experience by automating appointments via WhatsApp.",
      date: "2026-02-28",
      image: "/robot4.png",
    },
    {
      slug: "whatsapp-sheets-automation",
      category: isEs ? "Integraciones" : "Integrations",
      title: isEs ? "WhatsApp + Google Sheets: flujo real" : "WhatsApp + Google Sheets: a real workflow",
      excerpt: isEs ? "Aprende a sincronizar tus conversaciones con Sheets automáticamente." : "Learn to sync conversations with Sheets automatically.",
      date: "2026-02-28",
      image: "/robot5.png",
    },
    {
      slug: "stop-losing-leads",
      category: isEs ? "Guías" : "Guides",
      title: isEs ? "Cómo evitar perder leads fuera de horario" : "How to stop losing leads after hours",
      excerpt: isEs ? "Maximiza tu ROI respondiendo al instante, incluso durante la madrugada." : "Maximize ROI by responding instantly, even during the night.",
      date: "2026-02-28",
      image: "/robot3.png",
    },
    {
      slug: "chatbot-kpis",
      category: isEs ? "Estrategia" : "Strategy",
      title: isEs ? "Cómo medir un chatbot: KPIs que importan" : "How to measure a chatbot: KPIs that matter",
      excerpt: isEs ? "Descubre qué métricas realmente afectan tu balance final." : "Discover which metrics actually affect your bottom line.",
      date: "2026-02-28",
      image: "/robot4.png",
    },
    {
      slug: "chatbot-vendor-checklist",
      category: isEs ? "Guías" : "Guides",
      title: isEs ? "Checklist para elegir proveedor de chatbot" : "Chatbot vendor checklist",
      excerpt: isEs ? "Evita estafas. Lo que debes preguntar antes de contratar una IA." : "Avoid scams. What you should ask before hiring an AI.",
      date: "2026-02-28",
      image: "/robot5.png",
    }
  ];

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);
  const categories = isEs ? ["Todos", "Guías", "Casos", "Integraciones"] : ["All", "Guides", "Cases", "Integrations"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-violet-900 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">EiryBot <span className="text-fuchsia-400">Insights</span></h1>
          <p className="text-violet-100 opacity-80">{isEs ? "Recursos de IA y Automatización para Negocios" : "AI & Automation Resources for Business"}</p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-4 overflow-x-auto">
        {categories.map(cat => (
          <button key={cat} className="px-6 py-2 rounded-full border border-violet-100 bg-violet-50 text-violet-700 font-bold hover:bg-violet-700 hover:text-white transition whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20 grid md:grid-cols-2 gap-10 items-center bg-violet-50 rounded-[2.5rem] overflow-hidden p-8 md:p-12 border border-violet-100">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-white flex items-center justify-center p-8">
              <Image src={featuredPost.image} alt={featuredPost.title} width={400} height={400} className="object-contain" />
            </div>
            <div>
              <span className="text-fuchsia-600 font-bold text-sm mb-4 block uppercase tracking-widest">{isEs ? "Destacado" : "Featured"}</span>
              <h2 className="text-3xl font-black text-violet-950 mb-4">{featuredPost.title}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">{featuredPost.excerpt}</p>
              <Link href={`/${locale}/blog/${featuredPost.slug}`} className="px-8 py-3 bg-violet-700 text-white rounded-full font-bold shadow-lg hover:bg-violet-800 transition">
                {isEs ? "Leer caso completo" : "Read full case"}
              </Link>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post) => (
            <article key={post.slug} className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center p-12">
                <Image src={post.image} alt={post.title} width={240} height={240} className="object-contain group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <span className="text-xs font-bold text-violet-600 mb-2 uppercase tracking-widest">{post.category}</span>
                <h3 className="text-xl font-bold text-violet-950 mb-3 group-hover:text-fuchsia-600 transition truncate">{post.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <Link href={`/${locale}/blog/${post.slug}`} className="mt-auto text-violet-700 font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  {isEs ? "Leer más" : "Read more"} <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
