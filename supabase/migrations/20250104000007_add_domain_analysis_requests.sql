-- Migration: Add domain_analysis_requests table
-- Purpose: Capture anonymous domain analysis attempts before user identification
-- Created: 2025-01-05

-- Create domain_analysis_requests table
CREATE TABLE IF NOT EXISTS public.domain_analysis_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Domain info
    domain TEXT NOT NULL,
    
    -- Session tracking (anonymous user identification)
    session_id TEXT NOT NULL,
    fingerprint TEXT,
    
    -- Request metadata
    ip_address INET,
    user_agent TEXT,
    referer TEXT,
    source TEXT DEFAULT 'url_analyzer', -- 'url_analyzer', 'homepage', 'blog'
    
    -- UTM tracking
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    
    -- User identification (populated when user provides info)
    email TEXT,
    name TEXT,
    phone TEXT,
    
    -- Foreign keys (populated after conversion)
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Analysis results (populated after analysis)
    analysis_results JSONB,
    lighthouse_score INTEGER,
    performance_score INTEGER,
    seo_score INTEGER,
    accessibility_score INTEGER,
    best_practices_score INTEGER,
    
    -- SSL Information
    ssl_enabled BOOLEAN DEFAULT false,
    ssl_expiry TIMESTAMPTZ,
    ssl_issuer TEXT,
    
    -- Status tracking
    status TEXT DEFAULT 'anonymous' CHECK (status IN ('anonymous', 'identified', 'analyzed', 'converted')),
    completed_at TIMESTAMPTZ,
    
    -- Additional metadata
    metadata JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_domain_analysis_session ON public.domain_analysis_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_domain_analysis_email ON public.domain_analysis_requests(email);
CREATE INDEX IF NOT EXISTS idx_domain_analysis_domain ON public.domain_analysis_requests(domain);
CREATE INDEX IF NOT EXISTS idx_domain_analysis_status ON public.domain_analysis_requests(status);
CREATE INDEX IF NOT EXISTS idx_domain_analysis_created ON public.domain_analysis_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_domain_analysis_lead_id ON public.domain_analysis_requests(lead_id);
CREATE INDEX IF NOT EXISTS idx_domain_analysis_user_id ON public.domain_analysis_requests(user_id);

-- Trigger for updated_at
CREATE TRIGGER set_domain_analysis_requests_updated_at
    BEFORE UPDATE ON public.domain_analysis_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.domain_analysis_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Anonymous users can insert their own requests (by session_id)
CREATE POLICY "Anyone can insert domain analysis requests"
    ON public.domain_analysis_requests
    FOR INSERT
    WITH CHECK (true);

-- Users can view their own requests (by session_id, email, or user_id)
CREATE POLICY "Users can view their own domain analysis requests"
    ON public.domain_analysis_requests
    FOR SELECT
    USING (
        session_id = current_setting('app.session_id', true)
        OR email = current_setting('request.jwt.claims', true)::json->>'email'
        OR user_id = auth.uid()
    );

-- Authenticated users can update their own requests
CREATE POLICY "Users can update their own domain analysis requests"
    ON public.domain_analysis_requests
    FOR UPDATE
    USING (
        email = current_setting('request.jwt.claims', true)::json->>'email'
        OR user_id = auth.uid()
    )
    WITH CHECK (
        email = current_setting('request.jwt.claims', true)::json->>'email'
        OR user_id = auth.uid()
    );

-- Admin users can view all requests
CREATE POLICY "Admins can view all domain analysis requests"
    ON public.domain_analysis_requests
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Comments for documentation
COMMENT ON TABLE public.domain_analysis_requests IS 'Stores all domain analysis requests, including anonymous attempts before user identification';
COMMENT ON COLUMN public.domain_analysis_requests.session_id IS 'Unique session identifier for anonymous tracking (UUID + cookie)';
COMMENT ON COLUMN public.domain_analysis_requests.fingerprint IS 'Browser fingerprint for additional tracking';
COMMENT ON COLUMN public.domain_analysis_requests.status IS 'Tracks progression: anonymous → identified → analyzed → converted';
COMMENT ON COLUMN public.domain_analysis_requests.analysis_results IS 'Complete analysis results from Lighthouse/PageSpeed API';
