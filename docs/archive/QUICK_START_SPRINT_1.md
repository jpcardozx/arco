# ⚡ Quick Start: Implementação Sprint 1

## 🎯 Objetivo: Dashboard Funcional (8h)

Este documento contém comandos e código prontos para copiar/colar. Siga a ordem numerada.

---

## ✅ Pre-flight Check

```bash
# 1. Verificar que migrations foram aplicadas
npx supabase db push

# 2. Verificar que Edge Function está deployed
npx supabase functions list

# 3. Verificar que types estão atualizados
npx supabase gen types typescript --linked > src/types/supabase.ts

# 4. Instalar dependências necessárias
pnpm add sonner date-fns recharts @tremor/react
```

---

## 📋 Sprint 1: Integração Dashboard (6 páginas)

### **Página 1: /diagnostico (2h)**

#### **1.1 Atualizar page.tsx**
```bash
# Abrir arquivo
code src/app/dashboard/diagnostico/page.tsx
```

**Substituir conteúdo por:**
```typescript
import { getUserAnalyses } from '@/app/dashboard/actions'
import { AnalysesList } from './components/analyses-list'
import { EmptyAnalyses } from '@/components/dashboard/empty-states'
import { ErrorDisplay } from '@/components/dashboard/error-display'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default async function DiagnosticoPage() {
  try {
    const analyses = await getUserAnalyses()
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Diagnóstico</h1>
            <p className="text-muted-foreground">
              Monitore a saúde dos seus sites
            </p>
          </div>
          <Link href="/dashboard/diagnostico/nova-analise">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nova Análise
            </Button>
          </Link>
        </div>
        
        {analyses.length === 0 ? (
          <EmptyAnalyses />
        ) : (
          <AnalysesList analyses={analyses} />
        )}
      </div>
    )
  } catch (error) {
    return <ErrorDisplay error={error as Error} />
  }
}
```

#### **1.2 Criar componente AnalysesList**
```bash
# Criar diretório se não existir
mkdir -p src/app/dashboard/diagnostico/components

# Criar arquivo
code src/app/dashboard/diagnostico/components/analyses-list.tsx
```

```typescript
'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type Analysis = {
  id: string
  url: string
  arco_index: number | null
  status: string
  created_at: string
  analysis_results: Array<{
    performance_score: number
    security_score: number
    seo_score: number
    accessibility_score: number
  }>
}

export function AnalysesList({ analyses }: { analyses: Analysis[] }) {
  return (
    <div className="grid gap-4">
      {analyses.map((analysis) => (
        <Card key={analysis.id} className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{analysis.url}</h3>
                <StatusBadge status={analysis.status} />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Analisado {formatDistanceToNow(new Date(analysis.created_at), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </p>
              
              {analysis.status === 'completed' && analysis.analysis_results[0] && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ScoreCard 
                    label="Performance" 
                    score={analysis.analysis_results[0].performance_score} 
                  />
                  <ScoreCard 
                    label="Segurança" 
                    score={analysis.analysis_results[0].security_score} 
                  />
                  <ScoreCard 
                    label="SEO" 
                    score={analysis.analysis_results[0].seo_score} 
                  />
                  <ScoreCard 
                    label="Acessibilidade" 
                    score={analysis.analysis_results[0].accessibility_score} 
                  />
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {analysis.arco_index && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">ARCO Index</p>
                  <p className="text-3xl font-bold">{analysis.arco_index}</p>
                </div>
              )}
              <Link href={`/dashboard/diagnostico/${analysis.id}`}>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    pending: { label: 'Pendente', variant: 'secondary' },
    running: { label: 'Processando', variant: 'default' },
    completed: { label: 'Concluído', variant: 'success' },
    failed: { label: 'Falhou', variant: 'destructive' }
  }
  
  const config = variants[status as keyof typeof variants] || variants.pending
  
  return <Badge variant={config.variant as any}>{config.label}</Badge>
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const color = score >= 90 ? 'text-green-600' : 
                score >= 50 ? 'text-yellow-600' : 
                'text-red-600'
  
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{score}</p>
    </div>
  )
}
```

