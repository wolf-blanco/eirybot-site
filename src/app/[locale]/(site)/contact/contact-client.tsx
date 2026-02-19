"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale, Dict } from "@/lib/i18n";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { colWebLeads, colErrorLog } from "@/lib/paths";

const SHEETS_ENDPOINT =
  process.env.NEXT_PUBLIC_SHEETS_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbwiyF7i29IcBb6wzMypBmFLUePnF0DEA6ii0v_PGHpN7Q3WG5P5FxiSvrwwG9V5PpCp7A/exec";

type Form = {
  nombre: string;
  email: string;
  telefono: string;
  rubro: string;
  consentimiento: boolean;
  website?: string; // honeypot
};

export default function ContactClient({
  locale,
  dict: t,
}: {
  locale: Locale;
  dict: Dict;
}) {
  // helper seguro para strings
  const tt = (k: string) => {
    const v = t[k];
    return typeof v === "string" ? v : k;
  };

  const qs = useSearchParams();

  const utm = useMemo(
    () => ({
      utm_source: qs.get("utm_source") || "",
      utm_medium: qs.get("utm_medium") || "",
      utm_campaign: qs.get("utm_campaign") || "",
      utm_term: qs.get("utm_term") || "",
      utm_content: qs.get("utm_content") || "",
    }),
    [qs]
  );

  const [form, setForm] = useState<Form>({
    nombre: "",
    email: "",
    telefono: "",
    rubro: "",
    consentimiento: false,
    website: "",
  });

  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);

  // Prefill de nombre desde querystring (opcional)
  useEffect(() => {
    const prefill = qs.get("nombre") || qs.get("name") || qs.get("fullname") || "";
    if (prefill) setForm((f) => ({ ...f, nombre: prefill }));
  }, [qs]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return; // bot honeypot

    setSending(true);
    setDone(null);

    // --- Armo payload base (para Firestore) ---
    const payloadFS = {
      // ✔️ Campos mínimos exigidos por tus reglas
      email: form.email.trim().toLowerCase(),
      createdAt: serverTimestamp(),

      // 👇 Extras útiles
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      rubro: form.rubro.trim(),
      consentimiento: form.consentimiento ? "Sí, autorizo contacto" : "No",
      locale,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      url: typeof window !== "undefined" ? window.location.href : "",
      source: "contact_page",
      ...utm,
    };

    // --- Armo payload para GAS (FormData) ---
    const fd = new FormData();
    fd.append("nombre", payloadFS.nombre);
    fd.append("email", form.email.trim());
    fd.append("telefono", payloadFS.telefono);
    fd.append("rubro", payloadFS.rubro);
    fd.append("consentimiento", form.consentimiento ? "Sí, autorizo contacto" : "No");
    fd.append("locale", locale);
    fd.append("referrer", payloadFS.referrer);
    fd.append("url", payloadFS.url);
    Object.entries(utm).forEach(([k, v]) => fd.append(k, v));

    // --- Doble escritura: Firestore (await) + GAS (fire-and-forget con timeout) ---
    try {
      // 1) Firestore (create-only)
      await addDoc(colWebLeads(), payloadFS);

      // 2) GAS (no bloquea UX, con timeout de cortesía)
      if (SHEETS_ENDPOINT) {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3500); // 3.5s
        fetch(SHEETS_ENDPOINT, { method: "POST", body: fd, mode: "no-cors", signal: ctrl.signal })
          .catch(async (err) => {
            // Logeamos el fallo de GAS sin romper la UX
            try {
              await addDoc(colErrorLog(), {
                message: err?.message ?? "GAS fetch failed",
                context: "contact/web_leads_gas",
                createdAt: serverTimestamp(),
              });
            } catch { }
          })
          .finally(() => clearTimeout(t));
      }

      setDone("ok");
      setTimeout(() => {
        window.location.href = `/${locale}/thanks`;
      }, 900);
    } catch (err: any) {
      console.error("Contact Firestore create failed:", err);
      setDone("err");
      // Log en error_log del fallo principal (Firestore)
      try {
        await addDoc(colErrorLog(), {
          message: err?.message ?? String(err),
          stack: err?.stack ?? null,
          context: "contact/web_leads",
          locale,
          url: typeof window !== "undefined" ? window.location.href : "",
          createdAt: serverTimestamp(),
        });
      } catch { }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50/40">
      {/* Intro */}
      <section className="mx-auto max-w-5xl px-4 pb-6 pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-violet-900 md:text-5xl">
            {tt("contact.hero.title.a")}{" "}
            <span className="text-fuchsia-600">{tt("contact.hero.title.b")}</span>{" "}
            {tt("contact.hero.title.c")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            {tt("contact.hero.lead.1")} <b>EiryBot</b> {tt("contact.hero.lead.2")}
          </p>

          <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-left text-sm text-gray-700 md:grid-cols-2">
            {[tt("contact.bullets.1"), tt("contact.bullets.2"), tt("contact.bullets.3"), tt("contact.bullets.4")].map(
              (x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                    ✓
                  </span>
                  <span>{x}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* Formulario */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1.1fr,0.9fr]">
          {/* Card form */}
          <form onSubmit={onSubmit} className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="nombre" className="text-sm font-medium text-violet-900">
                  {tt("contact.form.name")}
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="rounded-lg border px-3 py-2 outline-none ring-violet-300 focus:ring"
                  placeholder={tt("contact.form.name.ph")}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-violet-900">
                  {tt("contact.form.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg border px-3 py-2 outline-none ring-violet-300 focus:ring"
                  placeholder={tt("contact.form.email.ph")}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="telefono" className="text-sm font-medium text-violet-900">
                  {tt("contact.form.phone")}
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="rounded-lg border px-3 py-2 outline-none ring-violet-300 focus:ring"
                  placeholder={tt("contact.form.phone.ph")}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="rubro" className="text-sm font-medium text-violet-900">
                  {tt("contact.form.industry")}
                </label>
                <input
                  id="rubro"
                  name="rubro"
                  value={form.rubro}
                  onChange={(e) => setForm({ ...form, rubro: e.target.value })}
                  className="rounded-lg border px-3 py-2 outline-none ring-violet-300 focus:ring"
                  placeholder={tt("contact.form.industry.ph")}
                />
              </div>
            </div>

            {/* honeypot */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden"
              tabIndex={-1}
            />

            <label className="mt-5 flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                required
                checked={form.consentimiento}
                onChange={(e) => setForm({ ...form, consentimiento: e.target.checked })}
                className="mt-0.5"
              />
              <span>{tt("contact.form.consent")}</span>
            </label>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-violet-700 px-5 py-3 text-white transition hover:bg-violet-600 disabled:opacity-60"
              >
                {sending ? tt("contact.form.sending") : tt("contact.form.send")}
              </button>
              <Link
                href="https://scan.eirybot.com"
                className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50"
              >
                {tt("contact.form.scan")}
              </Link>
            </div>

            {done === "ok" && (
              <p className="mt-4 text-sm text-green-700">{tt("contact.form.ok")}</p>
            )}
            {done === "err" && (
              <p className="mt-4 text-sm text-red-700">
                {tt("contact.form.err.1")}{" "}
                <a href="mailto:info@eirybot.com" className="underline">
                  info@eirybot.com
                </a>.
              </p>
            )}
          </form>

          {/* Lateral de confianza */}
          <aside className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
            <div className="text-sm text-gray-700">
              <h2 className="text-lg font-semibold text-violet-900">{tt("contact.side.title")}</h2>
              <ol className="mt-3 list-inside list-decimal space-y-2">
                <li>{tt("contact.side.step1")}</li>
                <li>{tt("contact.side.step2")}</li>
                <li>{tt("contact.side.step3")}</li>
              </ol>

              <div className="mt-6 rounded-2xl bg-violet-50 p-4">
                <p className="text-xs text-violet-900">
                  <b>{tt("contact.side.privacy.b")}</b>{" "}
                  {tt("contact.side.privacy.t")}
                </p>
              </div>

              <div className="mt-6 space-y-1 text-sm">
                <p>📍 Florida, United States</p>
                <p>📞 +1 305-8983160</p>
                <p>
                  ✉️ <a href="mailto:info@eirybot.com" className="underline">info@eirybot.com</a>
                </p>
                <div className="mt-2 flex gap-3">
                  <a href="https://www.facebook.com/eirybot" target="_blank" className="underline" rel="noreferrer">Facebook</a>
                  <a href="https://www.instagram.com/eirybot" target="_blank" className="underline" rel="noreferrer">Instagram</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
