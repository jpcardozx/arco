# 💳 Proposta: Reestruturação do Módulo Finance

**Data:** 6 de outubro de 2025  
**Objetivo:** Transformar finance em um sistema de pagamentos profissional

---

## 🎯 Visão Atual vs. Nova Visão

### ❌ **Atual (Finance Genérico)**
- Controle manual de transações
- Mock de dados financeiros
- Sem integração com gateways
- Foco em "contabilidade interna"
- 9 TODOs de implementação

### ✅ **Nova (Payment Management)**
- **Mercado Pago** (Brasil/LATAM)
- **Stripe** (Internacional)
- **Webhooks** para pagamentos assíncronos
- **PCI Compliance** ready
- **Assinaturas recorrentes**
- **Split de pagamentos**

---

## 🏗️ Nova Arquitetura

### **1. Módulo: Payment Management** 
```
src/app/dashboard/payments/
├── page.tsx                    # Dashboard de pagamentos
├── actions.ts                  # Server actions
├── subscriptions/              
│   ├── page.tsx               # Gerenciar assinaturas
│   └── [id]/page.tsx          # Detalhes da assinatura
├── transactions/
│   ├── page.tsx               # Histórico de transações
│   └── [id]/page.tsx          # Detalhes da transação
└── settings/
    └── page.tsx               # Config gateways

src/lib/payments/
├── mercadopago/
│   ├── client.ts              # MercadoPago SDK
│   ├── preferences.ts         # Criar preferências
│   ├── webhooks.ts            # Processar webhooks
│   └── subscriptions.ts       # Gerenciar planos
├── stripe/
│   ├── client.ts              # Stripe SDK
│   ├── checkout.ts            # Sessions de checkout
│   ├── webhooks.ts            # Processar webhooks
│   └── subscriptions.ts       # Gerenciar planos
├── unified/
│   ├── payment-service.ts     # Interface unificada
│   └── webhook-router.ts      # Roteamento de webhooks
└── types.ts                   # Tipos compartilhados

src/app/api/webhooks/
├── mercadopago/
│   └── route.ts               # Webhook MP
└── stripe/
    └── route.ts               # Webhook Stripe
```

---

## 🔐 Segurança e Compliance

### **1. PCI DSS Compliance**
```typescript
// NÃO armazenar dados de cartão
// Usar tokens dos gateways

interface SecurePayment {
  // ❌ NUNCA fazer isso
  // cardNumber: string
  // cvv: string
  
  // ✅ Usar tokens
  paymentMethodId: string    // Stripe
  paymentMethodToken: string // MercadoPago
  customerId: string
}
```

### **2. Webhook Signature Validation**
```typescript
// Validar todas as requisições de webhook
export async function validateMercadoPagoWebhook(
  signature: string,
  payload: string
): Promise<boolean> {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET!
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return signature === expectedSignature
}
```

### **3. Encryption at Rest**
```typescript
// Criptografar dados sensíveis no DB
interface EncryptedPaymentMethod {
  id: string
  user_id: string
  gateway: 'stripe' | 'mercadopago'
  token_encrypted: string  // AES-256-GCM
  last4: string            // Últimos 4 dígitos (plain)
  brand: string            // Visa, Mastercard, etc.
  expires_at: string
}
```

---

## 📊 Nova Estrutura de Tabelas

### **1. payment_methods**
```sql
CREATE TABLE public.payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Gateway info
  gateway TEXT NOT NULL CHECK (gateway IN ('stripe', 'mercadopago')),
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
  
  -- Índices
  UNIQUE(user_id, gateway_customer_id, gateway_payment_method_id)
);
```

### **2. payment_transactions**
```sql
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relacionamentos
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  invoice_id UUID REFERENCES invoices(id),
  
  -- Gateway
  gateway TEXT NOT NULL CHECK (gateway IN ('stripe', 'mercadopago')),
  gateway_transaction_id TEXT UNIQUE NOT NULL,
  gateway_customer_id TEXT,
  
  -- Valores
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'pending',
    'processing',
    'succeeded',
    'failed',
    'refunded',
    'cancelled'
  )),
  
  -- Payment method
  payment_method_type TEXT, -- 'credit_card', 'pix', 'boleto'
  payment_method_last4 TEXT,
  
  -- Timestamps
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Metadata (JSONB para flexibilidade)
  metadata JSONB DEFAULT '{}'::jsonb
);
```