#### **1.3 Criar Empty State**
```bash
code src/components/dashboard/empty-states.tsx
```

```typescript
import { ChartBarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function EmptyAnalyses() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ChartBarIcon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Nenhuma análise ainda</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        Comece analisando seu primeiro site para descobrir o ARCO Index
      </p>
      <Link href="/dashboard/diagnostico/nova-analise">
        <Button>
          <ChartBarIcon className="mr-2 h-4 w-4" />
          Nova Análise
        </Button>
      </Link>
    </div>
  )
}
```

#### **1.4 Criar Error Display**
```bash
code src/components/dashboard/error-display.tsx
```

```typescript
'use client'

import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

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
      <AlertTitle>Erro ao carregar dados</AlertTitle>
      <AlertDescription className="mt-2">
        {error.message}
      </AlertDescription>
      {retry && (
        <Button 
          onClick={retry} 
          variant="outline" 
          size="sm" 
          className="mt-4"
        >
          Tentar Novamente
        </Button>
      )}
    </Alert>
  )
}
```

---

### **Página 2: /plano-de-acao (1h)**

```bash
code src/app/dashboard/plano-de-acao/page.tsx
```

```typescript
import { getPlaybooks } from '@/app/dashboard/actions'
import { PlaybooksList } from './components/playbooks-list'
import { ErrorDisplay } from '@/components/dashboard/error-display'

export default async function PlanoAcaoPage() {
  try {
    const playbooks = await getPlaybooks()
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Plano de Ação</h1>
          <p className="text-muted-foreground">
            Ações recomendadas para melhorar seu ARCO Index
          </p>
        </div>
        
        <PlaybooksList playbooks={playbooks} />
      </div>
    )
  } catch (error) {
    return <ErrorDisplay error={error as Error} />
  }
}
```

```bash
code src/app/dashboard/plano-de-acao/components/playbooks-list.tsx
```

```typescript
'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Playbook = {
  id: string
  title: string
  category: string
  impact_score: number
  time_required: string
  description: string | null
}

export function PlaybooksList({ playbooks }: { playbooks: Playbook[] }) {
  return (
    <div className="grid gap-4">
      {playbooks.map((playbook) => (
        <Card key={playbook.id} className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{playbook.title}</h3>
                <Badge>{playbook.category}</Badge>
              </div>
              
              {playbook.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {playbook.description}
                </p>
              )}
              
              <div className="flex gap-4 text-sm">
                <span>
                  Impacto: <strong>{playbook.impact_score}/10</strong>
                </span>
                <span>
                  Tempo: <strong>{playbook.time_required}</strong>
                </span>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              Ver Detalhes
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

---

### **Página 3: /overview (1h)**

```bash
code src/app/dashboard/overview/page.tsx
```

```typescript
import { getARCOIndexHistory } from '@/app/dashboard/actions'
import { ARCOTrendChart } from './components/arco-trend-chart'
import { TierGate } from '@/components/dashboard/tier-gate'

export default async function OverviewPage() {
  const history = await getARCOIndexHistory(7).catch(() => [])
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-muted-foreground">
          Visão geral da saúde dos seus sites
        </p>
      </div>
      
      <TierGate feature="Histórico de 90 dias" tier="paid">
        <ARCOTrendChart data={history} />
      </TierGate>
    </div>
  )
}
```

---

### **Página 4-6: Restantes (3h)**

**Comando para gerar estrutura:**
```bash
# Copiar pattern de /diagnostico para outras páginas
cp -r src/app/dashboard/diagnostico/components src/app/dashboard/saude/
cp -r src/app/dashboard/diagnostico/components src/app/dashboard/operacoes/
```

---

## 🔧 Componentes Utilitários

### **TierGate (Proteção de Features Pro)**

```bash
code src/components/dashboard/tier-gate.tsx
```

```typescript
'use client'

