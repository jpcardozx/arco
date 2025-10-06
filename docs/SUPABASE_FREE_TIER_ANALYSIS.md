# Análise: Supabase Free Tier para Aquisição de Primeiros Clientes

## 📊 Limites do Free Tier vs Necessidades Reais

### **Database**
| Recurso | Free Tier | Necessidade MVP | Status |
|---------|-----------|-----------------|--------|
| Database Size | 500 MB | ~50-100 MB (primeiros 100 clientes) | ✅ OK |
| Rows | Ilimitado | ~10k-50k rows | ✅ OK |
| Connections | 60 simultâneas | ~10-20 (Next.js connection pooling) | ✅ OK |
| Egress Bandwidth | 5 GB/mês | ~2-3 GB (50 clientes) | ✅ OK |

**Cálculo de Storage:**
```
Por cliente:
- user_profiles: 1 row = ~1 KB
- analysis_requests: 10/mês = 10 KB (metadata)
- analysis_results: 10/mês = ~500 KB (Lighthouse JSON)
- uptime_checks: 8.640/mês (5min interval) = ~100 KB
Total por cliente/mês: ~611 KB

50 clientes = 30 MB/mês
100 clientes = 61 MB/mês
```

---

### **Edge Functions**
| Recurso | Free Tier | Necessidade MVP | Status |
|---------|-----------|-----------------|--------|
| Invocations | 500k/mês | ~15k-30k/mês | ✅ OK |
| Execution Time | 400k CPU seconds/mês | ~5k seconds/mês | ✅ OK |
| Data Transfer | 2 GB/mês | ~500 MB/mês | ✅ OK |

**Cálculo de Invocations (50 clientes pagos):**
```
lighthouse-scan:
- 50 clientes × 20 análises/mês = 1.000 invocations

security-scan:
- 50 sites × 30 dias = 1.500 invocations

domain-health:
- 50 sites × 30 dias = 1.500 invocations

TOTAL: 4.000 invocations/mês (0.8% do limite)
```

---

### **Storage**
| Recurso | Free Tier | Necessidade MVP | Status |
|---------|-----------|-----------------|--------|
| Storage Size | 1 GB | ~100-200 MB | ✅ OK |
| File Upload | 50 MB/arquivo | 10 MB/arquivo (tickets) | ✅ OK |
| Bandwidth | 2 GB/mês | ~500 MB/mês | ✅ OK |

---

### **Realtime**
| Recurso | Free Tier | Necessidade MVP | Status |
|---------|-----------|-----------------|--------|
| Concurrent Connections | 200 | ~20-50 (usuários online) | ✅ OK |
| Messages/Month | 2 milhões | ~100k (updates de status) | ✅ OK |

---

### **pg_cron Jobs**
| Recurso | Free Tier | Necessidade MVP | Status |
|---------|-----------|-----------------|--------|
| Jobs Scheduled | Ilimitado | 3 jobs (uptime, security, domain) | ✅ OK |
| Executions | Ilimitado | ~22k/mês (uptime 5min) | ✅ OK |

---

## 🚨 Limites Críticos a Monitorar

### **1. Database Egress (5 GB/mês)**
**Risco:** Cada request pesado (Lighthouse JSON ~50 KB) consome bandwidth.

**Mitigação:**
```typescript
// ✅ BOM: Buscar apenas campos necessários
const { data } = await supabase
  .from('analysis_results')
  .select('id, arco_index, performance_score') // ~1 KB
  .eq('analysis_id', id)

// ❌ RUIM: Buscar tudo (Lighthouse JSON completo)
const { data } = await supabase
  .from('analysis_results')
  .select('*') // ~50 KB por row
```

**Monitoramento:**
```sql
-- Dashboard Supabase > Settings > Usage
-- Alert quando atingir 80% (4 GB)
```

---

### **2. Edge Function Invocations (500k/mês)**
**Risco:** Se viralizar, pode estourar limite rapidamente.

**Mitigação:**
- ✅ Rate limiting no Server Action (máx 3 análises/dia para free users)
- ✅ Cache de análises (se URL já foi analisada <7 dias, retornar cache)

**Implementação:**
```typescript
// src/app/dashboard/actions.ts
export async function createAnalysisRequest(url: string) {
  // Check cache
  const cached = await supabase
    .from('analysis_requests')
    .select('*, analysis_results(*)')
    .eq('url', url)
    .gte('created_at', sevenDaysAgo())
    .eq('status', 'completed')
    .single()
  
  if (cached) {
    return { ...cached, cached: true } // Retorna análise existente
  }
  
  // Senão, cria nova análise
  // ...
}
```

---

## 📈 Crescimento Esperado vs Upgrade Necessário

