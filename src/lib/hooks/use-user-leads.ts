'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { dashboardLogger } from '@/lib/utils/dashboard-logger'

export interface UserLead {
  id: string
  email: string
  name: string | null
  phone: string | null
  source: string | null
  status: string
  metadata: Record<string, unknown> | null
  client_id: string | null
  client_name: string | null
  client_company: string | null
  created_at: string
  updated_at: string
}

export function useUserLeads(limit = 10) {
  const supabase = getSupabaseClient()

  useEffect(() => {
    dashboardLogger.logHookMount('useUserLeads', { limit })
    return () => dashboardLogger.logHookUnmount('useUserLeads')
  }, [limit])

  return useQuery<UserLead[]>({
    queryKey: ['user-leads', limit],
    queryFn: async () => {
      const startTime = performance.now()
      dashboardLogger.logQuery(['user-leads'], 'loading')

      try {
        const { data, error } = await supabase.rpc('get_user_leads', {
          p_limit: limit,
        })

        if (error) {
          dashboardLogger.logQuery(['user-leads'], 'error', undefined, error)
          throw new Error(`Failed to fetch user leads: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)
        const leads = (data as UserLead[]) || []
        dashboardLogger.logQuery(['user-leads'], 'success', { count: leads.length })
        dashboardLogger.success('useUserLeads', `Fetched ${leads.length} leads in ${duration}ms`)

        return leads
      } catch (err) {
        dashboardLogger.error('useUserLeads', 'Query failed', err)
        throw err
      }
    },
    staleTime: 60 * 1000, // 1 minuto
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
