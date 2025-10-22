# 📊 Meta Conversions API - Guia de Operações

**Status**: ✅ **100% Production Ready**
**Última Atualização**: 2025-10-22
**Responsável**: Equipe de Produto

---

## 1. Visão Geral da Arquitetura

```
Frontend (Next.js)
    ↓
    Pixel dispara eventos com event_id
    Captura _fbp, _fbc, IP, UA
    ↓
Backend API Route (/api/meta/conversions)
    ↓
    Valida payload
    Verifica dedup cache (1h TTL)
    ↓
Supabase Edge Function (meta-conversions-webhook)
    ↓
    Normaliza + hash SHA-256 PII
    Enriquece com EMQ (fbp/fbc)
    ↓
Meta Conversions API v24.0
    ↓
Database Logging (meta_events_log)
    ↓
Observabilidade + Retry (meta-retry-queue)
```

---

## 2. Verificação Pré-Launch

Antes de ir para produção:

### ✅ Checklist Técnico

- [ ] Build passou: `npm run build`
- [ ] Migrations aplicadas: `npx supabase migration list`
- [ ] Edge Function deployada: `npx supabase functions list`
- [ ] Test Events configurados no Meta Events Manager
- [ ] Variáveis de ambiente corretas (META_DATASET_ID, ACCESS_TOKEN)
- [ ] CORS habilitado para seu domínio
- [ ] SSL/HTTPS funcionando em produção

### ✅ Checklist de Dados

- [ ] Pixel ID correto (1677581716961792)
- [ ] ACCESS_TOKEN renovado (válido por 60 dias)
- [ ] TEST_EVENT_CODE gerado no Meta (para testes)
- [ ] Database migrations executadas em produção

### ✅ Testes Reais

```bash
# Teste local primeiro
python3 test_events_validator.py

# Resultado esperado:
# ✅ Lead event enviado com sucesso
# ✅ Purchase event enviado
# ✅ 2º evento (duplicado) bloqueado com 409
# ✅ Validação OK para payloads inválidos
```

---

## 3. Operações Diárias

### 3.1 Verificação de Saúde (Manhã)

```sql
-- Abra no Supabase SQL Editor

-- Status geral dos últimos 24h
SELECT
  COUNT(*) as total_events,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
  ROUND((COUNT(CASE WHEN status = 'success' THEN 1 END)::numeric / COUNT(*) * 100), 1) as success_rate
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '24 hours';
```

**OK**: success_rate > 95%
**Atenção**: success_rate 90-95% (investigar erros)
**Crítico**: success_rate < 90% (ativar escalação)

### 3.2 Monitoramento EMQ

```sql
-- Qualidade de dados (EMQ)
SELECT
  'FBC Missing' as issue,
  ROUND((COUNT(*)::numeric / (SELECT COUNT(*) FROM meta_events_log) * 100), 1) as percentage
FROM meta_events_log
WHERE fbc IS NULL AND created_at > NOW() - INTERVAL '24 hours';
```

**Meta**: < 20% de FBC missing
**Alerta**: 20-40% (adicionar instruções de coleta)
**Crítico**: > 40% (revisar implementação de _fbp/_fbc)

### 3.3 Análise de Erros

```sql
-- Últimos erros
SELECT
  event_name,
  error_message,
  COUNT(*) as count,
  created_at
FROM meta_events_log
WHERE status = 'error'
  AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY event_name, error_message, created_at
ORDER BY created_at DESC;
```

**Ações por erro**:
- `Invalid parameter`: Revisar payload (email format, currency)
- `function gen_salt not found`: Erro de migração (não deve acontecer)
- `Rate limit exceeded`: Reduzir volume ou distribuir em tempo

---

## 4. Troubleshooting

### Problema: Taxa de sucesso caindo

1. **Verificar EMQ**:
   ```sql
   SELECT * FROM emq_monitoring.sql (query #3);
   ```

2. **Revisar payloads recentes**:
   ```sql
   SELECT * FROM meta_events_log
   WHERE status = 'error'
   ORDER BY created_at DESC LIMIT 10;
   ```

3. **Validar Meta API status**:
   - Ir para Meta Business → Events Manager
   - Verificar se há alertas na dashboard

### Problema: Deduplicação não funciona

**Causa 1**: Event_ID não está sendo gerado no frontend
- Verificar `useMetaTracking().trackLead()`
- Confirmar que `eventID` é passado para `fbq('track')`

