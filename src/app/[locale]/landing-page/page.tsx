import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import ClientLandingPage from "./ClientLanding";

export const metadata: Metadata = {
  title: "EiryBot — Landing",
  description: "Automatización 24/7: WhatsApp, cotizaciones, agenda y métricas.",
};

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: string }>)
      : (params as { locale: string });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);

  return <ClientLandingPage locale={locale} dict={t} />;
}
