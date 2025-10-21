# 🔍 Diagnóstico + Plano de Ação: Dataset Não Recebe Eventos

**Data**: 21 de Outubro de 2025  
**Dataset ID**: 1574079363975678  
**Status**: ⚠️ Nenhum evento recebido  
**Objetivo**: Restaurar fluxo de eventos até validação completa

---

## 📋 Situação Atual

```
Dataset Status:
├─ ID: 1574079363975678 ✅
├─ Owner: Arco WebDev ✅
├─ Pessoas: 2 (Peter + System User) ✅
├─ Events Received: 0 ❌
├─ Last Event: Never ❌
└─ Status: Aguardando dados
```

---

## 🔴 Possíveis Causas (Diagnóstico em Ordem de Probabilidade)

| # | Causa | Probabilidade | Severidade | Fix Time |
|---|-------|---------------|-----------|----------|
| 1️⃣ | Edge Function NÃO deployada | 🔴 Alta | 🔴 Crítico | 5 min |
| 2️⃣ | Secrets NÃO configuradas | 🔴 Alta | 🔴 Crítico | 3 min |
| 3️⃣ | Hook useMetaTracking NÃO disparando | 🟡 Média | 🟡 Alto | 10 min |
| 4️⃣ | Token Meta expirado/revogado | 🟡 Média | 🔴 Crítico | 5 min |
| 5️⃣ | Edge Function URL incorreta | 🟢 Baixa | 🟡 Alto | 2 min |
| 6️⃣ | CORS bloqueando requests | 🟢 Baixa | 🟡 Alto | 5 min |

---

## 🎯 Plano de Ação Estruturado

### FASE A: Diagnóstico Rápido (5 min)

#### ✅ Passo A1: Verificar Edge Function Status

```bash
# Terminal: Verificar se função está deployada
supabase functions list --project-ref YOUR_PROJECT_REF

# Procure por:
# meta-conversions-webhook    ✅ (deve estar listada)
```

**Esperado**:
```
Name                         Status
─────────────────────────────────────
meta-conversions-webhook     ✅
```

**Se NÃO aparecer**:
→ Ir direto para **FASE B.1** (Deploy)

---

#### ✅ Passo A2: Verificar Secrets

```bash
supabase secrets list --project-ref YOUR_PROJECT_REF

# Procure por:
# META_CONVERSION_API_TOKEN   ✅
# META_DATASET_ID             ✅
```

**Esperado**:
```
Name                         
─────────────────────────────
META_CONVERSION_API_TOKEN    
META_DATASET_ID              
```

**Se faltar algum**:
→ Ir direto para **FASE B.2** (Configurar Secrets)

---

#### ✅ Passo A3: Health Check Edge Function

```bash
# Testar se função está respondendo
curl -i https://YOUR_PROJECT_REF.supabase.co/functions/v1/meta-conversions-webhook

# Esperado: HTTP 200
# Se: HTTP 500 ou timeout → Problema em secrets/código
```

**Resultado**:
- ✅ **200**: Função está viva (ir para A4)
- ❌ **500**: Erro em secrets (ir para B.2)
- ❌ **Timeout**: Função não respondendo (ir para B.1)

---

#### ✅ Passo A4: Testar Hook Local

```bash
# Terminal 1: Iniciar servidor
cd /home/jpcardozx/projetos/arco
pnpm dev

# Terminal 2: Verificar logs
# Abrir DevTools (F12) → Console
# Preencher formulário
# Ver logs:
# - "[Meta Tracking] Evento rastreado" ✅
# - Network POST meta-conversions-webhook ✅
```

**Se logs NÃO aparecerem**:
→ Ir para **FASE C** (Debug Hook)

---

### FASE B: Configuração (Sem eventos recebidos?)

#### 🔧 B.1: Deploy Edge Function

**Se função NÃO está em `supabase functions list`**:

```bash
# 1️⃣ Verificar que arquivo existe
ls -la supabase/functions/meta-conversions-webhook/index.ts

# Esperado: arquivo existe

# 2️⃣ Deploy
supabase functions deploy meta-conversions-webhook --project-ref YOUR_PROJECT_REF

# Esperado output:
# ✅ Function meta-conversions-webhook deployed successfully
# 📌 URL: https://YOUR_PROJECT_REF.supabase.co/functions/v1/meta-conversions-webhook

# 3️⃣ Verificar novamente
supabase functions list --project-ref YOUR_PROJECT_REF
```

**✅ Completo quando**: Função aparece em `supabase functions list`

---

#### 🔐 B.2: Configurar Secrets

**Se secrets estão faltando ou vazios**:

