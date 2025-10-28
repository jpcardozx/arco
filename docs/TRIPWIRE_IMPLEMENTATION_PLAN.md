# 🎯 Plano de Implementação: Tripwire + CAPI (Completo)

**Data:** 27 de outubro de 2025  
**Objetivo:** Implementar funil lead magnet → tripwire R$147 → projeto R$4.999  
**Foco:** Tracking correto (CAPI + PostHog) desde Day 1  
**Prazo:** 3 semanas (1 semana dev + 2 semanas validação)

---

## 📊 Contexto Estratégico

### **Problema Atual:**
- CPL > R$50 para projeto completo (LTV R$4.999)
- Lead frio, conversão baixa (< 5%)
- Difícil anunciar projeto completo (intangível, alto ticket)

### **Solução: Evento Pré-Conversão**
```
Meta Ads → Lead Magnet (grátis) → Email (cases) → 
Tripwire R$147 (diagnóstico) → Reunião → Projeto R$4.999
```

### **Hipóteses a Validar:**
1. Lead que paga R$147 é mais qualificado que lead grátis
2. Tripwire financia aquisição (receita ≥ custo ads)
3. Meta algoritmo otimiza melhor em Purchase vs Lead
4. CAPI melhora CPL em 40-60% vs Pixel apenas

---

## 🚀 Fase 1: Foundation + CAPI (Semana 1 - 20h)

### **Dia 1-2: Meta CAPI + Cookie Consent (8h)**

#### **1.1 Meta CAPI Endpoint** ⏱️ 4h

**Arquivo:** `src/app/api/meta/track/route.ts`

**Por quê primeiro?**
- iOS 14.5+: 60-70% dos usuários bloqueiam tracking
- Ad blockers: 25-30% bloqueiam Pixel
- CAPI server-side: 95%+ delivery rate
- EMQ alto (8-10) vs baixo (2-4) = 40-60% menor CPL

