# Permissões e Setup - Meta CAPI + Supabase Edge Functions

**Data**: Outubro 21, 2025
**Status**: Pré-requisitos para testes

---

## 🔐 1. Permissões Meta (Access Token)

### Validar Token Meta

```bash
# Teste 1: Verificar se token existe e é válido
curl -G https://graph.facebook.com/v24.0/me \
  -d "fields=id,name" \
  -d "access_token=YOUR_META_TOKEN_HERE"

# Resposta esperada:
# {
#   "id": "123456789",
#   "name": "Sua Conta Meta"
# }

# Se retornar erro: "Invalid OAuth access token"
# → Token expirado ou inválido
```

### Verificar Permissões do Token

```bash
# Teste 2: Verificar quais permissões o token tem
curl -G https://graph.facebook.com/v24.0/me/permissions \
  -d "access_token=YOUR_META_TOKEN_HERE"

# Resposta esperada:
# {
#   "data": [
#     { "permission": "ads_management", "status": "granted" },
#     { "permission": "business_management", "status": "granted" },
#     { "permission": "read_audience_network_insights", "status": "granted" },
#     ...
#   ]
# }
```

### Criar Token com Permissões Corretas

**Você precisa de:**
- `ads_management` (para criar campaigns)
- `business_management` (para acessar pixels)
- `pages_manage_metadata` (para configurar pixel)

**Como gerar:**

1. **Via Meta Business Suite** (mais fácil):
   ```
   https://business.facebook.com
   → Configurações → Usuários
   → Seu nome → Generate Access Token
   → Copia o token
   ```

2. **Via Apps**:
   ```
   https://developers.facebook.com/apps
   → Sua App
   → Settings → Basic
   → Copy App ID + App Secret
   → Gerar token via Graph API Explorer
   ```

### Configurar .env.local

```bash
# .env.local (NUNCA commitar)
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=seu_token_aqui
META_TEST_EVENT_CODE=TEST12345

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_anon_key
```

---

## 🔑 2. Supabase Secrets (Edge Function)

### Configurar Secrets no Supabase

```bash
# 1. Criar arquivo .env.local.supabase
cat > .env.supabase << EOF
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=seu_token_aqui
META_TEST_EVENT_CODE=TEST12345
EOF

# 2. Fazer login no Supabase
supabase login

# 3. Link projeto
supabase link --project-ref seu-project-ref

# 4. Configurar secrets
supabase secrets set --env-file .env.supabase

# 5. Verificar secrets (não mostra valores por segurança)
supabase secrets list
```

### Validar Secrets na Edge Function

```bash
# Deploy com --local-only primeiro para testar
supabase functions deploy meta-conversions-webhook --local-only

# Test local
curl -i http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": { "email": "test@example.com", "phone": "5511999999999" }
  }'

# Resposta esperada (200):
# { "success": true, "eventId": "evt_...", "requestId": "req_..." }

# Se erro 500: verificar secrets com `supabase secrets list`
```

---

## 🪝 3. Setup Meta Pixel + Event ID

### Instalar Meta Pixel

```html
<!-- No <head> do seu site -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1574079363975678');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1574079363975678&ev=PageView&noscript=1" />
</noscript>
```

### Disparar Events com Event ID Dinâmico

```typescript
// Seu componente
import { useMetaTracking } from '@/hooks/useMetaTracking';

export function LeadForm() {
  const { trackLead } = useMetaTracking();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Rastrear no backend + Edge Function
    const response = await trackLead({
      email: e.target.email.value,
      phone: e.target.phone.value,
      value: 150,
    });

    // 2. Disparar Pixel com MESMO event_id
    if (response.success) {
      fbq('track', 'Lead', {
        eventID: response.eventId,  // 🔑 MESMO ID
        value: 150,
        currency: 'BRL',
      });

      console.log('✅ Pixel disparado com eventId:', response.eventId);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" required />
      <input type="tel" name="phone" required />
      <button type="submit">Capturar Lead</button>
    </form>
  );
}
```

---

## 🧪 4. Teste de Hook Local

### Teste 1: Verificar Event ID Generation

```typescript
// No seu projeto, crie um teste:
// src/__tests__/useMetaTracking.test.ts

import { renderHook } from '@testing-library/react';
import { useMetaTracking } from '@/hooks/useMetaTracking';

describe('useMetaTracking', () => {
  it('should generate consistent event IDs for same email', async () => {
    const { result } = renderHook(() => useMetaTracking());
    const { trackLead } = result.current;

    // Primeiro call
    const response1 = await trackLead({
      email: 'test@example.com',
      phone: '5511999999999',
      value: 100,
    });

    // Segundo call (mesmo email dentro de 1h)
    const response2 = await trackLead({
      email: 'test@example.com',
      phone: '5511999999999',
      value: 100,
    });

    // Event IDs devem ser iguais (cache funcionando)
    expect(response1.eventId).toBe(response2.eventId);
  });

  it('should collect FBP and FBC cookies', async () => {
    // Mock document.cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '_fbp=fb.1.1234567890.1987654321; _fbc=fb.1.1234567890.1234567890123',
    });

    const { result } = renderHook(() => useMetaTracking());
    const { trackLead } = result.current;

    const response = await trackLead({
      email: 'test@example.com',
      phone: '5511999999999',
      value: 100,
    });

    // Verificar que fbp/fbc foram coletados
    expect(response.success).toBe(true);
    // Logs devem conter fbp/fbc
  });
});
```

