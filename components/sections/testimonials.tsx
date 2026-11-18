import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/section-heading';

type Testimonial = { quote: string; name: string; role: string };

export async function Testimonials() {
  const t = await getTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section className="bg-ink py-24 text-bone sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          light
          className="mb-14"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <div className="flex gap-1 text-terracotta" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s}>★</span>
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 font-display text-lg font-light italic leading-relaxed text-travertine/90">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <div className="text-sm font-semibold text-bone">
                    {item.name}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-travertine/55">
                    {item.role}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
