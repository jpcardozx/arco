'use client';

/**
 * Landing Page Conversion Rate (CVR) Tracking & Benchmarking
 *
 * Extra.12: Track LP performance and compare against industry benchmarks
 *
 * Benchmarks (B2B Services):
 * - Bottom 25%: < 4.0%
 * - Median: 6.6%
 * - Top 25%: > 9.0%
 * - Top 10%: > 12.0%
 *
 * Target: 8-10% (above median, below top 10%)
 */

import posthog from 'posthog-js';

// ============================================================================
// TYPES
// ============================================================================

export interface LandingPageSession {
  page_url: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  started_at: number;
  ended_at?: number;
  converted: boolean;
  conversion_time?: number; // Time to convert (ms)
  engagement_score: number; // 0-100
}

export interface LandingPageMetrics {
  page_url: string;
  period: '24h' | '7d' | '30d';
  visitors: number;
  conversions: number;
  cvr: number; // Conversion rate (0-1)
  avg_time_to_convert: number; // seconds
  avg_engagement_score: number;
  bounce_rate: number; // 0-1
  sources: Array<{
    source: string;
    visitors: number;
    conversions: number;
    cvr: number;
  }>;
}

export interface CVRBenchmark {
  industry: string;
  percentile_10: number;
  percentile_25: number;
  median: number;
  percentile_75: number;
  percentile_90: number;
}

export interface CVRComparison {
  your_cvr: number;
  benchmark_cvr: number;
  performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  percentile: number; // Where you rank (0-100)
  gap_to_top_25: number; // Percentage points to reach top 25%
  gap_to_median: number; // Percentage points to reach median
  recommendation: string;
}

// ============================================================================
// BENCHMARKS
// ============================================================================

/**
 * Industry benchmarks for landing page CVR
 * Source: Unbounce, WordStream, HubSpot industry reports
 */
export const CVR_BENCHMARKS: Record<string, CVRBenchmark> = {
  'b2b_services': {
    industry: 'B2B Services',
    percentile_10: 2.5,
    percentile_25: 4.0,
    median: 6.6,
    percentile_75: 9.0,
    percentile_90: 12.0,
  },
  'saas': {
    industry: 'SaaS',
    percentile_10: 3.0,
    percentile_25: 5.0,
    median: 7.5,
    percentile_75: 10.5,
    percentile_90: 14.0,
  },
  'consulting': {
    industry: 'Consulting',
    percentile_10: 3.5,
    percentile_25: 5.5,
    median: 8.0,
    percentile_75: 11.0,
    percentile_90: 15.0,
  },
  'ecommerce': {
    industry: 'E-commerce',
    percentile_10: 1.0,
    percentile_25: 1.8,
    median: 2.9,
    percentile_75: 4.5,
    percentile_90: 6.5,
  },
};

// ============================================================================
// SESSION TRACKING
// ============================================================================

let currentSession: LandingPageSession | null = null;
let sessionHistory: LandingPageSession[] = [];
const MAX_HISTORY = 500;

/**
 * Start tracking landing page session
 */
export function startLandingPageSession(options?: {
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}): void {
  if (typeof window === 'undefined') return;

  currentSession = {
    page_url: window.location.href,
    source: options?.source || document.referrer || 'direct',
    utm_source: options?.utm_source,
    utm_medium: options?.utm_medium,
    utm_campaign: options?.utm_campaign,
    started_at: Date.now(),
    converted: false,
    engagement_score: 0,
  };

  console.log('📊 [LP CVR] Session started', {
    url: currentSession.page_url,
    source: currentSession.source,
  });
}

/**
 * Track landing page conversion
 */
export function trackLandingPageConversion(): void {
  if (!currentSession) {
    console.warn('⚠️ [LP CVR] No active session to convert');
    return;
  }

  currentSession.converted = true;
  currentSession.ended_at = Date.now();
  currentSession.conversion_time = currentSession.ended_at - currentSession.started_at;

  console.log('✅ [LP CVR] Conversion tracked', {
    url: currentSession.page_url,
    conversion_time_ms: currentSession.conversion_time,
    conversion_time_s: Math.round(currentSession.conversion_time / 1000),
  });

  // PostHog
  if (posthog.__loaded) {
    posthog.capture('landing_page_conversion', {
      page_url: currentSession.page_url,
      source: currentSession.source,
      utm_source: currentSession.utm_source,
      utm_medium: currentSession.utm_medium,
      utm_campaign: currentSession.utm_campaign,
      conversion_time_ms: currentSession.conversion_time,
      conversion_time_s: Math.round(currentSession.conversion_time / 1000),
      engagement_score: currentSession.engagement_score,
    });
  }

  // Save to history
  saveSessionToHistory();
}

