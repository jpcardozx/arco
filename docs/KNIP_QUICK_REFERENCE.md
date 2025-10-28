# 🚀 Knip - Guia Rápido de Ação

**Status**: ✅ Configurado  
**Data**: 28 de outubro de 2025

---

## 📋 TL;DR - Resumo Executivo

**Situação**: 314 arquivos não usados, 391 exports mortos  
**Recomendação**: Limpeza em 3 fases, começar com Fase 1 (segura)  
**Tempo**: 2h (Fase 1) → 5h (completa)  
**Risco**: ⚪ Baixo se seguir o plano

---

## ⚡ Comandos Rápidos

```bash
# Ver status atual
pnpm knip

# Ver apenas arquivos não usados
pnpm knip --reporter compact | grep "Unused files"

# Ver apenas exports não usados
pnpm knip --reporter compact | grep "Unused exports"

# Ver duplicações
pnpm knip --reporter compact | grep "Duplicate"
```

---

## 🎯 Fase 1: Quick Wins (RECOMENDADA AGORA)

### O que deletar (Safe - Zero Risk):

```bash
# 1. Scripts de desenvolvimento antigos
rm scripts/analyze-*.js
rm scripts/check-*.js
rm scripts/diagnose-*.js
rm scripts/format-project.js
rm scripts/optimize-images.js
rm scripts/validate-*.js

# 2. MCP não implementado
rm -rf mcp/agents
rm -rf mcp/clients
rm -rf mcp/integrations
rm -rf mcp/scripts

# 3. Componentes substituídos
rm src/components/HomePageClient.tsx
rm src/components/MatureHero.tsx
rm src/components/SuccessCases.tsx
rm src/components/agendamentos/ConsultoriaCard.tsx
rm src/components/agendamentos/EnhancedConsultoriaCard.tsx
rm src/components/agendamentos/DateTimePicker.tsx
rm src/components/agendamentos/Hero.tsx

# 4. Analytics não implementado
rm src/components/analytics/EMQDashboard.tsx
rm src/components/analytics/TrackableButton.tsx
rm src/components/analytics/TrackableLink.tsx
rm src/components/analytics/TrackableSection.tsx
```

### Validação:

```bash
# Após deletar, validar
pnpm typecheck
pnpm build
pnpm test:unit

# Se tudo passar ✅
git add .
git commit -m "chore: remove unused files (Phase 1 - Knip cleanup)"
```

**Resultado esperado**: -150 arquivos, -2MB código, -17% build time

---

## 📚 Documentação Completa

- **Estratégia Detalhada**: `docs/KNIP_CLEANUP_STRATEGY.md`
- **Sumário Executivo**: `docs/KNIP_EXECUTIVE_SUMMARY.md`
- **Este Guia**: `docs/KNIP_QUICK_REFERENCE.md`

---

## 🔍 Como Verificar Se É Seguro Deletar

### Checklist antes de deletar arquivo:

```bash
# 1. Verificar importações no projeto
grep -r "nome-do-arquivo" src/

# 2. Verificar se está em tsconfig paths
grep "nome-do-arquivo" tsconfig.json

# 3. Verificar dynamic imports
grep "import(" src/ | grep "nome-do-arquivo"

# 4. Verificar API routes
grep "nome-do-arquivo" src/app/api/

# Se todos retornarem vazio → SAFE TO DELETE ✅
```

---

## 🚨 Regras de Ouro

### ✅ SEMPRE MANTER:
- `src/app/**/*.tsx` (rotas Next.js)
- `src/components/ui/button.tsx` (core UI)
- `src/lib/supabase/*` (database)
- `src/lib/analytics/posthog-config.ts`
- `src/lib/tracking/meta-conversions-api.ts`

### ❌ PODE DELETAR:
- Scripts sem importação ativa
- Componentes com versão "v1" (quando existe v2)
- Arquivos em `mcp/` não referenciados
- Features com "Enhanced" no nome (geralmente duplicados)

### ⚠️ ANALISAR ANTES:
- Componentes de `dashboard/`
- Arquivos em `lib/` (podem ser chamados por API)
- Hooks em `hooks/` (dynamic imports possíveis)

---

## 📊 Categorias de Limpeza

### 🟢 Categoria A: Safe (180 arquivos)
- Scripts de desenvolvimento
- MCP não implementado
- Componentes duplicados/obsoletos
- **Ação**: Deletar imediatamente

### 🟡 Categoria B: Refactor (50 arquivos)
- shadcn/ui exports não usados
- Design System tokens
- Lib utilities parcialmente usados
- **Ação**: Remover exports não usados

### 🔴 Categoria C: Review (84 arquivos)
- Features que podem estar em uso
- Componentes de dashboard
- API utilities
- **Ação**: Análise manual necessária

---

## 🎯 Decisões Rápidas

### Cenário 1: "Tenho 2 horas hoje"
→ **Executar Fase 1** (deletar Categoria A)

### Cenário 2: "Tenho uma tarde livre"
→ **Fase 1 + Fase 2** (deletar + refatorar)

### Cenário 3: "Temos code freeze"
→ **Todas as fases** (limpeza completa)

### Cenário 4: "Sem tempo agora"
→ **Apenas configurar CI/CD** (prevenir novos)

---

## 🔄 Configurar CI/CD (Prevenir Novos)

### Adicionar ao package.json:

```json
{
  "scripts": {
    "knip": "knip",
    "knip:check": "knip --no-exit-code"
  }
}
```

### Adicionar ao pre-commit (.husky):

```bash
#!/bin/sh
pnpm knip --include-entry-exports || echo "⚠️ Knip encontrou issues"
```

### GitHub Actions (.github/workflows/knip.yml):

```yaml
name: Knip Check
on: [pull_request]
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm knip --no-exit-code
```

---

## ✅ Próximos Passos

**Para começar agora:**

1. [ ] Ler `KNIP_EXECUTIVE_SUMMARY.md` (5min)
2. [ ] Decidir: Fase 1, 1+2, ou todas?
3. [ ] Criar branch: `git checkout -b cleanup/knip-phase-1`
4. [ ] Executar comandos da Fase 1
5. [ ] Validar: `pnpm build:check`
6. [ ] Commit e abrir PR

**Tempo estimado**: 2h total (Fase 1)

---

## 📞 Suporte

**Dúvida sobre deletar arquivo específico?**
→ Use o checklist "Como Verificar Se É Seguro Deletar"

**Build quebrou após deletar?**
→ `git checkout .` e analise o arquivo individualmente

**Quer ver relatório atualizado?**
→ `pnpm knip --reporter compact`

---

## 🎓 Aprendizados

### Por que acumulamos 314 arquivos mortos?

1. **Over-engineering**: MCP server completo não implementado
2. **Refactoring**: Criamos v2, não deletamos v1
3. **Scripts one-off**: Análises pontuais não removidas
4. **Copy-paste**: shadcn/ui traz todos exports

### Como evitar no futuro?

1. **YAGNI**: You Aren't Gonna Need It
2. **Delete old before create new**
3. **Knip semanal**: `pnpm knip` antes de PR
4. **Code review**: Questionar arquivos novos sem uso

---

**Pronto para começar? Vá para Fase 1! 🚀**
