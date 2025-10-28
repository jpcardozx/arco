/**
 * PostHog Feature Flags Configuration
 *
 * Landing Page Experiments (3 flags):
 * 1. headline_variant - Test headline copy
 * 2. cta_variant - Test CTA button text
 * 3. form_variant - Test form length/fields
 *
 * Goal: Improve LP CVR from 6-7% to 8-10%
 * Method: Sticky flags (user sees same variant consistently)
 * Cycle: 2 weeks per experiment, 80% confidence
 */

// ============================================================================
// EXPERIMENT DEFINITIONS
// ============================================================================

export const EXPERIMENTS = {
  /**
   * Experiment 1: Headline
   * Tests value proposition clarity and relevance
   */
  HEADLINE: {
    flag: 'headline_variant',
    variants: {
      control: 'Sistema de Agenda para Salões de Beleza',
      clarity: 'Agenda Previsível: Sistema que Traz Clientes Todo Mês',
      roi: 'Agenda que se Paga: Clientes Recorrentes Garantidos',
    },
    metric: 'hero_to_lead_cvr',
    target: '+1.5% CVR',
  },

  /**
   * Experiment 2: CTA
   * Tests action urgency and clarity
   */
  CTA: {
    flag: 'cta_variant',
    variants: {
      control: 'Ver Disponibilidade',
      urgency: 'Agendar Diagnóstico Gratuito',
      direct: 'Começar Agora',
    },
    metric: 'cta_click_rate',
    target: '+2% CTR',
  },

  /**
   * Experiment 3: Form
   * Tests friction vs qualification balance
   */
  FORM: {
    flag: 'form_variant',
    variants: {
      control: 'minimal', // 3 fields: name, email, phone
      medium: 'standard', // 5 fields: + salao name, city
      progressive: 'disclosure', // 3 fields → qualify → 2 more
    },
    metric: 'form_completion_rate',
    target: '+0.5% CVR (net of drop-off)',
  },
} as const;

// ============================================================================
// FEATURE FLAG HELPERS
// ============================================================================

export type ExperimentName = keyof typeof EXPERIMENTS;
export type HeadlineVariant = keyof typeof EXPERIMENTS.HEADLINE.variants;
export type CTAVariant = keyof typeof EXPERIMENTS.CTA.variants;
export type FormVariant = keyof typeof EXPERIMENTS.FORM.variants;

/**
 * Type-safe variant getters
 */
export function getHeadlineVariant(variant: string | boolean): HeadlineVariant {
  if (typeof variant === 'string' && variant in EXPERIMENTS.HEADLINE.variants) {
    return variant as HeadlineVariant;
  }
  return 'control';
}

export function getCTAVariant(variant: string | boolean): CTAVariant {
  if (typeof variant === 'string' && variant in EXPERIMENTS.CTA.variants) {
    return variant as CTAVariant;
  }
  return 'control';
}

export function getFormVariant(variant: string | boolean): FormVariant {
  if (typeof variant === 'string' && variant in EXPERIMENTS.FORM.variants) {
    return variant as FormVariant;
  }
  return 'control';
}

// ============================================================================
// TRACKING HELPERS
// ============================================================================

/**
 * Track experiment exposure
 * Call when variant is rendered to user
 */
export function trackExperimentExposure(
  experimentName: ExperimentName,
  variant: string,
  posthog: any
) {
  posthog.capture('experiment_exposed', {
    experiment: experimentName,
    variant,
    timestamp: Date.now(),
  });
}

/**
 * Track experiment goal conversion
 * Call when target metric is achieved
 */
export function trackExperimentGoal(
  experimentName: ExperimentName,
  variant: string,
  goalName: string,
  posthog: any
) {
  posthog.capture('experiment_goal', {
    experiment: experimentName,
    variant,
    goal: goalName,
    timestamp: Date.now(),
  });
}

// ============================================================================
// WINNER DECLARATION (Manual Process)
// ============================================================================

/**
 * Experiment Results Template
 *
 * After 2 weeks + 80% confidence:
 *
 * HEADLINE EXPERIMENT:
 * - Control: 6.5% CVR (baseline)
 * - Clarity: 7.8% CVR (+1.3%, p=0.02) ✅ WINNER
 * - ROI: 7.2% CVR (+0.7%, p=0.08)
 *
 * ACTION: Set HEADLINE.flag = 'clarity' as default
 *
 * CTA EXPERIMENT:
 * - Control: 3.2% CTR
 * - Urgency: 5.1% CTR (+1.9%, p=0.01) ✅ WINNER
 * - Direct: 4.3% CTR (+1.1%, p=0.04)
 *
 * ACTION: Set CTA.flag = 'urgency' as default
 *
 * FORM EXPERIMENT:
 * - Control (3 fields): 8.2% completion
 * - Standard (5 fields): 6.1% completion (-2.1%)
 * - Progressive: 8.9% completion (+0.7%, p=0.06) ✅ WINNER
 *
 * ACTION: Set FORM.flag = 'progressive' as default
 */

export const EXPERIMENT_WINNERS = {
  // Update after declaring winners
  headline: 'control', // TODO: Update after experiment
  cta: 'control',      // TODO: Update after experiment
  form: 'control',     // TODO: Update after experiment
};
