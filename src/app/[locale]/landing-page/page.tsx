// ❌ No pongas "use client" aquí
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
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* HEADER */}
      <LandingPageClient locale={locale} dict={t} />
    </div>
  );
}
