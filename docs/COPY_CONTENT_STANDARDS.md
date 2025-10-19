# ARCO Landing Page - Padrões de Copy e Conteúdo

> **Documento de Referência**: Estabelece tom, linguagem e estrutura de conteúdo para todas as seções da landing page.
> 
> **Data**: 19 de outubro de 2025  
> **Autor**: Sistema ARCO  
> **Status**: ✅ Aprovado e em uso

---

## 📋 Índice

1. [Princípios Fundamentais](#princípios-fundamentais)
2. [Tom de Voz](#tom-de-voz)
3. [Estrutura de Conteúdo](#estrutura-de-conteúdo)
4. [Padrões de Linguagem](#padrões-de-linguagem)
5. [Uso de Dados e Métricas](#uso-de-dados-e-métricas)
6. [Collapsibles (Progressive Disclosure)](#collapsibles-progressive-disclosure)
7. [Exemplos Práticos](#exemplos-práticos)
8. [Anti-Padrões (O que NÃO fazer)](#anti-padrões-o-que-não-fazer)
9. [Checklist de Revisão](#checklist-de-revisão)

---

## 🎯 Princípios Fundamentais

### 1. Educar, Não Vender
**Objetivo**: Explicar como funciona o sistema, não persuadir com promessas exageradas.

```markdown
❌ ERRADO: "Transforme horários vazios em agenda CHEIA em 48h!"
✅ CORRETO: "Sistema integrado de aquisição e agendamento para profissionais de beleza."
```

**Raciocínio**: Cliente sofisticado valoriza compreensão sobre hype. Transparência constrói confiança.

---

### 2. Relevância sobre Criatividade
**Objetivo**: Conteúdo deve ser útil e informativo, não "criativo" ou "viral".

```markdown
❌ ERRADO: "O SEGREDO que salões não querem que você saiba!"
✅ CORRETO: "Como anúncios segmentados reduzem custo de aquisição ao longo do tempo."
```

**Raciocínio**: Lead precisa de informação para tomar decisão, não entretenimento.

---

### 3. Especificidade sobre Generalização
**Objetivo**: Números concretos, timelines realistas, casos específicos.

```markdown
❌ ERRADO: "Resultados incríveis rapidamente!"
✅ CORRETO: "Primeiros agendamentos: 48-72h. Otimização contínua: 90 dias. ROI típico: 4-6 meses."
```

**Raciocínio**: Especificidade demonstra experiência e reduz expectativas irreais.

---

### 4. Profissionalismo sem Formalidade Excessiva
**Objetivo**: Tom respeitoso, mas acessível. Técnico quando necessário, simples sempre que possível.

```markdown
❌ MUITO INFORMAL: "Seu anúncio vai BOMBAR e trazer cliente pra caramba!"
❌ MUITO FORMAL: "A plataforma utiliza algoritmos de machine learning para otimização de lances em tempo real..."
✅ EQUILIBRADO: "Algoritmos de Google e Meta ajustam automaticamente quem vê seu anúncio, priorizando perfis com maior probabilidade de conversão."
```

---

## 🎙️ Tom de Voz

### Características do Tom ARCO

| Dimensão | Posição | Exemplo |
|----------|---------|---------|
| **Formalidade** | Moderada | "Você" em vez de "Vocês" ou "A senhora" |
| **Entusiasmo** | Contido | Evitar caps lock, exclamações excessivas |
| **Tecnicidade** | Contextualizada | Explicar termos (ex: "CPC - custo por clique") |
| **Diretividade** | Assertiva | "Configuramos campanhas" vs "Podemos talvez configurar" |
| **Empatia** | Prática | Antecipar dúvidas reais, não performar simpatia |

### Voice Guidelines

#### ✅ Use:
- **Segunda pessoa singular**: "você", "seu salão", "sua agenda"
- **Verbos diretos**: "configuramos", "enviamos", "reduzimos"
- **Perguntas reais**: "Como funciona X?", "O que acontece se Y?"
- **Dados contextualizados**: "38-42% de redução" seguido de "isso significa..."

#### ❌ Evite:
- **Caps lock para ênfase**: "CLIENTES TODOS OS DIAS"
- **Jargão não explicado**: "ROAS", "CTR", "CPA" sem contexto
- **Superlativos vagos**: "incrível", "revolucionário", "único"
- **Urgência falsa**: "últimas vagas", "só hoje", "imperdível"
- **Gírias excessivas**: "bombando", "viralizou", "top demais"

---

## 📐 Estrutura de Conteúdo

### Anatomia de uma Section

```typescript
interface SectionContent {
  // Header
  title: string;              // H2 - Objetivo/benefício claro
  subtitle: string;           // Contexto adicional, não repetição
  
  // Steps/Cards
  steps: Array<{
    badge?: string;           // Métrica-chave ou timeline
    title: string;            // O que é este componente
    subtitle: string;         // Por que é relevante
    description: string;      // Como funciona (2-3 frases)
    why: string;              // Fundamento técnico/lógico
    
    // Progressive Disclosure
    collapsibles: Array<{
      icon: LucideIcon;
      question: string;       // Objeção ou dúvida real
      answer: string;         // Explicação detalhada (3-5 frases)
    }>;
  }>;
  
  // Footer
  cta?: string;              // Próximo passo ou resumo
}
```

### Exemplo Aplicado (HowItWorksSection)

```tsx
// ✅ BOM EXEMPLO
{
  title: "Como funciona o sistema de aquisição e agendamento",
  subtitle: "Três componentes integrados para gerar demanda previsível...",
  
  steps: [
    {
      badge: "Primeiros resultados em 48-72h",
      title: "Anúncios segmentados por localização e intenção de busca",
      subtitle: "Investimento direcionado para pessoas próximas ao seu salão...",
      description: "Configuramos campanhas no Google e Meta para exibir...",
      why: "Google e Meta ajustam o custo por clique baseado na qualidade...",
      
      collapsibles: [
        {
          question: "Como funciona a segmentação de público?",
          answer: "Utilizamos três camadas de filtro: (1) Raio geográfico..."
        }
      ]
    }
  ]
}
```

---

## 🗣️ Padrões de Linguagem

### Headlines (H2/H3)

**Fórmula**: `[Ação/Resultado] + [Contexto específico]`

```markdown
✅ "Como funciona o sistema de aquisição e agendamento"
✅ "Anúncios segmentados por localização e intenção de busca"
✅ "Automação de confirmação e lembretes via WhatsApp Business API"

❌ "O segredo para agenda cheia"
❌ "Nunca mais perca clientes"
❌ "Sistema revolucionário de marketing"
```

---

### Subtítulos

**Função**: Explicar relevância, não repetir título.

```markdown
✅ "Investimento direcionado para pessoas próximas ao seu salão, com interesse real no serviço."
✅ "Sistema que permite ao cliente visualizar serviços, horários e confirmar reserva de forma autônoma."

❌ "A melhor forma de conseguir clientes"
❌ "Isso vai mudar seu negócio para sempre"
```

---

### Badges/Pills

**Função**: Métrica-chave, timeline ou diferenciador técnico.

```markdown
✅ "Primeiros resultados em 48-72h"
✅ "Tempo médio de agendamento: 28 segundos"
✅ "WhatsApp Business API oficial"

❌ "100% garantido"
❌ "O melhor do mercado"
```

---

### Descriptions (Corpo)

**Estrutura**: O QUE é + COMO funciona + Modelo de cobrança/configuração

```markdown
✅ "Configuramos campanhas no Google e Meta (Instagram/Facebook) para exibir 
    seu anúncio quando alguém pesquisa serviços de beleza na sua região, ou 
    demonstra comportamento compatível com seu público-alvo. O modelo é custo 
    por clique: você paga apenas quando alguém interage com o anúncio."

❌ "Fazemos anúncios incríveis que trazem muitos clientes todos os dias!"
```

**Comprimento**: 2-4 frases. Máximo 280 caracteres visíveis antes de truncar.

---

### "Why This Works" Boxes

**Função**: Fundamentação técnica/lógica, não argumento de venda.

```markdown
✅ "Google e Meta ajustam o custo por clique baseado na qualidade do anúncio 
    e taxa de conversão. Anúncios bem estruturados, com landing pages rápidas 
    e oferta clara, recebem descontos automáticos no lance — reduzindo custo 
    de aquisição ao longo do tempo."

❌ "Nosso sistema é melhor porque temos anos de experiência e clientes satisfeitos."
```

**Elementos**: Causa → Mecanismo → Efeito

---

## 📊 Uso de Dados e Métricas

### Tipos de Dados Válidos

| Tipo | Exemplo | Quando Usar |
|------|---------|-------------|
| **Timeline** | "48-72h para primeiro agendamento" | Expectativas realistas |
| **Percentual** | "38-42% de redução em no-shows" | Magnitude de impacto |
| **Comparação** | "12-18% bounce rate vs 45-60% média" | Benchmark relativo |
| **Custo** | "R$ 0,15-0,35 por mensagem" | Transparência financeira |
| **Caso real** | "Profissional obteve 8→14→18 agendamentos" | Padrão observado |

### Como Apresentar Dados

```markdown
✅ CONTEXTUALIZADO:
"Estudos indicam que 67% dos usuários abandonam páginas com carregamento 
superior a 3 segundos. Adicionalmente, 58% desistem quando não encontram 
preços claros."

❌ SEM CONTEXTO:
"67% de conversão! 58% de aumento!"

✅ COM INTERVALO (honesto):
"Redução de no-shows: 38-42%"

❌ NÚMERO EXATO (improvável):
"Redução de no-shows: 40,3%"

✅ ATRIBUIÇÃO:
"Dados de mercado indicam que..."
"Clientes relatam que..."
"Exemplo real: profissional obteve..."

❌ SEM FONTE:
"Comprovado que funciona!"
```

---

## 🔽 Collapsibles (Progressive Disclosure)

### Princípio

**Collapsibles = Antecipação de objeções reais + Explicação detalhada**

Não são "curiosidades" ou "features escondidas". São respostas para perguntas que impedem a decisão.

---

### Estrutura de Pergunta

**Fórmula**: `[Ação/Preocupação] + [Contexto específico]?`

```markdown
✅ "Como funciona a segmentação de público?"
✅ "O que acontece se a cliente não confirmar após o lembrete?"
✅ "Preciso mudar meu WhatsApp pessoal para Business?"

❌ "E se eu tiver dúvidas?"
❌ "Vocês são confiáveis?"
❌ "Isso funciona mesmo?"
```

**Origem**: Perguntas reais de discovery calls, emails de suporte, objeções em vendas.

---

### Estrutura de Resposta

**Componentes**:
1. **Resposta direta** (primeira frase)
2. **Explicação técnica** (2-3 frases)
3. **Implicação prática** (última frase)

```markdown
✅ EXEMPLO COMPLETO:

Q: "Preciso mudar meu WhatsApp pessoal para Business?"

A: "Não. WhatsApp Business API é uma plataforma paralela, separada do seu 
    aplicativo pessoal. Mensagens automáticas (confirmação, lembrete) saem 
    de um número comercial que você define — pode ser o mesmo número ou 
    outro dedicado. Respostas manuais da cliente continuam chegando no seu 
    WhatsApp normal. O sistema funciona como piloto automático apenas para 
    fluxos de agendamento."

ESTRUTURA:
1. "Não." ← Resposta direta
2. "WhatsApp Business API é..." ← Explicação técnica
3. "O sistema funciona como piloto automático..." ← Implicação prática
```

---

### Quantos Collapsibles por Section?

**HowItWorks**: 3 collapsibles por step (9 total)  
**ProofSection**: 2-3 collapsibles (cases, metodologia)  
**PricingSection**: 3-4 collapsibles (features detalhadas, ROI)  
**CaptureSection**: 1-2 collapsibles (privacidade, próximos passos)  
**FAQSection**: 8-12 collapsibles (dúvidas finais)

**Critério**: Cada collapsible deve endereçar objeção real que impede conversão.

---

## 💼 Exemplos Práticos

### Caso 1: Explicar Feature Técnica

**Context**: WhatsApp Business API (muita gente confunde com app grátis)

```markdown
❌ VERSÃO PITCHY:
"WhatsApp OFICIAL da Meta que GARANTE que sua cliente vai aparecer!"

✅ VERSÃO EDUCATIVA:
"Integramos com WhatsApp Business API (plataforma oficial Meta, identificada 
com selo verde) para enviar confirmações automáticas logo após o agendamento 
e lembretes 24h antes do horário marcado."

WHY: Esclarece diferença (API vs app), explica timing, mantém tom profissional.
```

---

### Caso 2: Dados sem Contexto

**Context**: Taxa de conversão de anúncio

```markdown
❌ SEM CONTEXTO:
"8-12% de conversão!"

✅ COM CONTEXTO:
"Taxa de conversão média: 8-12% (a cada 10 cliques no anúncio, 1 pessoa 
agenda). Benchmark de mercado para serviços locais: 3-5%."

WHY: Explica o que significa, oferece comparação para calibrar expectativa.
```

---

### Caso 3: Timeline Realista

**Context**: Quando começam a ver resultados

```markdown
❌ PROMESSA EXAGERADA:
"Resultados em 24h GARANTIDOS!"

✅ TIMELINE REALISTA:
"A campanha entra no ar em até 48 horas após aprovação. Os primeiros cliques 
aparecem entre 2-6 horas. O primeiro agendamento depende de fatores como dia 
da semana e qualidade da oferta — normalmente ocorre entre 24-72h."

WHY: Expectativa calibrada, variáveis explicadas, nada prometido além do controlável.
```

---

## 🚫 Anti-Padrões (O que NÃO fazer)

### 1. Caps Lock para Ênfase

```markdown
❌ "Cliente nova querendo agendar HOJE"
❌ "Isso NÃO é mágica"
❌ "Sistema que FUNCIONA"

✅ Use negrito/itálico com moderação:
"Sistema testado em **centenas** de profissionais"
```

---

### 2. Promessas Não Verificáveis

```markdown
❌ "100% de satisfação garantida"
❌ "Nunca mais vai ter horário vazio"
❌ "Melhor investimento da sua vida"

✅ Claims verificáveis:
"Sistema testado em centenas de profissionais de beleza"
"ROI típico observado: 4-6 meses"
```

---

### 3. Urgência Artificial

```markdown
❌ "Últimas 3 vagas este mês!"
❌ "Oferta expira em 24h"
❌ "Só para os primeiros 10"

✅ Urgência real (se aplicável):
"Onboarding leva 5-7 dias úteis. Início imediato depende de aprovação de anúncios."
```

---

### 4. Jargão sem Explicação

```markdown
❌ "Otimizamos seu ROAS via DSA com bid strategy tCPA"

✅ "Ajustamos lances automaticamente (tCPA - target cost per acquisition) 
    para manter custo por agendamento dentro do alvo definido"
```

---

### 5. Features sem Benefício

```markdown
❌ "Sistema com integração Supabase + Stripe + n8n"

✅ "Pagamentos processados via Stripe (aceita PIX e cartão). 
    Webhooks garantem sincronização em tempo real entre calendário e anúncios."

WHY: Cliente não liga pra stack, liga pra outcome.
```

---

### 6. Linguagem Informal Excessiva

```markdown
❌ "A gente vai bombar seu salão com cliente nova querendo agendar!"
❌ "Tá procurando manicure? A gente aparece na hora!"
❌ "Acabou esse negócio de dar bolo!"

✅ "Anúncios aparecem para pessoas pesquisando serviços de beleza na sua região."
✅ "Confirmação automática reduz no-shows de forma mensurável."
```

---

## ✅ Checklist de Revisão

Use este checklist antes de publicar qualquer conteúdo:

### Conteúdo
- [ ] **Tom profissional**: Sem caps lock, gírias excessivas ou informalidade
- [ ] **Específico**: Números, timelines, casos concretos
- [ ] **Educativo**: Explica COMO funciona, não apenas POR QUE comprar
- [ ] **Honesto**: Claims verificáveis, intervalos realistas
- [ ] **Relevante**: Informação útil para decisão, não filler

### Estrutura
- [ ] **H2 claro**: Objetivo/benefício sem jargão
- [ ] **Subtitle adiciona**: Não repete título
- [ ] **Badge informativo**: Métrica ou diferenciador, não marketing speak
- [ ] **Description 2-4 frases**: O QUE + COMO + Modelo
- [ ] **Why fundamentado**: Mecanismo técnico, não opinião

### Collapsibles
- [ ] **Perguntas reais**: Objeções documentadas de clientes
- [ ] **Respostas completas**: Direta + Técnica + Prática
- [ ] **3 collapsibles/step**: Cobertura de objeções principais
- [ ] **Icons apropriados**: Representam conteúdo, não decorativos

### Dados
- [ ] **Contextualizados**: Explicam o que significa
- [ ] **Atribuídos**: Fonte clara (estudos, clientes, benchmark)
- [ ] **Intervalos**: 38-42% vs 40%
- [ ] **Comparação**: vs média de mercado quando possível

### Linguagem
- [ ] **Segunda pessoa**: "você", não "a gente" ou "vocês"
- [ ] **Verbos ativos**: "configuramos", não "é configurado"
- [ ] **Termos explicados**: Jargão contextualizado na primeira menção
- [ ] **Sem superlativos**: "testado" vs "incrível"
- [ ] **Sem urgência falsa**: Timeline real vs "últimas vagas"

---

## 📚 Referências e Recursos

### Frameworks de Copywriting (Adaptados)

**ARCO NÃO usa**:
- ❌ AIDA (Attention → Interest → Desire → Action) — muito vendedor
- ❌ PAS (Problem → Agitate → Solution) — agita medo
- ❌ FAB (Features → Advantages → Benefits) — product-centric

**ARCO usa**:
- ✅ **WIFT** (What Is It → Function → Technicality) — educativo
- ✅ **ETE** (Expectation → Timeline → Evidence) — realista
- ✅ **QAP** (Question → Answer → Practical implication) — collapsibles

---

### Voice & Tone Spectrum

```
INFORMAL ←───────────── ARCO ──────────────→ FORMAL
         |                                  |
    "bombando"                      "otimização algorítmica"
    "deu bolo"                      "ausência não justificada"
    "tá procurando"                 "demonstra intenção de busca"
                    ↑
              TOM IDEAL:
        "pesquisando serviços"
        "reduz no-shows"
        "algoritmo aprende"
```

---

### Inspirações de Empresas com Tom Similar

| Empresa | O que copiar | O que evitar |
|---------|--------------|--------------|
| **Stripe** | Explicações técnicas claras, docs como conteúdo | Frieza excessiva |
| **Linear** | Especificidade, dados concretos | Jargão de produto |
| **Notion** | Educação sobre features, cases reais | Cuteness performativa |
| **Superhuman** | Métricas específicas (tempo economizado) | Elitismo |

---

## 🔄 Evolução deste Documento

**v1.0** (19/out/2025): Documentação inicial baseada em HowItWorksSection refactor  
**Próximas versões**: Incorporar learnings de ProofSection, PricingSection, CaptureSection

---

## 📞 Contato para Dúvidas

- **Dúvidas de tom**: Consultar este doc + exemplos em `/src/components/landing/sections/HowItWorksSection.tsx`
- **Novos padrões**: Propor via PR com justificativa + exemplos
- **Casos edge**: Documentar no canal #copy-decisions

---

**Última atualização**: 19 de outubro de 2025  
**Revisores**: Sistema ARCO, JP Cardoso  
**Status**: 🟢 Ativo e em uso
