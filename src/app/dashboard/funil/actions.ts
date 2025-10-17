/**
 * Funnel Server Actions
 * Actions para gerenciar leads no funil de vendas
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/database.types'

type Lead = Database['public']['Tables']['leads']['Row']

export async function getFunnelLeads() {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  
  return (data || []).map(lead => ({
    id: lead.id,
    name: lead.full_name || 'Sem nome',
    email: lead.email,
    phone: lead.phone || '',
    source: mapSource(lead.source),
    stage: mapStage(lead.status),
    score: calculateScore(lead),
    budget_min: 0,
    budget_max: 0,
    property_type: 'apartment' as const,
    location_preference: '',
    last_contact: lead.updated_at,
    created_at: lead.created_at,
    notes: '',
    priority: 'medium' as const,
    probability: 50,
    expected_close_date: '',
    assigned_to: lead.assigned_to || '',
    activities_count: 0,
    value_potential: 0,
  }))
}

export async function updateLeadStage(leadId: string, newStage: string) {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const status = mapStageToStatus(newStage)

  const { error } = await supabase
    .from('leads')
    .update({ 
      status,
      updated_at: new Date().toISOString() 
    })
    .eq('id', leadId)

  if (error) throw error
  
  revalidatePath('/dashboard/funil')
}

export async function getFunnelStats() {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: leads, error } = await supabase
    .from('leads')
    .select('status')

  if (error) throw error

  const stats = [
    { stage: 'captacao', count: 0, value: 0, conversion_rate: 0, avg_time_in_stage: 5 },
    { stage: 'qualificacao', count: 0, value: 0, conversion_rate: 0, avg_time_in_stage: 7 },
    { stage: 'negociacao', count: 0, value: 0, conversion_rate: 0, avg_time_in_stage: 10 },
    { stage: 'fechamento', count: 0, value: 0, conversion_rate: 0, avg_time_in_stage: 3 },
  ]

  leads.forEach(lead => {
    const stage = mapStageFromStatus(lead.status)
    const stageIndex = stats.findIndex(s => s.stage === stage)
    if (stageIndex !== -1) {
      stats[stageIndex].count++
    }
  })

  return stats
}

// Helper functions
function mapSource(source: string | null): 'website' | 'facebook' | 'instagram' | 'whatsapp' | 'referral' | 'cold_call' {
  const sourceMap: Record<string, any> = {
    'website': 'website',
    'landing_page': 'website',
    'facebook': 'facebook',
    'instagram': 'instagram',
    'whatsapp': 'whatsapp',
    'referral': 'referral',
    'indicacao': 'referral',
  }
  return sourceMap[source || ''] || 'website'
}

function mapStage(status: string): 'captacao' | 'qualificacao' | 'negociacao' | 'fechamento' {
  const stageMap: Record<string, any> = {
    'new': 'captacao',
    'contacted': 'qualificacao',
    'qualified': 'qualificacao',
    'proposal': 'negociacao',
    'negotiation': 'negociacao',
    'closed_won': 'fechamento',
  }
  return stageMap[status] || 'captacao'
}

function mapStageToStatus(stage: string): string {
  const statusMap: Record<string, string> = {
    'captacao': 'new',
    'qualificacao': 'qualified',
    'negociacao': 'negotiation',
    'fechamento': 'closed_won',
  }
  return statusMap[stage] || 'new'
}

function mapStageFromStatus(status: string): string {
  return mapStage(status)
}

function calculateScore(lead: any): number {
  let score = 50
  if (lead.email) score += 20
  if (lead.phone) score += 20
  if (lead.company_name) score += 10
  return Math.min(100, score)
}
