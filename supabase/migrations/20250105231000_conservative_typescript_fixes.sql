-- Conservative Migration: Only add missing columns and tables
-- Fixes TypeScript issues without breaking existing structure
-- Created: 2025-01-05

-- =====================================================
-- 1. EXTEND EXISTING TABLES
-- =====================================================

-- Add missing columns to leads table
DO $$ 
BEGIN
  -- Add user_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  
  -- Add priority column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'priority'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN priority text DEFAULT 'medium';
  END IF;
  
  -- Add budget column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'budget'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN budget numeric;
  END IF;
  
  -- Add score column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'score'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN score integer DEFAULT 0;
  END IF;
  
  -- Add conversion_probability column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'conversion_probability'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN conversion_probability integer DEFAULT 0;
  END IF;
  
  -- Add notes column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'notes'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN notes text;
  END IF;
END $$;

-- Update existing leads to have user_id from analysis_requests if possible
UPDATE public.leads 
SET user_id = (
  SELECT user_id FROM public.analysis_requests 
  WHERE analysis_requests.id = leads.analysis_id 
  LIMIT 1
)
WHERE user_id IS NULL AND analysis_id IS NOT NULL;

-- =====================================================
-- 2. CREATE NEW TABLES (Only if they don't exist)
-- =====================================================

-- Email accounts table
CREATE TABLE IF NOT EXISTS public.email_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('gmail', 'outlook', 'other')),
  email text NOT NULL,
  display_name text,
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  last_sync_at timestamptz,
  sync_status text DEFAULT 'pending' CHECK (sync_status IN ('pending', 'syncing', 'synced', 'error')),
  auto_sync boolean DEFAULT true,
  sync_frequency integer DEFAULT 300,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_user_email UNIQUE(user_id, email)
);

-- Email messages table
CREATE TABLE IF NOT EXISTS public.email_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id uuid NOT NULL REFERENCES public.email_accounts(id) ON DELETE CASCADE,
  external_id text NOT NULL,
  thread_id text,
  subject text NOT NULL DEFAULT '',
  from_email text NOT NULL,
  from_name text,
  to_emails text[] NOT NULL DEFAULT '{}',
  cc_emails text[] DEFAULT '{}',
  bcc_emails text[] DEFAULT '{}',
  body_text text,
  body_html text,
  attachments jsonb DEFAULT '[]'::jsonb,
  message_date timestamptz NOT NULL,
  is_read boolean DEFAULT false,
  is_sent boolean DEFAULT false,
  is_draft boolean DEFAULT false,
  labels text[] DEFAULT '{}',
  folder text DEFAULT 'inbox',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_account_external_id UNIQUE(account_id, external_id)
);

-- Commission goals table
CREATE TABLE IF NOT EXISTS public.commission_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_amount numeric NOT NULL CHECK (target_amount > 0),
  target_date date NOT NULL,
  target_period text NOT NULL DEFAULT 'monthly' CHECK (target_period IN ('weekly', 'monthly', 'quarterly', 'yearly')),
  current_progress numeric DEFAULT 0 CHECK (current_progress >= 0),
  percentage_complete numeric GENERATED ALWAYS AS (
    CASE 
      WHEN target_amount > 0 THEN LEAST(100, (current_progress / target_amount) * 100)
      ELSE 0
    END
  ) STORED,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  category text DEFAULT 'general',
  is_team_goal boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT future_target_date CHECK (target_date >= CURRENT_DATE)
);

-- Lead interactions table
CREATE TABLE IF NOT EXISTS public.lead_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('call', 'email', 'meeting', 'whatsapp', 'linkedin', 'other')),
  date timestamptz NOT NULL DEFAULT now(),
  duration integer,
  notes text,
  outcome text CHECK (outcome IN ('positive', 'neutral', 'negative', 'no_response')),
  next_action text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- 3. SAFE INDEXES (Only if tables exist)
-- =====================================================