/**
 * Track landing page bounce (left without converting)
 */
export function trackLandingPageBounce(): void {
  if (!currentSession || currentSession.converted) return;

  currentSession.ended_at = Date.now();

  console.log('📉 [LP CVR] Bounce tracked', {
    url: currentSession.page_url,
    time_on_page_s: Math.round((currentSession.ended_at - currentSession.started_at) / 1000),
  });

  // PostHog
  if (posthog.__loaded) {
    posthog.capture('landing_page_bounce', {
      page_url: currentSession.page_url,
      source: currentSession.source,
      utm_source: currentSession.utm_source,
      utm_medium: currentSession.utm_medium,
      utm_campaign: currentSession.utm_campaign,
      time_on_page_ms: currentSession.ended_at - currentSession.started_at,
      time_on_page_s: Math.round((currentSession.ended_at - currentSession.started_at) / 1000),
      engagement_score: currentSession.engagement_score,
    });
  }

  // Save to history
  saveSessionToHistory();
}

/**
 * Update engagement score for current session
 */
export function updateEngagementScore(score: number): void {
  if (currentSession) {
    currentSession.engagement_score = Math.max(currentSession.engagement_score, score);
  }
}

/**
 * Save session to history
 */
function saveSessionToHistory(): void {
  if (!currentSession) return;

  sessionHistory.push({ ...currentSession });

  // Trim if too large
  if (sessionHistory.length > MAX_HISTORY) {
    sessionHistory = sessionHistory.slice(-MAX_HISTORY);
  }

  // Save to localStorage for persistence
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('lp_cvr_history', JSON.stringify(sessionHistory.slice(-100))); // Save last 100
    } catch (e) {
      // Ignore quota errors
    }
  }

  currentSession = null;
}

// ============================================================================
// METRICS CALCULATION
// ============================================================================

/**
 * Calculate landing page metrics for a period
 */
export function calculateLPMetrics(period: '24h' | '7d' | '30d' = '7d'): LandingPageMetrics[] {
  const now = Date.now();
  const periodMs = {
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
  }[period];

  // Filter sessions by period
  const recentSessions = sessionHistory.filter((session) => {
    return now - session.started_at < periodMs;
  });

  // Group by page URL
  const byPage = recentSessions.reduce((acc, session) => {
    const url = new URL(session.page_url).pathname; // Strip query params
    if (!acc[url]) {
      acc[url] = [];
    }
    acc[url].push(session);
    return acc;
  }, {} as Record<string, LandingPageSession[]>);

  // Calculate metrics for each page
  return Object.entries(byPage).map(([url, sessions]) => {
    const conversions = sessions.filter((s) => s.converted).length;
    const bounces = sessions.filter((s) => !s.converted && s.ended_at).length;
    const cvr = conversions / sessions.length;
    const bounce_rate = bounces / sessions.length;

    const convertedSessions = sessions.filter((s) => s.converted && s.conversion_time);
    const avg_time_to_convert =
      convertedSessions.length > 0
        ? convertedSessions.reduce((sum, s) => sum + (s.conversion_time || 0), 0) / convertedSessions.length / 1000
        : 0;

    const avg_engagement_score =
      sessions.reduce((sum, s) => sum + s.engagement_score, 0) / sessions.length;

    // Group by source
    const sourceMap = sessions.reduce((acc, session) => {
      const source = session.source;
      if (!acc[source]) {
        acc[source] = { visitors: 0, conversions: 0 };
      }
      acc[source].visitors++;
      if (session.converted) acc[source].conversions++;
      return acc;
    }, {} as Record<string, { visitors: number; conversions: number }>);

    const sources = Object.entries(sourceMap)
      .map(([source, data]) => ({
        source,
        visitors: data.visitors,
        conversions: data.conversions,
        cvr: data.conversions / data.visitors,
      }))
      .sort((a, b) => b.visitors - a.visitors);

    return {
      page_url: url,
      period,
      visitors: sessions.length,
      conversions,
      cvr,
      avg_time_to_convert,
      avg_engagement_score,
      bounce_rate,
      sources,
    };
  });
}

// ============================================================================
// BENCHMARKING
// ============================================================================

/**
 * Compare your CVR against industry benchmark
 */
