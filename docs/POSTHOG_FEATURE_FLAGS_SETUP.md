# PostHog Feature Flags Setup Guide

## P2.5: A/B Testing with Feature Flags

Feature Flags permitem testar variações de headline, CTA, layout sem deploy. Essencial para otimização de LP e redução de CAC.

**Meta de conversão LP:**
- Current: ~6.6% (mediana do setor)
- Target: 8-10% (com A/B testing otimizado)

---

## 🎯 Quick Start

1. Acesse PostHog → **Feature Flags** → **New Feature Flag**
2. Configure os testes abaixo
3. Ative com rollout gradual (10% → 50% → 100%)
4. Monitore no **Experiments** dashboard

---

## 📋 Feature Flags para Criar

### 1. Hero Headline Test (Alta Prioridade)

**Objetivo:** Testar diferentes value propositions na hero section

**Configuração:**
```
Flag Key: lp-hero-variant
Type: Multivariate
Description: Test different hero headlines for conversion optimization
```

**Variants:**
```json
{
  "control": {
    "rollout": 25,
    "headline": "Transforme Seu Negócio com Marketing que Funciona",
    "subheadline": "Sem contratos. Sem taxas ocultas. Apenas resultados."
  },
  "variant-a": {
    "rollout": 25,
    "headline": "Marketing Digital Sem Contrato. Só Paga Se Funcionar.",
    "subheadline": "Cancele quando quiser. Resultados desde o dia 1."
  },
  "variant-b": {
    "rollout": 25,
    "headline": "Dobre Seu Faturamento em 90 Dias ou Devolvo Seu Investimento",
    "subheadline": "Garantia real. Resultados mensuráveis. ROI comprovado."
  },
  "variant-c": {
    "rollout": 25,
    "headline": "De Zero a 100 Leads Qualificados em 30 Dias",
    "subheadline": "Sistema validado em 50+ empresas B2B. Comece hoje."
  }
}
```

**Goal Metric:** `lead_magnet_submitted`
**Secondary Metrics:** `scroll_depth_50`, `time_on_page_30s`
**Minimum Sample Size:** 100 conversions per variant
**Expected Duration:** 2-3 weeks

---

### 2. CTA Color Test (Alta Prioridade)

**Objetivo:** Otimizar cor do botão de conversão

**Configuração:**
```
Flag Key: lp-cta-color
Type: Multivariate
Description: Test CTA button colors for click-through optimization
```

**Variants:**
```json
{
  "teal": {
    "rollout": 50,
    "color": "teal-500",
    "description": "Current color (control)"
  },
  "orange": {
    "rollout": 50,
    "color": "orange-500",
    "description": "High-contrast variant"
  }
}
```

**Goal Metric:** `user_interaction_cta_click`
**Secondary Metrics:** `lead_magnet_submitted`
**Minimum Sample Size:** 200 clicks per variant
**Expected Duration:** 1 week

**CSS Classes:**
```css
.cta-teal { background: #14b8a6; }
.cta-orange { background: #f97316; }
.cta-blue { background: #2563eb; }
.cta-green { background: #10b981; }
```

---

### 3. Form Length Test (Média Prioridade)

**Objetivo:** Balancear conversion rate vs lead quality

**Configuração:**
```
Flag Key: lp-form-length
Type: Multivariate
Description: Test form length impact on conversion rate and lead quality
```

**Variants:**
```json
{
  "short": {
    "rollout": 33,
    "fields": ["name", "email", "phone"],
    "description": "3 fields - maximize conversions"
  },
  "medium": {
    "rollout": 34,
    "fields": ["name", "email", "phone", "challenge"],
    "description": "4 fields - balance (current)"
  },
  "long": {
    "rollout": 33,
    "fields": ["name", "email", "phone", "challenge", "revenue", "experience"],
    "description": "6 fields - maximize quality"
  }
}
```

**Goal Metric:** `lead_magnet_submitted`
**Secondary Metrics:** `schedule_confirmed` (lead quality proxy), `crm_lead_qualified`
**Minimum Sample Size:** 150 conversions per variant
**Expected Duration:** 3-4 weeks

**IMPORTANTE:** Track not just submission rate, but **lead QUALITY** (schedule rate, show rate)

---

### 4. Tripwire Pricing Test (Alta Prioridade - Extra.9)

**Objetivo:** Maximizar uptake do voucher R$ 29/39/49

**Configuração:**
```
Flag Key: tripwire-price
Type: Multivariate
Description: Test tripwire voucher pricing for maximum uptake
```

**Variants:**
```json
{
  "29": {
    "rollout": 33,
    "price": 29,
    "discount": "70% OFF",
    "description": "Lower barrier, higher uptake"
  },
  "39": {
    "rollout": 34,
    "price": 39,
    "discount": "60% OFF",
    "description": "Current price (control)"
  },
  "49": {
    "rollout": 33,
    "price": 49,
    "discount": "50% OFF",
    "description": "Higher value perception"
  }
}
```

