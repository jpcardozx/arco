# 🌍 Guia de Ambientes Supabase - Meta Conversions API

**Data**: Outubro 21, 2025  
**Contexto**: Deploy estratégico de Edge Functions

---

## 📊 Comparativo de Ambientes

| Aspecto | Local (127.0.0.1) | Staging/Preview | Production |
|---------|-------------------|-----------------|------------|
| **Custo** | Grátis | Free Tier (500MB) | Pay-as-you-go |
| **Velocidade** | Instant | ~200ms | ~50ms (CDN) |
| **Eventos Meta** | ❌ Não envia | ✅ Envia real | ✅ Envia real |
| **Dados** | Volátil | Persistente | Persistente |
| **Webhooks** | ❌ Localhost | ✅ URL pública | ✅ URL pública |
| **Quando usar** | UI/UX dev | Teste/QA | Produção |

---

## 🎯 Estratégia por Fase

### **Fase 1: Development (Local)**
```bash
# Terminal 1: Supabase local
supabase start

# Terminal 2: Next.js
pnpm dev
```

**Setup:**
```env
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..." # local anon key
```

**Vantagens:**
- ✅ Desenvolvimento rápido de UI/UX
- ✅ Não gasta cota da API Meta
- ✅ Debug fácil (tudo localhost)

**Limitações:**
- ❌ Eventos não chegam no Meta (localhost não alcança internet)
- ❌ Dados resetam ao reiniciar Supabase
- ❌ Webhooks externos não funcionam

**Use para:**
- Desenvolver componentes (`CtwaButton`, formulários)
- Testar lógica do `useMetaTracking` hook
- Validar TypeScript types
- Mock de dados

---

### **Fase 2: Staging/Testing (Cloud)**
```bash
# Deploy para staging
./scripts/deploy-meta-smart.sh
# Escolha opção 1 (STAGING)
```

**Setup:**
```env
# .env.local (ou .env.staging)
NEXT_PUBLIC_SUPABASE_URL="https://vkclegvrqprevcdgosan.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..." # production anon key
META_TEST_EVENT_CODE="TEST12345"  # Importante!
```

**Vantagens:**
- ✅ **Eventos chegam no Meta Events Manager**
- ✅ Validação de EMQ real (objetivo: 8/8 parameters)
- ✅ Test Events visíveis (via `test_event_code`)
- ✅ URL pública (webhooks funcionam)
- ✅ Não afeta produção (dados isolados)

**Quando usar:**
- ✅ **Primeiro deploy da Edge Function** ← VOCÊ AGORA
- ✅ Validar eventos no Meta Events Manager
- ✅ Testar 10+ eventos antes de produção
- ✅ QA com clientes beta
- ✅ Depurar problemas de EMQ

**Checklist Staging:**
```bash
# 1. Deploy
./scripts/deploy-meta-smart.sh  # Escolha 1 (STAGING)

# 2. Teste manual
curl -X POST 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook' \
  -H 'Content-Type: application/json' \
  -d '{
    "event_name": "Lead",
    "email": "test@example.com",
    "phone": "+5511999999999",
    "value": 50.00,
    "currency": "BRL",
    "test_event_code": "TEST12345"
  }'

# 3. Validar no Meta
# Meta Events Manager → Test Events → Veja evento com code TEST12345
# EMQ deve estar > 6/8 parameters

# 4. 10+ eventos de teste
# Use sua aplicação para enviar eventos reais
# Objetivo: EMQ > 60%, Dedup < 3%

# 5. Aprovar para produção
# Se EMQ > 60% → mover para production
```

---

### **Fase 3: Production (Cloud)**
```bash
# Deploy para produção (após validar staging)
./scripts/deploy-meta-smart.sh
# Escolha opção 2 (PRODUCTION)
```

**Setup:**
```env
# .env.local (ou .env.production)
NEXT_PUBLIC_SUPABASE_URL="https://vkclegvrqprevcdgosan.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..." # production anon key
# ❌ NÃO usar META_TEST_EVENT_CODE em produção!
```

**Vantagens:**
- ✅ Performance otimizada (CDN global)
- ✅ Monitoramento automático
- ✅ Backups diários
- ✅ Eventos reais afetam campanhas Meta

**Quando usar:**
- ✅ Após validar EMQ > 60% em staging
- ✅ Campanha ativa com tráfego real
- ✅ 50+ Contact events/dia (volume mínimo)

**Monitoramento Crítico:**
```
Meta Events Manager → Dataset Quality
  ├─ EMQ > 60% ✅
  ├─ Deduplicação < 3% ✅
  ├─ Volume: 50+ Contact/dia, 20+ Lead/dia ✅
  └─ Learning Phase: 50 eventos/semana para sair
```

