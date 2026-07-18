'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from './useMediaQuery';
import { PARALLAX_CONFIG } from '@/lib/animation-config';

export interface UseParallaxOptions {
  speed?: number; // Parallax speed multiplier (-1 to 1)
  disabled?: boolean; // Manually disable parallax
}

export interface UseParallaxReturn {
  ref: RefObject<HTMLDivElement | null>;
  y: MotionValue<string>;
  scale: MotionValue<number>;
  inView: boolean;
  isDisabled: boolean;
}

/**
 * useParallax Hook
 * 
 * Creates scroll-linked parallax effects using Framer Motion's useScroll and useTransform.
 * - Maps scroll progress to translateY (max 20% of scroll distance)
 * - Desktop only: disabled on viewports < 768px
 * - Pauses calculations when element is out of viewport
 * - GPU-accelerated: only uses transform properties
 * 
 * @param speed - Controls parallax intensity (-1 to 1). Default: 0.5
 *                Negative values move slower than scroll, positive faster
 * @param disabled - Manually disable parallax effect
 * 
 * @returns Object with ref, y/scale motion values, and state flags
 * 
 * @example
 * const { ref, y, isDisabled } = useParallax({ speed: 0.5 });
 * 
 * return (
 *   <motion.div ref={ref} style={{ y: isDisabled ? 0 : y }}>
 *     <img src="/hero-bg.png" alt="Background" />
 *   </motion.div>
 * );
 */
export function useParallax({
  speed = 0.5,
  disabled = false,
}: UseParallaxOptions = {}): UseParallaxReturn {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  
  // Detect if viewport is mobile (< 768px)
  const isMobile = useMediaQuery(
    `(max-width: ${PARALLAX_CONFIG.disableMobileBreakpoint - 1}px)`
  );
  
  // Track if element is in viewport using Intersection Observer
  const { inView } = useInView({
    threshold: 0,
    rootMargin: '200px 0px', // Start tracking 200px before entering viewport
  });

  // Get scroll progress relative to the element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Track from element entering bottom to exiting top
  });

  // Calculate parallax movement within configured range (-10% to +10%)
  const maxMovement = PARALLAX_CONFIG.rangeY[1]; // 10%
  
  // Transform scroll progress to translateY percentage
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-maxMovement * speed}%`, `${maxMovement * speed}%`]
  );

  // Subtle scale for depth effect (1.0 to 1.05)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      PARALLAX_CONFIG.rangeScale[0], // 1.0
      PARALLAX_CONFIG.rangeScale[1], // 1.05
      PARALLAX_CONFIG.rangeScale[0], // 1.0
    ]
  );

  // Determine if parallax should be disabled
  const isDisabled = disabled || isMobile || !inView;

  return {
    ref,
    y,
    scale,
    inView,
    isDisabled,
  };
}
