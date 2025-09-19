'use client'

import { useOptimizedAnimation } from './useOptimizedAnimation'
import { easings, durations } from '@/lib/transitions'

/**
 * Enhanced animation hook that integrates with ARCO transition system
 * Extends the base useOptimizedAnimation hook with transition system integration
 * 
 * @param config Configuration options for the animation
 * @returns Animation properties and helper methods
 */
export const useTransitionAnimation = (config: {
  threshold?: number;
  delay?: number;
  once?: boolean;
  intensityLevel?: 'high' | 'medium' | 'low' | 'none';
  transitionType?: 'fade' | 'slideUp' | 'scale' | 'reveal';
  staggerChildren?: boolean;
  staggerDelay?: number;
} = {}) => {
  const { 
    transitionType = 'fade',
    staggerChildren = false,
    staggerDelay = 0.08,
    ...restConfig
  } = config
  
  // Use the base animation hook
  const base = useOptimizedAnimation(restConfig)
  
  // Generate appropriate variants based on transition type and animation intensity
  const getVariants = () => {
    const { animationIntensity } = base
    
    // Reduced values for lower intensity
    const yOffset = animationIntensity === 'high' ? 30 : 
                   animationIntensity === 'medium' ? 20 :
                   animationIntensity === 'low' ? 10 : 5
                   
    const transitionDuration = animationIntensity === 'high' ? durations.medium : 
                              animationIntensity === 'medium' ? durations.medium * 0.8 :
                              animationIntensity === 'low' ? durations.fast : durations.fast * 0.5
    
    switch(transitionType) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: transitionDuration,
              ease: easings.standard,
              ...(staggerChildren && { delayChildren: config.delay || 0, staggerChildren: staggerDelay })
            }
          }
        }
      
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: yOffset },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: transitionDuration,
              ease: easings.smooth,
              ...(staggerChildren && { delayChildren: config.delay || 0, staggerChildren: staggerDelay })
            }
          }
        }
        
      case 'scale':
        return {
          hidden: { opacity: 0, scale: animationIntensity === 'none' ? 0.98 : 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: transitionDuration,
              ease: easings.smooth,
              ...(staggerChildren && { delayChildren: config.delay || 0, staggerChildren: staggerDelay })
            }
          }
        }
      
      case 'reveal':
        if (animationIntensity === 'none' || animationIntensity === 'low') {
          // Simplified animation for reduced motion
          return {
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration: transitionDuration,
                ease: easings.standard,
                ...(staggerChildren && { delayChildren: config.delay || 0, staggerChildren: staggerDelay })
              }
            }
          }
        }
        
        return {
          hidden: { 
            opacity: 0, 
            clipPath: "inset(0 0 100% 0)",
            y: yOffset / 2
          },
          visible: { 
            opacity: 1, 
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            transition: { 
              duration: transitionDuration,
              ease: easings.precise,
              clipPath: { 
                duration: transitionDuration,
                ease: easings.standard 
              },
              ...(staggerChildren && { delayChildren: config.delay || 0, staggerChildren: staggerDelay })
            }
          }
        }
      
      default:
        return base.variants
    }
  }
  
  // Create child item variants for staggered animations
  const getChildVariants = () => {
    const { animationIntensity } = base
    
    // Reduced values for lower intensity
    const yOffset = animationIntensity === 'high' ? 20 : 
                   animationIntensity === 'medium' ? 15 :
                   animationIntensity === 'low' ? 10 : 5
                   
    const transitionDuration = animationIntensity === 'high' ? durations.medium : 
                              animationIntensity === 'medium' ? durations.medium * 0.8 :
                              animationIntensity === 'low' ? durations.fast : durations.fast * 0.5
    
    return {
      hidden: { opacity: 0, y: yOffset },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: transitionDuration,
          ease: easings.smooth
        }
      }
    }
  }
  
  // Return enhanced hook with additional methods
  return {
    ...base,
    variants: getVariants(),
    childVariants: getChildVariants(),
    shouldAnimate: base.animationIntensity !== 'none',
    getStaggerContainer: (delay: number = 0) => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: staggerDelay,
          delayChildren: delay,
        }
      }
    })
  }
}
