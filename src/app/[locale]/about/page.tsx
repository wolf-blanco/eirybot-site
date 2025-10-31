// src/app/[locale]/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "About / Nosotros — EiryBot",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // Next 16: params es Promise — hay que await
  const { locale } = await params;
  const t = getDict(locale);
  const base = `/${locale}`;

  const highlights = [
    { title: t["about.hl.1.t"], desc: t["about.hl.1.d"] },
    { title: t["about.hl.2.t"], desc: t["about.hl.2.d"] },
    { title: t["about.hl.3.t"], desc: t["about.hl.3.d"] },
  ];

  const mvv = [
    { title: t["about.mvv.mission.t"], desc: t["about.mvv.mission.d"], icon: "/MASCOTA-EIRYBOT_3.png" },
    { title: t["about.mvv.vision.t"],  desc: t["about.mvv.vision.d"],  icon: "/MASCOTA-EIRYBOT_1.png" },
    { title: t["about.mvv.values.t"],  desc: t["about.mvv.values.d"],  icon: "/MASCOTA-EIRYBOT_2.png" },
  ];

  const steps = [
    { n: "1", t: t["about.steps.1.t"], d: t["about.steps.1.d"] },
    { n: "2", t: t["about.steps.2.t"], d: t["about.steps.2.d"] },
    { n: "3", t: t["about.steps.3.t"], d: t["about.steps.3.d"] },
    { n: "4", t: t["about.steps.4.t"], d: t["about.steps.4.d"] },
  ];

  const team = [
    { name: t["about.team.1.n"], role: t["about.team.1.r"], img: "/eirybot_avatar2.png" },
    { name: t["about.team.2.n"], role: t["about.team.2.r"], img: "/eirybot_avatar3.png" },
    { name: t["about.team.3.n"], role: t["about.team.3.r"], img: "/eirybot_avatar1.png" },
    { name: t["about.team.4.n"], role: t["about.team.4.r"], img: "/eirybot_avatar4.png" },
  ];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              <Image src="/isotipo-eirybot.png" alt="EiryBot" width={16} height={16} />
              {t["about.badge"]}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-violet-900 md:text-5xl">
              {t["about.title.a"]} <span className="text-fuchsia-600">EiryBot</span>
              {t["about.title.b"]}
            </h1>

            <p className="mt-4 max-w-xl text-gray-700">{t["about.lead"]}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${base}/services`}
                className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600"
              >
                {t["about.cta.services"]}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {t["about.cta.scan"]}
              </a>
            </div>

            {/* Highlights */}
            <ul className="mt-8 grid gap-3 text-sm text-violet-900 sm:grid-cols-3">
              {highlights.map((h) => (
                <li key={h.title} className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-violet-100">
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
              alt={t["about.hero.imgAlt"]}
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
          {mvv.map((c) => (
            <div key={c.title} className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm">
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
          <h2 className="text-2xl font-bold text-violet-900">{t["about.steps.title"]}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border bg-white p-5 shadow-sm">
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
          <h2 className="text-2xl font-bold text-violet-900">{t["about.team.title"]}</h2>
          <span className="text-sm text-gray-500">{t["about.team.tagline"]}</span>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => (
            <li key={p.name} className="rounded-2xl border bg-white p-5 shadow-sm">
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
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid items-center gap-8 rounded-3xl bg-violet-700 p-8 text-white md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h3 className="text-2xl font-bold">{t["about.ctaFinal.title"]}</h3>
            <p className="mt-2 text-violet-100">{t["about.ctaFinal.lead"]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact`}
                className="rounded-full bg-white px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {t["about.ctaFinal.primary"]}
              </Link>
              <a
                href="https://eirybot-dashboard.web.app/login"
                target="_blank"
                className="rounded-full border border-white/40 px-5 py-3"
              >
                {t["about.ctaFinal.secondary"]}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/MASCOTA-EIRYBOT_1.png"
              alt={t["about.ctaFinal.imgAlt"]}
              width={520}
              height={520}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
