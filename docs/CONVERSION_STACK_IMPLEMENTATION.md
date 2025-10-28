# Stack de Conversão: Supabase + PostHog + Meta CAPI

**Objetivo:** Funil completo de captura → qualificação → conversão → upsell  
**Stack:** Next.js 15 + Supabase (auth/data) + PostHog (analytics/flags) + Meta CAPI  
**Foco:** Performance, LGPD-compliant, baixo CAC via server-side signals  
**Status:** Spec de implementação pronta para execução

---

## 🎯 Visão do Funil

```text
Meta Ads → Landing (consent) → Lead capture → Qualificação (scoring) → 
Tripwire checkout → Upsell (flags) → Projeto completo

Tracking dual:
- Client: PostHog JS (cookieless → cookie após consent)
- Server: PostHog Capture API + Meta CAPI (eventos críticos)
```

---

## 📊 Arquitetura de Dados

### Supabase Tables

```sql
-- leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  business_type TEXT,
  monthly_bookings TEXT,
  intent_score INTEGER DEFAULT 0,
  qualified BOOLEAN DEFAULT false,
  qualification_level TEXT, -- 'low' | 'medium' | 'high'
  source TEXT, -- utm_source
  medium TEXT, -- utm_medium
  campaign TEXT, -- utm_campaign
  user_id UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own leads"
  ON leads FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id),
  user_id UUID REFERENCES auth.users(id),
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount INTEGER, -- cents
  currency TEXT DEFAULT 'brl',
  product_type TEXT, -- 'tripwire' | 'upsell' | 'full_project'
  status TEXT, -- 'pending' | 'succeeded' | 'failed'
  metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

-- intent_events table (shadow para reconciliação)
CREATE TABLE intent_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id),
  event_type TEXT NOT NULL, -- 'scroll_50' | 'cta_click' | etc
  event_value INTEGER DEFAULT 1,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_intent_score ON leads(intent_score);
CREATE INDEX idx_purchases_stripe_pi ON purchases(stripe_payment_intent_id);
CREATE INDEX idx_intent_events_lead_id ON intent_events(lead_id);
```

### Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # Server-side only

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
POSTHOG_PERSONAL_API_KEY=phx_... # Server-side only

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Meta CAPI
META_PIXEL_ID=123456789
META_CAPI_ACCESS_TOKEN=EAA...
META_TEST_EVENT_CODE=TEST123 # Só em dev

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🍪 Consentimento de Cookies (LGPD-Compliant)

### Cookie Banner Component

```typescript
// components/cookie-consent.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePostHog } from 'posthog-js/react'

export function CookieConsent() {
  const posthog = usePostHog()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if user already made choice
    const consent = localStorage.getItem('cookie-consent')
    
    if (!consent) {
      setShow(true)
    } else if (consent === 'accepted') {
      // Already accepted - enable full tracking
      enableFullTracking()
    }
  }, [])

  const enableFullTracking = () => {
    if (!posthog) return

    // Switch from cookieless to cookie-based persistence
    posthog.set_config({
      persistence: 'localStorage+cookie',
      bootstrap: {
        distinctID: posthog.get_distinct_id(),
      },
    })

    // Track consent
    posthog.capture('consent_granted', {
      consent_type: 'cookies_analytics',
    })
  }

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    enableFullTracking()
    setShow(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    
    // Keep cookieless mode
    posthog?.capture('consent_rejected')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm">
          Usamos cookies para melhorar sua experiência e analisar o uso do site. 
          <a href="/politica-privacidade" className="underline ml-1">
            Saiba mais
          </a>
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-white rounded hover:bg-white/10"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-teal-600 rounded hover:bg-teal-700"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
```

### PostHog Provider (Cookieless Initial)

```typescript
// providers/posthog-provider.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize with cookieless mode (LGPD-safe)
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      persistence: 'memory', // Cookieless até consent
      autocapture: true,
      capture_pageview: true,
      capture_pageleave: true,
      
      // Performance
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
        }
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
```

