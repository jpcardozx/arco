-- Quick Start: Criar campanha de teste para LP

-- 1. Inserir campanha de teste
INSERT INTO campaigns (
  slug,
  name,
  client_id,
  variant,
  is_active,
  
  -- Hero
  hero_title,
  hero_subtitle,
  hero_cta_primary,
  hero_cta_secondary,
  
  -- Preview
  preview_title,
  preview_subtitle,
  preview_cta,
  
  -- Intent
  intent_title,
  intent_subtitle,
  
  -- How It Works
  how_it_works_title,
  how_it_works_subtitle,
  
  -- Proof
  proof_title,
  proof_subtitle,
  
  -- Pricing
  pricing_title,
  pricing_subtitle,
  
  -- Capture
  capture_title,
  capture_subtitle,
  capture_cta,
  
  -- FAQ
  faq_title,
  
  -- Meta
  meta_title,
  meta_description
) VALUES (
  'salao-beleza-2024',
  'Transforme Seu Salão em Máquina de Vendas',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1), -- Pega primeiro admin
  'default',
  true,
  
  -- Hero
  'Agende Seus Clientes no Piloto Automático',
  'Sistema completo de agendamentos que trabalha por você 24/7. Sem perder clientes, sem mensagens não respondidas.',
  'Quero Transformar Meu Salão',
  'Ver Como Funciona',
  
  -- Preview
  'Veja Como Será Seu Sistema',
  'Digite seu nome para visualizar como ficará personalizado para seu salão',
  'Gerar Minha Prévia',
  
  -- Intent
  'O Que Você Mais Precisa Agora?',
  'Escolha seu principal desafio e veja como resolvemos',
  
  -- How It Works
  'Como Funciona na Prática',
  'Em 4 passos simples você sai do caos para o controle total',
  
  -- Proof
  'Resultados Reais de Salões Reais',
  'Veja o antes e depois de quem já transformou a gestão',
  
  -- Pricing
  'Planos Para Cada Momento do Seu Salão',
  'Comece agora e escale conforme seu negócio cresce',
  
  -- Capture
  'Pronto Para Transformar Seu Salão?',
  'Preencha seus dados e receba acesso imediato ao sistema',
  'Quero Começar Agora',
  
  -- FAQ
  'Perguntas Frequentes',
  
  -- Meta
  'Sistema de Agendamentos para Salões | ARCO',
  'Transforme seu salão com sistema completo de agendamentos online. Capture clientes 24/7, automatize confirmações e aumente seu faturamento.'
);

-- 2. Verificar se foi criada
SELECT 
  slug,
  name,
  variant,
  is_active,
  hero_title,
  created_at
FROM campaigns
WHERE slug = 'salao-beleza-2024';

-- 3. Testar a rota
-- Acesse: http://localhost:3000/lp/salao-beleza-2024

-- 4. (Opcional) Listar todas campanhas ativas
SELECT 
  slug,
  name,
  variant,
  is_active,
  total_leads,
  created_at
FROM campaigns
WHERE is_active = true
ORDER BY created_at DESC;
