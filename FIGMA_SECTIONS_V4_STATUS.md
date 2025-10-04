# MIGRAÇÃO FIGMA SECTIONS PARA TAILWIND V4 - STATUS

## **📊 ANÁLISE ATUAL**

### **❌ SEÇÕES AINDA NÃO MIGRADAS**
As seções do diretório `/figma` ainda estão usando o **sistema antigo de design tokens** em vez das **classes nativas do Tailwind CSS v4**.

### **🔍 PROBLEMAS IDENTIFICADOS:**

#### **1. Design Tokens Antigos:**
```tsx
// ❌ ANTIGO (ainda em uso)
import { designTokens as tokens } from '@/design-system/tokens';
<h2 className={`${tokens.typography.section} mb-6 text-${tokens.colors.text}`}>

// ✅ NOVO (Tailwind v4)
<h2 className="text-3xl font-bold mb-6 text-gray-900">
```

#### **2. Classes Dinâmicas Problemáticas:**
```tsx
// ❌ PROBLEMÁTICO (não funciona com purging)
className={`bg-${tokens.colors.surface} ${tokens.spacing.section}`}

// ✅ CORRETO (classes estáticas)
className="bg-gray-50 py-16"
```

#### **3. Cores Customizadas Não Utilizadas:**
```tsx
// ❌ NÃO USADO (cores v4 disponíveis mas não utilizadas)
text-blue-600     // usando cores padrão
bg-green-50

// ✅ DEVERIA SER (cores customizadas v4)
text-arco-600     // cores da marca
bg-success-50     // estados semânticos
```

## **📝 SEÇÕES QUE PRECISAM DE MIGRAÇÃO**

### **🔴 PRIORIDADE ALTA:**
1. **FigmaHero** - ✅ Parcialmente migrada
2. **FigmaTestimonials** - ❌ Não migrada
3. **CaseStudyShowcase** - ❌ Não migrada
4. **ContactSection** - ✅ Parcialmente migrada
5. **FigmaFinalCTA** - ✅ Parcialmente migrada

### **🟡 PRIORIDADE MÉDIA:**
6. **FigmaPillars** - ❌ Não migrada
7. **FigmaVelocity** - ❌ Não migrada
8. **ProcessStandards** - ❌ Não migrada
9. **MetricsGuide** - ❌ Não migrada
10. **ServiceComparison** - ❌ Não migrada

### **🟢 PRIORIDADE BAIXA:**
11. **TeamSection** - ❌ Não migrada
12. **FAQSection** - ❌ Não migrada
13. **PricingTable** - ❌ Não migrada
14. **ImplementationProcess** - ❌ Não migrada

## **🛠️ PLANO DE MIGRAÇÃO**

### **Fase 1: Substituir Design Tokens**
```tsx
// ANTES
import { designTokens as tokens } from '@/design-system/tokens';
className={`${tokens.typography.section} text-${tokens.colors.text}`}

// DEPOIS
className="text-3xl font-bold text-gray-900"
```

### **Fase 2: Implementar Cores Customizadas V4**
```tsx
// Cores ARCO
bg-arco-500, text-arco-600, border-arco-200

// Estados Semânticos  
bg-success-50, text-success-600, border-success-200
bg-warning-50, text-warning-600, border-warning-200
bg-error-50, text-error-600, border-error-200
```

### **Fase 3: Usar Features V4**
```tsx
// Sombras Customizadas
shadow-glass      // glassmorphism
shadow-glow       // brilho sutil

// Espaçamento Estendido
p-18, m-20, space-24, gap-28

// Blur Customizado
backdrop-blur-xs, backdrop-blur-3xl
```

## **⚠️ IMPACTO ATUAL**

### **Problemas:**
- ❌ **Build warnings** por classes dinâmicas
- ❌ **Bundle maior** por tokens não otimizados
- ❌ **Inconsistência** entre páginas (v3 + v4 misturados)
- ❌ **Manutenibilidade** comprometida

### **Benefícios da Migração:**
- ✅ **Performance**: Bundle CSS otimizado
- ✅ **Consistência**: Todas as seções em v4
- ✅ **Manutenibilidade**: Código mais limpo
- ✅ **Features**: Aproveitamento total do v4

## **🎯 PRÓXIMOS PASSOS**

1. **Migração sistemática** das seções por prioridade
2. **Remoção de design tokens** antigos
3. **Implementação de cores customizadas** v4
4. **Teste de regressão** visual
5. **Documentação** das novas classes

## **📋 CHECKLIST DE MIGRAÇÃO**

### **Por seção:**
- [ ] Remover import de `designTokens`
- [ ] Substituir `tokens.typography.*` por classes diretas
- [ ] Substituir `tokens.colors.*` por cores v4
- [ ] Substituir `tokens.spacing.*` por classes de espaçamento
- [ ] Implementar cores customizadas (`arco-*`, `success-*`, etc.)
- [ ] Adicionar sombras e effects v4
- [ ] Testar responsividade
- [ ] Validar no build

**STATUS GERAL: 🔴 85% DAS SEÇÕES FIGMA PRECISAM DE MIGRAÇÃO**