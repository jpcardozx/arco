# 📊 Análise Pareto - Código Morto (Princípio 80/20)

**Data**: 28 de outubro de 2025  
**Objetivo**: Identificar 20% dos arquivos que representam 80% do valor/complexidade

---

## 🎯 Metodologia Pareto

### Critérios de Relevância
1. **Tamanho** (linhas de código)
2. **Complexidade** (lógica de negócio)
3. **Reusabilidade** (componentes vs one-off)
4. **Versão** (superior vs inferior)

---

## 📊 TOP 20% - Alta Relevância (Revisar/Decidir)

### 🔴 TIER S: COMPONENTES GRANDES COM POTENCIAL (4 arquivos = 80% do valor)

#### 1. **EnhancedDashboard.tsx** (641 linhas) ⭐ MÁXIMA PRIORIDADE
```
Arquivo: src/components/dashboard/EnhancedDashboard.tsx
Tamanho: 641 linhas
Status Knip: Não usado
```

**Análise Comparativa**:
```typescript
// VERSÕES NO PROJETO:
├── EnhancedDashboard.tsx (641 linhas) ❌ NÃO USADO
├── MainDashboard.tsx (?)               ✅ VERSÃO ATIVA?
└── src/app/dashboard/page.tsx          ✅ VERSÃO ATIVA?

AÇÃO NECESSÁRIA:
1. Verificar qual versão está ativa em produção
2. Se MainDashboard é superior → ❌ DELETAR EnhancedDashboard
3. Se EnhancedDashboard é superior → ♻️ MIGRAR features para ativa
```

**Decisão**:
```bash
# Verificar qual está em uso
grep -r "MainDashboard\|EnhancedDashboard" src/app/dashboard/

# SE MainDashboard existe e é usado:
❌ DELETE src/components/dashboard/EnhancedDashboard.tsx

# SE EnhancedDashboard tem features melhores:
⚠️ EXTRAIR features úteis → migrar para MainDashboard
```

**Impacto**: -641 linhas se deletado

---

#### 2. **sidebar-navigation.tsx** (344 linhas) ⭐ ALTA PRIORIDADE
```
Arquivo: src/components/dashboard/sidebar-navigation.tsx
Tamanho: 344 linhas
Status Knip: Não usado
```

**Análise Comparativa**:
```typescript
// VERSÕES NO PROJETO:
├── sidebar-navigation.tsx (344 linhas) ❌ NÃO USADO
├── sidebar.tsx (281 linhas)            ❌ NÃO USADO (Knip)
├── sidebar-refactored.tsx (82 linhas)  ❓ VERIFICAR
└── DashboardSidebar.tsx (?)            ✅ VERSÃO ATIVA?

PADRÃO IDENTIFICADO: Múltiplas versões do mesmo componente
```

**Decisão**:
```bash
# Verificar qual sidebar está ativo
grep -r "DashboardSidebar\|sidebar-navigation" src/app/

# Cenário 1: DashboardSidebar é a versão ativa
❌ DELETE sidebar-navigation.tsx (344 linhas)
❌ DELETE sidebar.tsx (281 linhas)  
❌ DELETE sidebar-refactored.tsx (82 linhas)
Total: -707 linhas

# Cenário 2: sidebar-navigation tem features superiores
⚠️ COMPARAR features
♻️ MIGRAR features únicas para versão ativa
❌ DELETE versões antigas
```

**Impacto potencial**: -707 linhas (todas versões sidebar)

---

#### 3. **domain-management.tsx** (314 linhas) ⭐ MÉDIA-ALTA PRIORIDADE
```
Arquivo: src/components/dashboard/domain-management.tsx
Tamanho: 314 linhas
Status Knip: Não usado
```

**Análise**:
```typescript
// Feature: Gerenciamento de domínios
Status: Não usado no dashboard atual

CENÁRIOS:
1. Feature não implementada → ❌ DELETE
2. Feature planejada (roadmap) → ⚠️ MANTER em /experimental
3. Feature duplicada em outro arquivo → ❌ DELETE
```

