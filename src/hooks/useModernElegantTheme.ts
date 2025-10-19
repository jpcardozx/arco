/**
 * Hook: useModernElegantTheme
 * Aplica design system Modern Elegant globalmente
 */

import { useEffect } from 'react'
import { COLORS, GRADIENTS } from '@/lib/design-tokens-modern-elegant'

export function useModernElegantTheme() {
  useEffect(() => {
    // Aplicar CSS variables globalmente
    const root = document.documentElement

    // Colors
    root.style.setProperty('--color-charcoal', COLORS.charcoal)
    root.style.setProperty('--color-deep-navy', COLORS.deepNavy)
    root.style.setProperty('--color-premium-gold', COLORS.premiumGold)
    root.style.setProperty('--color-warm-gold', COLORS.warmGold)
    root.style.setProperty('--color-pure-white', COLORS.pure)
    root.style.setProperty('--color-soft-white', COLORS.soft)

    // Gradients
    root.style.setProperty('--gradient-hero', GRADIENTS.hero)
    root.style.setProperty('--gradient-accent', GRADIENTS.accent)
    root.style.setProperty('--gradient-text', GRADIENTS.text)

    return () => {
      // Cleanup (opcional)
    }
  }, [])

  return {
    colors: COLORS,
    gradients: GRADIENTS,
  }
}
