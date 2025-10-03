# Estratégia de Funil: Lead Magnet → Tripwire → Pacote → Retainer

**Modelo:** Productized Services + Paid Discovery
**Objetivo:** Transformar curiosos em clientes pagantes através de degraus progressivos de valor e compromisso

---

## 1. TESE CENTRAL

**Problema:** Funis de serviço B2B tradicionais (cold → demo → proposta → negociação) têm fricção alta e baixa conversão (~2-5%).

**Solução:** Escada de valor com 4 degraus:
1. **Lead Magnet gratuito** - Captura e qualificação
2. **Tripwire pago** - Comprometimento inicial + entregável valioso
3. **Pacote produtizado** - Escopo fechado, prazo claro, resultado mensurável
4. **Retainer enxuto** - Manutenção + otimização contínua

**Referências:**
- Brennan Dunn - Paid Roadmapping/Discovery
- Jonathan Stark - Value-Based Pricing
- Flowout/Designjoy - Productized Services Model

---

## 2. HOMEPAGE ORIENTADA A CONVERSÃO

### 2.1 Hero (Above the Fold)

**Mensagem clara:**
```
Prestadores de Serviços Locais:
+350% em Leads Qualificados

Sistema completo de captação web + tráfego pago em 48h
ROI médio de 420% | 200+ empresas atendidas
```

**2 CTAs evidentes:**
1. **Primário:** "Agendar Diagnóstico Pago (R$ 497)" → Calendly inline
2. **Secundário:** "Baixar Checklist Gratuito" → Modal/LP

**Padrão UX:** Disclosure progressivo - valor imediato + sinalização de conteúdo abaixo

---

### 2.2 Prova Social Rápida

**3 Cards de casos:**
- Mini antes/depois
- 3 métricas objetivas (leads, conversão, ROI)
- Link para case completo (1 página)

**CTAs persistentes:** Hero CTAs visíveis em sticky bar

---

### 2.3 Como Funciona (3-4 passos)

**Clareza operacional:**
1. Diagnóstico ou Kickoff (7 dias)
2. Implementação (14-21 dias)
3. Primeira entrega mensurável (30 dias)
4. Otimização contínua (retainer opcional)

**Elementos:**
- Prazos específicos
- Limites de escopo claros
- Resultado esperado por etapa

**CTA:** "Ver Pacotes Detalhados" + âncora "Agendar"

---

### 2.4 Pacotes Produtizados (Cards)

**Estrutura por pacote:**
```markdown
## Pacote Starter - R$ 8.900
### O que entra:
- Auditoria técnica completa
- Landing page otimizada (1)
- Configuração Google Ads (3 campanhas)
- Pixel tracking + GA4
- Relatório semanal (4 semanas)

### O que NÃO entra:
- Budget de mídia (responsabilidade do cliente)
- Redesign de site existente
- Mais de 1 landing page

### Prazo: 21 dias úteis
### Resultado esperado: Primeiros leads qualificados em 7-10 dias
```

**CTA específico:** "Solicitar Proposta - Starter" → Form ou Calendly

---

### 2.5 Lead Magnet + Tripwire (Lado a Lado)

**Seção dual:**

**Coluna 1 - Gratuito:**
```
📄 Checklist: 15 Pontos de Otimização de Funil
✓ Consumo imediato (1 página)
✓ Autoavaliação guiada
✓ Benchmarks do setor

[Baixar Agora - Grátis]
```

**Coluna 2 - Pago:**
```
📊 Diagnóstico Express - R$ 497
✓ Auditoria técnica (site + tráfego)
✓ Plano priorizado de 14 dias
✓ 1 sessão de Q&A (30 min)

Prazo: 7 dias úteis | 100% aplicável
[Agendar Diagnóstico]
```

**Objetivo:** Bifurcação clara - aprender vs decidir

---

### 2.6 Calendly Embed + Thank You Page

