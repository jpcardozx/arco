import React from 'react';
import { designTokens } from '@/design-system/tokens';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled' | 'glass' | 'interactive';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  disabled?: boolean;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  shadow = 'sm',
  hover = false,
  disabled = false,
  as: Component = 'div'
}) => {
  // ARCO Card Variants - Professional Design System
  const variantClasses = {
    default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
    outlined: 'bg-transparent border-2 border-neutral-300 dark:border-neutral-600',
    elevated: 'bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800',
    filled: 'bg-neutral-50 dark:bg-neutral-800 border border-transparent',
    glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border border-white/20 dark:border-neutral-700/20',
    interactive: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-200'
  };

  // ARCO Padding System
  const paddingClasses = {
    none: '',
    xs: 'p-3',      // 12px
    sm: 'p-4',      // 16px
    md: 'p-6',      // 24px
    lg: 'p-8',      // 32px
    xl: 'p-12'      // 48px
  };

  // ARCO Border Radius
  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  // ARCO Shadow System
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  // Hover Effects
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : '';

  // Interactive States
  const interactiveClasses = variant === 'interactive' ? 'hover:border-primary-300 hover:shadow-md active:scale-[0.98]' : '';

  // Disabled State
  const disabledClasses = disabled ? 'opacity-50 pointer-events-none' : '';

  const combinedClasses = [
    variantClasses[variant],
    paddingClasses[padding],
    radiusClasses[radius],
    shadowClasses[shadow],
    hoverClasses,
    interactiveClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    // @ts-expect-error - Dynamic component prop type
    <Component className={combinedClasses}>
      {children}
    </Component>
  );
};

export default Card;