---

## 🔐 Supabase Auth (SSR com Cookies)

### Middleware

```typescript
// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Supabase Client (Server)

```typescript
// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server component
          }
        },
      },
    }
  )
}
```

### Auth Sync with PostHog

```typescript
// hooks/use-auth-sync.ts
'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { createClient } from '@/lib/supabase/client'

export function useAuthSync() {
  const posthog = usePostHog()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        posthog?.identify(session.user.id, {
          email: session.user.email,
          created_at: session.user.created_at,
        })
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Identify user in PostHog
        posthog?.identify(session.user.id, {
          email: session.user.email,
          created_at: session.user.created_at,
        })

        // Alias anonymous session to identified
        posthog?.alias(session.user.id)
      }

      if (event === 'SIGNED_OUT') {
        posthog?.reset()
      }
    })

    return () => subscription.unsubscribe()
  }, [posthog, supabase])
}
```

---

## 📝 Lead Capture + Intent Scoring

### Lead Form Component

```typescript
// components/lead-form.tsx
'use client'

import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'

interface LeadFormProps {
  qualificationLevel: 'low' | 'medium' | 'high'
  intentScore: number
}

export function LeadForm({ qualificationLevel, intentScore }: LeadFormProps) {
  const posthog = usePostHog()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    businessType: '',
    monthlyBookings: '',
  })

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Submit to server (server-side tracking)
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          intentScore,
          qualificationLevel,
          source: posthog?.get_property('$initial_utm_source'),
          medium: posthog?.get_property('$initial_utm_medium'),
          campaign: posthog?.get_property('$initial_utm_campaign'),
        }),
      })

      if (!response.ok) throw new Error('Failed to submit lead')

      const { leadId } = await response.json()

      // Client-side tracking (backup)
      posthog?.capture('lead_submitted', {
        lead_id: leadId,
        intent_score: intentScore,
        qualification_level: qualificationLevel,
        form_steps: step,
      })

      // Redirect to thank you page
      window.location.href = `/obrigado?lead=${leadId}`
    } catch (error) {
      console.error('Error submitting lead:', error)
      alert('Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Step 1: Email (SEMPRE)
  if (step === 1) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          qualificationLevel === 'high' ? handleSubmit() : setStep(2)
        }}
        className="space-y-4 max-w-md mx-auto"
      >
        <h3 className="text-2xl font-bold">
          {qualificationLevel === 'high'
            ? '✨ Receba sua análise personalizada'
            : '📊 Descubra seu potencial'}
        </h3>

        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Seu melhor email"
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Enviando...' : qualificationLevel === 'high' ? 'Receber Agora' : 'Continuar'}
        </button>

        <p className="text-sm text-gray-500 text-center">2.300+ salões já receberam</p>
      </form>
    )
  }

  // Step 2: Nome + Phone (medium e low)
  if (step === 2) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          qualificationLevel === 'medium' ? handleSubmit() : setStep(3)
        }}
        className="space-y-4 max-w-md mx-auto"
      >
        <h3 className="text-2xl font-bold">Como podemos te chamar?</h3>

        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Seu nome"
          className="w-full px-4 py-3 border rounded-lg"
        />

        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="WhatsApp (opcional)"
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Enviando...' : qualificationLevel === 'medium' ? 'Receber Análise' : 'Continuar'}
        </button>
      </form>
    )
  }

  // Step 3: Qualification (só para low)
  if (step === 3) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="space-y-4 max-w-md mx-auto"
      >
        <h3 className="text-2xl font-bold">Últimas informações</h3>

        <select
          required
          value={formData.businessType}
          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Tipo de negócio</option>
          <option value="salon">Salão de Beleza</option>
          <option value="barber">Barbearia</option>
          <option value="studio">Studio</option>
          <option value="clinic">Clínica Estética</option>
        </select>

        <select
          required
          value={formData.monthlyBookings}
          onChange={(e) => setFormData({ ...formData, monthlyBookings: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Agendamentos por mês</option>
          <option value="0-50">Até 50</option>
          <option value="50-100">50-100</option>
          <option value="100-200">100-200</option>
          <option value="200+">Mais de 200</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Receber Análise Completa'}
        </button>
      </form>
    )
  }

  return null
}
```

### API Route: Lead Submission

```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { trackServerEvent } from '@/lib/posthog/server'
import { trackMetaEvent } from '@/lib/meta/capi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      phone,
      businessType,
      monthlyBookings,
      intentScore,
      qualificationLevel,
      source,
      medium,
      campaign,
    } = body

    // Validate
    if (!email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Insert lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        email,
        name,
        phone,
        business_type: businessType,
        monthly_bookings: monthlyBookings,
        intent_score: intentScore || 0,
        qualified: qualificationLevel !== 'low',
        qualification_level: qualificationLevel,
        source,
        medium,
        campaign,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
    }

    // Track to PostHog (server-side)
    await trackServerEvent({
      distinctId: email, // Use email como ID antes de auth
      event: 'lead_submitted',
      properties: {
        lead_id: lead.id,
        email,
        name,
        intent_score: intentScore,
        qualification_level: qualificationLevel,
        business_type: businessType,
        monthly_bookings: monthlyBookings,
        $set: {
          email,
          name,
          intent_score: intentScore,
          qualification_level: qualificationLevel,
        },
      },
    })

    // Track to Meta CAPI (server-side)
    await trackMetaEvent({
      event_name: 'Lead',
      event_id: `lead_${lead.id}`, // Deduplication with pixel
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        em: [email], // Will be hashed by lib
        ph: phone ? [phone] : undefined,
        client_ip_address: request.headers.get('x-forwarded-for') || request.ip,
        client_user_agent: request.headers.get('user-agent'),
      },
      custom_data: {
        intent_score: intentScore,
        qualification_level: qualificationLevel,
        business_type: businessType,
      },
    })

    return NextResponse.json({ leadId: lead.id })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 📍 PostHog Server-Side Tracking

