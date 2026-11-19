'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { cn } from '@/lib/cn';

const NAV: { href: AppPathname; key: string }[] = [
  { href: '/', key: 'home' },
  { href: '/projets', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/processus', key: 'process' },
  { href: '/a-propos', key: 'about' },
  { href: '/contact', key: 'contact' },
];

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <nav
        className={cn(
          'w-full max-w-6xl rounded-full border transition-all duration-500',
          scrolled
            ? 'border-white/10 bg-ink/80 py-2.5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'border-transparent bg-ink/40 py-3.5 backdrop-blur-md'
        )}
      >
        <div className="flex items-center justify-between gap-4 px-3 sm:px-5">
          {/* Marque */}
          <Link href="/" className="group flex min-w-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="AM Atelier"
              className="h-9 w-9 rounded-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10"
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-bone sm:text-sm sm:tracking-[0.2em]">
                AM Atelier
              </span>
              <span className="whitespace-nowrap font-display text-[9px] italic text-travertine/80 sm:text-[11px]">
                Microciment &amp; Béton Ciré
              </span>
            </span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-xs uppercase tracking-[0.14em] transition-colors',
                    active ? 'text-white' : 'text-travertine/75 hover:text-white'
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-terracotta"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden text-travertine sm:flex" />
            <Link
              href="/contact"
              className="hidden rounded-full bg-terracotta px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-bone hover:text-ink sm:inline-block"
            >
              {t('cta')}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t('menu')}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 text-white transition hover:bg-white/10 xl:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-4 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-current"
              />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden xl:hidden"
            >
              <div className="mx-2 mt-3 mb-2 flex flex-col rounded-3xl border border-white/10 bg-ink/95 p-3">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.16em] transition-colors',
                      pathname === item.href
                        ? 'bg-white/5 text-white'
                        : 'text-travertine/85 hover:bg-white/5'
                    )}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <div className="mt-2 flex items-center justify-between px-2 pt-2">
                  <LocaleSwitcher className="text-travertine" />
                  <Link
                    href="/contact"
                    className="rounded-full bg-terracotta px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
                  >
                    {t('cta')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
