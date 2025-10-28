# PostHog → Meta Ads Destination Setup

## P1.4: Configuração da Integração Nativa

Esta integração permite que o PostHog envie eventos diretamente para a Meta Conversions API, complementando seu pipeline Supabase Edge → CAPI existente.

## 🎯 Propósito

**Quando usar:**
- Eventos web rápidos (ViewContent, clicks, engagement)
- Redundância e diagnóstico
- Enriquecimento de dados do PostHog

**Quando NÃO usar:**
- Eventos transacionais (compras, agendamentos confirmados)
- Dados sensíveis de comissão
- Status do CRM → Use Supabase Edge Function

## 📋 Passo a Passo

### 1. Obter Access Token da Meta

1. Acesse [Meta Business Settings](https://business.facebook.com/settings)
2. Vá em **System Users** → Criar usuário sistema
3. Adicione permissões:
   - `ads_management`
   - `business_management`
4. Gere **Access Token** (não expira)
5. **Copie e guarde** em local seguro

### 2. Obter Pixel ID

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecione seu **Dataset**
3. Pixel ID: `1677581716961792` (já configurado no código)

### 3. Configurar no PostHog

1. Acesse PostHog → **Data Pipeline** → **Destinations**
2. Clique **+ New Destination**
3. Selecione **Meta Ads Conversions**
4. Preencha:

```
Name: Meta Ads (Web Events)
Pixel ID: 1677581716961792
Access Token: [seu token do passo 1]
Test Event Code: TEST12345 (opcional, para testing)
```

### 4. Configurar Event Mapping

**Eventos a enviar:**

| PostHog Event | Meta Event | Quando enviar |
|---------------|------------|---------------|
| `viewcontent_lp` | ViewContent | Landing page load |
| `lead_magnet_submitted` | CompleteRegistration | Lead magnet submit |
| `tripwire_viewed` | ViewContent | Tripwire page view |
| `tripwire_checkout_started` | InitiateCheckout | Checkout started |
| `engagement_scroll_depth` | Custom (opcional) | Scroll 75%+ |
| `user_interaction_click` | Custom (opcional) | CTA clicks |

**NÃO envie via Destination:**
- `tripwire_paid` → Use Edge Function (transacional)
- `schedule_confirmed` → Use Edge Function (CRM)
- `crm_lead_*` → Use Edge Function (Conversion Leads)

### 5. Property Mapping

Configure mapeamento de propriedades:

```javascript
// User Data (para EMQ)
email → email (hash automático)
phone → phone (hash automático)
firstName → fn
lastName → ln

// Custom Data
source → source
campaign → campaign_name
utm_source → utm_source
utm_medium → utm_medium
utm_campaign → utm_campaign
```

### 6. Ativar Destination

1. Clique **Enable**
2. Teste enviando evento de teste
3. Verifique em Meta Events Manager → **Test Events**
4. Se OK, remova Test Event Code

## 🔍 Verificação

### Teste 1: Evento Manual no PostHog
```javascript
// Console do browser
posthog.capture('viewcontent_lp', {
  email: 'test@example.com',
  source: 'test',
});
```

### Teste 2: Verificar no Meta
1. Meta Events Manager → **Test Events**
2. Deve aparecer evento em ~30 segundos
3. Check **Event Match Quality** score

### Teste 3: Verificar Dedup
```javascript
// Deve ver apenas 1 evento (não 2)
// Mesmo com Pixel + Destination + CAPI
```

## ⚠️ Importante: Prevenção de Duplicatas

**Problema:**
- PostHog Destination envia para Meta
- Seu Pixel também envia
- Seu Edge Function também envia
- = 3 eventos duplicados!

**Solução:**

1. **Use event_id único** (já implementado no código)
2. **Configure Destination para eventos específicos:**
   - Envie apenas ViewContent/engagement
   - Deixe conversões para Edge Function
3. **Monitore duplicatas:**
   - Meta Events Manager → Look for `is_deduped: true`

## 📊 Event Flow Diagram

```
┌─────────────────────────────────────────────┐
│ USER ACTION                                  │
└─────────────┬───────────────────────────────┘
              │
              ├─→ PostHog (analytics)
              │     │
              │     ├─→ Session Recording
              │     ├─→ Cohorts/Funnels
              │     └─→ Meta Destination (optional)
              │           └─→ Meta CAPI
              │
              ├─→ Meta Pixel (client-side)
              │     └─→ Meta with event_id
              │
              └─→ Edge Function (server-side)
                    └─→ Meta CAPI with event_id
                          └─→ Dedup happens here ✅
```

## 🎛️ Configurações Recomendadas

### Development
```
Test Event Code: TEST12345
Send all events: Yes (para testar)
```

### Production
```
Test Event Code: (remove)
Send events:
  ✅ viewcontent_lp
  ✅ lead_magnet_submitted
  ✅ engagement_* (optional)
  ❌ tripwire_paid (use Edge)
  ❌ schedule_confirmed (use Edge)
  ❌ crm_* (use Edge)
```

## 🔧 Troubleshooting

### Eventos não aparecem no Meta

1. **Check Access Token permissions:**
   ```
   ads_management: ✓
   business_management: ✓
   ```

2. **Check Pixel ID:**
   ```
   Deve ser: 1677581716961792
   ```

3. **Check event names:**
   ```javascript
   // PostHog usa snake_case
   posthog.capture('viewcontent_lp', {...})

   // Meta recebe como ViewContent
   ```

4. **Check logs no PostHog:**
   - Data Pipeline → Destinations → Activity

### Duplicatas aparecendo

1. **Verifique event_id:**
   ```javascript
   // Deve ser o mesmo em todos os lugares
   eventID: metaResponse.eventId
   ```

2. **Reduza sources:**
   - Desative Destination para eventos que já vão por Edge
   - Mantenha apenas ViewContent/engagement

3. **Monitore:**
   ```
   Meta Events Manager
   → Event Details
   → is_deduped: true ✓
   ```

### EMQ Score baixo

1. **Adicione mais user data:**
   ```javascript
   posthog.identify(email, {
     email: email,
     phone: phone,
     firstName: firstName,
     lastName: lastName,
     city: city,
     state: state,
   });
   ```

2. **Verifique hashing:**
   - PostHog faz hash automático
   - Mas confira se emails válidos

## 📈 Métricas de Sucesso

**Targets:**
- Event Match Quality > 6.0 (bom)
- Deduplication rate > 95%
- Event latency < 60s
- Error rate < 1%

**Monitore:**
1. PostHog → Destinations → Activity
2. Meta → Events Manager → Data Quality
3. Meta → Events Manager → Overview → Matched Events

## 🎓 Recursos

- [PostHog Meta Destination Docs](https://posthog.com/docs/cdp/destinations/meta-ads)
- [Meta CAPI Docs](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Event Deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)

## ✅ Checklist de Validação

- [ ] Access Token gerado com permissões corretas
- [ ] Pixel ID correto (1677581716961792)
- [ ] Destination criado no PostHog
- [ ] Event mapping configurado
- [ ] Test Event Code funciona
- [ ] Eventos aparecem no Meta Events Manager
- [ ] EMQ score > 6.0
- [ ] Deduplicação funcionando (is_deduped: true)
- [ ] Latência < 60s
- [ ] Test Event Code removido (production)

---

**Status:** Configuração manual via PostHog Dashboard
**Prioridade:** P1 (importante, mas não bloqueante)
**Tempo estimado:** 15-20 minutos

Depois de configurado, o sistema fica assim:

```
ViewContent/Engagement → PostHog → Meta Destination → CAPI
Conversions → Edge Function → CAPI (source of truth)
Tudo com event_id para dedup ✅
```
