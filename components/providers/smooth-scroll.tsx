'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ultra-smooth scroll configuration - butter-smooth experience
    const lenis = new Lenis({
      // Faster duration for snappy but smooth scrolling
      duration: 0.8,
      // standard expo easing for natural acceleration/deceleration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // More responsive wheel distance
      wheelMultiplier: 1.1,
      // Natural mobile touch scrolling
      touchMultiplier: 1.5,
      // Prevent infinite scroll
      infinite: false,
      // Automatically handles passive listeners for better performance
      autoResize: true,
      // Faster lerp for direct responsive feel
      lerp: 0.12,
    });

    lenisRef.current = lenis;

    // High-performance RAF loop with throttling
    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    
    rafId = requestAnimationFrame(raf);

    // Smooth scroll to anchors
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Expose lenis globally for debugging
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
