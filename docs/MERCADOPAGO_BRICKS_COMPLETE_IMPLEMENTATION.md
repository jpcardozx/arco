# 🎯 MERCADO PAGO BRICKS - IMPLEMENTAÇÃO COMPLETA V3

**Data:** 08/10/2025  
**Baseado em:** Documentação oficial dos 3 Bricks principais  
**Objetivo:** Frontend com todos os Bricks + Backend Supabase + Preparação N8N

---

## 📚 ANÁLISE DOS 3 BRICKS OFICIAIS

### 1. Payment Brick 💳
- **O que é:** Formulário completo de pagamento
- **Métodos disponíveis:** Cartão crédito, débito, Pix, Boleto, Conta Mercado Pago
- **UX:** Design pronto otimizado pelo MP (não customizar muito!)
- **Uso:** Página principal de checkout

### 2. Status Screen Brick ✅
- **O que é:** Tela de confirmação/status do pagamento
- **Features:** 
  - Resumo da compra
  - Status do pagamento (aprovado/pendente/recusado)
  - Detalhes de boleto/pix
  - Suporte a 3DS 2.0
- **UX:** Design pronto otimizado
- **Uso:** Páginas success/pending/error

### 3. Wallet Brick 🔵
- **O que é:** Botão "Pagar com Mercado Pago"
- **Features:**
  - Pagamento rápido com conta MP
  - Ambiente seguro
  - Alta taxa de aprovação
- **UX:** Botão com branding MP
- **Uso:** Como opção rápida no checkout OU na pricing page

---

## 🏗️ ARQUITETURA COMPLETA

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                     │
├─────────────────────────────────────────────────────────────┤
│  Pricing Page                                               │
│  └─ Wallet Brick (pagamento rápido) ─┐                     │
│  └─ Botão "Ver detalhes" ────────────┼─> /checkout/[plan]  │
│                                       │                      │
│  Checkout Page                        │                      │
│  └─ Payment Brick (formulário full) ─┘                     │
│                                                              │
│  Status Pages                                               │
│  └─ Success: Status Screen Brick (aprovado)                │
│  └─ Pending: Status Screen Brick (pendente)                │
│  └─ Error: Status Screen Brick (recusado)                  │
└─────────────────────────────────────────────────────────────┘
                            ↕ (API Routes)
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Supabase)                       │
├─────────────────────────────────────────────────────────────┤
│  API Routes (Next.js)                                       │
│  ├─ POST /api/checkout/create-preference                    │
│  ├─ POST /api/checkout/process-payment                      │
│  └─ POST /api/webhooks/mercadopago                          │
│                                                              │
│  Postgres Functions (Supabase)                              │
│  ├─ create_subscription(user_id, plan_id, payment_data)    │
│  ├─ process_webhook(event_type, payment_data)              │
│  ├─ activate_subscription(subscription_id)                  │
│  └─ cancel_subscription(subscription_id, reason)            │
│                                                              │
│  Row Level Security (RLS)                                   │
│  ├─ users: auth.uid() = id                                  │
│  ├─ subscriptions: auth.uid() = user_id                     │
│  └─ payments: auth.uid() = user_id                          │
│                                                              │
│  Tables                                                      │
│  ├─ subscriptions (user_id, plan_id, status, ...)          │
│  ├─ payments (subscription_id, gateway_payment_id, ...)    │
│  ├─ webhook_events (event_type, payload, processed)        │
│  └─ audit_logs (entity, action, user_id, changes)          │
└─────────────────────────────────────────────────────────────┘
                            ↕ (Webhooks)
┌─────────────────────────────────────────────────────────────┐
│                      MERCADO PAGO                           │
├─────────────────────────────────────────────────────────────┤
│  Payment API → Processar pagamentos                         │
│  Preferences API → Criar preferências                       │
│  Webhooks → Notificar status                                │
└─────────────────────────────────────────────────────────────┘
                            ↕ (HTTP Webhooks)
