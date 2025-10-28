/**
 * Animated Border Effects
 * Consolidated premium border animations from legacy components
 * Optimized for reusability and performance
 */

'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedBorderProps {
  children?: React.ReactNode
  className?: string
  variant?: 'minimal' | 'medium' | 'intense'
  colorScheme?: 'teal' | 'blue' | 'gradient' | 'purple'
  animated?: boolean
}

/**
 * Creates elegant animated border with customizable glow effects
 * 
 * @example
 * ```tsx
 * <AnimatedBorder variant="medium" colorScheme="teal">
 *   <Card>Premium content</Card>
 * </AnimatedBorder>
 * ```
 */
export function AnimatedBorder({
  children,
  className,
  variant = 'minimal',
  colorScheme = 'teal',
  animated = true,
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated || !containerRef.current) return

    const container = containerRef.current
    const configs = {
      minimal: { duration: 4000, opacity: 0.3 },
      medium: { duration: 3000, opacity: 0.5 },
      intense: { duration: 2000, opacity: 0.7 },
    }

    const config = configs[variant]
    let animationFrameId: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % config.duration) / config.duration
      const glowIntensity = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5

      if (colorScheme === 'gradient') {
        container.style.backgroundImage = `
          linear-gradient(135deg, 
            rgba(20, 184, 166, ${0.15 * glowIntensity}) 0%,
            rgba(6, 182, 212, ${0.1 * glowIntensity}) 50%,
            rgba(20, 184, 166, ${0.15 * glowIntensity}) 100%
          )
        `
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [animated, variant, colorScheme])

  const colorStyles = {
    teal: 'border-teal-400/20 shadow-[0_0_20px_-5px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_-3px_rgba(20,184,166,0.4)]',
    blue: 'border-blue-400/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_-3px_rgba(59,130,246,0.4)]',
    purple: 'border-purple-400/20 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_-3px_rgba(168,85,247,0.4)]',
    gradient: 'border-transparent',
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative rounded-lg border transition-all duration-300',
        colorStyles[colorScheme],
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Simplified border glow for cards and containers
 */
export function GlowBorder({
  children,
  className,
  intensity = 'medium',
}: {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}) {
  const glowStyles = {
    low: 'shadow-sm hover:shadow-md',
    medium: 'shadow-md hover:shadow-lg',
    high: 'shadow-lg hover:shadow-xl',
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-border/50 bg-card transition-shadow duration-300',
        glowStyles[intensity],
        className
      )}
    >
      {children}
    </div>
  )
}
