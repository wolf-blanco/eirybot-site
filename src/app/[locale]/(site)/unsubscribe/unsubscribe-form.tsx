// src/app/\[locale\]/unsubscribe/unsubscribe-form.tsx 

"use client";

import { useEffect, useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { colUnsubscribes, colErrorLog } from "@/lib/paths";

export default function UnsubscribeForm({
  dict,
  scriptUrl, // opcional: doble escritura a GAS
}: {
  dict: Record<string, string>;
  scriptUrl?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "ok" | "already" | "error" | "network">("idle");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("email");
      if (fromUrl) setEmail(fromUrl);
    } catch {}
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams;

      const emailLower = email.trim().toLowerCase();
      const payload = {
        email: emailLower,
        utm_campaign: q.get("utm_campaign") || null,
        utm_source:   q.get("utm_source")   || null,
        utm_medium:   q.get("utm_medium")   || null,
        mc_cid:       q.get("mc_cid")       || null,
        mc_eid:       q.get("mc_eid")       || null,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent || null,
        locale: (q.get("locale") === "en" || q.get("locale") === "es") ? q.get("locale") : "es",
        createdAt: serverTimestamp(),   // ← coincide con tus reglas
        source: "unsubscribe_page",
      };

      // create-only (addDoc) para cumplir reglas (sin read/update)
      await addDoc(colUnsubscribes(), payload);

      // (opcional) doble escritura a GAS
      if (scriptUrl) {
        fetch(`${scriptUrl}?email=${encodeURIComponent(emailLower)}`).catch(() => {});
      }

      setStatus("ok");
    } catch (err: any) {
      console.error("Unsubscribe Firestore create failed:", err);
      // Intento de registrar error (tus reglas permiten create en error_log)
      try {
        await addDoc(colErrorLog(), {
          message: err?.message ?? String(err),
          stack: err?.stack ?? null,
          context: "unsubscribe",
          url: window.location.href,
          userAgent: navigator.userAgent,
          locale: (navigator.language?.startsWith("en") ? "en" : "es"),
          createdAt: serverTimestamp(), // ← coincide con tus reglas
        });
      } catch (e2) {
        console.error("Also failed to log error:", e2);
      }
      setStatus(err?.name === "TypeError" ? "network" : "error");
    }
  };

  const msg =
    status === "ok"
      ? dict["unsubscribe.msg.ok"] ?? "✅ Tu correo fue eliminado de nuestra lista. ¡Gracias!"
      : status === "already"
      ? dict["unsubscribe.msg.already"] ?? "ℹ️ Este correo ya estaba dado de baja."
      : status === "error"
      ? dict["unsubscribe.msg.error"] ?? "❌ Hubo un problema al cancelar la suscripción."
      : status === "network"
      ? dict["unsubscribe.msg.network"] ?? "❌ Error de red o conexión."
      : "";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          {dict["unsubscribe.label"] ?? "Email"}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={dict["unsubscribe.placeholder"] ?? "tu@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none ring-violet-300 focus:ring-2"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center justify-center rounded-full bg-violet-600 px-6 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
      >
        {status === "loading"
          ? (dict["common.processing"] ?? "Procesando…")
          : (dict["unsubscribe.submit"] ?? "Cancelar suscripción")}
      </button>

      {msg && (
        <p
          className={`text-sm ${
            status === "ok" ? "text-green-600"
            : status === "already" ? "text-amber-600"
            : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
