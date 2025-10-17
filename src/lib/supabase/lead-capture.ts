/**
 * Lead Capture System - Supabase Integration
 * 
 * Sistema completo para captura de leads com:
 * - Tracking de origem (UTM params, referrer)
 * - Enriquecimento automático de dados
 * - Integração com Supabase Auth para conversão lead → user
 * - Webhooks para notificações
 */

import { createSupabaseBrowserClient } from './client'
import type { Database } from '@/types/database.types'

type Lead = Database['public']['Tables']['leads']['Insert']

export interface LeadCaptureData {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  
  // Tracking automático
  source?: string        // 'landing', 'blog', 'organic', 'paid'
  medium?: string        // 'cpc', 'email', 'social'
  campaign?: string      // Nome da campanha
  referrer?: string      // URL de origem
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  
  // Lead magnet / Tripwire
  lead_magnet?: string   // 'ebook-seo', 'calculator-roi', 'audit-free'
  interest?: string      // 'seo', 'ads', 'web-design'
}

export interface LeadCaptureOptions {
  autoEnrich?: boolean   // Enriquecer dados automaticamente
  sendNotification?: boolean  // Enviar notificação para time
  assignTo?: string      // ID do usuário responsável
  tags?: string[]        // Tags para segmentação
}

/**
 * Captura lead e salva no Supabase
 * Com tracking completo e enriquecimento automático
 */
