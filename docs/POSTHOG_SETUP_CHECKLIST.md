# PostHog Configuration Checklist

## ✅ Setup Complete - Next Steps

**Status:** Server running at http://localhost:3000
**Database:** Migrations applied successfully
**TypeScript:** All errors fixed

---

## 📋 Manual Configuration Required

### Step 1: Verify PostHog API Key (2 min)

Check your `.env.local` has:
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Get your key:**
1. Go to: https://app.posthog.com/project/settings
2. Copy **Project API Key**
3. Add to `.env.local`

---

## 🚩 Feature Flags Configuration (15-20 min)

### Go to: PostHog → Feature Flags → New Feature Flag

### 1. Hero Headline A/B Test ⭐ HIGH PRIORITY

```
Flag Key: lp-hero-variant
Type: Multivariate (JSON)
Description: Test different hero headlines for conversion optimization
Release Conditions: 100% of users
```

**Variants (4 equal splits - 25% each):**

```json
{
  "control": {
    "headline": "Transforme Seu Negócio com Marketing que Funciona",
    "subheadline": "Sem contratos. Sem taxas ocultas. Apenas resultados."
  },
  "variant-a": {
    "headline": "Marketing Digital Sem Contrato. Só Paga Se Funcionar.",
    "subheadline": "Cancele quando quiser. Resultados desde o dia 1."
  },
  "variant-b": {
    "headline": "Dobre Seu Faturamento em 90 Dias ou Devolvo Seu Investimento",
    "subheadline": "Garantia real. Resultados mensuráveis. ROI comprovado."
  },
  "variant-c": {
    "headline": "De Zero a 100 Leads Qualificados em 30 Dias",
    "subheadline": "Sistema validado em 50+ empresas B2B. Comece hoje."
  }
}
```

**Experiment Settings:**
- Goal Metric: `lead_magnet_submitted`
- Secondary Metrics: `scroll_depth_50`, `time_on_page_30s`
- Minimum Sample Size: 100 conversions per variant
- Expected Duration: 2-3 weeks

---

### 2. CTA Color Test ⭐ HIGH PRIORITY

```
Flag Key: lp-cta-color
Type: Multivariate (String)
Description: Test CTA button colors
Release Conditions: 100% of users
```

**Variants (50/50 split):**

```json
{
  "teal": {
    "color": "teal-500",
    "description": "Current color (control)"
  },
  "orange": {
    "color": "orange-500",
    "description": "High-contrast variant"
  }
}
```

**Experiment Settings:**
- Goal Metric: `user_interaction_cta_click`
- Secondary Metrics: `lead_magnet_submitted`
- Minimum Sample Size: 200 clicks per variant
- Expected Duration: 1 week

---

### 3. Form Length Test (Medium Priority)

```
Flag Key: lp-form-fields
Type: Multivariate (Number)
Description: Test optimal form length
Release Conditions: 100% of users
```

**Variants:**

```json
{
  "short": {
    "fields": 3,
    "fields_list": ["name", "email", "phone"]
  },
  "medium": {
    "fields": 4,
    "fields_list": ["name", "email", "phone", "company"]
  },
  "long": {
    "fields": 6,
    "fields_list": ["name", "email", "phone", "company", "website", "revenue"]
  }
}
```

**Experiment Settings:**
- Goal Metric: `lead_magnet_submitted`
- Track: `form_abandonment` rate
- Expected: Shorter form = higher CVR but lower quality

---

### 4. Tripwire Price Test (Medium Priority)

```
Flag Key: tripwire-price
Type: Multivariate (Number)
Description: Test optimal tripwire pricing
Release Conditions: 100% of users
```

**Variants (33/33/33 split):**

```json
{
  "low": {
    "price": 29,
    "currency": "BRL"
  },
  "medium": {
    "price": 39,
    "currency": "BRL"
  },
  "high": {
    "price": 49,
    "currency": "BRL"
  }
}
```

**Experiment Settings:**
- Goal Metric: `tripwire_purchased`
- Track: Revenue per lead (price × conversion rate)
- Expected: Lower price = higher uptake but less revenue

---

## 👥 Cohorts Configuration (20-30 min)

### Go to: PostHog → People → Cohorts → New Cohort

### 1. Lead Magnet - Submitted ⭐ HIGH PRIORITY

