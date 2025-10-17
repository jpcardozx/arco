# 🏗️ BACKEND COMPLETO - CHECKLIST DE CONFIGURAÇÃO

**Data:** 08/10/2025  
**Sistema:** ARCO - Mercado Pago Full Stack Implementation

---

## 📊 STATUS ATUAL

### ✅ O QUE JÁ TEMOS

#### Backend Básico (100%)
- ✅ SDK Mercado Pago v2 configurado
- ✅ Preference API (criação de pedidos)
- ✅ Webhook endpoint (`/api/webhooks/mercadopago`)
- ✅ Webhook validation (signature)
- ✅ Webhook storage (database)
- ✅ Database schema completo (5 tabelas)
- ✅ Types gerados do Supabase
- ✅ Cliente Supabase tipado

#### Infraestrutura Dev (Temporária)
- ✅ Ngrok tunnel (dev only)
- ✅ Webhook testing funcionando
- ✅ Monitor dashboard em tempo real

### ❌ O QUE FALTA IMPLEMENTAR

#### 1. Backend - Configurações Críticas
- [ ] **Logs estruturados** (Winston/Pino)
- [ ] **Webhooks internos** (notificar outros serviços)
- [ ] **Webhooks de intermediação** (retry logic, dead letter queue)
- [ ] **Substituição ngrok → AWS** (ALB + Route53)
- [ ] **Session management** (usuário logado)
- [ ] **Idempotency keys** (evitar duplicação)
- [ ] **Rate limiting** (proteção DDoS)
- [ ] **CORS configurado** (produção)
- [ ] **Health checks** (monitoramento)
- [ ] **Métricas** (Prometheus/CloudWatch)

#### 2. Frontend - Páginas Completas
- [ ] **Provider MercadoPago** (inicialização SDK)
- [ ] **Página /pricing** (já tem design, falta integração)
- [ ] **Página /checkout/[planId]** (Payment Brick)
- [ ] **Página /checkout/success** (confirmação)
- [ ] **Página /checkout/error** (falha)
- [ ] **Página /checkout/pending** (aguardando)
- [ ] **Página /dashboard/subscription** (gerenciar assinatura)
- [ ] **Modal cancelamento** (cancel flow)
- [ ] **Componente PaymentBrick** (wrapper MP)
- [ ] **Componente StatusBrick** (status pagamento)

#### 3. API Routes Necessárias
- [ ] **POST /api/checkout/create-preference** (criar pedido)
- [ ] **POST /api/checkout/process-payment** (processar)
- [ ] **GET /api/subscription/[id]** (status assinatura)
- [ ] **POST /api/subscription/cancel** (cancelar)
- [ ] **POST /api/subscription/upgrade** (upgrade plano)
- [ ] **GET /api/payments/history** (histórico)
- [ ] **POST /api/webhooks/internal** (webhook interno)

#### 4. Database - Migrações Pendentes
- [ ] **user_subscriptions** (relação user↔subscription)
- [ ] **subscription_changes** (histórico de mudanças)
- [ ] **payment_attempts** (tentativas de pagamento)
- [ ] **webhook_logs** (logs estruturados)
- [ ] **audit_log** (auditoria completa)

#### 5. Infraestrutura - Migração AWS
- [ ] **VPC** (rede isolada)
- [ ] **ALB** (Application Load Balancer)
- [ ] **Route53** (DNS)
- [ ] **Certificate Manager** (SSL)
- [ ] **ECS/Fargate** (containers Next.js)
- [ ] **RDS Proxy** (connection pooling Supabase)
- [ ] **CloudWatch** (logs e métricas)
- [ ] **SNS/SQS** (webhooks assíncronos)
- [ ] **S3** (assets estáticos)

---

## 🎯 PRIORIZAÇÃO (MoSCoW)

### MUST HAVE (P0 - Bloqueia lançamento)

