

-- ========================================
-- AGENDAMENTOS SYSTEM TABLES
-- ========================================

-- Sistema de Agendamentos ARCO
-- Core booking system tables

-- Create ENUMs first (drop if exists to be safe)
DO $$ BEGIN
  CREATE TYPE urgency_enum AS ENUM ('urgent', 'this_month', 'next_month', 'exploring');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE company_size_enum AS ENUM ('solo', 'small_2_10', 'medium_11_50', 'large_50_plus');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE qualification_status_enum AS ENUM ('pending', 'qualified', 'not_qualified', 'converted');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status_enum AS ENUM ('pending', 'processing', 'approved', 'rejected', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_method_enum AS ENUM ('pix', 'credit_card', 'boleto');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status_enum AS ENUM ('pending_payment', 'confirmed', 'completed', 'cancelled', 'no_show');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CONSULTORIA TYPES
CREATE TABLE IF NOT EXISTS consultoria_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Pricing
  price_cents INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  
  -- Features
  features JSONB,
  
  -- Targeting
  ideal_for TEXT[],
  min_budget_monthly_cents INTEGER,
  
  -- Availability
  is_active BOOLEAN DEFAULT true,
  slots_per_day INTEGER DEFAULT 3,
  buffer_minutes INTEGER DEFAULT 15,
  
  -- Metadata
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'calendar',
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- QUALIFICATION RESPONSES
CREATE TABLE IF NOT EXISTS qualification_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  
  primary_challenge TEXT NOT NULL,
  monthly_budget_range TEXT NOT NULL,
  urgency urgency_enum NOT NULL,
  has_existing_site BOOLEAN,
  has_active_campaigns BOOLEAN,
  
  additional_info TEXT,
  company_name TEXT,
  company_size company_size_enum,
  
  lead_quality_score INTEGER,
  recommended_consultoria_id UUID REFERENCES consultoria_types(id),
  ai_insights JSONB,
  
  status qualification_status_enum DEFAULT 'pending',
  converted_to_booking BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS consultoria_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  consultoria_type_id UUID REFERENCES consultoria_types(id) NOT NULL,
  qualification_response_id UUID REFERENCES qualification_responses(id),
  
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  duration_minutes INTEGER NOT NULL,
  
  meeting_url TEXT,
  calendar_event_id TEXT,
  
  payment_status payment_status_enum DEFAULT 'pending',
  payment_method payment_method_enum,
  mercado_pago_payment_id TEXT,
  mercado_pago_preference_id TEXT,
  amount_cents INTEGER NOT NULL,
  discount_code TEXT,
  discount_amount_cents INTEGER DEFAULT 0,
  final_amount_cents INTEGER NOT NULL,
  
  booking_status booking_status_enum DEFAULT 'pending_payment',
  
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  participant_phone TEXT,
  participant_company TEXT,
  
  preparation_notes TEXT,
  participant_questions TEXT[],
  
  attended BOOLEAN,
  consultant_notes TEXT,
  follow_up_actions JSONB,
  satisfaction_rating INTEGER,
  
  reminder_sent_24h BOOLEAN DEFAULT false,
  reminder_sent_1h BOOLEAN DEFAULT false,
  
  cancelled_at TIMESTAMPTZ,
  cancelled_by UUID REFERENCES auth.users(id),
  cancellation_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CONSULTANT AVAILABILITY
CREATE TABLE IF NOT EXISTS consultant_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  consultoria_type_id UUID REFERENCES consultoria_types(id) NOT NULL,
  
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  is_active BOOLEAN DEFAULT true,
  
  valid_from DATE,
  valid_until DATE,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(consultoria_type_id, day_of_week, start_time)
);

-- DISCOUNT CODES
CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  code TEXT UNIQUE NOT NULL,
  
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value INTEGER NOT NULL,
  
  is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  
  minimum_purchase_cents INTEGER,
  
  applicable_consultoria_ids UUID[],
  
  created_by UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON consultoria_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON consultoria_bookings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON consultoria_bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON consultoria_bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_availability_consultoria ON consultant_availability(consultoria_type_id);
