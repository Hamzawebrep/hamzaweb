import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Le routage localisé est assuré par les routes App Router explicites.
  // Garder le middleware hors des requêtes du site évite l'invocation Edge
  // qui échoue sur le déploiement Vercel actuel.
  matcher: '/__next_intl_middleware_disabled__',
};
