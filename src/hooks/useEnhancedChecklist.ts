// Enhanced Checklist Hook with Complete Data Integration
// File: /src/hooks/useEnhancedChecklist.ts

'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

type ChecklistItem = Database['public']['Tables']['checklist_items']['Row']
type InteractiveChecklist = Database['public']['Tables']['interactive_checklists']['Row']
type ClientProfile = Database['public']['Tables']['client_profiles']['Row']
type ChecklistVerification = Database['public']['Tables']['checklist_verifications']['Row']
type ChecklistRelationship = Database['public']['Tables']['checklist_relationships']['Row']

export interface EnhancedChecklistData extends InteractiveChecklist {
  checklist_items: ChecklistItem[]
  client_profile?: ClientProfile
  verifications: ChecklistVerification[]
  relationships: ChecklistRelationship[]
}

export interface ChecklistStats {
  total_items: number
  completed_items: number
  progress_percentage: number
  categories: {
    [key: string]: {
      total: number
      completed: number
      percentage: number
    }
  }
  priorities: {
    critical: number
    high: number
    medium: number
    low: number
  }
  verification_status: {
    verified: number
    pending: number
    failed: number
  }
}

export function useEnhancedChecklist(checklistId: string) {
  const [checklist, setChecklist] = useState<EnhancedChecklistData | null>(null)
  const [stats, setStats] = useState<ChecklistStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  const supabase = createClient()

  const fetchChecklistData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch complete checklist data
      const { data: checklistData, error: checklistError } = await supabase
        .from('interactive_checklists')
        .select(`
          *,
          checklist_items (*),
          checklist_relationships (
            *,
            client_profiles (*)
          )
        `)
        .eq('id', checklistId)
        .single()

      if (checklistError) throw checklistError

      // Fetch verifications
      const { data: verifications, error: verificationsError } = await supabase
        .from('checklist_verifications')
        .select('*')
        .eq('checklist_id', checklistId)

      if (verificationsError) throw verificationsError

      // Transform data
      const enhancedData: EnhancedChecklistData = {
        ...checklistData,
        client_profile: checklistData.checklist_relationships?.[0]?.client_profiles || undefined,
        verifications: verifications || [],
        relationships: checklistData.checklist_relationships || []
      }

      setChecklist(enhancedData)
      calculateStats(enhancedData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [checklistId, supabase])

  const calculateStats = useCallback((data: EnhancedChecklistData) => {
    const items = data.checklist_items
    const completedItems = items.filter(item => item.is_completed)
    
    // Category stats
    const categories: { [key: string]: { total: number; completed: number; percentage: number } } = {}
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { total: 0, completed: 0, percentage: 0 }
      }
      categories[item.category].total++
      if (item.is_completed) {
        categories[item.category].completed++
      }
    })
    
    Object.keys(categories).forEach(cat => {
      categories[cat].percentage = Math.round(
        (categories[cat].completed / categories[cat].total) * 100
      )
    })

    // Priority stats
    const priorities = {
      critical: items.filter(item => item.priority === 'critical').length,
      high: items.filter(item => item.priority === 'high').length,
      medium: items.filter(item => item.priority === 'medium').length,
      low: items.filter(item => item.priority === 'low').length
    }

    // Verification stats
    const verifications = data.verifications
    const verification_status = {
      verified: verifications.filter(v => v.status === 'passed').length,
      pending: verifications.filter(v => v.status === 'pending').length,
      failed: verifications.filter(v => v.status === 'failed').length
    }

    const statsData: ChecklistStats = {
      total_items: items.length,
      completed_items: completedItems.length,
      progress_percentage: items.length > 0 ? Math.round((completedItems.length / items.length) * 100) : 0,
      categories,
      priorities,
      verification_status
    }

    setStats(statsData)
  }, [])

  const toggleItem = useCallback(async (itemId: string) => {
    if (!checklist) return

    const item = checklist.checklist_items.find(i => i.id === itemId)
    if (!item) return

    try {
      const { error } = await supabase
        .from('checklist_items')
        .update({
          is_completed: !item.is_completed,
          completed_at: !item.is_completed ? new Date().toISOString() : null,
          completed_by: !item.is_completed ? (await supabase.auth.getUser()).data.user?.id : null
        })
        .eq('id', itemId)

      if (error) throw error

      // Refresh data
      await fetchChecklistData()
    } catch (err: any) {
      setError(err.message)
    }
  }, [checklist, supabase, fetchChecklistData])

  const updateItemNotes = useCallback(async (itemId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('checklist_items')
        .update({ notes })
        .eq('id', itemId)

      if (error) throw error

      // Update local state
      if (checklist) {
        const updatedItems = checklist.checklist_items.map(item =>
          item.id === itemId ? { ...item, notes } : item
        )
        setChecklist({ ...checklist, checklist_items: updatedItems })
      }
    } catch (err: any) {
      setError(err.message)
    }
  }, [checklist, supabase])

  const addVerification = useCallback(async (
    itemId: string,
    verificationType: string,
    status: string,
    details: any = {}
  ) => {
    try {
      const { error } = await supabase
        .from('checklist_verifications')
        .insert({
          checklist_id: checklistId,
          item_id: itemId,
          verification_type: verificationType,
          status,
          details,
          verified_at: new Date().toISOString()
        })

      if (error) throw error

      // Refresh data
      await fetchChecklistData()
    } catch (err: any) {
      setError(err.message)
    }
  }, [checklistId, supabase, fetchChecklistData])

  const exportData = useCallback(async () => {
    if (!checklist || !stats) return null

    const exportData = {
      checklist: {
        id: checklist.id,
        title: checklist.title,
        description: checklist.description,
        status: checklist.status,
        progress: stats.progress_percentage,
        created_at: checklist.created_at,
        estimated_time: checklist.estimated_time_minutes
      },
      client_profile: checklist.client_profile ? {
        business_type: checklist.client_profile.business_type,
        industry: checklist.client_profile.industry,
        company_size: checklist.client_profile.company_size,
        primary_goals: checklist.client_profile.primary_goals,
        pain_points: checklist.client_profile.pain_points
      } : null,
      items: checklist.checklist_items.map(item => ({
        category: item.category,
        title: item.title,
        description: item.description,
        priority: item.priority,
        completed: item.is_completed,
        completed_at: item.completed_at,
        notes: item.notes,
        estimated_minutes: item.estimated_minutes,
        actual_minutes: item.actual_minutes
      })),
      stats,
      verifications: checklist.verifications.map(v => ({
        item_id: v.item_id,
        type: v.verification_type,
        status: v.status,
        score: v.score,
        verified_at: v.verified_at
      })),
      generated_at: new Date().toISOString()
    }

    return exportData
  }, [checklist, stats])

  // Real-time subscription
  useEffect(() => {
    if (!checklistId) return

    const newChannel = supabase
      .channel(`checklist-${checklistId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'checklist_items',
          filter: `checklist_id=eq.${checklistId}`
        },
        () => {
          fetchChecklistData()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'checklist_verifications',
          filter: `checklist_id=eq.${checklistId}`
        },
        () => {
          fetchChecklistData()
        }
      )
      .subscribe()

    setChannel(newChannel)

    return () => {
      newChannel.unsubscribe()
    }
  }, [checklistId, supabase, fetchChecklistData])

  // Initial load
  useEffect(() => {
    if (checklistId) {
      fetchChecklistData()
    }
  }, [checklistId, fetchChecklistData])

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
      refresh: fetchChecklistData
    }
  }
}

// Hook for client profiles
export function useClientProfiles() {
  const [profiles, setProfiles] = useState<ClientProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('client_profiles')
        .select(`
          *,
          clients (name, email, phone)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProfiles(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const createProfile = useCallback(async (clientId: string, profileData: any) => {
    try {
      const { data, error } = await supabase
        .rpc('create_client_profile', {
          p_client_id: clientId,
          p_data: profileData
        })

      if (error) throw error
      await fetchProfiles()
      return data
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }, [supabase, fetchProfiles])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  return {
    profiles,
    loading,
    error,
    actions: {
      createProfile,
      refresh: fetchProfiles
    }
  }
}

// Hook for personalized checklist creation
export function usePersonalizedChecklists() {
  const supabase = createClient()

  const createPersonalizedChecklist = useCallback(async (
    clientId: string,
    title?: string
  ) => {
    try {
      const { data: checklistId, error } = await supabase
        .rpc('create_personalized_checklist', {
          p_client_id: clientId,
          p_title: title
        })

      if (error) throw error
      return checklistId
    } catch (err: any) {
      throw new Error(err.message)
    }
  }, [supabase])

  const getClientStats = useCallback(async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_client_stats', {
          p_client_id: clientId
        })

      if (error) throw error
      return data
    } catch (err: any) {
      throw new Error(err.message)
    }
  }, [supabase])

  return {
    createPersonalizedChecklist,
    getClientStats
  }
}