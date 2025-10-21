# Quick Reference - Meta CAPI Edge Functions

**Imprima ou salve este arquivo para referência rápida**

---

## 🚀 3 Comandos Essenciais

```bash
# 1. Validar permissões (SEMPRE primeiro)
bash scripts/validate-meta-permissions.sh

# 2. Rodar testes
npm run test src/__tests__/useMetaTracking.test.ts

# 3. Deploy Edge Function
supabase functions deploy meta-conversions-webhook
```

---

## 📁 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `src/hooks/useMetaTracking.ts` | Hook (event_id + fbp/fbc) |
| `supabase/functions/meta-conversions-webhook/` | Edge Function (dedup + hash) |
| `src/components/CtwaButton.tsx` | CTWA button S-Tier |
| `docs/TESTING_GUIDE_PRACTICAL.md` | Teste passo-a-passo |
| `docs/CAC_CPC_REDUCTION_INSIGHTS.md` | 3 Insights (-64% CAC) |

---

## 🧪 Teste Rápido (DevTools Console)

```javascript
// Após preencher formulário com hook

// 1. Verificar event ID
console.log('Event ID gerado');  // evt_lead_...

// 2. Verificar FBP/FBC
console.log('_fbp:', document.cookie.match(/_fbp=([^;]*)/)?.[1]);
console.log('_fbc:', document.cookie.match(/_fbc=([^;]*)/)?.[1]);

// 3. Verificar logs
// 📤 [Meta Tracking] Enviando para Edge Function
// ✅ [Meta Tracking] Evento rastreado

// 4. Se tudo OK → próximo passo é Meta Events Manager
```

---

## 📊 Validar em Meta Events Manager

```
1. https://business.facebook.com/events_manager
2. Dataset: 1574079363975678
3. Aba: "Eventos de Teste"
4. Procurar código: TEST12345
5. Verificar:
   - ✅ Evento apareceu (< 30s)?
   - ✅ Status: Verified?
   - ✅ EMQ > 50%?
```

---

## ⚠️ Se Algo Falhar

| Erro | Comando para Fix |
|------|------------------|
| Token expirado | Gerar novo em Meta Business |
| Secrets não setados | `supabase secrets set META_DATASET_ID=...` |
| Edge Function não respondeu | `supabase functions deploy meta-conversions-webhook` |
| EMQ baixa | Aguardar 10+ eventos, verificar FBP/FBC |
| Dedup não funciona | Verificar que event_id é único |

---

## 🎯 3 Insights CAC/CPC (-64% total)

```
1. Dedup + EMQ       →  CAC -30%  (R$ 300 → R$ 210)
2. CTWA Escalonamento →  CAC -40%  (R$ 210 → R$ 126)
3. ATT Mitigation    →  CAC -15%  (R$ 126 → R$ 107)
─────────────────────────────────────────────────
Total                →  CAC -64%  (Leads +180%, ROAS +180%)
```

---

## 🔑 Variáveis de Ambiente

```bash
# .env.local (NUNCA commitar)
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=seu_token_aqui
META_TEST_EVENT_CODE=TEST12345
NEXT_PUBLIC_SUPABASE_URL=https://seu-project.supabase.co
```

---

## 📞 URLs Importantes

| Serviço | URL |
|---------|-----|
| Meta Events Manager | https://business.facebook.com/events_manager |
| Meta Business | https://business.facebook.com |
| Supabase Console | https://app.supabase.com |
| Graph API Tester | https://developers.facebook.com/tools/explorer |

---

## ✅ Checklist Antes de Produção

```
[ ] Permissões validadas (script verde)
[ ] Tests passam (11/11)
[ ] Evento aparece em Meta
[ ] EMQ > 50%
[ ] Dedup testa OK
[ ] Event ID gerado automaticamente
[ ] Logs têm requestId
[ ] CTWA button implementado
```

---

## 🎯 Próximas Etapas

```
Semana 1-2:  CTWA Button (Contact events, volume)
Semana 3-4:  Lead scaling (CRM qualification)
Semana 5+:   Schedule scaling (final conversion)

Resultado:   CAC -64%, Negócio lucrativo
```

---

## 📚 Documentação Rápida

```
Permissões        → docs/PERMISSIONS_AND_SETUP.md
Testes            → docs/TESTING_GUIDE_PRACTICAL.md
Insights          → docs/CAC_CPC_REDUCTION_INSIGHTS.md
CTWA              → docs/CTWA_S_TIER_IMPLEMENTATION.md
Implementação     → IMPLEMENTATION_FINAL.md
Checklist         → COMPLETE_IMPLEMENTATION_CHECKLIST.md
Este arquivo      → QUICK_REFERENCE.md
```

---

## 🚨 Emergency Checklist

**Se tudo quebrou:**

1. Rodar: `bash scripts/validate-meta-permissions.sh`
2. Verificar: `.env.local` tem tudo?
3. Rodar: `supabase secrets list`
4. Verificar: `supabase functions list | grep meta`
5. Se nada ajuda: `supabase functions deploy meta-conversions-webhook`

---

## 💡 Lembretes

- ✅ Event ID deve ser IGUAL no Pixel + Edge Function
- ✅ Dedup = impossível contar 2x mesmo evento
- ✅ EMQ = correlação entre Pixel + server (> 70% é ótimo)
- ✅ Contact primeiro = learning rápido
- ✅ Secrets no Supabase = seguro (não em .env)
- ✅ Logs têm requestId = rastreabilidade

---

**Salve este arquivo! É sua referência rápida. 🚀**
