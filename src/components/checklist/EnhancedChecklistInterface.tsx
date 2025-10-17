// Enhanced Interactive Checklist Component with Complete Integration
// File: /src/components/checklist/EnhancedChecklistInterface.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUnifiedChecklist } from '@/hooks/useUnifiedChecklist'
import { CHECKLIST_PRIORITIES, CHECKLIST_CATEGORIES } from '@/types/unified'
import { PremiumButton, CTAButton } from '@/components/ui/premium-button'
import { ProgressRing } from '@/components/ui/progress-ring'
import { SmartLoader } from '@/components/ui/smart-loader'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  User, 
  Building2, 
  Target, 
  AlertTriangle,
  FileText,
  Camera,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  Shield,
  Zap,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  Timer
} from 'lucide-react'

interface EnhancedChecklistInterfaceProps {
  checklistId: string
  showClientInfo?: boolean
  enableVerifications?: boolean
  enableRealTimeUpdates?: boolean
}

const priorityIcons = {
  critical: AlertTriangle,
  high: TrendingUp,
  medium: Target,
  low: Circle
}

const categoryIcons = {
  'Performance': Zap,
  'SEO': TrendingUp,
  'Security': Shield,
  'UX': User,
  'Content': FileText,
  'Analytics': Target,
  'Mobile': Building2,
  'Conversion': TrendingUp,
  'General': Circle
}