**Implementação:**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const hash = (value: string): string => {
  return crypto.createHash('sha256')
    .update(value.toLowerCase().trim())
    .digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { eventName, email, phone, value, customData, eventId } = await request.json()

    // Event ID para dedup com Pixel
    const deduplicationId = eventId || crypto.randomUUID()

    // Payload Meta Conversions API
    const payload = {
      data: [{
        event_name: eventName, // "Lead", "Purchase", "InitiateCheckout"
        event_time: Math.floor(Date.now() / 1000),
        event_id: deduplicationId,
        action_source: 'website',
        
        // User data (hashed PII)
        user_data: {
          em: email ? [hash(email)] : undefined,
          ph: phone ? [hash(phone)] : undefined,
          client_ip_address: request.headers.get('x-forwarded-for') || request.ip,
          client_user_agent: request.headers.get('user-agent'),
          fbp: request.cookies.get('_fbp')?.value, // Facebook Pixel cookie
          fbc: request.cookies.get('_fbc')?.value  // Facebook Click ID
        },
        
        // Custom data
        custom_data: {
          value: value || 0,
          currency: 'BRL',
          ...customData
        }
      }],
      access_token: process.env.META_CONVERSION_API_ACCESS_TOKEN,
      test_event_code: process.env.META_TEST_EVENT_CODE // Remove em produção
    }

    // Send to Meta
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.META_DATASET_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${JSON.stringify(result)}`)
    }

    console.log('[Meta CAPI] Event sent:', {
      eventName,
      eventId: deduplicationId,
      metaResponse: result
    })

    return NextResponse.json({
      success: true,
      eventId: deduplicationId,
      metaResponse: result
    })

  } catch (error) {
    console.error('[Meta CAPI] Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
```

**Variáveis de ambiente necessárias:**

```bash
# .env.local
META_DATASET_ID=1574079363975678
META_CONVERSION_API_ACCESS_TOKEN=EAALqEBN5Xe8BPlRTsyDft4O2a3q46LGgP0gZCWK4QGbvCVP7RInoarA1eWfqmbQYPA5gSRApev5La23iLqyZBpSjCXRN5ZC3ZAlxWNnMavtxCHuoYZBv1GEGXbrcagaMnchvSZAt0lV25ZB4YvytWdLrUrEKNMr6vl2By9gF42mOmFyrL0ImRG6n1Qq6PcQatgDVgZDZD
META_TEST_EVENT_CODE=TEST12345 # Opcional, remover em produção
```

**Validação:**
1. Acessar [Meta Event Manager](https://business.facebook.com/events_manager2)
2. Ir em "Test Events"
3. Enviar request de teste:
   ```bash
   curl -X POST http://localhost:3000/api/meta/track \
     -H "Content-Type: application/json" \
     -d '{
       "eventName": "Purchase",
       "email": "test@example.com",
       "phone": "+5511999999999",
       "value": 147,
       "eventId": "test-123"
     }'
   ```
4. Verificar evento aparece no Event Manager
5. Checar EMQ score (deve ser 8-10)

---

#### **1.2 Cookie Consent Banner** ⏱️ 3h

**Arquivo:** `src/components/cookie-consent-banner.tsx`

**Por quê necessário?**
- LGPD compliance (obrigatório no Brasil)
- CAPI precisa de email/phone (só pode coletar após consent)
- PostHog tracking precisa de opt-in

**Implementação:**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ConsentState {
  marketing: boolean
  analytics: boolean
  timestamp: number
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if consent already given
    const consent = localStorage.getItem('arco_cookie_consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      // Enable tracking if already consented
      const consentData: ConsentState = JSON.parse(consent)
      if (consentData.analytics && typeof window !== 'undefined' && window.posthog) {
        window.posthog.opt_in_capturing()
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const consent: ConsentState = {
      marketing: true,
      analytics: true,
      timestamp: Date.now()
    }

    localStorage.setItem('arco_cookie_consent', JSON.stringify(consent))

    // Enable PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.opt_in_capturing()
    }

    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const consent: ConsentState = {
      marketing: false,
      analytics: false,
      timestamp: Date.now()
    }

    localStorage.setItem('arco_cookie_consent', JSON.stringify(consent))

    // Disable PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.opt_out_capturing()
    }

    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              🍪 Cookies e Privacidade
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Usamos cookies para melhorar sua experiência, personalizar conteúdo e 
              otimizar nossos anúncios. Seus dados são protegidos de acordo com a LGPD.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Aceitar Todos
              </button>
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Rejeitar Todos
              </button>
              <a
                href="/privacidade"
                className="px-6 py-2 text-slate-300 hover:text-white font-medium transition-colors flex items-center"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
          <button
            onClick={handleRejectAll}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Uso no layout:**

```typescript
// src/app/layout.tsx
import { CookieConsentBanner } from '@/components/cookie-consent-banner'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
```

**Validação:**
1. Primeira visita → banner aparece
2. Clicar "Aceitar" → banner desaparece
3. Refresh página → banner NÃO aparece novamente
4. DevTools → Application → LocalStorage → verificar `arco_cookie_consent`
5. PostHog deve estar habilitado (se aceitar)

---

#### **1.3 Instalar PostHog Server-Side** ⏱️ 1h

**Instalação:**

```bash
pnpm add posthog-node
```

**Arquivo:** `src/lib/posthog/server.ts`

```typescript
import { PostHog } from 'posthog-node'

let client: PostHog | null = null

export function getPostHogClient(): PostHog {
  if (!client) {
    client = new PostHog(
      process.env.POSTHOG_API_KEY!,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        flushAt: 20, // Flush após 20 eventos
        flushInterval: 10000 // Ou a cada 10 segundos
      }
    )
  }
  return client
}

export async function identifyUser(
  userId: string,
  properties: Record<string, any>
): Promise<void> {
  const posthog = getPostHogClient()
  posthog.identify({
    distinctId: userId,
    properties
  })
  await posthog.flush()
}

export async function trackEvent(
  userId: string,
  event: string,
  properties?: Record<string, any>
): Promise<void> {
  const posthog = getPostHogClient()
  posthog.capture({
    distinctId: userId,
    event,
    properties
  })
  await posthog.flush()
}

export async function aliasUser(
  previousId: string,
  userId: string
): Promise<void> {
  const posthog = getPostHogClient()
  posthog.alias({
    distinctId: userId,
    alias: previousId
  })
  await posthog.flush()
}

// Shutdown gracefully
export async function shutdownPostHog(): Promise<void> {
  if (client) {
    await client.shutdown()
  }
}
```

**Variáveis de ambiente:**

```bash
# .env.local
POSTHOG_API_KEY=phx_... # Personal API Key (não é a public key!)
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Como obter POSTHOG_API_KEY:**
1. PostHog → Settings → Project Settings → API Keys
2. Criar "Personal API Key" (não confundir com Project API Key)
3. Copiar e adicionar ao `.env.local`

**Validação:**
```typescript
// Teste rápido
import { trackEvent } from '@/lib/posthog/server'

await trackEvent('test-user-123', 'test_event', {
  foo: 'bar'
})
```

Verificar em PostHog → Activity → Events

---

### **Dia 3-4: Lead Magnet + Tripwire Pages (12h)**

#### **2.1 Lead Magnet Page** ⏱️ 5h

**Arquivo:** `src/app/lead-magnet/page.tsx`

**Objetivo:** Capturar email + segmento → enviar para tripwire

**Implementação:**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/posthog/server'

const SEGMENTS = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saude', label: 'Clínicas e Saúde' },
  { value: 'servicos', label: 'Serviços B2B' },
  { value: 'educacao', label: 'Educação' },
  { value: 'food', label: 'Restaurantes e Food' }
]

export default function LeadMagnetPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    segment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // 1. Save lead to Supabase
      const leadResponse = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          segment: formData.segment,
          source: 'lead_magnet'
        })
      })

      if (!leadResponse.ok) {
        throw new Error('Erro ao salvar lead')
      }

      const { leadId } = await leadResponse.json()

      // 2. Track Lead event (Meta CAPI)
      const eventId = crypto.randomUUID()
      
      await fetch('/api/meta/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Lead',
          email: formData.email,
          eventId,
          customData: {
            content_category: 'lead_magnet',
            segment: formData.segment
          }
        })
      })

      // 3. Track PostHog client-side
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('lead_captured', {
          segment: formData.segment,
          source: 'lead_magnet'
        })
      }

      // 4. Redirect to thank you page (with email for pre-fill)
      router.push(`/obrigado-lead?email=${encodeURIComponent(formData.email)}&segment=${formData.segment}`)

    } catch (err) {
      console.error('Lead capture error:', err)
      setError('Erro ao enviar. Tente novamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            20 Cases Reais do Seu Segmento
          </h1>
          <p className="text-xl text-slate-300">
            Empresas que aumentaram vendas em 200%+ com web dev + tráfego pago
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Segmento do seu negócio
              </label>
              <select
                value={formData.segment}
                onChange={e => setFormData({ ...formData, segment: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione...</option>
                {SEGMENTS.map(seg => (
                  <option key={seg.value} value={seg.value}>
                    {seg.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Quero os 20 Cases (Grátis)'}
            </button>

            <p className="text-xs text-center text-slate-400">
              Ao continuar, você concorda com nossa Política de Privacidade
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
```

**API Route:** `src/app/api/leads/capture/route.ts` (revisar existente)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import { trackEvent } from '@/lib/posthog/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name, segment, source } = await request.json()

    // 1. Save to Supabase
    const supabase = createSupabaseServer()
    
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        email,
        name,
        business_type: segment,
        source,
        intent_score: 0,
        qualified: false
      })
      .select()
      .single()

    if (error) throw error

    // 2. Track PostHog server-side
    await trackEvent(lead.id, 'lead_captured', {
      email,
      segment,
      source
    })

    // 3. Send email with cases (Resend)
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send-cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        segment
      })
    })

    return NextResponse.json({
      success: true,
      leadId: lead.id
    })

  } catch (error) {
    console.error('[Lead Capture] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

#### **2.2 Tripwire Page + Tracking** ⏱️ 7h

**Arquivo:** `src/app/tripwire/page.tsx` (revisar existente)

**Adicionar tracking dual (Pixel + CAPI):**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function TripwirePage() {
  const searchParams = useSearchParams()
  const [eventId] = useState(crypto.randomUUID()) // Para dedup
  
  useEffect(() => {
    const email = searchParams?.get('email')
    
    // 1. Track ViewContent (PostHog client-side)
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('tripwire_page_viewed', {
        email,
        value: 147
      })
    }

    // 2. Track ViewContent (Meta CAPI server-side)
    fetch('/api/meta/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'ViewContent',
        email,
        value: 147,
        eventId,
        customData: {
          content_type: 'product',
          content_name: 'Diagnóstico Personalizado',
          content_category: 'tripwire'
        }
      })
    }).catch(console.error)

  }, [searchParams, eventId])

  const handleCheckout = async () => {
    const email = searchParams?.get('email') || formData.email
    
    // Track InitiateCheckout
    const checkoutEventId = crypto.randomUUID()
    
    await fetch('/api/meta/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'InitiateCheckout',
        email,
        phone: formData.phone,
        value: 147,
        eventId: checkoutEventId,
        customData: {
          content_type: 'product',
          content_name: 'Diagnóstico Personalizado'
        }
      })
    })

    // Create MercadoPago checkout
    const response = await fetch('/api/checkout/tripwire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        eventId: checkoutEventId // Pass to webhook
      })
    })

    const { checkoutUrl } = await response.json()
    window.location.href = checkoutUrl
  }

  // ... resto do componente
}
```

**Webhook MercadoPago** `src/app/api/webhooks/mercadopago/route.ts` (adicionar tracking):

```typescript
export async function POST(request: NextRequest) {
  const { action, data } = await request.json()

  if (action === 'payment.updated' && data.status === 'approved') {
    const payment = await getMercadoPagoPayment(data.id)
    
    // 1. Update Supabase
    await supabase
      .from('purchases')
      .update({ status: 'succeeded' })
      .eq('mercadopago_payment_id', payment.id)

    // 2. Track Purchase (Meta CAPI) ⭐ CRÍTICO
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/meta/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'Purchase',
        email: payment.payer.email,
        phone: payment.payer.phone?.number,
        value: payment.transaction_amount,
        eventId: payment.metadata.event_id, // Same ID from InitiateCheckout!
        customData: {
          content_type: 'product',
          content_name: 'Diagnóstico Personalizado',
          transaction_id: payment.id
        }
      })
    })

    // 3. Track PostHog server-side
    await trackEvent(payment.payer.email, 'tripwire_purchased', {
      value: payment.transaction_amount,
      currency: 'BRL',
      transaction_id: payment.id
    })
  }

  return NextResponse.json({ received: true })
}
```

---

## 📊 Fase 2: Validação com Tráfego (Semana 2-3)

### **Semana 2: Setup Ads + Teste Pequeno**

#### **3.1 Meta Pixel Installation** ⏱️ 2h

**Arquivo:** `src/app/layout.tsx`

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Validação:**
- Meta Event Manager → Overview → verificar PageView events
- Browser DevTools → Network → filtrar "facebook" → ver requests

---

#### **3.2 Campaign Setup (Meta Ads Manager)** ⏱️ 3h

**Estrutura de Campanhas:**

**Campanha 1: Lead Magnet**
```
- Objetivo: Lead Generation
- Otimização: Conversão "Lead"
- Budget: R$50/dia
- Audiência: Lookalike 1% de clientes atuais (ou interest targeting)
- Placement: Automático (Feed + Stories)
- Creative: 3 variações
  - Estático: "20 Cases Reais do Seu Segmento (Grátis)"
  - Vídeo: Depoimento cliente
  - Carrossel: Antes/Depois de 3 clientes
