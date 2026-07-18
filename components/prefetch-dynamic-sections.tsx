'use client';

import { useEffect } from 'react';

/**
 * Prefetch dynamic below-the-fold sections during browser idle time.
 * This ensures smooth transitions when users scroll to these sections.
 * 
 * **Validates: Requirements 9.4**
 */
export function PrefetchDynamicSections() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('requestIdleCallback' in window)) {
      return;
    }

    // Schedule prefetch during browser idle time
    const idleCallbackId = window.requestIdleCallback(() => {
      try {
        // Prefetch testimonials section
        import('@/components/sections/testimonials');
        
        // Prefetch CTA banner
        import('@/components/sections/cta-banner');
      } catch (error) {
        // Silently fail if prefetch fails - sections will load on demand
        console.debug('Idle-time prefetch completed');
      }
    });

    // Cleanup
    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, []);

  return null;
}