```typescript
// lib/posthog/server.ts
import { PostHog } from 'posthog-node'

const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
})

interface TrackEventParams {
  distinctId: string
  event: string
  properties?: Record<string, any>
}

export async function trackServerEvent({ distinctId, event, properties }: TrackEventParams) {
  try {
    posthogClient.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        $lib: 'server',
      },
    })

    // Flush immediately (important for serverless)
    await posthogClient.flush()
  } catch (error) {
    console.error('PostHog server tracking error:', error)
  }
}

export async function identifyUser(distinctId: string, properties: Record<string, any>) {
  try {
    posthogClient.identify({
      distinctId,
      properties,
    })

    await posthogClient.flush()
  } catch (error) {
    console.error('PostHog identify error:', error)
  }
}

export async function setPersonProperties(distinctId: string, properties: Record<string, any>) {
  try {
    posthogClient.capture({
      distinctId,
      event: '$set',
      properties: {
        $set: properties,
      },
    })

    await posthogClient.flush()
  } catch (error) {
    console.error('PostHog set properties error:', error)
  }
}
```

---

## 🎯 Meta Conversions API (CAPI)

```typescript
// lib/meta/capi.ts
import crypto from 'crypto'

interface MetaEvent {
  event_name: string
  event_id: string // For deduplication with pixel
  event_time: number // Unix timestamp
  action_source: 'website' | 'app' | 'email'
  user_data: {
    em?: string[] // Email (will be hashed)
    ph?: string[] // Phone (will be hashed)
    client_ip_address?: string
    client_user_agent?: string
    fbc?: string // Facebook click ID
    fbp?: string // Facebook pixel ID
  }
  custom_data?: Record<string, any>
  event_source_url?: string
}

function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

export async function trackMetaEvent(event: MetaEvent) {
  try {
    const pixelId = process.env.META_PIXEL_ID!
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN!
    const testEventCode = process.env.META_TEST_EVENT_CODE // Only in dev

    // Hash PII
    const userData: any = { ...event.user_data }
    if (userData.em) {
      userData.em = userData.em.map(hashData)
    }
    if (userData.ph) {
      userData.ph = userData.ph.map(hashData)
    }

    const payload = {
      data: [
        {
          ...event,
          user_data: userData,
        },
      ],
      test_event_code: testEventCode || undefined,
    }

    const url = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta CAPI error:', result)
      throw new Error(`Meta CAPI failed: ${result.error?.message}`)
    }

    // Log EMQ (Event Match Quality) in dev
    if (process.env.NODE_ENV === 'development') {
      console.log('Meta CAPI response:', result)
    }

    return result
  } catch (error) {
    console.error('Meta CAPI tracking failed:', error)
    // Don't throw - fail silently to not break user flow
  }
}

// Helper to get Facebook cookies from request
export function getFacebookCookies(request: Request) {
  const cookies = request.headers.get('cookie') || ''
  
  const fbcMatch = cookies.match(/fbc=([^;]+)/)
  const fbpMatch = cookies.match(/fbp=([^;]+)/)

  return {
    fbc: fbcMatch?.[1],
    fbp: fbpMatch?.[1],
  }
}
```

