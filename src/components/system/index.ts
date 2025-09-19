/**
 * ARCO Design System - Core Exports
 * Professional design tokens and system utilities
 */

// Design Tokens - ARCO Brand Identity
export { designTokens, colors, typography, spacing, arcoTheme } from './design-tokens';

// Import for internal use
import { designTokens } from './design-tokens';

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
      --arco-primary-500: ${colors.primary[500]};
      --arco-primary-600: ${colors.primary[600]};
      --arco-secondary-500: ${colors.secondary[500]};
      
      /* Neutral Scale */
      --arco-neutral-50: ${colors.neutral[50]};
      --arco-neutral-100: ${colors.neutral[100]};
      --arco-neutral-500: ${colors.neutral[500]};
      --arco-neutral-900: ${colors.neutral[900]};
      
      /* Typography */
      --arco-font-sans: ${typography.fonts.sans.join(', ')};
      --arco-text-base: ${typography.sizes.base};
      --arco-text-lg: ${typography.sizes.lg};
      
      /* Spacing */
      --arco-space-4: ${spacing[4]};
      --arco-space-8: ${spacing[8]};
      --arco-space-16: ${spacing[16]};
    }
  `;
};

/**
 * Utility: Apply ARCO theme to component
 * Usage: const theme = useArcoTheme();
 */
export const useArcoTheme = () => designTokens;
