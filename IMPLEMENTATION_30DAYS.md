# ARCO - Plano de Implementação 30 Dias (Estratégia Value-First)

## Objetivo Geral
Transformar ARCO de "ferramenta de performance" para "sistema de qualificação + prova de ROI"

**Métrica de sucesso:**
- Antes: 10-20 leads/mês, 2-4% conversão, 60+ dias sales cycle
- Depois: 50-100 leads/mês, 8-12% conversão, 21 dias sales cycle

---

# WEEK 1: Foundation (Deploy Base)

## Task 1.1: Database Migration
- [ ] Run migration `20251022000008_add_free_audits.sql`
- [ ] Verify tables created: `free_audits`, views `v_hot_audit_leads`, `v_audits_dashboard`
- [ ] Test insert/update functions

**Owner:** Backend
**Time:** 1 hour
**Status:** ⏳ Ready to execute

## Task 1.2: Email Template Setup
Create email template for audit results in Resend

```
Subject: "🔥 URGENTE: Você está perdendo R$12.450/mês"
or
Subject: "✅ Análise Concluída: Oportunidade de R$8.900/mês"
(Dynamic based on loss amount)
```

Template sections:
1. Header: "Análise Gratuita Concluída"
2. Problem: Specific issues found (LCP, CLS, accessibility, mobile)
3. Impact: Revenue loss breakdown by issue
4. Opportunity: Potential gain with timeline
5. Next step: "Agendar análise técnica completa"

**Owner:** Marketing/Backend
**Time:** 2 hours
**Status:** ⏳ Ready to execute

## Task 1.3: Homepage Integration (Phase 1)
Add Free Audit Form to homepage strategic location

Location options:
- Option A: Hero section (below main CTA) - highest visibility
- Option B: New section after "How It Works" - builds context first
- Option C: Sticky CTA at bottom - persistent visibility

**Recommendation:** Option A with "See how much you're leaving on the table" messaging

```html
<section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
  <h2>Descobrira quanto você está REALMENTE perdendo</h2>
  <p>Análise gratuita: Cole sua URL abaixo</p>
  <FreeAuditForm />
</section>
```

**Owner:** Frontend
**Time:** 1.5 hours
**Status:** ⏳ Ready to execute

## Task 1.4: API Verification
- [ ] Test `/api/audit/free` endpoint manually
- [ ] Verify performance API integration working
- [ ] Test revenue loss calculation with sample data
- [ ] Verify email sending (Resend integration)
- [ ] Check database inserts working

**Owner:** Backend
**Time:** 1.5 hours
**Status:** ⏳ Ready to execute

---

# WEEK 2: Landing Pages & Messaging

## Task 2.1: Audit Results Page
Create dedicated page showing audit results

Route: `/audit-results`

Layout:
```
1. Header: "Your Analysis Complete"
2. Performance Score (semáforo: 🔴 < 50, 🟡 50-70, 🟢 > 70)
3. Key Metrics:
   - Visitantes/mês (estimado)
   - Receita/mês (calculada)
   - Receita perdida/mês (breakdown)
4. Issue Breakdown (cards):
   - LCP issue → R$2.450/mês
   - CLS issue → R$1.200/mês
   - Accessibility → R$890/mês
   - Mobile UX → R$1.450/mês
5. Opportunity Summary
   - Potential gain/mês
   - ROI em X meses
6. Next Step CTA (2 options):
   - "Schedule Full Technical Analysis (Free)"
   - "Let's talk on WhatsApp"
```

**Owner:** Frontend
**Time:** 3 hours
**Status:** ⏳ Ready (design complete, implement now)

## Task 2.2: Case Studies Page
Create 3-5 case studies with ROI documented

Template for each:
```
[Company Logo]
[Industry] | [Company Size]

Challenge: "CAC de R$180, LCP 3.2s"
Solution: "7-day optimization sprint"
Result: "CAC caiu 31% em 90 dias"

Metrics:
- Before: LCP 3.2s, CAC R$180, 12% conversion
- After: LCP 1.8s, CAC R$124, 15% conversion
- ROI: 340% (ganho vs investimento)
```

