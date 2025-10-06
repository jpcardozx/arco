# 📊 ARCO Index - Guia Visual Completo

> **O que é:** Métrica proprietária de "poluição digital"  
> **Range:** 0-100 (quanto maior, melhor)  
> **Uso:** Core metric do sistema ARCO

---

## 🎯 VISÃO GERAL

### O Que Mede o ARCO Index?

```
┌────────────────────────────────────────────────────────┐
│              ARCO INDEX = 87                           │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ DESEMPENHO (Performance)                     │    │
│  │ ████████████████████░░                  92%  │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ ACESSIBILIDADE (Accessibility)               │    │
│  │ █████████████████░░░░░                  85%  │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ BOAS PRÁTICAS (Best Practices)               │    │
│  │ ██████████████████░░░                   88%  │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ SEO                                          │    │
│  │ █████████████████░░░░                   84%  │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ PWA                                          │    │
│  │ ██████████████░░░░░░                    70%  │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  + BONIFICAÇÃO CORE WEB VITALS: 15 pontos             │
│    • LCP: 1.8s   ✓ +10                                │
│    • TBT: 180ms  ✓ +5                                 │
│    • CLS: 0.08   ✓ +0 (já max)                        │
└────────────────────────────────────────────────────────┘
```

---

## 🧮 CÁLCULO DETALHADO

### Fórmula

```
ARCO Index = (Lighthouse Score × 70%) + (CWV Bonus)
             └─────────────────────┘   └──────────┘
                Base Score (0-70)      Bonus (0-30)
```

### Passo 1: Base Score (70 pontos máximo)

```typescript
const weights = {
  performance: 0.35,      // 35% do peso total
  accessibility: 0.20,    // 20% do peso total
  bestPractices: 0.20,    // 20% do peso total
  seo: 0.15,              // 15% do peso total
  pwa: 0.10               // 10% do peso total
}

// Scores do Lighthouse (0-1)
const scores = {
  performance: 0.92,      // 92%
  accessibility: 0.85,    // 85%
  bestPractices: 0.88,    // 88%
  seo: 0.84,              // 84%
  pwa: 0.70               // 70%
}

// Cálculo
baseScore = (0.92 × 0.35) + (0.85 × 0.20) + (0.88 × 0.20) + (0.84 × 0.15) + (0.70 × 0.10)
          = 0.322 + 0.170 + 0.176 + 0.126 + 0.070
          = 0.864

// Converte para escala 0-70
baseScore = 0.864 × 70 = 60.48 pontos
```

### Passo 2: CWV Bonus (30 pontos máximo)

```typescript
let cwvBonus = 0

// 1. LCP (Largest Contentful Paint)
const lcp = 1800 // 1.8 segundos

if (lcp < 2500) {
  cwvBonus += 10  // ✅ Excelente: +10 pontos
} else if (lcp < 4000) {
  cwvBonus += 5   // 🟡 Bom: +5 pontos
}
// else: ❌ Ruim: 0 pontos

// 2. TBT (Total Blocking Time)
const tbt = 180 // 180 milissegundos

if (tbt < 200) {
  cwvBonus += 10  // ✅ Excelente: +10 pontos
} else if (tbt < 600) {
  cwvBonus += 5   // 🟡 Bom: +5 pontos
}
// else: ❌ Ruim: 0 pontos

// 3. CLS (Cumulative Layout Shift)
const cls = 0.08

if (cls < 0.1) {
  cwvBonus += 10  // ✅ Excelente: +10 pontos
} else if (cls < 0.25) {
  cwvBonus += 5   // 🟡 Bom: +5 pontos
}
// else: ❌ Ruim: 0 pontos

// Total CWV Bonus
cwvBonus = 10 + 10 + 10 = 30 pontos (máximo possível!)
```

### Passo 3: Score Final

```typescript
arcoIndex = Math.round(baseScore + cwvBonus)
          = Math.round(60.48 + 30)
          = Math.round(90.48)
          = 90

// Garante range 0-100
arcoIndex = Math.min(100, Math.max(0, arcoIndex))
```

---

## 📍 ONDE ESTÁ NO CÓDIGO

### 🗄️ BACKEND (Database)

