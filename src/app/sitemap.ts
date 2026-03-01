import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eirybot.com";

  // Rutas que existen en el proyecto
  // Rutas con el mismo slug en ambos idiomas
  const standardRoutes = [
    "",             // home
    "/about",
    "/services",
    "/contact",
    "/privacy",
    "/landing-page",
    "/blog",
    "/whatsapp-chatbot",
  ];

  // Rutas con slugs localizados (diferentes segun el idioma)
  const localizedRoutes = [
    { es: "/automatizacion-procesos", en: "/process-automation" },
    { es: "/atencion-cliente-24-7", en: "/24-7-customer-support" },
  ];

  const locales = ["es", "en"] as const;

  // 1. Generar entradas para rutas estándar
  const standardEntries = standardRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 2. Generar entradas para rutas localizadas
  const localizedEntries = localizedRoutes.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${entry[locale]}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...standardEntries, ...localizedEntries];
}
