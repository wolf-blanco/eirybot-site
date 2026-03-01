import type { Metadata } from "next";
import type { Locale } from "./i18n";

type Props = {
    title: string;
    description?: string;
    locale: Locale;
    pathEs?: string; // Slug for Spanish (e.g. "/about")
    pathEn?: string; // Slug for English (e.g. "/about")
    noIndex?: boolean;
};

export function constructMetadata({
    title,
    description,
    locale,
    pathEs,
    pathEn,
    noIndex = false,
}: Props): Metadata {
    const base = "https://eirybot.com";

    // Ensure slugs start with / or are empty
    const cleanEs = pathEs ? (pathEs.startsWith("/") ? pathEs : `/${pathEs}`) : "";
    const cleanEn = pathEn ? (pathEn.startsWith("/") ? pathEn : `/${pathEn}`) : "";

    const esUrl = `${base}/es${cleanEs}`;
    const enUrl = `${base}/en${cleanEn}`;
    const canonical = locale === "es" ? esUrl : enUrl;

    return {
        title,
        description,
        metadataBase: new URL(base),
        alternates: {
            canonical,
            languages: {
                es: esUrl,
                en: enUrl,
                "x-default": enUrl,
            },
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "EiryBot",
            locale: locale === "es" ? "es_ES" : "en_US",
            type: "website",
            images: [
                {
                    url: `${base}/robot3.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${base}/robot3.png`],
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