#### Tabela: `analysis_requests`
```sql
CREATE TABLE analysis_requests (
  id UUID PRIMARY KEY,
  user_id UUID,
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  arco_index INT CHECK (arco_index >= 0 AND arco_index <= 100),  -- ⭐ AQUI!
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Exemplo de query
SELECT 
  url, 
  arco_index, 
  status, 
  created_at
FROM analysis_requests
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;

-- Resultado:
-- url                    | arco_index | status    | created_at
-- ---------------------- | ---------- | --------- | --------------------
-- https://example.com    | 87         | completed | 2025-10-06 10:30:00
-- https://mysite.com     | 92         | completed | 2025-10-05 15:20:00
-- https://test.com       | 65         | completed | 2025-10-04 09:15:00
```

#### Tabela: `performance_metrics`
```sql
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY,
  project_id UUID,
  date DATE NOT NULL,
  lighthouse_score INT,
  arco_index INT,                                           -- ⭐ AQUI (histórico)!
  lcp NUMERIC(6,2),
  fid NUMERIC(6,2),
  cls NUMERIC(4,3),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Query para histórico (últimos 30 dias)
SELECT 
  date,
  arco_index
FROM performance_metrics
WHERE project_id = '123e4567-e89b-12d3-a456-426614174000'
AND date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date ASC;

-- Resultado (para gráfico):
-- date       | arco_index
-- ---------- | ----------
-- 2025-09-06 | 82
-- 2025-09-07 | 83
-- 2025-09-08 | 85
-- ...
-- 2025-10-06 | 87
```

#### Tabela: `analysis_results`
```sql
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY,
  analysis_id UUID REFERENCES analysis_requests(id),
  lighthouse_performance INT,
  lighthouse_accessibility INT,
  lighthouse_best_practices INT,
  lighthouse_seo INT,
  lighthouse_pwa INT,
  lcp NUMERIC(6,2),
  fid NUMERIC(6,2),
  cls NUMERIC(4,3),
  raw_lighthouse_json JSONB,    -- Dados completos do Lighthouse
  created_at TIMESTAMPTZ DEFAULT now()
);

-- O ARCO Index não está aqui diretamente, mas os dados
-- usados para calculá-lo SIM (lighthouse scores + CWV)
```

### 💻 FRONTEND (Componentes)

#### 1. Dashboard Principal (`/dashboard`)

```tsx
// src/app/dashboard/page.tsx
import { getUserAnalyses } from './actions'

export default async function Dashboard() {
  const analyses = await getUserAnalyses()
  const latest = analyses[0]
  
  return (
    <div className="arco-hero">
      {/* ARCO Index grande e destacado */}
      <div className="text-6xl font-bold text-center">
        {latest?.arco_index || 0}
      </div>
      
      {/* Grade do score */}
      <div className="text-2xl font-semibold">
        {getGrade(latest?.arco_index || 0)}
      </div>
      
      {/* Indicador visual */}
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div 
          className={`h-4 rounded-full ${getColor(latest?.arco_index)}`}
          style={{ width: `${latest?.arco_index}%` }}
        />
      </div>
    </div>
  )
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+' // 🟢 Excelente
  if (score >= 80) return 'A'  // 🟢 Ótimo
  if (score >= 70) return 'B'  // 🟡 Bom
  if (score >= 60) return 'C'  // 🟠 Regular
  return 'D'                    // 🔴 Ruim
}

function getColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}
```

**Aparência:**
```
┌──────────────────────────────┐
│                              │
│           87                 │
│            A                 │
│                              │
│  [██████████████████░░░░]    │
│                              │
│  Seu site está em ótimo      │
│  estado! Continue assim.     │
│                              │
└──────────────────────────────┘
```

#### 2. Página Overview (`/dashboard/overview`)

```tsx
// src/app/dashboard/overview/page.tsx
import { getARCOIndexHistory } from '../actions'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export default async function Overview() {
  const history = await getARCOIndexHistory(30) // Últimos 30 dias
  
  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-semibold mb-4">
        Evolução do ARCO Index
      </h2>
      
      <AreaChart width={800} height={300} data={history}>
        <defs>
          <linearGradient id="colorArco" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        
        <Area 
          type="monotone" 
          dataKey="arco_index" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorArco)" 
        />
      </AreaChart>
    </div>
  )
}
```

