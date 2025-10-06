// Enhanced Button System with Premium Interactions
// File: /src/components/ui/premium-button.tsx

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PremiumButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  success?: boolean
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
  ripple?: boolean
  shimmer?: boolean
  glow?: boolean
  onClick?: () => void
  className?: string
}

const variants = {
  primary: 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40',
  secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30',
  ghost: 'text-white hover:bg-white/10',
  gradient: 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
}

export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ripple = true,
  shimmer = true,
  glow = false,
  onClick,
  className,
  ...props
}: PremiumButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleId = useRef(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Create ripple effect
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = { id: rippleId.current++, x, y }
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }

    onClick?.()
  }

  const buttonContent = (
    <div className="relative flex items-center justify-center gap-2">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Check className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            {Icon && iconPosition === 'left' && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
            )}
            
            <span className="relative z-10">{children}</span>
            
            {Icon && iconPosition === 'right' && (
              <motion.div
                whileHover={{ scale: 1.1, x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
            )}
            
            {!Icon && variant === 'primary' && (
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative group font-semibold rounded-xl overflow-hidden transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        glow && 'shadow-2xl',
        className
      )}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect */}
      {shimmer && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: isPressed ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Glow effect */}
      {glow && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: variant === 'primary' 
              ? 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
          }}
        />
      )}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      {buttonContent}

      {/* Success pulse */}
      {success && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-green-400"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  )
}

// Usage examples and presets
export const CTAButton = (props: Omit<PremiumButtonProps, 'variant'>) => (
  <PremiumButton variant="primary" shimmer glow {...props} />
)

export const SecondaryButton = (props: Omit<PremiumButtonProps, 'variant'>) => (
  <PremiumButton variant="secondary" {...props} />
)

export const GradientButton = (props: Omit<PremiumButtonProps, 'variant'>) => (
  <PremiumButton variant="gradient" shimmer glow {...props} />
)