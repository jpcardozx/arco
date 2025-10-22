# 🔧 Landing Page Implementation Roadmap

**Status:** Ready to Execute
**Timeline:** 4-6 weeks
**Complexity:** Medium (existing codebase leverage)
**Priority:** HIGH (conversion-critical path)

---

## 📅 Executive Summary

This roadmap breaks down landing page improvements into 5 phases:

1. **Phase 1** (Week 1-2): Copy rewrite + UX structure (objection bridges, success page)
2. **Phase 2** (Week 3): Form expansion + intent capture
3. **Phase 3** (Week 4): Email sequences + automation
4. **Phase 4** (Week 5): Mobile optimization + polish
5. **Phase 5** (Week 6): Analytics + monitoring setup

### Key Principles

- **Mobile-First:** Every component designed for 320px first
- **Consultative Copy:** Educate > Sell. Transparency > Promises
- **Conversion Focused:** Each section removes 1 objection
- **Zero Friction:** Form simplified to 3 core fields + 2 optional
- **Automated Nurturing:** Email sequences run on cron (5 emails over 4 days)

---

## 🚀 Quick Start

### Immediate Actions (This Week)

1. Review + approve copy updates in `LANDING_PAGE_STRATEGY.md`
2. Assign implementers to Phase 1 tasks
3. Setup Resend templates for email sequences
4. Create GA4 event schema

### Critical Path

```
Phase 1 (Copy + Structure) → Phase 2 (Form Expansion) → Phase 3 (Email Automation)
    ↓                              ↓                           ↓
2 weeks                        1 week                      1 week
(Hero, System, How,          (Expand form,            (Templates, cron,
Proof, Implementation,        Intent Checkpoint)      scheduling)
Success Page)
```

---

## 📊 Expected Impact

- **Conversion Rate:** 8-12% (baseline needed after Phase 1)
- **Email Open Rate:** 40%+ (nurture sequences)
- **Success Page Bounce:** < 30% (vs current unknown)
- **Mobile Conversion:** 6-10% (equal to desktop by Phase 4)
- **Time to Close:** Reduced via automated nurturing

---

## 📋 Full Implementation Details

See attached files for complete technical specifications:
- `LANDING_PAGE_STRATEGY.md` - Copy framework + design system
- Individual task breakdowns in sections below

---

## 🎯 Phase 1: Copy & UX Structure (Week 1-2)

### Task 1.1: Hero Section Copy Update
- **File:** `src/components/landing/sections/HeroSection.tsx`
- **What:** Update headline + subheadline to consultative tone
- **Effort:** 1-2 hours
- **Validation:** Visual QA + mobile preview

### Task 1.2: Add Objection Bridges to System Overview
- **File:** `src/components/landing/sections/SystemOverviewSection.tsx`
- **What:** After each market insight, add "concern resolution" box
- **Effort:** 2-3 hours
- **Example:** After "87% busca online", add box addressing "Quem garante que aparecerei?"

### Task 1.3: Update How It Works with Why Boxes
- **File:** `src/components/landing/sections/HowItWorksSection.tsx`
- **What:** Enhance "Why" boxes with new copy (psychology-based)
- **Effort:** 2-4 hours
- **Key:** Each box explains WHY algorithm/tactic works, not just WHAT

### Task 1.4: Rewrite Proof Section (Transparency Focus)
- **File:** `src/components/landing/sections/ProofSection.tsx`
- **What:** Add "Credibility Box" explaining why we show failures
- **Effort:** 3-4 hours
- **Key:** Tiers stay, but messaging shifts to "distribution reality"

### Task 1.5: Refactor Implementation Guide
- **File:** `src/components/landing/sections/ImplementationGuideSection.tsx`
- **What:** Clarity on milestones + deliverables + responsibilities
- **Effort:** 2-3 hours
- **Key:** Flexible timeline (not rigid dates)

### Task 1.6: Redesign Success Page
- **File:** `src/app/lp/[slug]/success/page.tsx` (NEW/MAJOR REWRITE)
- **What:** Transform from "confirmation" to "micro-landing" with timeline + resources
- **Effort:** 4-6 hours
- **Key:** Add timeline (what happens next), resources (PDF guides), micro-CTAs

---

