# 🔍 Diagnóstico: Meta API Error 400

**Data**: 21 de Outubro de 2025, 16:10  
**Status**: 🚨 Erro Meta, JWT validado ✅

---

## ✅ O que Funcionou

| Item | Status | Evidência |
|------|--------|-----------|
| **SERVICE_ROLE_KEY (JWT)** | ✅ Válido | Edge Function aceitou sem "Invalid JWT" |
| **Edge Function Deploy** | ✅ OK | Função respondeu (200 ou 400, não 401) |
| **Backend API** | ✅ Código pronto | `src/app/api/meta/conversions/route.ts` implementado |
| **Secrets Manager** | ✅ OK | `META_CONVERSION_API_TOKEN` presente no Supabase |
| **Frontend Hook** | ✅ Atualizado | `useMetaTracking.ts` chama `/api/meta/conversions` |

---

## ❌ O Problema Atual

```json
{
  "success": false,
  "error": "Meta API error: 400",
  "requestId": "trace_1761074780996_b34k9wy6n"
}
```

**Meta API retorna HTTP 400** quando Edge Function tenta enviar evento.

### Possíveis Causas (em ordem de probabilidade)

1. **Token Meta Expirado/Inválido** (60% probabilidade)
   - Token `META_CONVERSION_API_TOKEN` expirou ou foi revogado
   - Token não tem permissão para o Dataset específico
   - Token foi rotacionado e não atualizado nos secrets

2. **Dataset ID Inválido** (20% probabilidade)
   - `META_DATASET_ID=1574079363975678` não corresponde ao token
   - Dataset foi deletado ou desabilitado

3. **Payload com Formato Errado** (15% probabilidade)
   - Email ou phone não hashing correto
   - Campo obrigatório faltando
   - Tipo de dado incorreto

4. **Rate Limiting ou Quota** (5% probabilidade)
   - Meta aplicando rate limiting
   - Cota diária excedida

---

## 🔧 Ações para Resolver (Ordem Recomendada)

### Ação 1: Validar Token Meta (5 min)

Vá para **Meta Business Manager** → **Events Manager** → Seu Dataset:

1. Settings do Dataset → **Data Sources** → Conversions API
2. Verifique o token de acesso:
   - Se expirado → **gerar novo token**
   - Se válido → anotar data de expiração

Se regenerou token:
```bash
# Atualize localmente
# .env.local
META_CONVERSION_API_TOKEN=novo_token_aqui

# Atualize no Supabase
npx supabase secrets set META_CONVERSION_API_TOKEN='novo_token_aqui'
```

### Ação 2: Validar Dataset ID (2 min)

1. **Meta Business Manager** → **Events Manager**
2. Procure seu dataset
3. URL deve conter ID (ex: `?dataset=1574079363975678`)
4. Confirme que coincide com `META_DATASET_ID` em `.env.local`

### Ação 3: Testar Payload Direto com Meta (3 min)

Use curl direto para Meta com token válido:

```bash
DATASET_ID="1574079363975678"
TOKEN="seu_token_aqui"

curl -X POST "https://graph.facebook.com/v24.0/$DATASET_ID/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Lead",
      "event_time": '$(date +%s)',
      "user_data": {
        "em": ["4eaf4d25c2f7dd6b7d01d40bac6cf38a"],
        "ph": ["8c37e8c3dd01fd0c9a9dcda4b2f4cdf6"],
        "fbp": "fb.1.1596403881668.1116446470",
        "fbc": "fb.1.1598371261668.IwAR3Mj"
      },
      "action_source": "website"
    }],
    "test_event_code": "TEST12345"
  }' \
  -H "Authorization: Bearer $TOKEN"
```

Se Meta retorna erro, a resposta dirá a causa exata.

### Ação 4: Ativar Modo Debug na Edge Function (5 min)

Adicione `is_test: true` à requisição para ativar teste:

```bash
curl -s -X POST 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook' \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "event_name": "Lead",
    "user_data": {"email": "test@arco.test"},
    "event_id": "evt_test_debug_001",
    "is_test": true
  }' | jq .
```

Espera: Edge Function envia com `test_event_code: TEST12345`. Meta retorna com `events_received: 1` se sucesso.

---

## 📋 Checklist de Validação

Rode estes testes para isolar o problema:

- [ ] **1. Verificar token Meta**
  ```bash
  # Acessar Meta Business Manager → Events Manager
  # Confirmar token não expirou
  # Regenerar se necessário
  ```

- [ ] **2. Validar Dataset ID**
  ```bash
  # Confirmar META_DATASET_ID em .env.local corresponde ao dataset em Meta
  ```

- [ ] **3. Testar curl direto com Meta**
  ```bash
  curl -X POST "https://graph.facebook.com/v24.0/$DATASET_ID/events" \
    -H "Content-Type: application/json" \
    -d '{...payload...}' \
    -H "Authorization: Bearer $TOKEN"
  # Esperado: 200 com {"events_received": 1, "fbtrace_id": "..."}
  ```

- [ ] **4. Testar Edge Function com is_test**
  ```bash
  curl -s -X POST 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook' \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H 'Content-Type: application/json' \
    -d '{"event_name":"Lead","user_data":{"email":"test@arco.test"},"is_test":true,"event_id":"evt_test_001"}' | jq .
  # Esperado: 200 com {"success": true, "eventId": "..."}
  ```

---

## 🎯 Próximas Etapas

**Assim que você validar o token Meta**, compartilhe:
- Token ainda válido ou regenerado?
- Dataset ID confirma?
- Resultado do curl direto com Meta?

Então:
1. Se token válido → erro está no payload ou no Meta
2. Se token regenerado → atualizo `.env.local` e Supabase, re-testo
3. Se dataset inválido → corrijo em `.env.local`

---

## 💾 Arquivos Relevantes

- **Edge Function**: `supabase/functions/meta-conversions-webhook/index.ts` (linha 219 lê token)
- **Backend API**: `src/app/api/meta/conversions/route.ts` (chama Edge Function)
- **Config Local**: `.env.local` (META_CONVERSION_API_TOKEN, META_DATASET_ID)
- **Secrets**: `npx supabase secrets list` (mostra digests)

---

## 📌 Resumo Rápido

✅ **JWT/Autenticação**: Funcionando  
❌ **Meta API**: Retorna 400  
🔍 **Próximo**: Validar token Meta + Dataset ID em Meta Business Manager

