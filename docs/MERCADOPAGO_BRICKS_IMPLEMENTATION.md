# 🧱 Mercado Pago: Checkout Transparente com Bricks + Orders API

**Data:** 6 de outubro de 2025  
**Arquitetura:** Next.js 15 + shadcn/ui + Payment Brick + Orders API v2

---

## 🎯 Decisões de Arquitetura (Final)

### **Front-end: Payment Brick**
- ✅ **UI on-site** (sem redirect)
- ✅ **Customizável** via CSS/theme
- ✅ **3DS nativo**
- ✅ **Suporta:** Cartão, Pix, Boleto
- ✅ **PCI SAQ A** (campos seguros em iframe)

### **Back-end: Orders API v2**
- ✅ **Orquestração de pedido** antes do pagamento
- ✅ **Captura manual** (authorize → capture separado)
- ✅ **Captura automática** (1 estágio)
- ✅ **Webhooks assinados** com secret signature

### **Segurança**
- ✅ Dados de cartão **nunca passam pelo servidor**
- ✅ Tokenização no front via SDK
- ✅ Validação de webhook com `x-signature`
- ✅ PCI compliance mantido (SAQ A)

---

## 📁 Estrutura de Arquivos (App Router)

```
src/app/(dashboard)/payments/
├── page.tsx                           # Dashboard KPIs
├── new/page.tsx                       # Checkout com Payment Brick
├── [id]/page.tsx                      # Recibo/detalhes
├── subscriptions/
│   ├── page.tsx                       # Gerenciar planos
│   └── [id]/page.tsx                  # Detalhes da assinatura
└── settings/page.tsx                  # Credenciais, webhooks

src/lib/payments/mercadopago/
├── client.ts                          # SDK server-side
├── orders.ts                          # create/capture/cancel/refund Order
├── webhooks.ts                        # Validação x-signature + roteamento
├── bricks.ts                          # Helpers Payment/Status Brick
└── subscriptions.ts                   # Preapproval API

src/lib/payments/unified/
├── mapper.ts                          # Eventos → domínio app
├── metrics.ts                         # Taxa de sucesso, chargeback
└── payment-service.ts                 # Interface unificada

src/app/api/webhooks/mercadopago/route.ts
src/app/api/payments/orders/route.ts
src/app/api/payments/orders/[id]/capture/route.ts
src/app/api/payments/orders/[id]/cancel/route.ts
```

---

## 🔐 Environment Variables

```bash
# ========================================
# MERCADO PAGO - CHECKOUT TRANSPARENTE
# ========================================
# Public Key (usado no front - Payment Brick)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-cdfb831a-f7c1-4c1b-bf3d-dd332726f709

# Access Token (servidor - Orders API)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-606605515420553-100616-2503df71f46095fa9bccc3736d3c5852-2907827980

# Webhook Secret (gerado em "Suas integrações")
MERCADOPAGO_WEBHOOK_SECRET=your_webhook_secret_here

# Ambiente (test ou production)
MERCADOPAGO_ENV=test

# App URL para webhooks
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ Para produção:**
1. Gere novas credenciais em modo **production**
2. Configure webhook em: https://www.mercadopago.com.br/developers/panel/app/webhooks
3. Ative **Secret Signature** nas configurações

---

## 💻 Implementação: Orders API (Server-side)

### **1. Client (SDK Server-side)**

```typescript
// src/lib/payments/mercadopago/client.ts
import { MercadoPagoConfig, Payment, MerchantOrder } from 'mercadopago'

const config = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 10000,
  },
})

export const mpPayment = new Payment(config)
export const mpMerchantOrder = new MerchantOrder(config)

export { config as mpConfig }
```

### **2. Orders Service**

```typescript
// src/lib/payments/mercadopago/orders.ts
'use server'

import { mpConfig } from './client'

interface CreateOrderParams {
  userId: string
  items: Array<{
    id: string
    title: string
    quantity: number
    unit_price: number
    currency?: string
  }>
  totalAmount: number
  metadata?: Record<string, string>
  captureMode?: 'automatic' | 'manual'
}

/**
 * Cria uma Order no Mercado Pago (v2)
 * 
 * @param captureMode
 *   - 'automatic': autoriza + captura em 1 estágio
 *   - 'manual': autoriza agora, captura depois com capture()
 */
