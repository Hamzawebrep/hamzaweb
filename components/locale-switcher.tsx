'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname as never, { locale: next });
    });
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full border border-white/20 p-1',
        isPending && 'opacity-60',
        className
      )}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          aria-label={l === 'fr' ? 'Français' : 'English'}
          className={cn(
            'px-2.5 py-1 rounded-full text-[11px] uppercase tracking-widest transition-colors',
            l === locale
              ? 'bg-terracotta text-white'
              : 'hover:bg-white/10'
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
