import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { contacts, media } from '@/lib/media';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { SocialLinks } from '@/components/social-links';
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
                    <SocialLinks
                      links={row.links}
                      variant="light"
                      className="mt-4"
                    />
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

      <section className="bg-bone pb-4 text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl bg-ink text-bone lg:grid-cols-2">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[460px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.ceo}
                  alt={t('founderAlt')}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="label text-terracotta">{t('founderEyebrow')}</span>
                <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">
                  {t('founderTitle')}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-travertine/70">
                  {t('founderText')}
                </p>
                <div className="mt-7 flex items-center gap-4">
                  <span className="h-px w-12 bg-terracotta" />
                  <span className="font-display text-lg italic text-clay">
                    Hamza Tagdalt — {t('founderRole')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Estimate />
      <Faq />
    </>
  );
}
