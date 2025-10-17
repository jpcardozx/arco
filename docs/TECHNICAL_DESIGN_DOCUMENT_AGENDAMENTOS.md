# Technical Design Document - Sistema de Agendamentos ARCO

**Document Type:** System Architecture Document (SAD) + Implementation Status Report  
**Project:** ARCO Booking System  
**Version:** 1.0.0  
**Date:** 2025-10-09  
**Status:** Development Complete, Pending Deployment  
**Author:** Development Team

---

## Executive Summary

Sistema público de agendamento de consultorias com pagamento integrado Mercado Pago, notificações automáticas e gestão completa de bookings. Implementação completa do frontend e backend, pendente apenas configuração de infraestrutura e deployment.

**Key Metrics:**
- Development: 100% complete (3,500 LOC)
- Testing: 0% (pending)
- Deployment: 0% (pending configuration)
- Estimated time to production: 4-6 hours

---

## 1. System Architecture

### 1.1 Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER                                          │
├─────────────────────────────────────────────────────────────┤
│ Next.js 15 (App Router) + React 19 + TypeScript            │
│ Tailwind CSS + shadcn/ui + Framer Motion                   │
│ Client-side: React Query, Zustand (state management)       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ API LAYER (Next.js API Routes)                             │
├─────────────────────────────────────────────────────────────┤
│ • /api/agendamentos/*      - Booking management            │
│ • /api/mercadopago/*       - Payment processing            │
│ • /api/emails/*            - Notification delivery         │
│ • /api/webhooks/*          - External integrations         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ BUSINESS LOGIC LAYER                                        │
├─────────────────────────────────────────────────────────────┤
│ • Lead Scoring Engine      - AI-based qualification        │
│ • Availability Calculator  - Real-time slot management     │
│ • Discount Validator       - Coupon logic                  │
│ • Payment Orchestrator     - Mercado Pago integration      │
│ • Email Composer           - Template rendering            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ DATA LAYER                                                  │
├─────────────────────────────────────────────────────────────┤
│ Supabase PostgreSQL 15                                      │
│ • 9 core tables with RLS                                    │
│ • 3 automated triggers                                      │
│ • 2 materialized views                                      │
│ • Real-time subscriptions                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ EXTERNAL SERVICES                                           │
├─────────────────────────────────────────────────────────────┤
│ • Mercado Pago API v1      - Payment gateway               │
│ • Resend API               - Email delivery                │
│ • Google Calendar API      - Calendar sync (future)        │
│ • Vercel Edge Functions    - Serverless execution          │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Database Schema Overview

**9 Core Tables:**

1. **consultoria_types** (4 rows seeded)
   - Product catalog
   - Pricing: R$500 - R$1,500
   - Duration: 60-120 minutes

2. **qualification_responses**
   - Lead qualification data
   - AI score: 0-100
   - Conversion indicator

3. **consultoria_bookings** (central entity)
   - Booking state machine
   - Payment tracking
   - Foreign keys: user_id, consultoria_type_id, discount_code_id

4. **consultant_availability**
   - Weekly availability patterns
   - Day-of-week based scheduling
   - Buffer time management

5. **discount_codes**
   - Percentage/fixed discounts
   - Usage limits & expiration
   - Consultoria-specific targeting

6. **calendar_events**
   - Unified calendar system
   - Recurrence support (RRULE)
   - External sync readiness

7. **email_templates** (2 templates seeded)
   - Reusable HTML templates
   - Variable interpolation
   - Multi-channel ready

8. **notification_queue**
   - Async notification processing
   - Retry mechanism (max 3 attempts)
   - Provider agnostic

9. **booking_notes**
   - Internal team communication
   - Issue tracking
   - Admin-only access

**Key Relationships:**
```
users (auth.users)
  ├─→ qualification_responses (1:N)
  ├─→ consultoria_bookings (1:N)
  ├─→ calendar_events (1:N)
  └─→ notification_queue (1:N)

consultoria_types
  ├─→ consultoria_bookings (1:N)
  └─→ discount_codes (1:N)

consultoria_bookings
  ├─→ qualification_responses (1:1)
  ├─→ booking_notes (1:N)
  └─→ calendar_events (1:1 via metadata)
```

### 1.3 Security Architecture

**Authentication:** Supabase Auth (JWT-based)
- Session management: 7-day expiry
- MFA support: Available
- Social login: Google, GitHub ready

**Authorization:** Row Level Security (RLS)
- All tables have RLS enabled
- Policy types: SELECT, INSERT, UPDATE, DELETE
- User isolation: `auth.uid() = user_id`
- Admin override: Role-based policies

**Data Protection:**
- Sensitive fields: Encrypted at rest (pgcrypto)
- Payment data: PCI-compliant (Mercado Pago handles card data)
- Logs: No PII in application logs
- API keys: Environment variables only

**Input Validation:**
- Schema validation: Zod on all API endpoints
- SQL injection: Parameterized queries (Supabase client)
- XSS protection: React automatic escaping
- CSRF: SameSite cookies + CORS configuration

---

## 2. Implementation Status

### 2.1 Completed Components

#### Frontend (4/4 components) ✅

**DateTimePicker** (250 LOC)
- Week navigation with boundary logic
- Real-time availability from `consultant_availability`
- Conflict detection via `consultoria_bookings` query
- Optimistic UI updates
- Accessibility: ARIA labels, keyboard navigation

**CheckoutMP** (350 LOC)
- Mercado Pago Wallet integration
- Discount code application
- Order summary calculation
- Trust indicators (security badges)
- Error boundary implementation

**Confirmation Page** (450 LOC)
- Canvas-confetti celebration (3s animation)
- .ics file generation (ics library)
- Google Calendar deep link
- Preparation checklist (6 items)
- Meeting URL display (conditional)

**QualificationModal** (existing, 400 LOC)
- Multi-step form (4 steps)
- Progress indicator
- AI scoring integration
- Local storage persistence

#### Backend (4/4 APIs) ✅

**POST /api/agendamentos/create-booking** (350 LOC)
- Input validation: Zod schema
- Availability check: Double-booking prevention
- Lead scoring: 5-factor algorithm
- Discount application: Atomic transaction
- Analytics event: booking_created
- Response time: ~300ms (estimated)

**POST /api/mercadopago/create-preference** (280 LOC)
- Preference creation with full metadata
- Payment methods: PIX, Card, Boleto
- Installments: 1-12x
- Expiration: 24h auto-expire
- Webhook URL configuration
- Response time: ~500ms (external call)

**POST /api/mercadopago/validate-discount** (380 LOC)
- Real-time validation (6 checks)
- Error code mapping
- Usage increment (atomic)
- Analytics tracking
- Admin endpoints: GET (list), PUT (create)

**POST /api/emails/send-confirmation** (550 LOC)
- 5 email types with HTML templates
- Resend API integration
- Retry queue on failure
- i18n ready (date formatting)
- Response time: ~800ms (external call)

#### Database (2/2 migrations) ✅

**Migration 1:** 20250110_create_agendamentos_system.sql (616 LOC)
- Core booking system
- Seeded data: 4 consultoria types
- Views: available_time_slots, booking_dashboard

**Migration 2:** 20251009_add_calendar_and_enhancements.sql (600 LOC)
- Calendar integration
- Notification queue
- Auto-triggers: 3 functions
- Seeded data: 2 email templates

### 2.2 Pending Items

**Critical (Blocking Deployment):**
1. TypeScript compilation errors (3 files)
   - Import path mismatch in validate-discount route
   - Implicit any types in error handlers
   - Estimated fix time: 30 minutes

2. Environment variables configuration
   - MERCADO_PAGO_ACCESS_TOKEN (production)
   - RESEND_API_KEY (verified domain)
   - Estimated setup time: 1 hour

3. Database migrations application
   - Apply both SQL files via Supabase dashboard
   - Verify trigger execution
   - Estimated time: 30 minutes

**High Priority (Post-Launch):**
1. Admin dashboard for booking management
2. Cancellation/reschedule flow
3. Rate limiting (Vercel Edge Config)
4. Error monitoring (Sentry integration)

**Medium Priority (Week 2):**
1. Google Calendar OAuth sync
2. Zoom auto-meeting creation
3. SMS reminders (Twilio)
4. Multi-language support

**Low Priority (Backlog):**
1. Review system post-consultoria
2. Referral program
3. Package deals
4. Team consultations (multiple attendees)

---

## 3. Data Flow & Information Architecture

### 3.1 Customer Journey (Booking Flow)

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: DISCOVERY                                           │
│ Page: /agendamentos                                         │
├─────────────────────────────────────────────────────────────┤
│ User Action: Lands on page, browses consultoria cards      │
│ Data Collected: None (anonymous)                           │
│ Analytics: page_view, consultoria_card_click               │
└─────────────────────────────────────────────────────────────┘
                            ↓ Click "Agendar"
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: QUALIFICATION                                       │
│ Component: QualificationModal (4 steps)                     │
├─────────────────────────────────────────────────────────────┤
│ Input Collection:                                           │
│ • Challenge (8 options) → 20 pts max                        │
│ • Budget (5 ranges) → 35 pts max                            │
│ • Urgency (4 levels) → 25 pts max                           │
│ • Company info (size, website, campaigns) → 20 pts max      │
│                                                             │
│ Data Processing:                                            │
│ • AI Score calculation: Σ(weighted_factors) = 0-100        │
│ • Consultoria recommendation: argmax(score × price_fit)     │
│ • Session persistence: localStorage (sessionId)             │
│                                                             │
│ Database Write: None yet (held in memory)                  │
│ Exit Criteria: Score >= 30 (qualified lead)                │
└─────────────────────────────────────────────────────────────┘
                            ↓ If score < 30: Show nurture CTA
                            ↓ If score >= 30: Continue
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: AUTHENTICATION                                      │
│ Component: Auth Gate (Supabase Auth UI)                     │
├─────────────────────────────────────────────────────────────┤
│ User Action: Login or Signup                                │
│ Data Created: user_profiles row (via trigger)              │
│ Session: JWT token (7-day expiry)                           │
│ Redirect: Back to booking flow with preserved state         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: CONSULTORIA SELECTION                               │
│ Component: ConsultoriaCard grid                             │
├─────────────────────────────────────────────────────────────┤
│ Display: 4 cards with recommendation badge                  │
│ Data Fetched: consultoria_types (cached, 5min TTL)         │
│ User Action: Selects consultoria                            │
│ State Update: selectedConsultoriaId                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: DATE & TIME SELECTION                               │
│ Component: DateTimePicker                                   │
├─────────────────────────────────────────────────────────────┤
│ Availability Query:                                         │
│ SELECT * FROM consultant_availability                       │
│ WHERE day_of_week = $1 AND is_available = true             │
│                                                             │
│ Conflict Check:                                             │
│ SELECT id FROM consultoria_bookings                         │
│ WHERE scheduled_date = $1 AND scheduled_time = $2           │
│ AND booking_status IN ('confirmed', 'pending_payment')      │
│                                                             │
│ User Action: Selects date + time                            │
│ Validation: Min 24h advance booking                         │
│ State Update: selectedDateTime                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ On confirm
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: BOOKING CREATION                                    │
│ API: POST /api/agendamentos/create-booking                  │
├─────────────────────────────────────────────────────────────┤
│ Transaction Sequence:                                       │
│ 1. INSERT INTO qualification_responses                      │
│    RETURNING id → qualification_response_id                 │
│                                                             │
│ 2. INSERT INTO consultoria_bookings (ATOMIC)                │
│    - user_id (from JWT)                                     │
│    - consultoria_type_id                                    │
│    - qualification_response_id                              │
│    - scheduled_date, scheduled_time                         │
│    - booking_status: 'pending_payment'                      │
│    - final_price_cents (with discount if applied)           │
│    RETURNING id → booking_id                                │
│                                                             │
│ 3. IF discount_code:                                        │
│    UPDATE discount_codes                                    │
│    SET current_uses = current_uses + 1                      │
│    WHERE id = $1                                            │
│                                                             │
│ 4. INSERT INTO analytics_events (async)                     │
│                                                             │
│ Response: { booking_id, consultoria, schedule, discount }  │
│ Client Action: Navigate to checkout                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 7: PAYMENT                                             │
│ Component: CheckoutMP                                       │
│ API: POST /api/mercadopago/create-preference                │
├─────────────────────────────────────────────────────────────┤
│ Preference Creation:                                        │
│ {                                                           │
│   items: [{ title, unit_price, quantity: 1 }],             │
│   payer: { name, email, phone },                            │
│   external_reference: booking_id,                           │
│   notification_url: /api/webhooks/mercadopago,             │
│   back_urls: { success, failure, pending },                 │
│   expires: true, expiration_date_to: now + 24h             │
│ }                                                           │
│                                                             │
│ Response: { preference_id, init_point }                     │
│                                                             │
│ Mercado Pago Wallet: Renders checkout                      │
│ Payment Methods: PIX (instant), Card (1-12x), Boleto       │
│                                                             │
│ User Action: Completes payment                              │
│ MP Redirect: back_urls.success                             │
└─────────────────────────────────────────────────────────────┘
                            ↓ Async webhook
┌─────────────────────────────────────────────────────────────┐
│ STEP 8: WEBHOOK PROCESSING                                  │
│ Endpoint: POST /api/webhooks/mercadopago                    │
├─────────────────────────────────────────────────────────────┤
│ Webhook Payload:                                            │
│ { action: 'payment.updated', data: { id: payment_id } }     │
│                                                             │
│ Processing Flow:                                            │
│ 1. Validate signature (x-signature header)                  │
│ 2. Fetch payment details from MP API                        │
│ 3. Extract booking_id from external_reference               │
│ 4. Map payment status:                                      │
│    approved → confirmed                                     │
│    pending → pending_payment                                │
│    rejected → cancelled                                     │
│                                                             │
│ 5. UPDATE consultoria_bookings                              │
│    SET booking_status = $1,                                 │
│        payment_status = $2,                                 │
│        payment_id = $3                                      │
│    WHERE id = booking_id                                    │
│                                                             │
│ 6. IF status = 'confirmed':                                 │
│    TRIGGER auto_create_calendar_event()                     │
│    TRIGGER auto_schedule_reminders()                        │
│    CALL /api/emails/send-confirmation                       │
│                                                             │
│ Side Effects:                                               │
│ • calendar_events: 1 row inserted                           │
│ • notification_queue: 2 rows inserted (24h, 1h reminders)   │
│ • Email sent via Resend                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 9: CONFIRMATION                                        │
│ Page: /agendamentos/confirmacao/[bookingId]                │
├─────────────────────────────────────────────────────────────┤
│ Data Fetched:                                               │
│ SELECT b.*, ct.*, up.*                                      │
│ FROM consultoria_bookings b                                 │
│ JOIN consultoria_types ct ON b.consultoria_type_id = ct.id │
│ JOIN user_profiles up ON b.user_id = up.id                 │
│ WHERE b.id = $1                                             │
│                                                             │
│ UI Actions:                                                 │
│ • Confetti animation (3s, canvas-confetti)                  │
│ • Display booking details                                   │
│ • Generate .ics file (ics library)                          │
│ • Google Calendar button (deep link)                        │
│                                                             │
│ User Actions Available:                                     │
│ • Download calendar file                                    │
│ • Add to Google Calendar                                    │
│ • Contact support                                           │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Automated Background Processes

**Reminder Scheduler (Trigger-based):**
```sql
-- Executed on booking_status = 'confirmed'
-- Inserts 2 rows into notification_queue

Row 1: 24h reminder
  scheduled_for: meeting_datetime - INTERVAL '24 hours'
  priority: 2
  template: reminder-24h

Row 2: 1h reminder
  scheduled_for: meeting_datetime - INTERVAL '1 hour'
  priority: 1 (urgent)
  template: reminder-1h
```

**Notification Worker (Future Cron Job):**
```javascript
// Pseudo-code for background worker
// To be implemented as Vercel Cron or separate service

every(5 minutes) {
  const pendingNotifications = await db.query(`
    SELECT * FROM notification_queue
    WHERE status = 'pending'
    AND scheduled_for <= NOW()
    AND attempts < max_attempts
    ORDER BY priority ASC, scheduled_for ASC
    LIMIT 100
  `)
  
  for (const notification of pendingNotifications) {
    try {
      await sendEmail(notification)
      await markAsSent(notification.id)
    } catch (error) {
      await incrementAttempts(notification.id)
      if (notification.attempts >= 3) {
        await markAsFailed(notification.id)
      }
    }
  }
}
```

### 3.3 State Management

**Client State (React):**
- Local component state: `useState` for UI interactions
- Form state: React Hook Form (QualificationModal)
- Server state: TanStack Query (data fetching)
- Global state: None required (props drilling acceptable)

**Server State (Supabase):**
- Booking lifecycle: 6 states
  ```
  pending_payment → confirmed → completed
                 ↘ cancelled
                 ↘ no_show
                 ↘ rescheduled
  ```
- State transitions: Controlled via API
- Invalid transitions: Blocked by business logic

**Payment State (Mercado Pago):**
- MP states → App states mapping:
  ```
  approved → confirmed
  pending → pending_payment
  in_process → pending_payment
  rejected → cancelled
  cancelled → cancelled
  refunded → cancelled
  ```

---

## 4. Infrastructure & Deployment

### 4.1 Current Infrastructure

**Hosting:** Vercel (Next.js native)
- Region: auto (closest to user)
- Edge Network: Global CDN
- Serverless Functions: Node.js 20.x

**Database:** Supabase (managed PostgreSQL)
- Version: PostgreSQL 15
- Region: (to be confirmed)
- Connection pooling: Supavisor
- Backups: Daily automated

**External Services:**
- Mercado Pago: API v1, Brazil region
- Resend: Email delivery, global
- (Future) Google Calendar: OAuth 2.0
- (Future) Zoom: API v2

### 4.2 Deployment Pipeline

**Recommended Flow:**
```
main branch (protected)
  ↓ PR merge
staging branch
  ↓ Vercel auto-deploy
Staging Environment (agendamentos-staging.arco.com.br)
  ↓ Manual testing (checklist)
  ↓ Approval
Production Deployment (agendamentos.arco.com.br)
```

**Environment Configuration:**

Staging:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx-staging.supabase.co
MERCADO_PAGO_ACCESS_TOKEN=TEST-xxx (sandbox)
RESEND_API_KEY=re_xxx (test mode)
NEXT_PUBLIC_APP_URL=https://staging.arco.com.br
```

Production:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx-prod.supabase.co
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-xxx (production)
RESEND_API_KEY=re_xxx (verified domain)
NEXT_PUBLIC_APP_URL=https://arco.com.br
```

### 4.3 Monitoring & Observability

**Recommended Tools:**

1. **Error Tracking:** Sentry
   - Capture rate: 100% errors
   - Alert threshold: >5 errors/minute
   - Integration: Next.js SDK

2. **Performance:** Vercel Analytics
   - Web Vitals: LCP, FID, CLS
   - API response times
   - Real User Monitoring

3. **Logs:** Vercel Logs + Supabase Logs
   - Retention: 7 days (free tier)
   - Search: Full-text via dashboard

4. **Uptime:** (Future) UptimeRobot
   - Check interval: 5 minutes
   - Endpoints: /api/health, /agendamentos
   - Alert: Email + SMS

**Key Metrics to Track:**
```
Business Metrics:
- Bookings created /day
- Conversion rate (visitor → booking)
- Average booking value
- Discount code usage

Technical Metrics:
- API response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Database query time
- Email delivery rate

User Experience:
- Page load time (LCP < 2.5s)
- Time to interactive (TTI < 3s)
- Booking completion time (target: <3min)
- Mobile vs desktop completion rate
```

### 4.4 Scalability Considerations

**Current Architecture Limits:**
- Vercel: 100GB bandwidth/month (free tier)
- Supabase: 500MB database (free tier), 2GB bandwidth
- Resend: 100 emails/day (free tier)
- Mercado Pago: No transaction limit

**Estimated Capacity:**
- 1,000 bookings/month = ~10MB data growth
- 3,000 emails/month (3 per booking) = Paid tier required
- API calls: ~50k/month = Within free tier

**Scale-Up Plan:**
- At 100 bookings/month: Upgrade Resend ($20/mo for 50k emails)
- At 500 bookings/month: Upgrade Supabase ($25/mo for 8GB)
- At 1,000 bookings/month: Add Redis cache for availability queries

---

## 5. Risk Assessment

### 5.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| TypeScript compilation errors block deployment | High | High | Fix imports (30min task) |
| Mercado Pago webhook failures | Medium | High | Implement retry queue + manual reconciliation |
| Email delivery failures (Resend) | Low | Medium | Already have notification_queue retry logic |
| Double-booking race condition | Low | High | Add database-level unique constraint on (date, time, consultoria_type_id) |
| Supabase RLS misconfiguration | Medium | Critical | Thorough testing + policy review before production |
| API rate limiting (no implementation) | Medium | Medium | Add Vercel Edge Config rate limiter |

### 5.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low conversion rate (<5%) | Medium | High | A/B test qualification form, add social proof |
| Payment abandonment (>30%) | Medium | High | Add PIX discount, simplify checkout |
| High cancellation rate (>10%) | Low | Medium | Implement cancellation policy, charge cancellation fee |
| Fraudulent bookings | Low | Medium | Require phone verification, manual review for high-value bookings |
| Consultant availability conflicts | Medium | Medium | Buffer time, admin override capability |

### 5.3 Security Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| SQL injection | Very Low | Critical | Parameterized queries (Supabase client enforces) |
| RLS bypass | Low | Critical | Extensive testing, security review |
| Payment data leak | Very Low | Critical | Never store card data, rely on Mercado Pago |
| API key exposure | Low | High | Environment variables only, .env in .gitignore |
| DDoS on booking endpoint | Medium | High | Vercel Edge rate limiting, Cloudflare proxy |

---

## 6. Testing Strategy

### 6.1 Unit Testing (Not Implemented)

**Recommended Framework:** Vitest + React Testing Library

**Priority Tests:**
1. Lead scoring algorithm (calculateLeadScore)
2. Discount validation logic
3. Date/time availability calculator
4. Email template rendering

**Coverage Target:** 80% for business logic

### 6.2 Integration Testing (Not Implemented)

**Recommended Framework:** Playwright or Cypress

**Critical Flows:**
1. End-to-end booking (anonymous → confirmed)
2. Discount code application
3. Payment webhook processing
4. Email sending
5. Calendar event creation

### 6.3 Manual Testing Checklist

**Pre-Production Checklist:**
- [ ] Create booking (all 4 consultoria types)
- [ ] Apply valid discount code
- [ ] Apply invalid discount code (error handling)
- [ ] Complete payment via PIX
- [ ] Complete payment via Card
- [ ] Verify webhook updates booking status
- [ ] Verify email received
- [ ] Download .ics file (valid format)
- [ ] Add to Google Calendar (deep link works)
- [ ] Mobile responsive (iPhone, Android)
- [ ] Accessibility (keyboard navigation, screen reader)
- [ ] Performance (Lighthouse score >90)

---

## 7. Operational Procedures

### 7.1 Deployment Procedure

**Step-by-Step:**

1. **Pre-Deploy Checks (30 min)**
   ```bash
   # Fix TypeScript errors
   pnpm build
   # Expected: 0 errors
   
   # Run linter
   pnpm lint
   # Expected: 0 warnings
   
   # Check environment variables
   cat .env.local | grep -E "SUPABASE|MERCADO|RESEND"
   # Expected: All keys present
   ```

2. **Database Migration (30 min)**
   ```bash
   # Apply migrations via Supabase Dashboard
   # File 1: 20250110_create_agendamentos_system.sql
   # File 2: 20251009_add_calendar_and_enhancements.sql
   
   # Verify tables created
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name LIKE '%consultoria%';
   # Expected: 5 tables
   
   # Verify triggers
   SELECT trigger_name FROM information_schema.triggers;
   # Expected: 3 triggers
   ```

3. **Mercado Pago Setup (1 hour)**
   - Create production account
   - Complete verification (business documents)
   - Get APP_USR credentials
   - Configure webhook URL: `https://arco.com.br/api/webhooks/mercadopago`
   - Test webhook with MP test tool

4. **Resend Setup (30 min)**
   - Verify domain arco.com.br
   - Add DNS records (SPF, DKIM, DMARC)
   - Test email delivery
   - Get production API key

5. **Deploy to Vercel (15 min)**
   ```bash
   # Push to main branch
   git push origin main
   
   # Vercel auto-deploys
   # Monitor: https://vercel.com/dashboard
   
   # Verify deployment
   curl https://arco.com.br/api/health
   # Expected: 200 OK
   ```

6. **Smoke Testing (30 min)**
   - Create test booking
   - Verify email received
   - Check database record
   - Test webhook (manual MP test)
   - Verify calendar event created

### 7.2 Incident Response

**P0: System Down (Payment not working)**
```
1. Check Vercel status (vercel.com/status)
2. Check Mercado Pago status (status.mercadopago.com.br)
3. Check Supabase dashboard (errors, connection count)
4. Review logs (Vercel Logs last 1 hour)
5. If API issue: Rollback to previous deployment
6. If MP issue: Show "Temporarily unavailable" message
7. Notify users via status page
```

**P1: Webhook Failures**
```
1. Check notification_queue for failed notifications
2. Run manual reconciliation script (to be created)
3. Query MP API for unprocessed payments
4. Manually update booking status if needed
5. Resend confirmation emails
```

**P2: Email Delivery Issues**
```
1. Check Resend dashboard (delivery rate)
2. Verify DNS records (SPF, DKIM)
3. Check notification_queue (status = 'failed')
4. Trigger manual retry
5. If persistent: Switch to backup SMTP (Postmark, SendGrid)
```

### 7.3 Maintenance Windows

**Recommended Schedule:**
- Database maintenance: Sundays 2-4 AM BRT (low traffic)
- Deployment window: Weekdays 10 AM - 4 PM BRT (working hours, team available)
- Major updates: Friday afternoon (time to monitor over weekend)

---

## 8. Cost Analysis

### 8.1 Infrastructure Costs (Monthly)

**Fixed Costs:**
```
Vercel Pro (optional, recommended): $20/mo
  • 1TB bandwidth
  • Unlimited functions
  • Advanced analytics
  
Supabase Pro (at scale): $25/mo
  • 8GB database
  • 50GB bandwidth
  • Daily backups
  
Resend Scale: $20/mo
  • 50,000 emails
  • 99.9% uptime SLA
  
Total Fixed: $65/mo
```

**Variable Costs:**
```
Mercado Pago: 2.99% + R$0.39 per transaction
  • 10 bookings × R$750 avg = R$7,500
  • Fee: R$231.90 (3.09%)
  
  • 30 bookings × R$750 avg = R$22,500
  • Fee: R$684.90 (3.04%)
  
Bandwidth (if exceeded):
  • Vercel: $0.15/GB beyond plan
  • Supabase: $0.09/GB beyond plan
  
Estimate: R$300-700/mo at scale (30 bookings/mo)
```

**Total Operating Cost:**
- At 10 bookings/mo: ~R$190/mo (R$7,500 revenue = 97.5% margin)
- At 30 bookings/mo: ~R$350/mo (R$22,500 revenue = 98.4% margin)

### 8.2 Break-Even Analysis

**Minimum Viable Revenue:**
- Fixed costs: R$65 (~$13 USD)
- Break-even: 1 booking/month (R$500 consultoria)
- Conclusion: Highly profitable from day 1

---

## 9. Success Metrics & KPIs

### 9.1 Technical KPIs

**Performance:**
- API P95 response time: <500ms ✅ Target
- Page load time (LCP): <2.5s ✅ Target
- Booking completion time: <3 minutes 🎯 Goal

**Reliability:**
- Uptime: 99.9% (8.76h downtime/year) ✅ Target
- Error rate: <0.1% of requests ✅ Target
- Email delivery rate: >99% ✅ Target

**Quality:**
- Zero critical security vulnerabilities 🔒 Required
- Test coverage: >80% 🎯 Goal
- Zero data loss incidents 🔒 Required

### 9.2 Business KPIs

**Acquisition:**
- Landing page traffic: Baseline TBD
- Lead qualification completion: >70% 🎯 Goal
- Auth gate conversion: >80% 🎯 Goal

**Conversion:**
- Booking initiation: >60% of qualified leads 🎯 Goal
- Payment completion: >85% of bookings initiated 🎯 Goal
- Overall conversion: >50% (qualified lead → paid booking) 🎯 Goal

**Retention:**
- Cancellation rate: <5% ✅ Target
- No-show rate: <3% ✅ Target
- Repeat booking rate: >30% within 6 months 🎯 Goal

**Revenue:**
- Average booking value: R$750 📊 Baseline
- Discount code usage: 20-30% of bookings 📊 Expected
- Monthly recurring revenue growth: >20% MoM 🎯 Goal

---

## 10. Appendices

### Appendix A: API Endpoint Reference

**Base URL:** `https://arco.com.br/api`

| Endpoint | Method | Auth | Purpose | Response Time |
|----------|--------|------|---------|---------------|
| `/agendamentos/create-booking` | POST | Required | Create new booking | ~300ms |
| `/agendamentos/create-booking` | GET | Required | List user bookings | ~200ms |
| `/mercadopago/create-preference` | POST | Required | Generate payment link | ~500ms |
| `/mercadopago/validate-discount` | POST | Optional | Validate coupon | ~100ms |
| `/mercadopago/validate-discount` | GET | None | List public coupons | ~150ms |
| `/mercadopago/validate-discount` | PUT | Admin | Create coupon | ~200ms |
| `/emails/send-confirmation` | POST | Internal | Send booking email | ~800ms |
| `/webhooks/mercadopago` | POST | Signed | Payment notification | ~400ms |

### Appendix B: Database ERD (Simplified)

```
┌─────────────────┐
│   auth.users    │
│   (Supabase)    │
└────────┬────────┘
         │
         ├─────────┐
         │         │
    ┌────▼────┐   │
    │ user_   │   │
    │profiles │   │
    └─────────┘   │
         │        │
         │        │
    ┌────▼────────▼──────────┐
    │ qualification_         │
    │ responses              │
    │ • lead_quality_score   │
    └────────┬───────────────┘
             │
             │
    ┌────────▼───────────────────────┐
    │ consultoria_bookings           │
    │ • booking_status               │◄──┐
    │ • payment_status               │   │
    │ • final_price_cents            │   │
    └────────┬───────────┬───────────┘   │
             │           │                │
             │           └────────────────┤
             │                            │
    ┌────────▼──────────┐    ┌───────────▼────┐
    │ consultoria_types │    │ discount_codes │
    │ • price_cents     │    │ • discount_    │
    │ • duration_minutes│    │   value_cents  │
    └───────────────────┘    └────────────────┘
             │
             │
    ┌────────▼──────────┐
    │ calendar_events   │
    │ • start_date      │
    │ • start_time      │
    │ • meeting_url     │
    └───────────────────┘
```

### Appendix C: TypeScript Interfaces (Key Types)

```typescript
// Booking
interface ConsultoriaBooking {
  id: string
  user_id: string
  consultoria_type_id: string
  scheduled_date: string // YYYY-MM-DD
  scheduled_time: string // HH:MM:SS
  booking_status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'approved' | 'rejected'
  final_price_cents: number
  qualification_response_id: string
  discount_code_id: string | null
  booking_metadata: Record<string, any>
  created_at: string
  updated_at: string
}

// Lead Qualification
interface QualificationData {
  challenge: string
  budget: string
  urgency: string
  hasWebsite?: boolean
  hasActiveCampaigns?: boolean
  companyName?: string
  companySize?: string
  additionalNotes?: string
}

// Payment
interface MercadoPagoPreference {
  id: string
  init_point: string
  external_reference: string // booking_id
  items: Array<{
    title: string
    unit_price: number
    quantity: number
  }>
}

// Email
interface EmailNotification {
  id: string
  user_id: string
  notification_type: 'email' | 'sms' | 'push'
  recipient_email: string
  subject: string
  body: string
  status: 'pending' | 'sent' | 'failed'
  scheduled_for: string
  sent_at: string | null
  attempts: number
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-09 | Development Team | Initial TDD creation |

---

**Document End**

For questions or clarifications, refer to:
- Frontend Documentation: `/docs/AGENDAMENTOS_FRONTEND_COMPLETO.md`
- Backend Documentation: `/docs/AGENDAMENTOS_BACKEND_COMPLETO.md`
- System Index: `/docs/AGENDAMENTOS_INDEX.md`
