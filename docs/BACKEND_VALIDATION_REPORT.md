# 🔍 Backend Validation Report - ARCO MVP V1.0

> **Data:** 5 de outubro de 2025  
> **Status:** ⚠️ **GAPS CRÍTICOS IDENTIFICADOS**  
> **Arquitetura:** Supabase + Next.js Server Actions + Route Handlers

---

## 📊 EXECUTIVE SUMMARY

### Situação Atual
- ✅ **Database:** 21 tables, 70+ indexes, 60+ RLS policies (100% complete)
- ⚠️ **Backend Layer:** 50% complete (infra pronta, services faltando)
- ❌ **Integration:** 0% (dashboards usam 100% mock data)
- ✅ **Auth:** Supabase Auth configurado (client + server helpers)
- ✅ **API Routes:** 6 endpoints implementados (lead capture, analytics, validation)

### Gap Analysis
```
┌────────────────────────────────────────────────────────────┐
│ LAYER                    │ STATUS    │ COMPLETION │ RISK  │
├────────────────────────────────────────────────────────────┤
│ Database Schema          │ ✅ Done   │   100%     │ Low   │
│ RLS Policies             │ ✅ Done   │   100%     │ Low   │
│ Auth System              │ ✅ Done   │   100%     │ Low   │
│ API Routes (Public)      │ ✅ Done   │   100%     │ Low   │
│ Server Actions (Auth)    │ ❌ Missing│     0%     │ HIGH  │
│ Data Services            │ ❌ Missing│     0%     │ HIGH  │
│ Monitoring Jobs          │ ❌ Missing│     0%     │ HIGH  │
│ Frontend Integration     │ ❌ Missing│     0%     │ HIGH  │
└────────────────────────────────────────────────────────────┘
```

---

## 🗂️ DATABASE STATUS

### ✅ Schema Completo (21 Tables)

#### **Core Tables:**
```sql
-- Auth & User Management
✅ user_profiles (tier: free/paid/admin, quotas)
✅ user_invitations (email verification flow)
✅ audit_log (compliance tracking)

-- Analysis & Monitoring
✅ analysis_requests (Lighthouse scans)
✅ analysis_results (scores + raw data)
✅ performance_metrics (CWV tracking)
✅ uptime_checks (24/7 monitoring)
✅ domain_monitoring (SSL, DNS, blacklist)

-- Projects & Operations
✅ projects (timeline tracking)
✅ project_milestones (progress)
✅ support_tickets (chat system)
✅ ticket_messages (conversations)
✅ storage_items (file management)

-- Growth & Ads
✅ campaigns (Google + Meta Ads)
✅ campaign_performance (historical data)
✅ conversion_events (funnel tracking)

-- Agency Features
✅ agency_insights (recommendations)
✅ playbooks (action plans)
✅ insights (automated suggestions)

-- Admin CRM
✅ leads (sales pipeline)
✅ clients (user management - legacy, pode ser removido)
```

### ✅ Indexes Otimizados (70+)
```sql
-- Exemplos:
CREATE INDEX idx_analysis_requests_user_id ON analysis_requests(user_id);
CREATE INDEX idx_analysis_requests_status ON analysis_requests(status);
CREATE INDEX idx_performance_metrics_url_date ON performance_metrics(url, measured_at DESC);
CREATE INDEX idx_uptime_checks_url_date ON uptime_checks(url, checked_at DESC);
```

### ✅ RLS Policies (60+)
```sql
-- Tier-based access control
ALTER TABLE analysis_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own analysis"
  ON analysis_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Admin full access
CREATE POLICY "Admins have full access"
  ON user_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND tier = 'admin'
    )
  );
```

---

## 🔌 BACKEND LAYER STATUS

### ✅ O Que Existe

#### **1. Auth System**
```typescript
// src/lib/supabase/auth.ts
✅ signIn(credentials)
✅ signUp(credentials)
✅ signOut()
✅ getSession()
✅ getUser()
✅ updatePassword()
```

#### **2. Supabase Clients**
```typescript
// src/lib/supabase/client.ts
✅ createSupabaseBrowserClient() // Client-side
✅ getSupabaseClient() // Alias

// Missing:
❌ createSupabaseServerClient() // Server Actions
❌ createSupabaseAdminClient() // Admin operations
```

