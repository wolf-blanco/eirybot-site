// src/components/site-footer.tsx
import Link from "next/link";

type Dict = Record<string, string | string[]>;

export default function SiteFooter({
  locale,
  dict,
}: {
  locale: "es" | "en";
  dict: Dict;
}) {
  const t = dict;

  // Helper: siempre devuelve string aunque el valor sea string[]
  const s = (k: string) => {
    const v = t[k as keyof typeof t];
    return Array.isArray(v) ? v.join(" ") : String(v ?? "");
  };

  const year = new Date().getFullYear();
  const rights = s("footer.rights").replace("{year}", String(year));

  return (
    <footer className="mt-16 bg-gradient-to-r from-violet-900 to-fuchsia-800 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Columna: marca */}
          <div>
            <Link href={`/${locale}`} aria-label="EiryBot - Home" className="inline-flex">
              <img
                src="/eirylogopdf2.png"
                alt="EiryBot"
                className="h-8 w-auto"
                style={{ imageRendering: "auto" }}
              />
            </Link>
            <p className="mt-3 text-sm text-violet-100/90">{s("footer.lead")}</p>
            <div className="mt-4 flex gap-3 text-sm">
              <a href="https://www.facebook.com/eirybot" target="_blank" className="underline">
                Facebook
              </a>
              <a href="https://www.instagram.com/eirybot" target="_blank" className="underline">
                Instagram
              </a>
            </div>
          </div>

          {/* Columna: links 1 */}
          <div>
            <h4 className="mb-2 font-semibold">{s("footer.col.services.title")}</h4>
            <ul className="space-y-1 text-sm text-violet-100/90">
              <li>
                <Link href={`/${locale}/services`} className="hover:underline">
                  {s("footer.col.services.link1")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:underline">
                  {s("footer.col.services.link2")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:underline">
                  {s("footer.col.services.link3")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna: links 2 */}
          <div>
            <h4 className="mb-2 font-semibold">{s("footer.col.list.title")}</h4>
            <ul className="space-y-1 text-sm text-violet-100/90">
              <li>
                <Link href={`/${locale}`} className="hover:underline">
                  {s("footer.col.list.home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:underline">
                  {s("footer.col.list.about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:underline">
                  {s("footer.col.list.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna: contacto */}
          <div>
            <h4 className="mb-2 font-semibold">{s("footer.col.contact.title")}</h4>
            <ul className="space-y-1 text-sm text-violet-100/90">
              <li>📍 Florida, United States</li>
              <li>📞 +1 305-8983160</li>
              <li>
                ✉️{" "}
                <a href="mailto:info@eirybot.com" className="underline">
                  info@eirybot.com
                </a>
              </li>
              <li className="pt-1">
                <Link href={`/${locale}/contact`} className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/15">
                  {s("footer.contact.cta")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-violet-200 md:flex-row">
          <span>{rights}</span>
          <span className="opacity-80">{s("footer.made")}</span>
        </div>
      </div>
    </footer>
  );
}
