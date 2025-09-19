/**
 * ARCO Business Logic - Content Strategy
 * 
 * Psychology-driven content framework for executive decision makers
 * Data-driven copy optimization based on conversion analysis
 */

import { ContentStrategy } from './types';

// Executive decision maker profiles with specific pain points
export const DECISION_MAKER_PROFILES = {
  'financial-executive': {
    painPoints: [
      'Unexpected budget overruns from technical debt',
      'Inability to quantify technology ROI',
      'Revenue loss from poor website performance',
      'Compliance and risk management costs'
    ],
    motivators: [
      'Measurable cost reduction',
      'Clear ROI projections', 
      'Risk mitigation',
      'Operational efficiency gains'
    ],
    language: 'financial-technical',
    urgencyTriggers: ['revenue impact', 'competitive disadvantage', 'compliance risk']
  },
  
  'technical-executive': {
    painPoints: [
      'Technical debt limiting scalability',
      'Performance issues affecting user experience',
      'Team productivity bottlenecks',
      'Architecture modernization pressure'
    ],
    motivators: [
      'Technical excellence',
      'Team empowerment',
      'Scalable solutions',
      'Innovation enablement'
    ],
    language: 'technical-detailed',
    urgencyTriggers: ['performance degradation', 'scalability limits', 'technical obsolescence']
  },

  'operational-executive': {
    painPoints: [
      'Process inefficiencies draining resources',
      'Customer experience inconsistencies',
      'Cross-team collaboration issues',
      'Quality control challenges'
    ],
    motivators: [
      'Process optimization',
      'Quality improvements',
      'Resource efficiency',
      'Stakeholder satisfaction'
    ],
    language: 'process-outcome',
    urgencyTriggers: ['quality issues', 'efficiency gaps', 'customer complaints']
  }
} as const;

// Content strategy framework for different business contexts
export const CONTENT_STRATEGIES: Record<string, ContentStrategy> = {
  'technical-authority': {
    positioning: 'technical-authority',
    targetAudience: 'cto',
    urgencyLevel: 'strategic',
    valueProposition: [
      'Deep technical expertise in Core Web Vitals optimization',
      'Proven architecture patterns for high-performance applications',
      'End-to-end implementation with measurable results',
      'Technical team enablement and knowledge transfer'
    ],
    competitiveDifferentiators: [
      'Real Chrome UX Report data analysis',
      'Industry-specific performance benchmarks',
      'Technical implementation roadmaps',
      'Continuous monitoring and optimization'
    ]
  },

  'business-executive': {
    positioning: 'business-executive',
    targetAudience: 'ceo',
    urgencyLevel: 'immediate',
    valueProposition: [
      'Quantified revenue impact from performance optimization',
      '48-hour technical audit with immediate ROI insights',
      'Competitive advantage through superior user experience',
      'Risk mitigation for business-critical digital assets'
    ],
    competitiveDifferentiators: [
      'Financial-focused performance analysis',
      'Business outcome tracking and reporting',
      'Executive-level strategic recommendations',
      'Investment prioritization framework'
    ]
  },

  'hybrid-executive': {
    positioning: 'hybrid',
    targetAudience: 'technical-lead',
    urgencyLevel: 'quarterly',
    valueProposition: [
      'Technical excellence with clear business impact',
      'Comprehensive audit covering performance and ROI',
      'Implementation roadmap with financial projections',
      'Team capability building with measurable outcomes'
    ],
    competitiveDifferentiators: [
      'Dual technical and business expertise',
      'Holistic optimization approach',
      'Stakeholder-specific reporting',
      'Long-term strategic partnership'
    ]
  }
};

