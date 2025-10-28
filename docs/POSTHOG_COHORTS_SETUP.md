# PostHog Cohorts Setup Guide

## P2.6: Cohorts para Segmentação e Remarketing

Cohorts permitem segmentar usuários baseado em comportamento para:
- **Remarketing** (Meta Custom Audiences)
- **Análise de funil** (onde estão dropando?)
- **Personalização** (diferentes CTAs para diferentes segmentos)
- **Email marketing** (Resend campaigns)

---

## 🎯 Quick Start

1. Acesse PostHog → **People** → **Cohorts** → **New Cohort**
2. Configure os cohorts abaixo
3. Sync com Meta Ads para remarketing
4. Use em análises e funnels

---

## 📋 Cohorts Essenciais

### 1. Lead Magnet Submitted (Alta Prioridade)

**Objetivo:** Todos que baixaram o lead magnet

**Configuração:**
```
Name: Lead Magnet - Submitted
Description: Users who submitted lead magnet form
Type: Dynamic
```

**Conditions:**
```
event = "lead_magnet_submitted"
AND timestamp > now() - interval '30 days'
```

**Use Cases:**
- Remarketing: "Já baixou o guia? Agende sua consultoria grátis!"
- Análise: Quantos leads → schedules?
- Email: Follow-up sequence

**Expected Size:** ~100-150 users/month

---

### 2. Schedule - Confirmed (Alta Prioridade)

**Objetivo:** Leads que agendaram consultoria

**Configuração:**
```
Name: Schedule - Confirmed
Description: Users who scheduled a consultation
Type: Dynamic
```

**Conditions:**
```
event = "schedule_confirmed"
AND timestamp > now() - interval '30 days'
```

**Use Cases:**
- Remarketing: Exclusão (não gastar ad spend em quem já agendou)
- WhatsApp: Reminder 24h antes
- Análise: Schedule → Show rate (target: 70%)

**Expected Size:** ~50-70 users/month

---

### 3. No-Show (Alta Prioridade)

**Objetivo:** Agendaram mas não compareceram

**Configuração:**
```
Name: No-Show
Description: Scheduled but did not show up
Type: Dynamic
```

**Conditions:**
```
event = "schedule_confirmed"
AND NOT event = "first_visit_completed"
AND timestamp < now() - interval '2 days'
```

**Use Cases:**
- Remarketing: "Perdeu sua consultoria? Reagende aqui"
- WhatsApp: Recovery campaign
- Análise: Reduce no-show rate

**Expected Size:** ~15-20 users/month (30% no-show rate)

**Target:** Reduzir de 30% para 20% (WhatsApp reminders)

---

### 4. Showed - First Visit (Alta Prioridade)

**Objetivo:** Completaram primeira visita

**Configuração:**
```
Name: Showed - First Visit
Description: Completed first consultation visit
Type: Dynamic
```

**Conditions:**
```
event = "first_visit_completed"
AND timestamp > now() - interval '60 days'
```

**Use Cases:**
- Remarketing: Exclusão total (conversão máxima do funil)
- Conversion Leads: Update Meta with "showed" status
- Análise: Show → Customer rate

**Expected Size:** ~35-50 users/month (70% show rate)

---

### 5. Tripwire - Purchased (Média Prioridade)

**Objetivo:** Compraram voucher R$ 39

**Configuração:**
```
Name: Tripwire - Purchased
Description: Purchased tripwire voucher offer
Type: Dynamic
```

**Conditions:**
```
event = "tripwire_paid"
AND timestamp > now() - interval '90 days'
```

**Use Cases:**
- Remarketing: Upsell para plano completo
- Análise: Tripwire → Customer conversion rate
- CAC: Offset calculation (R$ 5.85 per lead)

**Expected Size:** ~15-20 users/month (15% uptake)

**Impact:** R$ 5.85 CAC offset per lead

---

### 6. High Intent - Not Converted (Alta Prioridade)

**Objetivo:** Alto engajamento mas não converteram

