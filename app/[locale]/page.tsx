import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { Manifesto } from '@/components/sections/manifesto';
import { Pillars } from '@/components/sections/pillars';
import { TextureStudio } from '@/components/sections/texture-studio';
import { BeforeAfter } from '@/components/sections/before-after';
import { ProjectGallery } from '@/components/sections/project-gallery';
import { Advantages } from '@/components/sections/advantages';
import { ProcessSteps } from '@/components/sections/process-steps';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Estimate } from '@/components/sections/estimate';
import { CtaBand } from '@/components/sections/cta-band';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: { absolute: t('title') } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Pillars />
      <TextureStudio />
      <BeforeAfter />
      <ProjectGallery />
      <Advantages />
      <ProcessSteps />
      <Testimonials />
      <Faq />
      <Estimate />
      <CtaBand />
    </>
  );
}