export function compareToBenchmark(
  your_cvr: number,
  industry: keyof typeof CVR_BENCHMARKS = 'b2b_services'
): CVRComparison {
  const benchmark = CVR_BENCHMARKS[industry];
  const your_cvr_pct = your_cvr * 100;
  const benchmark_cvr_pct = benchmark.median;

  // Determine performance level
  let performance: CVRComparison['performance'];
  let percentile: number;

  if (your_cvr_pct >= benchmark.percentile_90) {
    performance = 'excellent';
    percentile = 90;
  } else if (your_cvr_pct >= benchmark.percentile_75) {
    performance = 'good';
    percentile = 75;
  } else if (your_cvr_pct >= benchmark.median) {
    performance = 'average';
    percentile = 50;
  } else if (your_cvr_pct >= benchmark.percentile_25) {
    performance = 'below_average';
    percentile = 25;
  } else {
    performance = 'poor';
    percentile = 10;
  }

  // Calculate gaps
  const gap_to_top_25 = Math.max(0, benchmark.percentile_75 - your_cvr_pct);
  const gap_to_median = benchmark.median - your_cvr_pct;

  // Generate recommendation
  let recommendation: string;

  if (performance === 'excellent') {
    recommendation = `Excelente! Seu CVR está no top 10%. Foque em escalar volume mantendo qualidade.`;
  } else if (performance === 'good') {
    recommendation = `Bom desempenho! +${gap_to_top_25.toFixed(1)}pp para alcançar top 25%. Teste CTAs e headlines.`;
  } else if (performance === 'average') {
    recommendation = `Performance mediana. +${gap_to_top_25.toFixed(1)}pp para top 25%. Priorize A/B testing de hero section.`;
  } else if (performance === 'below_average') {
    recommendation = `Abaixo da média. +${Math.abs(gap_to_median).toFixed(1)}pp para mediana. Revise proposta de valor e social proof.`;
  } else {
    recommendation = `CVR baixo. +${Math.abs(gap_to_median).toFixed(1)}pp para mediana. Auditoria completa: messaging, design, form length.`;
  }

  return {
    your_cvr: your_cvr_pct,
    benchmark_cvr: benchmark_cvr_pct,
    performance,
    percentile,
    gap_to_top_25,
    gap_to_median,
    recommendation,
  };
}

/**
 * Get CVR improvement recommendations
 */
export function getCVRRecommendations(metrics: LandingPageMetrics): string[] {
  const recommendations: string[] = [];

  const cvrPct = metrics.cvr * 100;

  // Low CVR
  if (cvrPct < 5.0) {
    recommendations.push('🚨 CVR < 5%: Problema crítico. Audite value proposition, headlines, e CTA placement.');
  }

  // High bounce rate
  if (metrics.bounce_rate > 0.7) {
    recommendations.push(`📉 Bounce rate alto (${(metrics.bounce_rate * 100).toFixed(0)}%): Teste headlines mais claras e social proof mais forte.`);
  }

  // Low engagement
  if (metrics.avg_engagement_score < 30) {
    recommendations.push(`👀 Engajamento baixo (${metrics.avg_engagement_score.toFixed(0)}): Content não está ressoando. Teste diferentes ângulos de messaging.`);
  }

  // Slow time to convert
  if (metrics.avg_time_to_convert > 180) {
    recommendations.push(`⏱️ Time to convert longo (${Math.round(metrics.avg_time_to_convert)}s): Simplifique formulário ou adicione trust signals.`);
  }

  // Source analysis
  const bestSource = metrics.sources[0];
  const worstSource = metrics.sources[metrics.sources.length - 1];

  if (bestSource && worstSource && bestSource.cvr / worstSource.cvr > 3) {
    recommendations.push(`🎯 ${bestSource.source} converte ${(bestSource.cvr / worstSource.cvr).toFixed(1)}x melhor que ${worstSource.source}. Considere pausar ${worstSource.source}.`);
  }

  // Good performance
  if (cvrPct >= 8.0 && metrics.bounce_rate < 0.5) {
    recommendations.push('✅ Performance sólida! Foque em aumentar volume (mais ad spend ou canais).');
  }

  return recommendations;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize LP CVR tracking
 */
export function initLPCVRTracking(): void {
  if (typeof window === 'undefined') return;

  // Load history from localStorage
  try {
    const saved = localStorage.getItem('lp_cvr_history');
    if (saved) {
      sessionHistory = JSON.parse(saved);
    }
  } catch (e) {
    // Ignore errors
  }

  // Auto-start session on landing pages
  if (window.location.pathname === '/' || window.location.pathname.startsWith('/landing')) {
    const params = new URLSearchParams(window.location.search);
    startLandingPageSession({
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
    });
  }

  // Track bounce on unload
  window.addEventListener('beforeunload', () => {
    trackLandingPageBounce();
  });

  console.log('✅ [LP CVR] Tracking initialized');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  startLandingPageSession,
  trackLandingPageConversion,
  trackLandingPageBounce,
  updateEngagementScore,
  calculateLPMetrics,
  compareToBenchmark,
  getCVRRecommendations,
  initLPCVRTracking,
  CVR_BENCHMARKS,
};
