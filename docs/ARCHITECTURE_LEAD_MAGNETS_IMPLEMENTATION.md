# Arquitetura de Implementação - Lead Magnets & Tripwires

**Análise Multi-Disciplinar:** Frontend + Backend + UI/UX + Database + TypeScript + AI
**Objetivo:** Implementar Calculadora de ROI + Tripwire R$ 29 para reduzir CAC
**Timeline:** 4 semanas (MVP) → 8 semanas (completo)

---

## 🏗️ Visão Arquitetural (Backend Architect)

### Stack Tecnológica Recomendada

```typescript
// Core
Framework: Next.js 15 (atual) ✅
Language: TypeScript 5+ ✅
Runtime: Node.js 20+ ✅

// Database
Primary: Supabase PostgreSQL ✅
Cache: Redis (Upstash) - para cálculos/rate limiting
Queue: Vercel Queue ou Supabase Realtime

// APIs & Services
Analytics: PostHog ✅ + Meta CAPI ✅
Email: Resend ✅
Payment: Stripe (recomendado) ou Mercado Pago (atual)
AI: OpenAI GPT-4 (gerador de scripts) - futuro

// Frontend
UI: Tailwind CSS ✅ + shadcn/ui
Forms: React Hook Form + Zod ✅
State: React Context + localStorage
Charts: Recharts ou Chart.js
```

### Princípios Arquiteturais

**1. Separation of Concerns**
```
/src
  /app
    /calculadora          # Feature: Calculadora ROI
    /checkout             # Feature: Tripwire checkout
    /api
      /calculadora        # Backend logic
      /checkout           # Payment processing
  /lib
    /calculadora          # Business logic isolada
    /pricing              # Pricing models
    /analytics            # Tracking centralizado
```

**2. Type Safety First (TypeScript Pro)**
- Strict mode enabled ✅
- No `any` types
- Zod schemas para validação runtime
- Database types gerados (Supabase) ✅

**3. Progressive Enhancement**
- Funciona sem JavaScript (forms nativos)
- Otimização após MVP
- Performance budget: < 3s TTI

---

## 📊 Database Schema (Database Architect)

### Novas Tabelas Necessárias

