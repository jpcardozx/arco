# 🎬 Checklist de Execução - Meta Pixel + CAPI
**Data Início**: 21 de Outubro de 2025  
**Status**: Pronto para Iniciar  
**Objetivo**: Go-Live em 80 minutos

---

## 📊 Situação Atual

```
Código:        ✅ 100% Pronto
Frontend:      ✅ Integrado
Backend:       ✅ Edge Function Pronta
Produção:      ⏳ Aguardando Execução (Você está aqui)
```

---

## 🔴 FASE 1: SETUP (20 min) - CRÍTICO

### ⚙️ Subtarefa 1.1: Validar Token Meta (5 min)

**O que fazer**:
- [ ] Acessar: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
- [ ] Verificar: Token está ativo?
- [ ] Se expirado: Gerar novo token (Settings → Access Tokens)
- [ ] Copiar: TOKEN_NOVO (vamos usar em próximo passo)

**Validação Técnica**:
```bash
# Cole seu token aqui e execute:
TOKEN="seu_token_aqui"
curl -s "https://graph.instagram.com/me?access_token=$TOKEN" | jq .

# Esperado:
# { "id": "123456", "name": "Meta Conversions Dataset" }
```

**✅ Completo quando**: Token validado com sucesso (curl retorna JSON com ID)

---

### 🔐 Subtarefa 1.2: Configurar Supabase Secrets (10 min)

**Pré-requisito**: Token validado em 1.1

**O que fazer**:

#### Passo 1️⃣: Preparar arquivo temporário
```bash
cd /home/jpcardozx/projetos/arco

# Criar arquivo com suas credenciais
cat > .env.supabase.temp << 'EOF'
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=COLE_SEU_TOKEN_AQUI
META_TEST_EVENT_CODE=TEST12345
EOF
```

- [ ] Arquivo `.env.supabase.temp` criado

#### Passo 2️⃣: Verificar conteúdo
```bash
cat .env.supabase.temp
# Verificar que token aparece (3 linhas esperadas)
```

- [ ] 3 variáveis visíveis no arquivo

#### Passo 3️⃣: Fazer login Supabase (se necessário)
```bash
supabase login
# Seguir instruções no browser
```

- [ ] Login confirmado

#### Passo 4️⃣: Identificar seu project-ref
```bash
supabase projects list
# Copiar projeto ref (ex: abcdefghijklmnop)
```

- [ ] Project ref copiado: `_________________`

#### Passo 5️⃣: Configurar secrets
```bash
# SUBSTITUA YOUR_PROJECT_REF pelo valor copiado em Passo 4
PROJECT_REF="YOUR_PROJECT_REF"

supabase secrets set --env-file .env.supabase.temp --project-ref $PROJECT_REF

# Resultado esperado:
# ✅ Set 3 secrets successfully
```

- [ ] Secrets configurados (output: "3 secrets successfully")

#### Passo 6️⃣: Verificar secrets
```bash
supabase secrets list --project-ref $PROJECT_REF

# Esperado:
# META_CONVERSION_API_TOKEN ✅
# META_DATASET_ID           ✅
# META_TEST_EVENT_CODE      ✅
```

- [ ] 3 secrets listados com sucesso

#### Passo 7️⃣: Limpeza segura
```bash
# IMPORTANTE: Destruir arquivo com token
rm .env.supabase.temp

# Verificar se foi deletado
ls .env.supabase.temp
# Esperado: "No such file or directory"
```

- [ ] Arquivo `.env.supabase.temp` deletado permanentemente

**✅ Completo quando**: Secrets listados + arquivo deletado

---

### 🚀 Subtarefa 1.3: Deploy Edge Function (5 min)

**Pré-requisito**: Secrets configurados em 1.2

**O que fazer**:

```bash
PROJECT_REF="YOUR_PROJECT_REF"  # Mesmo valor de 1.2

# Deploy
supabase functions deploy meta-conversions-webhook --project-ref $PROJECT_REF
```

- [ ] Deploy iniciado
- [ ] Output mostra: "✅ Function deployed successfully"
- [ ] URL exibida: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/meta-conversions-webhook`

**Validação - Health Check**:
```bash
# Testar se função está respondendo
curl -i https://YOUR_PROJECT_REF.supabase.co/functions/v1/meta-conversions-webhook

