# ARCO Premium Animation System

This document describes the sophisticated animation system developed for ARCO, providing guidelines on usage and best practices.

## Core Modules

The ARCO animation system consists of several specialized modules:

### 1. transitions.ts

Core timing presets and common animation variants for major UI elements:

- **easings**: Professional easing functions for different animation needs
- **durations**: Standard duration presets to maintain consistency
- **sectionTransitions**: Animation variants for section-level components
- **containerTransitions**: Animation variants for container elements
- **headerTransitions**: Specialized transitions for section headers
- **badgeTransitions**: Animations for badge components
- **dividerTransitions**: Transitions for section dividers

### 2. micro-transitions.ts

Lightweight, performant micro-animations for interactive elements:

- **hoverTransforms**: Subtle hover states for interactive elements
- **feedbackAnimations**: User interaction feedback animations
- **focusAnimations**: Accessible focus state animations
- **scrollAnimations**: Optimized scroll-triggered animations

### 3. badge-animations.ts

Specialized animations for badge components:

- **statusBadgeAnimations**: Animation variants for different badge types
- **createLayeredBadge**: Helper function to create badges with layered animations

### 4. motion.ts

Unified API providing access to all animation modules:

- Exports all individual modules
- Provides preset combinations for common UI components
- Includes helper functions for staggered animations

## Usage Examples

### Basic Component Animation

```tsx
import { motion } from 'framer-motion';
import { sectionTransitions } from '@/lib/transitions';

export function MySection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionTransitions.slideUp}
    >
      Content goes here
    </motion.div>
  );
}
```

### Using Micro-transitions

```tsx
import { motion } from 'framer-motion';
import { hoverTransforms, feedbackAnimations } from '@/lib/micro-transitions';

export function MyButton() {
  return (
    <motion.button
      whileHover={hoverTransforms.float}
      whileTap={feedbackAnimations.tap}
      transition={{ duration: 0.2 }}
    >
      Click Me
    </motion.button>
  );
}
```

### Using Badge Animations

```tsx
import { motion } from 'framer-motion';
import { statusBadgeAnimations } from '@/lib/badge-animations';

export function StatusBadge() {
  return (
    <motion.div
      className="badge"
      variants={statusBadgeAnimations.premium}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      Premium
    </motion.div>
  );
}
```

### Using the Unified API

```tsx
import { motion } from 'framer-motion';
import arcoMotion, { presets } from '@/lib/motion';

export function Card() {
  return (
    <motion.div
      variants={presets.cards.premium}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileFocus="focus"
    >
      Card content
    </motion.div>
  );
}
```

## Best Practices

1. **Use consistent timing** - Leverage the predefined durations and easings
2. **Respect motion preferences** - Check for reduced motion settings
3. **Performance first** - Use simpler animations on mobile devices
4. **Maintain visual hierarchy** - More important elements get more prominent animations
5. **Avoid animation conflicts** - Don't animate the same property from multiple sources

## Accessibility Considerations

- Always respect `prefers-reduced-motion` settings
- Provide alternatives to motion-based UI indicators
- Never rely solely on animation to convey important information
- Consider reducing animation intensity on mobile devices

## Performance Optimization

- Use `willChange` CSS property sparingly for complex animations
- Prefer transforms and opacity for animations (they trigger fewer repaints)
- Use `useOptimizedAnimation` hook to automatically adjust based on device capabilities
- Consider using CSS animations for very simple, repetitive animations
