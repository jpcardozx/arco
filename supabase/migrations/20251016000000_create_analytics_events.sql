-- Create analytics_events table for tracking user events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Event details
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  
  -- User tracking
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  
  -- Request metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  
  -- Additional context
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- RLS Policies
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert analytics events (for tracking)
CREATE POLICY "analytics_events_insert_public" ON analytics_events
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own events
CREATE POLICY "analytics_events_select_own" ON analytics_events
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all events (check if user is admin via auth metadata or custom claims)
CREATE POLICY "analytics_events_select_admin" ON analytics_events
  FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Comment
COMMENT ON TABLE analytics_events IS 'Tracks user events and analytics data';
