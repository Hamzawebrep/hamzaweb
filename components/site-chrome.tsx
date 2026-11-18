'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Habillage global du site :
 * - barre de progression de lecture
 * - grain minéral en surimpression
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-terracotta via-clay to-amber"
      />
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[65] opacity-[0.04] mix-blend-multiply"
      />
      {children}
    </>
  );
}