#### **3. API Routes (Public - No Auth)**
```typescript
// src/app/api/

✅ /api/domain/capture [POST]
   - Captura domínio para análise gratuita
   - Salva em domain_analysis_requests
   - Rate limit: 10 requests/hour
   
✅ /api/domain/validate [POST]
   - Valida formato de domínio
   - Verifica DNS/availability
   
✅ /api/lead-magnet [POST]
   - Captura leads (nome, email, empresa)
   - Webhook para n8n/Zapier
   
✅ /api/presignup [POST]
   - Pre-signup com token
   - Email verification flow
   
✅ /api/analytics [GET/POST]
   - Track pageviews, conversions
   - User journey mapping
```

#### **4. Legacy Services (CRM - Não usado no novo dashboard)**
```typescript
// src/lib/supabase/
✅ crm-service.ts (clients, leads, tasks)
✅ clients-service.ts (CRUD operations)
✅ leads-service.ts (sales pipeline)
✅ tasks-service.ts (task management)
⚠️ Nota: Estas tables (clients, leads, tasks) são do CRM antigo
   e NÃO mapeiam para o novo schema MVP V1.0
```

### ❌ O Que Está Faltando

#### **CRÍTICO 1: Server Actions para Dashboard**
```typescript
// ❌ src/app/dashboard/actions.ts (MISSING)

'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Analysis Actions
export async function getUserAnalyses() { }
export async function getAnalysisById(id: string) { }
export async function createAnalysisRequest(url: string) { }
export async function deleteAnalysis(id: string) { }

// Performance Actions
export async function getPerformanceMetrics(url: string) { }
export async function getARCOIndexHistory(days: number) { }

// Security Actions
export async function getSecurityScans(url: string) { }
export async function triggerSecurityScan(url: string) { }

// Domain Actions
export async function getDomainHealth(url: string) { }
export async function getSSLStatus(url: string) { }
export async function getDNSRecords(url: string) { }

// Uptime Actions
export async function getUptimeData(url: string, hours: number) { }
export async function getResponseTime(url: string, hours: number) { }

// Projects Actions
export async function getUserProjects() { }
export async function getProjectById(id: string) { }
export async function updateMilestone(id: string, completed: boolean) { }

// Support Actions
export async function getUserTickets() { }
export async function getTicketMessages(ticketId: string) { }
export async function sendTicketMessage(ticketId: string, content: string) { }
export async function createTicket(data: TicketData) { }

// Storage Actions
export async function getUserFiles() { }
export async function uploadFile(file: File) { }
export async function deleteFile(id: string) { }

// Campaigns Actions (Growth)
export async function getActiveCampaigns() { }
export async function getCampaignPerformance(id: string, days: number) { }
export async function getAnalyticsData(days: number) { }
```

#### **CRÍTICO 2: Data Services Layer**
```typescript
// ❌ src/lib/services/analysis.service.ts (MISSING)

import { createServerClient } from '@/lib/supabase/server'

export class AnalysisService {
  // Fetch user's analysis history
  async getUserAnalyses(userId: string) { }
  
  // Get detailed analysis result
  async getAnalysisResult(id: string) { }
  
  // Trigger new Lighthouse scan
  async requestAnalysis(userId: string, url: string) { }
  
  // Calculate ARCO Index
  async calculateARCOIndex(analysisId: string) { }
}

// ❌ src/lib/services/monitoring.service.ts (MISSING)

export class MonitoringService {
  // Performance monitoring
  async getPerformanceHistory(url: string, days: number) { }
  async recordPerformanceMetrics(url: string, metrics: CWV) { }
  
  // Uptime monitoring
  async getUptimeHistory(url: string, hours: number) { }
  async recordUptimeCheck(url: string, status: boolean) { }
  
  // Domain health
  async getDomainHealth(url: string) { }
  async checkSSLExpiration(url: string) { }
  async validateDNSRecords(url: string) { }
}

// ❌ src/lib/services/storage.service.ts (MISSING)

export class StorageService {
  // File management with quota enforcement
  async uploadFile(userId: string, file: File) { }
  async getUserFiles(userId: string) { }
  async deleteFile(fileId: string) { }
  async checkQuota(userId: string): Promise<{ used: number, limit: number }> { }
}

// ❌ src/lib/services/support.service.ts (MISSING)

export class SupportService {
  // Ticket system with Realtime
  async createTicket(userId: string, data: TicketData) { }
  async getUserTickets(userId: string) { }
  async sendMessage(ticketId: string, userId: string, content: string) { }
  async subscribeToTicket(ticketId: string, callback: Function) { }
}
```

