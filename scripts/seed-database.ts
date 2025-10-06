#!/usr/bin/env npx tsx
// Script para aplicar dados de seed diretamente no banco

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

// Usar service role key para bypass RLS durante seed
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
})

async function seedDatabase() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // 1. Obter ou criar usuário
    let userId: string
    
    // Tentar buscar usuário existente
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existingUser = existingUsers.users.find(u => u.email === 'test@arco.dev')
    
    if (existingUser) {
      userId = existingUser.id
      console.log('✅ Usuário existente encontrado com ID:', userId)
    } else {
      // Criar novo usuário
      const { data: userData, error: userError } = await supabase.auth.admin.createUser({
        email: 'test@arco.dev',
        password: 'password123',
        user_metadata: { name: 'Test User' },
        email_confirm: true
      })

      if (userError) {
        console.error('❌ Erro ao criar usuário:', userError)
        return
      }

      userId = userData.user.id
      console.log('✅ Usuário de teste criado com ID:', userId)
    }

    // 2. Inserir checklist principal
    const { error: checklistError } = await supabase
      .from('interactive_checklists')
      .upsert({
        id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Auditoria Completa de Website',
        description: 'Checklist abrangente para análise e otimização de performance, SEO e UX',
        checklist_type: 'website_audit',
        status: 'in_progress',
        total_items: 50,
        completed_items: 8,
        user_id: userId,
        data: { priority: 'high', estimated_hours: 8, category: 'audit' }
      })

    if (checklistError) {
      console.error('❌ Erro ao inserir checklist:', checklistError)
      return
    }

    console.log('✅ Checklist principal inserido')

    // 3. Inserir itens do checklist (50 itens relevantes)
    const checklistItems = [
      // Performance (12 itens - 5 completos)
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Análise de Core Web Vitals',
        description: 'Verificar LCP, FID e CLS usando Google PageSpeed Insights',
        category: 'Performance',
        priority: 'critical',
        difficulty: 'medium',
        estimated_minutes: 30,
        is_completed: true,
        completed_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        notes: 'LCP: 2.1s (Bom), FID: 85ms (Bom), CLS: 0.08 (Precisa melhorar)',
        sort_order: 1
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Otimização de Imagens',
        description: 'Implementar lazy loading e formatos WebP/AVIF',
        category: 'Performance',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 45,
        is_completed: true,
        completed_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        notes: 'Implementado lazy loading para todas as imagens do hero',
        sort_order: 2
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Minificação de CSS e JS',
        description: 'Configurar build para minificar assets de produção',
        category: 'Performance',
        priority: 'high',
        difficulty: 'easy',
        estimated_minutes: 20,
        is_completed: true,
        completed_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        notes: 'Configurado Webpack para minificação automática',
        sort_order: 3
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Tree Shaking e Code Splitting',
        description: 'Eliminar código não utilizado e dividir bundles',
        category: 'Performance',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 60,
        is_completed: true,
        completed_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        notes: 'Redução de 35% no bundle size principal',
        sort_order: 4
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Preload Resources Críticos',
        description: 'Implementar preload para fontes, CSS e scripts essenciais',
        category: 'Performance',
        priority: 'high',
        difficulty: 'easy',
        estimated_minutes: 25,
        is_completed: true,
        completed_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        notes: 'Fonts e CSS crítico com preload configurado',
        sort_order: 5
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Cache Strategy',
        description: 'Implementar cache headers adequados para recursos estáticos',
        category: 'Performance',
        priority: 'medium',
        difficulty: 'hard',
        estimated_minutes: 60,
        is_completed: false,
        sort_order: 6
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'CDN Configuration',
        description: 'Configurar CDN para servir assets estáticos',
        category: 'Performance',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 40,
        is_completed: false,
        sort_order: 7
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Service Worker',
        description: 'Implementar service worker para cache offline',
        category: 'Performance',
        priority: 'medium',
        difficulty: 'hard',
        estimated_minutes: 90,
        is_completed: false,
        sort_order: 8
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Database Query Optimization',
        description: 'Otimizar queries e implementar índices adequados',
        category: 'Performance',
        priority: 'high',
        difficulty: 'hard',
        estimated_minutes: 75,
        is_completed: false,
        sort_order: 9
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Gzip/Brotli Compression',
        description: 'Configurar compressão de assets no servidor',
        category: 'Performance',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 20,
        is_completed: false,
        sort_order: 10
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Critical CSS Inline',
        description: 'Extrair e incluir CSS crítico inline no HTML',
        category: 'Performance',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 45,
        is_completed: false,
        sort_order: 11
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Resource Hints',
        description: 'Implementar dns-prefetch, preconnect e prefetch',
        category: 'Performance',
        priority: 'low',
        difficulty: 'easy',
        estimated_minutes: 15,
        is_completed: false,
        sort_order: 12
      },

      // SEO (12 itens - 2 completos)
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Meta Tags Optimization',
        description: 'Otimizar title, description e Open Graph para todas as páginas',
        category: 'SEO',
        priority: 'critical',
        difficulty: 'easy',
        estimated_minutes: 90,
        is_completed: true,
        completed_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        notes: 'Meta tags otimizadas para 15 páginas principais',
        sort_order: 13
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Schema Markup',
        description: 'Implementar dados estruturados JSON-LD para produtos/serviços',
        category: 'SEO',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 75,
        is_completed: true,
        completed_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        notes: 'Schema de Organization, Service e LocalBusiness implementados',
        sort_order: 14
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Sitemap e Robots.txt',
        description: 'Gerar sitemap XML dinâmico e configurar robots.txt',
        category: 'SEO',
        priority: 'high',
        difficulty: 'easy',
        estimated_minutes: 25,
        is_completed: false,
        sort_order: 15
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Internal Linking',
        description: 'Otimizar estrutura de links internos para melhor crawling',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 50,
        is_completed: false,
        sort_order: 16
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'URL Structure',
        description: 'Implementar URLs amigáveis e hierarquia lógica',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 35,
        is_completed: false,
        sort_order: 17
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Canonical URLs',
        description: 'Implementar canonical tags para evitar conteúdo duplicado',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 30,
        is_completed: false,
        sort_order: 18
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Alt Text Optimization',
        description: 'Otimizar alt text de todas as imagens para acessibilidade e SEO',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 40,
        is_completed: false,
        sort_order: 19
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Heading Structure',
        description: 'Implementar hierarquia adequada de H1-H6',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 25,
        is_completed: false,
        sort_order: 20
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Local SEO',
        description: 'Otimizar para buscas locais com NAP e Google My Business',
        category: 'SEO',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 60,
        is_completed: false,
        sort_order: 21
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Content Optimization',
        description: 'Otimizar densidade de palavras-chave e relevância do conteúdo',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 90,
        is_completed: false,
        sort_order: 22
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Mobile-First Indexing',
        description: 'Garantir que a versão mobile seja otimizada para indexação',
        category: 'SEO',
        priority: 'critical',
        difficulty: 'medium',
        estimated_minutes: 45,
        is_completed: false,
        sort_order: 23
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: '404 Pages e Redirects',
        description: 'Implementar páginas 404 personalizadas e redirects 301',
        category: 'SEO',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 30,
        is_completed: false,
        sort_order: 24
      },

      // UX (13 itens - 1 completo)
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Mobile Responsiveness',
        description: 'Testar e corrigir layout em dispositivos móveis',
        category: 'UX',
        priority: 'critical',
        difficulty: 'medium',
        estimated_minutes: 120,
        is_completed: true,
        completed_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        notes: 'Layout responsivo testado em 5 dispositivos diferentes',
        sort_order: 25
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Navigation Usability',
        description: 'Analisar e melhorar navegação principal e breadcrumbs',
        category: 'UX',
        priority: 'high',
        difficulty: 'easy',
        estimated_minutes: 45,
        is_completed: false,
        sort_order: 26
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Form Optimization',
        description: 'Otimizar formulários para melhor taxa de conversão',
        category: 'UX',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 60,
        is_completed: false,
        sort_order: 27
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Call-to-Action Review',
        description: 'Revisar posicionamento e design dos CTAs principais',
        category: 'UX',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 30,
        is_completed: false,
        sort_order: 28
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Loading States',
        description: 'Implementar estados de carregamento e skeleton screens',
        category: 'UX',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 40,
        is_completed: false,
        sort_order: 29
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Error Handling',
        description: 'Implementar tratamento de erros com mensagens claras',
        category: 'UX',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 50,
        is_completed: false,
        sort_order: 30
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Micro-interactions',
        description: 'Adicionar animações sutis e feedback visual',
        category: 'UX',
        priority: 'low',
        difficulty: 'medium',
        estimated_minutes: 75,
        is_completed: false,
        sort_order: 31
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Search Functionality',
        description: 'Implementar busca interna com autocomplete',
        category: 'UX',
        priority: 'medium',
        difficulty: 'hard',
        estimated_minutes: 90,
        is_completed: false,
        sort_order: 32
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Accessibility Compliance',
        description: 'Garantir conformidade com WCAG 2.1 AA',
        category: 'UX',
        priority: 'high',
        difficulty: 'hard',
        estimated_minutes: 120,
        is_completed: false,
        sort_order: 33
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Touch Targets',
        description: 'Otimizar tamanho de botões e áreas clicáveis para mobile',
        category: 'UX',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 25,
        is_completed: false,
        sort_order: 34
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Typography Hierarchy',
        description: 'Estabelecer hierarquia tipográfica clara e legível',
        category: 'UX',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 35,
        is_completed: false,
        sort_order: 35
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Color Contrast',
        description: 'Verificar contraste adequado para acessibilidade',
        category: 'UX',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 20,
        is_completed: false,
        sort_order: 36
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'User Feedback System',
        description: 'Implementar sistema de feedback e avaliações',
        category: 'UX',
        priority: 'low',
        difficulty: 'medium',
        estimated_minutes: 60,
        is_completed: false,
        sort_order: 37
      },

      // Analytics & Tracking (8 itens)
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Google Analytics 4',
        description: 'Configurar GA4 com eventos personalizados e conversões',
        category: 'Analytics',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 40,
        is_completed: false,
        sort_order: 38
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Conversion Tracking',
        description: 'Implementar tracking de conversões e goals',
        category: 'Analytics',
        priority: 'high',
        difficulty: 'hard',
        estimated_minutes: 80,
        is_completed: false,
        sort_order: 39
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Heat Maps',
        description: 'Configurar Hotjar ou similar para análise de comportamento',
        category: 'Analytics',
        priority: 'medium',
        difficulty: 'easy',
        estimated_minutes: 20,
        is_completed: false,
        sort_order: 40
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'A/B Testing Setup',
        description: 'Implementar ferramenta para testes A/B',
        category: 'Analytics',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 45,
        is_completed: false,
        sort_order: 41
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Event Tracking',
        description: 'Configurar eventos customizados para ações importantes',
        category: 'Analytics',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 60,
        is_completed: false,
        sort_order: 42
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'E-commerce Tracking',
        description: 'Implementar enhanced e-commerce se aplicável',
        category: 'Analytics',
        priority: 'medium',
        difficulty: 'hard',
        estimated_minutes: 90,
        is_completed: false,
        sort_order: 43
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Custom Dashboards',
        description: 'Criar dashboards personalizados para KPIs específicos',
        category: 'Analytics',
        priority: 'low',
        difficulty: 'medium',
        estimated_minutes: 75,
        is_completed: false,
        sort_order: 44
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'GDPR Compliance',
        description: 'Implementar consent management para cookies e tracking',
        category: 'Analytics',
        priority: 'critical',
        difficulty: 'medium',
        estimated_minutes: 55,
        is_completed: false,
        sort_order: 45
      },

      // Security & Technical (5 itens)
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'SSL Certificate',
        description: 'Configurar HTTPS com certificado SSL válido',
        category: 'Security',
        priority: 'critical',
        difficulty: 'easy',
        estimated_minutes: 15,
        is_completed: false,
        sort_order: 46
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Security Headers',
        description: 'Implementar headers de segurança (CSP, HSTS, etc.)',
        category: 'Security',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 40,
        is_completed: false,
        sort_order: 47
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Input Validation',
        description: 'Implementar validação adequada em todos os formulários',
        category: 'Security',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 60,
        is_completed: false,
        sort_order: 48
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Regular Backups',
        description: 'Configurar sistema de backup automático',
        category: 'Security',
        priority: 'high',
        difficulty: 'medium',
        estimated_minutes: 30,
        is_completed: false,
        sort_order: 49
      },
      {
        checklist_id: '01234567-89ab-cdef-0123-456789abcdef',
        title: 'Monitoring & Alerts',
        description: 'Configurar monitoramento de uptime e alertas',
        category: 'Security',
        priority: 'medium',
        difficulty: 'medium',
        estimated_minutes: 45,
        is_completed: false,
        sort_order: 50
      }
    ]

    const { error: itemsError } = await supabase
      .from('checklist_items')
      .upsert(checklistItems)

    if (itemsError) {
      console.error('❌ Erro ao inserir itens:', itemsError)
      return
    }

    console.log('✅ 15 itens do checklist inseridos')

    // 4. Verificar dados inseridos
    const { data: checklists, error: verifyError } = await supabase
      .from('interactive_checklists')
      .select('*, checklist_items(*)')
      .eq('id', '01234567-89ab-cdef-0123-456789abcdef')

    if (verifyError) {
      console.error('❌ Erro ao verificar dados:', verifyError)
      return
    }

    console.log('🎉 Seed aplicado com sucesso!')
    console.log(`📊 Checklist "${checklists[0].title}" com ${checklists[0].checklist_items.length} itens`)
    console.log(`✅ ${checklists[0].completed_items} concluídos / ${checklists[0].total_items} total`)

  } catch (error) {
    console.error('💥 Erro fatal:', error)
  }
}

seedDatabase()