---

## 💳 Stripe Tripwire Checkout

### Checkout API Route

```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { leadId, priceId } = await request.json()

    const supabase = await createClient()

    // Get lead
    const { data: lead } = await supabase.from('leads').select('*').eq('id', leadId).single()

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: lead.email,
      line_items: [
        {
          price: priceId || 'price_tripwire', // Your Stripe price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=true`,
      metadata: {
        lead_id: leadId,
        product_type: 'tripwire',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
```

### Stripe Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { trackServerEvent } from '@/lib/posthog/server'
import { trackMetaEvent } from '@/lib/meta/capi'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const supabase = await createClient()

    // Handle payment_intent.succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      })

      if (session.data.length === 0) return NextResponse.json({ received: true })

      const checkoutSession = session.data[0]
      const leadId = checkoutSession.metadata?.lead_id
      const productType = checkoutSession.metadata?.product_type || 'tripwire'

      // Get lead
      const { data: lead } = await supabase.from('leads').select('*').eq('id', leadId).single()

      if (!lead) {
        console.error('Lead not found:', leadId)
        return NextResponse.json({ received: true })
      }

      // Save purchase
      const { data: purchase } = await supabase
        .from('purchases')
        .insert({
          lead_id: leadId,
          stripe_payment_intent_id: paymentIntent.id,
          stripe_customer_id: paymentIntent.customer as string,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          product_type: productType,
          status: 'succeeded',
          metadata: {
            checkout_session_id: checkoutSession.id,
          },
        })
        .select()
        .single()

      // Track to PostHog
      await trackServerEvent({
        distinctId: lead.email,
        event: 'tripwire_purchased',
        properties: {
          lead_id: leadId,
          purchase_id: purchase?.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          product_type: productType,
          $set: {
            tripwire_customer: true,
            total_spent: paymentIntent.amount / 100,
          },
        },
      })

      // Track to Meta CAPI
      await trackMetaEvent({
        event_name: 'Purchase',
        event_id: `purchase_${purchase?.id}`,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          em: [lead.email],
          ph: lead.phone ? [lead.phone] : undefined,
        },
        custom_data: {
          value: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          content_type: 'product',
          content_name: productType,
        },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
```

---

## 🚀 Feature Flags & Experiments

### Using PostHog Flags

```typescript
// lib/posthog/flags.ts
import { PostHog } from 'posthog-node'

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
})

export async function getFeatureFlag(distinctId: string, flagKey: string): Promise<boolean | string> {
  try {
    const isEnabled = await posthog.getFeatureFlag(flagKey, distinctId)
    return isEnabled ?? false
  } catch (error) {
    console.error('Feature flag error:', error)
    return false
  }
}

export async function getAllFeatureFlags(distinctId: string): Promise<Record<string, boolean | string>> {
  try {
    const flags = await posthog.getAllFlags(distinctId)
    return flags ?? {}
  } catch (error) {
    console.error('Get all flags error:', error)
    return {}
  }
}
```

### Server-Side Flag Usage

```typescript
// app/upsell/page.tsx
import { createClient } from '@/lib/supabase/server'
import { getFeatureFlag } from '@/lib/posthog/flags'
import { redirect } from 'next/navigation'

export default async function UpsellPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user purchased tripwire
  const { data: purchase } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_type', 'tripwire')
    .eq('status', 'succeeded')
    .single()

  if (!purchase) {
    redirect('/checkout')
  }

  // Get feature flag for upsell variant
  const upsellVariant = await getFeatureFlag(user.id, 'upsell-price-test')

  // Show different pricing based on experiment
  const price = upsellVariant === 'high' ? 2997 : 1997

  return (
    <div>
      <h1>Upgrade para Projeto Completo</h1>
      <p className="text-4xl font-bold">R$ {price}</p>
      {/* Rest of upsell page */}
    </div>
  )
}
```

---

## 📊 Tracking Implementation Checklist

### Client-Side (PostHog JS)

```typescript
// Key events to track on client

// Page views (auto-captured)
posthog.capture('$pageview')

// CTA interactions
posthog.capture('cta_clicked', {
  cta_type: 'primary' | 'secondary',
  location: 'hero' | 'pricing' | 'footer',
})

// Scroll depth
posthog.capture('scroll_depth', {
  depth: 25 | 50 | 75 | 90,
})

// Calculator usage
posthog.capture('calculator_used', {
  monthly_bookings: number,
  estimated_noshow: number,
})

// Pricing viewed
posthog.capture('pricing_viewed', {
  time_on_page: number, // seconds
})
```

### Server-Side (PostHog + Meta CAPI)

```typescript
// Critical events (server-side only)

// Lead submission
trackServerEvent({ event: 'lead_submitted', ... })
trackMetaEvent({ event_name: 'Lead', ... })

// Tripwire purchase
trackServerEvent({ event: 'tripwire_purchased', ... })
trackMetaEvent({ event_name: 'Purchase', ... })

// Upsell viewed
trackServerEvent({ event: 'upsell_viewed', ... })
trackMetaEvent({ event_name: 'ViewContent', ... })

// Upsell purchased
trackServerEvent({ event: 'upsell_purchased', ... })
trackMetaEvent({ event_name: 'Purchase', ... })
```

---

## 🎯 Implementation Roadmap

### Week 1: Foundation

**Day 1-2: Core Setup**

- [ ] Create Supabase tables (leads, purchases, intent_events)
- [ ] Setup RLS policies
- [ ] Configure environment variables
- [ ] Install dependencies: `posthog-js`, `posthog-node`, `@supabase/ssr`, `stripe`

**Day 3-4: Auth & Tracking**

- [ ] Implement Supabase SSR auth (middleware + server client)
- [ ] Setup PostHog provider (cookieless mode)
- [ ] Create cookie consent component
- [ ] Test auth sync with PostHog identify

**Day 5: Server-Side Tracking**

- [ ] Create PostHog server lib (`trackServerEvent`, `identifyUser`)
- [ ] Create Meta CAPI lib (`trackMetaEvent`, `getFacebookCookies`)
- [ ] Test both tracking methods

### Week 2: Lead Capture & Qualification

**Day 1-2: Lead Form**

- [ ] Implement intent scoring store (from previous doc)
- [ ] Create progressive disclosure form (3 levels)
- [ ] Build `/api/leads` endpoint
- [ ] Test server-side tracking on submission

**Day 3-4: Meta CAPI Integration**

- [ ] Setup Meta Business Manager + Pixel
- [ ] Get CAPI access token
- [ ] Implement deduplication with `event_id`
- [ ] Test events in Meta Events Manager
- [ ] Monitor EMQ (Event Match Quality)

**Day 5: Qualification Logic**

- [ ] Implement intent scoring calculation
- [ ] Create PostHog cohorts (high/medium/low intent)
- [ ] Setup feature flags for personalization
- [ ] Test flag evaluation server-side

### Week 3: Checkout & Upsell

**Day 1-2: Stripe Integration**

- [ ] Create Stripe products & prices
- [ ] Build `/api/checkout` endpoint
- [ ] Implement webhook handler (`/api/webhooks/stripe`)
- [ ] Test full payment flow (test mode)

**Day 3-4: Upsell Flow**

- [ ] Create upsell page (gated by purchase)
- [ ] Setup A/B test in PostHog (price variants)
- [ ] Implement server-side flag evaluation
- [ ] Track upsell funnel

**Day 5: QA & Polish**

- [ ] End-to-end test: ad → landing → lead → purchase → upsell
- [ ] Verify all events in PostHog
- [ ] Verify all events in Meta Events Manager
- [ ] Check EMQ scores
- [ ] Deploy to production

### Week 4: Optimization

**Data Analysis:**

- [ ] Analyze lead quality by source/medium/campaign
- [ ] Compare EMQ across different events
- [ ] Monitor conversion rates by cohort
- [ ] Review A/B test results

**Optimization:**

- [ ] Adjust intent scoring weights based on data
- [ ] Optimize Meta campaign based on CAPI data
- [ ] Refine feature flags based on experiments
- [ ] Scale winning variants

---

## 🔍 Monitoring & Debugging

### PostHog Debug

```typescript
// Enable in development
if (process.env.NODE_ENV === 'development') {
  posthog.debug()
}

// Check distinct ID
console.log('PostHog ID:', posthog.get_distinct_id())

// Check feature flags
console.log('Flags:', await posthog.getAllFlags())
```

### Meta CAPI Debug

- Use `test_event_code` in dev environment
- Monitor Events Manager → Test Events
- Check Event Match Quality (EMQ) scores
- Verify deduplication is working (same `event_id` from pixel and CAPI)

### Supabase Debug

```typescript
// Enable query logging in dev
const supabase = createClient()
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session)
})
```

---

## 📈 Expected Results

### Conversion Funnel

```text
1,000 visits (Meta Ads)
  ↓ 40% engagement (scroll 50%+)
400 engaged visitors
  ↓ 30% lead capture
120 leads submitted
  ↓ 25% tripwire conversion
30 tripwire purchases
  ↓ 20% upsell conversion
6 full project sales

Metrics:
- Lead rate: 12% (better than 8-10% typical)
- Tripwire conversion: 25% (high intent)
- Upsell conversion: 20% (premium positioning)
- Overall revenue per visit: R$ 50-80
```

### Meta CAPI Impact

**Expected improvements:**

- **CPL reduction:** 15-30% (better signal = better optimization)
- **EMQ scores:** >7/10 (high match quality with email + phone)
- **Attribution accuracy:** +40% (less loss from blockers)
- **ROAS improvement:** +25-50% (better optimization)

---

## ✅ Success Criteria

**Technical:**

- [ ] 100% of critical events tracked server-side
- [ ] EMQ > 7 on all Meta events
- [ ] <100ms P95 latency on API routes
- [ ] Zero auth flicker (SSR cookies working)
- [ ] Feature flags responding <50ms

**Business:**

- [ ] Lead capture rate > 10%
- [ ] Tripwire conversion > 20%
- [ ] Upsell conversion > 15%
- [ ] CAC < 50% of LTV
- [ ] Positive ROAS on Meta Ads

---

**Status:** ✅ Spec completa e pronta para implementação  
**Complexity:** Média-alta (3 semanas implementação)  
**Dependencies:** Supabase, PostHog, Stripe, Meta Business Manager  
**Expected ROI:** CAC -20-30%, Revenue +40-60% vs pixel-only tracking