```sql
-- ============================================
-- CALCULADORA DE ROI
-- ============================================

CREATE TABLE calculator_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User data (partial - pre-lead)
  email VARCHAR(255),
  company_name VARCHAR(255),
  company_type VARCHAR(50), -- salon, barber, studio

  -- Input metrics
  monthly_appointments INTEGER NOT NULL,
  no_show_rate DECIMAL(5,2) NOT NULL, -- 0.00 to 100.00
  avg_ticket DECIMAL(10,2) NOT NULL,
  uses_marketplace BOOLEAN DEFAULT false,
  marketplace_name VARCHAR(50), -- fresha, agendor, etc

  -- Calculated outputs (cache)
  monthly_revenue_lost DECIMAL(10,2),
  marketplace_fee_cost DECIMAL(10,2),
  potential_recovery DECIMAL(10,2),
  percentile_rank INTEGER, -- 1-100 vs benchmarks

  -- Tracking
  session_id VARCHAR(255),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- Conversion tracking
  converted_to_lead BOOLEAN DEFAULT false,
  converted_to_tripwire BOOLEAN DEFAULT false,
  converted_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_calculator_email ON calculator_submissions(email);
CREATE INDEX idx_calculator_session ON calculator_submissions(session_id);
CREATE INDEX idx_calculator_converted ON calculator_submissions(converted_to_lead);
CREATE INDEX idx_calculator_created ON calculator_submissions(created_at DESC);

-- ============================================
-- TRIPWIRE PURCHASES
-- ============================================

CREATE TABLE tripwire_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Customer
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),

  -- Product
  product_id VARCHAR(100) NOT NULL, -- checklist-29, curso-97, etc
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,

  -- Payment
  payment_provider VARCHAR(50), -- stripe, mercadopago
  payment_id VARCHAR(255), -- external ID
  payment_status VARCHAR(50), -- pending, paid, failed, refunded
  payment_date TIMESTAMP,

  -- Order bumps & upsells
  order_bumps JSONB DEFAULT '[]', -- [{product, price, accepted}]
  total_amount DECIMAL(10,2) NOT NULL,

  -- Source tracking
  source_calculator_id UUID REFERENCES calculator_submissions(id),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- Conversion to main offer
  upgraded_to_main BOOLEAN DEFAULT false,
  upgraded_at TIMESTAMP,
  main_offer_value DECIMAL(10,2),

  -- Fulfillment
  fulfillment_status VARCHAR(50), -- pending, delivered, accessed
  download_link VARCHAR(500),
  access_expires_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tripwire_email ON tripwire_purchases(email);
CREATE INDEX idx_tripwire_payment_status ON tripwire_purchases(payment_status);
CREATE INDEX idx_tripwire_source ON tripwire_purchases(source_calculator_id);
CREATE INDEX idx_tripwire_created ON tripwire_purchases(created_at DESC);

-- ============================================
-- BENCHMARKS (seed data)
-- ============================================

CREATE TABLE industry_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  company_type VARCHAR(50) NOT NULL, -- salon, barber, studio
  metric_name VARCHAR(100) NOT NULL, -- no_show_rate, avg_ticket, etc

  -- Percentiles
  p10 DECIMAL(10,2),
  p25 DECIMAL(10,2),
  p50 DECIMAL(10,2), -- median
  p75 DECIMAL(10,2),
  p90 DECIMAL(10,2),

  -- Sample info
  sample_size INTEGER,
  last_updated TIMESTAMP DEFAULT NOW(),

  UNIQUE(company_type, metric_name)
);

-- Seed initial data
INSERT INTO industry_benchmarks (company_type, metric_name, p10, p25, p50, p75, p90, sample_size) VALUES
('salon', 'no_show_rate', 8.0, 15.0, 25.0, 35.0, 45.0, 2300),
('salon', 'avg_ticket', 80.0, 120.0, 180.0, 250.0, 350.0, 2300),
('barber', 'no_show_rate', 10.0, 18.0, 28.0, 38.0, 50.0, 850),
('barber', 'avg_ticket', 40.0, 60.0, 85.0, 110.0, 150.0, 850);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE calculator_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tripwire_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_benchmarks ENABLE ROW LEVEL SECURITY;

-- Calculator: Public insert, service role read
CREATE POLICY "Allow public insert calculator" ON calculator_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role read calculator" ON calculator_submissions
  FOR SELECT USING (auth.role() = 'service_role');

-- Tripwire: Service role only
CREATE POLICY "Service role all tripwire" ON tripwire_purchases
  FOR ALL USING (auth.role() = 'service_role');

-- Benchmarks: Public read only
CREATE POLICY "Allow public read benchmarks" ON industry_benchmarks
  FOR SELECT USING (true);
```

### Migration Strategy

```bash
# Create migration file
supabase/migrations/20251027000000_add_calculator_tripwire.sql

# Apply to remote
npx supabase db push

# Generate TypeScript types
npx supabase gen types typescript --remote > src/types/database.types.ts
```

---

## 🎨 UI/UX Design System (UI/UX Designer)

### Calculadora de ROI - Flow

```
┌─────────────────────────────────────────┐
│   LANDING: Calculadora de Benchmarking  │
│                                         │
│   [Hero] Descubra quanto você está     │
│          perdendo por mês               │
│                                         │
│   [Form - Step 1/3]                     │
│   • Tipo de negócio (radio buttons)    │
│   • Agendamentos/mês (slider)           │
│                                         │
│   [CTA] Ver minha análise →             │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│   STEP 2/3: Performance Atual           │
│                                         │
│   • No-show rate % (slider + tooltip)   │
│   • Ticket médio R$ (input)             │
│   • Usa marketplace? (toggle)           │
│     → Se sim: Qual? (select)            │
│                                         │
│   [CTA] Calcular resultados →           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│   STEP 3/3: Captura Email               │
│                                         │
│   [Mini-resultado preview]              │
│   Você está perdendo ~R$ X.XXX/mês     │
│                                         │
│   • Nome (input)                        │
│   • Email (input)                       │
│   • WhatsApp (optional)                 │
│                                         │
│   [CTA] Receber análise completa →      │
│   [Social Proof] 2.300+ salões          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│   RESULTS PAGE                          │
│                                         │
│   [Hero Card] Seu Relatório             │
│   ┌───────────────────────────────────┐ │
│   │ 💰 Receita Perdida                │ │
│   │ R$ X.XXX/mês (no-show)            │ │
│   │                                   │ │
│   │ 💸 Custo do Pedágio               │ │
│   │ R$ X.XXX/mês (marketplace)        │ │
│   │                                   │ │
│   │ 📊 Seu Ranking                    │ │
│   │ Você está no percentil XX         │ │
│   │ [Progress bar visual]             │ │
│   │                                   │ │
│   │ 🎯 Potencial de Recuperação       │ │
│   │ R$ X.XXX/mês (+XX%)               │ │
│   └───────────────────────────────────┘ │
│                                         │
│   [Benchmarks Table]                    │
│   Métrica      | Você | Top 25% | Top 10%│
│   No-show      | XX%  | 15%     | 8%     │
│   Ticket       | R$XX | R$250   | R$350  │
│                                         │
│   [CTA Principal] 🎁 OFERTA ESPECIAL    │
│   Receba o Checklist de Implementação  │
│   por apenas R$ 29 (valor R$ 197)      │
│   [Button] Quero o checklist →          │
│                                         │
│   [Secondary CTA]                       │
│   Agendar consultoria gratuita →       │
└─────────────────────────────────────────┘
```

