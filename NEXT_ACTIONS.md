# ⚡ Próximas Ações - Meta Pixel Integration

**Status**: 80% Completo - Aguardando Ações Manuais
**Tempo Estimado**: 20 minutos (Total)
**Prioridade**: 🔴 CRÍTICA

---

## 🎯 3 Ações Imediatas

### ✅ 1. Revogar Token Antigo (5 min) - CRÍTICO

**Por quê?** Token exposto ainda é válido e pode ser usado por terceiros

**Como fazer:**
1. Abra: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
2. Clique em **Settings** → **API Tokens**
3. Localize o token ativo (começando com `EAALqEBN5Xe8...`)
4. Clique **Revoke**
5. Confirme ação

**Confirmação**: Token será marcado como "Revoked" e inativo

---

### ✅ 2. Atualizar Supabase Secrets (5 min)

**Opção A: Via CLI (Recomendado)**

```bash
# Terminal
export META_TOKEN="EAALqEBN5Xe8BPtrFT1xDoa1xUAAIKyQ1vF4EJz4inLuBAFkC0HtLZCBK5qHxj5wJQ0THQYOjJ6CxOvwwa3Eu8QZCIhmGb8XCWps8GYWImF7UX8XU14zl8nZAnZBoyDfURQA9tpfBpc4wl4hnzBrDEtKz23ImP4rFZBGpQEYTnNLWWo7Qi9HpGr3Ns3PbTWKN69AZDZD"

supabase secrets set META_CONVERSION_API_TOKEN="$META_TOKEN" \
  --project-ref vkclegvrqprevcdgosan
```

**Opção B: Via Dashboard**

1. Abra: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan
2. **Settings** → **Edge Functions** → **Secrets**
3. Clique **New Secret**
4. Nome: `META_CONVERSION_API_TOKEN`
5. Value: `EAALqEBN5Xe8BPtrFT1xDoa1xUAAIKyQ1vF4EJz4inLuBAFkC0HtLZCBK5qHxj5wJQ0THQYOjJ6CxOvwwa3Eu8QZCIhmGb8XCWps8GYWImF7UX8XU14zl8nZAnZBoyDfURQA9tpfBpc4wl4hnzBrDEtKz23ImP4rFZBGpQEYTnNLWWo7Qi9HpGr3Ns3PbTWKN69AZDZD`
6. Clique **Save**

**Confirmação**: Secret aparecerá como "Configured" ✅

---

### ✅ 3. Deploy Edge Function (5 min)

```bash
# Terminal na raiz do projeto
supabase functions deploy meta-conversions-webhook

# Esperado:
# ✓ Deploying function meta-conversions-webhook...
# ✓ Deployment complete
```

**Confirmação**: Função aparecerá em https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/functions

---

## 🧪 4. Testar em Produção (10 min)

### Teste 1: Browser Console

```javascript
// DevTools Console (F12)
fbq('getState')
// Deve retornar: { pixel_id: "1677581716961792", ... }
```

### Teste 2: Submeter Lead

1. Vá para homepage
2. Preencha o formulário de lead:
   - Email: seu_email@test.com
   - Phone: 5511987654321
   - Clique: Submit

3. Verifique console (F12):
   ```
   ✅ [Meta Tracking] Evento rastreado
   📊 [Pixel] Lead disparado com eventId: evt_...
   ```

### Teste 3: Meta Events Manager

1. Abra: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
2. Tab: **Events**
3. Procure por seu email
4. Deve aparecer:
   - Event: **Lead**
   - Time: Agora
   - Event ID: evt_...
   - Status: ✅

### Teste 4: Validar Dedup

1. **Primeira submissão**: Preencha mesmo lead
2. **Segunda submissão**: Refill com EXATAMENTE os mesmos dados
3. **Resultado esperado**:
   - DevTools: Network tab
   - POST meta-conversions-webhook
   - Status: **409** (Conflict)
   - Response: `isDuplicate: true`

Se receber 409 = **Dedup funciona! ✅**

---

## 📋 Ordem Recomendada

```
⏰ 15:00 - Revogar Token Antigo (5 min)
   └─ Espera: ~1 min para API sincronizar
   
⏰ 15:06 - Atualizar Supabase Secrets (5 min)
   └─ Espera: ~30 seg para propagação

⏰ 15:12 - Deploy Edge Function (5 min)
   └─ Espera: ~2 min para completar

⏰ 15:19 - Testes (10 min)
   └─ Browser console test
   └─ Lead submission test
   └─ Meta Events Manager check
   └─ Dedup validation

⏰ 15:29 - COMPLETO ✅
```

---

## ✅ Validações Críticas

Após cada ação, valide:

### Após Revogar Token
- [ ] Token antigo aparece como "Revoked"
- [ ] Não pode mais usar token antigo

### Após Atualizar Secret
- [ ] Secret aparece em Supabase Dashboard
- [ ] Status: "Configured" ✅

### Após Deploy
- [ ] Edge Function aparece em Supabase
- [ ] Status: "Active" ✅
- [ ] Logs podem ser verificados

### Após Testes
- [ ] fbq() inicializa (console)
- [ ] Lead aparece no Meta (real-time)
- [ ] Dedup bloqueia duplicata (409)
- [ ] EMQ está coletando dados

---

## 🚨 Se Algo Falhar

### Erro: Token Revoke Falha
```
Solução:
1. Verifique se tem permissão em Meta Business
2. Tente novamente após 1 min
3. Se persistir, revogue via API:
   curl -X POST \
   "https://graph.facebook.com/v21.0/me/permissions?permission=ADS_MANAGEMENT&access_token=$TOKEN"
```

### Erro: Secret Não Funciona
```
Solução:
1. Verifique spelling exato: META_CONVERSION_API_TOKEN
2. Redeploy Edge Function após atualizar secret
3. Verifique logs: supabase functions list
```

### Erro: Lead Não Aparece no Meta
```
Solução:
1. Verifique DevTools Console para erros
2. Checke Network tab: POST status
3. Valide token via curl:
   curl -X GET \
   "https://graph.facebook.com/v21.0/1574079363975678?fields=name" \
   -H "Authorization: Bearer $TOKEN"
```

### Erro: Dedup Não Funciona (não retorna 409)
```
Solução:
1. Verifique Edge Function logs
2. Cache pode estar limpo (reiniciado)
3. Espere 1h para TTL expirar
4. Tente novamente
```

---

## 📞 Documentos de Referência

| Problema | Documento |
|----------|-----------|
| Como usar Pixel | `docs/PIXEL_INTEGRATION_GUIDE.md` |
| Testes detalhados | `docs/TESTING_GUIDE_PRACTICAL.md` |
| Segurança | `SECURITY_TOKEN_ROTATED.md` |
| Arquitetura | `META_PIXEL_INTEGRATION_COMPLETE.md` |
| Status completo | `IMPLEMENTATION_STATUS_FINAL.md` |

---

## 🎯 Resultado Final

Após completar estas ações:

```
✅ Meta Pixel ativo
✅ CAPI funcionando
✅ Dedup ativo
✅ Events no Meta
✅ EMQ coletando
✅ Pronto para campanha
```

---

**Tempo Total**: ~20 minutos
**Complexidade**: Simples (95% automático)
**Risco**: Baixo (token antigo será revogado)

Comece agora: https://business.facebook.com/events_manager2/list/dataset/1574079363975678

---

**Boa sorte! 🚀**