┌─────────────────────────────────────────────────────────────┐
│                        N8N (Automação)                      │
├─────────────────────────────────────────────────────────────┤
│  Workflows                                                   │
│  ├─ payment.approved → Email + CRM + Analytics              │
│  ├─ subscription.created → Onboarding email                 │
│  ├─ subscription.cancelled → Feedback survey                │
│  └─ payment.failed → Retry notification                     │
│                                                              │
│  Endpoints (Receive webhooks)                               │
│  └─ POST https://n8n.arco.com/webhook/payment-events       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 ESTRUTURA DE PASTAS

```
src/
├── providers/
│   └── MercadoPagoProvider.tsx         # Provider SDK único
│
├── components/
│   ├── payment/
│   │   ├── PaymentBrick.tsx            # Brick de pagamento
│   │   ├── StatusScreenBrick.tsx       # Brick de status
│   │   ├── WalletBrick.tsx             # Brick botão MP
│   │   ├── CheckoutSummary.tsx         # Resumo do pedido
│   │   └── index.ts
│   │
│   └── sections/figma/pricing/
│       └── PricingTable.tsx            # (já existe, adicionar Wallet Brick)
│
├── app/
│   ├── pricing/
│   │   └── page.tsx                    # Pricing com Wallet Brick
│   │
│   ├── checkout/
│   │   ├── [planId]/
│   │   │   └── page.tsx                # Checkout com Payment Brick
│   │   ├── success/
│   │   │   └── page.tsx                # Success com Status Screen Brick
│   │   ├── pending/
│   │   │   └── page.tsx                # Pending com Status Screen Brick
│   │   └── error/
│   │       └── page.tsx                # Error com Status Screen Brick
│   │
│   └── api/
│       ├── checkout/
│       │   ├── create-preference/
│       │   │   └── route.ts            # Criar preferência MP
│       │   └── process-payment/
│       │       └── route.ts            # Processar pagamento
│       │
│       ├── webhooks/
│       │   ├── mercadopago/
│       │   │   └── route.ts            # Webhook MP
│       │   └── n8n/
│       │       └── route.ts            # Trigger N8N workflows
│       │
│       └── subscription/
│           ├── [id]/
│           │   └── route.ts            # GET subscription
│           ├── cancel/
│           │   └── route.ts            # POST cancel
│           └── upgrade/
│               └── route.ts            # POST upgrade
│
├── lib/
│   ├── payments/
│   │   └── mercadopago/
│   │       ├── client.ts               # (já existe)
│   │       ├── orders.ts               # (já existe)
│   │       ├── webhooks.ts             # (já existe)
│   │       └── bricks-config.ts        # Config dos Bricks
│   │
│   ├── supabase/
│   │   ├── client.ts                   # (já existe)
│   │   ├── functions/                  # Postgres Functions
│   │   │   ├── subscriptions.ts        # Functions de assinatura
│   │   │   ├── payments.ts             # Functions de pagamento
│   │   │   └── webhooks.ts             # Functions de webhook
│   │   └── rls/                        # RLS Policies
│   │       ├── subscriptions.sql
│   │       ├── payments.sql
│   │       └── audit_logs.sql
│   │
│   ├── n8n/
│   │   ├── client.ts                   # Cliente HTTP N8N
│   │   ├── events.ts                   # Tipos de eventos
│   │   └── workflows.ts                # Trigger workflows
│   │
│   ├── logger.ts                       # Winston logger
│   └── redis.ts                        # Upstash Redis (idempotency)
│
├── hooks/
│   ├── useCheckout.ts                  # Hook checkout logic
│   ├── useSubscription.ts              # Hook subscription data
│   └── usePaymentStatus.ts             # Hook payment status
│
└── types/
    ├── database.types.ts               # (já existe)
    ├── mercadopago.types.ts            # Tipos MP
    └── n8n.types.ts                    # Tipos N8N
```

---

## 💻 IMPLEMENTAÇÃO FRONTEND

### 1. Provider MercadoPago (ÚNICO)

```typescript
// src/providers/MercadoPagoProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

interface MercadoPagoProviderProps {
  children: React.ReactNode;
}

export function MercadoPagoProvider({ children }: MercadoPagoProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Inicializar SDK apenas uma vez
    if (!isInitialized) {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, {
        locale: 'pt-BR',
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
}
```

### 2. Payment Brick (Formulário Completo)

