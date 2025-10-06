# 🏗️ Backend Architecture - Supabase-Native

> **Filosofia:** Arquitetura madura usando ecossistema Supabase nativo  
> **Evita:** Serviços externos (Inngest, Upstash), overengineering  
> **Usa:** Edge Functions, Webhooks, pg_cron, RLS rigoroso

---

## 📊 STACK DEFINITIVO

### Core Services
```typescript
┌─────────────────────────────────────────────────────────┐
│ FRONTEND (Next.js 15)                                   │
│ ├── Server Actions (read operations)                    │
│ ├── Client Components (UI)                              │
│ └── Supabase Realtime (live updates)                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ SUPABASE (Backend-as-a-Service)                         │
│                                                          │
│ ├── PostgreSQL + RLS (data security)                    │
│ ├── Edge Functions (Deno runtime)                       │
│ │   ├── lighthouse-scan (análises sob demanda)          │
│ │   └── process-upload (file processing)                │
│ │                                                        │
│ ├── Database Webhooks (event-driven)                    │
│ │   ├── on_analysis_requested → trigger Edge Function   │
│ │   └── on_ticket_created → notify admins               │
│ │                                                        │
│ ├── pg_cron (scheduled jobs)                            │
│ │   ├── uptime_check (every 5 min)                      │
│ │   ├── security_scan (daily 2am)                       │
│ │   └── domain_health (daily 3am)                       │
│ │                                                        │
│ ├── Supabase Realtime (pub/sub)                         │
│ │   ├── uptime_checks channel                           │
│ │   └── ticket_messages channel                         │
│ │                                                        │
│ └── Storage (file uploads)                              │
│     └── RLS-protected buckets                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 IMPLEMENTATION PLAN (Revised)

### ✅ FASE 1: Server Actions (Read-Only) - 4h
**Objetivo:** Dashboard funcional lendo dados reais

1. **Server Client** (30min)
   - ✅ `src/lib/supabase/server.ts`
   - ✅ createSupabaseServer()
   - ✅ createSupabaseAdmin()

2. **Server Actions - Essentials** (3h)
   - ✅ `src/app/dashboard/actions.ts`
   - Read operations only (getUserAnalyses, getProjects, etc.)
   - Tier validation (free vs paid features)
   - Quota checks (3 analyses/month for free)

**Deliverable:** Dashboard mostra dados reais (mas análises ainda não executam)

---

### ✅ FASE 2: Edge Functions (Core Features) - 8h
**Objetivo:** Análises automáticas via Edge Functions

3. **Lighthouse Edge Function** (6h)
   ```typescript
   // supabase/functions/lighthouse-scan/index.ts
   
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
   import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
   import Lighthouse from 'https://esm.sh/lighthouse@11.0.0'
   
   serve(async (req) => {
     const { analysisId, url } = await req.json()
     
     // Run Lighthouse via Browserless API (cloud service)
     const result = await fetch('https://chrome.browserless.io/lighthouse', {
       method: 'POST',
       headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
       body: JSON.stringify({ url })
     })
     
     const lighthouse = await result.json()
     
     // Calculate ARCO Index
     const arcoIndex = calculateARCOIndex(lighthouse.lhr)
     
     // Save to database
     const supabase = createClient(...)
     await supabase.from('analysis_results').insert({
       analysis_id: analysisId,
       arco_index: arcoIndex,
       lighthouse_data: lighthouse.lhr,
       performance_score: lighthouse.lhr.categories.performance.score * 100,
       ...
     })
     
     return new Response(JSON.stringify({ success: true }))
   })
   ```

4. **Database Webhook Trigger** (2h)
   ```sql
   -- Trigger Edge Function when analysis is requested
   CREATE OR REPLACE FUNCTION trigger_lighthouse_scan()
   RETURNS TRIGGER AS $$
   BEGIN
     PERFORM net.http_post(
       url := 'https://[project-ref].supabase.co/functions/v1/lighthouse-scan',
       headers := '{"Content-Type": "application/json", "Authorization": "Bearer [anon-key]"}'::jsonb,
       body := json_build_object('analysisId', NEW.id, 'url', NEW.url)::jsonb
     );
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   
   CREATE TRIGGER on_analysis_requested
   AFTER INSERT ON analysis_requests
   FOR EACH ROW
   EXECUTE FUNCTION trigger_lighthouse_scan();
   ```

**Deliverable:** Usuários podem solicitar análises e recebem ARCO Index real

---

### ✅ FASE 3: pg_cron Jobs (Monitoring) - 6h
**Objetivo:** Monitoring automático 24/7

5. **Uptime Monitoring** (2h)
   ```sql
   -- Enable pg_cron extension
   CREATE EXTENSION IF NOT EXISTS pg_cron;
   
   -- Create uptime check function
   CREATE OR REPLACE FUNCTION check_uptime()
   RETURNS void AS $$
   DECLARE
     site RECORD;
     response_time INT;
     is_up BOOLEAN;
   BEGIN
     FOR site IN 
       SELECT DISTINCT url FROM user_profiles WHERE tier = 'paid'
     LOOP
       -- Call Edge Function to check uptime
       PERFORM net.http_post(
         url := 'https://[project-ref].supabase.co/functions/v1/uptime-check',
         body := json_build_object('url', site.url)::jsonb
       );
     END LOOP;
   END;
   $$ LANGUAGE plpgsql;
   
   -- Schedule every 5 minutes
   SELECT cron.schedule(
     'uptime-check',
     '*/5 * * * *',
     'SELECT check_uptime();'
   );
   ```

6. **Security + Domain Scans** (4h)
   ```sql
   -- Security scan (daily at 2am)
   SELECT cron.schedule(
     'security-scan',
     '0 2 * * *',
     'SELECT trigger_security_scan();'
   );
   
   -- Domain health (daily at 3am)
   SELECT cron.schedule(
     'domain-health',
     '0 3 * * *',
     'SELECT trigger_domain_check();'
   );
   ```

**Deliverable:** Monitoring automático funcionando em background

---

### ✅ FASE 4: Realtime + Storage - 4h
**Objetivo:** Features avançadas (chat, upload)

7. **Realtime Subscriptions** (2h)
   ```typescript
   // src/lib/realtime/ticket-chat.ts
   
   import { createSupabaseBrowserClient } from '@/lib/supabase/client'
   
   export function subscribeToTicket(ticketId: string, callback: Function) {
     const supabase = createSupabaseBrowserClient()
     
     return supabase
       .channel(`ticket:${ticketId}`)
       .on(
         'postgres_changes',
         {
           event: 'INSERT',
           schema: 'public',
           table: 'ticket_messages',
           filter: `ticket_id=eq.${ticketId}`,
         },
         (payload) => callback(payload.new)
       )
       .subscribe()
   }
   ```

8. **File Upload** (2h)
   ```typescript
   // Server Action
   export async function uploadFile(formData: FormData) {
     const supabase = await createSupabaseServer()
     const user = await getCurrentUser()
     
     // Check quota
     const quota = await getStorageQuota()
     if (quota.percentage > 100) throw new Error('Storage quota exceeded')
     
     const file = formData.get('file') as File
     const path = `${user.id}/${Date.now()}-${file.name}`
     
     // Upload to Supabase Storage
     const { data, error } = await supabase.storage
       .from('user-files')
       .upload(path, file)
     
     if (error) throw error
     
     // Save metadata to database
     await supabase.from('storage_items').insert({
       user_id: user.id,
       file_name: file.name,
       file_path: data.path,
       file_size: file.size,
     })
   }
   ```

**Deliverable:** Chat em tempo real + upload funcional

---

## 🔐 RLS RIGOROSO

### Principles
1. **Deny by default:** Todas as tables com RLS enabled
2. **Tier-based access:** Policies checam `user_profiles.tier`
3. **User isolation:** `auth.uid() = user_id` em todas as queries
4. **Admin bypass:** Service role key para admin operations

### Example Policies
```sql
-- user_profiles: Users read own, admins read all
CREATE POLICY "Users view own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins view all profiles"
ON user_profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND tier = 'admin'
  )
);

