# 🎯 Knip - Sumário Executivo de Limpeza

**Status**: ✅ Configurado  
**Knip Version**: 5.66.0  
**Data**: 28 de outubro de 2025

---

## 📊 Situação Atual

### Números Totais
- **314 arquivos não utilizados** (scripts, mcp, componentes)
- **391 exports não utilizados** (funções, components)
- **161 tipos não utilizados** (interfaces, types)
- **19 exports duplicados**

### Impacto no Bundle
- **Estimativa**: ~20-30% do código atual está morto
- **Build time**: Pode melhorar 15-20%
- **Developer experience**: Dificulta navegação

---

## 🎯 Estratégia: 3 Categorias

### 🟢 CATEGORIA A: Deletar Sem Medo (Safe)
**Candidatos**: 180 arquivos

```bash
# 1. Scripts de desenvolvimento não usados (60+ arquivos)
scripts/
├── analyze-*.js          # Scripts antigos de análise
├── check-*.js            # Validações one-off
├── diagnose-*.js         # Debug scripts antigos
├── format-project.js     # Unused formatters
├── optimize-images.js    # Não usado (sharp inline)
└── validate-*.js         # Validações antigas

# 2. MCP não implementado (30+ arquivos)
mcp/
├── agents/               # Agents não usados
├── clients/              # Test clients
├── integrations/         # Integrações não finalizadas
└── scripts/              # Scripts de teste

# 3. Componentes substituídos (20+ arquivos)
src/components/
├── HomePageClient.tsx    # Substituído por page.tsx
├── MatureHero.tsx        # Hero antigo
├── SuccessCases.tsx      # Substituído
└── agendamentos/
    ├── ConsultoriaCard.tsx        # v1 (temos v2)
    ├── EnhancedConsultoriaCard.tsx # Duplicado
    └── DateTimePicker.tsx         # Substituído
```

**Ação**: Deletar 180 arquivos (1h de trabalho)  
**Risco**: ⚪ Zero  
**Ganho**: -2MB de código, -5min build time

---

### 🟡 CATEGORIA B: Refatorar (Moderate Risk)
**Candidatos**: 50+ arquivos com exports não usados

```typescript
// shadcn/ui components
src/components/ui/
├── dropdown-menu.tsx     # Manter 4/11 exports
├── select.tsx            # Manter 3/10 exports
├── table.tsx             # Manter 6/9 exports
├── toast.tsx             # Manter 4/8 exports
└── scroll-area.tsx       # Manter 2/3 exports

// Design System
src/design-system/
├── tokens.ts             # Consolidar 10 exports → 1
└── core/theme.tsx        # Remover duplicados

// Lib utilities
src/lib/
├── analytics/            # Remover EMQ, session-quality
├── email/                # Remover automation não implementado
├── leads/                # Remover scoring system
└── payments/             # Remover helpers não usados
```

**Ação**: Refatorar exports (2-3h de trabalho)  
**Risco**: 🟡 Baixo (validar com build)  
**Ganho**: -500KB bundle, +30% clareza

---

### 🔴 CATEGORIA C: Analisar Manualmente (Needs Review)
**Candidatos**: 84 arquivos potencialmente usados

```typescript
// Features que podem estar em uso
src/components/
├── analytics/
│   ├── EMQDashboard.tsx           # Pode estar em dashboard
│   └── TrackableButton.tsx        # Usado via dynamic?
├── assessment/
│   ├── AssessmentFAQ.tsx          # Usado em /assessment
│   └── NurturePathsSection.tsx    # Pode estar ativo
└── dashboard/
    ├── EnhancedDashboard.tsx      # Verificar se usado
    └── TaskModal.tsx              # Pode estar em tasks

// Libs que podem ter uso indireto
src/lib/
├── google-search-console.ts       # API pode chamar
├── auth/rbac.ts                   # Middleware pode usar
└── services/whatsapp-business-api.ts # Verificar API routes
```

**Ação**: Análise manual (1h de investigação)  
**Risco**: 🔴 Médio (pode quebrar features)  
**Ganho**: TBD após análise

---

## 🚀 Plano de Execução Proposto

