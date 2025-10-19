# Migração para UnifiedNavigation

Guia rápido de migração das navbars antigas para o novo sistema unificado.

## ✅ O que mudou

### Antes (Antigo)
- ❌ Múltiplas navbars duplicadas (`PolishedGlassmorphicNavbar`, `RefinedPremiumNavigation`, etc)
- ❌ Lógica espalhada em cada componente
- ❌ Difícil de manter consistência
- ❌ Código duplicado

### Agora (Novo)
- ✅ Uma navbar única e reutilizável (`UnifiedNavigation`)
- ✅ Lógica centralizada em hooks
- ✅ Design tokens para consistência
- ✅ Componentes atômicos modulares

## 🔄 Migrações por Contexto

### 1. Landing Pages (`/lp/*`)

**Antes:**
```tsx
// app/layout.tsx
import { PolishedGlassmorphicNavbar } from '@/components/navigation';

<PolishedGlassmorphicNavbar />
```

**Agora:**
```tsx
// app/layout.tsx
import { UnifiedNavigation } from '@/design-system/navigation';

<UnifiedNavigation variant="landing" theme="auto" />
```

### 2. Homepage e Páginas Corporativas

**Antes:**
```tsx
// components/layout/MainLayout.tsx
import { RefinedPremiumNavigation } from '../navigation/RefinedPremiumNavigation';

<RefinedPremiumNavigation />
```

**Agora:**
```tsx
// Navbar já está no root layout
// MainLayout agora só gerencia Footer
```

### 3. Dashboard

**Antes:**
```tsx
// Custom navbar para dashboard
```

**Agora:**
```tsx
<UnifiedNavigation variant="dashboard" theme="light" />
```

## 🎯 Equivalências de Variantes

| Navbar Antiga | Nova Variante | Uso |
|---------------|---------------|-----|
| `PolishedGlassmorphicNavbar` | `variant="landing"` | Landing pages, conversão |
| `RefinedPremiumNavigation` | `variant="corporate"` | Homepage, portfólio |
| Custom Dashboard Nav | `variant="dashboard"` | Áreas autenticadas |

## 📝 Checklist de Migração

- [ ] Remover imports de navbars antigas
- [ ] Atualizar root layout com `UnifiedNavigation`
- [ ] Escolher variante apropriada
- [ ] Remover navbar duplicada do `MainLayout`
- [ ] Testar em todas as rotas
- [ ] Verificar mobile menu
- [ ] Confirmar logo transition (white → colorful)
- [ ] Validar tema (light/dark/auto)

## 🐛 Problemas Comuns

### "Module not found: @/design-system/navigation"

Certifique-se que o path alias está configurado em `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Logo não aparece

Verifique se as imagens existem:
- `/public/logos/horizontal/white.png`
- `/public/logos/horizontal/colorful.png`

### Navbar duplicada

Se você ver duas navbars, remova a navbar do `MainLayout` ou do layout específico da página.

## 🚀 Próximos Passos

1. **Testar em produção**: Deploy e validar em diferentes devices
2. **Remover código antigo**: Deletar navbars não utilizadas
3. **Documentar customizações**: Se fizer mudanças, documente
4. **Feedback**: Reporte bugs ou sugestões

## 📚 Recursos

- [Documentação Completa](./NAVIGATION_DESIGN_SYSTEM.md)
- [Design Tokens](../src/design-system/navigation/tokens.ts)
- [Exemplos](./NAVIGATION_DESIGN_SYSTEM.md#-exemplos-completos)

---

**Data da Migração**: 2025-01-19
**Versão**: 1.0.0
