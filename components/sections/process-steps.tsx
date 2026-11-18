'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { SectionHeading } from '@/components/section-heading';

type Step = { n: string; label: string; title: string; text: string };

export function ProcessSteps() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Step[];
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section className="bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          className="mb-14"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Étapes */}
          <div className="lg:col-span-5">
            <ul className="space-y-1">
              {steps.map((s, i) => (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'group flex w-full items-center gap-5 border-b border-ink/10 py-5 text-left transition-colors',
                      i === active ? 'text-ink' : 'text-ink/40'
                    )}
                  >
                    <span
                      className={cn(
                        'font-mono text-xs transition-colors',
                        i === active ? 'text-terracotta' : 'text-ink/30'
                      )}
                    >
                      {s.n}
                    </span>
                    <span className="font-display text-2xl font-light sm:text-3xl">
                      {s.label}
                    </span>
                    <motion.span
                      className="ml-auto text-terracotta"
                      animate={{ opacity: i === active ? 1 : 0, x: i === active ? 0 : -6 }}
                    >
                      →
                    </motion.span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Détail */}
          <div className="lg:col-span-7">
            <div className="relative flex h-full min-h-[300px] flex-col justify-center overflow-hidden rounded-3xl bg-shell p-8 sm:p-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] leading-none text-ink/[0.05] sm:text-[14rem]"
              >
                {current.n}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.n}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 max-w-lg"
                >
                  <span className="label text-terracotta">{current.label}</span>
                  <h3 className="mt-4 font-display text-3xl font-light sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-ink/65">
                    {current.text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Barre de progression */}
              <div className="relative z-10 mt-10 h-px w-full bg-ink/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-terracotta"
                  animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
