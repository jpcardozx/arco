'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '../../lib/ui-utils'
import { Section, SectionProps } from './section'

interface AnimatedSectionProps extends SectionProps {
    animationVariant?: 'fade' | 'slide-up' | 'slide-in' | 'zoom' | 'stagger' | 'none'
    threshold?: number
    delay?: number
    triggerOnce?: boolean
    children: React.ReactNode
    animationDuration?: number
    animationEase?: [number, number, number, number]
    onViewportEnter?: () => void
}

/**
 * Animated Section component that triggers animations when scrolled into view
 */
export function AnimatedSection({
    animationVariant = 'fade',
    threshold = 0.2,
    delay = 0,
    triggerOnce = true,
    children,
    animationDuration = 0.6,
    animationEase = [0.22, 1, 0.36, 1], // Custom ease curve
    onViewportEnter,
    ...sectionProps
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    const isInView = useInView(ref, {
        amount: threshold,
        once: triggerOnce
    })

    // Animation variants
    const variants = {
        'fade': {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    duration: animationDuration,
                    ease: animationEase,
                    delay
                }
            }
        },
        'slide-up': {
            hidden: { opacity: 0, y: 40 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: animationDuration,
                    ease: animationEase,
                    delay
                }
            }
        },
        'slide-in': {
            hidden: { opacity: 0, x: -40 },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: animationDuration,
                    ease: animationEase,
                    delay
                }
            }
        },
        'zoom': {
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: animationDuration,
                    ease: animationEase,
                    delay
                }
            }
        },
        'stagger': {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: delay,
                }
            }
        },
        'none': {
            hidden: {},
            visible: {}
        }
    }

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
            onViewportEnter?.()
        } else if (!triggerOnce) {
            controls.start('hidden')
        }
    }, [controls, isInView, triggerOnce, onViewportEnter])

    // Wrap children in motion.div if using stagger animation
    const renderChildren = () => {
        if (animationVariant === 'stagger') {
            return React.Children.map(children, (child, i) => {
                if (React.isValidElement(child)) {
                    return (
                        <motion.div
                            key={i}
                            variants={childVariants}
                            custom={i}
                        >
                            {child}
                        </motion.div>
                    )
                }
                return child
            })
        }

        return children
    }

    return (
        <Section {...sectionProps} className={cn('overflow-hidden', sectionProps.className)}>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={variants[animationVariant]}
                className="w-full"
            >
                {renderChildren()}
            </motion.div>
        </Section>
    )
}
