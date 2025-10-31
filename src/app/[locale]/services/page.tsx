// src/app/[locale]/services/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "Services / Servicios — EiryBot",
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // Next 16: params es Promise — usar await
  const { locale } = await params;
  const t = getDict(locale);
  const base = `/${locale}`;

  const services = [
    {
      title: t["services.cards.1.t"],
      desc: t["services.cards.1.d"],
      icon: "/MASCOTA-EIRYBOT_4.png",
    },
    {
      title: t["services.cards.2.t"],
      desc: t["services.cards.2.d"],
      icon: "/MASCOTA-EIRYBOT_1.png",
    },
    {
      title: t["services.cards.3.t"],
      desc: t["services.cards.3.d"],
      icon: "/MASCOTA-EIRYBOT_2.png",
    },
    {
      title: t["services.cards.4.t"],
      desc: t["services.cards.4.d"],
      icon: "/MASCOTA-EIRYBOT_3.png",
    },
  ];

  const benefits = [
    t["services.benefits.1"],
    t["services.benefits.2"],
    t["services.benefits.3"],
    t["services.benefits.4"],
  ];

  const flow = [
    { n: "1", t: t["services.flow.1.t"], d: t["services.flow.1.d"] },
    { n: "2", t: t["services.flow.2.t"], d: t["services.flow.2.d"] },
    { n: "3", t: t["services.flow.3.t"], d: t["services.flow.3.d"] },
    { n: "4", t: t["services.flow.4.t"], d: t["services.flow.4.d"] },
  ];

  const packages = [
    { name: t["services.packages.1.name"], bullets: t["services.packages.1.bullets"] as string[] },
    {
      name: t["services.packages.2.name"],
      highlight: true,
      bullets: t["services.packages.2.bullets"] as string[],
    },
    { name: t["services.packages.3.name"], bullets: t["services.packages.3.bullets"] as string[] },
  ];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              {t["services.badge"]}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-violet-900 md:text-5xl">
              {t["services.title.a"]} <span className="text-fuchsia-600">24/7</span>
            </h1>
            <p className="mt-4 max-w-xl text-gray-700">
              {t["services.lead"]}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${base}/contact`} className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600">
                {t["services.cta.primary"]}
              </Link>
              <a
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {t["services.cta.scan"]}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/robot4.png"
              alt={t["services.hero.alt"]}
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
              key={s.title}
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

      {/* BENEFICIOS CLAVE (CHECKLIST) */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-violet-900">{t["services.benefits.title"]}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ul className="space-y-3 text-sm">
              {benefits.map((li) => (
                <li key={li} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-green-100 text-green-700">✓</span>
                  <span className="text-gray-700">{li}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-violet-900">{t["services.flow.title"]}</h3>
              <p className="mt-2 text-sm text-gray-600">{t["services.flow.lead"]}</p>

              {/* Mini diagrama */}
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
            <Link href={`${base}/about`} className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-white">
              {t["services.more.about"]}
            </Link>
            <Link href={`${base}/contact`} className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600">
              {t["services.more.quote"]}
            </Link>
          </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-violet-900">{t["services.packages.title"]}</h2>
        <p className="mt-2 text-sm text-gray-600">{t["services.packages.lead"]}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl border p-6 shadow-sm ${"highlight" in p ? "border-violet-400 ring-2 ring-violet-100" : ""}`}
            >
              <h3 className="text-lg font-semibold text-violet-900">{p.name}</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 inline-block size-2 rounded-full bg-violet-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={`${base}/contact`} className="rounded-full bg-violet-700 px-4 py-2 text-white hover:bg-violet-600">
                  {t["services.packages.cta"]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid items-center gap-8 rounded-3xl bg-violet-700 p-8 text-white md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h3 className="text-2xl font-bold">{t["services.final.title"]}</h3>
            <p className="mt-2 text-violet-100">{t["services.final.lead"]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${base}/contact`} className="rounded-full bg-white px-5 py-3 text-violet-800 hover:bg-violet-50">
                {t["services.final.primary"]}
              </Link>
              <a
                href="https://eirybot-dashboard.web.app/login"
                target="_blank"
                className="rounded-full border border-white/40 px-5 py-3"
              >
                {t["services.final.secondary"]}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/robot5.png"
              alt={t["services.final.imgAlt"]}
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
