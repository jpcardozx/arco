-- Force PostgREST schema cache reload
-- This migration adds a comment to force schema refresh
COMMENT ON TABLE public.leads IS 'Lead information with metadata support - schema refreshed 2025-01-08';

-- Verify metadata column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'leads' 
        AND column_name = 'metadata'
    ) THEN
        -- If metadata doesn't exist, add it
        ALTER TABLE public.leads ADD COLUMN metadata JSONB;
    END IF;
END$$;

-- Notify PostgREST of schema change
NOTIFY pgrst, 'reload schema';
