/**
 * Diagnostico Server Actions
 * Actions para gerenciar análises de URL (URL Analyzer - CORE do produto)
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/supabase'

type AnalysisRequest = Database['public']['Tables']['analysis_requests']['Row']
type DatabaseAnalysisResult = Database['public']['Tables']['analysis_results']['Row']

export interface Analysis {
  id: string
  url: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  arco_index: number | null
  error_message: string | null
  created_at: string
  results: AnalysisResultInterface | null
}

export interface AnalysisResultInterface {
  id: string
  analysis_id: string
  // Performance metrics
  lcp: number | null
  fid: number | null
  cls: number | null
  lighthouse_performance: number | null
  // Accessibility
  lighthouse_accessibility: number | null
  // SEO
  lighthouse_seo: number | null
  // Security
  security_score: number | null
  // Best practices
  lighthouse_best_practices: number | null
  // Raw data
  raw_data?: any
  // Timestamps
  created_at: string
}

/**
 * Busca todas as análises do usuário
 */
export async function getAnalyses() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  type AnalysisWithResults = AnalysisRequest & {
    analysis_results: AnalysisResult[]
  }

  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      *,
      analysis_results (*)
    `)
    .order('created_at', { ascending: false })
    .returns<AnalysisWithResults[]>()

  if (error) throw error

  return (data || []).map(analysis => ({
    id: analysis.id,
    url: analysis.url,
    status: analysis.status as Analysis['status'],
    arco_index: analysis.arco_index,
    error_message: analysis.error_message,
    created_at: analysis.created_at,
    results: (analysis.analysis_results?.[0] as DatabaseAnalysisResult) || null,
  }))
}

/**
 * Busca uma análise específica por ID
 */
export async function getAnalysisById(id: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  type AnalysisWithResults = AnalysisRequest & {
    analysis_results: AnalysisResult[]
  }

  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      *,
      analysis_results (*)
    `)
    .eq('id', id)
    .single<AnalysisWithResults>()

  if (error) throw error

  return {
    id: data.id,
    url: data.url,
    status: data.status as Analysis['status'],
    arco_index: data.arco_index,
    error_message: data.error_message,
    created_at: data.created_at,
    results: (data.analysis_results?.[0] as DatabaseAnalysisResult) || null,
  }
}

/**
 * Cria uma nova análise de URL
 * Dispara webhook/edge function para processar
 */
export async function createAnalysis(url: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Validar URL
  try {
    new URL(url)
  } catch {
    throw new Error('Invalid URL format')
  }

  // Criar análise
  const { data, error } = await supabase
    .from('analysis_requests')
    .insert({
      user_id: user.id,
      url,
      status: 'pending' as const,
    })
    .select()
    .single<AnalysisRequest>()

  if (error) throw error

  revalidatePath('/dashboard/diagnostico')

  return {
    id: data.id,
    url: data.url,
    status: data.status,
    arco_index: data.arco_index,
    error_message: data.error_message,
    created_at: data.created_at,
    results: null,
  } as Analysis
}

/**
 * Deleta uma análise
 */
export async function deleteAnalysis(id: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('analysis_requests')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/dashboard/diagnostico')
}

/**
 * Retorna estatísticas das análises
 */
export async function getAnalysisStats() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const analyses = await getAnalyses()

  const stats = {
    total: analyses.length,
    completed: analyses.filter(a => a.status === 'completed').length,
    pending: analyses.filter(a => a.status === 'pending').length,
    failed: analyses.filter(a => a.status === 'failed').length,
    avg_arco_index: 0,
  }

  const completedWithIndex = analyses.filter(a => a.arco_index !== null)
  if (completedWithIndex.length > 0) {
    stats.avg_arco_index = Math.round(
      completedWithIndex.reduce((sum, a) => sum + (a.arco_index || 0), 0) / completedWithIndex.length
    )
  }

  return stats
}
