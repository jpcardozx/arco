# Meta Conversion Leads Integration

## P2.7: CRM Status → Meta CAPI

Conversion Leads permite enviar atualizações de status do CRM de volta para o Meta, permitindo que o algoritmo otimize para **qualidade de leads**, não apenas volume.

**Impacto esperado:**
- 20-30% melhoria em lead quality (schedule rate)
- CPL pode aumentar 10-15%, mas CPA diminui
- Meta aprende o que é um "bom lead" para seu negócio

---

## 🎯 Como Funciona

```
┌─────────────────────────────────────────────────────┐
│ Meta Lead Ads                                        │
│ User submits form → lead_id gerado                   │
└──────────────┬──────────────────────────────────────┘
               │
               v
┌─────────────────────────────────────────────────────┐
│ Seu CRM (Supabase)                                   │
│ Lead entra no pipeline                               │
└──────────────┬──────────────────────────────────────┘
               │
               v
┌─────────────────────────────────────────────────────┐
│ Status Update                                        │
│ - Qualified (lead é bom?)                            │
│ - Scheduled (agendou consultoria?)                   │
│ - Showed (compareceu?)                               │
│ - Purchased (virou cliente?)                         │
│ - Lost (perdeu o lead?)                              │
└──────────────┬──────────────────────────────────────┘
               │
               v
┌─────────────────────────────────────────────────────┐
│ API Endpoint: /api/meta/conversion-leads             │
│ POST com lead_id + status                            │
└──────────────┬──────────────────────────────────────┘
               │
               v
┌─────────────────────────────────────────────────────┐
│ Meta Conversions API                                 │
│ Meta atualiza algoritmo                              │
│ → Próximos leads serão MELHORES                      │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Setup

### 1. Configurar Access Token

O mesmo token da Conversions API serve para Conversion Leads.

**Já configurado:**
```bash
# .env.local
META_CONVERSION_API_ACCESS_TOKEN=EAA...
```

Se não tiver, veja: `docs/POSTHOG_META_DESTINATION_SETUP.md`

### 2. Obter lead_id do Meta

Quando um lead vem do Meta Lead Ads, ele tem um `lead_id`:

**Via Webhook:**
```json
{
  "entry": [{
    "changes": [{
      "value": {
        "leadgen_id": "123456789", // ← Este é o lead_id
        "form_id": "987654321",
        "field_data": [
          {"name": "email", "values": ["joao@example.com"]},
          {"name": "phone", "values": ["+5511999999999"]}
        ]
      }
    }]
  }]
}
```

**Armazene no Supabase:**
```sql
-- leads table
ALTER TABLE leads ADD COLUMN meta_lead_id TEXT;

-- Quando lead chega do Meta
INSERT INTO leads (email, phone, meta_lead_id, source)
VALUES ('joao@example.com', '+5511999999999', '123456789', 'meta_lead_ads');
```

### 3. Implementar Status Updates

**No seu CRM (Supabase Edge Function ou webhook):**

```typescript
import { trackConversionLeadStatus } from '@/hooks/useFunnelTracking';

// Quando lead é qualificado
async function onLeadQualified(lead: Lead) {
  if (lead.meta_lead_id) {
    await fetch('/api/meta/conversion-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: lead.meta_lead_id,
        status: 'qualified',
        email: lead.email,
        phone: lead.phone,
        timestamp: new Date().toISOString(),
      }),
    });
  }
}

// Quando agendamento é confirmado
async function onScheduleConfirmed(lead: Lead) {
  if (lead.meta_lead_id) {
    await fetch('/api/meta/conversion-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: lead.meta_lead_id,
        status: 'scheduled',
        email: lead.email,
        phone: lead.phone,
        timestamp: new Date().toISOString(),
      }),
    });
  }
}

// Quando cliente comparece
async function onFirstVisitCompleted(lead: Lead) {
  if (lead.meta_lead_id) {
    await fetch('/api/meta/conversion-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: lead.meta_lead_id,
        status: 'showed',
        email: lead.email,
        phone: lead.phone,
        timestamp: new Date().toISOString(),
      }),
    });
  }
}

// Quando vira cliente (purchased)
async function onCustomerPurchased(lead: Lead, contract: Contract) {
  if (lead.meta_lead_id) {
    await fetch('/api/meta/conversion-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: lead.meta_lead_id,
        status: 'purchased',
        email: lead.email,
        phone: lead.phone,
        value: contract.value,
        currency: 'BRL',
        timestamp: new Date().toISOString(),
      }),
    });
  }
}

