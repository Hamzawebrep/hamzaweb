import type { MetadataRoute } from 'next';

import { getPathname } from '@/i18n/navigation';
import { routing, type AppPathname } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const hrefs = Object.keys(routing.pathnames) as AppPathname[];

  return hrefs.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: SITE_URL + getPathname({ locale, href }),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: href === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, SITE_URL + getPathname({ locale: l, href })])
        ),
      },
    }))
  );
}
