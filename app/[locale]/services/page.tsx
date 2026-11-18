import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/sections/cta-band';
import { ProcessSteps } from '@/components/sections/process-steps';

type Service = {
  icon: string;
  title: string;
  text: string;
  bullets: string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.services' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.services');
  const items = t.raw('items') as Service[];

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="bg-bone py-24 text-ink sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <article className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-8 transition-colors hover:border-terracotta/40">
                <span className="font-display text-4xl text-terracotta">
                  {item.icon}
                </span>
                <h2 className="mt-6 font-display text-2xl font-light">
                  {item.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                  {item.text}
                </p>
                <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-3 text-sm text-ink/70"
                    >
                      <span className="h-1 w-1 rounded-full bg-terracotta" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessSteps />
      <CtaBand />
    </>
  );
}
