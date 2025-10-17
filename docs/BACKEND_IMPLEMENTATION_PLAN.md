# 🎯 Backend Core Implementation Plan

**Estimated Time:** 1h30min  
**Priority:** P0 (blocks frontend)  
**Dependencies:** Database ✅, Webhook URL configured ⏳

---

## 📋 Files to Create

### 1. SDK Client (10 min)
**File:** `src/lib/payments/mercadopago/client.ts`  
**Purpose:** Initialize Mercado Pago SDK  
**Lines:** ~30

```typescript
import { MercadoPago } from 'mercadopago';

export const mercadoPagoClient = new MercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
    idempotencyKey: 'optional-key',
  }
});

export const MP_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!,
  env: process.env.MERCADOPAGO_ENV || 'test',
} as const;
```

---

### 2. Orders API Integration (30 min)
**File:** `src/lib/payments/mercadopago/orders.ts`  
**Purpose:** CRUD operations for Orders v2  
**Lines:** ~150

**Functions:**
```typescript
// Create order for checkout
export async function createOrder(params: {
  userId: string;
  planId: string;
  amount: number;
  paymentMethodId: string;
}): Promise<OrderResponse>

// Capture authorized payment
export async function captureOrder(orderId: string): Promise<CaptureResponse>

// Cancel order
export async function cancelOrder(orderId: string): Promise<void>

// Refund payment
export async function refundPayment(paymentId: string): Promise<RefundResponse>

// Get order status
export async function getOrderStatus(orderId: string): Promise<OrderStatus>
```

**Database Integration:**
- Insert into `payment_transactions`
- Update `subscriptions` status
- Log to `webhook_events`

---

### 3. Webhook Validation & Processing (20 min)
**File:** `src/lib/payments/mercadopago/webhooks.ts`  
**Purpose:** Validate x-signature and process events  
**Lines:** ~120

**Functions:**
```typescript
// Validate webhook signature
export async function validateWebhookSignature(
  body: string,
  signature: string,
  requestId: string
): Promise<boolean>

// Process webhook event
export async function processWebhook(
  event: MercadoPagoWebhookEvent
): Promise<void>

// Handle payment event
async function handlePaymentEvent(data: PaymentData): Promise<void>

// Handle merchant_order event
async function handleMerchantOrderEvent(data: OrderData): Promise<void>

// Handle subscription event
async function handleSubscriptionEvent(data: SubscriptionData): Promise<void>
```

**Security:**
- x-signature validation (HMAC SHA256)
- Idempotency check (webhook_events.gateway_event_id)
- Request ID validation

---

### 4. API Route Handler (30 min)
**File:** `src/app/api/webhooks/mercadopago/route.ts`  
**Purpose:** Next.js API route for webhooks  
**Lines:** ~100

**Structure:**
```typescript
export async function POST(request: Request) {
  try {
    // 1. Extract headers
    const signature = request.headers.get('x-signature');
    const requestId = request.headers.get('x-request-id');
    
    // 2. Read body
    const body = await request.text();
    
    // 3. Validate signature
    const isValid = await validateWebhookSignature(body, signature, requestId);
    if (!isValid) return new Response('Invalid signature', { status: 401 });
    
    // 4. Check idempotency
    const exists = await checkWebhookExists(requestId);
    if (exists) return new Response('Already processed', { status: 200 });
    
    // 5. Parse event
    const event = JSON.parse(body);
    
    // 6. Store webhook
    await storeWebhookEvent(event, requestId);
    
    // 7. Process event
    await processWebhook(event);
    
    // 8. Return success
    return new Response('OK', { status: 200 });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal error', { status: 500 });
  }
}
```

**Edge Cases:**
- Duplicate webhooks (idempotency)
- Invalid signatures (reject)
- Processing errors (retry)
- Timeout handling

---

## 🗂️ Database Operations

