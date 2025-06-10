'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { cn } from '../../../lib/utils/ui-utils';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  containerClassName?: string;
  maxWidth?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  withParallax?: boolean;
  parallaxIntensity?: 'light' | 'medium' | 'heavy';
  divider?: 'none' | 'top' | 'bottom' | 'both';
}

/**
 * Enhanced Section component with parallax effect and layout options
 */
export function Section({
  as = 'section',
  children,
  className,
  containerClassName,
  maxWidth = 'default',
  withParallax = false,
  parallaxIntensity = 'medium',
  divider = 'none',
  ...props
}: SectionProps) {
  // Explicitly type the component to avoid SVGProps type errors
  const Component = as as React.ElementType;
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Configure parallax intensity
  const intensityConfig = {
    light: 50,
    medium: 100,
    heavy: 150,
  };

  const intensity = intensityConfig[parallaxIntensity];
  // Importante: useTransform precisa ser chamado incondicionalmente
  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
  const transformStyle = withParallax ? { y } : {};

  // Configure max width
  const maxWidthConfig = {
    default: 'max-w-7xl',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  // Configure dividers
  const dividerStyles = {
    top: 'border-t border-neutral-200',
    bottom: 'border-b border-neutral-200',
    both: 'border-t border-b border-neutral-200',
    none: '',
  };

  return (
    <Component
      ref={sectionRef}
      className={cn('relative w-full', dividerStyles[divider], className)}
      {...props}
    >
      {withParallax ? (
        <motion.div
          className={cn(
            'container mx-auto px-4 py-16 sm:px-6 md:py-24',
            maxWidthConfig[maxWidth],
            containerClassName
          )}
          style={transformStyle}
        >
          {children}
        </motion.div>
      ) : (
        <div
          className={cn(
            'container mx-auto px-4 py-16 sm:px-6 md:py-24',
            maxWidthConfig[maxWidth],
            containerClassName
          )}
        >
          {children}
        </div>
      )}
    </Component>
  );
}
