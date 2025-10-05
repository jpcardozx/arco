/**
 * Client Dashboard
 * Painel premium focado em gestão de domínio, DNS e performance do site
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Calendar,
  FileText,
  Eye,
  Users,
  Target,
  Clock,
  CheckCircle2,
  ArrowRight,
  Download,
  MessageSquare,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DomainManagement } from '@/components/dashboard/domain-management'
import { ClientHistoryTimeline } from '@/components/dashboard/client-history-timeline'
import { DataSharingConsent } from '@/components/dashboard/data-sharing-consent'

interface ClientDashboardProps {
  userName?: string
}

export function ClientDashboard({ userName = 'Cliente' }: ClientDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data - substituir por dados reais da API
  const clientMetrics = [
    {
      id: 'leads',
      label: 'Leads Gerados',
      value: '247',
      change: '+42%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'vs. mês anterior'
    },
    {
      id: 'conversions',
      label: 'Conversões',
      value: '58',
      change: '+35%',
      icon: Target,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      description: 'Taxa: 23.5%'
    },
    {
      id: 'roi',
      label: 'ROI',
      value: '420%',
      change: '+18%',
      icon: TrendingUp,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
      description: 'Retorno sobre investimento'
    },
    {
      id: 'views',
      label: 'Visualizações',
      value: '12.4k',
      change: '+28%',
      icon: Eye,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      description: 'Alcance total'
    }
  ]

  const projectProgress = {
    current: 65,
    milestones: [
      { name: 'Setup Inicial', completed: true },
      { name: 'Landing Page', completed: true },
      { name: 'Campanhas Ativas', completed: false, inProgress: true },
      { name: 'Otimização', completed: false }
    ]
  }

  const nextAppointments = [
    {
      id: '1',
      title: 'Revisão de Métricas',
      date: '2025-10-10',
      time: '14:00',
      type: 'online'
    },
    {
      id: '2',
      title: 'Planejamento Q4',
      date: '2025-10-15',
      time: '10:00',
      type: 'presencial'
    }
  ]

  const recentDocuments = [
    { name: 'Relatório Mensal - Setembro', date: '2025-09-30', type: 'PDF' },
    { name: 'Análise de Performance', date: '2025-09-25', type: 'PDF' },
    { name: 'Proposta Otimização', date: '2025-09-20', type: 'PDF' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900 p-6">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Olá, {userName}! 👋
              </h1>
              <p className="text-slate-300 text-lg">
                Gestão completa do seu <span className="text-indigo-400 font-semibold">domínio e site</span>
              </p>
            </div>
            <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
              <Sparkles className="h-3 w-3 mr-1" />
              Cliente Premium
            </Badge>
          </div>

          {/* Quick Period Selector */}
          <div className="flex gap-2 mt-4">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
              >
                {period === '7d' ? '7 dias' : period === '30d' ? '30 dias' : '90 dias'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="domain">Domínio & DNS</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Métricas e Progresso */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      </div>
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                        {metric.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                    <p className="text-xs text-slate-500">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress */}
        <Card className="border-slate-800 bg-slate-900/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-teal-500" />
              Progresso do Projeto
            </CardTitle>
            <CardDescription>Acompanhe a evolução das entregas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Conclusão Geral</span>
                <span className="text-lg font-bold text-white">{projectProgress.current}%</span>
              </div>
              <Progress value={projectProgress.current} className="h-2" />
            </div>

            <div className="space-y-3 mt-6">
              {projectProgress.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    milestone.completed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : milestone.inProgress
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-slate-700 text-slate-500'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`flex-1 ${
                    milestone.completed ? 'text-slate-300' : 'text-white font-medium'
                  }`}>
                    {milestone.name}
                  </span>
                  {milestone.inProgress && (
                    <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                      Em andamento
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Appointments */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-500" />
              Próximos Encontros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <p className="text-white font-medium mb-1">{appointment.title}</p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}</span>
                </div>
                <Badge
                  variant="outline"
                  className="mt-2 text-xs border-teal-500/30 text-teal-400"
                >
                  {appointment.type}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Reunião
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Documents & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-500" />
              Documentos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-red-500/10">
                      <FileText className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-gradient-to-br from-indigo-500/5 to-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              Precisa de Ajuda?
            </CardTitle>
            <CardDescription>Estamos aqui para você</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-300">
              Nossa equipe está pronta para responder suas dúvidas e otimizar seus resultados.
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Falar com Suporte
            </Button>
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Central de Ajuda
            </Button>
          </CardContent>
        </Card>
      </div>
        </TabsContent>

        {/* Domain & DNS Tab - Gestão de Domínio */}
        <TabsContent value="domain" className="mt-6">
          <DomainManagement />
        </TabsContent>

        {/* History Tab - Timeline de Interações */}
        <TabsContent value="history" className="mt-6">
          <ClientHistoryTimeline />
        </TabsContent>

        {/* Privacy Tab - Controle de Dados */}
        <TabsContent value="privacy" className="mt-6 space-y-6">
          <DataSharingConsent />
          
          {/* Privacy Info */}
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-white">Seus Dados, Suas Regras</CardTitle>
              <CardDescription>
                Mantemos total transparência sobre como seus dados são utilizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <h4 className="text-emerald-300 font-medium mb-2">✓ O que fazemos</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Anonimizamos todos os dados compartilhados</li>
                  <li>• Usamos apenas para melhorar o serviço</li>
                  <li>• Você pode revogar consentimento a qualquer momento</li>
                  <li>• Nunca vendemos suas informações</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <h4 className="text-red-300 font-medium mb-2">✗ O que NÃO fazemos</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Compartilhar dados sem seu consentimento</li>
                  <li>• Vender informações para terceiros</li>
                  <li>• Usar dados para publicidade externa</li>
                  <li>• Esconder como os dados são usados</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
