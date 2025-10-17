# 🚀 Quiz Interativo - Guia de Implementação Rápida

## ✅ Status: Implementação Completa

Transformação do lead magnet de e-book em **Quiz Interativo de Diagnóstico Estratégico**.

---

## 📦 Arquivos Criados

### 1. Tipos e Configuração
```
✅ /src/types/quiz.ts                          - Tipos TypeScript completos
✅ /src/lib/quiz/quiz-config.ts                - 15 perguntas configuradas
✅ /src/lib/quiz/quiz-engine.ts                - Sistema de qualificação
```

### 2. Componentes React
```
✅ /src/components/quiz/quiz-interactive.tsx   - Componente principal (estado + fluxo)
✅ /src/components/quiz/quiz-question.tsx      - Renderização de perguntas
✅ /src/components/quiz/quiz-result.tsx        - Tela de resultados
✅ /src/app/quiz/page.tsx                      - Página pública
```

### 3. Backend
```
✅ /supabase/migrations/create_quiz_results.sql - Schema completo + RLS
```

### 4. Documentação
```
✅ /docs/QUIZ_INTERACTIVE_DOCUMENTATION.md     - Documentação completa
✅ /docs/QUIZ_QUICK_START.md                   - Este arquivo
```

---

## 🎯 O Que Foi Criado

### **Nome:** "Diagnóstico Estratégico Digital"
**Conceito:** Quiz profissional que qualifica leads automaticamente enquanto coleta informações estratégicas.

### Funcionalidades Principais

#### 1. **Sistema de Qualificação Automática**
- Score de 0-100 baseado nas respostas
- Classificação: Cold / Warm / Hot / Qualified
- Identificação de 7 verticais prioritárias
- Cálculo de urgência (low/medium/high)

#### 2. **15 Perguntas Estratégicas em 5 Seções**
- 🏢 **Contexto do Negócio** (4 perguntas)
- ⚠️ **Dores e Desafios** (3 perguntas)
- 📦 **Recursos Atuais** (3 perguntas)
- 🎯 **Objetivos Estratégicos** (2 perguntas)
- ⏰ **Urgência e Próximos Passos** (3 perguntas)

#### 3. **Resultado Personalizado**
- Score visual animado
- Badge de qualificação (cold/warm/hot/qualified)
- 3-5 verticais prioritárias identificadas
- Recomendações com impacto estimado
- CTAs personalizados (Download PDF, Agendar Call)

#### 4. **Persistência no Supabase**
- Tabela `quiz_results` com 20+ campos
- RLS configurado (users veem próprios, admins veem tudo)
- View `quiz_leads_summary` para dashboard
- Function `get_qualified_uncontacted_leads()` para follow-up

---

## 🚀 Implementação Passo a Passo

### **Passo 1: Executar Migration SQL** ⏱️ 2 minutos

```bash
# Opção A: Via Supabase CLI
cd /home/jpcardozx/projetos/arco
supabase db push

# Opção B: SQL Editor (Supabase Dashboard)
# 1. Acesse: https://supabase.com/dashboard/project/YOUR_PROJECT/editor
# 2. Cole o conteúdo de: /supabase/migrations/create_quiz_results.sql
# 3. Clique em "Run"
```

**Verificar criação:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'quiz_results';
-- Deve retornar: quiz_results
```

---

### **Passo 2: Testar o Quiz** ⏱️ 5 minutos

```bash
# Certifique-se que o dev server está rodando
pnpm dev

# Acesse no navegador
open http://localhost:3000/quiz
```

**Fluxo de Teste Completo:**

1. **Tela Intro**
   - ✅ Título: "Diagnóstico Estratégico Digital"
   - ✅ Descrição das 5 seções
   - ✅ Botão: "Iniciar Diagnóstico Gratuito"

2. **Coleta de Contato**
   - ✅ Preencha: Nome, E-mail (obrigatórios)
   - ✅ Opcional: Empresa, Telefone
   - ✅ Botão: "Continuar para o Diagnóstico"

3. **Quiz (15 perguntas)**
   - ✅ Veja progress bar no topo
   - ✅ Navegue entre seções (ícones coloridos)
   - ✅ Responda perguntas (single choice, multiple choice, scales)
   - ✅ Use "Voltar" e "Próxima"

4. **Resultado**
   - ✅ Veja score circular (0-100)
   - ✅ Badge de classificação (cold/warm/hot/qualified)
   - ✅ Cards de verticais com prioridades
   - ✅ Recomendações personalizadas
   - ✅ CTAs (Download, Agendar)

5. **Verificar no Banco**
```sql
-- Supabase SQL Editor
SELECT 
  email, 
  name, 
  score, 
  lead_score, 
  urgency_level, 
  verticals,
  created_at
