-- Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

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

-- Notify PostgREST of schema changes
NOTIFY pgrst, 'reload schema';
