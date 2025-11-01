// src/app/[locale]/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "EiryBot — Automatización 24/7",
  description: "Chatbots, integraciones y métricas en tiempo real para tu negocio.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: string }>)
      : (params as { locale: string });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);
  const base = `/${locale}`;

  // Helper para asegurar string
  const ts = (k: string) => (t[k] as string) ?? k;

  // HERO
  const heroTitle = ts("home.title");
  const heroLead = ts("home.lead");

  // Features del hero (asegurando strings)
  const heroFeatures: { title: string; desc: string }[] = [
    { title: ts("home.24_7"), desc: ts("home.feature.24_7.desc") },
    { title: ts("home.feature.integrations.t"), desc: ts("home.feature.integrations.d") },
    { title: ts("home.feature.metrics.t"), desc: ts("home.feature.metrics.d") },
  ];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              {ts("home.badge")}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-violet-900 md:text-5xl">
              {heroTitle} <span className="text-fuchsia-600">{ts("home.24_7")}</span>
            </h1>
            <p className="mt-4 max-w-xl text-gray-700">{heroLead}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${base}/contact`} className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600">
                {ts("home.cta.demo")}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {ts("home.cta.meet")}
              </a>
            </div>

            {/* Highlights */}
            <ul className="mt-8 grid gap-3 text-sm text-violet-900 sm:grid-cols-3">
              {heroFeatures.map((f, i) => (
                <li
                  key={`${i}-${f.title}`} // <- key seguro (string)
                  className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-violet-100"
                >
                  <p className="font-semibold">{f.title}</p>
                  <p className="text-gray-600">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/robot3.png"
              alt={ts("home.hero.alt")}
              width={640}
              height={640}
              className="h-auto w-full drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Bloques extra si tenías más secciones… */}
      {/* ... */}
    </main>
  );
}
