# 🎯 Landing Page Strategy - ARCO Salão Beleza

**Status:** Phase 2 - Copy Optimization & Engagement Flow
**Versão:** 2.0
**Data:** 2025-10-22
**Objetivo:** S-tier UX/UI + Mobile-first + Copy consultivo (value over price)

---

## 📋 Índice

1. [Filosofia de Design](#filosofia-de-design)
2. [Estratégia de Copy](#estratégia-de-copy)
3. [Fluxo de Usuário (User Journey)](#fluxo-de-usuário)
4. [Componentes por Seção](#componentes-por-seção)
5. [Guia de Implementação](#guia-de-implementação)
6. [Métricas & Validação](#métricas--validação)

---

## 🎨 Filosofia de Design

### Princípios

| Princípio | Descrição | Aplicação |
|-----------|-----------|-----------|
| **Mobile-First** | Design para 6"→24", desktop é evolução | Cada componente responsive desde 320px |
| **Progressive Disclosure** | Revelar complexidade conforme usuário engaja | FAQs expandíveis, componentes lazy-load |
| **Whitespace First** | Respiração visual > densidades | 24px min padding, 16px line-height mobile |
| **Micro-interactions** | Feedback subtil, não animação por animação | Scroll triggers, hover states, loading states |
| **Consultativo** | Educar antes de vender | Copy começa com "entenda", não "compre" |
| **Transparência Radical** | Mostrar limitações, não só casos bons | 4 tiers de resultado, menção de quando NÃO funciona |

### Paleta de Cores (Campaign-aware)

```typescript
// Usar campaign.color_primary e campaign.color_secondary
// Fallback: gradient predefinido (exemplo abaixo)

const colors = {
  primary: {
    light: '#667eea',    // Azul principal
    dark: '#764ba2',     // Roxo secondary (gradient)
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  status: {
    success: '#10b981',  // Verde
    warning: '#f59e0b',  // Âmbar
    error: '#ef4444',    // Vermelho
    info: '#3b82f6',     // Azul info
  },
  neutral: {
    bg: '#f8fafc',       // Slate-50 (fundo claro)
    border: '#e2e8f0',   // Slate-200 (borders)
    text: '#1e293b',     // Slate-900 (texto principal)
    muted: '#64748b',    // Slate-500 (texto secundário)
  },
};

// Mobile: Reduzir cores. Desktop: Usar gradientes.
// Regra: Max 3 cores por seção.
```

### Tipografia

```css
/* Mobile-first sizing */
h1 { font-size: 28px; line-height: 1.2; font-weight: 700; letter-spacing: -0.5px; }  /* 28/33 desktop */
h2 { font-size: 24px; line-height: 1.3; font-weight: 600; }                          /* 24/32 desktop */
h3 { font-size: 20px; line-height: 1.4; font-weight: 600; }                          /* 20/28 desktop */
body { font-size: 16px; line-height: 1.6; font-weight: 400; }                        /* 16/24 desktop */
small { font-size: 14px; line-height: 1.5; }                                         /* 14/21 desktop */

/* Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold) */
/* Font stack: Inter/Geist (system fonts fallback) */
```

### Spacing System (8px base)

```
xs: 4px (micro spacing)
sm: 8px (button padding, icon gaps)
md: 16px (section padding, card gaps)
lg: 24px (section margins)
xl: 32px (hero padding, large gaps)
2xl: 48px (section margins top)
```

---

## 📝 Estratégia de Copy

### Tone of Voice

```
❌ "Transforme seu salão em 30 dias!"
✅ "Entenda como clientes encontram você online — e o que fazer a respeito."

❌ "Aumento de 340% garantido!"
✅ "Clientes relatam crescimento de 20-40% no mês de estabilização."

❌ "A solução número 1 do Brasil!"
✅ "Validado em 23 salões. Nem sempre é a solução ideal — vamos avaliar se é pra você."
```

**Regra de Ouro:** Consultivo > Vendedor. Educação > Promessa.

### Copy Structure por Seção

#### HERO Section

**Objetivo:** Capturar atenção + estabelecer dor única

```
Badge:      "Metodologia Verificada • Estruturação de Oferta"
           (não é hype, é credibilidade)

Headline:   "Cliente te encontra, agenda sozinho, confirma automaticamente"
           (problema do CEO em 12 palavras)

Subheadline: "Piloto realizado entre janeiro-março de 2025 revelou padrões consistentes.
             Análise completa da distribuição de performance — incluindo limitantes
             identificados e variáveis críticas de sucesso."
           (educado, não vendedor)

3x Benefits:
  • "Te encontram no Google (sem você ter que procurar)"
  • "Agenda sozinho 24/7 (reduz trabalho operacional)"
  • "Dados em tempo real (saiba custo de cada cliente)"
           (Benefício > Feature. Resultado > Ação.)

CTA Primary:   "Ver Disponibilidade"        (ação clara)
CTA Secondary: "Ver Casos Reais"            (escape route)

Footer Stats:
  "Validado em 23 salões • Resultados em 7-10 dias • ROI médio de 340%"
           (números específicos, não vagas)
```

#### SYSTEM OVERVIEW Section

**Objetivo:** Educar sobre contexto de mercado (sem venda)

```
Header:     "Como clientes localizam salões de beleza hoje"
           (informativo, não vendedor)

4x Market Truths:
  • "87% das clientes buscam online antes de decidir"
  • "Primeira página de busca concentra 73% dos cliques"
  • "Tempo médio de decisão: 18 minutos"
  • "28% taxa de ausência sem confirmação automática"
           (cada número respalda próxima ação)

SERP Mockup:
  [Anúncio Otimizado (posição paga)]
  [Anúncio Não-Otimizado (posição paga)]
  [Resultado Orgânico Seu Salão]
           (contexto visual: onde você está hoje vs onde quer estar)

4x Componentes do Sistema:
  • "Visibilidade em busca local"
    → Explica: Anúncios + SEO local
  • "Agendamento assíncrono 24/7"
    → Explica: Landing + API de agendamento
  • "Confirmação automatizada"
    → Explica: WhatsApp Business API
  • "Métricas de retorno"
    → Explica: Dashboard de ROI por cliente

CTA: "Ver componentes do sistema" (âncora para #how-it-works)
```

#### HOW IT WORKS Section

**Objetivo:** Detalhar processo sem assustar

```
Header:     "Como funciona o sistema de aquisição e agendamento"
Subtitle:   "Três componentes integrados. Resultado: demanda previsível, menos trabalho."
           (integração é chave, não é 3 coisas separadas)

3x Steps (cada um tem estrutura idêntica):

STEP 1: Anúncios Segmentados
├─ Title: "1. Anúncios segmentados por localização e intenção"
├─ Subtitle: "Primeiros resultados em 48-72h"
├─ Why Box: "Algoritmos (Google/Meta) ajustam custo por clique baseado em qualidade
│           da página de destino. Melhor página = custo menor = mais clientes por R$."
├─ 3x FAQs:
│  • "Quanto vou gastar por clique?" → "Varia de R$ 0.50 a R$ 2.50 dependendo nicho"
│  • "Preciso estar certificada?" → "Não. Importa confiabilidade no agendamento."
│  • "Quais plataformas?" → "Google Local Services + Meta CTWA para clientes com _fbp/_fbc"

STEP 2: Landing Page Otimizada
├─ Title: "2. Página de agendamento otimizada"
├─ Subtitle: "Tempo médio de agendamento: 28 segundos"
├─ Why Box: "67% dos usuários abandonam páginas com carregamento > 3s.
│           Nossa landing: < 1.5s. Cada segundo economizado = 5-8% redução em abandono."
├─ 3x FAQs:
│  • "Posso customizar cores?" → "Sim, usa cores da sua marca automaticamente"
│  • "Preciso saber código?" → "Não. Tudo é no-code, você controla pelo painel"
│  • "Funciona em mobile?" → "100% responsivo. Maioria dos agendamentos são mobile."

STEP 3: Confirmação via WhatsApp
├─ Title: "3. Automação de confirmação via WhatsApp"
├─ Subtitle: "WhatsApp Business API oficial"
├─ Why Box: "Lembretes 24h antes reduzem ausências de 28% para 9%.
│           WhatsApp = canal que cliente já usa (não email que ignora)."
├─ 3x FAQs:
│  • "Qual a diferença de WhatsApp pessoal?" → "Business API é oficial, números de clientes não são salvos"
│  • "Posso personalizar mensagem?" → "Sim, template customizável por serviço"
│  • "Clientes recebem cobranças?" → "Não. Você que cobre, nós só automizamos confirmação"

Bottom Note:
  "Primeiros resultados: 48-72h. Otimização contínua: 90 dias. ROI típico: 4-6 meses."
           (timeline realista = confidence building)
```

#### PROOF Section

**Objetivo:** Validação social radical (mostrando fracassos também)

```
Badge:      "Transparência Radical"

Header:     "Validado em 23 Salões"
Subtitle:   "Piloto realizado entre janeiro-março de 2025 revelou padrões consistentes
             de crescimento — e também limitações."

4x Tiers de Resultado (distribuição realista):

┌─────────────────────────────────────────────────────┐
│ EXCEPCIONAL (Minoria, 15%)                          │
│ "Alta captação consistente, 60%+ acima de média"    │
├─────────────────────────────────────────────────────┤
│ Perfil:                                             │
│ • Investimento sustentado (R$ 1.5k+/mês em ads)    │
│ • Região densa (grandes cidades, SP/RJ/MG)         │
│ • Posicionamento premium (ticket médio alto)        │
│                                                     │
│ Realidade:                                          │
│ "Não é mágica — é alinhamento de múltiplos fatores" │
│ "Você tem que fazer parte do trabalho."             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ OBJETIVO ALCANÇADO (Maioria, 60%)                   │
│ "Captação previsível mensal, ~20-40% acima média"  │
├─────────────────────────────────────────────────────┤
│ Perfil:                                             │
│ • Investimento adequado (R$ 600-1k/mês em ads)     │
│ • Mercado responsivo (médias cidades ou nicho)     │
│ • Automação funcionando (confirmações reduzem churn)│
│                                                     │
│ Realidade:                                          │
│ "Resultado esperado para quem segue o sistema"      │
│ "Consistência > Sorte. Dados guiam decisões."       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ EM DESENVOLVIMENTO (Comum, 20%)                     │
│ "Início gradual, curva de aprendizado visível"     │
├─────────────────────────────────────────────────────┤
│ Perfil:                                             │
│ • Fase inicial (primeiras 2-3 semanas)             │
│ • Calibrando estratégia (A/B tests rodando)        │
│ • Mercado competitivo (precisa ajuste tático)      │
│                                                     │
│ Realidade:                                          │
│ "Crescimento progressivo, nem tudo é linear"        │
│ "Parcela evoluiu para tier superior em 60 dias"    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ABAIXO DO ESPERADO (Minoria, 5%)                    │
│ "Resultados limitados, não atingiu meta"           │
├─────────────────────────────────────────────────────┤
│ Perfil:                                             │
│ • Restrição orçamentária crítica (< R$ 300/mês)   │
│ • Mercado saturado ou sem demanda (localização)    │
│ • Modelo incompatível (ex: serviço muito nicho)    │
│                                                     │
│ Realidade:                                          │
│ "Somos honestos: sem condições mínimas, sistema    │
│  não compensa. Melhor aguardar que frustrar."      │
└─────────────────────────────────────────────────────┘

4x Métricas Agregadas (simplificadas):
  • "Custo de aquisição: Competitivo vs mercado"
  • "Tempo até retorno: Gradual (2-3 meses típico)"
  • "Redução de faltas: Significativa (28% → 9%)"
  • "Tempo economizado: ~5h/semana em operacional"

Carousel: 4x imagens profissionais (ambientes reais, sem stock photos)

Credibility Box:
  "Por que mostramos os dados ruins também?

   Porque credibilidade vem de transparência, não cherry-picking.
   Se todos tivessem resultados excepcionais, você desconfiaria — e com razão.

   Mostramos a distribuição real porque você merece saber:
   — Onde você provavelmente vai estar
   — O que fazer para evoluir de tier
   — Quando este sistema NÃO é para você"

           (vulnerabilidade = confiança)
```

#### IMPLEMENTATION GUIDE Section

**Objetivo:** Timeline realista (não promessas vazias)

```
Header:     "Sistema em Quatro Milestones"
Subtitle:   "Estruturação flexível baseada em entregáveis, não datas rígidas"
           (flexibilidade = menos pressão = mais confiança)

┌──────────────────────────────────────────────────────────────┐
│ MILESTONE 1: ALICERCE (Semana 1-2)                           │
├──────────────────────────────────────────────────────────────┤
│ Objetivo: Estruturação técnica, pronto para gastar orçamento  │
│                                                              │
│ Entregáveis:                                                 │
│ ✓ Landing page sua (customizada, cores da marca)             │
│ ✓ Integrações ativas (Google Local, Meta, Calendly)         │
│ ✓ Campanhas configuradas (primeira versão dos anúncios)     │
│ ✓ Testes e2e (simulações de agendamento)                    │
│                                                              │
│ Key Insight:                                                │
│ "Este milestone estabelece fundações técnicas.              │
│  Foco é garantir que cada componente funcione antes de       │
│  gastar orçamento. Não apressamos."                         │
│                                                              │
│ Sua Responsabilidade:                                        │
│ • Fornecer fotos de ambiente (3-5 boas)                     │
│ • Definir 3-4 serviços principais com preço                │
│ • Revisar campanhas antes de ativar                        │
│                                                              │
│ Tempo Esperado: 7-10 dias úteis                             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ MILESTONE 2: CALIBRAGEM (Semana 3-6)                         │
├──────────────────────────────────────────────────────────────┤
│ Objetivo: Algoritmos aprendem, primeiros agendamentos validam │
│                                                              │
│ Entregáveis:                                                 │
│ ✓ Histórico de dados inicial (primeiros 200-500 cliques)    │
│ ✓ Primeiras conversões validadas (agendamentos confirmados)  │
│ ✓ Dashboard ativo (você vê resultados em tempo real)        │
│ ✓ Ajustes iterativos (semana 2-3, refinamos baseado em data) │
│                                                              │
│ Key Insight:                                                │
│ "Expectativa realista: resultados moderados nesta fase.     │
│  Você vai pensar 'Não está funcionando' — comum.             │
│  Paciência estratégica é crucial aqui."                     │
│                                                              │
│ Sua Responsabilidade:                                        │
│ • Executar agendamentos com excelência (confirmações)       │
│ • Fornecer feedback (quais serviços mais procurados?)       │
│ • Não mudar estratégia por precipitação                     │
│                                                              │
│ Tempo Esperado: 21-28 dias                                  │
│ Resultado Esperado: 5-15 agendamentos (depende orçamento)   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ MILESTONE 3: OTIMIZAÇÃO (Semana 7-12)                        │
├──────────────────────────────────────────────────────────────┤
│ Objetivo: Performance estabilizada, ROI visível              │
│                                                              │
│ Entregáveis:                                                 │
│ ✓ Redução de CAC (custo por cliente diminui)               │
│ ✓ Aprendizados consolidados (sabemos o que funciona)       │
│ ✓ Testes avançados (A/B de mensagens, horários, segmentos)  │
│ ✓ Sistema de retenção (lembretes, upsell automático)       │
│                                                              │
│ Key Insight:                                                │
│ "Neste ponto: sistema maduro.                               │
│  Você tem visibilidade de ROI. Decisão: escalar ou manter?  │
│  Com dados em mão, risco é calculado."                      │
│                                                              │
│ Sua Responsabilidade:                                        │
│ • Análise conjunta (dados semanais)                         │
│ • Decisão tática (qual serviço promocionar?)                │
│ • Preparação para escala (capacidade operacional)           │
│                                                              │
│ Tempo Esperado: 42 dias                                     │
│ Resultado Esperado: 30-50 agendamentos/mês, CAC estável     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ MILESTONE 4: ESCALABILIDADE (Mês 4+)                         │
├──────────────────────────────────────────────────────────────┤
│ Objetivo: Crescimento baseado em dados, não achismo          │
│                                                              │
│ Entregáveis:                                                 │
│ ✓ Aumento estratégico de investimento (sabendo ROI)         │
│ ✓ Diversificação de canais (Google + Meta + Remarketing)    │
│ ✓ Segmentação avançada (cliente novo vs cliente que            │
│   pode fazer upsell)                                         │
│ ✓ Otimização de margem (nem sempre "mais volume" = melhor)  │
│                                                              │
│ Key Insight:                                                │
│ "Crescimento não é só volume.                               │
│  Às vezes atender menos clientes com ticket maior gera       │
│  mais lucro — e tempo de vida melhor."                      │
│                                                              │
│ Sua Responsabilidade:                                        │
│ • Definir próximas metas (volume? ticket? margem?)          │
│ • Planejamento de capacidade (quantas clientes consegue?)   │
│ • Inovação contínua (serviços novos baseado em demanda)     │
│                                                              │
│ Tempo Esperado: Ongoing                                     │
│ Resultado Esperado: Crescimento previsível, modelo sustentável │
└──────────────────────────────────────────────────────────────┘

Bottom Note (importante):
  "Milestones se sobrepõem. Não é sequencial rígido.
   Se tudo der certo, você salta fases. Se houver ajuste,
   volta e recalibra. Flexibilidade é feature, não bug."
```

#### VALUE INVESTMENT Section

**Objetivo:** Transparência de custo (não esconder)

```
Header:     "Investimento transparente"
Subtitle:   "Valores claros: setup inicial + mensalidade (quando aplicável) + orçamento de anúncios.
             Sem surpresas. Sem custos escondidos."

Setup Fee (Anchor):
  R$ 1.499 ~~crossed out~~
  R$ 897 (-40%)

  Urgência (real, não falsa):
  "Só até 31/01/2025 • 8 vagas restantes"

  Mensagem:
  "Desconto de lançamento para salões que começam agora.
   Próximas levas: preço cheio. Limite: não temos capacidade
   de onboarding para mais de 8 por semana."
           (honesto, criasse urgência real)

┌─────────────────────────────────────────────────────┐
│ PLANO 1: ESSENCIAL                                  │
├─────────────────────────────────────────────────────┤
│ Mensalidade: R$ 0*                                  │
│ (*paga conforme cresce, modelo progressivo)         │
│                                                     │
│ Ad Budget Recomendado: R$ 450-600/mês              │
│                                                     │
│ Incluído:                                           │
│ ✓ Landing page customizada                         │
│ ✓ Google Analytics 4 próprio                       │
│ ✓ WhatsApp Business API (confirmações automáticas) │
│ ✓ Onboarding (7 dias, setup técnico)              │
│ ✓ Suporte via email (48h response)                │
│                                                     │
│ NÃO Incluído:                                       │
│ ✗ Gestão de anúncios (você ou agência de marketing) │
│ ✗ Otimização mensal (você monitora ou contrata)    │
│ ✗ Consultoria estratégica (apenas se escalar)      │
│                                                     │
│ Ideal para:                                         │
│ "Salões que querem controlar tudo, já têm             │
│  experiência com anúncios ou têm agência."         │
│                                                     │
│ Custo 1º mês: R$ 897 (setup) + R$ 600 (ads) = R$ 1.497 │
│ Meses seguintes: R$ 600 (ads apenas)               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ PLANO 2: CRESCIMENTO ⭐ POPULAR (83% escolhem)    │
├─────────────────────────────────────────────────────┤
│ Mensalidade: R$ 497                                 │
│ (pagas a partir do mês 2, não no setup)            │
│                                                     │
│ Ad Budget Recomendado: R$ 600-750/mês              │
│                                                     │
│ Incluído (tudo do Essencial +):                     │
│ ✓ Gestão de Google Ads (campanhas + otimização)    │
│ ✓ Meta CTWA (Click-to-WhatsApp + pixel FB)         │
│ ✓ Otimização semanal (ajustes baseado em dados)    │
│ ✓ Relatório mensal (CAC, ROI, tendências)         │
│ ✓ Suporte prioritário via WhatsApp                 │
│                                                     │
│ NÃO Incluído:                                       │
│ ✗ Landing page adicional (1 por plano)             │
│ ✗ Consultoria estratégica (adicional)              │
│ ✗ Remarketing avançado (está na seção Escala)      │
│                                                     │
│ Ideal para:                                         │
│ "Salões que querem focar no negócio,                  │
│  deixa a gente cuidar dos anúncios."               │
│                                                     │
│ Custo 1º mês: R$ 897 (setup) + R$ 497 (mens) + R$ 750 (ads) = R$ 2.144 │
│ Meses seguintes: R$ 497 (mens) + R$ 750 (ads) = R$ 1.247             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ PLANO 3: ESCALA                                     │
├─────────────────────────────────────────────────────┤
│ Mensalidade: R$ 997                                 │
│                                                     │
│ Ad Budget Recomendado: R$ 1.200-1.500/mês          │
│                                                     │
│ Incluído (tudo do Crescimento +):                   │
│ ✓ Landing pages múltiplas (até 3, diferentes serviços) │
│ ✓ Remarketing avançado (upsell automático)         │
│ ✓ A/B tests estruturados (rotação de mensagens)    │
│ ✓ Consultoria quinzenal (estratégia + roadmap)     │
│ ✓ Dashboard customizado (seus KPIs específicos)    │
│ ✓ Suporte VIP (chat direto, 2h response)           │
│                                                     │
│ Ideal para:                                         │
│ "Salões em crescimento que querem otimizar tudo,    │
│  incluindo estudos A/B e estratégia customizada."   │
│                                                     │
│ Custo 1º mês: R$ 897 (setup) + R$ 997 (mens) + R$ 1.500 (ads) = R$ 3.394 │
│ Meses seguintes: R$ 997 (mens) + R$ 1.500 (ads) = R$ 2.497             │
└─────────────────────────────────────────────────────┘

Parcelamento:
  Setup: até 3x sem juros (3 × R$ 299)
  Mensalidades: Débito ou cartão automático (dia 5)

Cancelamento:
  "Sem contrato de fidelidade. Paga até final do mês e sai.
   Setup investido não é reembolsável após 7 dias (já foi trabalhado)."
           (honesto, clareza total)
```

#### CAPTURE SECTION

**Objetivo:** Conversão com zero fricção

```
Badge:      "Últimas vagas com consultoria gratuita"
           (urgência real baseada em capacidade)

Title:      "Comece hoje mesmo"
           (palavra "hoje" em gradiente para ênfase)

Subtitle:   "Preencha abaixo e receba acesso imediato + consultoria estratégica personalizada"
           (benefício imediato, não venda)

Form Fields (3 apenas, zero fricção):
  1. Seu nome completo
     Placeholder: "Maria Silva"
     Help: (nenhuma, óbvio)

  2. WhatsApp (com DDD)
     Placeholder: "(11) 99999-9999"
     Help: "Para consultoria + confirmação de agendamentos"

  3. Seu melhor email
     Placeholder: "maria@email.com"
     Help: "Você receberá confirmação + documentação"

Submit Button: "Quero Começar Agora"
  Loading state: "Processando..." (com spinner)
  Success state: Redirect para /success (não modal/toast)

Benefits Box (abaixo do form):
  ✓ Acesso imediato ao sistema completo
  ✓ Consultoria gratuita de 30 minutos (agendada em 24h)
  ✓ Suporte prioritário via WhatsApp
  ✓ Sem compromisso ou cartão de crédito
           (resolve objeções do último momento)

Trust Badge:
  🔒 "Seus dados estão 100% protegidos conforme LGPD"
  (não é legalês, é reassurance)

Privacy Links:
  "Política de Privacidade • Termos de Uso"
  (pequeno, não intrusivo, mas presente)
```

#### SUCCESS PAGE (/lp/[slug]/success)

**Objetivo:** Transformar formulário em "microlandingpage" de continuação

```
Hero Section:
  Headline: "Perfeito, [First Name]! ✅"
  Body: "Sua análise foi agendada. Equipe entrará em contato em até 5 minutos via WhatsApp."
  (celebração + expectativa clara)

Timeline Section (Educação do Próximo Passo):
  ├─ "Agora"        → "Confirmação recebida" / "Seu email está no sistema"
  ├─ "5 minutos"    → "Contato via WhatsApp" / "Nosso especialista enviará mensagem"
  ├─ "15 minutos"   → "Primeiro atendimento" / "Tiraremos dúvidas iniciais"
  └─ "24 horas"     → "Proposta personalizada" / "Com base no seu cenário"
           (reduz ansiedade com timeline clara)

Resources Section (Micro-educação):
  Cards (download + video):
  • "Guia Rápido: 5 Passos para Começar" (PDF)
  • "Vídeo: Como Estruturar Seus Anúncios" (YouTube embed)
  • "Checklist: Prepare-se para Consultoria" (PDF)
           (oferece valor enquanto aguarda)

FAQs (Objeções Pós-Captura):
  Q: "Vou ser cobrado antes da consultoria?"
  A: "Não. Consultoria é 100% grátis, sem compromisso."

  Q: "Posso cancelar depois?"
  A: "Sim, 30 dias pra cancelar. Sem multa ou taxa."

  Q: "Como funciona o suporte?"
  A: "WhatsApp direto com especialista. Disponível 6am-10pm, seg-sab."
           (reassurance final)

Micro-CTAs (Manter Engajamento):
  [Button] "Revisitar Seção: Como Funciona"
  [Button] "Ver Mais Casos de Sucesso"
  [Button] "Enviar Mensagem Agora" (WhatsApp link)
           (não abandona visitante, oferece caminhos)
```

---

## 🚀 Fluxo de Usuário (User Journey)

### Desktop Flow

```
Arrival (Hero)
    ↓
[2 choices]
    ├─→ "Ver Disponibilidade" → Scroll to Capture (warm lead)
    └─→ "Ver Casos Reais" → Scroll to Proof (curious lead)
            ↓
        [Educação: System → How → Proof]
            ↓
        Chega em Capture (qualificado)
            ↓
        Fill Form → POST /api/leads/capture
            ↓
        Redirect /success
            ↓
        Vê timeline + resources
```

### Mobile Flow

```
Arrival (Hero - sticky CTA)
    ↓
Scroll (System → How → Proof)
    ↓ [Intent Checkpoint aqui - NOVO]
    ├─→ Qual seu maior desafio?
    │   ├─ Agendamento online
    │   ├─ No-show alto
    │   ├─ Ticket médio baixo
    │   └─ Outra
    ↓ [Mostra casos similares ao challenge selecionado]
    ↓
Scroll (Implementation → Pricing)
    ↓
CTA "Começar" (sticky bottom on mobile)
    ↓
Capture Form (form stickys to top on mobile)
    ↓
Redirect /success
```

---

## 🎯 Componentes por Seção

### HERO Section - Checklist de Implementação

**Mobile (320px-480px):**
- [ ] Badge: 12px font, full-width, centered
- [ ] Headline: 28px, line-height 1.2, max-width 100%
- [ ] Subheadline: 14px, 2-3 lines max, fade to lighter color
- [ ] 3x Benefits: Stacked vertical, 16px padding each
- [ ] CTA Primary: Full-width, 48px height, gradient
- [ ] CTA Secondary: Full-width outline, 48px height
- [ ] Footer Stats: 12px, stacked (mobile stack them!)
- [ ] Scroll indicator: Visible on first load

**Tablet (768px-1024px):**
- [ ] 2-column layout (content left, visual right)
- [ ] Headline: 32px
- [ ] 3x Benefits: 3-column flex

**Desktop (1440px+):**
- [ ] Headline: 48px
- [ ] 3-column benefits with icons
- [ ] Animated background elements (subtle parallax)

---

### Seção Genérica - Design System

**Card Component:**
```tsx
interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
  cta?: { label: string; href: string };
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function Card({
  title,
  description,
  icon,
  badge,
  cta,
  isExpanded,
  onToggle,
}: CardProps) {
  return (
    <motion.div
      className="border-l-4 border-primary p-md rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
      onClick={onToggle}
      layout
    >
      <div className="flex items-start gap-md">
        {icon && <div className="text-2xl flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          <div className="flex items-center gap-sm">
            <h3 className="text-lg font-semibold">{title}</h3>
            {badge && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                {badge}
              </span>
            )}
          </div>
          {isExpanded && (
            <motion.p className="text-muted mt-sm text-sm">{description}</motion.p>
          )}
        </div>
      </div>
      {cta && (
        <a href={cta.href} className="text-primary text-sm font-medium mt-sm inline-block">
          {cta.label} →
        </a>
      )}
    </motion.div>
  );
}
```

---

## 📋 Guia de Implementação

### FASE 1: Copy + Structure (Esta Semana)
- [ ] Revisar copy de todas seções com novo framework "consultivo"
- [ ] Adicionar "Objection Bridges" (Why boxes, realidade checks)
- [ ] Reorganizar Hero → System → How para fluxo lógico
- [ ] Atualizar Success Page com timeline + resources

### FASE 2: Form Expansion (Próxima Semana)
- [ ] Expandir Capture Form para incluir biggest_challenge + urgency
- [ ] Implementar Intent Checkpoint (antes de Capture)
- [ ] Atualizar backend para capturar + segmentar leads

### FASE 3: Email Sequences (2 Semanas)
- [ ] Criar templates de nurture email (5x sequência)
- [ ] Setup cron para scheduling automático
- [ ] Condicionar templates baseado em lead.metadata

### FASE 4: Success Page Redesign (2 Semanas)
- [ ] Nova arquitetura de success page (timeline + resources)
- [ ] Componentes reutilizáveis (Card, Timeline, FAQ)
- [ ] Integração com PDF downloads + vídeos

### FASE 5: Mobile Optimization (1 Semana)
- [ ] Testar cada seção em 5+ devices
- [ ] Otimizar sticky CTAs para mobile
- [ ] Reduzir font sizes e spacing conforme necessário

### FASE 6: Analytics + Monitoring (Ongoing)
- [ ] Setup GA4 events para cada seção
- [ ] Dashboard de conversão por seção
- [ ] A/B testing de copy critical

---

## 📊 Métricas & Validação

### Métricas de Sucesso

| Métrica | Target | Fórmula |
|---------|--------|---------|
| **Conversion Rate (Landing → Form)** | 8-12% | (Form Submissions / Visitors) |
| **Form Completion Rate** | > 85% | (Completed / Initiated) |
| **Mobile Conversion Rate** | 6-10% | (Mobile Form Submissions / Mobile Visitors) |
| **Scroll Depth** | > 60% | (Users reaching Proof Section / Total) |
| **Intent Capture Rate** | > 70% | (Users answering checkpoint / Total) |
| **Success Page Visit** | 100% | (Should always redirect) |
| **Post-Capture Email Open** | > 40% | (Opens / Sent) |
| **Nurture Email Click** | > 15% | (Clicks / Opens) |

### A/B Testing Roadmap

```
Week 1: Hero Headline Copy
  Variant A: "Cliente te encontra, agenda sozinho, confirma automaticamente"
  Variant B: "Seu salão aparece no Google. Agendamentos são automáticos."
  Metric: CTR do botão "Ver Disponibilidade"

Week 2: CTA Button Text
  Variant A: "Ver Disponibilidade"
  Variant B: "Começar Análise Grátis"
  Metric: Form submissions

Week 3: Objection Bridge Visibility
  Variant A: "Why" box sempre visível
  Variant B: "Why" box em accordion (click to expand)
  Metric: Scroll depth + time on page

Week 4: Form Fields
  Variant A: 3 fields (nome, phone, email)
  Variant B: 3 fields + biggest_challenge (dropdown)
  Metric: Form completion rate
```

---

## 📚 Documentação de Referência

### Copy Guidelines

**Do's:**
- ✅ Mostrar realidade (4 tiers, nem tudo funciona)
- ✅ Educação antes de venda ("entenda como X funciona")
- ✅ Números específicos (87%, não "maioria")
- ✅ Consultivo ("vamos avaliar se é para você")
- ✅ Benefício do ponto de vista do cliente

**Don'ts:**
- ❌ Garantias impossíveis ("crescimento 100%")
- ❌ Jargão técnico sem explicação
- ❌ Múltiplos apelos emocionais por seção
- ❌ "Clique agora" pressão alta
- ❌ Desconto fake ("era R$ 10k, agora R$ 97")

### Design Guidelines

**Color Usage:**
- Primary gradient: Hero, CTA buttons, key highlights
- Status colors: Success (green), warning (amber), error (red)
- Neutrals: 95% of body copy, backgrounds
- Max 3 colors per seção + 1 accent

**Spacing:**
- Mobile: 16px padding, 24px margins
- Tablet: 24px padding, 32px margins
- Desktop: 32px padding, 48px margins
- Min gap between elements: 8px

**Typography:**
- Headline hierarchy: H1 > H2 > H3 (never skip levels)
- Line height: 1.2 (headlines), 1.6 (body), 1.5 (small)
- Font weight: 400 (body), 600 (headers), 700 (bold statements)

---

**Documento Aprovado:** 2025-10-22
**Próxima Revisão:** 2025-11-22
**Responsável:** Product + Design + Development