```bash
# 1️⃣ Obter seu PROJECT_REF
PROJECT_REF=$(supabase projects list --format json | jq -r '.[0].id')
echo "Project: $PROJECT_REF"

# 2️⃣ Verificar que token é válido (copiar de somewhere seguro)
# IMPORTANTE: Token deve estar em variável de ambiente, NÃO em terminal history

# 3️⃣ Preparar arquivo temporário
cat > .env.supabase.temp << 'EOF'
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=SEU_TOKEN_AQUI
META_TEST_EVENT_CODE=TEST12345
EOF

# 4️⃣ Configurar secrets
supabase secrets set --env-file .env.supabase.temp --project-ref $PROJECT_REF

# 5️⃣ Verificar
supabase secrets list --project-ref $PROJECT_REF

# 6️⃣ Limpeza
rm .env.supabase.temp

# 7️⃣ Redeploy para aplicar secrets
supabase functions deploy meta-conversions-webhook --project-ref $PROJECT_REF
```

**✅ Completo quando**: 
- `supabase secrets list` mostra 3 secrets
- `supabase functions deploy` executa com sucesso

---

### FASE C: Debug Hook (Se formulário NÃO dispara)

#### 🐛 C1: Verificar Provider em Layout

```bash
# Verificar que MetaPixelProvider envolve app
cat src/app/layout.tsx | grep -A 5 "MetaPixelProvider"

# Esperado:
# <MetaPixelProvider>
#   {children}
# </MetaPixelProvider>
```

**Se NÃO encontrar**:
→ Adicionar Provider ao layout

---

#### 🐛 C2: Verificar useMetaTracking no Formulário

```bash
# Procurar por uso de hook
grep -r "useMetaTracking" src/

# Esperado:
# src/components/...YourForm.tsx: const { trackLead } = useMetaTracking();
# src/components/...YourForm.tsx: await trackLead({...});
```

**Se NÃO encontrar**:
→ Integrar hook no formulário

---

#### 🐛 C3: Network Tab Inspection

1. DevTools (F12) → Network tab
2. Filtrar: "meta-conversions-webhook"
3. Preencher + submeter formulário
4. Verificar request:

**Esperado**:
```
POST /functions/v1/meta-conversions-webhook
Status: 200
Response: { "success": true, "eventId": "evt_..." }
```

**Se Status 400/409/500**:
→ Ver response error + logs

---

## 🚀 Execução do Plano (Comece Aqui)

### Passo 1️⃣: Diagnóstico (5 min) [FAÇA AGORA]

```bash
cd /home/jpcardozx/projetos/arco

# Checklist rápido:
echo "1. Functions list:"
supabase functions list --project-ref $(supabase projects list --format json | jq -r '.[0].id')

echo ""
echo "2. Secrets list:"
supabase secrets list --project-ref $(supabase projects list --format json | jq -r '.[0].id')

echo ""
echo "3. Health check:"
PROJECT_REF=$(supabase projects list --format json | jq -r '.[0].id')
curl -i https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook 2>&1 | head -5
```

**Compartilhe o output aqui ↓** para eu diagosticar exatamente o problema

---

### Passo 2️⃣: Executar Fix (conforme resultado de Passo 1)

**Se Edge Function NOT listed**:
```bash
supabase functions deploy meta-conversions-webhook --project-ref YOUR_PROJECT_REF
```

**Se Secrets missing**:
```bash
# Executar FASE B.2 acima
```

**Se Health check 500**:
```bash
# Verificar logs
supabase functions logs meta-conversions-webhook --project-ref YOUR_PROJECT_REF | tail -20
```

---

### Passo 3️⃣: Validação (Após Fix)

```bash
# Terminal 1: Dev server
pnpm dev

# Terminal 2: Submeter lead
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/meta-conversions-webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "test@example.com",
      "phone": "5511999999999"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }'

# Esperado: 200 OK + eventId
```

**Após curl:**
1. Aguardar 5-10 segundos
2. Acessar: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
3. Atualizar página (F5)
4. Procurar evento "Lead" nos últimos eventos

**✅ Sucesso**: Evento aparece em Meta Events Manager

---

## 📊 Checklist de Validação Final

- [ ] `supabase functions list` mostra `meta-conversions-webhook`
- [ ] `supabase secrets list` mostra 3 secrets
- [ ] `curl health-check` retorna 200
- [ ] `curl lead test` retorna 200 + eventId
- [ ] Meta Events Manager mostra 1 evento após curl
- [ ] Formulário local dispara logs ("[Meta Tracking] Evento rastreado")
- [ ] Network tab mostra POST 200 para meta-conversions-webhook
- [ ] Meta Events Manager ATUALIZA em tempo real

---

## 🎯 Próximas Ações (Após Validação)

1. ✅ **Hoje**: Restaurar fluxo de eventos (diagnóstico + fix)
2. ✅ **Amanhã**: Validar 50+ eventos em 24h
3. ✅ **Semana**: Monitorar EMQ > 50%
4. ✅ **Semana+**: Validar CAC -30% target

---

## 📞 Se Bloquear

**Compartilhe comigo**:
1. Output do Passo 1️⃣ (diagnóstico)
2. Error message exata (se houver)
3. Screenshot de Meta Events Manager
4. Console logs (se disponível)

**Vou diagnosticar em < 2 min**

---

*Próximo: Execute Passo 1️⃣ e compartilhe output*
