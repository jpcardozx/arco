'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

interface UserStats {
  my_leads: number
  new_today: number
  my_tasks: number
  urgent_tasks: number
  appointments_today: number
  conversions_month: number
}

export function useUserStats() {
  const supabase = getSupabaseClient()

  useEffect(() => {
  }, [])

  return useQuery<UserStats>({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const startTime = performance.now()

      try {
        const { data, error } = await supabase.rpc('get_user_stats')

        if (error) {
          throw new Error(`Failed to fetch user stats: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)

        return data as unknown as UserStats
      } catch (err) {
        throw err
      }
    },
    staleTime: 60 * 1000, // 1 minuto
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
