// Progress Ring System with Gamification
// File: /src/components/ui/progress-ring.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressRingProps {
  progress: number
  label?: string
  sublabel?: string
  color?: 'teal' | 'orange' | 'purple' | 'blue' | 'green' | 'red'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  thickness?: number
  showValue?: boolean
  animated?: boolean
  glow?: boolean
  className?: string
  children?: React.ReactNode
}

const colorMap = {
  teal: {
    gradient: 'from-teal-400 to-cyan-500',
    shadow: 'shadow-teal-500/30',
    text: 'text-teal-400'
  },
  orange: {
    gradient: 'from-orange-400 to-amber-500',
    shadow: 'shadow-orange-500/30',
    text: 'text-orange-400'
  },
  purple: {
    gradient: 'from-purple-400 to-pink-500',
    shadow: 'shadow-purple-500/30',
    text: 'text-purple-400'
  },
  blue: {
    gradient: 'from-blue-400 to-indigo-500',
    shadow: 'shadow-blue-500/30',
    text: 'text-blue-400'
  },
  green: {
    gradient: 'from-green-400 to-emerald-500',
    shadow: 'shadow-green-500/30',
    text: 'text-green-400'
  },
  red: {
    gradient: 'from-red-400 to-rose-500',
    shadow: 'shadow-red-500/30',
    text: 'text-red-400'
  }
}

const sizeMap = {
  sm: { size: 80, stroke: 6, fontSize: 'text-sm' },
  md: { size: 120, stroke: 8, fontSize: 'text-lg' },
  lg: { size: 160, stroke: 10, fontSize: 'text-2xl' },
  xl: { size: 200, stroke: 12, fontSize: 'text-3xl' }
}

export function ProgressRing({
  progress,
  label,
  sublabel,
  color = 'teal',
  size = 'md',
  thickness,
  showValue = true,
  animated = true,
  glow = false,
  className,
  children
}: ProgressRingProps) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const { size: ringSize, stroke: defaultStroke, fontSize } = sizeMap[size]
  const strokeWidth = thickness || defaultStroke
  const radius = (ringSize - strokeWidth * 2) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference
  
  const colors = colorMap[color]

  useEffect(() => {
    setIsVisible(true)
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      setDisplayProgress(progress)
    }
  }, [progress, animated])

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      {/* Glow effect */}
      {glow && (
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full blur-xl opacity-60',
            colors.shadow
          )}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}

      {/* Main SVG */}
      <svg
        className="transform -rotate-90"
        width={ringSize}
        height={ringSize}
      >
        {/* Background circle */}
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-white/10"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={radius}
          stroke={`url(#gradient-${color}-${size})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset: isVisible ? strokeDashoffset : circumference
          }}
          transition={{ 
            strokeDashoffset: { 
              duration: animated ? 1.5 : 0, 
              ease: "easeOut", 
              delay: animated ? 0.3 : 0 
            }
          }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient 
            id={`gradient-${color}-${size}`} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="100%"
          >
            <stop offset="0%" stopColor={color === 'teal' ? '#14b8a6' : 
                                      color === 'orange' ? '#f97316' :
                                      color === 'purple' ? '#a855f7' :
                                      color === 'blue' ? '#3b82f6' :
                                      color === 'green' ? '#10b981' : '#ef4444'} />
            <stop offset="100%" stopColor={color === 'teal' ? '#0891b2' :
                                          color === 'orange' ? '#f59e0b' :
                                          color === 'purple' ? '#ec4899' :
                                          color === 'blue' ? '#6366f1' :
                                          color === 'green' ? '#059669' : '#dc2626'} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {children ? (
            children
          ) : (
            <>
              {showValue && (
                <motion.div
                  className={cn('font-bold text-white', fontSize)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: animated ? 0.8 : 0, 
                    type: "spring", 
                    stiffness: 300 
                  }}
                >
                  <AnimatedNumber value={displayProgress} />%
                </motion.div>
              )}
              
              {label && (
                <motion.div
                  className={cn('text-xs font-medium mt-1', colors.text)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: animated ? 1 : 0, duration: 0.5 }}
                >
                  {label}
                </motion.div>
              )}
              
              {sublabel && (
                <motion.div
                  className="text-xs text-white/60 mt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: animated ? 1.2 : 0, duration: 0.5 }}
                >
                  {sublabel}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Pulse effect on completion */}
      {progress >= 100 && (
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2',
            `border-${color}-400`
          )}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 0]
          }}
          transition={{ 
            duration: 1, 
            repeat: 2,
            delay: animated ? 1.5 : 0
          }}
        />
      )}
    </div>
  )
}

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startValue = 0
    const endValue = Math.round(value)
    const duration = 1000 // 1 second
    const steps = 60
    const increment = (endValue - startValue) / steps
    const stepTime = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newValue = Math.min(startValue + increment * currentStep, endValue)
      setDisplayValue(Math.round(newValue))
      
      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  return <>{displayValue}</>
}

// Multi-ring progress component
interface MultiRingProgressProps {
  rings: Array<{
    progress: number
    label: string
    color: ProgressRingProps['color']
  }>
  size?: ProgressRingProps['size']
  className?: string
}

export function MultiRingProgress({ rings, size = 'lg', className }: MultiRingProgressProps) {
  const { size: ringSize } = sizeMap[size]
  const baseRadius = (ringSize - 24) / 2
  
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={ringSize} height={ringSize} className="transform -rotate-90">
        {rings.map((ring, index) => {
          const radius = baseRadius - (index * 12)
          const circumference = radius * 2 * Math.PI
          const strokeDasharray = `${circumference} ${circumference}`
          const strokeDashoffset = circumference - (ring.progress / 100) * circumference
          
          return (
            <g key={index}>
              {/* Background */}
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-white/10"
              />
              
              {/* Progress */}
              <motion.circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                stroke={`url(#gradient-multi-${ring.color}-${index})`}
                strokeWidth="6"
                fill="transparent"
                strokeLinecap="round"
                style={{ strokeDasharray }}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut", 
                  delay: index * 0.2 
                }}
              />
            </g>
          )
        })}
        
        {/* Gradients */}
        <defs>
          {rings.map((ring, index) => (
            <linearGradient 
              key={index}
              id={`gradient-multi-${ring.color}-${index}`}
              x1="0%" 
              y1="0%" 
              x2="100%" 
              y2="100%"
            >
              <stop offset="0%" stopColor={colorMap[ring.color!].gradient.includes('teal') ? '#14b8a6' : '#f97316'} />
              <stop offset="100%" stopColor={colorMap[ring.color!].gradient.includes('teal') ? '#0891b2' : '#f59e0b'} />
            </linearGradient>
          ))}
        </defs>
      </svg>
      
      {/* Center legend */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-1">
          {rings.map((ring, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div 
                className={cn(
                  'w-2 h-2 rounded-full',
                  colorMap[ring.color!].text.replace('text-', 'bg-')
                )}
              />
              <span className="text-white/80">{ring.label}</span>
              <span className="text-white font-medium">{ring.progress}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}