#### Backend
1. **Logs Estruturados** (2h)
   - Winston ou Pino
   - Formato JSON
   - Níveis: error, warn, info, debug
   - CloudWatch integration ready

2. **Webhooks Internos** (3h)
   - Sistema de pub/sub interno
   - Notificar: email service, analytics, CRM
   - Queue baseada (SQS ou Redis)

3. **Session Management** (2h)
   - Integrar com NextAuth/Supabase Auth
   - Middleware de autenticação
   - RLS policies no Supabase

4. **Idempotency Keys** (1h)
   - Prevenir pagamentos duplicados
   - Cache de 24h (Redis/Upstash)

5. **Substituição Ngrok → AWS** (8h)
   - ALB + Route53 + SSL
   - Webhook URL permanente
   - Configurar no Mercado Pago

#### Frontend
1. **MercadoPago Provider** (1h)
   - Inicialização SDK única
   - Context API

2. **Payment Flow Completo** (6h)
   - Checkout page
   - Success page
   - Error page
   - Pending page

3. **Pricing Integration** (2h)
   - Conectar botões CTAs
   - Passar planId para checkout

### SHOULD HAVE (P1 - Essencial para UX)

#### Backend
1. **Webhooks de Intermediação** (4h)
   - Retry logic (exponential backoff)
   - Dead letter queue
   - Circuit breaker

2. **Rate Limiting** (2h)
   - API routes protegidas
   - Upstash Rate Limit
   - 100 req/min por IP

3. **Health Checks** (1h)
   - /api/health endpoint
   - Verificar DB, MP API
   - Status dashboard

#### Frontend
1. **Dashboard Subscription** (4h)
   - Ver status assinatura
   - Histórico de pagamentos
   - Atualizar cartão

2. **Cancel Flow** (2h)
   - Modal confirmação
   - Motivo cancelamento
   - Processo graceful

### COULD HAVE (P2 - Nice to have)

#### Backend
1. **Métricas** (3h)
   - Prometheus/CloudWatch
   - Dashboards Grafana
   - Alertas

2. **Analytics Events** (2h)
   - Track conversões
   - Segment/Mixpanel
   - Funil de vendas

#### Frontend
1. **Upgrade Flow** (3h)
   - Mudar de plano
   - Prorate values
   - Confirmação

2. **Payment History** (2h)
   - Lista de pagamentos
   - Download recibos
   - Filtros

### WON'T HAVE (P3 - Futuro)

1. **Multi-currency** (depois)
2. **A/B Testing framework** (depois)
3. **Referral program** (depois)
4. **Coupons/Discounts** (depois)

---

## 📝 IMPLEMENTAÇÃO DETALHADA

### 1. LOGS ESTRUTURADOS

#### Instalar Winston
```bash
pnpm add winston winston-transport
pnpm add -D @types/winston
```

#### Configurar Logger
```typescript
// src/lib/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'arco-backend',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Console (dev)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // File (produção)
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

// CloudWatch transport (produção)
if (process.env.NODE_ENV === 'production') {
  const WinstonCloudWatch = require('winston-cloudwatch');
  
  logger.add(new WinstonCloudWatch({
    logGroupName: '/arco/backend',
    logStreamName: `instance-${process.env.INSTANCE_ID}`,
    awsRegion: 'sa-east-1',
  }));
}

export { logger };
```

#### Usar nos Endpoints
```typescript
// src/app/api/webhooks/mercadopago/route.ts
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  logger.info('Webhook received', {
    headers: Object.fromEntries(request.headers),
  });

  try {
    // ... processar webhook
    
    logger.info('Webhook processed successfully', {
      webhookId,
      eventType: event.type,
    });
  } catch (error) {
    logger.error('Webhook processing failed', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
```

---

### 2. WEBHOOKS INTERNOS

