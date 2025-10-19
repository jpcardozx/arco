-- Migration: Add campaign tracking fields to leads table
-- Author: ARCO System
-- Date: 2025-10-18
-- Description: Adds UTM parameters, campaign tracking, and LGPD compliance fields

-- Add campaign and tracking fields
ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS campaign_slug TEXT,
  ADD COLUMN IF NOT EXISTS landing_page_url TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS ip_address INET,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS consent_marketing BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_terms BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sent_to_crm BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS crm_id TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_campaign_slug ON leads(campaign_slug);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_sent_to_crm ON leads(sent_to_crm) WHERE sent_to_crm = false;

-- Add comments for documentation
COMMENT ON COLUMN leads.campaign_slug IS 'Slug da campanha de marketing (ex: lancamento-2025)';
COMMENT ON COLUMN leads.landing_page_url IS 'URL completa da landing page de origem';
COMMENT ON COLUMN leads.utm_source IS 'UTM Source - Origem do tráfego (ex: google, facebook)';
COMMENT ON COLUMN leads.utm_medium IS 'UTM Medium - Meio do tráfego (ex: cpc, email, social)';
COMMENT ON COLUMN leads.utm_campaign IS 'UTM Campaign - Nome da campanha';
COMMENT ON COLUMN leads.utm_content IS 'UTM Content - Conteúdo/variante do anúncio';
COMMENT ON COLUMN leads.utm_term IS 'UTM Term - Palavra-chave da campanha';
COMMENT ON COLUMN leads.referrer IS 'HTTP Referrer completo';
COMMENT ON COLUMN leads.ip_address IS 'Endereço IP do lead (INET type)';
COMMENT ON COLUMN leads.user_agent IS 'User Agent do navegador';
COMMENT ON COLUMN leads.consent_marketing IS 'LGPD: Consentimento para marketing';
COMMENT ON COLUMN leads.consent_terms IS 'LGPD: Aceitação dos termos';
COMMENT ON COLUMN leads.lead_score IS 'Pontuação de qualificação do lead (0-100)';
COMMENT ON COLUMN leads.sent_to_crm IS 'Flag indicando se foi enviado ao CRM';
COMMENT ON COLUMN leads.crm_id IS 'ID do lead no CRM externo (RD Station, HubSpot, etc)';
