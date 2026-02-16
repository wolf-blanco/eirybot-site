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
