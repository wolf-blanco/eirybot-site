import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import ThanksClient from "./thanks-client";

export const metadata = {
  title: "¡Gracias! / Thanks — EiryBot",
  robots: { index: false, follow: false },
};

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;     // App Router requiere await
  const dict = getDict(locale);        // Diccionario del idioma
  return <ThanksClient locale={locale} dict={dict} />;
}