**Configuração:**
```
Name: High Intent - Not Converted
Description: High engagement but did not convert
Type: Dynamic
```

**Conditions:**
```
(
  event = "scroll_depth" AND value >= 75
  OR event = "time_on_page" AND value >= 60
  OR event = "user_interaction_cta_click"
)
AND NOT event = "lead_magnet_submitted"
AND timestamp > now() - interval '7 days'
```

**Use Cases:**
- Remarketing: Urgência ("Últimas vagas!")
- Email: Nurture sequence
- Análise: O que está bloqueando conversão?

**Expected Size:** ~50-100 users/week

**Hypothesis:** Newsletter signup ou dúvidas específicas

---

### 7. Lost Leads (Média Prioridade)

**Objetivo:** Leads qualificados mas perdidos no CRM

**Configuração:**
```
Name: Lost Leads
Description: Qualified leads that were lost in CRM
Type: Dynamic
```

**Conditions:**
```
event = "crm_lead_lost"
AND timestamp > now() - interval '90 days'
```

**Use Cases:**
- Remarketing: Win-back campaign
- Análise: Por que perdemos? (price, timing, competitor)
- Recovery: Special offer

**Expected Size:** ~20-30 users/month

---

### 8. Power Users (Baixa Prioridade)

**Objetivo:** Altamente engajados (futuros advocates)

**Configuração:**
```
Name: Power Users
Description: Highly engaged users (future advocates)
Type: Dynamic
```

**Conditions:**
```
(
  event_count("page_view") >= 5
  OR event_count("user_interaction") >= 10
  OR event = "time_on_page" AND value >= 300
)
AND timestamp > now() - interval '30 days'
```

**Use Cases:**
- Referral program invitation
- Beta features access
- Case study candidates

**Expected Size:** ~10-20 users/month

---

### 9. Anonymous High-Value (Média Prioridade)

**Objetivo:** Alto valor mas ainda anônimos

**Configuração:**
```
Name: Anonymous High-Value
Description: High-value behavior but not yet identified
Type: Dynamic
```

**Conditions:**
```
is_identified = false
AND (
  properties.utm_campaign LIKE '%premium%'
  OR properties.utm_source = 'linkedin'
  OR session_duration > 180
)
AND timestamp > now() - interval '7 days'
```

**Use Cases:**
- Remarketing: Tentação máxima (lead magnet premium)
- Chat bot: Proactive outreach
- Análise: Barrier to conversion

**Expected Size:** ~30-50 users/week

---

### 10. Repeat Visitors - Not Converting (Alta Prioridade)

**Objetivo:** Voltam mas não convertem (sinal de interesse)

**Configuração:**
```
Name: Repeat Visitors - Not Converting
Description: Multiple visits but no conversion
Type: Dynamic
```

**Conditions:**
```
session_count >= 3
AND NOT event = "lead_magnet_submitted"
AND timestamp > now() - interval '14 days'
```

**Use Cases:**
- Remarketing: Urgência + Social proof
- Live chat: "Posso ajudar com algo?"
- Análise: Qual dúvida está bloqueando?

**Expected Size:** ~20-40 users/week

**Hypothesis:** Price concerns ou precisam de mais informação

---

## 🔗 Meta Custom Audiences Integration

### Como Sincronizar Cohorts com Meta

**Passo 1: Export Cohort**
```
PostHog → Cohorts → [Select Cohort] → Export → CSV
```

**Passo 2: Upload para Meta**
```
Meta Ads Manager → Audiences → Create Audience → Custom Audience → Customer List
Upload: email, phone (hashed automaticamente)
```

**Passo 3: Criar Campanha**
```
Campaign → Audience → Select Custom Audience
Budget: R$ 10-20/dia (remarketing)
Creative: Specific to cohort behavior
```

### Cohorts → Meta Audiences Mapping