**Aparência:**
```
Evolução do ARCO Index
┌────────────────────────────────────┐
│ 100│                          ▄▄▄▄ │
│  90│                     ▄▄▄▄▀    │
│  80│               ▄▄▄▄▀▀          │
│  70│          ▄▄▄▀▀                │
│  60│    ▄▄▄▄▀▀                     │
│  50│▄▄▀▀                           │
│   0└───────────────────────────────┘
│     Sep 1    Sep 15     Oct 1      │
└────────────────────────────────────┘
```

#### 3. Página Diagnóstico (`/dashboard/diagnostico`)

```tsx
// src/app/dashboard/diagnostico/page.tsx
import { getUserAnalyses } from '../actions'

export default async function Diagnostico() {
  const analyses = await getUserAnalyses()
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>URL</TableHead>
          <TableHead>ARCO Index</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyses.map(analysis => (
          <TableRow key={analysis.id}>
            <TableCell>{analysis.url}</TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(analysis.arco_index)}>
                {analysis.arco_index}
              </Badge>
            </TableCell>
            <TableCell>
              <StatusBadge status={analysis.status} />
            </TableCell>
            <TableCell>
              {formatDate(analysis.created_at)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function getBadgeVariant(score: number | null) {
  if (!score) return 'secondary'
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'destructive'
}
```

**Aparência:**
```
┌─────────────────────────────────────────────────────────┐
│ URL               │ ARCO Index │ Status    │ Data       │
├─────────────────────────────────────────────────────────┤
│ example.com       │ [87] 🟢    │ Completo  │ 06/10/2025 │
│ mysite.com        │ [92] 🟢    │ Completo  │ 05/10/2025 │
│ test.com          │ [65] 🟡    │ Completo  │ 04/10/2025 │
│ demo.com          │ [45] 🔴    │ Completo  │ 03/10/2025 │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 INTERPRETAÇÃO VISUAL

### Escala de Cores

```
┌──────────────────────────────────────────┐
│  SCORE    │  GRADE  │  COR    │ STATUS  │
├──────────────────────────────────────────┤
│  90-100   │   A+    │  🟢     │ EXCELENTE│
│  80-89    │   A     │  🟢     │ ÓTIMO    │
│  70-79    │   B     │  🟡     │ BOM      │
│  60-69    │   C     │  🟠     │ REGULAR  │
│  0-59     │   D     │  🔴     │ RUIM     │
└──────────────────────────────────────────┘
```

### Exemplos Reais

#### Site Excelente (ARCO Index: 95)
```
┌────────────────────────────────────────┐
│  ARCO INDEX: 95                    A+  │
│  [████████████████████████████]    🟢  │
│                                        │
│  Performance:       98  ████████████   │
│  Accessibility:     94  ███████████    │
│  Best Practices:    96  ███████████    │
│  SEO:               92  ███████████    │
│  PWA:               85  ██████████     │
│                                        │
│  Core Web Vitals:                      │
│  • LCP: 1.2s    ✅ Excelente           │
│  • TBT: 90ms    ✅ Excelente           │
│  • CLS: 0.05    ✅ Excelente           │
│                                        │
│  🎉 Parabéns! Seu site está perfeito!  │
└────────────────────────────────────────┘
```

#### Site Bom (ARCO Index: 72)
```
┌────────────────────────────────────────┐
│  ARCO INDEX: 72                     B  │
│  [████████████████░░░░░░░░░░░]     🟡  │
│                                        │
│  Performance:       78  █████████      │
│  Accessibility:     85  ██████████     │
│  Best Practices:    70  ████████       │
│  SEO:               68  ████████       │
│  PWA:               45  █████          │
│                                        │
│  Core Web Vitals:                      │
│  • LCP: 2.8s    🟡 Bom (pode melhorar) │
│  • TBT: 350ms   🟡 Bom                 │
│  • CLS: 0.15    🟠 Regular             │
│                                        │
│  💡 Sugestões de melhoria disponíveis  │
└────────────────────────────────────────┘
```

#### Site Ruim (ARCO Index: 42)
```
┌────────────────────────────────────────┐
│  ARCO INDEX: 42                     D  │
│  [██████████░░░░░░░░░░░░░░░░░]     🔴  │
│                                        │
│  Performance:       35  ████           │
│  Accessibility:     58  ██████         │
│  Best Practices:    42  ████           │
│  SEO:               48  █████          │
│  PWA:               20  ██             │
│                                        │
│  Core Web Vitals:                      │
│  • LCP: 5.2s    ❌ Ruim (CRÍTICO)      │
│  • TBT: 850ms   ❌ Ruim                │
│  • CLS: 0.35    ❌ Ruim                │
│                                        │
│  ⚠️  AÇÃO NECESSÁRIA: Múltiplos problemas│
│      detectados. Veja plano de ação.   │
└────────────────────────────────────────┘
```

---

## 🔄 FLUXO COMPLETO

### Do Request ao Display

```
┌────────────────────────────────────────────────────────┐
│  1. USUÁRIO SOLICITA ANÁLISE                           │
│     "Analisar https://example.com"                     │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│  2. SERVER ACTION VALIDA                               │
│     - Verifica quota (3 free, 50 paid)                 │
│     - Cria registro em analysis_requests               │
│     - Status: 'pending'                                │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│  3. EDGE FUNCTION PROCESSA                             │
│     - Lança Puppeteer                                  │
│     - Executa Lighthouse                               │
│     - Extrai métricas                                  │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│  4. CALCULA ARCO INDEX                                 │
│     - Base Score (70%) → 60 pontos                     │
│     - CWV Bonus (30%)  → 27 pontos                     │
│     - TOTAL: 87                                        │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│  5. SALVA NO BANCO                                     │
│     UPDATE analysis_requests                           │
│     SET arco_index = 87, status = 'completed'          │
│                                                        │
│     INSERT INTO analysis_results                       │
│     VALUES (lighthouse_data, cwv_metrics, ...)         │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│  6. REALTIME NOTIFICA                                  │
│     Frontend recebe update via WebSocket               │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│  7. DISPLAY NO DASHBOARD                               │
│     ┌────────────────────────┐                         │
│     │  ARCO INDEX: 87    A   │                         │
│     │  [████████████████░░]  │                         │
│     └────────────────────────┘                         │
└────────────────────────────────────────────────────────┘
```

---

## 💡 CASOS DE USO

### 1. Cliente Vê Seu Score
```tsx
// Dashboard mostra ARCO Index do último scan
const latestArcoIndex = 87

