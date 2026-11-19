'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

type SocialLink = {
  label: string;
  href: string;
};

export function SocialLinks({
  links,
  variant = 'dark',
  className,
}: {
  links: SocialLink[];
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {links.map((link) => {
        const isInstagram = link.label.toLowerCase() === 'instagram';

        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.06 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className={cn(
              'group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta',
              variant === 'dark'
                ? 'border-white/15 bg-white/[0.035] text-travertine hover:border-terracotta hover:bg-terracotta hover:text-white'
                : 'border-ink/15 bg-white/50 text-ink hover:border-terracotta hover:bg-terracotta hover:text-white'
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-terracotta transition-transform duration-300 group-hover:scale-y-100"
            />
            {isInstagram ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="relative z-10 h-[21px] w-[21px]"
              >
                <rect
                  x="3.25"
                  y="3.25"
                  width="17.5"
                  height="17.5"
                  rx="5.25"
                  stroke="currentColor"
                  strokeWidth="1.65"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.05"
                  stroke="currentColor"
                  strokeWidth="1.65"
                />
                <circle cx="17.55" cy="6.65" r="1.1" fill="currentColor" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="relative z-10 h-[21px] w-[21px] fill-current"
              >
                <path d="M13.25 21v-8.18h2.75l.41-3.2h-3.16V7.58c0-.93.26-1.56 1.59-1.56h1.7V3.16c-.29-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.26v2.37H7.17v3.2h2.77V21h3.31Z" />
              </svg>
            )}
          </motion.a>
        );
      })}
    </div>
  );
}
