import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface SetupStep {
  id: string
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  completed: boolean
  href: string
  ctaText: string
}

interface SetupProgressProps {
  steps: SetupStep[]
  className?: string
}

export function SetupProgress({ steps, className }: SetupProgressProps) {
  const completedSteps = steps.filter(step => step.completed).length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            Configuração do Sistema
          </CardTitle>
          <Badge 
            variant={progressPercentage === 100 ? 'default' : 'secondary'}
            className={cn(
              progressPercentage === 100 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
            )}
          >
            {Math.round(progressPercentage)}% completo
          </Badge>
        </div>
        <Progress value={progressPercentage} className="mt-3" />
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div 
              key={step.id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                  step.iconColor
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {step.description}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={step.completed ? 'outline' : 'default'}
                onClick={() => window.location.href = step.href}
                className="ml-3 flex-shrink-0"
              >
                {step.ctaText}
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