### Insert Transaction
```typescript
await supabase
  .from('payment_transactions')
  .insert({
    user_id: userId,
    gateway: 'mercadopago',
    gateway_transaction_id: paymentId,
    gateway_order_id: orderId,
    amount: amount,
    currency: 'BRL',
    status: 'succeeded',
    payment_method_type: 'credit_card',
    paid_at: new Date().toISOString(),
  });
```

### Update Subscription
```typescript
await supabase
  .from('subscriptions')
  .update({
    status: 'active',
    current_period_start: periodStart,
    current_period_end: periodEnd,
    updated_at: new Date().toISOString(),
  })
  .eq('gateway_subscription_id', subscriptionId);
```

### Log Webhook
```typescript
await supabase
  .from('webhook_events')
  .insert({
    gateway: 'mercadopago',
    gateway_event_id: requestId,
    event_type: eventType,
    payload: eventData,
    processed: true,
    processed_at: new Date().toISOString(),
  });
```

---

## 🧪 Testing Strategy

### 1. Unit Tests (optional)
```bash
# Test webhook signature validation
npm test -- webhooks.test.ts

# Test order creation
npm test -- orders.test.ts
```

### 2. Integration Tests (via MP Simulator)
**URL:** https://www.mercadopago.com.br/developers/panel/webhooks/simulator

**Test Cases:**
- Payment approved → subscription active
- Payment rejected → transaction failed
- Payment pending → awaiting confirmation
- Subscription renewed → period updated

### 3. Manual Tests (Postman/cURL)
```bash
# Test webhook endpoint (should return 405 for GET)
curl https://arco.vercel.app/api/webhooks/mercadopago

# Simulate webhook POST (requires valid signature)
curl -X POST https://arco.vercel.app/api/webhooks/mercadopago \
  -H "x-signature: ts=123,v1=abc" \
  -H "x-request-id: unique-id" \
  -d '{"type":"payment","data":{"id":"123"}}'
```

---

## 📊 Implementation Checklist

### Phase 1: Setup (10 min)
- [ ] Create directory structure
- [ ] Install types: `@types/mercadopago`
- [ ] Create client.ts with SDK initialization

### Phase 2: Orders API (30 min)
- [ ] Implement createOrder()
- [ ] Implement captureOrder()
- [ ] Implement cancelOrder()
- [ ] Implement refundPayment()
- [ ] Add database integration

### Phase 3: Webhooks (20 min)
- [ ] Implement signature validation
- [ ] Implement idempotency check
- [ ] Implement event processors (payment, order, subscription)
- [ ] Add error handling

### Phase 4: API Route (30 min)
- [ ] Create route.ts with POST handler
- [ ] Integrate validation + processing
- [ ] Add logging
- [ ] Test with simulator

### Phase 5: Validation (10 min)
- [ ] Test via MP simulator
- [ ] Verify database records
- [ ] Check Vercel logs
- [ ] Confirm idempotency

---

## 🚀 Quick Start Commands

```bash
# Create directory structure
mkdir -p src/lib/payments/mercadopago
mkdir -p src/app/api/webhooks/mercadopago

# Create files
touch src/lib/payments/mercadopago/client.ts
touch src/lib/payments/mercadopago/orders.ts
touch src/lib/payments/mercadopago/webhooks.ts
touch src/app/api/webhooks/mercadopago/route.ts

# Install types (if needed)
pnpm add -D @types/node

# Start development server
pnpm dev
```

---

## 📖 References

- **Orders API v2:** https://www.mercadopago.com.br/developers/en/reference/orders
- **Webhooks:** https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
- **x-signature:** https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks#bookmark_valide_a_origem_da_notificação
- **SDK Node:** https://github.com/mercadopago/sdk-nodejs

---

## ⏱️ Timeline

| Phase | Time | Status |
|-------|------|--------|
| Setup | 10 min | ⏳ |
| Orders API | 30 min | ⏳ |
| Webhooks | 20 min | ⏳ |
| API Route | 30 min | ⏳ |
| Testing | 10 min | ⏳ |
| **TOTAL** | **1h40min** | - |

---

**Current Progress:** 38%  
**After Backend:** 53% (+15%)  
**Next:** Frontend checkout (Payment Brick)
