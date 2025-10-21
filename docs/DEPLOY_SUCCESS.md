# 🎉 Meta Conversions API - Deploy Completo

**Status**: ✅ Edge Function deployada em staging  
**Data**: Outubro 21, 2025

---

## ✅ O que foi feito

1. **Edge Function deployada**
   - URL: `https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook`
   - Secrets configurados (META_DATASET_ID, META_CONVERSION_API_TOKEN, META_TEST_EVENT_CODE)
   
2. **Ambiente configurado**
   - `.env.local` atualizado para usar cloud (staging)
   - `.env.production` criado com keys de produção
   
3. **.env.local atualizado para staging:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://vkclegvrqprevcdgosan.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..." # production anon key
   ```

---

## 🧪 Próximos Passos

### **1. Testar no seu app (5 min)**

```bash
# 1. Rodar sua aplicação
pnpm dev

# 2. Abrir no navegador
# http://localhost:3000

# 3. Testar formulário ou CTWA button
# - Preencher email/phone
# - Clicar em submit
# - Verificar console.log do eventId

# 4. Verificar se evento foi enviado
# Console deve mostrar:
# "📤 [META] Event sent successfully: Lead"
# "   Event ID: evt_1234567890"
```

### **2. Verificar no Meta Events Manager (30s)**

1. Abrir: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
2. Ir em **"Test Events"** (aba superior)
3. Buscar eventos com code **"TEST12345"**
4. Validar:
   - ✅ Evento aparece (aguarde ~30 segundos)
   - ✅ EMQ Parameters > 6/8 (objetivo: 8/8)
   - ✅ Sem erros de validação

### **3. Entender por que houve erro 400 na Meta API**

O erro `{"success":false,"error":"Meta API error: 400"}` geralmente significa:

**Possíveis causas:**
1. **Token inválido** - Dataset Quality API token expirou ou não tem permissões
2. **Dataset ID errado** - Verificar se 1574079363975678 é correto
3. **Formato de dados** - Phone precisa estar em E.164 format (+5511999999999)
4. **Test Event Code** - Pode estar bloqueando em alguns casos

**Como debugar:**

```bash
# Ver logs detalhados (dashboard Supabase)
# https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/functions/meta-conversions-webhook/logs

# Ou tentar sem test_event_code:
curl -X POST 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ...' \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "test@example.com",
      "phone": "5511999999999"
    },
    "custom_data": {
      "value": 50.00,
      "currency": "BRL"
    }
  }'
```

### **4. Validar token Meta**

```bash
# Testar se token está funcionando
curl -X GET "https://graph.facebook.com/v21.0/1574079363975678" \
  -H "Authorization: Bearer EAALqEBN5Xe8BPtrFT1xDoa1xUAAIKyQ1vF4EJz4inLuBAFkC0HtLZCBK5qHxj5wJQ0THQYOjJ6CxOvwwa3Eu8QZCIhmGb8XCWps8GYWImF7UX8XU14zl8nZAnZBoyDfURQA9tpfBpc4wl4hnzBrDEtKz23ImP4rFZBGpQEYTnNLWWo7Qi9HpGr3Ns3PbTWKN69AZDZD"

# Resposta esperada:
# {"id":"1574079363975678","name":"Nome do Dataset"}
```

---

## 🎯 Checklist de Validação

- [ ] `.env.local` atualizado com URLs de production
- [ ] `pnpm dev` rodando sem erros
- [ ] Formulário enviando evento (console.log mostra eventId)
- [ ] Meta Events Manager mostrando eventos em Test Events
- [ ] EMQ > 6/8 parameters
- [ ] Sem duplicação de eventos (event_id único)

---

## 🔥 Ações Imediatas

1. **Verificar token Meta está válido** (curl acima)
2. **Testar no seu app** (pnpm dev → preencher formulário)
3. **Conferir logs da Edge Function** no dashboard Supabase
4. **Validar EMQ no Meta Events Manager**

---

## 📊 Meta Events Manager

**URL**: https://business.facebook.com/events_manager2/list/dataset/1574079363975678

**O que validar:**
- **Test Events**: Eventos com code "TEST12345"
- **Dataset Quality**: EMQ > 60%
- **Event Matching**: Deduplicação < 3%
- **Activity**: Volume de eventos/dia

---

## 💡 Troubleshooting

### Erro: "Meta API error: 400"
- **Causa provável**: Token expirou ou não tem permissões
- **Solução**: Gerar novo Dataset Quality API token no Meta Events Manager

### Erro: "Missing authorization header"
- **Causa**: Não está enviando anon key no header
- **Solução**: Verificar useMetaTracking hook está usando `supabaseClient` corretamente

### Eventos não aparecem no Meta
- **Causa**: test_event_code só aparece em "Test Events", não em "Activity"
- **Solução**: Remover `test_event_code` para ver em Activity

---

## 🚀 Quando passar para Production

**Critérios:**
1. ✅ 10+ eventos de teste enviados com sucesso
2. ✅ EMQ > 60% consistente
3. ✅ Deduplicação < 3%
4. ✅ Sem erros 400/401 da Meta API

**Como fazer:**
```bash
# 1. Deploy para production
./scripts/deploy-meta-smart.sh  # Escolha opção 2

# 2. Remover test_event_code do .env.local
# (comentar ou deletar linha META_TEST_EVENT_CODE)

# 3. Restart app
pnpm dev
```

---

**Status**: ✅ Staging deployado, aguardando validação de eventos  
**Próximo**: Testar no app + validar EMQ no Meta Events Manager
