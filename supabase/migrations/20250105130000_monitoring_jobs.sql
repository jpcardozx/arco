-- pg_cron Monitoring Jobs
-- Automated uptime, security, and domain health monitoring

-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- ============================================================================
-- UPTIME MONITORING (Every 5 minutes)
-- ============================================================================

CREATE OR REPLACE FUNCTION check_uptime()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_url TEXT;
  http_resp RECORD;
  start_ts TIMESTAMPTZ;
  duration_ms INT;
BEGIN
  -- Check uptime for URLs from paid users' analyses
  FOR target_url IN
    SELECT DISTINCT ar.url
    FROM analysis_requests ar
    JOIN user_profiles up ON ar.user_id = up.id
    WHERE up.tier IN ('paid', 'admin')
  LOOP
    start_ts := clock_timestamp();
    
    -- Make HTTP request
    SELECT * INTO http_resp
    FROM net.http_get(
      url := target_url,
      timeout_milliseconds := 10000
    );
    
    duration_ms := EXTRACT(MILLISECOND FROM (clock_timestamp() - start_ts));
    
    -- Save result
    INSERT INTO uptime_checks (url, is_up, response_time_ms, status_code, checked_at)
    VALUES (
      target_url,
      (http_resp.status_code BETWEEN 200 AND 399),
      duration_ms,
      http_resp.status_code,
      now()
    );
      
  END LOOP;
END;
$$;

-- Schedule uptime checks every 5 minutes
SELECT cron.schedule('uptime-monitoring', '*/5 * * * *', 'SELECT check_uptime();');

-- ============================================================================
-- SECURITY MONITORING (Daily at 2:00 AM UTC)
-- ============================================================================

CREATE OR REPLACE FUNCTION check_security()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_url TEXT;
BEGIN
  -- Check security for URLs from paid users' analyses
  FOR target_url IN
    SELECT DISTINCT ar.url
    FROM analysis_requests ar
    JOIN user_profiles up ON ar.user_id = up.id
    WHERE up.tier IN ('paid', 'admin')
  LOOP
    -- Insert placeholder scan (real implementation would call Edge Function)
    INSERT INTO security_scans (url, scan_type, status, scanned_at)
    VALUES (target_url, 'ssl_headers', 'pending', now());
    
  END LOOP;
END;
$$;

-- Schedule security checks daily at 2:00 AM UTC
SELECT cron.schedule('security-monitoring', '0 2 * * *', 'SELECT check_security();');

-- ============================================================================
-- DOMAIN HEALTH MONITORING (Daily at 3:00 AM UTC)
-- ============================================================================

CREATE OR REPLACE FUNCTION check_domain_health()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_url TEXT;
BEGIN
  -- Check domain health for URLs from paid users' analyses
  FOR target_url IN
    SELECT DISTINCT ar.url
    FROM analysis_requests ar
    JOIN user_profiles up ON ar.user_id = up.id
    WHERE up.tier IN ('paid', 'admin')
  LOOP
    -- Upsert placeholder check (real implementation would call Edge Function)
    INSERT INTO domain_monitoring (url, ssl_valid, ssl_expires_at, dns_records, blacklist_status, last_checked)
    VALUES (target_url, true, now() + interval '90 days', '{}'::JSONB, 'clean', now())
    ON CONFLICT (url) DO UPDATE SET last_checked = now();
    
  END LOOP;
END;
$$;

-- Schedule domain health checks daily at 3:00 AM UTC
SELECT cron.schedule('domain-health-monitoring', '0 3 * * *', 'SELECT check_domain_health();');

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Manually trigger checks (for testing)
CREATE OR REPLACE FUNCTION trigger_uptime_check() RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN PERFORM check_uptime(); END; $$;

CREATE OR REPLACE FUNCTION trigger_security_check() RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN PERFORM check_security(); END; $$;

CREATE OR REPLACE FUNCTION trigger_domain_check() RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN PERFORM check_domain_health(); END; $$;

GRANT EXECUTE ON FUNCTION trigger_uptime_check() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_security_check() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_domain_check() TO authenticated;

-- ============================================================================
-- SECURITY SCANS TABLE (if not exists in MVP schema)
-- ============================================================================

CREATE TABLE IF NOT EXISTS security_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  scan_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  ssl_valid BOOLEAN,
  ssl_expires_at TIMESTAMPTZ,
  security_headers JSONB,
  vulnerabilities JSONB,
  scanned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_scans_url ON security_scans(url);
CREATE INDEX IF NOT EXISTS idx_security_scans_scanned_at ON security_scans(scanned_at DESC);

ALTER TABLE security_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own security scans" ON security_scans
FOR SELECT TO authenticated
USING (url IN (SELECT url FROM analysis_requests WHERE user_id = auth.uid()));

GRANT SELECT ON security_scans TO authenticated;
GRANT ALL ON security_scans TO service_role;
