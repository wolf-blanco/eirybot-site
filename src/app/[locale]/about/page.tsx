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
    <main className="min-h-screen">
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
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid items-center gap-8 rounded-3xl bg-violet-700 p-8 text-white md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h3 className="text-2xl font-bold">{tt("about.final.title")}</h3>
            <p className="mt-2 text-violet-100">{tt("about.final.lead")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${base}/contact`} className="rounded-full bg-white px-5 py-3 text-violet-800 hover:bg-violet-50">
                {tt("about.final.primary")}
              </Link>
              <a
                href="https://eirybot-dashboard.web.app/login"
                target="_blank"
                className="rounded-full border border-white/40 px-5 py-3"
                rel="noreferrer"
              >
                {tt("about.final.secondary")}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/MASCOTA-EIRYBOT_1.png"
              alt={tt("about.final.imgAlt")}
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
