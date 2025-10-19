# Padrões de Copy Documentados - Sumário Executivo

**Data**: 19 de outubro de 2025  
**Status**: ✅ Completo e pronto para aplicação nas próximas seções

---

## 📄 Documentos Criados

### 1. `/docs/COPY_CONTENT_STANDARDS.md` (Documento Principal)
**Comprimento**: ~800 linhas  
**Propósito**: Referência completa de padrões, com fundamentos e exemplos detalhados

**Conteúdo**:
- ✅ 4 Princípios Fundamentais (Educar, Relevância, Especificidade, Profissionalismo)
- ✅ Voice & Tone Guidelines (O que usar / evitar)
- ✅ Estrutura de Conteúdo (anatomia de sections, steps, collapsibles)
- ✅ Padrões de Linguagem (headlines, subtitles, badges, descriptions)
- ✅ Uso de Dados (tipos válidos, como apresentar, atribuição)
- ✅ Collapsibles (estrutura de pergunta/resposta, quantos por section)
- ✅ Exemplos Práticos (3 casos completos)
- ✅ Anti-Padrões (8 categorias de "não fazer")
- ✅ Checklist de Revisão (60+ items)

---

### 2. `/docs/COPY_QUICK_REFERENCE.md` (Guia Rápido)
**Comprimento**: ~150 linhas  
**Propósito**: Consulta rápida durante escrita de conteúdo

**Conteúdo**:
- ✅ Regra de ouro (Educar > Vender)
- ✅ DO/DON'T lists
- ✅ Templates prontos (headline, subtitle, badge, etc)
- ✅ Como apresentar dados
- ✅ Estrutura por tipo de section
- ✅ Checklist rápido (7 perguntas)

---

## 🎯 Principais Mudanças Estabelecidas

### Tom de Voz

| Antes (Pitchy) | Agora (Profissional) |
|----------------|---------------------|
| "TÁ PROCURANDO agora" | "pesquisando serviços na sua região" |
| "cliente nova querendo agendar HOJE" | "pessoa com interesse real no serviço" |
| "Acabou deu bolo!" | "reduz no-shows de forma mensurável" |
| "GARANTIDO 100%" | "ROI típico observado: 4-6 meses" |

---

### Estrutura de Conteúdo

**Estabelecido**:
```typescript
Step {
  badge: "Métrica ou timeline" // ex: "Primeiros resultados em 48-72h"
  title: "O QUE é + contexto"  // ex: "Anúncios segmentados por localização"
  subtitle: "POR QUE relevante" // ex: "Investimento direcionado para..."
  description: "COMO funciona"  // 2-4 frases: O QUE + COMO + Modelo
  why: "Fundamento técnico"     // Causa → Mecanismo → Efeito
  
  collapsibles: [               // 3 por step
    question: "Objeção real"    // ex: "Como funciona X?"
    answer: "Resposta completa" // Direta + Técnica + Prática
  ]
}
```

---

### Uso de Dados

**Regras**:
1. **Intervalos honestos**: "38-42%" (não "40%")
2. **Atribuição clara**: "Estudos indicam...", "Clientes relatam..."
3. **Contexto obrigatório**: Número + O que significa + vs Benchmark
4. **Casos reais**: "Profissional obteve 8→14→18" (não "resultados incríveis")

**Exemplo**:
```markdown
✅ "Estudos indicam que 67% dos usuários abandonam páginas com 
    carregamento superior a 3 segundos. Adicionalmente, 58% desistem 
    quando não encontram preços claros."
```

---

## 📋 Aplicação Imediata

### Próximas Seções a Refatorar

1. **ProofSection** 🔜
   - Aplicar tom profissional nos testimonials
   - Adicionar collapsibles: "Como validamos esses resultados?", "Por que escolher esse nicho?"
   - Contextualizar métricas (8→14→18 agendamentos = +125% mês 3 vs mês 1)

2. **PricingSection** 🔜
   - Remover urgência falsa se houver
   - Adicionar collapsibles por tier: "O que está incluído exatamente?", "Posso mudar de plano?"
   - Explicar setup fee com fundamento (não só preço)

3. **CaptureSection** 🔜
   - Reescrever benefits com especificidade
   - Adicionar collapsible: "Como vocês protegem meus dados?"
   - Timeline realista: "Você receberá contato em até 24h"

4. **FAQSection** 🔜
   - Revisar perguntas para garantir que são objeções reais
   - Respostas completas (Direta + Técnica + Prática)
   - Sem "vendedor" nas respostas

---

## ✅ HowItWorksSection (Referência)

**Status**: ✅ Implementado conforme padrões

**Highlights**:
- 3 steps com badges informativos
- 9 collapsibles respondendo objeções documentadas
- Tom profissional: "Configuramos campanhas..." (não "A gente vai bombar...")
- Dados contextualizados: "67% abandonam em 3s" + explicação do por quê importa
- Timelines realistas: "48-72h" (não "RESULTADOS IMEDIATOS")

**Ver código**: `/src/components/landing/sections/HowItWorksSection.tsx`

---

## 🔄 Workflow de Revisão

Para qualquer seção nova ou refactor:

1. **Escrever** usando templates do Quick Reference
2. **Revisar** com Checklist (7 perguntas rápidas)
3. **Validar** contra Anti-Padrões (8 categorias)
4. **TypeScript check**: `pnpm typecheck`
5. **Visual test**: Testar collapsibles, responsividade, dark mode

---

## 📊 Métricas de Sucesso

**Como medir se o novo tom está funcionando**:

- **Qualitativo**:
  - ✅ Feedback de profissionais: "Finalmente alguém que explica como funciona"
  - ✅ Redução de perguntas repetitivas em discovery calls
  - ✅ Aumento de qualificação do lead (menos "é gratuito?")

- **Quantitativo**:
  - 📈 Tempo médio na página (mais tempo = mais leitura)
  - 📈 Taxa de abertura de collapsibles (engajamento com conteúdo)
  - 📈 Taxa de conversão qualificada (leads que entendem proposta)
  - 📉 Taxa de churn nos primeiros 30 dias (expectativa calibrada)

---

## 🚀 Próximos Passos

1. **Aplicar padrões em ProofSection** (próximo na fila)
2. **Documentar learnings** de cada refactor
3. **Criar biblioteca de collapsibles** reutilizáveis por nicho
4. **A/B test**: Tom atual vs Tom antigo (quando tráfego permitir)

---

## 📚 Recursos Adicionais

- **Documento completo**: `/docs/COPY_CONTENT_STANDARDS.md`
- **Guia rápido**: `/docs/COPY_QUICK_REFERENCE.md`
- **Exemplo de código**: `/src/components/landing/sections/HowItWorksSection.tsx`
- **Skills de IA**: https://www.anthropic.com/news/skills (para criação de conteúdo)

---

**Conclusão**: Sistema de padrões completo, testado e pronto para escalar. Próxima iteração: aplicar em ProofSection, PricingSection e CaptureSection. 🎯
