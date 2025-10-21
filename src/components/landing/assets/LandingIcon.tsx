/**
 * ARCO Landing Page - Reusable Icon Component
 * 
 * Componente wrapper para ícones do Lucide com:
 * - Animações Framer Motion
 * - Cores padronizadas
 * - Tamanhos consistentes
 * - Acessibilidade (aria-label)
 */

'use client';

import { motion, type Variants } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ICON_COLORS, ICON_SIZES } from './icon-map';

interface LandingIconProps {
  icon: LucideIcon;
  size?: keyof typeof ICON_SIZES;
  color?: keyof typeof ICON_COLORS;
  className?: string;
  animate?: boolean;
  animationVariant?: 'pulse' | 'bounce' | 'rotate' | 'scale' | 'none';
  label?: string; // Accessibility
}

const animationVariants: Record<string, Variants> = {
  pulse: {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: { 
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut'
      }
    },
  },
  bounce: {
    initial: { y: 0 },
    animate: { 
      y: [0, -8, 0],
      transition: { 
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut'
      }
    },
  },
  rotate: {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: { 
        repeat: Infinity,
        duration: 3,
        ease: 'linear'
      }
    },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  },
  none: {
    initial: {},
    animate: {},
  },
};

export function LandingIcon({
  icon: Icon,
  size = 'md',
  color = 'primary',
  className,
  animate = false,
  animationVariant = 'none',
  label,
}: LandingIconProps) {
  const sizeClass = ICON_SIZES[size];
  const colorClass = ICON_COLORS[color];

  const MotionIcon = motion(Icon);

  if (!animate) {
    return (
      <Icon
        className={cn(sizeClass, colorClass, className)}
        aria-label={label}
        aria-hidden={!label}
      />
    );
  }

  const variants = animationVariants[animationVariant];

  return (
    <MotionIcon
      className={cn(sizeClass, colorClass, className)}
      variants={variants}
      initial="initial"
      animate="animate"
      aria-label={label}
      aria-hidden={!label}
    />
  );
}

/**
 * Icon with background circle/square
 */
interface IconContainerProps extends LandingIconProps {
  variant?: 'circle' | 'square' | 'none';
  background?: string; // Tailwind class
  padding?: string; // Tailwind class
}

export function IconContainer({
  variant = 'circle',
  background = 'bg-amber-500/10',
  padding = 'p-3',
  ...iconProps
}: IconContainerProps) {
  const containerClass = cn(
    padding,
    background,
    'inline-flex items-center justify-center',
    {
      'rounded-full': variant === 'circle',
      'rounded-xl': variant === 'square',
    }
  );

  return (
    <div className={containerClass}>
      <LandingIcon {...iconProps} />
    </div>
  );
}

/**
 * Animated Icon Badge - Para CTAs e destaques
 */
interface IconBadgeProps {
  icon: LucideIcon;
  label: string;
  color?: keyof typeof ICON_COLORS;
  showPulse?: boolean;
}

export function IconBadge({
  icon,
  label,
  color = 'primary',
  showPulse = false,
}: IconBadgeProps) {
  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
        'bg-white/5 border border-white/10 backdrop-blur-sm',
        'transition-all duration-300'
      )}
      whileHover={{ 
        scale: 1.05,
        borderColor: 'rgba(245, 158, 11, 0.3)' // Amber-500
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {showPulse && (
        <motion.div
          className="absolute -inset-1 bg-amber-500/20 rounded-full blur-md"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        />
      )}
      <LandingIcon 
        icon={icon}
        size="sm"
        color={color}
        animate={showPulse}
        animationVariant="pulse"
      />
      <span className="text-sm font-medium text-slate-200">
        {label}
      </span>
    </motion.div>
  );
}
