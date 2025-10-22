'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface UserTask {
  id: string
  title: string
  description: string | null
  due_date: string
  status: string
  priority: string
  client_id: string | null
  client_name: string | null
  category: string | null
  start_time: string | null
  end_time: string | null
  created_at: string
}

export function useUserTasks(date?: Date) {
  const supabase = getSupabaseClient()
  const targetDate = date || new Date()
  const dateString = targetDate.toISOString().split('T')[0]

  useEffect(() => {
  }, [dateString])

  return useQuery<UserTask[]>({
    queryKey: ['user-tasks', dateString],
    queryFn: async () => {
      const startTime = performance.now()

      try {
        const { data, error } = await supabase.rpc('get_user_tasks', {
          p_date: dateString,
        })

        if (error) {
          throw new Error(`Failed to fetch user tasks: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)
        const tasks = (data as UserTask[]) || []

        return tasks
      } catch (err) {
        throw err
      }
    },
    staleTime: 30 * 1000, // 30 segundos
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
