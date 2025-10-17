# 🔗 Integração do Quiz - Exemplos de Uso

## Substituindo o E-book por Quiz

### 1. Homepage - Hero Section

#### Antes (E-book)
```tsx
// /src/app/page.tsx
<section className="hero">
  <h1>Acelere Seus Resultados Digitais</h1>
  <p>Baixe nosso e-book gratuito com estratégias comprovadas</p>
  <Button href="/ebook" size="lg">
    Baixar E-book Gratuito
    <Download className="ml-2" />
  </Button>
</section>
```

#### Depois (Quiz)
```tsx
// /src/app/page.tsx
<section className="hero">
  <h1>Acelere Seus Resultados Digitais</h1>
  <p>Descubra o potencial do seu negócio em 5 minutos</p>
  <Button href="/quiz" size="lg">
    Fazer Diagnóstico Gratuito
    <Target className="ml-2" />
  </Button>
  <p className="text-sm text-muted-foreground mt-2">
    ⏱️ 5 minutos • ✅ 100% personalizado • 🎯 Recomendações práticas
  </p>
</section>
```

---

### 2. Rodapé - Lead Magnet

#### Antes
```tsx
<footer>
  <div className="lead-magnet">
    <h3>Recursos Gratuitos</h3>
    <ul>
      <li><a href="/ebook">E-book: Guia Completo de Marketing Digital</a></li>
      <li><a href="/checklist">Checklist de SEO</a></li>
    </ul>
  </div>
</footer>
```

#### Depois
```tsx
<footer>
  <div className="lead-magnet">
    <h3>Recursos Gratuitos</h3>
    <ul>
      <li>
        <a href="/quiz" className="font-semibold text-primary">
          🎯 Diagnóstico Estratégico Digital
        </a>
        <span className="text-xs text-muted-foreground ml-2">Novo!</span>
      </li>
      <li><a href="/checklist">Checklist de SEO</a></li>
    </ul>
  </div>
</footer>
```

---

### 3. Pop-up de Exit Intent

#### Antes
```tsx
// /src/components/exit-intent-modal.tsx
export function ExitIntentModal() {
  return (
    <Modal>
      <h2>Espere! Não vá embora</h2>
      <p>Baixe nosso e-book gratuito antes de sair</p>
      <form onSubmit={handleSubmit}>
        <Input name="email" placeholder="Seu e-mail" />
        <Button type="submit">Enviar E-book</Button>
      </form>
    </Modal>
  )
}
```

#### Depois
```tsx
// /src/components/exit-intent-modal.tsx
export function ExitIntentModal() {
  return (
    <Modal>
      <h2>Antes de ir... Descubra seu potencial!</h2>
      <p>5 minutos de diagnóstico podem mudar sua estratégia</p>
      <div className="space-y-4">
        <Button asChild size="lg" className="w-full">
          <a href="/quiz">
            Fazer Diagnóstico Gratuito
            <ArrowRight className="ml-2" />
          </a>
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Não, obrigado
        </Button>
      </div>
    </Modal>
  )
}
```

---

### 4. Blog Posts - CTA no Final

#### Antes
```tsx
// /src/components/blog-post-cta.tsx
export function BlogPostCTA() {
  return (
    <Card className="p-6 bg-primary/5">
      <h3>Gostou do conteúdo?</h3>
      <p>Baixe nosso e-book completo sobre o assunto</p>
      <Button href="/ebook">Baixar E-book</Button>
    </Card>
  )
}
```

#### Depois
```tsx
// /src/components/blog-post-cta.tsx
export function BlogPostCTA() {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
      <h3>Quer resultados como estes?</h3>
      <p>Faça um diagnóstico gratuito e descubra oportunidades no seu negócio</p>
      <Button href="/quiz" size="lg" className="mt-4">
        Iniciar Diagnóstico (5 min)
      </Button>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        <li>✅ Análise personalizada</li>
        <li>✅ Recomendações práticas</li>
        <li>✅ 100% gratuito</li>
      </ul>
    </Card>
  )
}
```

---

### 5. Página de Contato - Alternativa ao Formulário

#### Antes
```tsx
// /src/app/contato/page.tsx
export default function ContatoPage() {
  return (
    <div>
      <h1>Entre em Contato</h1>
      <ContactForm />
    </div>
  )
}
```

#### Depois
```tsx
// /src/app/contato/page.tsx
export default function ContatoPage() {
  return (
    <div>
      <h1>Entre em Contato</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h2>Formulário de Contato</h2>
          <ContactForm />
        </Card>
        
        <Card className="p-6 bg-primary/5">
          <h2>Ou faça um Diagnóstico</h2>
          <p className="text-muted-foreground mb-4">
            Responda 15 perguntas e receba uma análise personalizada
          </p>
          <Button href="/quiz" size="lg" className="w-full">
            Iniciar Diagnóstico
          </Button>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Você receberá recomendações específicas para seu negócio
          </p>
        </Card>
      </div>
    </div>
  )
}
```

---

