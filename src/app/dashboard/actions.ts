/**
 * Dashboard Server Actions
 * 
 * @module dashboard/actions
 * @description Supabase-native backend actions with RLS enforcement
 * 
 * @example
 * ```tsx
 * import { getCurrentUser, getUserAnalyses } from '@/app/dashboard/actions'
 * 
 * const user = await getCurrentUser()
 * const analyses = await getUserAnalyses()
 * ```
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'

type Tables = Database['public']['Tables']
type UserProfile = Tables['user_profiles']['Row']
type AnalysisRequest = Tables['analysis_requests']['Row']

// ============================================================================
// AUTH & USER
// ============================================================================

/**
 * Get current authenticated user with profile
 * 
 * @returns User object with profile or null if not authenticated
 * @throws Never throws - returns null on error
 * 
 * @example
 * ```tsx
 * const user = await getCurrentUser()
 * if (!user) return redirect('/login')
 * 
 * console.log(user.profile.tier) // 'free' | 'pro' | 'enterprise'
 * ```
 */
export async function getCurrentUser() {
  const supabase = await createSupabaseServer()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  // Fetch user profile with tier
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single<UserProfile>()

  if (profileError || !profile) {
    return null
  }

  return { ...user, profile }
}

// ============================================================================
// ANALYSIS (Used by dashboard)
// ============================================================================

/**
 * Get all analysis requests for current user
 * 
 * @returns Array of analysis requests with nested results
 * @throws Error if user is not authenticated
 * 
 * @remarks
 * - Results are ordered by creation date (newest first)
 * - Includes related analysis_results through join
 * - RLS automatically filters by user_id
 * 
 * @example
 * ```tsx
 * const analyses = await getUserAnalyses()
 * analyses.forEach(analysis => {
 *   console.log(analysis.url)
 *   console.log(analysis.analysis_results) // nested results
 * })
 * ```
 */
export async function getUserAnalyses() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      *,
      analysis_results (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Get single analysis request
 */
export async function getAnalysisRequest(id: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      *,
      analysis_results (*)
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) throw error
  return data
}

/**
 * Get analysis by ID (for diagnostico page)
 */
export async function getAnalysisById(id: string) {
  return getAnalysisRequest(id)
}

/**
 * Get user projects - stub
 */
export async function getUserProjects() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get user tickets - stub
 */
export async function getUserTickets() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get user files - stub
 */
export async function getUserFiles() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('storage_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get playbooks - stub
 */
export async function getPlaybooks() {
  return [] as Array<{
    id: string
    title: string
    description: string | null
    content: string | null
    category: string
    is_published: boolean | null
    created_at: string
    updated_at: string
  }>
}

/**
 * Get performance metrics for health dashboard - stub
 */
export async function getPerformanceMetrics() {
  return {
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    cpuUsage: 0,
    memoryUsage: 0
  }
}

/**
 * Get uptime data for health dashboard - stub
 */
export async function getUptimeData() {
  return {
    uptime: 0,
    downtime: 0,
    availability: 0,
    incidents: []
  }
}
