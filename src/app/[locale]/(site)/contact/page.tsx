// src/app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDict, tt } from "@/lib/i18n";
import ContactClient from "./contact-client";

import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<import("next").Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";
  const t = getDict(locale);
  const path = "/contact";

  return constructMetadata({
    title: locale === "es" ? "Contacto - EiryBot" : "Contact - EiryBot",
    description: locale === "es"
      ? "¿Listo para automatizar? Habla con nuestro equipo hoy mismo."
      : "Ready to automate? Talk to our team today.",
    locale,
    pathEs: "/contact",
    pathEn: "/contact",
  });
}

export default async function ContactPage({
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
  const dict = getDict(locale);

  return <ContactClient locale={locale} dict={dict} />;
}
