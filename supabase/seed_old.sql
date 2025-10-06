-- Insert de dados de exemplo para testar o sistema completo
-- File: /home/jpcardozx/projetos/arco/supabase/seed.sql

-- Inserir cliente de exemplo
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
  '550e8400-e29b-41d4-a716-446655440001',
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
  primary_contact_email = EXCLUDED.primary_contact_email,
  primary_contact_phone = EXCLUDED.primary_contact_phone,
  updated_at = now();

-- Inserir checklist interativo de exemplo
INSERT INTO interactive_checklists (
  id,
  title,
  description,
  checklist_type,
  client_profile_id,
  status,
  total_items,
  completed_items,
  data
) VALUES (
  '01HK7XXYZZTEST123',
  'Auditoria Completa de Website',
  'Checklist abrangente para análise e otimização de performance, SEO e UX',
  'website_audit',
  (SELECT id FROM client_profiles WHERE client_id = '550e8400-e29b-41d4-a716-446655440001' LIMIT 1),
  'active',
  15,
  3,
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
  item_order
) VALUES 
-- Performance
('01HK7XXYZZTEST123', 'Análise de Core Web Vitals', 'Verificar LCP, FID e CLS usando Google PageSpeed Insights', 'Performance', 'critical', 'medium', 30, true, now() - interval '2 hours', 'LCP: 2.1s (Bom), FID: 85ms (Bom), CLS: 0.08 (Precisa melhorar)', 1),
('01HK7XXYZZTEST123', 'Otimização de Imagens', 'Implementar lazy loading e formatos WebP/AVIF', 'Performance', 'high', 'medium', 45, true, now() - interval '1 hour', 'Implementado lazy loading para todas as imagens do hero', 2),
('01HK7XXYZZTEST123', 'Minificação de CSS e JS', 'Configurar build para minificar assets de produção', 'Performance', 'high', 'easy', 20, true, now() - interval '30 minutes', 'Configurado Webpack para minificação automática', 3),
('01HK7XXYZZTEST123', 'Cache Strategy', 'Implementar cache headers adequados para recursos estáticos', 'Performance', 'medium', 'hard', 60, false, null, null, 4),
('01HK7XXYZZTEST123', 'CDN Configuration', 'Configurar CDN para servir assets estáticos', 'Performance', 'medium', 'medium', 40, false, null, null, 5),

-- SEO
('01HK7XXYZZTEST123', 'Meta Tags Optimization', 'Otimizar title, description e Open Graph para todas as páginas', 'SEO', 'critical', 'easy', 90, false, null, null, 6),
('01HK7XXYZZTEST123', 'Schema Markup', 'Implementar dados estruturados JSON-LD para produtos/serviços', 'SEO', 'high', 'medium', 75, false, null, null, 7),
('01HK7XXYZZTEST123', 'Sitemap e Robots.txt', 'Gerar sitemap XML dinâmico e configurar robots.txt', 'SEO', 'high', 'easy', 25, false, null, null, 8),
('01HK7XXYZZTEST123', 'Internal Linking', 'Otimizar estrutura de links internos para melhor crawling', 'SEO', 'medium', 'medium', 50, false, null, null, 9),

-- UX
('01HK7XXYZZTEST123', 'Mobile Responsiveness', 'Testar e corrigir layout em dispositivos móveis', 'UX', 'critical', 'medium', 120, false, null, null, 10),
('01HK7XXYZZTEST123', 'Navigation Usability', 'Analisar e melhorar navegação principal e breadcrumbs', 'UX', 'high', 'easy', 45, false, null, null, 11),
('01HK7XXYZZTEST123', 'Form Optimization', 'Otimizar formulários para melhor taxa de conversão', 'UX', 'high', 'medium', 60, false, null, null, 12),
('01HK7XXYZZTEST123', 'Call-to-Action Review', 'Revisar posicionamento e design dos CTAs principais', 'UX', 'medium', 'easy', 30, false, null, null, 13),

-- Analytics
('01HK7XXYZZTEST123', 'Google Analytics 4', 'Configurar GA4 com eventos personalizados e conversões', 'Analytics', 'high', 'medium', 40, false, null, null, 14),
('01HK7XXYZZTEST123', 'Conversion Tracking', 'Implementar tracking de conversões e goals', 'Analytics', 'high', 'hard', 80, false, null, null, 15)