### 6. Navegação Principal - Adicionar ao Menu

#### Antes
```tsx
// /src/components/navigation.tsx
const menuItems = [
  { href: '/', label: 'Início' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]
```

#### Depois
```tsx
// /src/components/navigation.tsx
const menuItems = [
  { href: '/', label: 'Início' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/quiz', label: 'Diagnóstico', badge: 'Novo' }, // 👈 Destaque
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

// Renderização com badge
{menuItems.map(item => (
  <a key={item.href} href={item.href} className="nav-link">
    {item.label}
    {item.badge && (
      <Badge className="ml-2 text-xs">{item.badge}</Badge>
    )}
  </a>
))}
```

---

### 7. Email Marketing - Adicionar CTA

#### Template de Email
```html
<!-- Email Newsletter -->
<table>
  <tr>
    <td>
      <h2>Novidade: Diagnóstico Estratégico Digital</h2>
      <p>
        Descubra em 5 minutos o potencial de crescimento do seu negócio.
        Receba uma análise personalizada com recomendações práticas.
      </p>
      <a href="https://seusite.com/quiz?utm_source=email&utm_campaign=newsletter" 
         style="background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
        Fazer Diagnóstico Gratuito
      </a>
    </td>
  </tr>
</table>
```

---

### 8. Redes Sociais - Posts de Divulgação

#### Instagram Caption
```
🎯 Novo: Diagnóstico Estratégico Digital!

Descubra em 5 minutos:
✅ Qual sua maturidade digital
✅ Principais oportunidades de crescimento
✅ Recomendações personalizadas

100% gratuito • 100% personalizado

Link na bio 👆

#MarketingDigital #Estratégia #Negócios #Diagnóstico #Crescimento
```

#### LinkedIn Post
```
🚀 Lançamento: Diagnóstico Estratégico Digital

Cansado de estratégias genéricas?

Criamos uma ferramenta que em 5 minutos mapeia:

📊 Sua maturidade digital atual
🎯 Áreas prioritárias de investimento
💡 Recomendações práticas e mensuráveis

15 perguntas estratégicas que substituem horas de reuniões de discovery.

Faça o diagnóstico gratuito: [link]

#B2B #MarketingDigital #Estratégia #Performance
```

---

### 9. Dashboard Admin - Menu de Navegação

#### Adicionar ao Sidebar
```tsx
// /src/components/dashboard/sidebar-navigation.tsx
const adminMenuItems = [
  {
    label: 'Analytics',
    items: [
      { href: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
      { href: '/dashboard/leads', label: 'Leads do Quiz', icon: Users, badge: qualifiedCount }, // 👈 Novo
      { href: '/dashboard/clients', label: 'Clientes', icon: Briefcase },
    ]
  },
  // ... resto dos itens
]
```

#### Página de Leads
```tsx
// /src/app/dashboard/leads/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DataTable } from '@/components/ui/data-table'

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads do Quiz</h1>
          <p className="text-muted-foreground">
            {leads.length} leads capturados • 
            {leads.filter(l => l.lead_score === 'qualified').length} qualificados
          </p>
        </div>
        <Button onClick={() => exportToCSV(leads)}>
          Exportar CSV
        </Button>
      </div>

      <DataTable
        columns={[
          { accessorKey: 'name', header: 'Nome' },
          { accessorKey: 'email', header: 'E-mail' },
          { accessorKey: 'company', header: 'Empresa' },
          { 
            accessorKey: 'score', 
            header: 'Score',
            cell: ({ row }) => (
              <span className="font-bold">{row.original.score}</span>
            )
          },
          {
            accessorKey: 'lead_score',
            header: 'Status',
            cell: ({ row }) => (
              <Badge variant={
                row.original.lead_score === 'qualified' ? 'default' :
                row.original.lead_score === 'hot' ? 'destructive' :
                row.original.lead_score === 'warm' ? 'secondary' : 'outline'
              }>
                {row.original.lead_score.toUpperCase()}
              </Badge>
            )
          },
          {
            accessorKey: 'verticals',
            header: 'Verticais',
            cell: ({ row }) => (
              <div className="flex flex-wrap gap-1">
                {row.original.verticals?.slice(0, 2).map(v => (
                  <Badge key={v} variant="outline" className="text-xs">
                    {v}
                  </Badge>
                ))}
              </div>
            )
          },
          {
            id: 'actions',
            cell: ({ row }) => (
              <Button 
                size="sm" 
                onClick={() => contactLead(row.original)}
              >
                Contatar
              </Button>
            )
          }
        ]}
        data={leads}
      />
    </div>
  )
}
```

---

### 10. Analytics Tracking - Google Analytics

