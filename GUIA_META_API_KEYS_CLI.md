# 🔑 Guia: Acesso API Keys Meta + Supabase CLI

**Data**: 21 de Outubro de 2025  
**Objetivo**: Validar tokens, verificar status, executar diagnóstico via CLI

---

## 🎯 Parte 1: Onde Acessar API Keys da Meta

### 📍 Localização 1: Meta Business Settings

**URL**: https://business.facebook.com/settings/

**Passos**:
1. Acessar: https://business.facebook.com/settings/
2. Menu esquerdo → **Users and Assets**
3. Submenu → **System Users**
4. Procurar: "Conversions API System User"
5. Clicar → **Generate access token**
6. Copy token (vira visível por alguns segundos)

**Formato**: `EAALqEBN5Xe8...` (começa com EAA)

---

### 📍 Localização 2: Events Manager (Tokens Ativos)

**URL**: https://business.facebook.com/events_manager2/list/dataset/1574079363975678

**Passos**:
1. Acessar URL acima (seu Dataset)
2. Settings (engrenagem) → **Data Source**
3. Seção: **Connected Systems**
4. Você verá tokens:
   - ✅ Ativos (green checkmark)
   - ❌ Expirados (red X)
   - 🔄 Pendentes de revisão

**O que ver**:
```
Token Status:
├─ TOKEN_1: ✅ Active (expira em: 2026-01-15)
├─ TOKEN_2: ❌ Expired (expirou em: 2025-10-20)
└─ TOKEN_3: 🔄 Pending
```

---

### 📍 Localização 3: Conversions API Docs (Referência)

**URL**: https://developers.facebook.com/docs/marketing-api/conversions-api/get-started

**O que tem**:
- ✅ Sample API calls
- ✅ Required headers
- ✅ Event validation
- ✅ Error codes (por que 409, 400, etc)

---

### 📍 Localização 4: App Roles & Permissions

**URL**: https://business.facebook.com/settings/apps-and-websites/apps

**Passos**:
1. Acessar URL acima
2. Procurar: "ARCO" ou seu app name
3. Settings → **Roles**
4. Verificar permissões:
   - ✅ `ads_management`
   - ✅ `business_management`
   - ✅ `pages_manage_posts`

**Se faltarem permissões**:
→ Add → Search permission → Grant

---

### 📍 Localização 5: Access Token Debugger

**URL**: https://developers.facebook.com/tools/debug/accesstoken/

**O que fazer**:
1. Colar seu token na caixa
2. Click "Debug"
3. Verá:
   ```
   Token Details:
   ├─ Status: ✅ Valid / ❌ Expired
   ├─ Expires In: 5183600 seconds (59 dias)
   ├─ App ID: 123456789
   ├─ User ID: 9876543210
   └─ Permissions: ads_management, ...
   ```

**Quer validar seu token? Cole aqui →** https://developers.facebook.com/tools/debug/accesstoken/

---

## 🛠️ Parte 2: Comandos CLI Supabase + Meta

### A. Diagnóstico Supabase (via npx)

```bash
cd /home/jpcardozx/projetos/arco

# 1️⃣ Verificar Supabase CLI version
npx supabase@latest --version

# 2️⃣ Listar projects linked
npx supabase@latest projects list

# 3️⃣ Verificar funções deployadas
npx supabase@latest functions list

# 4️⃣ Ver logs da Edge Function
npx supabase@latest functions logs meta-conversions-webhook

# 5️⃣ Listar secrets (não mostra valores!)
npx supabase@latest secrets list

# 6️⃣ Status local
npx supabase@latest status
```

---

### B. Configurar Secrets Supabase (via npx)