```typescript
// src/components/payment/PaymentBrick.tsx
'use client';

import { Payment } from '@mercadopago/sdk-react';
import { useState } from 'react';

interface PaymentBrickProps {
  preferenceId: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

export function PaymentBrick({
  preferenceId,
  amount,
  onSuccess,
  onError,
}: PaymentBrickProps) {
  const [loading, setLoading] = useState(false);

  const initialization = {
    amount,
    preferenceId,
    payer: {
      email: '', // Será preenchido pelo usuário
    },
  };

  const customization = {
    visual: {
      style: {
        theme: 'default', // ou 'dark'
      },
    },
    paymentMethods: {
      creditCard: 'all', // Todos os cartões de crédito
      debitCard: 'all', // Débito virtual Caixa
      ticket: 'all', // Boleto
      mercadoPago: 'all', // Conta Mercado Pago
      atm: 'all', // Pix
    },
  };

  const onSubmit = async ({
    selectedPaymentMethod,
    formData,
  }: any) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch('/api/checkout/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          selectedPaymentMethod,
          preferenceId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          
          if (data.error) {
            onError(data.error);
            reject();
          } else {
            onSuccess(data.paymentId);
            resolve(data);
          }
        })
        .catch((error) => {
          setLoading(false);
          onError(error);
          reject();
        });
    });
  };

  const onReady = async () => {
    console.log('Payment Brick is ready');
  };

  const onErrorBrick = async (error: any) => {
    console.error('Payment Brick error:', error);
    onError(error);
  };

  return (
    <div className="payment-brick-container">
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="loader">Processando pagamento...</div>
        </div>
      )}
      
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onErrorBrick}
      />
    </div>
  );
}
```

### 3. Status Screen Brick (Confirmação)

```typescript
// src/components/payment/StatusScreenBrick.tsx
'use client';

import { StatusScreen } from '@mercadopago/sdk-react';

interface StatusScreenBrickProps {
  paymentId: string;
}

export function StatusScreenBrick({ paymentId }: StatusScreenBrickProps) {
  const initialization = {
    paymentId,
  };

  const customization = {
    visual: {
      hideStatusDetails: false,
      hideTransactionDate: false,
      style: {
        theme: 'default', // ou 'dark'
      },
    },
    backUrls: {
      error: '/checkout/error',
      return: '/dashboard',
    },
  };

  const onReady = async () => {
    console.log('Status Screen Brick is ready');
  };

  const onError = async (error: any) => {
    console.error('Status Screen Brick error:', error);
  };

  return (
    <div className="status-screen-brick-container">
      <StatusScreen
        initialization={initialization}
        customization={customization}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
}
```

### 4. Wallet Brick (Botão Rápido)

```typescript
// src/components/payment/WalletBrick.tsx
'use client';

import { Wallet } from '@mercadopago/sdk-react';

interface WalletBrickProps {
  preferenceId: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function WalletBrick({
  preferenceId,
  onSuccess,
  onError,
}: WalletBrickProps) {
  const initialization = {
    preferenceId,
    redirectMode: 'modal', // ou 'self' para redirecionar na mesma página
  };

  const customization = {
    texts: {
      action: 'pay', // ou 'buy'
      valueProp: 'security_safety', // Mensagem de segurança
    },
    visual: {
      buttonBackground: 'default', // ou 'black', 'blue', 'white'
      borderRadius: '6px',
    },
  };

  const onReadyWallet = async () => {
    console.log('Wallet Brick is ready');
  };

  const onErrorWallet = async (error: any) => {
    console.error('Wallet Brick error:', error);
    onError?.(error);
  };

  const onSubmitWallet = async () => {
    console.log('Payment submitted via Wallet Brick');
    onSuccess?.();
  };

  return (
    <div className="wallet-brick-container">
      <Wallet
        initialization={initialization}
        customization={customization}
        onReady={onReadyWallet}
        onSubmit={onSubmitWallet}
        onError={onErrorWallet}
      />
    </div>
  );
}
```

### 5. Pricing Page (Com Wallet Brick)

