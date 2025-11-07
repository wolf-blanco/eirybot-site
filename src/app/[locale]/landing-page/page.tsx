// ❌ NO pongas "use client" en este archivo
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import LandingPageClient from "./LandingPageClient";

export const metadata = {
  title: "EiryBot — Probalo gratis",
  description:
    "Automatizá WhatsApp, cotizaciones y recordatorios. Capturá leads y medilos en tiempo real. Primer mes gratis.",
};

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDict(locale);

  return <LandingPageClient locale={locale} dict={t} />;
}
