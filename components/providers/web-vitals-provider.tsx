'use client';

/**
 * Web Vitals Provider & Client Guard
 */

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/web-vitals';

// Client-side guard against third-party extension crashes (e.g. Bitdefender TrafficLight)
if (typeof window !== 'undefined') {
  const isExtError = (err: any, filename?: string, message?: string) => {
    if (filename && (filename.includes('chrome-extension:') || filename.includes('moz-extension:'))) return true;
    const str = `${message || ''} ${(err && (err.stack || err.message)) || ''}`;
    return str.includes('chrome-extension:') || str.includes('moz-extension:') || str.includes('M_ID');
  };

  window.addEventListener(
    'error',
    (e: any) => {
      if (isExtError(e.error, e.filename, e.message)) {
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        if (typeof e.preventDefault === 'function') e.preventDefault();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (e: any) => {
      if (isExtError(e.reason, '', e.reason?.message)) {
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        if (typeof e.preventDefault === 'function') e.preventDefault();
      }
    },
    true
  );

  // Automatically dismiss Next.js dev overlay if caused by browser extensions
  if (typeof MutationObserver !== 'undefined') {
    const dismissExtensionPortal = () => {
      const portals = document.querySelectorAll('nextjs-portal');
      portals.forEach((portal: any) => {
        const shadow = portal.shadowRoot;
        if (shadow) {
          const content = shadow.textContent || '';
          if (
            content.includes('chrome-extension:') ||
            content.includes('moz-extension:') ||
            content.includes('M_ID') ||
            content.includes('200.js')
          ) {
            portal.style.display = 'none';
          }
        }
      });
    };

    const observer = new MutationObserver(() => {
      dismissExtensionPortal();
    });

    const initObserver = () => {
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        dismissExtensionPortal();
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initObserver);
    } else {
      initObserver();
    }
  }
}

export function WebVitalsProvider() {
  useEffect(() => {
    reportWebVitals();

    // Re-check on mount
    const portals = document.querySelectorAll('nextjs-portal');
    portals.forEach((portal: any) => {
      const shadow = portal.shadowRoot;
      if (shadow) {
        const content = shadow.textContent || '';
        if (
          content.includes('chrome-extension:') ||
          content.includes('moz-extension:') ||
          content.includes('M_ID') ||
          content.includes('200.js')
        ) {
          portal.style.display = 'none';
        }
      }
    });
  }, []);

  return null;
}

