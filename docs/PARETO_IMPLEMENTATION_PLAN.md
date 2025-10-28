# 🎯 ARCO Conversion Stack - Plano Pareto (80/20)

**Objetivo:** Implementar 20% das features que geram 80% do valor de negócio.

**Prazo:** 3-5 dias (focado, sem distrações)

**Data Início:** 27 de outubro de 2025

---

## 📊 Análise Pareto: O Que Realmente Importa?

### ❌ **Fora do Escopo (Nice-to-have)**
- Feature flags system
- A/B testing infrastructure  
- Event batching optimization
- Supabase RLS caching
- Stripe integration (já temos MercadoPago funcionando)
- EMQ advanced scoring
- Exit intent detection
- Scroll velocity tracking

### ✅ **No Escopo (Must-have)**

#### **1. Legal Compliance (blocker)**
- Cookie consent banner LGPD

#### **2. Core Tracking (fundação)**
- PostHog server-side library
- Meta CAPI endpoint funcional

#### **3. Intent Scoring (diferencial)**
- Intent scoring básico (4-5 sinais apenas)
- Progressive form component
- Lead qualification logic

---

## 🚀 Implementação em 3 Dias

### **DIA 1: Foundation Layer (6-8h)**

#### **1.1 Cookie Consent Banner** ⏱️ 2h
**Arquivo:** `src/components/cookie-consent-banner.tsx`

**Features:**
- ✅ Banner fixo no bottom da página
- ✅ Aceitar/Rejeitar todos
- ✅ LocalStorage persistence (`arco_cookie_consent`)
- ✅ PostHog consent mode integration
- ✅ Tailwind styling (match design system)

**Não fazer:**
- ❌ Granular cookie controls
- ❌ Cookie settings page
- ❌ Advanced preferences

**Código:**
```typescript
'use client'

interface ConsentState {
  analytics: boolean
  marketing: boolean
  timestamp: number
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('arco_cookie_consent')
    if (!consent) setShowBanner(true)
  }, [])

  const handleAcceptAll = () => {
    const consent: ConsentState = {
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    }
    localStorage.setItem('arco_cookie_consent', JSON.stringify(consent))
    
    // PostHog consent
    if (window.posthog) {
      window.posthog.opt_in_capturing()
    }
    
    setShowBanner(false)
  }

  // ... reject logic
}
```

**Validação:** Banner aparece apenas na primeira visita, desaparece após escolha.

---

#### **1.2 PostHog Server-Side Library** ⏱️ 2h
**Arquivo:** `src/lib/posthog/server.ts`

**Setup:**
```bash
pnpm add posthog-node
```

**.env.local:**
```bash
POSTHOG_API_KEY=phx_... # Personal API Key (diferente da public)
```

**Features:**
- ✅ Singleton client
- ✅ `identify(userId, properties)`
- ✅ `capture(userId, event, properties)`
- ✅ `alias(previousId, userId)` para login/signup
- ✅ Flush on shutdown

**Código:**
```typescript
import { PostHog } from 'posthog-node'

let client: PostHog | null = null

export function getPostHogClient() {
  if (!client) {
    client = new PostHog(
      process.env.POSTHOG_API_KEY!,
      { 
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        flushAt: 20, // Batch de 20 eventos
        flushInterval: 10000 // Ou 10 segundos
      }
    )
  }
  return client
}

export async function identifyUser(userId: string, properties: Record<string, any>) {
  const posthog = getPostHogClient()
  posthog.identify({ distinctId: userId, properties })
  await posthog.flush()
}

export async function trackEvent(
  userId: string, 
  event: string, 
  properties?: Record<string, any>
) {
  const posthog = getPostHogClient()
  posthog.capture({ distinctId: userId, event, properties })
  await posthog.flush()
}

export async function aliasUser(previousId: string, userId: string) {
  const posthog = getPostHogClient()
  posthog.alias({ distinctId: userId, alias: previousId })
  await posthog.flush()
}
```

**Validação:** Testar em `/api/leads/capture` - evento deve aparecer no PostHog.

---

#### **1.3 Meta CAPI Endpoint** ⏱️ 3h
**Arquivo:** `src/app/api/meta/track/route.ts`

**Features:**
- ✅ Recebe event data do frontend
- ✅ Enriquece com server-side data (IP, user agent)
- ✅ Hash de PII (email, phone)
- ✅ Envia para Meta Conversions API
- ✅ Event deduplication (via event_id)
- ✅ Error handling + retry logic (1x retry apenas)

**Código:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

interface MetaEventPayload {
  event_name: string
  event_time: number
  event_id: string
  user_data: {
    em?: string[] // hashed emails
    ph?: string[] // hashed phones
    client_ip_address?: string
    client_user_agent?: string
    fbp?: string // Facebook browser pixel
    fbc?: string // Facebook click ID
  }
  custom_data?: Record<string, any>
  action_source: 'website'
}

