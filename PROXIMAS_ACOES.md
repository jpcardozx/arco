# 🎯 PRÓXIMAS AÇÕES - Meta CAPI Integration (21/10/2025)

**Status Atual**: ✅ JWT validado | ⚠️ Meta API error 400 | 🔄 Aguardando sua ação

---

## 🔴 BLOQUEIO ATUAL

A Edge Function retorna `HTTP 400` quando tenta enviar para Meta. Isto significa:
- ✅ Autenticação JWT funcionando
- ✅ Edge Function recebendo dados
- ❌ Meta não aceita a requisição

**Possível causa**: Token Meta expirado ou Dataset ID inválido.

---

## ✅ O QUE VOCÊ PRECISA FAZER

### PASSO 1: Validar Token Meta (5 minutos)

1. Abra **https://business.facebook.com**
2. Vá para **Events Manager**
3. Selecione seu Dataset
4. Clique em **Settings** (engrenagem)
5. Selecione **Conversions API**
6. Verifique o **token de acesso**:

```
🔍 Procure por:
   - "Expires at" ou "Expiração"
   - Se expirado → REGENERAR novo token
   - Se válido → Anotar data de expiração
```

### PASSO 2: Se Regenerou Token

Se o token expirou e você regenerou um novo:

```bash
# 1. Copie o novo token da UI do Meta

# 2. Atualize localmente
# Edite .env.local
META_CONVERSION_API_TOKEN=seu_novo_token_aqui

# 3. Atualize no Supabase
cd /home/jpcardozx/projetos/arco
npx supabase secrets set META_CONVERSION_API_TOKEN='seu_novo_token_aqui'

# Confirme
npx supabase secrets list | grep META_CONVERSION_API_TOKEN
```

### PASSO 3: Re-testar Edge Function

Depois de atualizar o token:

```bash
# Use o SERVICE_ROLE_KEY do .env.local
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTU4MzQ0MCwiZXhwIjoyMDc1MTU5NDQwfQ.uKpmqUs-kPi7WEdEebs8moxWqqAEAHl9NbqGMdCF0Gc"

curl -s -X POST 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook' \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "test-novo-token@arco.test"
    },
    "event_id": "evt_novo_token_001",
    "is_test": true
  }' | jq .
```

**Esperado após regenerar token**:
```json
{
  "success": true,
  "eventId": "evt_...",
  "requestId": "trace_...",
  "metaResponse": {
    "events_received": 1,
    "fbtrace_id": "ABC123..."
  }
}
```

Se ainda retornar 400 → Verificar Dataset ID (próximo passo).

### PASSO 4: Se Ainda Retornar 400

Verifique o Dataset ID:

1. Em **Events Manager**, procure pela URL da página
2. Deve conter: `?dataset=1574079363975678`
3. Confirme que este ID corresponde ao `META_DATASET_ID` em `.env.local`
4. Se diferente, atualize:

```bash
# .env.local
META_DATASET_ID=id_correto_aqui

# Redeploy Edge Function
npx supabase functions deploy meta-conversions-webhook
```

---

## 📋 Checklist para Você

- [ ] 1. Abrir Meta Business Manager → Events Manager
- [ ] 2. Verificar token: ainda válido?
- [ ] 3. Se expirou: regenerar novo
- [ ] 4. Atualizar `.env.local` com novo token (se regenerou)
- [ ] 5. Executar `npx supabase secrets set META_CONVERSION_API_TOKEN='...'`
- [ ] 6. Re-testar com curl (comando acima)
- [ ] 7. Se 200 + success:true → Compartilhar "Funcionando! 🎉"
- [ ] 8. Se ainda erro → Compartilhar output e Dataset ID

---

## 📞 Quando Você Fizer os Passos Acima

Compartilhe comigo:
1. **Token ainda válido ou regenerou?**
2. **Resultado do curl (success ou erro 400)?**
3. **Dataset ID que está em Meta** (ex: `1574079363975678`)

Com essas informações, eu vou:
- ✅ Validar se o problema foi resolvido
- ✅ Se sim: Preparar para deploy em produção
- ✅ Se não: Diagnosticar causa exata (pode ser payload, rate limit, etc.)

---

## 🚀 Próximas Fases (Depois que Resolver 400)

### Fase 1: Validação Local (10 min)
```bash
pnpm dev
# http://localhost:3000 → Preencher formulário → Verificar console
```

### Fase 2: Validar em Meta Events Manager (5 min)
```
Events Manager → Verificar se evento "Lead" aparece
Procurar por email: test-novo-token@arco.test
```

### Fase 3: Deploy em Produção (15 min)
```bash
npm run build
# Deploy no Vercel / seu servidor
npx supabase functions deploy meta-conversions-webhook
```

### Fase 4: Testar Produção (5 min)
```bash
# Testar endpoint de produção
curl -s -X POST 'https://seu-domain.com/api/meta/conversions' \
  -H 'Content-Type: application/json' \
  -d '{"event_name":"Lead","user_data":{"email":"prod-test@arco.test"}}'
```

---

## 💬 Dúvidas?

Se algo não funcionar conforme esperado:

1. **Compartilhe o output exato** do curl (incluindo erro)
2. **Confirme token**: é o novo ou o antigo?
3. **Confirme Dataset ID**: é o mesmo que em Meta?

---

## 📌 Status Resumido

```
✅ Autenticação JWT: FUNCIONANDO
✅ Backend API: PRONTO
✅ Edge Function: RESPONDENDO
❌ Meta API: HTTP 400 (provavelmente token)

PRÓXIMO: Você valida token Meta
```

**Tempo estimado para você**: 10 minutos  
**Tempo estimado para mim**: 5 minutos para validar e preparar deploy  

**Total**: ~15 minutos até estar pronto para produção! 🎯

