-- Migration: Seed test campaign for LP testing
-- Purpose: Create a sample campaign to test landing page progressive enhancement
-- Date: 2025-10-18

-- Create test auth user if doesn't exist (for local development only)
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  'test-lp@arco.local',
  crypt('test123', gen_salt('bf')),  -- Password: test123 (for local dev only)
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Test User - LP Demo"}'::jsonb,
  false,
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Create test user_profile if doesn't exist
INSERT INTO user_profiles (id, full_name, user_type, tier)
VALUES (
  'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0'::uuid,
  'Test User - Landing Page Demo',
  'client',
  'free'
)
ON CONFLICT (id) DO NOTHING;

-- Insert test campaign for landing page
-- Using only fields that exist in campaigns table
INSERT INTO campaigns (
  client_id,
  platform,
  slug,
  name,
  description,
  variant,
  is_active,
  
  -- Hero Section (existing fields)
  hero_title,
  hero_subtitle,
  hero_description,
  cta_text,
  cta_secondary_text,
  
  -- Images
  hero_image_url,
  og_image_url,
  
  -- Meta/SEO
  meta_title,
  meta_description,
  
  -- Lead Magnet
  lead_magnet_title,
  lead_magnet_description,
  lead_magnet_type,
  
  -- Config
  cta_button_color,
  total_leads,
  total_views,
  
  -- Integration
  webhook_url,
  email_subject,
  thank_you_page_url
) VALUES (
  'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0'::uuid, -- Temporary client_id (update after onboarding)
  'meta_ads',  -- Platform (google_ads, meta_ads, linkedin_ads, tiktok_ads)
  'salao-beleza-2024',
  'Transforme Seu Salão em Máquina de Vendas',
  'Sistema completo de agendamentos online para salões de beleza. Capture clientes 24/7, automatize confirmações e aumente seu faturamento.',
  'A',
  true,
  
  -- Hero
  'Agende Seus Clientes no Piloto Automático',
  'Sistema completo de agendamentos que trabalha por você 24/7',
  'Sem perder clientes, sem mensagens não respondidas. Transforme seu WhatsApp em máquina de vendas.',
  'Quero Transformar Meu Salão',
  'Ver Como Funciona',
  
  -- Images
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop',
  
  -- Meta
  'Sistema de Agendamentos para Salões | ARCO',
  'Transforme seu salão com sistema completo de agendamentos online. Capture clientes 24/7, automatize confirmações e aumente seu faturamento em até 40%.',
  
  -- Lead Magnet
  'Guia Completo: Como Automatizar Seu Salão',
  'Receba gratuitamente nosso checklist com 12 automações que vão dobrar sua produtividade',
  'checklist',
  
  -- Config
  '#E879F9',  -- Fuchsia-400
  0,          -- Initial leads
  0,          -- Initial views
  
  -- Integration
  NULL,       -- webhook_url (configure depois)
  'Bem-vindo ao Sistema ARCO!',
  '/lp/salao-beleza-2024/success'
)
ON CONFLICT (slug) 
DO UPDATE SET
  is_active = EXCLUDED.is_active,
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

-- Verify insertion
DO $$
DECLARE
  campaign_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO campaign_count
  FROM campaigns
  WHERE slug = 'salao-beleza-2024';
  
  IF campaign_count > 0 THEN
    RAISE NOTICE 'SUCCESS: Test campaign "salao-beleza-2024" created/updated';
    RAISE NOTICE 'Access at: http://localhost:3000/lp/salao-beleza-2024';
  ELSE
    RAISE EXCEPTION 'FAILED: Test campaign was not created';
  END IF;
END $$;

-- Display campaign info
SELECT 
  slug,
  name,
  variant,
  is_active,
  hero_title,
  total_leads,
  created_at
FROM campaigns
WHERE slug = 'salao-beleza-2024';

-- Add comment for documentation
COMMENT ON TABLE campaigns IS 'Landing page campaigns with progressive enhancement support. Test campaign: salao-beleza-2024';