function hashSHA256(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const payload: MetaEventPayload = {
      event_name: body.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.eventId || crypto.randomUUID(),
      user_data: {
        em: body.email ? [hashSHA256(body.email)] : undefined,
        ph: body.phone ? [hashSHA256(body.phone)] : undefined,
        client_ip_address: request.headers.get('x-forwarded-for') || request.ip,
        client_user_agent: request.headers.get('user-agent') || undefined,
        fbp: body.fbp,
        fbc: body.fbc
      },
      custom_data: body.customData,
      action_source: 'website'
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.META_DATASET_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [payload],
          access_token: process.env.META_CONVERSION_API_ACCESS_TOKEN,
          test_event_code: process.env.META_TEST_EVENT_CODE // Remove em produção
        })
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${JSON.stringify(result)}`)
    }

    return NextResponse.json({
      success: true,
      eventId: payload.event_id,
      metaResponse: result
    })

  } catch (error) {
    console.error('[Meta CAPI] Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
```

**Validação:** Usar Meta Event Manager → Test Events para verificar recebimento.

---

#### **1.4 Revisar Lead Capture API** ⏱️ 1h
**Arquivo:** `src/app/api/leads/capture/route.ts`

**Adicionar após Supabase insert:**
```typescript
// Dual tracking: PostHog + Meta CAPI
const trackingPromises = []

// 1. PostHog server-side
if (leadId) {
  trackingPromises.push(
    trackEvent(leadId, 'lead_captured', {
      email: formData.email,
      source: formData.source || 'website',
      score: intentScore
    })
  )
}

// 2. Meta CAPI
trackingPromises.push(
  fetch('/api/meta/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'Lead',
      email: formData.email,
      phone: formData.phone,
      fbp: cookies.get('_fbp'),
      fbc: cookies.get('_fbc'),
      customData: {
        value: 0, // Lead = R$ 0 (não é compra)
        currency: 'BRL'
      }
    })
  })
)

// Execute em paralelo (não bloqueia resposta)
Promise.allSettled(trackingPromises).catch(console.error)
```

**Validação:** Lead capture deve gerar evento em PostHog E Meta Event Manager.

---

### **DIA 2: Intent Scoring Básico (6-8h)**

#### **2.1 Intent Scoring Store** ⏱️ 2h
**Arquivo:** `src/lib/stores/intent-store.ts`

**Features:**
- ✅ Zustand store com 4 sinais básicos
- ✅ Score calculation (0-100)
- ✅ Qualification levels (cold/warm/hot)
- ✅ LocalStorage persistence

**Sinais Pareto (4 sinais = 80% da precisão):**
1. **Time on page** (peso 30) - quanto mais tempo, maior engajamento
2. **Form interaction** (peso 40) - começou a preencher = alta intenção
3. **Page depth** (peso 20) - quantas páginas visitou
4. **Return visit** (peso 10) - voltou ao site = interesse real

**Código:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IntentSignals {
  timeOnPage: number // segundos
  formInteraction: boolean
  pageDepth: number // páginas visitadas
  isReturnVisit: boolean
}

interface IntentState {
  signals: IntentSignals
  score: number
  qualification: 'cold' | 'warm' | 'hot'
  
  // Actions
  updateTimeOnPage: (seconds: number) => void
  trackFormInteraction: () => void
  incrementPageDepth: () => void
  calculateScore: () => void
}

const WEIGHTS = {
  timeOnPage: 30,
  formInteraction: 40,
  pageDepth: 20,
  returnVisit: 10
}

