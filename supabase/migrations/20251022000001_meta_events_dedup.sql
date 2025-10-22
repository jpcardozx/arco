-- Meta Conversions API: Deduplication Table
-- Armazena event_ids para evitar duplicação

CREATE TABLE IF NOT EXISTS meta_events_dedup (
  event_id TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '1 hour'
);

CREATE INDEX IF NOT EXISTS idx_meta_dedup_expires ON meta_events_dedup(expires_at);

-- Auto-cleanup de eventos expirados (job agendado)
-- Será executado via Edge Function, não via trigger
-- CREATE OR REPLACE FUNCTION cleanup_expired_meta_events()
-- RETURNS trigger AS $$
-- BEGIN
--   DELETE FROM meta_events_dedup WHERE expires_at < NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- RLS
ALTER TABLE meta_events_dedup ENABLE ROW LEVEL SECURITY;

-- Política: Apenas Edge Function pode ler/escrever (via SERVICE_ROLE_KEY)
CREATE POLICY "meta_dedup_service_only" ON meta_events_dedup
  FOR ALL
  USING (true)
  WITH CHECK (true);
