import React from 'react';
import { designTokens } from '@/design-system/tokens';

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'screen';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  center?: boolean;
  background?: 'none' | 'default' | 'subtle' | 'surface' | 'elevated';
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  padding = 'md',
  center = true,
  background = 'none',
  as: Component = 'div'
}) => {
  // ARCO Container Sizes - Professional Layout System
  const sizeClasses = {
    xs: 'max-w-xs',      // 320px - Mobile content
    sm: 'max-w-sm',      // 384px - Small cards
    md: 'max-w-2xl',     // 672px - Reading width
    lg: 'max-w-4xl',     // 896px - Main content
    xl: 'max-w-6xl',     // 1152px - Wide layouts
    '2xl': 'max-w-7xl',  // 1280px - Max content
    '3xl': 'max-w-8xl',  // 1536px - Ultra wide
    full: 'max-w-full',  // 100% - No limit
    screen: 'min-h-screen' // Full viewport height
  };

  // ARCO Spacing System - Consistent Padding
  const paddingClasses = {
    none: '',
    xs: 'px-4 py-2',     // 16px 8px
    sm: 'px-6 py-3',     // 24px 12px
    md: 'px-8 py-4',     // 32px 16px
    lg: 'px-12 py-6',    // 48px 24px
    xl: 'px-16 py-8',    // 64px 32px
    '2xl': 'px-24 py-12' // 96px 48px
  };

  // ARCO Background Variants
  const backgroundClasses = {
    none: '',
    default: 'bg-white dark:bg-neutral-900',
    subtle: 'bg-neutral-50 dark:bg-neutral-800',
    surface: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
    elevated: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg'
  };

  const centerClass = center ? 'mx-auto' : '';

  const combinedClasses = [
    centerClass,
    sizeClasses[size],
    paddingClasses[padding],
    backgroundClasses[background],
    className
  ].filter(Boolean).join(' ');

  return (
    // @ts-expect-error - Dynamic component prop type
    <Component className={combinedClasses}>
      {children}
    </Component>
  );
};

export default Container;
