// Hook para Checklist Interativo Real-time
// File: /src/hooks/useRealtimeChecklist.ts

'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'

export interface ChecklistItem {
  id: string
  checklist_id: string
  category: string
  title: string
  description: string
  action_required: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  difficulty: 'easy' | 'medium' | 'hard'
  estimated_minutes: number
  actual_minutes?: number
  is_completed: boolean
  completed_at?: string
  completed_by?: string
  notes?: string
  evidence_url?: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface InteractiveChecklist {
  id: string
  user_id: string
  checklist_type: string
  title: string
  description: string | null
  total_items: number
  completed_items: number
  progress_percentage: number
  status: string // Allow any status string from database
  data: Record<string, any>
  created_at: string
  updated_at: string
  completed_at?: string | null
  estimated_time_minutes: number | null
  actual_time_minutes?: number | null
  tags: string[] | null
  items: ChecklistItem[]
}

export interface ChecklistStats {
  total_items: number
  completed_items: number
  progress_percentage: number
  estimated_time_remaining: number
  categories: string[]
  priority_breakdown: Record<string, number>
  category_progress: Array<{
    category: string
    completed: number
    total: number
    progress: number
  }>
}

export function useRealtimeChecklist(checklistId: string) {
  const [checklist, setChecklist] = useState<InteractiveChecklist | null>(null)
  const [stats, setStats] = useState<ChecklistStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const supabase = createClient()

  // Fetch initial data
  const fetchChecklist = useCallback(async () => {
    try {
      setError(null)
      
      // Fetch checklist data
      const { data: checklistData, error: checklistError } = await supabase
        .from('interactive_checklists')
        .select('*')
        .eq('id', checklistId)
        .single()

      if (checklistError) throw checklistError

      // Fetch items data
      const { data: itemsData, error: itemsError } = await supabase
        .from('checklist_items')
        .select('*')
        .eq('checklist_id', checklistId)
        .order('sort_order')

      if (itemsError) throw itemsError

      // Combine data
      const fullChecklist: InteractiveChecklist = {
        ...checklistData,
        items: (itemsData || []) as ChecklistItem[],
        tags: checklistData.tags || [],
        estimated_time_minutes: checklistData.estimated_time_minutes || 0,
        actual_time_minutes: checklistData.actual_time_minutes || null,
        completed_at: checklistData.completed_at || null,
        data: (checklistData.data as Record<string, any>) || {},
      }

      setChecklist(fullChecklist)

      // Calculate stats
      const categories = [...new Set(itemsData?.map(item => item.category) || [])]
      const categoryProgress = categories.map(category => {
        const categoryItems = itemsData?.filter(item => item.category === category) || []
        const completed = categoryItems.filter(item => item.is_completed).length
        const total = categoryItems.length
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0
        
        return { category, completed, total, progress }
      })

      const priorityBreakdown = itemsData?.reduce((acc, item) => {
        acc[item.priority] = (acc[item.priority] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      const calculatedStats: ChecklistStats = {
        total_items: fullChecklist.total_items,
        completed_items: fullChecklist.completed_items,
        progress_percentage: fullChecklist.progress_percentage,
        estimated_time_remaining: itemsData?.filter(item => !item.is_completed)
          .reduce((sum, item) => sum + (item.estimated_minutes || 0), 0) || 0,
        categories,
        priority_breakdown: priorityBreakdown,
        category_progress: categoryProgress
      }

      setStats(calculatedStats)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar checklist')
      console.error('Error fetching checklist:', err)
    } finally {
      setLoading(false)
    }
  }, [checklistId, supabase])

  // Setup real-time subscriptions
  useEffect(() => {
    let channel: RealtimeChannel

    const setupRealtime = () => {
      channel = supabase
        .channel(`checklist-${checklistId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'interactive_checklists',
            filter: `id=eq.${checklistId}`
          },
          (payload) => {
            console.log('Checklist updated:', payload)
            setChecklist(prev => prev ? { ...prev, ...payload.new } : null)
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'checklist_items',
            filter: `checklist_id=eq.${checklistId}`
          },
          (payload) => {
            console.log('Checklist item updated:', payload)
            
            setChecklist(prev => {
              if (!prev) return null
              
              const updatedItems = [...prev.items]
              const itemIndex = updatedItems.findIndex(item => item.id === (payload.new as any)?.id || item.id === (payload.old as any)?.id)
              
              if (payload.eventType === 'INSERT' && payload.new) {
                updatedItems.push(payload.new as ChecklistItem)
                updatedItems.sort((a, b) => a.sort_order - b.sort_order)
              } else if (payload.eventType === 'UPDATE' && itemIndex >= 0 && payload.new) {
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...payload.new }
              } else if (payload.eventType === 'DELETE' && itemIndex >= 0) {
                updatedItems.splice(itemIndex, 1)
              }
              
              return { ...prev, items: updatedItems }
            })

            // Recalculate stats after item changes
            if (payload.eventType === 'UPDATE' && payload.new?.is_completed !== payload.old?.is_completed) {
              setTimeout(() => {
                // Trigger stats recalculation after DB trigger updates the parent
                fetchChecklist()
              }, 100)
            }
          }
        )
        .subscribe((status) => {
          console.log('Real-time subscription status:', status)
        })
    }

    fetchChecklist()
    setupRealtime()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [checklistId, supabase, fetchChecklist])

  // Update item function
  const updateItem = useCallback(async (
    itemId: string, 
    updates: Partial<ChecklistItem>
  ): Promise<boolean> => {
    try {
      setIsUpdating(true)
      
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      }

      // Add completion tracking
      if (updates.is_completed !== undefined) {
        updateData.completed_at = updates.is_completed ? new Date().toISOString() : undefined
        updateData.completed_by = updates.is_completed ? (await supabase.auth.getUser()).data.user?.id : undefined
      }

      const { error } = await supabase
        .from('checklist_items')
        .update(updateData)
        .eq('id', itemId)

      if (error) {
        console.error('Error updating item:', error)
        setError('Erro ao atualizar item')
        return false
      }

      return true

    } catch (err) {
      console.error('Error in updateItem:', err)
      setError(err instanceof Error ? err.message : 'Erro ao atualizar item')
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [supabase])

  // Add note to item
  const addNote = useCallback(async (itemId: string, note: string): Promise<boolean> => {
    return updateItem(itemId, { notes: note })
  }, [updateItem])

  // Add evidence URL
  const addEvidence = useCallback(async (itemId: string, evidenceUrl: string): Promise<boolean> => {
    return updateItem(itemId, { evidence_url: evidenceUrl })
  }, [updateItem])

  // Batch update multiple items
  const batchUpdateItems = useCallback(async (
    updates: Array<{ id: string; updates: Partial<ChecklistItem> }>
  ): Promise<boolean> => {
    try {
      setIsUpdating(true)

      const promises = updates.map(({ id, updates: itemUpdates }) => 
        updateItem(id, itemUpdates)
      )

      const results = await Promise.all(promises)
      return results.every(result => result === true)

    } catch (err) {
      console.error('Error in batchUpdateItems:', err)
      setError(err instanceof Error ? err.message : 'Erro ao atualizar itens')
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [updateItem])

  // Reset checklist (mark all as incomplete)
  const resetChecklist = useCallback(async (): Promise<boolean> => {
    if (!checklist) return false

    const resetUpdates = checklist.items
      .filter(item => item.is_completed)
      .map(item => ({
        id: item.id,
        updates: {
          is_completed: false,
          completed_at: undefined,
          completed_by: undefined,
          notes: undefined
        } as Partial<ChecklistItem>
      }))

    return batchUpdateItems(resetUpdates)
  }, [checklist, batchUpdateItems])

  // Complete all items
  const completeAll = useCallback(async (): Promise<boolean> => {
    if (!checklist) return false

    const completeUpdates = checklist.items
      .filter(item => !item.is_completed)
      .map(item => ({
        id: item.id,
        updates: {
          is_completed: true
        } as Partial<ChecklistItem>
      }))

    return batchUpdateItems(completeUpdates)
  }, [checklist, batchUpdateItems])

  // Export checklist data
  const exportChecklist = useCallback(() => {
    if (!checklist || !stats) return null

    return {
      checklist: {
        ...checklist,
        exported_at: new Date().toISOString()
      },
      stats,
      summary: {
        completion_percentage: stats.progress_percentage,
        time_saved: (checklist.estimated_time_minutes || 0) - stats.estimated_time_remaining,
        categories_completed: stats.category_progress.filter(cat => cat.progress === 100).length,
        high_priority_completed: checklist.items.filter(
          item => (item.priority === 'high' || item.priority === 'critical') && item.is_completed
        ).length
      }
    }
  }, [checklist, stats])

  return {
    // Data
    checklist,
    stats,
    
    // State
    loading,
    error,
    isUpdating,
    
    // Actions
    updateItem,
    addNote,
    addEvidence,
    batchUpdateItems,
    resetChecklist,
    completeAll,
    exportChecklist,
    
    // Utils
    refetch: fetchChecklist
  }
}

// Hook para criar novo checklist
export function useCreateChecklist() {
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const createWebsiteAuditChecklist = useCallback(async (
    title?: string,
    description?: string
  ): Promise<string | null> => {
    try {
      setCreating(true)
      setError(null)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error('Usuário não autenticado')
      }

      // Call the database function to create checklist with default items
      const { data, error } = await supabase
        .rpc('create_website_audit_checklist', {
          p_user_id: user.id,
          p_title: title || 'Website Audit Completo',
          p_description: description || 'Auditoria técnica e UX completa do seu website'
        })

      if (error) throw error

      return data // Returns the checklist ID

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar checklist'
      setError(errorMessage)
      console.error('Error creating checklist:', err)
      return null
    } finally {
      setCreating(false)
    }
  }, [supabase])

  return {
    createWebsiteAuditChecklist,
    creating,
    error
  }
}

// Hook para listar checklists do usuário
export function useUserChecklists() {
  const [checklists, setChecklists] = useState<InteractiveChecklist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchChecklists = useCallback(async () => {
    try {
      setError(null)
      
      const { data, error: fetchError } = await supabase
        .from('interactive_checklists')
        .select(`
          *,
          checklist_items(count)
        `)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setChecklists((data || []).map(cl => ({ ...cl, items: [] })) as InteractiveChecklist[])

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar checklists')
      console.error('Error fetching checklists:', err)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchChecklists()
  }, [fetchChecklists])

  return {
    checklists,
    loading,
    error,
    refetch: fetchChecklists
  }
}