/**
 * Add Email Verification System
 *
 * Enables email validation to ensure:
 * - Correct email addresses are captured
 * - Reduces bounces and delivery issues
 * - Improves lead quality
 * - Provides verification status for scoring
 */

-- Create email verification table
CREATE TABLE IF NOT EXISTS email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  email TEXT NOT NULL,

  -- Verification details
  verification_token TEXT NOT NULL UNIQUE,
  verification_method TEXT DEFAULT 'link' CHECK (verification_method IN ('link', 'code', 'auto')),

  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'verified', 'failed', 'expired')),
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours',

  -- Attempt tracking
  attempt_count INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,

  -- Email validation details (from third-party service if integrated)
  smtp_valid BOOLEAN,
  is_deliverable BOOLEAN,
  validation_source TEXT, -- 'zebra', 'verimail', 'manual', etc

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_verifications_lead ON email_verifications(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(verification_token);
CREATE INDEX IF NOT EXISTS idx_email_verifications_status ON email_verifications(status);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires ON email_verifications(expires_at) WHERE status = 'pending';

-- Add columns to leads table for verification tracking
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS email_verification_status TEXT DEFAULT 'pending' CHECK (email_verification_status IN ('pending', 'verified', 'failed', 'bounced')),
ADD COLUMN IF NOT EXISTS email_verified_source TEXT; -- 'manual', 'link', 'auto', etc

-- Create function to generate verification token
CREATE OR REPLACE FUNCTION generate_verification_token()
RETURNS TEXT AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Create function to send verification email
CREATE OR REPLACE FUNCTION create_email_verification(
  p_lead_id UUID,
  p_email TEXT
)
RETURNS TABLE(verification_id UUID, verification_token TEXT) AS $$
DECLARE
  v_token TEXT;
  v_verification_id UUID;
BEGIN
  -- Generate unique token
  v_token := generate_verification_token();

  -- Insert verification record
  INSERT INTO email_verifications (
    lead_id,
    email,
    verification_token,
    verification_method,
    status
  ) VALUES (
    p_lead_id,
    p_email,
    v_token,
    'link',
    'pending'
  )
  RETURNING id, verification_token
  INTO v_verification_id, v_token;

  RETURN QUERY SELECT v_verification_id, v_token;
END;
$$ LANGUAGE plpgsql;

-- Create function to verify email
CREATE OR REPLACE FUNCTION verify_email_token(
  p_lead_id UUID,
  p_token TEXT
)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
DECLARE
  v_verification RECORD;
BEGIN
  -- Find verification record
  SELECT * INTO v_verification FROM email_verifications
  WHERE lead_id = p_lead_id
    AND verification_token = p_token
    AND status = 'pending'
    AND expires_at > NOW();

  IF v_verification IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Token inválido ou expirado'::TEXT;
    RETURN;
  END IF;

  IF v_verification.attempt_count >= v_verification.max_attempts THEN
    UPDATE email_verifications
    SET status = 'failed'
    WHERE id = v_verification.id;

    RETURN QUERY SELECT FALSE, 'Máximo de tentativas excedido'::TEXT;
    RETURN;
  END IF;

  -- Mark as verified
  UPDATE email_verifications
  SET
    status = 'verified',
    verified_at = NOW()
  WHERE id = v_verification.id;

  -- Update lead verification status
  UPDATE leads
  SET
    email_verified = TRUE,
    email_verified_at = NOW(),
    email_verification_status = 'verified',
    email_verified_source = 'link'
  WHERE id = p_lead_id;

  -- Recalculate lead score with verification bonus
  PERFORM calculate_lead_score(p_lead_id);

  RETURN QUERY SELECT TRUE, 'Email verificado com sucesso!'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Create function to mark email as bounced
CREATE OR REPLACE FUNCTION mark_email_bounced(
  p_lead_id UUID,
  p_reason TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE leads
  SET
    email_verification_status = 'bounced',
    email_verified = FALSE
  WHERE id = p_lead_id;

  -- Mark all related verifications as failed
  UPDATE email_verifications
  SET status = 'failed'
  WHERE lead_id = p_lead_id
    AND status != 'verified';

  -- Update lead score (will reduce qualification)
  PERFORM calculate_lead_score(p_lead_id);
END;
$$ LANGUAGE plpgsql;

-- Create function to auto-verify simple patterns (optional, can be disabled)
CREATE OR REPLACE FUNCTION auto_verify_email_simple(
  p_lead_id UUID,
  p_email TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_is_valid BOOLEAN;
BEGIN
  -- Simple email validation pattern
  -- In production, integrate with third-party service like Zebra Verify
  v_is_valid := p_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$';

  IF v_is_valid THEN
    -- Mark as auto-verified
    INSERT INTO email_verifications (
      lead_id,
      email,
      verification_token,
      verification_method,
      status,
      verified_at
    ) VALUES (
      p_lead_id,
      p_email,
      generate_verification_token(),
      'auto',
      'verified',
      NOW()
    );

    UPDATE leads
    SET
      email_verified = TRUE,
      email_verified_at = NOW(),
      email_verification_status = 'verified',
      email_verified_source = 'auto'
    WHERE id = p_lead_id;

    -- Recalculate score
    PERFORM calculate_lead_score(p_lead_id);

    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-verify on lead insert (optional)
CREATE OR REPLACE FUNCTION trigger_auto_verify_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Try simple validation first
  PERFORM auto_verify_email_simple(NEW.id, NEW.email);

  -- If not auto-verified, create verification request
  IF NOT NEW.email_verified THEN
    PERFORM create_email_verification(NEW.id, NEW.email);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_verify_on_insert ON leads;
CREATE TRIGGER trigger_auto_verify_on_insert
AFTER INSERT ON leads
FOR EACH ROW
EXECUTE FUNCTION trigger_auto_verify_on_insert();

-- Grant permissions
GRANT EXECUTE ON FUNCTION generate_verification_token TO authenticated, anon;
GRANT EXECUTE ON FUNCTION create_email_verification TO authenticated, anon;
GRANT EXECUTE ON FUNCTION verify_email_token TO authenticated, anon;
GRANT EXECUTE ON FUNCTION mark_email_bounced TO authenticated, anon;
GRANT EXECUTE ON FUNCTION auto_verify_email_simple TO authenticated, anon;
