# Navigation Design System

Sistema de navegação reutilizável e escalável para todo o projeto ARCO.

## 📁 Estrutura

```
src/design-system/navigation/
├── index.ts                    # Export hub
├── tokens.ts                   # Design tokens
├── hooks/
│   └── useNavigation.ts       # Hook reutilizável
└── components/
    ├── UnifiedNavigation.tsx  # Componente principal
    ├── NavigationLogo.tsx     # Logo com transitions
    ├── NavigationLink.tsx     # Links de navegação
    └── NavigationCTA.tsx      # Call-to-actions
```

## 🎯 Features

- ✨ **Logo Transition**: White → Colorful on scroll com Framer Motion
- 🎨 **Glassmorphism**: Background blur responsivo e profissional
- 🌓 **Multi-Theme**: Light, Dark e Auto mode
- 📱 **Mobile-First**: Design responsivo otimizado
- ♿ **Acessível**: ARIA labels e keyboard navigation
- 🔄 **Reutilizável**: Componentes atômicos modulares
- ⚡ **Performance**: Lazy loading e optimizações

## 🚀 Uso Básico

### Importação

```tsx
import { UnifiedNavigation } from '@/design-system/navigation';

// Ou componentes individuais
import { NavigationLogo, NavigationLink, useNavigation } from '@/design-system/navigation';
```

### Exemplo Simples

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UnifiedNavigation variant="landing" theme="auto" />
        {children}
      </body>
    </html>
  );
}
```

## 🎨 Variantes

### Landing (Conversão)
Otimizada para landing pages e páginas de captura.

```tsx
<UnifiedNavigation variant="landing" />
```

**Características:**
- Links: Soluções, Como Funciona, Cases, Contato
- CTA Primary: "Login"
- CTA Secondary: "Começar Projeto"
- Foco em conversão

### Corporate (Profissional)
Para portfólio, homepage corporativa e páginas institucionais.

```tsx
<UnifiedNavigation variant="corporate" />
```

**Características:**
- Links: Desenvolvedor, Serviços, Agendamentos, Contato
- CTA Primary: "Agendar Conversa"
- Sem CTA secundário
- Visual premium

### Dashboard (Funcional)
Para áreas autenticadas e dashboards.

```tsx
<UnifiedNavigation variant="dashboard" />
```

**Características:**
- Links: Dashboard, Agendamentos, Clientes
- Sem CTAs
- Design minimalista e funcional

## 🎨 Temas

```tsx
// Light mode (default quando não scrolled)
<UnifiedNavigation theme="light" />

// Dark mode
<UnifiedNavigation theme="dark" />

// Auto (detecta preferência do sistema)
<UnifiedNavigation theme="auto" />
```

## 🔧 Customização

### Usando Hook Diretamente

```tsx
'use client';

import { useNavigation, NavigationLogo } from '@/design-system/navigation';

export function MyCustomNav() {
  const navigation = useNavigation({
    variant: 'landing',
    theme: 'auto',
    scrollThreshold: 50, // Custom scroll trigger
  });

  return (
    <nav>
      <NavigationLogo navigation={navigation} logoVariant="auto" />
      {/* Seus componentes customizados */}
    </nav>
  );
}
```

### Criando Novos Links

```tsx
import { NavigationLink } from '@/design-system/navigation';
import { Home } from 'lucide-react';

<NavigationLink
  navigation={navigation}
  href="/home"
  icon={Home}
>
  Início
</NavigationLink>
```

### Criando Novos CTAs

```tsx
import { NavigationCTA } from '@/design-system/navigation';
import { Rocket } from 'lucide-react';

// Primary CTA
<NavigationCTA
  navigation={navigation}
  href="/start"
  icon={Rocket}
  variant="primary"
>
  Começar Agora
</NavigationCTA>

// Secondary CTA
<NavigationCTA
  navigation={navigation}
  href="/learn"
  variant="secondary"
>
  Saiba Mais
</NavigationCTA>
```

## 🎨 Design Tokens

Todos os tokens estão centralizados em `tokens.ts`:

```ts
import { navigationTokens } from '@/design-system/navigation';

