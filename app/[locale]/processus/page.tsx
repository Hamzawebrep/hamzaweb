import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { ProcessSteps } from '@/components/sections/process-steps';
import { CtaBand } from '@/components/sections/cta-band';

type Guarantee = { title: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.process' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.process');
  const guarantees = t.raw('guarantees') as Guarantee[];

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <ProcessSteps />

      <section className="bg-shell py-20 text-ink sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06} className="bg-shell">
                <div className="h-full p-7">
                  <h3 className="font-display text-xl font-light">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {g.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