### Design Tokens (Tailwind)

```typescript
// tailwind.config.ts extension
module.exports = {
  theme: {
    extend: {
      colors: {
        calculator: {
          primary: '#14b8a6', // teal-500
          secondary: '#0d9488', // teal-600
          danger: '#ef4444', // red-500 (receita perdida)
          success: '#10b981', // green-500 (potencial)
        }
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'count-up': 'countUp 1s ease-out',
      }
    }
  }
}
```

### Component Architecture (Frontend Developer)

```typescript
// src/app/calculadora/page.tsx
export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CalculadoraFlow />
    </div>
  )
}

// src/components/calculadora/CalculadoraFlow.tsx
'use client'

import { useState } from 'react'
import { Step1Business } from './steps/Step1Business'
import { Step2Performance } from './steps/Step2Performance'
import { Step3Contact } from './steps/Step3Contact'
import { ResultsDisplay } from './ResultsDisplay'
import { useCalculadoraTracking } from '@/hooks/useCalculadoraTracking'

export function CalculadoraFlow() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<CalculatorData>({})
  const { trackStep, trackResult } = useCalculadoraTracking()

  const handleStepComplete = (stepData: Partial<CalculatorData>) => {
    setData(prev => ({ ...prev, ...stepData }))
    trackStep(step, stepData)
    setStep(prev => prev + 1)
  }

  if (step === 4) {
    return <ResultsDisplay data={data} onTripwireOffer={handleTripwireOffer} />
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <ProgressBar currentStep={step} totalSteps={3} />

      {step === 1 && <Step1Business onComplete={handleStepComplete} />}
      {step === 2 && <Step2Performance data={data} onComplete={handleStepComplete} />}
      {step === 3 && <Step3Contact data={data} onComplete={handleStepComplete} />}
    </div>
  )
}
```

---

## ⚙️ Business Logic (Fullstack Developer)

### Cálculo de ROI - Core Algorithm

