/**
 * Animation Performance Monitor
 * 
 * Tracks animation frame rates (FPS) during runtime and logs performance warnings
 * when FPS drops below acceptable thresholds.
 * 
 * Desktop threshold: 55 FPS
 * Mobile threshold: 25 FPS
 * 
 * Usage:
 * ```typescript
 * <motion.div
 *   onAnimationStart={() => animationMonitor.start('hero-slide')}
 *   onAnimationComplete={() => animationMonitor.stop('hero-slide')}
 * >
 * ```
 */

/**
 * FPS thresholds for performance warnings
 */
const FPS_THRESHOLD = {
  desktop: 55,
  mobile: 25,
} as const;

/**
 * Animation tracking data
 */
interface AnimationTrack {
  startTime: number;
  frameCount: number;
  lastFrameTime: number;
  animationFrameId: number | null;
  componentName: string;
  isMobile: boolean;
}

/**
 * Animation Monitor Class
 * Singleton pattern for centralized animation performance tracking
 */
class AnimationMonitor {
  private tracks = new Map<string, AnimationTrack>();
  private isClient = typeof window !== 'undefined';

  /**
   * Detects if the current device is mobile
   * Uses viewport width as heuristic (< 768px)
   */
  private isMobileDevice(): boolean {
    if (!this.isClient) return false;
    return window.innerWidth < 768;
  }

  /**
   * Calculates current FPS for an animation track
   */
  private calculateFPS(track: AnimationTrack): number {
    const currentTime = performance.now();
    const elapsed = currentTime - track.startTime;
    
    if (elapsed === 0) return 0;
    
    return (track.frameCount / elapsed) * 1000;
  }

  /**
   * Frame update handler - called every animation frame
   */
  private updateFrame = (componentName: string) => {
    const track = this.tracks.get(componentName);
    
    if (!track) return;

    const currentTime = performance.now();
    track.frameCount++;
    track.lastFrameTime = currentTime;

    // Continue tracking if animation is still active
    if (track.animationFrameId !== null) {
      track.animationFrameId = requestAnimationFrame(() => this.updateFrame(componentName));
    }
  };

  /**
   * Starts monitoring an animation
   * 
   * @param componentName - Identifier for the animated component (e.g., 'hero-slide', 'modal-entrance')
   */
  start(componentName: string): void {
    if (!this.isClient) return;

    // Stop any existing tracking for this component
    this.stop(componentName);

    const isMobile = this.isMobileDevice();
    const startTime = performance.now();

    const track: AnimationTrack = {
      startTime,
      frameCount: 0,
      lastFrameTime: startTime,
      animationFrameId: null,
      componentName,
      isMobile,
    };

    this.tracks.set(componentName, track);

    // Start frame counting
    track.animationFrameId = requestAnimationFrame(() => this.updateFrame(componentName));

    if (process.env.NODE_ENV === 'development') {
      console.log(`[AnimationMonitor] Started tracking: ${componentName}`);
    }
  }

  /**
   * Stops monitoring an animation and reports performance metrics
   * 
   * @param componentName - Identifier for the animated component
   */
  stop(componentName: string): void {
    if (!this.isClient) return;

    const track = this.tracks.get(componentName);
    
    if (!track) return;

    // Cancel animation frame updates
    if (track.animationFrameId !== null) {
      cancelAnimationFrame(track.animationFrameId);
    }

    // Calculate final metrics
    const endTime = performance.now();
    const duration = endTime - track.startTime;
    const fps = this.calculateFPS(track);
    const threshold = track.isMobile ? FPS_THRESHOLD.mobile : FPS_THRESHOLD.desktop;
    const deviceType = track.isMobile ? 'mobile' : 'desktop';

    // Report metrics
    if (fps < threshold) {
      console.warn(
        `[AnimationMonitor] ⚠️ Performance Warning: ${componentName}`,
        {
          fps: Math.round(fps),
          threshold,
          deviceType,
          duration: `${Math.round(duration)}ms`,
          frameCount: track.frameCount,
          message: `Animation FPS (${Math.round(fps)}) is below ${threshold} FPS threshold for ${deviceType}`,
        }
      );
    } else if (process.env.NODE_ENV === 'development') {
      console.log(
        `[AnimationMonitor] ✓ ${componentName}`,
        {
          fps: Math.round(fps),
          threshold,
          deviceType,
          duration: `${Math.round(duration)}ms`,
          frameCount: track.frameCount,
        }
      );
    }

    // Clean up
    this.tracks.delete(componentName);
  }

  /**
   * Stops all active animation tracking
   * Useful for cleanup or testing
   */
  stopAll(): void {
    const componentNames = Array.from(this.tracks.keys());
    componentNames.forEach(name => this.stop(name));
  }

  /**
   * Gets the current FPS for an active animation
   * 
   * @param componentName - Identifier for the animated component
   * @returns Current FPS or null if not tracking
   */
  getCurrentFPS(componentName: string): number | null {
    const track = this.tracks.get(componentName);
    
    if (!track) return null;
    
    return this.calculateFPS(track);
  }

  /**
   * Checks if an animation is currently being tracked
   * 
   * @param componentName - Identifier for the animated component
   * @returns True if tracking, false otherwise
   */
  isTracking(componentName: string): boolean {
    return this.tracks.has(componentName);
  }

  /**
   * Gets all currently tracked animation names
   * 
   * @returns Array of component names being tracked
   */
  getActiveTracking(): string[] {
    return Array.from(this.tracks.keys());
  }
}

/**
 * Singleton instance of the animation monitor
 * Import and use this instance throughout your application
 */
export const animationMonitor = new AnimationMonitor();

/**
 * React hook wrapper for animation monitoring
 * 
 * @param componentName - Identifier for the animated component
 * @returns Object with start and stop functions
 * 
 * @example
 * const monitor = useAnimationMonitor('my-component');
 * 
 * <motion.div
 *   onAnimationStart={monitor.start}
 *   onAnimationComplete={monitor.stop}
 * >
 */
export function useAnimationMonitor(componentName: string) {
  return {
    start: () => animationMonitor.start(componentName),
    stop: () => animationMonitor.stop(componentName),
    getCurrentFPS: () => animationMonitor.getCurrentFPS(componentName),
    isTracking: () => animationMonitor.isTracking(componentName),
  };
}

/**
 * Performance monitoring configuration
 * Matches requirements 18.1-18.4
 */
export const ANIMATION_PERFORMANCE_CONFIG = {
  fpsThresholds: FPS_THRESHOLD,
  mobileBreakpoint: 768, // px
  enableLogging: process.env.NODE_ENV === 'development',
} as const;
