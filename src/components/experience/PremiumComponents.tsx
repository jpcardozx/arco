import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface PremiumSectionProps {
    children: React.ReactNode
    className?: string
    delay?: number
    variant?: 'fade' | 'slide' | 'scale' | 'rotate'
    background?: 'glass' | 'gradient' | 'solid' | 'none'
}

const variants = {
    fade: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    },
    slide: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    },
    scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    },
    rotate: {
        hidden: { opacity: 0, rotateY: -10 },
        visible: { opacity: 1, rotateY: 0 }
    }
}

const backgrounds = {
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
    gradient: 'bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-md',
    solid: 'bg-slate-900/90',
    none: ''
}

/**
 * PremiumSection - Componente base para todas as seções com animações premium
 * Integra Framer Motion, GSAP classes, e design system técnico
 */
export function PremiumSection({
    children,
    className = '',
    delay = 0,
    variant = 'fade',
    background = 'none'
}: PremiumSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [isInView, controls])

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants[variant]}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] // Premium easing curve
            }}
            className={`
        premium-section premium-animate
        relative overflow-hidden
        ${backgrounds[background]}
        ${className}
      `}
        >
            {/* Premium Glow Effect */}
            {background !== 'none' && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            )}

            {children}
        </motion.section>
    )
}

/**
 * PremiumCard - Card component with advanced hover effects
 */
interface PremiumCardProps {
    children: React.ReactNode
    className?: string
    glowColor?: 'blue' | 'purple' | 'green' | 'amber'
}

export function PremiumCard({ children, className = '', glowColor = 'blue' }: PremiumCardProps) {
    const glowColors = {
        blue: 'hover:shadow-blue-500/20',
        purple: 'hover:shadow-purple-500/20',
        green: 'hover:shadow-green-500/20',
        amber: 'hover:shadow-amber-500/20'
    }

    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            className={`
        premium-fade-in
        relative group cursor-pointer
        bg-white/5 backdrop-blur-xl 
        border border-white/10 rounded-2xl
        hover:border-white/20 hover:bg-white/10
        transition-all duration-300 ease-out
        hover:shadow-2xl ${glowColors[glowColor]}
        ${className}
      `}
        >
            {/* Premium shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {children}
        </motion.div>
    )
}

/**
 * PremiumButton - Button with advanced micro-interactions
 */
interface PremiumButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => void
    className?: string
}

export function PremiumButton({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = ''
}: PremiumButtonProps) {
    const variants_styles = {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-500 hover:to-purple-500',
        secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
        ghost: 'text-white hover:bg-white/10'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                boxShadow: variant === 'primary' ? '0 20px 40px rgba(59, 130, 246, 0.3)' : '0 10px 30px rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
        premium-scale-in
        relative overflow-hidden rounded-xl font-medium
        transition-all duration-200 ease-out
        backdrop-blur-sm
        ${variants_styles[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {/* Premium button shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />

            <span className="relative z-10">{children}</span>
        </motion.button>
    )
}
