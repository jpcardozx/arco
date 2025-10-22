/**
 * Revenue Loss Calculator
 *
 * Traduz métricas técnicas em impacto financeiro real
 * Core engine que diferencia ARCO: não fala de "LCP", fala de "$$ perdidos"
 */

export interface WebsiteMetrics {
  monthly_traffic: number;           // Visitantes/mês
  conversion_rate: number;            // % que vira lead/cliente
  average_ticket: number;             // Valor médio por venda
  lcp_seconds: number;               // Largest Contentful Paint
  fid_ms: number;                    // First Input Delay (agora INP)
  cls_score: number;                 // Cumulative Layout Shift
  accessibility_score: number;       // 0-100
  is_mobile_optimized: boolean;      // Mobile UX
}

export interface RevenueLossBreakdown {
  total_monthly_revenue: number;

  // Impactos específicos
  lcp_impact: {
    revenue_loss: number;
    percentage: number;
    visitors_affected: number;
  };

  fid_impact: {
    revenue_loss: number;
    percentage: number;
    visitors_affected: number;
  };

  accessibility_impact: {
    revenue_loss: number;
    percentage: number;
    visitors_affected: number;
  };

  mobile_impact: {
    revenue_loss: number;
    percentage: number;
    visitors_affected: number;
  };

  total_revenue_loss: {
    monthly: number;
    yearly: number;
    percentage: number;
  };

  // Estimativa de ganho se corrigir
  potential_revenue_increase: {
    monthly: number;
    yearly: number;
    roi_months: number;  // Quantos meses até recuperar investimento
  };

  urgency_score: number;  // 1-100: quanto URGENTE é corrigir
}

/**
 * Conversão Core Web Vitals → Impacto de Conversão
 * Baseado em estudos de Google, Cloudflare e SEMrush
 */
export const IMPACT_FACTORS = {
  // LCP (Largest Contentful Paint)
  lcp: {
    optimal: { threshold: 2.5, conversion_retention: 1.0 },
    good: { threshold: 2.5, conversion_retention: 0.97 },        // -3%
    needs_improvement: { threshold: 4.0, conversion_retention: 0.85 }, // -15%
    poor: { threshold: 4.0, conversion_retention: 0.68 },        // -32%
  },

  // INP (Interaction to Next Paint) - substitui FID
  inp: {
    optimal: { threshold: 200, conversion_retention: 1.0 },
    good: { threshold: 200, conversion_retention: 0.98 },        // -2%
    needs_improvement: { threshold: 500, conversion_retention: 0.94 }, // -6%
    poor: { threshold: 500, conversion_retention: 0.85 },        // -15%
  },

  // CLS (Cumulative Layout Shift)
  cls: {
    optimal: { threshold: 0.1, conversion_retention: 1.0 },
    good: { threshold: 0.1, conversion_retention: 0.99 },        // -1%
    needs_improvement: { threshold: 0.25, conversion_retention: 0.93 }, // -7%
    poor: { threshold: 0.25, conversion_retention: 0.70 },       // -30%
  },

  // Accessibility (WCAG 2.1)
  accessibility: {
    excellent: { threshold: 90, visitors_included: 1.0 },        // 100%
    good: { threshold: 80, visitors_included: 0.95 },            // 95%
    fair: { threshold: 70, visitors_included: 0.80 },            // 80%
    poor: { threshold: 70, visitors_included: 0.60 },            // 60%
  },

  // Mobile Optimization
  mobile: {
    optimized: { mobile_conversion_lift: 1.0 },
    partially: { mobile_conversion_lift: 0.75 },                 // -25%
    poor: { mobile_conversion_lift: 0.50 },                      // -50%
  },
};

/**
 * Calcular impacto de cada fator na receita
 */
