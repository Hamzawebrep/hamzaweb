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
            e.currentTarget.setPointerCapture(e.pointerId);
            dragging.current = true;
            update(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) update(e.clientX);
          }}
          onPointerUp={(e) => {
            dragging.current = false;
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={() => (dragging.current = false)}
          className="relative mx-auto h-[420px] max-w-5xl touch-none select-none overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[560px]"
        >
          {/* Avant */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.beforeAfter.before}
            alt={t('beforeAlt')}
            className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.5)_contrast(1.1)]"
          />
          <span className="absolute left-4 top-4 z-20 max-w-[45%] rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.12em] backdrop-blur-md sm:left-6 sm:top-6 sm:px-4 sm:text-[11px] sm:tracking-widest">
            <span className="sm:hidden">{t('beforeMobile')}</span>
            <span className="hidden sm:inline">{t('before')}</span>
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
            <span className="absolute right-4 top-4 z-20 max-w-[45%] rounded-full bg-terracotta px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.12em] text-white shadow-lg sm:right-6 sm:top-6 sm:px-4 sm:text-[11px] sm:tracking-widest">
              <span className="sm:hidden">{t('afterMobile')}</span>
              <span className="hidden sm:inline">{t('after')}</span>
            </span>
          </div>

          {/* Poignée */}
          <div
            role="slider"
            tabIndex={0}
            aria-label={t('sliderLabel')}
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}%`}
            onKeyDown={(e) => {
              if (e.key === 'Home') {
                e.preventDefault();
                setPos(4);
              } else if (e.key === 'End') {
                e.preventDefault();
                setPos(96);
              } else if (
                ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'].includes(e.key)
              ) {
                e.preventDefault();
                const delta =
                  e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -5 : 5;
                setPos((value) => Math.max(4, Math.min(96, value + delta)));
              }
            }}
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
