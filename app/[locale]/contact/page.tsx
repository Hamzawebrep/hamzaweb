import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { contacts } from '@/lib/media';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { Estimate } from '@/components/sections/estimate';
import { Faq } from '@/components/sections/faq';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.contact');

  const info = [
    { label: t('infoPhone'), value: contacts.phone, href: `tel:${contacts.phone.replace(/\s/g, '')}` },
    { label: t('infoEmail'), value: contacts.email, href: `mailto:${contacts.email}` },
    { label: t('infoZones'), value: t('infoZonesValue') },
    { label: t('infoHours'), value: t('infoHoursValue') },
  ];

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="bg-bone pt-16 pb-4 text-ink sm:pt-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((row, i) => (
              <Reveal key={row.label} delay={i * 0.06} className="bg-bone">
                <div className="h-full p-6">
                  <div className="label text-terracotta">{row.label}</div>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="mt-3 block text-sm text-ink/80 transition-colors hover:text-terracotta"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-sm text-ink/80">{row.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Estimate />
      <Faq />
    </>
  );
}