export function calculateRevenueLoss(
  metrics: WebsiteMetrics
): RevenueLossBreakdown {
  const {
    monthly_traffic,
    conversion_rate,
    average_ticket,
    lcp_seconds,
    fid_ms,
    cls_score,
    accessibility_score,
    is_mobile_optimized,
  } = metrics;

  // Baseline: receita se tudo fosse perfeito
  const baseline_monthly_revenue = monthly_traffic * (conversion_rate / 100) * average_ticket;

  let total_loss = 0;
  let total_visitors_affected = 0;

  // 1. IMPACTO LCP
  const lcp_category = lcp_seconds <= 2.5 ? 'optimal'
    : lcp_seconds <= 4 ? 'needs_improvement'
    : 'poor';
  const lcp_retention = IMPACT_FACTORS.lcp[lcp_category].conversion_retention;
  const lcp_loss_rate = 1 - lcp_retention;
  const lcp_revenue_loss = baseline_monthly_revenue * lcp_loss_rate * 0.35; // 35% do impacto é LCP
  const lcp_visitors_affected = monthly_traffic * lcp_loss_rate;

  total_loss += lcp_revenue_loss;
  total_visitors_affected += lcp_visitors_affected;

  // 2. IMPACTO INP/FID
  const fid_category = fid_ms <= 200 ? 'optimal'
    : fid_ms <= 500 ? 'needs_improvement'
    : 'poor';
  const fid_retention = IMPACT_FACTORS.inp[fid_category].conversion_retention;
  const fid_loss_rate = 1 - fid_retention;
  const fid_revenue_loss = baseline_monthly_revenue * fid_loss_rate * 0.20; // 20% do impacto é INP
  const fid_visitors_affected = monthly_traffic * fid_loss_rate;

  total_loss += fid_revenue_loss;
  total_visitors_affected += fid_visitors_affected;

  // 3. IMPACTO CLS
  const cls_category = cls_score <= 0.1 ? 'optimal'
    : cls_score <= 0.25 ? 'needs_improvement'
    : 'poor';
  const cls_retention = IMPACT_FACTORS.cls[cls_category].conversion_retention;
  const cls_loss_rate = 1 - cls_retention;
  const cls_revenue_loss = baseline_monthly_revenue * cls_loss_rate * 0.15; // 15% do impacto é CLS
  const cls_visitors_affected = monthly_traffic * cls_loss_rate;

  total_loss += cls_revenue_loss;
  total_visitors_affected += cls_visitors_affected;

  // 4. IMPACTO ACCESSIBILITY
  const accessibility_category = accessibility_score >= 90 ? 'excellent'
    : accessibility_score >= 80 ? 'good'
    : accessibility_score >= 70 ? 'fair'
    : 'poor';
  const accessibility_inclusion = IMPACT_FACTORS.accessibility[accessibility_category].visitors_included;
  const accessibility_loss_rate = 1 - accessibility_inclusion;
  const accessibility_revenue_loss = baseline_monthly_revenue * accessibility_loss_rate * 0.20; // 20% do impacto é acessibilidade
  const accessibility_visitors_affected = monthly_traffic * accessibility_loss_rate;

  total_loss += accessibility_revenue_loss;
  total_visitors_affected += accessibility_visitors_affected;

  // 5. IMPACTO MOBILE
  const mobile_lift = is_mobile_optimized ? 1.0 : 0.75;
  const mobile_loss_rate = 1 - mobile_lift;
  // ~50% do tráfego é mobile
  const mobile_revenue_loss = baseline_monthly_revenue * (monthly_traffic * 0.5 / monthly_traffic) * mobile_loss_rate * 0.10;
  const mobile_visitors_affected = monthly_traffic * 0.5 * mobile_loss_rate;

  total_loss += mobile_revenue_loss;
  total_visitors_affected += mobile_visitors_affected;

  // Deduplicar (evitar contar visitantes 2x)
  const unique_visitors_affected = Math.min(total_visitors_affected, monthly_traffic * 0.60); // máx 60% afetados
  const adjusted_total_loss = (unique_visitors_affected / monthly_traffic) * baseline_monthly_revenue;

  // Potencial de ganho se corrigir (50% dos problemas)
  const fixable_loss = adjusted_total_loss * 0.50;
  const implementation_cost = 2000; // Custo típico de otimização

  return {
    total_monthly_revenue: baseline_monthly_revenue,

    lcp_impact: {
      revenue_loss: lcp_revenue_loss,
      percentage: (lcp_revenue_loss / baseline_monthly_revenue) * 100,
      visitors_affected: Math.round(lcp_visitors_affected),
    },

    fid_impact: {
      revenue_loss: fid_revenue_loss,
      percentage: (fid_revenue_loss / baseline_monthly_revenue) * 100,
      visitors_affected: Math.round(fid_visitors_affected),
    },

    accessibility_impact: {
      revenue_loss: accessibility_revenue_loss,
      percentage: (accessibility_revenue_loss / baseline_monthly_revenue) * 100,
      visitors_affected: Math.round(accessibility_visitors_affected),
    },

    mobile_impact: {
      revenue_loss: mobile_revenue_loss,
      percentage: (mobile_revenue_loss / baseline_monthly_revenue) * 100,
      visitors_affected: Math.round(mobile_visitors_affected),
    },

    total_revenue_loss: {
      monthly: Math.round(adjusted_total_loss),
      yearly: Math.round(adjusted_total_loss * 12),
      percentage: (adjusted_total_loss / baseline_monthly_revenue) * 100,
    },

    potential_revenue_increase: {
      monthly: Math.round(fixable_loss),
      yearly: Math.round(fixable_loss * 12),
      roi_months: implementation_cost > 0 ? Math.ceil(implementation_cost / fixable_loss) : 0,
    },

    urgency_score: calculateUrgencyScore({
      monthly_loss: adjusted_total_loss,
      total_revenue: baseline_monthly_revenue,
      roi_months: implementation_cost > 0 ? Math.ceil(implementation_cost / fixable_loss) : 0,
    }),
  };
}