### **Cenário 1: Crescimento Orgânico**
```
Mês 1-3: 10-30 clientes (Free Tier OK)
Mês 4-6: 50-80 clientes (Free Tier OK com otimizações)
Mês 7+: 100+ clientes → UPGRADE NECESSÁRIO
```

**Gatilho de Upgrade ($25/mês → Pro Plan):**
- Database egress >4 GB/mês (80% do limite)
- Edge Functions >400k invocations/mês (80%)
- Storage >800 MB (80%)

---

### **Cenário 2: Lançamento Viral**
```
Mês 1: 200+ clientes → UPGRADE IMEDIATO
```

**Pro Plan ($25/mês) Limites:**
- Database: 8 GB (16x maior)
- Egress: 50 GB/mês (10x maior)
- Edge Functions: 2M invocations (4x maior)
- Storage: 100 GB (100x maior)

---

## 💰 Custo Real (Primeiros 6 meses)

### **MVP Launch (0-50 clientes):**
```
Supabase: $0/mês (Free Tier)
Domain: $12/ano (.com)
Vercel: $0/mês (Hobby plan, 100 GB bandwidth)

TOTAL: $1/mês ✅
```

### **Validação (50-150 clientes):**
```
Supabase: $25/mês (Pro Plan)
Domain: $12/ano
Vercel: $0/mês (ainda OK)

TOTAL: $26/mês (~$1.800 MRR para cobrir)
```

**Break-even:** 19 clientes pagos ($97/mês) = $1.843 MRR

---

## 🎯 Recomendação Estratégica

### **✅ Free Tier é PERFEITO para MVP**

**Motivos:**
1. Cobre 50+ clientes pagos tranquilamente
2. $0 upfront cost = maximiza runway
3. Tempo para validar product-market fit
4. Upgrade simples (1 clique no dashboard)

**Quando Upgradar:**
```
IF (
  database_egress > 4_GB OR
  edge_invocations > 400k OR
  clients > 80
) THEN
  upgrade_to_pro_plan()
END
```

---

## 🔧 Otimizações para Maximizar Free Tier

### **1. Database Query Optimization**
```typescript
// ✅ Select apenas campos necessários
.select('id, url, arco_index, status')

// ✅ Usar indexes (já criados nas migrations)
CREATE INDEX idx_analysis_user_id ON analysis_requests(user_id);

// ✅ Limitar rows retornadas
.limit(50) // Paginação
```

### **2. Edge Function Caching**
```typescript
// supabase/functions/lighthouse-scan/index.ts
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 7 dias

// Antes de rodar Lighthouse, verificar cache
const cached = await supabase
  .from('analysis_results')
  .select('*')
  .eq('url', url)
  .gte('created_at', new Date(Date.now() - CACHE_TTL))
  .single()

if (cached) {
  // Retornar cache sem rodar Lighthouse
  return cached
}
```

### **3. Compression**
```typescript
// Comprimir Lighthouse JSON antes de salvar
import { compress, decompress } from 'lz-string'

const compressed = compress(JSON.stringify(lighthouseResult))

await supabase.from('analysis_results').insert({
  lighthouse_data: compressed // ~5x menor
})
```

### **4. Connection Pooling**
```typescript
// next.config.mjs
export default {
  experimental: {
    // Reusar conexões Supabase
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
}

// lib/supabase/server.ts
// ✅ Já implementado com @supabase/ssr (connection pooling automático)
```

---

## 📊 Dashboard de Monitoramento

### **Métricas Críticas a Acompanhar**
```typescript
// src/app/admin/usage/page.tsx (criar depois)

export default async function UsagePage() {
  // Buscar métricas do Supabase API
  const usage = await fetch('https://api.supabase.com/v1/projects/{ref}/usage', {
    headers: { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}` }
  }).then(r => r.json())
  
  return (
    <div>
      <UsageCard 
        title="Database Egress"
        current={usage.db_egress_bytes}
        limit={5_000_000_000} // 5 GB
        unit="GB"
      />
      <UsageCard 
        title="Edge Functions"
        current={usage.func_invocations}
        limit={500_000}
        unit="invocations"
      />
      {/* ... */}
    </div>
  )
}
```

---

## ✅ Conclusão

**Free Tier do Supabase cobre perfeitamente a fase de aquisição dos primeiros clientes pagos.**

- ✅ 0-50 clientes: Sem preocupações
- ⚠️ 50-100 clientes: Monitorar usage, otimizar queries
- 🔴 100+ clientes: Upgrade para Pro ($25/mês)

**ROI:** Economizar $150 nos primeiros 6 meses permite mais capital para marketing/vendas.
