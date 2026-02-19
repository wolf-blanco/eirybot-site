import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getDict, type Locale } from "@/lib/i18n";

export default async function SiteLayout(props: any) {
    const { children } = props;
    const { locale: raw } = await props.params;

    const locale = (raw === "en" ? "en" : "es") as Locale;
    const dict = getDict(locale);

    return (
        <>
            <SiteHeader locale={locale} dict={dict} />
            {children}
            <SiteFooter locale={locale} dict={dict} />
        </>
    );
}
