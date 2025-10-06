// Test Page for Interactive Checklist System
// File: /src/app/test-checklist/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { PremiumButton, CTAButton } from '@/components/ui/premium-button'
import { ProgressRing } from '@/components/ui/progress-ring'
import { SmartLoader } from '@/components/ui/smart-loader'
import { NotificationSystem } from '@/components/notifications/NotificationSystem'
import { 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Database,
  Zap,
  Target,
  Activity,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

const supabase = createClient()

export default function TestChecklistPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [checklistId, setChecklistId] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTestChecklist = async () => {
    try {
      setIsCreating(true)
      setError(null)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Usuário não autenticado')
        return
      }

      // Create checklist using database function
      const { data: newChecklistId, error: createError } = await supabase
        .rpc('create_website_audit_checklist', {
          p_user_id: user.id,
          p_title: `Test Checklist - ${new Date().toLocaleTimeString()}`,
          p_description: 'Checklist de teste para demonstrar funcionalidades do sistema'
        })

      if (createError) {
        setError(`Erro ao criar checklist: ${createError.message}`)
        return
      }

      setChecklistId(newChecklistId)
      await loadStats(newChecklistId)

    } catch (err: any) {
      setError(`Erro: ${err.message}`)
    } finally {
      setIsCreating(false)
    }
  }

  const loadStats = async (id: string) => {
    try {
      setLoading(true)
      
      const { data: checklistStats, error: statsError } = await supabase
        .rpc('get_checklist_with_stats', { p_checklist_id: id })
        .single()

      if (statsError) {
        setError(`Erro ao carregar stats: ${statsError.message}`)
        return
      }

      setStats(checklistStats)
    } catch (err: any) {
      setError(`Erro: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const completeRandomItem = async () => {
    if (!checklistId) return

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get uncompleted items
      const { data: items, error: itemsError } = await supabase
        .from('checklist_items')
        .select('*')
        .eq('checklist_id', checklistId)
        .eq('is_completed', false)

      if (itemsError || !items || items.length === 0) {
        setError('Nenhum item disponível para completar')
        return
      }

      // Complete random item
      const randomItem = items[Math.floor(Math.random() * items.length)]
      
      const { error: updateError } = await supabase
        .from('checklist_items')
        .update({
          is_completed: true,
          completed_at: new Date().toISOString(),
          completed_by: user.id
        })
        .eq('id', randomItem.id)

      if (updateError) {
        setError(`Erro ao completar item: ${updateError.message}`)
        return
      }

      // Reload stats
      await loadStats(checklistId)

    } catch (err: any) {
      setError(`Erro: ${err.message}`)
    }
  }

  const resetChecklist = async () => {
    if (!checklistId) return

    try {
      // Reset all items
      const { error: resetError } = await supabase
        .from('checklist_items')
        .update({
          is_completed: false,
          completed_at: null,
          completed_by: null
        })
        .eq('checklist_id', checklistId)

      if (resetError) {
        setError(`Erro ao resetar checklist: ${resetError.message}`)
        return
      }

      // Reload stats
      await loadStats(checklistId)

    } catch (err: any) {
      setError(`Erro: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      
      {/* Notification System */}
      <NotificationSystem />

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Sistema de Checklist Interativo
            </h1>
          </div>
          <p className="text-white/60 text-lg">
            Teste completo das funcionalidades real-time com Supabase
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-400" />
            Painel de Controle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CTAButton
              size="lg"
              icon={Target}
              onClick={createTestChecklist}
              loading={isCreating}
              disabled={isCreating}
            >
              {isCreating ? 'Criando...' : 'Criar Checklist'}
            </CTAButton>

            <PremiumButton
              size="lg"
              icon={Play}
              onClick={completeRandomItem}
              disabled={!checklistId || loading}
              variant="secondary"
            >
              Completar Item
            </PremiumButton>

            <PremiumButton
              size="lg"
              icon={RotateCcw}
              onClick={resetChecklist}
              disabled={!checklistId || loading}
              variant="outline"
            >
              Resetar
            </PremiumButton>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mb-8">
            <SmartLoader
              isLoading={true}
              stages={[
                { id: 'stats', title: 'Carregando estatísticas', description: 'Buscando dados do checklist...' }
              ]}
              currentStage={1}
              size="md"
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Erro:</span>
              <span className="text-white">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Stats Display */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" />
              Estatísticas Real-time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Progress Ring */}
              <div className="flex flex-col items-center">
                <ProgressRing
                  progress={stats.progress_percentage}
                  size={120}
                  strokeWidth={8}
                  color="teal"
                  showAnimation={true}
                  label={`${stats.progress_percentage}%`}
                />
                <p className="text-white/60 text-sm mt-2">Progresso Geral</p>
              </div>

              {/* Stats Cards */}
              <StatsCard
                title="Total de Itens"
                value={stats.total_items}
                icon={Target}
                color="text-blue-400"
              />
              
              <StatsCard
                title="Concluídos"
                value={stats.completed_items}
                icon={CheckCircle2}
                color="text-green-400"
              />
              
              <StatsCard
                title="Status"
                value={stats.status === 'not_started' ? 'Não Iniciado' : 
                       stats.status === 'in_progress' ? 'Em Andamento' : 'Concluído'}
                icon={TrendingUp}
                color="text-teal-400"
              />
            </div>

            {/* Categories Progress */}
            {stats.items_by_category && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Progresso por Categoria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(stats.items_by_category).map(([category, data]: [string, any]) => (
                    <div key={category} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{category}</span>
                        <span className="text-teal-400 font-semibold">
                          {data.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${data.percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
                        />
                      </div>
                      <p className="text-white/60 text-xs mt-1">
                        {data.completed} de {data.total} itens
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Como Testar o Sistema
          </h2>
          <div className="space-y-3 text-white/70">
            <p>1. <strong className="text-white">Criar Checklist:</strong> Clique em "Criar Checklist" para gerar um novo checklist com 11 itens</p>
            <p>2. <strong className="text-white">Completar Itens:</strong> Use "Completar Item" para marcar itens aleatórios como concluídos</p>
            <p>3. <strong className="text-white">Ver Progresso:</strong> Observe as estatísticas atualizarem em tempo real</p>
            <p>4. <strong className="text-white">Resetar:</strong> Use "Resetar" para desmarcar todos os itens e começar novamente</p>
            <p>5. <strong className="text-white">Sistema Real-time:</strong> Todos os triggers e cálculos são executados automaticamente no Supabase</p>
          </div>
        </motion.div>

        {/* Quick Links */}
        {checklistId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <a
              href={`/dashboard/checklist/${checklistId}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 
                       text-white font-medium rounded-xl hover:from-teal-400 hover:to-cyan-500 
                       transition-all duration-300 hover:scale-105"
            >
              <Target className="w-5 h-5" />
              Abrir Checklist Completo
            </a>
          </motion.div>
        )}

      </div>
    </div>
  )
}

function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'text-white' 
}: {
  title: string
  value: string | number
  icon: any
  color?: string
}) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className={`text-lg font-bold ${color}`}>
          {value}
        </span>
      </div>
      <p className="text-white/60 text-sm">{title}</p>
    </div>
  )
}