**Integração:**
- Calendly inline (não popup)
- Evento GA4 no agendamento
- Redirect para `/thank-you-diagnostico`

**Thank You Page:**
- Confirmação visual
- Preparação para call (enviar GA access, URLs)
- Upsell sutil: "Enquanto aguarda, baixe o checklist"
- Pixel de conversão (Meta/Google)

---

### 2.7 FAQ + "Quando NÃO Faz Sentido"

**Transparência radical:**
```markdown
## Este serviço NÃO é para você se:
- Você tem <10 leads/mês (foco em SEO orgânico primeiro)
- Orçamento de mídia <R$ 2k/mês (inviável para teste)
- Não tem capacidade de atender +50% de demanda
- Busca "viralização" ou resultados em 48h
```

**Objetivo:** Filtrar leads não-qualificados e aumentar credibilidade

---

## 3. ROTEAMENTO INTELIGENTE (SEM QUEBRAR UX)

### 3.1 Por Origem (UTM)

**Exemplos:**
- `?utm_campaign=diagnostico` → Abrir seção Agenda expandida
- `?utm_campaign=checklist` → Highlight no lead magnet
- `?utm_source=linkedin&utm_content=case-saude` → Pré-selecionar setor Saúde

**Implementação:** Query params → scroll automático + visual cue

---

### 3.2 Por Comportamento (Client-side)

**Triggers:**
- Rolou >60% + abriu 1 case → CTA fixo "Agendar Diagnóstico"
- Só viu Hero + Prova → Reforçar "Baixar Checklist"
- Tempo na página >2 min sem ação → Exit intent com oferta

**Padrão:** Progressive engagement baseado em sinais

---

### 3.3 Por Estado (Cookie/Session)

**Regras:**
- Já baixou checklist → Esconder bloco de lead magnet, push para diagnóstico
- Já agendou diagnóstico → Mostrar "Preparação para call" em banner
- Visitante recorrente (3+ visitas) → CTA direto "Falar com Consultor"

**Objetivo:** Evitar repetição e guiar ao próximo passo

---

## 4. BIBLIOTECA DE LEAD MAGNETS E TRIPWIRES

### 4.1 Lead Magnets (Gratuitos)

**LM-01: Checklist de Otimização de Funil**
- Formato: PDF 1 página ou interactive checklist
- Conteúdo: 15 pontos críticos (site, LP, tráfego, conversão)
- Entrega: Email instantâneo + link direto
- Nurture: D0 (entrega), D2 (1 quick win), D5 (convite diagnóstico)

**LM-02: Template de Auditoria PPC/LP**
- Formato: Google Sheets template
- Conteúdo: Framework de autoavaliação com benchmarks
- Entrega: Link para copiar template
- Nurture: D1 (como usar), D4 (comparar com benchmarks), D7 (oferta diagnóstico)

**LM-03: Teardown em Vídeo (5 min)**
- Formato: Vídeo Loom/YouTube (unlisted)
- Conteúdo: Análise rápida de LP pública do nicho
- Entrega: Email com link privado
- Nurture: D0 (entrega), D3 ("quer um para seu site?"), D6 (diagnóstico com desconto)

**Por que funciona:**
- Consumo imediato (não "mais um ebook")
- Utilidade verificável (lead pode aplicar hoje)
- Segmentação natural (quem baixa X é perfil Y)

---

### 4.2 Tripwires (Pagos de Baixo Ticket)

**TW-01: Diagnóstico Express - R$ 497**

**Entregáveis:**
- Auditoria técnica (site + GA + Ads atual)
- Plano priorizado de 14 dias (3-5 ações críticas)
- 1 sessão Q&A de 30 min (alinhamento)

**Prazo:** 7 dias úteis
**Formato:** Relatório PDF + apresentação Loom
**Objetivo:** Qualificar lead + criar backlog para pacote

**Conversão esperada:** 15-25% dos leads quentes

---

