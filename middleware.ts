import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf API, assets Next et fichiers statiques
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
