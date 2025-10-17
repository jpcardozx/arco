# 🔔 Webhook Configuration Guide

**Project:** ARCO Payment System  
**Provider:** Mercado Pago  
**Time:** 10 minutes

---

## 🎯 Objetivo

Configurar webhook do Mercado Pago para receber notificações de pagamentos em tempo real.

---

## 📋 Pré-requisitos

- [x] Credenciais MP configuradas
- [x] Database aplicado (5 tabelas payment)
- [ ] Webhook URL definida
- [ ] Secret signature gerado

---

## 🚀 Passo a Passo

### 1. Acessar Painel Mercado Pago (1 min)

**URL:** https://www.mercadopago.com.br/developers/panel/app/webhooks

**Login:**
- Conta com credenciais: `APP_USR-cdfb831a-f7c1-4c1b-bf3d-dd332726f709`

---

### 2. Configurar Webhook URL (2 min)

#### Development (teste local com túnel)
```
https://xxx.ngrok-free.app/api/webhooks/mercadopago
```

**Setup do túnel:**
```bash
# Instalar ngrok
npm install -g @ngrok/ngrok

# Autenticar (criar conta gratuita em ngrok.com)
ngrok config add-authtoken YOUR_TOKEN

# Criar túnel para localhost:3000
ngrok http 3000

# Usar URL gerada (ex: https://abc123.ngrok-free.app)
```

**Nota:** MP aceita apenas HTTPS, túnel é obrigatório para testes locais

#### Production (principal)
```
https://consultingarco.com/api/webhooks/mercadopago
```

**Preencher:**
- **URL:** `https://consultingarco.com/api/webhooks/mercadopago`
- **Events:** Selecionar todos abaixo

---

### 3. Selecionar Eventos (3 min)

**Eventos Obrigatórios:**

✅ **payment** - Pagamentos individuais
- Status: pending, processing, authorized, succeeded, failed
- Uso: Cartão de crédito/débito, Pix

✅ **merchant_order** - Orders API v2
- Status: opened, paid, expired, cancelled
- Uso: Checkout completo (múltiplos itens)

✅ **subscription_authorized_payment** - Renovações de assinatura
- Status: authorized, payment_completed, payment_failed
- Uso: Recorrência via Preapproval API

**Eventos Opcionais (desmarcar por enquanto):**
- ❌ point_integration_wh (não usamos)
- ❌ delivery (não usamos)
- ❌ topic_claims_integration_wh (não usamos)

---

### 4. Gerar Secret Signature (2 min)

**CRÍTICO:** Sem secret, webhooks não são validados (vulnerabilidade de segurança)

**Passos:**
1. Localizar seção **"Secret Signature"**
2. Clicar em **"Gerar"** ou **"Generate"**
3. **Copiar o secret gerado** (aparece apenas 1 vez!)
4. Guardar em local seguro temporariamente

**Formato esperado:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
(String longa, ~200 caracteres)

---

### 5. Adicionar Secret aos Environments (2 min)

#### A. Local (.env.local)
```bash
# Abrir arquivo
nano .env.local

# Adicionar linha
MERCADOPAGO_WEBHOOK_SECRET="<secret_copiado>"

# Salvar: Ctrl+O, Enter, Ctrl+X
```

#### B. Vercel (produção)
```bash
# Opção 1: CLI
npx vercel env add MERCADOPAGO_WEBHOOK_SECRET production

# Opção 2: Dashboard
# 1. https://vercel.com/jpcardozx/arco/settings/environment-variables
# 2. Add New
# 3. Name: MERCADOPAGO_WEBHOOK_SECRET
# 4. Value: <secret_copiado>
# 5. Environment: Production
# 6. Save
```

---

## 🧪 Validação

### Test 1: Verificar Secret Configurado
```bash
# Local
grep MERCADOPAGO_WEBHOOK_SECRET .env.local

# Esperado: MERCADOPAGO_WEBHOOK_SECRET="ey..."
```

### Test 2: Simular Webhook (após implementar backend)
**URL:** https://www.mercadopago.com.br/developers/panel/webhooks/simulator

**Passos:**
1. Selecionar evento: "payment"
2. Status: "approved"
3. Enviar
4. Verificar logs da aplicação

---

## 📊 Checklist Final

- [ ] Webhook URL configurada no MP: `https://arco.vercel.app/api/webhooks/mercadopago`
- [ ] Eventos selecionados: payment, merchant_order, subscription_authorized_payment
- [ ] Secret signature gerado
- [ ] Secret adicionado a .env.local
- [ ] Secret adicionado ao Vercel (production)
- [ ] Testado via simulador (após implementar backend)

---

## 🚨 Troubleshooting

### Erro: "URL não alcançável"
**Causa:** Vercel app não deployada ou URL incorreta  
**Solução:** 
```bash
# Verificar deploy
npx vercel --prod

# Testar URL
curl https://arco.vercel.app/api/webhooks/mercadopago
# Esperado: 405 Method Not Allowed (GET não permitido, apenas POST)
```

### Erro: "Secret inválido"
**Causa:** Secret não copiado corretamente  
**Solução:** Regenerar secret no painel MP

### Erro: "Webhook rejeitado"
**Causa:** Validação x-signature falhando  
**Solução:** Verificar implementação da validação (próximo passo)

---

## 📖 Referências

- **MP Webhooks Docs:** https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
- **x-signature Validation:** https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks#bookmark_valide_a_origem_da_notificação
- **Simulator:** https://www.mercadopago.com.br/developers/panel/webhooks/simulator

---

## ✅ Próximos Passos

Após configurar webhook:

1. **Implementar Backend Core** (1h30min)
   - `src/lib/payments/mercadopago/client.ts`
   - `src/lib/payments/mercadopago/orders.ts`
   - `src/lib/payments/mercadopago/webhooks.ts`
   - `src/app/api/webhooks/mercadopago/route.ts`

2. **Testar Webhook**
   - Via simulador MP
   - Verificar logs Vercel
   - Confirmar idempotência

3. **Implementar Frontend**
   - Payment Brick
   - Checkout page

---

**Tempo estimado:** 10 minutos  
**Próxima milestone:** Backend core implementation  
**Guide completo:** `MERCADOPAGO_BRICKS_IMPLEMENTATION.md`
