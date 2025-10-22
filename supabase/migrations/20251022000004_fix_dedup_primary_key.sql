-- Fix: Deduplication via PRIMARY KEY (não in-memory cache)
-- O cache em memória não é confiável em serverless (Cold starts)
-- Nota: event_name será adicionado via application layer
-- O dedup acontece via PRIMARY KEY (event_id) + INSERT ... ON CONFLICT

-- Comment sobre idempotência (sem mudança de schema)
COMMENT ON TABLE meta_events_dedup IS
'Dedup table with PRIMARY KEY (event_id).
On duplicate constraint violation, respond 200 + is_duplicate=true instead of error.
This makes the endpoint idempotent. Event_name is tracked in application layer.';

-- Índice para suporte a queries de limpeza por TTL (expires_at)
CREATE INDEX IF NOT EXISTS idx_meta_dedup_expires
ON meta_events_dedup(expires_at);
