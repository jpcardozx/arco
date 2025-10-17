# ⚠️ O Que Falta Implementar - Status Real

## 🔴 BLOCKER CRÍTICO (Impeditivo de Lançamento)

### **1. Integração Dashboard → Backend (6-8h)**
**Status:** ❌ 0% - Todas páginas usam 100% mock data

**Páginas que precisam integração:**

| Página | Arquivo | Mock Data | Server Action Necessária | Estimativa |
|--------|---------|-----------|-------------------------|------------|
| `/diagnostico` | `diagnostico/page.tsx` | `mockAnalyses` | `getUserAnalyses()` | 1.5h |
| `/diagnostico/[id]` | `diagnostico/[id]/page.tsx` | N/A (provavelmente tem mock) | `getAnalysisById(id)` | 1h |
| `/plano-de-acao` | `plano-de-acao/page.tsx` | Verificar se existe mock | `getPlaybooks()` | 1h |
| `/overview` | `overview/page.tsx` | `mockARCOHistory` | `getARCOIndexHistory(7)` | 1h |
| `/saude` | `saude/page.tsx` | Verificar mock | `getPerformanceMetrics()` + `getUptimeData()` | 1.5h |
| `/operacoes` | `operacoes/page.tsx` | Verificar mock | `getUserProjects()` + `getUserTickets()` + `getUserFiles()` | 2h |

**Evidência do problema:**
```typescript
// diagnostico/page.tsx linha 28
const mockAnalyses = [
  {
    id: '1',
    url: 'https://example.com',
    status: 'completed',
    arco_index: 87,
  },
  // ...
]
```

**Solução:**
```typescript
// ❌ ANTES
const mockAnalyses = [...]

// ✅ DEPOIS
import { getUserAnalyses } from '@/app/dashboard/actions'

export default async function DiagnosticoPage() {
  const analyses = await getUserAnalyses()
  // ...
}
```

---

### **2. Componente Empty State Faltando**
**Status:** ❌ Não existe `empty-states.tsx`

**Arquivo:** `src/components/dashboard/empty-states.tsx`

**Necessário para:**
- Quando não há análises ainda
- Quando não há projetos
- Quando não há tickets de suporte
- Quando não há arquivos

**Impacto:** Sem isso, páginas vazias mostram apenas nada ou erro.

---

### **3. Bibliotecas Faltando**
**Status:** ❌ Não instaladas

```bash
# Verificado: sonner, recharts, date-fns não estão no package.json
pnpm add sonner recharts date-fns
```

**Uso:**
- `sonner` - Toast notifications (análise iniciada, erro, sucesso)
- `recharts` - Gráficos de performance/ARCO trends (já usado em overview/page.tsx)
- `date-fns` - Formatação de datas ("há 2 dias", "01/01/2025")

---

## 🟠 CRÍTICO (Completa MVP, mas não bloqueia teste inicial)

### **4. Edge Functions Faltando (6h)**

**Status Atual:**
- ✅ `lighthouse-scan` - Deployed e funcionando
- ❌ `security-scan` - Não existe
- ❌ `domain-health` - Não existe

**Impacto:**
- Security scans ficam como placeholder (inserem status='pending' mas nunca completam)
- Domain monitoring não funciona (SSL, DNS, blacklist)

**Arquivos a criar:**
```
supabase/functions/security-scan/index.ts
supabase/functions/domain-health/index.ts
```

---

### **5. pg_cron Calls para Edge Functions (1h)**

**Status:** ⚠️ Parcialmente implementado

**Problema:**
```sql
-- supabase/migrations/20250105130000_monitoring_jobs.sql
-- Funções check_security() e check_domain_health() inserem placeholders
-- mas NÃO chamam Edge Functions (porque elas não existem ainda)

INSERT INTO security_scans (url, scan_type, status, scanned_at)
VALUES (target_url, 'ssl_headers', 'pending', now());
-- ❌ Fica "pending" forever porque não chama Edge Function
```

**Solução:** Atualizar migrations para fazer `net.http_post()` chamando Edge Functions (similar ao lighthouse-scan trigger).

---

## 🟡 IMPORTANTE (UX Premium, mas não bloqueia funcionalidade)

### **6. Supabase Realtime (4h)**

**Status:** ❌ Não implementado

**Impacto:**
- Usuário solicita análise → precisa dar F5 para ver resultado
- Sem auto-update quando status muda (pending → running → completed)