#### Criar Sistema de Pub/Sub
```typescript
// src/lib/events/webhook-emitter.ts
import { EventEmitter } from 'events';

class WebhookEmitter extends EventEmitter {
  async emitWebhookEvent(event: {
    type: 'payment.created' | 'payment.approved' | 'subscription.created';
    data: any;
  }) {
    this.emit('webhook', event);
    
    // Log
    logger.info('Internal webhook emitted', { type: event.type });
  }
}

export const webhookEmitter = new WebhookEmitter();
```

#### Registrar Listeners
```typescript
// src/lib/events/listeners.ts
import { webhookEmitter } from './webhook-emitter';
import { sendEmail } from '../email';
import { trackEvent } from '../analytics';

// Email notifications
webhookEmitter.on('webhook', async (event) => {
  if (event.type === 'payment.approved') {
    await sendEmail({
      to: event.data.payer.email,
      subject: 'Pagamento Aprovado',
      template: 'payment-success',
      data: event.data,
    });
  }
});

// Analytics tracking
webhookEmitter.on('webhook', async (event) => {
  await trackEvent({
    event: event.type,
    properties: event.data,
    userId: event.data.userId,
  });
});

// CRM sync
webhookEmitter.on('webhook', async (event) => {
  if (event.type === 'subscription.created') {
    await syncToCRM(event.data);
  }
});
```

#### Usar no Webhook Handler
```typescript
// src/app/api/webhooks/mercadopago/route.ts
import { webhookEmitter } from '@/lib/events/webhook-emitter';

export async function POST(request: NextRequest) {
  // ... processar webhook do MP
  
  // Emitir evento interno
  await webhookEmitter.emitWebhookEvent({
    type: 'payment.approved',
    data: paymentData,
  });
}
```

---

### 3. SESSION MANAGEMENT

#### Middleware de Autenticação
```typescript
// src/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/client';

export async function requireAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const supabase = getSupabaseAdmin();
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  return user;
}
```

#### Usar nas API Routes
```typescript
// src/app/api/subscription/[id]/route.ts
import { requireAuth } from '@/middleware/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth(request);
  
  if (user instanceof NextResponse) {
    return user; // Erro de auth
  }

  // Buscar subscription do usuário
  const subscription = await getSubscription(params.id, user.id);
  
  return NextResponse.json(subscription);
}
```

---

### 4. IDEMPOTENCY KEYS

#### Setup Redis (Upstash)
```typescript
// src/lib/redis.ts
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
```

#### Middleware de Idempotência
```typescript
// src/lib/middleware/idempotency.ts
import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function checkIdempotency(
  request: NextRequest,
  handler: Function
) {
  const idempotencyKey = request.headers.get('idempotency-key');
  
  if (!idempotencyKey) {
    return handler(request);
  }

  // Verificar se já processamos
  const cached = await redis.get(`idempotency:${idempotencyKey}`);
  
  if (cached) {
    logger.info('Idempotent request detected', { idempotencyKey });
    return NextResponse.json(cached);
  }

  // Processar e cachear por 24h
  const response = await handler(request);
  const data = await response.json();
  
  await redis.setex(
    `idempotency:${idempotencyKey}`,
    86400, // 24h
    data
  );

  return NextResponse.json(data);
}
```

#### Usar no Checkout
```typescript
// src/app/api/checkout/process-payment/route.ts
export async function POST(request: NextRequest) {
  return checkIdempotency(request, async (req) => {
    // Processar pagamento
  });
}
```

---

### 5. SUBSTITUIÇÃO NGROK → AWS

#### Arquitetura AWS

```
Internet
  ↓
Route53 (webhooks.arco.com)
  ↓
Certificate Manager (SSL)
  ↓
Application Load Balancer
  ↓
Target Group
  ↓
ECS Fargate (Next.js container)
  ↓
Supabase (database)
```

#### Terraform Configuration
```hcl
# infra/main.tf
resource "aws_lb" "main" {
  name               = "arco-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  tags = {
    Environment = "production"
  }
}

resource "aws_lb_target_group" "app" {
  name     = "arco-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    path                = "/api/health"
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.main.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

resource "aws_route53_record" "webhooks" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "webhooks.arco.com"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}
```