```typescript
// src/app/pricing/page.tsx (atualizar PricingTable.tsx)
import { WalletBrick } from '@/components/payment/WalletBrick';
import { useState } from 'react';

export function PricingCard({ plan }: { plan: Plan }) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [showWallet, setShowWallet] = useState(false);

  const handleQuickPayment = async () => {
    // Criar preferência
    const response = await fetch('/api/checkout/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: plan.id }),
    });

    const { preferenceId } = await response.json();
    setPreferenceId(preferenceId);
    setShowWallet(true);
  };

  return (
    <div className="pricing-card">
      <h3>{plan.name}</h3>
      <p className="price">R$ {plan.price}</p>

      {/* Botão de pagamento rápido */}
      {showWallet && preferenceId ? (
        <WalletBrick
          preferenceId={preferenceId}
          onSuccess={() => router.push('/checkout/success')}
          onError={(error) => console.error(error)}
        />
      ) : (
        <button onClick={handleQuickPayment}>
          Pagar com Mercado Pago
        </button>
      )}

      {/* Botão para ver detalhes */}
      <Link href={`/checkout/${plan.id}`}>
        <button variant="outline">Ver mais opções de pagamento</button>
      </Link>
    </div>
  );
}
```

### 6. Checkout Page (Com Payment Brick)

```typescript
// src/app/checkout/[planId]/page.tsx
'use client';

import { PaymentBrick } from '@/components/payment/PaymentBrick';
import { CheckoutSummary } from '@/components/payment/CheckoutSummary';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createPreference() {
      try {
        // Buscar dados do plano
        const planResponse = await fetch(`/api/plans/${params.planId}`);
        const planData = await planResponse.json();
        setPlan(planData);

        // Criar preferência no MP
        const response = await fetch('/api/checkout/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId: params.planId }),
        });

        const { preferenceId } = await response.json();
        setPreferenceId(preferenceId);
      } catch (error) {
        console.error('Error creating preference:', error);
      } finally {
        setLoading(false);
      }
    }

    createPreference();
  }, [params.planId]);

  const handleSuccess = (paymentId: string) => {
    router.push(`/checkout/success?paymentId=${paymentId}`);
  };

  const handleError = (error: any) => {
    router.push(`/checkout/error?reason=${encodeURIComponent(error.message)}`);
  };

  if (loading || !preferenceId || !plan) {
    return <div>Carregando checkout...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resumo do pedido */}
        <CheckoutSummary plan={plan} />

        {/* Formulário de pagamento */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Dados de Pagamento</h2>
          <PaymentBrick
            preferenceId={preferenceId}
            amount={plan.price}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
}
```

### 7. Success Page (Com Status Screen Brick)

```typescript
// src/app/checkout/success/page.tsx
'use client';

import { StatusScreenBrick } from '@/components/payment/StatusScreenBrick';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');

  if (!paymentId) {
    return <div>Pagamento não encontrado</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <StatusScreenBrick paymentId={paymentId} />
    </div>
  );
}
```

---

## 🗄️ BACKEND SUPABASE

### 1. Migrations (Criar tabelas)

```sql
-- supabase/migrations/20250108_payment_system.sql

-- Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de assinaturas
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'cancelled', 'pending')),
  
  -- Dados do Mercado Pago
  gateway_subscription_id TEXT,
  preference_id TEXT,
  
  -- Valores
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  
  -- Datas
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Metadados
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Índices
  CONSTRAINT unique_user_active_subscription UNIQUE (user_id, status) WHERE status = 'active'
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_gateway_subscription_id ON subscriptions(gateway_subscription_id);

-- Tabela de pagamentos
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  
  -- Dados do Mercado Pago
  gateway_payment_id TEXT NOT NULL UNIQUE,
  preference_id TEXT,
  payment_method TEXT,
  payment_type TEXT,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'authorized', 'in_process', 'in_mediation', 'rejected', 'cancelled', 'refunded', 'charged_back')),
  status_detail TEXT,
  
  -- Valores
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  
  -- Payer
  payer_email TEXT,
  payer_identification JSONB,
  
  -- Datas
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Metadados
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_subscription_id ON payments(subscription_id);
CREATE INDEX idx_payments_gateway_payment_id ON payments(gateway_payment_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Tabela de webhook events (já existe, mas vamos melhorar)
ALTER TABLE webhook_events ADD COLUMN IF NOT EXISTS payment_id UUID REFERENCES payments(id) ON DELETE SET NULL;
ALTER TABLE webhook_events ADD COLUMN IF NOT EXISTS subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL;

-- Tabela de audit logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL, -- 'subscription', 'payment', 'user'
  entity_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'created', 'updated', 'deleted', 'status_changed'
  
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  changes JSONB, -- Antes e depois
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. RLS Policies

```sql
-- supabase/migrations/20250108_rls_policies.sql

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Audit logs policies (read-only for users)
CREATE POLICY "Users can view their own audit logs"
  ON audit_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do everything (bypass RLS)
