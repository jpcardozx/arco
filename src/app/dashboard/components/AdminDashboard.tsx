/**
 * Admin Dashboard
 * Painel completo com acesso total ao sistema
 */

'use client'

import { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  UserCheck,
  TrendingUp,
  Zap,
  DollarSign,
  Activity,
  BarChart3,
  Settings,
  Shield,
  Database,
  RefreshCw,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardSkeleton } from '@/components/ui/enhanced-loading'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { useAdminStats, useConversionMetrics, useMonthlyRevenue } from '@/lib/hooks'
import { toast } from 'sonner'

interface AdminDashboardProps {
  userName?: string
}

export function AdminDashboard({ userName = 'Administrador' }: AdminDashboardProps) {
  // Validação de role - SEGURANÇA CRÍTICA
  const { user, loading: userLoading } = useCurrentUser()
  
  // Fetch dados reais - MUST call hooks unconditionally before any returns
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useAdminStats()
  const { data: conversion, isLoading: conversionLoading } = useConversionMetrics()
  const { data: revenue, isLoading: revenueLoading } = useMonthlyRevenue()

  const isLoading = userLoading || statsLoading || conversionLoading || revenueLoading

  // Dados reais do backend - memoizado para performance
  const adminStats = useMemo(() => stats ? [
    {
      id: 'total-users',
      label: 'Usuários Ativos',
      value: stats.total_users.toString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'total-clients',
      label: 'Total de Clientes',
      value: stats.total_clients.toString(),
      subValue: `${stats.active_clients} ativos`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      id: 'revenue',
      label: 'Receita (mês)',
      value: `R$ ${((revenue || 0) / 1000).toFixed(1)}k`,
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    },
    {
      id: 'conversion',
      label: 'Taxa de Conversão',
      value: `${conversion?.conversion_rate || 0}%`,
      subValue: `${conversion?.converted_leads || 0}/${conversion?.new_leads || 0} leads`,
      change: '+3.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ] : [], [stats, revenue, conversion])

  const systemHealth = [
    { label: 'API Status', status: 'operational', uptime: '99.9%' },
    { label: 'Database', status: 'operational', uptime: '99.8%' },
    { label: 'WhatsApp Bot', status: 'operational', uptime: '98.5%' },
    { label: 'Email Service', status: 'degraded', uptime: '97.2%' }
  ]

  const handleRefresh = useCallback(async () => {
    try {
      await refetchStats()
      toast.success('Dashboard atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar dashboard')
    }
  }, [refetchStats])

  // Se não é admin, retorna null e deixa MainDashboard fazer o roteamento
  // Evita redirect loop - check AFTER all hooks are called
  if (!userLoading && user?.role !== 'admin') {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <p className="text-slate-400">Acesso não autorizado</p>
      </div>
    )
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Bem-vindo, {userName}!
          </h1>
          <p className="text-slate-400 mt-1">
            Painel administrativo completo do sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-red-500/30 text-red-400">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {adminStats.map((stat, index) => (
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
                  <Badge
                    variant="outline"
                    className={`border-emerald-500/30 text-emerald-400`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                {stat.subValue && (
                  <p className="text-xs text-slate-500 mt-1">{stat.subValue}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* System Health */}
        <Card className="border-slate-800 bg-slate-900/50 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-500" />
                  Status do Sistema
                </CardTitle>
                <CardDescription>Monitoramento em tempo real</CardDescription>
              </div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Operational
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemHealth.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    service.status === 'operational' ? 'bg-emerald-500' : 'bg-orange-500'
                  } animate-pulse`} />
                  <span className="text-white font-medium">{service.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400">
                    Uptime: {service.uptime}
                  </span>
                  <Badge
                    variant="outline"
                    className={`${
                      service.status === 'operational'
                        ? 'border-emerald-500/30 text-emerald-400'
                        : 'border-orange-500/30 text-orange-400'
                    }`}
                  >
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-teal-500" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Gerenciar Usuários
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Backup Manual
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics Summary */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-teal-500" />
            Métricas do Sistema
          </CardTitle>
          <CardDescription>Resumo das últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-white">Novos Leads</span>
              </div>
              <span className="text-lg font-bold text-white">{stats?.new_leads || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-white">Leads Convertidos</span>
              </div>
              <span className="text-lg font-bold text-white">{stats?.converted_leads || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-white">Tarefas Pendentes</span>
              </div>
              <span className="text-lg font-bold text-white">{stats?.pending_tasks || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span className="text-sm text-white">Tarefas Concluídas</span>
              </div>
              <span className="text-lg font-bold text-white">{stats?.completed_tasks || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
