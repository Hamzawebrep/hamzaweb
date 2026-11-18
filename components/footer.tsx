import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { contacts } from '@/lib/media';

const NAV: { href: AppPathname; key: string }[] = [
  { href: '/projets', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/processus', key: 'process' },
  { href: '/a-propos', key: 'about' },
  { href: '/contact', key: 'contact' },
];

export async function Footer() {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const year = new Date().getFullYear();

  const zones = t.raw('zones') as string[];

  return (
    <footer className="relative overflow-hidden bg-ink text-travertine">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marque */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="AM Atelier"
                className="h-12 w-12 rounded-full object-contain"
              />
              <div className="leading-tight">
                <div className="text-lg font-semibold uppercase tracking-[0.2em] text-bone">
                  AM Atelier
                </div>
                <div className="font-display text-sm italic text-terracotta">
                  {t('brand')}
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-travertine/70">
              {t('about')}
            </p>
            <p className="mt-4 font-display text-lg italic text-terracotta/90">
              {t('signature')}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="label text-bone/60">{t('navTitle')}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-travertine/75 transition-colors hover:text-terracotta"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones */}
          <div className="lg:col-span-2">
            <h3 className="label text-bone/60">{t('zonesTitle')}</h3>
            <ul className="mt-5 space-y-3 text-sm text-travertine/75">
              {zones.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="label text-bone/60">{t('contactTitle')}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${contacts.phone.replace(/\s/g, '')}`}
                  className="text-travertine/75 transition-colors hover:text-terracotta"
                >
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="break-all text-travertine/75 transition-colors hover:text-terracotta"
                >
                  {contacts.email}
                </a>
              </li>
              <li className="flex gap-2 pt-2">
                {[
                  { l: 'Instagram', h: contacts.instagram, txt: 'IG' },
                  { l: 'Facebook', h: contacts.facebook, txt: 'FB' },
                  { l: 'WhatsApp', h: contacts.whatsapp, txt: 'WA' },
                ].map((s) => (
                  <a
                    key={s.l}
                    href={s.h}
                    aria-label={s.l}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    {s.txt}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-travertine/45 sm:flex-row">
          <p>
            © {year} AM Atelier. {t('rights')}
          </p>
          <p className="font-display italic">{t('credit')}</p>
        </div>
      </div>

      {/* Wordmark décoratif */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-6 text-center font-display text-[18vw] leading-none tracking-tight text-white/[0.035]"
      >
        AM Atelier
      </div>
    </footer>
  );
}
