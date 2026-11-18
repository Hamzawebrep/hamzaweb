import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Langues supportées : français (défaut) et anglais
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  // URLs localisées (SEO) : /fr/projets <-> /en/projects
  pathnames: {
    '/': '/',
    '/projets': { fr: '/projets', en: '/projects' },
    '/services': { fr: '/services', en: '/services' },
    '/processus': { fr: '/processus', en: '/process' },
    '/a-propos': { fr: '/a-propos', en: '/about' },
    '/contact': { fr: '/contact', en: '/contact' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