// Cliente pode:
// - Ver score atual
// - Ver histórico (30 dias)
// - Ver detalhamento (Lighthouse + CWV)
// - Ver recomendações de melhoria
```

### 2. Admin Monitora Todos
```tsx
// Admin dashboard mostra stats globais
const avgArcoIndex = 75
const bestArcoIndex = 95
const worstArcoIndex = 42

// Admin pode:
// - Ver média de todos os clientes
// - Identificar sites problemáticos
// - Gerar relatórios
```

### 3. Sistema Gera Insights
```typescript
// Sistema analisa ARCO Index e sugere ações
if (arcoIndex < 60) {
  createInsight({
    type: 'critical',
    title: 'Performance crítica detectada',
    description: 'Seu site está muito lento. Priorize otimizações.',
    priority: 'high'
  })
} else if (arcoIndex < 80) {
  createInsight({
    type: 'warning',
    title: 'Performance pode melhorar',
    description: 'Algumas otimizações podem aumentar seu score.',
    priority: 'medium'
  })
}
```

---

## 📝 GLOSSÁRIO

**LCP (Largest Contentful Paint)**
- O que é: Tempo até o maior elemento visível carregar
- Ideal: < 2.5s
- Peso no ARCO Index: Até +10 pontos

**TBT (Total Blocking Time)**
- O que é: Tempo que a página fica "travada"
- Ideal: < 200ms
- Peso no ARCO Index: Até +10 pontos

**CLS (Cumulative Layout Shift)**
- O que é: Quanto a página "pula" durante o carregamento
- Ideal: < 0.1
- Peso no ARCO Index: Até +10 pontos

**Lighthouse**
- O que é: Ferramenta do Google para auditar sites
- Categorias: Performance, Accessibility, Best Practices, SEO, PWA
- Peso no ARCO Index: 70% (base score)

---

**Criado em:** 06 de outubro de 2025  
**Última atualização:** 06 de outubro de 2025  
**Versão:** 1.0.0
