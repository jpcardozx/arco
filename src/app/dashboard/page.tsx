'use client'


import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  CheckCircle2,
  LineChart,
  Target,
  ArrowRight,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'

interface OnboardingProgress {
  profile_completed: boolean
  first_analysis_run: boolean
}

const ONBOARDING_STEPS = [
  {
    id: 'profile',
    title: 'Complete seu perfil',
    description: 'Adicione informações da sua empresa para relatórios personalizados',
    cta: 'Completar Perfil',
    href: '/dashboard/settings',
    icon: Target,
    key: 'profile_completed' as keyof OnboardingProgress
  },
  {
    id: 'analysis',
    title: 'Execute sua primeira análise técnica',
    description: 'Analise performance, SEO e segurança do seu site',
    cta: 'Iniciar Diagnóstico',
    href: '/dashboard/diagnostico',
    icon: LineChart,
    key: 'first_analysis_run' as keyof OnboardingProgress
  }
]

const QUICK_ACCESS_CARDS = [
  {
    id: 'performance',
    title: 'Performance',
    description: 'Monitore velocidade, Core Web Vitals e otimizações',
    icon: Zap,
    color: 'blue',
    href: '/dashboard/saude'
  },
  {
    id: 'security',
    title: 'Segurança',
    description: 'Verifique certificados SSL, headers e vulnerabilidades',
    icon: Shield,
    color: 'emerald',
    href: '/dashboard/saude?tab=seguranca'
  },
  {
    id: 'growth',
    title: 'Crescimento',
    description: 'Acompanhe métricas de website e campanhas publicitárias',
    icon: BarChart3,
    color: 'purple',
    href: '/dashboard/crescimento'
  }
]

export default function DashboardPage() {
  const { user } = useCurrentUser()
  const [progress, setProgress] = useState<OnboardingProgress>({
    profile_completed: false,
    first_analysis_run: false
  })
  const firstName = user?.full_name?.split(' ')[0] || 'Usuário'

  // TODO: Migrate to Supabase after applying migration 20251015000000_create_user_settings.sql
  useEffect(() => {
    loadOnboardingProgress()
  }, [user])

  const loadOnboardingProgress = () => {
    if (!user?.id) return

    try {
      const storageKey = `onboarding_progress_${user.id}`
      const saved = localStorage.getItem(storageKey)

      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading onboarding:', error)
    }
  }

  const markStepComplete = (stepKey: keyof OnboardingProgress) => {
    if (!user?.id) return

    const newProgress = {
      ...progress,
      [stepKey]: true
    }

    setProgress(newProgress)

    try {
      const storageKey = `onboarding_progress_${user.id}`
      localStorage.setItem(storageKey, JSON.stringify(newProgress))
    } catch (error) {
      console.error('Error saving onboarding:', error)
    }
  }

  const completedCount = Object.values(progress).filter(Boolean).length
  const totalSteps = ONBOARDING_STEPS.length

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Bem-vindo, {firstName}
          </h1>
          {completedCount < totalSteps && (
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Novo
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          {completedCount < totalSteps
            ? 'Complete os passos abaixo para começar a usar o ARCO'
            : 'Você já completou o onboarding! Explore as funcionalidades abaixo.'
          }
        </p>
      </div>

      {/* Onboarding Checklist */}
      {completedCount < totalSteps && (
        <Card className="border-2 border-dashed">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Primeiros Passos
                </CardTitle>
                <CardDescription className="mt-2">
                  Configure sua conta e execute sua primeira análise
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                {completedCount}/{totalSteps} completo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ONBOARDING_STEPS.map((step, index) => {
              const Icon = step.icon
              const isCompleted = progress[step.key]

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 rounded-lg border p-4 transition-all ${
                    isCompleted
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                      : 'hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? 'bg-green-100 dark:bg-green-900 border-green-500'
                      : 'border-muted bg-background'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="text-sm font-semibold text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {!isCompleted && (
                      <Link href={step.href} onClick={() => markStepComplete(step.key)}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon className="h-4 w-4" />
                          {step.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {isCompleted && (
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ✓ Concluído
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {QUICK_ACCESS_CARDS.map((card) => {
          const Icon = card.icon
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            emerald: 'from-emerald-500 to-emerald-600',
            purple: 'from-purple-500 to-purple-600'
          }

          return (
            <Card key={card.id} className="group transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription>
                  {card.description}
                </CardDescription>
                <Link href={card.href}>
                  <Button variant="ghost" size="sm" className="w-full gap-2 group-hover:bg-accent">
                    Acessar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Help Section */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-900/50 dark:from-amber-950/20 dark:to-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            Precisa de ajuda?
          </CardTitle>
          <CardDescription className="dark:text-amber-100/70">
            Entre em contato através do email suporte@arco.digital ou agende uma consultoria
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/contato">
            <Button variant="outline" size="sm" className="gap-2">
              Falar com Suporte
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/agendamentos">
            <Button variant="outline" size="sm" className="gap-2">
              Agendar Consultoria
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
