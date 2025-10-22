'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface DashboardUser extends User {
  tier?: 'free' | 'paid' | 'admin'
  full_name?: string
  avatar_url?: string
  company_name?: string
}

interface UseDashboardUserReturn {
  user: DashboardUser | null
  loading: boolean
  error: Error | null
  refreshUser: () => Promise<void>
  updateProfile: (updates: Partial<DashboardUser>) => Promise<void>
}

export function useDashboardUser(): UseDashboardUserReturn {
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const supabase = getSupabaseClient()

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get current user from Supabase Auth
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

      if (authError) {
        throw authError
      }

      if (!authUser) {
        setUser(null)
        return
      }

      // Fetch additional profile data
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is ok for new users
        console.warn('Profile fetch error:', profileError)
      }

      // Merge auth user with profile data
      const dashboardUser: DashboardUser = {
        ...authUser,
        tier: (profile as any)?.tier || 'free',
        full_name: (profile as any)?.full_name || authUser.user_metadata?.full_name,
        avatar_url: (profile as any)?.avatar_url || authUser.user_metadata?.avatar_url,
        company_name: (profile as any)?.company_name,
      }

      setUser(dashboardUser)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch user')
      setError(error)
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<DashboardUser>) => {
    if (!user) return

    try {
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        } as any)

      if (updateError) throw updateError

      // Refresh user data
      await fetchUser()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update profile')
      console.error('Failed to update profile:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await fetchUser()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    loading,
    error,
    refreshUser: fetchUser,
    updateProfile,
  }
}
