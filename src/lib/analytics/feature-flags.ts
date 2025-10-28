'use client';

/**
 * Feature Flags Configuration
 *
 * P2.5: A/B Testing with PostHog Feature Flags
 *
 * Permite testar variações de headline, CTA, layout sem deploy.
 * Essencial para otimização de LP e redução de CAC.
 *
 * Meta conversão LP: 6.6% (mediana)
 * Target: 8-10% (com A/B testing)
 */

import posthog from 'posthog-js';

// ============================================================================
// FEATURE FLAGS
// ============================================================================

/**
 * Lista de feature flags disponíveis
 * Configure no PostHog Dashboard: Feature Flags
 */
export const FEATURE_FLAGS = {
  // A/B Tests - Landing Page
  LP_HERO_VARIANT: 'lp-hero-variant', // test headline/CTA
  LP_PROOF_SECTION: 'lp-proof-section-variant', // social proof layout
  LP_PRICING_DISPLAY: 'lp-pricing-display', // pricing transparency
  LP_CTA_COLOR: 'lp-cta-color', // CTA button color
  LP_FORM_LENGTH: 'lp-form-length', // short vs long form

  // A/B Tests - Tripwire
  TRIPWIRE_ENABLED: 'tripwire-enabled', // show/hide tripwire
  TRIPWIRE_PRICE: 'tripwire-price', // test R$ 29/39/49
  TRIPWIRE_PLACEMENT: 'tripwire-placement', // before/after schedule

  // Features
  WHATSAPP_REMINDER: 'whatsapp-reminder', // automated reminders
  SESSION_RECORDING: 'session-recording', // enable/disable recordings
  CHATBOT_ENABLED: 'chatbot-enabled', // chatbot support

  // Rollouts
  NEW_DASHBOARD: 'new-dashboard', // gradual rollout
  BETA_FEATURES: 'beta-features', // early access
} as const;

export type FeatureFlagKey = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

// ============================================================================
// FEATURE FLAG HOOKS
// ============================================================================

/**
 * Check if feature flag is enabled
 * @param flagKey - Feature flag key
 * @returns boolean | undefined (undefined = not loaded yet)
 */
export function isFeatureFlagEnabled(flagKey: FeatureFlagKey): boolean | undefined {
  if (typeof window === 'undefined' || !posthog.__loaded) {
    return undefined;
  }

  return posthog.isFeatureEnabled(flagKey);
}

/**
 * Get feature flag value (for multivariate tests)
 * @param flagKey - Feature flag key
 * @returns string | boolean | undefined
 */
export function getFeatureFlagValue(flagKey: FeatureFlagKey): string | boolean | undefined {
  if (typeof window === 'undefined' || !posthog.__loaded) {
    return undefined;
  }

  return posthog.getFeatureFlag(flagKey);
}

/**
 * Get all active feature flags
 * @returns Record<string, string | boolean>
 */
export function getAllFeatureFlags(): Record<string, string | boolean> {
  if (typeof window === 'undefined' || !posthog.__loaded) {
    return {};
  }

  // PostHog doesn't have getFeatureFlags(), use feature_flags property
  return (posthog as any).feature_flags?.flags || {};
}

/**
 * Force reload feature flags
 * Use when user context changes (login, properties updated)
 */
export function reloadFeatureFlags(): void {
  if (typeof window === 'undefined' || !posthog.__loaded) {
    return;
  }

  posthog.reloadFeatureFlags();
}

// ============================================================================
// A/B TEST VARIANTS
// ============================================================================

/**
 * Hero Section Variants
 */
export const HERO_VARIANTS = {
  CONTROL: 'control', // Original
  VARIANT_A: 'variant-a', // Headline focado em "sem contrato"
  VARIANT_B: 'variant-b', // Headline focado em ROI
  VARIANT_C: 'variant-c', // Headline focado em velocidade
} as const;

export type HeroVariant = typeof HERO_VARIANTS[keyof typeof HERO_VARIANTS];

/**
 * CTA Color Variants
 */
export const CTA_COLOR_VARIANTS = {
  TEAL: 'teal', // Current (teal-500)
  BLUE: 'blue', // Blue-600
  GREEN: 'green', // Emerald-600
  ORANGE: 'orange', // Orange-500
} as const;

export type CTAColorVariant = typeof CTA_COLOR_VARIANTS[keyof typeof CTA_COLOR_VARIANTS];

/**
 * Form Length Variants
 */
export const FORM_LENGTH_VARIANTS = {
  SHORT: 'short', // Name + Email + Phone (3 fields)
  MEDIUM: 'medium', // + Challenge (4 fields)
  LONG: 'long', // + Revenue + Experience (6 fields)
} as const;

export type FormLengthVariant = typeof FORM_LENGTH_VARIANTS[keyof typeof FORM_LENGTH_VARIANTS];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get Hero variant
 */
export function getHeroVariant(): HeroVariant {
  const variant = getFeatureFlagValue(FEATURE_FLAGS.LP_HERO_VARIANT);
  return (variant as HeroVariant) || HERO_VARIANTS.CONTROL;
}

/**
 * Get CTA color variant
 */
export function getCTAColorVariant(): CTAColorVariant {
  const variant = getFeatureFlagValue(FEATURE_FLAGS.LP_CTA_COLOR);
  return (variant as CTAColorVariant) || CTA_COLOR_VARIANTS.TEAL;
}

/**
 * Get Form length variant
 */
