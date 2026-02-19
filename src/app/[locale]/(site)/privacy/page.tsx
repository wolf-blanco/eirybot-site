// src/app/[locale]/privacy/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { getDict, tt } from "@/lib/i18n";

import { constructMetadata } from "@/lib/metadata";

// ✅ Metadata (server)
export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";
  const t = getDict(locale);
  const path = "/privacy";

  return constructMetadata({
    title: `${tt(t, "privacy.title")} — EiryBot`,
    description:
      "Cómo EiryBot trata tus datos: formularios, cookies, derechos, seguridad y contactos.",
    locale,
    path,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // Next 16: params es Promise — hay que await
  const { locale } = await params;
  const t = getDict(locale);
  const lastUpdated = t["privacy.lastUpdated.date"] ?? "2025-03-01";

  const sections: Array<{ id: string; titleKey: string; body: ReactNode }> = [
    {
      id: "who",
      titleKey: "privacy.who.title",
      body: (
        <p className="text-sm/6 text-gray-700">
          {t["privacy.who.body.1"]}{" "}
          <a href="https://eirybot.com" className="text-violet-700 underline">
            https://eirybot.com
          </a>
          .
        </p>
      ),
    },
    {
      id: "comments",
      titleKey: "privacy.comments.title",
      body: (
        <p className="text-sm/6 text-gray-700">
          {t["privacy.comments.body.1"]}{" "}
          <a
            href="https://automattic.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-violet-700 underline"
          >
            automattic.com/privacy
          </a>
          .
        </p>
      ),
    },
    {
      id: "forms",
      titleKey: "privacy.forms.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.forms.body.1"]}</p>,
    },
    {
      id: "media",
      titleKey: "privacy.media.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.media.body.1"]}</p>,
    },
    {
      id: "cookies",
      titleKey: "privacy.cookies.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.cookies.body.1"]}</p>,
    },
    {
      id: "embedded",
      titleKey: "privacy.embedded.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.embedded.body.1"]}</p>,
    },
    {
      id: "promos",
      titleKey: "privacy.promos.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.promos.body.1"]}</p>,
    },
    {
      id: "sharing",
      titleKey: "privacy.sharing.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.sharing.body.1"]}</p>,
    },
    {
      id: "retention",
      titleKey: "privacy.retention.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.retention.body.1"]}</p>,
    },
    {
      id: "rights",
      titleKey: "privacy.rights.title",
      body: (
        <p className="text-sm/6 text-gray-700">
          {t["privacy.rights.body.1"]}{" "}
          <a href="mailto:info@eirybot.com" className="text-violet-700 underline">
            info@eirybot.com
          </a>
          .
        </p>
      ),
    },
    {
      id: "where",
      titleKey: "privacy.where.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.where.body.1"]}</p>,
    },
    {
      id: "security",
      titleKey: "privacy.security.title",
      body: <p className="text-sm/6 text-gray-700">{t["privacy.security.body.1"]}</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50/40">
      {/* Hero */}
      <section className="border-b border-violet-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-violet-900 md:text-4xl">
            {t["privacy.title"]}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t["privacy.lastUpdated.label"]}{" "}
            <span className="font-medium text-violet-900">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Índice anclado */}
        <div className="mb-8 rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-medium text-violet-900">
            {t["privacy.contents"]}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-violet-800 hover:bg-violet-100"
              >
                <span>•</span> {t[s.titleKey]}
              </a>
            ))}
          </div>
        </div>

        {/* Secciones en cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <article
              id={s.id}
              key={s.id}
              className="scroll-mt-28 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-violet-900">
                {t[s.titleKey]}
              </h2>
              <div className="mt-2">{s.body}</div>
            </article>
          ))}
        </div>

        {/* Bloque preguntas */}
        <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6">
          <p className="text-sm text-violet-950">
            {t["privacy.questions.1"]}{" "}
            <a href="mailto:info@eirybot.com" className="text-violet-700 underline">
              info@eirybot.com
            </a>
            .
          </p>
        </div>

        {/* CTA inferior */}
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
          >
            {t["privacy.cta.home"]}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-violet-700 px-5 py-3 text-white hover:bg-violet-600"
          >
            {t["privacy.cta.contact"]}
          </Link>
        </div>
      </section>
    </div>
  );
}
