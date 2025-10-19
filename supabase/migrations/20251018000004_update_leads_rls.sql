-- Migration: Update leads RLS policies for campaign tracking
-- Author: ARCO System
-- Date: 2025-10-18
-- Description: Ensure leads can be inserted with new campaign fields

-- Add created_by field if doesn't exist (BEFORE creating policies)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Create index on created_by
CREATE INDEX IF NOT EXISTS idx_leads_created_by ON leads(created_by);

-- Add trigger to auto-set created_by for authenticated users
CREATE OR REPLACE FUNCTION set_lead_created_by()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.created_by IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.created_by := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS leads_set_created_by ON leads;
CREATE TRIGGER leads_set_created_by
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION set_lead_created_by();

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Service role has full access to leads" ON leads;
DROP POLICY IF EXISTS "Users can read their assigned leads" ON leads;
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "service_role_full_access_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_read_assigned_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_update_assigned_leads" ON leads;
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_insert_leads" ON leads;

-- Recreate policies with better names and coverage

-- Policy 1: Service role full access (API routes)
CREATE POLICY "service_role_full_access_leads"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy 2: Authenticated users can read their assigned leads
CREATE POLICY "authenticated_read_assigned_leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.slug = leads.campaign_slug 
      AND campaigns.owner_id = auth.uid()
    )
  );

-- Policy 3: Authenticated users can update their assigned leads
CREATE POLICY "authenticated_update_assigned_leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (assigned_to = auth.uid() OR created_by = auth.uid())
  WITH CHECK (assigned_to = auth.uid() OR created_by = auth.uid());

-- Policy 4: Anonymous can insert leads (public forms)
CREATE POLICY "anon_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 5: Authenticated users can create leads
CREATE POLICY "authenticated_insert_leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

COMMENT ON POLICY "service_role_full_access_leads" ON leads IS 'Service role (API routes) tem acesso total';
COMMENT ON POLICY "authenticated_read_assigned_leads" ON leads IS 'Usuários autenticados veem seus leads atribuídos ou criados';
COMMENT ON POLICY "authenticated_update_assigned_leads" ON leads IS 'Usuários podem atualizar apenas seus leads';
COMMENT ON POLICY "anon_insert_leads" ON leads IS 'Visitantes anônimos podem criar leads via formulários públicos';
COMMENT ON POLICY "authenticated_insert_leads" ON leads IS 'Usuários autenticados podem criar leads';

