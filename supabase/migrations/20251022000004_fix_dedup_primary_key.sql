-- Fix: Deduplication via PRIMARY KEY (não in-memory cache)
-- O cache em memória não é confiável em serverless (Cold starts)
-- Solução: PRIMARY KEY (event_name, event_id) na tabela

ALTER TABLE meta_events_dedup DROP CONSTRAINT IF EXISTS meta_events_dedup_pkey;

ALTER TABLE meta_events_dedup 
ADD CONSTRAINT meta_events_dedup_pkey 
PRIMARY KEY (event_name, event_id);

-- Comment sobre idempotência
COMMENT ON TABLE meta_events_dedup IS 
'Dedup table with PRIMARY KEY (event_name, event_id). 
On duplicate constraint violation, respond 200 + is_duplicate=true instead of error.
This makes the endpoint idempotent.';

-- Índice para limpeza por TTL
CREATE INDEX IF NOT EXISTS idx_meta_dedup_expires_cleanup 
ON meta_events_dedup(created_at) 
WHERE created_at < NOW() - INTERVAL '2 hours';
