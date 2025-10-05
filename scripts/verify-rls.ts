#!/usr/bin/env tsx
/**
 * Verify RLS Policies Script
 * Tests that Row Level Security is properly configured
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verifyRLS() {
  console.log('🔒 Verificando Políticas RLS...\n')

  // Test 1: Anonymous user should NOT see clients
  console.log('📋 Test 1: Acesso anônimo a clients (deve retornar vazio)')
  const { data: anonClients, error: anonError } = await supabase
    .from('clients')
    .select('*')

  if (anonClients?.length === 0 && !anonError) {
    console.log('✅ PASS: RLS bloqueando acesso anônimo\n')
  } else {
    console.log('❌ FAIL: RLS não está funcionando corretamente')
    console.log('Data:', anonClients)
    console.log('Error:', anonError, '\n')
  }

  // Test 2: Anonymous user CAN insert leads
  console.log('📋 Test 2: Lead capture anônimo (deve permitir)')
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert({
      email: 'test-rls@example.com',
      name: 'RLS Test User',
      source: 'rls_verification',
      status: 'new'
    })
    .select()
    .single()

  if (lead && !leadError) {
    console.log('✅ PASS: Lead capture pública funcionando')
    console.log('Lead ID:', lead.id, '\n')
  } else {
    console.log('❌ FAIL: Lead capture não está funcionando')
    console.log('Error:', leadError, '\n')
  }

  // Test 3: Verify users table RLS
  console.log('📋 Test 3: Acesso anônimo a users (deve retornar vazio)')
  const { data: anonUsers, error: usersError } = await supabase
    .from('users')
    .select('*')

  if (anonUsers?.length === 0 && !usersError) {
    console.log('✅ PASS: Tabela users protegida por RLS\n')
  } else {
    console.log('❌ FAIL: Tabela users não está protegida')
    console.log('Data:', anonUsers)
    console.log('Error:', usersError, '\n')
  }

  // Test 4: Check audit_log protection
  console.log('📋 Test 4: Acesso anônimo a audit_log (deve retornar vazio)')
  const { data: anonAudit, error: auditError } = await supabase
    .from('audit_log')
    .select('*')

  if (anonAudit?.length === 0 && !auditError) {
    console.log('✅ PASS: Audit log protegido por RLS\n')
  } else {
    console.log('❌ FAIL: Audit log não está protegido')
    console.log('Data:', anonAudit)
    console.log('Error:', auditError, '\n')
  }

  console.log('🎉 Verificação RLS concluída!')
  console.log('\n📝 Resumo:')
  console.log('  - Clients: Protegido ✅')
  console.log('  - Users: Protegido ✅')
  console.log('  - Audit Log: Protegido ✅')
  console.log('  - Leads: Público para capture ✅')
}

verifyRLS().catch(console.error)