```typescript
// src/lib/calculadora/roi-calculator.ts

export interface CalculatorInput {
  companyType: 'salon' | 'barber' | 'studio'
  monthlyAppointments: number
  noShowRate: number // 0-100
  avgTicket: number
  usesMarketplace: boolean
  marketplaceName?: string
}

export interface CalculatorOutput {
  monthlyRevenueLost: number
  marketplaceFees: number
  totalLoss: number
  potentialRecovery: number
  percentileRank: number
  benchmarks: {
    current: BenchmarkMetrics
    top25: BenchmarkMetrics
    top10: BenchmarkMetrics
  }
}

interface BenchmarkMetrics {
  noShowRate: number
  avgTicket: number
  monthlyRevenue: number
}

export class ROICalculator {
  constructor(
    private benchmarks: Map<string, IndustryBenchmark>,
    private marketplaceFees: Map<string, FeeStructure>
  ) {}

  calculate(input: CalculatorInput): CalculatorOutput {
    // 1. Calculate base metrics
    const monthlyRevenue = input.monthlyAppointments * input.avgTicket
    const noShowCount = input.monthlyAppointments * (input.noShowRate / 100)
    const monthlyRevenueLost = noShowCount * input.avgTicket

    // 2. Calculate marketplace fees
    let marketplaceFees = 0
    if (input.usesMarketplace && input.marketplaceName) {
      const feeStructure = this.marketplaceFees.get(input.marketplaceName)
      marketplaceFees = this.calculateMarketplaceFees(
        input.monthlyAppointments,
        input.avgTicket,
        feeStructure
      )
    }

    // 3. Calculate total loss
    const totalLoss = monthlyRevenueLost + marketplaceFees

    // 4. Get benchmarks for company type
    const benchmarkData = this.benchmarks.get(input.companyType)

    // 5. Calculate percentile rank
    const percentileRank = this.calculatePercentile(
      input.noShowRate,
      benchmarkData.noShowRate
    )

    // 6. Calculate potential recovery
    const top25NoShow = benchmarkData.noShowRate.p25
    const improvementPotential = (input.noShowRate - top25NoShow) / 100
    const potentialRecovery = improvementPotential * monthlyRevenue

    // 7. Build benchmark comparison
    const benchmarks = {
      current: {
        noShowRate: input.noShowRate,
        avgTicket: input.avgTicket,
        monthlyRevenue: monthlyRevenue - totalLoss
      },
      top25: {
        noShowRate: benchmarkData.noShowRate.p25,
        avgTicket: benchmarkData.avgTicket.p75,
        monthlyRevenue: this.calculateRevenue(
          input.monthlyAppointments,
          benchmarkData.avgTicket.p75,
          benchmarkData.noShowRate.p25
        )
      },
      top10: {
        noShowRate: benchmarkData.noShowRate.p10,
        avgTicket: benchmarkData.avgTicket.p90,
        monthlyRevenue: this.calculateRevenue(
          input.monthlyAppointments,
          benchmarkData.avgTicket.p90,
          benchmarkData.noShowRate.p10
        )
      }
    }

    return {
      monthlyRevenueLost,
      marketplaceFees,
      totalLoss,
      potentialRecovery,
      percentileRank,
      benchmarks
    }
  }

  private calculateMarketplaceFees(
    appointments: number,
    avgTicket: number,
    feeStructure: FeeStructure
  ): number {
    // Example: Fresha = 20% or minimum $6 USD (~R$ 30)
    const percentageFee = appointments * avgTicket * feeStructure.percentage
    const minimumFee = appointments * feeStructure.minimumPerBooking

    return Math.max(percentageFee, minimumFee)
  }

  private calculatePercentile(value: number, distribution: Percentiles): number {
    // Interpolate between percentiles
    if (value <= distribution.p10) return 90
    if (value <= distribution.p25) return 75
    if (value <= distribution.p50) return 50
    if (value <= distribution.p75) return 25
    if (value <= distribution.p90) return 10
    return 5
  }

  private calculateRevenue(
    appointments: number,
    avgTicket: number,
    noShowRate: number
  ): number {
    const completedAppointments = appointments * (1 - noShowRate / 100)
    return completedAppointments * avgTicket
  }
}

// Usage in API route
export async function calculateROI(input: CalculatorInput): Promise<CalculatorOutput> {
  const benchmarks = await getBenchmarksFromDB()
  const fees = getMarketplaceFees()

  const calculator = new ROICalculator(benchmarks, fees)
  return calculator.calculate(input)
}
```

### Marketplace Fee Structures

```typescript
// src/lib/calculadora/marketplace-fees.ts

export interface FeeStructure {
  name: string
  percentage: number // 0.0 to 1.0
  minimumPerBooking: number
  currency: 'BRL' | 'USD'
}

export const MARKETPLACE_FEES: Record<string, FeeStructure> = {
  fresha: {
    name: 'Fresha',
    percentage: 0.20, // 20%
    minimumPerBooking: 30, // ~$6 USD converted
    currency: 'BRL'
  },
  agendor: {
    name: 'Agendor',
    percentage: 0.15,
    minimumPerBooking: 0,
    currency: 'BRL'
  },
  beleza_na_web: {
    name: 'Beleza na Web',
    percentage: 0.18,
    minimumPerBooking: 0,
    currency: 'BRL'
  },
  // Add more as needed
}

export function getMarketplaceFees(): Map<string, FeeStructure> {
  return new Map(Object.entries(MARKETPLACE_FEES))
}
```

---

## 🔌 API Implementation (Backend Architect)

