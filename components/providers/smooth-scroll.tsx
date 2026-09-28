'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Ultra-smooth scroll configuration - butter-smooth experience
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // High-performance RAF loop
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
            lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Expose lenis globally for debugging and components
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

  // Ensure every route transition resets scroll to top or scrolls to hash
  useEffect(() => {
    if (lenisRef.current && typeof window !== 'undefined') {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          lenisRef.current.scrollTo(el as HTMLElement, { offset: -80, immediate: true });
          return;
        }
      }
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
