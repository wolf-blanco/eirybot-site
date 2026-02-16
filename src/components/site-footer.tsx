"use client";

import Link from "next/link";

type Dict = Record<string, string | string[]>;

export default function SiteFooter({
  locale,
  dict,
}: {
  locale: "es" | "en";
  dict: Dict;
}) {
  // helper seguro para strings
  const ts = (k: string, fb?: string) =>
    (typeof dict[k] === "string" ? (dict[k] as string) : fb) ?? k;

  const year = new Date().getFullYear();

  const colCompany = [
    { href: `/${locale}`, label: ts("footer.links.home", "Inicio") },
    { href: `/${locale}/about`, label: ts("footer.links.about", "Nosotros") },
    { href: `/${locale}/services`, label: ts("footer.links.services", "Servicios") },
    { href: `/${locale}/blog`, label: ts("footer.links.blog", "Blog") },
    { href: `/${locale}/contact`, label: ts("footer.links.contact", "Contacto") },
  ];

  const colResources = [
    { href: `/${locale}/privacy`, label: ts("footer.links.privacy", "Privacidad") },
    { href: "https://scan.eirybot.com", label: ts("footer.links.scan", "Probar EiryScan") },
    { href: "https://eirybot-dashboard.web.app/login", label: ts("footer.links.login", "Acceso clientes") },
  ];

  const contact = {
    address: ts("footer.contact.address", "Florida, United States"),
    phone: ts("footer.contact.phone", "+1 305-8983160"),
    email: ts("footer.contact.email", "info@eirybot.com"),
  };

  // util para clases de links
  const linkCls =
    "transition-opacity hover:opacity-100 opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm";

  const sectionTitleCls =
    "text-[11px] uppercase tracking-wide font-semibold text-white/80";

  const itemTextCls = "text-sm text-violet-200 leading-6";

  return (
    <footer className="mt-14 bg-violet-900 text-violet-50">
      {/* Cuerpo del footer */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* 4 columnas: brand + (empresa/recursos/contacto) con alineación elegante */}
        <div className="grid gap-y-10 md:grid-cols-4 md:gap-x-8">
          {/* Brand */}
          <div className="flex flex-col">
            <Link
              href={`/${locale}`}
              aria-label="EiryBot - Home"
              className="inline-flex items-center"
            >
              <img
                src="/eirylogopdf2.png"
                alt="EiryBot"
                className="h-8 w-auto"
                style={{ imageRendering: "auto" }}
              />
            </Link>

            <p className="mt-3 text-sm leading-6 text-violet-200">
              {ts(
                "footer.blurb",
                "Automatizamos procesos con chatbots, integraciones y métricas 24/7 para tu negocio."
              )}
            </p>

            {/* Social minimal elegante */}
            <div className="mt-4 flex gap-2.5 text-sm">
              <a
                href="https://www.facebook.com/eirybot"
                target="_blank"
                rel="noreferrer noopener"
                className={`${linkCls} underline underline-offset-4`}
              >
                Facebook
              </a>
              <span className="opacity-40">•</span>
              <a
                href="https://www.instagram.com/eirybot"
                target="_blank"
                rel="noreferrer noopener"
                className={`${linkCls} underline underline-offset-4`}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Cols 2–4: alineadas con borde y padding para look corporativo */}
          <div className="md:col-span-3">
            <div className="grid sm:grid-cols-2 md:grid-cols-3">
              {/* Empresa */}
              <div className="md:border-l md:border-white/10 md:pl-6 lg:pl-8">
                <h3 className={sectionTitleCls}>
                  {ts("footer.col.company", "Empresa")}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {colCompany.map((l) => (
                    <li key={l.href} className={itemTextCls}>
                      <Link href={l.href} className={linkCls}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recursos */}
              <div className="md:border-l md:border-white/10 md:pl-6 lg:pl-8">
                <h3 className={sectionTitleCls}>
                  {ts("footer.col.resources", "Recursos")}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {colResources.map((l) => (
                    <li key={l.href} className={itemTextCls}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className={linkCls}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto */}
              <div className="md:border-l md:border-white/10 md:pl-6 lg:pl-8">
                <h3 className={sectionTitleCls}>
                  {ts("footer.col.contact", "Contacto")}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  <li className={itemTextCls}>📍 {contact.address}</li>
                  <li className={itemTextCls}>📞 {contact.phone}</li>
                  <li className={itemTextCls}>
                    ✉️{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className={`${linkCls} underline underline-offset-4`}
                    >
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-violet-200 md:flex-row">
          <span className="opacity-80">
            {ts("footer.rights", "© {year} EiryBot. Todos los derechos reservados.").replace(
              "{year}",
              String(year)
            )}
          </span>
          <span className="opacity-70">
            {ts("footer.made", "Hecho con ♥ desde Florida.")}
          </span>
        </div>
      </div>
    </footer>
  );
}