**TW-02: Roadmapping de Funil - R$ 697**

**Entregáveis:**
- Workshop de 60-90 min (discovery)
- Mapa de jornada do cliente (atual vs ideal)
- Backlog priorizado por impacto/esforço
- ROI estimado por iniciativa

**Prazo:** Agendamento em 5 dias, entrega imediata post-call
**Objetivo:** Paid discovery antes do pacote (reduz escopo difuso)

**Conversão esperada:** 30-40% convertem para pacote

---

**TW-03: Audit de Campanha Ativa - R$ 397**

**Entregáveis:**
- Análise de 1 campanha Google/Meta
- 5-10 ajustes priorizados
- Vídeo explicativo (10 min)

**Prazo:** 3-5 dias
**Objetivo:** "Quick win" que prova competência técnica

**Conversão esperada:** 20-30% upsell para gestão completa

---

### 4.3 Critérios de Sucesso para LM/TW

**Lead Magnet:**
- ✅ Consome em <10 min
- ✅ Gera 1 insight acionável
- ✅ Segmenta por interesse/maturidade
- ✅ Ponte clara para tripwire

**Tripwire:**
- ✅ Preço "sem pensar" (R$ 300-700)
- ✅ Entregável tangível e útil
- ✅ Prazo curto (3-7 dias)
- ✅ 100% aplicável mesmo se não fechar pacote
- ✅ Qualifica orçamento e urgência

---

## 5. FLUXOS DE NURTURE (EMAIL SEQUENCES)

### 5.1 Pós-Lead Magnet (D0-D7)

**D0 - Entrega + Primeiro Passo:**
```
Assunto: Seu checklist + 1 ação para hoje

João, aqui está seu Checklist de Otimização.

PRIMEIRO PASSO RÁPIDO:
Meça seu tempo de carregamento agora:
[Link PageSpeed Insights]

Se LCP > 2.5s, você está perdendo 20-40% de conversões.

Quer saber quanto? Use nossa calculadora:
[Link ROI Calculator]

---
Equipe ARCO
```

**D2 - Quick Win Educativo:**
```
Assunto: 80% dos sites erram isso (+ como corrigir)

A maioria perde leads porque:
❌ CTA genérico ("Saiba Mais")
❌ Formulário com 8+ campos
❌ Sem prova social above-the-fold

QUICK FIX: Teste um CTA específico
Antes: "Saiba Mais"
Depois: "Agendar Avaliação Gratuita"

Case real: +34% conversão em 1 semana.

Quer auditoria do seu funil?
[Diagnóstico Express - R$ 497]
```

**D5 - Convite com Desconto:**
```
Assunto: Diagnóstico Express - Desconto 20% (48h)

João, vi que você baixou nosso checklist.
Nota: empresas similares estão perdendo R$ 20-50k/ano
por não otimizar funil + tráfego.

OFERTA EXCLUSIVA:
Diagnóstico Express por R$ 397 (vs R$ 497)
Válido por 48h.

O que você recebe:
✓ Auditoria técnica completa
✓ Plano de ação de 14 dias
✓ 30 min de Q&A comigo

[Agendar Agora - Vagas Limitadas]
```

**D7 - Last Touch (Social Proof):**
```
Assunto: Como a [Empresa X] conseguiu +127% em leads

[Case curto - 3 parágrafos]

Resultado: +127% leads qualificados em 60 dias
Investimento: R$ 12k (pacote inicial)
ROI: 340%

Você está a 1 diagnóstico de resultado similar.

[Ver Pacotes] ou [Baixar Case Completo]
```

---

### 5.2 Pós-Diagnóstico Pago (D0-D14)

**D0 - Confirmação + Preparação:**
```
Assunto: Diagnóstico confirmado - Próximos passos

João, seu diagnóstico está agendado para [DATA/HORA].

PREPARAÇÃO (5 min):
1. Conceda acesso view-only ao Google Analytics
   [Tutorial]
2. Compartilhe URLs principais (site, LPs)
3. Preencha breve questionário
   [3 perguntas sobre objetivos]

Isso garante que o diagnóstico seja 100% focado no seu negócio.

Nos vemos em [X dias].
```

