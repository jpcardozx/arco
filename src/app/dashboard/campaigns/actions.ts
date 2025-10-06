/**
 * Campaigns Server Actions
 * Actions para gerenciar campanhas de marketing
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCampaigns() {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  
  return (data || []).map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    type: mapPlatformToType(campaign.platform),
    status: mapStatus(campaign.status),
    budget: campaign.budget_total || 0,
    spent: 0, // Will calculate from metrics
    impressions: 0,
    clicks: 0,
    leads: 0,
    conversions: 0,
    start_date: campaign.start_date || new Date().toISOString(),
    end_date: campaign.end_date || new Date().toISOString(),
    target_audience: '',
    created_at: campaign.created_at,
  }))
}

export async function getCampaignMetrics(campaignId: string) {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('campaign_metrics')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('date', { ascending: false })
    .limit(30)

  if (error) throw error
  
  // Aggregate metrics
  const totals = (data || []).reduce((acc, metric) => ({
    impressions: acc.impressions + (metric.impressions || 0),
    clicks: acc.clicks + (metric.clicks || 0),
    conversions: acc.conversions + (metric.conversions || 0),
    cost: acc.cost + (metric.cost || 0),
  }), { impressions: 0, clicks: 0, conversions: 0, cost: 0 })
  
  return totals
}

export async function createCampaign(campaignData: any) {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get user's client_id from profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      client_id: profile?.id || user.id,
      name: campaignData.name,
      platform: campaignData.type || 'other',
      budget_total: campaignData.budget || 0,
      budget_daily: campaignData.budget_daily || 0,
      status: 'active',
      start_date: campaignData.start_date,
      end_date: campaignData.end_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  
  revalidatePath('/dashboard/campaigns')
  return data
}

export async function updateCampaignStatus(campaignId: string, status: string) {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('campaigns')
    .update({ 
      status,
      updated_at: new Date().toISOString() 
    })
    .eq('id', campaignId)

  if (error) throw error
  
  revalidatePath('/dashboard/campaigns')
}

// Helper functions
function mapPlatformToType(platform: string): 'social_media' | 'email' | 'seo' | 'ppc' | 'print' | 'other' {
  const typeMap: Record<string, any> = {
    'facebook': 'social_media',
    'instagram': 'social_media',
    'linkedin': 'social_media',
    'google_ads': 'ppc',
    'email': 'email',
    'seo': 'seo',
  }
  return typeMap[platform?.toLowerCase()] || 'other'
}

function mapStatus(status: string): 'draft' | 'active' | 'paused' | 'completed' | 'cancelled' {
  const statusMap: Record<string, any> = {
    'active': 'active',
    'paused': 'paused',
    'completed': 'completed',
    'cancelled': 'cancelled',
  }
  return statusMap[status] || 'draft'
}