#### **CRÍTICO 3: Background Jobs (Inngest)**
```typescript
// ❌ src/inngest/functions/lighthouse-scan.ts (MISSING)

import { inngest } from '../client'
import puppeteer from 'puppeteer'
import lighthouse from 'lighthouse'

export const lighthouseScan = inngest.createFunction(
  { id: 'lighthouse-scan' },
  { event: 'analysis/requested' },
  async ({ event, step }) => {
    const { url, analysisId } = event.data
    
    // Step 1: Launch browser
    const browser = await step.run('launch-browser', async () => {
      return await puppeteer.launch()
    })
    
    // Step 2: Run Lighthouse
    const result = await step.run('run-lighthouse', async () => {
      return await lighthouse(url, { port: browser.wsEndpoint().port })
    })
    
    // Step 3: Calculate ARCO Index
    const arcoIndex = await step.run('calculate-arco', async () => {
      return calculateARCOIndex(result.lhr)
    })
    
    // Step 4: Save results
    await step.run('save-results', async () => {
      await supabase.from('analysis_results').insert({
        analysis_id: analysisId,
        arco_index: arcoIndex,
        lighthouse_data: result.lhr,
        performance_score: result.lhr.categories.performance.score * 100,
        seo_score: result.lhr.categories.seo.score * 100,
        accessibility_score: result.lhr.categories.accessibility.score * 100,
      })
    })
  }
)

// ❌ src/inngest/functions/uptime-check.ts (MISSING)

export const uptimeCheck = inngest.createFunction(
  { id: 'uptime-check', cron: '*/5 * * * *' }, // Every 5 minutes
  async ({ step }) => {
    // Get all monitored URLs
    const urls = await step.run('get-urls', async () => {
      const { data } = await supabase
        .from('user_profiles')
        .select('primary_url')
        .eq('tier', 'paid')
      return data?.map(u => u.primary_url)
    })
    
    // Check each URL
    for (const url of urls) {
      await step.run(`check-${url}`, async () => {
        const start = Date.now()
        const isUp = await fetch(url).then(r => r.ok).catch(() => false)
        const responseTime = Date.now() - start
        
        await supabase.from('uptime_checks').insert({
          url,
          is_up: isUp,
          response_time_ms: responseTime,
          checked_at: new Date().toISOString(),
        })
      })
    }
  }
)

// ❌ src/inngest/functions/security-scan.ts (MISSING)
// ❌ src/inngest/functions/domain-check.ts (MISSING)
```

#### **CRÍTICO 4: Supabase Realtime Integration**
```typescript
// ❌ src/lib/realtime/uptime-monitor.ts (MISSING)

import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export function subscribeToUptimeUpdates(url: string, callback: Function) {
  const supabase = createSupabaseBrowserClient()
  
  return supabase
    .channel(`uptime:${url}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'uptime_checks',
        filter: `url=eq.${url}`,
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()
}

// ❌ src/lib/realtime/ticket-chat.ts (MISSING)

