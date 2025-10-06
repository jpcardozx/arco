// Enhanced Dashboard with Complete Integration
// File: /src/components/dashboard/EnhancedDashboard.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { PremiumButton, CTAButton } from '@/components/ui/premium-button'
import { ProgressRing } from '@/components/ui/progress-ring'
import { SmartLoader } from '@/components/ui/smart-loader'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  Clock,
  Target,
  Star,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Plus,
  Eye,
  Building2,
  FileText,
  Zap,
  Shield,
  Globe,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

type ClientProfile = Database['public']['Tables']['client_profiles']['Row']
type InteractiveChecklist = Database['public']['Tables']['interactive_checklists']['Row']
type ChecklistItem = Database['public']['Tables']['checklist_items']['Row']

interface DashboardStats {
  totalClients: number
  activeChecklists: number
  completedItems: number
  totalItems: number
  completionRate: number
  clientsThisMonth: number
  checklistsThisMonth: number
  avgCompletionTime: number
  topCategories: { [key: string]: number }
  priorityDistribution: { [key: string]: number }
  recentActivity: ActivityItem[]
}

interface ActivityItem {
  id: string
  type: 'client_created' | 'checklist_completed' | 'item_completed' | 'verification_added'
  title: string
  description: string
  timestamp: string
  metadata?: any
}

const priorityColors = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  low: 'text-green-400 bg-green-500/10 border-green-500/30'
}

const activityIcons = {
  client_created: Users,
  checklist_completed: CheckCircle2,
  item_completed: Target,
  verification_added: Shield
}