// Heights
navigationTokens.height.desktop.default // '80px'
navigationTokens.height.mobile.scrolled // '56px'

// Colors
navigationTokens.colors.light.background.scrolled
navigationTokens.colors.dark.text.primary

// Glassmorphism
navigationTokens.glassmorphism.blur.scrolled // '20px'

// Transitions
navigationTokens.transition.smooth // '300ms cubic-bezier...'
```

## 📱 Responsividade

O sistema usa breakpoints consistentes:

- **Mobile**: < 1024px (lg)
- **Desktop**: ≥ 1024px

```tsx
// Mobile menu aparece automaticamente em < lg
// Desktop navigation em ≥ lg
<UnifiedNavigation /> // Responsivo por padrão
```

## ♿ Acessibilidade

- ✅ ARIA labels em botões e menus
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus visible states
- ✅ Screen reader friendly
- ✅ Color contrast WCAG AA compliant

## 🔄 Extensão

### Adicionando Nova Variante

1. Adicione ao `tokens.ts`:

```ts
export const navigationVariants = {
  // ...existentes
  myVariant: {
    style: 'custom',
    showParticles: false,
    ctaPrimary: 'My CTA',
    links: ['Link 1', 'Link 2'],
  },
} as const;
```

2. Adicione configuração em `UnifiedNavigation.tsx`:

```ts
const NAVIGATION_CONFIG = {
  // ...existentes
  myVariant: {
    links: [
      { href: '/custom', label: 'Custom', icon: Star },
    ],
    cta: {
      primary: { href: '/cta', label: 'My CTA', icon: Zap },
    },
  },
};
```

3. Use:

```tsx
<UnifiedNavigation variant="myVariant" />
```

## 📊 Performance

- **Bundle Size**: ~8KB (gzipped)
- **First Paint**: Logo aparece imediatamente
- **Smooth Animations**: 60fps com Framer Motion
- **No Layout Shift**: Fixed positioning

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react';
import { UnifiedNavigation } from '@/design-system/navigation';

test('renders navigation', () => {
  render(<UnifiedNavigation variant="landing" />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
```

## 🎯 Best Practices

1. **Use variantes pré-definidas** quando possível
2. **Customize via tokens** antes de criar componentes novos
3. **Use o hook `useNavigation`** para lógica compartilhada
4. **Mantenha acessibilidade** em customizações
5. **Teste em mobile e desktop**

## 📚 Exemplos Completos

### Landing Page

```tsx
// app/lp/[slug]/layout.tsx
import { UnifiedNavigation } from '@/design-system/navigation';

export default function LandingLayout({ children }) {
  return (
    <>
      <UnifiedNavigation variant="landing" theme="auto" showParticles={false} />
      {children}
    </>
  );
}
```

### Corporate Site

```tsx
// app/layout.tsx
import { UnifiedNavigation } from '@/design-system/navigation';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UnifiedNavigation variant="corporate" theme="auto" showParticles={true} />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Dashboard

```tsx
// app/dashboard/layout.tsx
import { UnifiedNavigation } from '@/design-system/navigation';

export default function DashboardLayout({ children }) {
  return (
    <>
      <UnifiedNavigation variant="dashboard" theme="light" />
      {children}
    </>
  );
}
```

## 🐛 Troubleshooting

### Logo não muda de cor no scroll

Verifique se as imagens existem:
- `/public/logos/horizontal/white.png`
- `/public/logos/horizontal/colorful.png`

### Glassmorphism não funciona

Verifique o suporte do navegador para `backdrop-filter`. Use fallback:

```css
@supports not (backdrop-filter: blur(12px)) {
  .navbar {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

### Mobile menu não abre

Certifique-se que `Sheet` do shadcn/ui está instalado:

```bash
npx shadcn-ui@latest add sheet
```

## 📖 Recursos

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contribuindo

Ao adicionar novos recursos:

1. Adicione tokens em `tokens.ts`
2. Crie componentes atômicos reutilizáveis
3. Documente uso e exemplos
4. Teste em todas as variantes
5. Mantenha acessibilidade

---

**Versão**: 1.0.0
**Última atualização**: 2025-01-19
