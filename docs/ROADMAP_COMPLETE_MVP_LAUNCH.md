# 🗺️ Roadmap Completo: ARCO MVP → Launch

## 📋 Índice
1. [Categorização de Prioridades](#prioridades)
2. [Pendências Mapeadas](#pendências)
3. [Stack Tecnológico](#stack)
4. [Features: Free vs Pro](#features)
5. [Integrações Pendentes](#integrações)
6. [UI/UX Improvements](#uiux)

---

## 🎯 Prioridades (Tier System)

### **P0 - BLOCKER** 🔴
**Sem isso, produto não funciona. Prioridade absoluta.**
- Produto não entrega valor
- Usuários não conseguem usar features principais
- Revenue: $0

### **P1 - CRITICAL** 🟠  
**Completa funcionalidades core prometidas.**
- Produto funciona mas incompleto
- Afeta diferenciação competitiva
- Revenue impactado (-30%)

### **P2 - IMPORTANT** 🟡
**Melhora UX, reduz churn, aumenta conversão.**
- Produto funcional mas experiência não ideal
- Afeta satisfação e retenção
- Revenue impactado (-10%)

### **P3 - NICE-TO-HAVE** 🟢
**Polish, otimizações, features secundárias.**
- Produto completo
- Melhora marginal em métricas
- Revenue: impacto mínimo

---

## 📝 Pendências Mapeadas

### 🔴 **P0 - BLOCKER (Sprint 1: 8-10h)**

#### **A. Integração Dashboard → Backend (8h)**
**Status:** 0% (100% mock data atualmente)  
**Impacto:** Produto não funciona, zero valor entregue

| Página | Mock Data Atual | Integração Necessária | Estimativa |
|--------|-----------------|----------------------|------------|
| `/diagnostico` | mockAnalyses[] | `getUserAnalyses()` | 1h |
| `/diagnostico/[id]` | mockAnalysis{} | `getAnalysisById(id)` | 1h |
| `/plano-de-acao` | mockPlaybooks[] | `getPlaybooks()` | 1h |
| `/overview` | mockARCOHistory[] | `getARCOIndexHistory(7)` | 1h |
| `/saude` | mockPerformance{} | `getPerformanceMetrics()` + `getUptimeData()` | 1.5h |
| `/operacoes` | mockProjects[] | `getUserProjects()` + `getUserTickets()` + `getUserFiles()` | 2h |
| Error Handling | Inexistente | Loading/Error states em todas páginas | 0.5h |

**Implementação:**
```typescript
// ❌ ANTES
const mockAnalyses = [
  { id: '1', url: 'exemplo.com', arco_index: 85 }
]

// ✅ DEPOIS
import { getUserAnalyses } from '@/app/dashboard/actions'

export default async function Page() {
  const analyses = await getUserAnalyses()
  
  if (!analyses) return <ErrorState />
  if (analyses.length === 0) return <EmptyState />
  
  return <AnalysesList data={analyses} />
}
```

**Critérios de Aceitação:**
- [x] Server Actions já criadas (~400 linhas)
- [ ] Todas 6 páginas consumindo dados reais
- [ ] Loading states (Skeleton UI)
- [ ] Error boundaries com retry
- [ ] Empty states com CTAs

---

#### **B. Tier Validation no Frontend (2h)**
**Status:** Server Actions têm validação, frontend não mostra feedback

**Implementação:**
```typescript
// src/components/dashboard/tier-gate.tsx
export function TierGate({ 
  feature, 
  tier = 'paid',
  children 
}: {
  feature: string
  tier?: 'free' | 'paid'
  children: React.ReactNode
}) {
  const { user } = useUser()
  
  if (user?.profile.tier !== tier && tier === 'paid') {
    return (
      <UpgradePrompt 
        feature={feature}
        message={`Upgrade para Pro para acessar ${feature}`}
      />
    )
  }
  
  return <>{children}</>
}

// Uso:
<TierGate feature="Uptime Monitoring" tier="paid">
  <UptimeChart data={uptimeData} />
</TierGate>
```

**Features a Proteger (Paid Only):**
- Uptime Monitoring 24/7
- Performance Metrics históricos (>7 dias)
- Security Scans
- Domain Health
- Unlimited analyses (free = 3/mês)
- Priority Support

---

### 🟠 **P1 - CRITICAL (Sprint 2: 6-8h)**

#### **A. Edge Functions Faltantes (6h)**

**1. `security-scan` (3h)**
```typescript
// supabase/functions/security-scan/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { url } = await req.json()
  const supabase = createClient(...)
  
  // 1. Check SSL Certificate
  const ssl = await checkSSL(url) // tls.connect()
  
  // 2. Check Security Headers
  const response = await fetch(url)
  const headers = {
    hsts: response.headers.get('strict-transport-security'),
    csp: response.headers.get('content-security-policy'),
    xframe: response.headers.get('x-frame-options'),
    xcontent: response.headers.get('x-content-type-options')
  }
  
  // 3. Calculate Security Score
  const score = calculateSecurityScore(ssl, headers)
  
  // 4. Save results
  await supabase.from('security_scans').update({
    ssl_valid: ssl.valid,
    ssl_expires_at: ssl.expiresAt,
    security_headers: headers,
    security_score: score,
    status: 'completed'
  }).eq('url', url)
  
  return new Response(JSON.stringify({ success: true, score }))
})

function calculateSecurityScore(ssl, headers) {
  let score = 0
  if (ssl.valid) score += 30
  if (headers.hsts) score += 20
  if (headers.csp) score += 20
  if (headers.xframe) score += 15
  if (headers.xcontent) score += 15
  return score // 0-100
}
```

**Dependências (Deno):**
- `node:tls` (SSL check)
- `@supabase/supabase-js` (database)

**Deploy:**
```bash
npx supabase functions deploy security-scan
```

---

**2. `domain-health` (3h)**
```typescript
// supabase/functions/domain-health/index.ts
import * as dns from 'https://deno.land/std@0.168.0/node/dns/promises.ts'

serve(async (req) => {
  const { url } = await req.json()
  const domain = new URL(url).hostname
  
  // 1. DNS Records
  const [a, mx, txt] = await Promise.all([
    dns.resolve4(domain).catch(() => []),
    dns.resolveMx(domain).catch(() => []),
    dns.resolveTxt(domain).catch(() => [])
  ])
  
  // 2. Blacklist Check (Google Safe Browsing API)
  const blacklisted = await checkBlacklist(domain)
  
  // 3. SSL Expiry (reuse from security-scan)
  const ssl = await checkSSL(url)
  
  // 4. Save results
  await supabase.from('domain_monitoring').update({
    dns_records: { a, mx, txt },
    blacklist_status: blacklisted ? 'blacklisted' : 'clean',
    ssl_expires_at: ssl.expiresAt,
    last_checked: new Date().toISOString()
  }).eq('url', url)
})

async function checkBlacklist(domain: string) {
  // Google Safe Browsing API (FREE - 10k requests/dia)
  const apiKey = Deno.env.get('GOOGLE_SAFE_BROWSING_KEY')
  const response = await fetch(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        client: { clientId: 'arco', clientVersion: '1.0' },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url: domain }]
        }
      })
    }
  )
  
  const data = await response.json()
  return data.matches && data.matches.length > 0
}
```

**APIs Externas (Gratuitas):**
- ✅ Google Safe Browsing API (10k requests/dia)
- ✅ DNS lookups (nativo Deno)

**Deploy:**
```bash
npx supabase functions deploy domain-health
```

---

#### **B. Atualizar pg_cron para Chamar Edge Functions (1h)**

```sql
-- supabase/migrations/20250106000000_call_edge_functions.sql

-- Atualizar check_security() para chamar Edge Function
CREATE OR REPLACE FUNCTION check_security()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_url TEXT;
  request_id BIGINT;
BEGIN
  FOR target_url IN
    SELECT DISTINCT ar.url
    FROM analysis_requests ar
    JOIN user_profiles up ON ar.user_id = up.id
    WHERE up.tier IN ('paid', 'admin')
  LOOP
    -- Insert pending scan
    INSERT INTO security_scans (url, scan_type, status, scanned_at)
    VALUES (target_url, 'ssl_headers', 'pending', now())
    ON CONFLICT (url, DATE(scanned_at)) DO NOTHING;
    
    -- Trigger Edge Function
    SELECT INTO request_id net.http_post(
      url := 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/security-scan',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('SUPABASE_ANON_KEY', false)
      ),
      body := jsonb_build_object('url', target_url)
    );
  END LOOP;
END;
$$;

-- Similar para check_domain_health()
-- ...
```

---

### 🟡 **P2 - IMPORTANT (Sprint 3: 6-8h)**

#### **A. Supabase Realtime (4h)**
**Impacto:** UX premium - auto-update sem polling

**Implementação:**
```typescript
// src/lib/hooks/use-analysis-realtime.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useAnalysisRealtime(analysisId: string) {
  const [status, setStatus] = useState<'pending' | 'running' | 'completed' | 'failed'>('pending')
  const [arcoIndex, setArcoIndex] = useState<number | null>(null)
  
  useEffect(() => {
    const supabase = createClient()
    
    const channel = supabase
      .channel(`analysis:${analysisId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'analysis_requests',
        filter: `id=eq.${analysisId}`
      }, (payload) => {
        setStatus(payload.new.status)
        setArcoIndex(payload.new.arco_index)
      })
      .subscribe()
    
    return () => { supabase.removeChannel(channel) }
  }, [analysisId])
  
  return { status, arcoIndex }
}

// Uso:
function AnalysisCard({ id }) {
  const { status, arcoIndex } = useAnalysisRealtime(id)
  
  return (
    <Card>
      <StatusBadge status={status} />
      {status === 'running' && <Spinner />}
      {status === 'completed' && <ARCOBadge value={arcoIndex} />}
    </Card>
  )
}
```

**Benefícios:**
- ✅ Zero polling (reduz database load)
- ✅ UX feels "mágica" - atualiza sozinho
- ✅ Aumenta engagement (usuário fica na página)

---

#### **B. Loading & Error States (2h)**

**Componentes Reusáveis:**
```typescript
// src/components/dashboard/loading-skeletons.tsx
export function AnalysisCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-48" />
    </Card>
  )
}