## 🎯 Phase 2: Form Expansion & Intent (Week 3)

### Task 2.1: Expand Capture Form Schema
- **File:** `src/app/api/leads/capture/route.ts`
- **What:** Add Zod schema for `biggest_challenge`, `urgency`, `monthly_revenue`, `ad_experience`
- **Effort:** 2-3 hours
- **Key:** Update database insert + internal notification email

### Task 2.2: Update Capture Form Frontend
- **File:** `src/components/landing/sections/CaptureSection.tsx`
- **What:** Add optional fields for segmentation (challenge + urgency)
- **Effort:** 2-3 hours
- **Key:** Keep core 3 fields required, make segmentation optional

### Task 2.3: Implement Intent Checkpoint
- **File:** `src/components/landing/IntentCheckpoint.tsx`
- **What:** Use existing component, enhance with conditional case study display
- **Effort:** 2-3 hours
- **Key:** Place BEFORE Capture, pre-fill form based on selection

---

## 🎯 Phase 3: Email Automation (Week 4)

### Task 3.1: Create Email Sequence Templates
- **File:** `src/lib/email-templates/lead-nurture-sequences.ts` (NEW)
- **What:** 5 email templates (minute 0, hour 2, day 1, day 2, day 4)
- **Effort:** 3-4 hours
- **Key:** Templates are conditional on lead.metadata (challenge, experience, etc.)

### Task 3.2: Setup Cron for Email Scheduling
- **File:** `supabase/functions/lead-nurture-scheduler/index.ts` (NEW)
- **What:** Cron job runs every 2 hours, sends emails based on lead creation date
- **Effort:** 4-6 hours
- **Key:** Mark sequences as sent in metadata to avoid duplicates

---

## 🎯 Phase 4: Mobile Optimization (Week 5)

### Task 4.1: Responsiveness Audit
- **Devices:** iPhone SE, 12, 14 Pro Max, iPad, Desktop
- **Checklist:** No horizontal scroll, 48px touch targets, responsive images, etc.
- **Effort:** 4-5 hours
- **Key:** Test on real devices, not just browser DevTools

---

## 🎯 Phase 5: Analytics (Week 6)

### Task 5.1: GA4 Event Setup
- **File:** `src/lib/analytics/tracking-events.ts` (NEW)
- **What:** Define events for section views, CTAs, form interactions
- **Effort:** 2-3 hours
- **Key:** Events critical for A/B testing and optimization

---

## ✅ Pre-Launch Checklist

### Copy & Design
- [ ] All copy reviewed + approved by stakeholders
- [ ] Tone consistent across sections (consultative, not pushy)
- [ ] All numbers specific (87%, not "many")
- [ ] No fake guarantees or hype

### Technical
- [ ] Mobile responsiveness tested (5+ devices)
- [ ] Forms tested end-to-end (capture → success)
- [ ] Email sequences triggered and validated
- [ ] GA4 events firing correctly
- [ ] Performance audit (Lighthouse > 80)
- [ ] Accessibility audit (WCAG 2.1 AA)

### Launch
- [ ] Deploy to staging, full QA
- [ ] Monitor error logs post-deploy
- [ ] Baseline metrics (conversion, CTR, etc.)
- [ ] Daily check-in first 48 hours

---

## 📊 Success Metrics

### Week 1-2 (After Phase 1)
- Form starts collecting data
- GA4 events fire correctly
- Mobile responsiveness validated

### Week 3-4 (After Phase 2-3)
- Email sequences sending (monitor open rates)
- Lead segmentation working (check metadata diversity)
- Conversion rate established (baseline)

### Week 5-6 (After Phase 4-5)
- Mobile conversion ≈ Desktop conversion
- A/B testing infrastructure ready
- Analytics dashboard live

---

## 🎯 A/B Testing Roadmap (Post-Launch)

```
Week 7: Hero Headline Copy Test
Week 8: CTA Button Text Test
Week 9: Objection Bridge Visibility Test
Week 10: Form Fields Test (3 vs 5 fields)
Week 11+: Email subject lines, success page copy, etc.
```

---

**Document Status:** Ready for implementation
**Owner:** Engineering Team
**Questions?** Refer to LANDING_PAGE_STRATEGY.md for detailed copy

