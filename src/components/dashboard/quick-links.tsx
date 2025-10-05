import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface QuickLink {
  label: string
  description: string
  href: string
  icon: LucideIcon
}

interface QuickLinksProps {
  links: QuickLink[]
  className?: string
}

export function QuickLinks({ links, className }: QuickLinksProps) {
  return (
    <Card className={cn('p-6', className)}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Ferramentas Disponíveis
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Button
              key={link.href}
              variant="ghost"
              className="h-auto py-4 px-3 flex-col gap-2 text-center hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => window.location.href = link.href}
            >
              <Icon className="h-5 w-5" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">{link.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {link.description}
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
