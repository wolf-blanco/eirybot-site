// src/app/[locale]/contact/page.tsx
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import ContactClient from "./contact-client";

export const metadata = {
  title: "Contact / Contacto — EiryBot",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;        // ✅ en Next 16 params es Promise
  const dict = getDict(locale);           // ✅ tu diccionario ya cargado

  return <ContactClient locale={locale} dict={dict} />; // ✅ sin hooks aquí
}
