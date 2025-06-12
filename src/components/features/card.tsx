'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils/ui-utils';


const cardVariants = cva('rounded-lg overflow-hidden transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-white border border-neutral-200',
      elevated: 'bg-white border border-neutral-200 shadow-md hover:shadow-lg',
      outline: 'border border-neutral-200 bg-transparent',
      ghost: 'border-none bg-transparent',
      gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-neutral-100',
      dark: 'bg-neutral-900 border border-neutral-800 text-white',
      glass: 'bg-white/70 backdrop-blur-md border border-white/20',
    },
    hover: {
      none: '',
      scale: 'hover:scale-105',
      raise: 'hover:-translate-y-2',
      highlight: 'hover:ring-2 hover:ring-blue-500/50',
      glow: 'hover:shadow-xl hover:shadow-blue-700/20',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    hover: 'none',
    padding: 'md',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  asChild?: boolean;
  animated?: boolean;
  animationDelay?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      hover,
      padding,
      animated = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref
  ) => {
    if (animated) {
      // Remove todas as propriedades de eventos DOM que conflitam com Framer Motion
      const {
        // Eventos de arrastar/soltar
        onDrag, onDragEnd, onDragEnter, onDragExit, onDragLeave,
        onDragOver, onDragStart, onDrop,

        // Eventos de animação
        onAnimationStart, onAnimationEnd, onAnimationIteration,

        // Eventos de transição
        onTransitionEnd,

        // Outros eventos que podem conflitar
        onPointerDown, onPointerMove, onPointerUp,

        ...motionSafeProps
      } = props;

      return (
        <div className={cn(cardVariants({ variant, hover, padding, className }))} ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: animationDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </div>
      );
    }

    return (
      <div
        className={cn(cardVariants({ variant, hover, padding, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: keyof React.JSX.IntrinsicElements }
>(({ className, as: AsComponent = 'h3', ...props }, ref) => {
  // Explicitly type the component to avoid SVGProps type errors
  const Component = AsComponent as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn('text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-neutral-500', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('py-4', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
