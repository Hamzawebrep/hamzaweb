import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/section-heading';

type Faq = { q: string; a: string };

export async function Faq() {
  const t = await getTranslations('faq');
  const items = t.raw('items') as Faq[];

  return (
    <section className="bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
                    <span className="font-display text-lg font-light sm:text-xl">
                      {item.q}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-lg transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 text-sm leading-relaxed text-ink/60">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
