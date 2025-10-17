# 📋 PLANEJAMENTO EXECUTIVO - Sistema de Pagamentos ARCO

**Data**: 8 de outubro de 2025
**Status Atual**: 95% Production Ready
**Objetivo**: Deploy em produção com 100% de funcionalidades testadas

---

## 🎯 VISÃO GERAL

### Sistema Implementado
- ✅ **Backend**: Webhook v2, create-preference API, Supabase RLS
- ✅ **Frontend**: TestCardSelector, WalletBrick, success page com real-time
- ✅ **Infraestrutura**: Retry logic, error boundary, rate limiting
- ✅ **Observabilidade**: Analytics tracking, logs estruturados, CORS
- ✅ **UX**: Toast notifications, skeleton loaders, optimistic updates

### O Que Falta
- ⏳ Testing manual completo (30min)
- ⏳ Webhook ngrok test (30min)
- ⏳ Deploy e configuração produção (1h)

---

## 📅 CRONOGRAMA DE EXECUÇÃO

### 🔴 FASE 1: VALIDAÇÃO LOCAL (1h)
**Quando**: AGORA
**Objetivo**: Validar 100% das funcionalidades localmente

#### Task 1.1: Manual Testing Completo (30min)
```bash
# 1. Iniciar servidor
pnpm dev

# 2. Abrir /checkout/test
open http://localhost:3000/checkout/test

# 3. Testar TODOS os cenários
✓ APRO - Cartão aprovado
✓ OTHE - Rejeitado genérico  
✓ FUND - Fundos insuficientes
✓ SECU - CVV inválido
✓ EXPI - Cartão expirado
✓ FORM - Erro no formulário
✓ CONT - Pagamento pendente

# 4. Verificar em CADA teste:
✓ Toast notifications aparecem
✓ Real-time badge atualiza
✓ Logs aparecem no terminal
✓ Analytics events são enviados
✓ Supabase subscription é criada
```

**Checklist de Validação**:
- [ ] Test page carrega sem erros
- [ ] Selector de cartões funciona
- [ ] Copy-to-clipboard funciona
- [ ] Create preference retorna ID
- [ ] WalletBrick renderiza
- [ ] Pagamento APRO cria subscription
- [ ] Success page mostra dados corretos
- [ ] Badge real-time atualiza (processing → active)
- [ ] Toast notifications em todas ações
- [ ] Analytics events no console/logs
- [ ] Rate limiting funciona (5 req/min)
- [ ] Error boundary captura erros

**Deliverable**: `MANUAL_TESTING_REPORT.md` com screenshots

---

#### Task 1.2: Automated Tests (15min)
```bash
# Rodar suite completa
bash scripts/run-tests.sh

# Deve passar:
✓ [1/6] Prerequisites
✓ [2/6] Database migrations
✓ [3/6] Database functions
✓ [4/6] Build
✓ [5/6] TypeScript
✓ [6/6] Test checklist
```

**Checklist**:
- [ ] Todas 6 checks passam
- [ ] Zero TypeScript errors
- [ ] Build sem erros críticos
- [ ] Database functions existem

**Deliverable**: Screenshot do terminal com "🚀 SYSTEM READY FOR TESTING"

---

#### Task 1.3: Analytics & Logs Validation (15min)
```bash
# Testar analytics API
bash scripts/test-analytics-logging.sh

# Verificar logs estruturados
grep -r "\[Analytics\]" logs/

# Testar CORS
curl -X OPTIONS http://localhost:3000/api/analytics/track \
  -H "Origin: http://localhost:3000"
```

**Checklist**:
- [ ] Analytics API retorna 200
- [ ] Logs estruturados aparecem
- [ ] CORS headers presentes
- [ ] Rate limiting funciona
- [ ] Validação rejeita campos faltando

**Deliverable**: Logs salvos em `logs/analytics-validation.log`

---

### 🟡 FASE 2: WEBHOOK TESTING (1h)
**Quando**: Após Fase 1 passar
**Objetivo**: Validar webhook real com ngrok

#### Task 2.1: Setup Ngrok (15min)
```bash
# 1. Instalar ngrok (se não tiver)
npm install -g ngrok

# 2. Startar servidor local
pnpm dev

# 3. Em outro terminal, criar túnel
ngrok http 3000

# 4. Copiar URL pública (ex: https://abc123.ngrok.io)
```

**Checklist**:
- [ ] Ngrok instalado
- [ ] Túnel criado
- [ ] URL pública funcionando
- [ ] Acesso externo OK

---

