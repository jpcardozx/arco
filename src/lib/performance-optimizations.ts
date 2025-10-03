// Performance Optimizations for Animations and Interactions
export const performanceConfig = {
  // Framer Motion optimizations
  motionConfig: {
    // Use transform and opacity for better performance
    preferredTransforms: ['transform', 'opacity'],

    // Reduced motion for users who prefer it
    reducedMotion: {
      transition: { duration: 0.01 },
      scale: 1,
      opacity: 1
    },

    // Hardware acceleration hints
    hwAcceleration: {
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    }
  },

  // Intersection Observer for performance
  intersectionOptions: {
    threshold: 0.1,
    rootMargin: '50px 0px'
  },

  // Throttle and debounce configurations
  throttle: {
    scroll: 16, // ~60fps
    resize: 100,
    mousemove: 16
  },

  debounce: {
    search: 300,
    resize: 250
  }
} as const;

// Optimized easing curves for better performance
export const optimizedEasing = {
  // CSS-safe easing functions
  standard: [0.25, 0.1, 0.25, 1] as const,
  decelerate: [0.0, 0.0, 0.2, 1] as const,
  accelerate: [0.4, 0.0, 1, 1] as const,
  sharp: [0.4, 0.0, 0.6, 1] as const,

  // Spring configurations optimized for performance
  spring: {
    light: { type: 'spring', stiffness: 300, damping: 25 },
    medium: { type: 'spring', stiffness: 400, damping: 30 },
    strong: { type: 'spring', stiffness: 500, damping: 35 }
  }
} as const;

// Performance monitoring utilities
export const performanceUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },

  // Check device performance capabilities
  isLowEndDevice: () => {
    if (typeof navigator !== 'undefined') {
      // Check for device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory;
      if (deviceMemory && deviceMemory < 4) return true;

      // Check for slow connection
      const connection = (navigator as any).connection;
      if (connection) {
        const slowConnections = ['slow-2g', '2g', '3g'];
        if (slowConnections.includes(connection.effectiveType)) return true;
      }

      // Check for low-end indicators
      const lowEndIndicators = [
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
        navigator.userAgent.includes('Android') && !navigator.userAgent.includes('Chrome/9'),
      ];

      return lowEndIndicators.some(Boolean);
    }
    return false;
  },

  // Adaptive animation config based on device
  getAdaptiveConfig: () => {
    const prefersReduced = performanceUtils.prefersReducedMotion();
    const isLowEnd = performanceUtils.isLowEndDevice();

    if (prefersReduced || isLowEnd) {
      return {
        duration: 0.1,
        ease: 'linear',
        scale: 1,
        opacity: 1,
        transform: 'none'
      };
    }

    return {
      duration: 0.5,
      ease: optimizedEasing.standard,
      enableHardwareAcceleration: true
    };
  }
};

// Optimized animation variants
export const optimizedVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },

  // Slide animations (using transform for better performance)
  slideUp: {
    initial: { opacity: 0, transform: 'translateY(30px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    exit: { opacity: 0, transform: 'translateY(-30px)' }
  },

  slideDown: {
    initial: { opacity: 0, transform: 'translateY(-30px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    exit: { opacity: 0, transform: 'translateY(30px)' }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(0.9)' }
  },

  // Stagger container
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Stagger item
  staggerItem: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' }
  }
};

// CSS-in-JS optimizations
export const cssOptimizations = {
  // Will-change hints for better compositing
  willChange: {
    transform: { willChange: 'transform' },
    opacity: { willChange: 'opacity' },
    scroll: { willChange: 'scroll-position' },
    auto: { willChange: 'auto' }
  },

  // GPU layer promotion
  gpuLayer: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  }
};

export default {
  performanceConfig,
  optimizedEasing,
  performanceUtils,
  optimizedVariants,
  cssOptimizations
};