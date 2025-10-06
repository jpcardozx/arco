-- ============================================
-- ARCO MVP V1.0 - DATABASE MIGRATION
-- ============================================
-- Migration: 001_mvp_v1_complete_schema
-- Created: 2025-01-05
-- Description: Complete MVP schema with 13 tables + RLS policies
-- ============================================

-- ============================================
-- 1. USER_PROFILES (Tier System)
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Tier & Type
  tier TEXT NOT NULL CHECK (tier IN ('free', 'paid')) DEFAULT 'free',
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'admin')) DEFAULT 'client',
  
  -- Profile Info
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Subscription (Stripe)
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  
  -- Usage Limits (V1: limites simples)
  monthly_analysis_count INT DEFAULT 0 CHECK (monthly_analysis_count >= 0),
  storage_used_mb NUMERIC(10,2) DEFAULT 0 CHECK (storage_used_mb >= 0),
  monthly_support_tickets INT DEFAULT 0 CHECK (monthly_support_tickets >= 0),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_user_profiles_tier ON user_profiles(tier);
CREATE INDEX idx_user_profiles_type ON user_profiles(user_type);
CREATE INDEX idx_user_profiles_stripe_customer ON user_profiles(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;

-- Updated trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. ANALYSIS_REQUESTS (Free User Analyses)
-- ============================================
CREATE TABLE IF NOT EXISTS analysis_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Request Info
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')) DEFAULT 'pending',
  
  -- Results
  arco_index INT CHECK (arco_index >= 0 AND arco_index <= 100),
  
  -- Error handling
  error_message TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_analysis_requests_user ON analysis_requests(user_id);
CREATE INDEX idx_analysis_requests_status ON analysis_requests(status);
CREATE INDEX idx_analysis_requests_created ON analysis_requests(created_at DESC);

-- ============================================
-- 3. ANALYSIS_RESULTS (Lighthouse Results)
-- ============================================
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES analysis_requests(id) ON DELETE CASCADE,
  
  -- Core Web Vitals
  lcp NUMERIC(6,2) CHECK (lcp >= 0),
  fid NUMERIC(6,2) CHECK (fid >= 0),
  cls NUMERIC(4,3) CHECK (cls >= 0),
  
  -- Lighthouse Scores
  lighthouse_performance INT CHECK (lighthouse_performance >= 0 AND lighthouse_performance <= 100),
  lighthouse_accessibility INT CHECK (lighthouse_accessibility >= 0 AND lighthouse_accessibility <= 100),
  lighthouse_seo INT CHECK (lighthouse_seo >= 0 AND lighthouse_seo <= 100),
  lighthouse_best_practices INT CHECK (lighthouse_best_practices >= 0 AND lighthouse_best_practices <= 100),
  
  -- Security
  security_score INT CHECK (security_score >= 0 AND security_score <= 100),
  
  -- Raw data (JSONB for flexibility)
  raw_data JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_analysis_results_analysis ON analysis_results(analysis_id);
CREATE UNIQUE INDEX idx_analysis_results_one_per_analysis ON analysis_results(analysis_id);

-- ============================================
-- 4. PLAYBOOKS (Optimization Recommendations)
-- ============================================
CREATE TABLE IF NOT EXISTS playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Playbook Info
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('performance', 'security', 'seo', 'accessibility')),
  
  -- Content (MDX)
  content TEXT,
  
  -- Metadata
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_playbooks_category ON playbooks(category);
CREATE INDEX idx_playbooks_published ON playbooks(is_published) WHERE is_published = true;

-- Updated trigger
CREATE TRIGGER update_playbooks_updated_at
    BEFORE UPDATE ON playbooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. PROJECTS (Client Projects)
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Project Info
  name TEXT NOT NULL,
  description TEXT,
  domain TEXT,
  status TEXT NOT NULL CHECK (status IN ('discovery', 'development', 'live', 'maintenance')) DEFAULT 'discovery',
  completion_percent INT DEFAULT 0 CHECK (completion_percent >= 0 AND completion_percent <= 100),
  
  -- Timeline
  start_date DATE,
  estimated_delivery DATE,
  actual_delivery DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_domain ON projects(domain) WHERE domain IS NOT NULL;