```bash
# 1️⃣ Criar arquivo temporário com tokens
cat > .env.secrets << 'EOF'
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=seu_token_aqui
META_TEST_EVENT_CODE=TEST12345
EOF

# 2️⃣ Definir secrets (tem que estar linked a projeto)
npx supabase@latest secrets set --env-file .env.secrets

# 3️⃣ Verificar (mostra apenas nomes, não valores)
npx supabase@latest secrets list

# 4️⃣ Remover secret (se necessário)
npx supabase@latest secrets delete META_CONVERSION_API_TOKEN

# 5️⃣ LIMPEZA - Deletar arquivo com token
rm .env.secrets
```

---

### C. Deploy Edge Function (via npx)

```bash
# 1️⃣ Deploy
npx supabase@latest functions deploy meta-conversions-webhook

# 2️⃣ Verificar que foi deployada
npx supabase@latest functions list

# 3️⃣ Ver URL (no output do deploy ou via status)
npx supabase@latest status | grep -i "edge"
```

---

### D. Testar Edge Function (via curl)

```bash
# Obter URL (substitua YOUR_PROJECT_REF)
PROJECT_REF="seu_project_ref_aqui"
EDGE_URL="https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook"

# 1️⃣ Health check
curl -i $EDGE_URL

# Esperado: 200 OK

# 2️⃣ Testar com payload Lead
curl -X POST $EDGE_URL \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "test@example.com",
      "phone": "5511999999999",
      "firstName": "Test"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }'

# Esperado: 200 OK
# {
#   "success": true,
#   "eventId": "evt_...",
#   "isDuplicate": false
# }

# 3️⃣ Testar deduplicação (mesma payload)
curl -X POST $EDGE_URL \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "test@example.com",  # MESMO EMAIL
      "phone": "5511999999999"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }'

# Esperado: 409 Conflict (dedup funcionando)
# {
#   "success": false,
#   "isDuplicate": true,
#   "error": "Duplicate event detected"
# }
```

---

## 🔍 Parte 3: Validar Seu Token Meta

### Opção A: Via Debugger (UI)

**URL**: https://developers.facebook.com/tools/debug/accesstoken/

1. Colar seu token
2. Click "Debug"
3. Ver status (✅ Valid ou ❌ Expired)

---

### Opção B: Via curl (CLI)

```bash
# Substituir seu token
TOKEN="seu_token_aqui"

# Teste 1: Validar token
curl -s "https://graph.instagram.com/me?access_token=$TOKEN" | jq .

# Esperado:
# {
#   "id": "123456789",
#   "name": "Conversions API System User"
# }

# Teste 2: Ver permissões
curl -s "https://graph.instagram.com/me?fields=permissions&access_token=$TOKEN" | jq .

# Esperado:
# {
#   "permissions": [
#     "ads_management",
#     "business_management",
#     ...
#   ]
# }

# Teste 3: Ver informações detalhadas
curl -s "https://graph.instagram.com/me?fields=id,name,email&access_token=$TOKEN" | jq .

# Teste 4: Testar Meta Conversions API diretamente
curl -X POST "https://graph.instagram.com/v24.0/${DATASET_ID}/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Lead",
      "event_time": '$(date +%s)',
      "user_data": {
        "em": "test@example.com"  # Hashed
      }
    }],
    "access_token": "'$TOKEN'"
  }' | jq .

# Esperado:
# {
#   "events_received": 1,
#   "fbtrace_id": "..."
# }
```

---

## 📋 Checklist: Validar Tudo

### ✅ Token Meta

- [ ] Token é válido (não expirado)
- [ ] Token tem permissões: `ads_management`, `business_management`
- [ ] Token foi gerado de: **System User** (não pessoal)
- [ ] Token foi testado com curl (retorna ID válido)

**Link**: https://developers.facebook.com/tools/debug/accesstoken/

---

### ✅ Supabase Secrets

- [ ] `META_DATASET_ID` está configurado
- [ ] `META_CONVERSION_API_TOKEN` está configurado
- [ ] `META_TEST_EVENT_CODE` está configurado
- [ ] `npx supabase secrets list` mostra 3 items

**Comando**: `npx supabase@latest secrets list`

---

### ✅ Edge Function

