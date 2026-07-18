/**
 * Animation Configuration Tests
 * Validates that the animation configuration meets all requirements
 */

import { describe, it, expect } from 'vitest';
import {
  springConfig,
  ANIMATION_DURATION,
  INTERACTION_DURATION,
  STAGGER_DELAY,
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  hoverScaleVariants,
  springTransition,
  PARALLAX_CONFIG,
  VIEWPORT_CONFIG,
  PERFORMANCE_LIMITS,
  REDUCED_MOTION_CONFIG,
  applyReducedMotion,
  getTransition,
} from './animation-config';

// Test 1: Spring configuration matches requirements
describe('Spring Physics Configuration', () => {
  it('should have correct spring physics values', () => {
    expect(springConfig.type).toBe('spring');
    expect(springConfig.stiffness).toBe(100);
    expect(springConfig.damping).toBe(15);
    expect(springConfig.mass).toBe(0.8);
  });
});

// Test 2: Animation duration in 600-800ms range
describe('Animation Duration', () => {
  it('should have durations within 600-800ms range', () => {
    expect(ANIMATION_DURATION.fast).toBe(0.6); // 600ms
    expect(ANIMATION_DURATION.medium).toBe(0.7); // 700ms
    expect(ANIMATION_DURATION.slow).toBe(0.8); // 800ms
  });

  it('should have fast interaction duration for responsiveness', () => {
    expect(INTERACTION_DURATION).toBe(0.1); // 100ms
  });
});

// Test 3: Stagger delays in 80-120ms range
describe('Stagger Timing', () => {
  it('should have stagger delays within 80-120ms range', () => {
    expect(STAGGER_DELAY.fast).toBe(0.08); // 80ms
    expect(STAGGER_DELAY.medium).toBe(0.1); // 100ms
    expect(STAGGER_DELAY.slow).toBe(0.12); // 120ms
  });
});

// Test 4: GPU-accelerated variants use only transform and opacity
describe('GPU-Accelerated Animation Variants', () => {
  it('fadeInVariants should only use opacity', () => {
    expect(fadeInVariants.hidden).toHaveProperty('opacity', 0);
    expect(fadeInVariants.hidden).toHaveProperty('willChange', 'opacity');
    expect(fadeInVariants.visible).toHaveProperty('opacity', 1);
    expect(fadeInVariants.visible).toHaveProperty('willChange', 'auto');
    
    // Should not have layout properties
    expect(fadeInVariants.hidden).not.toHaveProperty('width');
    expect(fadeInVariants.hidden).not.toHaveProperty('height');
    expect(fadeInVariants.hidden).not.toHaveProperty('margin');
  });

  it('slideUpVariants should only use opacity and transform (y)', () => {
    expect(slideUpVariants.hidden).toHaveProperty('opacity', 0);
    expect(slideUpVariants.hidden).toHaveProperty('y', 20);
    expect(slideUpVariants.hidden).toHaveProperty('willChange', 'opacity, transform');
    expect(slideUpVariants.visible).toHaveProperty('opacity', 1);
    expect(slideUpVariants.visible).toHaveProperty('y', 0);
    expect(slideUpVariants.visible).toHaveProperty('willChange', 'auto');
    
    // Should not have layout properties
    expect(slideUpVariants.hidden).not.toHaveProperty('top');
    expect(slideUpVariants.hidden).not.toHaveProperty('marginTop');
  });

  it('scaleVariants should only use opacity and transform (scale)', () => {
    expect(scaleVariants.hidden).toHaveProperty('opacity', 0);
    expect(scaleVariants.hidden).toHaveProperty('scale', 0.95);
    expect(scaleVariants.hidden).toHaveProperty('willChange', 'opacity, transform');
    expect(scaleVariants.visible).toHaveProperty('opacity', 1);
    expect(scaleVariants.visible).toHaveProperty('scale', 1);
    expect(scaleVariants.visible).toHaveProperty('willChange', 'auto');
  });

  it('hoverScaleVariants should use transform (scale) only', () => {
    expect(hoverScaleVariants.initial).toHaveProperty('scale', 1);
    expect(hoverScaleVariants.hover).toHaveProperty('scale', 1.03);
    expect(hoverScaleVariants.hover).toHaveProperty('willChange', 'transform');
    expect(hoverScaleVariants.tap).toHaveProperty('scale', 0.98);
  });
});

// Test 5: Spring transition configuration
describe('Spring Transition', () => {
  it('should combine spring config with medium duration', () => {
    expect(springTransition.type).toBe('spring');
    expect(springTransition.stiffness).toBe(100);
    expect(springTransition.damping).toBe(15);
    expect(springTransition.mass).toBe(0.8);
    expect(springTransition.duration).toBe(0.7); // medium duration
  });
});

// Test 6: Parallax configuration
describe('Parallax Configuration', () => {
  it('should limit parallax movement to 20% of scroll distance', () => {
    expect(PARALLAX_CONFIG.maxMovementPercent).toBe(20);
    expect(PARALLAX_CONFIG.rangeY).toEqual([-10, 10]);
  });

  it('should disable on mobile devices (< 768px)', () => {
    expect(PARALLAX_CONFIG.disableMobileBreakpoint).toBe(768);
  });
});

// Test 7: Viewport observer configuration
describe('Viewport Observer Configuration', () => {
  it('should trigger at 20% visibility', () => {
    expect(VIEWPORT_CONFIG.threshold).toBe(0.2);
  });

  it('should trigger only once', () => {
    expect(VIEWPORT_CONFIG.triggerOnce).toBe(true);
  });
});

// Test 8: Performance limits
describe('Performance Limits', () => {
  it('should limit concurrent animations', () => {
    expect(PERFORMANCE_LIMITS.maxConcurrentAnimations).toBe(10);
    expect(PERFORMANCE_LIMITS.maxConcurrentMobile).toBe(5);
  });

  it('should throttle at 60fps rate', () => {
    expect(PERFORMANCE_LIMITS.throttleDelay).toBe(16); // ~60fps
  });
});

// Test 9: Will-change management
describe('Will-Change Management', () => {
  it('should apply will-change in hidden state and remove in visible state', () => {
    const testVariants = [fadeInVariants, slideUpVariants, scaleVariants];
    
    testVariants.forEach((variant) => {
      expect(variant.hidden).toHaveProperty('willChange');
      expect(variant.hidden.willChange).not.toBe('auto');
      expect(variant.visible).toHaveProperty('willChange', 'auto');
    });
  });
});

// Test 10: No layout-triggering properties
describe('No Layout Properties', () => {
  it('should not use layout-triggering properties in any variant', () => {
    const layoutProperties = ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'];
    const testVariants = [fadeInVariants, slideUpVariants, scaleVariants];
    
    testVariants.forEach((variant) => {
      layoutProperties.forEach((prop) => {
        expect(variant.hidden).not.toHaveProperty(prop);
        expect(variant.visible).not.toHaveProperty(prop);
      });
    });
  });
});

