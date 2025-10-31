import PhoneVideo from "@/components/phone-video";
import { getDict, Locale } from "@/lib/i18n";

export default async function HomeLocale({
  params,
}: {
  params: Promise<{ locale: Locale }>; // 👈 params es Promise
}) {
  const { locale } = await params;      // 👈 desempaquetar
  const t = getDict(locale === "en" ? "en" : "es");

  return (
    <>
      {/* HERO — fondo blanco, CTA y video recortado */}
      <section className="bg-white text-violet-900">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-10">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              {t["home.title"]}{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-violet-700 bg-clip-text text-transparent">
                {t["home.24_7"]}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-gray-700">
              {t["home.lead"]}{" "}
              <b>{locale === "es" ? "Conecta. Responde. Crece." : "Connect. Reply. Grow."}</b>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://scan.eirybot.com"
                className="rounded-full bg-fuchsia-600 px-5 py-3 text-white shadow hover:brightness-110"
              >
                {t["home.cta.demo"]}
              </a>
              <a
                href={`/${locale}/contact`}
                className="rounded-full border border-violet-200 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {t["home.cta.meet"]}
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <PhoneVideo />
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

      {/* ¿QUÉ ES EIRYBOT? */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-violet-900 md:text-3xl">
            {t["home.qe.title"]}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: t["home.tiles.gc"], desc: t["home.tiles.gc.desc"] },
            { title: t["home.tiles.db"], desc: t["home.tiles.db.desc"] },
            { title: t["home.tiles.cs"], desc: t["home.tiles.cs.desc"] },
            { title: t["home.tiles.sales"], desc: t["home.tiles.sales.desc"] },
            { title: t["home.tiles.app"], desc: t["home.tiles.app.desc"] },
            { title: t["home.tiles.sheets"], desc: t["home.tiles.sheets.desc"] },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-semibold text-violet-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-violet-900 md:text-3xl">
            {t["home.why.title"]}
          </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: t["home.why.a"], desc: t["home.why.a.desc"] },
            { title: t["home.why.b"], desc: t["home.why.b.desc"] },
            { title: t["home.why.c"], desc: t["home.why.c.desc"] },
            { title: t["home.why.d"], desc: t["home.why.d.desc"] },
            { title: t["home.why.e"], desc: t["home.why.e.desc"] },
            { title: t["home.why.f"], desc: t["home.why.f.desc"] },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-semibold text-violet-900">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-violet-700 p-10 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">{t["home.final.title"]}</h2>
          <p className="mt-2 text-violet-100">{t["home.final.lead"]}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`/${locale}/contact`}
              className="rounded-full bg-white px-5 py-3 text-violet-800"
            >
              {t["home.final.cta.contact"]}
            </a>
            <a
              href="https://scan.eirybot.com"
              className="rounded-full border border-white/40 px-5 py-3 hover:bg-white/10"
            >
              {t["home.final.cta.scan"]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
