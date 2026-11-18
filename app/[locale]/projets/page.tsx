import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/page-hero';
import { ProjectGallery } from '@/components/sections/project-gallery';
import { CtaBand } from '@/components/sections/cta-band';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.projects' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projects');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
      <ProjectGallery withHeading={false} />
      <CtaBand />
    </>
  );
}
