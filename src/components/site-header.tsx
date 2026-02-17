// src/components/site-header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tt, type Locale, type Dict } from "@/lib/i18n";

function switchLocalePath(pathname: string, to: "es" | "en") {
  // Asegura que pathname empiece con "/"
  const safe = pathname?.startsWith("/") ? pathname : `/${pathname || ""}`;
  const parts = safe.split("/");

  // Si no hay segmento de idioma, lo insertamos
  if (!parts[1]) {
    parts[1] = to;
  } else {
    // Reemplaza el primer segmento por el nuevo idioma
    parts[1] = to;
  }

  const out = parts.join("/").replace(/\/{2,}/g, "/");
  return out || `/${to}`;
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-2 py-1 transition-colors ${active ? "text-white" : "text-white/80 hover:text-white"
        }`}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const pathname = usePathname() || `/${locale}`;

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-violet-900/20 bg-gradient-to-r from-violet-800 to-fuchsia-700 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href={`/${locale}`} aria-label="EiryBot - Home" className="flex items-center">
          <img
            src="/eirylogopdf2.png"
            alt="EiryBot"
            className="h-8 w-auto"
            style={{ imageRendering: "auto" }}
          />
        </Link>

        {/* Menú */}
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>
            {tt(dict, "nav.home", "Inicio")}
          </NavLink>
          <NavLink href={`/${locale}/about`} active={isActive(`/${locale}/about`)}>
            {tt(dict, "nav.about", "Nosotros")}
          </NavLink>
          <NavLink href={`/${locale}/services`} active={isActive(`/${locale}/services`)}>
            {tt(dict, "nav.services", "Servicios")}
          </NavLink>
          <NavLink href={`/${locale}/blog`} active={isActive(`/${locale}/blog`)}>
            {tt(dict, "nav.blog", "Blog")}
          </NavLink>
          <NavLink href={`/${locale}/contact`} active={isActive(`/${locale}/contact`)}>
            {tt(dict, "nav.contact", "Contacto")}
          </NavLink>
          <a
            href="https://demo.eirybot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-fuchsia-600 px-4 py-1 text-sm font-semibold transition hover:bg-fuchsia-500"
          >
            Demo
          </a>
          <a
            href="https://eirybot-dashboard.web.app/login"
            className="rounded-full bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
          >
            {tt(dict, "nav.login", "Acceso")}
          </a>
        </nav>

        {/* Idiomas */}
        <div className="flex items-center gap-2">
          <Link
            href={switchLocalePath(pathname, "es")}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0 text-xs transition
              ${locale === "es"
                ? "bg-white text-violet-600 border-white"
                : "bg-white/10 text-white border-white/40 hover:bg-white/30"
              }`}
            aria-label="Cambiar a Español"
          >
            <img src="/flags/es.svg" alt="ES" className="h-4 w-4" /> ES
          </Link>

          <Link
            href={switchLocalePath(pathname, "en")}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0 text-xs transition
              ${locale === "en"
                ? "bg-white text-violet-600 border-white"
                : "bg-white/20 text-white border-white/40 hover:bg-white/30"
              }`}
            aria-label="Switch to English"
          >
            <img src="/flags/en.svg" alt="EN" className="h-4 w-4" /> EN
          </Link>
        </div>
      </div>
    </header>
  );
}
