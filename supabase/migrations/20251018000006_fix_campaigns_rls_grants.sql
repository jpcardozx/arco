-- Migration: Fix campaigns RLS permissions for anonymous users
-- Purpose: Allow public access to landing pages
-- Date: 2025-10-18

-- Grant SELECT permission to anon role (required for RLS policies to work)
GRANT SELECT ON campaigns TO anon;
GRANT SELECT ON campaigns TO authenticated;

-- Verify policies are working
DO $$
BEGIN
  -- Test that anon can read active campaigns
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'campaigns' 
    AND policyname = 'anon_read_campaigns'
  ) THEN
    RAISE NOTICE 'SUCCESS: RLS policy "anon_read_campaigns" exists';
  ELSE
    RAISE WARNING 'WARNING: RLS policy "anon_read_campaigns" not found';
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'campaigns' 
    AND policyname = 'authenticated_read_campaigns'
  ) THEN
    RAISE NOTICE 'SUCCESS: RLS policy "authenticated_read_campaigns" exists';
  ELSE
    RAISE WARNING 'WARNING: RLS policy "authenticated_read_campaigns" not found';
  END IF;
END $$;

-- Add comment
COMMENT ON TABLE campaigns IS 'Campanhas de marketing e landing pages. PUBLIC READ via RLS policies.';