-- Não precisa criar policies para service_role, ele já tem acesso total
```

### 3. Postgres Functions

```sql
-- supabase/migrations/20250108_functions.sql

-- Function: Criar assinatura
CREATE OR REPLACE FUNCTION create_subscription(
  p_user_id UUID,
  p_plan_id TEXT,
  p_amount DECIMAL,
  p_preference_id TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER -- Executa como service_role
AS $$
DECLARE
  v_subscription_id UUID;
BEGIN
  -- Cancelar assinatura ativa anterior (se houver)
  UPDATE subscriptions
  SET status = 'cancelled',
      cancelled_at = NOW()
  WHERE user_id = p_user_id
    AND status = 'active';

  -- Criar nova assinatura
  INSERT INTO subscriptions (
    user_id,
    plan_id,
    status,
    amount,
    preference_id,
    metadata
  ) VALUES (
    p_user_id,
    p_plan_id,
    'pending',
    p_amount,
    p_preference_id,
    p_metadata
  )
  RETURNING id INTO v_subscription_id;

  -- Audit log
  INSERT INTO audit_logs (entity_type, entity_id, action, user_id, metadata)
  VALUES ('subscription', v_subscription_id, 'created', p_user_id, p_metadata);

  RETURN v_subscription_id;
END;
$$;

-- Function: Ativar assinatura (chamado pelo webhook)
CREATE OR REPLACE FUNCTION activate_subscription(
  p_subscription_id UUID,
  p_gateway_subscription_id TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE subscriptions
  SET status = 'active',
      gateway_subscription_id = COALESCE(p_gateway_subscription_id, gateway_subscription_id),
      starts_at = NOW(),
      ends_at = NOW() + INTERVAL '1 month' -- ou receber como parâmetro
  WHERE id = p_subscription_id;

  -- Audit log
  INSERT INTO audit_logs (entity_type, entity_id, action, metadata)
  VALUES ('subscription', p_subscription_id, 'activated', jsonb_build_object('gateway_subscription_id', p_gateway_subscription_id));
END;
$$;

-- Function: Cancelar assinatura
CREATE OR REPLACE FUNCTION cancel_subscription(
  p_subscription_id UUID,
  p_reason TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Buscar user_id
  SELECT user_id INTO v_user_id
  FROM subscriptions
  WHERE id = p_subscription_id;

  -- Atualizar status
  UPDATE subscriptions
  SET status = 'cancelled',
      cancelled_at = NOW(),
      metadata = metadata || jsonb_build_object('cancellation_reason', p_reason)
  WHERE id = p_subscription_id;

  -- Audit log
  INSERT INTO audit_logs (entity_type, entity_id, action, user_id, metadata)
  VALUES ('subscription', p_subscription_id, 'cancelled', v_user_id, jsonb_build_object('reason', p_reason));
END;
$$;

-- Function: Processar webhook
CREATE OR REPLACE FUNCTION process_webhook(
  p_event_type TEXT,
  p_gateway_payment_id TEXT,
  p_payment_data JSONB,
  p_webhook_event_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_payment_id UUID;
  v_subscription_id UUID;
  v_user_id UUID;
BEGIN
  -- Buscar ou criar pagamento
  INSERT INTO payments (
    gateway_payment_id,
    status,
    status_detail,
    amount,
    currency,
    payment_method,
    payment_type,
    payer_email,
    metadata
  )
  VALUES (
    p_gateway_payment_id,
    (p_payment_data->>'status')::TEXT,
    (p_payment_data->>'status_detail')::TEXT,
    (p_payment_data->>'transaction_amount')::DECIMAL,
    (p_payment_data->>'currency_id')::TEXT,
    (p_payment_data->'payment_method_id')::TEXT,
    (p_payment_data->>'payment_type_id')::TEXT,
    (p_payment_data->'payer'->>'email')::TEXT,
    p_payment_data
  )
  ON CONFLICT (gateway_payment_id) DO UPDATE
  SET status = EXCLUDED.status,
      status_detail = EXCLUDED.status_detail,
      updated_at = NOW()
  RETURNING id, user_id INTO v_payment_id, v_user_id;

  -- Atualizar webhook event
  UPDATE webhook_events
  SET payment_id = v_payment_id,
      processed = TRUE,
      processed_at = NOW()
  WHERE id = p_webhook_event_id;

  -- Se pagamento aprovado, ativar assinatura
  IF (p_payment_data->>'status')::TEXT = 'approved' THEN
    -- Buscar subscription pelo preference_id
    SELECT id INTO v_subscription_id
    FROM subscriptions
    WHERE preference_id = (p_payment_data->>'external_reference')::TEXT
      AND status = 'pending';

    IF v_subscription_id IS NOT NULL THEN
      PERFORM activate_subscription(v_subscription_id, p_gateway_payment_id);
      
      -- Atualizar payment com subscription_id
      UPDATE payments
      SET subscription_id = v_subscription_id
      WHERE id = v_payment_id;
    END IF;
  END IF;

  -- Audit log
  INSERT INTO audit_logs (entity_type, entity_id, action, metadata)
  VALUES ('payment', v_payment_id, 'webhook_processed', jsonb_build_object('event_type', p_event_type));
END;
$$;
```

### 4. API Routes (Next.js)

```typescript
// src/app/api/checkout/create-preference/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/client';
import { createPreference } from '@/lib/payments/mercadopago/orders';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    // Autenticação
    const supabase = getSupabaseServer();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Buscar dados do plano
    const plans = {
      'essencial': { name: 'Essencial', price: 2497 },
      'profissional': { name: 'Profissional', price: 4997 },
      'empresarial': { name: 'Empresarial', price: 9997 },
    };

    const plan = plans[planId as keyof typeof plans];
    
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Criar preferência no Mercado Pago
    const preference = await createPreference({
      items: [{
        title: `Assinatura ${plan.name}`,
        unit_price: plan.price,
        quantity: 1,
      }],
      payer: {
        email: user.email!,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
      },
      external_reference: user.id, // Para identificar o usuário no webhook
    });

    // Criar assinatura no banco (status: pending)
    const { data, error } = await supabase.rpc('create_subscription', {
      p_user_id: user.id,
      p_plan_id: planId,
      p_amount: plan.price,
      p_preference_id: preference.id,
      p_metadata: { plan_name: plan.name },
    });

    if (error) {
      logger.error('Error creating subscription', { error });
      throw error;
    }

    logger.info('Preference created', {
      userId: user.id,
      planId,
      preferenceId: preference.id,
    });

    return NextResponse.json({
      preferenceId: preference.id,
      subscriptionId: data,
    });

  } catch (error) {
    logger.error('Error in create-preference', { error });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

```typescript
// src/app/api/webhooks/mercadopago/route.ts (atualizar)
import { NextRequest, NextResponse } from 'next/server';
import { validateWebhook, storeWebhookEvent } from '@/lib/payments/mercadopago/webhooks';
import { getSupabaseAdmin } from '@/lib/supabase/client';
import { triggerN8NWorkflow } from '@/lib/n8n/workflows';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    // Validar signature
    const isValid = await validateWebhook(request, body);
    
    if (!isValid) {
      logger.warn('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Armazenar evento
    const supabase = getSupabaseAdmin();
    const { data: webhookEvent } = await storeWebhookEvent(event);

    // Processar webhook usando Postgres Function
    if (event.type === 'payment') {
      await supabase.rpc('process_webhook', {
        p_event_type: event.action,
        p_gateway_payment_id: event.data.id,
        p_payment_data: event.data,
        p_webhook_event_id: webhookEvent.id,
      });

      // Trigger N8N workflow
      await triggerN8NWorkflow('payment-events', {
        eventType: event.action,
        paymentId: event.data.id,
        status: event.data.status,
        amount: event.data.transaction_amount,
        payerEmail: event.data.payer.email,
      });

      logger.info('Webhook processed and N8N triggered', {
        eventType: event.action,
        paymentId: event.data.id,
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    logger.error('Error processing webhook', { error });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 🔗 INTEGRAÇÃO N8N

### 1. Cliente N8N

```typescript
// src/lib/n8n/client.ts
import axios, { AxiosInstance } from 'axios';
import { logger } from '@/lib/logger';

class N8NClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.N8N_WEBHOOK_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async triggerWebhook(workflowName: string, data: any) {
    try {
      const response = await this.client.post(`/${workflowName}`, data);
      
      logger.info('N8N workflow triggered', {
        workflowName,
        status: response.status,
      });

      return response.data;
    } catch (error) {
      logger.error('Error triggering N8N workflow', {
        workflowName,
        error,
      });
      throw error;
    }
  }
}

export const n8nClient = new N8NClient();
```

### 2. Workflows Helper

```typescript
// src/lib/n8n/workflows.ts
import { n8nClient } from './client';
import { logger } from '@/lib/logger';

export async function triggerN8NWorkflow(
  workflowName: string,
  data: any
) {
  try {
    await n8nClient.triggerWebhook(workflowName, {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'arco-backend',
    });
  } catch (error) {
    // Não bloquear o fluxo principal se N8N falhar
    logger.error('N8N workflow trigger failed (non-blocking)', {
      workflowName,
      error,
    });
  }
}

// Workflows disponíveis
export const N8N_WORKFLOWS = {
  PAYMENT_EVENTS: 'payment-events',
  SUBSCRIPTION_EVENTS: 'subscription-events',
  USER_EVENTS: 'user-events',
  EMAIL_NOTIFICATIONS: 'email-notifications',
} as const;
```

### 3. Event Types

```typescript
// src/lib/n8n/events.ts
export type PaymentEvent = {
  eventType: 'payment.created' | 'payment.approved' | 'payment.rejected';
  paymentId: string;
  status: string;
  amount: number;
  payerEmail: string;
  metadata?: Record<string, any>;
};

export type SubscriptionEvent = {
  eventType: 'subscription.created' | 'subscription.activated' | 'subscription.cancelled';
  subscriptionId: string;
  userId: string;
  planId: string;
  status: string;
  metadata?: Record<string, any>;
};

export type UserEvent = {
  eventType: 'user.registered' | 'user.logged_in' | 'user.updated';
  userId: string;
  email: string;
  metadata?: Record<string, any>;
};
```

### 4. Exemplos de Workflows N8N

```json
{
  "name": "Payment Events - Email & CRM",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "payment-events",
        "httpMethod": "POST",
        "responseMode": "onReceived"
      }
    },
    {
      "name": "Filter: Payment Approved",
      "type": "n8n-nodes-base.filter",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$json.eventType}}",
              "operation": "equals",
              "value2": "payment.approved"
            }
          ]
        }
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "fromEmail": "pagamentos@arco.com",
        "toEmail": "={{$json.payerEmail}}",
        "subject": "Pagamento Aprovado! 🎉",
        "emailType": "html",
        "message": "<h1>Seu pagamento foi aprovado!</h1><p>ID: {{$json.paymentId}}</p>"
      }
    },
    {
      "name": "Update CRM (HubSpot/Pipedrive)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://api.pipedrive.com/v1/deals",
        "method": "POST",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "pipedriveApi",
        "jsonParameters": true,
        "options": {},
        "bodyParametersJson": "={{JSON.stringify({ title: 'Pagamento Aprovado', person_id: $json.customerId, value: $json.amount })}}"
      }
    },
    {
      "name": "Track in Analytics",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://api.mixpanel.com/track",
        "method": "POST",
        "bodyParametersJson": "={{JSON.stringify({ event: 'Payment Approved', properties: { paymentId: $json.paymentId, amount: $json.amount } })}}"
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{ "node": "Filter: Payment Approved" }]]
    },
    "Filter: Payment Approved": {
      "main": [
        [
          { "node": "Send Email" },
          { "node": "Update CRM (HubSpot/Pipedrive)" },
          { "node": "Track in Analytics" }
        ]
      ]
    }
  }
}
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Frontend (15h)

