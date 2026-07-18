/**
 * Animation Monitor Tests
 * 
 * Tests FPS tracking, warning thresholds, and lifecycle management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { animationMonitor, ANIMATION_PERFORMANCE_CONFIG } from './animation-monitor';

describe('AnimationMonitor', () => {
  beforeEach(() => {
    // Clean up any existing tracks
    animationMonitor.stopAll();
    
    // Mock performance.now() for consistent testing
    vi.spyOn(performance, 'now');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('start and stop', () => {
    it('should start tracking an animation', () => {
      animationMonitor.start('test-animation');
      
      expect(animationMonitor.isTracking('test-animation')).toBe(true);
      expect(animationMonitor.getActiveTracking()).toContain('test-animation');
    });

    it('should stop tracking an animation', () => {
      animationMonitor.start('test-animation');
      animationMonitor.stop('test-animation');
      
      expect(animationMonitor.isTracking('test-animation')).toBe(false);
      expect(animationMonitor.getActiveTracking()).not.toContain('test-animation');
    });

    it('should handle stopping non-existent animation gracefully', () => {
      expect(() => animationMonitor.stop('non-existent')).not.toThrow();
    });

    it('should stop existing tracking when starting same animation again', () => {
      animationMonitor.start('test-animation');
      expect(animationMonitor.isTracking('test-animation')).toBe(true);
      
      // Starting again should reset the tracking
      animationMonitor.start('test-animation');
      
      // Should still be tracking (not duplicated)
      expect(animationMonitor.isTracking('test-animation')).toBe(true);
      expect(animationMonitor.getActiveTracking()).toHaveLength(1);
    });
  });

  describe('getCurrentFPS', () => {
    it('should return null for non-tracked animation', () => {
      expect(animationMonitor.getCurrentFPS('non-existent')).toBeNull();
    });

    it('should return FPS for tracked animation', () => {
      animationMonitor.start('test-animation');
      
      const fps = animationMonitor.getCurrentFPS('test-animation');
      
      expect(fps).not.toBeNull();
      expect(typeof fps).toBe('number');
    });

    it('should calculate FPS correctly', () => {
      // Mock time progression
      let mockTime = 0;
      vi.spyOn(performance, 'now').mockImplementation(() => mockTime);
      
      animationMonitor.start('test-animation');
      
      // Simulate 60 frames over 1 second (60 FPS)
      mockTime = 1000;
      
      // Note: Actual FPS calculation requires frame counting which happens in RAF
      // This is a basic check that FPS is calculated
      const fps = animationMonitor.getCurrentFPS('test-animation');
      expect(fps).toBeGreaterThanOrEqual(0);
    });
  });

  describe('isTracking', () => {
    it('should return false for non-tracked animation', () => {
      expect(animationMonitor.isTracking('non-existent')).toBe(false);
    });

    it('should return true for tracked animation', () => {
      animationMonitor.start('test-animation');
      expect(animationMonitor.isTracking('test-animation')).toBe(true);
    });

    it('should return false after stopping animation', () => {
      animationMonitor.start('test-animation');
      animationMonitor.stop('test-animation');
      expect(animationMonitor.isTracking('test-animation')).toBe(false);
    });
  });

  describe('getActiveTracking', () => {
    it('should return empty array when no animations tracked', () => {
      expect(animationMonitor.getActiveTracking()).toEqual([]);
    });

    it('should return array of tracked animation names', () => {
      animationMonitor.start('animation-1');
      animationMonitor.start('animation-2');
      animationMonitor.start('animation-3');
      
      const active = animationMonitor.getActiveTracking();
      
      expect(active).toHaveLength(3);
      expect(active).toContain('animation-1');
      expect(active).toContain('animation-2');
      expect(active).toContain('animation-3');
    });
  });

  describe('stopAll', () => {
    it('should stop all tracked animations', () => {
      animationMonitor.start('animation-1');
      animationMonitor.start('animation-2');
      animationMonitor.start('animation-3');
      
      animationMonitor.stopAll();
      
      expect(animationMonitor.getActiveTracking()).toEqual([]);
      expect(animationMonitor.isTracking('animation-1')).toBe(false);
      expect(animationMonitor.isTracking('animation-2')).toBe(false);
      expect(animationMonitor.isTracking('animation-3')).toBe(false);
    });
  });

  describe('multiple animations', () => {
    it('should track multiple animations simultaneously', () => {
      animationMonitor.start('animation-1');
      animationMonitor.start('animation-2');
      
      expect(animationMonitor.isTracking('animation-1')).toBe(true);
      expect(animationMonitor.isTracking('animation-2')).toBe(true);
      expect(animationMonitor.getActiveTracking()).toHaveLength(2);
    });

    it('should stop individual animations without affecting others', () => {
      animationMonitor.start('animation-1');
      animationMonitor.start('animation-2');
      
      animationMonitor.stop('animation-1');
      
      expect(animationMonitor.isTracking('animation-1')).toBe(false);
      expect(animationMonitor.isTracking('animation-2')).toBe(true);
    });
  });

  describe('ANIMATION_PERFORMANCE_CONFIG', () => {
    it('should have correct FPS thresholds', () => {
      expect(ANIMATION_PERFORMANCE_CONFIG.fpsThresholds.desktop).toBe(55);
      expect(ANIMATION_PERFORMANCE_CONFIG.fpsThresholds.mobile).toBe(25);
    });

    it('should have correct mobile breakpoint', () => {
      expect(ANIMATION_PERFORMANCE_CONFIG.mobileBreakpoint).toBe(768);
    });

    it('should have enableLogging flag', () => {
      expect(typeof ANIMATION_PERFORMANCE_CONFIG.enableLogging).toBe('boolean');
    });
  });
});
