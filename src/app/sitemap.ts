import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eirybot.com";

  // Rutas que existen en el proyecto
  const routes = [
    "",             // home
    "/about",
    "/services",
    "/contact",
    "/privacy",
    "/landing-page",
  ];

  const locales = ["es", "en"];

  // Generamos URLs para /es/... y /en/...
  const sitemapEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  return sitemapEntries;
}