- [ ] **Provider MercadoPago** (1h)
  - [ ] Criar MercadoPagoProvider.tsx
  - [ ] Adicionar ao layout root
  - [ ] Testar inicialização SDK

- [ ] **Payment Brick** (3h)
  - [ ] Criar PaymentBrick.tsx
  - [ ] Configurar todos os métodos de pagamento
  - [ ] Implementar callbacks (onSubmit, onError, onReady)
  - [ ] Adicionar loading states

- [ ] **Status Screen Brick** (2h)
  - [ ] Criar StatusScreenBrick.tsx
  - [ ] Configurar customização visual
  - [ ] Implementar páginas success/pending/error

- [ ] **Wallet Brick** (2h)
  - [ ] Criar WalletBrick.tsx
  - [ ] Integrar na pricing page
  - [ ] Configurar modal mode

- [ ] **Checkout Flow** (4h)
  - [ ] Página /checkout/[planId]
  - [ ] CheckoutSummary component
  - [ ] Integração com API routes
  - [ ] Navegação entre páginas

- [ ] **Testing** (3h)
  - [ ] Testar todos os métodos de pagamento
  - [ ] Testar fluxos success/error/pending
  - [ ] Testar Wallet Brick
  - [ ] Validar responsividade

### Backend Supabase (12h)