**Owner:** Sales/Marketing
**Time:** 4 hours
**Status:** ⏳ Need to gather customer data

## Task 2.3: Comparison Page
Create vs. competitors comparison

```
                  ARCO        Agência       Freelancer
Tempo:           7 dias     4-8 semanas    Variável
Custo:          R$897      R$5k-15k      R$2k-5k
Transparência:   100%       50%           70%
Garantia:       30 dias    Rara          Nenhuma
ROI esperado:    340%       120%          80%
```

**Owner:** Marketing
**Time:** 1 hour
**Status:** ⏳ Ready to execute

---

# WEEK 3: Automation & Follow-up Sequences

## Task 3.1: Email Follow-up Sequence
Setup in email service (use existing email-automation system)

Sequence for HOT leads (urgency_score >= 75):
```
1. Immediate (sent in email with audit results)
   Subject: "🔥 Você está perdendo R$12.450/mês"
   Content: Results breakdown + CTA to schedule

2. +24h (if no response)
   Subject: "Você viu os números?"
   Content: Case study similar to their industry + proof
   CTA: "Ver análise técnica completa"

3. +48h (if no response)
   Subject: "Quase esqueci: X% do tráfego você está perdendo"
   Content: Specific to them + urgency + ROI
   CTA: "Conversar agora?"
```

Sequence for WARM leads (50 <= urgency_score < 75):
```
1. Immediate
   Subject: "Análise Concluída: Oportunidade de R$5.200/mês"
   Content: Results + mild urgency

2. +48h
   Subject: "Como empresas como a sua aproveitam isso"
   Content: Nurture + education
   CTA: "Saber mais"

3. +7 dias
   Subject: "Ainda quer que a gente toqueia isso?"
   Content: Last chance positioning
```

**Owner:** Backend/Marketing
**Time:** 2 hours
**Status:** ⏳ Modify existing sequences

## Task 3.2: WhatsApp Integration
Setup automated WhatsApp for HOT leads only

```
Trigger: Lead marked as HOT + no click in 6h
Message: "Oi {name}! Vi seu audit. Você tem 5 min pra gente conversar?
Identificamos R${loss}/mês que você pode recuperar.
Link: [calendly-link]"

Follow-up: +24h if no response
Message: "Ficou com dúvidas? Posso mandar a análise técnica
ou marcamos uma call?"
```

**Owner:** Backend/Sales
**Time:** 2 hours
**Status:** ⏳ Need WhatsApp API setup

## Task 3.3: Sales Dashboard
Create internal dashboard for sales team

Features:
- Hot leads today (urge_score >= 75)
- Click-through rates (who opened email, clicked link)
- Call scheduled (track conversions)
- Revenue lost by lead (sort by value)
- Follow-up status (awaiting_response, engaged, scheduled)

**Owner:** Frontend/Backend
**Time:** 2 hours
**Status:** ⏳ Ready (API exists, just UI needed)

---

# WEEK 4: Testing, Optimization & Launch

## Task 4.1: Quality Assurance
- [ ] Test full user journey: audit form → email → results page
- [ ] Check email deliverability (not going to spam)
- [ ] Verify all CTAs are clickable and track properly
- [ ] Test with 10 real websites, verify accuracy
- [ ] Check mobile responsiveness (forms, pages)

**Owner:** QA
**Time:** 2 hours
**Status:** ⏳ Ready

## Task 4.2: Copy Optimization
A/B test key messaging

Test variations:
- Headline A: "Descubra quanto você está PERDENDO..."
  vs
- Headline B: "Veja quanto você pode GANHAR..."

- CTA A: "Análise Gratuita"
  vs
- CTA B: "Descubrir Oportunidade"
  vs
- CTA C: "Ver Números"

**Owner:** Marketing/Copywriting
**Time:** 1 hour
**Status:** ⏳ Implement after launch

