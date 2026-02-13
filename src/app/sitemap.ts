import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eirybot.com";
  const now = new Date();

  const paths = [
    "/es",
    "/es/about",
    "/es/services",
    "/es/contact",
    "/es/privacy",
    "/es/landing-page",

    "/en",
    "/en/about",
    "/en/services",
    "/en/contact",
    "/en/privacy",
    "/en/landing-page",
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/es" || path === "/en" ? 1 : 0.8,
  }));
}

