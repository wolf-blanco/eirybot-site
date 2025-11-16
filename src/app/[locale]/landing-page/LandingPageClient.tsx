// src/app/[locale]/landing/LandingPageClient.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { colWebLeads, colErrorLog } from "@/lib/paths";

type Dict = Record<string, string | string[]>;

const SHEETS_ENDPOINT =
  process.env.NEXT_PUBLIC_SHEETS_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbwiyF7i29IcBb6wzMypBmFLUePnF0DEA6ii0v_PGHpN7Q3WG5P5FxiSvrwwG9V5PpCp7A/exec";

export default function LandingPageClient({
  locale,
  dict,
}: {
  locale: "es" | "en";
  dict: Dict;
}) {
  const t = (k: string, fb?: string) =>
    (typeof dict[k] === "string" ? (dict[k] as string) : fb) ?? fb ?? k;

  // ---------- Form + UTM ----------
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err" | ""; text: string }>({
    type: "",
    text: "",
  });

  const qs = useSearchParams();
  const utm = useMemo(
    () => ({
      utm_campaign: qs.get("utm_campaign") ?? "",
      utm_source: qs.get("utm_source") ?? "",
      utm_medium: qs.get("utm_medium") ?? "",
      utm_term: qs.get("utm_term") ?? "",
      utm_content: qs.get("utm_content") ?? "",
      mc_cid: qs.get("mc_cid") ?? "",
      mc_eid: qs.get("mc_eid") ?? "",
    }),
    [qs]
  );

  const [referrer, setReferrer] = useState("");
  useEffect(() => {
    setReferrer(document.referrer ?? "");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const emailTrim = email.trim().toLowerCase();
    if (!emailTrim) return;

    // -------- Payload Firestore (cumple reglas: email + createdAt) --------
    const payloadFS = {
      email: emailTrim,
      createdAt: serverTimestamp(), // <- requerido por tus reglas

      // extra (no requerido por reglas)
      locale,
      referrer,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      url: typeof window !== "undefined" ? window.location.href : "",
      source: "landing_page",
      ...utm,
    };

    // -------- Payload GAS (FormData) --------
    // nombre = campaña (para tu hoja, como usabas antes)
    const campaignName = utm.utm_campaign || utm.mc_cid || "Directo";
    const body = new FormData();
    body.append("email", emailTrim);
    body.append("nombre", campaignName);
    Object.entries(utm).forEach(([k, v]) => body.append(k, v));
    body.append("referrer", referrer);
    body.append("locale", locale);
    body.append("url", typeof window !== "undefined" ? window.location.href : "");

    try {
      // 1) Firestore (await) — create-only a eirybot_site/prod/web_leads
      await addDoc(colWebLeads(), payloadFS);

      // 2) GAS (fire-and-forget con timeout) — no bloquea UX
      if (SHEETS_ENDPOINT) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000); // timeout más amplio

        fetch(SHEETS_ENDPOINT, {
          method: "POST",
          body,                 // ← usamos el FormData "body" definido arriba
          mode: "no-cors",
          signal: ctrl.signal,
        })
        .catch(async (err: any) => {
          // aborts / “opaque” fallbacks → ignorar
          if (err?.name === "AbortError" || err?.message === "Failed to fetch") return;
          // si querés, logueá solo errores “reales”
          try {
            await addDoc(colErrorLog(), {
              message: err?.message ?? "GAS fetch failed",
              context: "landing/web_leads_gas",
              createdAt: serverTimestamp(),
            });
          } catch {}
        })
        
          .finally(() => clearTimeout(timer));
      }

      setMsg({
        type: "ok",
        text: t("landing.form.success", "¡Listo! Revisá tu correo para la demo."),
      });
      setEmail("");
      setTimeout(() => {
        window.location.href = `/${locale}/thanks`;
      }, 900);
    } catch (err: any) {
      console.error("Landing Firestore create failed:", err);
      setMsg({
        type: "err",
        text: t(
          "landing.form.error",
          "No pudimos enviar el formulario. Intentá nuevamente en unos segundos."
        ),
      });

      // Log principal (fallo Firestore)
      try {
        await addDoc(colErrorLog(), {
          message: err?.message ?? String(err),
          stack: err?.stack ?? null,
          context: "landing/web_leads",
          locale,
          url: typeof window !== "undefined" ? window.location.href : "",
          createdAt: serverTimestamp(),
        });
      } catch {}
    }
  }

  // WhatsApp CTA (prefill)
  const WA_URL = `https://wa.me/13058983160?text=${encodeURIComponent(
    t(
      "landing.whatsapp.prefill",
      "Hola EiryBot, quiero una demo. Vengo de la landing."
    )
  )}`;

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-violet-50/40 to-white" />
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {t("landing.hero.title", "¿Usás WhatsApp para atender clientes?")}
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              {t(
                "landing.hero.lead",
                "Automatizá conversaciones, generá presupuestos y respondé 24/7 con EiryBot. El primer mes es totalmente gratis."
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#demo"
                className="rounded-full bg-violet-600 text-white px-5 py-2.5 font-medium hover:opacity-90"
              >
                {t("landing.hero.primary", "Probar gratis")}
              </a>
              <Link
                href={`https://scan.eirybot.com/`}
                className="rounded-full border px-5 py-2.5 font-medium hover:bg-gray-50"
              >
                {t("landing.hero.secondary", "Ver EiryScan")}
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border px-5 py-2.5 font-medium hover:bg-gray-50"
              >
                {t("landing.whatsapp.cta", "Hablar por WhatsApp")}
              </a>
            </div>
          </div>

          {/* Imágenes robot: móvil y desktop */}
          <div className="relative flex justify-center">
            <div className="md:hidden">
              <Image
                src="/robot8.png"
                alt={t("landing.hero.alt", "EiryBot — Automatización 24/7")!}
                width={280}
                height={280}
                className="w-64 h-auto drop-shadow-xl"
                priority
              />
            </div>
            <div className="hidden md:block">
              <Image
                src="/robot3.png"
                alt={t("landing.hero.alt", "EiryBot — Automatización 24/7")!}
                width={520}
                height={520}
                className="w-[420px] lg:w-[520px] h-auto drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="demo" className="bg-violet-50/40 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("landing.form.title", "📩 Probalo gratis")}
            </h2>
            <p className="text-gray-600 mt-2">
              {t(
                "landing.form.lead",
                "Dejanos tu email y te enviaremos acceso a la demo + beneficios exclusivos."
              )}
            </p>

            <form onSubmit={onSubmit} className="mt-6 max-w-md">
              <label htmlFor="email" className="block text-sm font-semibold mb-1">
                {t("landing.form.email.label", "Email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("landing.form.email.placeholder", "tu@email.com") as string}
                className="w-full border rounded-lg px-4 py-3"
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-full bg-violet-600 text-white px-5 py-3 font-semibold hover:opacity-90"
              >
                {t("landing.form.submit", "Quiero mi demo")}
              </button>
              <p className="text-xs text-gray-500 mt-2">
                {t(
                  "landing.form.legal",
                  "No te enviaremos spam. Solo un mensaje para que pruebes EiryBot 😉"
                )}
              </p>

              {msg.type === "ok" && (
                <p className="mt-3 text-sm text-green-700">{msg.text}</p>
              )}
              {msg.type === "err" && (
                <p className="mt-3 text-sm text-red-600">{msg.text}</p>
              )}
            </form>
          </div>

          {/* Beneficios + EiryScan corto */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">
              {t("landing.scan.title", "Auditoría rápida con EiryScan")}
            </h3>
            <p className="text-gray-600 mt-1">
              {t(
                "landing.scan.lead",
                "Medí tu madurez de automatización y encontrá oportunidades en minutos."
              )}
            </p>
            <Link
              href={`https://scan.eirybot.com/`}
              className="inline-block mt-4 rounded-full border px-5 py-2.5 font-medium hover:bg-gray-50"
            >
              {t("landing.scan.cta", "Hacer mi EiryScan")}
            </Link>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Feature text={t("landing.features.1", "Responder en WhatsApp con contexto y variables")} />
              <Feature text={t("landing.features.2", "Crear y enviar cotizaciones automáticas")} />
              <Feature text={t("landing.features.3", "Agendar turnos con recordatorios")} />
              <Feature text={t("landing.features.4", "Sincronizar leads a tu CRM/DB")} />
              <Feature text={t("landing.features.5", "Notificaciones internas con SLA")} />
              <Feature text={t("landing.features.6", "Dashboards y exportación de reportes")} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer mínimo */}
      <footer className="text-center text-sm text-gray-500 py-8">
        {t("landing.footer.note", "© {year} EiryBot. Todos los derechos reservados.")
          .replace("{year}", String(new Date().getFullYear()))}{" "}
        ·{" "}
        <Link href={`/${locale}/privacy`} className="underline">
          {t("landing.footer.privacy", "Política de privacidad")}
        </Link>
      </footer>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-violet-600" />
      <span>{text}</span>
    </div>
  );
}
