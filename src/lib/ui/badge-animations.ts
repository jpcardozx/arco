'use client'

import { Variants } from 'framer-motion'
import { easings, durations } from '../transitions'

/**
 * Premium badge animations for ARCO
 * 
 * These advanced badge animations provide sophisticated visual feedback
 * for interactive elements, enhancing the perceived quality of the UI
 */

export const statusBadgeAnimations: Record<string, Variants> = {
  // For primary action badges with attention-grabbing animation
  premium: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: durations.medium,
        ease: easings.bounce
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)',
      transition: {
        duration: 0.2,
        ease: easings.smooth
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: easings.precise
      }
    }
  },

  // For status indicators with subtle pulse
  pulse: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: durations.fast
      }
    },
    whileInView: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  },

  // For microbadges and subtle status indicators
  indicator: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.fast,
        ease: easings.bounce
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: easings.precise
      }
    }
  },
  
  // For attention-grabbing badges with shimmer effect
  shimmer: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: durations.medium
      }
    },
    // Shimmer effect will be applied via CSS in component
  }
}

// Helper to create layered badge with primary content and decorative background
export const createLayeredBadge = (delay: number = 0) => {
  return {
    container: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay
        }
      }
    },
    background: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: durations.medium,
          ease: easings.smooth
        }
      }
    },
    content: {
      initial: { opacity: 0, y: 5 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: durations.fast,
          delay: 0.1,
          ease: easings.precise
        }
      }
    },
    icon: {
      initial: { opacity: 0, rotate: -10, scale: 0.8 },
      animate: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
          duration: durations.medium,
          delay: 0.2,
          ease: easings.bounce
        }
      },
      hover: {
        rotate: [0, -5, 5, 0],
        transition: {
          duration: 0.5
        }
      }
    }
  }
}
