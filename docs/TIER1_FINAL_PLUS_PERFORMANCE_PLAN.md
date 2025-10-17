# 🎯 TIER 1 FINAL + PERFORMANCE ANALYSIS - Plano de Implementação

**Data:** 8 de outubro de 2025  
**Objetivo:** Finalizar TIER 1 + Implementar análise de performance completa

---

## ✅ O QUE JÁ TEMOS (Infraestrutura Existente)

### 1. **Backend & Database** ✅
```sql
-- Tabelas já criadas:
✅ analysis_requests (URL, status, user_id, arco_index)
✅ analysis_results (LCP, FID, CLS, Lighthouse scores, raw_data JSONB)
✅ domain_validations (Cache de validações)
✅ leads (Captura de leads)
```

### 2. **APIs & Integr ações** ✅
```typescript
✅ PageSpeed Insights API (Google)
✅ CrUX API (Chrome User Experience Report)
✅ Lighthouse (via Edge Function: supabase/functions/lighthouse-scan)
✅ Web Vitals Analyzer (mcp/core/web-vitals-analyzer.ts)
✅ Resend (Email delivery)
```

### 3. **Components** ✅
```
✅ WebVitalsMonitor.tsx
✅ Dashboard /diagnostico/[id] (já renderiza Lighthouse + CWV)
✅ Performance metrics display
```

---

## 🚀 IMPLEMENTAÇÃO - FASE 1: TIER 1 FINAL (30min)

### Step 1.1: Verificar Resend

```bash
npx tsx scripts/verify-resend.ts
```

Se falhar, configurar:
1. Criar conta em https://resend.com
2. Gerar API key
3. Adicionar em `.env.local`: `RESEND_API_KEY=re_...`

### Step 1.2: Testar Lead Magnet End-to-End

```bash
curl -X POST http://localhost:3000/api/lead-magnet \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Final","email":"seu-email@real.com","company":"ARCO","phone":"11999999999"}'
```

Verificar:
- ✅ Lead salvo no Supabase
- ✅ Email recebido (check inbox)
- ✅ PDF download funciona

---

## 🎯 IMPLEMENTAÇÃO - FASE 2: PERFORMANCE API (2-3h)

### Step 2.1: Criar API `/api/performance/analyze`

**Arquivo:** `src/app/api/performance/analyze/route.ts`

**Funcionalidade:**
1. Recebe URL
2. Chama PageSpeed Insights API (Google)
3. Extrai Lighthouse scores + Core Web Vitals + CrUX
4. Calcula ARCO Index
5. Salva em `analysis_results`
6. Retorna JSON

**Schema de Request:**
```typescript
POST /api/performance/analyze
{
  url: string                    // Required
  user_id?: string               // Optional (se logado)
  strategy?: 'mobile' | 'desktop' // Default: mobile
  save_history?: boolean         // Default: true
}
```

**Schema de Response:**
```typescript
{
  success: boolean
  data: {
    arco_index: number           // 0-100 (weighted average)
    lighthouse: {
      performance: number        // 0-100
      accessibility: number
      seo: number
      best_practices: number
    }
    core_web_vitals: {
      lcp: number                // milliseconds
      fid: number
      cls: number                // score
      fcp: number
      ttfb: number
    }
    crux_data?: {                // Real user metrics (28 days)
      lcp_p75: number
      fid_p75: number
      cls_p75: number
      overall_category: string
    }
    opportunities: Array<{       // Top 10 optimization suggestions
      id: string
      title: string
      description: string
      savings_ms: number
      impact: 'high' | 'medium' | 'low'
    }>
    analysis_id: string          // UUID para consultar depois
  }
  message: string
}
```

### Step 2.2: Implementação da API

Vou criar o arquivo completo agora.

### Step 2.3: Teste da API