**Benefício:**
- UX feels "mágica" - dashboard atualiza sozinho
- Reduz load no servidor (zero polling)

---

### **7. Toast Provider (30min)**

**Status:** ❌ Não implementado

**Arquivo faltando:** `src/components/providers/toast-provider.tsx`

**Uso:**
```typescript
// Após criar análise
toast.success('Análise iniciada! Aguarde ~30 segundos.')

// Após erro
toast.error('Erro ao criar análise. Tente novamente.')
```

---

### **8. TierGate Component (1h)**

**Status:** ❌ Não implementado

**Arquivo faltando:** `src/components/dashboard/tier-gate.tsx`

**Uso:**
```typescript
<TierGate feature="Uptime Monitoring" tier="paid">
  <UptimeChart data={uptimeData} />
</TierGate>

// Free users veem upgrade prompt
// Paid users veem conteúdo
```

---

### **9. Onboarding Flow (2h)**

**Status:** ❌ Não implementado

**Páginas faltando:**
- `/dashboard/onboarding` - First-time user experience
- Step 1: Welcome
- Step 2: Add first site
- Step 3: Run first analysis

---

## 🟢 NICE-TO-HAVE (Pode ser feito depois do MVP)

### **10. Cache de Análises (2h)**
Retornar análise existente se URL já foi analisada <7 dias atrás.

### **11. Admin Dashboard (4h)**
Página `/admin/usage` para monitorar Supabase usage (evitar estourar Free Tier).

### **12. Email Notifications (3h)**
Enviar email quando análise completa (via Resend).

### **13. Webhooks Outbound (4h)**
Permitir usuários receberem POST quando análise completa.

---

## 📊 Resumo Quantitativo

### **Para MVP Funcional (Mínimo Viável):**
```
✅ Já Feito:
- Server Actions (18+ funções)
- Edge Function lighthouse-scan
- Database Webhooks
- pg_cron uptime monitoring
- Error/Loading components existem

❌ Falta (BLOCKER):
- Integração dashboard (6-8h)
- Empty states component (30min)
- Instalar libs (5min)
- Toast provider (30min)

TOTAL BLOCKER: ~8-9 horas
```

### **Para MVP Completo (Diferenciação Competitiva):**
```
❌ Falta (CRITICAL):
- Edge Functions security + domain (6h)
- Atualizar pg_cron calls (1h)

TOTAL CRITICAL: ~7 horas
```

### **Para UX Premium (Reduzir Churn):**
```
❌ Falta (IMPORTANT):
- Supabase Realtime (4h)
- TierGate component (1h)
- Onboarding flow (2h)

TOTAL IMPORTANT: ~7 horas
```

---

## 🎯 Priorização Recomendada

### **Sprint 1: MVP Funcional (8-9h)** 🔴
**Objetivo:** Dashboard funcionando, usuário consegue criar análise e ver resultado

**Tarefas:**
1. ✅ Instalar libs (`pnpm add sonner recharts date-fns`) - 5min
2. ✅ Criar empty-states.tsx - 30min
3. ✅ Criar toast-provider.tsx - 30min
4. ✅ Integrar `/diagnostico` - 1.5h
5. ✅ Integrar `/diagnostico/[id]` - 1h
6. ✅ Integrar `/plano-de-acao` - 1h
7. ✅ Integrar `/overview` - 1h
8. ✅ Integrar `/saude` - 1.5h
9. ✅ Integrar `/operacoes` - 2h

**Resultado:** Produto funciona end-to-end, pronto para testes com usuários reais.

---

### **Sprint 2: Monitoring Completo (7h)** 🟠
**Objetivo:** Completar diferenciadores competitivos (Pro tier justificado)

**Tarefas:**
1. ✅ Criar Edge Function security-scan - 3h
2. ✅ Criar Edge Function domain-health - 3h
3. ✅ Atualizar pg_cron para chamar Edge Functions - 1h

**Resultado:** Security scans e domain monitoring funcionando, placeholders viram features reais.

---

### **Sprint 3: UX Premium (7h)** 🟡
**Objetivo:** Reduzir churn, aumentar conversão

**Tarefas:**
1. ✅ Supabase Realtime (auto-update análises) - 4h
2. ✅ TierGate component (proteger Pro features) - 1h
3. ✅ Onboarding flow (first-time users) - 2h

