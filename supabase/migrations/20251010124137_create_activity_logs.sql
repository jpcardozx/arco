-- Activity Logs Table for Dashboard Analytics
-- Execute this SQL in your Supabase SQL Editor

-- Ensure uuid extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('page_view', 'navigation', 'action', 'error', 'auth', 'api_call')),
  activity_name TEXT NOT NULL,
  metadata JSONB,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_activity_type ON activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_session_id ON activity_logs(session_id);

-- Enable RLS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own logs
CREATE POLICY "Users can view own logs" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own logs
CREATE POLICY "Users can insert own logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can see all logs
CREATE POLICY "Admins can view all logs" ON activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.user_type = 'admin'
    )
  );

-- Admins can delete old logs (cleanup)
CREATE POLICY "Admins can delete logs" ON activity_logs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.user_type = 'admin'
    )
  );

-- Comments
COMMENT ON TABLE activity_logs IS 'Logs de atividades do dashboard para analytics e debugging';
COMMENT ON COLUMN activity_logs.activity_type IS 'Tipo: page_view, navigation, action, error, auth, api_call';
COMMENT ON COLUMN activity_logs.metadata IS 'JSON com dados contextuais do evento';
COMMENT ON COLUMN activity_logs.session_id IS 'ID da sessão do navegador';

-- Function to cleanup old logs (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_activity_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM activity_logs
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-activity-logs', '0 2 * * *', 'SELECT cleanup_old_activity_logs();');

-- Example queries for analytics:

-- Most visited pages (last 7 days)
-- SELECT 
--   activity_name,
--   COUNT(*) as visits,
--   COUNT(DISTINCT user_id) as unique_users
-- FROM activity_logs
-- WHERE activity_type = 'page_view'
--   AND created_at > NOW() - INTERVAL '7 days'
-- GROUP BY activity_name
-- ORDER BY visits DESC;

-- User journey (last session)
-- SELECT 
--   activity_type,
--   activity_name,
--   metadata,
--   created_at
-- FROM activity_logs
-- WHERE user_id = 'YOUR_USER_ID'
--   AND session_id = 'YOUR_SESSION_ID'
-- ORDER BY created_at ASC;

-- Error frequency
-- SELECT 
--   activity_name,
--   COUNT(*) as error_count,
--   MAX(created_at) as last_occurrence
-- FROM activity_logs
-- WHERE activity_type = 'error'
--   AND created_at > NOW() - INTERVAL '24 hours'
-- GROUP BY activity_name
-- ORDER BY error_count DESC;