ON CONFLICT (checklist_id, title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  priority = EXCLUDED.priority,
  difficulty = EXCLUDED.difficulty,
  estimated_minutes = EXCLUDED.estimated_minutes,
  updated_at = now();

-- Inserir interações do cliente
INSERT INTO client_interactions (
  client_profile_id,
  interaction_type,
  description,
  metadata
) VALUES 
(
  (SELECT id FROM client_profiles WHERE client_id = '550e8400-e29b-41d4-a716-446655440001' LIMIT 1),
  'initial_contact',
  'Primeiro contato via formulário do site',
  '{"source": "website", "utm_campaign": "performance-audit"}'::jsonb
),
(
  (SELECT id FROM client_profiles WHERE client_id = '550e8400-e29b-41d4-a716-446655440001' LIMIT 1),
  'meeting',
  'Reunião de discovery - definição de escopo do projeto',
  '{"duration_minutes": 60, "attendees": ["João Silva", "Equipe ARCO"]}'::jsonb
),
(
  (SELECT id FROM client_profiles WHERE client_id = '550e8400-e29b-41d4-a716-446655440001' LIMIT 1),
  'checklist_created',
  'Checklist de auditoria criado e compartilhado',
  '{"checklist_id": "01HK7XXYZZTEST123"}'::jsonb
);

-- Inserir template de checklist
INSERT INTO checklist_templates (
  name,
  description,
  category,
  template_data,
  is_active
) VALUES (
  'Website Performance Audit',
  'Template completo para auditoria de performance de websites',
  'audit',
  '{
    "sections": [
      {"name": "Performance", "weight": 0.4},
      {"name": "SEO", "weight": 0.3},
      {"name": "UX", "weight": 0.2},
      {"name": "Analytics", "weight": 0.1}
    ],
    "default_items": [
      {"title": "Core Web Vitals Analysis", "category": "Performance", "priority": "critical"},
      {"title": "Meta Tags Optimization", "category": "SEO", "priority": "critical"},
      {"title": "Mobile Responsiveness", "category": "UX", "priority": "critical"}
    ]
  }'::jsonb,
  true
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  template_data = EXCLUDED.template_data,
  updated_at = now();

-- Inserir verificações de exemplo
INSERT INTO checklist_verifications (
  checklist_item_id,
  verification_type,
  status,
  result_data,
  verified_by
) VALUES 
(
  (SELECT id FROM checklist_items WHERE title = 'Análise de Core Web Vitals' AND checklist_id = '01HK7XXYZZTEST123' LIMIT 1),
  'automated',
  'passed',
  '{"lcp": 2.1, "fid": 85, "cls": 0.08, "score": 85}'::jsonb,
  'system'
),
(
  (SELECT id FROM checklist_items WHERE title = 'Otimização de Imagens' AND checklist_id = '01HK7XXYZZTEST123' LIMIT 1),
  'manual',
  'verified',
  '{"images_optimized": 15, "lazy_loading": true, "webp_format": true}'::jsonb,
  'user-manual'
);

-- Inserir relacionamentos
INSERT INTO checklist_relationships (
  parent_item_id,
  child_item_id,
  relationship_type,
  metadata
) VALUES 
(
  (SELECT id FROM checklist_items WHERE title = 'Cache Strategy' AND checklist_id = '01HK7XXYZZTEST123' LIMIT 1),
  (SELECT id FROM checklist_items WHERE title = 'CDN Configuration' AND checklist_id = '01HK7XXYZZTEST123' LIMIT 1),
  'dependency',
  '{"description": "CDN deve ser configurado após definir estratégia de cache"}'::jsonb
),
(
  (SELECT id FROM checklist_items WHERE title = 'Google Analytics 4' AND checklist_id = '01HK7XXYZZTEST123' LIMIT 1),
  (SELECT id FROM checklist_items WHERE title = 'Conversion Tracking' AND checklist_id = '01HK7XXYZZTEST123' LIMIT 1),
  'dependency',
  '{"description": "Tracking de conversões depende do GA4 configurado"}'::jsonb
);