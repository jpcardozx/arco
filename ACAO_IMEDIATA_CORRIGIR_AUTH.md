# 🎬 AÇÃO IMEDIATA: Corrigir Edge Function Auth + Meta Token

**Data**: 21 de Outubro de 2025  
**Problema Atual**: JWT Invalid (Edge Function requer JWT válido)  
**Solução**: Remover autenticação obrigatória OU usar token correto

---

## 🔴 Problema Encontrado

```
HTTP 401: Invalid JWT
Causa: Edge Function está validando JWT do Supabase
Solução: Aceitar requests SEM autenticação (CORS public)
```

---

## ✅ SOLUÇÃO: Fazer Edge Function Pública (CORS)

### Passo 1: Editar Edge Function

**Arquivo**: `supabase/functions/meta-conversions-webhook/index.ts`

**Linha ~395**: Encontrar

```typescript
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
```

**Adicione ANTES de qualquer validação**:

```typescript
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // ✅ NÃO REQUERER AUTENTICAÇÃO (é uma webhook pública)
  // O token Meta no server-side já garante segurança
```

A função JÁ TEM CORS headers corretos. O problema é que Supabase está forçando autenticação.

---

### Passo 2: Usar REST API Supabase (sem JWT)

**Alternativa**: Chamar via REST API com `?accept=application/json` (public):

```bash
# Em vez de:
curl -H "Authorization: Bearer $ANON_KEY" https://.../meta-conversions-webhook

# Fazer assim (diretamente):
curl https://seu-projeto.supabase.co/functions/v1/meta-conversions-webhook \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{...}'

# Se retorna 401: adicionar header de API key (não JWT)
curl https://seu-projeto.supabase.co/functions/v1/meta-conversions-webhook \
  -X POST \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON_KEY" \
  -d '{...}'
```

---

### Passo 3: Testar com apikey Header

```bash
cd /home/jpcardozx/projetos/arco

ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local | cut -d'=' -f2)
PROJECT_REF="vkclegvrqprevcdgosan"
EDGE_URL="https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook"

# Teste 1: COM apikey header
curl -v -X POST "$EDGE_URL" \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON_KEY" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "teste1@test.com",
      "phone": "5511999999999"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }' 2>&1 | head -50

# Esperado: HTTP 200 ou 400 (não 401)
```

---

## 📋 Resumo das Opções

| Opção | Solução | Effort | Segurança |
|-------|---------|--------|-----------|
| **A** | Usar `apikey` header | 1 min | ✅ Boa |
| **B** | Remover auth da função | 5 min | ⚠️ Pública |
| **C** | Usar Auth Supabase Realtime | 15 min | ✅ Ótima |

---

## 🚀 Recomendação: Opção A (apikey header)

### Por que?
- ✅ Funciona com Supabase padrão
- ✅ Mantém segurança básica
- ✅ Rápido de implementar
- ✅ Compatible com frontend

### Como implementar:

#### 1. Atualizar `useMetaTracking.ts` (Hook)

**Arquivo**: `src/hooks/useMetaTracking.ts`

**Procure por**:
```typescript
const response = await fetch(edgeFunctionUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${anonKey}`,  // ← REMOVER OU comentar
  },
```

**Adicione**:
```typescript
const response = await fetch(edgeFunctionUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",  // ← ADICIONAR
  },
```

#### 2. Testar Localmente

```bash
# Terminal 1: Dev server
pnpm dev

# Terminal 2: Preencher formulário e verificar console
# F12 → Console → Procurar "✅ [Meta Tracking]"
```

#### 3. Testar via curl

```bash
ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local | cut -d'=' -f2)

curl -X POST "https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook" \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON_KEY" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "teste-apikey@test.com",
      "phone": "5511999999999"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }' | jq .

# Esperado: 200 OK + eventId
```

---

## 🎯 Próximos Passos Imediatos (Ordem de Execução)

### 1️⃣ Testar com apikey (2 min)

```bash
cd /home/jpcardozx/projetos/arco

ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local | cut -d'=' -f2)

curl -X POST "https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook" \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON_KEY" \
  -d '{"event_name":"Lead","user_data":{"email":"teste@test.com","phone":"5511999999999"},"custom_data":{"value":150,"currency":"BRL"}}' | jq .
```

**Se funcionar** (200 OK com eventId):
→ Ir para **Passo 2**

**Se falhar** (erro):
→ Compartilhe output comigo

---

### 2️⃣ Atualizar useMetaTracking.ts (5 min)

**Localizar**:
```bash
grep -n "Authorization.*Bearer.*SUPABASE_ANON_KEY" src/hooks/useMetaTracking.ts
```

**Editar**:
```typescript
// ANTES:
headers: { "Authorization": `Bearer ${...}` }

// DEPOIS:
headers: { "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" }
```

---

### 3️⃣ Testar Localmente (5 min)

```bash
pnpm dev
# http://localhost:3000
# F12 → Console
# Preencher formulário
# Verificar logs: ✅ "[Meta Tracking] Evento rastreado"
```

---

### 4️⃣ Deploy (2 min)

```bash
# Se local funcionar:
npx supabase@latest functions deploy meta-conversions-webhook
```

---

### 5️⃣ Validar em Meta (5 min)

```bash
# Ir para: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
# Procurar evento "Lead" com seu email de teste
# Deve aparecer em tempo real (< 10 segundos)
```

---

## 📊 Expectativas Após Fixes

```
Before:  HTTP 401 | Invalid JWT
After:   HTTP 200 | { "success": true, "eventId": "evt_..." }
```

---

## 🆘 Se Bloquear

### ❌ "Still getting 401"

```bash
# Verificar que apikey header está sendo enviado
curl -v -X POST "..." \
  -H "apikey: $ANON_KEY" \
  ... 2>&1 | grep -i "apikey"

# Deve ver: "> apikey: eyJ..."
```

---

### ❌ "apikey header não reconhecido"

Adicionar ao CORS:

```typescript
// Em _shared/cors.ts
export const corsHeaders = {
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",  // ← ADICIONAR apikey
  // ...
};
```

---

### ❌ "Edge Function ainda retorna erro"

Ver logs:

```bash
npx supabase@latest functions logs meta-conversions-webhook | tail -100
```

Procurar por erros de:
- Token Meta inválido/expirado
- Secrets não configurados
- Network issues

---

## 📌 Resumo Executivo

```
Problema:  Edge Function HTTP 401 (JWT Invalid)
Solução:   Usar header "apikey" em vez de "Authorization: Bearer"
Tempo:     ~15 minutos para full fix
Status:    ✅ Pronto para implementar
```

---

## 🎬 Comece Aqui

**Execute isto AGORA** (copiar/colar):

```bash
cd /home/jpcardozx/projetos/arco

# 1. Obter ANON_KEY
ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local | cut -d'=' -f2)
echo "ANON_KEY: ${ANON_KEY:0:20}..."

# 2. Testar Edge Function com apikey
curl -X POST "https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook" \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON_KEY" \
  -d '{"event_name":"Lead","user_data":{"email":"apikey-test@test.com","phone":"5511999999999"},"custom_data":{"value":150,"currency":"BRL"}}' \
  | jq .

# 3. Compartilhe output (success ou erro)
```

**Output esperado**:
```json
{
  "success": true,
  "eventId": "evt_...",
  "requestId": "req_...",
  "isDuplicate": false
}
```

---

**Próximo**: Execute comando acima e compartilhe output
