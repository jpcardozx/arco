#!/usr/bin/env tsx
/**
 * Force PostgREST schema reload by toggling a setting
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

async function reloadSchema() {
  console.log('🔄 Forcing PostgREST schema reload...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  try {
    // Method 1: Call PostgREST admin endpoint (if exposed)
    console.log('📡 Trying PostgREST admin endpoint...')
    const adminUrl = supabaseUrl.replace('/rest/v1', '') + '/rest/v1/'
    
    const response = await fetch(adminUrl, {
      method: 'OPTIONS',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'schema-reload'
      }
    })

    if (response.ok) {
      console.log('✅ Schema reload requested via admin endpoint')
    }

    // Method 2: Make a query that forces cache check
    console.log('\n📊 Forcing cache refresh by querying leads...')
    const testResponse = await fetch(`${supabaseUrl}/rest/v1/leads?limit=0`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'count=exact'
      }
    })

    if (testResponse.ok) {
      const count = testResponse.headers.get('Content-Range')
      console.log(`✅ Query succeeded. Leads count from header: ${count}`)
    } else {
      const error = await testResponse.text()
      console.log(`⚠️  Query response: ${testResponse.status} - ${error}`)
    }

    // Method 3: Wait and try insert with full schema
    console.log('\n🧪 Testing insert with explicit column names...')
    const testLead = {
      email: `schema-test-${Date.now()}@example.com`,
      name: 'Schema Test',
      phone: '11999999999',
      source: 'schema_reload_test',
      status: 'new'
    }

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(testLead)
    })

    if (insertResponse.ok) {
      const inserted = await insertResponse.json()
      console.log('✅ Insert succeeded!')
      console.log('📝 Inserted lead:', inserted[0])
      
      // Clean up
      const deleteResponse = await fetch(
        `${supabaseUrl}/rest/v1/leads?id=eq.${inserted[0].id}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`
          }
        }
      )
      
      if (deleteResponse.ok) {
        console.log('🧹 Test lead cleaned up')
      }
      
      console.log('\n🎉 PostgREST schema is working! Lead magnet API should work now.')
      
    } else {
      const error = await insertResponse.text()
      console.error('❌ Insert failed:', error)
      
      console.log('\n💡 The PostgREST schema cache needs manual reload.')
      console.log('📋 Options:')
      console.log('   1. Restart PostgREST via Supabase Dashboard (Settings → Database → Restart)')
      console.log('   2. Wait ~60 seconds for automatic cache refresh')
      console.log('   3. Execute SQL in Dashboard to force NOTIFY:')
      console.log('      NOTIFY pgrst, \'reload schema\';')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

reloadSchema()
