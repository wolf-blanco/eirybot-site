import "@/app/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getDict, Locale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 👇 Next 16: params puede llegar como Promise
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;                 // 👈 Desempaquetamos
  const dict = getDict(locale === "en" ? "en" : "es");

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
