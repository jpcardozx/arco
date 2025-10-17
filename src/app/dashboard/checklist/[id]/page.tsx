// Página do Checklist Interativo Real-time - REFATORADO UX/UI
// File: /src/app/dashboard/checklist/[id]/page.tsx

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useRealtimeChecklist } from '@/hooks/useRealtimeChecklist'
import { PremiumButton } from '@/components/ui/premium-button'
import { SmartLoader, LoadingStages } from '@/components/ui/smart-loader'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Zap, 
  Trophy,
  Target,
  Search,
  Download,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  BarChart3,
  ListChecks
} from 'lucide-react'

const priorityColors = {
  low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: 'Baixa' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Média' },
  high: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', label: 'Alta' },
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'Crítica' }
}

const difficultyConfig = {
  easy: { icon: Circle, color: 'text-green-400', label: 'Fácil' },
  medium: { icon: AlertTriangle, color: 'text-amber-400', label: 'Médio' },
  hard: { icon: Zap, color: 'text-red-400', label: 'Difícil' }
}

export default function InteractiveChecklistPage() {
  const params = useParams()
  const router = useRouter()
  const checklistId = params?.id as string
  
  const { 
    checklist, 
    stats, 
    loading, 
    error, 
    isUpdating, 
    updateItem,
    resetChecklist,
    completeAll,
    exportChecklist 
  } = useRealtimeChecklist(checklistId)
  
  const [searchQuery, setSearchQuery] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <SmartLoader
          isLoading={true}
          stages={LoadingStages.dataAnalysis}
          currentStage={2}
          size="lg"
          showTimer
        />
      </div>
    )
  }

  if (error || !checklist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 mb-6">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Erro ao carregar checklist</h2>
            <p className="text-white/60">{error || 'Checklist não encontrado'}</p>
          </div>
          <PremiumButton onClick={() => router.push('/dashboard')} icon={ArrowLeft} variant="secondary">
            Voltar ao Dashboard
          </PremiumButton>
        </motion.div>
      </div>
    )
  }

  // Filter logic - simplified
  const filteredItems = checklist.items.filter(item => {
    if (!searchQuery) return true
    
    const search = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
    )
  })

  const handleItemToggle = async (itemId: string, currentStatus: boolean) => {
    await updateItem(itemId, {
      is_completed: !currentStatus,
      completed_at: !currentStatus ? new Date().toISOString() : undefined
    })
  }

  // Quick stats for header
  const completionRate = checklist.progress_percentage
  const pendingHighPriority = checklist.items.filter(
    item => !item.is_completed && (item.priority === 'high' || item.priority === 'critical')
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Modern Compact Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-white/70" />
              </button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-white truncate">
                  {checklist.title}
                </h1>
                {checklist.description && (
                  <p className="text-xs text-white/50 truncate">
                    {checklist.description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Center: Progress Badge */}
            <motion.div 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="relative w-8 h-8">
                <svg className="transform -rotate-90 w-8 h-8">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-white/10"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - completionRate / 100)}`}
                    className="text-teal-400 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{Math.round(completionRate)}%</span>
                </div>
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">{checklist.completed_items}/{checklist.total_items}</div>
                <div className="text-white/50">completos</div>
              </div>
            </motion.div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {pendingHighPriority > 0 && (
                <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-medium text-orange-400">{pendingHighPriority} prioritárias</span>
                </div>
              )}
              
              <button
                onClick={() => {
                  const data = exportChecklist()
                  if (data) {
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `checklist-${checklist.id}.json`
                    a.click()
                  }
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Exportar checklist"
              >
                <Download className="w-4 h-4 text-white/70" />
              </button>
              
              <button
                onClick={resetChecklist}
                disabled={isUpdating || checklist.completed_items === 0}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Reset checklist"
              >
                <RefreshCw className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Bar - Compact */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <ListChecks className="w-4 h-4 text-teal-400" />
              <span className="text-xs text-white/60">Total</span>
            </div>
            <div className="text-2xl font-bold text-white">{checklist.total_items}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs text-white/60">Completos</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{checklist.completed_items}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-white/60">Tempo</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats?.estimated_time_remaining || 0}<span className="text-sm text-white/50">min</span></div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-white/60">Progresso</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{Math.round(completionRate)}%</div>
          </div>
        </motion.div>

        {/* Search Bar - Simplified */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar itens do checklist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 
                       rounded-xl text-white placeholder-white/40 focus:outline-none 
                       focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Achievement Banner */}
        {completionRate >= 75 && completionRate < 100 && (
          <motion.div
            className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 
                       border border-amber-400/30 rounded-xl p-4 flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Trophy className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-400 mb-0.5">Quase lá! 🎉</h3>
              <p className="text-sm text-amber-300/80">
                Apenas {checklist.total_items - checklist.completed_items} item{checklist.total_items - checklist.completed_items > 1 ? 's' : ''} restante{checklist.total_items - checklist.completed_items > 1 ? 's' : ''}!
              </p>
            </div>
            <PremiumButton
              variant="ghost"
              size="sm"
              onClick={completeAll}
              disabled={isUpdating}
              className="flex-shrink-0"
            >
              Completar Tudo
            </PremiumButton>
          </motion.div>
        )}

        {completionRate === 100 && (
          <motion.div
            className="mb-6 bg-gradient-to-r from-green-500/10 to-teal-500/10 
                       border border-green-400/30 rounded-xl p-6 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Sparkles className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-400 mb-2">Parabéns! Checklist Completo! 🎊</h3>
            <p className="text-green-300/80 mb-4">
              Você completou todos os {checklist.total_items} itens!
            </p>
            <PremiumButton
              variant="secondary"
              size="sm"
              onClick={() => {
                const data = exportChecklist()
                if (data) {
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `checklist-${checklist.id}.json`
                  a.click()
                }
              }}
              icon={Download}
            >
              Exportar Resultados
            </PremiumButton>
          </motion.div>
        )}

        {/* Checklist Items - Compact Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <ChecklistItemCard
                key={item.id}
                item={item}
                onToggle={handleItemToggle}
                isUpdating={isUpdating}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum item encontrado</h3>
            <p className="text-white/60 mb-4">Tente ajustar o termo de busca</p>
            {searchQuery && (
              <PremiumButton variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                Limpar busca
              </PremiumButton>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Componente individual do item - COMPACTO
function ChecklistItemCard({ 
  item, 
  onToggle,
  isUpdating 
}: { 
  item: any
  onToggle: (id: string, status: boolean) => void
  isUpdating: boolean
}) {
  const [isToggling, setIsToggling] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const priorityStyle = priorityColors[item.priority as keyof typeof priorityColors]
  const difficultyInfo = difficultyConfig[item.difficulty as keyof typeof difficultyConfig]
  const DifficultyIcon = difficultyInfo.icon

  const handleToggle = async () => {
    setIsToggling(true)
    await onToggle(item.id, item.is_completed)
    setIsToggling(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group bg-white/5 border border-white/10 rounded-xl transition-all duration-200
                  hover:bg-white/[0.07] hover:border-teal-500/30 
                  ${item.is_completed ? 'opacity-60' : ''}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          
          {/* Checkbox */}
          <button
            className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center
                       transition-all duration-200 mt-0.5 ${
                         item.is_completed 
                           ? 'bg-teal-500 border-teal-500' 
                           : 'border-white/30 hover:border-teal-500/70'
                       }`}
            onClick={handleToggle}
            disabled={isToggling || isUpdating}
          >
            <AnimatePresence>
              {item.is_completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {isToggling && (
              <RefreshCw className="w-3 h-3 text-teal-400 animate-spin" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h4 className={`font-semibold text-sm transition-all ${
                item.is_completed ? 'text-white/50 line-through' : 'text-white'
              }`}>
                {item.title}
              </h4>
              
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                  {priorityStyle.label}
                </span>
                <div className={`p-1 rounded ${difficultyInfo.color} bg-white/5`} title={difficultyInfo.label}>
                  <DifficultyIcon className="w-3 h-3" />
                </div>
              </div>
            </div>
            
            <p className={`text-xs mb-2 line-clamp-2 transition-all ${
              item.is_completed ? 'text-white/30' : 'text-white/60'
            } ${isExpanded ? 'line-clamp-none' : ''}`}>
              {item.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-white/40">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.estimated_minutes}min</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="max-w-[80px] truncate">{item.category}</span>
                </div>
              </div>
              
              {item.is_completed && item.completed_at && (
                <span className="text-[10px] text-green-400">
                  ✓ {new Date(item.completed_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </span>
              )}
            </div>

            {/* Action Required */}
            {item.action_required && !item.is_completed && (
              <motion.div
                className="mt-2 bg-teal-500/10 border border-teal-500/30 rounded-lg p-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
              >
                <p className="text-[11px] text-teal-300">
                  <strong className="text-teal-400">→</strong> {item.action_required}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
