export type Locale = "es" | "en";

// Diccionario puede tener strings o arrays de strings (p. ej., bullets)
export type Dict = Record<string, string | string[]>;

// Síncrono: carga JSON según el locale
export function getDict(locale: Locale): Dict {
  const dict =
    locale === "en"
      ? require("../messages/en.json")
      : require("../messages/es.json");
  return dict as Dict;
}

// Helper seguro para leer claves como string
export function tt(dict: Dict, key: string, fallback?: string): string {
  const v = dict[key];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(" · ");
  return fallback ?? key;
}