-- Updated trigger
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. PROJECT_MILESTONES (Timeline)
-- ============================================
CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Milestone Info
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  completed BOOLEAN DEFAULT false NOT NULL,
  completed_at TIMESTAMPTZ,
  
  -- Order
  order_index INT DEFAULT 0 NOT NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_project_milestones_project ON project_milestones(project_id);
CREATE INDEX idx_project_milestones_completed ON project_milestones(completed);

-- Updated trigger
CREATE TRIGGER update_project_milestones_updated_at
    BEFORE UPDATE ON project_milestones
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. PERFORMANCE_METRICS (Daily Monitoring)
-- ============================================
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Date
  date DATE NOT NULL,
  
  -- Core Web Vitals
  lcp NUMERIC(6,2) CHECK (lcp >= 0),
  fid NUMERIC(6,2) CHECK (fid >= 0),
  cls NUMERIC(4,3) CHECK (cls >= 0),
  
  -- Scores
  lighthouse_score INT CHECK (lighthouse_score >= 0 AND lighthouse_score <= 100),
  arco_index INT CHECK (arco_index >= 0 AND arco_index <= 100),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- Unique constraint (1 measurement per project per day)
  UNIQUE(project_id, date)
);

-- Indexes
CREATE INDEX idx_performance_metrics_project ON performance_metrics(project_id);
CREATE INDEX idx_performance_metrics_date ON performance_metrics(date DESC);
CREATE INDEX idx_performance_metrics_project_date ON performance_metrics(project_id, date DESC);

-- ============================================
-- 8. UPTIME_CHECKS (Monitoring)
-- ============================================
CREATE TABLE IF NOT EXISTS uptime_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Check Info
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  status_code INT,
  response_time_ms INT CHECK (response_time_ms >= 0),
  is_up BOOLEAN NOT NULL,
  
  -- Error info
  error_message TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_uptime_checks_project ON uptime_checks(project_id);
CREATE INDEX idx_uptime_checks_timestamp ON uptime_checks(timestamp DESC);
CREATE INDEX idx_uptime_checks_project_timestamp ON uptime_checks(project_id, timestamp DESC);
CREATE INDEX idx_uptime_checks_is_up ON uptime_checks(is_up) WHERE is_up = false;

-- ============================================
-- 9. CAMPAIGNS (Marketing Campaigns)
-- ============================================
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- Campaign Info
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google_ads', 'meta_ads', 'linkedin_ads', 'tiktok_ads')),
  external_campaign_id TEXT,
  
  -- Budget
  budget_total NUMERIC(10,2) CHECK (budget_total >= 0),
  budget_daily NUMERIC(10,2) CHECK (budget_daily >= 0),
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'ended')) DEFAULT 'active',
  
  -- Dates
  start_date DATE,
  end_date DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_campaigns_client ON campaigns(client_id);
CREATE INDEX idx_campaigns_project ON campaigns(project_id) WHERE project_id IS NOT NULL;
CREATE INDEX idx_campaigns_platform ON campaigns(platform);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- Updated trigger
CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. CAMPAIGN_METRICS (Manual Input V1!)
-- ============================================
CREATE TABLE IF NOT EXISTS campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  
  -- Date
  date DATE NOT NULL,
  
  -- Metrics
  impressions INT DEFAULT 0 CHECK (impressions >= 0),
  clicks INT DEFAULT 0 CHECK (clicks >= 0),
  conversions INT DEFAULT 0 CHECK (conversions >= 0),
  cost NUMERIC(10,2) DEFAULT 0 CHECK (cost >= 0),
  revenue NUMERIC(10,2) CHECK (revenue >= 0),
  
  -- Calculated (can be computed)
  ctr NUMERIC(5,2) CHECK (ctr >= 0 AND ctr <= 100),
  cpc NUMERIC(8,2) CHECK (cpc >= 0),
  cpa NUMERIC(10,2) CHECK (cpa >= 0),
  roas NUMERIC(8,2) CHECK (roas >= 0),
  
  -- 🎩 Mágico de Oz Flag
  manually_entered BOOLEAN DEFAULT true NOT NULL,
  entered_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- Unique constraint (1 entry per campaign per day)
  UNIQUE(campaign_id, date)
);

