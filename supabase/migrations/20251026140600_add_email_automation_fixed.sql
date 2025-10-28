/**
 * Add Email Automation System - Fixed Version
 * Ensures tables exist without column conflicts
 */

-- Create email templates table (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_templates') THEN
    CREATE TABLE email_templates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
      template_name TEXT NOT NULL,
      template_type TEXT NOT NULL CHECK (template_type IN ('hot', 'warm', 'cold', 'verification')),
      sequence_order INTEGER DEFAULT 0,
      subject TEXT NOT NULL,
      preview_text TEXT,
      html_content TEXT NOT NULL,
      delay_hours INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create email queue table (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_queue') THEN
    CREATE TABLE email_queue (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
      template_id UUID REFERENCES email_templates(id) ON DELETE CASCADE,
      to_email TEXT NOT NULL,
      to_name TEXT,
      subject TEXT NOT NULL,
      html_content TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'sent', 'failed', 'bounced', 'opened', 'clicked')),
      scheduled_for TIMESTAMP WITH TIME ZONE,
      sent_at TIMESTAMP WITH TIME ZONE,
      opened_at TIMESTAMP WITH TIME ZONE,
      clicked_at TIMESTAMP WITH TIME ZONE,
      failed_reason TEXT,
      resend_message_id TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create email sequences table (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_sequences') THEN
    CREATE TABLE email_sequences (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create email sequence progress tracking (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_sequence_progress') THEN
    CREATE TABLE email_sequence_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sequence_id UUID NOT NULL REFERENCES email_sequences(id) ON DELETE CASCADE,
      lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      current_step INTEGER DEFAULT 0,
      completed BOOLEAN DEFAULT FALSE,
      last_email_sent_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(sequence_id, lead_id)
    );
  END IF;
END $$;

-- Create indices for email_templates
DROP INDEX IF EXISTS idx_email_templates_campaign;
DROP INDEX IF EXISTS idx_email_templates_type;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'email_templates' AND column_name = 'campaign_id') THEN
    CREATE INDEX IF NOT EXISTS idx_email_templates_campaign ON email_templates(campaign_id);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'email_templates' AND column_name = 'template_type') THEN
    CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);
  END IF;
END $$;

-- Create indices for email_queue
CREATE INDEX IF NOT EXISTS idx_email_queue_lead ON email_queue(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON email_queue(scheduled_for) WHERE status IN ('pending', 'scheduled');

-- Create indices for email_sequences
CREATE INDEX IF NOT EXISTS idx_email_sequences_active ON email_sequences(is_active);

-- Create indices for email_sequence_progress
CREATE INDEX IF NOT EXISTS idx_email_sequence_progress_sequence ON email_sequence_progress(sequence_id);
CREATE INDEX IF NOT EXISTS idx_email_sequence_progress_lead ON email_sequence_progress(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_sequence_progress_active ON email_sequence_progress(sequence_id, lead_id) WHERE completed = FALSE;