```bash
# Test 1: Google.com (deve ser rápido, bem otimizado)
curl -X POST http://localhost:3000/api/performance/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'

# Test 2: Site lento (exemplo)
curl -X POST http://localhost:3000/api/performance/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example-slow-site.com"}'

# Test 3: Com user_id (salva histórico)
curl -X POST http://localhost:3000/api/performance/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://arco.dev","user_id":"<UUID>","save_history":true}'
```

---

## 🎯 IMPLEMENTAÇÃO - FASE 3: DASHBOARD INTEGRATION (2-3h)

### Step 3.1: Componente `PerformanceResults`

**Arquivo:** `src/components/performance/PerformanceResults.tsx`

**Props:**
```typescript
interface PerformanceResultsProps {
  analysisId: string
  showHistory?: boolean
}
```

**Funcionalidade:**
- Fetch analysis_results by ID
- Display:
  - ARCO Index (gauge)
  - Lighthouse scores (4 progress bars)
  - Core Web Vitals (LCP, FID, CLS com thresholds)
  - CrUX data (se disponível)
  - Opportunities list (top 10)
- Actions: Re-analyze, Export CSV, Share link

### Step 3.2: Integrar no URL Analyzer

**Localização:** Onde o formulário de URL existe

**Workflow:**
```
1. User submits URL → Domain validation ✅
2. → NEW: Trigger performance analysis
3. Show loading spinner (30s timeout)
4. Display PerformanceResults inline
5. Save to history (if logged in)
```

### Step 3.3: Dashboard `/performance/history`

**Nova página:** `src/app/dashboard/performance/history/page.tsx`

**Funcionalidade:**
- Lista últimas 50 análises do usuário
- Tabela com: URL, Data, ARCO Index, LCP, Ações
- Filtros: Data range, domínio
- Ordenação: Por data, por score
- Gráfico de evolução (Recharts line chart)
- Export CSV

**Query:**
```typescript
const { data } = await supabase
  .from('analysis_results')
  .select(`
    *,
    analysis_requests!inner (
      id,
      url,
      created_at,
      arco_index,
      user_id
    )
  `)
  .eq('analysis_requests.user_id', user.id)
  .order('created_at', { foreignTable: 'analysis_requests', ascending: false })
  .limit(50)
```

---

## 📊 CÁLCULO DO ARCO INDEX

**Fórmula:**
```typescript
const arco_index = Math.round(
  lighthouse.performance * 0.40 +    // 40% - Performance (mais importante)
  lighthouse.seo * 0.25 +            // 25% - SEO (visibilidade)
  lighthouse.accessibility * 0.20 +  // 20% - Acessibilidade
  lighthouse.best_practices * 0.15   // 15% - Boas práticas
)
```

**Justificativa dos pesos:**
- Performance (40%): Maior impacto em conversão e UX
- SEO (25%): Crítico para tráfego orgânico
- Accessibility (20%): Alcance de audiência + compliance
- Best Practices (15%): Segurança e manutenibilidade

---

## 🧪 TESTING CHECKLIST

- [ ] API `/api/performance/analyze` retorna dados reais
- [ ] Lighthouse scores estão entre 0-100
- [ ] Core Web Vitals têm valores corretos (ms, score)
- [ ] CrUX data aparece quando disponível
- [ ] Opportunities são ordenadas por savings_ms
- [ ] ARCO Index é calculado corretamente
- [ ] Dados são salvos em analysis_results
- [ ] Rate limiting funciona (10 req/min)
- [ ] Timeout de 30s é respeitado
- [ ] Erros retornam JSON padronizado

---

## 📋 PRÓXIMOS PASSOS (Ordem de Execução)

### Agora (vamos fazer juntos):

1. ✅ **Verificar Resend** (5 min)
2. ✅ **Criar `/api/performance/analyze`** (1h)
3. ✅ **Testar API** (30 min)
4. ✅ **Criar componente PerformanceResults** (1h)
5. ✅ **Integrar no URL Analyzer** (30 min)
6. ✅ **Testar end-to-end** (30 min)

**Tempo total:** 3.5-4 horas

---

Começando agora com Step 1: Verificar Resend!
