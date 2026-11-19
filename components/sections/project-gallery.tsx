'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { projectImages, type ProjectId } from '@/lib/media';
import { SectionHeading } from '@/components/section-heading';

type Item = { id: ProjectId; title: string; city: string; category: string };

const FILTERS = ['all', 'residential', 'hospitality', 'retail'] as const;

export function ProjectGallery({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  const t = useTranslations('projects');
  const items = t.raw('items') as Item[];
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');
  const shouldReduceMotion = useReducedMotion();

  const visible =
    filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <section className="bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {withHeading && (
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
            className="mb-10"
          />
        )}

        {/* Filtres */}
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors',
                filter === f
                  ? 'border-ink bg-ink text-bone'
                  : 'border-ink/15 text-ink/65 hover:border-ink/50'
              )}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        {/* Grille */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileHover={shouldReduceMotion ? undefined : { y: -7, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projectImages[item.id]}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                  {t(`filters.${item.category}`)}
                </span>

                <div className="absolute inset-x-5 bottom-5 text-white">
                  <h3 className="font-display text-xl">{item.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                    {item.city}
                  </p>
                </div>

                <span className="absolute bottom-5 right-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-terracotta text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
