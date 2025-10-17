# 🚇 Ngrok Tunnel - Complete Setup

**Status:** ✅ Ngrok installed and ready  
**Version:** 3.29.0

---

## 🎯 Quick Start (One Command)

```bash
# Complete setup: install, configure, start
bash scripts/complete-tunnel-setup.sh
```

**What it does:**
1. ✅ Verifies ngrok installation (already done)
2. 🔐 Prompts for authtoken setup
3. 🚀 Starts dev server (background)
4. 🚇 Creates tunnel to localhost:3000
5. 📋 Shows webhook URL for MP configuration

---

## 📋 Manual Steps (if needed)

### 1. Get Ngrok Account (Free)
- Signup: https://ngrok.com/signup
- Get authtoken: https://dashboard.ngrok.com/get-started/your-authtoken

### 2. Configure Authtoken
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### 3. Start Services
```bash
# Terminal 1: Dev server
pnpm dev

# Terminal 2: Tunnel
ngrok http 3000
```

### 4. Get Webhook URL
- Copy from ngrok output: `https://[random].ngrok-free.app`
- Add path: `/api/webhooks/mercadopago`
- Result: `https://[random].ngrok-free.app/api/webhooks/mercadopago`

---

## 🔧 Current Status

```
✅ Ngrok installed: v3.29.0
⏳ Authtoken: Needs configuration
⏳ Tunnel: Ready to start
⏳ Dev server: Ready to start
```

---

## 🚀 Next Action

**Execute o setup completo:**
```bash
bash scripts/complete-tunnel-setup.sh
```

**Vai fazer:**
1. Pedir seu authtoken
2. Configurar automaticamente
3. Iniciar dev server
4. Criar túnel público
5. Mostrar URL para configurar no MP

**Depois:** Configure webhook no painel MP com a URL gerada

---

**Pronto para executar?**