import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';

type Pillar = { icon: string; title: string; subtitle: string };

export async function Pillars() {
  const t = await getTranslations('pillars');
  const items = t.raw('items') as Pillar[];

  return (
    <section className="bg-shell py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="label text-terracotta">{t('eyebrow')}</span>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-4xl">
              {t('title')}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.07}
              className="group bg-shell transition-colors duration-500 hover:bg-bone"
            >
              <div className="flex h-full flex-col items-start gap-4 p-7">
                <span className="font-display text-3xl text-terracotta transition-transform duration-500 group-hover:-translate-y-1">
                  {item.icon}
                </span>
                <div className="mt-auto">
                  <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink/55">{item.subtitle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