**D+1 (Pós-Call) - Entrega:**
```
Assunto: Seu Diagnóstico + Próximas Ações

[Anexo: Diagnóstico_João_v1.pdf]

João, aqui está seu diagnóstico completo.

RESUMO EXECUTIVO:
🔴 3 restrições críticas identificadas
🟡 5 oportunidades de quick win
🟢 Potencial de +R$ 28k/ano (conservador)

PRÓXIMAS AÇÕES (prioridade):
1. [Ação específica com impacto estimado]
2. [Ação específica com impacto estimado]
3. [Ação específica com impacto estimado]

QUERO IMPLEMENTAR ISSO:
[Agendar Proposta de Pacote - 15 min]

Dúvidas? Responda este email.
```

**D+5 - Follow-up (Se não agendou):**
```
Assunto: Dúvidas sobre o diagnóstico?

João, espero que o diagnóstico tenha sido útil.

Pergunta rápida: o que está travando a implementação?
[ ] Orçamento
[ ] Prioridade interna
[ ] Preciso de mais dados
[ ] Outra razão

Respondendo, posso te ajudar com próximo passo.

P.S.: 70% das empresas que implementam nosso plano
veem resultados em <30 dias. Quer ser uma delas?

[Agendar 15 min]
```

**D+10 - Último Toque:**
```
Assunto: Liberando sua vaga (última chance)

João, mantenho vagas reservadas para quem fez diagnóstico.

Sua vaga expira em 48h.

Se não quiser seguir, sem problemas.
Mas se sim, este é o momento.

[Reservar Vaga - Pacote Starter]

Caso contrário, voltamos a conversar em 90 dias.
```

---

### 5.3 Pós-Entrega de Pacote (Retenção)

**Ao completar pacote:**
```
Assunto: Resultado da Sprint 1 + Próxima Restrição

[Relatório visual - 1-2 páginas]

RESULTADOS:
✅ Leads: +42% (vs baseline)
✅ Conversão LP: 8.2% (vs 4.1%)
✅ CAC: -28%

PRÓXIMA RESTRIÇÃO IDENTIFICADA:
[Ex: Qualificação de leads - 30% não-fit]

PROPOSTA: Retainer de Otimização
R$ 3.5k/mês | Cancelável a qualquer momento

Inclui:
- 2 hipóteses/mês testadas
- Relatório quinzenal
- Ajustes de campanha contínuos

[Aceitar Proposta] ou [Agendar Dúvidas]
```

---

## 6. AQUISIÇÃO PAGA (ORDEM DE IMPLEMENTAÇÃO)

### Primeiros 30 Dias

**Semana 1-2: Search de Alta Intenção**
- Campanhas: "diagnóstico marketing digital", "auditoria google ads", "consultoria tráfego pago [cidade]"
- Landing Page: Diagnóstico Express (R$ 497)
- Budget: R$ 2-3k
- Meta: 10-15 agendamentos

**Semana 3-4: Retargeting**
- Audiência: Visitou homepage/LP e não converteu
- Formatos: Display + Video (YouTube)
- Oferta: Lead magnet (checklist) ou diagnóstico com desconto
- Budget: R$ 1-2k

---

### Dias 30-60: Expansão Controlada

**Custom Segments (Google):**
- Keywords: "como gerar leads", "marketing para advogados", "anúncios google ads"
- URLs: Sites de referência do nicho (concorrentes, blogs, associações)
- Uso: Demand Gen, PMAX light, YouTube

**Lookalike (Meta):**
- Seed: Emails que agendaram diagnóstico
- Tamanho: 1% (mais similar)
- Formato: Carousel com cases
- Oferta: Lead magnet ou webinar

