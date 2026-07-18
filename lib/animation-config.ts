/**
 * Animation Configuration System
 * 
 * Centralized animation configuration enforcing GPU-accelerated properties
 * and consistent spring physics across the application.
 * 
 * All animations use only GPU-accelerated properties: transform (scale, translate, rotate) and opacity
 * Avoids layout-triggering properties: width, height, top, left, margin, padding
 */

'use client';

import { Transition, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Spring Physics Configuration
 * Creates natural, fluid motion comparable to premium experiences (Apple, Stripe, Tesla)
 * 
 * - stiffness: 100 - Controls spring tension (higher = faster)
 * - damping: 15 - Controls bounce/oscillation (higher = less bounce)
 * - mass: 0.8 - Controls inertia (higher = slower to start/stop)
 * - duration range: 600-800ms for smooth, premium feel
 */
export const springConfig = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
  mass: 0.8,
};

/**
 * Duration range for transitions (600-800ms)
 * Used as fallback when spring duration needs explicit control
 */
export const ANIMATION_DURATION = {
  fast: 0.6,    // 600ms - minimum for smooth animations
  medium: 0.7,  // 700ms - standard transition
  slow: 0.8,    // 800ms - maximum for premium feel
} as const;

/**
 * Hover and interaction animations use shorter durations for responsiveness
 * Target: < 100ms for immediate visual feedback
 */
export const INTERACTION_DURATION = 0.1; // 100ms

/**
 * Stagger timing for sequential animations
 * Range: 80-120ms between child elements
 */
export const STAGGER_DELAY = {
  fast: 0.08,   // 80ms
  medium: 0.1,  // 100ms
  slow: 0.12,   // 120ms
} as const;

/**
 * Standard Spring Transition
 * Apply to all animation variants for consistent motion feel
 */
export const springTransition: Transition = {
  ...springConfig,
  duration: ANIMATION_DURATION.medium,
};

/**
 * Fast Spring Transition
 * For quick interactions and hover states
 */
export const fastTransition: Transition = {
  ...springConfig,
  duration: ANIMATION_DURATION.fast,
};

/**
 * Interaction Transition
 * Ultra-fast for hover/tap feedback (100ms)
 */
export const interactionTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  duration: INTERACTION_DURATION,
};

/**
 * Fade In Animation
 * GPU-accelerated: opacity only
 * Use for: Content reveal, modal entrance, overlay appearance
 */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    willChange: 'opacity',
  },
  visible: {
    opacity: 1,
    willChange: 'auto', // Remove will-change after animation
    transition: springTransition,
  },
};

/**
 * Slide Up Animation
 * GPU-accelerated: translateY and opacity
 * Use for: Section entrance, card reveal, list items
 * Default distance: 20px upward motion
 */
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    willChange: 'opacity, transform',
  },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto',
    transition: springTransition,
  },
};

/**
 * Scale Animation
 * GPU-accelerated: scale and opacity
 * Use for: Modal entrance, image loading, zoom effects
 * Scale range: 0.95 → 1.0 for subtle effect
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    willChange: 'opacity, transform',
  },
  visible: {
    opacity: 1,
    scale: 1,
    willChange: 'auto',
    transition: springTransition,
  },
};

/**
 * Hover Scale Animation
 * GPU-accelerated: scale only
 * Use for: Interactive elements, buttons, cards
 * Scale: 1.0 → 1.03 for subtle lift effect
 * Duration: 100ms for immediate responsiveness
 */
export const hoverScaleVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
    willChange: 'transform',
    transition: interactionTransition,
  },
  tap: {
    scale: 0.98,
    transition: interactionTransition,
  },
};

/**
 * Slide Down Animation
 * GPU-accelerated: translateY and opacity
 * Use for: Dropdown menus, notification banners
 */
export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    willChange: 'opacity, transform',
  },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto',
    transition: springTransition,
  },
};

/**
 * Slide Left Animation
 * GPU-accelerated: translateX and opacity
 * Use for: Sidebar entrance, horizontal content reveal
 */
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
    willChange: 'opacity, transform',
  },
  visible: {
    opacity: 1,
    x: 0,
    willChange: 'auto',
    transition: springTransition,
  },
};

/**
 * Slide Right Animation
 * GPU-accelerated: translateX and opacity
 * Use for: Sidebar entrance from left, content shifts
 */
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    willChange: 'opacity, transform',
  },
  visible: {
    opacity: 1,
    x: 0,
    willChange: 'auto',
  },
};

/**
 * Stagger Container Configuration
 * Apply to parent element to stagger children animations
 * 
 * @param delayBetween - Delay between child animations (default: medium)
 */
export const getStaggerContainer = (delayBetween: keyof typeof STAGGER_DELAY = 'medium') => ({
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAY[delayBetween],
    },
  },
});

/**
 * Create custom animation variants with configurable distance
 * 
 * @param direction - Animation direction ('up', 'down', 'left', 'right')
 * @param distance - Movement distance in pixels (default: 20)
 * @returns Framer Motion variants object
 */
