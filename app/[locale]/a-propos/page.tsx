import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { media } from '@/lib/media';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { Pillars } from '@/components/sections/pillars';
import { Testimonials } from '@/components/sections/testimonials';
import { CtaBand } from '@/components/sections/cta-band';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about');
  const story = t.raw('story') as string[];

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('lead')} />

      <section className="bg-bone py-24 text-ink sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.about}
                alt={t('portraitAlt')}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-7">
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="mb-6 text-lg leading-relaxed text-ink/75 last:mb-0">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-terracotta" />
                <span className="font-display text-xl italic text-clay">
                  Hamza Tagdalt
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Pillars />
      <Testimonials />
      <CtaBand />
    </>
  );
}
