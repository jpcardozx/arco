# 🆓 Setup Completo de Monitoring Zero-Cost

**Data:** 07/10/2025 23:30  
**Stack:** Highlight.io + Pino + Better-Stack (100% Free)

---

## 🎯 ARQUITETURA PROPOSTA

```
Frontend (Next.js)
    ↓
Highlight.io (Session Replay + Errors)
    ↓
Backend (API Routes)
    ↓
Pino Logger → Better-Stack (Structured Logs)
    ↓
Supabase (Database)
```

---

## 1️⃣ HIGHLIGHT.IO (Alternativa Open Source ao Sentry)

### Por que Highlight.io?

| Feature | Sentry Free | Highlight.io Free | Winner |
|---------|-------------|-------------------|--------|
| Error tracking | 5k/mês | **Ilimitado** | 🏆 Highlight |
| Performance monitoring | 10k transactions | **1k sessions** | Sentry |
| Session replay | ❌ Não | ✅ Sim | 🏆 Highlight |
| Logs | ❌ Não | ✅ Sim | 🏆 Highlight |
| Custo após free | $26/mês | $20/mês | 🏆 Highlight |
| Open Source | ❌ Não | ✅ Sim | 🏆 Highlight |

### Setup (5 minutos)

#### A. Criar conta
```bash
# 1. Ir para https://app.highlight.io
# 2. Sign up (GitHub OAuth)
# 3. Criar projeto "ARCO"
# 4. Copiar PROJECT_ID
```

#### B. Instalar SDK
```bash
pnpm add @highlight-run/next @highlight-run/node
```

#### C. Configurar .env
```bash
# .env.local
NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_project_id_here
HIGHLIGHT_OTLP_ENDPOINT=https://otel.highlight.io:4318
```

#### D. Configurar Frontend
```typescript
// src/app/layout.tsx
import { HighlightInit } from '@highlight-run/next/highlight-init';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HighlightInit
        projectId={process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID!}
        serviceName="arco-frontend"
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
        }}
      />
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </>
  );
}
```

#### E. Configurar Backend
```typescript
// src/lib/monitoring/highlight.ts
import { H } from '@highlight-run/node';

H.init({
  projectID: process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID!,
  serviceName: 'arco-backend',
  environment: process.env.NODE_ENV || 'development',
  otlpEndpoint: process.env.HIGHLIGHT_OTLP_ENDPOINT,
});

export const highlightMiddleware = async (req: Request, handler: Function) => {
  const { secureSessionId, requestId } = H.parseHeaders(req.headers);
  
  try {
    return await H.runWithHeaders({ secureSessionId, requestId }, async () => {
      return await handler();
    });
  } catch (error) {
    H.consumeError(error as Error, { requestId, path: req.url });
    throw error;
  }
};

// Helpers
export const captureError = (error: Error, context?: Record<string, any>) => {
  H.consumeError(error, context);
};

export const captureMessage = (message: string, severity: 'info' | 'warn' | 'error' = 'info') => {
  H.log(message, severity, context);
};

export { H };
```

#### F. Usar em API Routes
```typescript
// src/app/api/webhooks/mercadopago/route.ts
import { highlightMiddleware, captureError, H } from '@/lib/monitoring/highlight';

export async function POST(request: Request) {
  return highlightMiddleware(request, async () => {
    try {
      const signature = request.headers.get('x-signature');
      
      H.log('Webhook received', 'info', { signature });
      
      const isValid = validateWebhookSignature(signature);
      
      if (!isValid) {
        H.log('Invalid signature', 'warn', { signature });
        return new Response('Unauthorized', { status: 401 });
      }
      
      const body = await request.json();
      await processWebhook(body);
      
      H.log('Webhook processed successfully', 'info', { eventId: body.id });
      
      return new Response('OK', { status: 200 });
    } catch (error) {
      captureError(error as Error, {
        context: 'webhook_processing',
        path: request.url,
      });
      
      return new Response('Internal Server Error', { status: 500 });
    }
  });
}
```

#### G. Tracking Custom Events
```typescript
// src/lib/payments/mercadopago/orders.ts
import { H } from '@/lib/monitoring/highlight';

export async function createOrder(userId: string, planId: string) {
  H.log('Creating order', 'info', { userId, planId });
  
  try {
    const preference = await mercadopago.preferences.create({...});
    
    H.log('Order created successfully', 'info', {
      userId,
      planId,
      preferenceId: preference.id,
    });
    
    return preference;
  } catch (error) {
    H.consumeError(error as Error, {
      context: 'order_creation',
      userId,
      planId,
    });
    throw error;
  }
}
```

---

## 2️⃣ PINO LOGGER (Structured Logging)

### Por que Pino?

- **Mais rápido**: 5x mais rápido que Winston
- **Structured**: JSON por padrão
- **TypeScript**: Suporte completo
- **Ecosystem**: Integrações com tudo

### Setup (3 minutos)

#### A. Instalar
```bash
pnpm add pino pino-pretty
```

