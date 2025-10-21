# Guia Prático de Testes - Hook + Meta Pixel

**Data**: Outubro 21, 2025
**Tempo**: ~15 minutos para setup completo

---

## 🚀 Quick Test (5 minutos)

### Teste 1: Validar Permissões

```bash
# 1. Rodar script de validação
bash scripts/validate-meta-permissions.sh

# Resultado esperado:
# ✅ META_DATASET_ID: OK
# ✅ META_CONVERSION_API_TOKEN: OK
# ✅ NEXT_PUBLIC_SUPABASE_URL: OK
# ✅ Token valid
# ✅ Supabase CLI installed
# ✅ Project linked
# ✅ Edge Function deployed
# ✅ All checks passed!
```

### Teste 2: Hook Local (Console)

```typescript
// 1. Rodar seu projeto
pnpm dev

// 2. Abrir http://localhost:3000 (ou sua página)
// 3. Abrir DevTools (F12) → Console

// 4. Digitar no console:
const { useMetaTracking } = window._modules || {}; // ou importar via dynamic
// Ou clicar no botão/form que usa o hook

// 5. Esperar por logs:
📤 [Meta Tracking] Enviando para Edge Function {
  eventName: "Lead",
  eventId: "evt_lead_1729532400000_abc123",
  email: "test@example.com",
  fbp: "fb.1.1234567890.1987654321",
  fbc: "fb.1.1234567890.1234567890123"
}

✅ [Meta Tracking] Evento rastreado {
  eventId: "evt_lead_1729532400000_abc123",
  requestId: "req_1729532400123_xyz",
  duration: 145
}
```

---

## 🧪 Unit Tests

### Rodar Testes

```bash
# Rodar todos os testes do hook
npm run test src/__tests__/useMetaTracking.test.ts

# Resultado esperado:
# PASS  src/__tests__/useMetaTracking.test.ts
#   useMetaTracking
#     Event ID Generation
#       ✓ should generate event ID on first call
#       ✓ should cache event ID for same email within 1 hour
#       ✓ should generate different event ID for different email
#     Edge Function Communication
#       ✓ should POST to Supabase Edge Function
#       ✓ should handle Edge Function success response
#       ✓ should handle Edge Function error response (409 Duplicate)
#       ✓ should handle network error with graceful fallback
#     Helper Methods
#       ✓ trackLead should populate Lead event data
#       ✓ trackContact should populate Contact event data
#       ✓ trackSchedule should populate Schedule event data
#     Logging
#       ✓ should log event tracking events
#
# Tests: 11 passed
```

---

## 🪝 Manual Hook Test (DevTools)

### Setup

```javascript
// 1. Abrir página com seu formulário/CTWA button
// 2. DevTools F12 → Console

// 3. Testar trackLead
const result = await fetch('/api/tracking/meta', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event_name: 'Lead',
    user_data: {
      email: 'manual-test-' + Date.now() + '@example.com',
      phone: '5511999999999',
      firstName: 'Teste',
      lastName: 'Manual'
    },
    custom_data: { value: 100 }
  })
});

const data = await result.json();
console.log('Response:', data);

// Esperado:
// {
//   success: true,
//   eventId: "evt_lead_...",
//   requestId: "req_...",
//   ...
// }
```

---

## 🌐 Meta Pixel Test

### 1. Verificar Pixel Instalado

```javascript
// DevTools Console

// Verificar se fbq está disponível
fbq('getState');

// Se retorna algo: Pixel está OK
// Se erro "fbq is not defined": Pixel não carregou
```

### 2. Testar Event ID Passagem

```javascript
// Após chamar o hook

// 1. Pegar event ID do console
// Procurar por: evt_lead_1729532400000_abc123

// 2. Disparar Pixel com mesmo event ID
fbq('track', 'Lead', {
  eventID: 'evt_lead_1729532400000_abc123', // MESMO ID
  value: 150,
  currency: 'BRL'
});

// 3. Verificar Meta Events Manager (próximo passo)
```

---

## 📊 Meta Events Manager Test

### Setup Test Event Code

```
1. Meta Events Manager
   https://business.facebook.com/events_manager

2. Seu Dataset (1574079363975678)
   → Aba "Eventos de Teste"

3. Verificar que Code "TEST12345" aparece
   (se TEST12345 não está configurado, ver .env.local)

4. Após enviar evento pelo hook:
   - Evento deve aparecer em ~30s
   - Status: "Verified"
   - EMQ should > 50%
```

### Validar EMQ

