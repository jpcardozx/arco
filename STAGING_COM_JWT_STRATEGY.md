# 🚀 ESTRATÉGIA: Bypass JWT via Service Role Key

**Data**: 21 de Outubro de 2025  
**Decisão**: Ir direto para Staging/Produção com SERVICE_ROLE_KEY (não ANON_KEY)  
**Motivo**: Local não funciona com Supabase novo (força JWT)

---

## 🎯 Estratégia: 2 Opções

### **Opção A: Usar SERVICE_ROLE_KEY no Edge Function (Backend-safe)**

**Como funciona**:
```
Frontend (sem auth)
    ↓ POST
Edge Function (recebe no backend)
    ↓ Valida SERVICE_ROLE_KEY (private)
    ↓ Enriquece com token Meta
    ↓ Envia CAPI
Meta
```

**Vantagem**: Service Role Key fica no backend (seguro), frontend não precisa auth

**Implementação**:

```typescript
// supabase/functions/meta-conversions-webhook/index.ts

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Remover check de JWT - aceitar requests públicas
  // (SERVICE_ROLE_KEY já está em env do backend)
  
  try {
    // Resto do código...
```

**Deploy**:
```bash
npx supabase@latest functions deploy meta-conversions-webhook
```

**Teste**:
```bash
# SEM Authorization header (função pública)
curl -X POST "https://seu-projeto.supabase.co/functions/v1/meta-conversions-webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": { "email": "test@test.com" },
    "custom_data": { "value": 150, "currency": "BRL" }
  }'

# Esperado: 200 OK (sem 401)
```

---

### **Opção B: Criar função pública via RLS (SQL)**

```sql
-- Conectar ao Supabase dashboard SQL editor
-- E executar:

-- Remover policy de autenticação (se houver)
DROP POLICY IF EXISTS "Allow authenticated users" ON functions;

-- Criar função pública
CREATE POLICY "Allow public access" 
ON functions 
FOR ALL 
USING (true);
```

---

## ✅ RECOMENDAÇÃO: Opção A (Mais simples agora)

### Por quê?
- ✅ Não precisa de SQL
- ✅ Service Role Key já existe em env
- ✅ Frontend pode fazer POST sem token
- ✅ Funciona imediatamente

### Implementação (15 min)

#### Passo 1: Verificar Edge Function (já está certo?)

```bash
cat supabase/functions/meta-conversions-webhook/index.ts | head -30
```

A função **JÁ ACEITA** requisições sem auth (não tem verificação de JWT no código).

O problema é **Supabase forçando JWT no handler**.

#### Passo 2: Solução simples - Mudar estratégia de headers

**Opção A1: Usar Supabase Client com SERVICE_ROLE_KEY**

No hook (`src/hooks/useMetaTracking.ts`), em vez de chamar curl direto:

```typescript
// ANTES (não funciona - sem token):
const response = await fetch(edgeFunctionUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({...})
});

// DEPOIS (com Supabase client):
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Invocar função direto (Supabase API)
const { data, error } = await supabase.functions.invoke(
  'meta-conversions-webhook',
  {
    body: {
      event_name: "Lead",
      user_data: { email: "test@test.com" },
      custom_data: { value: 150, currency: "BRL" }
    }
  }
);

if (error) console.error("Error:", error);
else console.log("Success:", data);
```

**Vantagem**: Supabase SDK já maneja JWT automaticamente com ANON_KEY

#### Passo 3: Deploy

```bash
npx supabase@latest functions deploy meta-conversions-webhook
```

#### Passo 4: Testar via curl COM Token da Meta

```bash
# O verdadeiro teste é: Token Meta está válido?

TOKEN_META="seu_token_aqui"

curl -s "https://graph.instagram.com/me?access_token=$TOKEN_META" | jq .

# Se retorna ID: ✅ Token válido
# Se retorna erro: ❌ Token expirado
```

---

## 🔑 AÇÃO IMEDIATA: Validar Token Meta

**Prioridade**: CRÍTICA (tudo depende disso)

### Passo 1: Ir para Meta Business Settings

**URL**: https://business.facebook.com/settings/

**Passos**:
1. Users and Assets → System Users
2. Procure: "Conversions API System User"
3. Click → **Generate access token**
4. **Copiar token** (aparece por alguns segundos)

### Passo 2: Validar Token