import { useUser } from '@/lib/hooks/use-user'
import { UpgradePrompt } from './upgrade-prompt'

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
  
  if (user?.profile?.tier !== tier && tier === 'paid') {
    return <UpgradePrompt feature={feature} />
  }
  
  return <>{children}</>
}
```

### **UpgradePrompt**

```bash
code src/components/dashboard/upgrade-prompt.tsx
```

```typescript
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LockIcon } from 'lucide-react'
import Link from 'next/link'

export function UpgradePrompt({ feature }: { feature: string }) {
  return (
    <Card className="p-8 text-center">
      <LockIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        {feature} é exclusivo do Pro
      </h3>
      <p className="text-muted-foreground mb-6">
        Upgrade para Pro e desbloqueie todas as funcionalidades
      </p>
      <Link href="/dashboard/upgrade">
        <Button size="lg">
          Fazer Upgrade
        </Button>
      </Link>
    </Card>
  )
}
```

---

## 🎨 Toast Notifications

### **Setup Sonner**

```bash
code src/components/providers/toast-provider.tsx
```

```typescript
'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return <Toaster position="top-right" />
}
```

```bash
code src/app/layout.tsx
```

**Adicionar ao layout:**
```typescript
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
```

**Uso em componentes:**
```typescript
'use client'

import { toast } from 'sonner'
import { createAnalysisRequest } from '@/app/dashboard/actions'

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

## ✅ Testes E2E

### **Testar Free Tier Quota**

```bash
# 1. Criar conta free
# 2. Solicitar 3 análises
# 3. Tentar 4ª análise → deve bloquear
# 4. Verificar modal de upgrade aparece
```

### **Testar Pro Tier**

```bash
# 1. Atualizar user para paid via Supabase Dashboard:
# UPDATE user_profiles SET tier = 'paid' WHERE email = 'teste@email.com'

# 2. Solicitar 10+ análises → deve funcionar
# 3. Verificar uptime monitoring está visível
# 4. Verificar badge PRO aparece
```

---

## 🚀 Deploy

### **Build Local**

```bash
# Verificar que compila
pnpm build

# Se tiver erros de tipo, regenerar
npx supabase gen types typescript --linked > src/types/supabase.ts
pnpm build
```

### **Deploy Vercel**

```bash
# Push para git
git add .
git commit -m "feat: integrate dashboard with backend"
git push origin main

# Vercel deploya automaticamente
# Verificar em: https://vercel.com/dashboard
```

---

## 📊 Checklist Final

### **Funcionalidades**
- [ ] `/diagnostico` mostra análises reais
- [ ] `/plano-de-acao` mostra playbooks reais
- [ ] `/overview` mostra histórico (com TierGate)
- [ ] `/saude` mostra métricas reais
- [ ] `/operacoes` mostra projetos/tickets/files
- [ ] Quota enforcement funciona (3/mês free)
- [ ] Loading states aparecem
- [ ] Error states aparecem
- [ ] Empty states aparecem
- [ ] Toast notifications funcionam

### **UX**
- [ ] Mobile responsive
- [ ] Navegação fluida
- [ ] Badges de tier funcionam
- [ ] Upgrade prompt aparece para free users
- [ ] Pro users veem features desbloqueadas

### **Testes**
- [ ] Free user: 3 análises → bloqueio na 4ª
- [ ] Paid user: 10+ análises funcionam
- [ ] Análise completa em ~30s
- [ ] ARCO Index calcula corretamente

---

## 🎯 Próximo Sprint

Após completar Sprint 1, abrir:
```bash
code docs/ROADMAP_COMPLETE_MVP_LAUNCH.md
```

E seguir **Sprint 2: Edge Functions**.

---

**⚡ Tempo estimado Sprint 1: 8-10 horas**  
**🎯 Resultado: Dashboard 100% funcional**
