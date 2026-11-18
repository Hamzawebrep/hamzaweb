'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

export function CountUp({
  to,
  suffix = '',
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      setValue(Math.round(easeOut(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
