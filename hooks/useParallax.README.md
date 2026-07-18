# useParallax Hook

A React hook for creating GPU-accelerated parallax scroll effects using Framer Motion's `useScroll` and `useTransform`.

## Features

- ✅ **GPU-Accelerated**: Uses CSS transforms only for optimal performance
- ✅ **Desktop Only**: Automatically disabled on mobile devices (< 768px) for better performance
- ✅ **Smart Performance**: Pauses calculations when element is out of viewport using Intersection Observer
- ✅ **Configurable**: Customizable strength (0-20% per requirements), offset, and enable/disable
- ✅ **Accessibility**: Respects `prefers-reduced-motion` when combined with `useReducedMotion`
- ✅ **TypeScript**: Full type safety with TypeScript support

## Installation

The hook is already part of the project's hooks system. Import it from the hooks directory:

```tsx
import { useParallax } from '@/hooks';
```

## Basic Usage

```tsx
'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks';

export function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { y, isActive } = useParallax(ref);

  return (
    <section ref={ref} className="relative h-screen">
      <motion.div
        style={{ y: isActive ? y : 0 }}
        className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600"
      >
        <h1>Parallax Content</h1>
      </motion.div>
    </section>
  );
}
```

## API Reference

### `useParallax(targetRef, options)`

#### Parameters

- **`targetRef`** (required): `RefObject<HTMLElement>`
  - A React ref pointing to the element you want to apply parallax to
  
- **`options`** (optional): `UseParallaxOptions`
  - **`strength`**: `number` (default: `0.1`)
    - Parallax movement strength from 0 to 0.2 (0% to 20%)
    - Values are automatically clamped to the 0-0.2 range per requirements
    - Example: `0.1` = 10% movement, `0.15` = 15% movement
    
  - **`enabled`**: `boolean` (default: `true`)
    - Whether to enable the parallax effect
    - Useful for conditional enabling/disabling
    
  - **`offset`**: `[string, string]` (default: `['start end', 'end start']`)
    - Custom scroll trigger points for when parallax calculation begins/ends
    - Uses Framer Motion offset syntax
    - Example: `['start start', 'end end']`

#### Returns: `UseParallaxReturn`

- **`scrollProgress`**: `MotionValue<number>`
  - Scroll progress value from 0 to 1
  - Can be used for additional scroll-based animations
  
- **`y`**: `MotionValue<number>`
  - Vertical translation value for the parallax effect
  - Apply this to the `style` prop of a `motion.div`
  
- **`isActive`**: `boolean`
  - Whether the parallax effect is currently active
  - `false` when on mobile, out of viewport, or `enabled: false`
  - Use this to conditionally apply transforms

## Examples

### Custom Strength

```tsx
const { y, isActive } = useParallax(ref, { 
  strength: 0.15  // 15% movement
});
```

### Multi-Layer Parallax (Creating Depth)

```tsx
export function ParallaxLayers() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Different speeds for each layer
  const background = useParallax(ref, { strength: 0.2 });  // Moves most
  const midground = useParallax(ref, { strength: 0.1 });
  const foreground = useParallax(ref, { strength: 0.05 }); // Moves least

  return (
    <section ref={ref} className="relative h-screen">
      <motion.div style={{ y: background.isActive ? background.y : 0 }} />
      <motion.div style={{ y: midground.isActive ? midground.y : 0 }} />
      <motion.div style={{ y: foreground.isActive ? foreground.y : 0 }} />
    </section>
  );
}
```

### Using Scroll Progress

```tsx
const { y, scrollProgress, isActive } = useParallax(ref);

<motion.div
  style={{ 
    y: isActive ? y : 0,
    opacity: scrollProgress, // Fade in while scrolling
  }}
/>
```

### Custom Scroll Offset

```tsx
const { y, isActive } = useParallax(ref, {
  strength: 0.15,
  offset: ['start start', 'end end'], // Custom trigger points
});
```

### Conditional Parallax

```tsx
const { y, isActive } = useParallax(ref, { 
  enabled: enableParallax  // Control via state/prop
});
```

## Performance Considerations

### GPU Acceleration
- The hook uses only `transform: translateY()` which is GPU-accelerated
- Avoid animating layout properties (width, height, margin, padding)
- Apply transforms to separate layers, not content containers

### Mobile Optimization
- Automatically disabled on viewports < 768px
- This prevents performance issues on mobile devices
- Mobile users see static content without parallax

### Viewport Optimization
- Uses Intersection Observer with 100px margin
- Pauses calculations when element is out of view
- Reduces unnecessary CPU/GPU usage

### Best Practices

```tsx
// ✅ Good - Apply to background layers
<motion.div style={{ y: isActive ? y : 0 }} className="absolute inset-0" />

// ✅ Good - Conditionally apply based on isActive
style={{ y: isActive ? y : 0 }}

// ❌ Avoid - Don't apply to content containers with text
<motion.div style={{ y }}> {/* Text inside will be blurry */}

// ❌ Avoid - Don't use without checking isActive
style={{ y }} // Will run on mobile and out of viewport
```

## Accessibility

The hook itself doesn't handle `prefers-reduced-motion`, but you can combine it with the `useReducedMotion` hook:

```tsx
import { useParallax, useReducedMotion } from '@/hooks';

const reducedMotion = useReducedMotion();
const { y, isActive } = useParallax(ref, { 
  enabled: !reducedMotion  // Disable if user prefers reduced motion
});
```

Or handle it at the component level:

```tsx
const reducedMotion = useReducedMotion();
const { y, isActive } = useParallax(ref);

<motion.div
  style={{ 
    y: (!reducedMotion && isActive) ? y : 0 
  }}
/>
```

## Technical Details

### Requirements Satisfied
- **Requirement 3.1**: Applies parallax transform to background images on scroll
- **Requirement 3.2**: Limits movement to max 20% of scroll distance
- **Requirement 3.3**: Uses GPU-accelerated transforms only
- **Requirement 3.4**: Disabled on mobile devices (< 768px)
- **Requirement 3.5**: Pauses calculations when out of viewport

### Browser Support
- Modern browsers with support for:
  - Intersection Observer API
  - CSS transforms
  - Framer Motion
- Gracefully handles SSR (server-side rendering)

### Dependencies
- `framer-motion` (v12.39.0+)
- `react` (v18+)
- Internal: `useMediaQuery` hook

## Related Hooks
- `useMediaQuery`: Used internally for desktop detection
- `useReducedMotion`: For accessibility compliance
- `useWillChange`: For `will-change` CSS hint management

## Further Reading
- [Design Document](../.kiro/specs/premium-enterprise-enhancement/design.md) - Section 2.3
- [Requirements](../.kiro/specs/premium-enterprise-enhancement/requirements.md) - Requirement 3
- [Framer Motion useScroll](https://www.framer.com/motion/use-scroll/)
- [Framer Motion useTransform](https://www.framer.com/motion/use-transform/)
