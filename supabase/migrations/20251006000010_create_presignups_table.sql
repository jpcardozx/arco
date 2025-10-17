-- Create presignups table for lead capture flow
-- Migration: 20251006000010_create_presignups_table
-- Depends on: 20251006000008_base_functions.sql

-- Validate dependencies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_updated_at') THEN
    RAISE EXCEPTION 'Required function set_updated_at() not found. Run base_functions migration first.';
  END IF;
END $$;

-- Create presignups table
CREATE TABLE IF NOT EXISTS public.presignups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User identification
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  
  -- Domain info
  domain TEXT NOT NULL,
  
  -- Lead qualification
  lead_score INTEGER DEFAULT 0,
  lead_tier TEXT CHECK (lead_tier IN ('hot', 'warm', 'cold')) DEFAULT 'cold',
  
  -- Session tracking
  token TEXT UNIQUE NOT NULL,
  session_id UUID,
  request_id UUID, -- FK removed: domain_analysis_requests may not exist
  
  -- Status
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  source TEXT DEFAULT 'url_analyzer',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referer TEXT,
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT presignups_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT presignups_domain_check CHECK (domain ~* '^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$'),
  CONSTRAINT presignups_lead_score_check CHECK (lead_score >= 0 AND lead_score <= 100)
);

-- Create indexes for performance
CREATE INDEX idx_presignups_email ON public.presignups(email);
CREATE INDEX idx_presignups_domain ON public.presignups(domain);
CREATE INDEX idx_presignups_token ON public.presignups(token);
CREATE INDEX idx_presignups_session_id ON public.presignups(session_id);
CREATE INDEX idx_presignups_request_id ON public.presignups(request_id);
CREATE INDEX idx_presignups_created_at ON public.presignups(created_at DESC);
CREATE INDEX idx_presignups_converted ON public.presignups(converted) WHERE NOT converted;
CREATE INDEX idx_presignups_expires_at ON public.presignups(expires_at) WHERE NOT converted;

-- Create updated_at trigger
CREATE TRIGGER set_presignups_updated_at
  BEFORE UPDATE ON public.presignups
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable RLS
ALTER TABLE public.presignups ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Admin can see all presignups
CREATE POLICY "Admins can view all presignups"
  ON public.presignups
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.tier = 'admin'
    )
  );

-- Users can see their own presignups by email
CREATE POLICY "Users can view their own presignups"
  ON public.presignups
  FOR SELECT
  TO authenticated
  USING (
    email = (
      SELECT email FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- Anonymous users can insert presignups
CREATE POLICY "Anyone can create presignups"
  ON public.presignups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can update presignups
CREATE POLICY "Admins can update presignups"
  ON public.presignups
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.tier = 'admin'
    )
  );

-- Function to cleanup expired presignups
CREATE OR REPLACE FUNCTION cleanup_expired_presignups()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.presignups
  WHERE expires_at < NOW()
  AND NOT converted
  AND created_at < NOW() - INTERVAL '30 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Create scheduled job to cleanup expired presignups (runs daily)
-- Note: Requires pg_cron extension
-- SELECT cron.schedule(
--   'cleanup-expired-presignups',
--   '0 2 * * *', -- Run at 2 AM daily
--   $$SELECT cleanup_expired_presignups();$$
-- );

-- Grant permissions
GRANT SELECT, INSERT ON public.presignups TO anon;
GRANT ALL ON public.presignups TO authenticated;
GRANT ALL ON public.presignups TO service_role;

-- Add comment
COMMENT ON TABLE public.presignups IS 'Pre-signup lead capture with token-based conversion flow';
COMMENT ON COLUMN public.presignups.lead_score IS 'Calculated lead quality score (0-100)';
COMMENT ON COLUMN public.presignups.token IS 'Unique token for signup prefill and tracking';
COMMENT ON COLUMN public.presignups.request_id IS 'Link to domain_analysis_requests if came from URL analyzer';
COMMENT ON COLUMN public.presignups.converted IS 'True when presignup converts to full user account';
