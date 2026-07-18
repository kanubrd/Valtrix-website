/**
 * useConnectionSpeed Hook
 * 
 * Detects network connection speed using the Network Information API.
 * Used to optimize image quality and show skeleton loaders on slow connections.
 * 
 * Requirements: 23.4 - Slow connection handling
 */

'use client';

import { useState, useEffect } from 'react';

export type ConnectionSpeed = 'slow' | 'fast' | 'unknown';

/**
 * Effective connection types mapped to speed categories
 * - 'slow-2g' and '2g': Very slow connections
 * - '3g': Moderate connection (considered slow for our purposes)
 * - '4g': Fast connection
 */
const SLOW_CONNECTION_TYPES = ['slow-2g', '2g', '3g'];

/**
 * Hook to detect if user is on a slow network connection
 * 
 * @returns Object with connection speed info
 * 
 * @example
 * ```tsx
 * const { isSlowConnection, connectionSpeed, effectiveType } = useConnectionSpeed();
 * 
 * if (isSlowConnection) {
 *   // Show skeleton immediately
 *   // Reduce image quality to 75
 *   // Defer non-essential animations
 * }
 * ```
 */
export function useConnectionSpeed() {
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeed>('unknown');
  const [effectiveType, setEffectiveType] = useState<string>('unknown');
  const [saveData, setSaveData] = useState<boolean>(false);

  useEffect(() => {
    // Check if Network Information API is available
    const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection || 
                       (navigator as any).webkitConnection;

    if (!connection) {
      // API not supported, assume fast connection
      setConnectionSpeed('fast');
      return;
    }

    const updateConnectionInfo = () => {
      const effectiveConnectionType = connection.effectiveType || 'unknown';
      const dataSaver = connection.saveData || false;

      setEffectiveType(effectiveConnectionType);
      setSaveData(dataSaver);

      // Determine if connection is slow
      const isSlow = SLOW_CONNECTION_TYPES.includes(effectiveConnectionType) || dataSaver;
      setConnectionSpeed(isSlow ? 'slow' : 'fast');
    };

    // Initial check
    updateConnectionInfo();

    // Listen for connection changes
    connection.addEventListener('change', updateConnectionInfo);

    return () => {
      connection.removeEventListener('change', updateConnectionInfo);
    };
  }, []);

  return {
    connectionSpeed,
    isSlowConnection: connectionSpeed === 'slow',
    isFastConnection: connectionSpeed === 'fast',
    effectiveType,
    saveData,
    isUnknown: connectionSpeed === 'unknown',
  };
}

/**
 * Get recommended image quality based on connection speed
 * 
 * @param connectionSpeed - Current connection speed
 * @returns Recommended image quality (75 for slow, 85 for fast)
 */
export function getImageQuality(connectionSpeed: ConnectionSpeed): number {
  return connectionSpeed === 'slow' ? 75 : 85;
}

/**
 * Check if animations should be deferred based on connection
 * 
 * @param connectionSpeed - Current connection speed
 * @returns Whether to defer non-essential animations
 */
export function shouldDeferAnimations(connectionSpeed: ConnectionSpeed): boolean {
  return connectionSpeed === 'slow';
}

/**
 * Check if skeleton loaders should be shown immediately
 * 
 * @param connectionSpeed - Current connection speed
 * @returns Whether to show skeletons immediately
 */
export function shouldShowSkeletonImmediately(connectionSpeed: ConnectionSpeed): boolean {
  return connectionSpeed === 'slow';
}
