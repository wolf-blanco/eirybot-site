// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Normalizar: /ruta y /ruta/ iguales (excepto "/")
  const p = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  // ✅ 1) Redirects SEO (301) para URLs viejas (ANTES de i18n)
  if (p === "/politica-de-privacidad") {
    return NextResponse.redirect(new URL("/es/privacy", req.url), 301);
  }

  if (p === "/about_us") {
    return NextResponse.redirect(new URL("/es/about", req.url), 301);
  }

  // ✅ 2) Limpiar /feed (RSS viejo)
  if (p === "/feed") {
    return NextResponse.redirect(new URL("/es", req.url), 301);
  }

  // Ignora archivos estáticos / api
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Si ya está en /es o /en, sigue
  if (pathname.startsWith("/es") || pathname.startsWith("/en")) {
    return NextResponse.next();
  }

  // Redirige raíz y cualquier otra ruta a /es
  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
