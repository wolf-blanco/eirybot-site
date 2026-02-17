export type Locale = "es" | "en";

// Diccionario puede tener strings o arrays de strings (p. ej., bullets)
export type Dict = Record<string, string | string[] | readonly string[]>;

import en from "../messages/en";
import es from "../messages/es";

// Síncrono: carga JSON según el locale
export function getDict(locale: Locale): Dict {
  const dict = locale === "en" ? en : es;
  return dict as Dict;
}

// Helper seguro para leer claves como string
export function tt(dict: Dict, key: string, fallback?: string): string {
  const v = dict[key];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(" · ");
  return fallback ?? key;
}