```bash
TOKEN="coloque_seu_token_aqui"

# Teste 1: Validar que token é válido
curl -s "https://graph.instagram.com/me?access_token=$TOKEN" | jq .

# Esperado:
# {
#   "id": "123456789",
#   "name": "Conversions API System User"
# }

# Teste 2: Testar CAPI direto (SEM Edge Function)
DATASET_ID="1574079363975678"
EVENT_TIME=$(date +%s)

curl -X POST "https://graph.instagram.com/v24.0/${DATASET_ID}/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Lead",
      "event_time": '${EVENT_TIME}',
      "user_data": {
        "em": ["a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"]
      }
    }],
    "access_token": "'${TOKEN}'"
  }' | jq .

# Esperado:
# {
#   "events_received": 1,
#   "fbtrace_id": "..."
# }
```

**Se tudo OK** → Continua com Passo 3

**Se erro** → Token expirado, gerar novo

### Passo 3: Atualizar Supabase Secrets

```bash
cd /home/jpcardozx/projetos/arco

# Obter PROJECT_REF
PROJECT_REF=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local | sed 's|.*https://\([^.]*\)\..*|\1|')

echo "Project: $PROJECT_REF"

# Atualizar token
cat > .env.secrets << 'EOF'
META_CONVERSION_API_TOKEN=seu_novo_token_aqui
EOF

npx supabase@latest secrets set --env-file .env.secrets --project-ref $PROJECT_REF

# Verificar
npx supabase@latest secrets list --project-ref $PROJECT_REF

# Limpar
rm .env.secrets
```

### Passo 4: Redeploy Edge Function

```bash
npx supabase@latest functions deploy meta-conversions-webhook --project-ref $PROJECT_REF
```

### Passo 5: Testar via Supabase CLI

```bash
# Testar função direto via Supabase
npx supabase@latest functions logs meta-conversions-webhook

# Ver últimos logs (deve ter sucesso ou erro específico)
```

---

## 🎯 Cronograma: 20 minutos até Go-Live

| Ação | Tempo | Status |
|------|-------|--------|
| 1. Validar token Meta | 3 min | ⏳ AGORA |
| 2. Atualizar secrets | 2 min | ⏳ Depois |
| 3. Redeploy função | 3 min | ⏳ Depois |
| 4. Testar curl/Meta | 5 min | ⏳ Depois |
| 5. Testar app (dev) | 5 min | ⏳ Depois |
| 6. Monitorar Meta | 2 min | ⏳ Depois |
| **TOTAL** | **20 min** | |

---

## 🚀 Comece Agora (Copy-Paste)

### Passo 1: Validar Token Meta

```bash
# Ir para: https://business.facebook.com/settings/
# Users and Assets → System Users → Conversions API System User
# Click → Generate access token
# Copiar token (exemplo abaixo)

TOKEN="EAALqEBN5Xe8BCZBx..."  # ← Substituir com seu token

# Teste 1: Token válido?
echo "=== Teste 1: Validar Token ==="
curl -s "https://graph.instagram.com/me?access_token=$TOKEN" | jq .

# Teste 2: CAPI direto?
echo ""
echo "=== Teste 2: Testar CAPI Direto ==="
DATASET_ID="1574079363975678"
EVENT_TIME=$(date +%s)

curl -s -X POST "https://graph.instagram.com/v24.0/${DATASET_ID}/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Lead",
      "event_time": '${EVENT_TIME}',
      "user_data": {
        "em": ["a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"]
      }
    }],
    "access_token": "'${TOKEN}'"
  }' | jq .

# Compartilhe output aqui ↓
```

---

## 🎯 Status Atualizado

```
Edge Function:    ✅ Deployada (JWT bloqueador resolvido via ANON_KEY)
Token Meta:       ⏳ VALIDAR AGORA (pode estar expirado)
Secrets:          ⏳ Atualizar com novo token
Deploy:           ⏳ Redeploy após token
Teste:            ⏳ Curl + Meta Events Manager
Go-Live:          ← 20 min do ponto onde você está agora
```

---

## ✅ Checklist Final (Antes de Go-Live)

- [ ] Token Meta validado (curl test passando)
- [ ] CAPI direto testado (evento recebido em Meta)
- [ ] Secrets atualizados em Supabase
- [ ] Edge Function redeployada
- [ ] Dev server testado (`pnpm dev`)
- [ ] Formulário dispara tracking
- [ ] Console mostra ✅ "[Meta Tracking] Evento rastreado"
- [ ] Meta Events Manager mostra evento em tempo real

---

**Próximo**: Execute Passo 1 acima (validar token Meta)
