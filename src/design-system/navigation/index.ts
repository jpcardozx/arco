/**
 * Navigation Design System - Export Hub
 *
 * Exportação centralizada de todos os componentes, hooks e tokens de navegação
 * Use este arquivo como ponto único de importação
 */

// Main Component
export { UnifiedNavigation } from './components/UnifiedNavigation';
export { default } from './components/UnifiedNavigation';

// Atomic Components
export { NavigationLogo } from './components/NavigationLogo';
export { NavigationLink } from './components/NavigationLink';
export { NavigationCTA } from './components/NavigationCTA';

// Hooks
export { useNavigation } from './hooks/useNavigation';
export type { UseNavigationReturn } from './hooks/useNavigation';

// Tokens & Types
export { navigationTokens, navigationVariants } from './tokens';
export type { NavigationVariant, NavigationTheme } from './tokens';
