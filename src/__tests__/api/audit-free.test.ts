/**
 * Free Audit API Tests
 *
 * Comprehensive test suite for /api/audit/free endpoint
 * Tests performance calculation, revenue loss, lead qualification
 */

import { calculateRevenueLoss, classifyLeadUrgency } from '@/lib/audit/revenue-loss-calculator';
import type { WebsiteMetrics, RevenueLossBreakdown } from '@/lib/audit/revenue-loss-calculator';

describe('Revenue Loss Calculator', () => {
  // Test data: typical e-commerce
  const ecommerceMetrics: WebsiteMetrics = {
    monthly_traffic: 500,
    conversion_rate: 2,
    average_ticket: 500,
    lcp_seconds: 3.2,
    fid_ms: 150,
    cls_score: 0.15,
    accessibility_score: 75,
    is_mobile_optimized: true,
  };

  describe('calculateRevenueLoss', () => {
    test('calculates baseline revenue correctly', () => {
      const result = calculateRevenueLoss(ecommerceMetrics);

      // 500 visitors × 2% conversion × R$500 = R$5.000/mês baseline
      expect(result.total_monthly_revenue).toBeCloseTo(5000, 0);
    });

    test('detects LCP performance impact', () => {
      const slowLcp: WebsiteMetrics = {
        ...ecommerceMetrics,
        lcp_seconds: 4.5, // Poor LCP
      };

      const result = calculateRevenueLoss(slowLcp);

      // Poor LCP should show revenue loss
      expect(result.lcp_impact.revenue_loss).toBeGreaterThan(0);
      expect(result.lcp_impact.percentage).toBeGreaterThan(5);
    });

    test('detects CLS layout shift impact', () => {
      const badCls: WebsiteMetrics = {
        ...ecommerceMetrics,
        cls_score: 0.35, // Poor CLS
      };

      const result = calculateRevenueLoss(badCls);

      expect(result.cls_impact.revenue_loss).toBeGreaterThan(0);
      expect(result.cls_impact.percentage).toBeGreaterThan(3);
    });

    test('detects accessibility impact', () => {
      const poorA11y: WebsiteMetrics = {
        ...ecommerceMetrics,
        accessibility_score: 60, // Poor accessibility
      };

      const result = calculateRevenueLoss(poorA11y);

      expect(result.accessibility_impact.revenue_loss).toBeGreaterThan(0);
      expect(result.accessibility_impact.percentage).toBeGreaterThan(5);
    });

    test('detects mobile optimization impact', () => {
      const poorMobile: WebsiteMetrics = {
        ...ecommerceMetrics,
        is_mobile_optimized: false,
      };

      const result = calculateRevenueLoss(poorMobile);

      expect(result.mobile_impact.revenue_loss).toBeGreaterThan(0);
    });

    test('calculates potential revenue gain', () => {
      const result = calculateRevenueLoss(ecommerceMetrics);

      // Should show recoverable revenue (50% of identified loss)
      expect(result.potential_revenue_increase.monthly).toBeGreaterThan(0);
      expect(result.potential_revenue_increase.yearly).toBe(
        result.potential_revenue_increase.monthly * 12
      );
    });

    test('calculates urgency score (0-100)', () => {
      const result = calculateRevenueLoss(ecommerceMetrics);

      expect(result.urgency_score).toBeGreaterThanOrEqual(0);
      expect(result.urgency_score).toBeLessThanOrEqual(100);
    });

    test('handles perfect performance metrics', () => {
      const perfectMetrics: WebsiteMetrics = {
        monthly_traffic: 1000,
        conversion_rate: 5,
        average_ticket: 1000,
        lcp_seconds: 1.5,
        fid_ms: 50,
        cls_score: 0.05,
        accessibility_score: 100,
        is_mobile_optimized: true,
      };

      const result = calculateRevenueLoss(perfectMetrics);

      // Near-perfect metrics should show minimal loss
      expect(result.total_revenue_loss.percentage).toBeLessThan(10);
    });

    test('handles poor performance metrics', () => {
      const poorMetrics: WebsiteMetrics = {
        monthly_traffic: 100,
        conversion_rate: 0.5,
        average_ticket: 100,
        lcp_seconds: 5,
        fid_ms: 300,
        cls_score: 0.5,
        accessibility_score: 40,
        is_mobile_optimized: false,
      };

      const result = calculateRevenueLoss(poorMetrics);

      // Poor metrics should show significant loss
      expect(result.total_revenue_loss.percentage).toBeGreaterThan(20);
      expect(result.potential_revenue_increase.monthly).toBeGreaterThan(0);
    });
  });

  describe('classifyLeadUrgency', () => {
    test('classifies high urgency as HOT', () => {
      expect(classifyLeadUrgency(80)).toBe('hot');
      expect(classifyLeadUrgency(95)).toBe('hot');
      expect(classifyLeadUrgency(100)).toBe('hot');
    });

    test('classifies medium urgency as WARM', () => {
      expect(classifyLeadUrgency(50)).toBe('warm');
      expect(classifyLeadUrgency(65)).toBe('warm');
      expect(classifyLeadUrgency(74)).toBe('warm');
    });

    test('classifies low urgency as COLD', () => {
      expect(classifyLeadUrgency(10)).toBe('cold');
      expect(classifyLeadUrgency(30)).toBe('cold');
      expect(classifyLeadUrgency(49)).toBe('cold');
    });
  });

  describe('Realistic Scenarios', () => {
    test('Scenario 1: E-commerce with slow website', () => {
      const slowEcommerce: WebsiteMetrics = {
        monthly_traffic: 800,
        conversion_rate: 1.5,
        average_ticket: 450,
        lcp_seconds: 4.2,
        fid_ms: 200,
        cls_score: 0.25,
        accessibility_score: 70,
        is_mobile_optimized: false,
      };

      const result = calculateRevenueLoss(slowEcommerce);

      // Should detect significant issues
      expect(result.total_revenue_loss.monthly).toBeGreaterThan(0);
      expect(result.urgency_score).toBeGreaterThan(60);
    });

    test('Scenario 2: SaaS with accessibility issues', () => {
      const saasMetrics: WebsiteMetrics = {
        monthly_traffic: 2000,
        conversion_rate: 3,
        average_ticket: 2000,
        lcp_seconds: 2.0,
        fid_ms: 100,
        cls_score: 0.1,
        accessibility_score: 55, // Poor accessibility
        is_mobile_optimized: true,
      };

      const result = calculateRevenueLoss(saasMetrics);

      // Accessibility should be flagged
      expect(result.accessibility_impact.revenue_loss).toBeGreaterThan(1000);
    });

    test('Scenario 3: Agency with good performance', () => {
      const agencyMetrics: WebsiteMetrics = {
        monthly_traffic: 300,
        conversion_rate: 5,
        average_ticket: 3000,
        lcp_seconds: 1.8,
        fid_ms: 80,
        cls_score: 0.08,
        accessibility_score: 95,
        is_mobile_optimized: true,
      };

      const result = calculateRevenueLoss(agencyMetrics);

      // Good performance = lower loss
      expect(result.total_revenue_loss.percentage).toBeLessThan(15);
      expect(result.urgency_score).toBeLessThan(50);
    });
  });

  describe('Edge Cases', () => {
    test('handles zero traffic', () => {
      const zeroTraffic: WebsiteMetrics = {
        ...ecommerceMetrics,
        monthly_traffic: 0,
      };

      const result = calculateRevenueLoss(zeroTraffic);
      expect(result.total_monthly_revenue).toBe(0);
    });

    test('handles zero conversion rate', () => {
      const zeroConversion: WebsiteMetrics = {
        ...ecommerceMetrics,
        conversion_rate: 0,
      };

      const result = calculateRevenueLoss(zeroConversion);
      expect(result.total_monthly_revenue).toBe(0);
    });

    test('handles very high values', () => {
      const highValues: WebsiteMetrics = {
        monthly_traffic: 100000,
        conversion_rate: 10,
        average_ticket: 10000,
        lcp_seconds: 3.2,
        fid_ms: 150,
        cls_score: 0.15,
        accessibility_score: 75,
        is_mobile_optimized: true,
      };

      const result = calculateRevenueLoss(highValues);

      expect(result.total_monthly_revenue).toBeGreaterThan(0);
      expect(result.total_revenue_loss.monthly).toBeGreaterThan(0);
    });
  });
});