```
Meta Events Manager → Seu Dataset
  → Diagnóstico (menu esquerda)

Verificar:
- Taxa de Correspondência (EMQ): > 50% (ideal > 70%)
- Eventos Recebidos (últimas 24h): > 1
- Taxa de Sucesso: > 95%
- Erros: < 1%
```

---

## 🔄 End-to-End Test Sequence

### Timeline: 10 Minutos

#### Minuto 1-2: Setup

```bash
# Terminal 1
pnpm dev

# Terminal 2
bash scripts/validate-meta-permissions.sh
```

#### Minuto 3-5: Testar Hook Localmente

```javascript
// DevTools Console

// Enviar Lead test
async function testHook() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    '/functions/v1/meta-conversions-webhook',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Lead',
        user_data: {
          email: 'e2e-test@example.com',
          phone: '5511999999999'
        }
      })
    }
  );
  const data = await response.json();
  console.log('Hook response:', data);
  return data;
}

await testHook();

// Verificar:
// ✅ success: true
// ✅ eventId: gerado
// ✅ duration: < 200ms
```

#### Minuto 6-8: Testar Meta

```javascript
// DevTools Console

// 1. Disparar Pixel com event_id
const eventId = 'evt_lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

fbq('track', 'Lead', {
  eventID: eventId,
  value: 100,
  currency: 'BRL'
});

// 2. Log
console.log('Pixel event dispatched:', eventId);
```

#### Minuto 9-10: Validar Meta Events Manager

```
1. Ir para Meta Events Manager
   https://business.facebook.com/events_manager

2. Seu Dataset → Eventos de Teste

3. Procurar evento que acabou de enviar
   - Deve aparecer em ~30s
   - Status: Verified
   - EMQ: > 50%

✅ Se apareceu: Stack completo funcionando!
```

---

## 🐛 Debug Checklist

### Se Hook não disparar evento

```bash
# 1. Verificar .env.local
grep NEXT_PUBLIC_SUPABASE_URL .env.local

# 2. Verificar console.log no devtools
# Procurar por: 📤 [Meta Tracking] Enviando

# 3. Se não aparecer:
#    - Hook não foi chamado
#    - Verificar que seu component está usando o hook
#    - Verificar que form/button está disparando submit/click
```

### Se Hook dispara mas Edge Function não responde

```bash
# 1. Testar Edge Function localmente
supabase functions serve

# 2. Testar com curl (em outro terminal)
curl -i http://localhost:54321/functions/v1/meta-conversions-webhook \
  -H "Content-Type: application/json" \
  -d '{"event_name":"Lead","user_data":{"email":"test@example.com","phone":"5511999999999"}}'

# Esperado: Status 200

# 3. Se erro 500: verificar secrets
supabase secrets list
```

### Se Meta não recebe evento

```bash
# 1. Verificar token Meta
curl -G https://graph.facebook.com/v24.0/me \
  -d "access_token=$META_CONVERSION_API_TOKEN"

# 2. Verificar Dataset ID
# No Events Manager, copiar ID correto

# 3. Verificar que Pixel está disparando
# DevTools Console → fbq('getState')
```

### Se EMQ baixa (< 50%)

```javascript
// DevTools Console

// Verificar cookies FBP/FBC
console.log('_fbp:', document.cookie.match(/_fbp=([^;]*)/)?.[1]);
console.log('_fbc:', document.cookie.match(/_fbc=([^;]*)/)?.[1]);

// Se vazios: Pixel não carregou
// Soluções:
// 1. Verificar Pixel script no <head>
// 2. Verificar que DATASET_ID está correto
// 3. Aguardar mais eventos (precisa 10+)
```

---

## ✅ Final Checklist

- [ ] Permissões validadas (bash validate-meta-permissions.sh)
- [ ] Meta token válido (curl test)
- [ ] Supabase secrets configurados (supabase secrets list)
- [ ] Edge Function deployada (supabase functions list)
- [ ] Hook tests passam (npm run test)
- [ ] Pixel carregado (fbq('getState') retorna algo)
- [ ] Event ID gerado (console.log mostra)
- [ ] Evento enviado para Edge Function (status 200)
- [ ] Meta recebeu evento (Meta Events Manager mostra em ~30s)
- [ ] EMQ > 50%
- [ ] Dedup funciona (enviar 2x = 409)

---

## 🎯 Próximos Passos

```
1. ✅ Tests passando
   ↓
2. 📊 Evento aparecendo em Meta
   ↓
3. 📈 EMQ > 60%
   ↓
4. 🚀 Pronto para production
```

---

**Status**: Pronto para testes práticos ✅
