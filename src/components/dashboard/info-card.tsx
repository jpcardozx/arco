import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  buttons?: Array<{
    label: string
    icon?: LucideIcon
    onClick?: () => void
    href?: string
    variant?: 'default' | 'outline' | 'ghost'
  }>
  className?: string
}

export function InfoCard({
  title,
  description,
  icon: Icon,
  iconColor = 'text-blue-600 dark:text-blue-400',
  buttons,
  className
}: InfoCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className={cn('h-5 w-5', iconColor)} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {description}
        </p>
        {buttons && buttons.length > 0 && (
          <div className="flex gap-2">
            {buttons.map((button, index) => {
              const ButtonIcon = button.icon
              const handleClick = () => {
                if (button.onClick) {
                  button.onClick()
                } else if (button.href) {
                  window.location.href = button.href
                }
              }

              return (
                <Button
                  key={index}
                  variant={button.variant || 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={handleClick}
                >
                  {ButtonIcon && <ButtonIcon className="h-4 w-4 mr-2" />}
                  {button.label}
                </Button>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
