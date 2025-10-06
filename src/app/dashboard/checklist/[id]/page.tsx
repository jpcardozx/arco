// Página do Checklist Interativo Real-time
// File: /src/app/dashboard/checklist/[id]/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useRealtimeChecklist } from '@/hooks/useRealtimeChecklist'
import { ProgressRing } from '@/components/ui/progress-ring'
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
  Filter,
  Search,
  Download,
  Share,
  RefreshCw,
  ArrowLeft,
  Play,
  Pause
} from 'lucide-react'

const priorityColors = {
  low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  high: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' }
}

const difficultyIcons = {
  easy: { icon: Circle, color: 'text-green-400' },
  medium: { icon: AlertTriangle, color: 'text-amber-400' },
  hard: { icon: Zap, color: 'text-red-400' }
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
  
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [sessionTime, setSessionTime] = useState(0)

  // Session timer
  useEffect(() => {
    if (!sessionStartTime) return

    const interval = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionStartTime])

  const startSession = () => {
    setSessionStartTime(new Date())
  }

  const pauseSession = () => {
    setSessionStartTime(null)
  }

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
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Erro ao carregar checklist</h2>
          <p className="text-white/60 mb-6">{error || 'Checklist não encontrado'}</p>
          <PremiumButton onClick={() => router.push('/dashboard')} icon={ArrowLeft}>
            Voltar ao Dashboard
          </PremiumButton>
        </div>
      </div>
    )
  }

  const filteredItems = checklist.items.filter(item => {
    const categoryMatch = filterCategory === 'all' || item.category === filterCategory
    const statusMatch = filterStatus === 'all' || 
      (filterStatus === 'completed' && item.is_completed) ||
      (filterStatus === 'pending' && !item.is_completed)
    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && statusMatch && searchMatch
  })

  const handleItemToggle = async (itemId: string, currentStatus: boolean) => {
    await updateItem(itemId, {
      is_completed: !currentStatus,
      completed_at: !currentStatus ? new Date().toISOString() : undefined
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <PremiumButton
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => router.push('/dashboard')}
              />
              
              <div>
                <motion.h1 
                  className="text-xl sm:text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {checklist.title}
                </motion.h1>
                <motion.p 
                  className="text-white/60 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {checklist.description}
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Session Timer */}
              <div className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-white font-mono">
                  {sessionStartTime ? formatTime(sessionTime) : '00:00'}
                </span>
                <PremiumButton
                  variant="ghost"
                  size="sm"
                  icon={sessionStartTime ? Pause : Play}
                  onClick={sessionStartTime ? pauseSession : startSession}
                />
              </div>

              <PremiumButton
                variant="secondary"
                size="sm"
                icon={Download}
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
              >
                Export
              </PremiumButton>
              
              <PremiumButton
                variant="primary"
                size="sm"
                icon={Share}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                }}
              >
                Share
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Progress Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Overall Progress */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-center">
                <ProgressRing
                  progress={checklist.progress_percentage}
                  label="Progresso Geral"
                  sublabel={`${checklist.completed_items} de ${checklist.total_items}`}
                  color="teal"
                  size="lg"
                  glow
                  animated
                />
                
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-white">
                        {stats?.estimated_time_remaining || 0}min
                      </div>
                      <div className="text-xs text-white/60">Restantes</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-teal-400">
                        {checklist.estimated_time_minutes - (stats?.estimated_time_remaining || 0)}min
                      </div>
                      <div className="text-xs text-white/60">Economizados</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <PremiumButton
                      variant="ghost"
                      size="sm"
                      icon={RefreshCw}
                      onClick={resetChecklist}
                      disabled={isUpdating || checklist.completed_items === 0}
                      className="w-full"
                    >
                      Reset All
                    </PremiumButton>
                    
                    <PremiumButton
                      variant="secondary"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={completeAll}
                      disabled={isUpdating || checklist.progress_percentage === 100}
                      className="w-full"
                    >
                      Complete All
                    </PremiumButton>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Category Progress */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Por Categoria</h3>
              
              <div className="space-y-4">
                {stats?.category_progress.map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{cat.category}</span>
                      <span className="text-xs text-white/60">{cat.completed}/{cat.total}</span>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.progress}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievement Badge */}
            {checklist.progress_percentage >= 75 && (
              <motion.div
                className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 
                           backdrop-blur-xl border border-amber-400/30 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-semibold text-amber-400 mb-1">Quase Lá!</h4>
                <p className="text-xs text-amber-300/80">
                  Você está a {checklist.total_items - checklist.completed_items} itens de completar!
                </p>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Filters */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Buscar itens do checklist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 
                               rounded-xl text-white placeholder-white/40 focus:outline-none 
                               focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50"
                    />
                  </div>
                </div>
                
                {/* Filters */}
                <div className="flex gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="all">Todas Categorias</option>
                    {stats?.categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="all">Todos Status</option>
                    <option value="completed">Concluídos</option>
                    <option value="pending">Pendentes</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Checklist Items */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <ChecklistItemComponent
                    key={item.id}
                    item={item}
                    index={index}
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
                <p className="text-white/60">Tente ajustar os filtros ou termo de busca</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente individual do item
function ChecklistItemComponent({ 
  item, 
  index, 
  onToggle,
  isUpdating 
}: { 
  item: any
  index: number
  onToggle: (id: string, status: boolean) => void
  isUpdating: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  
  const priorityStyle = priorityColors[item.priority]
  const DifficultyIcon = difficultyIcons[item.difficulty].icon
  const difficultyColor = difficultyIcons[item.difficulty].color

  const handleToggle = async () => {
    setIsToggling(true)
    await onToggle(item.id, item.is_completed)
    setIsToggling(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
                  transition-all duration-300 hover:bg-white/10 hover:border-teal-500/30 
                  ${item.is_completed ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        
        {/* Checkbox */}
        <motion.button
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center
                     transition-all duration-300 ${
                       item.is_completed 
                         ? 'bg-teal-500 border-teal-500' 
                         : 'border-white/30 hover:border-teal-500/50'
                     }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggle}
          disabled={isToggling || isUpdating}
        >
          <AnimatePresence>
            {item.is_completed && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {isToggling && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4 text-teal-400" />
            </motion.div>
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className={`font-semibold text-lg transition-all duration-300 ${
              item.is_completed ? 'text-white/60 line-through' : 'text-white'
            }`}>
              {item.title}
            </h4>
            
            <div className="flex items-center gap-2 ml-4">
              {/* Priority Badge */}
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${priorityStyle.bg} ${priorityStyle.border} ${priorityStyle.text} border`}>
                {item.priority}
              </span>
              
              {/* Difficulty Icon */}
              <div className={`p-1 rounded-lg bg-white/10 ${difficultyColor}`}>
                <DifficultyIcon className="w-3 h-3" />
              </div>
            </div>
          </div>
          
          <p className={`text-sm mb-3 transition-all duration-300 ${
            item.is_completed ? 'text-white/40' : 'text-white/70'
          }`}>
            {item.description}
          </p>
          
          {item.action_required && (
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-3 mb-3">
              <p className="text-sm text-teal-300">
                <strong>Ação:</strong> {item.action_required}
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.estimated_minutes} min</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>{item.category}</span>
              </div>
            </div>
            
            {/* Completion info */}
            <AnimatePresence>
              {item.is_completed && item.completed_at && (
                <motion.span
                  className="text-xs text-green-400"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  ✓ {new Date(item.completed_at).toLocaleDateString()}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}