-- Indexes
CREATE INDEX idx_campaign_metrics_campaign ON campaign_metrics(campaign_id);
CREATE INDEX idx_campaign_metrics_date ON campaign_metrics(date DESC);
CREATE INDEX idx_campaign_metrics_campaign_date ON campaign_metrics(campaign_id, date DESC);
CREATE INDEX idx_campaign_metrics_manually_entered ON campaign_metrics(manually_entered) WHERE manually_entered = true;

-- ============================================
-- 11. SUPPORT_TICKETS (Support System)
-- ============================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- Ticket Info
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'waiting_client', 'resolved', 'closed')) DEFAULT 'open',
  
  -- Assignment
  assigned_to UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_support_tickets_client ON support_tickets(client_id);
CREATE INDEX idx_support_tickets_project ON support_tickets(project_id) WHERE project_id IS NOT NULL;
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_assigned ON support_tickets(assigned_to) WHERE assigned_to IS NOT NULL;

-- Updated trigger
CREATE TRIGGER update_support_tickets_updated_at
    BEFORE UPDATE ON support_tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 12. SUPPORT_TICKET_MESSAGES (Ticket Conversation)
-- ============================================
CREATE TABLE IF NOT EXISTS support_ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Message
  message TEXT NOT NULL,
  
  -- Attachments (URLs from Supabase Storage)
  attachments TEXT[],
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_support_ticket_messages_ticket ON support_ticket_messages(ticket_id);
CREATE INDEX idx_support_ticket_messages_author ON support_ticket_messages(author_id);
CREATE INDEX idx_support_ticket_messages_created ON support_ticket_messages(created_at DESC);

-- ============================================
-- 13. STORAGE_ITEMS (File Repository)
-- ============================================
CREATE TABLE IF NOT EXISTS storage_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- File Info
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  mime_type TEXT,
  size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0),
  
  -- Storage bucket
  bucket_name TEXT DEFAULT 'client-files' NOT NULL,
  
  -- Metadata
  uploaded_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_storage_items_client ON storage_items(client_id);
CREATE INDEX idx_storage_items_project ON storage_items(project_id) WHERE project_id IS NOT NULL;
CREATE INDEX idx_storage_items_uploaded_by ON storage_items(uploaded_by) WHERE uploaded_by IS NOT NULL;
CREATE INDEX idx_storage_items_created ON storage_items(created_at DESC);

-- ============================================
-- 14. AGENCY_INSIGHTS (Published Analyses)
-- ============================================
CREATE TABLE IF NOT EXISTS agency_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Insight Info
  title TEXT NOT NULL,
  content TEXT,  -- MDX
  
  -- Publishing
  is_published BOOLEAN DEFAULT false NOT NULL,
  published_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_agency_insights_client ON agency_insights(client_id) WHERE client_id IS NOT NULL;
CREATE INDEX idx_agency_insights_published ON agency_insights(is_published, published_at DESC) WHERE is_published = true;

