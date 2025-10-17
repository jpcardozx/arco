# 🔍 DEBUG CHECKLIST - Analytics & Logs

## ✅ Problemas Identificados e Corrigidos

### 1. ❌ CORS Não Configurado
**Problema**: Requests do frontend para `/api/analytics/track` bloqueados por CORS
**Fix**: 
- ✅ Adicionado CORS headers em todas responses
- ✅ Handler OPTIONS para preflight requests
- ✅ Configuração dinâmica (dev = `*`, prod = domain específico)

### 2. ❌ Logs Insuficientes
**Problema**: Não sabíamos se requests chegavam, se body era parseado, se validação passava
**Fix**:
- ✅ Log em CADA etapa do fluxo
- ✅ Log de request received com headers
- ✅ Log de body parseado
- ✅ Log de validação (pass/fail)
- ✅ Log de sucesso com tracking details
- ✅ Log de erro com stack trace

### 3. ❌ Console.log vs Logger
**Problema**: `console.log` não é estruturado, difícil de filtrar/buscar
**Fix**:
- ✅ Trocado `console.log` por `logger.info`
- ✅ Trocado `console.error` por `logger.error`
- ✅ Logs estruturados com contexto (IP, userId, event, etc)

### 4. ❌ Erros Silenciosos no Frontend
**Problema**: `sendToBackend()` não logava detalhes de erro
**Fix**:
- ✅ Log antes de enviar
- ✅ Log de response status + body
- ✅ Log de sucesso com data
- ✅ Try/catch com stack trace

---

## 🧪 Como Testar Agora

### Test 1: Verificar se request chega na API
```bash
# Terminal: Ver logs do servidor
pnpm dev

# Navegador: Abrir /checkout/test
# DevTools > Console
# Selecionar plano + Criar preferência
# Deve ver no terminal:
# [Analytics API] Request received
# [Analytics API] Body parsed
# [Analytics] Event tracked: begin_checkout
```

### Test 2: Verificar CORS
```bash
# DevTools > Network tab
# Fazer request de analytics
# Ver response headers:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: POST, OPTIONS
```

### Test 3: Verificar logs estruturados
```bash
# Terminal do servidor deve mostrar:
{
  level: 'info',
  message: '[Analytics] Event tracked:',
  event: 'begin_checkout',
  planId: 'essencial',
  userId: 'test-user-123',
  timestamp: '2025-10-08T...',
  ip: '127.0.0.1'
}
```

### Test 4: Testar erro intencional
```typescript
// No DevTools Console:
fetch('/api/analytics/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ event: 'test' }) // Sem planId
}).then(r => r.json()).then(console.log)

// Deve retornar:
// { error: 'Missing required fields', details: { event: true, planId: false } }

// Servidor deve logar:
// [Analytics API] Validation failed { event: 'test', planId: undefined }
```

---

## 📊 Logs Disponíveis Agora

### Frontend (Browser Console)
```javascript
[Analytics] Sending to backend: { event: 'begin_checkout', ... }
[Analytics] Backend success: { success: true, tracked: {...} }
[Analytics] Backend error: 400 { error: 'Missing required fields' }
```

### Backend (Server Terminal)
```javascript
[Analytics API] Request received { method: 'POST', url: '...', headers: {...} }
[Analytics API] Body parsed { body: {...} }
[Analytics] Event tracked: { event: 'begin_checkout', planId: 'essencial', ... }
[Analytics API] Event tracked successfully { event: 'begin_checkout', planId: 'essencial' }
```

### Error Logs
```javascript
[Analytics API] Validation failed { event: 'test', planId: undefined }
[Analytics API] Rate limit exceeded { ip: '127.0.0.1' }
[Analytics API] Error tracking event: { error: '...', stack: '...' }
```

---

## 🎯 O Que Mudou

### Antes:
```typescript
// ❌ Silencioso
await fetch('/api/analytics/track', {...});

// ❌ Erro genérico
console.error('Error:', error);
```

### Depois:
```typescript
// ✅ Log detalhado
console.log('[Analytics] Sending to backend:', event);
const response = await fetch('/api/analytics/track', {...});

if (!response.ok) {
  const errorData = await response.json();
  console.error('[Analytics] Backend error:', response.status, errorData);
} else {
  const data = await response.json();
  console.log('[Analytics] Backend success:', data);
}

// ✅ Stack trace completo
catch (error) {
  console.error('[Analytics] Error:', {
    error: error instanceof Error ? error.message : 'Unknown',
    stack: error instanceof Error ? error.stack : undefined,
  });
}
```

---

## 🚀 Próximos Passos para Debug

1. **Abrir DevTools**
   - Console tab (ver logs frontend)
   - Network tab (ver requests/responses)

2. **Abrir Terminal do Servidor**
   - Ver logs backend em tempo real
   - Filtrar por `[Analytics]`

3. **Fazer Ação**
   - Selecionar plano
   - Criar preferência
   - Observar fluxo completo

4. **Verificar**
   - ✅ Request chegou? (log: Request received)
   - ✅ Body parseado? (log: Body parsed)
   - ✅ Validação passou? (log: Event tracked)
   - ✅ Response OK? (log: Event tracked successfully)
   - ✅ Frontend recebeu? (log: Backend success)

---

## 🔧 Troubleshooting

### "CORS error" no console
- ✅ Verificar `corsHeaders` está sendo retornado
- ✅ Verificar OPTIONS handler existe
- ✅ Verificar NODE_ENV está setado

### "Logs não aparecem"
- ✅ Verificar `pnpm dev` está rodando
- ✅ Verificar terminal correto (não background)
- ✅ Verificar logger está importado

### "Request não chega na API"
- ✅ Verificar URL `/api/analytics/track` está correto
- ✅ Verificar método POST
- ✅ Verificar Content-Type header
- ✅ Verificar body é JSON válido

### "Validation failed"
- ✅ Ver log: `[Analytics API] Validation failed`
- ✅ Ver details: `{ event: true/false, planId: true/false }`
- ✅ Corrigir campos faltando

---

**Resumo**: Agora temos visibilidade COMPLETA do fluxo, com logs estruturados em cada etapa, CORS configurado, e erros detalhados com stack trace. Debug será 10x mais fácil! 🎯