function EnhancedChecklistInterface({
  checklistId,
  showClientInfo = true,
  enableVerifications = true,
  enableRealTimeUpdates = true
}: EnhancedChecklistInterfaceProps) {
  const { checklist, stats, loading, error, actions } = useUnifiedChecklist(checklistId)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotes, setShowNotes] = useState<{ [key: string]: boolean }>({})
  const [sessionStartTime] = useState(new Date())
  const [sessionTime, setSessionTime] = useState(0)

  // Session timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000)
      setSessionTime(diff)
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionStartTime])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
                    : `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const filteredItems = checklist?.checklist_items?.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const priorityMatch = selectedPriority === 'all' || item.priority === selectedPriority
    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && priorityMatch && searchMatch
  }) || []

  const handleToggleNotes = (itemId: string) => {
    setShowNotes(prev => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  const handleExport = async () => {
    const exportData = await actions.exportData()
    if (exportData) {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `checklist-${checklist?.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <SmartLoader
          isLoading={true}
          stages={[
            { id: 'loading', title: 'Carregando checklist', description: 'Buscando dados completos...' },
            { id: 'processing', title: 'Processando', description: 'Calculando estatísticas...' },
            { id: 'ready', title: 'Quase pronto', description: 'Configurando interface...' }
          ]}
          currentStage={1}
          size="lg"
        />
      </div>
    )
  }

  if (error || !checklist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                      flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md text-center"
        >
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Erro ao Carregar</h3>
          <p className="text-red-400 mb-4">{error || 'Checklist não encontrado'}</p>
          <PremiumButton onClick={actions.refresh} icon={Target}>
            Tentar Novamente
          </PremiumButton>
        </motion.div>
      </div>
    )
  }

  const categories = CHECKLIST_CATEGORIES
  const completedItems = checklist?.checklist_items?.filter(item => item.is_completed).length || 0
  const totalEstimatedTime = checklist?.checklist_items?.reduce((sum, item) => sum + (item.estimated_minutes || 0), 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header with Client Info and Session */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Title and Client Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-3">
                <motion.h1 
                  className="text-2xl lg:text-3xl font-bold text-white truncate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {checklist.title}
                </motion.h1>
                
                {enableRealTimeUpdates && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                )}
              </div>

              {checklist.description && (
                <p className="text-white/60 mb-3">{checklist.description}</p>
              )}

              {showClientInfo && checklist.client_profile && (
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <Building2 className="w-4 h-4" />
                    <span>{checklist.client_profile.business_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Target className="w-4 h-4" />
                    <span>{checklist.client_profile.industry}</span>
                  </div>
                  {checklist.client_profile.company_size && (
                    <div className="flex items-center gap-2 text-white/70">
                      <User className="w-4 h-4" />
                      <span>{checklist.client_profile.company_size}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Session Info and Actions */}
            <div className="flex items-center gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <Timer className="w-4 h-4" />
                  <span>Sessão</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {formatTime(sessionTime)}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Estimado</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {Math.round(totalEstimatedTime / 60)}h
                </div>
              </div>

              <CTAButton
                size="lg"
                icon={Download}
                onClick={handleExport}
              >
                Exportar
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Main Progress Ring */}
            <div className="flex flex-col items-center">
              <ProgressRing
                progress={stats?.progress_percentage || 0}
                size="xl"
                color="teal"
                animated={true}
                label={`${stats?.progress_percentage || 0}%`}
              />
              <p className="text-white/60 text-sm mt-2">Progresso Geral</p>
              <p className="text-white text-lg font-semibold">
                {completedItems}/{checklist?.checklist_items?.length || 0} itens
              </p>
            </div>

            {/* Category Progress */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold mb-3">Por Categoria</h3>
              {categories.slice(0, 4).map(category => {
                const categoryData = stats?.categories[category]
                if (!categoryData) return null
                
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{category}</span>
                      <span className="text-teal-400 font-medium">
                        {categoryData.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${categoryData.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Priority Distribution */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold mb-3">Por Prioridade</h3>
              {Object.entries(stats?.priorities || {}).map(([priority, count]) => {
                const Icon = priorityIcons[priority as keyof typeof priorityIcons]
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${
                        CHECKLIST_PRIORITIES.find(p => p.value === priority)?.color.split(' ')[0] || 'text-white/60'
                      }`} />
                      <span className="text-white/70 capitalize">{priority}</span>
                    </div>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Verification Status */}
            {enableVerifications && (
              <div className="space-y-3">
                <h3 className="text-white font-semibold mb-3">Verificações</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">Verificados</span>
                    </div>
                    <span className="text-green-400 font-medium">
                      {stats?.verification_status.verified || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/70">Pendentes</span>
                    </div>
                    <span className="text-yellow-400 font-medium">
                      {stats?.verification_status.pending || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-white/70">Falharam</span>
                    </div>
                    <span className="text-red-400 font-medium">
                      {stats?.verification_status.failed || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar itens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 
                           rounded-xl text-white placeholder-white/40 focus:outline-none 
                           focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50
                           transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                       text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50
                       appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all">Todas Categorias</option>
              {CHECKLIST_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                       text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50
                       appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all">Todas Prioridades</option>
              {CHECKLIST_PRIORITIES.map(priority => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Checklist Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const Icon = categoryIcons[item.category as keyof typeof categoryIcons] || Circle
              const PriorityIcon = priorityIcons[item.priority as keyof typeof priorityIcons]
              const priorityStyle = CHECKLIST_PRIORITIES.find(p => p.value === item.priority)?.color || 'text-white/60 bg-white/10 border-white/20'
              const isCompleted = item.is_completed
              const hasNotes = showNotes[item.id]

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
                    transition-all duration-300 hover:bg-white/10 hover:border-teal-500/30
                    ${isCompleted ? 'opacity-75' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Completion Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => actions.toggleItem(item.id)}
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        transition-all duration-300 mt-1
                        ${isCompleted 
                          ? 'bg-teal-500 border-teal-500' 
                          : 'border-white/30 hover:border-teal-500'
                        }
                      `}
                    >
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className={`
                            text-lg font-semibold mb-2 transition-all duration-300
                            ${isCompleted ? 'text-white/60 line-through' : 'text-white'}
                          `}>
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-white/70 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 ml-4">
                          <div className={`
                            px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1
                            ${priorityStyle}
                          `}>
                            <PriorityIcon className="w-3 h-3" />
                            <span className="capitalize">{item.priority}</span>
                          </div>
                          
                          <div className="px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white/70 flex items-center gap-1">
                            <Icon className="w-3 h-3" />
                            <span>{item.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                        {item.estimated_minutes && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{item.estimated_minutes}min estimado</span>
                          </div>
                        )}
                        
                        {item.completed_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Concluído em {new Date(item.completed_at).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <PremiumButton
                          size="sm"
                          variant="ghost"
                          icon={MessageSquare}
                          onClick={() => handleToggleNotes(item.id)}
                        >
                          {hasNotes ? 'Ocultar' : 'Notas'}
                        </PremiumButton>

                        {enableVerifications && (
                          <PremiumButton
                            size="sm"
                            variant="ghost"
                            icon={Eye}
                            onClick={() => actions.addVerification(item.id, 'manual', 'pending')}
                          >
                            Verificar
                          </PremiumButton>
                        )}
                      </div>

                      {/* Notes Section */}
                      <AnimatePresence>
                        {hasNotes && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-white/10"
                          >
                            <textarea
                              placeholder="Adicionar notas sobre este item..."
                              value={item.notes || ''}
                              onChange={(e) => actions.updateItemNotes(item.id, e.target.value)}
                              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl 
                                       text-white placeholder-white/40 resize-none
                                       focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                              rows={3}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-white/60">
              Tente ajustar os filtros ou termo de busca
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export { EnhancedChecklistInterface }
export default EnhancedChecklistInterface