// Copy optimization framework
export const COPY_FRAMEWORK = {
  headlines: {
    'pain-amplification': [
      'Seu site está perdendo {{revenueImpact}} por ano devido à performance',
      '{{percentage}}% dos seus usuários abandonam por lentidão',
      'Concorrentes {{percentage}}% mais rápidos estão capturando seus clientes'
    ],
    'authority-building': [
      'Auditoria técnica de 48h identifica {{savings}} em oportunidades',
      'Metodologia comprovada em {{clientCount}}+ projetos de otimização',
      'Dados reais do Chrome UX Report para {{sector}}'
    ],
    'urgency-action': [
      'Auditoria gratuita limitada a {{slots}} empresas por mês',
      'Performance impacta diretamente sua posição no Google',
      'Cada segundo perdido custa {{dailyLoss}} em receita'
    ]
  },

  valueProps: {
    'financial-focused': [
      'ROI médio de {{roi}}% em projetos de otimização',
      'Redução de {{percentage}}% nos custos de infraestrutura',
      'Aumento de {{percentage}}% na conversão documentado'
    ],
    'technical-focused': [
      'Arquitetura de alta performance com Core Web Vitals otimizados',
      'Implementação seguindo padrões enterprise',
      'Monitoramento contínuo com alertas automatizados'
    ],
    'outcome-focused': [
      'Usuários {{percentage}}% mais satisfeitos após otimização',
      'Tempo de carregamento reduzido de {{before}}s para {{after}}s',
      'Posicionamento SEO melhorado em {{timeframe}}'
    ]
  },

  socialProof: {
    'metric-driven': [
      '{{count}}+ projetos com performance otimizada',
      'Economia média de {{amount}} por cliente',
      '{{percentage}}% de melhoria média em Core Web Vitals'
    ],
    'authority-based': [
      'Especialistas certificados em Google Core Web Vitals',
      'Metodologia baseada em dados do Chrome UX Report',
      'Parceiros oficiais de tecnologias de performance'
    ]
  }
};

// Dynamic content generation based on user data
export function generatePersonalizedCopy(
  userProfile: keyof typeof DECISION_MAKER_PROFILES,
  businessMetrics: {
    monthlyRevenue?: number;
    currentLCP?: number;
    sector?: string;
  },
  contentType: keyof typeof COPY_FRAMEWORK
): string[] {
  const profile = DECISION_MAKER_PROFILES[userProfile];
  const framework = COPY_FRAMEWORK[contentType];
  
  if (!framework) return [];

  // Calculate personalized metrics
  const revenueImpact = businessMetrics.monthlyRevenue 
    ? (businessMetrics.monthlyRevenue * 0.11 * 12).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
      })
    : 'R$ 150.000';

  const dailyLoss = businessMetrics.monthlyRevenue
    ? (businessMetrics.monthlyRevenue * 0.11 / 30).toLocaleString('pt-BR', {
        style: 'currency', 
        currency: 'BRL',
        maximumFractionDigits: 0
      })
    : 'R$ 500';

  // Template replacement logic would go here
  // For now, return sample personalized content
  
  return profile.motivators.map(motivator => 
    `Otimização focada em ${motivator.toLowerCase()} com impacto de ${revenueImpact}`
  );
}

// A/B testing framework for copy optimization
export const AB_TESTING_VARIANTS = {
  headlines: {
    variant_a: 'Auditoria Técnica Gratuita de Performance',
    variant_b: 'Identifique R$ 50K+ em Perdas por Performance',
    variant_c: '48h para Descobrir Quanto Sua Lentidão Custa'
  },
  
  ctas: {
    variant_a: 'Solicitar Auditoria Gratuita',
    variant_b: 'Calcular Impacto na Receita',
    variant_c: 'Agendar Análise Executiva'
  },
  
  valueProps: {
    variant_a: 'Análise técnica completa em 48 horas',
    variant_b: 'ROI documentado de 15-30% em performance',
    variant_c: 'Metodologia comprovada em 500+ projetos'
  }
};

export default {
  DECISION_MAKER_PROFILES,
  CONTENT_STRATEGIES,
  COPY_FRAMEWORK,
  generatePersonalizedCopy,
  AB_TESTING_VARIANTS
};
