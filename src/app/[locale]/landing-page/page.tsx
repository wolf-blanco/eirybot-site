// src/app/[locale]/landing-page/page.tsx
// ❌ No pongas "use client" aquí
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import LandingPageClient from "./LandingPageClient";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const locale = params?.locale === "en" ? "en" : "es";
  const base = "https://eirybot.com";
  const path = `/${locale}/landing-page`;

  return {
    title: "EiryBot — Probalo gratis",
    description:
      "Automatizá WhatsApp, cotizaciones y recordatorios. Capturá leads y medilos en tiempo real. Primer mes gratis.",
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        es: `${base}/es/landing-page`,
        en: `${base}/en/landing-page`,
      },
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }> | { locale: Locale };
}) {
  // Next 16: params puede venir como Promise o como objeto
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: Locale }>)
      : (params as { locale: Locale });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);

  return <LandingPageClient locale={locale} dict={t} />;
}
