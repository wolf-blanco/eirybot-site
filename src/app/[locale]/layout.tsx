// src/app/[locale]/layout.tsx
import React from "react";
import "@/app/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getDict } from "@/lib/i18n";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 👇 Tipado laxo para evitar el choque con LayoutConfig en Next 16
  params: any;
}) {
  // En Next 16, params puede venir como Promise → usamos React.use()
  const resolved = React.use(params) as { locale?: string };
  const raw = resolved?.locale ?? "es";
  const locale = raw === "en" ? "en" : "es";
  const dict = getDict(locale);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main className="min-h-[70vh]">{children}</main>
      <SiteFooter locale={locale} />

      {/* Ajusta <html lang="..."> sin anidar <html>/<body> */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang','${locale}');`,
        }}
      />
    </>
  );
}