#### Eventos do Quiz
```tsx
// /src/lib/analytics.ts
import { event } from 'nextjs-google-analytics'

export const trackQuizEvent = (eventName: string, params?: any) => {
  // Google Analytics 4
  event(eventName, {
    category: 'Quiz',
    ...params
  })
}

// Uso nos componentes:
trackQuizEvent('quiz_started')
trackQuizEvent('quiz_contact_submitted', { email: 'user@example.com' })
trackQuizEvent('quiz_section_completed', { section: 'pain-points' })
trackQuizEvent('quiz_completed', { 
  score: 85, 
  leadScore: 'qualified',
  verticals: ['performance', 'marketing']
})
trackQuizEvent('quiz_result_viewed')
trackQuizEvent('quiz_report_downloaded')
trackQuizEvent('quiz_schedule_call_clicked')
```

---

### 11. Email Automation - Enviar Resultado

#### Trigger após Quiz
```typescript
// /src/lib/email/quiz-results.ts
import { Resend } from 'resend'
import { QuizResult } from '@/types/quiz'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendQuizResultEmail(
  email: string,
  name: string,
  result: QuizResult
) {
  await resend.emails.send({
    from: 'ARCO <noreply@arco.digital>',
    to: email,
    subject: `${name}, seu Diagnóstico Estratégico está pronto!`,
    html: `
      <h1>Olá ${name}!</h1>
      <p>Obrigado por completar nosso Diagnóstico Estratégico Digital.</p>
      
      <h2>Seu Score: ${result.profile.score}/100</h2>
      <p>Classificação: ${result.profile.leadScore.toUpperCase()}</p>
      
      <h3>Áreas Prioritárias:</h3>
      <ul>
        ${result.recommendations.map(rec => `
          <li><strong>${rec.title}</strong>: ${rec.description}</li>
        `).join('')}
      </ul>
      
      <p>
        <a href="${process.env.NEXT_PUBLIC_URL}/agendamentos" 
           style="background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Agendar Consultoria Gratuita
        </a>
      </p>
      
      <p>
        Ou veja o resultado completo: 
        <a href="${process.env.NEXT_PUBLIC_URL}/quiz/resultado/${result.profile.email}">
          Acessar Diagnóstico
        </a>
      </p>
    `
  })
}

// Integrar no quiz-interactive.tsx:
const finishQuiz = async () => {
  const quizResult = QuizEngine.processQuizResult(state.responses, contactInfo)
  setResult(quizResult)
  
  // Enviar email
  await sendQuizResultEmail(
    contactInfo.email,
    contactInfo.name,
    quizResult
  )
  
  setStep('result')
}
```

---

### 12. UTM Tracking - Rastrear Fonte

#### Capturar UTMs na URL
```tsx
// /src/components/quiz/quiz-interactive.tsx
useEffect(() => {
  // Capturar UTM params da URL
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source')
  const utmMedium = params.get('utm_medium')
  const utmCampaign = params.get('utm_campaign')
  
  // Salvar no estado ou localStorage
  if (utmSource || utmMedium || utmCampaign) {
    setContactInfo(prev => ({
      ...prev,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign
    }))
  }
}, [])

// Incluir no saveQuizResult:
await supabase.from('quiz_results' as any).insert({
  // ... outros campos
  utm_source: contactInfo.utm_source,
  utm_medium: contactInfo.utm_medium,
  utm_campaign: contactInfo.utm_campaign,
})
```

---

## 🔗 URLs com UTM Tracking

### Campanhas Recomendadas

```
# Homepage Hero
/quiz?utm_source=homepage&utm_medium=hero&utm_campaign=diagnostic

# Blog Post
/quiz?utm_source=blog&utm_medium=cta&utm_campaign=performance-post

# Email Newsletter
/quiz?utm_source=email&utm_medium=newsletter&utm_campaign=january-2025

# Facebook Ads
/quiz?utm_source=facebook&utm_medium=paid&utm_campaign=lead-gen-q1

# Instagram Bio
/quiz?utm_source=instagram&utm_medium=bio&utm_campaign=organic

# LinkedIn Post
/quiz?utm_source=linkedin&utm_medium=organic&utm_campaign=thought-leadership
```

---

## ✅ Checklist de Integração

### Implementação Básica
- [ ] Migration SQL executada
- [ ] Quiz testado e funcionando
- [ ] Homepage com link para /quiz
- [ ] Menu de navegação com "Diagnóstico"
- [ ] Rodapé com link para quiz

### Conversão Avançada
- [ ] Exit intent modal configurado
- [ ] Blog posts com CTA do quiz
- [ ] Página de contato com alternativa quiz
- [ ] Dashboard de leads (/dashboard/leads)
- [ ] Email automation configurada

### Marketing & Analytics
- [ ] Google Analytics events configurados
- [ ] UTM tracking implementado
- [ ] Posts de divulgação nas redes sociais
- [ ] Email marketing com CTA do quiz
- [ ] Remarketing configurado (quiz abandonado)

---

**Documentação Relacionada:**
- [Documentação Completa](/docs/QUIZ_INTERACTIVE_DOCUMENTATION.md)
- [Guia Rápido](/docs/QUIZ_QUICK_START.md)
- [Resumo Executivo](/docs/QUIZ_EXECUTIVE_SUMMARY.md)