# Esperado: HTTP 200
```

- [ ] Health check: 200 OK

**✅ Fase 1 Completa quando**: Health check retorna 200

---

## 🟡 FASE 2: META BUSINESS (30 min) - IMPORTANTE

### 🎯 Subtarefa 2.1: Criar Conversão em Events Manager (15 min)

**O que fazer**:
1. Acessar: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
2. Botão: **New Conversion** (azul)
3. Nome: `Lead - Web (Production)`
4. Evento: Selecionar `Lead`
5. Salvar

**Validação Visual**:
- [ ] Conversão aparece em lista
- [ ] Status: "Active"
- [ ] Event ID criado

**✅ Completo quando**: Conversão visível em Events Manager

---

### 📊 Subtarefa 2.2: Ativar Advanced Matching (10 min)

**Crítico**: Sem isto, EMQ fica ~15% (com isto: ~50%+)

**O que fazer**:
1. Events Manager → Seu Dataset
2. Settings → **Advanced Matching**
3. Toggle: **ON** (deve ficar verde)
4. Salvar

**Validação Visual**:
- [ ] Toggle = ON (verde)
- [ ] Status: "Enabled"

**Impacto Esperado**:
- EMQ anterior: ~15%
- EMQ esperado: ~50%+ (em 2-3 dias)

**✅ Completo quando**: Advanced Matching = ON

---

### 🧪 Subtarefa 2.3: Test Event Code (5 min - Opcional)

**O que fazer** (opcional, mas recomendado):
1. Dataset Settings → Test Event Code
2. Copiar: `TEST12345`
3. Vamos usar em fase de validação

**✅ Completo quando**: Test Event Code copiado

**Checklist Fase 2**:
- [ ] Conversão "Lead - Web (Production)" criada
- [ ] Advanced Matching = ON
- [ ] Test Event Code = TEST12345

---

## 🟡 FASE 3: META ADS (20 min) - IMPORTANTE

### 📢 Subtarefa 3.1: Criar Campanha (15 min)

**O que fazer**:
1. Acessar: https://ads.facebook.com/
2. **Create Campaign**
3. Objetivo: **Lead Generation**
4. Nome: `ARCO - Leads (Production)`

**Ad Set Config**:
- [ ] Optimization Event: `Lead` (conversão criada em 2.1)
- [ ] Value Tracking: Enabled
- [ ] Valor Default: 150 BRL (LTV médio)

**Ad Creative**:
- [ ] Destination: ARCO Landing page
- [ ] Call-to-action: Claro (ex: "Request Appointment")

**✅ Completo quando**: Campanha criada + pronta para launch

---

### 🔗 Subtarefa 3.2: Validar Integração Local (5 min)

**O que fazer**:

```bash
# Terminal 1: Iniciar servidor
cd /home/jpcardozx/projetos/arco
pnpm dev

# Esperado: "Local: http://localhost:3000"
```

- [ ] Servidor iniciado (localhost:3000 funciona)

**Teste Manual**:
1. Abrir: http://localhost:3000 no browser
2. DevTools: F12 → Console
3. Preencher formulário (ex: "Agendar Consulta")
4. Submeter

**Validações no Console**:
- [ ] Log: ✅ "[Meta Tracking] Evento rastreado"
- [ ] Log: 📊 "[Pixel] Lead disparado com eventId: evt_..."
- [ ] Network: POST `meta-conversions-webhook` retorna 200

**✅ Completo quando**: Logs aparecem + Network 200

**Checklist Fase 3**:
- [ ] Campanha criada
- [ ] Optimization Event = Lead
- [ ] Servidor local: pnpm dev funcionando
- [ ] Formulário dispara tracking (console logs)

---

## ✅ FASE 4: VALIDAÇÃO END-TO-END (10 min) - FINAL

### 🧪 Subtarefa 4.1: Teste Local com Curl (5 min)

**O que fazer**:

```bash
PROJECT_REF="YOUR_PROJECT_REF"

# Teste 1: Health check
curl -i https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook

# Esperado: HTTP 200
```

- [ ] Health check: 200 OK

**Teste 2: Submeter Lead via CAPI**:

```bash
EDGE_URL="https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook"

curl -X POST "$EDGE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "validacao@test.com",
      "phone": "5511999999999",
      "firstName": "Teste",
      "lastName": "Validacao",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310100"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }'

# Esperado (200 OK):
# {
#   "success": true,
#   "eventId": "evt_1698000000000_xyz",
#   "requestId": "req_1698000000000_abc",
#   "isDuplicate": false,
#   "duration": 120
# }
```

- [ ] Response: 200 OK
- [ ] `"success": true`
- [ ] Event ID gerado
- [ ] `"isDuplicate": false`

**Teste 3: Validar Deduplicação**:

```bash
# Submeter MESMO lead novamente (30 segundos depois)
curl -X POST "$EDGE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "validacao@test.com",  # MESMO email
      "phone": "5511999999999",
      "firstName": "Teste",
      "lastName": "Validacao"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }'

