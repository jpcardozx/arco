import React from 'react'
import { MetricCard } from './metric-card'
import { TrendingUp, Users, Briefcase, Calendar } from 'lucide-react'

interface StatsGridProps {
  metrics?: {
    totalLeads?: number
    activeProjects?: number
    appointmentsThisWeek?: number
    conversionRate?: number
  }
}

export function StatsGrid({ metrics }: StatsGridProps) {
  const stats = [
    {
      title: 'Total de Leads',
      value: metrics?.totalLeads || 0,
      description: 'Últimos 30 dias',
      icon: Users,
      trend: { value: 12.5, isPositive: true, label: 'vs. mês anterior' },
      variant: 'primary' as const
    },
    {
      title: 'Projetos Ativos',
      value: metrics?.activeProjects || 0,
      description: 'Em andamento',
      icon: Briefcase,
      trend: { value: 5.2, isPositive: true, label: 'vs. mês anterior' },
      variant: 'success' as const
    },
    {
      title: 'Reuniões Agendadas',
      value: metrics?.appointmentsThisWeek || 0,
      description: 'Esta semana',
      icon: Calendar,
      trend: { value: 8.1, isPositive: false, label: 'vs. semana anterior' },
      variant: 'warning' as const
    },
    {
      title: 'Taxa de Conversão',
      value: `${metrics?.conversionRate || 0}%`,
      description: 'Lead → Cliente',
      icon: TrendingUp,
      trend: { value: 3.2, isPositive: true, label: 'vs. mês anterior' },
      variant: 'success' as const
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <MetricCard key={index} {...stat} />
      ))}
    </div>
  )
}