// Quando lead é perdido
async function onLeadLost(lead: Lead, reason: string) {
  if (lead.meta_lead_id) {
    await fetch('/api/meta/conversion-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: lead.meta_lead_id,
        status: 'lost',
        email: lead.email,
        timestamp: new Date().toISOString(),
      }),
    });
  }
}
```

### 4. Integrar com Supabase Triggers

**Option A: Edge Function (Recomendado)**

```typescript
// supabase/functions/lead-status-update/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  const { lead_id, status, email, phone, value } = await req.json();

  // Send to Meta Conversion Leads
  const response = await fetch('https://yourdomain.com/api/meta/conversion-leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lead_id,
      status,
      email,
      phone,
      value,
      timestamp: new Date().toISOString(),
    }),
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

**Option B: Database Trigger**

```sql
-- Function para chamar webhook
CREATE OR REPLACE FUNCTION notify_lead_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Call your API endpoint
  PERFORM http_post(
    'https://yourdomain.com/api/meta/conversion-leads',
    json_build_object(
      'lead_id', NEW.meta_lead_id,
      'status', NEW.status,
      'email', NEW.email,
      'phone', NEW.phone,
      'timestamp', NEW.updated_at
    )::text,
    'application/json'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger quando status muda
CREATE TRIGGER lead_status_changed
AFTER UPDATE OF status ON leads
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION notify_lead_status_change();
```

---

## 🔍 Status Mapping

| Seu CRM Status | Meta Status | Quando enviar |
|----------------|-------------|---------------|
| qualified | `qualified` | Lead passa na qualificação inicial |
| scheduled | `scheduled` | Agendamento confirmado |
| showed | `completed` | Cliente compareceu na consultoria |
| purchased | `purchased` | Cliente fechou contrato |
| lost | `not_qualified` | Lead perdido (preço, timing, etc) |
| duplicate | `duplicate` | Lead duplicado |

**Timing:**
- **qualified:** Dentro de 24h do lead chegar
- **scheduled:** Imediatamente após agendamento
- **showed:** Após consultoria (dia seguinte OK)
- **purchased:** Após fechamento de contrato
- **lost:** Quando decidir que lead está perdido

---

## 📊 Verificação

### 1. Teste no ambiente de desenvolvimento

```bash
curl -X POST http://localhost:3000/api/meta/conversion-leads \
  -H "Content-Type: application/json" \
  -d '{
    "lead_id": "test_lead_123",
    "status": "qualified",
    "email": "test@example.com",
    "phone": "+5511999999999",
    "timestamp": "2025-01-20T10:00:00Z"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "lead_id": "test_lead_123",
  "status": "qualified",
  "meta_response": {
    "events_received": 1,
    "messages": []
  }
}
```

### 2. Verificar no Meta Events Manager

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecione seu Dataset/Pixel
3. Vá em **Overview** → Filter by **Server Events**
4. Procure eventos com:
   - Event Source: `system_generated`
   - Custom Data: `status = qualified/scheduled/showed/purchased`

### 3. Monitorar no PostHog

Os eventos também são trackeados no PostHog:
```
crm_lead_qualified
crm_lead_scheduled
crm_lead_showed
crm_lead_purchased
crm_lead_lost
```

Query no PostHog:
```sql
SELECT
  properties.status as status,
  COUNT(*) as count
FROM events
WHERE event LIKE 'crm_lead_%'
  AND timestamp > now() - interval '30 days'
GROUP BY status
ORDER BY count DESC;
```

---

## 🎯 Impacto Esperado

### Antes de Conversion Leads

```
Meta otimiza para: Volume de leads
Resultado:
  - 100 leads/mês
  - 40% schedule rate (40 agendamentos)
  - 70% show rate (28 shows)
  - CPL: R$ 65
  - CPA: R$ 232 (65 / 0.4 / 0.7)
```

### Depois de Conversion Leads (3-6 meses)

```
Meta otimiza para: Leads que AGENDAM e COMPARECEM
Resultado:
  - 80 leads/mês (volume menor, mas...)
  - 55% schedule rate (44 agendamentos) ← Melhor!
  - 75% show rate (33 shows) ← Melhor!
  - CPL: R$ 75 (+15%, mas...)
  - CPA: R$ 182 (-22%) ← MENOR! 🎉
```

**Trade-off:**
- ✅ CPA menor (R$ 232 → R$ 182)
- ✅ Lead quality melhor (show rate 70% → 75%)
- ✅ Menos tempo perdido com leads ruins
- ❌ CPL sobe (R$ 65 → R$ 75)
- ❌ Volume diminui (100 → 80 leads)

