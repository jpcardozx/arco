-- =====================================================
-- SAFE MIGRATION: Mercado Pago Webhook Processing Functions
-- Criado: 2025-10-08
-- Descrição: Funções para processar webhooks e gerenciar subscriptions
-- Verifica se tabelas existem antes de criar functions
-- =====================================================

-- Verificar dependências
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'subscriptions'
  ) THEN
    RAISE EXCEPTION 'Tabela subscriptions não existe. Execute migration 20251008000000 primeiro.';
  END IF;
  
  RAISE NOTICE '✅ Dependências verificadas. Criando functions...';
END $$;

-- =====================================================
-- FUNCTION: Create or Update Subscription
-- =====================================================

CREATE OR REPLACE FUNCTION public.upsert_subscription(
  p_user_id UUID,
  p_plan_slug TEXT,
  p_gateway TEXT,
  p_gateway_subscription_id TEXT,
  p_status TEXT DEFAULT 'incomplete',
  p_current_period_start TIMESTAMPTZ DEFAULT NOW(),
  p_current_period_end TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
)
RETURNS UUID AS $$
DECLARE
  v_subscription_id UUID;
  v_plan_id UUID;
BEGIN
  -- Buscar plan_id pelo slug
  SELECT id INTO v_plan_id
  FROM public.subscription_plans
  WHERE slug = p_plan_slug AND is_active = TRUE;
  
  IF v_plan_id IS NULL THEN
    RAISE EXCEPTION 'Plan with slug % not found or inactive', p_plan_slug;
  END IF;
  
  -- Inserir ou atualizar subscription
  INSERT INTO public.subscriptions (
    user_id,
    plan_id,
    gateway,
    gateway_subscription_id,
    status,
    current_period_start,
    current_period_end
  )
  VALUES (
    p_user_id,
    v_plan_id,
    p_gateway,
    p_gateway_subscription_id,
    p_status,
    p_current_period_start,
    p_current_period_end
  )
  ON CONFLICT (gateway_subscription_id) 
  DO UPDATE SET
    status = EXCLUDED.status,
    current_period_start = EXCLUDED.current_period_start,
    current_period_end = EXCLUDED.current_period_end,
    updated_at = NOW()
  RETURNING id INTO v_subscription_id;
  
  RETURN v_subscription_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Activate Subscription (on payment success)
-- =====================================================

