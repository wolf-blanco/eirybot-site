export type Locale = "es" | "en";

// Síncrono y simple: carga los JSON del diccionario
export function getDict(locale: Locale) {
  // Nota: con Next 13/14/15/16 app router, require() funciona en server.
  // Si prefieres import, hazlo dinámico y marca la función async.
  const dict =
    locale === "en"
      ? require("../messages/en.json")
      : require("../messages/es.json");

  return dict as Record<string, string>;
}
