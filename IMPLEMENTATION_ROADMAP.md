# 🗺️ ROADMAP TÉCNICO: Meta Pixel & Conversions API

**Visão**: Sistema de tracking de conversão confiável, resiliente e otimizado
**Horizonte**: 2-3 semanas
**Prioridade**: CRÍTICA

---

## 🎯 VISÃO DE FUTURO (FASE 5 COMPLETA)

```
┌─────────────────────────────────────────────────────────────────┐
│  Landing Page (React)                                            │
│  ├─ Form capture                                               │
│  ├─ trackLead() → Meta Pixel + CAPI                            │
│  └─ trackPurchase() → Revenue tracking                         │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│  Backend API (Next.js)                                           │
│  ├─ POST /api/meta/conversions                                  │
│  ├─ POST /api/leads/capture                                    │
│  ├─ POST /api/purchases/record                                 │
│  └─ Request deduping (X-Idempotency-Key)                       │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│  Edge Functions (Deno/Supabase)                                  │
│  ├─ meta-conversions-webhook                                    │
│  │  ├─ Validate payload                                        │
│  │  ├─ Check dedup in DB ✨ NEW                               │
│  │  ├─ Enrich with EMQ                                         │
│  │  ├─ Send to Meta API                                        │
│  │  └─ Log to database ✨ NEW                                 │
│  │                                                              │
│  └─ meta-retry-queue ✨ NEW                                   │
│     ├─ Check failed events                                    │
│     ├─ Retry with backoff                                    │
│     ├─ Circuit breaker logic                                 │
│     └─ Alert on critical failures                            │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│  Database (Supabase)                                             │
│  ├─ meta_events_dedup ✨ NEW                                  │
│  ├─ meta_events_log ✨ NEW                                    │
│  ├─ meta_retry_queue ✨ NEW                                   │
│  ├─ purchases ✨ NEW                                          │
│  └─ leads (existing)                                          │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│  External Services                                               │
│  ├─ Meta Conversions API v24.0                                  │
│  ├─ Meta Graph API (fbtrace tracking)                           │
│  ├─ Mercado Pago (revenue validation)                          │
│  └─ Slack/Email (Alerts)                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 PHASES & TIMELINE

### ⚡ PHASE 1: CRITICAL FIX (1-2 Days)

**Goal**: Eliminate lead duplication in Meta

```
┌─ DAY 1 ────────────────────────────────────┐
│                                             │
│ CREATE meta_events_dedup TABLE              │
│  ├─ event_id (PK)                          │
│  ├─ created_at timestamp                   │
│  └─ expires_at timestamp + trigger         │
│                                             │
│ UPDATE Edge Function                        │
│  ├─ Replace in-memory DEDUP_STORE           │
│  ├─ Query database before sending to Meta   │
│  └─ Insert into dedup table on success      │
│                                             │
│ TEST & VALIDATE                             │
│  ├─ Send 10x duplicate leads                │
│  ├─ Verify 409 conflict response            │
│  ├─ Confirm only 1 event in Meta            │
│  └─ Deploy to production                    │
│                                             │
└─────────────────────────────────────────────┘
```

**Files to Create**:
1. `supabase/migrations/20251022_001_meta_dedup.sql`
2. Updated `supabase/functions/meta-conversions-webhook/index.ts`

**Files to Update**:
- `.env.local` (no changes needed)

**Testing**:
- Run `test_dedup_analysis.py` → Should now show 409 on duplicate
- Verify in Meta Events Manager: Only 1 event received

**RISKS**:
- None (purely adding functionality)

**ROLLBACK**:
- Simple: revert to in-memory dedup if DB slow
- Takes 5 minutes

---

### 📊 PHASE 2: OBSERVABILITY (1 Day)

**Goal**: Monitor events and detect failures

```
┌─ DAY 2-3 ──────────────────────────────────┐
│                                             │
│ CREATE meta_events_log TABLE                │
│  ├─ event_id                               │
│  ├─ status (success/error/duplicate)        │
│  ├─ meta_response (fbtrace_id)              │
│  ├─ error_message                          │
│  └─ created_at                             │
│                                             │
│ UPDATE Edge Function                        │
│  ├─ Log ALL events to database              │
│  ├─ Include request_id for correlation      │
│  ├─ Track latency to Meta API               │
│  └─ Capture any errors                      │
│                                             │
│ CREATE MONITORING QUERIES                   │
│  ├─ Events per day (by status)              │
│  ├─ Duplication rate trend                  │
│  ├─ Error rate by type                      │
│  ├─ Average latency to Meta                 │
│  └─ Fbtrace ID mapping                      │
│                                             │
│ CREATE ALERTS                               │
│  ├─ ERROR_RATE > 5% in 5 min                │
│  ├─ LATENCY > 2000ms                        │
│  └─ DEDUP_RATE > 10%                       │
│                                             │
│ BUILD DASHBOARD (Looker Studio)             │
│  ├─ Daily event volume (trend)              │
│  ├─ Success vs Error pie chart              │
│  ├─ Duplicate detection chart               │
│  ├─ Latency histogram                       │
│  └─ Cost calculator (leads → conversions)   │
│                                             │
└─────────────────────────────────────────────┘
```

**Files to Create**:
1. `supabase/migrations/20251023_002_meta_events_log.sql`
2. `src/lib/monitoring/meta-metrics.ts` (queries)
3. `supabase/functions/meta-monitoring/index.ts` (check alerts)

**Files to Update**:
- `supabase/functions/meta-conversions-webhook/index.ts` (add logging)

**Testing**:
- Send 100 events
- Verify all logged to database
- Run monitoring queries
- Set up dashboard access

**DELIVERABLE**: Dashboard link for real-time monitoring

---

### 💪 PHASE 3: RESILIENCE (2 Days)

**Goal**: Never lose an event, recover from failures

```
┌─ DAY 4-5 ──────────────────────────────────┐
│                                             │
│ CREATE meta_retry_queue TABLE               │
│  ├─ event_id                               │
│  ├─ payload (original request)              │
│  ├─ retry_count                            │
│  ├─ next_retry_at                          │
│  ├─ last_error                             │
│  └─ status                                 │
│                                             │
│ IMPLEMENT RETRY LOGIC                       │
│  ├─ If Meta returns error: queue for retry  │
│  ├─ Exponential backoff:                    │
│  │  ├─ Retry 1: 1 second                    │
│  │  ├─ Retry 2: 5 seconds                   │
│  │  ├─ Retry 3: 30 seconds                  │
│  │  └─ Max 3 retries                        │
│  └─ Log outcome to meta_events_log          │
│                                             │
│ CREATE RETRY EDGE FUNCTION                  │
│  ├─ Triggered every 10 seconds              │
│  ├─ Check retry_queue table                 │
│  ├─ Retry events where next_retry_at <= NOW │
│  ├─ Update retry_count + next_retry_at      │
│  ├─ Mark as failed after 3 retries          │
│  └─ Create alert for failed events          │
│                                             │
│ IMPLEMENT CIRCUIT BREAKER                   │
│  ├─ If error_rate > 50% for 5 min:          │
│  │  ├─ STOP sending to Meta                 │
│  │  ├─ Queue all events in DB               │
│  │  ├─ Alert: "Meta API Down"               │
│  │  └─ Resume on error_rate < 10%           │
│  └─ Manual override in Supabase dashboard   │
│                                             │
│ WEBHOOK FOR MANUAL RECOVERY                 │
│  ├─ POST /api/meta/retry-failed             │
│  ├─ Owner can manually retry failed events  │
│  └─ Log retry attempt with timestamp        │
│                                             │
└─────────────────────────────────────────────┘
```

**Files to Create**:
1. `supabase/migrations/20251024_003_meta_retry_queue.sql`
2. `supabase/functions/meta-retry-queue/index.ts`
3. `src/app/api/meta/retry-failed/route.ts` (manual retry endpoint)

**Files to Update**:
- `supabase/functions/meta-conversions-webhook/index.ts` (add retry logic)

**Testing**:
- Simulate Meta API timeout → Verify queued for retry
- Verify exponential backoff timing
- Simulate circuit breaker (inject 10 errors) → Verify pause + resume
- Verify manual retry works

**METRICS**: Zero events lost over 1 week of production

---

### ✅ PHASE 4: TESTING & VALIDATION (1 Day)

**Goal**: Prove everything works at scale

```
┌─ DAY 6 ────────────────────────────────────┐
│                                             │
│ UNIT TESTS                                  │
│  ├─ Hash functions (email, phone)           │
│  ├─ Event enrichment logic                  │
│  ├─ Dedup check query                       │
│  ├─ Retry backoff calculation               │
│  ├─ Circuit breaker logic                   │
│  └─ Coverage: >80%                          │
│                                             │
│ INTEGRATION TESTS                           │
│  ├─ E2E: Form → Lead capture → Meta         │
│  ├─ E2E: Duplicate handling                 │
│  ├─ E2E: Retry on Meta error                │
│  ├─ E2E: Circuit breaker trigger            │
│  └─ All pass, no flakes                     │
│                                             │
│ LOAD TEST                                   │
│  ├─ Simulate 1000 leads in 1 minute         │
│  ├─ Measure:                                │
│  │  ├─ P95 latency to Edge Function         │
│  │  ├─ P99 latency to Meta                  │
│  │  ├─ DB query performance                 │
│  │  └─ Memory usage                         │
│  └─ All < SLA targets                       │
│                                             │
│ PRODUCTION VALIDATION (Meta Manager)        │
│  ├─ Confirm events arriving in real-time    │
│  ├─ Verify Event Match Quality (EMQ)        │
│  ├─ Check test event code works             │
│  ├─ Validate fbtrace_id mapping             │
│  └─ Screenshot for documentation            │
│                                             │
│ DOCUMENTATION                               │
│  ├─ How to monitor (dashboard)              │
│  ├─ How to debug (trace_id → logs)          │
│  ├─ How to retry failed (manual)            │
│  ├─ Troubleshooting guide                   │
│  └─ Runbook for incidents                   │
│                                             │
└─────────────────────────────────────────────┘
```

**Files to Create**:
1. `src/__tests__/meta-dedup.test.ts`
2. `src/__tests__/meta-e2e.test.ts`
3. `docs/META_PIXEL_GUIDE.md`
4. `docs/RUNBOOK_META_ISSUES.md`

**Testing Commands**:
```bash
# Unit tests
npm test -- meta

