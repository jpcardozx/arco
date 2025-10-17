# 🔧 CORREÇÃO 502 BAD GATEWAY - PROBLEMA IDENTIFICADO

## ❌ Causa do Erro 502

**Mismatch de portas:**
- Next.js rodando: **porta 3000** ✅
- Ngrok apontando: **porta 3001** ❌

**Resultado:** Ngrok não consegue conectar → 502 Bad Gateway

---

## ✅ SOLUÇÃO

### **Reiniciar Ngrok na porta 3000:**

```bash
# No terminal
ngrok http 3000
```

---

## 🎯 PRÓXIMOS PASSOS

### **1. Iniciar ngrok:**
```bash
ngrok http 3000
```

### **2. Pegar nova URL:**
Quando o ngrok iniciar, vai mostrar algo como:
```
Forwarding  https://XXXXXXXX.ngrok-free.app -> http://localhost:3000
```

### **3. Atualizar no Mercado Pago:**
- URL antiga: `https://38503f230378.ngrok-free.app/api/webhooks/mercadopago`
- URL nova: `https://NOVA_URL.ngrok-free.app/api/webhooks/mercadopago`

### **4. Testar novamente:**
- Enviar notificação de teste do MP
- Deve retornar **200 OK** ✅

---

## 📋 COMANDOS RÁPIDOS

```bash
# 1. Iniciar ngrok (em um terminal separado)
ngrok http 3000

# 2. Ver URL do ngrok
curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url'

# 3. Testar endpoint
curl http://localhost:3000/api/webhooks/mercadopago

# 4. Monitorar webhooks
# Abrir: http://localhost:3000/monitor/webhooks
```

---

**Execute agora: `ngrok http 3000` e me passe a nova URL! 🚀**
