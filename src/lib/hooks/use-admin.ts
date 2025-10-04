/**
 * Admin Hooks - Analytics & Audit
 * Hooks para funcionalidades exclusivas de admin
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

// ==================== ADMIN STATS ====================

export interface AdminStats {
  total_users: number
  total_clients: number
  active_clients: number
  total_leads: number
  new_leads: number
  converted_leads: number
  total_tasks: number
  pending_tasks: number
  completed_tasks: number
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('get_admin_stats')

      if (error) {
        console.error('[useAdminStats] Error:', error)
        throw error
      }

      return data as AdminStats
    },
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  })
}

// ==================== CONVERSION METRICS ====================

export interface ConversionMetrics {
  period: string
  new_leads: number
  converted_leads: number
  conversion_rate: number
  avg_conversion_days: number
}

export function useConversionMetrics() {
  return useQuery({
    queryKey: ['conversion-metrics'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('get_conversion_metrics')

      if (error) {
        console.error('[useConversionMetrics] Error:', error)
        throw error
      }

      return data as ConversionMetrics
    },
    refetchInterval: 60000, // Atualiza a cada 1 minuto
  })
}

// ==================== MONTHLY REVENUE ====================

export function useMonthlyRevenue() {
  return useQuery({
    queryKey: ['monthly-revenue'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('get_monthly_revenue')

      if (error) {
        console.error('[useMonthlyRevenue] Error:', error)
        throw error
      }

      return data as number
    },
    refetchInterval: 300000, // Atualiza a cada 5 minutos
  })
}

// ==================== RECENT ACTIVITY ====================

export interface RecentActivity {
  activity_type: string
  description: string
  created_at: string
  user_email: string | null
}

export function useRecentActivity(limit = 10) {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('get_recent_activity', { limit_count: limit })

      if (error) {
        console.error('[useRecentActivity] Error:', error)
        throw error
      }

      return data as RecentActivity[]
    },
    refetchInterval: 15000, // Atualiza a cada 15 segundos
  })
}

// ==================== AUDIT LOG ====================

export interface AuditLogEntry {
  id: string
  user_email: string | null
  user_role: string | null
  action: 'INSERT' | 'UPDATE' | 'DELETE'
  table_name: string
  record_id: string | null
  changed_fields: string[] | null
  created_at: string
}

export function useAuditLog(filters?: {
  table?: string
  action?: string
  userId?: string
  limit?: number
  offset?: number
}) {
  return useQuery({
    queryKey: ['audit-log', filters],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('get_audit_log', {
        filter_table: filters?.table || null,
        filter_action: filters?.action || null,
        filter_user_id: filters?.userId || null,
        limit_count: filters?.limit || 50,
        offset_count: filters?.offset || 0,
      })

      if (error) {
        console.error('[useAuditLog] Error:', error)
        throw error
      }

      return data as AuditLogEntry[]
    },
  })
}

// ==================== RECORD HISTORY ====================

export interface RecordHistory {
  id: string
  user_email: string | null
  action: 'INSERT' | 'UPDATE' | 'DELETE'
  changed_fields: string[] | null
  old_data: any
  new_data: any
  created_at: string
}

export function useRecordHistory(tableName: string, recordId: string) {
  return useQuery({
    queryKey: ['record-history', tableName, recordId],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('get_record_history', {
        p_table_name: tableName,
        p_record_id: recordId,
      })

      if (error) {
        console.error('[useRecordHistory] Error:', error)
        throw error
      }

      return data as RecordHistory[]
    },
    enabled: !!tableName && !!recordId,
  })
}

// ==================== USERS MANAGEMENT ====================

export interface User {
  id: string
  role: 'admin' | 'user' | 'client'
  full_name: string | null
  avatar_url: string | null
  company: string | null
  phone: string | null
  bio: string | null
  timezone: string
  language: string
  email_notifications: boolean
  whatsapp_notifications: boolean
  last_seen_at: string | null
  created_at: string
  updated_at: string
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('[useUsers] Error:', error)
        throw error
      }

      return data as User[]
    },
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'user' | 'client' }) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('[useUpdateUserRole] Error:', error)
        throw error
      }

      return data as User
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Role atualizado com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar role: ${error.message}`)
    },
  })
}

// ==================== CLEANUP AUDIT LOGS ====================

export function useCleanupAuditLogs() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (daysToKeep: number = 90) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase.rpc('cleanup_old_audit_logs', {
        days_to_keep: daysToKeep,
      })

      if (error) {
        console.error('[useCleanupAuditLogs] Error:', error)
        throw error
      }

      return data as number
    },
    onSuccess: (deletedCount) => {
      queryClient.invalidateQueries({ queryKey: ['audit-log'] })
      toast.success(`${deletedCount} logs antigos removidos com sucesso!`)
    },
    onError: (error) => {
      toast.error(`Erro ao limpar logs: ${error.message}`)
    },
  })
}