export async function createOrder(params: CreateOrderParams) {
  const { userId, items, totalAmount, metadata, captureMode = 'automatic' } = params

  try {
    // Buscar dados do usuário
    const user = await getUserById(userId)

    // Criar Order via fetch (SDK ainda não tem Orders completo)
    const response = await fetch('https://api.mercadopago.com/v2/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        external_reference: crypto.randomUUID(),
        marketplace: process.env.MERCADOPAGO_ENV === 'production' ? 'MP' : 'NONE',
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
        total_amount: totalAmount,
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: item.currency || 'BRL',
        })),
        payer: {
          email: user.email,
          first_name: user.name?.split(' ')[0],
          last_name: user.name?.split(' ').slice(1).join(' '),
        },
        metadata: {
          user_id: userId,
          ...metadata,
        },
        // CHAVE: modo de captura
        capture: captureMode === 'automatic',
      }),
    })

    const order = await response.json()

    if (!response.ok) {
      throw new Error(`MP Order creation failed: ${order.message}`)
    }

    // Salvar no banco
    await saveOrderToDatabase({
      orderId: order.id,
      userId,
      amount: totalAmount,
      status: 'pending',
      gateway: 'mercadopago',
      metadata: order,
    })

    return { success: true, order }
  } catch (error) {
    console.error('[createOrder] Error:', error)
    return { success: false, error: (error as Error).message }
  }
}

/**
 * Captura manual de um pagamento autorizado
 */
export async function captureOrder(orderId: string, amount?: number) {
  try {
    // Buscar Order do banco
    const order = await getOrderById(orderId)

    if (!order || order.status !== 'authorized') {
      throw new Error('Order não encontrada ou não autorizada')
    }

    // Capturar via API
    const response = await fetch(
      `https://api.mercadopago.com/v2/orders/${order.gateway_order_id}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount || order.amount,
        }),
      }
    )

    const captured = await response.json()

    // Atualizar banco
    await updateOrderStatus(orderId, 'captured', captured)

    return { success: true, captured }
  } catch (error) {
    console.error('[captureOrder] Error:', error)
    return { success: false, error: (error as Error).message }
  }
}

/**
 * Cancelar Order antes de capturar
 */
export async function cancelOrder(orderId: string) {
  try {
    const order = await getOrderById(orderId)

    const response = await fetch(
      `https://api.mercadopago.com/v2/orders/${order.gateway_order_id}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      }
    )

    const cancelled = await response.json()

    await updateOrderStatus(orderId, 'cancelled', cancelled)

    return { success: true, cancelled }
  } catch (error) {
    console.error('[cancelOrder] Error:', error)
    return { success: false, error: (error as Error).message }
  }
}

/**
 * Refund de um pagamento capturado
 */
export async function refundPayment(paymentId: string, amount?: number) {
  try {
    const payment = await mpPayment.refund({
      id: paymentId,
      body: {
        amount,
      },
    })

    await updatePaymentStatus(paymentId, 'refunded', payment)

    return { success: true, payment }
  } catch (error) {
    console.error('[refundPayment] Error:', error)
    return { success: false, error: (error as Error).message }
  }
}
```

---

## 🧱 Payment Brick (Front-end)

### **1. Instalar SDK**

```bash
pnpm add @mercadopago/sdk-react
```

### **2. Provider (Layout Root)**

```tsx
// src/app/layout.tsx
import { initMercadoPago } from '@mercadopago/sdk-react'

// Inicializar SDK com Public Key
if (process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY) {
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
    locale: 'pt-BR',
  })
}
```

### **3. Checkout Page com Payment Brick**

```tsx
// src/app/(dashboard)/payments/new/page.tsx
'use client'

import { useState } from 'react'
import { Payment, StatusScreen } from '@mercadopago/sdk-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createOrder } from '@/lib/payments/mercadopago/orders'

interface CheckoutItem {
  id: string
  title: string
  quantity: number
  unit_price: number
}

