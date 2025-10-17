# 🚀 Configuração de Environment Variables na Vercel

**Projeto:** ARCO - Payment Management System  
**Gateway:** Mercado Pago (Checkout Transparente + Orders API v2)

---

## 📋 Variáveis de Ambiente Necessárias

### **1. Mercado Pago (Produção)**

```bash
# Public Key (usado no front - Payment Brick)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-cdfb831a-f7c1-4c1b-bf3d-dd332726f709

# Access Token (servidor - Orders API)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-606605515420553-100616-2503df71f46095fa9bccc3736d3c5852-2907827980

# Webhook Secret (gerado em "Suas integrações")
MERCADOPAGO_WEBHOOK_SECRET=your_webhook_secret_here

# Ambiente
MERCADOPAGO_ENV=production

# App URL (para webhooks)
NEXT_PUBLIC_APP_URL=https://consultingarco.com
```

### **2. Supabase (já existentes)**

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🔧 Como Adicionar na Vercel

### **Método 1: Via Dashboard**

1. Acesse: https://vercel.com/jpcardozx/arco/settings/environment-variables
2. Clique em **"Add New"**
3. Para cada variável:
   - **Key:** Nome da variável (ex: `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`)
   - **Value:** Valor da credencial
   - **Environments:** Selecione `Production`, `Preview`, `Development`
4. Clique em **"Save"**

### **Método 2: Via CLI**

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Login
vercel login

# Adicionar variáveis
vercel env add NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
# Cole o valor quando solicitado: APP_USR-cdfb831a-f7c1-4c1b-bf3d-dd332726f709

vercel env add MERCADOPAGO_ACCESS_TOKEN
# Cole o valor: APP_USR-606605515420553-100616-2503df71f46095fa9bccc3736d3c5852-2907827980

vercel env add MERCADOPAGO_WEBHOOK_SECRET
# Cole o secret gerado no painel MP

vercel env add MERCADOPAGO_ENV production

vercel env add NEXT_PUBLIC_APP_URL https://consultingarco.com
```

### **Método 3: Via `vercel.json` (NÃO RECOMENDADO - não expor credenciais)**

⚠️ **NUNCA faça isso!** Credenciais devem estar apenas no dashboard da Vercel.

---

## 🔐 Gerar Webhook Secret no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Navegue até **"Suas integrações"**
3. Selecione seu aplicativo
4. Vá em **"Webhooks"**
5. Configure:
   - **URL:** `https://consultingarco.com/api/webhooks/mercadopago`
   - **Eventos:** Selecione `payment`, `merchant_order`, `subscription_authorized_payment`
6. **Ative "Secret Signature"**
7. Copie o **secret** gerado e adicione como `MERCADOPAGO_WEBHOOK_SECRET`

---

## ✅ Verificar Configuração

### **1. Build Bem-Sucedido**

Após adicionar as variáveis, faça um novo deploy:

```bash
git add .
git commit -m "feat: add Mercado Pago payment system"
git push origin main
```

### **2. Verificar Runtime**

Na página de deploy da Vercel, vá em **"Logs"** e verifique se as variáveis foram carregadas:

```
✓ NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY is set
✓ MERCADOPAGO_ACCESS_TOKEN is set
✓ MERCADOPAGO_WEBHOOK_SECRET is set
```

### **3. Testar Webhook**

Use o **Simulador de Webhooks** do Mercado Pago:

1. Acesse: https://www.mercadopago.com.br/developers/panel/webhooks/simulator
2. Selecione o evento `payment`
3. Clique em **"Enviar"**
4. Verifique os logs da Vercel para confirmar que o webhook foi recebido e validado

---

## 🚨 Segurança

### **❌ O que NÃO fazer:**

- ❌ Commitar credenciais no Git
- ❌ Expor `MERCADOPAGO_ACCESS_TOKEN` no front
- ❌ Desabilitar validação de `x-signature` em webhooks
- ❌ Armazenar dados de cartão no banco

### **✅ O que fazer:**

- ✅ Usar variáveis de ambiente apenas no servidor (sem `NEXT_PUBLIC_`)
- ✅ Sempre validar `x-signature` nos webhooks
- ✅ Rotacionar credenciais periodicamente
- ✅ Monitorar uso de tokens no painel MP
- ✅ Ativar 2FA na conta Mercado Pago

---

## 📊 Variáveis por Ambiente

| Variável | Production | Preview | Development |
|----------|-----------|---------|-------------|
| `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` | ✅ Produção | ✅ Test | ✅ Test |
| `MERCADOPAGO_ACCESS_TOKEN` | ✅ Produção | ✅ Test | ✅ Test |
| `MERCADOPAGO_WEBHOOK_SECRET` | ✅ Único | ✅ Único | ✅ Único |
| `MERCADOPAGO_ENV` | `production` | `test` | `test` |
| `NEXT_PUBLIC_APP_URL` | `https://arco.vercel.app` | `https://arco-preview.vercel.app` | `http://localhost:3000` |

---

## 🔗 Links Úteis

- **Painel de credenciais:** https://www.mercadopago.com.br/developers/panel/app
- **Webhook simulator:** https://www.mercadopago.com.br/developers/panel/webhooks/simulator
- **Vercel Dashboard:** https://vercel.com/jpcardozx/arco/settings/environment-variables
- **Documentação Bricks:** https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks
- **Documentação Orders API:** https://www.mercadopago.com.br/developers/en/reference/orders

---

## 🎯 Próximos Passos

1. ✅ Adicionar variáveis na Vercel
2. ✅ Configurar webhook no painel MP
3. ✅ Fazer deploy
4. ✅ Testar webhook via simulador
5. ✅ Implementar Payment Brick no checkout
6. ✅ Testar pagamento de teste

**Status:** Pronto para produção! 🚀
