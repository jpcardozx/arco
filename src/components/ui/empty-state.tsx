/**
 * Empty State Component
 * Estados vazios com design profissional
 */

'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { InboxIcon, Search, FileQuestion } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils/cn'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline'
  }
  className?: string
  variant?: 'default' | 'search' | 'error'
}

export function EmptyState({
  icon: CustomIcon,
  title,
  description,
  action,
  className,
  variant = 'default'
}: EmptyStateProps) {
  const variantConfig = {
    default: {
      icon: CustomIcon || InboxIcon,
      iconColor: 'text-slate-500',
      bgColor: 'bg-slate-500/10'
    },
    search: {
      icon: CustomIcon || Search,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    error: {
      icon: CustomIcon || FileQuestion,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  }

  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={cn(
          'p-6 rounded-full mb-4',
          config.bgColor
        )}
      >
        <Icon className={cn('h-12 w-12', config.iconColor)} />
      </motion.div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-slate-400 max-w-md mb-6">{description}</p>
      )}

      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || 'default'}
          className={!action.variant || action.variant === 'default' ? 'bg-teal-500 hover:bg-teal-600' : ''}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}

interface EmptyListProps {
  message?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyList({ message = 'Nenhum item encontrado', action }: EmptyListProps) {
  return (
    <div className="py-8 px-4 text-center border border-dashed border-slate-700 rounded-lg bg-slate-900/30">
      <p className="text-sm text-slate-400 mb-3">{message}</p>
      {action && (
        <Button onClick={action.onClick} variant="outline" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  )
}