- [ ] **Migrations** (3h)
  - [ ] Criar tabelas (subscriptions, payments, audit_logs)
  - [ ] Criar índices
  - [ ] Criar triggers

- [ ] **RLS Policies** (2h)
  - [ ] Policies para subscriptions
  - [ ] Policies para payments
  - [ ] Policies para audit_logs
  - [ ] Testar acesso de usuários

- [ ] **Postgres Functions** (4h)
  - [ ] create_subscription()
  - [ ] activate_subscription()
  - [ ] cancel_subscription()
  - [ ] process_webhook()
  - [ ] Testar todas as functions

- [ ] **API Routes** (3h)
  - [ ] POST /api/checkout/create-preference
  - [ ] POST /api/checkout/process-payment
  - [ ] POST /api/webhooks/mercadopago (atualizar)
  - [ ] GET /api/subscription/[id]
  - [ ] POST /api/subscription/cancel

### N8N Integration (6h)

- [ ] **Setup N8N** (2h)
  - [ ] Deploy N8N (Docker/Cloud)
  - [ ] Configurar webhook endpoints
  - [ ] Configurar credenciais (Email, CRM, etc)

- [ ] **Cliente N8N** (1h)
  - [ ] Criar n8nClient.ts
  - [ ] Criar workflows.ts helper
  - [ ] Criar event types