CREATE OR REPLACE FUNCTION public.activate_subscription(
  p_subscription_id UUID,
  p_payment_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_row_count INTEGER;
BEGIN
  -- Atualizar status da subscription
  UPDATE public.subscriptions
  SET 
    status = 'active',
    updated_at = NOW()
  WHERE id = p_subscription_id
    AND status IN ('incomplete', 'past_due');
  
  GET DIAGNOSTICS v_row_count = ROW_COUNT;
  
  IF v_row_count > 0 THEN
    -- Log: subscription ativada
    RAISE NOTICE 'Subscription % activated with payment %', p_subscription_id, p_payment_id;
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Cancel Subscription
-- =====================================================

CREATE OR REPLACE FUNCTION public.cancel_subscription(
  p_subscription_id UUID,
  p_cancel_at_period_end BOOLEAN DEFAULT FALSE
)
RETURNS BOOLEAN AS $$
DECLARE
  v_row_count INTEGER;
BEGIN
  IF p_cancel_at_period_end THEN
    -- Cancelar no final do período
    UPDATE public.subscriptions
    SET 
      cancel_at_period_end = TRUE,
      updated_at = NOW()
    WHERE id = p_subscription_id;
  ELSE
    -- Cancelar imediatamente
    UPDATE public.subscriptions
    SET 
      status = 'cancelled',
      cancelled_at = NOW(),
      updated_at = NOW()
    WHERE id = p_subscription_id;
  END IF;
  
  GET DIAGNOSTICS v_row_count = ROW_COUNT;
  
  RETURN (v_row_count > 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Process Webhook Event (Idempotent)
-- =====================================================

CREATE OR REPLACE FUNCTION public.process_webhook_event(
  p_gateway TEXT,
  p_gateway_event_id TEXT,
  p_event_type TEXT,
  p_payload JSONB
)
RETURNS JSONB AS $$
DECLARE
  v_webhook_id UUID;
  v_payment_id TEXT;
  v_subscription_id UUID;
  v_user_id UUID;
  v_status TEXT;
  v_amount DECIMAL;
  v_result JSONB;
BEGIN
  -- 1. Verificar se webhook já foi processado (idempotência)
  SELECT id INTO v_webhook_id
  FROM public.webhook_events
  WHERE gateway_event_id = p_gateway_event_id;
  
  IF FOUND THEN
    v_result := jsonb_build_object(
      'success', TRUE,
      'message', 'Webhook already processed',
      'webhook_id', v_webhook_id
    );
    RETURN v_result;
  END IF;
  
  -- 2. Inserir webhook event
  INSERT INTO public.webhook_events (
    gateway,
    gateway_event_id,
    event_type,
    payload,
    processed
  )
  VALUES (
    p_gateway,
    p_gateway_event_id,
    p_event_type,
    p_payload,
    FALSE
  )
  RETURNING id INTO v_webhook_id;
  
  -- 3. Processar evento baseado no tipo
  IF p_event_type = 'payment' THEN
    -- Extrair dados do pagamento
    v_payment_id := p_payload->>'id';
    v_status := p_payload->>'status';
    v_amount := (p_payload->>'transaction_amount')::DECIMAL;
    v_user_id := (p_payload->'metadata'->>'user_id')::UUID;
    v_subscription_id := (p_payload->'metadata'->>'subscription_id')::UUID;
    
    -- Inserir/atualizar transação
    INSERT INTO public.payment_transactions (
      user_id,
      subscription_id,
      gateway,
      gateway_transaction_id,
      gateway_order_id,
      amount,
      status,
      payment_method_type,
      paid_at,
      metadata
    )
    VALUES (
      v_user_id,
      v_subscription_id,
      p_gateway,
      v_payment_id,
      p_payload->>'order_id',
      v_amount,
      CASE 
        WHEN v_status = 'approved' THEN 'succeeded'
        WHEN v_status = 'pending' THEN 'pending'
        WHEN v_status IN ('rejected', 'cancelled') THEN 'failed'
        ELSE v_status
      END,
      p_payload->>'payment_method_id',
      CASE WHEN v_status = 'approved' THEN NOW() ELSE NULL END,
      p_payload
    )
    ON CONFLICT (gateway_transaction_id) 
    DO UPDATE SET
      status = EXCLUDED.status,
      paid_at = EXCLUDED.paid_at,
      updated_at = NOW();
    
    -- Se pagamento aprovado, ativar subscription
    IF v_status = 'approved' AND v_subscription_id IS NOT NULL THEN
      PERFORM public.activate_subscription(v_subscription_id, v_payment_id);
    END IF;
    
  END IF;
  
  -- 4. Marcar webhook como processado
  UPDATE public.webhook_events
  SET 
    processed = TRUE,
    processed_at = NOW()
  WHERE id = v_webhook_id;
  
  -- 5. Retornar resultado
  v_result := jsonb_build_object(
    'success', TRUE,
    'webhook_id', v_webhook_id,
    'event_type', p_event_type,
    'processed_at', NOW()
  );
  
  RETURN v_result;
  
EXCEPTION WHEN OTHERS THEN
  -- Log erro no webhook event
  UPDATE public.webhook_events
  SET 
    error_message = SQLERRM,
    retry_count = retry_count + 1
  WHERE id = v_webhook_id;
  
  -- Retornar erro
  v_result := jsonb_build_object(
    'success', FALSE,
    'error', SQLERRM,
    'webhook_id', v_webhook_id
  );
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get User Active Subscription
-- =====================================================

CREATE OR REPLACE FUNCTION public.get_user_active_subscription(
  p_user_id UUID
)
RETURNS TABLE (
  subscription_id UUID,
  plan_name TEXT,
  plan_slug TEXT,
  status TEXT,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    sp.name,
    sp.slug,
    s.status,
    s.current_period_end,
    s.cancel_at_period_end
  FROM public.subscriptions s
  JOIN public.subscription_plans sp ON s.plan_id = sp.id
  WHERE s.user_id = p_user_id
    AND s.status = 'active'
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get User Payment History
-- =====================================================

CREATE OR REPLACE FUNCTION public.get_user_payment_history(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  transaction_id UUID,
  amount DECIMAL,
  currency TEXT,
  status TEXT,
  payment_method_type TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pt.id,
    pt.amount,
    pt.currency,
    pt.status,
    pt.payment_method_type,
    pt.paid_at,
    pt.created_at
  FROM public.payment_transactions pt
  WHERE pt.user_id = p_user_id
  ORDER BY pt.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Calculate Revenue Metrics
-- =====================================================

CREATE OR REPLACE FUNCTION public.calculate_revenue_metrics(
  p_start_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '30 days',
  p_end_date TIMESTAMPTZ DEFAULT NOW()
)
RETURNS JSONB AS $$
DECLARE
  v_total_revenue DECIMAL;
  v_successful_payments INTEGER;
  v_failed_payments INTEGER;
  v_pending_payments INTEGER;
  v_mrr DECIMAL;
  v_active_subscriptions INTEGER;
BEGIN
  -- Total revenue (succeeded)
  SELECT COALESCE(SUM(amount), 0), COUNT(*)
  INTO v_total_revenue, v_successful_payments
  FROM public.payment_transactions
  WHERE status = 'succeeded'
    AND paid_at >= p_start_date
    AND paid_at <= p_end_date;
  
  -- Failed payments
  SELECT COUNT(*)
  INTO v_failed_payments
  FROM public.payment_transactions
  WHERE status = 'failed'
    AND created_at >= p_start_date
    AND created_at <= p_end_date;
  
  -- Pending payments
  SELECT COUNT(*)
  INTO v_pending_payments
  FROM public.payment_transactions
  WHERE status = 'pending'
    AND created_at >= p_start_date
    AND created_at <= p_end_date;
  
  -- MRR (Monthly Recurring Revenue)
  SELECT public.calculate_mrr() INTO v_mrr;
  
  -- Active subscriptions
  SELECT COUNT(*)
  INTO v_active_subscriptions
  FROM public.subscriptions
  WHERE status = 'active';
  
  RETURN jsonb_build_object(
    'period', jsonb_build_object(
      'start', p_start_date,
      'end', p_end_date
    ),
    'revenue', jsonb_build_object(
      'total', v_total_revenue,
      'mrr', v_mrr
    ),
    'payments', jsonb_build_object(
      'successful', v_successful_payments,
      'failed', v_failed_payments,
      'pending', v_pending_payments
    ),
    'subscriptions', jsonb_build_object(
      'active', v_active_subscriptions
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- GRANTS (permissões)
-- =====================================================

GRANT EXECUTE ON FUNCTION public.get_user_active_subscription(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_payment_history(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.cancel_subscription(UUID, BOOLEAN) TO authenticated;

-- Service role only (webhook processing)
GRANT EXECUTE ON FUNCTION public.upsert_subscription(UUID, TEXT, TEXT, TEXT, TEXT, TIMESTAMPTZ, TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION public.activate_subscription(UUID, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.process_webhook_event(TEXT, TEXT, TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.calculate_revenue_metrics(TIMESTAMPTZ, TIMESTAMPTZ) TO service_role;

-- =====================================================
-- COMMENTS (documentação)
-- =====================================================

COMMENT ON FUNCTION public.upsert_subscription IS 'Cria ou atualiza subscription (idempotente)';
COMMENT ON FUNCTION public.activate_subscription IS 'Ativa subscription após pagamento aprovado';
COMMENT ON FUNCTION public.cancel_subscription IS 'Cancela subscription (imediato ou no fim do período)';
COMMENT ON FUNCTION public.process_webhook_event IS 'Processa webhook event (idempotente) e atualiza transactions/subscriptions';
COMMENT ON FUNCTION public.get_user_active_subscription IS 'Retorna subscription ativa do usuário';
COMMENT ON FUNCTION public.get_user_payment_history IS 'Retorna histórico de pagamentos do usuário';
COMMENT ON FUNCTION public.calculate_revenue_metrics IS 'Calcula métricas de receita (total, MRR, conversões)';

