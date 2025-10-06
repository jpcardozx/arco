-- ============================================
-- ARCO MVP V1.0 - ROW LEVEL SECURITY POLICIES
-- ============================================
-- Migration: 002_rls_policies
-- Created: 2025-01-05
-- Description: Comprehensive RLS policies for tier system + admin access
-- ============================================

-- ============================================
-- 1. USER_PROFILES - RLS
-- ============================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view own profile
CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Users can update own profile (except tier/type)
CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid()
  -- Prevent self-upgrade (tier/type must be changed by admin)
  AND tier = (SELECT tier FROM user_profiles WHERE id = auth.uid())
  AND user_type = (SELECT user_type FROM user_profiles WHERE id = auth.uid())
);

-- Admins have full access to all profiles
CREATE POLICY "Admins can view all profiles"
ON user_profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

CREATE POLICY "Admins can update all profiles"
ON user_profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

CREATE POLICY "Admins can insert profiles"
ON user_profiles FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 2. ANALYSIS_REQUESTS - RLS
-- ============================================
ALTER TABLE analysis_requests ENABLE ROW LEVEL SECURITY;

-- Users can view own analyses
CREATE POLICY "Users can view own analyses"
ON analysis_requests FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Free users can create up to 3 analyses per month (enforced in application logic)
CREATE POLICY "Authenticated users can create analyses"
ON analysis_requests FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Admins can view all analyses
CREATE POLICY "Admins can view all analyses"
ON analysis_requests FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 3. ANALYSIS_RESULTS - RLS
-- ============================================
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Users can view results of their own analyses
CREATE POLICY "Users can view own analysis results"
ON analysis_results FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM analysis_requests 
    WHERE id = analysis_results.analysis_id 
    AND user_id = auth.uid()
  )
);

-- Admins can view all results
CREATE POLICY "Admins can view all results"
ON analysis_results FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 4. PLAYBOOKS - RLS (PUBLIC READ)
-- ============================================
ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;

-- All authenticated users can view published playbooks
CREATE POLICY "Users can view published playbooks"
ON playbooks FOR SELECT
TO authenticated
USING (is_published = true);

-- Admins can manage all playbooks
CREATE POLICY "Admins can manage playbooks"
ON playbooks FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 5. PROJECTS - RLS
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Clients can view own projects
CREATE POLICY "Clients can view own projects"
ON projects FOR SELECT
TO authenticated
USING (client_id = auth.uid());

-- Admins can manage all projects
CREATE POLICY "Admins can manage all projects"
ON projects FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 6. PROJECT_MILESTONES - RLS
-- ============================================
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;

-- Clients can view milestones of own projects
CREATE POLICY "Clients can view own project milestones"
ON project_milestones FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE id = project_milestones.project_id 
    AND client_id = auth.uid()
  )
);

-- Admins can manage all milestones
CREATE POLICY "Admins can manage all milestones"
ON project_milestones FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 7. PERFORMANCE_METRICS - RLS
-- ============================================
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- Paid clients can view metrics of own projects
CREATE POLICY "Paid clients can view own performance metrics"
ON performance_metrics FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE id = performance_metrics.project_id 
    AND client_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND tier = 'paid'
    )
  )
);

-- Admins can manage all metrics
CREATE POLICY "Admins can manage all metrics"
ON performance_metrics FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 8. UPTIME_CHECKS - RLS
-- ============================================
ALTER TABLE uptime_checks ENABLE ROW LEVEL SECURITY;

-- Paid clients can view uptime of own projects
CREATE POLICY "Paid clients can view own uptime checks"
ON uptime_checks FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE id = uptime_checks.project_id 
    AND client_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND tier = 'paid'
    )
  )
);

-- Admins can manage all uptime checks
CREATE POLICY "Admins can manage all uptime checks"
ON uptime_checks FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 9. CAMPAIGNS - RLS
-- ============================================
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Paid clients can view own campaigns
CREATE POLICY "Paid clients can view own campaigns"
ON campaigns FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
  )
);

