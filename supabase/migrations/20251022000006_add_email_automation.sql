/**
 * Add Email Automation System
 *
 * Enables intelligent follow-up sequences based on lead qualification:
 * - Hot leads: Immediate follow-up (5 mins)
 * - Warm leads: Nurture sequence (24h, 48h, 72h)
 * - Cold leads: Re-engagement campaign (7d, 14d)
 */

-- Create email templates table for campaign-specific content
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,

  -- Template type and sequence info
  template_name TEXT NOT NULL, -- e.g., 'hot_immediate', 'warm_24h', 'cold_7d'
  template_type TEXT NOT NULL CHECK (template_type IN ('hot', 'warm', 'cold', 'verification')),
  sequence_order INTEGER DEFAULT 0, -- Order in sequence (0=first, 1=second, etc)

  -- Content
  subject TEXT NOT NULL,
  preview_text TEXT, -- Email preview text (mobile-first)
  html_content TEXT NOT NULL,

  -- Configuration
  delay_hours INTEGER DEFAULT 0, -- Hours to wait before sending (0=immediate)
  is_active BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(campaign_id, template_name)
);

CREATE INDEX IF NOT EXISTS idx_email_templates_campaign ON email_templates(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);

-- Create email queue table for scheduling and tracking
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES email_templates(id) ON DELETE CASCADE,

  -- Email details
  to_email TEXT NOT NULL,
  to_name TEXT,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,

  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'sent', 'failed', 'bounced', 'opened', 'clicked')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  failed_reason TEXT,

  -- Email service tracking
  resend_message_id TEXT, -- Response from Resend API
  open_tracked_at TIMESTAMP WITH TIME ZONE,
  click_tracked_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_queue_lead ON email_queue(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_campaign ON email_queue(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON email_queue(scheduled_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_email_queue_sent ON email_queue(sent_at);

-- Create email sequence tracking
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,

  -- Sequence tracking
  qualification_status TEXT NOT NULL CHECK (qualification_status IN ('hot', 'warm', 'cold')),
  current_step INTEGER DEFAULT 0, -- Which step in sequence we're on
  total_steps INTEGER DEFAULT 1, -- Total steps planned

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'unsubscribed')),

  -- Metadata
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,

  UNIQUE(lead_id) -- One sequence per lead
);

