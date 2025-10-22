# FIX DEDUPLICATION - 2 HORAS

## Problema
Deduplicação em-memory não persiste entre requisições. Leads duplicados chegam a Meta.

## Solução
Usar Supabase database ao invés de Map em memória.

## Implementação

### 1. Migration SQL
```sql
-- supabase/migrations/20251022_fix_meta_dedup.sql
CREATE TABLE IF NOT EXISTS meta_events_dedup (
  event_id TEXT PRIMARY KEY,
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '1 hour'
);

CREATE INDEX idx_meta_dedup_expires ON meta_events_dedup(expires_at);
```

### 2. Update Edge Function
Arquivo: `supabase/functions/meta-conversions-webhook/index.ts`

Substituir bloco de DEDUPLICATION (linhas 155-207) por:

```typescript
// ============================================================================
// DEDUPLICATION (DATABASE)
// ============================================================================

async function checkDedup(eventId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/meta_events_dedup?event_id=eq.${eventId}`,
      {
        headers: {
          "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "apikey": Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        },
      }
    );

    const data = await response.json();
    return data.length > 0;
  } catch (e) {
    logEvent("WARN", "Dedup check failed, allowing event", { error: String(e) });
    return false; // Fallback: allow if check fails
  }
}

async function recordDedup(eventId: string): Promise<void> {
  try {
    await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/meta_events_dedup`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "apikey": Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id: eventId }),
      }
    );
  } catch (e) {
    logEvent("WARN", "Failed to record dedup", { error: String(e) });
  }
}
```

### 3. Update Main Handler
Na função main (linha 485-504), trocar:

```typescript
// Verificar deduplicação
const isDuplicate = await checkDedup(eventId);
if (isDuplicate) {
  context.isDuplicate = true;
  logEvent("WARN", "Duplicate event detected", context);

  return new Response(
    JSON.stringify({
      success: false,
      error: "Duplicate event",
      isDuplicate: true,
      requestId: traceId,
    }),
    {
      status: 409,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}
```

E após sucesso (linha 546):

```typescript
// Record in dedup store
await recordDedup(eventId);

// Send to Meta API
const metaResult = await sendToMetaAPI(metaPayload, context);
```

### 4. Deploy

```bash
supabase migrations up
supabase functions deploy meta-conversions-webhook
```

### 5. Validar

```bash
python3 test_dedup_analysis.py
# Agora deve retornar 409 no segundo envio
```

## Tempo Estimado
- Migration: 5 min
- Code changes: 15 min
- Deploy: 5 min
- Testing: 10 min
- **Total: 35 min**

## Próximos Passos
1. ✅ Fix deduplicação (HOJE)
2. ⏭️ Adicionar logging a database (Amanhã)
3. ⏭️ Implementar retry com circuit breaker (Próxima semana)

