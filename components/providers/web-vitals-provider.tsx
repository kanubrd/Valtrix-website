'use client';

/**
 * Web Vitals Provider
 * 
 * Client component that initializes Web Vitals tracking on mount.
 * This must be a client component because it uses useEffect.
 */

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/web-vitals';

export function WebVitalsProvider() {
  useEffect(() => {
    // Initialize Web Vitals tracking once on mount
    reportWebVitals();
  }, []);

  // This component doesn't render anything
  return null;
}
