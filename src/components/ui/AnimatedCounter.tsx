'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { formatCompact } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  /** render compactly (1.2M) or as a full localized number */
  compact?: boolean;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  compact = true,
  durationMs = 1600,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // easeOutExpo for a snappy finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  const formatted = compact ? formatCompact(display) : display.toLocaleString('en-US');

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
