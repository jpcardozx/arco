/**
 * useCurrentUser Hook
 * Hook to get current authenticated user with role information
 */

'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface CurrentUser extends User {
  role?: 'admin' | 'user' | 'client'
}

export interface UseCurrentUserReturn {
  user: CurrentUser | null
  loading: boolean
  error: Error | null
}

export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    // Get initial user
    const getUser = async () => {
      try {
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          throw authError
        }

        if (authUser) {
          // Get user role from user metadata
          const role = (authUser.user_metadata?.role || 'user') as 'admin' | 'user' | 'client'
          
          setUser({
            ...authUser,
            role
          })
        } else {
          setUser(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to get user'))
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const role = (session.user.user_metadata?.role || 'user') as 'admin' | 'user' | 'client'
          setUser({
            ...session.user,
            role
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading, error }
}
