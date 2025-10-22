-- Meta Conversions API: Event Logging for Observability
-- Registra todos os eventos enviados para Meta

CREATE TABLE IF NOT EXISTS meta_events_log (
  id BIGSERIAL PRIMARY KEY,
  event_id TEXT NOT NULL,
  trace_id TEXT NOT NULL,
  event_name VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL, -- 'success', 'duplicate', 'failed', 'retry'
  meta_fbtrace_id TEXT,
  error_message TEXT,
  request_duration_ms INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meta_log_event_id ON meta_events_log(event_id);
CREATE INDEX IF NOT EXISTS idx_meta_log_trace_id ON meta_events_log(trace_id);
CREATE INDEX IF NOT EXISTS idx_meta_log_status ON meta_events_log(status);
CREATE INDEX IF NOT EXISTS idx_meta_log_created_at ON meta_events_log(created_at DESC);

-- Auto-cleanup de logs antigos (>30 dias)
-- Será executado via Edge Function agendada
-- CREATE OR REPLACE FUNCTION cleanup_old_meta_logs()
-- RETURNS void AS $$
-- BEGIN
--   DELETE FROM meta_events_log WHERE created_at < NOW() - INTERVAL '30 days';
-- END;
-- $$ LANGUAGE plpgsql;

-- RLS
ALTER TABLE meta_events_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "meta_log_service_only" ON meta_events_log
  FOR ALL
  USING (true)
  WITH CHECK (true);