```
Name: Lead Magnet - Submitted
Description: Users who submitted lead magnet form
Type: Dynamic (updates automatically)
```

**Conditions:**
```
Performed event: lead_magnet_submitted
In the last: 30 days
```

**Use Cases:**
- Remarketing: "Já baixou o guia? Agende sua consultoria!"
- Email follow-up sequence
- Funnel analysis

**Expected Size:** ~100-150 users/month

---

### 2. Schedule - Confirmed ⭐ HIGH PRIORITY

```
Name: Schedule - Confirmed
Description: Users who scheduled a consultation
Type: Dynamic
```

**Conditions:**
```
Performed event: schedule_confirmed
In the last: 30 days
```

**Use Cases:**
- Exclude from ad campaigns (already converted)
- WhatsApp reminder 24h before
- Calculate schedule → show rate

**Expected Size:** ~50-70 users/month

---

### 3. No-Show ⭐ HIGH PRIORITY

```
Name: No-Show
Description: Scheduled but did not show up
Type: Dynamic
```

**Conditions:**
```
Performed event: schedule_confirmed
AND
Did NOT perform event: first_visit_completed
AND
Last seen: More than 2 days ago
```

**Use Cases:**
- Recovery remarketing campaign
- WhatsApp recovery message
- Reduce no-show rate analysis

**Expected Size:** ~15-20 users/month (30% no-show rate)

---

### 4. High Intent (Medium Priority)

```
Name: High Intent
Description: Multiple page views, long session time
Type: Dynamic
```

**Conditions:**
```
Session duration: > 3 minutes
AND
Page views: > 5
AND
Performed event: scroll_depth_75
AND
Did NOT perform event: lead_magnet_submitted
In the last: 7 days
```

**Use Cases:**
- Urgent remarketing (hot leads)
- Higher bid in Meta Ads
- Priority follow-up

**Expected Size:** ~20-30 users/month

---

### 5. Lost Leads (Medium Priority)

```
Name: Lost Leads
Description: Engaged but didn't convert
Type: Dynamic
```

**Conditions:**
```
Performed event: intent_checkpoint_passed
AND
Did NOT perform event: lead_magnet_submitted
AND
Last seen: 3-14 days ago
```

**Use Cases:**
- Win-back campaign
- Different offer (lower barrier)
- Survey: "Why didn't you sign up?"

**Expected Size:** ~80-100 users/month

---

### 6. Purchased (Low Priority)

```
Name: Purchased
Description: Completed purchase/became client
Type: Dynamic
```

**Conditions:**
```
Performed event: purchase_completed
In the last: 90 days
```

**Use Cases:**
- Exclude from acquisition campaigns
- Upsell/cross-sell campaigns
- Customer satisfaction surveys

**Expected Size:** ~10-15 users/month

---

### 7. Tripwire - Purchased (Medium Priority)

```
Name: Tripwire - Purchased
Description: Bought the R$39 videocall offer
Type: Dynamic
```

**Conditions:**
```
Performed event: tripwire_purchased
In the last: 30 days
```

**Use Cases:**
- Track tripwire → full purchase conversion
- Exclude from tripwire ads
- Priority follow-up sequence

**Expected Size:** ~15-22 users/month (15% uptake)

---

### 8. Form Abandonment (Low Priority)

```
Name: Form Abandonment
Description: Started form but didn't submit
Type: Dynamic
```

**Conditions:**
```
Performed event: form_field_focused
AND
Did NOT perform event: lead_magnet_submitted
AND
Last seen: 1-7 days ago
```

**Use Cases:**
- Remarketing: "Complete your sign up"
- Form UX analysis
- A/B test shorter forms

**Expected Size:** ~40-60 users/month

---

### 9. Mobile Users (Low Priority)

```
Name: Mobile Users
Description: Users primarily on mobile devices
Type: Dynamic
```

**Conditions:**
```
Device type: Mobile
OR
Device type: Tablet
In the last: 30 days
```

**Use Cases:**
- Mobile-optimized landing pages
- Test mobile-first headlines
- Track mobile vs desktop CVR

**Expected Size:** ~40-50% of all users

---

### 10. Repeat Visitors (Low Priority)

```
Name: Repeat Visitors
Description: Visited 3+ times without converting
Type: Dynamic
```

