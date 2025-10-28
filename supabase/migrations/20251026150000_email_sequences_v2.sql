-- Email Sequences System V2 - Enhancement
-- Extends existing email_sequences with advanced automation features
-- Version: 2.0.0
-- Author: ARCO Digital
-- Note: Works with existing tables from 20251026140600_add_email_automation_fixed.sql

-- ============================================================================
-- EXTEND EXISTING TABLES
-- ============================================================================

-- Extend email_sequences table with new fields
DO $$
BEGIN
  -- Add trigger_type if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_sequences' AND column_name = 'trigger_type'
  ) THEN
    ALTER TABLE email_sequences 
    ADD COLUMN trigger_type TEXT CHECK (trigger_type IN (
      'manual', 'signup', 'lead_magnet', 'assessment', 
      'cart_abandoned', 'trial_started', 'trial_expiring',
      'subscription', 'milestone', 'inactivity'
    ));
  END IF;

  -- Add status field (rename is_active to status)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_sequences' AND column_name = 'status'
  ) THEN
    ALTER TABLE email_sequences 
    ADD COLUMN status TEXT NOT NULL DEFAULT 'active' 
    CHECK (status IN ('active', 'paused', 'archived'));
    
    -- Migrate data from is_active to status
    UPDATE email_sequences 
    SET status = CASE WHEN is_active THEN 'active' ELSE 'paused' END;
  END IF;

  -- Add settings and metadata
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_sequences' AND column_name = 'settings'
  ) THEN
    ALTER TABLE email_sequences ADD COLUMN settings JSONB DEFAULT '{}'::JSONB;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_sequences' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE email_sequences ADD COLUMN metadata JSONB DEFAULT '{}'::JSONB;
  END IF;
END $$;

-- ============================================================================
-- NEW TABLES
-- ============================================================================

-- Sequence Steps (individual emails in a sequence)
CREATE TABLE IF NOT EXISTS email_sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES email_sequences(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  template_name TEXT NOT NULL,
  delay_hours INTEGER NOT NULL DEFAULT 0,
  delay_type TEXT NOT NULL DEFAULT 'hours' CHECK (delay_type IN ('immediate', 'hours', 'days', 'weeks')),
  
  -- Email content overrides
  subject_template TEXT,
  preview_text TEXT,
  
  -- Conditions and testing
  conditions JSONB DEFAULT '{}'::JSONB,
  variant_name TEXT DEFAULT 'default',
  variant_percentage INTEGER DEFAULT 100,
  
  -- Analytics
  metadata JSONB DEFAULT '{}'::JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(sequence_id, step_order)
);

-- User Sequence Subscriptions (replaces email_sequence_progress)
CREATE TABLE IF NOT EXISTS email_user_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sequence_id UUID NOT NULL REFERENCES email_sequences(id) ON DELETE CASCADE,
  
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'completed', 'paused', 'cancelled', 'bounced'
  )),
  
  current_step INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  next_send_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Context data for template rendering
  context JSONB DEFAULT '{}'::JSONB,
  metadata JSONB DEFAULT '{}'::JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (user_id IS NOT NULL OR lead_id IS NOT NULL)
);

-- Add columns if table already exists (backwards compatibility)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_user_sequences' AND column_name = 'lead_id'
  ) THEN
    ALTER TABLE email_user_sequences ADD COLUMN lead_id UUID REFERENCES leads(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_user_sequences' AND column_name = 'current_step'
  ) THEN
    ALTER TABLE email_user_sequences ADD COLUMN current_step INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_user_sequences' AND column_name = 'next_send_at'
  ) THEN
    ALTER TABLE email_user_sequences ADD COLUMN next_send_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_user_sequences' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE email_user_sequences ADD COLUMN completed_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_user_sequences' AND column_name = 'context'
  ) THEN
    ALTER TABLE email_user_sequences ADD COLUMN context JSONB DEFAULT '{}'::JSONB;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_user_sequences' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE email_user_sequences ADD COLUMN metadata JSONB DEFAULT '{}'::JSONB;
  END IF;
END $$;

-- Create partial unique indexes to enforce one sequence per user OR lead
CREATE UNIQUE INDEX IF NOT EXISTS idx_email_user_sequences_user_unique 
  ON email_user_sequences(sequence_id, user_id) 
  WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_email_user_sequences_lead_unique 
  ON email_user_sequences(sequence_id, lead_id) 
  WHERE lead_id IS NOT NULL;

