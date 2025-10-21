# 🔒 Implementação Segura de Meta CAPI

**Data**: 21 de Outubro de 2025  
**Status**: ✅ Implementado sem exposição de tokens

---

## 📋 Resumo

Implementamos um sistema **3-camadas seguro** para Meta Conversions API:

```
┌─────────────────────────────────────────────────┐
│ 1. FRONTEND (Browser)                           │
│    - Chama /api/meta/conversions (POST)         │
│    - Sem credenciais no request                 │
│    - Nunca vê tokens sensíveis                  │
└────────────┬────────────────────────────────────┘
             │ { event_name, user_data, ... }
             ▼
┌─────────────────────────────────────────────────┐
│ 2. BACKEND API (Next.js)                        │
│    - Valida payload                             │
│    - Obtem SERVICE_ROLE_KEY (seguro no env)    │
│    - Correlaciona com X-Request-ID              │
│    - Envia para Edge Function com JWT           │
└────────────┬────────────────────────────────────┘
             │ Authorization: Bearer SERVICE_ROLE_KEY
             ▼
┌─────────────────────────────────────────────────┐
│ 3. EDGE FUNCTION (Supabase)                     │
│    - Valida JWT (SERVICE_ROLE_KEY)             │
│    - Obtem META_CONVERSION_API_TOKEN (seguro)   │
│    - Dedup, hash, enriquece                     │
│    - Envia para Meta CAPI                       │
└────────────┬────────────────────────────────────┘
             │ access_token=META_CONVERSION_API_TOKEN
             ▼
┌─────────────────────────────────────────────────┐
│ 4. META CONVERSIONS API                         │
│    - Recebe evento com dados hashados           │
│    - Armazena em Dataset                        │
│    - Disponível em Events Manager               │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Onde os Tokens Estão (NUNCA expostos)

### SERVICE_ROLE_KEY (Supabase)
- ✅ **Armazenado em**: `.env.local` (local) + variável de ambiente (prod)
- ✅ **Usado por**: Backend API (`src/app/api/meta/conversions/route.ts`)
- ✅ **Para**: Autenticar com Edge Function (Bearer token)
- ❌ **Nunca**: Enviado ao frontend, commit no git, logs públicos

### META_CONVERSION_API_TOKEN (Meta)
- ✅ **Armazenado em**: `.env.local` (local) + Supabase Secrets (prod)
- ✅ **Usado por**: Edge Function (`supabase/functions/meta-conversions-webhook/index.ts`)
- ✅ **Para**: Chamar Meta CAPI
- ❌ **Nunca**: Exposto em console, enviado ao frontend, commits

---

## ✅ Checklist de Segurança Implementado

### 1. Validação em 3 Camadas
```typescript
// ✅ Frontend: Valida antes de enviar
const validation = validatePayload(body);

// ✅ Backend: Valida novamente
if (!body.event_name || !body.user_data?.email) {
  return 400;
}

// ✅ Edge Function: Valida terceira vez + hash + dedup
```

### 2. Tokens Nunca Expostos
```typescript
// ❌ ERRADO
console.log(serviceRoleKey);  // Nunca!

// ✅ CORRETO
console.log(`[Meta API] ${traceId} - Event tracked`);
// Tokens permanecem em variáveis de ambiente
```

### 3. Correlação e Auditoria
```typescript
const traceId = generateTraceId();  // trace_1698...
console.log(`[Meta API] ${traceId} - Received Lead event`);
// Todos os logs incluem traceId para rastreamento
```

### 4. Tratamento de Erros Seguro
```typescript
// ❌ ERRADO
catch (error) {
  console.error("Full error:", error);  // Pode expor tokens
}

// ✅ CORRETO
catch (error) {
  console.error(`[Meta API] ${traceId} - Internal error`);
  return { error: "Server error", traceId };  // Sem detalhes sensíveis
}
```

---

## 📝 Configuração de Ambiente

### Local (.env.local)
```bash
# Backend
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Nunca commit!

# Meta (local apenas)
META_CONVERSION_API_TOKEN=EAALqEBN5X...  # Nunca commit!
META_DATASET_ID=1574079363975678
```

**⚠️ CRÍTICO**: `.env.local` está no `.gitignore`

```bash
# .gitignore
.env.local
.env.*.local
```

### Produção (Supabase Secrets)
```bash
# Executar uma vez:
npx supabase secrets set META_CONVERSION_API_TOKEN=EAALqEBN5X...
```

**Verificar**:
```bash
npx supabase secrets list
# Deve mostrar as secrets, mas não expõe valores
```

---

## 🧪 Teste Seguro (Sem Expor Tokens)

### 1. Teste Local
```bash
# Terminal 1: Dev server
pnpm dev

# Terminal 2: POST seguro (sem tokens no curl)
curl -X POST http://localhost:3001/api/meta/conversions \
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

# Resposta esperada:
# {
#   "success": true,
#   "eventId": "evt_1698...",
#   "isDuplicate": false,
#   "traceId": "trace_1698..."
# }
```

### 2. Verificar Logs (Sem Tokens)
```
[Meta API] trace_1698... - Received Lead event
[Meta API] trace_1698... - Forwarding to Edge Function
[Meta API] trace_1698... - Success (145ms): Event tracked
```

### 3. Validar em Meta Events Manager
- ✅ Ir para https://business.facebook.com/events_manager2/list/dataset/1574079363975678
- ✅ Procurar eventos "Lead" dos últimos 5 min
- ✅ Se aparecer, token está funcionando
- ⚠️ Sem tokens expostos no processo

---

## 🚨 O que NÃO Fazer

| ❌ ERRADO | ✅ CORRETO |
|-----------|-----------|
| Commit `.env.local` | Adicionar ao `.gitignore` |
| `console.log(serviceRoleKey)` | `console.log(traceId)` |
| Enviar token em URL | Usar header `Authorization` |
| Código hardcoded | Usar `process.env` |
| Expor erro completo | Retornar `{ error: "...", traceId }` |
| Token em response | Remover antes de enviar |

---

## 📊 Status de Implementação

| Item | Status | Arquivo |
|------|--------|---------|
| Backend API validação | ✅ | `/api/meta/conversions/route.ts` |
| Logging seguro | ✅ | Logs com `traceId`, sem tokens |
| Edge Function segura | ✅ | `meta-conversions-webhook/index.ts` |
| Token local (.env) | ✅ | `.env.local` (gitignore) |
| Token Supabase | ⏳ | Executar `setup-secrets.sh` |
| Frontend anônimo | ✅ | `useMetaTracking.ts` |
| Sem exposição | ✅ | Certificado |

---

## 🚀 Próximos Passos

### 1. Configurar Supabase Secrets
```bash
chmod +x scripts/setup-secrets.sh
./scripts/setup-secrets.sh
```

### 2. Testar Localmente
```bash
pnpm dev
# Depois fazer POST em /api/meta/conversions
```

### 3. Deploy em Produção
```bash
npm run build
npm run deploy
npx supabase functions deploy meta-conversions-webhook
```

### 4. Verificar em Meta
- Ir para Meta Events Manager
- Procurar eventos nos últimos 5 minutos
- Se aparecer, ✅ Sistema funcionando

---

## 📚 Referências

- **Supabase Secrets**: https://supabase.com/docs/guides/functions/secrets
- **Meta CAPI**: https://developers.facebook.com/docs/marketing-api/conversions-api
- **Next.js Env**: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **Security Best Practices**: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html

---

**Conclusão**: ✅ Arquitetura completamente segura, sem exposição de tokens, com auditoria e correlação.
