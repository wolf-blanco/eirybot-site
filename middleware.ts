// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignora archivos estáticos / api / _next
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.includes("/_next")
  ) {
    return NextResponse.next();
  }

  // ✅ 0) Normalizar Trailing Slash (Evitar loops)
  if (pathname.endsWith("/") && pathname !== "/") {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  // ✅ 1) Redirects SEO (308 Permanent Redirect) para URLs viejas SIN locale
  const legacyPaths: Record<string, string> = {
    "/services": "/es/services",
    "/contact": "/es/contact",
    "/business": "/es/business",
    "/about": "/es/about",
    "/privacy": "/es/privacy",
    "/landing-page": "/es/landing-page",
    "/about_us": "/es/about",
    "/politica-de-privacidad": "/es/privacy",
    "/feed": "/es",
  };

  if (legacyPaths[pathname]) {
    return NextResponse.redirect(new URL(legacyPaths[pathname], req.url), 308);
  }

  // ✅ 2) Redirección de raíz "/" -> "/es" (308)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", req.url), 308);
  }

  // Si ya tiene locale /es o /en, no hacemos nada más
  if (pathname.startsWith("/es") || pathname.startsWith("/en")) {
    return NextResponse.next();
  }

  // Para cualquier otra ruta que no tenga locale, forzamos /es (fallback)
  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