-- Extend email_queue with new fields
DO $$
BEGIN
  -- Add sequence tracking
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'sequence_step_id'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN sequence_step_id UUID REFERENCES email_sequence_steps(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'user_sequence_id'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN user_sequence_id UUID REFERENCES email_user_sequences(id) ON DELETE CASCADE;
  END IF;

  -- Add user_id for better tracking
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  -- Add template_data
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'template_data'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN template_data JSONB DEFAULT '{}'::JSONB;
  END IF;

  -- Add retry logic
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'retry_count'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN retry_count INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'max_retries'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN max_retries INTEGER DEFAULT 3;
  END IF;

  -- Add metadata
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE email_queue ADD COLUMN metadata JSONB DEFAULT '{}'::JSONB;
  END IF;

  -- Rename fields for consistency
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'scheduled_for'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_queue' AND column_name = 'scheduled_for'
  ) THEN
    -- Already exists, skip
    NULL;
  END IF;
END $$;

-- Email Events (detailed tracking)
CREATE TABLE IF NOT EXISTS email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_queue_id UUID REFERENCES email_queue(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  event_type TEXT NOT NULL CHECK (event_type IN (
    'queued', 'sent', 'delivered', 'opened', 'clicked',
    'bounced', 'complained', 'unsubscribed', 'failed'
  )),
  
  event_data JSONB DEFAULT '{}'::JSONB,
  resend_event_id TEXT,
  posthog_event_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Sequence steps
CREATE INDEX IF NOT EXISTS idx_email_sequence_steps_sequence 
  ON email_sequence_steps(sequence_id, step_order);

-- User sequences
CREATE INDEX IF NOT EXISTS idx_email_user_sequences_user 
  ON email_user_sequences(COALESCE(user_id, lead_id), status);
CREATE INDEX IF NOT EXISTS idx_email_user_sequences_next_send 
  ON email_user_sequences(next_send_at) 
  WHERE status = 'active' AND next_send_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_email_user_sequences_sequence 
  ON email_user_sequences(sequence_id, status);

-- Email queue (additional indexes)
CREATE INDEX IF NOT EXISTS idx_email_queue_user 
  ON email_queue(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_queue_pending 
  ON email_queue(scheduled_for) 
  WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_email_queue_resend 
  ON email_queue(resend_message_id) 
  WHERE resend_message_id IS NOT NULL;

-- Email events
CREATE INDEX IF NOT EXISTS idx_email_events_queue 
  ON email_events(email_queue_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_events_user 
  ON email_events(user_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_events_type 
  ON email_events(event_type, created_at DESC);

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_user_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admin full access to sequences" ON email_sequences
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to sequence steps" ON email_sequence_steps
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to user sequences" ON email_user_sequences
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to email events" ON email_events
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Users can view their own data
CREATE POLICY "Users view own sequences" ON email_user_sequences
  FOR SELECT TO authenticated
  USING (
    CASE 
      WHEN user_id IS NOT NULL THEN user_id = auth.uid()
      WHEN lead_id IS NOT NULL THEN lead_id IN (
        SELECT id FROM leads WHERE assigned_to = auth.uid()
      )
      ELSE false
    END
  );

CREATE POLICY "Users view own events" ON email_events
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS email_sequences_updated_at ON email_sequences;
CREATE TRIGGER email_sequences_updated_at
  BEFORE UPDATE ON email_sequences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS email_sequence_steps_updated_at ON email_sequence_steps;
CREATE TRIGGER email_sequence_steps_updated_at
  BEFORE UPDATE ON email_sequence_steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS email_user_sequences_updated_at ON email_user_sequences;
CREATE TRIGGER email_user_sequences_updated_at
  BEFORE UPDATE ON email_user_sequences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function: Enqueue next step in sequence
CREATE OR REPLACE FUNCTION enqueue_next_sequence_step(p_user_sequence_id UUID)
RETURNS UUID AS $$
DECLARE
  v_user_sequence RECORD;
  v_next_step RECORD;
  v_sequence RECORD;
  v_user RECORD;
  v_queue_id UUID;
  v_scheduled_for TIMESTAMPTZ;
BEGIN
  -- Get user sequence details
  SELECT * INTO v_user_sequence
  FROM email_user_sequences
  WHERE id = p_user_sequence_id AND status = 'active';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User sequence not found or not active';
  END IF;
  
  -- Get next step
  SELECT * INTO v_next_step
  FROM email_sequence_steps
  WHERE sequence_id = v_user_sequence.sequence_id
    AND step_order = v_user_sequence.current_step + 1
  ORDER BY step_order
  LIMIT 1;
  
  IF NOT FOUND THEN
    -- Sequence completed
    UPDATE email_user_sequences
    SET status = 'completed', completed_at = NOW()
    WHERE id = p_user_sequence_id;
    
    RETURN NULL;
  END IF;
  
  -- Get sequence and user details
  SELECT * INTO v_sequence FROM email_sequences WHERE id = v_user_sequence.sequence_id;
  SELECT * INTO v_user FROM auth.users WHERE id = v_user_sequence.user_id;
  
  -- Calculate scheduled time
  v_scheduled_for := NOW();
  IF v_next_step.delay_hours > 0 THEN
    v_scheduled_for := v_scheduled_for + (v_next_step.delay_hours || ' hours')::INTERVAL;
  END IF;
  
  -- Create queue entry
  INSERT INTO email_queue (
    user_id,
    sequence_id,
    sequence_step_id,
    user_sequence_id,
    template_id,
    to_email,
    to_name,
    subject,
    html_content,
    template_data,
    scheduled_for,
    metadata,
    status
  ) VALUES (
    v_user.id,
    v_sequence.id,
    v_next_step.id,
    p_user_sequence_id,
    NULL, -- Will be resolved by template_name
    v_user.email,
    COALESCE(v_user.raw_user_meta_data->>'name', v_user.email),
    COALESCE(v_next_step.subject_template, v_sequence.name),
    '', -- Will be rendered by edge function
    v_user_sequence.context,
    v_scheduled_for,
    jsonb_build_object(
      'sequence_name', v_sequence.name,
      'step_order', v_next_step.step_order,
      'template_name', v_next_step.template_name,
      'variant', v_next_step.variant
    ) || COALESCE(v_next_step.metadata, '{}'::JSONB),
    'pending'
  ) RETURNING id INTO v_queue_id;
  
  -- Update user sequence
  UPDATE email_user_sequences
  SET next_send_at = v_scheduled_for
  WHERE id = p_user_sequence_id;
  
  RETURN v_queue_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SEED DATA - CORE SEQUENCES
-- ============================================================================

-- Disable problematic trigger from previous migration
DROP TRIGGER IF EXISTS trigger_auto_schedule_email ON email_sequences;

-- 1. Lead Magnet Delivery Sequence
DO $$
DECLARE
  v_sequence_id UUID;
BEGIN
  -- Check if sequence already exists
  SELECT id INTO v_sequence_id FROM email_sequences WHERE name = 'Lead Magnet Delivery';
  
  IF v_sequence_id IS NULL THEN
    INSERT INTO email_sequences (name, description, trigger_type, status, metadata)
    VALUES (
      'Lead Magnet Delivery',
      'Entrega de material educativo e nurture inicial',
      'lead_magnet',
      'active',
      '{"category": "nurture", "priority": "high"}'::JSONB
    )
    RETURNING id INTO v_sequence_id;
    
    -- Step 1: Immediate delivery
    INSERT INTO email_sequence_steps (sequence_id, step_order, template_name, delay_hours, delay_type, subject_template, metadata)
    VALUES (
      v_sequence_id, 1, 'LeadMagnetEmail', 0, 'immediate',
      '{{userName}}, seu {{leadMagnet.type}} está pronto',
      '{"posthog_event": "email_lead_magnet_sent", "campaign": "lead_magnet_delivery"}'::JSONB
    );
  END IF;
END $$;

-- 2. Assessment Results Sequence
DO $$
DECLARE
  v_sequence_id UUID;
BEGIN
  SELECT id INTO v_sequence_id FROM email_sequences WHERE name = 'Assessment Results & Follow-up';
  
  IF v_sequence_id IS NULL THEN
    INSERT INTO email_sequences (name, description, trigger_type, status, metadata)
    VALUES (
      'Assessment Results & Follow-up',
      'Resultados de assessment com nurture e oferta de consultoria',
      'assessment',
      'active',
      '{"category": "conversion", "priority": "critical"}'::JSONB
    )
    RETURNING id INTO v_sequence_id;
    
    INSERT INTO email_sequence_steps (sequence_id, step_order, template_name, delay_hours, delay_type, subject_template, metadata)
    VALUES (
      v_sequence_id, 1, 'AssessmentResultsEmail', 0, 'immediate',
      '{{userName}}, seu resultado: {{score}}/{{maxScore}}',
      '{"posthog_event": "email_assessment_results_sent"}'::JSONB
    );
  END IF;
END $$;

-- 3. Abandoned Cart Recovery
DO $$
DECLARE
  v_sequence_id UUID;
BEGIN
  SELECT id INTO v_sequence_id FROM email_sequences WHERE name = 'Abandoned Cart Recovery';
  
  IF v_sequence_id IS NULL THEN
    INSERT INTO email_sequences (name, description, trigger_type, status, metadata)
    VALUES (
      'Abandoned Cart Recovery',
      'Recuperação de carrinhos abandonados com urgência',
      'cart_abandoned',
      'active',
      '{"category": "conversion", "priority": "high"}'::JSONB
    )
    RETURNING id INTO v_sequence_id;
    
    INSERT INTO email_sequence_steps (sequence_id, step_order, template_name, delay_hours, delay_type, subject_template, metadata)
    VALUES (
      v_sequence_id, 1, 'AbandonedCartEmail', 1, 'hours',
      '{{userName}}, você esqueceu algo no carrinho',
      '{"posthog_event": "email_cart_recovery_sent", "campaign": "abandoned_cart"}'::JSONB
    );
  END IF;
END $$;

-- 4. Trial Expiring Sequence
DO $$
DECLARE
  v_sequence_id UUID;
BEGIN
  SELECT id INTO v_sequence_id FROM email_sequences WHERE name = 'Trial Expiring';
  
  IF v_sequence_id IS NULL THEN
    INSERT INTO email_sequences (name, description, trigger_type, status, metadata)
    VALUES (
      'Trial Expiring',
      'Notificação de trial expirando com oferta de upgrade',
      'trial_expiring',
      'active',
      '{"category": "conversion", "priority": "critical"}'::JSONB
    )
    RETURNING id INTO v_sequence_id;
    
    -- Step 1: 3 days before
    INSERT INTO email_sequence_steps (sequence_id, step_order, template_name, delay_hours, delay_type, subject_template, metadata)
    VALUES (
      v_sequence_id, 1, 'TrialExpiringEmail', 0, 'immediate',
      '{{userName}}, seu trial expira em {{daysRemaining}} dias',
      '{"posthog_event": "email_trial_expiring_sent", "campaign": "trial_conversion"}'::JSONB
    );
    
    -- Step 2: 1 day before
    INSERT INTO email_sequence_steps (sequence_id, step_order, template_name, delay_hours, delay_type, subject_template, metadata, conditions)
    VALUES (
      v_sequence_id, 2, 'TrialExpiringEmail', 48, 'hours',
      '⏰ ÚLTIMO DIA: Seu trial expira amanhã',
      '{"posthog_event": "email_trial_last_day_sent"}'::JSONB,
      '{"user_status": "trial", "not_upgraded": true}'::JSONB
    );
  END IF;
END $$;

-- 5. Weekly Digest (manual trigger)
DO $$
DECLARE
  v_sequence_id UUID;
BEGIN
  SELECT id INTO v_sequence_id FROM email_sequences WHERE name = 'Weekly Performance Digest';
  
  IF v_sequence_id IS NULL THEN
    INSERT INTO email_sequences (name, description, trigger_type, status, metadata)
    VALUES (
      'Weekly Performance Digest',
      'Resumo semanal de performance (triggered by cron)',
      'manual',
      'active',
      '{"category": "retention", "priority": "medium", "cron": "0 9 * * 1"}'::JSONB
    );
  END IF;
END $$;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE email_sequences IS 'Master templates for email sequences (campaigns) - V2 enhanced';
COMMENT ON TABLE email_sequence_steps IS 'Individual steps/emails within a sequence';
COMMENT ON TABLE email_user_sequences IS 'Tracks which users are enrolled in which sequences';
COMMENT ON TABLE email_events IS 'Detailed event tracking for all email interactions';
COMMENT ON FUNCTION enqueue_next_sequence_step IS 'Automatically enqueues the next step in a sequence for a user';
