-- Database Webhook: Auto-trigger Lighthouse scan on new analysis

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION trigger_lighthouse_scan()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id BIGINT;
BEGIN
  -- Call lighthouse-scan Edge Function via pg_net
  SELECT INTO request_id net.http_post(
    url := 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/lighthouse-scan',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('SUPABASE_ANON_KEY', false)
    ),
    body := jsonb_build_object(
      'analysisId', NEW.id::TEXT,
      'url', NEW.url
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger on analysis_requests INSERT
DROP TRIGGER IF EXISTS on_analysis_requested ON analysis_requests;

CREATE TRIGGER on_analysis_requested
AFTER INSERT ON analysis_requests
FOR EACH ROW
WHEN (NEW.status = 'pending')
EXECUTE FUNCTION trigger_lighthouse_scan();
