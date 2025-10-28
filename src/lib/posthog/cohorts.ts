/**
 * PostHog Cohorts Configuration
 *
 * Cohorts for remarketing and funnel optimization:
 * 1. high_intent - Engaged but didn't convert
 * 2. no_show - Scheduled but didn't attend
 *
 * Integration: Export to Meta Custom Audiences for cheaper remarketing
 */

// ============================================================================
// COHORT DEFINITIONS
// ============================================================================

export const COHORTS = {
  /**
   * High Intent Cohort
   * Users who showed strong buying signals but didn't complete conversion
   *
   * Criteria:
   * - Viewed pricing section
   * - Opened schedule selector
   * - Did NOT complete lead form
   * - Within last 7 days
   *
   * Use Case: Remarketing with urgency message
   * Expected CPA: 40-50% of cold traffic (warm audience)
   */
  HIGH_INTENT: {
    name: 'high_intent',
    description: 'Engaged users who didn\'t convert',
    definition: {
      events: [
        { name: 'pricing_section_viewed', operator: 'exists' },
        { name: 'schedule_intent_opened', operator: 'exists' },
      ],
      negativeEvents: [
        { name: 'lead_magnet_submitted', operator: 'not_exists' },
        { name: 'schedule_confirmed', operator: 'not_exists' },
      ],
      timeWindow: 7, // days
    },
    adCopy: {
      headline: 'Ainda pensando? Última vaga disponível esta semana',
      cta: 'Garantir Minha Vaga',
      offer: '15% desconto se agendar hoje',
    },
    estimatedSize: '5-10% of LP traffic',
    expectedCPA: 'R$ 90-110 (vs R$ 180 cold)',
  },

  /**
   * No-Show Cohort
   * Users who scheduled but didn't attend meeting
   *
   * Criteria:
   * - Completed schedule_confirmed
   * - Did NOT trigger first_visit_completed
   * - Meeting date has passed (> 24h ago)
   *
   * Use Case: Re-engagement campaign, different offer
   * Expected Recovery: 20-30% rebook rate
   */
  NO_SHOW: {
    name: 'no_show',
    description: 'Scheduled but didn\'t attend',
    definition: {
      events: [
        { name: 'schedule_confirmed', operator: 'exists' },
      ],
      negativeEvents: [
        { name: 'first_visit_completed', operator: 'not_exists' },
      ],
      timeWindow: 30, // days (recent no-shows)
      customCondition: 'meeting_date < now() - 24h',
    },
    adCopy: {
      headline: 'Sentimos sua falta! Nova oportunidade disponível',
      cta: 'Reagendar Consulta',
      offer: 'Diagnóstico + Plano de Ação Gratuito',
    },
    estimatedSize: '30% of schedules (67% show = 33% no-show)',
    expectedRecovery: '20-30% rebook at R$ 50-70 CPA',
  },
} as const;

// ============================================================================
// COHORT TRACKING EVENTS
// ============================================================================

/**
 * Events required for cohort definition
 * Ensure these are tracked in the application
 */
export const REQUIRED_EVENTS = [
  'pricing_section_viewed',      // Already tracked ✅
  'schedule_intent_opened',      // TODO: Add to scheduler component
  'schedule_intent_selected',    // TODO: Add when slot picked
  'lead_magnet_submitted',       // TODO: Add to form submission
  'schedule_confirmed',          // TODO: Add to booking confirmation
  'first_visit_completed',       // TODO: Add to CRM webhook
  'whatsapp_click',              // TODO: Add to WhatsApp button
  'tripwire_checkout_started',   // TODO: Add to checkout flow
] as const;

// ============================================================================
// META CUSTOM AUDIENCE SYNC
// ============================================================================

/**
 * PostHog → Meta Custom Audience Integration
 *
 * Setup Steps:
 * 1. Create cohorts in PostHog dashboard
 * 2. Export cohort as CSV (email/phone lists)
 * 3. Upload to Meta as Custom Audience
 * 4. Create campaign with lower bids (warm traffic)
 *
 * Alternative (Advanced):
 * - Use PostHog Zapier integration
 * - Trigger on cohort membership
 * - Send to Meta CAPI with custom_audience param
 *
 * Frequency: Weekly refresh (automate via cron)
 */

export interface CohortExportConfig {
  cohortName: string;
  exportFields: string[];
  hashFields: boolean;
  schedule: string;
}

export const COHORT_EXPORT_CONFIGS: CohortExportConfig[] = [
  {
    cohortName: 'high_intent',
    exportFields: ['email', 'phone', 'fbp'],
    hashFields: true, // SHA-256 for Meta upload
    schedule: 'weekly', // Sunday 2am
  },
  {
    cohortName: 'no_show',
    exportFields: ['email', 'phone', 'fbp', 'last_meeting_date'],
    hashFields: true,
    schedule: 'weekly',
  },
];

// ============================================================================
// COHORT-BASED CAMPAIGN STRATEGY
// ============================================================================

export const COHORT_CAMPAIGN_STRATEGY = {
  high_intent: {
    budget: 'R$ 30/day (20% of cold traffic budget)',
    bidStrategy: 'Cost Cap @ R$ 100 CPA',
    placements: 'Feed + Stories (high attention)',
    creative: 'Urgency + social proof',
    expectedROI: '2-3x better than cold (50% CPA reduction)',
  },
  no_show: {
    budget: 'R$ 20/day (recovery campaign)',
    bidStrategy: 'Lowest Cost (small audience)',
    placements: 'Feed only (clarity)',
    creative: 'Empathy + new offer',
    expectedROI: '20-30% recovery = R$ 50-70 CPA',
  },
} as const;

// ============================================================================
// MEASUREMENT & OPTIMIZATION
// ============================================================================

/**
 * Cohort Performance Metrics
 * Track weekly to validate strategy
 */
export interface CohortMetrics {
  cohortName: string;
  size: number;
  reach: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cvr: number;
  cpa: number;
  roas: number;
}

/**
 * Success Criteria
 *
 * HIGH_INTENT:
 * - CTR > 4% (vs 2-3% cold)
 * - CVR > 12% (vs 8-10% cold)
 * - CPA < R$ 120 (vs R$ 180 cold)
 *
 * NO_SHOW:
 * - Recovery rate > 20%
 * - CPA < R$ 80
 * - ROAS > 3x (if tripwire offered)
 */

export const COHORT_SUCCESS_CRITERIA = {
  high_intent: {
    min_ctr: 0.04,
    min_cvr: 0.12,
    max_cpa: 120,
  },
  no_show: {
    min_recovery_rate: 0.20,
    max_cpa: 80,
    min_roas: 3.0,
  },
} as const;
