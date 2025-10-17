/**
 * Framer Motion Animation Tokens
 * Advanced animations config for world-class UX
 */

import { Variants, Transition } from 'framer-motion'

// ============================================
// SPRING PHYSICS PRESETS
// ============================================

export const spring = {
  // Smooth spring - For most UI elements
  smooth: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20
  },
  
  // Bouncy spring - For playful interactions
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17
  },
  
  // Snappy spring - For quick interactions
  snappy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 25
  },
  
  // Gentle spring - For large elements
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15
  }
}

// ============================================
// EASING CURVES
// ============================================

export const easing = {
  // Standard ease out
  standard: [0.4, 0, 0.2, 1],
  
  // Emphasized ease (Material Design)
  emphasized: [0.4, 0, 0.1, 1],
  
  // Sharp ease (quick exit)
  sharp: [0.4, 0, 0.6, 1],
  
  // Smooth ease in-out
  smooth: [0.45, 0, 0.55, 1],
  
  // Elastic
  elastic: [0.68, -0.55, 0.265, 1.55]
}

// ============================================
// DURATION PRESETS
// ============================================

export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
}

// ============================================
// FADE ANIMATIONS
// ============================================

export const fade = {
  in: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  inUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  inDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  inLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  
  inRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }
}

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scale = {
  in: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  
  pop: {
    initial: { scale: 0 },
    animate: { 
      scale: [0, 1.2, 1],
      transition: spring.bouncy
    }
  },
  
  bounce: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1]
    }
  }
}

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const stagger = {
  // Container variants
  container: (delayChildren: number = 0.1): Variants => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delayChildren
      }
    }
  }),
  
  // Item variants (use with container)
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: spring.smooth
    }
  },
  
  // Fast stagger
  fast: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
      }
    },
    item: fade.inUp
  },
  
  // Slow stagger
  slow: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
      }
    },
    item: fade.inUp
  }
}

// ============================================
// HOVER STATES
// ============================================

export const hover = {
  // Lift effect
  lift: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    transition: spring.smooth
  },
  
  // Grow effect
  grow: {
    scale: 1.05,
    transition: spring.smooth
  },
  
  // Glow effect (combine with boxShadow)
  glow: {
    scale: 1.02,
    transition: spring.smooth
  },
  
  // Rotate slightly
  tilt: {
    rotate: -2,
    scale: 1.02,
    transition: spring.smooth
  }
}

// ============================================
// TAP STATES
// ============================================

export const tap = {
  // Shrink on press
  shrink: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  
  // Deep press
  press: {
    scale: 0.92,
    transition: { duration: 0.1 }
  },
  
  // Subtle press
  subtle: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

// ============================================
// CARD ANIMATIONS
// ============================================

export const card = {
  // Standard card hover
  hover: {
    whileHover: hover.lift,
    whileTap: tap.shrink,
    transition: spring.smooth
  },
  
  // Flip card
  flip: {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
    transition: { duration: 0.6 }
  },
  
  // Expand card
  expand: {
    initial: { height: 'auto' },
    expanded: { height: 'auto' },
    transition: spring.smooth
  }
}

// ============================================
// SUCCESS ANIMATIONS
// ============================================

export const success = {
  // Check mark draw
  checkmark: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: easing.emphasized }
    }
  },
  
  // Pulse effect
  pulse: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(34, 197, 94, 0)",
      "0 0 0 10px rgba(34, 197, 94, 0.2)",
      "0 0 0 0 rgba(34, 197, 94, 0)"
    ],
    transition: { duration: 0.6 }
  },
  
  // Confetti burst
  confetti: {
    scale: [0, 1.2, 1],
    rotate: [0, 360],
    transition: { duration: 0.8, ease: easing.elastic }
  }
}

// ============================================
// PROGRESS ANIMATIONS
// ============================================

export const progress = {
  // Bar fill
  bar: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 0.5, ease: easing.emphasized }
  },
  
  // Circle fill (for circular progress)
  circle: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1, ease: easing.smooth }
  },
  
  // Step indicator
  step: {
    inactive: { scale: 1, opacity: 0.5 },
    active: { 
      scale: 1.2, 
      opacity: 1,
      transition: spring.bouncy
    },
    complete: {
      scale: 1,
      opacity: 1,
      backgroundColor: "#10B981"
    }
  }
}

// ============================================
// MODAL/DIALOG ANIMATIONS
// ============================================

export const modal = {
  // Overlay backdrop
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  
  // Modal content scale in
  content: {
    initial: { scale: 0.95, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.95, opacity: 0, y: 20 },
    transition: spring.smooth
  },
  
  // Slide from bottom (mobile-friendly)
  slideUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: spring.smooth
  }
}

// ============================================
// LOADING ANIMATIONS
// ============================================

export const loading = {
  // Spinner rotate
  spinner: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  },
  
  // Pulse
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easing.smooth
    }
  },
  
  // Skeleton shimmer
  skeleton: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// ============================================
// TEXT ANIMATIONS
// ============================================

export const text = {
  // Word-by-word reveal
  reveal: {
    container: {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i }
      })
    },
    child: {
      hidden: {
        opacity: 0,
        y: 20
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: spring.smooth
      }
    }
  },
  
  // Typewriter effect (use with custom hook)
  typewriter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }
}

// ============================================
// LAYOUT ANIMATIONS
// ============================================

export const layout = {
  // Shared layout transition
  shared: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30
  },
  
  // Smooth layout shift
  smooth: {
    layout: true,
    transition: spring.smooth
  }
}

// ============================================
// COMPLEX PRESETS
// ============================================

export const presets = {
  // Card appearing in grid
  gridItem: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    whileHover: hover.lift,
    whileTap: tap.shrink,
    transition: spring.smooth
  },
  
  // Button with all states
  button: {
    initial: { scale: 1 },
    whileHover: { scale: 1.05, transition: spring.bouncy },
    whileTap: tap.shrink,
    transition: spring.smooth
  },
  
  // Page transition
  page: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: spring.smooth
  },
  
  // Toast notification
  toast: {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { 
      opacity: 0, 
      scale: 0.5,
      transition: { duration: 0.2 }
    },
    transition: spring.bouncy
  }
}

// ============================================
// GESTURE CONFIGURATIONS
// ============================================

export const gestures = {
  // Drag to dismiss
  drag: {
    drag: "x" as const,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.2,
    onDragEnd: (event: any, info: any) => {
      if (Math.abs(info.offset.x) > 100) {
        // Trigger dismiss
      }
    }
  },
  
  // Swipe actions
  swipe: {
    drag: "x" as const,
    dragConstraints: { left: -100, right: 100 },
    dragElastic: 0.1
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const createStagger = (delay: number = 0.1) => ({
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: delay
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
})

export const createSpring = (stiffness: number = 260, damping: number = 20): Transition => ({
  type: "spring",
  stiffness,
  damping
})

export default {
  spring,
  easing,
  duration,
  fade,
  scale,
  stagger,
  hover,
  tap,
  card,
  success,
  progress,
  modal,
  loading,
  text,
  layout,
  presets,
  gestures,
  createStagger,
  createSpring
}
