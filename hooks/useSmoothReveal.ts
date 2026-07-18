'use client';

import { useEffect, useRef, useState } from 'react';

interface UseSmoothRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook for smooth scroll-triggered reveals
 * 
 * @param options - Configuration options
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 * 
 * @example
 * const { ref, isVisible } = useSmoothReveal();
 * 
 * return (
 *   <div
 *     ref={ref}
 *     className={`transition-all duration-700 ${
 *       isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
 *     }`}
 *   >
 *     Content
 *   </div>
 * );
 */
export function useSmoothReveal(options: UseSmoothRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -80px 0px',
    once = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
