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
    title: `${tt(t, "nav.contact")} — EiryBot`,
    locale,
    path,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // Next 16: params es Promise
  const { locale } = await params;
  const dict = getDict(locale);

  return <ContactClient locale={locale} dict={dict} />;
}