export async function captureLead(
  data: LeadCaptureData,
  options: LeadCaptureOptions = {}
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const supabase = createSupabaseBrowserClient()
    
    // Enriquecer dados automaticamente
    const enrichedData = options.autoEnrich ? await enrichLeadData(data) : data
    
    // Preparar dados para inserção
    const leadData = {
      full_name: enrichedData.name || null,
      email: enrichedData.email,
      phone: enrichedData.phone || null,
      // company: formData.company,
      // message: enrichedData.message || null,
      
      // Tracking
      source: enrichedData.source || captureSource(),
      // campaign: enrichedData.campaign || extractUTM('utm_campaign'),
      // referrer: enrichedData.referrer || captureReferrer(),
      
      // Metadata
      metadata: {
        utm_source: enrichedData.utm_source || extractUTM('utm_source'),
        utm_medium: enrichedData.utm_medium || extractUTM('utm_medium'),
        utm_campaign: enrichedData.utm_campaign || extractUTM('utm_campaign'),
        utm_content: enrichedData.utm_content || extractUTM('utm_content'),
        utm_term: enrichedData.utm_term || extractUTM('utm_term'),
        lead_magnet: enrichedData.lead_magnet,
        interest: enrichedData.interest,
        tags: options.tags || [],
        captured_at: new Date().toISOString(),
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        screen_resolution: typeof window !== 'undefined' 
          ? `${window.screen.width}x${window.screen.height}` 
          : null,
      },
      
      // Status inicial
      status: 'new',
      // quality_score: calculateQualityScore(enrichedData),
      
      // Atribuição
      // user_id: options.assignTo || null,
    }
    
    // Inserir lead no Supabase
    const { data: insertedLead, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select('id')
      .single()
    
    if (error) {
      console.error('[Lead Capture] Error inserting lead:', error)
      return { success: false, error: error.message }
    }
    
    // Notificar time (webhook, email, etc)
    if (options.sendNotification && insertedLead) {
      await notifyTeam(insertedLead.id, leadData)
    }
    
    // Trigger eventos customizados (analytics, etc)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('leadCaptured', {
        detail: { leadId: insertedLead.id, email: leadData.email }
      }))
    }
    
    return { success: true, leadId: insertedLead.id }
    
  } catch (error) {
    console.error('[Lead Capture] Unexpected error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Converte lead em usuário autenticado
 * Útil quando lead faz signup após baixar lead magnet
 */
export async function convertLeadToUser(
  leadId: string,
  password: string
): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    const supabase = createSupabaseBrowserClient()
    
    // Buscar dados do lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single()
    
    if (leadError || !lead) {
      return { success: false, error: 'Lead não encontrado' }
    }
    
    // Criar conta de usuário
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: lead.email,
      password: password,
      options: {
        data: {
          full_name: lead.full_name || lead.email,
          phone: lead.phone,
          company: lead.company_name || null,
          converted_from_lead: leadId,
          lead_source: lead.source,
        },
      },
    })
    
    if (signUpError) {
      return { success: false, error: signUpError.message }
    }
    
    // Atualizar lead com status de conversão
    await supabase
      .from('leads')
      .update({
        status: 'converted',
        converted_at: new Date().toISOString(),
        user_id: authData.user?.id,
      })
      .eq('id', leadId)
    
    return { success: true, userId: authData.user?.id }
    
  } catch (error) {
    console.error('[Lead Conversion] Error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Hook up lead existente com sessão autenticada
 * Quando usuário já existe mas queremos vincular lead magnet download
 */
export async function linkLeadToUser(leadId: string, userId: string) {
  const supabase = createSupabaseBrowserClient()
  
  const { error } = await supabase
    .from('leads')
    .update({ 
      user_id: userId,
      status: 'qualified',
    })
    .eq('id', leadId)
  
  if (error) {
    console.error('[Lead Link] Error linking lead to user:', error)
    throw error
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Enriquece dados do lead automaticamente
 * (IP lookup, company enrichment, etc)
 */
async function enrichLeadData(data: LeadCaptureData): Promise<LeadCaptureData> {
  // TODO: Integrar com APIs de enriquecimento
  // - Clearbit, Hunter.io, etc
  // - IP geolocation
  // - Email validation
  
  return {
    ...data,
    // Exemplo: adicionar cidade/estado baseado em IP
    // location: await getLocationFromIP(),
  }
}

/**
 * Calcula score de qualidade do lead (0-100)
 */
function calculateQualityScore(data: LeadCaptureData): number {
  let score = 0
  
  // Email corporativo (+30 pontos)
  if (data.email && !data.email.match(/@(gmail|hotmail|yahoo|outlook)\./i)) {
    score += 30
  }
  
  // Telefone fornecido (+20 pontos)
  if (data.phone) {
    score += 20
  }
  
  // Empresa fornecida (+20 pontos)
  if (data.company) {
    score += 20
  }
  
  // Mensagem detalhada (+15 pontos)
  if (data.message && data.message.length > 50) {
    score += 15
  }
  
  // Origem qualificada (+15 pontos)
  if (data.source === 'organic' || data.campaign) {
    score += 15
  }
  
  return Math.min(score, 100)
}

/**
 * Captura fonte de tráfego automaticamente
 */
function captureSource(): string {
  if (typeof window === 'undefined') return 'direct'
  
  const referrer = document.referrer
  const hasUTM = window.location.search.includes('utm_')
  
  if (hasUTM) return 'campaign'
  if (!referrer) return 'direct'
  if (referrer.includes('google')) return 'organic-google'
  if (referrer.includes('facebook')) return 'social-facebook'
  if (referrer.includes('linkedin')) return 'social-linkedin'
  
  return 'referral'
}

/**
 * Captura referrer completo
 */
function captureReferrer(): string | null {
  if (typeof window === 'undefined') return null
  return document.referrer || null
}

/**
 * Extrai parâmetro UTM da URL
 */
function extractUTM(param: string): string | null {
  if (typeof window === 'undefined') return null
  
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

/**
 * Notifica time sobre novo lead
 */
async function notifyTeam(leadId: string, leadData: Lead) {
  // TODO: Implementar notificação
  // - Webhook para Slack/Discord
  // - Email para vendedor responsável
  // - Push notification no dashboard
  
  console.log('[Lead Capture] New lead captured:', { leadId, email: leadData.email })
}

// ============================================================================
// REACT HOOKS
// ============================================================================

import { useState } from 'react'

export function useLeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const capture = async (
    data: LeadCaptureData,
    options?: LeadCaptureOptions
  ) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const result = await captureLead(data, options)
      
      if (!result.success) {
        setError(result.error || 'Erro ao capturar lead')
        return result
      }
      
      return result
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return {
    capture,
    isSubmitting,
    error,
  }
}