### Calculator API Endpoint

```typescript
// src/app/api/calculadora/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculateROI } from '@/lib/calculadora/roi-calculator'
import { saveCalculatorSubmission } from '@/lib/calculadora/db'
import { trackCalculatorConversion } from '@/lib/analytics/tracking'

// Validation schema
const CalculatorSchema = z.object({
  companyType: z.enum(['salon', 'barber', 'studio']),
  monthlyAppointments: z.number().int().min(10).max(10000),
  noShowRate: z.number().min(0).max(100),
  avgTicket: z.number().min(10).max(10000),
  usesMarketplace: z.boolean(),
  marketplaceName: z.string().optional(),

  // Contact info (step 3)
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),

  // Tracking
  sessionId: z.string(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate
    const body = await request.json()
    const validated = CalculatorSchema.parse(body)

    // 2. Calculate ROI
    const results = await calculateROI({
      companyType: validated.companyType,
      monthlyAppointments: validated.monthlyAppointments,
      noShowRate: validated.noShowRate,
      avgTicket: validated.avgTicket,
      usesMarketplace: validated.usesMarketplace,
      marketplaceName: validated.marketplaceName,
    })

    // 3. Save to database
    const submission = await saveCalculatorSubmission({
      ...validated,
      ...results,
      convertedToLead: true,
    })

    // 4. Track conversion
    await trackCalculatorConversion({
      email: validated.email,
      companyType: validated.companyType,
      totalLoss: results.totalLoss,
      percentileRank: results.percentileRank,
    })

    // 5. Return results + submission ID
    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      results: {
        ...results,
        // Add formatted strings for display
        monthlyRevenueLostFormatted: formatCurrency(results.monthlyRevenueLost),
        marketplaceFeesFormatted: formatCurrency(results.marketplaceFees),
        totalLossFormatted: formatCurrency(results.totalLoss),
        potentialRecoveryFormatted: formatCurrency(results.potentialRecovery),
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Calculator API error:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao calcular ROI' },
      { status: 500 }
    )
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
```

### Tripwire Checkout API

```typescript
// src/app/api/checkout/tripwire/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'
import { createTripwirePurchase } from '@/lib/tripwire/db'
import { sendTripwireEmail } from '@/lib/email/templates/tripwire'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
})

const TripwireCheckoutSchema = z.object({
  productId: z.string(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string().optional(),
  sourceCalculatorId: z.string().uuid().optional(),
  orderBumps: z.array(z.object({
    productId: z.string(),
    accepted: z.boolean(),
  })).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = TripwireCheckoutSchema.parse(body)

    // 1. Get product details
    const product = getTripwireProduct(validated.productId)

    // 2. Calculate total with order bumps
    let totalAmount = product.price
    const acceptedBumps = validated.orderBumps?.filter(b => b.accepted) || []
    for (const bump of acceptedBumps) {
      const bumpProduct = getTripwireProduct(bump.productId)
      totalAmount += bumpProduct.price
    }

    // 3. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: validated.email,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity: 1,
        },
        ...acceptedBumps.map(bump => {
          const bumpProduct = getTripwireProduct(bump.productId)
          return {
            price_data: {
              currency: 'brl',
              unit_amount: Math.round(bumpProduct.price * 100),
              product_data: {
                name: bumpProduct.name,
              },
            },
            quantity: 1,
          }
        }),
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        productId: validated.productId,
        sourceCalculatorId: validated.sourceCalculatorId || '',
        orderBumps: JSON.stringify(acceptedBumps),
      },
    })

    // 4. Create purchase record (pending)
    await createTripwirePurchase({
      email: validated.email,
      name: validated.name,
      phone: validated.phone,
      productId: validated.productId,
      productName: product.name,
      price: product.price,
      totalAmount,
      orderBumps: acceptedBumps,
      paymentProvider: 'stripe',
      paymentId: session.id,
      paymentStatus: 'pending',
      sourceCalculatorId: validated.sourceCalculatorId,
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
    })

  } catch (error) {
    console.error('Tripwire checkout error:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar checkout' },
      { status: 500 }
    )
  }
}

// Webhook handler for Stripe events
export async function webhookHandler(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      await handleSuccessfulPayment(session)
      break

    case 'checkout.session.expired':
      // Handle expired session
      break
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // 1. Update purchase record
  await updateTripwirePurchase(session.id, {
    paymentStatus: 'paid',
    paymentDate: new Date(),
    fulfillmentStatus: 'pending',
  })

  // 2. Generate download link
  const downloadLink = await generateSecureDownloadLink(session.metadata.productId)

  // 3. Update with download link
  await updateTripwirePurchase(session.id, {
    downloadLink,
    accessExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    fulfillmentStatus: 'delivered',
  })

  // 4. Send email with download
  await sendTripwireEmail({
    email: session.customer_email!,
    productName: session.metadata.productId,
    downloadLink,
  })

  // 5. Track conversion
  await trackTripwireConversion({
    email: session.customer_email!,
    productId: session.metadata.productId,
    amount: session.amount_total! / 100,
  })
}
```

