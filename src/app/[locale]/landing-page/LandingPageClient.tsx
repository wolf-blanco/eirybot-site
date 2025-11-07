"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Dict = Record<string, string | string[]>;

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

  // Apps Script (tu endpoint)
  const FORM_ACTION =
    "https://script.google.com/macros/s/AKfycbwiyF7i29IcBb6wzMypBmFLUePnF0DEA6ii0v_PGHpN7Q3WG5P5FxiSvrwwG9V5PpCp7A/exec";

  const [utm, setUtm] = useState({
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
    mc_cid: "",
    mc_eid: "",
    referrer: "",
  });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtm({
      utm_campaign: p.get("utm_campaign") ?? "",
      utm_source: p.get("utm_source") ?? "",
      utm_medium: p.get("utm_medium") ?? "",
      mc_cid: p.get("mc_cid") ?? "",
      mc_eid: p.get("mc_eid") ?? "",
      referrer: document.referrer ?? "",
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const campaignName = utm.utm_campaign || utm.mc_cid || "Directo";
    const body = new FormData();
    body.append("email", email);
    body.append("nombre", campaignName); // así lo registrás en Sheets
    Object.entries(utm).forEach(([k, v]) => body.append(k, v));

    try {
      const res = await fetch(FORM_ACTION, { method: "POST", body });
      if (!res.ok) throw new Error();
      setMsg({
        type: "ok",
        text: t("landing.form.success", "¡Listo! Revisá tu correo para la demo."),
      });
      setEmail("");
      setTimeout(() => {
        window.location.href = "https://eirybot.com/thanks/";
      }, 900);
    } catch {
      setMsg({
        type: "err",
        text: t(
          "landing.form.error",
          "No pudimos enviar el formulario. Intentá nuevamente en unos segundos."
        ),
      });
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
      {/* HERO - foco en conversión, sin logo */}
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
                href={`/${locale}/scan`}
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
              href={`/${locale}/scan`}
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

      {/* Footer mínimo (el logo ya vive en el header global) */}
      <footer className="text-center text-sm text-gray-500 py-8">
        {t("landing.footer.note", "© {year} EiryBot. Todos los derechos reservados.").replace(
          "{year}",
          String(new Date().getFullYear())
        )}{" "}
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
