import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  return (
    <footer className="mt-16 bg-violet-900 text-violet-50">
      {/* Top */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Marca */}
          <div className="space-y-3">
            <Link href={base} className="inline-block">
              <Image
                src="/eirylogopdf2.png"
                alt="EiryBot"
                width={150}
                height={44}
                priority
              />
            </Link>
            <p className="text-sm text-violet-200">
              {t["footer.tagline"]}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/eirybot"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M22 12.06C22 6.52 17.52 2 12 2S2 6.52 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.87 3.77-3.87 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/eirybot"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7z" />
                  <path d="M12 7.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm0 7.2A2.7 2.7 0 1114.7 12 2.7 2.7 0 0112 14.7z" />
                  <circle cx="17.5" cy="6.5" r="1.2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Menú 1 */}
          <div>
            <p className="font-semibold text-white">{t["footer.menu.title"]}</p>
            <ul className="mt-3 space-y-2 text-sm text-violet-100">
              <li><Link href={base} className="hover:underline">{t["footer.menu.home"]}</Link></li>
              <li><Link href={`${base}/about`} className="hover:underline">{t["footer.menu.about"]}</Link></li>
              <li><Link href={`${base}/services`} className="hover:underline">{t["footer.menu.services"]}</Link></li>
              <li><Link href={`${base}/contact`} className="hover:underline">{t["footer.menu.contact"]}</Link></li>
              <li>
                <a
                  href="https://eirybot-dashboard.web.app/login"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t["footer.menu.login"]}
                </a>
              </li>
            </ul>
          </div>

          {/* Menú 2 */}
          <div>
            <p className="font-semibold text-white">{t["footer.resources.title"]}</p>
            <ul className="mt-3 space-y-2 text-sm text-violet-100">
              <li><Link href={`${base}/privacy`} className="hover:underline">{t["footer.resources.privacy"]}</Link></li>
              <li><Link href={`${base}/blog`} className="hover:underline">{t["footer.resources.blog"]}</Link></li>
              <li><Link href={`${base}/business`} className="hover:underline">{t["footer.resources.business"]}</Link></li>
              <li><Link href={`${base}/list`} className="hover:underline">{t["footer.resources.list"]}</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-semibold text-white">{t["footer.contact.title"]}</p>
            <ul className="mt-3 space-y-2 text-sm text-violet-100">
              <li>{t["footer.contact.address"]}</li>
              <li>
                <a className="hover:underline" href="tel:+13058983160">
                  {t["footer.contact.phone"]}
                </a>
              </li>
              <li>
                ✉️{" "}
                <a href="mailto:info@eirybot.com" className="underline">
                  {t["footer.contact.email"]}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-violet-200 md:flex-row">
          <span>{t["footer.rights"].replace("{year}", String(year))}</span>
          <span className="opacity-80">{t["footer.made"]}</span>
        </div>
      </div>
    </footer>
  );
}
