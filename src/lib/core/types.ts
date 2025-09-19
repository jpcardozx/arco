export interface BusinessLogic {
  industryData: IndustryBenchmark[];
  calculator: PerformanceCalculations;
  copyStrategy: ContentStrategy;
}

export interface IndustryBenchmark {
  sector: string;
  averageLCP: number;
  conversionImpact: number;
  mobileTraffic: number;
  revenueCorrelation: number;
  source: 'Chrome UX Report' | 'Internal A/B Testing' | 'Industry Research';
  sampleSize: number;
}

export interface PerformanceCalculations {
  calculateRevenueImpact: (currentLCP: number, targetLCP: number, monthlyRevenue: number) => number;
  getOptimizationPriority: (metrics: CoreWebVitals) => string[];
  estimateProjectROI: (investment: number, expectedGains: number) => number;
}

export interface ContentStrategy {
  positioning: 'technical-authority' | 'business-executive' | 'hybrid';
  targetAudience: 'cto' | 'ceo' | 'marketing-director' | 'technical-lead';
  urgencyLevel: 'immediate' | 'quarterly' | 'strategic';
  valueProposition: string[];
  competitiveDifferentiators: string[];
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}
