import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "es";

  return constructMetadata({
    title: locale === "es" ? "Negocios - EiryBot" : "Business - EiryBot",
    description: locale === "es"
      ? "Soluciones de IA para negocios y empresas."
      : "AI solutions for businesses and enterprises.",
    locale,
    pathEs: "/business",
    pathEn: "/business",
  });
}

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Business</h1>
      <p className="mt-2 text-gray-600">Contenido pendiente de migrar desde WordPress.</p>
    </section>
  );
}