**Decisão**:
```bash
# Verificar se existe feature de domínios ativa
grep -r "domain" src/app/dashboard/

# Se não existe:
❌ DELETE (feature não implementada)

# Se existe em outro lugar:
⚠️ COMPARAR qualidade das implementações
✅ MANTER versão superior
❌ DELETE versão inferior
```

**Impacto**: -314 linhas se deletado

---

#### 4. **VideoBackground.tsx** (278 linhas) ⭐ MÉDIA PRIORIDADE
```
Arquivo: src/components/ui/VideoBackground.tsx
Tamanho: 278 linhas
Status Knip: Não usado
```

**Análise**:
```typescript
// Componente: Video Background Hero
Complexidade: Alta (video playback, performance)
Reusabilidade: Alta (pode ser útil no futuro)

CENÁRIOS:
1. Substituído por outro hero → ❌ DELETE
2. Planejado para uso → ⚠️ MOVER para /experimental
3. Único no projeto → ⚠️ DOCUMENTAR para uso futuro
```

**Decisão**:
```bash
# Verificar se existe outro VideoBackground
find src/ -name "*video*" -o -name "*Video*"

# Se não existe similar:
⚠️ MANTER (único, complexo, reusável)
📁 MOVER para src/components/experimental/ (sinalizar que existe)

# Se existe versão melhor:
❌ DELETE este
```

**Impacto**: -278 linhas OU mover para experimental

---

### 📊 Resumo TOP 4 (Pareto 80%)
```
┌──────────────────────────────┬────────┬──────────────┬──────────┐
│ Arquivo                      │ Linhas │ Prioridade   │ Decisão  │
├──────────────────────────────┼────────┼──────────────┼──────────┤
│ EnhancedDashboard.tsx        │ 641    │ ⭐⭐⭐⭐⭐   │ REVISAR  │
│ sidebar-navigation.tsx       │ 344    │ ⭐⭐⭐⭐⭐   │ REVISAR  │
│ domain-management.tsx        │ 314    │ ⭐⭐⭐⭐     │ REVISAR  │
│ VideoBackground.tsx          │ 278    │ ⭐⭐⭐       │ REVISAR  │
├──────────────────────────────┼────────┼──────────────┼──────────┤
│ TOTAL                        │ 1,577  │              │          │
└──────────────────────────────┴────────┴──────────────┴──────────┘

Representa: ~40% do código morto em componentes
Decisão: REVISAR estes 4 antes de deletar
```

---

## 🟡 TIER A: COMPONENTES MÉDIOS - CANDIDATOS A DELEÇÃO (80% dos casos)

### Landing Page Components (18 arquivos não usados)

**Análise**:
```typescript
// LandingPageTemplate.tsx USA:
✅ HeroSection
✅ ROICalculatorSection
✅ LeadMagnetSection
✅ HowItWorksSection
✅ ImplementationGuideSection
✅ PoliciesSection
✅ ProofSection (dynamic)
✅ ValueInvestmentSection (dynamic)
✅ CaptureSection (dynamic)
✅ TransitionBridge

// Knip detectou 18 não usados em landing/
// Significa que existem versões alternativas/duplicadas
```

**Componentes Não Usados em Landing**:
```
src/components/landing/
├── IntentCheckpoint.tsx           ❌ (não importado)
├── OptimizedImage.tsx             ❌ (não importado)
├── ProfessionalCTA.tsx            ❌ (não importado)
├── SalaoBeautyAssets.tsx          ❌ (não importado)
├── ServiceCard.tsx                ❌ (não importado)
│
├── sections/
│   ├── BeautyServicesShowcase.tsx ❌ (não importado)
│   ├── ComparisonSection.tsx      ❌ (não importado)
│   ├── HeroSectionEnhanced.tsx    ❌ (não importado) DUPLICATA!
│   ├── IntentSelectorSection.tsx  ❌ (não importado)
│   ├── PreviewSection.tsx         ❌ (não importado)
│   ├── PricingSection.tsx         ❌ (não importado)
│   └── SystemOverviewSection.tsx  ❌ (não importado)
│
├── assets/
│   ├── LandingIcon.tsx            ❌ (não importado)
│   ├── LandingIllustrations.tsx   ❌ (não importado)
│   └── icon-map.ts                ❌ (não importado)
│
└── three/
    └── PhoneMockup3D.tsx          ❌ (não importado)
```