-- analysis_requests: Tier-based quotas
CREATE POLICY "Free users limited to 3/month"
ON analysis_requests FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND
  (
    (SELECT tier FROM user_profiles WHERE id = auth.uid()) = 'paid'
    OR
    (
      SELECT COUNT(*) FROM analysis_requests
      WHERE user_id = auth.uid()
      AND created_at >= date_trunc('month', CURRENT_DATE)
    ) < 3
  )
);

-- uptime_checks: Paid users only
CREATE POLICY "Paid users view uptime"
ON uptime_checks FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND tier IN ('paid', 'admin')
  )
);
```

---

## 📦 DEPENDENCIES

### NPM Packages (Minimal)
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",
    "next": "^15.x",
    "react": "^19.x"
  }
}
```

### Supabase Extensions
```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS http; -- For webhooks
```

### External Services (Optional)
- **Browserless.io:** Lighthouse execution (cloud Chromium)
  - Free tier: 1000 requests/month
  - Alternative: Self-host Puppeteer in Edge Function (heavier)

---

## 🎯 ADVANTAGES vs Original Plan

| Aspect | Original (Inngest) | New (Supabase-Native) |
|--------|-------------------|----------------------|
| **Vendor Lock-in** | High (Inngest + Upstash) | Low (open-source Postgres) |
| **Cost** | $20/mo Inngest + $10/mo Upstash | $0 (included in Supabase) |
| **Complexity** | 3 services to manage | 1 service (Supabase) |
| **Scalability** | Vertical (pay more) | Horizontal (Postgres native) |
| **Observability** | External dashboards | Supabase Dashboard |
| **Development** | Separate deployments | Single `supabase functions deploy` |
| **Security** | API keys management | RLS at database level |
| **Realtime** | Polling or webhooks | Native Supabase Realtime |

---

## ✅ NEXT ACTIONS

1. **Update Server Actions** (remover types incorretos)
2. **Create Edge Functions** (lighthouse-scan, uptime-check)
3. **Setup pg_cron** (scheduling via SQL migrations)
4. **Deploy Edge Functions** (`supabase functions deploy`)
5. **Test webhooks** (trigger analysis → Edge Function → save result)

---

**Status:** Arquitetura definida - Supabase-native, madura e escalável  
**Blocker removido:** Não precisa Inngest/Upstash  
**Próximo passo:** Corrigir Server Actions com types corretos

