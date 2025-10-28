/**
 * Fix Email Templates Schema
 * Adds missing campaign_id column and removes problematic index
 */

-- Add campaign_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_templates' AND column_name = 'campaign_id'
  ) THEN
    ALTER TABLE email_templates 
    ADD COLUMN campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Drop and recreate index on campaign_id (safe operation)
DROP INDEX IF EXISTS idx_email_templates_campaign;

-- Only create if column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_templates' AND column_name = 'campaign_id'
  ) THEN
    CREATE INDEX idx_email_templates_campaign ON email_templates(campaign_id);
  END IF;
END $$;
