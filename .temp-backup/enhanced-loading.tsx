/**
 * Enhanced Loading Components
 * Professional loading states with skeleton screens
 */

'use client'

import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'success'
  text?: string
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  text,
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const variantClasses = {
    default: 'text-slate-400',
    primary: 'text-teal-500',
    success: 'text-emerald-500'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2
        className={cn(
          'animate-spin',
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {text && (
        <p className="text-sm text-slate-400 animate-pulse">{text}</p>
      )}
    </div>
  )
}

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'circle'
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const variantClasses = {
    default: 'h-4 w-full rounded',
    card: 'h-32 w-full rounded-lg',
    text: 'h-3 w-3/4 rounded',
    circle: 'h-12 w-12 rounded-full'
  }

  return (
    <motion.div
      className={cn(
        'bg-slate-800/50 animate-pulse',
        variantClasses[variant],
        className
      )}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/50 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
      </div>
      <Skeleton variant="card" className="h-24" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border border-slate-800 rounded-lg bg-slate-900/30">
          <Skeleton variant="circle" className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, text, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-teal-500 animate-spin" />
              <Sparkles className="h-6 w-6 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {text && (
              <p className="text-slate-300 text-sm font-medium animate-pulse">{text}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border border-slate-800 rounded-lg bg-slate-900/50">
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-4">
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}
