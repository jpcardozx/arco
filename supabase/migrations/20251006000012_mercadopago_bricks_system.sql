-- =====================================================
-- MERCADO PAGO BRICKS + ORDERS API v2
-- Payment Management System with Checkout Transparente
-- Depends on: 20251006000008_base_functions.sql
-- =====================================================

-- Validate dependencies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') THEN
    RAISE EXCEPTION 'uuid-ossp extension required. Run base_functions migration first.';
  END IF;
END $$;

-- 1. subscription_plans
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Plan info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Pricing
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  currency TEXT DEFAULT 'BRL',
  
  -- Mercado Pago (Preapproval/Subscriptions)
  mercadopago_plan_id TEXT,
  
  -- Stripe (para internacional)
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly TEXT,
  
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

-- 2. payment_methods (PCI compliant - só tokens, nunca dados de cartão)
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Gateway info
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_customer_id TEXT NOT NULL,
  gateway_payment_method_id TEXT NOT NULL,
  
  -- Card info (não-sensível)
  card_brand TEXT,           -- Visa, Mastercard, etc.
  card_last4 TEXT,           -- Últimos 4 dígitos
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

-- 3. subscriptions (recorrência via Preapproval API)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
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

-- 4. payment_transactions (Orders API + Payments)
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relacionamentos
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Gateway IDs
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_transaction_id TEXT UNIQUE NOT NULL,  -- Payment ID
  gateway_order_id TEXT,                         -- Order ID (v2)
  gateway_customer_id TEXT,
  
  -- Valores
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'pending',      -- Aguardando pagamento
    'processing',   -- Em processamento
    'authorized',   -- Autorizado (captura manual pendente)
    'succeeded',    -- Aprovado e capturado
    'failed',       -- Rejeitado
    'refunded',     -- Estornado
    'cancelled'     -- Cancelado
  )),
  
  -- Payment method
  payment_method_type TEXT, -- 'credit_card', 'debit_card', 'pix', 'boleto'
  payment_method_last4 TEXT,
  
  -- Timestamps
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  
  -- Metadata (flexível para dados específicos do gateway)
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. webhook_events (idempotência + audit trail)
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Gateway
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_event_id TEXT UNIQUE NOT NULL,  -- x-request-id do webhook
  
  -- Event data
  event_type TEXT NOT NULL,  -- 'payment', 'merchant_order', etc.
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
-- ÍNDICES PARA PERFORMANCE
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
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Policies: Users só veem seus próprios dados

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

-- Webhooks: apenas service role pode inserir
CREATE POLICY "Service role can manage webhooks"
  ON public.webhook_events
  USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- FUNCTION: Calculate MRR (Monthly Recurring Revenue)
-- =====================================================

CREATE OR REPLACE FUNCTION public.calculate_mrr()
RETURNS DECIMAL AS $$
DECLARE
  total_mrr DECIMAL;
BEGIN
  SELECT COALESCE(SUM(
    CASE 
      WHEN sp.price_monthly IS NOT NULL THEN sp.price_monthly
      WHEN sp.price_yearly IS NOT NULL THEN sp.price_yearly / 12
      ELSE 0
    END
  ), 0)
  INTO total_mrr
  FROM public.subscriptions s
  JOIN public.subscription_plans sp ON s.plan_id = sp.id
  WHERE s.status = 'active';
  
  RETURN total_mrr;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Cleanup old webhook events (7 days)
-- =====================================================

CREATE OR REPLACE FUNCTION public.cleanup_old_webhook_events()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.webhook_events
  WHERE processed = TRUE
    AND created_at < NOW() - INTERVAL '7 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SEED DATA: Planos iniciais
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
-- GRANTS (permissões para authenticated users)
-- =====================================================

GRANT SELECT ON public.subscription_plans TO authenticated;
GRANT SELECT ON public.payment_methods TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.payment_methods TO authenticated;
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT SELECT ON public.payment_transactions TO authenticated;

-- =====================================================
-- COMMENTS (documentação no banco)
-- =====================================================

COMMENT ON TABLE public.subscription_plans IS 'Planos de assinatura disponíveis';
COMMENT ON TABLE public.payment_methods IS 'Métodos de pagamento salvos (apenas tokens, nunca dados de cartão)';
COMMENT ON TABLE public.subscriptions IS 'Assinaturas ativas/canceladas dos usuários';
COMMENT ON TABLE public.payment_transactions IS 'Histórico de transações via Mercado Pago/Stripe';
COMMENT ON TABLE public.webhook_events IS 'Eventos recebidos via webhooks (audit trail + idempotência)';

COMMENT ON COLUMN public.payment_transactions.status IS 'pending|processing|authorized|succeeded|failed|refunded|cancelled';
COMMENT ON COLUMN public.payment_transactions.gateway_order_id IS 'Order ID do Mercado Pago (Orders API v2)';
COMMENT ON COLUMN public.webhook_events.gateway_event_id IS 'x-request-id do webhook (para idempotência)';