#### Task 2.2: Configurar Webhook no MP Dashboard (10min)
```bash
# 1. Acessar
open https://www.mercadopago.com.br/developers/panel/app

# 2. Navegar: Webhooks > Adicionar URL

# 3. Configurar:
URL: https://abc123.ngrok.io/api/webhooks/mercadopago/v2
Events: ☑️ payment, ☑️ merchant_order

# 4. Salvar
```

**Checklist**:
- [ ] URL configurada
- [ ] Eventos selecionados
- [ ] Configuração salva
- [ ] Status "ativo"

---

#### Task 2.3: Test Real Webhook Flow (30min)
```bash
# Terminal 1: Servidor com logs
pnpm dev

# Terminal 2: Ngrok
ngrok http 3000

# Terminal 3: Tail logs
tail -f logs/webhook.log
```

**Fluxo de Teste**:
1. Abrir `/checkout/test`
2. Selecionar plano
3. Criar preferência
4. Usar cartão APRO (5031 4332 1540 6351)
5. Completar pagamento
6. **AGUARDAR** webhook chegar (5-10s)
7. Verificar logs: "✅ Webhook received"
8. Verificar Supabase: `subscription.status = 'active'`
9. Verificar UI: Badge muda para "Ativa"

**Checklist**:
- [ ] Preferência criada
- [ ] Pagamento processado
- [ ] Webhook recebido (log)
- [ ] HMAC validado (log)
- [ ] Subscription ativada (DB)
- [ ] Badge atualiza (UI)
- [ ] Toast "Assinatura ativada!" aparece
- [ ] Analytics event "subscription_activated"

**Deliverable**: 
- `WEBHOOK_TEST_REPORT.md` com logs
- Screenshot do badge mudando
- Screenshot do Supabase mostrando status=active

---

#### Task 2.4: Test Error Scenarios (5min)
```bash
# Testar cenários de erro

# 1. Webhook sem signature
curl -X POST https://abc123.ngrok.io/api/webhooks/mercadopago/v2 \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
# Esperado: 401 Unauthorized

# 2. Webhook com signature inválida
curl -X POST https://abc123.ngrok.io/api/webhooks/mercadopago/v2 \
  -H "x-signature: ts=123,v1=invalid" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
# Esperado: 401 Unauthorized
```

**Checklist**:
- [ ] Webhook sem signature rejeita (401)
- [ ] Webhook com signature inválida rejeita (401)
- [ ] Logs de erro aparecem
- [ ] Sistema não quebra

---

### 🟢 FASE 3: DEPLOY PRODUÇÃO (1h)
**Quando**: Após Fase 2 passar
**Objetivo**: Deploy em produção e configuração final

#### Task 3.1: Pre-Deploy Checklist (10min)
```bash
# Verificar env vars
✓ NEXT_PUBLIC_SUPABASE_URL
✓ SUPABASE_SERVICE_ROLE_KEY
✓ MERCADOPAGO_ACCESS_TOKEN
✓ MERCADOPAGO_PUBLIC_KEY
✓ MERCADOPAGO_WEBHOOK_SECRET
✓ NEXT_PUBLIC_APP_URL

# Build de produção
pnpm build

# Verificar build
✓ Zero errors
✓ Zero warnings críticos
✓ Todas páginas geradas
```

**Checklist**:
- [ ] Todas env vars configuradas
- [ ] Build passa sem erros
- [ ] Tamanho de bundle aceitável (<500KB)
- [ ] Lighthouse score >90

---

#### Task 3.2: Deploy (Vercel/Netlify/Railway) (20min)
```bash
# Opção 1: Vercel
vercel --prod

# Opção 2: Manual
git push origin main
# Trigger auto-deploy
```

**Checklist**:
- [ ] Deploy completou
- [ ] URL de produção funcionando
- [ ] Env vars configuradas no dashboard
- [ ] Database conectado
- [ ] Logs aparecem

---

#### Task 3.3: Configurar Webhook Produção (10min)
```bash
# 1. Acessar MP Dashboard
open https://www.mercadopago.com.br/developers/panel/app

# 2. ATUALIZAR URL webhook para produção:
URL: https://seu-dominio.com/api/webhooks/mercadopago/v2
Events: ☑️ payment, ☑️ merchant_order

# 3. Salvar
```

**Checklist**:
- [ ] URL produção configurada
- [ ] Eventos corretos
- [ ] Teste enviado pelo MP (ver dashboard)
- [ ] Webhook recebido (ver logs)

---

#### Task 3.4: Smoke Test Produção (20min)
```bash
# Acessar produção
open https://seu-dominio.com/checkout/test

# Repetir testes principais:
✓ APRO - Pagamento aprovado
✓ OTHE - Pagamento rejeitado
✓ Webhook real
✓ Real-time update
✓ Analytics tracking
```

