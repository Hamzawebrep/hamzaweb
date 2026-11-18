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

  const info: {
    label: string;
    value?: string;
    href?: string;
    values?: { value: string; href: string }[];
    links?: { label: string; href: string }[];
  }[] = [
    {
      label: t('infoPhone'),
      values: [contacts.phone, contacts.secondaryPhone].map((phone) => ({
        value: phone,
        href: `tel:${phone.replace(/[^\d+]/g, '')}`,
      })),
    },
    {
      label: t('infoSocial'),
      links: [
        { label: 'Instagram', href: contacts.instagram },
        { label: 'Facebook', href: contacts.facebook },
      ],
    },
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
                  {row.values ? (
                    <div className="mt-3 space-y-2 text-sm">
                      {row.values.map((item) => (
                        <a
                          key={item.value}
                          href={item.href}
                          className="block text-ink/80 transition-colors hover:text-terracotta"
                        >
                          {item.value}
                        </a>
                      ))}
                    </div>
                  ) : row.links ? (
                    <div className="mt-3 space-y-2 text-sm">
                      {row.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-ink/80 transition-colors hover:text-terracotta"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : row.href ? (
                    <a
                      href={row.href}
                      className="mt-3 block text-sm text-ink/80 transition-colors hover:text-terracotta"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="mt-3 break-words text-sm text-ink/80">{row.value}</p>
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
