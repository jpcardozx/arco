-- ============================================
-- DOMAIN VALIDATIONS TABLE
-- Cache for domain validation results
-- ============================================

CREATE TABLE IF NOT EXISTS public.domain_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Domain info
  domain VARCHAR(255) NOT NULL UNIQUE,
  is_available BOOLEAN NOT NULL DEFAULT false,
  dns_valid BOOLEAN NOT NULL DEFAULT false,
  ssl_valid BOOLEAN NOT NULL DEFAULT false,
  
  -- Data storage
  dns_records JSONB DEFAULT '{}'::jsonb,
  whois_data JSONB DEFAULT '{}'::jsonb,
  suggestions TEXT[] DEFAULT '{}',
  
  -- Performance
  lighthouse_score INTEGER,
  
  -- Cache control
  cached_until TIMESTAMP NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_domain_validations_domain 
  ON public.domain_validations(domain);

CREATE INDEX IF NOT EXISTS idx_domain_validations_cached_until 
  ON public.domain_validations(cached_until);

CREATE INDEX IF NOT EXISTS idx_domain_validations_created_at 
  ON public.domain_validations(created_at DESC);

-- ============================================
-- RLS POLICIES (Public Read for cached data)
-- ============================================

ALTER TABLE public.domain_validations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cached validation results
CREATE POLICY "Allow public read on domain_validations"
  ON public.domain_validations
  FOR SELECT
  USING (true);

-- Only service role can insert/update
CREATE POLICY "Allow service role write on domain_validations"
  ON public.domain_validations
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- CLEANUP FUNCTION (Remove expired cache)
-- ============================================

CREATE OR REPLACE FUNCTION public.cleanup_expired_domain_validations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.domain_validations
  WHERE cached_until < NOW();
END;
$$;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE public.domain_validations IS 
  'Cache for domain validation results from Python script. TTL: 1 hour.';

COMMENT ON COLUMN public.domain_validations.dns_records IS 
  'JSON with A, MX, TXT records: {"a": [], "mx": [], "txt": []}';

COMMENT ON COLUMN public.domain_validations.whois_data IS 
  'Full WHOIS lookup data from Python script';

COMMENT ON COLUMN public.domain_validations.suggestions IS 
  'Array of alternative domain suggestions if domain is unavailable';
