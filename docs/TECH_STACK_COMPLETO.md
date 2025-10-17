# 🛠️ Stack Tecnológico Recomendado - ARCO Platform

**Data**: 8 de outubro de 2025  
**Versão**: 1.0  
**Status**: Análise Completa de Dependências e APIs Open Source

---

## 📊 ÍNDICE

1. [Backend & Database](#backend--database)
2. [Pagamentos & Billing](#pagamentos--billing)
3. [Email & Comunicação](#email--comunicação)
4. [Analytics & Monitoring](#analytics--monitoring)
5. [Testing & QA](#testing--qa)
6. [DevOps & Infrastructure](#devops--infrastructure)
7. [AI & Machine Learning](#ai--machine-learning)
8. [Utilities & Helpers](#utilities--helpers)
9. [Resumo de Custos](#resumo-de-custos)

---

## 🗄️ BACKEND & DATABASE

### ✅ Já Implementado

#### 1. **Supabase** - Database & Auth
- **Versão**: Latest (Postgres 15)
- **Uso**: Database principal, Auth, Storage, Realtime
- **Licença**: Apache 2.0 (Open Source)
- **Custo**: Free tier (500MB DB, 1GB file storage, 50k monthly active users)
- **Upgrade**: Pro $25/mês

**Features**:
```typescript
✅ PostgreSQL database
✅ Row Level Security (RLS)
✅ Authentication (email, social, magic link)
✅ Storage (file uploads)
✅ Realtime subscriptions
✅ Edge Functions
✅ Auto-generated REST API
```

#### 2. **Prisma ORM** - Database Toolkit
- **Versão**: `^6.10.1`
- **Uso**: Type-safe database queries, migrations
- **Licença**: Apache 2.0
- **Custo**: Free (open source)

**Vantagens**:
```typescript
✅ Type-safe queries
✅ Auto-completion
✅ Schema migrations
✅ Database introspection
✅ Multiple database support
```

### 🆕 Recomendado Adicionar

#### 3. **PostgreSQL Extensions**

```sql
-- pg_cron: Agendamento de tarefas
CREATE EXTENSION pg_cron;

-- Usar para:
SELECT cron.schedule('cleanup-webhooks', '0 2 * * *', 
  'SELECT cleanup_old_webhook_events()');
SELECT cron.schedule('calculate-mrr', '0 0 1 * *', 
  'SELECT calculate_mrr()');
SELECT cron.schedule('renew-subscriptions', '0 3 * * *', 
  'SELECT renew_expired_subscriptions()');

-- pgvector: Embeddings e Semantic Search
CREATE EXTENSION vector;

-- Usar para:
-- - Semantic search em documentação
-- - Similarity matching de clientes
-- - Recomendação de planos

-- pg_stat_statements: Performance monitoring
CREATE EXTENSION pg_stat_statements;
```

**Instalação**: Via Supabase Dashboard → Database → Extensions

---

## 💳 PAGAMENTOS & BILLING

### ✅ Já Implementado

#### 1. **Mercado Pago** - Payment Gateway
- **Versão SDK**: `@mercadopago/sdk-react@^1.0.6`, `mercadopago@^2.9.0`
- **Uso**: Checkout, pagamentos recorrentes, Pix, boleto
- **Licença**: Proprietária (SDK open source)
- **Custo**: 4.99% por transação aprovada
- **Features**: Payment Bricks, Orders API v2, Webhooks

### 🆕 Recomendado Adicionar

#### 2. **Stripe** - Pagamentos Internacionais (Opcional)
- **Package**: `stripe@^17.0.0`
- **Uso**: Fallback para clientes internacionais
- **Custo**: 2.9% + R$ 0.30 por transação (Brasil)

```typescript
// src/lib/payments/stripe/client.ts
import Stripe from 'stripe';

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
  typescript: true,
});

// Usar apenas se cliente não for do Brasil
const shouldUseStripe = (country: string) => country !== 'BR';
```

#### 3. **Paddle** - Merchant of Record (Futuro)
- **Package**: `@paddle/paddle-js`
- **Uso**: Simplificar compliance internacional (VAT, impostos)
- **Custo**: 5% + R$ 0.50 por transação
- **Vantagem**: Paddle cuida de impostos e compliance

---

## 📧 EMAIL & COMUNICAÇÃO

### ❌ Não Implementado (P0 - CRÍTICO)

#### 1. **Resend** - Email Service (RECOMENDADO)
- **Package**: `resend@^4.0.0`
- **Licença**: MIT (open source)
- **Custo**: Free tier (3.000 emails/mês, 100/dia)
- **Upgrade**: $20/mês para 50.000 emails

**Features**:
```typescript
✅ React Email templates
✅ Email tracking (opens, clicks)
✅ Webhooks (bounces, spam reports)
✅ Domain authentication (DKIM, SPF, DMARC)
✅ 99.9% deliverability
```

**Instalação**:
```bash
pnpm add resend
pnpm add react-email @react-email/components
```

**Implementação**:
```typescript
// src/lib/email/client.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// src/lib/email/templates/payment-confirmation.tsx
import { Html, Button, Text } from '@react-email/components';

export default function PaymentConfirmationEmail({ name, amount, planName }) {
  return (
    <Html>
      <Text>Olá {name},</Text>
      <Text>Seu pagamento de R$ {amount} foi confirmado!</Text>
      <Text>Plano: {planName}</Text>
      <Button href="https://arco.app/dashboard">Acessar Dashboard</Button>
    </Html>
  );
}

// src/lib/email/service.ts
export async function sendPaymentConfirmation(data: PaymentData) {
  await resend.emails.send({
    from: 'ARCO <noreply@arco.app>',
    to: data.email,
    subject: '🎉 Pagamento Confirmado - ARCO',
    react: PaymentConfirmationEmail(data),
  });
}
```

#### 2. **React Email** - Email Templates
- **Package**: `react-email@^3.0.1`
- **Licença**: MIT
- **Custo**: Free

**Features**:
```typescript
✅ React components para emails
✅ Preview em desenvolvimento
✅ Suporte a Tailwind
✅ Componentes prontos (Button, Heading, etc.)
```

#### 3. **Alternativas** (Se Resend não servir)

**SendGrid** (mais estabelecido):
```typescript
// Prós: 100 emails/dia grátis, SDK robusto
// Contras: Interface complexa, setup demorado
pnpm add @sendgrid/mail
```

**Postmark** (melhor deliverability):
```typescript
// Prós: 99.5% deliverability, templates visuais
// Contras: Sem free tier (apenas trial)
pnpm add postmark
```

**Amazon SES** (mais barato):
```typescript
// Prós: $0.10 por 1.000 emails, escala infinita
// Contras: Setup complexo, requer AWS
pnpm add @aws-sdk/client-ses
```

---

## 📊 ANALYTICS & MONITORING

### ✅ Já Implementado

#### 1. **Google Analytics 4**
- **Package**: `@google-analytics/data@^4.12.1`
- **Uso**: Analytics do site, conversões
- **Custo**: Free

### 🆕 Recomendado Adicionar

#### 2. **Sentry** - Error Tracking (P0)
- **Package**: `@sentry/nextjs@^8.0.0`
- **Licença**: BSL (Business Source License)
- **Custo**: Free tier (5k errors/mês, 1 usuário)
- **Upgrade**: $26/mês (50k errors)

**Features**:
```typescript
✅ Error tracking e stack traces
✅ Performance monitoring
✅ Session replay
✅ Release tracking
✅ Source maps upload
✅ Integração com GitHub
```

**Instalação**:
```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configuração Básica**:
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% das transações
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  beforeSend(event, hint) {
    // Filtrar erros sensíveis
    if (event.exception?.values?.[0]?.value?.includes('password')) {
      return null;
    }
    return event;
  },
});

// Usar em todo o código:
try {
  await processPayment();
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'payment' },
    extra: { paymentId: '123' },
  });
}
```

#### 3. **PostHog** - Product Analytics (P1)
- **Package**: `posthog-js@^1.165.0`, `posthog-node@^4.2.1`
- **Licença**: MIT (Open Source)
- **Custo**: Free tier (1M events/mês)
- **Upgrade**: $0.00045 por evento adicional

**Features**:
```typescript
✅ Event tracking
✅ Feature flags
✅ A/B testing
✅ Session recording
✅ Funnels e cohorts
✅ Self-hosted option (grátis)
```

**Instalação**:
```bash
pnpm add posthog-js posthog-node
```

**Implementação**:
```typescript
// src/lib/analytics/posthog.ts
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

// Track events:
posthog.capture('payment_completed', {
  amount: 99,
  plan: 'pro',
  payment_method: 'pix',
});

// Feature flags:
const showNewCheckout = posthog.isFeatureEnabled('new-checkout-flow');

// A/B testing:
const variant = posthog.getFeatureFlag('checkout-button-color');
```

#### 4. **LogSnag** - Event Tracking (P1)
- **Package**: `logsnag@^1.0.0`
- **Licença**: Proprietária
- **Custo**: Free tier (10k events/mês)
- **Uso**: Notificações em tempo real de eventos importantes

```typescript
// src/lib/notifications/logsnag.ts
import { LogSnag } from 'logsnag';

const logsnag = new LogSnag({
  token: process.env.LOGSNAG_API_TOKEN!,
  project: 'arco',
});

// Notificar eventos importantes:
await logsnag.track({
  channel: 'payments',
  event: 'New Subscription',
  description: 'User upgraded to Pro plan',
  icon: '💰',
  notify: true,
  tags: {
    amount: '99.00',
    plan: 'pro',
  },
});

await logsnag.insight.track({
  title: 'Monthly Recurring Revenue',
  value: '12,450.00',
  icon: '📈',
});
```

#### 5. **Upstash** - Rate Limiting & Caching (P1)
- **Package**: `@upstash/redis@^1.34.3`, `@upstash/ratelimit@^2.0.1`
- **Licença**: MIT
- **Custo**: Free tier (10k requests/dia)

**Features**:
```typescript
✅ Serverless Redis
✅ Rate limiting
✅ Edge caching
✅ Global replication
✅ Kafka (para eventos)
```

**Implementação**:
```typescript
// src/lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests/min
  prefix: 'arco:ratelimit',
});

// API Route:
export async function POST(req: Request) {
  const identifier = req.headers.get('x-forwarded-for') || 'anonymous';
  const { success, remaining } = await ratelimit.limit(identifier);
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // Processar request...
}
```

---

## 🧪 TESTING & QA

### ❌ Não Implementado (P1)

#### 1. **Jest** - Unit Testing (RECOMENDADO)
- **Package**: `jest@^29.7.0`, `@types/jest@^29.5.13`
- **Licença**: MIT
- **Custo**: Free

**Instalação**:
```bash
pnpm add -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
```

**Configuração**:
```typescript
// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
};

// jest.setup.ts
import '@testing-library/jest-dom';
```

**Exemplo de Teste**:
```typescript
// src/lib/payments/mercadopago/__tests__/webhooks.test.ts
import { processPaymentWebhook } from '../webhooks';

describe('Mercado Pago Webhooks', () => {
  it('should process payment approved webhook', async () => {
    const webhook = {
      type: 'payment',
      data: { id: '123456789' },
    };
    
    const result = await processPaymentWebhook(webhook);
    
    expect(result.success).toBe(true);
    expect(result.subscriptionId).toBeDefined();
  });
  
  it('should handle payment rejected webhook', async () => {
    const webhook = {
      type: 'payment',
      data: { id: '987654321' },
    };
    
    const result = await processPaymentWebhook(webhook);
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

#### 2. **Playwright** - E2E Testing (RECOMENDADO)
- **Package**: `@playwright/test@^1.48.0`
- **Licença**: Apache 2.0
- **Custo**: Free

**Instalação**:
```bash
pnpm add -D @playwright/test
npx playwright install
```

**Configuração**:
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

**Exemplo de Teste E2E**:
```typescript
// tests/e2e/payment-flow.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete payment flow', async ({ page }) => {
  // 1. Login
  await page.goto('/login');
  await page.fill('[name=email]', 'test@example.com');
  await page.fill('[name=password]', 'password123');
  await page.click('button[type=submit]');
  
  // 2. Select Pro plan
  await page.goto('/pricing');
  await page.click('[data-plan=pro]');
  
  // 3. Fill payment form
  const paymentFrame = page.frameLocator('#payment-brick');
  await paymentFrame.fill('[name=cardNumber]', '5031 4332 1540 6351');
  await paymentFrame.fill('[name=cardholderName]', 'APRO');
  await paymentFrame.fill('[name=expirationDate]', '11/25');
  await paymentFrame.fill('[name=securityCode]', '123');
  
  // 4. Submit
  await page.click('button[type=submit]');
  
  // 5. Verify success
  await expect(page).toHaveURL('/checkout/success');
  await expect(page.locator('h1')).toContainText('Pagamento Confirmado');
});
```

#### 3. **MSW (Mock Service Worker)** - API Mocking
- **Package**: `msw@^2.6.4`
- **Licença**: MIT
- **Custo**: Free

**Uso**: Mockar APIs externas em testes (Mercado Pago, Supabase, etc.)

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://api.mercadopago.com/v1/payments', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 123456789,
      status: 'approved',
      transaction_amount: body.transaction_amount,
    });
  }),
  
  http.get('https://*.supabase.co/rest/v1/subscriptions', () => {
    return HttpResponse.json([
      { id: '1', plan_id: 'pro', status: 'active' },
    ]);
  }),
];
```

#### 4. **Vitest** - Alternativa ao Jest (Mais Rápido)
- **Package**: `vitest@^2.1.5`
- **Licença**: MIT
- **Custo**: Free

**Vantagens sobre Jest**:
- ⚡ 10x mais rápido
- 🔥 Hot reload em testes
- ✅ API compatível com Jest
- 📦 Zero config com Vite

---

## 🚀 DEVOPS & INFRASTRUCTURE

### ✅ Já Implementado

#### 1. **Vercel** - Hosting & Deployment
- **Uso**: Hosting Next.js, Edge Functions, Analytics
- **Custo**: Free tier (100GB bandwidth)

### 🆕 Recomendado Adicionar

#### 2. **GitHub Actions** - CI/CD (GRATUITO)
- **Licença**: MIT
- **Custo**: Free (2,000 min/mês)

**Workflow Completo**:
```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.0.0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run TypeScript check
        run: pnpm check-types
      
      - name: Run linter
        run: pnpm lint
      
      - name: Run unit tests
        run: pnpm test:coverage
      
      - name: Run E2E tests
        run: pnpm test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      
      - name: Build application
        run: pnpm build
      
      - name: Run Lighthouse CI
        run: pnpm lighthouse:audit
```

#### 3. **Turborepo** - Monorepo Tooling (Se necessário)
- **Package**: `turbo@^2.3.0`
- **Licença**: MIT
- **Custo**: Free (open source)

**Uso**: Se projeto crescer para múltiplos packages

#### 4. **Docker** - Containerization (Opcional)
- **Licença**: Apache 2.0
- **Custo**: Free

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🤖 AI & MACHINE LEARNING

### 🆕 Recomendado Adicionar

#### 1. **OpenAI** - AI Features (P2)
- **Package**: `openai@^4.73.0`
- **Licença**: MIT
- **Custo**: Pay-per-use ($0.002 por 1k tokens GPT-4o-mini)

**Use Cases**:
```typescript
// 1. Lead scoring automático
async function scoreLeadWithAI(leadData: LeadData) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Você é um especialista em qualificação de leads B2B.',
      },
      {
        role: 'user',
        content: `Analise este lead: ${JSON.stringify(leadData)}`,
      },
    ],
  });
  
  return parseLeadScore(completion.choices[0].message.content);
}

// 2. Geração de relatórios
async function generateClientReport(clientData: ClientData) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Gere um relatório executivo de performance.',
      },
      {
        role: 'user',
        content: JSON.stringify(clientData),
      },
    ],
  });
  
  return completion.choices[0].message.content;
}

// 3. Sugestões de otimização
async function suggestOptimizations(pageData: PageData) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Você é especialista em Core Web Vitals e performance.',
      },
      {
        role: 'user',
        content: `Analise esta página: ${JSON.stringify(pageData)}`,
      },
    ],
  });
  
  return parseOptimizations(completion.choices[0].message.content);
}
```

#### 2. **Anthropic Claude** - Alternativa ao GPT (P2)
- **Package**: `@anthropic-ai/sdk@^0.32.1`
- **Custo**: $0.003 por 1k tokens (Claude Haiku)

**Vantagens**:
- Melhor para análise de documentos longos (200k tokens)
- Mais seguro (menos hallucinations)
- Suporte a português nativo

#### 3. **Vercel AI SDK** - AI Utilities (P2)
- **Package**: `ai@^4.0.0`
- **Licença**: Apache 2.0
- **Custo**: Free

**Features**:
```typescript
✅ Streaming responses
✅ Chat UI components
✅ Edge runtime support
✅ Multiple providers (OpenAI, Anthropic, Cohere)
```

**Exemplo**:
```typescript
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages,
  });
  
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

---

## 🛠️ UTILITIES & HELPERS

### ✅ Já Implementado

#### 1. **Zod** - Schema Validation
- **Package**: `zod@^3.24.1`
- **Licença**: MIT
- **Custo**: Free

#### 2. **React Hook Form** - Form Management
- **Package**: `react-hook-form@^7.54.2`
- **Licença**: MIT
- **Custo**: Free

#### 3. **Date-fns** - Date Utilities
- **Package**: `date-fns@^4.1.0`
- **Licença**: MIT
- **Custo**: Free

### 🆕 Recomendado Adicionar

#### 4. **Zod-to-JSON-Schema** - API Documentation (P2)
- **Package**: `zod-to-json-schema@^3.24.1`
- **Uso**: Gerar OpenAPI/Swagger docs automaticamente

```typescript
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const PaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  payment_method: z.enum(['pix', 'credit_card', 'boleto']),
});

const jsonSchema = zodToJsonSchema(PaymentSchema);
// Auto-generate API docs from this
```

#### 5. **Decimal.js** - Precision Math (P1)
- **Package**: `decimal.js@^10.4.3`
- **Licença**: MIT
- **Custo**: Free

**Uso**: Cálculos financeiros precisos (evita erros de float)

```typescript
import Decimal from 'decimal.js';

// ❌ ERRADO: Float precision issues
const total = 0.1 + 0.2; // 0.30000000000000004

// ✅ CORRETO: Decimal precision
const total = new Decimal(0.1).plus(0.2).toNumber(); // 0.3

// Cálculo de MRR:
function calculateMRR(subscriptions: Subscription[]) {
  return subscriptions
    .reduce((sum, sub) => {
      const amount = new Decimal(sub.price_monthly);
      return sum.plus(amount);
    }, new Decimal(0))
    .toFixed(2);
}
```

#### 6. **Lodash** - Utility Functions (Se necessário)
- **Package**: `lodash@^4.17.21`
- **Licença**: MIT
- **Custo**: Free

**Alternativa Moderna**: Use ES6+ nativo ou `lodash-es` (tree-shakeable)

#### 7. **Nanoid** - Unique ID Generator (P2)
- **Package**: `nanoid@^5.0.9`
- **Licença**: MIT
- **Custo**: Free

**Uso**: Gerar IDs curtos e únicos (mais curtos que UUID)

```typescript
import { nanoid } from 'nanoid';

const orderId = nanoid(); // "V1StGXR8_Z5jdHi6B-myT"
const shortId = nanoid(10); // "V1StGXR8_Z"
```

#### 8. **Class Variance Authority (CVA)** - Component Variants (P2)
- **Package**: `class-variance-authority@^0.7.1`
- **Licença**: Apache 2.0
- **Custo**: Free

**Uso**: Type-safe component variants com Tailwind

```typescript
import { cva } from 'class-variance-authority';

const button = cva('rounded font-semibold', {
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: {
      small: 'text-sm px-3 py-1',
      medium: 'text-base px-4 py-2',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

<button className={button({ intent: 'secondary', size: 'small' })}>
  Click me
</button>
```

---

## 💰 RESUMO DE CUSTOS

### 🆓 Free Tier (Stack Inicial)

| Serviço | Free Tier | Limite |
|---------|-----------|--------|
| **Supabase** | ✅ | 500MB DB, 1GB storage, 50k MAU |
| **Vercel** | ✅ | 100GB bandwidth, 100 builds/mês |
| **Resend** | ✅ | 3k emails/mês, 100/dia |
| **Sentry** | ✅ | 5k errors/mês |
| **PostHog** | ✅ | 1M events/mês |
| **Upstash** | ✅ | 10k requests/dia |
| **GitHub Actions** | ✅ | 2,000 min/mês |
| **OpenAI** | ❌ | Pay-per-use ($0.002/1k tokens) |

**Total Mensal (Free Tier)**: R$ 0 💰

---

### 💵 Production Stack (Com Upgrades)

| Serviço | Custo Mensal | Uso |
|---------|--------------|-----|
| **Supabase Pro** | $25 (~R$ 125) | 8GB DB, 100GB storage |
| **Vercel Pro** | $20 (~R$ 100) | 1TB bandwidth, edge functions |
| **Resend Pro** | $20 (~R$ 100) | 50k emails/mês |
| **Sentry Team** | $26 (~R$ 130) | 50k errors/mês |
| **PostHog** | ~$50 (~R$ 250) | 5M events/mês |
| **OpenAI** | ~$50 (~R$ 250) | 25M tokens/mês |
| **Mercado Pago** | 4.99% | Por transação |

**Total Mensal (Production)**: ~R$ 955 + custos variáveis

---

### 🎯 Recomendação por Fase

#### **Fase 1: MVP (0-100 usuários)** - R$ 0/mês
```
✅ Supabase Free
✅ Vercel Free
✅ Resend Free
✅ Sentry Free
✅ GitHub Actions Free
✅ Todos os packages open source
```

#### **Fase 2: Growth (100-1.000 usuários)** - R$ 350/mês
```
✅ Supabase Pro ($25)
✅ Vercel Pro ($20)
✅ Resend Pro ($20)
✅ Sentry Team ($26)
✅ PostHog Free (ainda suficiente)
```

#### **Fase 3: Scale (1.000+ usuários)** - R$ 955+/mês
```
✅ Todos os serviços Pro
✅ PostHog pago
✅ OpenAI para features avançadas
✅ CDN adicional (Cloudflare)
```

---

## 🎯 PRIORIZAÇÃO DE IMPLEMENTAÇÃO

### 🔴 P0 - CRÍTICO (Implementar Agora)

```typescript
1. Resend + React Email         → Email é bloqueador
2. Sentry                       → Monitoring é essencial
3. Jest + Playwright            → Testing antes de produção
4. GitHub Actions CI/CD         → Automação de deploys
5. Decimal.js                   → Cálculos financeiros corretos
```

**Tempo estimado**: 8-12 horas  
**Custo**: R$ 0 (tudo free tier)

---

### 🟡 P1 - IMPORTANTE (Próximas 2 semanas)

```typescript
6. PostHog                      → Analytics e feature flags
7. Upstash                      → Rate limiting
8. MSW                          → API mocking em testes
9. Zod-to-JSON-Schema           → API documentation
10. Nanoid                      → ID generation
```

**Tempo estimado**: 12-16 horas  
**Custo**: R$ 0 (tudo free tier)

---

### 🟢 P2 - DESEJÁVEL (Futuro)

```typescript
11. OpenAI / Anthropic          → AI features
12. Stripe                      → Pagamentos internacionais
13. LogSnag                     → Event notifications
14. Paddle                      → International compliance
15. Docker                      → Containerization
```

**Tempo estimado**: 20-30 horas  
**Custo**: Variável (pay-per-use)

---

## 📚 SCRIPTS PACKAGE.JSON

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "email:dev": "email dev",
    "email:build": "email build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "sentry:sourcemaps": "sentry-cli sourcemaps upload --org arco --project arco-web .next",
    "db:migration": "supabase migration new",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset",
    "db:seed": "supabase db seed"
  }
}
```

---

## 🚀 QUICK START - IMPLEMENTAR P0 AGORA

### 1️⃣ Email Service (30min)

```bash
pnpm add resend react-email @react-email/components
mkdir -p src/lib/email/templates
```

### 2️⃣ Error Tracking (15min)

```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 3️⃣ Testing (30min)

```bash
pnpm add -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
npx playwright install
```

### 4️⃣ CI/CD (15min)

```bash
mkdir -p .github/workflows
# Copiar workflow do exemplo acima
```

### 5️⃣ Precision Math (5min)

```bash
pnpm add decimal.js
```

**Total**: ~2 horas para implementar stack P0 completo

---

## 📞 RECURSOS E DOCUMENTAÇÃO

### Documentação Oficial
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [PostHog Next.js](https://posthog.com/docs/libraries/next-js)
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Jest Docs](https://jestjs.io/docs/getting-started)

### Tutoriais Recomendados
- [React Email Templates](https://react.email/docs/introduction)
- [Testing Next.js Apps](https://nextjs.org/docs/testing)
- [GitHub Actions for Next.js](https://github.com/actions/starter-workflows)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Discord](https://discord.gg/nextjs)
- [PostHog Community](https://posthog.com/community)

---

**Última atualização**: 8 de outubro de 2025  
**Responsável**: Sistema ARCO  
**Status**: 📋 Análise Completa - Pronto para Implementação

**Próximo passo**: "pode seguir com implementação do stack P0 (email + monitoring + testing)"