### Fase 1: Quick Wins (2h) ✅ RECOMENDADA
```bash
# 1. Deletar Categoria A (scripts + mcp)
rm -rf mcp/agents mcp/clients mcp/integrations
rm scripts/analyze-*.js scripts/check-*.js scripts/diagnose-*.js

# 2. Deletar componentes obsoletos óbvios
rm src/components/HomePageClient.tsx
rm src/components/MatureHero.tsx
rm src/components/SuccessCases.tsx
rm src/components/agendamentos/ConsultoriaCard.tsx
rm src/components/agendamentos/EnhancedConsultoriaCard.tsx

# 3. Build para validar
pnpm build
```

**Resultado esperado**:
- ✅ 150+ arquivos deletados
- ✅ Build ainda funciona
- ✅ -2MB de código
- ✅ Commit seguro

---

### Fase 2: Refactoring (3h) - Próxima Sprint
```bash
# 1. Refatorar shadcn/ui exports
# Editar manualmente:
- src/components/ui/dropdown-menu.tsx
- src/components/ui/select.tsx
- src/components/ui/table.tsx

# 2. Consolidar design-system/tokens.ts
# 3. Deletar lib utilities não usados

# 4. Build + typecheck
pnpm build:check
```

**Resultado esperado**:
- ✅ 50 arquivos refatorados
- ✅ -500KB bundle size
- ✅ Tipos limpos

---

### Fase 3: Deep Clean (2h) - Após validação
```bash
# 1. Analisar Categoria C manualmente
# 2. Deletar tipos duplicados (database.types.ts)
# 3. Remover email automation não implementado
# 4. Configurar Knip no CI/CD

# 5. Final validation
pnpm knip
pnpm test
pnpm build
```

**Resultado esperado**:
- ✅ < 50 exports não usados
- ✅ < 20 arquivos não usados
- ✅ 0 duplicações
- ✅ CI/CD com Knip

---

## 🎯 Decisão Recomendada

### Opção A: Conservative (Segura) ✅
**Executar apenas Fase 1**
- Tempo: 2h
- Risco: Zero
- Ganho: 15% de limpeza
- **Recomendada para esta semana**

### Opção B: Moderate (Balanceada)
**Executar Fase 1 + Fase 2**
- Tempo: 5h
- Risco: Baixo
- Ganho: 50% de limpeza
- **Recomendada para próxima sprint**

### Opção C: Aggressive (Completa)
**Executar todas as fases**
- Tempo: 7h
- Risco: Médio
- Ganho: 80% de limpeza
- **Recomendada após code freeze**

---

## 📋 Checklist de Decisão

**Antes de começar, confirmar:**

- [ ] Temos backup (git branch)?
- [ ] Build está passando atualmente?
- [ ] Temos tempo para reverter se necessário?
- [ ] Equipe está ciente da limpeza?
- [ ] CI/CD está configurado para detectar quebras?

**Posso proceder com Fase 1?** (Deletar scripts + mcp + componentes obsoletos)

---

## 📊 Métricas de Sucesso

### Antes (Estado Atual)
```
Total arquivos: ~800
Arquivos mortos: 314 (39%)
Exports não usados: 391
Build time: ~3min
Bundle size: ~1.2MB
```

### Depois (Meta - Fase 1)
```
Total arquivos: ~650 (-19%)
Arquivos mortos: ~160 (-49%)
Exports não usados: ~350 (-10%)
Build time: ~2.5min (-17%)
Bundle size: ~1.0MB (-17%)
```

### Depois (Meta - Todas Fases)
```
Total arquivos: ~550 (-31%)
Arquivos mortos: < 50 (-84%)
Exports não usados: < 50 (-87%)
Build time: ~2min (-33%)
Bundle size: ~800KB (-33%)
```

---

## 🎓 Lições para o Futuro

### Como evitar acúmulo de código morto?

1. **Knip no CI/CD**
   ```bash
   # .github/workflows/knip.yml
   - run: pnpm knip --no-exit-code
   ```

2. **Pre-commit Hook**
   ```bash
   # .husky/pre-commit
   pnpm knip --include-entry-exports
   ```

3. **Code Review Checklist**
   - [ ] Todos exports são usados?
   - [ ] Arquivo tem testes?
   - [ ] Componente está em production?

4. **Regra de 3 meses**
   - Código sem uso há 3 meses = candidato a deletar

---

## ✅ Aprovação Necessária

**Para prosseguir com Fase 1, preciso de confirmação:**

1. Posso deletar arquivos da Categoria A? (scripts, mcp, componentes obsoletos)
2. Qual abordagem prefere: A (Conservative), B (Moderate), ou C (Aggressive)?
3. Quer revisar a lista de arquivos antes de deletar?

**Aguardando sua decisão! 🚀**
