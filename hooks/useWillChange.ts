'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useDeviceType } from './useDeviceType';
import { PERFORMANCE_LIMITS } from '@/lib/animation-config';

/**
 * Global tracking for concurrent will-change declarations
 * Prevents too many simultaneous GPU hints which can degrade performance
 */
let activeWillChangeCount = 0;
const pendingQueue: Array<() => void> = [];

/**
 * useWillChange Hook
 * 
 * Manages will-change CSS hints for GPU-accelerated animations.
 * Automatically applies will-change before animations and removes after completion
 * to free GPU resources.
 * 
 * Features:
 * - Auto-remove will-change on animation complete
 * - Throttle to max 10 concurrent declarations (5 on mobile)
 * - Queue system for pending animations when at capacity
 * - Automatic cleanup on unmount
 * 
 * Requirements: 1.3, 1.4, 1.7
 * 
 * @param properties - CSS properties to hint (e.g., 'transform', 'opacity')
 * @returns Object with apply and remove functions
 * 
 * @example
 * const willChange = useWillChange(['transform', 'opacity']);
 * 
 * // Apply before animation starts
 * willChange.apply();
 * 
 * // Remove after animation completes
 * willChange.remove();
 * 
 * @example
 * // With Framer Motion
 * <motion.div
 *   onAnimationStart={() => willChange.apply()}
 *   onAnimationComplete={() => willChange.remove()}
 * >
 */
export function useWillChange(properties: string[] = ['transform', 'opacity']) {
  const elementRef = useRef<HTMLElement | null>(null);
  const isActiveRef = useRef(false);
  const { isMobile } = useDeviceType();

  // Determine max concurrent animations based on device type
  const maxConcurrent = isMobile 
    ? PERFORMANCE_LIMITS.maxConcurrentMobile 
    : PERFORMANCE_LIMITS.maxConcurrentAnimations;

  /**
   * Apply will-change hint to element
   * Throttles if maximum concurrent animations reached
   */
  const apply = useCallback((element?: HTMLElement) => {
    // Store element reference if provided
    if (element) {
      elementRef.current = element;
    }

    const targetElement = elementRef.current;
    if (!targetElement || isActiveRef.current) {
      return;
    }

    // Check if we're at capacity
    if (activeWillChangeCount >= maxConcurrent) {
      // Queue this application for later
      pendingQueue.push(() => apply(targetElement));
      return;
    }

    // Apply will-change hint
    const willChangeValue = properties.join(', ');
    targetElement.style.willChange = willChangeValue;
    isActiveRef.current = true;
    activeWillChangeCount++;

  }, [properties, maxConcurrent]);

  /**
   * Remove will-change hint from element
   * Processes queued animations if any are waiting
   */
  const remove = useCallback(() => {
    const targetElement = elementRef.current;
    if (!targetElement || !isActiveRef.current) {
      return;
    }

    // Remove will-change hint
    targetElement.style.willChange = 'auto';
    isActiveRef.current = false;
    activeWillChangeCount--;

    // Process next queued animation if any
    if (pendingQueue.length > 0) {
      const nextApply = pendingQueue.shift();
      if (nextApply) {
        // Use setTimeout to avoid immediate re-application
        setTimeout(nextApply, 0);
      }
    }
  }, []);

  /**
   * Cleanup on unmount
   * Ensures will-change is removed even if animation was interrupted
   */
  useEffect(() => {
    return () => {
      if (isActiveRef.current) {
        remove();
      }
    };
  }, [remove]);

  return {
    apply,
    remove,
    elementRef,
  };
}

/**
 * useAutoWillChange Hook
 * 
 * Automatically manages will-change for the lifetime of the component.
 * Applies immediately on mount and removes on unmount.
 * 
 * Use when you know the element will animate soon after mounting.
 * 
 * @param properties - CSS properties to hint
 * @returns Ref to attach to the element
 * 
 * @example
 * const ref = useAutoWillChange(['transform']);
 * return <motion.div ref={ref} animate={{ x: 100 }} />;
 */
export function useAutoWillChange(properties: string[] = ['transform', 'opacity']) {
  const willChange = useWillChange(properties);

  useEffect(() => {
    if (willChange.elementRef.current) {
      willChange.apply();
    }

    return () => {
      willChange.remove();
    };
  }, [willChange]);

  return willChange.elementRef;
}

/**
 * useTimedWillChange Hook
 * 
 * Applies will-change for a specific duration then auto-removes.
 * Useful for animations with known duration.
 * 
 * @param properties - CSS properties to hint
 * @param durationMs - Duration in milliseconds (default: 800ms)
 * @returns Object with apply function
 * 
 * @example
 * const willChange = useTimedWillChange(['transform'], 600);
 * // On animation start
 * willChange.apply();
 * // Will auto-remove after 600ms
 */
export function useTimedWillChange(
  properties: string[] = ['transform', 'opacity'],
  durationMs: number = 800
) {
  const willChange = useWillChange(properties);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const applyTimed = useCallback((element?: HTMLElement) => {
    willChange.apply(element);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Auto-remove after duration
    timeoutRef.current = setTimeout(() => {
      willChange.remove();
      timeoutRef.current = null;
    }, durationMs);
  }, [willChange, durationMs]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    apply: applyTimed,
    remove: willChange.remove,
    elementRef: willChange.elementRef,
  };
}

/**
 * Helper function to get will-change count
 * Useful for debugging and monitoring
 */
export function getActiveWillChangeCount(): number {
  return activeWillChangeCount;
}

/**
 * Helper function to get pending queue length
 * Useful for debugging and monitoring
 */
export function getPendingQueueLength(): number {
  return pendingQueue.length;
}
