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
  const ts = (k: string, fb?: string) =>
    (typeof dict[k] === "string" ? (dict[k] as string) : fb) ?? fb ?? k;

  // ... aquí tu lógica interactiva (form submit, UTM, etc.)

  return (
    <main className="min-h-screen bg-white">
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
          <Link
            href="https://eirybot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-violet-200 px-4 py-2 text-violet-700 hover:bg-violet-50"
          >
            eirybot.com
          </Link>
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
            src="/mascota.png"
            alt={ts("landing.hero.alt", "EiryBot — Automatización 24/7")!}
            width={280}
            height={280}
            className="w-56 h-auto md:w-72"
            priority
          />
        </div>
      </section>

      {/* ...el resto de la landing (bloque formulario #demo, beneficios, features, CTA, footer) ... */}
    </main>
  );
}