**Resultado:** UX feels premium, conversão free→paid aumenta 20-30%.

---

## 📝 Checklist de Validação

### **✅ Infra (Já Completa)**
- [x] Database schema (21 tabelas)
- [x] Server Actions (18+ funções)
- [x] Edge Function lighthouse-scan
- [x] Database Webhooks
- [x] pg_cron uptime monitoring

### **❌ Frontend (0% Integrado)**
- [ ] `/diagnostico` usa dados reais
- [ ] `/plano-de-acao` usa dados reais
- [ ] `/overview` usa dados reais
- [ ] `/saude` usa dados reais
- [ ] `/operacoes` usa dados reais
- [ ] Empty states implementado
- [ ] Toast notifications funcionando

### **⚠️ Monitoring (Parcial)**
- [x] Uptime check (ativo mas placeholder)
- [ ] Security scan (falta Edge Function)
- [ ] Domain health (falta Edge Function)

### **❌ UX Premium (0%)**
- [ ] Realtime updates
- [ ] TierGate component
- [ ] Onboarding flow

---

## 🚀 Next Steps Imediatos

### **Agora (próximos 15 minutos):**
```bash
# 1. Instalar dependências
cd /home/jpcardozx/projetos/arco
pnpm add sonner recharts date-fns

# 2. Criar empty-states.tsx
code src/components/dashboard/empty-states.tsx

# 3. Criar toast-provider.tsx
code src/components/providers/toast-provider.tsx
```

### **Hoje (próximas 2 horas):**
```bash
# 4. Integrar primeira página
code src/app/dashboard/diagnostico/page.tsx
# Substituir mockAnalyses por getUserAnalyses()

# 5. Testar no browser
pnpm dev
# Abrir http://localhost:3000/dashboard/diagnostico
```

### **Esta Semana (8h total):**
- Segunda: Integrar `/diagnostico` + `/plano-de-acao` (2.5h)
- Terça: Integrar `/overview` + `/saude` (2.5h)
- Quarta: Integrar `/operacoes` + testes (3h)

**Resultado Final da Semana:** Dashboard 100% funcional com dados reais.

---

## 💡 Insights Importantes

### **Por que Mock Data é Blocker?**
```
Sem integração:
- Usuário cria análise → não aparece na lista
- ARCO Index não atualiza
- Quota não é validada (free user pode criar 100 análises)
- Pro features não são bloqueadas
= PRODUTO NÃO FUNCIONA, zero valor entregue
```

### **Por que Edge Functions são Critical mas não Blocker?**
```
Sem security-scan e domain-health:
- Lighthouse scan funciona (core feature OK)
- Uptime monitoring funciona (via pg_cron + net.http_get)
- Security/Domain ficam como "Em breve" ou placeholders
= PRODUTO FUNCIONA, mas incompleto
```

### **Por que Realtime é Important mas não Critical?**
```
Sem Realtime:
- Usuário solicita análise → espera 30s → dá F5 → vê resultado
- Funciona, mas experiência ruim
= PRODUTO FUNCIONA, UX poderia ser melhor
```

---

## 📊 Estimativa Total

| Sprint | Tempo | Status | Impacto |
|--------|-------|--------|---------|
| Sprint 1: MVP Funcional | 8-9h | ❌ 0% | 🔴 BLOCKER - Sem isso produto não funciona |
| Sprint 2: Monitoring | 7h | ⚠️ 33% (uptime OK, security/domain faltam) | 🟠 CRITICAL - Completa diferenciação |
| Sprint 3: UX Premium | 7h | ❌ 0% | 🟡 IMPORTANT - Reduz churn |
| **TOTAL** | **22-23h** | **~10% completo** | **MVP completo** |

---

## 🎯 TL;DR

**O que está impedindo o lançamento AGORA:**
1. 🔴 **Dashboard 100% mock data** (8h para resolver)
2. 🔴 **Libs não instaladas** (5min para resolver)
3. 🔴 **Empty states faltando** (30min para resolver)

**Total para MVP funcional: ~9 horas de trabalho focado**

**Depois disso:**
- Security/Domain Edge Functions (7h) - Completa diferenciação Pro
- Realtime + UX polish (7h) - Reduz churn, aumenta conversão

**TOTAL para MVP completo e polido: ~23 horas**

---

**🚀 Primeira ação:** `pnpm add sonner recharts date-fns` (5 minutos)
