import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ink px-6 py-32 text-center text-bone">
      <span className="font-display text-[22vw] font-light leading-none text-white/[0.06] sm:text-[14rem]">
        404
      </span>
      <h1 className="-mt-8 font-display text-4xl font-light sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-md text-sm text-travertine/60">{t('text')}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bone hover:text-ink"
      >
        {t('cta')}
      </Link>
    </section>
  );
}
