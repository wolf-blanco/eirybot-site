// src/app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import ContactClient from "./contact-client";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const locale = params?.locale === "en" ? "en" : "es";
  const base = "https://eirybot.com";
  const path = `/${locale}/contact`;

  return {
    title: "Contact / Contacto — EiryBot",
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        es: `${base}/es/contact`,
        en: `${base}/en/contact`,
      },
    },
  };
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
