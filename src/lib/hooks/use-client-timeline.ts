'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface TimelineEvent {
  id: string
  type: 'milestone' | 'document' | 'call' | 'message' | 'payment' | 'meeting' | 'email'
  title: string
  description: string
  timestamp: string
  metadata?: {
    table?: string
    action?: string
    status?: string | 'completed' | 'pending' | 'cancelled'
    amount?: number
    participants?: string[]
    [key: string]: any
  }
}

export function useClientTimeline(limit = 50) {
  const supabase = getSupabaseClient()

  useEffect(() => {
  }, [limit])

  return useQuery<TimelineEvent[]>({
    queryKey: ['client-timeline', limit],
    queryFn: async () => {
      const startTime = performance.now()

      try {
        const { data, error } = await supabase.rpc('get_client_timeline', {
          p_limit: limit,
        })

        if (error) {
          throw new Error(`Failed to fetch client timeline: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)
        const events = data ? (data as unknown as TimelineEvent[]) : []

        return events
      } catch (err) {
        throw err
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
