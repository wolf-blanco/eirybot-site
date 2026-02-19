// src/app/[locale]/landing/LandingPageClient.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { colWebLeads, colErrorLog } from "@/lib/paths";

import { type Locale, type Dict } from "@/lib/i18n";

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

    const payloadFS = {
      email: emailTrim,
      createdAt: serverTimestamp(),
      locale,
      referrer,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      url: typeof window !== "undefined" ? window.location.href : "",
      source: "landing_page_pro",
      ...utm,
    };

    const campaignName = utm.utm_campaign || utm.mc_cid || "Directo";
    const body = new FormData();
    body.append("email", emailTrim);
    body.append("nombre", campaignName);
    Object.entries(utm).forEach(([k, v]) => body.append(k, v));
    body.append("referrer", referrer);
    body.append("locale", locale);
    body.append("url", typeof window !== "undefined" ? window.location.href : "");

    try {
      await addDoc(colWebLeads(), payloadFS);

      if (SHEETS_ENDPOINT) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);

        fetch(SHEETS_ENDPOINT, {
          method: "POST",
          body,
          mode: "no-cors",
          signal: ctrl.signal,
        })
          .catch(async (err: any) => {
            if (err?.name === "AbortError" || err?.message === "Failed to fetch") return;
            try {
              await addDoc(colErrorLog(), {
                message: err?.message ?? "GAS fetch failed",
                context: "landing/web_leads_gas",
                createdAt: serverTimestamp(),
              });
            } catch { }
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
      }, 1500);
    } catch (err: any) {
      console.error("Landing Firestore create failed:", err);
      setMsg({
        type: "err",
        text: t("landing.form.error", "Error. Intenta de nuevo."),
      });
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-violet-200">
      {/* 1. Header Minimalista */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-violet-900">
              eirybot<span className="text-violet-500">.</span>
            </span>
          </div>
          <a
            href="https://app.eirybot.com"
            className="text-sm font-semibold text-gray-600 hover:text-violet-700 transition"
          >
            {t("landing.nav.login", "Ingresar")}
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/50 via-white to-white -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-fuchsia-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t("landing.hero.badge", "Nuevo Motor IA 2026")}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
              {t("landing.hero.title", "Tu negocio no duerme.")}
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-lg">
              {t("landing.hero.lead", "Automatiza tu WhatsApp.")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-violet-900 rounded-full shadow-lg shadow-violet-900/20 hover:bg-violet-800 hover:scale-105 transition-all duration-300"
              >
                {t("landing.hero.primary", "Probar Demo")}
              </a>
              <a
                href="https://scan.eirybot.com"
                target="_blank"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-violet-900 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-violet-200 transition-all duration-300"
              >
                {t("landing.hero.secondary", "Auditoría EiryScan")}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                ))}
              </div>
              <p>{t("landing.trust.title", "Elegido por +100 empresas")}</p>
            </div>
          </div>

          <div className="relative mx-auto lg:mr-0">
            {/* Main Visual */}
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-full opacity-10 blur-3xl animate-pulse" />
              <Image
                src="/robot3.png"
                alt="EiryBot AI"
                width={600}
                height={600}
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                priority
              />
              {/* Floating Cards simulating UI */}
              <div className="absolute top-10 -right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-20 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">💬</div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Leads Hoy</p>
                    <p className="text-xl font-bold text-gray-900">+48</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem/Solution Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              {t("landing.problem.title", "¿Cuánto te cuesta no responder?")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-violet-100/50 flex items-center justify-center text-violet-600 mb-6 font-bold text-xl">
                  {i}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`landing.problem.${i}.t`, "Problema")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`landing.problem.${i}.d`, "Descripción del problema.")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EiryScan Feature Highlight - Dark Mode Style */}
      <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
        {/* Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-[#0a0a0a] to-[#0a0a0a]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6">
              {t("landing.scan.badge", "IA Exclusiva")}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                EiryScan™
              </span>
            </h2>
            <h3 className="text-2xl font-bold mb-6 text-gray-200">
              {t("landing.scan.title", "¿Tu WhatsApp pierde dinero?")}
            </h3>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {t("landing.scan.lead", "Auditoría en 2 minutos.")}
            </p>
            <a
              href="https://scan.eirybot.com"
              target="_blank"
              className="inline-flex items-center gap-2 border-b-2 border-violet-500 pb-1 text-violet-300 hover:text-white hover:border-white transition-colors text-lg font-bold"
            >
              {t("landing.scan.cta", "Auditar mi negocio")} →
            </a>
          </div>

          <div className="relative">
            {/* Abstract representation of a scan */}
            <div className="relative w-full aspect-video bg-gray-900/50 rounded-2xl border border-gray-800 p-8 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-800 rounded animate-pulse delay-75" />
                <div className="h-32 w-full bg-violet-900/20 border border-violet-500/30 rounded-xl flex items-center justify-center">
                  <span className="text-violet-400 font-mono text-sm">Scanning...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Demo Form Section */}
      <section id="demo" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-violet-900/10 border border-gray-100 p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {t("landing.form.title", "Empieza ahora")}
              </h2>
              <p className="text-gray-500">
                {t("landing.form.lead", "Acceso inmediato.")}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  {t("landing.form.email.label", "Email")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("landing.form.email.placeholder", "nombre@empresa.com") as string}
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-black hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                {t("landing.form.submit", "Obtener Demo")}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                {t("landing.form.legal", "Tus datos están seguros.")}
              </p>

              {msg.type && (
                <div className={`mt-4 p-4 rounded-xl text-center text-sm font-bold ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                  {msg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-12 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            {t("landing.footer.note", "© 2026 EiryBot.")} ·{" "}
            <Link href={`/${locale}/privacy`} className="hover:text-violet-600 transition">
              {t("landing.footer.privacy", "Privacidad")}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

