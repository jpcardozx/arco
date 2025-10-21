# Local Integration Test - Edge Function Real

**Objetivo**: Testar Edge Function localmente sem mocks
**Tempo**: ~10 minutos
**Requerimentos**: Supabase CLI + Node.js

---

## 🚀 Step 1: Rodar Edge Function Localmente

```bash
# Terminal 1: Iniciar Supabase local
supabase start

# Output esperado:
# Started supabase local development server.
# API URL: http://localhost:54321
# GraphQL URL: http://localhost:54321/graphql/v1
```

## 📝 Step 2: Testar com cURL (Payload Real)

```bash
# Terminal 2: Enviar Lead event real

curl -i -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "test-integration@example.com",
      "phone": "(11) 9 9999-9999",
      "firstName": "Teste",
      "lastName": "Integration",
      "city": "São Paulo",
      "state": "SP",
      "fbp": "fb.1.1234567890.1987654321",
      "fbc": "fb.1.1234567890.1234567890123"
    },
    "custom_data": {
      "value": 150,
      "source": "test_integration"
    }
  }'

# Resposta esperada (status 200):
# {
#   "success": true,
#   "eventId": "evt_1729532400000_abc123",
#   "requestId": "req_1729532400123_xyz",
#   "traceId": "trace_1729532400000_def456"
# }
```

## ✅ Step 3: Validar Resposta

```bash
# Verificar campos obrigatórios
# ✓ status 200 (não 400, 409, 500)
# ✓ success: true
# ✓ eventId: formato evt_...
# ✓ requestId: formato req_...
# ✓ traceId: formato trace_...

# Se tudo OK → Edge Function funciona!
```

---

## 🧪 Step 4: Testar Deduplicação Real

```bash
# Enviar MESMO email 2x (deve retornar 409)

# Primeira requisição (OK)
curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "event_id": "evt_test_123456",
    "user_data": {
      "email": "dedup-test@example.com",
      "phone": "5511999999999"
    }
  }'

# Output:
# { "success": true, "eventId": "evt_test_123456", ... }

# Segunda requisição (MESMO event_id)
curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "event_id": "evt_test_123456",
    "user_data": {
      "email": "dedup-test@example.com",
      "phone": "5511999999999"
    }
  }'

# Output esperado (status 409):
# {
#   "success": false,
#   "error": "Duplicate event",
#   "isDuplicate": true,
#   "eventId": "evt_test_123456"
# }

# ✅ Dedup funcionando!
```

---

## 🔍 Step 5: Validar Hashes SHA-256 Reais

```bash
# Testar que hashes estão sendo gerados corretamente

# Enviar Contact event e verificar logs

curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Contact",
    "user_data": {
      "email": "hash-test@example.com",
      "phone": "11987654321"
    }
  }'

# Verificar no console/logs do Supabase:
# - Email foi hasheado com SHA-256
# - Phone foi normalizado + hasheado
# - Hashes têm 64 caracteres hex
```

---

## 📊 Step 6: Teste de Múltiplos Eventos

```bash
# Enviar 5 eventos diferentes para validar batch handling

for i in {1..5}; do
  curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
    -H "Content-Type: application/json" \
    -d "{
      \"event_name\": \"Lead\",
      \"user_data\": {
        \"email\": \"batch-test-$i@example.com\",
        \"phone\": \"5511999999999\"
      },
      \"custom_data\": {
        \"value\": $((100 + i * 10))
      }
    }"

  echo "Event $i sent"
  sleep 0.5
done

# Esperado: 5 eventos com sucesso (status 200)
```

---

## 📈 Step 7: Teste de Performance

```bash
# Medir latência de resposta

time curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "perf-test@example.com",
      "phone": "5511999999999"
    }
  }'

# Esperado:
# ✓ real    0m0.150s  (< 200ms é ótimo)
# ✓ user    0m0.020s
# ✓ sys     0m0.010s
```

---

## 🔐 Step 8: Testar Error Handling

### Erro 1: Payload Inválido (400)

```bash
curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead"
    # Faltam user_data!
  }'

# Esperado (status 400):
# { "error": "Invalid request body", ... }
```

### Erro 2: Duplicado (409)

```bash
# Enviado no Step 4 acima
# Esperado (status 409):
# { "error": "Duplicate event", "isDuplicate": true }
```

### Erro 3: Missing Secrets (500)

```bash
# Se META_CONVERSION_API_TOKEN não está configurado

curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": { "email": "test@example.com" }
  }'

# Esperado (status 500):
# { "error": "Meta credentials not configured", ... }

# Solução:
# supabase secrets set META_CONVERSION_API_TOKEN=seu_token
```

---

## 📋 Checklist de Validação

```
✅ Edge Function inicia localmente
✅ POST com payload real retorna 200
✅ Event ID é gerado (formato evt_...)
✅ Request ID é gerado (formato req_...)
✅ Dedup detecta duplicata (409)
✅ Hashes são SHA-256 válidos (64 hex chars)
✅ Múltiplos eventos processados
✅ Performance < 200ms
✅ Error handling correto (400, 409, 500)
✅ Logs estruturados aparecem
```

---

## 🎯 Teste Completo (End-to-End)

```bash
# 1. Iniciar local
supabase start

# 2. Enviar Lead event
curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "event_id": "evt_e2e_test_' $(date +%s) '",
    "user_data": {
      "email": "e2e-test@example.com",
      "phone": "5511987654321",
      "firstName": "E2E",
      "lastName": "Test",
      "city": "São Paulo",
      "state": "SP"
    },
    "custom_data": {
      "value": 200,
      "source": "e2e_test"
    }
  }'

# 3. Verificar resposta
# ✅ status 200
# ✅ success: true
# ✅ eventId presente

# 4. Testar dedup (enviar 2x)
# ✅ Segunda: status 409, isDuplicate: true

# 5. Testar Contact event
curl -X POST http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Contact",
    "user_data": {
      "email": "contact-test@example.com",
      "phone": "5511999999999"
    }
  }'

# ✅ status 200

# Se tudo passou → Edge Function está operacional!
```

---

## 🚀 Deploy Após Validação

```bash
# Se testes passaram, deploy para produção

supabase functions deploy meta-conversions-webhook

# Verify:
supabase functions list | grep meta-conversions

# Output:
# meta-conversions-webhook  2025-10-21T...  created
```

---

## 📞 Troubleshooting

| Problema | Causa | Solução |
|----------|-------|---------|
| Connection refused | Supabase não está rodando | `supabase start` |
| 500 Internal Error | Secrets não configurados | `supabase secrets set` |
| 400 Invalid JSON | JSON malformado no curl | Validar JSON (use jq) |
| 409 Duplicate | Event ID igual em 1h | Usar event_id diferente |
| Timeout | Edge Function lenta | Verificar logs, testar conexão |

---

## ✅ Success Criteria

**Teste passou se:**

- ✅ Edge Function inicia localmente
- ✅ POST retorna 200 com payload válido
- ✅ Event ID gerado automaticamente
- ✅ Dedup rejeita duplicata (409)
- ✅ Hashes são válidos SHA-256
- ✅ Error handling correto
- ✅ Performance < 200ms
- ✅ Logs estruturados

**Próximo passo:** Deploy para produção com `supabase functions deploy`

---

**Status**: ✅ Validação Local Pronta
