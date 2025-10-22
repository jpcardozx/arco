'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

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
  }, [])

  return useQuery<ClientMetrics>({
    queryKey: ['client-metrics'],
    queryFn: async () => {
      const startTime = performance.now()

      try {
        const { data, error } = await supabase.rpc('get_client_metrics')

        if (error) {
          throw new Error(`Failed to fetch client metrics: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)

        return data as unknown as ClientMetrics
      } catch (err) {
        throw err
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
