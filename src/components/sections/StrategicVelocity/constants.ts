/**
 * STRATEGIC VELOCITY - CONSTANTS
 * Valores mágicos centralizados para manutenção facilitada
 */

// ============================================================================
// ANIMATION TIMINGS
// ============================================================================

export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 0.8,
  BACKGROUND_TEAL: 18,
  BACKGROUND_ORANGE: 22,
} as const;

export const ANIMATION_DELAY = {
  STAGGER: 0.1,
  BACKGROUND_OFFSET: 2,
} as const;

// ============================================================================
// CONVERSION METRICS (para A/B testing)
// ============================================================================

export const CONVERSION_BENCHMARKS = {
  TRADITIONAL_METHOD: {
    min: 2,
    max: 5,
    label: '2-5%',
  },
  PROGRESSIVE_METHOD: {
    target: 40,
    label: '40%+',
  },
  IMPROVEMENT_FACTOR: 8,
} as const;

// ============================================================================
// PRICING
// ============================================================================

export const PRICING = {
  DIAGNOSTIC: 497,
  PACKAGE_MIN: 8900,
  PACKAGE_MAX: 15000,
  MONTHLY_RETAINER: 2500,
  MIN_AD_BUDGET: 2000,
} as const;

// ============================================================================
// LEAD QUALIFICATION THRESHOLDS
// ============================================================================

export const LEAD_THRESHOLDS = {
  MIN_LEADS_PER_MONTH: 10,
  MIN_AD_BUDGET_MONTHLY: 2000,
  CAPACITY_INCREASE_PERCENTAGE: 50,
} as const;

// ============================================================================
// GA4 EVENT NAMES
// ============================================================================

export const GA4_EVENTS = {
  CTA_CLICK: 'strategic_velocity_cta',
  STEP_EXPANDED: 'step_expanded',
  SCENARIO_SELECTED: 'progression_scenario_selected',
  SCROLL_DEPTH: 'strategic_velocity_scroll',
} as const;

// ============================================================================
// BREAKPOINT HELPERS (matching Tailwind)
// ============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  RECOMMENDED_BADGE: 20,
  MODAL: 100,
} as const;
