"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "EiryBot — Probalo gratis",
  description:
    "Automatizá WhatsApp, cotizaciones y recordatorios. Capturá leads y midelos en tiempo real. Primer mes gratis.",
};

type LeadPayload = {
  email: string;
  nombre: string;       // aquí mandaremos el nombre de campaña legible
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  mc_cid?: string;
  mc_eid?: string;
  referrer?: string;
  hp?: string;          // honeypot
};

export default async function PromoPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Soporte Next 15/16 (a veces params es Promise)
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: string }>)
      : (params as { locale: string });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);

  return <PromoClient locale={locale} t={t} />;
}

// --- Client component (formularios + UTM + redirección) ---
function PromoClient({ locale, t }: { locale: Locale; t: Record<string, any> }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  // UTM / Mailchimp params
  const params = useMemo(() => {
    const s = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    return {
      utm_campaign: s.get("utm_campaign") || "",
      utm_source: s.get("utm_source") || "",
      utm_medium: s.get("utm_medium") || "",
      mc_cid: s.get("mc_cid") || "",
      mc_eid: s.get("mc_eid") || "",
    };
  }, []);

  const GAS_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwiyF7i29IcBb6wzMypBmFLUePnF0DEA6ii0v_PGHpN7Q3WG5P5FxiSvrwwG9V5PpCp7A/exec";

  // Nombre de campaña “legible”
  const campaignName = params.utm_campaign || params.mc_cid || "Directo";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);

    const fd = new FormData(formRef.current || undefined);
    // Armamos payload explícito para fetch POST (más confiable que <form target>)
    const payload: LeadPayload = {
      email,
      nombre: campaignName,
      utm_campaign: params.utm_campaign,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      mc_cid: params.mc_cid,
      mc_eid: params.mc_eid,
      referrer: document.referrer || "",
      hp: String(fd.get("hp") || ""),
    };

    try {
      // Enviamos como x-www-form-urlencoded (Apps Script lo recibe perfecto)
      const body = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        if (typeof v === "string") body.append(k, v);
      });

      const r = await fetch(GAS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body,
        mode: "no-cors", // Apps Script pública suele requerir no-cors
      });

      // Aunque no-cors no trae status, asumimos ok y redirigimos
      setOk(true);
      // Redirige a la “gracias” del sitio
      window.location.href = locale === "en" ? "https://eirybot.com/en/thanks/" : "https://eirybot.com/thanks/";
    } catch (err) {
      console.error(err);
      setOk(false);
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-violet-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              {locale === "es" ? "WhatsApp + Automatización" : "WhatsApp + Automation"}
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              {locale === "es"
                ? "¿Usás WhatsApp para atender clientes?"
                : "Do you serve customers over WhatsApp?"}
              <br />
              <span className="bg-gradient-to-r from-fuchsia-600 to-violet-700 bg-clip-text text-transparent">
                {locale === "es" ? "Automatizá y medí 24/7" : "Automate & measure 24/7"}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-gray-700">
              {locale === "es"
                ? "Automatizá conversaciones, generá presupuestos y recordatorios. Capturá leads con métricas en tiempo real."
                : "Automate conversations, generate quotes and reminders. Capture leads and get real-time metrics."}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl ring-1 ring-violet-200">
                <Image
                  src="/MASCOTA-EIRYBOT_3.png"
                  alt="EiryBot"
                  fill
                  className="object-contain p-2"
                  sizes="56px"
                  priority
                />
              </div>
              <div className="text-sm text-gray-600">
                <b>EiryBot</b> — {locale === "es" ? "primer mes gratis" : "first month free"} ·{" "}
                {locale === "es" ? "sin tarjeta" : "no credit card"}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://scan.eirybot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-violet-700 px-5 py-3 text-white shadow hover:bg-violet-600"
              >
                {locale === "es" ? "Probar EiryScan" : "Try EiryScan"}
              </Link>
              <a
                href="https://wa.me/13058983160?text=Quiero%20probar%20EiryBot"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-violet-200 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                WhatsApp
              </a>
            </div>

            {/* bullets cortos */}
            <ul className="mt-8 grid gap-3 text-sm text-violet-900 sm:grid-cols-3">
              {[
                locale === "es" ? "Respuestas 24/7" : "24/7 replies",
                locale === "es" ? "Cotizaciones al instante" : "Instant quotes",
                locale === "es" ? "Métricas en tiempo real" : "Real-time metrics",
              ].map((txt, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-violet-100"
                >
                  {txt}
                </li>
              ))}
            </ul>
          </div>

          {/* Formulario “Probalo gratis” */}
          <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              {locale === "es" ? "📩 Probalo gratis" : "📩 Try it free"}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {locale === "es"
                ? "Dejanos tu email y te enviamos acceso a la demo + beneficios."
                : "Leave your email and we’ll send demo access + perks."}
            </p>

            <form ref={formRef} onSubmit={onSubmit} className="mt-4 space-y-3">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-violet-300 placeholder:text-gray-400 focus:border-violet-400 focus:ring-2"
              />

              {/* Honeypot invisible */}
              <input name="hp" type="text" className="hidden" tabIndex={-1} autoComplete="off" />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:opacity-60"
              >
                {submitting
                  ? locale === "es"
                    ? "Enviando…"
                    : "Sending…"
                  : locale === "es"
                  ? "Quiero mi demo"
                  : "Get my demo"}
              </button>

              <p className="text-center text-xs text-gray-500">
                {locale === "es"
                  ? "No spam. Solo un acceso para que pruebes EiryBot 😉"
                  : "No spam. Just a demo access 😉"}
              </p>

              {ok === false && (
                <p className="text-center text-xs text-red-600">
                  {locale === "es"
                    ? "Hubo un problema al enviar. Probá de nuevo."
                    : "Something went wrong. Please try again."}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* separador sutil */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
      </section>

      {/* Beneficios (3 columnas) */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h3 className="text-center text-2xl font-bold md:text-3xl">
          {locale === "es" ? "Qué vas a ganar con EiryBot" : "What you’ll gain with EiryBot"}
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              t: locale === "es" ? "Más ventas, menos fricción" : "More sales, less friction",
              d:
                locale === "es"
                  ? "Responde al instante y dirige cada consulta al flujo correcto."
                  : "Instant replies and smart routing to the right flow.",
            },
            {
              t: locale === "es" ? "Cotizaciones y pagos" : "Quotes & payments",
              d:
                locale === "es"
                  ? "Generá presupuestos automáticos y confirmá pagos sin intervención."
                  : "Auto-quotes and payment confirmations with no manual work.",
            },
            {
              t: locale === "es" ? "Métricas accionables" : "Actionable metrics",
              d:
                locale === "es"
                  ? "Medí conversión, tiempos de respuesta y oportunidades por canal."
                  : "Track conversion, response times and opportunities by channel.",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold text-violet-900">{c.t}</h4>
              <p className="mt-2 text-sm text-gray-600">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EiryScan CTA */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">
                {locale === "es" ? "Diagnóstico expreso con EiryScan" : "Express diagnostic with EiryScan"}
              </h3>
              <p className="mt-2 text-violet-900/80">
                {locale === "es"
                  ? "En 6 preguntas descubrís dónde perdés horas y cuánto podés automatizar."
                  : "In 6 questions, find where you lose hours and how much you can automate."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="https://scan.eirybot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-violet-700 px-5 py-3 text-white shadow hover:bg-violet-600"
                >
                  {locale === "es" ? "Hacer mi EiryScan" : "Start my EiryScan"}
                </Link>
                <a
                  href="https://wa.me/13058983160?text=Quiero%20hablar%20sobre%20EiryScan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-violet-200 px-5 py-3 text-violet-800 hover:bg-violet-50"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xs">
              <Image
                src="/robot3.png"
                alt="EiryScan"
                width={520}
                height={520}
                className="h-auto w-full drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ breve */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h3 className="text-center text-2xl font-bold md:text-3xl">
          {locale === "es" ? "Preguntas frecuentes" : "FAQ"}
        </h3>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-violet-100 rounded-2xl border border-violet-100 bg-white">
          {[
            {
              q: locale === "es" ? "¿Necesito tarjeta para probar?" : "Do I need a credit card?",
              a:
                locale === "es"
                  ? "No. Te habilitamos un entorno demo sin costo por 30 días."
                  : "No. We enable a 30-day free demo environment.",
            },
            {
              q: locale === "es" ? "¿Funciona con mi WhatsApp actual?" : "Does it work with my current WhatsApp?",
              a:
                locale === "es"
                  ? "Sí. Podemos integrar tu flujo actual y sumar automatizaciones progresivas."
                  : "Yes. We integrate your current flow and add progressive automations.",
            },
            {
              q:
                locale === "es"
                  ? "¿Puedo ver métricas en tiempo real?"
                  : "Can I see real-time metrics?",
              a:
                locale === "es"
                  ? "Claro. Tenés panel con leads, tiempos de respuesta, conversión y más."
                  : "Yes. You get a dashboard with leads, response times, conversion and more.",
            },
          ].map((f, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer list-none font-medium text-violet-900">
                <span className="mr-2 inline-block rotate-0 transition group-open:-rotate-90">›</span>
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer compacto */}
      <footer className="border-t border-white/10 bg-violet-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-violet-200 md:flex-row">
          <span>© 2025 EiryBot</span>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {locale === "es" ? "Privacidad" : "Privacy"}
            </Link>
            <Link href="https://eirybot.com" target="_blank" className="hover:text-white">
              eirybot.com
            </Link>
            <Link href="https://scan.eirybot.com" target="_blank" className="hover:text-white">
              EiryScan
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
