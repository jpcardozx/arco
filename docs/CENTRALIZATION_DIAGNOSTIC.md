# 🔍 Hero Section Centralization Diagnostic System

## Overview

Sistema de diagnóstico automático e manual para detectar problemas de centralização e transbordamento no Hero Section.

## Features

### ✅ Auto-Diagnostic
- Executa automaticamente 1.5s após a página carregar
- Verifica centralização do grid
- Detecta overflow horizontal
- Valida funcionamento de `mx-auto`
- Calcula offset do centro do viewport

### 🔧 Manual Diagnostic
Execute no console do browser a qualquer momento:
```javascript
window.diagnoseCentralization()
```

## Output Format

### 📐 VIEWPORT
- **Width**: Largura total da janela
- **Center**: Ponto central em pixels

### 📦 SECTION CONTAINER
- **Width**: Largura da section
- **Left/Right offset**: Distância das bordas
- **Overflow X**: Detecta se há overflow horizontal

### 🎨 MAX-WIDTH CONTAINER (max-w-7xl)
- **Width**: Largura do container com max-width
- **Left/Right margin**: Margens aplicadas pelo `mx-auto`
- **Is mx-auto working**: ✅/❌ Validação de centralização

### 🏗️ GRID CONTAINER
- **Width**: Largura total do grid
- **Grid center**: Posição do centro do grid
- **Viewport center**: Posição do centro do viewport
- **Center offset**: Diferença em pixels (tolerance: 20px)
- **Status**: ✅ CENTERED / ❌ NOT CENTERED

### ⬅️ LEFT COLUMN
- **Width**: Largura do conteúdo
- **Left/Right offset from grid**: Posicionamento dentro do grid

### 🚨 ISSUES DETECTED
Lista de problemas encontrados:
- Grid desalinhado do centro
- Overflow horizontal detectado
- mx-auto não funcionando

### 💡 RECOMMENDATIONS
Sugestões de correção baseadas nos problemas detectados.

## Data Attributes

O sistema usa data-attributes para identificar elementos:

```tsx
data-hero-flex-container  // Container flex principal
data-hero-max-width      // Container com max-w-7xl
data-hero-grid           // Grid lg:grid-cols-2
```

## Uso em Desenvolvimento

### Console Output Example
```
🎯 HERO SECTION CENTRALIZATION DIAGNOSTIC

📐 VIEWPORT:
  Width: 1920px
  Center: 960px

📦 SECTION CONTAINER:
  Width: 1920px
  Left offset: 0px
  Right offset: 0px
  Overflow X: NO ✅

🎨 MAX-WIDTH CONTAINER (max-w-7xl):
  Width: 1280px
  Left margin: 320px
  Right margin: 320px
  Is mx-auto working: ✅ YES

🏗️ GRID CONTAINER:
  Width: 1216px
  Left offset: 352px
  Right offset: 352px
  Grid center: 960.00px
  Viewport center: 960.00px
  Center offset: 0.00px
  Status: ✅ CENTERED

⬅️ LEFT COLUMN (Content):
  Width: 576px
  Left offset from grid: 0.00px
  Right offset from grid: 640.00px

🚨 ISSUES DETECTED:
  ✅ No issues detected!

💡 RECOMMENDATIONS:
  🎉 Layout is perfectly centered!
```

## Troubleshooting

### Grid não centralizado
1. Verificar se `max-w-7xl` tem classe `mx-auto`
2. Confirmar padding balanceado: `px-6 lg:px-12 xl:px-16`
3. Checar elementos absolute que quebram layout

### Overflow horizontal
1. Adicionar `overflow-hidden` no container principal
2. Verificar elementos com larguras fixas maiores que viewport
3. Validar animações de partículas ficam dentro dos limites

### mx-auto não funciona
1. Verificar se container tem `w-full`
2. Confirmar que parent não tem `display: flex` sem `justify-center`
3. Checar se não há `margin` manual sobrescrevendo

## Implementation Details

### Timing
- **Auto-run**: 1500ms após mount (aguarda animações)
- **Manual**: Instantâneo via `window.diagnoseCentralization()`

### Tolerance
- **Center offset**: 20px (considera centralizado se < 20px de diferença)
- **Margin balance**: 5px (mx-auto considerado OK se diferença < 5px)

## Future Enhancements

- [ ] Diagnostic visual overlay no DOM
- [ ] Export de relatório JSON
- [ ] Integração com testes automatizados
- [ ] Modo de debug persistente
- [ ] Responsive breakpoint diagnostics

## Related Files

- `/src/components/sections/PremiumHeroSection.tsx` - Componente principal
- `/src/components/effects/ParticleBackground.tsx` - Sistema de partículas
- `/docs/CENTRALIZATION_DIAGNOSTIC.md` - Esta documentação
