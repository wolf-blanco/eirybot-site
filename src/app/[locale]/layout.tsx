// src/app/[locale]/layout.tsx
import "@/app/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getDict, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  // Next 16 puede pasar params como Promise → esperamos sin tiparlo
  const { locale: raw } = await props.params;

  const locale = raw === "en" ? "en" : "es";
  const base = "https://eirybot.com";

  return {
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
      },
    },
  };
}

export default async function LocaleLayout(props: any) {
  // Next 16 puede pasar params como Promise → esperamos sin tiparlo
  const { children } = props;
  const { locale: raw } = await props.params;

  const locale = (raw === "en" ? "en" : "es") as Locale;
  const dict = getDict(locale); // Record<string, string | string[]>

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <SiteHeader locale={locale} dict={dict} />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}