---

### Dias 60-90: Escala com Customer Match

**Google Customer Match:**
- Lista: Emails de clientes atuais + diagnósticos convertidos
- Objetivo: Similar Audiences para Search/Display
- Bid strategy: Target ROAS (após baseline)

**Meta Custom Audiences:**
- Lista: Mesma base
- Lookalike 1-3% progressivo
- Creative: Testemunhais em vídeo

---

### KPIs por Canal (90 dias)

**Search:**
- CPC: R$ 8-15
- CTR: >3%
- Conv. Rate (agendamento): >10%
- CPA (diagnóstico): <R$ 200

**Retargeting:**
- CPM: R$ 20-40
- Conv. Rate: >5%
- CPA: <R$ 150

**Custom/Lookalike:**
- CPM: R$ 30-60
- Conv. Rate: 2-4%
- CPA: <R$ 250

---

## 7. MEDIÇÃO E INSTRUMENTAÇÃO

### 7.1 GA4 Key Events

```javascript
// Homepage
'lead_magnet_downloaded' // Baixou checklist/template
'calculator_completed'   // Usou ROI calculator
'diagnostico_viewed'     // Viu seção de diagnóstico

// Tripwire
'diagnostico_booked'     // Agendou via Calendly
'diagnostico_paid'       // Pagamento confirmado

// Pacote
'proposta_solicitada'    // Clicou "Solicitar Proposta"
'proposta_enviada'       // Enviamos proposta (server-side)
'pacote_fechado'         // Deal closed

// Retainer
'retainer_accepted'      // Aceitou retainer pós-pacote
```

---

### 7.2 Calendly + GA4

**Integração nativa:**
- Calendly > Settings > Integrations > Google Analytics
- Event auto-tracking: `calendly_event_scheduled`

**Custom redirect:**
```javascript
// Calendly embed options
{
  url: 'https://calendly.com/arco/diagnostico',
  utm: {
    utmSource: 'website',
    utmMedium: 'homepage',
    utmCampaign: 'diagnostico-q4'
  },
  // Redirect após agendamento
  redirectUrl: 'https://arco.com/thank-you-diagnostico?booked=true'
}
```

**Thank You Page tracking:**
```javascript
// /thank-you-diagnostico
useEffect(() => {
  gtag('event', 'diagnostico_booked', {
    value: 497,
    currency: 'BRL',
    event_category: 'tripwire',
    event_label: 'diagnostico_express'
  });

  // Meta Pixel
  fbq('track', 'Schedule', {
    value: 497,
    currency: 'BRL',
    content_name: 'Diagnostico Express'
  });
}, []);
```

---

### 7.3 Conversions API (Deduplicação)

**Meta CAPI:**
```javascript
// Server-side event (após Calendly webhook)
const eventData = {
  event_name: 'Schedule',
  event_time: Math.floor(Date.now() / 1000),
  event_id: bookingId, // Mesmo ID do pixel browser
  user_data: {
    em: hashEmail(userEmail),
    ph: hashPhone(userPhone),
    client_ip_address: req.ip,
    client_user_agent: req.headers['user-agent']
  },
  custom_data: {
    value: 497,
    currency: 'BRL',
    content_name: 'Diagnostico Express'
  },
  event_source_url: 'https://arco.com/thank-you-diagnostico'
};

await fetch('https://graph.facebook.com/v18.0/{pixel-id}/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: [eventData],
    access_token: process.env.META_CAPI_TOKEN
  })
});
```

**Deduplicação:**
- Browser pixel: `event_id = booking_12345`
- CAPI server: `event_id = booking_12345` (mesmo ID)
- Meta dedup automaticamente em janela de 48h

---

### 7.4 Dashboards Críticos

**Funil de Conversão (GA4 Exploration):**
```
Homepage → Lead Magnet Downloaded → Diagnostico Booked → Diagnostico Paid → Proposta Enviada → Pacote Fechado
```

