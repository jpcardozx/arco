/**
 * Database Seeding Script
 * Populates database with development/demo data
 * 
 * Usage: pnpm db:seed
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/types/supabase'

// Use local development URL if not specified
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

console.log('🌱 Using Supabase URL:', supabaseUrl)

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n')

  try {
    // 1. Create test user (if not exists)
    console.log('👤 Creating test user...')
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'dev@arco.com',
      password: 'arco123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Developer User',
      },
    })

    if (authError && !authError.message.includes('already exists')) {
      throw authError
    }

    const userId = authData?.user?.id || '00000000-0000-0000-0000-000000000000'
    console.log(`✅ User created/found: ${userId}\n`)

    // 2. Seed clients
    console.log('👥 Seeding clients...')
    const clients = [
      {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '+55 11 99999-9999',
        company: 'Empresa A',
        status: 'active' as const,
        priority: 'high' as const,
        client_code: 'CLI-001',
        created_by: userId,
      },
      {
        name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '+55 11 98888-8888',
        company: 'Empresa B',
        status: 'lead' as const,
        priority: 'medium' as const,
        client_code: 'CLI-002',
        created_by: userId,
      },
      {
        name: 'Pedro Oliveira',
        email: 'pedro@example.com',
        phone: '+55 11 97777-7777',
        company: 'Startup Tech',
        status: 'active' as const,
        priority: 'high' as const,
        client_code: 'CLI-003',
        created_by: userId,
      },
    ]

    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .upsert(clients, { onConflict: 'client_code' })
      .select()

    if (clientsError) throw clientsError
    console.log(`✅ ${clientsData.length} clients seeded\n`)

    // 3. Seed tasks
    console.log('📋 Seeding tasks...')
    const tasks = [
      {
        title: 'Reunião de Follow-up',
        description: 'Discutir proposta de serviços',
        due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending' as const,
        priority: 'high' as const,
        client_id: clientsData[0].id,
        created_by: userId,
      },
      {
        title: 'Análise de ROI',
        description: 'Preparar relatório de ROI para apresentação',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress' as const,
        priority: 'medium' as const,
        client_id: clientsData[1].id,
        created_by: userId,
      },
      {
        title: 'Proposta Comercial',
        description: 'Enviar proposta de pacote enterprise',
        due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending' as const,
        priority: 'high' as const,
        client_id: clientsData[2].id,
        created_by: userId,
      },
    ]

    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .insert(tasks)
      .select()

    if (tasksError) throw tasksError
    console.log(`✅ ${tasksData.length} tasks seeded\n`)

    // 4. Seed leads
    console.log('🎯 Seeding leads...')
    const leads = [
      {
        email: 'lead1@example.com',
        name: 'Ana Costa',
        source: 'website_form',
        status: 'new' as const,
        metadata: { message: 'Interessada em análise de performance' },
      },
      {
        email: 'lead2@example.com',
        name: 'Carlos Mendes',
        source: 'lead_magnet',
        status: 'contacted' as const,
        metadata: { downloaded: 'ROI Calculator Template' },
      },
      {
        email: 'lead3@example.com',
        name: 'Fernanda Lima',
        source: 'google_ads',
        status: 'qualified' as const,
        metadata: { budget: '15000', urgency: 'high' },
      },
    ]

    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .insert(leads)
      .select()

    if (leadsError) throw leadsError
    console.log(`✅ ${leadsData.length} leads seeded\n`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📝 Test credentials:')
    console.log('   Email: dev@arco.com')
    console.log('   Password: arco123456\n')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run seeding
seedDatabase()