## Task 4.3: Sales Team Training
Train sales team on new process

Agenda:
1. How the free audit works (5 min)
2. How to interpret the data (10 min)
3. Common objections & rebuttals (15 min)
4. Demo call scripts (20 min)
5. Closing techniques (15 min)

Playbook to create:
- "Your site is losing R$X/mês. Here's why..."
- Common objections:
  - "This seems too technical for me" → Simplify to ROI
  - "I'm not sure if I can afford it" → Pay-for-results option
  - "I need to think about it" → "Let's just do the free analysis first"

**Owner:** Sales Manager
**Time:** 2 hours
**Status:** ⏳ Ready after system launch

## Task 4.4: Monitoring & Alerting
Setup alerts for:
- API errors (audit fails)
- Email delivery failures
- High-value leads detected (loss > R$15k/mês)
- No response in 6h (trigger WhatsApp)

**Owner:** DevOps/Backend
**Time:** 1 hour
**Status:** ⏳ Ready

---

# Launch Checklist (End of Week 4)

- [ ] Free audit form live on homepage
- [ ] Database migrations applied
- [ ] Email templates configured
- [ ] API tested and verified
- [ ] Results page functional
- [ ] Email sequences configured
- [ ] Sales dashboard ready
- [ ] Team trained
- [ ] Monitoring in place

**Go/No-Go Decision:** Friday EOD

---

# Post-Launch: Metrics to Track (Week 5+)

### Daily
- [ ] Audits started (form submissions)
- [ ] Audits completed (API success rate)
- [ ] Emails sent (and delivery rate)
- [ ] Emails opened (open rate)
- [ ] Emails clicked (click-through rate)

### Weekly
- [ ] Calls scheduled (conversion to demo)
- [ ] Calls held (show-up rate)
- [ ] Proposals sent
- [ ] Deals closed
- [ ] Revenue per lead

### Monthly
- [ ] Total audits (trend)
- [ ] Lead quality (average urgency score)
- [ ] Sales cycle (days to close)
- [ ] Conversion rate (audits → customers)
- [ ] Customer acquisition cost

---

# Success Criteria (30 Days)

**Green Light:**
- 50+ audits completed
- 40%+ email open rate
- 25%+ click-through rate
- 10+ calls scheduled
- 2+ deals in pipeline

**Adjust Course:**
- Less than 30 audits → Issue with form/homepage visibility
- 20% open rate → Issue with subject line/content
- 10% CTR → Issue with CTA or value prop
- 0 calls scheduled → Issue with follow-up sequence or sales skills

---

# Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| API crashes on heavy load | Medium | High | Load test, implement rate limiting, setup fallback |
| Email goes to spam | High | High | Verify Resend domain reputation, warm-up period |
| Audit calculates wrong loss | Medium | High | Validate against real client data, be conservative |
| Sales team doesn't follow playbook | High | High | Weekly training, track results per salesperson |
| No one does audits | Medium | High | Increase homepage visibility, run ads to free audit |

---

# Budget Estimate (30 Days)

| Item | Cost | Notes |
|------|------|-------|
| Resend email sending | $30 | ~1000 emails |
| Infrastructure (API overages) | $50 | Small load |
| WhatsApp API | $50 | ~50 messages |
| Staff time (80 hours @ R$100/h) | R$8,000 | Dev + marketing + sales |
| **Total** | **~R$8,200** | **Very low cost for revenue impact** |

---

# Next Steps

1. **Today:** Review and approve this plan
2. **Tomorrow:** Start Week 1 tasks in parallel
3. **Next Friday:** Week 1 retrospective + Week 2 planning
4. **Week 2 Friday:** Live to internal team (dogfooding)
5. **Week 3 Friday:** Live to small cohort (50 people)
6. **Week 4 Friday:** Full public launch

---

**Owner:** Product/Engineering
**Last Updated:** Oct 22, 2025
**Status:** Ready to Execute

