# 🔧 CORREÇÃO 400 BAD REQUEST - COMPLETA

## ❌ Problema Original

```json
{
  "action": "test.created",
  "type": "test",
  "data": {"id": "123456"}
}
```

**Resposta:** `400 - Bad Request`

**Causa:** Validação muito restritiva que rejeitava eventos de teste do MP.

---

## ✅ Correções Aplicadas

### **1. Validação de Estrutura Flexível**

**Antes:**
```typescript
if (!event.data?.id) {
  return new Response('Invalid event structure', { status: 400 });
}
```

**Depois:**
```typescript
if (!event.data) {
  return new Response('Invalid event structure', { status: 400 });
}

if (!event.data.id) {
  console.warn('Event has no data.id, might be a test event');
  // Don't reject, just log
}
```

### **2. Tratamento de Eventos de Teste**

```typescript
if (event.type !== 'test') {
  await processWebhook(event);
} else {
  console.log('⚠️ Test event, skipping processing');
}
```

### **3. Error Handling Robusto**

```typescript
try {
  await storeWebhookEvent(event, requestId);
} catch (storeError) {
  console.error('Failed to store:', storeError);
  // Continue mesmo se falhar
}
```

### **4. checkWebhookExists Corrigido**

```typescript
// Antes: .single() causava erro se não existisse
// Depois: .maybeSingle() retorna null se não existir
const { data } = await supabase
  .from('webhook_events')
  .eq('gateway_event_id', requestId)
  .maybeSingle();
```

---

## 🚀 Como Testar

### **1. Reiniciar Servidor**
```bash
cd /home/jpcardozx/projetos/arco
pnpm dev
```

### **2. MP Enviar Novo Teste**
No painel MP:
- Botão "Enviar notificação de teste"
- Tipo: test ou payment
- Enviar

### **3. Resultado Esperado**

**Ngrok:**
```
14:40:00 POST /api/webhooks/mercadopago 200 OK
```

**Logs:**
```
✅ Webhook received
✅ Webhook event stored
⚠️ Test event, skipping processing
✅ Webhook processed successfully
```

**Supabase:**
```sql
SELECT * FROM webhook_events ORDER BY received_at DESC LIMIT 1;
-- Deve ter 1 registro novo
```

---

## 📊 Status Atual

- [x] Validação flexível implementada
- [x] Eventos de teste suportados
- [x] Error handling robusto
- [x] Logs detalhados
- [ ] Servidor reiniciado
- [ ] Novo teste do MP enviado

---

## 🎯 Próximo Passo

**Reinicie o servidor e peça pro MP enviar novo teste:**

```bash
# Terminal 1: Servidor
cd /home/jpcardozx/projetos/arco
pnpm dev

# Terminal 2: Monitor
/home/jpcardozx/projetos/arco/scripts/monitor-webhooks.sh

# Ou abra o dashboard
http://localhost:3001/monitor/webhooks
```

**Resultado esperado: 200 OK! ✅**