-- Admins can manage all campaigns
CREATE POLICY "Admins can manage all campaigns"
ON campaigns FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 10. CAMPAIGN_METRICS - RLS
-- ============================================
ALTER TABLE campaign_metrics ENABLE ROW LEVEL SECURITY;

-- Paid clients can view metrics of own campaigns
CREATE POLICY "Paid clients can view own campaign metrics"
ON campaign_metrics FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM campaigns 
    WHERE id = campaign_metrics.campaign_id 
    AND client_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND tier = 'paid'
    )
  )
);

-- Admins can manage all campaign metrics (including manual input 🎩)
CREATE POLICY "Admins can manage all campaign metrics"
ON campaign_metrics FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 11. SUPPORT_TICKETS - RLS
-- ============================================
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Clients can view own tickets
CREATE POLICY "Clients can view own tickets"
ON support_tickets FOR SELECT
TO authenticated
USING (client_id = auth.uid());

-- Paid clients can create tickets (unlimited)
CREATE POLICY "Paid clients can create tickets"
ON support_tickets FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
  )
);

-- Clients can update own tickets (only status to 'closed')
CREATE POLICY "Clients can close own tickets"
ON support_tickets FOR UPDATE
TO authenticated
USING (client_id = auth.uid())
WITH CHECK (
  client_id = auth.uid()
  AND status = 'closed'
);

-- Admins can manage all tickets
CREATE POLICY "Admins can manage all tickets"
ON support_tickets FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 12. SUPPORT_TICKET_MESSAGES - RLS
-- ============================================
ALTER TABLE support_ticket_messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages of tickets they have access to
CREATE POLICY "Users can view own ticket messages"
ON support_ticket_messages FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE id = support_ticket_messages.ticket_id 
    AND (
      client_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = auth.uid() 
        AND user_type = 'admin'
      )
    )
  )
);

-- Users can insert messages on tickets they have access to
CREATE POLICY "Users can create messages on accessible tickets"
ON support_ticket_messages FOR INSERT
TO authenticated
WITH CHECK (
  author_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE id = support_ticket_messages.ticket_id 
    AND (
      client_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = auth.uid() 
        AND user_type = 'admin'
      )
    )
  )
);

-- ============================================
-- 13. STORAGE_ITEMS - RLS WITH QUOTA
-- ============================================
ALTER TABLE storage_items ENABLE ROW LEVEL SECURITY;

-- Clients can view own files
CREATE POLICY "Clients can view own files"
ON storage_items FOR SELECT
TO authenticated
USING (client_id = auth.uid());

-- Paid clients can upload files (within 10GB quota - enforced in app logic)
CREATE POLICY "Paid clients can upload files"
ON storage_items FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND uploaded_by = auth.uid()
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
    AND storage_used_mb < 10240  -- 10GB = 10240MB
  )
);

-- Clients can delete own files
CREATE POLICY "Clients can delete own files"
ON storage_items FOR DELETE
TO authenticated
USING (client_id = auth.uid());

-- Admins can manage all files
CREATE POLICY "Admins can manage all files"
ON storage_items FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 14. AGENCY_INSIGHTS - RLS
-- ============================================
ALTER TABLE agency_insights ENABLE ROW LEVEL SECURITY;

-- Paid clients can view published insights for them
CREATE POLICY "Paid clients can view own insights"
ON agency_insights FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  AND is_published = true
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
  )
);

