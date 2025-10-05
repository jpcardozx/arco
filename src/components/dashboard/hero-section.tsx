'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Target, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useClients } from '@/lib/hooks/use-database'
import { useTasks } from '@/lib/hooks/use-database'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { Skeleton } from '@/components/ui/skeleton'

interface HeroMetrics {
  totalClients: number
  activeClients: number
  clientsTrend: number
  tasksToday: number
  tasksWeek: number
  overdueTasks: number
  completedToday: number
  completionRate: number
}

export function DashboardHero() {
  const { user, loading: userLoading } = useCurrentUser()
  const { data: clients, isLoading: clientsLoading } = useClients()
  const { data: tasks, isLoading: tasksLoading } = useTasks()
  const [metrics, setMetrics] = useState<HeroMetrics>({
    totalClients: 0,
    activeClients: 0,
    clientsTrend: 0,
    tasksToday: 0,
    tasksWeek: 0,
    overdueTasks: 0,
    completedToday: 0,
    completionRate: 0,
  })

  useEffect(() => {
    if (!clients || !tasks) return

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Calculate metrics
    const totalClients = clients.length
    const activeClients = clients.filter(c => c.status === 'active').length
    
    const tasksToday = tasks.filter(t => {
      const dueDate = t.due_date ? new Date(t.due_date) : null
      return dueDate && dueDate >= today && dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
    }).length

    const tasksWeek = tasks.filter(t => {
      const dueDate = t.due_date ? new Date(t.due_date) : null
      return dueDate && dueDate >= today && dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    }).length

    const overdueTasks = tasks.filter(t => {
      const dueDate = t.due_date ? new Date(t.due_date) : null
      return dueDate && dueDate < today && t.status !== 'completed'
    }).length

    const completedToday = tasks.filter(t => {
      const updatedAt = new Date(t.updated_at)
      return t.status === 'completed' && updatedAt >= today
    }).length

    const completedTotal = tasks.filter(t => t.status === 'completed').length
    const completionRate = tasks.length > 0 ? Math.round((completedTotal / tasks.length) * 100) : 0

    // Mock trend (seria calculado comparando com período anterior)
    const clientsTrend = 12 // +12%

    setMetrics({
      totalClients,
      activeClients,
      clientsTrend,
      tasksToday,
      tasksWeek,
      overdueTasks,
      completedToday,
      completionRate,
    })
  }, [clients, tasks])

  const isLoading = userLoading || clientsLoading || tasksLoading

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Olá, {(user as any)?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'}! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está um resumo do seu desempenho hoje
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Clientes
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +{metrics.clientsTrend}%
              </span>
              vs. mês passado
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              {metrics.activeClients} ativos
            </div>
          </CardContent>
        </Card>

        {/* Tasks Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Hoje
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.tasksToday}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.tasksWeek} na próxima semana
            </p>
            {metrics.completedToday > 0 && (
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                {metrics.completedToday} concluídas hoje
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overdue Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Atrasadas
            </CardTitle>
            <AlertTriangle className={`h-4 w-4 ${metrics.overdueTasks > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.overdueTasks > 0 ? 'text-red-600' : ''}`}>
              {metrics.overdueTasks}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.overdueTasks === 0 ? 'Tudo em dia! 🎉' : 'Requerem atenção urgente'}
            </p>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conclusão
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.completionRate >= 80 && 'Excelente performance! 🏆'}
              {metrics.completionRate >= 60 && metrics.completionRate < 80 && 'Bom ritmo 👍'}
              {metrics.completionRate < 60 && 'Continue assim 💪'}
            </p>
            
            {/* Progress bar */}
            <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  metrics.completionRate >= 80 ? 'bg-green-500' :
                  metrics.completionRate >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${metrics.completionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {metrics.overdueTasks > 0 && (
        <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Ação Necessária
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-300">
              Você tem {metrics.overdueTasks} tarefa{metrics.overdueTasks > 1 ? 's' : ''} atrasada{metrics.overdueTasks > 1 ? 's' : ''} que precisam de atenção
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
