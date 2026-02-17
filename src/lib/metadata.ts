import type { Metadata } from "next";
import type { Locale } from "./i18n";

type Props = {
    title: string;
    description?: string;
    locale: Locale;
    path: string; // e.g. "" or "/about"
    noIndex?: boolean;
};

export function constructMetadata({
    title,
    description,
    locale,
    path,
    noIndex = false,
}: Props): Metadata {
    const base = "https://eirybot.com";

    return {
        title,
        description,
        metadataBase: new URL(base),
        alternates: {
            canonical: `${base}/${locale}${path}`,
            languages: {
                es: `${base}/es${path}`,
                en: `${base}/en${path}`,
                "x-default": `${base}/en${path}`,
            },
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
    };
}

export function constructSchema(locale: Locale) {
    const base = "https://eirybot.com";
    const isEs = locale === "es";

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${base}/#organization`,
                name: "EiryBot",
                url: base,
                logo: {
                    "@type": "ImageObject",
                    url: `${base}/isotipo-eirybot.png`,
                },
                sameAs: ["https://www.instagram.com/eirybot"],
            },
            {
                "@type": "SoftwareApplication",
                name: "EiryBot",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, WhatsApp, Android, iOS",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
                description: isEs
                    ? "Automatiza tu atención al cliente y ventas en WhatsApp con Inteligencia Artificial."
                    : "Automate customer support and sales on WhatsApp with Artificial Intelligence.",
            },
        ],
    };
}
