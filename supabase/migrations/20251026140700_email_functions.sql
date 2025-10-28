/**
 * Email System - Database Functions
 * Support functions for email automation and tracking
 */

-- Function to increment email sequence step
CREATE OR REPLACE FUNCTION increment_email_sequence_step(p_lead_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE email_sequences
  SET current_step = current_step + 1,
      status = CASE 
        WHEN current_step + 1 >= total_steps THEN 'completed'
        ELSE status
      END,
      completed_at = CASE 
        WHEN current_step + 1 >= total_steps THEN NOW()
        ELSE completed_at
      END
  WHERE lead_id = p_lead_id
    AND status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Function to increment lead score (engagement tracking)
CREATE OR REPLACE FUNCTION increment_lead_score(
  p_lead_id UUID,
  p_points INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE leads
  SET score = COALESCE(score, 0) + p_points,
      last_activity = NOW()
  WHERE id = p_lead_id;
END;
$$ LANGUAGE plpgsql;

-- Function to schedule next email in sequence
CREATE OR REPLACE FUNCTION schedule_next_email(p_lead_id UUID)
RETURNS UUID AS $$
DECLARE
  v_sequence RECORD;
  v_template RECORD;
  v_lead RECORD;
  v_queue_id UUID;
  v_scheduled_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get current sequence
  SELECT * INTO v_sequence FROM email_sequences
  WHERE lead_id = p_lead_id
    AND status = 'active';

  IF v_sequence IS NULL THEN
    RETURN NULL;
  END IF;

  -- Get lead data
  SELECT * INTO v_lead FROM leads WHERE id = p_lead_id;

  IF v_lead IS NULL THEN
    RETURN NULL;
  END IF;

  -- Get next template in sequence
  SELECT * INTO v_template FROM email_templates
  WHERE campaign_id = v_sequence.campaign_id
    AND template_type = v_sequence.qualification_status
    AND sequence_order = v_sequence.current_step
    AND is_active = TRUE
  LIMIT 1;

  IF v_template IS NULL THEN
    -- No more templates, mark sequence as completed
    UPDATE email_sequences
    SET status = 'completed',
        completed_at = NOW()
    WHERE id = v_sequence.id;
    
    RETURN NULL;
  END IF;

  -- Calculate scheduled time
  v_scheduled_at := NOW() + (v_template.delay_hours || ' hours')::INTERVAL;

  -- Create queue entry
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
    v_sequence.campaign_id,
    v_template.id,
    v_lead.email,
    v_lead.name,
    v_template.subject,
    v_template.html_content,
    CASE 
      WHEN v_template.delay_hours = 0 THEN 'pending'
      ELSE 'scheduled'
    END,
    v_scheduled_at
  )
  RETURNING id INTO v_queue_id;

  RETURN v_queue_id;
END;
$$ LANGUAGE plpgsql;

-- Function to unsubscribe lead from all sequences
CREATE OR REPLACE FUNCTION unsubscribe_lead(p_lead_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Mark all sequences as unsubscribed
  UPDATE email_sequences
  SET status = 'unsubscribed',
      unsubscribed_at = NOW()
  WHERE lead_id = p_lead_id
    AND status IN ('active', 'paused');

  -- Cancel all pending emails
  UPDATE email_queue
  SET status = 'failed',
      failed_reason = 'Lead unsubscribed'
  WHERE lead_id = p_lead_id
    AND status IN ('pending', 'scheduled');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-schedule emails when sequence starts
CREATE OR REPLACE FUNCTION auto_schedule_email_on_sequence_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Schedule first email immediately
  PERFORM schedule_next_email(NEW.lead_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_auto_schedule_email ON email_sequences;
CREATE TRIGGER trigger_auto_schedule_email
  AFTER INSERT ON email_sequences
  FOR EACH ROW
  EXECUTE FUNCTION auto_schedule_email_on_sequence_insert();

-- Function to get email analytics
CREATE OR REPLACE FUNCTION get_email_analytics(
  p_campaign_id UUID DEFAULT NULL,
  p_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() - INTERVAL '30 days',
  p_end_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS TABLE (
  total_sent BIGINT,
  total_opened BIGINT,
  total_clicked BIGINT,
  total_bounced BIGINT,
  total_failed BIGINT,
  open_rate NUMERIC,
  click_rate NUMERIC,
  bounce_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    SELECT
      COUNT(*) FILTER (WHERE status = 'sent') as sent,
      COUNT(*) FILTER (WHERE status = 'opened') as opened,
      COUNT(*) FILTER (WHERE status = 'clicked') as clicked,
      COUNT(*) FILTER (WHERE status = 'bounced') as bounced,
      COUNT(*) FILTER (WHERE status = 'failed') as failed
    FROM email_queue
    WHERE created_at BETWEEN p_start_date AND p_end_date
      AND (p_campaign_id IS NULL OR campaign_id = p_campaign_id)
  )
  SELECT
    sent,
    opened,
    clicked,
    bounced,
    failed,
    CASE WHEN sent > 0 THEN ROUND((opened::NUMERIC / sent::NUMERIC) * 100, 2) ELSE 0 END,
    CASE WHEN sent > 0 THEN ROUND((clicked::NUMERIC / sent::NUMERIC) * 100, 2) ELSE 0 END,
    CASE WHEN sent > 0 THEN ROUND((bounced::NUMERIC / sent::NUMERIC) * 100, 2) ELSE 0 END
  FROM stats;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION increment_email_sequence_step TO service_role;
GRANT EXECUTE ON FUNCTION increment_lead_score TO service_role;
GRANT EXECUTE ON FUNCTION schedule_next_email TO service_role;
GRANT EXECUTE ON FUNCTION unsubscribe_lead TO service_role;
GRANT EXECUTE ON FUNCTION get_email_analytics TO authenticated, service_role;