### **3. subscriptions**
```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relacionamentos
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  
  -- Gateway
  gateway TEXT NOT NULL CHECK (gateway IN ('stripe', 'mercadopago')),
  gateway_subscription_id TEXT UNIQUE NOT NULL,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'active',
    'past_due',
    'cancelled',
    'paused',
    'incomplete'
  )),
  
  -- Billing
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **4. subscription_plans**
```sql
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Plan info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Pricing
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  currency TEXT DEFAULT 'BRL',
  
  -- Gateway IDs
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly TEXT,
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
```

### **5. webhook_events**
```sql
CREATE TABLE public.webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Gateway
  gateway TEXT NOT NULL CHECK (gateway IN ('stripe', 'mercadopago')),
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
```

---

## 💻 Implementação de Exemplo

### **1. Mercado Pago Client**
```typescript
// src/lib/payments/mercadopago/client.ts
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const mpConfig = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export const mpPayment = new Payment(mpConfig)
export const mpPreference = new Preference(mpConfig)

export async function createMercadoPagoPreference(data: {
  userId: string
  items: Array<{
    title: string
    quantity: number
    unit_price: number
  }>
  metadata?: Record<string, any>
}) {
  const preference = await mpPreference.create({
    body: {
      items: data.items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/payments/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/payments/failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/payments/pending`,
      },
      auto_return: 'approved',
      metadata: {
        user_id: data.userId,
        ...data.metadata,
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
    },
  })

  return preference
}
```

### **2. Stripe Client**
```typescript
// src/lib/payments/stripe/client.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function createStripeCheckoutSession(data: {
  userId: string
  priceId: string
  metadata?: Record<string, string>
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/cancelled`,
    metadata: {
      userId: data.userId,
      ...data.metadata,
    },
    customer_email: undefined, // Will be filled by Stripe
  })

  return session
}
```

### **3. Unified Payment Service**
```typescript
// src/lib/payments/unified/payment-service.ts
export class PaymentService {
  async createCheckout(params: {
    userId: string
    planId: string
    gateway: 'stripe' | 'mercadopago'
    billingCycle: 'monthly' | 'yearly'
  }) {
    // Get plan details
    const plan = await this.getPlanDetails(params.planId)
    
    // Route to correct gateway
    if (params.gateway === 'stripe') {
      return this.createStripeCheckout(params, plan)
    } else {
      return this.createMercadoPagoCheckout(params, plan)
    }
  }

  async processWebhook(params: {
    gateway: 'stripe' | 'mercadopago'
    signature: string
    payload: string
  }) {
    // Validate signature
    const isValid = await this.validateWebhookSignature(params)
    if (!isValid) {
      throw new Error('Invalid webhook signature')
    }

    // Route to correct processor
    if (params.gateway === 'stripe') {
      return this.processStripeWebhook(params.payload)
    } else {
      return this.processMercadoPagoWebhook(params.payload)
    }
  }

  async refundPayment(transactionId: string) {
    // Get transaction
    const transaction = await this.getTransaction(transactionId)
    
    // Route to correct gateway
    if (transaction.gateway === 'stripe') {
      return this.refundStripePayment(transaction)
    } else {
      return this.refundMercadoPagoPayment(transaction)
    }
  }
}
```

### **4. Webhook Handler (API Route)**
```typescript
// src/app/api/webhooks/mercadopago/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PaymentService } from '@/lib/payments/unified/payment-service'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-signature')
    const payload = await req.text()

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Log webhook
    await supabase.from('webhook_events').insert({
      gateway: 'mercadopago',
      gateway_event_id: signature,
      event_type: 'payment',
      payload: JSON.parse(payload),
    })

    // Process webhook
    const paymentService = new PaymentService()
    await paymentService.processWebhook({
      gateway: 'mercadopago',
      signature,
      payload,
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook MercadoPago] Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
```

---

## 📊 Dashboard de Pagamentos

### **UI Components**

**1. Payment Status Cards**
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Receita do Mês</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">R$ 12.450,00</p>
      <p className="text-sm text-green-600">+23% vs mês anterior</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Assinaturas Ativas</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">42</p>
      <p className="text-sm text-blue-600">+5 este mês</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Pagamentos Pendentes</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">R$ 3.200,00</p>
      <p className="text-sm text-yellow-600">8 faturas</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Taxa de Sucesso</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">96.5%</p>
      <p className="text-sm text-green-600">Excelente</p>
    </CardContent>
  </Card>
</div>
```

**2. Transaction List**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Cliente</TableHead>
      <TableHead>Plano</TableHead>
      <TableHead>Valor</TableHead>
      <TableHead>Gateway</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Data</TableHead>
      <TableHead>Ações</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {transactions.map(tx => (
      <TableRow key={tx.id}>
        <TableCell className="font-mono">{tx.id.slice(0, 8)}</TableCell>
        <TableCell>{tx.customer_name}</TableCell>
        <TableCell>{tx.plan_name}</TableCell>
        <TableCell>R$ {tx.amount.toFixed(2)}</TableCell>
        <TableCell>
          <Badge variant={tx.gateway === 'stripe' ? 'default' : 'secondary'}>
            {tx.gateway}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge variant={getStatusVariant(tx.status)}>
            {tx.status}
          </Badge>
        </TableCell>
        <TableCell>{formatDate(tx.created_at)}</TableCell>
        <TableCell>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## 💰 Custos e Taxas

### **Mercado Pago**
- Taxa padrão: 4.99% + R$ 0,39 por transação
- PIX: 0.99%
- Boleto: R$ 3,49 fixo
- Sem mensalidade

### **Stripe**
- Taxa padrão: 3.4% + R$ 0,35 por transação
- Internacional: 4.4% + R$ 0,35
- Assinaturas: mesma taxa
- Sem mensalidade

### **Recomendação**
- **Mercado Pago:** Foco Brasil/LATAM, PIX
- **Stripe:** Internacional, APIs melhores
- **Usar ambos:** Flexibilidade máxima

---

## 🎯 Roadmap de Implementação

### **FASE 1: Foundation (1 semana)**
- [x] Análise e planejamento ✅
- [ ] Criar migrations das tabelas
- [ ] Instalar SDKs (MP + Stripe)
- [ ] Configurar webhooks básicos
- [ ] Validação de signatures

### **FASE 2: Core Features (2 semanas)**
- [ ] Checkout Mercado Pago
- [ ] Checkout Stripe
- [ ] Processar webhooks
- [ ] Salvar transações no DB
- [ ] Dashboard básico

### **FASE 3: Subscriptions (1 semana)**
- [ ] Criar/cancelar assinaturas
- [ ] Renovação automática
- [ ] Trial periods
- [ ] Upgrade/downgrade de planos

### **FASE 4: Advanced (1 semana)**
- [ ] Refunds
- [ ] Split de pagamentos
- [ ] Relatórios financeiros
- [ ] Exportar para contabilidade

---

## 📦 Dependências Necessárias

```bash
# Mercado Pago
pnpm add mercadopago

# Stripe
pnpm add stripe

# Validação
pnpm add zod

# Criptografia
pnpm add crypto-js @types/crypto-js
```

---

## 🔐 Environment Variables

```env
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxx
MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxx
MERCADOPAGO_WEBHOOK_SECRET=xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
NEXT_PUBLIC_APP_URL=https://arco.com.br
```

---

## ✅ Benefícios

### **Segurança**
- ✅ PCI DSS Compliant
- ✅ Não armazena dados de cartão
- ✅ Webhooks validados
- ✅ Encryption at rest

### **UX**
- ✅ Checkout rápido
- ✅ Múltiplos métodos (cartão, PIX, boleto)
- ✅ Assinaturas automáticas
- ✅ Trial gratuito

### **Business**
- ✅ Receita recorrente
- ✅ Métricas em tempo real
- ✅ Churn tracking
- ✅ Relatórios financeiros

### **Técnico**
- ✅ APIs modernas
- ✅ Webhooks confiáveis
- ✅ Escalável
- ✅ Testável

---

## 🎯 Conclusão

**Transformar `finance` em `payments` focado em:**
1. ✅ Mercado Pago + Stripe
2. ✅ Assinaturas recorrentes
3. ✅ Segurança PCI compliant
4. ✅ Webhooks robustos
5. ✅ Dashboard profissional

**Tempo estimado:** 4-5 semanas  
**Prioridade:** P1 (essencial para monetização)

**Próximo passo:** Criar migrations e instalar SDKs! 🚀