**Conditions:**
```
Session count: ≥ 3
AND
Did NOT perform event: lead_magnet_submitted
In the last: 14 days
```

**Use Cases:**
- Remarketing: "Still deciding?"
- Add social proof / urgency
- Different value proposition

**Expected Size:** ~30-40 users/month

---

## 📊 Sync Cohorts to Meta Ads (15 min)

### For Remarketing Campaigns

**Go to:** PostHog → Data Management → Destinations → Add Destination → Meta Ads

**Or manually export:**

1. PostHog → Cohort → Export → CSV
2. Meta Ads Manager → Audiences → Custom Audience → Customer List
3. Upload CSV (email + phone matching)

**Priority Cohorts for Remarketing:**
- ✅ High Intent (bid 1.5x normal)
- ✅ No-Show (recovery campaign)
- ✅ Lost Leads (win-back campaign)
- ✅ Form Abandonment (completion push)

**Exclude from ads:**
- ✅ Schedule - Confirmed (already converted)
- ✅ Purchased (customers)

**Budget Allocation:**
- High Intent: R$ 20/dia
- No-Show: R$ 15/dia
- Lost Leads: R$ 20/dia
- Form Abandonment: R$ 10/dia

**Total Remarketing Budget:** R$ 65/dia (R$ 1,950/mês)

---

## ✅ Validation Tests (10 min)

### Test in Browser Console (http://localhost:3000)

```javascript
// 1. Check PostHog loaded
console.log(window.posthog.__loaded); // Should be true

// 2. Check current feature flags
console.log(window.posthog.getFeatureFlag('lp-hero-variant'));
console.log(window.posthog.getFeatureFlag('lp-cta-color'));

// 3. Test event tracking
window.posthog.capture('test_event', {
  test: true,
  timestamp: new Date().toISOString()
});

// 4. Check user properties
console.log(window.posthog.get_distinct_id());
console.log(window.posthog.get_property('$initial_referrer'));
```

### Verify in PostHog Dashboard

1. Go to: PostHog → Events → Live Events
2. You should see your `test_event`
3. Check: Feature Flags → Usage (should show requests)
4. Check: Cohorts → Size (initially 0, will populate over time)

---

## 📈 Expected Results (After 30 Days)

**Landing Page CVR:**
- Before: ~6.6% (median)
- After A/B testing: 8-10% (+21-52%)

**CAC Reduction:**
- Baseline: R$ 65/lead
- With optimizations: R$ 57/lead (-12%)

**Remarketing Impact:**
- Recovery rate: 10-15% of lost leads
- Cost: 60% cheaper than cold traffic
- Additional leads: +15-20/month

**Feature Flag Winners:**
- Hero test: Declare winner at 150+ conversions/variant
- CTA color: Declare winner at 300+ clicks/variant
- Form length: Analyze quality vs quantity trade-off
- Tripwire price: Optimize for revenue (price × conversion)

---

## 🎯 Next Actions

### Immediate (Today)
- [ ] Set POSTHOG_KEY in `.env.local`
- [ ] Create 4 Feature Flags (Hero, CTA, Form, Tripwire)
- [ ] Create 10 Cohorts (High priority first)
- [ ] Test in browser console (validation)

### This Week
- [ ] Launch first A/B test (Hero headline)
- [ ] Export cohorts to Meta Ads
- [ ] Setup remarketing campaigns (R$ 65/dia)
- [ ] Monitor events in PostHog dashboard

### This Month
- [ ] Analyze A/B test results (2-3 weeks data)
- [ ] Declare winners and implement
- [ ] Launch next round of tests
- [ ] Review cohort sizes and adjust campaigns

---

## 📞 Support

**PostHog Documentation:**
- Feature Flags: https://posthog.com/docs/feature-flags
- Cohorts: https://posthog.com/docs/data/cohorts
- Experiments: https://posthog.com/docs/experiments

**Internal Docs:**
- Full implementation: `docs/ANALYTICS_IMPLEMENTATION.md`
- Feature flags guide: `docs/POSTHOG_FEATURE_FLAGS_SETUP.md`
- Cohorts guide: `docs/POSTHOG_COHORTS_SETUP.md`

---

**Status:** ✅ Ready to configure
**Estimated Time:** 45-60 minutes total
**Priority:** HIGH (directly impacts CAC and conversion rate)