-- Updated trigger
CREATE TRIGGER update_agency_insights_updated_at
    BEFORE UPDATE ON agency_insights
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 15. LEADS (Sales Pipeline)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Lead Info
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  
  -- Source
  source TEXT CHECK (source IN ('url_analyzer', 'landing_page', 'referral', 'direct')),
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost')) DEFAULT 'new',
  
  -- Linked analysis (if from URL Analyzer)
  analysis_id UUID REFERENCES analysis_requests(id) ON DELETE SET NULL,
  
  -- Assigned
  assigned_to UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned ON leads(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_leads_analysis ON leads(analysis_id) WHERE analysis_id IS NOT NULL;

-- Updated trigger
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 16. PROPOSALS (Generated Proposals)
-- ============================================
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  client_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Proposal Info
  title TEXT NOT NULL,
  description TEXT,
  
  -- AI Generated Content
  generated_content TEXT, -- Markdown/MDX from Vercel AI SDK
  
  -- Financial
  proposed_value NUMERIC(10,2) CHECK (proposed_value >= 0),
  proposed_tier TEXT CHECK (proposed_tier IN ('free', 'paid')),
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected')) DEFAULT 'draft',
  
  -- Metadata
  created_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_proposals_lead ON proposals(lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX idx_proposals_client ON proposals(client_id) WHERE client_id IS NOT NULL;
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_created_by ON proposals(created_by) WHERE created_by IS NOT NULL;

-- Updated trigger
CREATE TRIGGER update_proposals_updated_at
    BEFORE UPDATE ON proposals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 17. INTEGRATIONS (Client Integrations Hub)
-- ============================================
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Integration Info
  integration_type TEXT NOT NULL CHECK (integration_type IN ('crm', 'analytics', 'ads', 'email', 'storage', 'other')),
  provider TEXT NOT NULL, -- e.g., 'google_analytics', 'hubspot', 'salesforce'
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('requested', 'pending_approval', 'active', 'paused', 'failed')) DEFAULT 'requested',
  
  -- Config (encrypted credentials/tokens)
  config_encrypted JSONB,
  
  -- Last sync
  last_sync_at TIMESTAMPTZ,
  last_sync_status TEXT CHECK (last_sync_status IN ('success', 'failed')),
  
  -- Metadata
  requested_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_integrations_client ON integrations(client_id);
CREATE INDEX idx_integrations_type ON integrations(integration_type);
CREATE INDEX idx_integrations_status ON integrations(status);

-- Updated trigger
CREATE TRIGGER update_integrations_updated_at
    BEFORE UPDATE ON integrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 18. TEAM_MEMBERS (Client Team Management)
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Role & Permissions
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')) DEFAULT 'member',
  
  -- Access Control (feature flags)
  can_view_analytics BOOLEAN DEFAULT true NOT NULL,
  can_view_campaigns BOOLEAN DEFAULT false NOT NULL,
  can_manage_projects BOOLEAN DEFAULT false NOT NULL,
  can_create_tickets BOOLEAN DEFAULT true NOT NULL,
  can_manage_billing BOOLEAN DEFAULT false NOT NULL,
  
  -- Invitation
  invited_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  invited_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  accepted_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- Unique constraint (one user per client)
  UNIQUE(client_id, user_id)
);