export const useIntentStore = create<IntentState>()(
  persist(
    (set, get) => ({
      signals: {
        timeOnPage: 0,
        formInteraction: false,
        pageDepth: 1,
        isReturnVisit: false
      },
      score: 0,
      qualification: 'cold',

      updateTimeOnPage: (seconds) => {
        set({ signals: { ...get().signals, timeOnPage: seconds } })
        get().calculateScore()
      },

      trackFormInteraction: () => {
        set({ signals: { ...get().signals, formInteraction: true } })
        get().calculateScore()
      },

      incrementPageDepth: () => {
        const current = get().signals.pageDepth
        set({ signals: { ...get().signals, pageDepth: current + 1 } })
        get().calculateScore()
      },

      calculateScore: () => {
        const { signals } = get()
        
        // Normalização simples (0-100)
        const timeScore = Math.min((signals.timeOnPage / 120) * 100, 100) // 2min = 100%
        const formScore = signals.formInteraction ? 100 : 0
        const depthScore = Math.min((signals.pageDepth / 5) * 100, 100) // 5 páginas = 100%
        const returnScore = signals.isReturnVisit ? 100 : 0

        const score = Math.round(
          (timeScore * WEIGHTS.timeOnPage +
           formScore * WEIGHTS.formInteraction +
           depthScore * WEIGHTS.pageDepth +
           returnScore * WEIGHTS.returnVisit) / 100
        )

        // Qualification thresholds
        let qualification: 'cold' | 'warm' | 'hot' = 'cold'
        if (score >= 60) qualification = 'hot'
        else if (score >= 30) qualification = 'warm'

        set({ score, qualification })
      }
    }),
    {
      name: 'arco-intent-score',
      partialize: (state) => ({
        signals: state.signals,
        score: state.score,
        qualification: state.qualification
      })
    }
  )
)
```

**Validação:** Abrir DevTools → Application → LocalStorage → verificar `arco-intent-score`.

---

#### **2.2 Tracking Hooks** ⏱️ 3h

**Arquivo:** `src/hooks/useIntentTracking.ts`

**Features:**
- ✅ `useTimeOnPage` - atualiza a cada 10s
- ✅ `useFormTracking` - detecta foco em inputs
- ✅ `usePageDepth` - incrementa em pathname change

**Código:**
```typescript
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useIntentStore } from '@/lib/stores/intent-store'

// Hook 1: Time on Page
export function useTimeOnPage() {
  const updateTimeOnPage = useIntentStore(state => state.updateTimeOnPage)

  useEffect(() => {
    let seconds = 0
    const interval = setInterval(() => {
      seconds += 10
      updateTimeOnPage(seconds)
    }, 10000) // Update a cada 10s

    return () => clearInterval(interval)
  }, [updateTimeOnPage])
}

// Hook 2: Form Interaction
export function useFormTracking(formRef: React.RefObject<HTMLFormElement>) {
  const trackFormInteraction = useIntentStore(state => state.trackFormInteraction)

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const handleFocus = () => {
      trackFormInteraction()
    }

    const inputs = form.querySelectorAll('input, textarea, select')
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus, { once: true })
    })

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus)
      })
    }
  }, [formRef, trackFormInteraction])
}

// Hook 3: Page Depth
export function usePageDepth() {
  const incrementPageDepth = useIntentStore(state => state.incrementPageDepth)
  const pathname = usePathname()

  useEffect(() => {
    incrementPageDepth()
  }, [pathname, incrementPageDepth])
}

// Hook agregado (use em layout)
export function useIntentTracking() {
  useTimeOnPage()
  usePageDepth()
}
```

**Uso no layout:**
```typescript
// src/app/layout.tsx
import { useIntentTracking } from '@/hooks/useIntentTracking'

export default function RootLayout({ children }) {
  useIntentTracking() // Auto-tracking global
  
  return <html>{children}</html>
}
```

**Validação:** Navegar entre páginas → score deve aumentar.

---

#### **2.3 Progressive Form Component** ⏱️ 3h
**Arquivo:** `src/components/forms/ProgressiveLeadForm.tsx`

**Features:**
- ✅ 2 steps apenas (email → phone + nome)
- ✅ Validate on blur
- ✅ Form tracking integration
- ✅ Submit com intent score

**Código:**
```typescript
'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useFormTracking } from '@/hooks/useIntentTracking'
import { useIntentStore } from '@/lib/stores/intent-store'

interface FormData {
  email: string
  phone?: string
  name?: string
}

