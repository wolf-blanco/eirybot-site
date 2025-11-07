"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Dict = Record<string, string | string[]>;

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwiyF7i29IcBb6wzMypBmFLUePnF0DEA6ii0v_PGHpN7Q3WG5P5FxiSvrwwG9V5PpCp7A/exec";

export default function LandingPageClient({
  locale,
  dict,
}: {
  locale: "es" | "en";
  dict: Dict;
}) {
  const ts = (k: string, fb?: string) =>
    (typeof dict[k] === "string" ? (dict[k] as string) : fb) ?? fb ?? k;

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<null | { kind: "ok" | "err"; text: string }>(
    null
  );

  // Campos ocultos (UTM / Mailchimp / referrer)
  const [hidden, setHidden] = useState({
    nombre: "Directo",
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
    mc_cid: "",
    mc_eid: "",
    referrer: "",
  });

  // Lee parámetros de la URL y setea referrer
  useEffect(() => {
    const getParam = (n: string) => {
      try {
        const p = new URLSearchParams(window.location.search);
        return p.get(n) || "";
      } catch {
        return "";
      }
    };
    const utm_campaign = getParam("utm_campaign");
    const mc_cid = getParam("mc_cid");
    setHidden((h) => ({
      ...h,
      nombre: utm_campaign || mc_cid || "Directo",
      utm_campaign,
      utm_source: getParam("utm_source"),
      utm_medium: getParam("utm_medium"),
      mc_cid,
      mc_eid: getParam("mc_eid"),
      referrer: document.referrer || "",
    }));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setMsg(null);

    try {
      // Enviar como GET a Apps Script (compatible con tu macro actual)
      const url =
        `${SCRIPT_URL}` +
        `?email=${encodeURIComponent(email)}` +
        `&nombre=${encodeURIComponent(hidden.nombre)}` +
        `&utm_campaign=${encodeURIComponent(hidden.utm_campaign)}` +
        `&utm_source=${encodeURIComponent(hidden.utm_source)}` +
        `&utm_medium=${encodeURIComponent(hidden.utm_medium)}` +
        `&mc_cid=${encodeURIComponent(hidden.mc_cid)}` +
        `&mc_eid=${encodeURIComponent(hidden.mc_eid)}` +
        `&referrer=${encodeURIComponent(hidden.referrer)}`;

      const resp = await fetch(url);
      if (!resp.ok) throw new Error("bad status");
      // Apps Script suele responder texto simple
      await resp.text();

      setMsg({
        kind: "ok",
        text:
          ts(
            "landing.form.success",
            "¡Listo! Revisá tu correo para acceder a la demo."
          ) || "",
      });

      // Redirige a /thanks en 1s (igual a tu flujo original)
      setTimeout(() => {
        window.location.href = "https://eirybot.com/thanks/";
      }, 1000);
    } catch (err) {
      setMsg({
        kind: "err",
        text:
          ts(
            "landing.form.error",
            "No pudimos enviar el formulario. Probá de nuevo en un momento."
          ) || "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const prefill =
      ts(
        "landing.whatsapp.prefill",
        "Hola EiryBot, quiero una demo. Vengo desde la landing."
      ) || "";
    window.open(
      "https://wa.me/13058983160?text=" + encodeURIComponent(prefill),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2">
          <Image
            src="/eirylogopdf2.png"
            alt="EiryBot"
            width={132}
            height={30}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs rounded-full border px-2 py-1 text-violet-700 border-violet-200">
            {ts("landing.hero.badge", "Nuevo")}
          </span>
          <a
            href="https://eirybot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-violet-200 px-4 py-2 text-violet-700 hover:bg-violet-50"
          >
            eirybot.com
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {ts("landing.hero.title", "¿Usás WhatsApp para atender clientes?")}
          </h1>
          <p className="mt-3 text-gray-600">
            {ts(
              "landing.hero.lead",
              "Automatizá conversaciones, generá presupuestos y respondé 24/7 con EiryBot. El primer mes es totalmente gratis."
            )}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/landing-page#demo`}
              className="rounded-full bg-violet-600 text-white px-5 py-2 font-medium hover:opacity-90"
            >
              {ts("landing.hero.primary", "Probar gratis")}
            </Link>
            <Link
              href={`/${locale}/scan`}
              className="rounded-full border px-5 py-2 font-medium hover:bg-gray-50"
            >
              {ts("landing.hero.secondary", "Ver EiryScan")}
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/mascota.png" // Asegurate de tener /public/mascota.png
            alt={ts("landing.hero.alt", "EiryBot — Automatización 24/7")!}
            width={320}
            height={320}
            className="w-56 h-auto md:w-72"
            priority
          />
        </div>
      </section>

      {/* Formulario (#demo) */}
      <section
        id="demo"
        className="bg-gray-50 border-t border-b border-gray-100 py-12"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          {/* Copy */}
          <div>
            <h2 className="text-2xl font-bold">
              {ts("landing.form.title", "📩 Probalo gratis")}
            </h2>
            <p className="mt-2 text-gray-600">
              {ts(
                "landing.form.lead",
                "Dejanos tu email y te enviaremos acceso a la demo + beneficios exclusivos."
              )}
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• {ts("landing.features.1", "Respuestas con contexto en WhatsApp")}</li>
              <li>• {ts("landing.features.2", "Cotizaciones automáticas")}</li>
              <li>• {ts("landing.features.3", "Turnos con recordatorios")}</li>
              <li>• {ts("landing.features.4", "Leads a tu CRM/DB")}</li>
              <li>• {ts("landing.features.5", "Notificaciones internas con SLA")}</li>
              <li>• {ts("landing.features.6", "Dashboards y exportes")}</li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {ts("landing.form.email.label", "Email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ts(
                  "landing.form.email.placeholder",
                  "tu@empresa.com"
                )!}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
              />

              {/* ocultos */}
              <input type="hidden" name="nombre" value={hidden.nombre} />
              <input
                type="hidden"
                name="utm_campaign"
                value={hidden.utm_campaign}
              />
              <input type="hidden" name="utm_source" value={hidden.utm_source} />
              <input type="hidden" name="utm_medium" value={hidden.utm_medium} />
              <input type="hidden" name="mc_cid" value={hidden.mc_cid} />
              <input type="hidden" name="mc_eid" value={hidden.mc_eid} />
              <input type="hidden" name="referrer" value={hidden.referrer} />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-violet-600 text-white px-5 py-2 font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {submitting
                  ? "Enviando…"
                  : ts("landing.form.submit", "Quiero mi demo")}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {ts(
                  "landing.form.legal",
                  "No te enviaremos spam. Solo un mensaje para que pruebes EiryBot 😉"
                )}
              </p>

              {msg && (
                <p
                  className={`text-sm text-center ${
                    msg.kind === "ok" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {msg.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-xl font-bold">
          {ts("landing.benefits.title", "¿Por qué EiryBot?")}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="rounded-xl border p-4">
            <p className="font-semibold">
              {ts("landing.benefits.1.t", "Disponibilidad 24/7")}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {ts(
                "landing.benefits.1.d",
                "No pierdas leads fuera de horario. Capturá y calificá automáticamente."
              )}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="font-semibold">
              {ts("landing.benefits.2.t", "Cotizaciones al instante")}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {ts(
                "landing.benefits.2.d",
                "Enviá propuestas con reglas de negocio y seguimiento automático."
              )}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="font-semibold">
              {ts("landing.benefits.3.t", "Integraciones reales")}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {ts(
                "landing.benefits.3.d",
                "Conectá Sheets, CRM, pagos, calendario y más—sin dolores de cabeza."
              )}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="font-semibold">
              {ts("landing.benefits.4.t", "Métricas accionables")}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {ts(
                "landing.benefits.4.d",
                "Medí lo que importa: tiempo de respuesta, conversión e ingresos."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* EiryScan */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border bg-white p-6 md:p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold">
                {ts("landing.scan.title", "Auditoría exprés con EiryScan")}
              </h3>
              <p className="text-gray-600 mt-1">
                {ts(
                  "landing.scan.lead",
                  "Medí tu madurez de automatización y encontrá oportunidades en minutos."
                )}
              </p>
            </div>
            <Link
              href={`/${locale}/scan`}
              className="inline-flex mt-4 md:mt-0 rounded-full bg-violet-600 text-white px-5 py-2 font-semibold hover:opacity-90"
            >
              {ts("landing.scan.cta", "Hacer mi EiryScan")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-2xl border bg-white p-6 md:p-8 text-center">
          <p className="text-lg font-semibold">
            {ts(
              "landing.title",
              "¿Usás WhatsApp para atender clientes?"
            )}
          </p>
          <p className="text-gray-600 mt-1">
            {ts(
              "landing.lead",
              "Automatizá conversaciones, generá presupuestos y respondé 24/7 con EiryBot. El primer mes es totalmente gratis."
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <button
              onClick={openWhatsApp}
              className="rounded-full border px-5 py-2 font-semibold hover:bg-gray-50"
            >
              {ts("landing.whatsapp.cta", "Hablar por WhatsApp")}
            </button>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-violet-600 text-white px-5 py-2 font-semibold hover:opacity-90"
            >
              {ts("landing.cta.contact", "Hablá con nosotros")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
          <span>
            {(ts(
              "landing.footer.note",
              "© {year} EiryBot. Todos los derechos reservados."
            ) as string).replace("{year}", String(new Date().getFullYear()))}
          </span>
          <Link href={`/${locale}/privacy`} className="hover:text-gray-700">
            {ts("landing.footer.privacy", "Política de privacidad")}
          </Link>
        </div>
      </footer>
    </main>
  );
}