- [ ] **Workflows** (3h)
  - [ ] Payment Events workflow
  - [ ] Subscription Events workflow
  - [ ] Email Notifications workflow
  - [ ] Testar todos os workflows

### DevOps (8h)

- [ ] **Logging** (2h)
  - [ ] Configurar Winston
  - [ ] Integrar CloudWatch
  - [ ] Testar logs em produção

- [ ] **Redis** (1h)
  - [ ] Setup Upstash Redis
  - [ ] Implementar idempotency keys
  - [ ] Testar cache

- [ ] **AWS Migration** (5h)
  - [ ] Setup ALB + Route53
  - [ ] Configurar SSL
  - [ ] Deploy Next.js no ECS/Fargate
  - [ ] Atualizar webhook URL no MP
  - [ ] Remover ngrok

---

## 🚀 PRÓXIMOS PASSOS

1. **Implementar Frontend** (Sprint 1 - 1 semana)
   - Provider + 3 Bricks
   - Páginas de checkout completas
   - Testing

2. **Implementar Backend** (Sprint 2 - 1 semana)
   - Migrations + RLS
   - Postgres Functions
   - API Routes

3. **Integrar N8N** (Sprint 3 - 3 dias)
   - Deploy N8N
   - Criar workflows
   - Testar automações

4. **Deploy Produção** (Sprint 4 - 2 dias)
   - Migrar para AWS
   - Configurar monitoramento
   - Go live! 🎉

---

**Status:** 📋 **PLANO V3 COMPLETO**  
**Diferencial:** Aproveita TODOS os Bricks oficiais + Backend robusto + N8N
