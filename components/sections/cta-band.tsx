import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/reveal';
import { Magnetic } from '@/components/motion/magnetic';

export async function CtaBand() {
  const t = await getTranslations('ctaBand');

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-terracotta/25 blur-[120px]"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="label text-terracotta">{t('eyebrow')}</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,5.5vw,4rem)] font-light leading-[1.03] tracking-tight">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm text-travertine/70 sm:text-base">
            {t('text')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-bone hover:text-ink"
              >
                {t('cta')}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
