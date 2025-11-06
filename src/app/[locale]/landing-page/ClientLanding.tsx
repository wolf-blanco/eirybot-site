"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Dict = Record<string, string | string[]>;
export default function ClientLandingPage({
  locale,
  dict,
}: {
  locale: "es" | "en";
  dict: Dict;
}) {
  const ts = (k: string, fb?: string) =>
    (typeof dict[k] === "string" ? (dict[k] as string) : fb) ?? k;

  // ... aquí tu lógica de formulario, UTM, etc.
  // (ejemplo mínimo para que compile)
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/MASCOTA-EIRYBOT_3.png" // asegúrate de tener este PNG en /public
            alt="EiryBot Mascota"
            width={140}
            height={140}
            priority
          />
        </div>
        <span className="inline-block rounded-full border px-3 py-1 text-xs text-violet-700 border-violet-200">
          {ts("landing.hero.badge", "Nuevo")}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-violet-900 md:text-4xl">
          {ts("landing.hero.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-700">
          {ts("landing.hero.lead")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#form"
            className="rounded-full bg-violet-700 px-5 py-3 text-white shadow hover:bg-violet-600"
          >
            {ts("landing.hero.primary")}
          </a>
          <Link
            href={ "https://scan.eirybot.com/"}
            className="rounded-full border border-violet-200 px-5 py-3 text-violet-800 hover:bg-violet-50"
          >
            {ts("landing.hero.secondary")}
          </Link>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="bg-violet-50">
        <div className="mx-auto max-w-xl px-4 py-12">
          <h2 className="text-2xl font-bold text-violet-900 md:text-3xl">
            {ts("landing.form.title")}
          </h2>
          <p className="mt-2 text-gray-700">{ts("landing.form.lead")}</p>

          <form
            className="mt-6"
            action="https://script.google.com/macros/s/AKfycbwiyF7i29IcBb6wzMypBmFLUePnF0DEA6ii0v_PGHpN7Q3WG5P5FxiSvrwwG9V5PpCp7A/exec"
            method="POST"
            target="hidden_iframe"
            onSubmit={() => {
              setTimeout(() => {
                window.location.href =
                  locale === "es"
                    ? "https://eirybot.com/thanks/"
                    : "https://eirybot.com/en/thanks/";
              }, 900);
            }}
          >
            <label className="mb-2 block font-medium">
              {ts("landing.form.email.label")}
            </label>
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={ts("landing.form.email.placeholder", "tu@empresa.com")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
            {/* Hidden fields ejemplo */}
            <input id="campoCampania" name="nombre" type="hidden" />
            <input id="utm_campaign" name="utm_campaign" type="hidden" />
            <input id="utm_source" name="utm_source" type="hidden" />
            <input id="utm_medium" name="utm_medium" type="hidden" />
            <input id="mc_cid" name="mc_cid" type="hidden" />
            <input id="mc_eid" name="mc_eid" type="hidden" />
            <input id="referrer" name="referrer" type="hidden" />

            <button
              type="submit"
              className="mt-3 w-full rounded-full bg-violet-700 px-5 py-3 font-semibold text-white hover:bg-violet-600"
            >
              {ts("landing.form.submit")}
            </button>
            <p className="mt-2 text-center text-sm text-gray-500">
              {ts("landing.form.legal")}
            </p>
          </form>
          <iframe name="hidden_iframe" style={{ display: "none" }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-8 text-center text-sm text-gray-500">
        {ts("landing.footer.note", "© {year} EiryBot. Todos los derechos reservados.").replace(
          "{year}",
          String(new Date().getFullYear())
        )}{" "}
        ·{" "}
        <Link href={`/${locale}/privacy`} className="text-violet-700 hover:underline">
          {ts("landing.footer.privacy")}
        </Link>
      </footer>
    </main>
  );
}