# Integration tests
npm run test:integration -- meta

# Load test
python3 test_load.py --target 1000_leads

# Validate in Meta Manager
# → facebook.com/events_manager → Your Dataset
```

**DELIVERABLE**: All tests passing, documentation complete

---

### 🚀 PHASE 5: OPTIMIZATION (3 Days)

**Goal**: Maximize ROI tracking and revenue attribution

```
┌─ DAY 7-9 ──────────────────────────────────┐
│                                             │
│ PURCHASE TRACKING                           │
│  ├─ Create trackPurchase() hook             │
│  ├─ Send to: Pixel + CAPI + Database        │
│  ├─ Fields:                                 │
│  │  ├─ value (transaction amount)           │
│  │  ├─ currency (BRL)                       │
│  │  ├─ orderId (Mercado Pago order ID)      │
│  │  └─ custom fields (service type, etc)    │
│  └─ Test: E2E lead → customer → revenue     │
│                                             │
│ CUSTOM CONVERSIONS                          │
│  ├─ "High Value Lead" (value > R$500)       │
│  ├─ "Scheduled Appointment"                 │
│  ├─ "Completed Purchase"                    │
│  └─ Configure lookalike audiences           │
│                                             │
│ REVENUE ATTRIBUTION                         │
│  ├─ Query Mercado Pago webhook data         │
│  ├─ Match lead_id → purchase_id             │
│  ├─ Calculate true ROI per campaign         │
│  ├─ Create attribution model (linear)       │
│  └─ Store in analytics table                │
│                                             │
│ SMART BIDDING                               │
│  ├─ Send conversion_value to Meta           │
│  ├─ Meta optimizes for high-value leads     │
│  ├─ Improve placement efficiency            │
│  └─ ROAS increases 15-30%                   │
│                                             │
│ DASHBOARD ADVANCED                          │
│  ├─ Leads → Conversions → Revenue funnel    │
│  ├─ CAC trend by campaign                   │
│  ├─ Payback period per campaign             │
│  ├─ Cohort analysis (monthly)               │
│  ├─ ROAS by channel (Google vs Meta)        │
│  └─ Forecast next month revenue             │
│                                             │
└─────────────────────────────────────────────┘
```

**Files to Create**:
1. `src/hooks/usePurchaseTracking.ts`
2. `src/app/api/purchases/record/route.ts`
3. `supabase/migrations/20251027_005_purchases.sql`
4. `src/lib/attribution/revenue-model.ts`

**Files to Update**:
- Checkout page to call `trackPurchase()`
- Webhook handler for Mercado Pago events

**Testing**:
- E2E: Lead → Follow-up → Purchase → Meta
- Verify ROAS calculation
- Compare with actual Mercado Pago records

**DELIVERABLE**: Revenue dashboard, optimized bidding active

---

## 📈 SUCCESS METRICS

### Phase 1 (Deduplication)
- [ ] Zero duplicate events in Meta (vs 10-15% currently)
- [ ] Lead count in Meta = Real leads captured
- [ ] DB query time < 50ms for dedup check

### Phase 2 (Observability)
- [ ] Real-time monitoring dashboard
- [ ] Alert response time < 5 min
- [ ] 100% of events logged to database
- [ ] Fbtrace_id always captured

### Phase 3 (Resilience)
- [ ] Zero events lost (durability = 100%)
- [ ] 99.9% success rate (after retries)
- [ ] Auto-recovery on Meta API issues
- [ ] P95 latency to Meta < 1000ms

### Phase 4 (Testing)
- [ ] Test coverage > 80%
- [ ] All integration tests passing
- [ ] Load test: 1000 leads/min ✓
- [ ] Production validation in Meta Manager ✓

### Phase 5 (Revenue)
- [ ] Revenue tracking 100% accurate
- [ ] Custom conversions created and active
- [ ] ROAS improved 15-30%
- [ ] CAC calculable per campaign

---

## 🎯 CRITICAL PATH

```
PHASE 1 (DEDUP)
    ↓