**ROI:**
- Mesmo com menos leads, mais clientes (28 → 33 shows)
- 18% mais shows com 20% menos leads
- Equipe de vendas trabalha com leads melhores

---

## 🔧 Troubleshooting

### Eventos não aparecem no Meta

**Check 1: Access Token válido?**
```bash
curl -X GET "https://graph.facebook.com/v21.0/me?access_token=YOUR_TOKEN"
```

**Check 2: lead_id correto?**
- Deve ser o `leadgen_id` do Meta Lead Ads
- Não confundir com seu ID interno do CRM

**Check 3: Timing correto?**
- Envie status updates **após** o lead ter sido gerado
- Max delay: 7 dias (idealmente 24h)

### API retorna erro 400

**Common causes:**
- lead_id não existe no Meta
- lead_id já foi atualizado para status final (purchased/lost)
- Formato de email/phone incorreto

**Fix:**
- Valide lead_id antes de enviar
- Não envie updates para leads antigos (>30 dias)
- Hash email/phone corretamente (lowercase, trim)

### Conversion Leads não melhora performance

**Possíveis causas:**
1. **Sample size pequeno:** Precisa de 50+ eventos "showed" ou "purchased"
2. **Delay muito grande:** Envie status em até 24-48h
3. **Status incorreto:** Não marque como "qualified" leads ruins
4. **Dados faltando:** Email/phone importantes para matching

**Solução:**
- Aguarde 3-6 meses (algoritmo aprende devagar)
- Seja consistente (sempre envie status updates)
- Priorize "showed" e "purchased" (signals mais fortes)

---

## 📈 Métricas de Sucesso

### KPIs para monitorar

| Métrica | Baseline | Target (6 meses) | Como medir |
|---------|----------|------------------|------------|
| Schedule Rate | 40% | 55% | Agendamentos / Leads |
| Show Rate | 70% | 75% | Shows / Agendamentos |
| CPL | R$ 65 | R$ 75 | Ad Spend / Leads |
| CPA | R$ 232 | R$ 182 | Ad Spend / Shows |
| Lead Quality Score | - | 7.5/10 | CRM internal rating |

### Dashboard

**PostHog Query:**
```sql
SELECT
  DATE_TRUNC('week', timestamp) as week,
  COUNT(DISTINCT CASE WHEN event = 'lead_magnet_submitted' THEN person_id END) as leads,
  COUNT(DISTINCT CASE WHEN event = 'schedule_confirmed' THEN person_id END) as scheduled,
  COUNT(DISTINCT CASE WHEN event = 'first_visit_completed' THEN person_id END) as showed,
  (scheduled::float / leads * 100) as schedule_rate,
  (showed::float / scheduled * 100) as show_rate
FROM events
WHERE timestamp > now() - interval '12 weeks'
GROUP BY week
ORDER BY week DESC;
```

**Esperado:**
- Schedule rate: Crescimento gradual 40% → 55%
- Show rate: Crescimento gradual 70% → 75%
- Timeline: 3-6 meses para convergir

---

## ✅ Checklist de Implementação

**Setup:**
- [ ] Access Token configurado (.env.local)
- [ ] API endpoint testado (`/api/meta/conversion-leads`)
- [ ] meta_lead_id salvo no Supabase
- [ ] Webhook do Meta Lead Ads configurado

**Integrações:**
- [ ] Status "qualified" enviado (24h após lead)
- [ ] Status "scheduled" enviado (após agendamento)
- [ ] Status "showed" enviado (após consultoria)
- [ ] Status "purchased" enviado (após fechamento)
- [ ] Status "lost" enviado (quando lead é perdido)

**Verificação:**
- [ ] Eventos aparecem no Meta Events Manager
- [ ] Event Match Quality > 6.0
- [ ] PostHog tracking funcionando (crm_lead_*)
- [ ] Logs no servidor (200 OK)

**Monitoramento:**
- [ ] Dashboard de conversion leads criado
- [ ] Alerts configurados (falhas de API)
- [ ] Métricas sendo trackeadas (schedule rate, show rate)
- [ ] Review mensal de performance

---

## 🎓 Recursos

- [Meta Conversion Leads Docs](https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration)
- [Best Practices](https://www.facebook.com/business/help/353653395668814)
- [API Reference](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event)

---

**Status:** Código implementado, aguardando integração com CRM
**Prioridade:** P2 (alta prioridade para long-term optimization)
**Tempo estimado:** 3-4 horas de setup + testes

**IMPORTANTE:** Conversion Leads é uma estratégia de longo prazo (3-6 meses). Seja consistente e paciente! 🚀
