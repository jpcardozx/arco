// Unified Checklist Hook - Usando tipagem unificada
// File: /src/hooks/useUnifiedChecklist.ts

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  InteractiveChecklist, 
  ChecklistItem, 
  ClientProfile,
  DashboardStats,
  DataAdapters,
  DataValidators,
  useTypeValidation,
  SupabaseRow 
} from '@/types/unified'

interface UseUnifiedChecklistResult {
  // Data
  checklist: InteractiveChecklist | null
  stats: ChecklistStats | null
  
  // States
  loading: boolean
  error: string | null
  
  // Actions
  actions: {
    toggleItem: (itemId: string) => Promise<void>
    updateItemNotes: (itemId: string, notes: string) => Promise<void>
    addVerification: (itemId: string, type: string, status: string) => Promise<void>
    exportData: () => Promise<any>
    refresh: () => Promise<void>
  }
}

interface ChecklistStats {
  progress_percentage: number
  categories: Record<string, { completed: number; total: number; percentage: number }>
  priorities: Record<string, number>
  verification_status: {
    verified: number
    pending: number
    failed: number
  }
}

export function useUnifiedChecklist(checklistId: string): UseUnifiedChecklistResult {
  const [checklist, setChecklist] = useState<InteractiveChecklist | null>(null)
  const [stats, setStats] = useState<ChecklistStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  // Função principal para carregar dados
  const loadChecklistData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Carregar checklist base
      const { data: checklistData, error: checklistError } = await supabase
        .from('interactive_checklists')
        .select('*')
        .eq('id', checklistId)
        .single()

      if (checklistError) throw checklistError

      // 2. Carregar itens do checklist
      const { data: itemsData, error: itemsError } = await supabase
        .from('checklist_items')
        .select('*')
        .eq('checklist_id', checklistId)
        .order('item_order', { ascending: true })

      if (itemsError) throw itemsError

      // 3. Carregar verificações dos itens
      const itemIds = itemsData?.map(item => item.id) || []
      const { data: verificationsData } = await supabase
        .from('checklist_verifications')
        .select('*')
        .in('item_id', itemIds)

      // 4. Por enquanto não há client_profile_id no schema atual
      // TODO: Implementar relação entre checklist e client quando schema for atualizado
      let clientProfileData: SupabaseRow<'client_profiles'> | null = null

      // 5. Adaptar dados usando nossos adaptadores
      const adaptedChecklist = DataAdapters.adaptInteractiveChecklist(
        checklistData,
        itemsData || [],
        clientProfileData || undefined
      )

      // 6. Validar dados em desenvolvimento
      useTypeValidation(
        adaptedChecklist,
        DataValidators.isValidInteractiveChecklist,
        'Invalid InteractiveChecklist structure'
      )

      // 7. Calcular estatísticas
      const calculatedStats = calculateStats(adaptedChecklist, verificationsData || [])

      setChecklist(adaptedChecklist)
      setStats(calculatedStats)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      console.error('Erro ao carregar checklist:', err)
    } finally {
      setLoading(false)
    }
  }, [checklistId, supabase])

  // Função para calcular estatísticas
  const calculateStats = (
    checklist: InteractiveChecklist,
    verifications: SupabaseRow<'checklist_verifications'>[]
  ): ChecklistStats => {
    const items = checklist.checklist_items || []
    const totalItems = items?.length || 0
    const completedItems = items?.filter(item => item.is_completed).length || 0

    // Estatísticas por categoria
    const categories: Record<string, { completed: number; total: number; percentage: number }> = {}
    items?.forEach(item => {
      const category = item.category || 'Sem Categoria'
      if (!categories[category]) {
        categories[category] = { completed: 0, total: 0, percentage: 0 }
      }
      categories[category].total++
      if (item.is_completed) {
        categories[category].completed++
      }
    })

    // Calcular percentuais das categorias
    Object.keys(categories).forEach(category => {
      const cat = categories[category]
      cat.percentage = cat.total > 0 ? (cat.completed / cat.total) * 100 : 0
    })

    // Estatísticas por prioridade
    const priorities: Record<string, number> = {}
    items?.forEach(item => {
      const priority = item.priority || 'medium'
      priorities[priority] = (priorities[priority] || 0) + 1
    })

    // Status de verificação
    const verificationStatus = {
      verified: verifications.filter(v => v.status === 'verified' || v.status === 'passed').length,
      pending: verifications.filter(v => v.status === 'pending').length,
      failed: verifications.filter(v => v.status === 'failed').length
    }

    return {
      progress_percentage: totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
      categories,
      priorities,
      verification_status: verificationStatus
    }
  }

  // Actions
  const toggleItem = async (itemId: string) => {
    if (!checklist) return

    try {
      const item = checklist.checklist_items?.find(i => i.id === itemId)
      if (!item) return

      const newCompletedStatus = !item.is_completed
      const updateData: any = {
        is_completed: newCompletedStatus,
        updated_at: new Date().toISOString()
      }

      if (newCompletedStatus) {
        updateData.completed_at = new Date().toISOString()
      } else {
        updateData.completed_at = null
      }

      const { error } = await supabase
        .from('checklist_items')
        .update(updateData)
        .eq('id', itemId)

      if (error) throw error

      // Atualizar estado local
      setChecklist(prev => {
        if (!prev) return prev

        const updatedItems = prev.checklist_items?.map(i =>
          i.id === itemId
            ? { ...i, is_completed: newCompletedStatus, completed_at: updateData.completed_at }
            : i
        ) || []

        return DataAdapters.adaptInteractiveChecklist(
          prev,
          updatedItems,
          undefined
        )
      })

      // Recalcular stats
      if (checklist) {
        const updatedChecklist = { ...checklist }
        updatedChecklist.checklist_items = updatedChecklist.checklist_items?.map(i =>
          i.id === itemId
            ? { ...i, is_completed: newCompletedStatus, completed_at: updateData.completed_at }
            : i
        ) || []
        setStats(calculateStats(updatedChecklist, []))
      }

    } catch (err) {
      console.error('Erro ao alternar item:', err)
      setError(err instanceof Error ? err.message : 'Erro ao alternar item')
    }
  }

  const updateItemNotes = async (itemId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('checklist_items')
        .update({ 
          notes, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', itemId)

      if (error) throw error

      // Atualizar estado local
      setChecklist(prev => {
        if (!prev) return prev

        const updatedItems = prev.checklist_items?.map(i =>
          i.id === itemId ? { ...i, notes } : i
        ) || []

        return {
          ...prev,
          checklist_items: updatedItems
        }
      })

    } catch (err) {
      console.error('Erro ao atualizar notas:', err)
      setError(err instanceof Error ? err.message : 'Erro ao atualizar notas')
    }
  }

  const addVerification = async (itemId: string, type: string, status: string) => {
    try {
      // Primeiro precisamos do checklist_id
      if (!checklist) return
      
      const { error } = await supabase
        .from('checklist_verifications')
        .insert({
          checklist_id: checklist.id,
          item_id: itemId,
          verification_type: type,
          status,
          details: { manual_verification: true, created_by: 'user' }
        })

      if (error) throw error

      // Recarregar dados para pegar a nova verificação
      await loadChecklistData()

    } catch (err) {
      console.error('Erro ao adicionar verificação:', err)
      setError(err instanceof Error ? err.message : 'Erro ao adicionar verificação')
    }
  }

  const exportData = async () => {
    if (!checklist) return null

    return {
      checklist: {
        id: checklist.id,
        title: checklist.title,
        description: checklist.description,
        created_at: checklist.created_at,
        completion_stats: checklist.completion_stats
      },
      items: checklist.checklist_items?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        priority: item.priority,
        is_completed: item.is_completed,
        completed_at: item.completed_at,
        notes: item.notes
      })),
      client: checklist.client_profile ? {
        name: checklist.client_profile.display_name,
        contact: checklist.client_profile.contact_info,
        business: checklist.client_profile.business_info
      } : null,
      stats,
      exported_at: new Date().toISOString()
    }
  }

  const refresh = async () => {
    await loadChecklistData()
  }

  // Carregar dados na inicialização
  useEffect(() => {
    if (checklistId) {
      loadChecklistData()
    }
  }, [checklistId, loadChecklistData])

  return {
    checklist,
    stats,
    loading,
    error,
    actions: {
      toggleItem,
      updateItemNotes,
      addVerification,
      exportData,
      refresh
    }
  }
}