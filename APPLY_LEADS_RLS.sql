-- ==========================================
-- SCRIPT: Enable RLS on leads table
-- Execute this in Supabase SQL Editor
-- ==========================================

-- 1. Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "Service role has full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Users can read their assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert new leads" ON public.leads;

-- 3. Create policies

-- Allow service_role to do everything (for API routes using SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "Service role has full access to leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow authenticated users to read their own leads (for future dashboard)
CREATE POLICY "Users can read their assigned leads"
ON public.leads
FOR SELECT
TO authenticated
USING (assigned_to = auth.uid());

-- Allow anonymous users to insert new leads (for lead magnet form)
CREATE POLICY "Anyone can insert new leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Verify RLS is enabled
SELECT 
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'leads';

-- 5. List all policies on leads table
SELECT 
    schemaname,
    tablename,
    policyname,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'leads';

-- 6. Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';

-- Done! Now the PostgREST API will expose the leads table.