export default function EnhancedDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [clients, setClients] = useState<ClientProfile[]>([])
  const [checklists, setChecklists] = useState<InteractiveChecklist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'completion' | 'clients' | 'activity'>('completion')

  const supabase = createClient()

  useEffect(() => {
    loadDashboardData()
  }, [timeRange])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Calculate date range
      const now = new Date()
      const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      const dateFilter = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000)).toISOString()

      // Load clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('client_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (clientsError) throw clientsError

      // Load checklists with items
      const { data: checklistsData, error: checklistsError } = await supabase
        .from('interactive_checklists')
        .select(`
          *,
          checklist_items(*)
        `)
        .order('created_at', { ascending: false })

      if (checklistsError) throw checklistsError

      setClients(clientsData || [])
      setChecklists(checklistsData || [])

      // Calculate stats
      const totalClients = clientsData?.length || 0
      const activeChecklists = checklistsData?.filter((c: any) => c.status === 'active').length || 0
      
      const allItems = checklistsData?.flatMap((c: any) => c.checklist_items || []) || []
      const completedItems = allItems.filter((item: any) => item.is_completed).length
      const totalItems = allItems.length
      const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

      const clientsThisMonth = clientsData?.filter((c: any) => 
        new Date(c.created_at) >= new Date(dateFilter)
      ).length || 0

      const checklistsThisMonth = checklistsData?.filter((c: any) => 
        new Date(c.created_at) >= new Date(dateFilter)
      ).length || 0

      // Calculate category distribution
      const topCategories: { [key: string]: number } = {}
      allItems.forEach((item: any) => {
        if (item.category) {
          topCategories[item.category] = (topCategories[item.category] || 0) + 1
        }
      })

      // Calculate priority distribution
      const priorityDistribution: { [key: string]: number } = {}
      allItems.forEach((item: any) => {
        if (item.priority) {
          priorityDistribution[item.priority] = (priorityDistribution[item.priority] || 0) + 1
        }
      })

      // Generate recent activity
      const recentActivity: ActivityItem[] = [
        ...clientsData?.slice(0, 3).map((client: any) => ({
          id: client.id,
          type: 'client_created' as const,
          title: 'Novo Cliente',
          description: `${client.contact_name || client.business_name || 'Cliente'} foi adicionado`,
          timestamp: client.created_at,
          metadata: { clientId: client.id }
        })) || [],
        ...checklistsData?.slice(0, 3).map((checklist: any) => ({
          id: checklist.id,
          type: 'checklist_completed' as const,
          title: 'Checklist Atualizado',
          description: checklist.title,
          timestamp: checklist.updated_at || checklist.created_at,
          metadata: { checklistId: checklist.id }
        })) || []
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)

      setStats({
        totalClients,
        activeChecklists,
        completedItems,
        totalItems,
        completionRate,
        clientsThisMonth,
        checklistsThisMonth,
        avgCompletionTime: 0, // Would need more data to calculate
        topCategories,
        priorityDistribution,
        recentActivity
      })

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard')
    } finally {
      setLoading(false)
    }
  }

  const exportData = async () => {
    if (!stats) return

    const exportData = {
      stats,
      clients: clients.slice(0, 10), // Limit for file size
      checklists: checklists.slice(0, 10),
      generatedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <SmartLoader
          isLoading={true}
          stages={[
            { id: 'loading', title: 'Carregando dashboard', description: 'Coletando dados...' },
            { id: 'processing', title: 'Processando', description: 'Calculando estatísticas...' },
            { id: 'ready', title: 'Finalizando', description: 'Preparando visualização...' }
          ]}
          currentStage={1}
          size="lg"
        />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md text-center"
        >
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Erro no Dashboard</h3>
          <p className="text-red-400 mb-4">{error || 'Não foi possível carregar os dados'}</p>
          <PremiumButton onClick={loadDashboardData} icon={Target}>
            Tentar Novamente
          </PremiumButton>
        </motion.div>
      </div>
    )
  }

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) return { icon: ArrowUp, color: 'text-green-400', trend: 'up' }
    if (current < previous) return { icon: ArrowDown, color: 'text-red-400', trend: 'down' }
    return { icon: Minus, color: 'text-white/60', trend: 'stable' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            <div>
              <motion.h1 
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Dashboard ARCO
              </motion.h1>
              <p className="text-white/60 mt-1">
                Visão completa do seu sistema de gerenciamento
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>

              <CTAButton
                icon={Download}
                onClick={exportData}
              >
                Exportar
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-teal-500/20 border border-teal-500/30 rounded-xl">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+{stats.clientsThisMonth}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {stats.totalClients}
            </h3>
            <p className="text-white/60 text-sm">
              Total de Clientes
            </p>
          </motion.div>

          {/* Active Checklists */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+{stats.checklistsThisMonth}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {stats.activeChecklists}
            </h3>
            <p className="text-white/60 text-sm">
              Checklists Ativos
            </p>
          </motion.div>

          {/* Completion Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <ProgressRing
                progress={stats.completionRate}
                size="md"
                strokeWidth={3}
                color="green"
                showLabel={false}
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {Math.round(stats.completionRate)}%
            </h3>
            <p className="text-white/60 text-sm">
              Taxa de Conclusão
            </p>
          </motion.div>

          {/* Total Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-xl">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-purple-400 text-sm">
                {stats.completedItems}/{stats.totalItems}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {stats.totalItems}
            </h3>
            <p className="text-white/60 text-sm">
              Itens de Checklist
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Distribuição por Categoria
            </h3>

            <div className="space-y-4">
              {Object.entries(stats.topCategories)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 6)
                .map(([category, count]) => {
                  const percentage = (count / stats.totalItems * 100)
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{category}</span>
                        <span className="text-teal-400 font-medium">
                          {count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </motion.div>

          {/* Priority Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Distribuição por Prioridade
            </h3>

            <div className="space-y-4">
              {Object.entries(stats.priorityDistribution)
                .sort(([,a], [,b]) => b - a)
                .map(([priority, count]) => {
                  const percentage = (count / stats.totalItems * 100)
                  return (
                    <div key={priority} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`
                          px-2 py-1 rounded-lg text-xs font-medium border capitalize
                          ${priorityColors[priority as keyof typeof priorityColors]}
                        `}>
                          {priority}
                        </div>
                        <span className="text-white font-medium">
                          {count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          className={`h-2 rounded-full ${
                            priority === 'critical' ? 'bg-red-400' :
                            priority === 'high' ? 'bg-orange-400' :
                            priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Atividade Recente
            </h3>

            <div className="space-y-4">
              {stats.recentActivity.slice(0, 8).map(activity => {
                const Icon = activityIcons[activity.type]
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-teal-500/20 border border-teal-500/30 rounded-lg flex-shrink-0">
                      <Icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">
                        {activity.title}
                      </p>
                      <p className="text-white/60 text-xs truncate">
                        {activity.description}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Clients and Checklists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Clientes Recentes
              </h3>
              <PremiumButton size="sm" icon={Eye}>
                Ver Todos
              </PremiumButton>
            </div>

            <div className="space-y-4">
              {clients.slice(0, 5).map(client => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500/20 border border-teal-500/30 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{client.contact_name || client.business_name || 'Cliente'}</p>
                      <p className="text-white/60 text-sm">{client.business_type}</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-lg text-xs font-medium border text-green-400 bg-green-500/10 border-green-500/30">
                    Ativo
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Checklists */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Checklists Recentes
              </h3>
              <PremiumButton size="sm" icon={Plus}>
                Novo
              </PremiumButton>
            </div>

            <div className="space-y-4">
              {checklists.slice(0, 5).map((checklist: any) => {
                const items = [] // We'll need to load items separately
                const completed = checklist.completed_items || 0
                const total = checklist.total_items || 1
                const progress = (completed / total) * 100
                
                return (
                  <div key={checklist.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {checklist.title}
                        </p>
                        <p className="text-white/60 text-sm">
                          {completed}/{total} itens
                        </p>
                      </div>
                      <div className="ml-4">
                        <ProgressRing
                          progress={progress}
                          size="md"
                          strokeWidth={3}
                          color="teal"
                          showLabel={false}
                        />
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}