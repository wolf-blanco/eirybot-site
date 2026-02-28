import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import ThanksClient from "./thanks-client";

import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "¡Gracias! / Thanks — EiryBot",
    locale: locale === "en" ? "en" : "es",
    path: "/thanks",
    noIndex: true,
  });
}

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;     // App Router requiere await
  const dict = getDict(locale);        // Diccionario del idioma
  return <ThanksClient locale={locale} dict={dict} />;
}
