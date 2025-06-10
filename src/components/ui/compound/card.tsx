import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface CardContextValue {
  variant: 'default' | 'elevated' | 'outlined' | 'filled'
}

const CardContext = React.createContext<CardContextValue | null>(null)

const cardVariants = cva(
  [
    'rounded-xl bg-white text-neutral-950',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-neutral-200',
          'shadow-sm hover:shadow-md',
        ],
        elevated: [
          'border border-neutral-100',
          'shadow-lg hover:shadow-xl',
          'transform hover:-translate-y-0.5',
        ],
        outlined: [
          'border-2 border-neutral-300',
          'shadow-none hover:border-neutral-400',
        ],
        filled: [
          'bg-neutral-50 border border-neutral-200',
          'shadow-inner',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ variant: variant || 'default' }}>
        <div
          ref={ref}
          className={cn(cardVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