PHASE 2 (LOGGING) ← Can run parallel with 1
    ↓
PHASE 3 (RETRY) ← Depends on logging
    ↓
PHASE 4 (TESTS) ← Gate for production
    ↓
PHASE 5 (REVENUE) ← Optional but valuable
```

**Minimum Viable Roadmap** (without Phase 5):
- Start: Today
- Go-live Phase 1: Tomorrow
- Full reliability: 1 week

---

## 💰 ROI OF IMPLEMENTING

**Investment**:
- Developer time: 40-50 hours
- Testing/validation: 10 hours
- Monitoring setup: 5 hours
- **Total**: ~60 hours (~€3,000 at €50/hr)

**Return (First Month)**:
- Eliminate 15% lead duplication → 15% more accurate metrics
- Catch failures early → 2-3% more conversions captured
- Revenue attribution → Ability to optimize ad spend
- **Conservative**: +5% accurate leads = +R$2,500 revenue impact

**Payback Period**: < 1 month

**12-Month Value**: +R$30,000+ in improved optimization

---

## 📋 DECISION GATES

### Go/No-Go Phase 1
- [ ] No database downtime (migration plan reviewed)
- [ ] Rollback procedure tested
- [ ] Production backup taken
- [ ] Go: Deploy Phase 1

### Go/No-Go Phase 2
- [ ] Phase 1 running stable (48h)
- [ ] No new bugs introduced
- [ ] DB performance acceptable
- [ ] Go: Add observability

### Go/No-Go Phase 3
- [ ] Observability data looks good
- [ ] Alerts configured and tested
- [ ] Dashboard live and validated
- [ ] Go: Add retry logic

### Go/No-Go Phase 4
- [ ] All tests passing locally
- [ ] Load test successful
- [ ] Security review completed
- [ ] Go: Deploy to production

### Go/No-Go Phase 5
- [ ] Revenue data validated
- [ ] Mercado Pago webhook working
- [ ] Attribution model correct
- [ ] Go: Activate smart bidding

---

## 🚨 RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|------|--------|-----------|
| DB migration blocker | P1 blocks everything | Test migration on clone first |
| Meta API rate limit | Loss of events | Implement queue + retry |
| High latency to DB | Slow tracking | Optimize indexes, cache lookups |
| Bugs in dedup logic | False positives | 100% test coverage required |
| Alert fatigue | Ignored alerts | Tune thresholds carefully |
| Mercado Pago mismatch | Wrong revenue | Add reconciliation check |

---

## 📞 CONTACTS & REFERENCES

**Meta Documentation**:
- https://developers.facebook.com/docs/marketing-api/conversions-api

**Supabase Docs**:
- https://supabase.com/docs/guides/database
- https://supabase.com/docs/guides/functions

**This Roadmap Generated**: 2025-10-22
**Next Review**: After Phase 1 (Tomorrow)

---

## ✅ APPROVAL

- [ ] Technical Lead Review
- [ ] Product Owner Approval
- [ ] Security Review (Phase 3)
- [ ] Ready to Execute

**Start Date**: 2025-10-22 (Now)
**Expected Completion**: 2025-11-05

