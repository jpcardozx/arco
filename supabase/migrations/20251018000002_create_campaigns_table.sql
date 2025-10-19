-- Migration: Alter campaigns table for landing page management
-- Author: ARCO System
-- Date: 2025-10-18
-- Description: Adds landing page fields to existing campaigns table

-- Add new columns to existing campaigns table
ALTER TABLE campaigns 
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS hero_title TEXT,
  ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
  ADD COLUMN IF NOT EXISTS hero_description TEXT,
  ADD COLUMN IF NOT EXISTS cta_text TEXT DEFAULT 'Começar Agora',
  ADD COLUMN IF NOT EXISTS cta_secondary_text TEXT,
  ADD COLUMN IF NOT EXISTS cta_button_color TEXT DEFAULT '#3b82f6',
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
  ADD COLUMN IF NOT EXISTS og_image_url TEXT,
  ADD COLUMN IF NOT EXISTS favicon_url TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT[],
  ADD COLUMN IF NOT EXISTS total_views INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_leads INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS start_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS end_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS daily_budget DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS variant TEXT DEFAULT 'A',
  ADD COLUMN IF NOT EXISTS ab_test_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_template_id TEXT,
  ADD COLUMN IF NOT EXISTS email_subject TEXT,
  ADD COLUMN IF NOT EXISTS thank_you_page_url TEXT,
  ADD COLUMN IF NOT EXISTS crm_integration_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS crm_provider TEXT,
  ADD COLUMN IF NOT EXISTS webhook_url TEXT,
  ADD COLUMN IF NOT EXISTS lead_magnet_title TEXT,
  ADD COLUMN IF NOT EXISTS lead_magnet_description TEXT,
  ADD COLUMN IF NOT EXISTS lead_magnet_file_url TEXT,
  ADD COLUMN IF NOT EXISTS lead_magnet_type TEXT,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

-- Add unique constraint on slug (if doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_slug_key'
  ) THEN
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Add check constraints
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_variant_check'
  ) THEN
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_variant_check CHECK (variant IN ('A', 'B', 'C'));
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_crm_provider_check'
  ) THEN
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_crm_provider_check 
      CHECK (crm_provider IN ('rdstation', 'hubspot', 'pipedrive', 'salesforce', 'custom') OR crm_provider IS NULL);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_lead_magnet_type_check'
  ) THEN
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_lead_magnet_type_check 
      CHECK (lead_magnet_type IN ('ebook', 'checklist', 'template', 'course', 'webinar', 'consultation') OR lead_magnet_type IS NULL);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_dates_check'
  ) THEN
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_dates_check 
      CHECK (start_date IS NULL OR end_date IS NULL OR start_date < end_date);
  END IF;
END $$;

-- Create indexes (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);
CREATE INDEX IF NOT EXISTS idx_campaigns_is_active ON campaigns(is_active);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON campaigns(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_variant ON campaigns(variant);
CREATE INDEX IF NOT EXISTS idx_campaigns_owner ON campaigns(owner_id);

-- Create or replace trigger for updated_at
CREATE OR REPLACE FUNCTION update_campaigns_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS campaigns_updated_at ON campaigns;
CREATE TRIGGER campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_campaigns_updated_at();

-- Enable RLS if not already enabled
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role has full access to campaigns" ON campaigns;
DROP POLICY IF EXISTS "Authenticated users can read active campaigns" ON campaigns;
DROP POLICY IF EXISTS "Campaign owners can manage their campaigns" ON campaigns;
DROP POLICY IF EXISTS "Anonymous can view active campaigns" ON campaigns;

-- Recreate policies


-- Policy: Service role has full access
CREATE POLICY "service_role_campaigns_full_access"
  ON campaigns
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can read active campaigns
CREATE POLICY "authenticated_read_campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Policy: Campaign owners can manage their campaigns
CREATE POLICY "owners_manage_campaigns"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Policy: Anonymous can read active campaigns (for public landing pages)
CREATE POLICY "anon_read_campaigns"
  ON campaigns
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Add comments
COMMENT ON TABLE campaigns IS 'Campanhas de marketing e landing pages';
COMMENT ON COLUMN campaigns.slug IS 'URL slug único da campanha (ex: lancamento-2025)';
COMMENT ON COLUMN campaigns.variant IS 'Variante A/B test (A, B, ou C)';
COMMENT ON COLUMN campaigns.lead_magnet_type IS 'Tipo de material rico oferecido';

