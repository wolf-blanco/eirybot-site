import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
  matcher: ["/((?!_next|.*\\..*).*)"]
};