export function getFormLengthVariant(): FormLengthVariant {
  const variant = getFeatureFlagValue(FEATURE_FLAGS.LP_FORM_LENGTH);
  return (variant as FormLengthVariant) || FORM_LENGTH_VARIANTS.MEDIUM;
}

/**
 * Check if tripwire is enabled
 */
export function isTripwireEnabled(): boolean {
  return isFeatureFlagEnabled(FEATURE_FLAGS.TRIPWIRE_ENABLED) ?? false;
}

/**
 * Get tripwire price
 */
export function getTripwirePrice(): number {
  const price = getFeatureFlagValue(FEATURE_FLAGS.TRIPWIRE_PRICE);
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price);
  return 39; // Default R$ 39
}

/**
 * Track feature flag exposure
 * Important: Call this when user sees the variant
 */
export function trackFeatureFlagExposure(flagKey: FeatureFlagKey, variant: string): void {
  if (typeof window === 'undefined' || !posthog.__loaded) {
    return;
  }

  posthog.capture('$feature_flag_called', {
    $feature_flag: flagKey,
    $feature_flag_response: variant,
  });
}

// ============================================================================
// A/B TEST CONFIGURATION (for PostHog Dashboard)
// ============================================================================

/**
 * Copy-paste these configs in PostHog → Experiments
 */

export const AB_TEST_CONFIGS = {
  HERO_HEADLINE: {
    name: 'Hero Headline Test',
    description: 'Test different value propositions in hero section',
    feature_flag_key: FEATURE_FLAGS.LP_HERO_VARIANT,
    variants: [
      {
        key: HERO_VARIANTS.CONTROL,
        name: 'Control (Original)',
        rollout_percentage: 25,
      },
      {
        key: HERO_VARIANTS.VARIANT_A,
        name: 'Sem Contrato Focus',
        rollout_percentage: 25,
      },
      {
        key: HERO_VARIANTS.VARIANT_B,
        name: 'ROI Focus',
        rollout_percentage: 25,
      },
      {
        key: HERO_VARIANTS.VARIANT_C,
        name: 'Speed Focus',
        rollout_percentage: 25,
      },
    ],
    goal_metric: 'lead_magnet_submitted',
    secondary_metrics: ['scroll_depth_50', 'time_on_page_30s'],
    minimum_sample_size: 100, // per variant
  },

  CTA_COLOR: {
    name: 'CTA Button Color Test',
    description: 'Test CTA button colors for conversion',
    feature_flag_key: FEATURE_FLAGS.LP_CTA_COLOR,
    variants: [
      { key: CTA_COLOR_VARIANTS.TEAL, name: 'Teal (Control)', rollout_percentage: 50 },
      { key: CTA_COLOR_VARIANTS.ORANGE, name: 'Orange', rollout_percentage: 50 },
    ],
    goal_metric: 'user_interaction_cta_click',
    secondary_metrics: ['lead_magnet_submitted'],
    minimum_sample_size: 200,
  },

  FORM_LENGTH: {
    name: 'Form Length Test',
    description: 'Test form length vs lead quality',
    feature_flag_key: FEATURE_FLAGS.LP_FORM_LENGTH,
    variants: [
      { key: FORM_LENGTH_VARIANTS.SHORT, name: 'Short (3 fields)', rollout_percentage: 33 },
      { key: FORM_LENGTH_VARIANTS.MEDIUM, name: 'Medium (4 fields)', rollout_percentage: 34 },
      { key: FORM_LENGTH_VARIANTS.LONG, name: 'Long (6 fields)', rollout_percentage: 33 },
    ],
    goal_metric: 'lead_magnet_submitted',
    secondary_metrics: ['schedule_confirmed', 'crm_lead_qualified'],
    minimum_sample_size: 150,
    note: 'Track not just submission rate, but lead QUALITY (schedule rate)',
  },
};

// ============================================================================
// STATISTICAL SIGNIFICANCE
// ============================================================================

/**
 * Check if A/B test has statistical significance
 * Use after collecting minimum sample size
 *
 * Formula: Z-test for proportions
 */
export function calculateStatisticalSignificance(
  controlConversions: number,
  controlSample: number,
  variantConversions: number,
  variantSample: number
): {
  pValue: number;
  isSignificant: boolean;
  uplift: number;
  confidence: number;
} {
  const p1 = controlConversions / controlSample;
  const p2 = variantConversions / variantSample;

  const pooledP = (controlConversions + variantConversions) / (controlSample + variantSample);
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlSample + 1 / variantSample));

  const z = (p2 - p1) / se;
  const pValue = 2 * (1 - normalCDF(Math.abs(z)));

  const uplift = ((p2 - p1) / p1) * 100;
  const confidence = (1 - pValue) * 100;

  return {
    pValue,
    isSignificant: pValue < 0.05, // 95% confidence
    uplift,
    confidence,
  };
}

/**
 * Normal CDF approximation
 */
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  FEATURE_FLAGS,
  HERO_VARIANTS,
  CTA_COLOR_VARIANTS,
  FORM_LENGTH_VARIANTS,
  isFeatureFlagEnabled,
  getFeatureFlagValue,
  getAllFeatureFlags,
  reloadFeatureFlags,
  getHeroVariant,
  getCTAColorVariant,
  getFormLengthVariant,
  isTripwireEnabled,
  getTripwirePrice,
  trackFeatureFlagExposure,
  calculateStatisticalSignificance,
};
