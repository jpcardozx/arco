/**
 * Dashboard Server Actions
 * Supabase-native backend - read operations with RLS enforcement
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/database.types'

type Tables = Database['public']['Tables']
type AnalysisRequest = Tables['analysis_requests']['Row']
type AnalysisResult = Tables['analysis_results']['Row']
type Project = Tables['projects']['Row']
type SupportTicket = Tables['support_tickets']['Row']
type StorageItem = Tables['storage_items']['Row']
type UserProfile = Tables['user_profiles']['Row']

// ============================================================================
// AUTH & USER
// ============================================================================

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
    .single() as { data: UserProfile | null; error: any }

  if (profileError || !profile) {
    return null
  }

  return { ...user, profile }
}

// ============================================================================
// ANALYSIS (Free + Paid)
// ============================================================================

export async function getUserAnalyses() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      *,
      analysis_results (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (AnalysisRequest & { analysis_results: AnalysisResult[] })[]
}

export async function getAnalysisById(id: string) {
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
  return data as AnalysisRequest & { analysis_results: AnalysisResult[] }
}

export async function createAnalysisRequest(url: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user || !user.profile) throw new Error('Unauthorized')

  // Check quota (free users: 3/month)
  if (user.profile.tier === 'free') {
    const { count } = await supabase
      .from('analysis_requests')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', new Date(new Date().setDate(1)).toISOString()) // This month
    
    if (count && count >= 3) {
      throw new Error('Monthly quota exceeded. Upgrade to paid plan.')
    }
  }

  const { data, error } = await supabase
    .from('analysis_requests')
    .insert({
      user_id: user.id,
      url,
      status: 'pending' as const,
    })
    .select()
    .single() as { data: AnalysisRequest | null; error: any }

  if (error) throw error
  
  revalidatePath('/dashboard/diagnostico')
  return data
}

export async function deleteAnalysis(id: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('analysis_requests')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error
  
  revalidatePath('/dashboard/diagnostico')
}

// ============================================================================
// PERFORMANCE METRICS (Paid only)
// ============================================================================

export async function getPerformanceMetrics(url: string, days = 7) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user || !user.profile) throw new Error('Unauthorized')
  if (user.profile.tier === 'free') throw new Error('Paid feature only')

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('performance_metrics')
    .select('*')
    .eq('url', url)
    .gte('measured_at', startDate.toISOString())
    .order('measured_at', { ascending: true })

  if (error) throw error
  return data
}

export async function getARCOIndexHistory(days = 7) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user || !user.profile) throw new Error('Unauthorized')
  if (user.profile.tier === 'free') throw new Error('Paid feature only')

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('analysis_results')
    .select(`
      arco_index,
      performance_score,
      security_score,
      seo_score,
      accessibility_score,
      created_at,
      analysis_requests!inner(url)
    `)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

// ============================================================================
// UPTIME MONITORING (Paid only)
// ============================================================================

export async function getUptimeData(url: string, hours = 24) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user || !user.profile) throw new Error('Unauthorized')
  if (user.profile.tier === 'free') throw new Error('Paid feature only')

  const startTime = new Date()
  startTime.setHours(startTime.getHours() - hours)

  const { data, error } = await supabase
    .from('uptime_checks')
    .select('*')
    .eq('url', url)
    .gte('checked_at', startTime.toISOString())
    .order('checked_at', { ascending: true })

  if (error) throw error
  return data
}

// ============================================================================
// DOMAIN HEALTH (Paid only)
// ============================================================================

export async function getDomainHealth(url: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user || !user.profile) throw new Error('Unauthorized')
  if (user.profile.tier === 'free') throw new Error('Paid feature only')

  const { data, error } = await supabase
    .from('domain_monitoring')
    .select('*')
    .eq('url', url)
    .order('checked_at', { ascending: false })
    .limit(1)
    .single()

  if (error) throw error
  return data
}

// ============================================================================
// PROJECTS (Paid only)
// ============================================================================

export async function getUserProjects() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_milestones(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateMilestone(milestoneId: string, completed: boolean) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  type ProjectMilestoneUpdate = Tables['project_milestones']['Update']
  const updateData: ProjectMilestoneUpdate = { completed }
  const { error } = await supabase
    .from('project_milestones')
    .update(updateData)
    .eq('id', milestoneId)

  if (error) throw error
  
  revalidatePath('/dashboard/operacoes')
}

// ============================================================================
// SUPPORT TICKETS
// ============================================================================

export async function getUserTickets() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('support_tickets')
    .select(`
      *,
      support_ticket_messages(*)
    `)
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createTicket(data: { subject: string; description: string; priority: string }) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .insert({
      client_id: user.id,
      subject: data.subject,
      description: data.subject,
      priority: data.priority,
      status: 'open' as const,
    })
    .select()
    .single() as { data: SupportTicket | null; error: any }

  if (error) throw error
  
  revalidatePath('/dashboard/operacoes')
  return ticket
}

export async function sendTicketMessage(ticketId: string, content: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('support_ticket_messages')
    .insert({
      ticket_id: ticketId,
      author_id: user.id,
      message: content,
    })

  if (error) throw error
  
  revalidatePath('/dashboard/operacoes')
}

// ============================================================================
// STORAGE (Paid only)
// ============================================================================

export async function getUserFiles() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('storage_items')
    .select('*')
    .eq('uploaded_by', user.id)
    .order('uploaded_at', { ascending: false })

  if (error) throw error
  return data
}

export async function deleteFile(fileId: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  // Get file path
  const { data: file, error: fetchError } = await supabase
    .from('storage_items')
    .select('file_path')
    .eq('id', fileId)
    .eq('uploaded_by', user.id)
    .single() as { data: Pick<StorageItem, 'file_path'> | null; error: any }

  if (fetchError || !file) throw new Error('File not found')

  // Delete from storage
  await supabase.storage.from('user-files').remove([file.file_path])

  // Delete from database
  const { error } = await supabase
    .from('storage_items')
    .delete()
    .eq('id', fileId)
    .eq('uploaded_by', user.id)

  if (error) throw error
  
  revalidatePath('/dashboard/operacoes')
}

export async function getStorageQuota() {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user || !user.profile) throw new Error('Unauthorized')

  const { data: files } = await supabase
    .from('storage_items')
    .select('size_bytes')
    .eq('client_id', user.id) as { data: Pick<StorageItem, 'size_bytes'>[] | null; error: any }

  const usedBytes = files?.reduce((sum, f) => sum + (f.size_bytes || 0), 0) || 0
  const usedMB = usedBytes / (1024 * 1024)
  const limitMB = user.profile.tier === 'paid' ? 5000 : 100 // 5GB for paid, 100MB for free (in MB)

  return { used: usedMB, limit: limitMB, percentage: limitMB > 0 ? (usedMB / limitMB) * 100 : 0 }
}

// ============================================================================
// PLAYBOOKS (Free + Paid)
// ============================================================================

export async function getPlaybooks(filters?: { category?: string; impact?: string }) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  if (!user) throw new Error('Unauthorized')

  let query = supabase
    .from('playbooks')
    .select('*')
    .order('impact_score', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