CREATE INDEX IF NOT EXISTS idx_email_sequences_lead ON email_sequences(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_sequences_campaign ON email_sequences(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_sequences_status ON email_sequences(status);
CREATE INDEX IF NOT EXISTS idx_email_sequences_qualification ON email_sequences(qualification_status);

-- Create function to enqueue email for a lead based on qualification
CREATE OR REPLACE FUNCTION enqueue_lead_email(
  p_lead_id UUID,
  p_template_type TEXT -- 'hot', 'warm', 'cold', 'verification'
)
RETURNS UUID AS $$
DECLARE
  v_lead RECORD;
  v_campaign_id UUID;
  v_template RECORD;
  v_queue_id UUID;
  v_scheduled_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get lead data
  SELECT * INTO v_lead FROM leads WHERE id = p_lead_id;
  IF v_lead IS NULL THEN
    RETURN NULL;
  END IF;

  v_campaign_id := v_lead.campaign_id;

  -- Get appropriate template for this campaign
  SELECT * INTO v_template FROM email_templates
  WHERE campaign_id = v_campaign_id
    AND template_type = p_template_type
    AND is_active = TRUE
  ORDER BY sequence_order
  LIMIT 1;

  IF v_template IS NULL THEN
    RAISE WARNING 'No active email template found for campaign % and type %', v_campaign_id, p_template_type;
    RETURN NULL;
  END IF;

  -- Calculate scheduled time based on template delay
  v_scheduled_at := NOW() + (v_template.delay_hours || ' hours')::INTERVAL;

  -- Insert into email queue
  INSERT INTO email_queue (
    lead_id,
    campaign_id,
    template_id,
    to_email,
    to_name,
    subject,
    html_content,
    status,
    scheduled_at
  ) VALUES (
    p_lead_id,
    v_campaign_id,
    v_template.id,
    v_lead.email,
    v_lead.full_name,
    v_template.subject,
    v_template.html_content,
    CASE WHEN v_template.delay_hours = 0 THEN 'pending' ELSE 'scheduled' END,
    v_scheduled_at
  )
  RETURNING id INTO v_queue_id;

  RETURN v_queue_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to trigger email sequence when lead is scored
CREATE OR REPLACE FUNCTION trigger_email_sequence_after_scoring()
RETURNS TRIGGER AS $$
DECLARE
  v_sequence RECORD;
BEGIN
  -- Only trigger on insert or if qualification_status changed
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.qualification_status != NEW.qualification_status) THEN
    -- Check if sequence already exists
    SELECT * INTO v_sequence FROM email_sequences
    WHERE lead_id = NEW.id;

    IF v_sequence IS NULL AND NEW.qualification_status IN ('hot', 'warm', 'cold') THEN
      -- Create new sequence
      INSERT INTO email_sequences (
        lead_id,
        campaign_id,
        qualification_status,
        total_steps
      ) VALUES (
        NEW.id,
        NEW.campaign_id,
        NEW.qualification_status,
        CASE
          WHEN NEW.qualification_status = 'hot' THEN 1 -- 1 immediate email
          WHEN NEW.qualification_status = 'warm' THEN 3 -- 3 nurture emails
          WHEN NEW.qualification_status = 'cold' THEN 2 -- 2 re-engagement emails
          ELSE 0
        END
      );

      -- Enqueue appropriate template
      PERFORM enqueue_lead_email(NEW.id, NEW.qualification_status);
    ELSIF v_sequence IS NOT NULL THEN
      -- Update sequence if qualification changed
      UPDATE email_sequences
      SET qualification_status = NEW.qualification_status
      WHERE lead_id = NEW.id;

      -- Enqueue new template for new qualification
      PERFORM enqueue_lead_email(NEW.id, NEW.qualification_status);
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to leads table
DROP TRIGGER IF EXISTS trigger_email_sequence_after_scoring ON leads;
CREATE TRIGGER trigger_email_sequence_after_scoring
AFTER INSERT OR UPDATE OF qualification_status ON leads
FOR EACH ROW
EXECUTE FUNCTION trigger_email_sequence_after_scoring();

-- Create function to send pending emails
CREATE OR REPLACE FUNCTION send_pending_emails()
RETURNS TABLE(sent_count INTEGER, failed_count INTEGER) AS $$
DECLARE
  v_queue RECORD;
  v_sent_count INTEGER := 0;
  v_failed_count INTEGER := 0;
BEGIN
  -- Get all pending emails that are ready to send
  FOR v_queue IN
    SELECT * FROM email_queue
    WHERE status IN ('pending', 'scheduled')
      AND (scheduled_at IS NULL OR scheduled_at <= NOW())
    LIMIT 100 -- Process in batches
  LOOP
    -- Mark as attempted (actual sending happens in application layer)
    UPDATE email_queue
    SET status = 'sent', sent_at = NOW()
    WHERE id = v_queue.id;

    v_sent_count := v_sent_count + 1;
  END LOOP;

  RETURN QUERY SELECT v_sent_count, v_failed_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to update sequence progress
CREATE OR REPLACE FUNCTION advance_email_sequence(p_lead_id UUID)
RETURNS VOID AS $$
DECLARE
  v_sequence RECORD;
BEGIN
  SELECT * INTO v_sequence FROM email_sequences
  WHERE lead_id = p_lead_id;

  IF v_sequence IS NOT NULL THEN
    UPDATE email_sequences
    SET current_step = current_step + 1,
        status = CASE
          WHEN current_step + 1 >= total_steps THEN 'completed'
          ELSE 'active'
        END
    WHERE lead_id = p_lead_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION enqueue_lead_email TO authenticated, anon;
GRANT EXECUTE ON FUNCTION send_pending_emails TO authenticated, anon;
GRANT EXECUTE ON FUNCTION advance_email_sequence TO authenticated, anon;
