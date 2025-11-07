"use client";

import { useEffect, useState } from "react";

export default function UnsubscribeForm({
  dict,
  scriptUrl,
}: {
  dict: Record<string, string>;
  scriptUrl: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "ok" | "already" | "error" | "network">("idle");

  // Prefill desde ?email=
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("email");
      if (fromUrl) setEmail(fromUrl);
    } catch {
      /* ignore */
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch(`${scriptUrl}?email=${encodeURIComponent(email)}`);
      const txt = (await res.text()).trim().toLowerCase();
      if (txt === "success") setStatus("ok");
      else if (txt === "already_exists") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("network");
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
            status === "ok"
              ? "text-green-600"
              : status === "already"
              ? "text-amber-600"
              : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
