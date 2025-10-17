// Página de Lista de Checklists
// File: /src/app/dashboard/checklist/page.tsx

'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUserChecklists, useCreateChecklist } from '@/hooks/useRealtimeChecklist'
import { PremiumButton, CTAButton } from '@/components/ui/premium-button'
import { ProgressRing } from '@/components/ui/progress-ring'
import { SmartLoader } from '@/components/ui/smart-loader'
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar,
  BarChart3,
  Target,
  Zap,
  Filter,
  Search,
  ArrowRight,
  PlayCircle,
  Trophy
} from 'lucide-react'

const statusColors = {
  not_started: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' },
  in_progress: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  completed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' }
}

const statusLabels = {
  not_started: 'Não Iniciado',
  in_progress: 'Em Andamento',
  completed: 'Concluído'
}

export default function ChecklistsPage() {
  const router = useRouter()
  const { checklists, loading, error, refetch } = useUserChecklists()
  const { createWebsiteAuditChecklist, creating } = useCreateChecklist()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'not_started' | 'in_progress' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'created_at' | 'progress' | 'title'>('created_at')

  const handleCreateChecklist = async () => {
    const checklistId = await createWebsiteAuditChecklist()
    if (checklistId) {
      router.push(`/dashboard/checklist/${checklistId}`)
    }
  }

  const filteredChecklists = checklists
    .filter(checklist => {
      const searchMatch = searchQuery === '' || 
        checklist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        checklist.description?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const statusMatch = filterStatus === 'all' || checklist.status === filterStatus
      
      return searchMatch && statusMatch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress_percentage - a.progress_percentage
        case 'title':
          return a.title.localeCompare(b.title)
        case 'created_at':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <SmartLoader
          isLoading={true}
          stages={[
            { id: 'loading', title: 'Carregando checklists', description: 'Buscando seus checklists...' }
          ]}
          currentStage={1}
          size="lg"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Checklists Interativos
              </motion.h1>
              <motion.p 
                className="text-white/60"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Gerencie e complete suas auditorias de forma organizada
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CTAButton
                size="lg"
                icon={Plus}
                onClick={handleCreateChecklist}
                loading={creating}
                disabled={creating}
              >
                {creating ? 'Criando...' : 'Novo Checklist'}
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Target}
            label="Total"
            value={checklists.length}
            color="text-blue-400"
          />
          <StatsCard
            icon={PlayCircle}
            label="Em Andamento"
            value={checklists.filter(c => c.status === 'in_progress').length}
            color="text-amber-400"
          />
          <StatsCard
            icon={Trophy}
            label="Concluídos"
            value={checklists.filter(c => c.status === 'completed').length}
            color="text-green-400"
          />
          <StatsCard
            icon={BarChart3}
            label="Progresso Médio"
            value={checklists.length > 0 
              ? Math.round(checklists.reduce((sum, c) => sum + c.progress_percentage, 0) / checklists.length)
              : 0
            }
            suffix="%"
            color="text-teal-400"
          />
        </div>

        {/* Filters */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar checklists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 
                           rounded-xl text-white placeholder-white/40 focus:outline-none 
                           focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50
                           transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50
                         appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">Todos Status</option>
                <option value="not_started">Não Iniciados</option>
                <option value="in_progress">Em Andamento</option>
                <option value="completed">Concluídos</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50
                         appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="created_at">Mais Recentes</option>
                <option value="progress">Progresso</option>
                <option value="title">Nome</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Checklists Grid */}
        {error ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-red-400 mb-4">Erro ao carregar checklists</div>
            <PremiumButton onClick={refetch} icon={Target}>
              Tentar Novamente
            </PremiumButton>
          </motion.div>
        ) : filteredChecklists.length === 0 ? (
          <EmptyState 
            hasChecklists={checklists.length > 0}
            hasFilters={searchQuery !== '' || filterStatus !== 'all'}
            onCreateChecklist={handleCreateChecklist}
            creating={creating}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredChecklists.map((checklist, index) => (
                <ChecklistCard
                  key={checklist.id}
                  checklist={checklist}
                  index={index}
                  onClick={() => router.push(`/dashboard/checklist/${checklist.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  suffix = '', 
  color = 'text-white' 
}: {
  icon: any
  label: string
  value: number
  suffix?: string
  color?: string
}) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {value}{suffix}
          </p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </motion.div>
  )
}

function ChecklistCard({ 
  checklist, 
  index, 
  onClick 
}: { 
  checklist: any
  index: number
  onClick: () => void 
}) {
  const statusStyle = statusColors[checklist.status as keyof typeof statusColors]
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
                 cursor-pointer group transition-all duration-300 hover:bg-white/10 
                 hover:border-teal-500/30"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 
                         transition-colors duration-300 truncate">
            {checklist.title}
          </h3>
          <p className="text-white/60 text-sm line-clamp-2">
            {checklist.description}
          </p>
        </div>
        
        <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
          {statusLabels[checklist.status as keyof typeof statusLabels]}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/70">Progresso</span>
          <span className="text-sm font-medium text-teal-400">
            {Math.round(checklist.progress_percentage)}%
          </span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${checklist.progress_percentage}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-semibold text-white">
            {checklist.total_items}
          </div>
          <div className="text-xs text-white/60">Itens</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">
            {checklist.completed_items}
          </div>
          <div className="text-xs text-white/60">Concluídos</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-amber-400">
            {checklist.estimated_time_minutes}min
          </div>
          <div className="text-xs text-white/60">Estimado</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Calendar className="w-3 h-3" />
          <span>{new Date(checklist.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-1 text-teal-400 group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-sm font-medium">Abrir</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

function EmptyState({ 
  hasChecklists, 
  hasFilters, 
  onCreateChecklist, 
  creating 
}: {
  hasChecklists: boolean
  hasFilters: boolean
  onCreateChecklist: () => void
  creating: boolean
}) {
  if (hasChecklists && hasFilters) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Nenhum checklist encontrado
        </h3>
        <p className="text-white/60">
          Tente ajustar os filtros ou termo de busca
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 
                      rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-teal-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">
        Comece sua primeira auditoria
      </h3>
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        Crie um checklist interativo para auditar seu website de forma organizada 
        e acompanhar seu progresso em tempo real.
      </p>
      
      <CTAButton
        size="lg"
        icon={Plus}
        onClick={onCreateChecklist}
        loading={creating}
        disabled={creating}
      >
        {creating ? 'Criando Checklist...' : 'Criar Meu Primeiro Checklist'}
      </CTAButton>
    </motion.div>
  )
}