```

**Campanha 2: Tripwire (Remarketing)**
```
- Objetivo: Conversions
- Otimização: Conversão "Purchase"
- Budget: R$50/dia
- Audiência: Custom Audience (leads últimos 7 dias)
- Placement: Automático
- Creative: 3 variações
  - Estático: "Diagnóstico por R$147 (valor R$297)"
  - Vídeo: Explicação do que vai receber
  - Social proof: "20+ empresas já fecharam projeto"
```

---

#### **3.3 Rodar Teste (7 dias)** ⏱️ Budget R$700

**Objetivo:** Coletar dados reais

**Métricas a acompanhar diariamente:**

**Lead Magnet:**
- Impressões
- CPM (custo por mil impressões)
- CTR (click-through rate)
- CPL (custo por lead)
- Leads capturados

**Tripwire:**
- Impressões
- CTR
- Visitantes página tripwire
- Iniciaram checkout
- Purchases
- CPA (custo por aquisição)
- Receita total

**PostHog Funnel:**
```
Lead Captured → Email Sent → Tripwire Viewed → 
Checkout Initiated → Purchase
```

**Decision Point (fim de Semana 2):**

✅ **CONTINUAR** se:
- Tripwire vendeu ≥ 5 unidades
- CPA < R$300
- Receita ≥ 50% do gasto

⚠️ **AJUSTAR** se:
- Tripwire vendeu 1-4 unidades
- Testar: preço diferente, novo creative, outra audiência

❌ **PIVOTAR** se:
- Zero tripwire vendido
- Problema na oferta ou copy

---

## 📈 Fase 3: Validação Conversão Projeto (Semana 4-6)

### **4.1 Sales Process Manual**

**Objetivo:** Provar que tripwire → projeto funciona

**Processo:**

1. **Email automático (D+1 após tripwire):**
   ```
   Assunto: Seu diagnóstico está pronto 🎯
   
   Olá [Nome],
   
   Seu diagnóstico personalizado está pronto!
   
   [Link para vídeo/documento]
   
   Baseado na análise, identifiquei 3 oportunidades rápidas
   para aumentar suas vendas em 200%+ nos próximos 90 dias.
   
   Quer conversar sobre implementação?
   
   [Agendar Reunião - Calendly]
   
   Abraço,
   [Seu nome]
   ```

2. **Reunião (30-45min):**
   - Revisar diagnóstico
   - Apresentar proposta projeto completo (R$4.999)
   - Mostrar cases similares
   - Responder objeções

3. **Follow-up:**
   - D+3: Email follow-up
   - D+7: Último email antes de "desistir"

**Tracking manual (Google Sheets):**

| Tripwire ID | Email | Agendou? | Compareceu? | Fechou? | Ticket | Data |
|-------------|-------|----------|-------------|---------|--------|------|
| trip_001    | x@... | Sim      | Sim         | Sim     | 4.999  | ...  |
| trip_002    | y@... | Sim      | Não         | -       | -      | ...  |

**Cálculo de conversão real:**
```
Taxa agendamento = Agendou / Total tripwires
Taxa show-up = Compareceu / Agendou
Taxa fechamento = Fechou / Compareceu