**Causa 2**: Cache expirou (TTL 1h)
- Esperado: eventos fora da janela de 1h não serão dedupados
- Solução: usar Database Webhooks para rastrear em longo prazo

**Teste**:
```bash
# Dispare mesmo evento 2x rapidamente
python3 test_dedup_real.py
# Esperado: 1º → 200, 2º → 409
```

### Problema: Events não aparecem no Meta Events Manager

1. **Verificar TEST_EVENT_CODE**:
   - Events Manager → seu Pixel → Test Events
   - Copiar TEST_EVENT_CODE correto

2. **Validar que é_test está sendo enviado**:
   ```sql
   SELECT * FROM meta_events_log
   WHERE event_name = 'Lead'
   LIMIT 1;
   -- Verificar se is_test = true
   ```

3. **Aguardar 5-10 minutos**:
   - Meta processa eventos assincronamente
   - Não aparecem imediatamente no Test Events

---

## 5. Escaladas e Alertas

### Escalação de Erro de Taxa

Se `success_rate < 90%` por > 30 minutos:

1. **Verificar status Meta API**
   ```bash
   curl -X GET "https://graph.facebook.com/me/permissions?access_token=YOUR_TOKEN"
   ```

2. **Revisar logs da Edge Function**
   ```bash
   npx supabase functions logs meta-conversions-webhook
   ```

3. **Contatar suporte Meta** (se meta-api.com estiver down)

### Escalação de Volume

Se volume > 1000 eventos/min:

- [ ] Verificar se há loops de rastreamento
- [ ] Ativar circuit breaker (esperar 30s antes de retry)
- [ ] Contactar Meta sobre rate limit

---

## 6. Monitoramento Contínuo

### Dashboard Recomendado (Metabase/Grafana)

**Card 1**: Events em tempo real
```sql
SELECT COUNT(*) FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '1 minute';
```

**Card 2**: Success rate (24h)
```sql
SELECT ROUND((COUNT(CASE WHEN status = 'success' THEN 1 END) / COUNT(*) * 100), 1)
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '24 hours';
```

**Card 3**: EMQ score (simulado)
```sql
SELECT
  CASE
    WHEN fbc IS NOT NULL AND fbp IS NOT NULL THEN 10
    WHEN fbc IS NOT NULL OR fbp IS NOT NULL THEN 7
    ELSE 4
  END as estimated_emq
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '24 hours';
```

---

## 7. Manutenção Preventiva

### Semanal

- [ ] Executar `emq_monitoring.sql` (query #2) para trend
- [ ] Verificar dedup cache size
- [ ] Revisar logs de erro (query #6)

### Mensal

- [ ] Renovar ACCESS_TOKEN (válido por 60 dias)
- [ ] Revisar EMQ trend (esperado: crescimento)
- [ ] Testar deduplicação com script
- [ ] Validar CORS em produção

### Trimestral

- [ ] Revisar segurança de secrets (Deno.env.get)
- [ ] Atualizar versão de Meta API (se disponível)
- [ ] Migrar dedup para Redis (se > 100k eventos/dia)

---

## 8. Instruções de Deploy

### Deploy da Edge Function

```bash
# Atualizar código
supabase/functions/meta-conversions-webhook/index.ts

# Deploy
npx supabase functions deploy meta-conversions-webhook

# Verificar
npx supabase functions list
```

### Deploy do Backend API

```bash
# Código
src/app/api/meta/conversions/route.ts

# Build
npm run build

# Deploy (seu provedor: Vercel, Railway, etc)
git push origin main
```

---

## 9. Referências

- [Meta Conversions API Docs](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Deduplication Guide](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [EMQ Guide](https://www.facebook.com/business/help/765081237991954)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## 10. Contatos e Suporte

**Time Interno**:
- Engenharia: #meta-integration Slack
- Produto: produto@empresa.com
- Dados: analytics@empresa.com

**Suporte Externo**:
- Meta Ads Manager: Help > Support
- Supabase Docs: https://supabase.com/docs
- Facebook Community: https://www.facebook.com/groups/developers

---

## Histórico de Alterações

| Data | Versão | Alteração |
|------|--------|-----------|
| 2025-10-22 | 1.0 | Implementação inicial + dedup |
| - | 1.1 | EMQ monitoring (pendente) |
| - | 2.0 | Multi-workspace support (planejado) |

---

**Last reviewed**: 2025-10-22
**Next review**: 2025-11-22