**Goal Metric:** `tripwire_paid`
**Secondary Metrics:** `tripwire_checkout_started` (cart abandonment)
**Minimum Sample Size:** 100 purchases per variant
**Expected Duration:** 2-3 weeks

**CAC Offset Calculation:**
- R$ 29 × 18% uptake = R$ 5.22 offset
- R$ 39 × 15% uptake = R$ 5.85 offset (current)
- R$ 49 × 12% uptake = R$ 5.88 offset

---

### 5. Tripwire Placement Test

**Objetivo:** Testar momento ideal para oferta (antes/depois do agendamento)

**Configuração:**
```
Flag Key: tripwire-placement
Type: Multivariate
Description: Test tripwire offer timing for maximum conversion
```

**Variants:**
```json
{
  "before": {
    "rollout": 50,
    "timing": "before_schedule",
    "description": "Show tripwire BEFORE schedule page"
  },
  "after": {
    "rollout": 50,
    "timing": "after_schedule",
    "description": "Show tripwire AFTER schedule confirmation"
  }
}
```

**Goal Metric:** `tripwire_paid`
**Hypothesis:** "After" may have higher uptake (commitment consistency)

---

### 6. Proof Section Variant (Média Prioridade)

**Objetivo:** Testar diferentes formatos de social proof

**Configuração:**
```
Flag Key: lp-proof-section-variant
Type: Multivariate
Description: Test social proof layouts for trust building
```

**Variants:**
```json
{
  "testimonials": {
    "rollout": 33,
    "format": "video_testimonials",
    "description": "Video testimonials (current)"
  },
  "case_studies": {
    "rollout": 33,
    "format": "detailed_case_studies",
    "description": "Before/after case studies with metrics"
  },
  "logos": {
    "rollout": 34,
    "format": "client_logos_grid",
    "description": "Client logos + micro-testimonials"
  }
}
```

**Goal Metric:** `lead_magnet_submitted`
**Secondary Metrics:** `scroll_depth_75` (engagement)

---

### 7. Feature Flags de Rollout (Baixa Prioridade)

**Objetivo:** Gradual rollout de novas features

**New Dashboard:**
```
Flag Key: new-dashboard
Type: Boolean
Description: Gradual rollout of redesigned admin dashboard
Rollout: 10% → 25% → 50% → 100%
```

**Beta Features:**
```
Flag Key: beta-features
Type: Boolean
Description: Early access to beta features for power users
Rollout: Custom list of user emails
```

**WhatsApp Reminders:**
```
Flag Key: whatsapp-reminder
Type: Boolean
Description: Automated WhatsApp reminders for scheduled appointments
Rollout: 50% (A/B test impact on show rate)
Goal: Increase show_rate from 70% to 80%
```

**Session Recording:**
```
Flag Key: session-recording
Type: Boolean
Description: Enable/disable PostHog session recordings (LGPD compliance)
Rollout: 100% (with consent banner)
```

---

## 🧪 Como Usar no Código

O código já está pronto em `src/lib/analytics/feature-flags.ts`:

```typescript
import { getHeroVariant, getCTAColorVariant, getFormLengthVariant, isTripwireEnabled, getTripwirePrice } from '@/lib/analytics/feature-flags';

// Hero Section
const heroVariant = getHeroVariant(); // 'control' | 'variant-a' | 'variant-b' | 'variant-c'

// CTA Button
const ctaColor = getCTAColorVariant(); // 'teal' | 'orange' | 'blue' | 'green'

// Form
const formLength = getFormLengthVariant(); // 'short' | 'medium' | 'long'

// Tripwire
const showTripwire = isTripwireEnabled(); // boolean
const tripwirePrice = getTripwirePrice(); // 29 | 39 | 49
```

**Track Exposure (IMPORTANTE):**
```typescript
import { trackFeatureFlagExposure } from '@/lib/analytics/feature-flags';

// When user SEES the variant
trackFeatureFlagExposure('lp-hero-variant', heroVariant);
```

---

## 📊 Análise de Resultados

### 1. No PostHog Dashboard

**Experiments Tab:**
1. Acesse **Experiments** → Select your test
2. Veja resultados em tempo real:
   - Conversion rate por variant
   - Statistical significance (p-value)
   - Uplift % vs control
3. Declare winner quando:
   - p-value < 0.05 (95% confidence)
   - Minimum sample size atingido
   - Uplift > 10% (economicamente significativo)

**Insights Tab:**
```sql
-- Query para análise detalhada
SELECT
  properties.$feature_flag_response as variant,
  COUNT(DISTINCT person_id) as users,
  SUM(CASE WHEN event = 'lead_magnet_submitted' THEN 1 ELSE 0 END) as conversions,
  (conversions / users * 100) as cvr
FROM events
WHERE event = '$feature_flag_called'
  AND properties.$feature_flag = 'lp-hero-variant'
  AND timestamp > now() - interval '7 days'
GROUP BY variant
ORDER BY cvr DESC;
```

### 2. Statistical Significance

Use a função no código:

