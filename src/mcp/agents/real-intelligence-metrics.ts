/**
 * Real Intelligence Metrics Calculator
 * 
 * Substitui Math.random() por análise baseada em dados reais
 * com fallbacks inteligentes para robustez de produção
 */

import { realDataCollector } from '../integrators/real-data-collector.js';
import type { PlatformChange } from '../types/strategic-intelligence.js';

export class RealIntelligenceMetrics {
  
  /**
   * Calcula métricas baseadas em dados reais
   * @param metricType - Tipo de métrica a ser calculada
   * @param change - Mudança da plataforma sendo analisada
   * @param context - Contexto adicional para cálculo
   * @returns Promise<number> - Valor da métrica calculada
   */
  async calculateMetric(
    metricType: 'impact' | 'time' | 'risk' | 'value' | 'confidence' | 'roi',
    change: PlatformChange,
    context?: any
  ): Promise<number> {
    try {
      // Coleta dados reais
      const performanceData = await realDataCollector.getRealPerformanceData();
      const historicalData = realDataCollector.getHistoricalData();
      const conversionData = realDataCollector.getConversionEvents();
      
      // Calcula scores base derivados de dados reais
      const scores = {
        performance: this.calculatePerformanceScore(performanceData),
        historical: this.calculateHistoricalScore(historicalData),
        conversion: this.calculateConversionScore(conversionData),
        complexity: this.calculateComplexityScore(change)
      };
      
      // Calcula métrica específica
      return this.computeMetricValue(metricType, change, scores, context);
      
    } catch (error) {
      console.warn(`[ARCO MCP] Real metric calculation failed for ${metricType}, using intelligent baseline:`, error);
      return this.getIntelligentBaseline(metricType, change);
    }
  }

  /**
   * Calcula score de performance baseado em dados reais
   */
  private calculatePerformanceScore(data: any): number {
    if (!data?.coreWebVitals) return 5.0;
    
    // Análise de Core Web Vitals reais
    const lcp = data.coreWebVitals.lcp || 3000;
    const cls = data.coreWebVitals.cls || 0.1;
    const fid = data.coreWebVitals.fid || 100;
    
    // Score baseado em benchmarks reais
    let score = 10;
    score -= Math.max(0, (lcp - 2500) / 500); // LCP penalty
    score -= Math.max(0, (cls - 0.1) * 20);   // CLS penalty  
    score -= Math.max(0, (fid - 100) / 50);   // FID penalty
    
    return Math.max(1, Math.min(10, score));
  }

  /**
   * Calcula score histórico baseado em trends reais
   */
  private calculateHistoricalScore(data: any[]): number {
    if (!data || data.length < 3) return 5.0;
    
    // Análise de trend dos últimos dados
    const recent = data.slice(-5);
    let improvements = 0;
    
    for (let i = 1; i < recent.length; i++) {
      const current = recent[i];
      const previous = recent[i-1];
      
      if (current.coreWebVitals?.lcp < previous.coreWebVitals?.lcp) improvements++;
      if (current.analyticsData?.conversionEvents > previous.analyticsData?.conversionEvents) improvements++;
    }
    
    return Math.max(1, Math.min(10, 3 + (improvements * 1.2)));
  }