**Cohort por Origem (Looker Studio):**
- Cohort: Data de primeiro contato
- Métrica: % que chegou a cada etapa em 7/14/30/60 dias
- Segmento: Origem (Search, Social, Retargeting, etc)

**CAC por Canal (Google Sheets + Scripts):**
```
CAC_Diagnostico = (Ad Spend) / (Diagnosticos Agendados)
CAC_Pacote = (Ad Spend + Custo Diagnósticos) / (Pacotes Fechados)
LTV_Pacote = (Pacote R$ 8.9k) + (40% * Retainer R$ 3.5k * 12 meses)
         = R$ 25.7k

Target: CAC < 20% LTV → <R$ 5.1k
```

---

## 8. CRONOGRAMA DE EXECUÇÃO (60 DIAS)

### Semanas 1-2: Foundation
- [ ] Publicar homepage com seções orientadas a conversão
- [ ] Criar LP do Diagnóstico Express (R$ 497)
- [ ] Criar LM-01 (Checklist PDF)
- [ ] Setup Calendly + GA4 + Thank You pages
- [ ] Subir Search campaigns (alta intenção)

### Semanas 3-4: Lead Magnets + Tripwires
- [ ] Criar LM-02 (Template de Auditoria)
- [ ] Criar TW-02 (Roadmapping - R$ 697)
- [ ] Setup email sequences (pós-LM, pós-TW)
- [ ] Ativar retargeting (Display + Video)
- [ ] Criar 1 case de 1 página (social proof)

### Semanas 5-6: Custom Audiences
- [ ] Compilar seeds (keywords + URLs)
- [ ] Criar custom segments (Google)
- [ ] Ativar Demand Gen campaigns
- [ ] Setup Customer Match (se base >100 emails)
- [ ] Criar Lookalike 1% (Meta)

### Semanas 7-8: Otimização + Escala
- [ ] Análise de cohorts (D7, D14, D30)
- [ ] Ajustar bids por performance
- [ ] A/B test headlines/CTAs
- [ ] Criar LM-03 (Teardown em vídeo)
- [ ] Lançar retainer (pós-entrega de 2-3 pacotes)

---

## 9. MÉTRICAS DE SUCESSO (90 DIAS)

### Topo de Funil
- **Visitantes qualificados:** 2.000-3.000/mês (via paid + organic)
- **Lead magnet opt-in:** 15-25% dos visitantes
- **ROI calculator completion:** 30-40% dos visitantes

### Meio de Funil
- **Diagnóstico agendado:** 10-15/mês (conversão de 5-8% dos leads)
- **Show-up rate:** >70% (com reminder automation)
- **Diagnóstico pago:** 8-12/mês (R$ 4-6k MRR)

### Fundo de Funil
- **Proposta enviada:** 60% dos diagnósticos
- **Pacote fechado:** 40% das propostas (4-5 pacotes/mês)
- **Ticket médio:** R$ 8-12k (pacote inicial)

### Retenção
- **Retainer conversion:** 50% dos pacotes entregues
- **Churn mensal:** <10%
- **LTV:** R$ 25-30k (pacote + 12 meses retainer)

### Financeiro
- **CAC blended:** R$ 3-5k
- **LTV/CAC:** >5x
- **Payback:** 3-4 meses
- **MRR:** R$ 40-60k (após 90 dias)

---

## 10. RISCOS E MITIGAÇÕES

### Risco 1: Baixa conversão lead magnet → tripwire
**Sintoma:** >100 downloads, <5 agendamentos
**Diagnóstico:** Lead magnet não qualifica ou nurture fraco
**Mitigação:**
- A/B test diferentes LMs (checklist vs template vs vídeo)
- Reescrever sequence (mais value, menos pitch)
- Adicionar social proof em D2/D5

---

