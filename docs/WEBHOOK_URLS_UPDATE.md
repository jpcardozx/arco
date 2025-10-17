# 🌐 Webhook URLs - Updated

**Production Domain:** consultingarco.com  
**Updated:** 2025-10-07

---

## 🎯 Webhook Endpoints

### Production (Principal)
```
https://consultingarco.com/api/webhooks/mercadopago
```

### Development (Via Túnel)
```
https://[random].ngrok-free.app/api/webhooks/mercadopago
```

---

## 🚇 Development Tunnel Setup

### Quick Start
```bash
# Execute o script
bash scripts/setup-tunnel.sh

# Resultado: URL pública para localhost:3000
# Exemplo: https://abc123.ngrok-free.app
```

### Manual Setup
```bash
# 1. Instalar ngrok
npm install -g @ngrok/ngrok

# 2. Autenticar (criar conta gratuita)
# Visite: https://ngrok.com/signup
# Copie authtoken de: https://dashboard.ngrok.com/get-started/your-authtoken
ngrok config add-authtoken YOUR_TOKEN

# 3. Iniciar servidor local
pnpm dev

# 4. Criar túnel (em outro terminal)
ngrok http 3000

# 5. Copiar URL HTTPS gerada
# Adicionar ao MP: https://[id].ngrok-free.app/api/webhooks/mercadopago
```

---

## 📋 Configuração no Mercado Pago

### Para Desenvolvimento
1. Acesse: https://www.mercadopago.com.br/developers/panel/app/webhooks
2. URL: `https://[id].ngrok-free.app/api/webhooks/mercadopago`
3. Eventos: payment, merchant_order, subscription_authorized_payment
4. Gerar secret signature

### Para Produção
1. URL: `https://consultingarco.com/api/webhooks/mercadopago`
2. Eventos: payment, merchant_order, subscription_authorized_payment
3. Gerar secret signature (diferente do dev)

---

## 🔧 Environment Variables

### Development (.env.local)
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
MERCADOPAGO_WEBHOOK_SECRET=dev_secret_from_tunnel_config
```

### Production (Vercel)
```bash
NEXT_PUBLIC_APP_URL=https://consultingarco.com
MERCADOPAGO_WEBHOOK_SECRET=prod_secret_from_domain_config
```

---

## ⚠️ Importantes

1. **Túnel é obrigatório para testes locais**
   - MP exige HTTPS
   - localhost não é alcançável externamente

2. **Secrets diferentes por ambiente**
   - Dev: Secret gerado para túnel ngrok
   - Prod: Secret gerado para consultingarco.com

3. **Túnel muda URL a cada restart**
   - Atualizar no MP quando reiniciar ngrok
   - Ou use ngrok paid para domínio fixo

---

## 🧪 Testing

### Local (com túnel)
```bash
# Terminal 1: Servidor
pnpm dev

# Terminal 2: Túnel
bash scripts/setup-tunnel.sh

# Terminal 3: Teste
curl https://[ngrok-url].ngrok-free.app/api/webhooks/mercadopago
# Esperado: 405 Method Not Allowed
```

### Production
```bash
curl https://consultingarco.com/api/webhooks/mercadopago
# Esperado: 405 Method Not Allowed
```

---

**Next:** Configure no MP panel com URL correta