export default function CheckoutPage() {
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [status, setStatus] = useState<'form' | 'processing' | 'success' | 'error'>('form')

  // Exemplo: itens do carrinho
  const items: CheckoutItem[] = [
    {
      id: 'plan-pro',
      title: 'Plano Pro - Mensal',
      quantity: 1,
      unit_price: 99.00,
    },
  ]

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)

  const handleCreateOrder = async () => {
    const result = await createOrder({
      userId: 'current-user-id', // Pegar do auth
      items,
      totalAmount,
      captureMode: 'automatic', // ou 'manual' para captura posterior
    })

    if (result.success) {
      setOrderId(result.order.id)
      return result.order.id
    } else {
      throw new Error(result.error)
    }
  }

  const onSubmit = async (formData: any) => {
    try {
      setStatus('processing')

      // 1. Criar Order no backend
      const orderId = await handleCreateOrder()

      // 2. Payment Brick já tokenizou e processou o pagamento
      // formData contém: token, payment_method_id, etc.
      
      // 3. Aguardar webhook ou consultar status
      setPaymentId(formData.payment_id)
      setStatus('success')

      // Redirecionar para recibo
      setTimeout(() => {
        window.location.href = `/payments/${orderId}`
      }, 3000)
    } catch (error) {
      console.error('[onSubmit] Error:', error)
      setStatus('error')
    }
  }

  const onError = (error: any) => {
    console.error('[Payment Brick] Error:', error)
    setStatus('error')
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Esquerda: Payment Brick */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Finalizar Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              {status === 'form' && (
                <Payment
                  initialization={{
                    amount: totalAmount,
                    payer: {
                      email: 'user@example.com', // do auth
                    },
                  }}
                  customization={{
                    visual: {
                      style: {
                        theme: 'default', // ou 'dark'
                      },
                    },
                    paymentMethods: {
                      maxInstallments: 12,
                      creditCard: 'all',
                      debitCard: 'all',
                      ticket: 'all',
                      bankTransfer: 'all',
                    },
                  }}
                  onSubmit={onSubmit}
                  onError={onError}
                  onReady={() => console.log('Payment Brick ready')}
                />
              )}

              {status === 'processing' && (
                <Alert>
                  <AlertDescription>
                    Processando pagamento... Aguarde.
                  </AlertDescription>
                </Alert>
              )}

              {status === 'success' && paymentId && (
                <StatusScreen
                  initialization={{ paymentId }}
                  onError={onError}
                />
              )}

              {status === 'error' && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Erro ao processar pagamento. Tente novamente.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Direita: Resumo do pedido */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity}x R$ {item.unit_price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold">
                    R$ {(item.quantity * item.unit_price).toFixed(2)}
                  </p>
                </div>
              ))}

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>R$ {totalAmount.toFixed(2)}</span>
              </div>

              <Badge variant="secondary" className="w-full justify-center">
                🔒 Pagamento seguro via Mercado Pago
              </Badge>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Métodos aceitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>💳</span>
                <span>Cartão de crédito (até 12x)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💳</span>
                <span>Cartão de débito</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>Pix (aprovação instantânea)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🧾</span>
                <span>Boleto (até 3 dias úteis)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

---

## 🔔 Webhooks com Secret Signature

### **1. Validação de Assinatura**

```typescript
// src/lib/payments/mercadopago/webhooks.ts
import crypto from 'crypto'

/**
 * Valida x-signature do webhook do Mercado Pago
 * Documentação: https://www.mercadopago.com.br/developers/en/docs/your-integrations/notifications/webhooks
 */
export function validateWebhookSignature(
  xSignature: string,
  xRequestId: string,
  rawBody: string
): boolean {
  try {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET!

    // Extrair ts e hash do header x-signature
    const parts = xSignature.split(',')
    const ts = parts.find(p => p.startsWith('ts='))?.split('=')[1]
    const hash = parts.find(p => p.startsWith('v1='))?.split('=')[1]

    if (!ts || !hash) {
      console.error('[validateWebhookSignature] Missing ts or hash')
      return false
    }

    // Construir manifest: ts + request_id + rawBody
    const manifest = `id:${xRequestId};request-id:${xRequestId};ts:${ts};`
    const dataToHash = manifest + rawBody

    // Calcular HMAC SHA256
    const expectedHash = crypto
      .createHmac('sha256', secret)
      .update(dataToHash)
      .digest('hex')

    // Comparação segura (evita timing attacks)
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(expectedHash, 'hex')
    )
  } catch (error) {
    console.error('[validateWebhookSignature] Error:', error)
    return false
  }
}
```

### **2. Webhook Handler (API Route)**