---

## 📈 Analytics Integration (AI Engineer + Data Analyst)

### Tracking Strategy

```typescript
// src/lib/analytics/calculator-tracking.ts

import posthog from 'posthog-js'
import { sendMetaConversion } from '@/lib/tracking/meta-conversions-api'

export interface CalculatorTrackingData {
  step: number
  companyType?: string
  monthlyAppointments?: number
  noShowRate?: number
  totalLoss?: number
  percentileRank?: number
}

export async function trackCalculatorStep(
  step: number,
  data: Partial<CalculatorTrackingData>
) {
  // PostHog
  posthog.capture('calculator_step_completed', {
    step,
    ...data,
    timestamp: new Date().toISOString(),
  })

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'CalculatorStepCompleted', {
      step,
      company_type: data.companyType,
    })
  }
}

export async function trackCalculatorConversion(data: {
  email: string
  companyType: string
  totalLoss: number
  percentileRank: number
}) {
  const eventId = generateEventId()

  // PostHog - identify user
  posthog.identify(data.email, {
    company_type: data.companyType,
    total_loss_monthly: data.totalLoss,
    percentile_rank: data.percentileRank,
    calculator_completed: true,
  })

  // PostHog - conversion event
  posthog.capture('calculator_completed', {
    ...data,
    event_id: eventId,
  })

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Calculator Lead',
      value: 0,
      currency: 'BRL',
    }, {
      eventID: eventId,
    })
  }

  // Meta CAPI (server-side)
  await sendMetaConversion({
    eventName: 'CompleteRegistration',
    eventId,
    userData: {
      email: data.email,
    },
    customData: {
      content_name: 'Calculator Lead',
      total_loss: data.totalLoss,
      percentile: data.percentileRank,
    },
  })
}

export async function trackTripwireConversion(data: {
  email: string
  productId: string
  amount: number
}) {
  const eventId = generateEventId()

  // PostHog
  posthog.capture('tripwire_purchased', {
    product_id: data.productId,
    amount: data.amount,
    event_id: eventId,
  })

  // Meta Pixel + CAPI
  const purchaseData = {
    content_name: `Tripwire: ${data.productId}`,
    value: data.amount,
    currency: 'BRL',
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', purchaseData, {
      eventID: eventId,
    })
  }

  await sendMetaConversion({
    eventName: 'Purchase',
    eventId,
    userData: {
      email: data.email,
    },
    customData: purchaseData,
  })
}

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
```

---

## 🧪 Testing Strategy (Debugger + Code Reviewer)

### Unit Tests

```typescript
// src/lib/calculadora/__tests__/roi-calculator.test.ts

import { describe, it, expect } from 'vitest'
import { ROICalculator } from '../roi-calculator'

describe('ROICalculator', () => {
  const mockBenchmarks = new Map([
    ['salon', {
      noShowRate: { p10: 8, p25: 15, p50: 25, p75: 35, p90: 45 },
      avgTicket: { p10: 80, p25: 120, p50: 180, p75: 250, p90: 350 },
    }]
  ])

  const mockFees = new Map([
    ['fresha', { percentage: 0.20, minimumPerBooking: 30 }]
  ])

  const calculator = new ROICalculator(mockBenchmarks, mockFees)

  it('should calculate monthly revenue lost correctly', () => {
    const result = calculator.calculate({
      companyType: 'salon',
      monthlyAppointments: 100,
      noShowRate: 30,
      avgTicket: 150,
      usesMarketplace: false,
    })

    // 100 appointments × 30% no-show × R$ 150 = R$ 4,500
    expect(result.monthlyRevenueLost).toBe(4500)
  })

  it('should calculate marketplace fees correctly', () => {
    const result = calculator.calculate({
      companyType: 'salon',
      monthlyAppointments: 100,
      noShowRate: 20,
      avgTicket: 150,
      usesMarketplace: true,
      marketplaceName: 'fresha',
    })

    // 100 appointments × R$ 150 × 20% = R$ 3,000
    // vs minimum 100 × R$ 30 = R$ 3,000
    expect(result.marketplaceFees).toBe(3000)
  })

  it('should calculate percentile rank correctly', () => {
    const result = calculator.calculate({
      companyType: 'salon',
      monthlyAppointments: 100,
      noShowRate: 10, // Better than p25 (15%)
      avgTicket: 150,
      usesMarketplace: false,
    })

    expect(result.percentileRank).toBeGreaterThan(75)
  })
})
```

