'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { media } from '@/lib/media';
import { CountUp } from '@/components/motion/count-up';
import { Magnetic } from '@/components/motion/magnetic';

type Stat = { value: string; suffix: string; label: string };

export function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);

  const stats = t.raw('stats') as Stat[];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-14 pt-36 text-bone sm:pb-20"
    >
      {/* Image de fond parallaxe */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-0">
        <Image
          src={media.hero}
          alt={t('imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-end gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="label text-travertine">{t('eyebrow')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-[0.94] tracking-tight"
          >
            {t('titleA')}
            <br />
            <span className="italic text-terracotta">{t('titleB')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-travertine/80 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-bone hover:text-ink"
              >
                {t('ctaPrimary')}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/projets"
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/15"
              >
                {t('ctaSecondary')}
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Fiche technique */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-medium">
                    <CountUp to={Number(s.value)} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-travertine/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