```typescript
// src/app/api/webhooks/mercadopago/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { validateWebhookSignature } from '@/lib/payments/mercadopago/webhooks'
import { mpPayment, mpMerchantOrder } from '@/lib/payments/mercadopago/client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const xSignature = req.headers.get('x-signature')
    const xRequestId = req.headers.get('x-request-id')
    const rawBody = await req.text()

    if (!xSignature || !xRequestId) {
      return NextResponse.json(
        { error: 'Missing signature headers' },
        { status: 401 }
      )
    }

    // 1. Validar assinatura
    const isValid = validateWebhookSignature(xSignature, xRequestId, rawBody)

    if (!isValid) {
      console.error('[Webhook MP] Invalid signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      )
    }

    // 2. Parse payload
    const body = JSON.parse(rawBody)
    const { type, data } = body

    console.log('[Webhook MP] Received:', type, data?.id)

    // 3. Salvar evento (idempotência)
    const { data: existingEvent } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('gateway_event_id', xRequestId)
      .single()

    if (existingEvent) {
      console.log('[Webhook MP] Event already processed:', xRequestId)
      return NextResponse.json({ received: true })
    }

    await supabase.from('webhook_events').insert({
      gateway: 'mercadopago',
      gateway_event_id: xRequestId,
      event_type: type,
      payload: body,
      processed: false,
    })

    // 4. Processar evento
    switch (type) {
      case 'payment':
        await handlePaymentEvent(data.id)
        break
      case 'merchant_order':
        await handleMerchantOrderEvent(data.id)
        break
      case 'subscription_authorized_payment':
      case 'subscription_preapproval':
        await handleSubscriptionEvent(data.id)
        break
      default:
        console.log('[Webhook MP] Unhandled event type:', type)
    }

    // 5. Marcar como processado
    await supabase
      .from('webhook_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('gateway_event_id', xRequestId)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook MP] Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentEvent(paymentId: string) {
  try {
    // Buscar payment no MP
    const payment = await mpPayment.get({ id: paymentId })

    console.log('[handlePaymentEvent] Payment status:', payment.status)

    // Atualizar no banco
    await supabase
      .from('payment_transactions')
      .upsert({
        gateway_transaction_id: payment.id,
        gateway: 'mercadopago',
        status: mapPaymentStatus(payment.status),
        amount: payment.transaction_amount,
        currency: payment.currency_id,
        payment_method_type: payment.payment_method_id,
        paid_at: payment.status === 'approved' ? payment.date_approved : null,
        metadata: payment,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'gateway_transaction_id',
      })

    // Provisionar acesso se aprovado
    if (payment.status === 'approved') {
      await provisionUserAccess(payment.metadata.user_id, payment.metadata.plan_id)
    }
  } catch (error) {
    console.error('[handlePaymentEvent] Error:', error)
    throw error
  }
}

async function handleMerchantOrderEvent(orderId: string) {
  try {
    const order = await mpMerchantOrder.get({ merchantOrderId: orderId })

    console.log('[handleMerchantOrderEvent] Order status:', order.status)

    await supabase
      .from('payment_transactions')
      .update({
        status: order.status,
        metadata: order,
        updated_at: new Date().toISOString(),
      })
      .eq('gateway_order_id', orderId)
  } catch (error) {
    console.error('[handleMerchantOrderEvent] Error:', error)
    throw error
  }
}

function mapPaymentStatus(mpStatus: string): string {
  const mapping: Record<string, string> = {
    'pending': 'pending',
    'approved': 'succeeded',
    'authorized': 'authorized',
    'in_process': 'processing',
    'in_mediation': 'processing',
    'rejected': 'failed',
    'cancelled': 'cancelled',
    'refunded': 'refunded',
    'charged_back': 'refunded',
  }
  return mapping[mpStatus] || 'pending'
}
```

---

## 📊 Dashboard com shadcn/ui

### **1. KPIs Cards**

```tsx
// src/app/(dashboard)/payments/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

export default async function PaymentsDashboard() {
  const metrics = await getPaymentMetrics()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Pagamentos</h1>
        <p className="text-muted-foreground">
          Acompanhe receitas, transações e assinaturas em tempo real
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Receita do Mês
            </CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {metrics.revenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpIcon className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{metrics.revenueGrowth}%</span>
              {' '}vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Assinaturas Ativas
            </CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.activeSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">
              +{metrics.newSubscriptions} este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Aprovação
            </CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.approvalRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalTransactions} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pendentes
            </CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {metrics.pendingAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.pendingCount} transações
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <TransactionList />
    </div>
  )
}
```

---

## 📋 Migration (Supabase)