**Análise de Duplicação - CRÍTICA**:
```typescript
// HERO SECTIONS:
HeroSection.tsx             ✅ USADO no LandingPageTemplate
HeroSectionEnhanced.tsx     ❌ NÃO USADO

DECISÃO ÓBVIA:
❌ DELETE HeroSectionEnhanced.tsx (versão não ativa)
✅ MANTER HeroSection.tsx (versão ativa é superior)

// PATTERN: Se LandingPageTemplate usa X, DELETE XEnhanced/X2/XAlternative
```

**Decisão Landing Components**:
```bash
# DELETAR COM SEGURANÇA (versões alternativas não ativas):
❌ IntentCheckpoint.tsx (não usado, tem IntentSelectorSection)
❌ HeroSectionEnhanced.tsx (duplicata de HeroSection)
❌ ComparisonSection.tsx (não usado)
❌ PreviewSection.tsx (não usado)
❌ PricingSection.tsx (não usado, tem ValueInvestmentSection)
❌ BeautyServicesShowcase.tsx (específico, não usado)
❌ IntentSelectorSection.tsx (não importado)
❌ SystemOverviewSection.tsx (não importado)
❌ PhoneMockup3D.tsx (3D não usado)

# AVALIAR (podem ter valor reusável):
⚠️ ServiceCard.tsx (componente genérico)
⚠️ ProfessionalCTA.tsx (componente genérico)
⚠️ OptimizedImage.tsx (utilitário)
⚠️ SalaoBeautyAssets.tsx (assets específicos)
⚠️ LandingIcon.tsx (ícones)

# MOVER para /experimental (assets reusáveis):
📁 assets/LandingIcon.tsx → src/components/experimental/
📁 assets/LandingIllustrations.tsx → src/components/experimental/
```

**Impacto**: -12 arquivos landing (-60% do código morto landing)

---

### Dashboard Components Duplicados

**Análise de Versões**:
```typescript
// SIDEBARS (4 versões!):
sidebar-navigation.tsx (344 linhas)  ❌ versão 1
sidebar.tsx (281 linhas)             ❌ versão 2
sidebar-refactored.tsx (82 linhas)   ❌ versão 3
DashboardSidebar.tsx                 ✅ versão ATIVA

DECISÃO:
❌ DELETE 3 versões antigas
✅ MANTER apenas DashboardSidebar (versão ativa)

Impacto: -707 linhas
```

**Componentes Card Duplicados**:
```typescript
// CARDS:
action-card.tsx (87 linhas)      ❌ não usado
info-card.tsx (72 linhas)        ❌ não usado  
metric-card.tsx (107 linhas)     ❓ verificar se usado
opportunity-card.tsx (65 linhas) ❓ verificar se usado

// Verificar se existe componente Card genérico superior
grep -r "DashboardCard\|StatCard" src/

DECISÃO:
Se existe componente genérico melhor:
  ❌ DELETE cards específicos
Senão:
  ⚠️ CONSOLIDAR em 1 componente Card genérico
```

---

## 🟢 TIER B: COMPONENTES PEQUENOS - DELEÇÃO RÁPIDA (restante 20%)

### Componentes Antigos/Substituídos (100% deletáveis)

```bash
# Homepage antiga (substituída por app/page.tsx):
❌ src/components/HomePageClient.tsx
❌ src/components/MatureHero.tsx
❌ src/components/SuccessCases.tsx

# Agendamentos v1 (substituído por v2):
❌ src/components/agendamentos/ConsultoriaCard.tsx
❌ src/components/agendamentos/EnhancedConsultoriaCard.tsx
❌ src/components/agendamentos/DateTimePicker.tsx
❌ src/components/agendamentos/Hero.tsx
❌ src/components/agendamentos/sections/ (3 arquivos)

# Analytics não implementado:
❌ src/components/analytics/EMQDashboard.tsx
❌ src/components/analytics/TrackableButton.tsx
❌ src/components/analytics/TrackableLink.tsx
❌ src/components/analytics/TrackableSection.tsx

# Frameworks não usados:
❌ src/components/primitives/ (Badge, Card, Typography)
❌ src/components/relume/ (8 componentes Relume)

Total: ~25 arquivos pequenos
Impacto: -500 linhas estimadas
```