// src/components/dashboard/error-display.tsx
export function ErrorDisplay({ 
  error, 
  retry 
}: { 
  error: Error
  retry?: () => void 
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      {retry && (
        <Button onClick={retry} variant="outline" size="sm">
          Tentar Novamente
        </Button>
      )}
    </Alert>
  )
}

// Uso em páginas:
export default async function DiagnosticoPage() {
  const analyses = await getUserAnalyses().catch((err) => {
    return <ErrorDisplay error={err} retry={() => window.location.reload()} />
  })
  
  return (
    <Suspense fallback={<AnalysisCardSkeleton />}>
      <AnalysesList data={analyses} />
    </Suspense>
  )
}
```

---

#### **C. Toast Notifications (2h)**

**Setup:**
```bash
pnpm add sonner # Biblioteca de toasts moderna
```

```typescript
// src/components/providers/toast-provider.tsx
'use client'
import { Toaster } from 'sonner'

export function ToastProvider() {
  return <Toaster position="top-right" />
}

// src/app/layout.tsx
import { ToastProvider } from '@/components/providers/toast-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}

// Uso em Server Actions:
'use server'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'

export async function createAnalysisRequest(url: string) {
  try {
    const analysis = await supabase.from('analysis_requests').insert(...)
    
    revalidatePath('/dashboard/diagnostico')
    
    // Toast será mostrado no frontend
    return { success: true, data: analysis }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Frontend:
async function handleSubmit() {
  const result = await createAnalysisRequest(url)
  
  if (result.success) {
    toast.success('Análise iniciada! Aguarde ~30 segundos.')
  } else {
    toast.error(result.error)
  }
}
```

---

### 🟢 **P3 - NICE-TO-HAVE (Sprint 4: 4-6h)**

#### **A. Cache de Análises (2h)**
**Impacto:** Reduz Edge Function invocations, acelera UX

```typescript
// src/app/dashboard/actions.ts
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 7 dias

export async function createAnalysisRequest(url: string) {
  const supabase = await createSupabaseServer()
  const user = await getCurrentUser()
  
  // Check cache first
  const { data: cached } = await supabase
    .from('analysis_requests')
    .select('*, analysis_results(*)')
    .eq('url', url)
    .eq('status', 'completed')
    .gte('created_at', new Date(Date.now() - CACHE_TTL).toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  
  if (cached) {
    // Retornar análise cacheada
    return {
      ...cached,
      cached: true,
      cache_expires_at: new Date(
        new Date(cached.created_at).getTime() + CACHE_TTL
      )
    }
  }
  
  // Senão, criar nova análise
  const { data } = await supabase
    .from('analysis_requests')
    .insert({ url, user_id: user.id, status: 'pending' })
    .select()
    .single()
  
  return data
}
```

**Badge no Frontend:**
```typescript
{analysis.cached && (
  <Badge variant="secondary">
    📦 Cached • Expira em {formatDistance(analysis.cache_expires_at)}
  </Badge>
)}
```

---

#### **B. Admin Dashboard (4h)**
**Para monitorar usage e evitar estourar Free Tier**

```typescript
// src/app/admin/usage/page.tsx (só para user_type = 'admin')
import { UsageCard } from '@/components/admin/usage-card'

export default async function AdminUsagePage() {
  // Buscar métricas agregadas
  const stats = {
    totalUsers: await supabase.from('user_profiles').select('id', { count: 'exact' }),
    totalAnalyses: await supabase.from('analysis_requests').select('id', { count: 'exact' }),
    edgeFunctionInvocations: await getSupabaseUsage('func_invocations'),
    databaseEgress: await getSupabaseUsage('db_egress_bytes'),
    storageUsed: await getSupabaseUsage('storage_bytes')
  }
  
  return (
    <div className="grid gap-6">
      <UsageCard
        title="Database Egress"
        current={stats.databaseEgress}
        limit={5_000_000_000} // 5 GB
        unit="GB"
        alert={stats.databaseEgress > 4_000_000_000} // 80%
      />
      <UsageCard
        title="Edge Functions"
        current={stats.edgeFunctionInvocations}
        limit={500_000}
        unit="calls"
      />
      {/* ... */}
    </div>
  )
}

async function getSupabaseUsage(metric: string) {
  // Supabase Management API
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${process.env.SUPABASE_PROJECT_REF}/usage`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  )
  const data = await response.json()
  return data[metric]
}
```

---

## 🛠️ Stack Tecnológico (Open Source & Freemium)

### **Core Stack (Já Implementado)**
| Tecnologia | Versão | Licença | Custo | Uso |
|------------|--------|---------|-------|-----|
| Next.js | 15.1.3 | MIT | Free | Frontend + SSR |
| React | 19.0.0 | MIT | Free | UI Library |
| TypeScript | 5.9.2 | Apache 2.0 | Free | Type Safety |
| Supabase | Cloud | Apache 2.0 | $0-25/mês | BaaS |
| TailwindCSS | 3.x | MIT | Free | Styling |
| shadcn/ui | Latest | MIT | Free | Component Library |

### **Bibliotecas Adicionais (Recomendadas)**

#### **UI/UX Enhancement**
```bash
# Toast notifications
pnpm add sonner # MIT License, Free
# https://sonner.emilkowal.ski/

# Charts & Graphs
pnpm add recharts # MIT License, Free
# Alternativa: tremor (mais bonito, também MIT)
pnpm add @tremor/react

# Date utilities
pnpm add date-fns # MIT License, Free

# Icons
# (já instalado) lucide-react # ISC License, Free

# Copy to clipboard
pnpm add react-hot-toast # MIT License
```

#### **Forms & Validation**
```bash
# (já instalado) react-hook-form # MIT License
# (já instalado) zod # MIT License

# File uploads
pnpm add react-dropzone # MIT License
```

#### **Data Fetching & State**
```bash
# Server State (opcional, só se precisar de cache sofisticado)
pnpm add @tanstack/react-query # MIT License, Free

# Client State (só se precisar de global state complexo)
pnpm add zustand # MIT License, Free
```

#### **Monitoring & Analytics (Gratuitas)**
```bash
# Error tracking
# Sentry - FREE até 5k events/mês
pnpm add @sentry/nextjs

# Analytics
# Vercel Analytics - FREE no Hobby plan
pnpm add @vercel/analytics

# Performance monitoring
# Vercel Speed Insights - FREE
pnpm add @vercel/speed-insights
```

---

### **APIs Externas (Freemium)**

| Serviço | Free Tier | Uso | Link |
|---------|-----------|-----|------|
| **PageSpeed Insights API** | 25k requests/dia | Lighthouse scans | [Google PageSpeed](https://developers.google.com/speed/docs/insights/v5/get-started) |
| **Google Safe Browsing** | 10k requests/dia | Blacklist check | [Safe Browsing API](https://developers.google.com/safe-browsing/v4) |
| **UpDown.io** | 50 checks grátis | Uptime monitoring backup | [UpDown](https://updown.io/) |
| **Cal.com** | Self-hosted free | Agendamento | [Cal.com](https://cal.com/) |
| **Resend** | 3k emails/mês | Transactional emails | [Resend](https://resend.com/) |
| **Stripe** | 0% até $1M | Pagamentos | [Stripe](https://stripe.com/) |

---

### **DevOps & Deployment**

| Ferramenta | Free Tier | Uso |
|------------|-----------|-----|
| **Vercel** | 100 GB bandwidth/mês | Hosting Next.js |
| **GitHub** | Ilimitado público | Version control |
| **GitHub Actions** | 2000 min/mês | CI/CD |
| **Cloudflare** | Ilimitado | DNS + CDN |

---

## 🎁 Features: Free vs Pro

### **📊 Matriz de Features**

| Feature | Free | Pro ($97/mês) | Diferenciação |
|---------|------|---------------|---------------|
| **Análises ARCO** | 3/mês | Ilimitado | 💎 Core monetization |
| **ARCO Index** | ✅ | ✅ | Métrica proprietária |
| **Lighthouse Scores** | ✅ | ✅ | Performance, SEO, A11y, Security |
| **Core Web Vitals** | ✅ | ✅ | LCP, FID, CLS |
| **Playbooks** | ✅ Básicos | ✅ Avançados + Priorização | Maior valor para Pro |
| **Uptime Monitoring** | ❌ | ✅ 24/7 (5min) | 💎 Diferenciador |
| **Performance History** | ❌ | ✅ 90 dias | Trends ao longo do tempo |
| **Security Scans** | ❌ | ✅ Diário | SSL + Headers |
| **Domain Health** | ❌ | ✅ Diário | DNS + Blacklist |
| **Storage** | 0 GB | 10 GB | Arquivos de suporte |
| **Support** | Email (72h) | Chat + Tickets (4h) | SLA premium |
| **Projetos** | 1 | Ilimitado | Múltiplos sites |
| **API Access** | ❌ | ✅ | Integrações custom |

---

### **🎯 Estratégia de Diferenciação**

#### **Free Tier: Foco em Aquisição**
**Objetivo:** Demonstrar valor do ARCO Index, gerar leads qualificados

**Features Estratégicas:**
- ✅ **3 análises/mês:** Suficiente para testar valor
- ✅ **ARCO Index:** Métrica proprietária que vicia
- ✅ **Playbooks básicos:** Mostra potencial de melhoria
- ❌ **Sem monitoring:** Cria "dor" → motiva upgrade

**Fluxo de Conversão:**
```
Usuário solicita 3ª análise → Vê resultado positivo
→ Quer analisar mais URLs → Trava com "Quota exceeded"
→ Banner: "Upgrade para Pro e ganhe análise grátis agora!"
→ Conversão: 5-10% (benchmark SaaS)
```

---

#### **Pro Tier: Foco em Retenção**
**Objetivo:** Entregar valor recorrente que justifica $97/mês

**Features Estratégicas:**
- ✅ **Unlimited analyses:** Zero friction
- ✅ **Uptime monitoring 24/7:** Valor passivo (roda sozinho)
- ✅ **90-day history:** Insights de longo prazo
- ✅ **Priority support:** Reduz churn (respostas rápidas)

**Cálculo de Valor Percebido:**
```
Uptime monitoring (UptimeRobot): $15/mês
SSL monitoring (Qualys): $0 (manual)
Performance tracking (GTmetrix): $10/mês
SEO audit (Semrush): $120/mês (overkill)

ARCO all-in-one: $97/mês
Valor percebido: ~$150/mês
Savings: $53/mês (35% de desconto)
```

---

### **💡 Upsells Futuros**

| Add-on | Preço | Descrição |
|--------|-------|-----------|
| **+10 GB Storage** | +$10/mês | Para agências com muitos clientes |
| **White-label** | +$100/mês | Remove branding ARCO |
| **API Premium** | +$50/mês | 10k requests/dia (vs 1k grátis) |
| **Historical Data** | +$20/mês | Dados >90 dias (até 2 anos) |
| **Dedicated Support** | +$200/mês | Account manager dedicado |

---

## 🔗 Integrações Pendentes

### **P1 - Webhooks Outbound (4h)**
**Permitir usuários receberem notificações em tempo real**

```typescript
// src/app/dashboard/settings/webhooks/page.tsx
export default function WebhooksSettings() {
  return (
    <div>
      <h2>Webhooks</h2>
      <p>Receba notificações quando análises forem concluídas</p>
      
      <WebhookForm />
      
      <WebhooksList />
    </div>
  )
}

// Backend: Trigger webhook quando análise completar
// supabase/migrations/20250106100000_webhook_outbound.sql
CREATE OR REPLACE FUNCTION notify_webhook_subscribers()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  webhook_url TEXT;
BEGIN
  -- Buscar webhook URL do usuário
  SELECT webhook_url INTO webhook_url
  FROM user_profiles
  WHERE id = NEW.user_id;
  
  IF webhook_url IS NOT NULL THEN
    -- Enviar POST para webhook do usuário
    PERFORM net.http_post(
      url := webhook_url,
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body := jsonb_build_object(
        'event', 'analysis.completed',
        'analysis_id', NEW.id,
        'url', NEW.url,
        'arco_index', NEW.arco_index,
        'timestamp', now()
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_analysis_completed
AFTER UPDATE ON analysis_requests
FOR EACH ROW
WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
EXECUTE FUNCTION notify_webhook_subscribers();
```

---

### **P2 - Email Notifications (Resend - 3h)**

**Setup:**
```bash
pnpm add resend # MIT License
```

```typescript
// src/lib/email/resend.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAnalysisCompleteEmail({
  to,
  analysisUrl,
  arcoIndex
}: {
  to: string
  analysisUrl: string
  arcoIndex: number
}) {
  await resend.emails.send({
    from: 'ARCO <noreply@arco.com.br>',
    to,
    subject: `Análise concluída: ARCO Index ${arcoIndex}`,
    html: `
      <h1>Sua análise está pronta!</h1>
      <p>ARCO Index: <strong>${arcoIndex}</strong></p>
      <a href="https://arco.com.br/dashboard/diagnostico/${analysisUrl}">
        Ver Resultados
      </a>
    `
  })
}

// Trigger: Edge Function lighthouse-scan chama após salvar resultado
await sendAnalysisCompleteEmail({
  to: user.email,
  analysisUrl: analysis.id,
  arcoIndex: analysis.arco_index
})
```

**Free Tier Resend:**
- ✅ 3.000 emails/mês grátis
- ✅ Domínio custom (arco.com.br)
- ✅ 100% deliverability (melhor que SendGrid)

---

### **P3 - Cal.com Integration (2h)**

**Para agendar calls de onboarding/suporte**

```typescript
// src/app/dashboard/agendamento/page.tsx
export default function AgendamentoPage() {
  return (
    <div>
      <h1>Agendar Consultoria</h1>
      <p>Fale com um especialista ARCO</p>
      
      {/* Embed Cal.com */}
      <Cal
        calLink="arco/consultoria"
        config={{
          name: "Consultoria ARCO",
          theme: "light"
        }}
      />
    </div>
  )
}
```

**Cal.com:**
- ✅ Self-hosted = FREE (Vercel deploy)
- ✅ Google Calendar sync
- ✅ Zoom integration

---

## 🎨 UI/UX Improvements (Já Implementadas + Pendentes)

### ✅ **Já Implementadas**

#### **Design System**
- ✅ shadcn/ui components (40+ componentes)
- ✅ Tailwind configurado (design tokens)
- ✅ Dark mode ready (via next-themes)
- ✅ Responsive breakpoints (mobile-first)

#### **Dashboard Structure**
- ✅ Sidebar navigation com tier badges
- ✅ UserMenu com avatar + logout
- ✅ TierBadge (Free/Pro badges)
- ✅ 10 páginas criadas (100% mock data)

---

### 🔄 **Pendentes - Sprint de Polish**

#### **A. Empty States (1h)**
```typescript
// src/components/dashboard/empty-states.tsx
export function EmptyAnalyses() {
  return (
    <div className="text-center py-12">
      <ChartBarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Nenhuma análise ainda</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Comece analisando seu primeiro site
      </p>
      <Button className="mt-4">
        Nova Análise
      </Button>
    </div>
  )
}
```

**Aplicar em:**
- `/diagnostico` (sem análises)
- `/operacoes` (sem projetos/tickets/files)
- `/plano-de-acao` (sem playbooks aplicáveis)

---

#### **B. Onboarding Flow (2h)**
**First-time user experience**

```typescript
// src/app/dashboard/onboarding/page.tsx
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  
  return (
    <div>
      <Progress value={(step / 3) * 100} />
      
      {step === 1 && <WelcomeStep />}
      {step === 2 && <AddSiteStep />}
      {step === 3 && <FirstAnalysisStep />}
      
      <Button onClick={() => setStep(step + 1)}>
        Próximo
      </Button>
    </div>
  )
}

// Redirecionar após signup
// src/app/auth/signup/page.tsx
if (success) {
  router.push('/dashboard/onboarding')
}
```

**Steps:**
1. Bem-vindo ao ARCO
2. Adicione seu primeiro site
3. Inicie sua primeira análise

---

#### **C. Micro-interactions (1h)**
**Feedback visual imediato**

```typescript
// Botão com loading state
<Button
  onClick={handleAnalyze}
  disabled={isLoading}
>
  {isLoading && <Spinner className="mr-2" />}
  Analisar Site
</Button>

// Card hover effects
<Card className="hover:shadow-lg transition-shadow cursor-pointer">
  ...
</Card>

// Badge animations
<Badge className="animate-pulse">
  Em Processamento
</Badge>
```

---

#### **D. Charts & Visualizations (3h)**

**Performance Trends:**
```typescript
// src/components/dashboard/performance-chart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export function PerformanceChart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="arco_index" stroke="#8884d8" />
    </LineChart>
  )
}
```

**Uptime Monitoring:**
```typescript
// Heatmap de uptime (último 30 dias)
export function UptimeHeatmap({ data }) {
  return (
    <div className="grid grid-cols-30 gap-1">
      {data.map((day) => (
        <Tooltip content={`${day.date}: ${day.uptime}%`}>
          <div
            className={cn(
              "h-4 w-4 rounded",
              day.uptime > 99 ? "bg-green-500" :
              day.uptime > 95 ? "bg-yellow-500" :
              "bg-red-500"
            )}
          />
        </Tooltip>
      ))}
    </div>
  )
}
```

---

## ✅ Checklist Final (Para Launch)

### **Funcionalidades Core**
- [ ] Dashboard integrado (6 páginas com dados reais)
- [ ] Server Actions funcionando (18+ actions)
- [ ] Edge Function lighthouse-scan (deployed)
- [ ] Edge Function security-scan (deployed)
- [ ] Edge Function domain-health (deployed)
- [ ] pg_cron jobs ativos (uptime/security/domain)
- [ ] Tier validation (free vs paid features)
- [ ] Quota enforcement (3 análises/mês free)

### **UX/Polish**
- [ ] Loading states (Skeleton UI)
- [ ] Error boundaries com retry
- [ ] Empty states com CTAs
- [ ] Toast notifications
- [ ] Realtime updates (análises)
- [ ] Onboarding flow

### **Monitoring & Ops**
- [ ] Admin dashboard (usage tracking)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Vercel Analytics)
- [ ] Webhook outbound (notificações)
- [ ] Email notifications (Resend)

### **Documentação**
- [x] Supabase Free Tier analysis
- [x] Roadmap completo
- [ ] API documentation (para Pro users)
- [ ] User guides (help center)

---

## 🎯 Resumo Executivo

### **Status Atual**
- ✅ Infraestrutura: 90% completa
- 🟡 Funcionalidades: 60% completas (lighthouse-scan OK, security/domain pendentes)
- 🔴 Integração: 0% (dashboard 100% mock)

### **Para Launch (Sprint 1-3: ~20h)**
1. **Sprint 1 (8h):** Integrar dashboard → backend
2. **Sprint 2 (6h):** Completar Edge Functions (security + domain)
3. **Sprint 3 (6h):** Polish UX (realtime + toast + errors)

### **Pós-Launch (Sprint 4+)**
4. **Sprint 4 (4h):** Webhooks + Email notifications
5. **Sprint 5 (2h):** Onboarding flow
6. **Sprint 6 (4h):** Admin dashboard + monitoring

---

## 💰 Custo Total (6 meses)

| Item | Custo |
|------|-------|
| Supabase | $0 (Free Tier até 50 clientes) |
| Vercel | $0 (Hobby plan) |
| Domain | $12/ano |
| APIs Externas | $0 (Free tiers) |
| **TOTAL** | **$1/mês** ✅ |

**Break-even:** 1 cliente pago ($97/mês)

**Target 6 meses:** 50 clientes pagos = $4.850 MRR

---

**🚀 Próxima ação:** Começar Sprint 1 - Integração do dashboard com backend real.
