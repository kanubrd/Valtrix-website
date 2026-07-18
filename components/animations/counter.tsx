'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function Counter({ end, duration = 1.8, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed  = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad for a natural deceleration feel
      const eased    = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(end * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