| PostHog Cohort | Meta Audience | Mensagem | Budget |
|----------------|---------------|----------|--------|
| Lead Magnet - Submitted | Warm Leads | "Agende sua consultoria grátis" | R$ 15/dia |
| High Intent - Not Converted | Hot Prospects | "Últimas 5 vagas! 🔥" | R$ 20/dia |
| No-Show | Recovery | "Reagende com 20% desconto" | R$ 10/dia |
| Repeat Visitors | Nurture | "Veja o que clientes dizem" | R$ 10/dia |
| Lost Leads | Win-back | "Oferta exclusiva de retorno" | R$ 10/dia |

**Total Remarketing Budget:** R$ 65/dia (~R$ 2,000/mês)

**Expected Impact:**
- Recovery de 10-15% de leads perdidos
- CAC 60% menor que cold traffic
- ROI 3-5x vs aquisição fria

---

## 📊 Análise de Cohorts

### 1. Funnel Analysis por Cohort

**Query:**
```sql
SELECT
  cohort_name,
  COUNT(DISTINCT CASE WHEN event = 'lead_magnet_submitted' THEN person_id END) as leads,
  COUNT(DISTINCT CASE WHEN event = 'schedule_confirmed' THEN person_id END) as scheduled,
  COUNT(DISTINCT CASE WHEN event = 'first_visit_completed' THEN person_id END) as showed,
  (scheduled / leads * 100) as schedule_rate,
  (showed / scheduled * 100) as show_rate
FROM events
WHERE timestamp > now() - interval '30 days'
GROUP BY cohort_name
ORDER BY leads DESC;
```

### 2. Cohort Retention Analysis

**Configuração no PostHog:**
```
Insights → Retention
Select cohort: "Lead Magnet - Submitted"
Return event: "schedule_confirmed"
Period: Weekly
```

**Target Retention:**
- Week 1: 40% schedule rate
- Week 2: 10% additional schedules (nurture working)
- Week 3: 5% (long consideration)

### 3. CAC por Cohort

**Query:**
```sql
SELECT
  cohort_name,
  ad_spend / conversions as cac,
  (ad_spend - tripwire_revenue) / conversions as net_cac
FROM cohort_metrics
WHERE period = 'last_30_days'
ORDER BY net_cac ASC;
```

**Benchmarks:**
- Cold Traffic: R$ 65-75 CAC
- Remarketing (High Intent): R$ 25-35 CAC
- Remarketing (Lost Leads): R$ 40-50 CAC
- Email/WhatsApp: R$ 5-10 CAC

---

## 🎯 Segmentation Strategy

### Acquisition Funnel

```
┌─────────────────────────────────────┐
│ Anonymous Visitors                   │
│ (No cohort yet)                      │
└──────────────┬──────────────────────┘
               │
               ├─→ High Intent - Not Converted
               │   (Remarketing: Lead magnet)
               │
               └─→ Repeat Visitors - Not Converting
                   (Remarketing: Social proof)
```

### Conversion Funnel

```
┌─────────────────────────────────────┐
│ Lead Magnet - Submitted              │
│ (Email nurture + WhatsApp)           │
└──────────────┬──────────────────────┘
               │
               ├─→ Schedule - Confirmed
               │   (WhatsApp reminder)
               │   │
               │   ├─→ Showed - First Visit
               │   │   (Remarketing: OFF - converted!)
               │   │
               │   └─→ No-Show
               │       (Remarketing: Recovery offer)
               │
               └─→ Not Scheduled (after 7 days)
                   (Remarketing: Urgency)
```

### Revenue Funnel

```
┌─────────────────────────────────────┐
│ Tripwire - Purchased                 │
│ (Remarketing: Upsell plano completo) │
└──────────────┬──────────────────────┘
               │
               └─→ Showed - First Visit
                   (Remarketing: Package offers)
```

---

## 🔧 Advanced Cohorts

### 1. Behavioral Cohorts

**Fast Converters:**
```
event = "lead_magnet_submitted"
AND time_to_conversion < 300 seconds
```
**Use:** Identify high-intent traffic sources