FROM quiz_results 
ORDER BY created_at DESC 
LIMIT 1;
```

---

### **Passo 3: Substituir Links do E-book** ⏱️ 10 minutos

#### Locais para Atualizar:

**A. Homepage (`/src/app/page.tsx` ou similar)**
```tsx
// ANTES
<Button href="/ebook">
  Baixar E-book Gratuito
</Button>

// DEPOIS
<Button href="/quiz">
  Fazer Diagnóstico Gratuito em 5min
</Button>
```

**B. CTAs no Rodapé**
```tsx
// ANTES
<a href="/ebook">E-book: Guia Completo</a>

// DEPOIS
<a href="/quiz">Diagnóstico Estratégico Digital</a>
```

**C. Pop-ups de Exit Intent**
```tsx
// ANTES
modal.show({
  title: "Baixe nosso E-book",
  cta: "/ebook"
})

// DEPOIS
modal.show({
  title: "Descubra o potencial do seu negócio",
  cta: "/quiz"
})
```

**D. Formulários de Contato**
```tsx
// Adicionar opção no final
<p className="text-sm text-muted-foreground">
  Ou faça nosso{' '}
  <a href="/quiz" className="text-primary underline">
    Diagnóstico Gratuito em 5 minutos
  </a>
</p>
```

---

### **Passo 4: Dashboard de Leads (Admin)** ⏱️ 30 minutos

Crie `/src/app/dashboard/leads/page.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const supabase = createClient()

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    const { data } = await supabase
      .from('quiz_leads_summary' as any)
      .select('*')
      .order('created_at', { ascending: false })
    
    setLeads(data || [])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads do Quiz</h1>
        <p className="text-muted-foreground">
          {leads.length} leads capturados
        </p>
      </div>

      <div className="grid gap-4">
        {leads.map((lead: any) => (
          <Card key={lead.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">{lead.name}</h3>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
                {lead.company && (
                  <p className="text-sm">{lead.company}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={
                  lead.lead_score === 'qualified' ? 'default' :
                  lead.lead_score === 'hot' ? 'destructive' :
                  lead.lead_score === 'warm' ? 'secondary' : 'outline'
                }>
                  {lead.lead_score.toUpperCase()}
                </Badge>
                <span className="text-2xl font-bold">{lead.score}</span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {lead.verticals?.map((v: string) => (
                <Badge key={v} variant="outline">{v}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

**Adicionar ao menu do dashboard:**
```tsx
// /src/components/dashboard/sidebar-navigation.tsx
{
  href: '/dashboard/leads',
  label: 'Leads do Quiz',
  icon: Users,
  badge: qualifiedCount > 0 ? qualifiedCount : undefined
}
```

---

## 📊 Queries Úteis (Supabase SQL Editor)

### 1. Leads Qualificados Não Contatados
```sql
SELECT * FROM get_qualified_uncontacted_leads();
```

### 2. Estatísticas de Conversão
```sql
SELECT
  lead_score,
  COUNT(*) as total,
  ROUND(AVG(score), 1) as avg_score,
  COUNT(*) FILTER (WHERE contacted_at IS NOT NULL) as contacted
FROM quiz_results
GROUP BY lead_score
ORDER BY 
  CASE lead_score
    WHEN 'qualified' THEN 1
    WHEN 'hot' THEN 2
    WHEN 'warm' THEN 3
    ELSE 4
  END;
```

### 3. Verticais Mais Comuns
```sql
SELECT
  unnest(verticals) as vertical,
  COUNT(*) as frequency,
  ROUND(AVG(score), 1) as avg_score
FROM quiz_results
GROUP BY vertical
ORDER BY frequency DESC;
```

### 4. Taxa de Conversão por Dia
```sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_quizzes,
  COUNT(*) FILTER (WHERE lead_score IN ('hot', 'qualified')) as qualified,
  ROUND(
    COUNT(*) FILTER (WHERE lead_score IN ('hot', 'qualified'))::numeric / 
    COUNT(*)::numeric * 100, 
    1
  ) as conversion_rate
FROM quiz_results
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🎨 Customizações Opcionais

### 1. Alterar Cores dos Badges
```tsx
// /src/components/quiz/quiz-result.tsx
const LEAD_SCORE_CONFIG = {
  qualified: {
    color: 'text-green-600', // Altere aqui
    bgColor: 'bg-green-100'
  }
}
```

### 2. Adicionar/Remover Perguntas
```tsx
// /src/lib/quiz/quiz-config.ts
export const QUIZ_SECTIONS = [
  {
    id: 'nova-secao',
    title: 'Nova Seção',
    description: 'Descrição',
    icon: 'Star',
    questions: [
      {
        id: 'nova-pergunta',
        category: 'context',
        title: 'Sua nova pergunta?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'opcao-1',
            label: 'Primeira opção',
            value: 8, // 0-10: quanto maior, mais dor/urgência
            verticals: ['performance', 'marketing']
          }
        ]
      }
    ]
  }
]
```

### 3. Modificar Sistema de Pontuação
```tsx
// /src/lib/quiz/quiz-engine.ts
static classifyLead(score: number): LeadScore {
  if (score >= 85) return 'qualified' // Era 80, agora 85
  if (score >= 65) return 'hot'       // Era 60, agora 65
  if (score >= 45) return 'warm'      // Era 40, agora 45
  return 'cold'
}
```

---

## 🐛 Troubleshooting

### Erro: "quiz_results table does not exist"
**Solução:** Execute a migration SQL (Passo 1)

### Erro: "Cannot read properties of undefined (reading 'questions')"
**Solução:** Verifique se `QUIZ_SECTIONS` está sendo importado corretamente

### Quiz não salva no banco
**Solução:** 
1. Verifique RLS policies: `SELECT * FROM pg_policies WHERE tablename = 'quiz_results';`
2. Certifique-se que policy "Anyone can insert" existe

### Console mostra warnings de PropTypes
**Solução:** Ignorar - são avisos do Framer Motion, não afetam funcionalidade

---

## 📈 Métricas de Sucesso

Acompanhe estas métricas para validar o quiz:

| Métrica | Meta | Como Medir |
|---------|------|------------|
| **Taxa de Início** | >40% | (Clicou no quiz / Visitantes da página) |
| **Taxa de Conclusão** | >70% | (Finalizou / Iniciou) |
| **Leads Qualificados** | >30% | (Hot + Qualified / Total) |
| **Conversão para Call** | >15% | (Agendou / Qualified) |
| **Tempo Médio** | <6min | AVG(completedAt - startedAt) |

**Query para Calcular:**
```sql
SELECT
  COUNT(*) as total_completed,
  COUNT(*) FILTER (WHERE lead_score IN ('hot', 'qualified')) as qualified,
  ROUND(
    COUNT(*) FILTER (WHERE lead_score IN ('hot', 'qualified'))::numeric / 
    COUNT(*)::numeric * 100, 
    1
  ) as qualification_rate,
  ROUND(AVG(score), 1) as avg_score
FROM quiz_results
WHERE created_at >= NOW() - INTERVAL '7 days';
```

---

## 🎯 Próximos Passos Recomendados

### Curto Prazo (Esta Semana)
1. ✅ **Implementar quiz** (Passos 1-3 acima)
2. ⏳ **Criar dashboard de leads** (Passo 4)
3. ⏳ **Configurar email automation** (enviar resultado por email)
4. ⏳ **Adicionar tracking analytics** (Google Analytics events)

### Médio Prazo (Próximas 2 Semanas)
5. ⏳ **Gerador de PDF** - Relatório para download
6. ⏳ **Integração com CRM** - Enviar leads para RD Station/HubSpot
7. ⏳ **A/B Testing** - Testar variações de perguntas
8. ⏳ **Social Proof** - "1.234 empresas já fizeram o diagnóstico"

### Longo Prazo (Próximo Mês)
9. ⏳ **AI-powered insights** - GPT-4 para análises mais profundas
10. ⏳ **Benchmark comparativo** - "Você está 30% acima da média"
11. ⏳ **Nurturing sequences** - Emails automáticos baseados no score
12. ⏳ **Multi-idioma** - EN/PT/ES

---

## 📞 Suporte

**Documentação Completa:** `/docs/QUIZ_INTERACTIVE_DOCUMENTATION.md`

**Arquivos de Referência:**
- Tipos: `/src/types/quiz.ts`
- Config: `/src/lib/quiz/quiz-config.ts`
- Engine: `/src/lib/quiz/quiz-engine.ts`
- Componentes: `/src/components/quiz/`

**Logs do Sistema:**
```bash
# Ver logs do quiz em tempo real
tail -f logs/dashboard-*.log | grep quiz
```

---

## ✅ Checklist Final

Antes de marcar como concluído:

- [ ] Migration SQL executada com sucesso
- [ ] Quiz funciona em http://localhost:3000/quiz
- [ ] Dados salvos aparecem em `SELECT * FROM quiz_results`
- [ ] Resultado mostra score e recomendações
- [ ] Links do e-book substituídos por links do quiz
- [ ] Dashboard de leads criado (opcional)
- [ ] Testado em mobile (responsivo)
- [ ] Git commit realizado

---

**Status:** ✅ Pronto para uso  
**Versão:** 1.0.0  
**Última atualização:** Janeiro 2025  
**Criado por:** ARCO Development Team
