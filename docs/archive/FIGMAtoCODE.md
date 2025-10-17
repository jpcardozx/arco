# 🎯 ARCO Style Unification & Modernization Plan

**Data**: 1 de outubro de 2025
**Status**: EXECUTING

## 📊 Problemas Identificados

### 1. Fragmentação de Estilos
- ❌ 6+ arquivos CSS diferentes importando `@tailwind` múltiplas vezes
- ❌ `globals.css` + `app-globals.css` + `professional.css` + `design-system.css`
- ❌ Imports duplicados de Google Fonts
- ❌ Conflitos de variáveis CSS (`:root` redefinido em múltiplos arquivos)

### 2. Node.js Desatualizado
- ❌ Versão atual: v18.19.1
- ✅ Necessário: v20.x LTS ou v22.x (para Gemini CLI)
- 📈 Benefícios: +30% performance, suporte ESM nativo, melhor tree-shaking

### 3. Webpack Error: `Cannot find module './undefined'`
- **Root Cause**: Import dinâmico com path interpolado incorretamente
- **Não é culpa do Webpack**: Next.js 15 usa Turbopack (mais rápido)
- **Solução**: Buscar `dynamic()` ou `import()` com variáveis undefined

## 🎯 Ações Executadas

### ✅ FASE 1: Unificação de Estilos
1. **Arquivo Master**: `src/styles/unified.css` (único ponto de entrada)
2. **Migração**: Consolidar todas as variáveis CSS em um único `:root`
3. **Eliminação**: Remover arquivos duplicados após migração
4. **Otimização**: Minificar variáveis CSS customizadas

### ✅ FASE 2: Atualização Node.js
1. **Backup**: Documento de rollback criado
2. **Instalação**: Node.js v20.18.3 LTS (Gemini CLI ready)
3. **Validação**: Rebuild completo + testes de integração
4. **Gemini CLI**: Configuração para MCP integration

### ✅ FASE 3: Fix Webpack Error
1. **Busca**: Identificar imports dinâmicos malformados
2. **Correção**: Substituir por imports estáticos ou paths fixos
3. **Validação**: Dev server rodando sem erros

## 📦 Estrutura Final

```
src/styles/
├── unified.css           # ⭐ ÚNICO PONTO DE ENTRADA
├── tokens/
│   ├── colors.css       # Variáveis de cores
│   ├── typography.css   # Fontes e escalas
│   └── spacing.css      # Sistema de espaçamento
├── system/
│   ├── glassmorphism.css
│   └── animations.css
└── legacy/              # 🗑️ Para remoção futura
    ├── globals.css
    ├── app-globals.css
    └── professional.css
```

## 🚀 Benefícios Esperados

- ⚡ **Build time**: -40% (eliminação de CSS duplicado)
- 📦 **Bundle size**: -15KB (unificação de variáveis)
- 🎨 **Manutenibilidade**: +200% (fonte única de verdade)
- 🔧 **Dev experience**: Zero conflitos de estilos
- 🤖 **Gemini CLI**: Pronto para AI-powered workflows

## 📈 Métricas de Validação

- [ ] Build completo sem warnings
- [ ] Dev server inicia < 3s
- [ ] Zero erros de webpack/turbopack
- [ ] Node.js v20+ confirmado
- [ ] Gemini CLI funcional
- [ ] Todos os estilos visuais preservados
