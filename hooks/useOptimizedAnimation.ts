import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface AnimationConfig {
    threshold?: number
    delay?: number
    once?: boolean
    intensityLevel?: 'high' | 'medium' | 'low' | 'none'
}

export const useOptimizedAnimation = ({ 
    threshold = 0.2, 
    delay = 0, 
    once = true,
    intensityLevel
}: AnimationConfig = {}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { 
        threshold, 
        margin: "-50px",
        once 
    })
    
    // Device-aware animation intensity
    const [animationIntensity, setAnimationIntensity] = useState<'high' | 'medium' | 'low' | 'none'>(
        intensityLevel || 'high'
    )
    
    useEffect(() => {
        // Skip if intensityLevel is manually set
        if (intensityLevel) return;
        
        // Check for reduced motion preference
        if (typeof window !== 'undefined') {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                setAnimationIntensity('none');
                return;
            }
            
            // Check device capabilities
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isLowPower = 
                (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
                ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 2);
                
            if (isLowPower) {
                setAnimationIntensity('low');
            } else if (isMobile) {
                setAnimationIntensity('medium');
            }
        }
    }, [intensityLevel]);
    
    // Create variants based on animation intensity
    let yOffset = 0;
    let duration = 0;
    
    switch (animationIntensity) {
        case 'high':
            yOffset = 20;
            duration = 0.5;
            break;
        case 'medium':
            yOffset = 15;
            duration = 0.4;
            break;
        case 'low':
            yOffset = 10;
            duration = 0.3;
            break;
        case 'none':
            yOffset = 0;
            duration = 0.1;
            break;
    }

    const variants = {
        hidden: { opacity: animationIntensity === 'none' ? 0.8 : 0, y: yOffset },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: duration,
                delay: animationIntensity === 'none' ? 0 : delay,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    return {
        ref,
        variants,
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        shouldAnimate: animationIntensity !== 'none',
        animationIntensity
    }
}

export const staggerChildrenConfig = (intensity: 'high' | 'medium' | 'low' | 'none' = 'high') => {
    // Configure stagger values based on animation intensity
    let staggerDelay = 0.1;
    let initialDelay = 0.2;
    let itemDuration = 0.5;
    let yOffset = 20;
    
    switch (intensity) {
        case 'high':
            // Default values
            break;
        case 'medium':
            staggerDelay = 0.08;
            initialDelay = 0.15;
            itemDuration = 0.4;
            yOffset = 15;
            break;
        case 'low':
            staggerDelay = 0.05;
            initialDelay = 0.1;
            itemDuration = 0.3;
            yOffset = 10;
            break;
        case 'none':
            staggerDelay = 0.02;
            initialDelay = 0.05;
            itemDuration = 0.2;
            yOffset = 5;
            break;
    }
    
    return {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                    delayChildren: initialDelay
                }
            }
        },
        item: {
            hidden: { opacity: 0, y: yOffset },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: itemDuration }
            }
        }
    };
}
