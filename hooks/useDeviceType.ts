'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Device type breakpoints
 * Mobile: < 768px
 * Desktop: >= 768px
 */
const MOBILE_BREAKPOINT = '(max-width: 767px)';
const TABLET_BREAKPOINT = '(min-width: 768px) and (max-width: 1023px)';
const DESKTOP_BREAKPOINT = '(min-width: 1024px)';

/**
 * Hook for mobile/desktop detection
 * Uses standard responsive breakpoints for device type classification
 * 
 * @returns Object with device type flags
 * 
 * @example
 * const { isMobile, isTablet, isDesktop } = useDeviceType();
 * if (isMobile) {
 *   // Disable parallax effects
 * }
 */
export function useDeviceType() {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const isTablet = useMediaQuery(TABLET_BREAKPOINT);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  return {
    isMobile,
    isTablet,
    isDesktop,
    // Convenience flags
    isMobileOrTablet: isMobile || isTablet,
    isDesktopOrTablet: isDesktop || isTablet,
  };
}
