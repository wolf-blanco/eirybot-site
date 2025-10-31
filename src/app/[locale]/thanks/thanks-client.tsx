"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Dict, Locale } from "@/lib/i18n";

export default function ThanksClient({
  locale,
  dict: t,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const qs = useSearchParams();
  const base = `/${locale}`;

  // Código de referencia visible
  const refCode = useMemo(() => {
    const d = new Date();
    return (
      d.getFullYear().toString().slice(-2) +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      d.getDate().toString().padStart(2, "0") +
      "-" +
      d.getHours().toString().padStart(2, "0") +
      d.getMinutes().toString().padStart(2, "0")
    );
  }, []);

  // UTM passthrough para EiryScan
  const eiryscanHref = useMemo(() => {
    const keep = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const params = new URLSearchParams();
    keep.forEach((k) => {
      const v = qs.get(k);
      if (v) params.set(k, v);
    });
    const q = params.toString();
    return "https://scan.eirybot.com" + (q ? `?${q}` : "");
  }, [qs]);

  // WhatsApp con código de referencia (usa el dict)
  const whatsappMsg = `${t["thanks.whatsapp.greet"]} ${refCode}`;
  const whatsappHref =
    "https://wa.me/13058983160?text=" + encodeURIComponent(whatsappMsg);

  // Confetti
  useEffect(() => {
    (async () => {
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 130, spread: 70, startVelocity: 35, gravity: 0.9, scalar: 0.8, origin: { y: 0.3 } });
        setTimeout(
          () => confetti({ particleCount: 80, spread: 70, startVelocity: 25, gravity: 0.9, scalar: 0.7, origin: { y: 0.2, x: 0.8 } }),
          400
        );
      } catch {}
    })();
  }, []);

  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-white to-violet-50/40">
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm md:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-fuchsia-300/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />

          <header className="text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">✓</div>
            <h1 className="text-3xl font-extrabold text-violet-900 md:text-5xl">{t["thanks.title"]}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-700 md:text-lg">{t["thanks.lead"]}</p>
            <p className="mt-2 text-sm text-gray-500">
              {t["thanks.ref"]} <span className="font-medium text-violet-800">{refCode}</span>
            </p>
          </header>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
            {[
              { title: t["thanks.step1.title"], desc: t["thanks.step1.desc"] },
              { title: t["thanks.step2.title"], desc: t["thanks.step2.desc"] },
              { title: t["thanks.step3.title"], desc: t["thanks.step3.desc"] },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border bg-white p-5 text-center shadow-sm">
                <h3 className="font-semibold text-violet-900">{b.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={whatsappHref} className="rounded-full bg-violet-700 px-5 py-3 text-white transition hover:bg-violet-600">
              {t["thanks.cta.whatsapp"]}
            </a>
            <Link href={base} className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50">
              {t["thanks.cta.home"]}
            </Link>
            <a href={eiryscanHref} className="rounded-full border border-violet-300 px-5 py-3 text-violet-800 hover:bg-violet-50">
              {t["thanks.cta.scan"]}
            </a>
            <Link href={`${base}/contact`} className="rounded-full bg-white px-5 py-3 text-violet-800 shadow hover:brightness-110">
              {t["thanks.cta.meet"]}
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            {t["thanks.help"]} <a href="mailto:info@eirybot.com" className="underline">info@eirybot.com</a> {t["thanks.or"]} <span className="whitespace-nowrap">+1 305-8983160</span>.
          </div>
        </div>
      </section>
    </main>
  );
}