### Risco 2: Alta taxa de no-show em diagnósticos
**Sintoma:** >30% não aparecem na call
**Diagnóstico:** Baixo compromisso (preço muito baixo?) ou preparação ruim
**Mitigação:**
- Reminder 24h + 2h antes (automação)
- Email de preparação com "homework"
- Considerar aumentar preço (R$ 497 → R$ 697)
- Política de reagendamento clara

---

### Risco 3: Tripwire não converte para pacote
**Sintoma:** Diagnósticos entregues mas <30% viram proposta
**Diagnóstico:** Entregável não gera urgência ou preço do pacote muito alto
**Mitigação:**
- Incluir "custo de oportunidade" no diagnóstico (R$ X/mês perdido)
- Oferecer pacote "light" de R$ 5-6k
- Criar senso de urgência (vagas limitadas, desconto D+7)

---

### Risco 4: CAC muito alto em custom/lookalike
**Sintoma:** CPA >R$ 500 em campanhas de discovery
**Diagnóstico:** Seed ruim ou creative fraco
**Mitigação:**
- Refinar seeds (testar URLs mais nichados)
- Trocar creative (menos genérico, mais case-driven)
- Pausar e focar em Search + retargeting até base maior

---

### Risco 5: Churn alto no retainer
**Sintoma:** >20% cancelam no mês 2-3
**Diagnóstico:** Expectativas mal alinhadas ou valor não-demonstrado
**Mitigação:**
- Relatórios quinzenais com wins claros
- Roadmap visível (fila de hipóteses)
- Check-in mensal executivo (não só métricas)
- Cancelamento fácil (reduz atrito psicológico)

---

## 11. PRÓXIMOS PASSOS IMEDIATOS

### Semana 1 - Setup
- [ ] Criar documento de copy (headlines, CTAs, email sequences)
- [ ] Wireframe da homepage (seções 2.1-2.7)
- [ ] Spec técnica do ROI Calculator revisado
- [ ] Setup Calendly + integração GA4

### Semana 2 - Conteúdo
- [ ] Escrever LM-01 (Checklist)
- [ ] Criar template de diagnóstico (TW-01)
- [ ] Estruturar 1 case completo
- [ ] Gravar vídeo de apresentação (Hero ou LM-03)

### Semana 3 - Tech
- [ ] Implementar homepage sections
- [ ] Build ROI Calculator v2
- [ ] Setup email automation (ConvertKit/Mailchimp)
- [ ] Configurar tracking completo (GA4 + Pixels)

### Semana 4 - Ads
- [ ] Research de keywords (Search)
- [ ] Criar campanhas Search + Retargeting
- [ ] Compilar seeds para custom segments
- [ ] Lançar campanhas com budget controlado (R$ 3-5k)

---

## CONCLUSÃO

Este funil **não é teórico** - é baseado em modelos validados por consultores que vivem disso (Brennan Dunn, Jonathan Stark) e empresas de productized services (Flowout, Designjoy).

**Diferencial vs funil tradicional:**
- ❌ Cold → Demo → Proposta → "Vou pensar" (conversão ~2%)
- ✅ Magnet → Tripwire → Pacote → Retainer (conversão ~15-25%)

**Por que funciona:**
1. **Fricção gradual** - Compromisso aumenta aos poucos (grátis → R$ 497 → R$ 8k)
2. **Valor antecipado** - Lead recebe algo útil **antes** de pagar muito
3. **Qualificação natural** - Quem paga R$ 497 tem orçamento para R$ 8k
4. **Escopo claro** - Pacotes produtizados eliminam negociação infinita
5. **Retenção estruturada** - Retainer baseado em processo, não em horas

**Investimento inicial:** 4 semanas (1 pessoa full-time ou 2 part-time)
**Break-even esperado:** 60-90 dias
**Escala:** 10-15 pacotes/mês + 20-30 retainers = R$ 150-200k MRR (após 12 meses)

---

**Status:** 🟢 Pronto para execução
**DRI:** [Definir]
**Start Date:** [Definir]