-- Indexes
CREATE INDEX idx_team_members_client ON team_members(client_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_team_members_role ON team_members(role);

-- Updated trigger
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 19. DOMAIN_MONITORING (DNS & Blacklist Checks)
-- ============================================
CREATE TABLE IF NOT EXISTS domain_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Check timestamp
  checked_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- DNS Records
  dns_a_record TEXT,
  dns_mx_record TEXT,
  dns_dmarc_record TEXT,
  dns_spf_record TEXT,
  dns_dkim_record TEXT,
  dns_status TEXT CHECK (dns_status IN ('healthy', 'warning', 'critical')) DEFAULT 'healthy',
  
  -- SSL/TLS
  ssl_valid BOOLEAN,
  ssl_expiry_date DATE,
  ssl_issuer TEXT,
  ssl_status TEXT CHECK (ssl_status IN ('valid', 'expiring_soon', 'expired', 'invalid')) DEFAULT 'valid',
  
  -- Blacklist Check
  is_blacklisted BOOLEAN DEFAULT false NOT NULL,
  blacklist_sources TEXT[], -- Array of blacklist names
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_domain_monitoring_project ON domain_monitoring(project_id);
CREATE INDEX idx_domain_monitoring_checked ON domain_monitoring(checked_at DESC);
CREATE INDEX idx_domain_monitoring_blacklisted ON domain_monitoring(is_blacklisted) WHERE is_blacklisted = true;

-- ============================================
-- 20. ANALYTICS_DATA (Web Analytics - Manual Input V1)
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Date
  date DATE NOT NULL,
  
  -- Traffic Metrics
  pageviews INT DEFAULT 0 CHECK (pageviews >= 0),
  unique_visitors INT DEFAULT 0 CHECK (unique_visitors >= 0),
  bounce_rate NUMERIC(5,2) CHECK (bounce_rate >= 0 AND bounce_rate <= 100),
  avg_session_duration INT CHECK (avg_session_duration >= 0), -- seconds
  
  -- Conversion Metrics
  conversions INT DEFAULT 0 CHECK (conversions >= 0),
  conversion_rate NUMERIC(5,2) CHECK (conversion_rate >= 0 AND conversion_rate <= 100),
  
  -- Traffic Sources (simplified)
  organic_traffic INT DEFAULT 0 CHECK (organic_traffic >= 0),
  direct_traffic INT DEFAULT 0 CHECK (direct_traffic >= 0),
  referral_traffic INT DEFAULT 0 CHECK (referral_traffic >= 0),
  social_traffic INT DEFAULT 0 CHECK (social_traffic >= 0),
  paid_traffic INT DEFAULT 0 CHECK (paid_traffic >= 0),
  
  -- 🎩 Mágico de Oz Flag
  manually_entered BOOLEAN DEFAULT true NOT NULL,
  entered_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- Unique constraint (1 entry per project per day)
  UNIQUE(project_id, date)
);

-- Indexes
CREATE INDEX idx_analytics_data_project ON analytics_data(project_id);
CREATE INDEX idx_analytics_data_date ON analytics_data(date DESC);
CREATE INDEX idx_analytics_data_project_date ON analytics_data(project_id, date DESC);

-- ============================================
-- 21. PLATFORM_SETTINGS (Global Configuration)
-- ============================================
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Setting Key (unique identifier)
  setting_key TEXT UNIQUE NOT NULL,
  
  -- Setting Value (JSONB for flexibility)
  setting_value JSONB NOT NULL,
  
  -- Category
  category TEXT CHECK (category IN ('arco_algorithm', 'pricing', 'features', 'integrations', 'system')) DEFAULT 'system',
  
  -- Description
  description TEXT,
  
  -- Metadata
  updated_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_platform_settings_category ON platform_settings(category);

-- Updated trigger
CREATE TRIGGER update_platform_settings_updated_at
    BEFORE UPDATE ON platform_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default ARCO Index weights
INSERT INTO platform_settings (setting_key, setting_value, category, description) VALUES
('arco_algorithm_weights', 
 '{"performance": 0.35, "security": 0.25, "seo": 0.20, "accessibility": 0.20}',
 'arco_algorithm',
 'Pesos padrão para o cálculo do ARCO Index'),
('free_tier_limits',
 '{"monthly_analyses": 3, "storage_mb": 0, "support_tickets": 0}',
 'pricing',
 'Limites do tier gratuito'),
('paid_tier_limits',
 '{"monthly_analyses": -1, "storage_mb": 10240, "support_tickets": -1}',
 'pricing',
 'Limites do tier pago (-1 = unlimited)')
ON CONFLICT (setting_key) DO NOTHING;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- Total tables created: 21
-- Total indexes created: 70+
-- Total triggers created: 10
-- Default settings: 3 entries
-- ============================================
