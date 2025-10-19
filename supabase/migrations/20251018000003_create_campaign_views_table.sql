-- Migration: Create campaign_views table for analytics
-- Author: ARCO System
-- Date: 2025-10-18
-- Description: Track individual page views for conversion funnel analysis

CREATE TABLE IF NOT EXISTS campaign_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Campaign reference
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  campaign_slug TEXT NOT NULL,
  
  -- Session tracking
  session_id UUID NOT NULL,
  visitor_id TEXT, -- Cookie-based persistent visitor ID
  
  -- Page info
  page_url TEXT NOT NULL,
  referrer TEXT,
  
  -- UTM parameters
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  
  -- Device info
  ip_address INET,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  browser TEXT,
  os TEXT,
  
  -- Geolocation (can be added via IP lookup)
  country_code TEXT,
  city TEXT,
  
  -- Interaction tracking
  time_on_page INTEGER, -- seconds
  scroll_depth INTEGER, -- percentage
  converted BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES leads(id)
);

-- Create indexes for analytics queries
CREATE INDEX idx_campaign_views_campaign_id ON campaign_views(campaign_id);
CREATE INDEX idx_campaign_views_campaign_slug ON campaign_views(campaign_slug);
CREATE INDEX idx_campaign_views_session_id ON campaign_views(session_id);
CREATE INDEX idx_campaign_views_visitor_id ON campaign_views(visitor_id);
CREATE INDEX idx_campaign_views_created_at ON campaign_views(created_at DESC);
CREATE INDEX idx_campaign_views_converted ON campaign_views(converted);
CREATE INDEX idx_campaign_views_utm_source ON campaign_views(utm_source);
CREATE INDEX idx_campaign_views_device_type ON campaign_views(device_type);

-- Create view for campaign analytics
CREATE OR REPLACE VIEW campaign_analytics AS
SELECT 
  c.id AS campaign_id,
  c.slug AS campaign_slug,
  c.name AS campaign_name,
  c.is_active,
  
  -- View metrics
  COUNT(DISTINCT cv.id) AS total_views,
  COUNT(DISTINCT cv.session_id) AS unique_sessions,
  COUNT(DISTINCT cv.visitor_id) AS unique_visitors,
  
  -- Conversion metrics
  COUNT(DISTINCT CASE WHEN cv.converted THEN cv.session_id END) AS conversions,
  ROUND(
    (COUNT(DISTINCT CASE WHEN cv.converted THEN cv.session_id END)::DECIMAL / 
     NULLIF(COUNT(DISTINCT cv.session_id), 0) * 100), 
    2
  ) AS conversion_rate,
  
  -- Engagement metrics
  ROUND(AVG(cv.time_on_page), 0) AS avg_time_on_page,
  ROUND(AVG(cv.scroll_depth), 0) AS avg_scroll_depth,
  
  -- Traffic sources
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.utm_source = 'google') AS google_views,
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.utm_source = 'facebook') AS facebook_views,
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.utm_source = 'instagram') AS instagram_views,
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.utm_source = 'linkedin') AS linkedin_views,
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.utm_source IS NULL) AS direct_views,
  
  -- Device breakdown
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.device_type = 'mobile') AS mobile_views,
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.device_type = 'desktop') AS desktop_views,
  COUNT(DISTINCT cv.id) FILTER (WHERE cv.device_type = 'tablet') AS tablet_views,
  
  -- Date range
  MIN(cv.created_at) AS first_view,
  MAX(cv.created_at) AS last_view

FROM campaigns c
LEFT JOIN campaign_views cv ON cv.campaign_id = c.id
GROUP BY c.id, c.slug, c.name, c.is_active;

-- Add RLS
ALTER TABLE campaign_views ENABLE ROW LEVEL SECURITY;

-- Policy: Service role full access
CREATE POLICY "Service role has full access to campaign_views"
  ON campaign_views
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Anonymous can insert views (for tracking)
CREATE POLICY "Anonymous can insert campaign views"
  ON campaign_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can read their campaign views
CREATE POLICY "Authenticated users can read campaign views"
  ON campaign_views
  FOR SELECT
  TO authenticated
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

-- Comments
COMMENT ON TABLE campaign_views IS 'Rastreamento de visualizações de landing pages para analytics';
COMMENT ON COLUMN campaign_views.session_id IS 'ID da sessão do navegador (gerado no frontend)';
COMMENT ON COLUMN campaign_views.visitor_id IS 'ID persistente do visitante (cookie)';
COMMENT ON COLUMN campaign_views.time_on_page IS 'Tempo na página em segundos';
COMMENT ON COLUMN campaign_views.scroll_depth IS 'Profundidade de scroll em porcentagem (0-100)';
