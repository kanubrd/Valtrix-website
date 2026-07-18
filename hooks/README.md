# Utility Hooks

This directory contains core utility hooks for the premium enterprise enhancement feature.

## Available Hooks

### `useReducedMotion`
Detects if the user has enabled prefers-reduced-motion in their system settings for accessibility compliance.

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.01 : 0.6 
      }}
    />
  );
}
```

### `useMediaQuery`
Responsive breakpoint detection using CSS media queries.

```tsx
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### `useDeviceType`
Mobile/desktop/tablet detection using standard responsive breakpoints.

```tsx
import { useDeviceType } from '@/hooks/useDeviceType';

function Component() {
  const { isMobile, isTablet, isDesktop, isMobileOrTablet } = useDeviceType();
  
  // Disable parallax on mobile devices
  const enableParallax = isDesktop;
  
  return (
    <div>
      {enableParallax && <ParallaxEffect />}
    </div>
  );
}
```

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### `useDebounce`
Input debouncing for performance optimization of expensive operations.

```tsx
import { useDebounce } from '@/hooks/useDebounce';
import { useState, useEffect } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    // This only runs 300ms after user stops typing
    if (debouncedSearchTerm) {
      performExpensiveSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Recommended delays:**
- Search input: 300ms
- Scroll calculations: 150ms
- Resize handlers: 200ms

### `useParallax`
Creates scroll-linked parallax effects using Framer Motion's useScroll and useTransform hooks. GPU-accelerated, desktop-only, viewport-aware.

```tsx
import { useParallax } from '@/hooks/useParallax';
import { motion } from 'framer-motion';
import { useRef } from 'react';

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { y, isActive } = useParallax(ref, { strength: 0.1 });
  
  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: isActive ? y : 0 }}
      >
        <img src="/hero-bg.jpg" alt="Hero" className="w-full h-full object-cover" />
      </motion.div>
      <div className="relative z-10">
        <h1>Content overlays here</h1>
      </div>
    </section>
  );
}
```

**Options:**
- `strength`: Parallax movement strength (0 to 0.2, default: 0.1)
- `enabled`: Whether to enable effect (default: true)
- `offset`: Scroll start/end points (default: ['start end', 'end start'])

**Returns:**
- `scrollProgress`: MotionValue tracking scroll progress (0 to 1)
- `y`: MotionValue for translateY transform
- `isActive`: Boolean indicating if parallax is currently active

**Features:**
- **GPU-accelerated**: Uses only transform properties for 60fps animations
- **Desktop-only**: Automatically disabled on viewports < 768px
- **Viewport-aware**: Pauses calculations when element is out of view
- **Strength-limited**: Maximum 20% of scroll distance per requirements
- **Accessible**: Respects user's motion preferences

**Performance tips:**
- Use moderate strength values (0.05-0.15) for subtle effects
- Limit to 3-4 parallax layers per viewport
- Always check `isActive` before applying transforms
- See `useParallax.example.tsx` for advanced usage patterns

## Testing

All hooks have comprehensive unit tests. Run tests with:

```bash
npm test hooks/
```

## Requirements Coverage

These hooks support the following requirements:
- **3.1, 3.2, 3.3, 3.4, 3.5**: Parallax effects - GPU-accelerated scroll-linked animations
- **21.1, 21.2**: Accessibility - Reduced motion detection
- **23.1**: Mobile optimization - Device type detection
- **24.4**: Interaction responsiveness - Input debouncing

## Related Components

These hooks are used by:
- Animation system components (`components/animations/`)
- Parallax effects
- Performance-critical features
- Responsive UI components