Conversão total = (Agendou rate) × (Show-up rate) × (Close rate)
```

---

### **4.2 Decision Point (Semana 6)**

**Métricas necessárias:**
- Mínimo 20 tripwires vendidos
- Conversão tripwire → projeto medida

**Cenários:**

✅ **SCALE** se conversão > 15%:
```
Matemática exemplo:
- 100 tripwires × R$147 = R$14.700 receita
- 100 × 20% conversão = 20 projetos × R$4.999 = R$99.980
- ROAS = R$114.680 / R$10.000 (gasto ads) = 11.5x
```

⚠️ **OTIMIZAR** se conversão 5-15%:
- Melhorar sales script
- Aumentar valor percebido do diagnóstico
- Testar diferentes preços projeto
- Adicionar urgência/escassez

❌ **RETHINK** se conversão < 5%:
- Problema: tripwire não qualifica leads
- Soluções:
  - Mudar entregáveis tripwire
  - Mudar preço tripwire
  - Adicionar filtro (reunião só para X perfil)

---

## 🔧 Fase 4: Otimização (Semana 7+)

### **Se math funciona (conversão > 15%):**

#### **5.1 Scale Budget**
- Semana 7: R$100/dia por campanha
- Semana 8: R$150/dia
- Semana 9: R$200/dia
- Semana 10+: R$300-500/dia

#### **5.2 Lookalike de Tripwire Buyers**
- Criar Custom Audience: Tripwire purchasers (últimos 30 dias)
- Criar Lookalike 1-2%
- Nova campanha: Lookalike optimization

#### **5.3 Intent Scoring (opcional)**
- Implementar 6 sinais de intenção
- Priorizar follow-up por score
- Nurture leads frios via email

#### **5.4 Automation**
- Zapier/Make: Tripwire purchase → Slack notification
- Calendly → Google Calendar sync
- Email sequences automáticas

---

## 📊 Métricas de Sucesso Final

### **Week 1-2 (Validação Inicial):**
- ✅ CAPI EMQ score: 8-10
- ✅ Lead magnet CPL: < R$30
- ✅ Email open rate: > 30%
- ✅ Tripwire CPA: < R$300

### **Week 3-6 (Validação Funil):**
- ✅ Tripwire → agendamento: > 30%
- ✅ Reunião → fechamento: > 20%
- ✅ Conversão total: > 15%
- ✅ Ticket médio: ≥ R$4.000

### **Week 7+ (Scale):**
- ✅ Daily tripwire purchases: > 10
- ✅ ROAS: > 5x
- ✅ CAC: < R$500
- ✅ MRR (monthly recurring): R$50k+

---

## ⚠️ Riscos e Mitigações

### **Risco 1: Tripwire take rate < 10%**
**Mitigação:**
- A/B test preço: R$97 vs R$147 vs R$197
- Testar countdown timer (urgência)
- Adicionar garantia 7 dias money-back
- Melhorar copy/creative

### **Risco 2: Meta CAPI < 90% delivery**
**Mitigação:**
- Verificar EMQ score diariamente
- Fallback para Pixel client-side
- Monitor no Meta Event Manager
- Alertas se eventos caem

### **Risco 3: Conversão projeto < 15%**
**Mitigação:**
- Gravar reuniões (com permissão)
- Analisar objeções comuns
- Melhorar sales script
- Adicionar case studies na apresentação
- Testar diferentes preços projeto

### **Risco 4: Budget não escala**
**Mitigação:**
- Começar pequeno (R$50/dia)
- Aumentar 20% por semana (se ROAS > 3x)
- Nunca aumentar > 50% de uma vez
- Manter 2-3 campanhas ativas (diversificação)

---

## 🎯 Checklist de Implementação

### **Semana 1 (Dev):**
- [ ] Meta CAPI endpoint criado e testado
- [ ] Cookie consent banner implementado
- [ ] PostHog server library instalado
- [ ] Lead magnet page criada
- [ ] Tripwire page com tracking dual
- [ ] Webhook MercadoPago com Purchase event
- [ ] Validação completa (EMQ 8-10)

### **Semana 2 (Ads Setup):**
- [ ] Meta Pixel instalado
- [ ] Campanha Lead Magnet criada
- [ ] Campanha Tripwire criada
- [ ] 3 criativos por campanha
- [ ] Budget R$50/dia cada
- [ ] Test events validados

### **Semana 3 (Coleta de Dados):**
- [ ] 7 dias de ads rodando
- [ ] ≥ 5 tripwires vendidos
- [ ] Dados em PostHog funnel
- [ ] Decision point: continuar/ajustar/parar

### **Semana 4-6 (Validação Conversão):**
- [ ] ≥ 20 tripwires vendidos
- [ ] Sales process testado
- [ ] Conversão tripwire→projeto medida
- [ ] Decision point: scale/otimizar/rethink

### **Semana 7+ (Scale ou Pivot):**
- [ ] Se math works: aumentar budget
- [ ] Lookalike de tripwire buyers
- [ ] Automações implementadas
- [ ] ROAS > 5x consistente

---

## 📝 Notas Finais

**O que NÃO fazer:**
- ❌ Implementar CAPI depois de validar tripwire (fazer desde Day 1)
- ❌ Acreditar em forecast de ROI "22x" (medir dados reais)
- ❌ Criar intent scoring antes de ter dados
- ❌ Fazer automações antes de validar manualmente
- ❌ Aumentar budget sem validar conversão projeto

**O que FAZER:**
- ✅ MVP rápido (1 semana dev)
- ✅ Testar pequeno (R$50/dia início)
- ✅ Medir TUDO (PostHog + Google Sheets)
- ✅ Decidir com dados (não feeling)
- ✅ Pivotar rápido se não funcionar

**Esforço total:** 20h dev + 6 semanas validação  
**Investimento:** R$1.500-2.000 (ads primeiras 3 semanas)  
**Break-even:** Tripwire CPA < R$147 (auto-liquidating)

---

**Data última atualização:** 27 de outubro de 2025
