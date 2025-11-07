import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";

import LandingClient from "./LandingClient";

export const dynamic = "force-static"; // opcional, según tu estrategia

type Params = { locale: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> | Params }
): Promise<Metadata> {
  const resolved = typeof (params as any)?.then === "function"
    ? await (params as Promise<Params>)
    : (params as Params);

  const locale = resolved?.locale === "en" ? "en" : "es";
  const t = getDict(locale);

  return {
    title: t["landing.meta.title"] ?? "EiryBot — Probalo gratis",
    description:
      t["landing.meta.description"] ??
      "Automatizá WhatsApp, cotizaciones y recordatorios. Capturá leads y midelos en tiempo real. Primer mes gratis."
  };
}

export default async function Page(
  { params }: { params: Promise<Params> | Params }
) {
  const resolved = typeof (params as any)?.then === "function"
    ? await (params as Promise<Params>)
    : (params as Params);

  const locale = resolved?.locale === "en" ? "en" : "es";
  const t = getDict(locale);

  return <LandingClient locale={locale} dict={t} />;
}
