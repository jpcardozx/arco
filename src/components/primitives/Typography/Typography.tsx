import React from 'react';
import { designTokens } from '@/components/system/design-tokens';

export interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'lead' | 'caption' | 'subtitle' | 'metric' | 'label' | 'overline';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'warning' | 'success';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'justify';
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  className = '',
  variant = 'body',
  color = 'default',
  weight,
  align = 'left',
  as
}) => {
  // ARCO Typography Scale - Professional Hierarchy
  const variantClasses = {
    h1: 'text-5xl md:text-6xl xl:text-7xl font-bold leading-tight tracking-tight',
    h2: 'text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight',
    h3: 'text-3xl md:text-4xl xl:text-5xl font-bold leading-snug tracking-tight',
    h4: 'text-2xl md:text-3xl xl:text-4xl font-semibold leading-snug tracking-normal',
    h5: 'text-xl md:text-2xl xl:text-3xl font-semibold leading-normal tracking-normal',
    h6: 'text-lg md:text-xl xl:text-2xl font-semibold leading-normal tracking-normal',
    body: 'text-base leading-relaxed tracking-normal',
    lead: 'text-xl md:text-2xl leading-relaxed tracking-normal font-normal',
    caption: 'text-sm leading-normal tracking-normal',
    subtitle: 'text-lg font-medium leading-normal tracking-normal',
    metric: 'text-4xl md:text-5xl xl:text-6xl font-bold leading-none tracking-tight tabular-nums',
    label: 'text-sm font-medium leading-tight tracking-wide uppercase',
    overline: 'text-xs font-bold leading-tight tracking-widest uppercase'
  };

  // ARCO Color System
  const colorClasses = {
    default: 'text-neutral-900 dark:text-neutral-100',
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    muted: 'text-neutral-600 dark:text-neutral-400',
    accent: 'text-accent-600 dark:text-accent-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    success: 'text-emerald-600 dark:text-emerald-400'
  };

  // Weight Override
  const weightClasses = weight ? {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  }[weight] : '';

  // Text Alignment
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  // Determine HTML tag
  const getTag = (): React.ElementType => {
    if (as) return as;
    if (variant.startsWith('h')) return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    if (variant === 'body' || variant === 'lead') return 'p';
    if (variant === 'caption' || variant === 'subtitle') return 'span';
    if (variant === 'label' || variant === 'overline') return 'label';
    return 'div';
  };

  const Component = getTag();

  const combinedClasses = [
    variantClasses[variant],
    colorClasses[color],
    weightClasses,
    alignClasses[align],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  );
};

export default Typography;