---

## 🎯 Plano de Execução Pareto

### FASE 2A: Revisão dos TOP 4 (2h)

```bash
#!/bin/bash
# Fase 2A - Revisar TOP 4 componentes grandes

# 1. EnhancedDashboard vs MainDashboard
echo "1. Analisando Dashboard..."
grep -r "MainDashboard\|EnhancedDashboard" src/app/dashboard/

# 2. Sidebars (4 versões)
echo "2. Analisando Sidebars..."
grep -r "DashboardSidebar\|sidebar" src/app/dashboard/ | grep -v node_modules

# 3. domain-management
echo "3. Verificando feature de domínios..."
grep -r "domain" src/app/dashboard/

# 4. VideoBackground
echo "4. Verificando VideoBackground..."
find src/ -name "*video*" -iname "*.tsx"

# DECISÃO:
# - Se versão ativa é superior → DELETE versão não usada
# - Se versão não usada é superior → EXTRAIR features → DELETE
# - Se único no projeto → MOVER para experimental/
```

**Output Esperado**:
```
DECISÕES:
[ ] EnhancedDashboard: DELETE OU EXTRAIR features
[ ] sidebar-navigation: DELETE (3 versões antigas)
[ ] domain-management: DELETE OU MOVER experimental
[ ] VideoBackground: DELETE OU MOVER experimental

Potencial: -1,500 linhas
```

---

### FASE 2B: Deleção Landing Duplicatas (1h)

```bash
#!/bin/bash
# Fase 2B - Deletar landing pages duplicadas

# Deletar versões alternativas (não ativas)
rm src/components/landing/sections/HeroSectionEnhanced.tsx
rm src/components/landing/sections/ComparisonSection.tsx
rm src/components/landing/sections/PreviewSection.tsx
rm src/components/landing/sections/PricingSection.tsx
rm src/components/landing/sections/BeautyServicesShowcase.tsx
rm src/components/landing/sections/IntentSelectorSection.tsx
rm src/components/landing/sections/SystemOverviewSection.tsx
rm src/components/landing/IntentCheckpoint.tsx
rm src/components/landing/three/PhoneMockup3D.tsx

# Mover assets para experimental (podem ser úteis)
mkdir -p src/components/experimental/landing-assets/
mv src/components/landing/assets/* src/components/experimental/landing-assets/
mv src/components/landing/ServiceCard.tsx src/components/experimental/
mv src/components/landing/ProfessionalCTA.tsx src/components/experimental/

# Validar
pnpm typecheck
pnpm build

echo "✅ Landing duplicatas removidas"
echo "📁 Assets movidos para experimental/"
```

**Impacto**: -12 arquivos, ~400 linhas

---

### FASE 2C: Deleção Rápida (30min)

```bash
#!/bin/bash
# Fase 2C - Deletar componentes óbvios

# Homepage antiga
rm src/components/HomePageClient.tsx
rm src/components/MatureHero.tsx
rm src/components/SuccessCases.tsx

# Agendamentos v1
rm -rf src/components/agendamentos/sections/
rm src/components/agendamentos/ConsultoriaCard.tsx
rm src/components/agendamentos/EnhancedConsultoriaCard.tsx
rm src/components/agendamentos/DateTimePicker.tsx
rm src/components/agendamentos/Hero.tsx

# Analytics não implementado
rm src/components/analytics/EMQDashboard.tsx
rm src/components/analytics/Trackable*.tsx

# Frameworks não usados
rm -rf src/components/primitives/
rm -rf src/components/relume/

# Dashboard duplicatas óbvias
rm src/components/dashboard/action-card.tsx
rm src/components/dashboard/info-card.tsx

# Validar
pnpm typecheck && echo "✅ Deleção rápida completa"
```

**Impacto**: -25 arquivos, ~500 linhas

