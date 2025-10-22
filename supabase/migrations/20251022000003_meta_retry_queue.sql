-- Meta Conversions API: Retry Queue for Failed Events
-- Armazena eventos que falharam para retry com backoff

CREATE TABLE IF NOT EXISTS meta_retry_queue (
  id BIGSERIAL PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  trace_id TEXT NOT NULL,
  payload JSONB NOT NULL,
  retry_count INT DEFAULT 0,
  max_retries INT DEFAULT 3,
  next_retry_at TIMESTAMP DEFAULT NOW(),
  last_error TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'success', 'failed'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meta_retry_status ON meta_retry_queue(status);
CREATE INDEX IF NOT EXISTS idx_meta_retry_next_at ON meta_retry_queue(next_retry_at);
CREATE INDEX IF NOT EXISTS idx_meta_retry_event_id ON meta_retry_queue(event_id);

-- Circuit breaker table
CREATE TABLE IF NOT EXISTS meta_circuit_breaker (
  id INT PRIMARY KEY DEFAULT 1,
  is_open BOOLEAN DEFAULT FALSE,
  error_count INT DEFAULT 0,
  opened_at TIMESTAMP,
  last_error TEXT,
  CHECK (id = 1)
);

INSERT INTO meta_circuit_breaker (id, is_open) VALUES (1, FALSE) ON CONFLICT DO NOTHING;

-- RLS
ALTER TABLE meta_retry_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_circuit_breaker ENABLE ROW LEVEL SECURITY;

CREATE POLICY "meta_retry_service_only" ON meta_retry_queue
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "meta_breaker_service_only" ON meta_circuit_breaker
  FOR ALL
  USING (true)
  WITH CHECK (true);
