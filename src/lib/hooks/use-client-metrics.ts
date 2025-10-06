'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { dashboardLogger } from '@/lib/utils/dashboard-logger'

interface ClientMetrics {
  leads_generated: number
  conversions: number
  conversion_rate: number
  page_views: number
  period: string
}

export function useClientMetrics() {
  const supabase = getSupabaseClient()

  useEffect(() => {
    dashboardLogger.logHookMount('useClientMetrics')
    return () => dashboardLogger.logHookUnmount('useClientMetrics')
  }, [])

  return useQuery<ClientMetrics>({
    queryKey: ['client-metrics'],
    queryFn: async () => {
      const startTime = performance.now()
      dashboardLogger.logQuery(['client-metrics'], 'loading')

      try {
        const { data, error } = await supabase.rpc('get_client_metrics')

        if (error) {
          dashboardLogger.logQuery(['client-metrics'], 'error', undefined, error)
          throw new Error(`Failed to fetch client metrics: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)
        dashboardLogger.logQuery(['client-metrics'], 'success', data)
        dashboardLogger.success('useClientMetrics', `Data fetched in ${duration}ms`, data)

        return data as unknown as ClientMetrics
      } catch (err) {
        dashboardLogger.error('useClientMetrics', 'Query failed', err)
        throw err
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