### Teste 2: Console Validation (Browser DevTools)

```javascript
// Abrir console (F12) e rodar:

// 1. Verificar if hook pode ser acessado
const { useMetaTracking } = await import('@/hooks/useMetaTracking');
console.log('✅ Hook importado');

// 2. Testar chamada real (no seu componente)
// Preencher form e clicar submit, verificar console:
// 📤 [Meta Tracking] Enviando para Edge Function { eventName, eventId, email, fbp, fbc }
// ✅ [Meta Tracking] Evento rastreado { eventId, requestId, duration }

// 3. Verificar FBP/FBC cookies
console.log('_fbp:', document.cookie.match(/_fbp=([^;]*)/)?.[1]);
console.log('_fbc:', document.cookie.match(/_fbc=([^;]*)/)?.[1]);

// 4. Se não há cookies:
// Significa Pixel não foi instalado ou carregou com erro
```

---

## ✅ 5. Validação End-to-End

### Checklist Pre-Test

```bash
✅ Meta token válido?
  curl -G https://graph.facebook.com/v24.0/me \
    -d "fields=id" \
    -d "access_token=YOUR_TOKEN"

✅ .env.local configurado?
  grep META_DATASET_ID .env.local
  grep META_CONVERSION_API_TOKEN .env.local

✅ Supabase secrets setados?
  supabase secrets list

✅ Edge Function deployada?
  supabase functions list | grep meta-conversions

✅ Pixel instalado no site?
  Abrir DevTools → Console → fbq('getState')
```

### Test Sequence

```
1️⃣ Local Test (sem Meta)
   - Rodar: npm run dev
   - Abrir formulário
   - Verificar console.log do eventId
   - ✅ Event ID gerado?

2️⃣ Edge Function Test
   - Testar curl local:
     curl http://localhost:54321/functions/v1/... -d '{"event_name":"Lead",...}'
   - ✅ Recebeu? Status 200?

3️⃣ Meta Test Events
   - Ir para Meta Events Manager
   - Aba "Eventos de Teste"
   - Enviar Lead via seu formulário
   - ✅ Apareceu em ~30s?

4️⃣ EMQ Validation
   - Meta Events Manager → Diagnóstico
   - Taxa de correspondência > 50%?
   - ✅ EMQ ótimo?

5️⃣ Dedup Test
   - Enviar MESMA lead 2x
   - Segunda deve retornar 409 (Duplicate)
   - ✅ Dedup funcionando?
```

---

## 🚨 Troubleshooting Permissões

### Erro: "Invalid access token"

**Causa**: Token expirado ou com permissões insuficientes
**Solução**:
1. Gerar novo token em Meta Business
2. Validar que tem `ads_management` + `business_management`
3. Atualizar `META_CONVERSION_API_TOKEN` em `.env.local`

### Erro: "Insufficient permission"

**Causa**: Token não tem permissão para esse Dataset ID
**Solução**:
1. Verificar Dataset ID está correto (1574079363975678)
2. Verificar que você é admin do Pixel nesse Dataset
3. Em Meta Business → Pixels → verificar que você tem acesso

### Erro: "Edge Function secrets not found"

**Causa**: Secrets não foram configurados
**Solução**:
```bash
supabase secrets set META_DATASET_ID=1574079363975678
supabase secrets set META_CONVERSION_API_TOKEN=seu_token
supabase secrets set META_TEST_EVENT_CODE=TEST12345
supabase secrets list  # Verificar
```

### Erro: "Event matching failed"

**Causa**: FBP/FBC não foram coletados (Pixel não carregou)
**Solução**:
1. Abrir DevTools Console
2. Verificar: `fbq('getState')` retorna algo?
3. Se nada: Pixel script não carregou
4. Verificar se está no <head> ou <body>

---

## 📋 Checklist Final

- [ ] Meta token validado (`fbq('getState')` + curl /me)
- [ ] .env.local configurado (3 vars)
- [ ] Supabase secrets setados (supabase secrets list)
- [ ] Edge Function deployada (supabase functions list)
- [ ] Pixel instalado (DevTools → fbq check)
- [ ] Hook testado (console.log eventId)
- [ ] Lead enviada via formulário
- [ ] Meta Events Manager mostrando evento
- [ ] EMQ > 50%
- [ ] Dedup testado (2º = 409)

---

**Status**: Pronto para testes práticos ✅