CREATE INDEX IF NOT EXISTS idx_availability_day ON consultant_availability(day_of_week);
CREATE INDEX IF NOT EXISTS idx_qualification_user ON qualification_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_discount_code ON discount_codes(code);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_consultoria_types_updated_at
  BEFORE UPDATE ON consultoria_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultoria_bookings_updated_at
  BEFORE UPDATE ON consultoria_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qualification_responses_updated_at
  BEFORE UPDATE ON qualification_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE consultoria_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualification_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultoria_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultant_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Consultoria Types: Everyone can read active types
CREATE POLICY "Consultoria types are viewable by everyone"
  ON consultoria_types FOR SELECT
  USING (is_active = true);

-- Qualification Responses: Users can view/update their own
CREATE POLICY "Users can view own qualification responses"
  ON qualification_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert qualification responses"
  ON qualification_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own qualification responses"
  ON qualification_responses FOR UPDATE
  USING (auth.uid() = user_id);

-- Bookings: Users can view/manage their own bookings
CREATE POLICY "Users can view own bookings"
  ON consultoria_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON consultoria_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON consultoria_bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Consultant Availability: Everyone can read
CREATE POLICY "Availability is viewable by everyone"
  ON consultant_availability FOR SELECT
  USING (is_active = true);

-- Discount Codes: Public codes can be validated
CREATE POLICY "Active discount codes are viewable"
  ON discount_codes FOR SELECT
  USING (is_active = true);

-- Seed data: Consultoria Types
INSERT INTO consultoria_types (name, slug, description, price_cents, duration_minutes, features, ideal_for, min_budget_monthly_cents, color, icon) VALUES
(
  'Diagnóstico Estratégico',
  'diagnostico-estrategico',
  'Análise completa do seu negócio digital com roadmap personalizado',
  50000,
  60,
  '{"included": ["Análise completa do negócio", "Auditoria de presença digital", "Roadmap estratégico", "Relatório detalhado em PDF"], "not_included": ["Implementação das ações", "Suporte contínuo"]}'::jsonb,
  ARRAY['Empresas iniciando no digital', 'Negócios sem estratégia clara', 'Empresas querendo organizar marketing'],
  100000,
  '#10B981',
  'search'
),
(
  'Consultoria Técnica',
  'consultoria-tecnica',
  'Resolução de problemas técnicos específicos e otimizações',
  75000,
  90,
  '{"included": ["Análise técnica profunda", "Solução de problemas específicos", "Implementação de melhorias", "Documentação técnica"], "not_included": ["Desenvolvimento completo", "Manutenção contínua"]}'::jsonb,
  ARRAY['Sites com problemas de performance', 'Necessidade de integrações', 'Otimização de conversão'],
  200000,
  '#3B82F6',
  'code'
),
(
  'Planejamento de Tráfego',
  'planejamento-trafego',
  'Estratégia completa de tráfego pago com setup inicial',
  75000,
  90,
  '{"included": ["Análise de concorrência", "Estratégia de canais", "Setup de campanhas", "Estrutura de testes"], "not_included": ["Gestão contínua", "Verba de mídia"]}'::jsonb,
  ARRAY['Empresas iniciando em tráfego pago', 'Campanhas com baixo ROI', 'Necessidade de escala'],
  500000,
  '#F59E0B',
  'megaphone'
),
(
  'Mentoria Executiva',
  'mentoria-executiva',
  'Sessão estratégica com nossos especialistas sêniores',
  150000,
  120,
  '{"included": ["Consultoria estratégica 1:1", "Análise de cenário completo", "Plano de ação executivo", "Suporte por 30 dias via WhatsApp"], "not_included": []}'::jsonb,
  ARRAY['CEOs e Founders', 'Decisões estratégicas de alto impacto', 'Empresas em crescimento acelerado'],
  1000000,
  '#8B5CF6',
  'star'
);

-- Seed data: Default availability (Segunda a Sexta, 9h-17h)
INSERT INTO consultant_availability (consultoria_type_id, day_of_week, start_time, end_time, is_active)
SELECT 
  id,
  day_of_week,
  '09:00:00'::time,
  '17:00:00'::time,
  true
FROM consultoria_types
CROSS JOIN generate_series(1, 5) AS day_of_week;
