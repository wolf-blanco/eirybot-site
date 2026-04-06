import "@/app/globals.css";
// import SiteHeader from "@/components/site-header";
// import SiteFooter from "@/components/site-footer";
import GoogleAnalytics from "@/components/google-analytics";
import MetaPixel from "@/components/meta-pixel";
import { getDict, type Locale } from "@/lib/i18n";
import { constructSchema } from "@/lib/metadata";
import type { Metadata } from "next";
import { FloatingChat } from "@/components/chat-widget/FloatingChat";

export async function generateMetadata(props: any): Promise<Metadata> {
  const { locale: raw } = await props.params;
  const locale = raw === "en" ? "en" : "es";
  const base = "https://eirybot.com";

  return {
    metadataBase: new URL(base),
  };
}

export default async function LocaleLayout(props: any) {
  const { children } = props;
  const { locale: raw } = await props.params;

  const locale = (raw === "en" ? "en" : "es") as Locale;
  const dict = getDict(locale);
  const schema = constructSchema(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-2VB2QQYGP4" />
        <MetaPixel pixelId="120241535560770587" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* SiteHeader removed - moved to (site) layout */}
        {children}
        {/* SiteFooter removed - moved to (site) layout */}
        <FloatingChat />
      </body>
    </html>
  );
}