### Integration Tests

```typescript
// src/app/api/calculadora/__tests__/route.test.ts

import { describe, it, expect } from 'vitest'
import { POST } from '../route'

describe('Calculator API', () => {
  it('should return 400 for invalid data', async () => {
    const request = new Request('http://localhost:3000/api/calculadora', {
      method: 'POST',
      body: JSON.stringify({
        companyType: 'invalid',
        monthlyAppointments: -10,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should calculate and return results', async () => {
    const request = new Request('http://localhost:3000/api/calculadora', {
      method: 'POST',
      body: JSON.stringify({
        companyType: 'salon',
        monthlyAppointments: 100,
        noShowRate: 25,
        avgTicket: 180,
        usesMarketplace: true,
        marketplaceName: 'fresha',
        name: 'Test Salon',
        email: 'test@example.com',
        sessionId: 'test-123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.results).toHaveProperty('monthlyRevenueLost')
    expect(data.results).toHaveProperty('marketplaceFees')
    expect(data.results).toHaveProperty('totalLoss')
  })
})
```

---

## 🚀 Implementation Roadmap

### Phase 1: MVP (Semana 1-2)

**Objetivo:** Calculadora funcional + tracking básico

```
Sprint 1.1 (Dias 1-3): Database + Backend
- [ ] Criar migrations (calculator_submissions, benchmarks)
- [ ] Implementar ROICalculator class
- [ ] Criar API endpoint /api/calculadora
- [ ] Testes unitários da lógica de cálculo
- [ ] Seed benchmarks data

Sprint 1.2 (Dias 4-7): Frontend
- [ ] Criar componentes Step1, Step2, Step3
- [ ] Implementar CalculadoraFlow
- [ ] Criar ResultsDisplay component
- [ ] Integrar com API
- [ ] Testes E2E do fluxo completo

Sprint 1.3 (Dias 8-10): Analytics & Polish
- [ ] Integrar tracking PostHog
- [ ] Integrar Meta Pixel
- [ ] Adicionar loading states
- [ ] Error handling
- [ ] Mobile responsiveness
```

### Phase 2: Tripwire (Semana 3-4)

```
Sprint 2.1 (Dias 1-3): Checkout
- [ ] Integrar Stripe
- [ ] Criar API /api/checkout/tripwire
- [ ] Webhook handler
- [ ] Página de checkout

Sprint 2.2 (Dias 4-6): Fulfillment
- [ ] Sistema de download seguro
- [ ] Email de entrega
- [ ] Página de obrigado
- [ ] Order bumps UI

Sprint 2.3 (Dias 7): Testing & Launch
- [ ] Testes de pagamento (sandbox)
- [ ] Testes de email
- [ ] Deploy staging
- [ ] Smoke tests produção
```

### Phase 3: Otimização (Semana 5-8)

```
Sprint 3.1: A/B Testing
- [ ] Testar 3 variações de headline
- [ ] Testar ordem dos steps
- [ ] Testar posicionamento do tripwire

Sprint 3.2: Conversão
- [ ] Adicionar social proof dinâmico
- [ ] Implementar exit-intent popup
- [ ] Otimizar mobile flow

Sprint 3.3: Automação
- [ ] Email sequence pós-calculadora
- [ ] Remarketing setup
- [ ] CRM integration
```

---

## 📊 Success Metrics & Monitoring

### KPIs Principais

