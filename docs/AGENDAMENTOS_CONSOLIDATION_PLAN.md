# Agendamentos - Plano de Consolidação Estratégica

## 🎯 Objetivo

Consolidar conteúdo poluído em **4 seções FORTES** com:
- UI/UX de ponta
- Copy estratégico, neutro, sóbrio, profissional
- Conteúdo relevante e fundamentado
- Sem oversizing ou enchimento

---

## 📊 Estrutura Consolidada (4 Seções)

### Seção 1: **Hero Integrado** (1.5x)
**Combina:** Hero + Overview de tipos de sessão

**Conteúdo:**
- Headline clara e direta
- Subtitle factual
- 3 principais benefícios (não lista longa)
- Overview visual dos 3 tipos de sessão (compacto)
- 1 CTA primário forte

**Layout:** 2 colunas
- Esquerda: Content + Benefits
- Direita: Session Types Preview (compacto)

---

### Seção 2: **Session Types Deep Dive** (1.5x)
**Combina:** Cards de sessão + Como funciona

**Conteúdo:**
- 3 cards premium (Diagnóstico, Auditoria, Sprint Support)
- Cada card: Icon, Título, Duração, 3 bullets chave, CTA
- Abaixo: Timeline de processo (3 steps compactos)

**Layout:** Grid 3 colunas + Timeline horizontal

---

### Seção 3: **Trust & Proof** (0.5x)
**Combina:** Social Proof + Credenciais

**Conteúdo:**
- 2-3 testimonials selecionados (não lista longa)
- Stats simples (sessões realizadas, satisfação)
- Sem overselling

**Layout:** Horizontal scroll ou grid 2 colunas

---

### Seção 4: **Final CTA + FAQ Essencial** (0.5x)
**Combina:** CTA + FAQ mais importante

**Conteúdo:**
- CTA direto e claro
- 3-4 FAQs apenas (mais perguntadas)
- Footer info

**Layout:** Centrado, compacto

---

## 🎨 Design System Consolidado

### Gradientes (APENAS onde faz sentido):
```scss
// CTAs primários
bg-gradient-to-r from-blue-600 to-cyan-600

// Session type icons (background)
gradient sutil no container do ícone

// NADA MAIS
```

### Spacing (Não oversized):
```scss
Seções: py-16 (não py-24)
Cards: p-6 (não p-10)
Gaps: gap-6 (não gap-12)
Container: max-w-7xl
```

### Typography (Profissional):
```scss
H1: text-4xl lg:text-5xl
H2: text-3xl lg:text-4xl
H3: text-xl
Body: text-base
Small: text-sm
```

---

## ✂️ O Que Remover (Poluição):

### ❌ Hero separado do overview
- Unificar em 1 seção

### ❌ FAQ longa com 8+ perguntas
- Manter só 3-4 essenciais

### ❌ Multiple CTAs repetidos
- 1 CTA forte por seção, no máximo

### ❌ "Como funciona" como seção inteira
- Compactar em timeline de 3 steps

### ❌ Stats exagerados ou inventados
- Apenas números reais e verificáveis

### ❌ Testimonials longos demais
- Resumir em 2-3 linhas cada

---

## 📝 Copy Guidelines

### ✅ BOM (Usar):
```
"Análise técnica de performance e oportunidades de otimização"
"Revisão de arquitetura, padrões e segurança"
"Alocação dedicada para sprint ou período definido"
```

### ❌ RUIM (Evitar):
```
"Transforme seu negócio com nossa consultoria revolucionária"
"Resultados garantidos em tempo recorde"
"Líder absoluto em consultoria técnica"
```

### Princípios:
1. **Específico** > Genérico
2. **Factual** > Promessas
3. **Técnico** > Marketing
4. **Direto** > Floreado
5. **Humilde** > Arrogante

---

## 🚀 Implementação

### Fase 1: Consolidar Hero (Seção 1)
- [ ] Unificar Hero + Session Overview
- [ ] Copy neutro e profissional
- [ ] Layout 2 colunas eficiente

### Fase 2: Session Deep Dive (Seção 2)
- [ ] 3 cards otimizados (não oversized)
- [ ] Process timeline compacto
- [ ] Grid responsivo

### Fase 3: Trust Layer (Seção 3)
- [ ] 2-3 testimonials selecionados
- [ ] Stats reais e simples
- [ ] Layout horizontal

### Fase 4: Final CTA (Seção 4)
- [ ] CTA direto
- [ ] 3-4 FAQs essenciais
- [ ] Footer clean

---

## 📊 Comparação

### ANTES (Poluído):
```
1. Hero (full height)
2. Session Types (oversized cards)
3. Como Funciona (seção inteira)
4. Social Proof (lista longa)
5. Process Timeline (oversized)
6. FAQ (8+ perguntas)
7. Final CTA
= 7 seções, muita poluição
```

### DEPOIS (Consolidado):
```
1. Hero Integrado (Hero + Overview)    ← 1.5x
2. Sessions + Process (Cards + Timeline) ← 1.5x
3. Trust & Proof (Testimonials + Stats)  ← 0.5x
4. CTA + FAQ (Final + Essencial)         ← 0.5x
= 4 seções, conteúdo forte e limpo
```

---

## ✅ Resultado Esperado

**Antes:**
- 7 seções fracas
- Conteúdo diluído
- Oversizing para compensar
- Copy repetitivo

**Depois:**
- 4 seções fortes
- Conteúdo consolidado
- Tamanho adequado
- Copy estratégico

**Qualidade:** ⭐⭐⭐⭐⭐
**Clareza:** ⭐⭐⭐⭐⭐
**Conversão:** ↑↑↑

---

*Plano criado: 2025-01-16*  
*Objetivo: 4 seções fortes > 7 seções fracas*