export function ProgressiveLeadForm() {
  const [step, setStep] = useState(1)
  const formRef = useRef<HTMLFormElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  
  const intentScore = useIntentStore(state => state.score)
  const qualification = useIntentStore(state => state.qualification)
  
  useFormTracking(formRef)

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        intentScore,
        qualification
      })
    })

    if (response.ok) {
      // Success
      window.location.href = '/obrigado'
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {step === 1 && (
        <>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            placeholder="Seu melhor email"
            className="w-full px-4 py-3 border rounded-lg"
          />
          {errors.email && <span className="text-red-500 text-sm">Email inválido</span>}
          
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Continuar →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            {...register('name')}
            type="text"
            placeholder="Seu nome"
            className="w-full px-4 py-3 border rounded-lg"
          />
          
          <input
            {...register('phone')}
            type="tel"
            placeholder="WhatsApp (opcional)"
            className="w-full px-4 py-3 border rounded-lg"
          />
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Quero receber meu diagnóstico gratuito
          </button>

          <p className="text-xs text-gray-500 text-center">
            Intent Score: {intentScore} ({qualification})
          </p>
        </>
      )}
    </form>
  )
}
```

**Validação:** Preencher form → submit → verificar `intentScore` no payload do `/api/leads/capture`.

---

### **DIA 3: Integration & Testing (4-6h)**

#### **3.1 Integration Tests** ⏱️ 2h

**Testar:**
1. ✅ Cookie consent → aceitar → PostHog opt-in
2. ✅ Form interaction → score aumenta
3. ✅ Lead capture → evento em PostHog + Meta Event Manager
4. ✅ Intent score persiste no LocalStorage
5. ✅ Dual tracking funciona em paralelo

**Checklist:**
- [ ] PostHog Events tab mostra `lead_captured`
- [ ] Meta Event Manager mostra evento `Lead` com status "Received"
- [ ] Supabase `leads` table tem novo registro com `intent_score`
- [ ] LocalStorage tem `arco-intent-score` e `arco_cookie_consent`

---

#### **3.2 Error Handling** ⏱️ 2h

**Adicionar em todos os endpoints:**
```typescript
try {
  // ... logic
} catch (error) {
  console.error('[Component Name] Error:', error)
  
  // Log to PostHog (opcional)
  if (window.posthog) {
    window.posthog.capture('error', {
      component: 'LeadCapture',
      error: error.message
    })
  }
  
  return { success: false, error: error.message }
}
```

---

#### **3.3 Documentation** ⏱️ 1h

**Criar:** `PARETO_IMPLEMENTATION_COMPLETE.md`

**Conteúdo:**
- ✅ O que foi implementado
- ✅ Como testar cada feature
- ✅ ENV vars necessárias
- ✅ Known issues
- ✅ Next steps (o que ficou de fora)

---

## 📈 Métricas de Sucesso

### **KPIs Técnicos**
- ✅ Lead capture success rate > 95%
- ✅ PostHog event delivery > 98%
- ✅ Meta CAPI event delivery > 95%
- ✅ Intent score accuracy > 70% (validar manualmente)

### **KPIs de Negócio**
- ✅ Lead qualification distribution:
  - Cold: 40-50%
  - Warm: 30-40%
  - Hot: 10-20%
- ✅ Conversion rate hot leads > 25%
- ✅ Time to first response < 5 min (hot leads)

---

## 🚫 O Que Não Fazer (Anti-Pareto)

### **Evitar Rabbit Holes:**
- ❌ Não implementar Stripe (já temos MercadoPago)
- ❌ Não criar feature flags system (usa env vars)
- ❌ Não otimizar event batching (premature optimization)
- ❌ Não adicionar ML scoring (effort-based é suficiente)
- ❌ Não criar dashboard de analytics (usa PostHog UI)
- ❌ Não implementar exit intent (baixo ROI)
- ❌ Não fazer scroll velocity tracking (complexo demais)

### **Manter Simples:**
- ✅ 4 sinais de intent (não 10+)
- ✅ 2 steps no form (não 5+)
- ✅ 3 qualification levels (não 5+)
- ✅ 1 retry em Meta CAPI (não exponential backoff complexo)
- ✅ LocalStorage (não Redis ou database de eventos)

---

## 🎯 Resultado Esperado

Ao final de **3 dias**, você terá:

1. ✅ **Sistema de tracking completo** (PostHog + Meta CAPI)
2. ✅ **Intent scoring funcional** (4 sinais, 3 níveis)
3. ✅ **Cookie consent** (LGPD compliant)
4. ✅ **Progressive form** (2 steps, validates)
5. ✅ **Dual tracking** em lead capture

**Valor de negócio:**
- ✅ Leads qualificados automaticamente
- ✅ Follow-up priorizado (hot leads primeiro)
- ✅ Meta CAPI tracking (melhor performance de ads)
- ✅ PostHog analytics (funil completo)
- ✅ Compliance legal (LGPD)

**Esforço:** 18-22h de trabalho focado = **20% da arquitetura completa**.

**Impacto:** **80% do valor de negócio** (qualificação + tracking + compliance).

---

## 📋 Checklist de Implementação

### **Dia 1: Foundation**
- [ ] Cookie consent banner criado
- [ ] PostHog server library instalado
- [ ] Meta CAPI endpoint funcionando
- [ ] Lead capture API revisada
- [ ] Testes de integração básicos

### **Dia 2: Intent Scoring**
- [ ] Intent store criado
- [ ] Tracking hooks implementados
- [ ] Progressive form component criado
- [ ] Integration com lead capture
- [ ] LocalStorage persistence funcionando

### **Dia 3: Testing & Polish**
- [ ] Integration tests completos
- [ ] Error handling adicionado
- [ ] Documentation criada
- [ ] Deploy em staging
- [ ] Validação em produção

---

**Pronto para começar?** 🚀

Podemos começar pelo **Dia 1, Item 1.1: Cookie Consent Banner**. Quer que eu crie o componente agora?
