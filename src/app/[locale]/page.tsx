// src/app/[locale]/page.tsx
import Image from "next/image";
import Link from "next/link";
import PhoneVideo from "@/components/phone-video";
import type { Locale } from "@/lib/i18n";
import { getDict, tt } from "@/lib/i18n";


import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";
  const t = getDict(locale);
  const path = "";

  return constructMetadata({
    title: tt(t, "home.title"),
    description: tt(t, "home.lead"),
    locale,
    path,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Next 16: en algunos contextos params llega como Promise
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: string }>)
      : (params as { locale: string });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);
  const base = `/${locale}`;

  // Helper: asegura string
  const ts = (k: string) => (t[k] as string) ?? k;

  // HERO
  const heroTitle = ts("home.title");
  const heroLead = ts("home.lead");
  const heroBadge = ts("home.badge");
  const heroAlt = ts("home.hero.alt");

  const heroFeatures: { title: string; desc: string }[] = [
    { title: ts("home.24_7"), desc: ts("home.feature.24_7.desc") },
    { title: ts("home.feature.integrations.t"), desc: ts("home.feature.integrations.d") },
    { title: ts("home.feature.metrics.t"), desc: ts("home.feature.metrics.d") },
  ];

  // ¿Qué es EiryBot?
  const whatTitle = ts("home.qe.title");
  const whatTiles: { title: string; desc: string }[] = [
    { title: ts("home.tiles.gc"), desc: ts("home.tiles.gc.desc") },
    { title: ts("home.tiles.db"), desc: ts("home.tiles.db.desc") },
    { title: ts("home.tiles.cs"), desc: ts("home.tiles.cs.desc") },
    { title: ts("home.tiles.sales"), desc: ts("home.tiles.sales.desc") },
    { title: ts("home.tiles.app"), desc: ts("home.tiles.app.desc") },
    { title: ts("home.tiles.sheets"), desc: ts("home.tiles.sheets.desc") },
  ];

  // Beneficios
  const whyTitle = ts("home.why.title");
  const whyCards: { title: string; desc: string }[] = [
    { title: ts("home.why.a"), desc: ts("home.why.a.desc") },
    { title: ts("home.why.b"), desc: ts("home.why.b.desc") },
    { title: ts("home.why.c"), desc: ts("home.why.c.desc") },
    { title: ts("home.why.d"), desc: ts("home.why.d.desc") },
    { title: ts("home.why.e"), desc: ts("home.why.e.desc") },
    { title: ts("home.why.f"), desc: ts("home.why.f.desc") },
  ];

  return (
    <div className="text-violet-900">
      {/* ===== HERO (BLANCO PURO) ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-18 md:grid-cols-2 md:gap-10 lg:py-22">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white px-3 py-1 text-[11px] font-semibold text-violet-700 shadow-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              {heroBadge}
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              {heroTitle}{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
                {ts("home.24_7")}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[15.5px] leading-7 text-gray-700">
              {heroLead}{" "}
              <b>{locale === "es" ? "Conecta. Responde. Crece." : "Connect. Reply. Grow."}</b>
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact`}
                className="rounded-full bg-violet-700 px-5 py-3 text-white shadow-lg shadow-violet-700/20 ring-1 ring-violet-800/30 transition hover:bg-violet-600 hover:shadow-violet-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                {ts("home.cta.meet")}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-200/80 bg-white px-5 py-3 text-violet-800 shadow-sm transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                {ts("home.cta.demo")}
              </a>
            </div>

            {/* Highlights del hero */}
            <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
              {heroFeatures.map((f, i) => (
                <li
                  key={`${i}-${f.title}`}
                  className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-violet-100 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="font-semibold">{f.title}</p>
                  <p className="text-gray-600">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Video */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              <PhoneVideo locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Separador sutil ===== */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-200/70 to-transparent" />

      {/* ===== ¿QUÉ ES EIRYBOT? (BLANCO) ===== */}
      <section className="relative mx-auto max-w-6xl bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{whatTitle}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
            {locale === "es"
              ? "Conecta canales, centraliza datos y ofrece respuestas instantáneas con una capa de inteligencia aplicada al negocio."
              : "Connect channels, centralize data and deliver instant answers with business-grade intelligence."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whatTiles.map((f, i) => (
            <div
              key={`what-${i}`}
              className="group relative rounded-2xl border border-violet-200/50 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-violet-300/60"
            >
              <h3 className="font-semibold text-violet-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BENEFICIOS (TONO VIOLETA) ===== */}
      <section
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,240,255,0.9) 0%, rgba(239,233,255,0.9) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 260px at 50% -40px, rgba(168,85,247,0.14), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold md:text-3xl">{whyTitle}</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {whyCards.map((card, i) => (
              <div
                key={`why-${i}`}
                className="group relative rounded-2xl border border-violet-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-semibold text-violet-900">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-violet-300/40 bg-gradient-to-br from-violet-700 via-violet-700 to-indigo-700 p-10 text-white shadow-xl ring-1 ring-violet-900/20 md:grid-cols-[1.1fr,0.9fr]">
          <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
          <div className="pointer-events-none absolute right-0 -bottom-12 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-bold md:text-3xl">{ts("home.final.title")}</h2>
            <p className="mt-2 text-violet-100">{ts("home.final.lead")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact`}
                className="rounded-full bg-white px-5 py-3 text-violet-800 shadow-lg shadow-black/10 ring-1 ring-black/5 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {ts("home.final.cta.contact")}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-white/40 px-5 py-3 text-white/95 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {ts("home.final.cta.scan")}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[30px] bg-white/5 blur-xl" />
            <Image
              src="/robot3.png"
              alt={heroAlt}
              width={520}
              height={520}
              className="relative z-[1] h-auto w-full drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
