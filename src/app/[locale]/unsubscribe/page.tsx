import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import UnsubscribeForm from "@/components/unsubscribe-form";

// Opcional: metadata aquí SI QUIERES, pero NO en el client component
export const metadata = {
  title: "Unsubscribe — EiryBot",
};

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Manejo compat de Promise como en tus otras páginas
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: string }>)
      : (params as { locale: string });

  const locale = (resolved?.locale === "en" ? "en" : "es") as Locale;
  const t = getDict(locale);
  const base = `/${locale}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-violet-50/40">
      {/* Header compacto con logo */}
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-6">
        <Link href={base} aria-label="Ir al inicio">
          <Image
            src="/MASCOTA-EIRYBOT_2.png"
            alt="EiryBot"
            width={130}
            height={30}
            priority
            className="h-38 w-auto"
          />
        </Link>

        <Link
          href={base}
          className="rounded-full border border-violet-200 px-4 py-2 text-sm text-violet-700 hover:bg-violet-50"
        >
          {t["unsubscribe.back"] ?? "Volver al sitio"}
        </Link>
      </header>

      {/* Contenido */}
      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-violet-100 bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-violet-900 md:text-3xl">
            {t["unsubscribe.title"] ?? "¿Querés dejar de recibir nuestros correos?"}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t["unsubscribe.lead"] ??
              "Ingresá tu email para cancelar tu suscripción. Podés volver cuando quieras."}
          </p>

          <div className="mt-6">
            <UnsubscribeForm
              dict={t as Record<string, string>}
              scriptUrl="https://script.google.com/macros/s/AKfycbznt83pEXeIDguGwNbVKYoqe-5oGGR_os4Mx3ULYoNLWft7xdUe5OoAzZ6aeEamyLkZ/exec"
            />
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} EiryBot
          </p>
        </div>
      </section>
    </main>
  );
}
