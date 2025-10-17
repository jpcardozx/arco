#!/usr/bin/env tsx
/**
 * Script to enable RLS on leads table
 * Applies Row Level Security policies via Supabase Admin API
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const SQL_ENABLE_RLS = `
-- Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "Service role has full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Users can read their assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert new leads" ON public.leads;

-- Allow service_role to do everything
CREATE POLICY "Service role has full access to leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow authenticated users to read their own leads
CREATE POLICY "Users can read their assigned leads"
ON public.leads
FOR SELECT
TO authenticated
USING (assigned_to = auth.uid());

-- Allow anonymous users to insert new leads
CREATE POLICY "Anyone can insert new leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';
`

async function enableRLS() {
  console.log('🔧 Checking RLS on leads table...\n')

  try {
    // First, try to access leads table to see if RLS is already configured
    console.log('🔍 Testing current access to leads table...')

    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .limit(1)

    if (leadsError) {
      console.error('❌ Error accessing leads table:', leadsError)
      console.log('\n� Attempting to apply RLS via Supabase CLI...\n')
      
      // Try using Supabase CLI
      const { execSync } = await import('child_process')
      
      try {
        // Write SQL to temp file
        const fs = await import('fs')
        const tmpFile = '/tmp/enable_rls_leads.sql'
        fs.writeFileSync(tmpFile, SQL_ENABLE_RLS)
        
        console.log('📝 Executing SQL via Supabase CLI...')
        const output = execSync(
          `npx supabase db execute --file ${tmpFile} --linked`,
          { encoding: 'utf-8', stdio: 'pipe' }
        )
        
        console.log(output)
        console.log('✅ SQL executed successfully via CLI!\n')
        
        // Wait for PostgREST to reload
        console.log('⏳ Waiting for PostgREST to reload schema...')
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Try again
        const { data: leadsRetry, error: retryError } = await supabase
          .from('leads')
          .select('*')
          .limit(1)
        
        if (retryError) {
          throw retryError
        }
        
        console.log('✅ Leads table is now accessible!')
        
      } catch (cliError: any) {
        console.error('❌ CLI execution failed:', cliError.message)
        console.log('\n📋 Manual SQL execution required:')
        console.log('   1. Open: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/editor/sql')
        console.log('   2. Copy content from: APPLY_LEADS_RLS.sql')
        console.log('   3. Click "Run"')
        process.exit(1)
      }
    } else {
      console.log('✅ Leads table is already accessible!')
      console.log('📊 Current leads count:', Array.isArray(leads) ? leads.length : 0)
    }

    // Test insert
    console.log('\n🧪 Testing lead insertion...')
    const { data: testLead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: 'RLS Test User',
        email: `rls-test-${Date.now()}@example.com`,
        source: 'rls_test',
        status: 'new',
        metadata: {
          test: true,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌ Error inserting test lead:', insertError)
      throw insertError
    }

    console.log('✅ Test lead inserted successfully!')
    console.log('📝 Lead ID:', testLead.id)

    // Clean up test lead
    const { error: deleteError } = await supabase
      .from('leads')
      .delete()
      .eq('id', testLead.id)

    if (!deleteError) {
      console.log('🧹 Test lead cleaned up')
    }

    console.log('\n🎉 All checks passed! Lead magnet API should work now.\n')
    console.log('Test with:')
    console.log('  curl -X POST http://localhost:3000/api/lead-magnet \\')
    console.log('    -H "Content-Type: application/json" \\')
    console.log('    -d \'{"name":"Test","email":"test@example.com","company":"Co","phone":"11999999999"}\'')

  } catch (error) {
    console.error('\n❌ Failed to enable RLS:', error)
    console.log('\n📋 Manual SQL execution required:')
    console.log('   1. Open: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/editor/sql')
    console.log('   2. Copy content from: APPLY_LEADS_RLS.sql')
    console.log('   3. Click "Run"')
    console.log('   4. Run this script again to verify')
    process.exit(1)
  }
}

enableRLS()