#### B. Configurar Logger
```typescript
// src/lib/logger.ts
import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true,
  },
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
});

// Helpers
export const logPayment = (action: string, data: Record<string, any>) => {
  logger.info({ 
    context: 'payment',
    action,
    ...data,
  });
};

export const logWebhook = (action: string, data: Record<string, any>) => {
  logger.info({
    context: 'webhook',
    action,
    ...data,
  });
};

export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error({
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    ...context,
  });
};
```

#### C. Usar no código
```typescript
// src/lib/payments/mercadopago/orders.ts
import { logPayment, logError } from '@/lib/logger';

export async function createOrder(userId: string, planId: string) {
  logPayment('create_order_started', { userId, planId });
  
  try {
    const preference = await mercadopago.preferences.create({...});
    
    logPayment('create_order_success', {
      userId,
      planId,
      preferenceId: preference.id,
      amount: preference.items[0].unit_price,
    });
    
    return preference;
  } catch (error) {
    logError(error as Error, {
      context: 'order_creation',
      userId,
      planId,
    });
    throw error;
  }
}
```

#### D. Output em Dev
```bash
# Terminal colorido e legível
[23:45:12.345] INFO (payment): create_order_started
    userId: "user_123"
    planId: "plan_456"
    
[23:45:12.789] INFO (payment): create_order_success
    userId: "user_123"
    planId: "plan_456"
    preferenceId: "123456789-abc-def"
    amount: 499
```

---

## 3️⃣ BETTER-STACK (Free Log Management)

### Por que Better-Stack (Logtail)?

| Feature | CloudWatch | Better-Stack Free | Winner |
|---------|------------|-------------------|--------|
| Storage | 5 GB/mês | 1 GB/mês | CloudWatch |
| Retention | Configurável | 3 dias | CloudWatch |
| UI | 😐 Ruim | 😍 Excelente | 🏆 Better-Stack |
| Alertas | $ | Ilimitados | 🏆 Better-Stack |
| Search | Básico | Avançado | 🏆 Better-Stack |
| Custo | $0 → $$$ | $0 → $10/mês | 🏆 Better-Stack |

### Setup (5 minutos)

#### A. Criar conta
```bash
# 1. Ir para https://betterstack.com/logs
# 2. Sign up (email)
# 3. Criar source "ARCO Backend"
# 4. Copiar SOURCE_TOKEN
```

#### B. Instalar SDK
```bash
pnpm add @logtail/pino @logtail/node
```

#### C. Configurar .env
```bash
# .env.local
LOGTAIL_SOURCE_TOKEN=your_source_token_here
```

#### D. Atualizar Logger
```typescript
// src/lib/logger.ts
import pino from 'pino';
import { LogtailTransport } from '@logtail/pino';

const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const transports = [];

// Dev: Pretty print no terminal
if (isDev) {
  transports.push({
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  });
}

// Production: Better-Stack
if (isProduction && process.env.LOGTAIL_SOURCE_TOKEN) {
  transports.push({
    target: '@logtail/pino',
    options: {
      sourceToken: process.env.LOGTAIL_SOURCE_TOKEN,
    },
  });
}

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: { asObject: true },
  ...(transports.length > 0 && {
    transport: {
      targets: transports,
    },
  }),
});
```

---

## 4️⃣ ALERTAS AUTOMÁTICOS

### Better-Stack Alerts (Free)

#### A. Criar alerta de erro crítico
```
Dashboard → Alerts → New Alert

Name: Payment Error (Critical)
Condition: log.level = "error" AND log.context = "payment"
Notification: Email + Slack
Threshold: 5 errors in 5 minutes
```

#### B. Criar alerta de webhook falha
```
Name: Webhook Processing Failed
Condition: log.level = "error" AND log.context = "webhook"
Notification: Email
Threshold: 3 errors in 10 minutes
```

#### C. Criar alerta de alta latência
```
Name: High API Latency
Condition: log.duration > 5000 (ms)
Notification: Slack
Threshold: 10 occurrences in 5 minutes
```

### Highlight.io Alerts (Free)

#### A. Error Rate Alert
```
Dashboard → Alerts → New Alert

Name: High Error Rate
Condition: Error count > 10 in 5 minutes
Channels: Email + Slack
```

#### B. Performance Alert
```
Name: Slow API Response
Condition: P95 latency > 3000ms
Channels: Slack
```

---

## 5️⃣ DASHBOARD DE MÉTRICAS

### Highlight.io Dashboard

**Acessar:** `https://app.highlight.io/[project_id]/sessions`

**Visualizar:**
- Session replays (ver exatamente o que usuário fez)
- Error timeline
- Performance waterfall
- Network requests
- Console logs

**Filtros úteis:**
```
# Ver apenas erros de pagamento
context.payment_id exists

# Ver apenas checkouts abandonados
path:/checkout AND session_duration > 30s

# Ver erros de webhook
context.webhook_event_id exists
```

### Better-Stack Dashboard

**Acessar:** `https://logs.betterstack.com`

