/**
 * Stat Card - Componente reutilizável para métricas
 * Design polido e consistente
 */

'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { cn } from '@/lib/utils/cn'

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  description?: string
  trend?: number
  delay?: number
  className?: string
  onClick?: () => void
}

export function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-teal-500',
  iconBgColor = 'bg-teal-500/10',
  description,
  trend,
  delay = 0,
  className,
  onClick
}: StatCardProps) {
  const changeColors = {
    positive: 'border-emerald-500/30 text-emerald-400',
    negative: 'border-red-500/30 text-red-400',
    neutral: 'border-slate-500/30 text-slate-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={className}
    >
      <Card
        className={cn(
          'border-slate-800 bg-slate-900/50 transition-all duration-300',
          'hover:bg-slate-900/80 hover:border-slate-700',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          {/* Header com ícone e badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={cn('p-3 rounded-lg', iconBgColor)}>
              <Icon className={cn('h-5 w-5', iconColor)} />
            </div>
            {change && (
              <Badge variant="outline" className={changeColors[changeType]}>
                {change}
              </Badge>
            )}
          </div>

          {/* Label */}
          <p className="text-sm text-slate-400 mb-1 font-medium">{label}</p>

          {/* Value */}
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-white">{value}</p>
            {trend !== undefined && (
              <span
                className={cn(
                  'text-xs font-medium mb-1',
                  trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-red-400' : 'text-slate-400'
                )}
              >
                {trend > 0 ? '↑' : trend < 0 ? '↓' : '−'} {Math.abs(trend)}%
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs text-slate-500 mt-2">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface MiniStatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color?: string
}

export function MiniStatCard({ label, value, icon: Icon, color = 'teal' }: MiniStatCardProps) {
  const colors = {
    teal: { icon: 'text-teal-500', bg: 'bg-teal-500/10' },
    blue: { icon: 'text-blue-500', bg: 'bg-blue-500/10' },
    emerald: { icon: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    orange: { icon: 'text-orange-500', bg: 'bg-orange-500/10' },
    red: { icon: 'text-red-500', bg: 'bg-red-500/10' }
  }

  const colorClass = colors[color as keyof typeof colors] || colors.teal

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
      <div className={cn('p-2 rounded-lg', colorClass.bg)}>
        <Icon className={cn('h-4 w-4', colorClass.icon)} />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  )
}