export const createSlideVariants = (
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 20
): Variants => {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
      willChange: 'opacity, transform',
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      willChange: 'auto',
    },
  };
};

/**
 * GPU Performance Guards
 * Maximum concurrent animations to prevent performance degradation
 */
export const PERFORMANCE_LIMITS = {
  maxConcurrentAnimations: 10,
  maxConcurrentMobile: 5,
  throttleDelay: 16, // ~60fps (1000ms / 60)
} as const;

/**
 * Animation Exit Variants
 * Use for component unmount animations
 */
export const fadeOutVariants: Variants = {
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATION.fast,
    },
  },
};

export const scaleOutVariants: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: ANIMATION_DURATION.fast,
    },
  },
};

/**
 * Helper function to combine variants with spring transition
 * 
 * @param variants - Framer Motion variants
 * @param transition - Custom transition (optional)
 * @returns Object ready for motion component props
 */
export const withSpring = (variants: Variants, transition?: Transition) => ({
  variants,
  transition: transition || springTransition,
  initial: 'hidden',
  animate: 'visible',
});

/**
 * Parallax Configuration
 * GPU-accelerated parallax movement limits
 * Desktop only (disabled on mobile for performance)
 */
export const PARALLAX_CONFIG = {
  maxMovementPercent: 20, // Max 20% of scroll distance
  rangeY: [-10, 10] as [number, number], // -10% to +10% translateY
  rangeScale: [1, 1.05] as [number, number], // Subtle scale for depth
  disableMobileBreakpoint: 768, // px - disable below this width
} as const;

/**
 * Viewport Observer Configuration
 * Settings for intersection observer-based animations
 */
export const VIEWPORT_CONFIG = {
  threshold: 0.2, // 20% visibility to trigger
  rootMargin: '0px 0px -50px 0px', // Trigger slightly before entering viewport
  triggerOnce: true, // Prevent re-animation on scroll back
} as const;

/**
 * Reduced Motion Configuration
 * Settings applied when user has prefers-reduced-motion enabled
 * 
 * Requirements 21.1, 21.2, 21.3, 21.5
 * - Disable parallax effects
 * - Set duration to 0.01s (instant)
 * - Use linear transitions instead of spring physics
 * - Maintain opacity changes for visibility
 */
export const REDUCED_MOTION_CONFIG = {
  duration: 0.01, // Near-instant transitions
  ease: 'linear' as const, // No spring physics
  disableParallax: true, // Disable parallax effects
} as const;

/**
 * Apply reduced motion settings to animation variants
 * 
 * When reduced motion is enabled:
 * - Preserves opacity changes (for visibility)
 * - Removes transform animations (sets to final state)
 * - Uses instant duration (0.01s)
 * - Uses linear easing instead of spring
 * 
 * @param variants - Standard animation variants
 * @param reducedMotion - Whether reduced motion is enabled
 * @returns Variants optimized for reduced motion preference
 */
export const applyReducedMotion = (variants: Variants, reducedMotion: boolean): Variants => {
  if (!reducedMotion) return variants;

  // Transform variants to remove motion while preserving opacity
  const reducedVariants: Variants = {};
  
  Object.keys(variants).forEach(key => {
    const state = variants[key];
    if (typeof state === 'object' && state !== null) {
      reducedVariants[key] = {
        opacity: state.opacity ?? 1, // Preserve opacity changes
        // Remove all transform properties - set to final state
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        willChange: 'auto',
      };
    }
  });

  return reducedVariants;
};

/**
 * Get transition settings based on reduced motion preference
 * 
 * @param reducedMotion - Whether reduced motion is enabled
 * @param customTransition - Optional custom transition to apply reduced motion to
 * @returns Transition object with appropriate settings
 */
export const getTransition = (reducedMotion: boolean, customTransition?: Transition): Transition => {
  if (reducedMotion) {
    return {
      duration: REDUCED_MOTION_CONFIG.duration,
      ease: REDUCED_MOTION_CONFIG.ease,
    };
  }
  return customTransition || springTransition;
};

/**
 * Hook to get animation configuration with reduced motion support
 * 
 * Usage:
 * ```tsx
 * const { variants, transition } = useAnimationConfig(fadeInVariants);
 * return <motion.div variants={variants} transition={transition} />;
 * ```
 * 
 * @param baseVariants - Base animation variants
 * @param customTransition - Optional custom transition
 * @returns Object with variants and transition respecting reduced motion
 */
export const useAnimationConfig = (
  baseVariants: Variants,
  customTransition?: Transition
) => {
  const prefersReducedMotion = useReducedMotion();
  
  return {
    variants: applyReducedMotion(baseVariants, prefersReducedMotion),
    transition: getTransition(prefersReducedMotion, customTransition),
    shouldDisableParallax: prefersReducedMotion && REDUCED_MOTION_CONFIG.disableParallax,
  };
};
