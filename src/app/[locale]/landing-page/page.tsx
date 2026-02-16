// src/app/[locale]/landing-page/page.tsx
// ❌ No pongas "use client" aquí
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDict, tt } from "@/lib/i18n";
import LandingPageClient from "./LandingPageClient";

import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";
  const t = getDict(locale);
  const path = "/landing-page";

  return constructMetadata({
    title: tt(t, "landing.meta.title"),
    description: tt(t, "landing.meta.description"),
    locale,
    path,
  });
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

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* HEADER */}
      <LandingPageClient locale={locale} dict={t} />
    </div>
  );
}
