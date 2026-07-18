// Core utility hooks for premium enterprise enhancement
export { useReducedMotion } from './useReducedMotion';
export { useMediaQuery } from './useMediaQuery';
export { useDeviceType } from './useDeviceType';
export { useDebounce } from './useDebounce';
export { useScrollProgress } from './useScrollProgress';
export { 
  useWillChange, 
  useAutoWillChange, 
  useTimedWillChange,
  getActiveWillChangeCount,
  getPendingQueueLength 
} from './useWillChange';
export { useParallax } from './useParallax';
export type { UseParallaxOptions, UseParallaxReturn } from './useParallax';
export { 
  useConnectionSpeed,
  getImageQuality,
  shouldDeferAnimations,
  shouldShowSkeletonImmediately 
} from './useConnectionSpeed';
export type { ConnectionSpeed } from './useConnectionSpeed';
