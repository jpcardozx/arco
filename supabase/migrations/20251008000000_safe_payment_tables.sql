-- =====================================================
-- SAFE MIGRATION: Mercado Pago Payment System
-- Verifica conflitos antes de criar tabelas
-- Data: 2025-10-08
-- =====================================================

-- Verificar se já existem tabelas
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('subscription_plans', 'subscriptions', 'payment_transactions', 'payment_methods', 'webhook_events')
  ) THEN
    RAISE NOTICE 'Tabelas de pagamento já existem. Pulando criação.';
  ELSE
    RAISE NOTICE 'Criando tabelas de pagamento...';
  END IF;
END $$;

-- 1. subscription_plans (se não existir)
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Plan info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Pricing
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  currency TEXT DEFAULT 'BRL',
  
  -- Mercado Pago
  mercadopago_plan_id TEXT,
  
  -- Features
  features JSONB DEFAULT '[]'::jsonb,
  
  -- Limits
  max_analyses INTEGER,
  max_storage_gb INTEGER,
  max_users INTEGER,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. payment_methods (PCI compliant)
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Gateway info
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_customer_id TEXT NOT NULL,
  gateway_payment_method_id TEXT NOT NULL,
  
  -- Card info (não-sensível)
  card_brand TEXT,
  card_last4 TEXT,
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  
  -- Status
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, gateway_customer_id, gateway_payment_method_id)
);

-- 3. subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relacionamentos
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  
  -- Gateway
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_subscription_id TEXT UNIQUE NOT NULL,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'active',
    'past_due',
    'cancelled',
    'paused',
    'incomplete'
  )),
  
  -- Billing cycle
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  
  -- Trial
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. payment_transactions
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relacionamentos
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Gateway IDs
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_transaction_id TEXT UNIQUE NOT NULL,
  gateway_order_id TEXT,
  gateway_customer_id TEXT,
  
  -- Valores
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'pending',
    'processing',
    'authorized',
    'succeeded',
    'failed',
    'refunded',
    'cancelled'
  )),
  
  -- Payment method
  payment_method_type TEXT,
  payment_method_last4 TEXT,
  
  -- Timestamps
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. webhook_events
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Gateway
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_event_id TEXT UNIQUE NOT NULL,
  
  -- Event data
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  
  -- Processing
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Timestamps
  received_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES (se não existirem)
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id 
  ON public.payment_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_status 
  ON public.payment_transactions(status);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_gateway 
  ON public.payment_transactions(gateway);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at 
  ON public.payment_transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id 
  ON public.subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_status 
  ON public.subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_webhook_events_processed 
  ON public.webhook_events(processed, created_at);

CREATE INDEX IF NOT EXISTS idx_webhook_events_gateway 
  ON public.webhook_events(gateway, event_type);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own payment methods" ON public.payment_methods;
DROP POLICY IF EXISTS "Users can insert their own payment methods" ON public.payment_methods;
DROP POLICY IF EXISTS "Users can update their own payment methods" ON public.payment_methods;
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.payment_transactions;
DROP POLICY IF EXISTS "Everyone can view active plans" ON public.subscription_plans;
DROP POLICY IF EXISTS "Service role can manage webhooks" ON public.webhook_events;

-- Create policies
CREATE POLICY "Users can view their own payment methods"
  ON public.payment_methods FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods"
  ON public.payment_methods FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods"
  ON public.payment_methods FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own transactions"
  ON public.payment_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view active plans"
  ON public.subscription_plans FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Service role can manage webhooks"
  ON public.webhook_events
  USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- SEED DATA: Planos iniciais (se não existirem)
-- =====================================================

INSERT INTO public.subscription_plans (
  name,
  slug,
  description,
  price_monthly,
  price_yearly,
  features,
  max_analyses,
  max_storage_gb,
  max_users,
  is_featured
)
VALUES
  (
    'Free',
    'free',
    'Para começar e explorar',
    0.00,
    0.00,
    '["5 análises por mês", "Dashboard básico", "Suporte por email", "Acesso à biblioteca"]'::jsonb,
    5,
    1,
    1,
    FALSE
  ),
  (
    'Pro',
    'pro',
    'Para profissionais e empresas em crescimento',
    99.00,
    990.00,
    '["Análises ilimitadas", "Dashboard avançado", "Relatórios personalizados", "Suporte prioritário", "Exportação de dados", "Integrações API"]'::jsonb,
    -1,
    50,
    5,
    TRUE
  ),
  (
    'Enterprise',
    'enterprise',
    'Para grandes empresas e consultorias',
    299.00,
    2990.00,
    '["Tudo do Pro", "White label", "API dedicada", "SLA garantido", "Gerente de conta", "Treinamento personalizado", "Armazenamento ilimitado", "Usuários ilimitados"]'::jsonb,
    -1,
    -1,
    -1,
    FALSE
  )
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- GRANTS
-- =====================================================

GRANT SELECT ON public.subscription_plans TO authenticated;
GRANT SELECT ON public.payment_methods TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.payment_methods TO authenticated;
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT SELECT ON public.payment_transactions TO authenticated;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.subscription_plans IS 'Planos de assinatura disponíveis';
COMMENT ON TABLE public.payment_methods IS 'Métodos de pagamento salvos (apenas tokens)';
COMMENT ON TABLE public.subscriptions IS 'Assinaturas ativas/canceladas dos usuários';
COMMENT ON TABLE public.payment_transactions IS 'Histórico de transações';
COMMENT ON TABLE public.webhook_events IS 'Eventos recebidos via webhooks (audit trail)';

-- =====================================================
-- Verificação final
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Migration aplicada com sucesso!';
  RAISE NOTICE 'Tabelas criadas: subscription_plans, payment_methods, subscriptions, payment_transactions, webhook_events';
  RAISE NOTICE 'Próximo passo: Aplicar migration de functions (20251008000001)';
END $$;
