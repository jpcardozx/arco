import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  default: {
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-slate-600 dark:text-slate-400',
    trendPositive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50'
  },
  primary: {
    iconBg: 'bg-blue-100 dark:bg-blue-950/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
    trendPositive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50'
  },
  success: {
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    trendPositive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50'
  },
  warning: {
    iconBg: 'bg-amber-100 dark:bg-amber-950/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    trendPositive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50'
  },
  danger: {
    iconBg: 'bg-red-100 dark:bg-red-950/50',
    iconColor: 'text-red-600 dark:text-red-400',
    trendPositive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50'
  }
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  className
}: MetricCardProps) {
  const styles = variantStyles[variant]

  return (
    <Card className={cn('transition-all hover:shadow-lg', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn('p-2 rounded-lg', styles.iconBg)}>
            <Icon className={cn('h-4 w-4', styles.iconColor)} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {value}
          </div>
          {trend && (
            <Badge
              variant="outline"
              className={cn(
                'text-xs font-semibold',
                trend.isPositive ? styles.trendPositive : styles.trendNegative
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
        {trend?.label && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