---

## 🚀 Workflow Completo (Recomendado)

### **Semana 1: Local Development**
```bash
# Desenvolver componentes
supabase start
pnpm dev

# Testar UI/UX localmente
# Validar TypeScript types
```

### **Semana 2: Staging Deploy + Validação**
```bash
# 1. Deploy para staging
./scripts/deploy-meta-smart.sh  # Opção 1

# 2. Atualizar .env.local
NEXT_PUBLIC_SUPABASE_URL="https://vkclegvrqprevcdgosan.supabase.co"
META_TEST_EVENT_CODE="TEST12345"

# 3. Testar no seu app
pnpm dev
# Preencher formulários, clicar CTWA
# Verificar console.log do eventId

# 4. Validar Meta Events Manager
# Test Events → Verificar code TEST12345
# EMQ > 6/8 parameters

# 5. 10+ eventos de teste
# Use Playwright/Cypress ou testes manuais
# Objetivo: EMQ > 60%
```

### **Semana 3: Production Deploy**
```bash
# Apenas se EMQ > 60% em staging!

# 1. Deploy para produção
./scripts/deploy-meta-smart.sh  # Opção 2

# 2. Atualizar .env.local (remover test_event_code)
NEXT_PUBLIC_SUPABASE_URL="https://vkclegvrqprevcdgosan.supabase.co"
# META_TEST_EVENT_CODE removido

# 3. Monitorar 24-48h
# Meta Events Manager → Dataset Quality
# CAC deve reduzir -30% em 7-14 dias
```

---

## 💡 Decisões Estratégicas

### **Quando NÃO usar Local**
- ❌ Testar integração com Meta API
- ❌ Validar EMQ/deduplicação
- ❌ QA final antes de produção
- ❌ Receber webhooks externos

### **Quando NÃO usar Staging**
- ❌ Desenvolvimento inicial de UI (use local)
- ❌ Após validar 100% (mover para production)
- ❌ Volume alto (custos aumentam)

### **Quando NÃO usar Production**
- ❌ Testes não validados
- ❌ Experimentos arriscados
- ❌ EMQ < 50% (fix em staging primeiro)

---

## 🔥 Erros Comuns

### **1. "Eventos não aparecem no Meta"**
```bash
# Causa: Usando localhost
# Solução: Deploy para staging
./scripts/deploy-meta-smart.sh  # Opção 1
```

### **2. "EMQ muito baixo (< 40%)"**
```bash
# Causa: Não está enviando FBP/FBC ou hashes
# Solução: Verificar useMetaTracking.ts
# - getCookie('_fbp') retorna valor?
# - getCookie('_fbc') retorna valor?
# - Email/phone sendo passados?
```

### **3. "Eventos duplicados"**
```bash
# Causa: event_id não sendo gerado corretamente
# Solução: Verificar deduplicação no Edge Function
# - eventIdCache tem TTL de 1h?
# - isDuplicate retornando corretamente?
```

### **4. "Webhooks não funcionam"**
```bash
# Causa: Usando localhost (webhooks precisam URL pública)
# Solução: Deploy para staging/production
```

---

## 📊 Custos Estimados

### **Supabase Free Tier (Staging/Production)**
```
✅ Incluído:
  - 500 MB database
  - 2 GB bandwidth/mês
  - 50,000 monthly active users
  - Edge Functions (2 milhões invocations/mês)

💰 Após exceder:
  - $0.125/GB bandwidth adicional
  - Edge Functions: $2/milhão de invocations
```

### **Estimativa para ARCO (Meta CAPI)**
```
Cenário: 50 Contact/dia + 20 Lead/dia = 70 eventos/dia

Cálculos:
  70 eventos/dia × 30 dias = 2.100 eventos/mês
  2.100 Edge Function calls < 2M free tier ✅
  
Custo: R$ 0/mês (dentro do Free Tier)
```

**Conclusão**: Meta CAPI via Edge Functions é **grátis** até ~500k eventos/mês.

---

## 🎓 Resumo Executivo

| Fase | Ambiente | Objetivo | Duração |
|------|----------|----------|---------|
| **Dev** | Local | UI/UX | 1-2 dias |
| **QA** | Staging | Validar EMQ > 60% | 3-5 dias |
| **Prod** | Production | CAC -30% real | Ongoing |

**Próximo Passo**: Execute `./scripts/deploy-meta-smart.sh` e escolha **opção 1 (STAGING)**.

---

**Versão**: 1.0  
**Data**: Outubro 21, 2025  
**Status**: Production Ready
