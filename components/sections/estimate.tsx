'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { whatsappLink } from '@/lib/media';
import { SectionHeading } from '@/components/section-heading';

type Type = { value: string; label: string };

export function Estimate() {
  const t = useTranslations('estimate');
  const locale = useLocale();

  const types = t.raw('types') as Type[];
  const cities = t.raw('cities') as string[];

  const [surface, setSurface] = useState(80);
  const [typeIdx, setTypeIdx] = useState(0);
  const [city, setCity] = useState(cities[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const pricePerM2 = Number(types[typeIdx].value);

  const total = useMemo(
    () =>
      new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(
        surface * pricePerM2
      ),
    [surface, pricePerM2, locale]
  );

  const message = [
    t('waIntro'),
    `• ${t('waName')}: ${name || t('waNotProvided')}`,
    `• ${t('waPhone')}: ${phone || t('waNotProvided')}`,
    `• ${t('waSurface')}: ${surface} m²`,
    `• ${t('waType')}: ${types[typeIdx].label}`,
    `• ${t('waCity')}: ${city}`,
    `• ${t('waEstimate')}: ${total} ${t('priceUnit')}`,
  ].join('\n');

  return (
    <section id="devis" className="bg-shell py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('text')}
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Formulaire */}
          <div className="min-w-0 space-y-8 rounded-3xl border border-ink/5 bg-white p-5 shadow-xl sm:p-8 lg:col-span-7">
            {/* Surface */}
            <div>
              <div className="flex items-end justify-between">
                <label htmlFor="surface" className="label text-ink/55">
                  {t('surfaceLabel')}
                </label>
                <span className="font-display text-2xl">
                  {surface} <span className="text-sm">m²</span>
                </span>
              </div>
              <input
                id="surface"
                type="range"
                min={10}
                max={500}
                step={5}
                value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-sand accent-terracotta"
              />
            </div>

            {/* Type */}
            <div>
              <span className="label text-ink/55">{t('typeLabel')}</span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {types.map((tp, i) => (
                  <button
                    key={tp.value}
                    type="button"
                    onClick={() => setTypeIdx(i)}
                    className={
                      'rounded-xl border px-4 py-3 text-left text-sm transition-all ' +
                      (i === typeIdx
                        ? 'border-ink bg-ink text-white'
                        : 'border-ink/15 hover:border-ink/50')
                    }
                  >
                    {tp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ville + coordonnées */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label htmlFor="city" className="label text-ink/55">
                  {t('cityLabel')}
                </label>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm outline-none focus:border-terracotta"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                className="mt-3 w-full min-w-0 rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm outline-none focus:border-terracotta sm:mt-8"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="mt-3 w-full min-w-0 rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm outline-none focus:border-terracotta sm:mt-8"
              />
            </div>
          </div>

          {/* Résultat */}
          <div className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-bone shadow-2xl lg:col-span-5">
            <div>
              <span className="label text-terracotta">{t('resultLabel')}</span>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-light sm:text-6xl">
                  {total}
                </span>
                <span className="text-lg text-travertine/70">
                  {t('priceUnit')}
                </span>
              </div>
              <p className="mt-3 text-sm text-travertine/60">
                {t('resultTag')} · {surface} m²
              </p>
            </div>

            <div className="mt-10">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-2xl bg-terracotta py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-bone hover:text-ink"
              >
                {t('cta')}
              </a>
              <p className="mt-4 text-center text-xs text-travertine/55">
                {t('reassurance')}
              </p>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-travertine/40">
                {t('disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
