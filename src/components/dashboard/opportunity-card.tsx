import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon, ArrowUpRight } from 'lucide-react'

interface OpportunityCardProps {
  title: string
  description: string
  benefit: string
  icon: LucideIcon
  actionText: string
  href: string
  className?: string
}

export function OpportunityCard({
  title,
  description,
  benefit,
  icon: Icon,
  actionText,
  href,
  className
}: OpportunityCardProps) {
  return (
    <Card 
      className={cn(
        'group transition-all hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800',
        className
      )}
    >
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex-shrink-0">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">{title}</CardTitle>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-0">
                {benefit}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors"
          onClick={() => window.location.href = href}
        >
          {actionText}
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