export function subscribeToTicketMessages(ticketId: string, callback: Function) {
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
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()
}
```

---

## 🚨 CRITICAL GAPS SUMMARY

| Gap | Impact | Effort | Priority |
|-----|--------|--------|----------|
| **Server Actions** | Dashboard 100% não funcional | 8h | P0 - BLOCKER |
| **Data Services** | Código duplicado sem services | 6h | P0 - BLOCKER |
| **Lighthouse Jobs** | Análises não executam | 12h | P0 - BLOCKER |
| **Monitoring Jobs** | Uptime/Security não monitoram | 8h | P1 - HIGH |
| **Realtime Chat** | Suporte não funciona em tempo real | 4h | P2 - MEDIUM |
| **Storage Upload** | File upload não processa | 6h | P2 - MEDIUM |

**Total Estimated Effort:** ~44 hours

---

## 🎯 RECOMMENDED IMPLEMENTATION ORDER

### **FASE 1: Dashboard Functional (P0 - 14h)**
1. ✅ Create `src/lib/supabase/server.ts` (Server Client)
2. ✅ Create `src/app/dashboard/actions.ts` (Server Actions)
3. ✅ Create `src/lib/services/*.service.ts` (Data Layer)
4. ✅ Replace mock data in all dashboard pages

### **FASE 2: Core Backend Services (P0 - 12h)**
5. ✅ Implement Lighthouse scan (Puppeteer + Lighthouse)
6. ✅ ARCO Index calculation algorithm
7. ✅ Create Inngest client + functions
8. ✅ Deploy Inngest jobs

### **FASE 3: Monitoring & Realtime (P1 - 12h)**
9. ✅ Uptime monitoring job (5-min cron)
10. ✅ Security scanning job (daily cron)
11. ✅ Domain health check job (daily cron)
12. ✅ Supabase Realtime subscriptions

### **FASE 4: Advanced Features (P2 - 10h)**
13. ✅ File upload with Supabase Storage
14. ✅ Quota enforcement system
15. ✅ Rate limiting with Upstash Redis
16. ✅ Realtime ticket chat

---

## ✅ WHAT'S WORKING

### Auth Flow
```typescript
// ✅ Fully functional
- Sign up with email verification
- Sign in with password
- Password reset flow
- Session management
- Protected routes middleware
```

### Public APIs
```typescript
// ✅ No dependencies on dashboard
- Domain capture for lead magnet
- Domain validation
- Analytics tracking
- Pre-signup flow
```

### Database
```typescript
// ✅ Production-ready
- 21 tables with optimized indexes
- 60+ RLS policies (tier-based access)
- Triggers for audit log, updated_at
- Helper functions for user management
```

---

## 📦 MISSING DEPENDENCIES

### NPM Packages Needed
```json
{
  "dependencies": {
    "inngest": "^3.x", // ❌ Missing - Background jobs
    "puppeteer": "^21.x", // ❌ Missing - Lighthouse browser
    "lighthouse": "^11.x", // ❌ Missing - Performance audits
    "@upstash/redis": "^1.x", // ❌ Missing - Rate limiting
    "zod": "^3.x" // ✅ Already installed
  }
}
```

### Environment Variables Needed
```bash
# ✅ Existing
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ❌ Missing
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 🔐 SECURITY VALIDATION

### ✅ Strong Points
- RLS policies enforce tier-based access
- Admin-only operations protected
- Audit log tracks all changes
- Password hashing via Supabase Auth
- API rate limiting on public endpoints

### ⚠️ Potential Issues
- Missing rate limiting on authenticated endpoints
- No quota enforcement yet (storage, analyses)
- Server Actions não validam tier antes de executar
- Falta input validation com Zod em algumas routes

---

## 📝 NEXT IMMEDIATE ACTIONS

### 1. Create Server Client (30 min)
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### 2. Create Server Actions (4h)
```typescript
// src/app/dashboard/actions.ts
'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getUserAnalyses() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Unauthorized')
  
  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      *,
      analysis_results (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// ... mais 15-20 actions
```

### 3. Replace Mock Data (2h)
```typescript
// src/app/dashboard/diagnostico/page.tsx
- const mockAnalyses = [ ... ] // Remove
+ const analyses = await getUserAnalyses() // Add
```

---

## 🎯 SUCCESS CRITERIA

### Definition of Done
- [ ] All dashboard pages fetch real data from Supabase
- [ ] Users can request Lighthouse analysis (queued, not instant)
- [ ] Uptime monitoring runs every 5 minutes for paid users
- [ ] Security scans run daily
- [ ] File upload respects 10GB quota for paid users
- [ ] Support tickets have real-time chat
- [ ] Rate limiting prevents abuse (3 analyses/day for free users)
- [ ] All Server Actions validate user tier before execution

---

**Status:** ⚠️ **Backend 50% complete - Database ready, services layer missing**  
**Blocker:** Dashboard não funcional (100% mock data, sem Server Actions)  
**ETA:** 44 hours (~5-6 dias de trabalho)