/**
 * Urgency Score: 1-100
 * Quanto urgente é corrigir isso?
 * (Usado para lead qualification)
 */
function calculateUrgencyScore(data: {
  monthly_loss: number;
  total_revenue: number;
  roi_months: number;
}): number {
  const { monthly_loss, total_revenue, roi_months } = data;

  const loss_percentage = (monthly_loss / total_revenue) * 100;
  const roi_score = Math.max(0, 100 - roi_months * 10); // Se paga em 1 mês = 90, em 2 = 80
  const loss_score = Math.min(100, loss_percentage * 2); // Cada 1% de loss = 2 pontos

  return Math.round((loss_score * 0.6 + roi_score * 0.4));
}

/**
 * Gerar mensagem human-readable sobre impacto
 */
export function generateImpactMessage(breakdown: RevenueLossBreakdown): string {
  const { total_monthly_revenue, total_revenue_loss, potential_revenue_increase } = breakdown;

  const loss_pct = total_revenue_loss.percentage.toFixed(1);
  const monthly_loss = total_revenue_loss.monthly.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const yearly_loss = total_revenue_loss.yearly.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const potential = potential_revenue_increase.monthly.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return `Sua análise mostrou que você está **perdendo ${monthly_loss}/mês (${loss_pct}% da receita)** devido a problemas técnicos no seu site.

Isso significa **${yearly_loss}/ano** deixados na mesa.

**Mas tem solução:** Corrigindo os principais problemas, você pode recuperar **${potential}/mês**, com retorno do investimento em menos de 30 dias.

Quer uma análise técnica completa (sem custo)?`;
}

/**
 * Classificar lead pela urgência
 */
export function classifyLeadUrgency(urgency_score: number): 'hot' | 'warm' | 'cold' {
  if (urgency_score >= 75) return 'hot';
  if (urgency_score >= 50) return 'warm';
  return 'cold';
}
