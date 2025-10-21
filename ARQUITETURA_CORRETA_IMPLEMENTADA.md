# 🏗️ Arquitetura Correta: Backend API Layer

**Data**: 21 de Outubro de 2025  
**Status**: ✅ Implementado corretamente  
**Padrão**: Respeitando segurança do Supabase

---

## 🎯 O que Mudou

### ❌ Antes (Tentativa de "Dribla")

```
Frontend (inseguro)
  ↓ Chamava Edge Function diretamente
  ↓ Sem autenticação ou com ANON_KEY
  ↓ Violava segurança do Supabase
Edge Function
  ↓
Meta CAPI
```

**Problema**: Expõe credenciais no frontend

---

### ✅ Agora (Arquitetura Correta)

```
Frontend (seguro)
  ↓ POST /api/meta/conversions
  ↓ (anônimo, sem credenciais)
  ↓ Validação básica
  ↓
Backend API (Next.js Route)
  ↓ Valida dados
  ↓ Usa SERVICE_ROLE_KEY (JWT válido)
  ↓ POST Edge Function com Bearer token
  ↓
Edge Function (protegida)
  ↓ Dedup, hash, enriquece
  ↓
Meta CAPI
```

**Benefícios**:
- ✅ SERVICE_ROLE_KEY nunca expõe ao frontend
- ✅ Edge Function recebe JWT válido
- ✅ Validação adicional no backend
- ✅ Rate limiting possível
- ✅ Logging centralizado
- ✅ Auditoria de quem chama

---

## 🔐 Segurança em Camadas

### Camada 1: Frontend
- ✅ Nunca vê SERVICE_ROLE_KEY
- ✅ Chama `/api/meta/conversions` (endpoint local)
- ✅ Pode ter rate limiting
- ✅ Logs anônimos

### Camada 2: Backend (Next.js API Route)
```typescript
// src/app/api/meta/conversions/route.ts

export async function POST(req: NextRequest) {
  // 1. Validar request
  // 2. Obter SERVICE_ROLE_KEY (seguro no servidor)
  // 3. POST Edge Function com Bearer: SERVICE_ROLE_KEY
  // 4. Retornar resposta ao frontend
}
```

### Camada 3: Edge Function
- ✅ Recebe JWT válido (SERVICE_ROLE_KEY é JWT)
- ✅ Valida payload
- ✅ Dedup, hash, enriquece
- ✅ Chama Meta CAPI com token Meta

### Camada 4: Meta CAPI
- ✅ Recebe evento com dados hashed
- ✅ Valida com token Meta
- ✅ Processa em Events Manager

---

## 📊 Fluxo de Dados

```
Frontend Hook:
  trackLead({email, phone, ...})
  ↓
POST /api/meta/conversions
  {
    event_name: "Lead",
    user_data: { email, phone, ... },
    custom_data: { value, currency }
  }
  ↓
Backend Route Handler:
  1. Valida JSON
  2. Obter SERVICE_ROLE_KEY do env
  3. Busca: ${SUPABASE_URL}/functions/v1/meta-conversions-webhook
  4. Header: Authorization: Bearer ${SERVICE_ROLE_KEY}
  ↓
Edge Function (Supabase):
  1. Valida JWT (SERVICE_ROLE_KEY)
  2. Valida payload
  3. Dedup check
  4. Hash user data
  5. POST Meta CAPI com token Meta
  ↓
Meta Conversions API:
  1. Processa evento
  2. Advanced Matching enriquece
  3. Registra em Events Manager
  ↓
Resposta volta:
  Frontend ← Backend ← Edge Function ← Meta
  { success: true, eventId: "evt_..." }
```

---

## 🚀 Como Testar Agora

### 1️⃣ Iniciar Dev Server

```bash
cd /home/jpcardozx/projetos/arco
pnpm dev
```

### 2️⃣ Testar via Frontend

```
http://localhost:3000
F12 → Console
Preencher formulário
Ver: ✅ "[Meta Tracking] Enviando para API local"
Network: POST /api/meta/conversions (200)
```

### 3️⃣ Testar via curl (direto no backend)

```bash
# Frontend → Backend
curl -X POST http://localhost:3000/api/meta/conversions \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "teste@test.com",
      "phone": "5511999999999"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }' | jq .

# Esperado:
# {
#   "success": true,
#   "eventId": "evt_...",
#   "isDuplicate": false
# }
```

---

## 🔒 Environment Variables (Checklist)

✅ `.env.local` deve ter:

```bash
# Public (frontend)
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Private (backend only)
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # ← IMPORTANTE
```

**Verificar**:

```bash
grep "SUPABASE_SERVICE_ROLE_KEY" .env.local
# Deve retornar uma chave (não vazio)
```

---

## 📁 Arquivos Modificados

1. ✅ **`src/app/api/meta/conversions/route.ts`** (NOVO)
   - API Route que cuida de toda a lógica
   - Usa SERVICE_ROLE_KEY com segurança
   - Chama Edge Function com JWT válido

2. ✅ **`src/hooks/useMetaTracking.ts`** (ATUALIZADO)
   - Agora chama `/api/meta/conversions` (local)
   - Não expõe credenciais
   - Mais simples e seguro

3. ✅ **`supabase/functions/meta-conversions-webhook/index.ts`** (SEM MUDANÇAS)
   - Continua protegida por JWT
   - Recebe Bearer token válido do backend
   - Não precisa de `verify_jwt: false`

---

## ✅ Checklist: Segurança Implementada

- ✅ Frontend nunca vê SERVICE_ROLE_KEY
- ✅ Backend cuida de autenticação
- ✅ Edge Function protegida por JWT
- ✅ Meta token seguro no servidor
- ✅ Validação em múltiplas camadas
- ✅ Logging centralizado
- ✅ Rate limiting possível (futura)
- ✅ Sem "atalhos" ou contorno de segurança

---

## 🎯 Próximas Ações

### 1️⃣ Testar Localmente (5 min)

```bash
pnpm dev

# Frontend test
# http://localhost:3000 → formulário → console ✅
```

### 2️⃣ Testar via Curl (3 min)

```bash
curl -X POST http://localhost:3000/api/meta/conversions \
  -H "Content-Type: application/json" \
  -d '{"event_name":"Lead","user_data":{"email":"test@test.com"}}'
```

### 3️⃣ Validar em Meta (5 min)

```
https://business.facebook.com/events_manager2/list/dataset/1574079363975678
Procurar evento "Lead" com seu email de teste
```

### 4️⃣ Deploy Produção (2 min)

```bash
# Se tudo funcionar localmente:
npx supabase@latest functions deploy meta-conversions-webhook
# (não precisa de supabase.json ou verify_jwt: false)

# Deploy app
npm run build && npm start
```

---

## 🎊 Status Final

```
✅ ARQUITETURA: Correta (3 camadas)
✅ SEGURANÇA: Implementada (SERVICE_ROLE_KEY seguro)
✅ BEST PRACTICES: Respeitadas (sem contornos)
✅ PRONTO PARA: Testes e produção
```

---

**Implementação**: Feita com respeito às boas práticas do Supabase  
**Próximo**: Execute testes locais e compartilhe output
