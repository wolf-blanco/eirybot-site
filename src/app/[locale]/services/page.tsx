// src/app/[locale]/services/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDict, tt } from "@/lib/i18n";

import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";
  const t = getDict(locale);
  const path = "/services";

  return constructMetadata({
    title: `${tt(t, "nav.services")} — EiryBot`,
    locale,
    path,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Next 16: params puede venir como Promise o como objeto
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: string }>)
      : (params as { locale: string });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);
  const base = `/${locale}`;

  // Helpers de tipado
  const ts = (k: string) => {
    const v = t[k];
    return Array.isArray(v) ? v.join(" ") : (v as string);
  };
  const ta = (k: string) => {
    const v = t[k];
    return Array.isArray(v) ? v : typeof v === "string" ? [v] : [];
  };

  const services = [
    {
      title: ts("services.cards.1.t"),
      desc: ts("services.cards.1.d"),
      icon: "/MASCOTA-EIRYBOT_4.png",
    },
    {
      title: ts("services.cards.2.t"),
      desc: ts("services.cards.2.d"),
      icon: "/MASCOTA-EIRYBOT_1.png",
    },
    {
      title: ts("services.cards.3.t"),
      desc: ts("services.cards.3.d"),
      icon: "/MASCOTA-EIRYBOT_2.png",
    },
    {
      title: ts("services.cards.4.t"),
      desc: ts("services.cards.4.d"),
      icon: "/MASCOTA-EIRYBOT_3.png",
    },
  ];

  const benefits = [
    ts("services.benefits.1"),
    ts("services.benefits.2"),
    ts("services.benefits.3"),
    ts("services.benefits.4"),
  ];

  const flow = [
    { n: "1", t: ts("services.flow.1.t"), d: ts("services.flow.1.d") },
    { n: "2", t: ts("services.flow.2.t"), d: ts("services.flow.2.d") },
    { n: "3", t: ts("services.flow.3.t"), d: ts("services.flow.3.d") },
    { n: "4", t: ts("services.flow.4.t"), d: ts("services.flow.4.d") },
  ];

  type Pkg = { name: string; bullets: string[]; highlight?: boolean };
  const packages: Pkg[] = [
    { name: ts("services.packages.1.name"), bullets: ta("services.packages.1.bullets") },
    { name: ts("services.packages.2.name"), bullets: ta("services.packages.2.bullets"), highlight: true },
    { name: ts("services.packages.3.name"), bullets: ta("services.packages.3.bullets") },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              {ts("services.badge")}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-violet-900 md:text-5xl">
              {ts("services.title.a")} <span className="text-fuchsia-600">24/7</span>
            </h1>
            <p className="mt-4 max-w-xl text-gray-700">{ts("services.lead")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact`}
                className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600"
              >
                {ts("services.cta.primary")}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {ts("services.cta.scan")}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/robot4.png"
              alt={ts("services.hero.alt")}
              width={640}
              height={640}
              className="h-auto w-full drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* CUATRO SERVICIOS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={`${s.title}-${s.icon}`}
              className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <Image src={s.icon} alt={s.title} width={56} height={56} className="shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-violet-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BENEFICIOS CLAVE */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-violet-900">{ts("services.benefits.title")}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ul className="space-y-3 text-sm">
              {benefits.map((li, i) => (
                <li key={`${i}-${li}`} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                    ✓
                  </span>
                  <span className="text-gray-700">{li}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-violet-900">{ts("services.flow.title")}</h3>
              <p className="mt-2 text-sm text-gray-600">{ts("services.flow.lead")}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {flow.map((step) => (
                  <div key={step.n} className="rounded-2xl border p-4">
                    <div className="mb-1 inline-flex size-7 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-800">
                      {step.n}
                    </div>
                    <p className="text-sm font-medium text-violet-900">{step.t}</p>
                    <p className="text-xs text-gray-600">{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`${base}/about`}
              className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-white"
            >
              {ts("services.more.about")}
            </Link>
            <Link
              href={`${base}/contact`}
              className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600"
            >
              {ts("services.more.quote")}
            </Link>
          </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-violet-900">{ts("services.packages.title")}</h2>
        <p className="mt-2 text-sm text-gray-600">{ts("services.packages.lead")}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl border p-6 shadow-sm ${p.highlight ? "border-violet-400 ring-2 ring-violet-100" : ""}`}
            >
              <h3 className="text-lg font-semibold text-violet-900">{p.name}</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {p.bullets.map((b, i) => (
                  <li key={`${i}-${b}`} className="flex items-start gap-2">
                    <span className="mt-1 inline-block size-2 rounded-full bg-violet-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={`${base}/contact`}
                  className="rounded-full bg-violet-700 px-4 py-2 text-white hover:bg-violet-600"
                >
                  {ts("services.packages.cta")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      {/* CTA FINAL */}
      <section className="relative mx-auto max-w-6xl px-4 py-24">
        <div className="relative grid items-center gap-12 overflow-hidden rounded-[3rem] bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-10 text-white shadow-2xl shadow-violet-900/40 md:grid-cols-2 md:p-16">

          {/* Background Effects */}
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight md:text-5xl leading-tight">
              {ts("services.final.title")}
            </h2>
            <p className="mt-6 text-lg text-violet-100/90 leading-relaxed max-w-md">
              {ts("services.final.lead")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`${base}/contact`}
                className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-violet-900 shadow-xl transition-all hover:scale-105 hover:bg-violet-50 focus:ring-4 focus:ring-violet-500/30"
              >
                {ts("services.final.primary")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="https://eirybot-dashboard.web.app/login"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 focus:ring-4 focus:ring-white/20"
              >
                {ts("services.final.secondary")}
              </a>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-sm md:max-w-md">
            {/* Glow behind robot */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-violet-500/30 to-transparent blur-2xl" />
            <Image
              src="/robot5.png"
              alt={ts("services.final.imgAlt")}
              width={520}
              height={520}
              className="relative drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
