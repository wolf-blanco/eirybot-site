"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function switchLocalePath(pathname: string, to: "es" | "en") {
  const parts = pathname.split("/");
  parts[1] = to;
  const out = parts.join("/");
  return out.startsWith("//") ? `/${to}` : out || `/${to}`;
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
      className={`px-2 py-1 transition-colors ${
        active ? "text-white" : "text-violet-/90 hover:text-white"
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
  locale: "es" | "en";
  dict: Record<string, string>;
}) {
  const pathname = usePathname();
  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-violet-900/20 bg-gradient-to-r from-violet-800 to-fuchsia-700 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo (sin texto al lado) */}
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
            {dict["nav.home"]}
          </NavLink>
          <NavLink href={`/${locale}/about`} active={isActive(`/${locale}/about`)}>
            {dict["nav.about"]}
          </NavLink>
          <NavLink href={`/${locale}/services`} active={isActive(`/${locale}/services`)}>
            {dict["nav.services"]}
          </NavLink>
          <NavLink href={`/${locale}/contact`} active={isActive(`/${locale}/contact`)}>
            {dict["nav.contact"]}
          </NavLink>
          <a
            href="https://eirybot-dashboard.web.app/login"
            className="rounded-full bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
          >
            {dict["nav.login"]}
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
