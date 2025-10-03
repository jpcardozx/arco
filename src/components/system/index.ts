/**
 * ARCO Design System - Core Exports
 * Professional design tokens and system utilities
 */

// Re-export from main design system
export { designTokens, colors, typography, spacing, cn } from '@/design-system/tokens';

// Import for internal use
import { designTokens } from '@/design-system/tokens';

// Theme Provider & Utilities (when needed)
export const createArcoTheme = (customTokens?: any) => ({
  ...designTokens,
  ...customTokens
});

// CSS Variables Generator (for dynamic theming)
export const generateCSSVariables = () => {
  const { colors, spacing, typography } = designTokens;
  
  return `
    :root {
      /* ARCO Brand Colors */
      --arco-teal-500: ${colors.teal[500]};
      --arco-teal-600: ${colors.teal[600]};
      --arco-orange-500: ${colors.orange[500]};
      --arco-orange-600: ${colors.orange[600]};
      
      /* Neutral Scale */
      --arco-neutral-50: ${colors.neutral[50]};
      --arco-neutral-100: ${colors.neutral[100]};
      --arco-neutral-500: ${colors.neutral[500]};
      --arco-neutral-900: ${colors.neutral[900]};
    }
  `;
};

/**
 * Utility: Apply ARCO theme to component
 * Usage: const theme = useArcoTheme();
 */
export const useArcoTheme = () => designTokens;
