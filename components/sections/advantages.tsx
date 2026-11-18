import { getTranslations } from 'next-intl/server';

import { media } from '@/lib/media';
import { Reveal } from '@/components/motion/reveal';

type Advantage = { tag: string; title: string; text: string };

export async function Advantages() {
  const t = await getTranslations('advantages');
  const items = t.raw('items') as Advantage[];

  const [first, second, third, fourth] = items;

  return (
    <section className="bg-shell py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12">
          <span className="label text-terracotta">{t('eyebrow')}</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-light tracking-tight sm:text-5xl">
            {t('title')}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Grande carte */}
          <Reveal className="lg:col-span-2">
            <article className="flex h-full flex-col justify-between rounded-3xl bg-ink p-8 text-bone sm:p-10">
              <span className="label text-terracotta">{first.tag}</span>
              <div className="mt-16">
                <h3 className="font-display text-3xl font-light leading-tight sm:text-4xl">
                  {first.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-travertine/70">
                  {first.text}
                </p>
              </div>
            </article>
          </Reveal>

          {/* Image */}
          <Reveal delay={0.08} className="lg:row-span-2">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.advantagesImage}
                alt={t('imageAlt')}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Deux cartes moyennes */}
          {[second, third].map((item, i) => (
            <Reveal key={item.title} delay={0.12 + i * 0.06}>
              <article className="h-full rounded-3xl border border-ink/10 bg-bone p-7">
                <span className="label text-clay">{item.tag}</span>
                <h3 className="mt-4 font-display text-2xl font-light">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}

          {/* Carte large */}
          <Reveal delay={0.2} className="lg:col-span-3">
            <article className="flex flex-col items-start gap-4 rounded-3xl bg-terracotta p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <span className="label text-white/70">{fourth.tag}</span>
                <h3 className="mt-3 font-display text-3xl font-light">
                  {fourth.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm text-white/80">
                  {fourth.text}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