#### Configurar no Mercado Pago
```bash
# Após deploy AWS
# Atualizar URL no painel do MP:
https://webhooks.arco.com/api/webhooks/mercadopago
```

---

## 📊 ESTIMATIVA DE TEMPO

### Backend
| Task | Priority | Time | Dependencies |
|------|----------|------|--------------|
| Logs estruturados | P0 | 2h | - |
| Webhooks internos | P0 | 3h | Logs |
| Session management | P0 | 2h | - |
| Idempotency keys | P0 | 1h | Redis |
| AWS migration | P0 | 8h | Terraform |
| Webhooks intermediação | P1 | 4h | SQS |
| Rate limiting | P1 | 2h | Upstash |
| Health checks | P1 | 1h | - |
| **Total Backend** | - | **23h** | - |

### Frontend
| Task | Priority | Time | Dependencies |
|------|----------|------|--------------|
| MP Provider | P0 | 1h | - |
| Checkout page | P0 | 3h | Provider |
| Success page | P0 | 1h | - |
| Error page | P0 | 1h | - |
| Pending page | P0 | 1h | - |
| Pricing integration | P0 | 2h | Checkout |
| Dashboard subscription | P1 | 4h | Auth |
| Cancel flow | P1 | 2h | Dashboard |
| **Total Frontend** | - | **15h** | - |

### Total Geral: **38 horas** (≈ 5 dias úteis)

---

## 🎯 PLANO DE EXECUÇÃO (Sprint)

### Sprint 1: Backend Core (1 semana)
**Dia 1-2:**
- ✅ Logs estruturados
- ✅ Webhooks internos
- ✅ Session management

**Dia 3-4:**
- ✅ Idempotency keys
- ✅ Rate limiting
- ✅ Health checks

**Dia 5:**
- ✅ AWS migration
- ✅ Configurar MP webhook URL

### Sprint 2: Frontend Complete (1 semana)
**Dia 1-2:**
- ✅ MP Provider
- ✅ Checkout page
- ✅ Success/Error/Pending pages

**Dia 3-4:**
- ✅ Pricing integration
- ✅ Dashboard subscription

**Dia 5:**
- ✅ Cancel flow
- ✅ Testing E2E

### Sprint 3: Refinamento (3 dias)
**Dia 1:**
- ✅ Webhooks intermediação
- ✅ Retry logic

**Dia 2:**
- ✅ Métricas
- ✅ Analytics

**Dia 3:**
- ✅ Load testing
- ✅ Deploy produção

---

## ✅ CHECKLIST FINAL

### Backend
- [ ] Logs estruturados (Winston/CloudWatch)
- [ ] Webhooks internos (EventEmitter)
- [ ] Session management (Auth middleware)
- [ ] Idempotency keys (Redis)
- [ ] Rate limiting (Upstash)
- [ ] Health checks (/api/health)
- [ ] AWS migration (ALB + Route53)
- [ ] Webhooks intermediação (SQS + retry)
- [ ] Métricas (CloudWatch)

### Frontend
- [ ] MP Provider (SDK init)
- [ ] Checkout page (Payment Brick)
- [ ] Success page
- [ ] Error page
- [ ] Pending page
- [ ] Pricing integration
- [ ] Dashboard subscription
- [ ] Cancel flow

### Database
- [ ] user_subscriptions table
- [ ] subscription_changes table
- [ ] payment_attempts table
- [ ] webhook_logs table
- [ ] audit_log table

### DevOps
- [ ] Terraform scripts
- [ ] CI/CD pipeline
- [ ] Monitoring alerts
- [ ] Backup strategy
- [ ] Disaster recovery

---

**Status:** 📋 **PLANO COMPLETO PRONTO**  
**Próximo Passo:** Começar Sprint 1 (Backend Core)
