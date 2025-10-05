/**
 * Script de Seed Completo - Dados de Desenvolvimento
 * Popula todas as tabelas com dados realistas para testes
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/types/supabase'

// Configuração Supabase Local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ============================================================================
// DADOS DE SEED
// ============================================================================

const SEED_DATA = {
  // Usuário de teste
  user: {
    email: 'dev@arco.com',
    password: 'arco123456',
    full_name: 'João Pedro Dev',
    role: 'admin',
  },
  
  // Clientes (status: 'lead', 'active', 'inactive')
  clients: [
    {
      name: 'Maria Silva',
      email: 'maria@techinova.com.br',
      phone: '(11) 98765-4321',
      company: 'TechInova',
      website: 'https://techinova.com.br',
      status: 'active' as const,
      priority: 'high' as const,
      client_code: 'CLI-001',
      notes: 'Cliente premium. Projetos de grande porte em marketing digital.',
      service_interest: 'SEO, Google Ads',
      project_budget: 50000,
    },
    {
      name: 'Carlos Oliveira',
      email: 'carlos@startup.io',
      phone: '(21) 99876-5432',
      company: 'Startup XYZ',
      website: 'https://startup.io',
      status: 'active' as const,
      priority: 'medium' as const,
      client_code: 'CLI-002',
      notes: 'Startup em fase de crescimento. Interessada em inbound marketing.',
      service_interest: 'Content Marketing, Social Media',
      project_budget: 15000,
    },
    {
      name: 'Ana Costa',
      email: 'ana@ecommerce.com.br',
      phone: '(11) 91234-5678',
      company: 'E-commerce Brasil',
      website: 'https://ecommerce.com.br',
      status: 'lead' as const,
      priority: 'high' as const,
      client_code: 'CLI-003',
      notes: 'Lead quente. Download do e-book sobre ROI em ads.',
      service_interest: 'Google Ads, Facebook Ads',
      project_budget: 30000,
    },
    {
      name: 'Pedro Santos',
      email: 'pedro@consultoria.com',
      phone: '(31) 98765-1234',
      company: 'Consultoria Estratégica',
      website: 'https://consultoria.com',
      status: 'active' as const,
      priority: 'medium' as const,
      client_code: 'CLI-004',
      notes: 'Cliente recorrente. Renovação anual de contrato.',
      service_interest: 'SEO, Content Marketing',
      project_budget: 25000,
    },
    {
      name: 'Juliana Ferreira',
      email: 'juliana@agencia.digital',
      phone: '(41) 99123-4567',
      company: 'Agência Digital 360',
      status: 'inactive' as const,
      priority: 'low' as const,
      client_code: 'CLI-005',
      notes: 'Projeto pausado. Possível retomada em 2026.',
      service_interest: 'Web Design, Branding',
      project_budget: 10000,
    },
  ],
  
  // Leads (colunas: name, email, phone, source, status, metadata, assigned_to)
  leads: [
    {
      name: 'Roberto Almeida',
      email: 'roberto@empresa.com.br',
      phone: '(11) 91111-2222',
      source: 'organic-google',
      metadata: {
        company: 'Empresa ABC',
        message: 'Interessado em consultoria de SEO para nosso site corporativo.',
        utm_source: 'google',
        utm_medium: 'organic',
        lead_magnet: 'ebook-seo',
        interest: 'seo',
        captured_at: new Date().toISOString(),
      },
      status: 'new',
    },
    {
      name: 'Fernanda Lima',
      email: 'fernanda@startup.tech',
      phone: '(21) 92222-3333',
      source: 'campaign',
      metadata: {
        company: 'Startup Tech',
        message: 'Gostaria de receber orçamento para campanha de Google Ads.',
        utm_source: 'facebook',
        utm_medium: 'cpc',
        utm_campaign: 'black-friday-2024',
        lead_magnet: 'calculator-roi',
        interest: 'ads',
        captured_at: new Date().toISOString(),
      },
      status: 'contacted',
    },
    {
      name: 'Lucas Martins',
      email: 'lucas@ecommerce.store',
      phone: '(11) 93333-4444',
      source: 'social-facebook',
      metadata: {
        company: 'E-commerce Store',
        message: 'Preciso aumentar minhas vendas online. Podem ajudar?',
        utm_source: 'facebook',
        utm_medium: 'paid',
        utm_campaign: 'anuncio-conversao',
        lead_magnet: null,
        interest: 'ecommerce',
        captured_at: new Date().toISOString(),
      },
      status: 'qualified',
    },
    {
      name: 'Camila Rodrigues',
      email: 'camila@blog.digital',
      phone: null,
      source: 'organic-google',
      metadata: {
        company: null,
        message: 'Baixei o e-book e gostaria de saber mais sobre seus serviços.',
        utm_source: 'google',
        utm_medium: 'organic',
        lead_magnet: 'ebook-content-marketing',
        interest: 'content',
        captured_at: new Date().toISOString(),
      },
      status: 'new',
    },
  ],
  
  // Tasks (status: 'pending', 'in_progress', 'completed')
  tasks: [
    {
      title: 'Reunião inicial - TechInova',
      description: 'Apresentar proposta de SEO e definir escopo do projeto.',
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 dias
      status: 'pending' as const,
      priority: 'high' as const,
      category: 'meeting',
    },
    {
      title: 'Análise de palavras-chave - Startup XYZ',
      description: 'Realizar pesquisa de palavras-chave para campanha de conteúdo.',
      due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // +5 dias
      status: 'in_progress' as const,
      priority: 'medium' as const,
      category: 'seo',
    },
    {
      title: 'Criar landing page - E-commerce Brasil',
      description: 'Desenvolver landing page para campanha de Black Friday.',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 dias
      status: 'pending' as const,
      priority: 'high' as const,
      category: 'development',
    },
    {
      title: 'Relatório mensal - Consultoria Estratégica',
      description: 'Compilar dados de performance de SEO do último mês.',
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 dias
      status: 'completed' as const,
      priority: 'medium' as const,
      category: 'report',
    },
    {
      title: 'Follow-up - Roberto Almeida',
      description: 'Ligar para discutir proposta de consultoria SEO.',
      due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // +1 dia
      status: 'pending' as const,
      priority: 'high' as const,
      category: 'follow-up',
    },
    {
      title: 'Configurar Google Analytics - Startup Tech',
      description: 'Instalar e configurar GA4 + Tag Manager no site.',
      due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // +4 dias
      status: 'in_progress' as const,
      priority: 'medium' as const,
      category: 'setup',
    },
  ],
}

// ============================================================================
// FUNÇÕES DE SEED
// ============================================================================

async function clearDatabase() {
  console.log('🗑️  Limpando dados antigos...')
  
  // Deletar em ordem (tasks -> leads -> clients -> user)
  await supabase.from('tasks').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('clients').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  
  console.log('✅ Dados antigos removidos')
}

async function createTestUser() {
  console.log('👤 Criando usuário de teste...')
  
  // Tentar criar usuário
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: SEED_DATA.user.email,
    password: SEED_DATA.user.password,
    options: {
      data: {
        full_name: SEED_DATA.user.full_name,
        role: SEED_DATA.user.role,
      },
    },
  })
  
  if (signUpError && !signUpError.message.includes('already registered')) {
    console.error('❌ Erro ao criar usuário:', signUpError)
    throw signUpError
  }
  
  // Login para obter sessão
  const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
    email: SEED_DATA.user.email,
    password: SEED_DATA.user.password,
  })
  
  if (signInError) {
    console.error('❌ Erro ao fazer login:', signInError)
    throw signInError
  }
  
  console.log('✅ Usuário criado:', SEED_DATA.user.email)
  console.log('   User ID:', sessionData.user?.id)
  
  return sessionData.user!
}

async function seedClients(userId: string) {
  console.log('🏢 Inserindo clientes...')
  
  const clientsWithUser = SEED_DATA.clients.map(client => ({
    ...client,
    created_by: userId,
  }))
  
  const { data, error } = await supabase
    .from('clients')
    .insert(clientsWithUser)
    .select()
  
  if (error) {
    console.error('❌ Erro ao inserir clientes:', error)
    throw error
  }
  
  console.log(`✅ ${data.length} clientes inseridos`)
  return data
}

async function seedLeads(userId: string) {
  console.log('📧 Inserindo leads...')
  
  const leadsWithUser = SEED_DATA.leads.map(lead => ({
    ...lead,
    assigned_to: userId,
  }))
  
  const { data, error } = await supabase
    .from('leads')
    .insert(leadsWithUser)
    .select()
  
  if (error) {
    console.error('❌ Erro ao inserir leads:', error)
    throw error
  }
  
  console.log(`✅ ${data.length} leads inseridos`)
  return data
}

async function seedTasks(userId: string, clients: any[]) {
  console.log('📋 Inserindo tasks...')
  
  const tasksWithUser = SEED_DATA.tasks.map((task, index) => ({
    ...task,
    created_by: userId,
    assigned_to: userId,
    // Vincular primeiras 3 tasks aos primeiros 3 clientes
    client_id: index < 3 ? clients[index].id : null,
  }))
  
  const { data, error } = await supabase
    .from('tasks')
    .insert(tasksWithUser)
    .select()
  
  if (error) {
    console.error('❌ Erro ao inserir tasks:', error)
    throw error
  }
  
  console.log(`✅ ${data.length} tasks inseridas`)
  return data
}

// ============================================================================
// EXECUTAR SEED
// ============================================================================

async function runSeed() {
  console.log('🌱 Iniciando seed do banco de dados...\n')
  console.log(`📍 Supabase URL: ${SUPABASE_URL}\n`)
  
  try {
    // 1. Limpar dados antigos
    await clearDatabase()
    console.log()
    
    // 2. Criar usuário de teste
    const user = await createTestUser()
    console.log()
    
    // 3. Inserir clientes
    const clients = await seedClients(user.id)
    console.log()
    
    // 4. Inserir leads
    const leads = await seedLeads(user.id)
    console.log()
    
    // 5. Inserir tasks
    const tasks = await seedTasks(user.id, clients)
    console.log()
    
    // 6. Resumo
    console.log('━'.repeat(60))
    console.log('✨ SEED COMPLETO!')
    console.log('━'.repeat(60))
    console.log(`
📊 Resumo:
   ✅ 1 usuário criado
   ✅ ${clients.length} clientes
   ✅ ${leads.length} leads
   ✅ ${tasks.length} tasks

🔐 Credenciais de acesso:
   Email: ${SEED_DATA.user.email}
   Senha: ${SEED_DATA.user.password}

🌐 URLs:
   Studio: http://127.0.0.1:54323
   API: ${SUPABASE_URL}
   
🚀 Próximos passos:
   1. Login no app: pnpm dev
   2. Abrir: http://localhost:3000/auth/login
   3. Ver dados no Studio: http://127.0.0.1:54323
    `)
    
  } catch (error) {
    console.error('\n❌ Erro durante seed:', error)
    process.exit(1)
  }
}

// Executar
runSeed()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
