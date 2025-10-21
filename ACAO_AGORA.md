# ⚡ AÇÃO AGORA: 3 Passos até Go-Live

**Você está aqui**: Decidiu ir para Staging/Produção (JWT é obrigatório)  
**Objetivo**: Validar token Meta + Deploy + Testar

---

## 🎯 3 Passos (20 minutos)

### ✅ PASSO 1: Obter Token Meta (5 min)

**URL**: https://business.facebook.com/settings/

**Cliques**:
1. Users and Assets
2. System Users
3. "Conversions API System User"
4. Generate access token
5. **COPIAR token** (válido por poucos segundos)

**Resultado esperado**:
```
Token: EAALqEBN5Xe8BCZBx...something...
```

---

### ✅ PASSO 2: Validar Token + CAPI (5 min)

```bash
cd /home/jpcardozx/projetos/arco

# Use o script (substitua o token):
bash scripts/validar-token-meta.sh "EAALqEBN5Xe8BCZBx..."

# Esperado:
# ✅ Token válido
# ✅ CAPI funcionando
# → Evento recebido: 1
```

**Se falhar**:
- Token expirado → Gerar novo
- CAPI erro → Verificar permissões

**Se OK** → Prosseguir Passo 3

---

### ✅ PASSO 3: Deploy + Teste (10 min)

```bash
cd /home/jpcardozx/projetos/arco

# 1. Atualizar secrets
cat > .env.secrets << 'EOF'
META_CONVERSION_API_TOKEN=seu_token_aqui
EOF

npx supabase@latest secrets set --env-file .env.secrets

# 2. Redeploy
npx supabase@latest functions deploy meta-conversions-webhook

# 3. Iniciar dev
pnpm dev

# 4. Testar em http://localhost:3000
# - Abrir F12 → Console
# - Preencher formulário
# - Ver: ✅ "[Meta Tracking] Evento rastreado"

# 5. Validar em Meta
# https://business.facebook.com/events_manager2/list/dataset/1574079363975678
# Procure evento "Lead" nos últimos eventos
```

---

## 📊 Checklist Rápido

- [ ] Token Meta obtido
- [ ] Script validar-token-meta.sh passou
- [ ] Secrets atualizados
- [ ] Edge Function redeployada
- [ ] Dev server rodando
- [ ] Formulário dispara logs
- [ ] Evento aparece em Meta

---

## 🚀 Resultado Final

```
✅ Token Meta: Válido
✅ CAPI: Funcionando
✅ Edge Function: Pronta
✅ Formulário: Rastreando
✅ Meta Events Manager: Recebendo eventos
→ GO-LIVE: Pronto!
```

---

## ⏱️ Timeline

```
Agora:     Obter token (5 min)
+5 min:    Validar token (5 min)
+10 min:   Deploy (10 min)
= 20 min:  GO-LIVE READY ✅
```

---

## 🆘 Se Bloquear

### ❌ "Token expirado"
→ Gerar novo em https://business.facebook.com/settings/

### ❌ "CAPI error"
→ Verifique permissões do System User

### ❌ "Edge Function 500"
Ver logs: `npx supabase@latest functions logs meta-conversions-webhook`

---

**Comece AGORA**: Ir para https://business.facebook.com/settings/ e gerar token!
