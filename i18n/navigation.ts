import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers de navigation typés et conscients de la locale
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