**Checklist**:
- [ ] Test page funciona
- [ ] Create preference OK
- [ ] Pagamento APRO completa
- [ ] Webhook chega
- [ ] Subscription ativa
- [ ] Badge atualiza
- [ ] Analytics trackeia
- [ ] Logs estruturados

**Deliverable**: `PRODUCTION_SMOKE_TEST_REPORT.md`

---

## 📊 MÉTRICAS DE SUCESSO

### Performance
- [ ] TTFB < 200ms
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3.8s

### Funcionalidade
- [ ] Taxa de sucesso pagamento >98%
- [ ] Webhook delivery rate >99%
- [ ] Real-time update <2s
- [ ] Zero erros críticos

### Observabilidade
- [ ] 100% eventos trackados
- [ ] Logs estruturados completos
- [ ] Error tracking funcionando
- [ ] Rate limiting ativo

---

## 🚨 ROLLBACK PLAN

### Se algo der errado em produção:

```bash
# 1. Rollback deploy imediato
vercel rollback

# 2. Desabilitar webhook no MP
# Acessar dashboard > Desativar webhook

# 3. Verificar logs
grep -r "ERROR" logs/

# 4. Corrigir localmente
pnpm dev
# Reproduzir erro
# Corrigir
# Re-testar

# 5. Re-deploy quando corrigido
vercel --prod
```

---

## 📝 DELIVERABLES ESPERADOS

### Documentação
1. ✅ `MANUAL_TESTING_REPORT.md` - Resultados de testes manuais
2. ✅ `WEBHOOK_TEST_REPORT.md` - Logs de webhook ngrok
3. ✅ `PRODUCTION_SMOKE_TEST_REPORT.md` - Validação produção
4. ✅ `DEPLOYMENT_NOTES.md` - Notas de deploy

### Evidence
1. ✅ Screenshots de cada cenário testado
2. ✅ Logs salvos de webhook
3. ✅ Supabase queries mostrando dados
4. ✅ Analytics dashboard mostrando eventos

### Configuration
1. ✅ Env vars produção configuradas
2. ✅ Webhook URL produção ativa
3. ✅ DNS/domínio configurado
4. ✅ Monitoring/alerts configurados

---

## 🎯 TIMELINE TOTAL

| Fase | Tempo | Status |
|------|-------|--------|
| Fase 1: Validação Local | 1h | ⏳ Pronto para executar |
| Fase 2: Webhook Testing | 1h | ⏳ Aguardando Fase 1 |
| Fase 3: Deploy Produção | 1h | ⏳ Aguardando Fase 2 |
| **TOTAL** | **3h** | **ETA: Hoje** |

---

## 🚀 COMANDO DE INÍCIO

```bash
# Começar agora:
cd /home/jpcardozx/projetos/arco

# Step 1: Manual testing
pnpm dev
# Abrir http://localhost:3000/checkout/test
# Seguir checklist Task 1.1

# Step 2: Automated tests
bash scripts/run-tests.sh

# Step 3: Analytics validation
bash scripts/test-analytics-logging.sh

# Continue seguindo o planejamento...
```

---

## 📞 SUPORTE & TROUBLESHOOTING

### Se encontrar problemas:

1. **Verificar logs primeiro**
   ```bash
   grep -r "ERROR\|WARN" logs/
   ```

2. **Consultar documentação**
   - `TESTING_GUIDE.md`
   - `ERROR_HANDLING_ANALYSIS.md`
   - `WEBHOOK_CONFIG_GUIDE.md`
   - `DEBUG_CHECKLIST_ANALYTICS.md`

3. **Re-executar testes**
   ```bash
   bash scripts/run-tests.sh
   ```

4. **Verificar banco**
   ```sql
   SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 5;
   SELECT * FROM plans WHERE active = true;
   ```

---

## ✅ CRITÉRIOS DE ACEITAÇÃO FINAL

Sistema está pronto para produção quando:

- [x] P0 implementado (real-time + toasts)
- [x] P1 implementado (retry + error boundary + rate limiting)
- [x] P2 implementado (analytics + optimistic + skeletons)
- [ ] Todos testes manuais passam
- [ ] Webhook real funciona (ngrok)
- [ ] Build produção sem erros
- [ ] Deploy produção funcionando
- [ ] Webhook produção configurado
- [ ] Smoke test produção passa
- [ ] Métricas de performance OK
- [ ] Documentação completa

---

**Status Atual**: 🟡 **PRONTO PARA FASE 1**

**Próxima Ação**: Executar Task 1.1 (Manual Testing - 30min)

**Comando**: `pnpm dev` → Abrir `/checkout/test` → Seguir checklist

---

*Planejamento criado em: 8 de outubro de 2025*
*Desenvolvedor: @jpcardozx*
*Projeto: ARCO Payment System*