---

## 📊 Comparação de Versões - Critérios

### Como Decidir Qual Versão Manter:

```typescript
CRITÉRIOS (em ordem de prioridade):

1. ✅ VERSÃO ATIVA EM PRODUÇÃO
   - Se está importada em src/app/ → VERSÃO SUPERIOR
   - Se não está importada → VERSÃO INFERIOR

2. 📅 DATA DE MODIFICAÇÃO
   - git log --format="%ai %s" -- arquivo.tsx
   - Mais recente = provavelmente superior

3. 📏 QUALIDADE DO CÓDIGO
   - TypeScript strict? ✅ Superior
   - Acessibilidade (a11y)? ✅ Superior
   - Performance (memo, useMemo)? ✅ Superior
   - Testes? ✅ Superior

4. 📦 DEPENDÊNCIAS
   - Menos dependências = Superior
   - Dependências modernas = Superior

5. 📝 DOCUMENTAÇÃO
   - JSDoc comments? ✅ Superior
   - Prop types claros? ✅ Superior
```

### Exemplo Prático:

```typescript
// COMPARAR: EnhancedDashboard vs MainDashboard

// 1. Verificar uso em produção
grep -r "MainDashboard" src/app/          // ✅ Encontrado
grep -r "EnhancedDashboard" src/app/      // ❌ Não encontrado

// RESULTADO: MainDashboard é SUPERIOR (está em uso)
// DECISÃO: DELETE EnhancedDashboard

// 2. Antes de deletar, verificar features únicas:
diff EnhancedDashboard.tsx MainDashboard.tsx

// 3. Se EnhancedDashboard tem algo útil:
//    - EXTRAIR feature
//    - ADICIONAR em MainDashboard
//    - DELETE EnhancedDashboard
```

---

## ✅ Resumo Executivo Pareto

### 80% do Valor em 20% dos Arquivos:

```
TIER S (4 arquivos - 1,577 linhas):
├── EnhancedDashboard.tsx (641)     → REVISAR comparar com MainDashboard
├── sidebar-navigation.tsx (344)    → DELETE (versões antigas)
├── domain-management.tsx (314)     → REVISAR ou DELETE
└── VideoBackground.tsx (278)       → MOVER experimental OU DELETE

TIER A (30 arquivos - 1,200 linhas):
├── Landing duplicatas (12)         → DELETE versões não ativas
├── Dashboard duplicatas (8)        → DELETE versões antigas
└── Components específicos (10)     → AVALIAR caso a caso

TIER B (213 arquivos - 800 linhas):
└── Componentes pequenos            → DELETE em massa
```

### Impacto Estimado:

```
Fase 2A (Revisão TOP 4):
- Tempo: 2h
- Impacto: -1,500 linhas (decisões críticas)
- Risco: Médio (requer análise)

Fase 2B (Landing duplicatas):
- Tempo: 1h  
- Impacto: -400 linhas
- Risco: Baixo (versões não ativas)

Fase 2C (Deleção rápida):
- Tempo: 30min
- Impacto: -500 linhas
- Risco: Zero (óbvias)

TOTAL:
- Tempo: 3.5h
- Impacto: -2,400 linhas (-60% código morto restante)
- Arquivos: -60 (de 247 → 187)
```

---

## 🚀 Execução Recomendada

### Ordem de Prioridade (Pareto):

1. **FASE 2C PRIMEIRO** (30min) ✅ EXECUTAR HOJE
   - Deleção rápida de óbvios
   - Zero risco
   - Ganho imediato: -25 arquivos

2. **FASE 2B** (1h) ✅ EXECUTAR HOJE
   - Landing duplicatas
   - Baixo risco (versões não ativas)
   - Ganho: -12 arquivos

3. **FASE 2A** (2h) ⚠️ AGENDAR REVISÃO
   - Revisar TOP 4 manualmente
   - Médio risco (decisões críticas)
   - Ganho: Maior impacto individual

**Total Hoje**: 1.5h → -37 arquivos → -900 linhas

---

**Posso prosseguir com FASE 2C + 2B (execução segura de 1.5h)?** 🚀
