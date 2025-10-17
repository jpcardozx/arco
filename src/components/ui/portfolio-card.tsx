/**
 * PORTFOLIO CARD VARIANTS
 * Shadcn/ui compatible card variants for portfolio sections
 * Reduces className duplication and enforces design consistency
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const portfolioCardVariants = cva(
  // Base classes
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-slate-700",
        glassmorphic: "bg-slate-900/50 backdrop-blur-xl border-slate-800/70 hover:border-slate-700/90 shadow-xl",
        elevated: "bg-slate-900/80 backdrop-blur-xl border-slate-800 hover:border-slate-700 shadow-2xl hover:shadow-teal-500/10",
        interactive: "bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/20 cursor-pointer",
        gradient: "bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-slate-700",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        scale: "hover:scale-[1.02]",
        glow: "hover:ring-2 hover:ring-teal-500/30",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
      padding: "default",
    },
  }
)

export interface PortfolioCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof portfolioCardVariants> {
  asChild?: boolean
}

const PortfolioCard = React.forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ className, variant, hover, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(portfolioCardVariants({ variant, hover, padding }), className)}
        {...props}
      />
    )
  }
)
PortfolioCard.displayName = "PortfolioCard"

// Icon wrapper with consistent styling
const portfolioIconVariants = cva(
  "flex items-center justify-center transition-all duration-300 group-hover:scale-110",
  {
    variants: {
      variant: {
        teal: "bg-teal-500/10 border border-teal-500/30",
        orange: "bg-orange-500/10 border border-orange-500/30",
        purple: "bg-purple-500/10 border border-purple-500/30",
        blue: "bg-blue-500/10 border border-blue-500/30",
        green: "bg-green-500/10 border border-green-500/30",
      },
      size: {
        sm: "w-10 h-10 rounded-lg",
        default: "w-12 h-12 rounded-lg",
        lg: "w-14 h-14 rounded-xl",
      }
    },
    defaultVariants: {
      variant: "teal",
      size: "default",
    }
  }
)

export interface PortfolioIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof portfolioIconVariants> {}

const PortfolioIcon = React.forwardRef<HTMLDivElement, PortfolioIconProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(portfolioIconVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
PortfolioIcon.displayName = "PortfolioIcon"

// Badge variants for proficiency/status
const portfolioBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        expert: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        advanced: "bg-blue-500/10 border-blue-500/30 text-blue-400",
        proficient: "bg-purple-500/10 border-purple-500/30 text-purple-400",
        status: "bg-teal-500/10 border-teal-500/30 text-teal-400",
        primary: "bg-teal-600 border-teal-500 text-white",
      },
    },
    defaultVariants: {
      variant: "status",
    },
  }
)

export interface PortfolioBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof portfolioBadgeVariants> {}

const PortfolioBadge = React.forwardRef<HTMLDivElement, PortfolioBadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(portfolioBadgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
PortfolioBadge.displayName = "PortfolioBadge"

export { 
  PortfolioCard, 
  PortfolioIcon, 
  PortfolioBadge,
  portfolioCardVariants,
  portfolioIconVariants,
  portfolioBadgeVariants
}
