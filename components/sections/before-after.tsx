'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { media } from '@/lib/media';
import { SectionHeading } from '@/components/section-heading';

export function BeforeAfter() {
  const t = useTranslations('beforeAfter');
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  }, []);

  return (
    <section className="bg-ink py-24 text-bone sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('text')}
          align="center"
          light
          className="mb-14"
        />

        <div
          ref={containerRef}
          onPointerDown={(e) => {
            dragging.current = true;
            update(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) update(e.clientX);
          }}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => (dragging.current = false)}
          className="relative mx-auto h-[420px] max-w-5xl touch-none select-none overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[560px]"
        >
          {/* Avant */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.beforeAfter.before}
            alt={t('beforeAlt')}
            className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.5)_contrast(1.1)]"
          />
          <span className="absolute left-6 top-6 z-20 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[11px] uppercase tracking-widest backdrop-blur-md">
            {t('before')}
          </span>

          {/* Après (clip) */}
          <div
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.beforeAfter.after}
              alt={t('afterAlt')}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute right-6 top-6 rounded-full bg-terracotta px-4 py-1.5 text-[11px] uppercase tracking-widest text-white shadow-lg">
              {t('after')}
            </span>
          </div>

          {/* Poignée */}
          <div
            className="absolute inset-y-0 z-30 w-px cursor-ew-resize bg-bone"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-ink shadow-[0_10px_34px_rgba(0,0,0,0.55)]">
              <span className="text-xs font-bold">⇄</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