```sql
-- supabase/migrations/20251006000012_mercadopago_bricks_system.sql

-- 1. subscription_plans
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
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
  max_analyses INTEGER,
  max_storage_gb INTEGER,
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. payment_methods
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_customer_id TEXT NOT NULL,
  gateway_payment_method_id TEXT NOT NULL,
  
  -- Card info (não-sensível)
  card_brand TEXT,
  card_last4 TEXT,
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, gateway_customer_id, gateway_payment_method_id)
);

-- 3. subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_subscription_id TEXT UNIQUE NOT NULL,
  
  status TEXT NOT NULL CHECK (status IN (
    'active', 'past_due', 'cancelled', 'paused', 'incomplete'
  )),
  
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. payment_transactions
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_transaction_id TEXT UNIQUE NOT NULL,
  gateway_order_id TEXT,
  gateway_customer_id TEXT,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  
  status TEXT NOT NULL CHECK (status IN (
    'pending', 'processing', 'authorized', 'succeeded', 
    'failed', 'refunded', 'cancelled'
  )),
  
  payment_method_type TEXT,
  payment_method_last4 TEXT,
  
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. webhook_events
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'stripe')),
  gateway_event_id TEXT UNIQUE NOT NULL,
  
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  received_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_payment_transactions_user_id ON public.payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_status ON public.payment_transactions(status);
CREATE INDEX idx_payment_transactions_created_at ON public.payment_transactions(created_at DESC);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_webhook_events_processed ON public.webhook_events(processed, created_at);

-- RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Policies (users só veem seus próprios dados)
CREATE POLICY "Users can view their own payment methods"
  ON public.payment_methods FOR SELECT
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

-- Seed: Planos básicos
INSERT INTO public.subscription_plans (name, slug, description, price_monthly, price_yearly, features, max_analyses)
VALUES
  (
    'Free',
    'free',
    'Para começar',
    0,
    0,
    '["5 análises/mês", "Dashboard básico", "Suporte por email"]'::jsonb,
    5
  ),
  (
    'Pro',
    'pro',
    'Para crescer',
    99.00,
    990.00,
    '["Análises ilimitadas", "Dashboard avançado", "Suporte prioritário", "Relatórios personalizados"]'::jsonb,
    -1
  ),
  (
    'Enterprise',
    'enterprise',
    'Para escalar',
    299.00,
    2990.00,
    '["Tudo do Pro", "API de integração", "White label", "SLA garantido", "Gerente de conta"]'::jsonb,
    -1
  )
ON CONFLICT (slug) DO NOTHING;
```

---

## 🚀 Roadmap de Implementação

### **Semana 1: Foundation (ESTA SEMANA)**
- [x] Credenciais configuradas ✅
- [ ] Instalar SDK: `pnpm add @mercadopago/sdk-react mercadopago`
- [ ] Aplicar migration de tabelas
- [ ] Criar Orders service (server)
- [ ] Configurar webhooks no painel MP
- [ ] Validação de x-signature

### **Semana 2: Core Payment Flow**
- [ ] Payment Brick no checkout
- [ ] Status Brick no pós-pagamento
- [ ] Processar webhook `payment`
- [ ] Processar webhook `merchant_order`
- [ ] Dashboard básico (KPIs)

### **Semana 3: Subscriptions**
- [ ] Integrar Preapproval API
- [ ] Criar/cancelar assinaturas
- [ ] Renovação automática via webhook
- [ ] Trial periods
- [ ] Upgrade/downgrade de planos

### **Semana 4: Advanced Features**
- [ ] Captura manual (authorize → capture)
- [ ] Refunds
- [ ] Relatórios financeiros
- [ ] Exportar para contabilidade
- [ ] Hardening + testes

---

## ✅ Checklist Pré-produção

- [ ] **Credenciais de produção** geradas
- [ ] **Webhook URL** cadastrada no painel MP
- [ ] **Secret Signature** ativada
- [ ] **x-signature validation** implementada
- [ ] **Idempotência** de webhooks garantida
- [ ] **PCI compliance** auditado (SAQ A)
- [ ] **Testes de carga** executados
- [ ] **Monitoramento** (taxa de aprovação, falhas)
- [ ] **Playbook de incidentes** documentado
- [ ] **Fallback** para gateway secundário (Stripe?)

---

## 📚 Referências Oficiais

1. **Payment Brick:** https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/payment-brick
2. **Orders API:** https://www.mercadopago.com.br/developers/en/reference/orders/online-payments/create/post
3. **Webhooks + Signature:** https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
4. **SDK React:** https://github.com/mercadopago/sdk-js
5. **Subscriptions (Preapproval):** https://www.mercadopago.com.br/developers/pt/docs/subscriptions
6. **PCI SAQ A:** https://www.pcisecuritystandards.org/faq/

---

## 🎯 Conclusão

**Arquitetura Final:**
- ✅ **Payment Brick** no front (UI on-site, customizável)
- ✅ **Orders API v2** no back (captura manual/automática)
- ✅ **Webhooks assinados** com x-signature
- ✅ **PCI SAQ A** compliant (dados em iframe)
- ✅ **shadcn/ui** para dashboard enterprise

**Próximo comando:**
```bash
pnpm add @mercadopago/sdk-react mercadopago
```

**Está pronto para começar! 🚀**