**Queries úteis:**
```sql
-- Erros de pagamento nas últimas 24h
log.level:"error" AND log.context:"payment"

-- Webhooks processados com sucesso
log.context:"webhook" AND log.action:"processed"

-- Latência P95 de checkout
log.context:"payment" AND log.action:"create_order"
| stats p95(duration)

-- Assinaturas ativadas por hora
log.context:"subscription" AND log.action:"activated"
| stats count() by date_histogram(1h)
```

---

## 6️⃣ MÉTRICAS CUSTOMIZADAS

### Tracking de Conversão
```typescript
// src/lib/analytics/tracker.ts
import { H } from '@/lib/monitoring/highlight';
import { logger } from '@/lib/logger';

export class ConversionTracker {
  static trackCheckoutStarted(userId: string, planId: string) {
    H.track('checkout_started', { userId, planId });
    logger.info({
      event: 'checkout_started',
      userId,
      planId,
      timestamp: new Date(),
    });
  }

  static trackCheckoutCompleted(userId: string, planId: string, paymentId: string) {
    H.track('checkout_completed', { userId, planId, paymentId });
    logger.info({
      event: 'checkout_completed',
      userId,
      planId,
      paymentId,
      timestamp: new Date(),
    });
  }

  static trackSubscriptionActivated(userId: string, subscriptionId: string) {
    H.track('subscription_activated', { userId, subscriptionId });
    logger.info({
      event: 'subscription_activated',
      userId,
      subscriptionId,
      timestamp: new Date(),
    });
  }
}
```

### Uso nos handlers
```typescript
// src/lib/payments/mercadopago/orders.ts
import { ConversionTracker } from '@/lib/analytics/tracker';

export async function createOrder(userId: string, planId: string) {
  ConversionTracker.trackCheckoutStarted(userId, planId);
  
  try {
    const preference = await mercadopago.preferences.create({...});
    return preference;
  } catch (error) {
    // Erro já será capturado pelo Highlight
    throw error;
  }
}

// src/lib/payments/mercadopago/webhooks.ts
export async function processPaymentConfirmation(paymentId: string) {
  const payment = await getPayment(paymentId);
  
  if (payment.status === 'approved') {
    await activateSubscription(payment);
    
    ConversionTracker.trackSubscriptionActivated(
      payment.metadata.user_id,
      payment.metadata.subscription_id
    );
  }
}
```

---

## 7️⃣ CHECKLIST DE IMPLEMENTAÇÃO

### Setup Inicial (30 minutos)
- [ ] Criar conta Highlight.io
- [ ] Criar conta Better-Stack
- [ ] Instalar dependências
- [ ] Configurar .env
- [ ] Implementar logger.ts
- [ ] Implementar monitoring/highlight.ts
- [ ] Testar em desenvolvimento

### Integração (1 hora)
- [ ] Adicionar Highlight ao layout.tsx
- [ ] Adicionar middleware a webhook route
- [ ] Adicionar logging em orders.ts
- [ ] Adicionar logging em webhooks.ts
- [ ] Implementar ConversionTracker
- [ ] Testar em staging

### Alertas (30 minutos)
- [ ] Configurar alerta de erro crítico
- [ ] Configurar alerta de webhook falha
- [ ] Configurar alerta de alta latência
- [ ] Testar notificações (Slack/Email)

### Dashboard (15 minutos)
- [ ] Criar dashboard de conversão
- [ ] Criar dashboard de erros
- [ ] Criar dashboard de webhooks
- [ ] Salvar queries úteis

---

## 8️⃣ CUSTO TOTAL: $0/mês

### Breakdown:
```
Highlight.io Free:
  ✅ 1,000 sessions/mês
  ✅ Unlimited errors
  ✅ Unlimited logs
  ✅ Session replay
  ✅ Performance monitoring

Better-Stack Free:
  ✅ 1 GB logs/mês
  ✅ 3 dias retention
  ✅ Unlimited alerts
  ✅ Live tail
  ✅ SQL queries

Total: $0/mês até ~1000 sessions/mês
```

### Quando upgrade:
```
Highlight.io Team ($20/mês):
  - 10,000 sessions/mês
  - Longer retention
  
Better-Stack Pro ($10/mês):
  - 5 GB logs/mês
  - 7 dias retention
  - Mais alertas

Total: $30/mês (muito menos que Sentry $26 + CloudWatch $$$)
```

---

## 🎯 CONCLUSÃO

**Stack de monitoring 100% free:**
- ✅ Highlight.io: Errors + Performance + Session Replay
- ✅ Pino: Structured logging
- ✅ Better-Stack: Log management + Alertas
- ✅ Custo: $0/mês até ~1000 subs

**Melhor que:**
- ❌ Sentry Free (5k errors vs unlimited)
- ❌ CloudWatch (UI ruim, custo escalável)
- ❌ DataDog (muito caro)

**Próximos passos:**
1. Implementar Highlight.io (30 min)
2. Implementar Pino Logger (15 min)
3. Configurar Better-Stack (15 min)
4. Configurar alertas (15 min)

**Total: 1h15 para monitoring completo e profissional! 🚀**
