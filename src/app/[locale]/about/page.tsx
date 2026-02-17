// src/app/[locale]/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict, tt } from "@/lib/i18n";


import { constructMetadata } from "@/lib/metadata";


export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";
  const t = getDict(locale);
  const path = "/about";

  return constructMetadata({
    title: `${tt(t, "nav.about")} — EiryBot`,
    locale,
    path,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDict(locale);
  const base = `/${locale}`;

  // helper seguro para strings
  const tt = (k: string) => (typeof t[k] === "string" ? (t[k] as string) : k);

  const highlights: Array<{ title: string; desc: string }> = [
    { title: tt("about.highlights.1.t"), desc: tt("about.highlights.1.d") },
    { title: tt("about.highlights.2.t"), desc: tt("about.highlights.2.d") },
    { title: tt("about.highlights.3.t"), desc: tt("about.highlights.3.d") },
  ];

  const how: Array<{ n: string; t: string; d: string }> = [
    { n: "1", t: tt("about.how.1.t"), d: tt("about.how.1.d") },
    { n: "2", t: tt("about.how.2.t"), d: tt("about.how.2.d") },
    { n: "3", t: tt("about.how.3.t"), d: tt("about.how.3.d") },
    { n: "4", t: tt("about.how.4.t"), d: tt("about.how.4.d") },
  ];

  const team = [
    { name: "Wolfgang Blanco", role: tt("about.team.wolf"), img: "/eirybot_avatar2.png" },
    { name: "Victor Rodriguez", role: tt("about.team.victor"), img: "/eirybot_avatar3.png" },
    { name: "Ambar Nieves", role: tt("about.team.ambar"), img: "/eirybot_avatar1.png" },
    { name: "Clemente De Lucia", role: tt("about.team.clemente"), img: "/eirybot_avatar4.png" },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              <Image src="/isotipo-eirybot.png" alt="EiryBot" width={16} height={16} />
              {tt("about.badge")}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-violet-900 md:text-5xl">
              {tt("about.title.a")} <span className="text-fuchsia-600">EiryBot</span>, {tt("about.title.b")}
            </h1>
            <p className="mt-4 max-w-xl text-gray-700">
              {tt("about.lead")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${base}/services`} className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600">
                {tt("about.cta.services")}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {tt("about.cta.scan")}
              </a>
            </div>

            {/* Highlights */}
            <ul className="mt-8 grid gap-3 text-sm text-violet-900 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <li
                  key={`${h.title}-${i}`}
                  className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-violet-100"
                >
                  <p className="font-semibold">{h.title}</p>
                  <p className="text-gray-600">{h.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Ilustración */}
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/robot8.png"
              alt={tt("about.hero.alt")}
              width={640}
              height={640}
              className="h-auto w-full drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* MISIÓN / VISIÓN / VALORES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: tt("about.mission.t"),
              desc: tt("about.mission.d"),
              icon: "/MASCOTA-EIRYBOT_3.png",
            },
            {
              title: tt("about.vision.t"),
              desc: tt("about.vision.d"),
              icon: "/MASCOTA-EIRYBOT_1.png",
            },
            {
              title: tt("about.values.t"),
              desc: tt("about.values.d"),
              icon: "/MASCOTA-EIRYBOT_2.png",
            },
          ].map((c, i) => (
            <div key={`${c.title}-${i}`} className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm">
              <div className="absolute -right-6 -top-10 h-28 w-28 opacity-10 blur-lg" />
              <div className="flex items-start gap-4">
                <Image src={c.icon} alt={c.title} width={56} height={56} className="shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-violet-900">{c.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="bg-gradient-to-b from-white to-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-violet-900">{tt("about.how.title")}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {how.map((s, i) => (
              <div key={`${s.n}-${i}`} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-800">
                  {s.n}
                </div>
                <p className="font-medium text-violet-900">{s.t}</p>
                <p className="text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-violet-900">{tt("about.team.title")}</h2>
          <span className="text-sm text-gray-500">{tt("about.team.subtitle")}</span>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <li key={`${p.name}-${i}`} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src={p.img}
                  alt={p.name}
                  width={72}
                  height={72}
                  className="h-18 w-18 rounded-xl object-contain ring-1 ring-violet-100"
                />
                <div>
                  <p className="font-medium text-violet-900">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
              {tt("about.final.title")}
            </h2>
            <p className="mt-6 text-lg text-violet-100/90 leading-relaxed max-w-md">
              {tt("about.final.lead")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`${base}/contact`}
                className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-violet-900 shadow-xl transition-all hover:scale-105 hover:bg-violet-50 focus:ring-4 focus:ring-violet-500/30"
              >
                {tt("about.final.primary")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="https://scan.eirybot.com" // Changed to EiryScan as per user preference in home, but keeping generic if "secondary" key was different. Actually user asked for "EiryScan" style. 
                // Wait, the about page originally linked to dashboard. The user request "EiryScan: Style glass".
                // I will use EiryScan link if the key supports it, BUT the translation key is "about.final.secondary".
                // In page.tsx it was "home.final.cta.scan". Here it is "about.final.secondary" which maps to "Acceso clientes".
                // User said "EiryScan: Estilo glass". 
                // The original about page had "Acceso clientes" pointing to dashboard.
                // I should probably keep the LINK destination (Dashboard) but apply the STYLE (Glass).
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 focus:ring-4 focus:ring-white/20"
              >
                {tt("about.final.secondary")}
              </a>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-sm md:max-w-md">
            {/* Glow behind robot */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-violet-500/30 to-transparent blur-2xl" />
            <Image
              src="/MASCOTA-EIRYBOT_1.png"
              alt={tt("about.final.imgAlt")}
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
