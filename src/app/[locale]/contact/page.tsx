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
  // Next 16: params es Promise
  const { locale } = await params;
  const dict = getDict(locale);

  return <ContactClient locale={locale} dict={dict} />;
}