**Slow Burners:**
```
event = "lead_magnet_submitted"
AND session_count >= 3
```
**Use:** Long nurture sequences needed

**Impulse Buyers (Tripwire):**
```
event = "tripwire_paid"
AND time_since_lead_magnet < 600 seconds
```
**Use:** Offer tripwire immediately

---

### 2. Value-Based Cohorts

**High LTV Potential:**
```
properties.company_size = "50-200"
OR properties.revenue = "1M-5M"
OR properties.utm_source = "linkedin"
```
**Use:** Premium content, personal outreach

**SMB Segment:**
```
properties.company_size = "1-10"
OR properties.revenue = "<500K"
```
**Use:** Self-service, automated nurture

---

### 3. Engagement Cohorts

**Super Engaged:**
```
scroll_depth >= 90
AND time_on_page >= 120
AND user_interaction_count >= 3
```
**Use:** Referral program, case studies

**Passive:**
```
scroll_depth < 50
AND time_on_page < 30
AND bounce_rate > 0.7
```
**Use:** Improve landing page, test CTAs

---

## 🤖 Automation Ideas

### 1. Zapier + PostHog + Meta

**Trigger:** User enters "High Intent - Not Converted" cohort
**Action:** Add to Meta Custom Audience
**Delay:** 24 hours
**Message:** "Vimos que você estava interessado. Agende hoje!"

### 2. PostHog + Resend

**Trigger:** User enters "Lead Magnet - Submitted" cohort
**Action:** Send email sequence (5 emails over 14 days)
**Sequence:**
1. Day 0: Lead magnet delivery
2. Day 1: Case study
3. Day 3: Testimonial
4. Day 7: Limited offer
5. Day 14: Last chance

### 3. PostHog + WhatsApp (Twilio)

**Trigger:** User enters "Schedule - Confirmed" cohort
**Action:** Schedule reminder 24h before
**Message:** "Lembrete: Consultoria amanhã às [TIME]. Confirme respondendo SIM."

---

## ✅ Checklist de Setup

**Cohorts Criados:**
- [ ] Lead Magnet - Submitted
- [ ] Schedule - Confirmed
- [ ] No-Show
- [ ] Showed - First Visit
- [ ] Tripwire - Purchased
- [ ] High Intent - Not Converted
- [ ] Lost Leads
- [ ] Power Users
- [ ] Anonymous High-Value
- [ ] Repeat Visitors - Not Converting

**Meta Integration:**
- [ ] Export cohorts para Meta Custom Audiences
- [ ] Criar campanhas de remarketing por cohort
- [ ] Configurar budgets (R$ 10-20/dia por audience)
- [ ] Testar mensagens específicas por cohort

**Análises:**
- [ ] Dashboard de cohort sizes (track growth)
- [ ] Funnel analysis por cohort
- [ ] Retention curves
- [ ] CAC por cohort

**Automações:**
- [ ] Email sequences (Resend)
- [ ] WhatsApp reminders (Twilio)
- [ ] Meta audience sync (Zapier)

---

## 📈 Expected Impact

**Remarketing Performance:**
- 10-15% recovery de leads perdidos
- CAC 60% menor que cold traffic (R$ 25 vs R$ 65)
- Conversion rate 2-3x maior

**Análise:**
- Identificar bottlenecks no funil
- Segmentar por valor (LTV)
- Personalizar mensagens

**ROI Projection:**
```
Monthly Investment: R$ 2,000 (remarketing budget)
Recovered Leads: 15-20
CAC: R$ 100-133 (blended with cold)
Net CAC (after tripwire): R$ 94-127

vs Cold Traffic Only:
CAC: R$ 65
Volume: Lower (sem remarketing)

Result: +15-20 leads/month = +R$ 30-40K revenue/year
```

---

**Status:** Aguardando criação manual no PostHog Dashboard
**Prioridade:** P2 (essencial para remarketing)
**Tempo estimado:** 2-3 horas de setup inicial

Crie os cohorts e ative remarketing inteligente! 🎯
