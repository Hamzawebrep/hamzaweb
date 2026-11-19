import { getTranslations } from 'next-intl/server';

import { media } from '@/lib/media';
import { Reveal } from '@/components/motion/reveal';

export async function Manifesto() {
  const t = await getTranslations('manifesto');

  return (
    <section className="bg-bone py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.ceo}
              alt={t('imageAlt')}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <span className="label text-terracotta">{t('eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.02] tracking-tight text-ink">
              {t('title')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/70">
              {t('text')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-12 bg-terracotta" />
              <span className="font-display text-lg italic text-clay">
                {t('signature')}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