-- Email system indexes
CREATE INDEX IF NOT EXISTS idx_email_accounts_user_active ON public.email_accounts(user_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_email_messages_account_date ON public.email_messages(account_id, message_date DESC);
CREATE INDEX IF NOT EXISTS idx_email_messages_user_date ON public.email_messages(user_id, message_date DESC);
CREATE INDEX IF NOT EXISTS idx_email_messages_unread ON public.email_messages(user_id, is_read) WHERE is_read = false;

-- Commission goals indexes
CREATE INDEX IF NOT EXISTS idx_commission_goals_user_status ON public.commission_goals(user_id, status);
CREATE INDEX IF NOT EXISTS idx_commission_goals_user_date ON public.commission_goals(user_id, target_date);
CREATE INDEX IF NOT EXISTS idx_commission_goals_active ON public.commission_goals(user_id) WHERE status = 'active';

-- Lead interactions indexes
CREATE INDEX IF NOT EXISTS idx_lead_interactions_lead_date ON public.lead_interactions(lead_id, date DESC);

-- Safe leads indexes (only create if user_id column exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'user_id'
  ) THEN
    CREATE INDEX IF NOT EXISTS idx_leads_user_status ON public.leads(user_id, status) WHERE user_id IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_leads_user_created ON public.leads(user_id, created_at DESC) WHERE user_id IS NOT NULL;
  END IF;
END $$;

-- =====================================================
-- 4. ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE public.email_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;

-- Email policies
CREATE POLICY "Users can manage their own email accounts"
  ON public.email_accounts FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own email messages"
  ON public.email_messages FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own email messages"
  ON public.email_messages FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Commission goals policies
CREATE POLICY "Users can manage their own commission goals"
  ON public.commission_goals FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Lead interactions policies
CREATE POLICY "Users can manage lead interactions for their leads"
  ON public.lead_interactions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.leads 
      WHERE id = lead_interactions.lead_id 
      AND (user_id = auth.uid() OR analysis_id IN (
        SELECT id FROM public.analysis_requests WHERE user_id = auth.uid()
      ))
    )
  )
  WITH CHECK (user_id = auth.uid());

-- Update leads RLS to include user_id if column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'user_id'
  ) THEN
    DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
    CREATE POLICY "Users can view their own leads"
      ON public.leads FOR SELECT
      USING (
        user_id = auth.uid() OR 
        analysis_id IN (SELECT id FROM public.analysis_requests WHERE user_id = auth.uid())
      );
      
    DROP POLICY IF EXISTS "Users can insert their own leads" ON public.leads;
    CREATE POLICY "Users can insert their own leads"
      ON public.leads FOR INSERT
      WITH CHECK (user_id = auth.uid());
      
    DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;  
    CREATE POLICY "Users can update their own leads"
      ON public.leads FOR UPDATE
      USING (
        user_id = auth.uid() OR 
        analysis_id IN (SELECT id FROM public.analysis_requests WHERE user_id = auth.uid())
      )
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

-- =====================================================
-- 5. TRIGGERS
-- =====================================================

-- Update timestamps trigger (reuse existing function)
CREATE TRIGGER update_email_accounts_updated_at 
  BEFORE UPDATE ON public.email_accounts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_messages_updated_at 
  BEFORE UPDATE ON public.email_messages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_commission_goals_updated_at 
  BEFORE UPDATE ON public.commission_goals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Get leads stats (compatible with existing structure)
CREATE OR REPLACE FUNCTION get_leads_stats(p_user_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_result jsonb;
  v_has_user_id boolean;
BEGIN
  -- Check if user_id column exists
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'user_id'
  ) INTO v_has_user_id;
  
  IF v_has_user_id THEN
    -- Use user_id if available
    SELECT jsonb_build_object(
      'total_leads', COUNT(*),
      'by_status', jsonb_object_agg(status, COUNT(*)),
      'avg_score', COALESCE(AVG(score), 0)
    )
    INTO v_result
    FROM public.leads
    WHERE user_id = p_user_id
    GROUP BY status;
  ELSE
    -- Fallback to analysis_id relationship
    SELECT jsonb_build_object(
      'total_leads', COUNT(*),
      'by_status', jsonb_object_agg(status, COUNT(*)),
      'avg_score', 0
    )
    INTO v_result
    FROM public.leads l
    WHERE l.analysis_id IN (
      SELECT id FROM public.analysis_requests WHERE user_id = p_user_id
    )
    GROUP BY status;
  END IF;
  
  RETURN COALESCE(v_result, '{"total_leads": 0, "by_status": {}, "avg_score": 0}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get email account summary
CREATE OR REPLACE FUNCTION get_email_summary(p_user_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_accounts', COUNT(*),
    'active_accounts', COUNT(*) FILTER (WHERE is_active = true),
    'total_messages', COALESCE(SUM(
      (SELECT COUNT(*) FROM public.email_messages WHERE account_id = ea.id)
    ), 0),
    'unread_messages', COALESCE(SUM(
      (SELECT COUNT(*) FROM public.email_messages WHERE account_id = ea.id AND is_read = false)
    ), 0)
  )
  INTO v_result
  FROM public.email_accounts ea
  WHERE ea.user_id = p_user_id;
  
  RETURN COALESCE(v_result, '{"total_accounts": 0, "active_accounts": 0, "total_messages": 0, "unread_messages": 0}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 7. COMMENTS
-- =====================================================

COMMENT ON TABLE public.email_accounts IS 'Connected email accounts (Gmail, Outlook)';
COMMENT ON TABLE public.email_messages IS 'Synchronized email messages';  
COMMENT ON TABLE public.commission_goals IS 'Commission goals and targets';
COMMENT ON TABLE public.lead_interactions IS 'Lead interaction history and notes';

COMMENT ON FUNCTION get_leads_stats IS 'Get leads statistics (compatible with existing structure)';
COMMENT ON FUNCTION get_email_summary IS 'Get email account summary';