- [ ] `npx supabase functions list` mostra `meta-conversions-webhook`
- [ ] Health check: `curl -i EDGE_URL` retorna 200
- [ ] Lead test: `curl POST EDGE_URL` retorna 200 + eventId
- [ ] Dedup test: 2º curl retorna 409

**Comando**: `npx supabase@latest functions list`

---

### ✅ Meta Events Manager

- [ ] Dataset recebe eventos (conta > 0)
- [ ] Advanced Matching = ON
- [ ] Últimos eventos aparecem em tempo real
- [ ] Eventos NÃO aparecem como duplicados

**Link**: https://business.facebook.com/events_manager2/list/dataset/1574079363975678

---

## 🚨 Troubleshooting Rápido

### Problema: "Token inválido"

```bash
# Solução: Gerar novo token

# 1. Ir para: https://business.facebook.com/settings/
# 2. Users and Assets → System Users
# 3. Conversions API System User → Generate access token
# 4. Copiar novo token
# 5. Atualizar secret:

npx supabase@latest secrets delete META_CONVERSION_API_TOKEN
echo "META_CONVERSION_API_TOKEN=novo_token_aqui" > .env.temp
npx supabase@latest secrets set --env-file .env.temp
rm .env.temp

# 6. Redeploy função
npx supabase@latest functions deploy meta-conversions-webhook
```

---

### Problema: "Edge Function retorna 500"

```bash
# Ver logs
npx supabase@latest functions logs meta-conversions-webhook

# Verificar se secrets existem
npx supabase@latest secrets list

# Redeploy
npx supabase@latest functions deploy meta-conversions-webhook

# Testar novamente
curl -i https://seu_project.supabase.co/functions/v1/meta-conversions-webhook
```

---

### Problema: "Dataset não recebe eventos"

```bash
# Checklist:
# 1. Token é válido?
curl -s "https://graph.instagram.com/me?access_token=seu_token" | jq .

# 2. Edge Function está respondendo?
curl -i https://seu_project.supabase.co/functions/v1/meta-conversions-webhook

# 3. Secrets estão configuradas?
npx supabase@latest secrets list

# 4. Testar envio direto para Meta
curl -X POST "https://graph.instagram.com/v24.0/1574079363975678/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Lead",
      "event_time": '$(date +%s)',
      "user_data": { "em": "test@example.com" }
    }],
    "access_token": "seu_token"
  }' | jq .

# Se retorna erro: copiar error message + debugar
```

---

## 📚 Recursos Úteis

| Link | Descrição |
|------|-----------|
| https://business.facebook.com/settings/ | Meta Business Settings |
| https://business.facebook.com/events_manager2/list/dataset/1574079363975678 | Seu Dataset |
| https://developers.facebook.com/tools/debug/accesstoken/ | Token Validator |
| https://developers.facebook.com/docs/marketing-api/conversions-api/ | CAPI Docs |
| https://supabase.com/docs/guides/functions | Supabase Functions Docs |

---

## 🎬 Próximos Passos

### Agora (Validação):

```bash
# 1️⃣ Validar token Meta
curl -s "https://graph.instagram.com/me?access_token=SEU_TOKEN" | jq .

# 2️⃣ Verificar secrets Supabase
npx supabase@latest secrets list

# 3️⃣ Testar Edge Function
curl -i https://SEU_PROJECT.supabase.co/functions/v1/meta-conversions-webhook

# 4️⃣ Enviar lead de teste
curl -X POST "https://SEU_PROJECT.supabase.co/functions/v1/meta-conversions-webhook" \
  -H "Content-Type: application/json" \
  -d '{"event_name":"Lead","user_data":{"email":"test@test.com","phone":"5511999"},"custom_data":{"value":150,"currency":"BRL"}}'

# 5️⃣ Verificar em Meta Events Manager
# https://business.facebook.com/events_manager2/list/dataset/1574079363975678
```

---

**Status**: 🟢 Pronto para executar  
**Próximo**: Execute os comandos acima e compartilhe output