-- Admins can manage all insights
CREATE POLICY "Admins can manage all insights"
ON agency_insights FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 15. LEADS - RLS (ADMIN ONLY)
-- ============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Only admins can access leads
CREATE POLICY "Admins can manage all leads"
ON leads FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 16. PROPOSALS - RLS
-- ============================================
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Clients can view proposals sent to them
CREATE POLICY "Clients can view own proposals"
ON proposals FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR lead_id IN (SELECT id FROM leads WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Admins can manage all proposals
CREATE POLICY "Admins can manage all proposals"
ON proposals FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 17. INTEGRATIONS - RLS
-- ============================================
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Clients can view own integrations
CREATE POLICY "Clients can view own integrations"
ON integrations FOR SELECT
TO authenticated
USING (client_id = auth.uid());

-- Paid clients can request integrations
CREATE POLICY "Paid clients can request integrations"
ON integrations FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
  )
);

-- Admins can manage all integrations
CREATE POLICY "Admins can manage all integrations"
ON integrations FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 18. TEAM_MEMBERS - RLS
-- ============================================
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Client owners/admins can view their team
CREATE POLICY "Clients can view own team"
ON team_members FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR user_id = auth.uid()
);

-- Client owners can manage team members
CREATE POLICY "Client owners can manage team"
ON team_members FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM team_members 
    WHERE client_id = team_members.client_id 
    AND user_id = auth.uid() 
    AND role IN ('owner', 'admin')
  )
);

-- Admins can manage all teams
CREATE POLICY "Admins can manage all teams"
ON team_members FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 19. DOMAIN_MONITORING - RLS
-- ============================================
ALTER TABLE domain_monitoring ENABLE ROW LEVEL SECURITY;

-- Paid clients can view monitoring of own projects
CREATE POLICY "Paid clients can view own domain monitoring"
ON domain_monitoring FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE id = domain_monitoring.project_id 
    AND client_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND tier = 'paid'
    )
  )
);

-- Admins can manage all domain monitoring
CREATE POLICY "Admins can manage all domain monitoring"
ON domain_monitoring FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 20. ANALYTICS_DATA - RLS
-- ============================================
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;

-- Paid clients can view analytics of own projects
CREATE POLICY "Paid clients can view own analytics"
ON analytics_data FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE id = analytics_data.project_id 
    AND client_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND tier = 'paid'
    )
  )
);

-- Admins can manage all analytics data
CREATE POLICY "Admins can manage all analytics data"
ON analytics_data FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- 21. PLATFORM_SETTINGS - RLS (ADMIN ONLY)
-- ============================================
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can access platform settings
CREATE POLICY "Admins can manage platform settings"
ON platform_settings FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- STORAGE BUCKETS - RLS
-- ============================================

-- Create client-files bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('client-files', 'client-files', false)
ON CONFLICT (id) DO NOTHING;

-- Bucket policy: clients can view own files
CREATE POLICY "Clients can view own files in bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'client-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Bucket policy: paid clients can upload files
CREATE POLICY "Paid clients can upload files to bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'client-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
  )
);

-- Bucket policy: clients can delete own files
CREATE POLICY "Clients can delete own files from bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'client-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Bucket policy: admins have full access
CREATE POLICY "Admins have full access to bucket"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'client-files'
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
);

-- ============================================
-- HELPER FUNCTIONS FOR RLS
-- ============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is paid tier
CREATE OR REPLACE FUNCTION is_paid_tier()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's current storage usage
CREATE OR REPLACE FUNCTION get_storage_usage(user_uuid UUID)
RETURNS NUMERIC AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(size_bytes), 0) / (1024.0 * 1024.0)  -- Convert to MB
    FROM storage_items 
    WHERE client_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update storage_used_mb after insert/delete
CREATE OR REPLACE FUNCTION update_storage_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE user_profiles 
    SET storage_used_mb = get_storage_usage(NEW.client_id)
    WHERE id = NEW.client_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE user_profiles 
    SET storage_used_mb = get_storage_usage(OLD.client_id)
    WHERE id = OLD.client_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_storage_usage_trigger
AFTER INSERT OR DELETE ON storage_items
FOR EACH ROW
EXECUTE FUNCTION update_storage_usage();

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- Total RLS policies created: 50+
-- Total helper functions: 4
-- Total triggers: 1
-- ============================================