```typescript
// Dashboard metrics to track

interface CalculatorMetrics {
  // Volume
  totalSubmissions: number
  submissionsToday: number
  submissionsWeek: number

  // Conversion funnel
  step1Starts: number
  step2Reached: number
  step3Reached: number
  completions: number

  // Drop-off rates
  step1ToStep2: number // Target: > 80%
  step2ToStep3: number // Target: > 70%
  step3ToComplete: number // Target: > 60%

  // Overall CVR
  startToComplete: number // Target: 12-15%

  // Tripwire
  tripwireOfferShown: number
  tripwireClicked: number
  tripwirePurchased: number
  tripwireCVR: number // Target: 2-4%

  // Quality
  avgTotalLoss: number
  avgPercentile: number

  // Revenue
  tripwireRevenue: number
  avgOrderValue: number // with order bumps
}
```

### Monitoring Setup

```typescript
// src/lib/monitoring/calculator-dashboard.ts

export async function getCalculatorMetrics(
  startDate: Date,
  endDate: Date
): Promise<CalculatorMetrics> {
  const [
    submissions,
    purchases,
    analytics
  ] = await Promise.all([
    getCalculatorSubmissions(startDate, endDate),
    getTripwirePurchases(startDate, endDate),
    getPostHogAnalytics(startDate, endDate)
  ])

  return {
    totalSubmissions: submissions.length,
    completions: submissions.filter(s => s.converted_to_lead).length,
    tripwirePurchased: purchases.length,
    tripwireRevenue: purchases.reduce((sum, p) => sum + p.total_amount, 0),
    // ... calculate all metrics
  }
}
```

### Alerts

```typescript
// Set up alerts for critical issues

const ALERT_THRESHOLDS = {
  cvr_below: 0.08, // Alert if CVR < 8%
  api_error_rate: 0.05, // Alert if > 5% errors
  tripwire_cvr_below: 0.015, // Alert if tripwire < 1.5%
}

// Monitor via PostHog or custom solution
```

---

## 🔐 Security & Performance (Expert Review)

### Security Checklist

```markdown
- [ ] Input validation (Zod schemas) ✅
- [ ] SQL injection protection (Supabase ORM) ✅
- [ ] XSS prevention (React escaping) ✅
- [ ] CSRF tokens (Next.js built-in)
- [ ] Rate limiting (Upstash Redis)
- [ ] Secure payment (Stripe PCI compliance)
- [ ] Download link expiration (30 days)
- [ ] Email verification before fulfillment
- [ ] Webhook signature validation (Stripe)
```

### Performance Optimization

```typescript
// 1. Database indexes ✅ (já definido no schema)

// 2. API caching
export const revalidate = 3600 // Cache benchmarks por 1h

// 3. Edge runtime para calculator API
export const runtime = 'edge' // Opcional, testar performance

// 4. Image optimization
<Image
  src="/calculator-hero.jpg"
  alt="ROI Calculator"
  width={1200}
  height={630}
  priority // LCP optimization
/>

// 5. Code splitting
const ResultsDisplay = dynamic(() => import('./ResultsDisplay'), {
  loading: () => <ResultsSkeleton />
})

// 6. Prefetch benchmarks
<link rel="prefetch" href="/api/benchmarks" />
```

---

## 📝 Documentation Checklist

```markdown
✅ Architecture document (this file)
✅ Database schema with migrations
✅ API endpoint specifications
✅ Component architecture
✅ Business logic documentation
✅ Testing strategy
✅ Implementation roadmap
⏳ User guide (criar depois do MVP)
⏳ Admin guide (criar depois do MVP)
```

---

## ✅ Next Actions

**Immediate (Esta Semana):**
1. Aprovar arquitetura e stack ✅
2. Criar migrations no Supabase
3. Implementar ROICalculator (lógica de negócio)
4. Iniciar componentes React (Step1)

**Short-term (Próxima Semana):**
1. Completar fluxo da calculadora
2. Integrar tracking
3. Testes E2E
4. Deploy staging

**Medium-term (Semanas 3-4):**
1. Implementar checkout Stripe
2. Sistema de fulfillment
3. Deploy produção
4. Monitoramento

---

**Status:** ✅ Arquitetura completa e pronta para implementação
**Próxima Etapa:** Criar migrations e começar desenvolvimento
**Estimativa Total:** 4-6 semanas para sistema completo
