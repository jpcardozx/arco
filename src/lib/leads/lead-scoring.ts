/**
 * Lead Scoring Utilities
 *
 * Provides functions to score and qualify leads based on:
 * - Intent signals (challenge, urgency, revenue size)
 * - Engagement metrics (email verification, interactions)
 * - Fit signals (experience, message quality)
 */

import { createClient } from '@supabase/supabase-js';

export type LeadQualification = 'new' | 'hot' | 'warm' | 'cold' | 'disqualified';

export interface LeadScoreBreakdown {
  intentScore: number;
  engagementScore: number;
  fitScore: number;
  totalScore: number;
  qualification: LeadQualification;
  details: {
    urgency: string | null;
    revenue: string | null;
    experience: string | null;
    challenge: string | null;
    emailVerified: boolean;
    messageProvided: boolean;
  };
}

/**
 * Calculate lead score based on multiple signals
 * Used after lead capture to prioritize follow-up
 */
export async function scoreLeadAfterCapture(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<LeadScoreBreakdown> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  // Call database function to calculate score
  const { data, error } = await supabase.rpc('calculate_lead_score', {
    lead_id: leadId
  });

  if (error) {
    console.error('[Lead Scoring] Error calculating score:', error);
    throw error;
  }

  // Fetch updated lead data with scores
  const { data: lead, error: fetchError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (fetchError || !lead) {
    throw new Error('Failed to fetch scored lead');
  }

  return {
    intentScore: lead.intent_score || 0,
    engagementScore: lead.engagement_score || 0,
    fitScore: lead.fit_score || 0,
    totalScore: lead.lead_score || 0,
    qualification: lead.qualification_status || 'new',
    details: {
      urgency: lead.metadata?.urgency || null,
      revenue: lead.metadata?.monthly_revenue || null,
      experience: lead.metadata?.ad_experience || null,
      challenge: lead.metadata?.biggest_challenge || null,
      emailVerified: lead.email_verified || false,
      messageProvided: !!lead.metadata?.message
    }
  };
}

/**
 * Get hot leads (high priority for immediate follow-up)
 */
export async function getHotLeads(
  campaignId: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 20
) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('campaign_id', campaignId)
    .eq('qualification_status', 'hot')
    .order('lead_score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Lead Scoring] Error fetching hot leads:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get warm leads (medium priority, may need nurture)
 */
export async function getWarmLeads(
  campaignId: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 50
) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('campaign_id', campaignId)
    .eq('qualification_status', 'warm')
    .order('lead_score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Lead Scoring] Error fetching warm leads:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get lead statistics for dashboard
 */
export async function getLeadStats(
  campaignId: string,
  supabaseUrl: string,
  supabaseKey: string
) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('leads')
    .select('qualification_status, lead_score, email_verified')
    .eq('campaign_id', campaignId);

  if (error) {
    console.error('[Lead Scoring] Error fetching stats:', error);
    throw error;
  }

  const stats = {
    total: data?.length || 0,
    hot: data?.filter(l => l.qualification_status === 'hot').length || 0,
    warm: data?.filter(l => l.qualification_status === 'warm').length || 0,
    cold: data?.filter(l => l.qualification_status === 'cold').length || 0,
    new: data?.filter(l => l.qualification_status === 'new').length || 0,
    verified: data?.filter(l => l.email_verified).length || 0,
    averageScore: data && data.length > 0
      ? Math.round(data.reduce((sum, l) => sum + (l.lead_score || 0), 0) / data.length)
      : 0
  };

  return stats;
}

/**
 * Mark lead as engaged (updates engagement_at and recalculates score)
 */
export async function recordLeadEngagement(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string,
  engagementType: 'email_opened' | 'email_clicked' | 'page_visited' | 'form_started'
) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  // Call function to update engagement
  const { error } = await supabase.rpc('update_lead_engagement', {
    lead_id: leadId
  });

  if (error) {
    console.error('[Lead Scoring] Error recording engagement:', error);
    throw error;
  }

  console.log(`[Lead Scoring] Recorded ${engagementType} for lead ${leadId}`);
  return true;
}

/**
 * Get lead score breakdown for a specific lead
 */
export async function getLeadScoreBreakdown(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<LeadScoreBreakdown> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (error || !lead) {
    throw new Error('Lead not found');
  }

  return {
    intentScore: lead.intent_score || 0,
    engagementScore: lead.engagement_score || 0,
    fitScore: lead.fit_score || 0,
    totalScore: lead.lead_score || 0,
    qualification: lead.qualification_status || 'new',
    details: {
      urgency: lead.metadata?.urgency || null,
      revenue: lead.metadata?.monthly_revenue || null,
      experience: lead.metadata?.ad_experience || null,
      challenge: lead.metadata?.biggest_challenge || null,
      emailVerified: lead.email_verified || false,
      messageProvided: !!lead.metadata?.message
    }
  };
}
