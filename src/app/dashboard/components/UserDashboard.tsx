/**
 * User Dashboard
 * Painel para usuários/operadores com foco em produtividade
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Target,
  CheckSquare,
  Calendar,
  Clock,
  TrendingUp,
  Plus,
  Filter,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUserStats, useUserTasks, useUserLeads } from '@/lib/hooks'
import type { UserTask } from '@/lib/hooks/use-user-tasks'
import type { UserLead } from '@/lib/hooks/use-user-leads'
import { DashboardSkeleton, TaskListSkeleton, LeadListSkeleton } from '@/components/dashboard/loading-skeletons'
import { ErrorDisplay, EmptyState } from '@/components/dashboard/error-display'

interface UserDashboardProps {
  userName?: string
}

export function UserDashboard({ userName = 'Usuário' }: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch data from Supabase
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useUserStats()
  const { data: tasks, isLoading: tasksLoading, error: tasksError, refetch: refetchTasks } = useUserTasks()
  const { data: leads, isLoading: leadsLoading, error: leadsError, refetch: refetchLeads } = useUserLeads(10)

  // Show full dashboard skeleton on initial load
  if (statsLoading && tasksLoading && leadsLoading) {
    return <DashboardSkeleton />
  }

  // Show error if stats fail (critical)
  if (statsError) {
    return (
      <ErrorDisplay
        error={statsError as Error}
        onRetry={refetchStats}
        context="UserDashboard - Stats"
      />
    )
  }

  // Map stats to card format
  const userStats = stats ? [
    {
      id: 'my-leads',
      label: 'Meus Leads',
      value: String(stats.my_leads || 0),
      change: `+${stats.new_today || 0} hoje`,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'my-tasks',
      label: 'Tarefas Pendentes',
      value: String(stats.my_tasks || 0),
      change: `${stats.urgent_tasks || 0} urgentes`,
      icon: CheckSquare,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 'appointments',
      label: 'Agendamentos Hoje',
      value: String(stats.appointments_today || 0),
      change: 'confirmados',
      icon: Calendar,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    },
    {
      id: 'conversions',
      label: 'Conversões (Mês)',
      value: String(stats.conversions_month || 0),
      change: 'neste mês',
      icon: Target,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ] : []

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'border-red-500/30 text-red-400',
      medium: 'border-orange-500/30 text-orange-400',
      low: 'border-blue-500/30 text-blue-400'
    }
    return colors[priority as keyof typeof colors]
  }

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'border-blue-500/30 text-blue-400',
      contacted: 'border-orange-500/30 text-orange-400',
      qualified: 'border-emerald-500/30 text-emerald-400'
    }
    return colors[status as keyof typeof colors]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Bem-vindo, {userName}!
          </h1>
          <p className="text-slate-400 mt-1">
            Aqui está seu resumo de atividades
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {userStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Today's Tasks */}
        <Card className="border-slate-800 bg-slate-900/50 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal-500" />
                  Tarefas de Hoje
                </CardTitle>
                <CardDescription>4 tarefas pendentes</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <TaskListSkeleton />
            ) : tasksError ? (
              <ErrorDisplay
                error={tasksError as Error}
                onRetry={refetchTasks}
                context="Tasks"
              />
            ) : !tasks || tasks.length === 0 ? (
              <EmptyState
                icon={CheckSquare}
                title="Nenhuma tarefa hoje"
                description="Você não tem tarefas pendentes para hoje."
                actionLabel="Criar Tarefa"
                onAction={() => console.log('Create task')}
              />
            ) : (
              <div className="space-y-3">
                {tasks.map((task: UserTask) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-slate-600 bg-slate-800"
                      />
                      <div>
                        <p className="text-white font-medium">{task.title}</p>
                        <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {task.due_date ? new Date(task.due_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(task.priority || 'low')}>
                      {task.priority === 'high' ? 'Urgente' :
                       task.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-500" />
              Performance
            </CardTitle>
            <CardDescription>Última semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Taxa de Conversão</span>
                <span className="text-lg font-bold text-emerald-400">24%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Tempo de Resposta</span>
                <span className="text-lg font-bold text-teal-400">2.5h</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Tarefas Concluídas</span>
                <span className="text-lg font-bold text-blue-400">42/50</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-500" />
                Leads Recentes
              </CardTitle>
              <CardDescription>Últimos contatos registrados</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-800 border-slate-700"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leadsLoading ? (
            <LeadListSkeleton />
          ) : leadsError ? (
            <ErrorDisplay
              error={leadsError as Error}
              onRetry={refetchLeads}
              context="Leads"
            />
          ) : !leads || leads.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Nenhum lead encontrado"
              description="Você ainda não tem leads atribuídos."
              actionLabel="Buscar Leads"
              onAction={() => console.log('Browse leads')}
            />
          ) : (
            <div className="space-y-3">
              {leads.map((lead: UserLead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{lead.name}</p>
                      <p className="text-sm text-slate-400">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-slate-400">Origem</p>
                      <p className="text-white font-medium">{lead.source || 'N/A'}</p>
                    </div>
                    <div className="text-right hidden lg:block">
                      <p className="text-sm text-slate-400">Telefone</p>
                      <p className="text-emerald-400 font-bold">{lead.phone || 'N/A'}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(lead.status)}>
                      {lead.status === 'new' ? 'Novo' :
                       lead.status === 'contacted' ? 'Contatado' : 'Qualificado'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
