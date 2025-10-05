import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon, ArrowUpRight } from 'lucide-react'

interface ActionCardProps {
  title: string
  subtitle: string
  description?: string
  icon: LucideIcon
  gradient: string
  onClick?: () => void
  href?: string
  ctaText?: string
  badge?: React.ReactNode
  className?: string
}

export function ActionCard({
  title,
  subtitle,
  description,
  icon: Icon,
  gradient,
  onClick,
  href,
  ctaText = 'Começar agora',
  badge,
  className
}: ActionCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  return (
    <Card
      className={cn(
        'cursor-pointer group transition-all hover:shadow-xl hover:-translate-y-1',
        className
      )}
      onClick={handleClick}
    >
      <CardHeader className="space-y-1">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
          'transition-transform group-hover:scale-110',
          gradient
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {title}
          </CardTitle>
          {badge}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </CardHeader>
      {(description || ctaText) && (
        <CardContent>
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {description}
            </p>
          )}
          {ctaText && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {ctaText}
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}
