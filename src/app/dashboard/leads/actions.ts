/**
 * Leads Server Actions
 * Actions para gerenciar leads do CRM
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface LeadData {
  id: string
  full_name: string | null
  email: string
  phone: string | null
  company_name: string | null
  source: string | null
  status: string
  assigned_to: string | null
  analysis_id: string | null
  created_at: string
  updated_at: string
}

export interface LeadStats {
  total: number
  new: number
  contacted: number
  qualified: number
  converted: number
  avgConversionTime: number
}

/**
 * Busca todos os leads do usuário
 */
export async function getLeads() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []) as LeadData[]
}

/**
 * Busca lead por ID
 */
export async function getLeadById(id: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  return data as LeadData
}

/**
 * Cria novo lead
 */
export async function createLead(leadData: {
  full_name?: string | null
  email: string
  phone?: string | null
  company_name?: string | null
  source?: string | null
  status?: string
  analysis_id?: string | null
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('leads')
    .insert({
      ...leadData,
      status: leadData.status || 'new',
      assigned_to: user.id,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard/funil')

  return data as LeadData
}

/**
 * Atualiza lead
 */
export async function updateLead(id: string, updates: Partial<LeadData>) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard/funil')

  return data as LeadData
}

/**
 * Deleta lead
 */
export async function deleteLead(id: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard/funil')
}

/**
 * Retorna estatísticas dos leads
 */
export async function getLeadStats(): Promise<LeadStats> {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const leads = await getLeads()

  const stats: LeadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    avgConversionTime: 0,
  }

  // Calculate avg conversion time (simplified)
  const convertedLeads = leads.filter(l => l.status === 'converted')
  if (convertedLeads.length > 0) {
    const totalDays = convertedLeads.reduce((sum, lead) => {
      const created = new Date(lead.created_at)
      const updated = new Date(lead.updated_at)
      const days = Math.floor((updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
      return sum + days
    }, 0)
    stats.avgConversionTime = Math.round(totalDays / convertedLeads.length)
  }

  return stats
}

/**
 * Atualiza status do lead
 */
export async function updateLeadStatus(id: string, status: string) {
  return updateLead(id, { status })
}

/**
 * Atribui lead a um usuário
 */
export async function assignLead(id: string, userId: string) {
  return updateLead(id, { assigned_to: userId })
}
