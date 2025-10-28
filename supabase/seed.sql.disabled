-- Seed simplificado para testar o sistema
-- File: /home/jpcardozx/projetos/arco/supabase/seed_simple.sql

-- Primeiro inserir o cliente base na tabela clients
INSERT INTO clients (
  id,
  name,
  email,
  company,
  industry,
  company_size,
  website,
  user_id,
  status
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'João Silva',
  'joao@empresaexemplo.com',
  'Empresa Exemplo Ltda',
  'Tecnologia',
  'Pequena (11-50)',
  'https://empresaexemplo.com',
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'active'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  updated_at = now();

-- Depois inserir o perfil detalhado
INSERT INTO client_profiles (
  client_id,
  primary_contact_name,
  primary_contact_email,
  primary_contact_phone,
  business_type,
  industry,
  company_size,
  current_website,
  budget_range,
  notes
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'João Silva',
  'joao@empresaexemplo.com',
  '(11) 99999-9999',
  'E-commerce',
  'Tecnologia',
  'Pequena (11-50)',
  'https://empresaexemplo.com',
  '15000-50000',
  'Cliente interessado em melhorar conversão do site'
) ON CONFLICT (client_id) DO UPDATE SET
  primary_contact_name = EXCLUDED.primary_contact_name,
  updated_at = now();

-- Inserir checklist interativo de exemplo
INSERT INTO interactive_checklists (
  id,
  title,
  description,
  checklist_type,
  status,
  total_items,
  completed_items,
  user_id,
  data
) VALUES (
  '01234567-89ab-cdef-0123-456789abcdef'::uuid,
  'Auditoria Completa de Website',
  'Checklist abrangente para análise e otimização de performance, SEO e UX',
  'website_audit',
  'active',
  15,
  3,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '{"priority": "high", "estimated_hours": 8, "category": "audit"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Inserir itens do checklist
INSERT INTO checklist_items (
  checklist_id,
  title,
  description,
  category,
  priority,
  difficulty,
  estimated_minutes,
  is_completed,
  completed_at,
  notes,
  sort_order
) VALUES 
-- Performance
('01234567-89ab-cdef-0123-456789abcdef', 'Análise de Core Web Vitals', 'Verificar LCP, FID e CLS usando Google PageSpeed Insights', 'Performance', 'critical', 'medium', 30, true, now() - interval '2 hours', 'LCP: 2.1s (Bom), FID: 85ms (Bom), CLS: 0.08 (Precisa melhorar)', 1),
('01234567-89ab-cdef-0123-456789abcdef', 'Otimização de Imagens', 'Implementar lazy loading e formatos WebP/AVIF', 'Performance', 'high', 'medium', 45, true, now() - interval '1 hour', 'Implementado lazy loading para todas as imagens do hero', 2),
('01234567-89ab-cdef-0123-456789abcdef', 'Minificação de CSS e JS', 'Configurar build para minificar assets de produção', 'Performance', 'high', 'easy', 20, true, now() - interval '30 minutes', 'Configurado Webpack para minificação automática', 3),
('01234567-89ab-cdef-0123-456789abcdef', 'Cache Strategy', 'Implementar cache headers adequados para recursos estáticos', 'Performance', 'medium', 'hard', 60, false, null, null, 4),
('01234567-89ab-cdef-0123-456789abcdef', 'CDN Configuration', 'Configurar CDN para servir assets estáticos', 'Performance', 'medium', 'medium', 40, false, null, null, 5),

-- SEO
('01234567-89ab-cdef-0123-456789abcdef', 'Meta Tags Optimization', 'Otimizar title, description e Open Graph para todas as páginas', 'SEO', 'critical', 'easy', 90, false, null, null, 6),
('01234567-89ab-cdef-0123-456789abcdef', 'Schema Markup', 'Implementar dados estruturados JSON-LD para produtos/serviços', 'SEO', 'high', 'medium', 75, false, null, null, 7),
('01234567-89ab-cdef-0123-456789abcdef', 'Sitemap e Robots.txt', 'Gerar sitemap XML dinâmico e configurar robots.txt', 'SEO', 'high', 'easy', 25, false, null, null, 8),
('01234567-89ab-cdef-0123-456789abcdef', 'Internal Linking', 'Otimizar estrutura de links internos para melhor crawling', 'SEO', 'medium', 'medium', 50, false, null, null, 9),

-- UX
('01234567-89ab-cdef-0123-456789abcdef', 'Mobile Responsiveness', 'Testar e corrigir layout em dispositivos móveis', 'UX', 'critical', 'medium', 120, false, null, null, 10),
('01234567-89ab-cdef-0123-456789abcdef', 'Navigation Usability', 'Analisar e melhorar navegação principal e breadcrumbs', 'UX', 'high', 'easy', 45, false, null, null, 11),
('01234567-89ab-cdef-0123-456789abcdef', 'Form Optimization', 'Otimizar formulários para melhor taxa de conversão', 'UX', 'high', 'medium', 60, false, null, null, 12),
('01234567-89ab-cdef-0123-456789abcdef', 'Call-to-Action Review', 'Revisar posicionamento e design dos CTAs principais', 'UX', 'medium', 'easy', 30, false, null, null, 13),

-- Analytics
('01234567-89ab-cdef-0123-456789abcdef', 'Google Analytics 4', 'Configurar GA4 com eventos personalizados e conversões', 'Analytics', 'high', 'medium', 40, false, null, null, 14),
('01234567-89ab-cdef-0123-456789abcdef', 'Conversion Tracking', 'Implementar tracking de conversões e goals', 'Analytics', 'high', 'hard', 80, false, null, null, 15)

ON CONFLICT (checklist_id, title) DO UPDATE SET
  description = EXCLUDED.description,
  updated_at = now();