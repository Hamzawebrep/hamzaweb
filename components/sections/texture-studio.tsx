'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/section-heading';
import { Magnetic } from '@/components/motion/magnetic';

type Color = { hex: string; name: string; desc: string; use: string };
type Finish = { id: string; name: string; hint: string };

const BASE_TEXTURE =
  'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 60%), repeating-radial-gradient(circle at 70% 80%, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 2px, transparent 3px, transparent 8px)';

const FINISH_STYLE: Record<string, React.CSSProperties> = {
  mat: { filter: 'contrast(0.95) brightness(0.96)' },
  satine: { boxShadow: 'inset 0 0 90px rgba(255,255,255,0.14)' },
  poli: {
    backgroundImage:
      'linear-gradient(125deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.14) 100%)',
  },
  anti: {
    backgroundImage: 'radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px)',
    backgroundSize: '6px 6px',
  },
};

function isLight(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

export function TextureStudio() {
  const t = useTranslations('studio');
  const colors = t.raw('colors') as Color[];
  const finishes = t.raw('finishes') as Finish[];

  const [colorIdx, setColorIdx] = useState(0);
  const [finishIdx, setFinishIdx] = useState(1);

  const color = colors[colorIdx];
  const finish = finishes[finishIdx];
  const light = isLight(color.hex);

  return (
    <section className="bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          className="mb-14"
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Aperçu */}
          <div
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl p-8 shadow-2xl lg:col-span-7"
            style={{ backgroundColor: color.hex }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: BASE_TEXTURE, ...FINISH_STYLE[finish.id] }}
            />

            <div
              className={cn(
                'relative z-10 flex items-start justify-between',
                light ? 'text-ink' : 'text-bone'
              )}
            >
              <span className="rounded-full bg-black/15 px-3.5 py-1.5 text-[11px] uppercase tracking-widest backdrop-blur-md">
                {finish.name}
              </span>
              <span className="rounded-full bg-black/15 px-3.5 py-1.5 font-mono text-[11px] backdrop-blur-md">
                {color.hex}
              </span>
            </div>

            <div
              className={cn(
                'relative z-10 rounded-2xl border p-6 backdrop-blur-xl',
                light
                  ? 'border-ink/10 bg-white/50 text-ink'
                  : 'border-white/15 bg-black/40 text-bone'
              )}
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl italic">{color.name}</h3>
                  <p className="mt-1 max-w-sm text-sm opacity-85">
                    {color.desc}
                  </p>
                </div>
                <div className="text-right">
                  <div className="label opacity-65">{t('usageLabel')}</div>
                  <div className="text-sm font-medium">{color.use}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles */}
          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-ink/5 bg-white p-8 shadow-xl lg:col-span-5">
            <div>
              <label className="label mb-4 block text-ink/55">
                {t('colorLabel')}
              </label>
              <div className="grid grid-cols-5 gap-3">
                {colors.map((c, i) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setColorIdx(i)}
                    title={c.name}
                    aria-label={c.name}
                    aria-pressed={i === colorIdx}
                    className={cn(
                      'aspect-square w-full rounded-2xl border border-black/10 transition-transform hover:scale-105',
                      i === colorIdx && 'ring-2 ring-ink ring-offset-2'
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-ink">{color.name}</p>
            </div>

            <div>
              <label className="label mb-4 block text-ink/55">
                {t('finishLabel')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {finishes.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinishIdx(i)}
                    aria-pressed={i === finishIdx}
                    className={cn(
                      'rounded-xl border px-4 py-3.5 text-left text-sm transition-all',
                      i === finishIdx
                        ? 'border-ink bg-ink text-white'
                        : 'border-ink/15 hover:border-ink/60'
                    )}
                  >
                    <div className="font-semibold">{f.name}</div>
                    <div
                      className={cn(
                        'text-xs',
                        i === finishIdx ? 'opacity-70' : 'text-ink/55'
                      )}
                    >
                      {f.hint}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Magnetic className="w-full">
              <Link
                href="/contact"
                className="block w-full rounded-2xl bg-terracotta py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                {t('cta')} →
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