  /**
   * Calcula score de conversão baseado em dados reais
   */
  private calculateConversionScore(conversionData: any[]): number {
    if (!conversionData || conversionData.length === 0) return 5.0;
    
    const avgQuality = conversionData.reduce((sum, conv) => sum + (conv.quality || 5), 0) / conversionData.length;
    const recentConversions = conversionData.filter(conv => 
      Date.now() - new Date(conv.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000
    ).length;
    
    return Math.max(1, Math.min(10, (avgQuality + Math.min(recentConversions, 5)) / 1.5));
  }

  /**
   * Calcula complexidade baseada em type e scope
   */
  private calculateComplexityScore(change: PlatformChange): number {
    const typeComplexity = { 
      feature: 6, 
      optimization: 4, 
      architecture: 9, 
      design: 5, 
      content: 3 
    };
    
    const scopeComplexity = { 
      component: 3, 
      page: 5, 
      system: 8, 
      platform: 10 
    };
    
    return (typeComplexity[change.type] + scopeComplexity[change.scope]) / 2;
  }

  /**
   * Computa valor específico da métrica
   */
  private computeMetricValue(
    metricType: string, 
    change: PlatformChange, 
    scores: any, 
    context?: any
  ): number {
    switch (metricType) {
      case 'impact':
        return this.calculateImpactMetric(change, scores);
      case 'time':
        return this.calculateTimeMetric(change, scores);
      case 'risk':
        return this.calculateRiskMetric(change, scores);
      case 'value':
        return this.calculateValueMetric(change, scores);
      case 'confidence':
        return this.calculateConfidenceMetric(change, scores);
      case 'roi':
        return this.calculateROIMetric(change, scores);
      default:
        return this.getIntelligentBaseline(metricType, change);
    }
  }

  private calculateImpactMetric(change: PlatformChange, scores: any): number {
    const baseImpact = (scores.performance + scores.historical) / 2;
    const typeMultiplier = { feature: 1.1, optimization: 1.3, architecture: 0.9, design: 1.2, content: 1.0 };
    const opportunityFactor = (10 - scores.performance) / 10; // More room for improvement = higher impact
    
    return Math.round(Math.max(3, Math.min(10, baseImpact * typeMultiplier[change.type] * (1 + opportunityFactor))));
  }

  private calculateTimeMetric(change: PlatformChange, scores: any): number {
    const baseTimes = { component: 4, page: 12, system: 32, platform: 80 };
    const complexityFactor = scores.complexity / 5; // 0.6 to 2.0
    const efficiencyFactor = scores.historical / 10; // 0.3 to 1.0
    
    return Math.round(baseTimes[change.scope] * complexityFactor / Math.max(efficiencyFactor, 0.3));
  }

  private calculateRiskMetric(change: PlatformChange, scores: any): number {
    const baseRisk = scores.complexity / 2; // 1.5 to 5
    const stabilityFactor = (10 - scores.performance) / 10; // Higher performance = lower risk
    const historyFactor = (10 - scores.historical) / 20; // Better track record = lower risk
    
    return Math.round(Math.max(1, Math.min(8, baseRisk * (1 + stabilityFactor + historyFactor))));
  }

  private calculateValueMetric(change: PlatformChange, scores: any): number {
    const opportunityScore = (10 - scores.performance) * 0.8; // More improvement potential = higher value
    const conversionScore = scores.conversion * 0.6;
    const typeValue = { feature: 8, optimization: 9, architecture: 7, design: 8, content: 6 };
    
    return Math.round(Math.max(4, Math.min(10, opportunityScore + conversionScore + typeValue[change.type] * 0.3)));
  }

  private calculateConfidenceMetric(change: PlatformChange, scores: any): number {
    const dataQuality = (scores.performance + scores.historical + scores.conversion) / 3;
    const baseConfidence = 60 + (dataQuality * 3); // 60-90% range
    const complexityPenalty = scores.complexity * -0.5;
    
    return Math.round(Math.max(55, Math.min(95, baseConfidence + complexityPenalty)));
  }

  private calculateROIMetric(change: PlatformChange, scores: any): number {
    const valueScore = this.calculateValueMetric(change, scores);
    const riskScore = this.calculateRiskMetric(change, scores);
    const timeScore = this.calculateTimeMetric(change, scores);
    
    // ROI = (Value / Time) * (1 - Risk/10) * 100
    const roi = (valueScore / Math.max(timeScore, 1)) * (1 - riskScore/10) * 100;
    return Math.round(Math.max(50, Math.min(500, roi)));
  }

  /**
   * Baseline inteligente quando dados reais não disponíveis
   */
  private getIntelligentBaseline(metricType: string, change: PlatformChange): number {
    const baselines: Record<string, any> = {
      impact: { feature: 7, optimization: 8, architecture: 6, design: 7, content: 6 },
      time: { component: 6, page: 16, system: 40, platform: 100 },
      risk: { component: 2, page: 3, system: 5, platform: 7 },
      value: { feature: 8, optimization: 9, architecture: 7, design: 8, content: 6 },
      confidence: 75,
      roi: 180
    };
    
    if (metricType === 'confidence' || metricType === 'roi') {
      return baselines[metricType];
    }
    return (baselines[metricType]?.[change.type] ?? baselines[metricType]?.[change.scope] ?? 7);
  }
}

// Export singleton instance
export const realIntelligenceMetrics = new RealIntelligenceMetrics();
export default RealIntelligenceMetrics;