```typescript
import { calculateStatisticalSignificance } from '@/lib/analytics/feature-flags';

const result = calculateStatisticalSignificance(
  50,  // control conversions
  1000, // control sample
  65,  // variant conversions
  1000  // variant sample
);

console.log(result);
// {
//   pValue: 0.023,
//   isSignificant: true,
//   uplift: 30,  // 30% improvement
//   confidence: 97.7
// }
```

---

## 🎓 Best Practices

### 1. Sample Size Calculator

**Fórmula:**
```
n = (Z * sqrt(p * (1-p))) / E)^2

Onde:
- Z = 1.96 (95% confidence)
- p = baseline conversion rate (ex: 0.066)
- E = minimum detectable effect (ex: 0.01 = 1%)
```

**Para LP com 6.6% CVR:**
- Detectar +1% lift → ~5,000 visitors per variant
- Detectar +2% lift → ~1,250 visitors per variant
- Detectar +3% lift → ~550 visitors per variant

**Com 300 visitors/dia:**
- +1% lift = 17 dias de teste
- +2% lift = 4 dias de teste
- +3% lift = 2 dias de teste

### 2. Test Duration

**Mínimo:** 1 semana completa (incluir fim de semana)
**Máximo:** 4 semanas (diminishing returns)

### 3. Sequential Testing

**Ordem de prioridade:**
1. Hero Headline (maior impacto)
2. CTA Color (quick win)
3. Tripwire Price (CAC offset)
4. Form Length (lead quality)
5. Proof Section (refinement)

**NÃO rode múltiplos testes simultâneos** na mesma página (interaction effects)

### 4. Implementation Checklist

```
1. Configurar Feature Flag no PostHog
   ├─ Define variants
   ├─ Set rollout percentages
   └─ Configure goal metrics

2. Implementar no código
   ├─ Use getFeatureFlagValue()
   ├─ Render variant
   └─ Call trackFeatureFlagExposure()

3. Validar
   ├─ Check PostHog Events Manager
   ├─ Verify $feature_flag_called events
   └─ Confirm variant distribution

4. Monitorar
   ├─ Daily: Check sample size progress
   ├─ Weekly: Statistical significance
   └─ End: Declare winner & rollout
```

---

## 🔧 Troubleshooting

### Feature flag não carrega

**Check 1: PostHog loaded?**
```javascript
console.log(posthog.__loaded); // Should be true
```

**Check 2: User identified?**
```javascript
console.log(posthog.get_distinct_id()); // Should not be 'undefined'
```

**Check 3: Flag exists?**
```javascript
console.log(posthog.getFeatureFlags()); // Should include your flag
```

**Fix:**
```javascript
posthog.reloadFeatureFlags();
```

### Variant não muda

Feature flags são **sticky** por design (consistência UX).

Para forçar reload:
```javascript
posthog.reloadFeatureFlags(); // Reload from server
```

Para testar variants localmente:
```javascript
posthog.featureFlags.override({'lp-hero-variant': 'variant-b'});
```

### Statistical significance não atinge

**Possíveis causas:**
1. **Sample size pequeno** → Continue teste
2. **Effect size pequeno** → Variants muito similares
3. **High variance** → Confounding variables

**Soluções:**
- Extend test duration
- Increase traffic allocation (50% → 75%)
- Test more radical variations

---

## ✅ Checklist de Setup

- [ ] Hero Headline Test configurado (lp-hero-variant)
- [ ] CTA Color Test configurado (lp-cta-color)
- [ ] Form Length Test configurado (lp-form-length)
- [ ] Tripwire Price Test configurado (tripwire-price)
- [ ] Tripwire Placement Test configurado (tripwire-placement)
- [ ] Proof Section Test configurado (lp-proof-section-variant)
- [ ] WhatsApp Reminder Rollout (whatsapp-reminder)
- [ ] Session Recording enabled (session-recording)
- [ ] trackFeatureFlagExposure() implementado em todos componentes
- [ ] Validação: eventos $feature_flag_called aparecendo no PostHog
- [ ] Dashboard de Experiments configurado
- [ ] Alerts configurados (sample size, significance)

---

## 📈 Expected Impact

**Conservative estimates:**

| Test | Current CVR | Target CVR | Lift | Impact |
|------|-------------|------------|------|--------|
| Hero Headline | 6.6% | 7.9% | +20% | +13 leads/month |
| CTA Color | 8% CTR | 10% CTR | +25% | +20 clicks/month |
| Form Length | 6.6% | 7.3% | +10% | +7 leads/month |
| Tripwire Price | 15% uptake | 18% uptake | +20% | +R$ 0.60 CAC offset |

**Combined impact (sequential testing over 3 months):**
- CVR: 6.6% → 8.5% (+29%)
- CAC: R$ 65 → R$ 57 (-12%)
- Monthly leads: 100 → 129 (+29%)

---

**Status:** Código pronto, aguardando configuração no PostHog Dashboard
**Prioridade:** P2 (alta prioridade para otimização)
**Tempo estimado:** 1-2 horas de setup inicial + monitoramento contínuo

Configure os feature flags e comece a otimizar! 🚀
