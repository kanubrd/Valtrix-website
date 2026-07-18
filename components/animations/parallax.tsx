'use client';

import { motion } from 'framer-motion';
import { useParallax, UseParallaxOptions } from '@/hooks/useParallax';
import { ReactNode } from 'react';

export interface ParallaxProps extends UseParallaxOptions {
  children: ReactNode;
  className?: string;
  /**
   * Additional scale effect intensity (0-1)
   * Default: 0 (no additional scale)
   */
  scaleIntensity?: number;
}

/**
 * Parallax Component
 * 
 * GPU-accelerated parallax wrapper using scroll-linked animations.
 * - Movement range: -10% to +10% translateY
 * - Desktop only: automatically disabled on mobile (< 768px)
 * - Pauses when out of viewport for performance
 * - Uses only GPU-accelerated properties (transform)
 * 
 * @example
 * ```tsx
 * <Parallax speed={0.5}>
 *   <img src="/hero-bg.png" alt="Background" />
 * </Parallax>
 * ```
 * 
 * @example With custom scale
 * ```tsx
 * <Parallax speed={0.3} scaleIntensity={0.5}>
 *   <div className="hero-content">
 *     <h1>Welcome</h1>
 *   </div>
 * </Parallax>
 * ```
 */
export function Parallax({
  children,
  className = '',
  speed = 0.5,
  disabled = false,
  scaleIntensity = 0,
}: ParallaxProps) {
  const { ref, y, scale, isDisabled } = useParallax({ speed, disabled });

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      <motion.div
        style={{
          y: isDisabled ? 0 : y,
          scale: isDisabled || scaleIntensity === 0 ? 1 : scale,
          willChange: isDisabled ? 'auto' : 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Parallax Container
 * 
 * Wrapper for multiple parallax layers with different speeds.
 * Creates a layered parallax effect by stacking multiple Parallax components.
 * 
 * @example
 * ```tsx
 * <ParallaxContainer className="hero">
 *   <Parallax speed={0.2}>
 *     <img src="/bg1.png" alt="Background" />
 *   </Parallax>
 *   <Parallax speed={0.5}>
 *     <img src="/bg2.png" alt="Midground" />
 *   </Parallax>
 *   <Parallax speed={0.8}>
 *     <div className="foreground">Content</div>
 *   </Parallax>
 * </ParallaxContainer>
 * ```
 */
export function ParallaxContainer({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}