# Esperado (409 Conflict):
# {
#   "success": false,
#   "error": "Duplicate event detected",
#   "isDuplicate": true,
#   "eventId": "evt_1698000000000_xyz"  # MESMO ID
# }
```

- [ ] Response: 409 Conflict
- [ ] `"isDuplicate": true`
- [ ] Mesmo `eventId` retornado (dedup funcionando!)

**✅ Completo quando**: 3 testes passam (200, dedup, 409)

---

### 📊 Subtarefa 4.2: Validação Meta Events Manager (5 min)

**O que fazer**:

1. Acessar: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
2. Filtro: **Últimas 24 horas**
3. Submeter 5 leads via localhost:3000 (formulário)

**Validações**:
- [ ] 5 eventos aparecem em tempo real
- [ ] NÃO aparecem como 10 (sem duplicação)
- [ ] Event Match Quality (EMQ): > 30% ou em progresso
- [ ] Advanced Matching: ON

**Teste de Deduplicação em Meta**:

1. Abrir DevTools (F12) em localhost:3000
2. Preencher formulário com email: `dup-test@example.com`
3. Submeter
4. Verificar em Meta Events Manager: 1 evento aparece
5. Aguardar 10 segundos
6. Preencher E SUBMETER novamente (mesmo email)
7. Verificar em Meta Events Manager: AINDA 1 evento (não 2)

- [ ] 1º submit: 1 evento aparece em Meta
- [ ] 2º submit: AINDA 1 evento em Meta (dedup!)
- [ ] Console: 409 Conflict no 2º submit

**✅ Completo quando**: Dedup validada (1 evento após 2 submits)

**Checklist Fase 4**:
- [ ] Curl health check: 200
- [ ] Curl lead test: 200 + eventId
- [ ] Curl dedup test: 409 + isDuplicate:true
- [ ] 5 eventos em Meta Events Manager
- [ ] Dedup: AINDA 1 evento após 2º submit
- [ ] EMQ > 30% ou em progresso

---

## 🎉 RESUMO FINAL

### Timeline Consolidada

| # | Fase | Tempo | Status | Checklist |
|---|------|-------|--------|-----------|
| 1️⃣ | Setup (Token + Secrets + Deploy) | 20 min | 🔴 CRÍTICO | Fase 1 ✅ |
| 2️⃣ | Meta Business (Conversão + Advanced) | 30 min | 🟡 IMPORTANTE | Fase 2 ✅ |
| 3️⃣ | Meta Ads (Campaign + Local Validation) | 20 min | 🟡 IMPORTANTE | Fase 3 ✅ |
| 4️⃣ | Validação End-to-End | 10 min | ✅ FINAL | Fase 4 ✅ |
| | **TOTAL** | **80 min** | 🚀 GO-LIVE | |

---

### 📈 Métricas Esperadas (Post Go-Live)

**Semana 1**:
- Leads: +50% (mais eventos capturados)
- EMQ: 30-50% (subindo gradualmente)
- Dedup rate: 100%

**Semana 2-4**:
- CAC: -30% (melhor targeting)
- ROAS: 1.8x-2.8x (otimização Meta ativa)
- EMQ: 50%+ (full ramp-up)

---

### 🚨 Blockers Críticos

| Blocker | Solução | Tempo |
|---------|---------|-------|
| Token inválido | Validar com curl / gerar novo | 5 min |
| Secrets não aparecem | Redeploy + listar novamente | 2 min |
| Edge Function 500 | Verificar logs + redeploy | 5 min |
| EMQ muito baixa | Ativar Advanced Matching | 2 min |
| Duplas conversões | Validar dedup em curl test | 3 min |

---

### ✅ Sign-Off Checklist

Quando tudo abaixo estiver ✅, você está **PRONTO PARA PRODUÇÃO**:

- [ ] **Fase 1**: Token + Secrets + Deploy = ✅
- [ ] **Fase 2**: Conversão criada + Advanced Matching ON = ✅
- [ ] **Fase 3**: Campanha criada + Local validation = ✅
- [ ] **Fase 4**: Curl tests (200, 409) + Meta validation = ✅
- [ ] **Documentação**: Plano entregue e compreendido = ✅
- [ ] **Go-Live**: Autorizado para produção = ✅

---

## 🎬 Como Usar Este Checklist

### Durante Execução:
1. ✅ Marque cada subtarefa quando completada
2. 📸 Tire screenshots de validações importantes
3. 📝 Anote horários (começou em X, terminou em Y)
4. ⚠️ Se bloquear, consulte seção "Troubleshooting"

### Após Execução:
1. 📊 Compartilhe checklist completo
2. 📈 Monitore métricas (EMQ, CAC, Leads)
3. 🔄 Ajuste conforme resultados

---

## 📞 Próximos Passos

### ✅ Imediato (Hoje):
```
Fase 1: Setup (20 min)    ← COMECE AQUI
Fase 2: Meta Business (30 min)
Fase 3: Meta Ads (20 min)
Fase 4: Validação (10 min)
```

### ✅ Próxima Semana:
```
Monitorar: Events/hora, EMQ%, dedup rate
Ajustar: Budget, creative, messaging
Validar: CAC -30% target
```

### ✅ Semana 2+:
```
Scale: Aumentar budget
Expand: Purchase tracking
Optimize: A/B testing
```

---

**Status**: 🟢 **PRONTO PARA COMEÇAR AGORA**  
**Próximo Passo**: Iniciar Subtarefa 1.1 (Validar Token Meta)  
**Tempo Total**: ~80 minutos até Go-Live

---

*Documento criado em: 21 de Outubro de 2025*  
*Versão: 1.0 - Execution Plan*
