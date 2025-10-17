import {
  QuizSection,
  QuizQuestion,
  BusinessVertical,
} from '@/types/quiz'

/**
 * Diagnóstico Estratégico Digital - Configuração do Quiz
 * 
 * 5 seções progressivas que qualificam e mapeiam o lead
 */

export const QUIZ_CONFIG = {
  title: 'Diagnóstico Estratégico Digital',
  subtitle: 'Avalie a maturidade digital do seu negócio em 5 minutos',
  description: 'Responda o diagnóstico e receba uma análise personalizada com recomendações estratégicas para acelerar seus resultados.',
  estimatedTime: 5,
  totalQuestions: 15,
}

export const QUIZ_SECTIONS: QuizSection[] = [
  // Seção 1: Contexto do Negócio
  {
    id: 'context',
    title: 'Contexto do Negócio',
    description: 'Compreenda o estágio atual da sua operação digital',
    icon: 'Building2',
    questions: [
      {
        id: 'company-size',
        category: 'context',
        title: 'Qual o porte da sua empresa?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'freelancer',
            label: 'Freelancer / Autônomo',
            value: 3,
            verticals: ['performance', 'marketing'],
          },
          {
            id: 'micro',
            label: 'Microempresa (até 9 funcionários)',
            value: 5,
            verticals: ['performance', 'marketing', 'ecommerce'],
          },
          {
            id: 'small',
            label: 'Pequena empresa (10-49 funcionários)',
            value: 7,
            verticals: ['performance', 'marketing', 'analytics', 'ecommerce'],
          },
          {
            id: 'medium',
            label: 'Média empresa (50-249 funcionários)',
            value: 8,
            verticals: ['tech-stack', 'analytics', 'security', 'growth'],
          },
          {
            id: 'large',
            label: 'Grande empresa (250+ funcionários)',
            value: 10,
            verticals: ['tech-stack', 'analytics', 'security', 'growth'],
          },
        ],
      },
      {
        id: 'monthly-revenue',
        category: 'context',
        title: 'Faturamento mensal médio',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'rev-0-10k',
            label: 'Até R$ 10 mil',
            value: 3,
            verticals: ['performance', 'marketing'],
          },
          {
            id: 'rev-10-50k',
            label: 'R$ 10-50 mil',
            value: 5,
            verticals: ['performance', 'marketing', 'analytics'],
          },
          {
            id: 'rev-50-100k',
            label: 'R$ 50-100 mil',
            value: 7,
            verticals: ['performance', 'marketing', 'analytics', 'growth'],
          },
          {
            id: 'rev-100-500k',
            label: 'R$ 100-500 mil',
            value: 8,
            verticals: ['tech-stack', 'analytics', 'security', 'growth'],
          },
          {
            id: 'rev-500k-plus',
            label: 'Acima de R$ 500 mil',
            value: 10,
            verticals: ['tech-stack', 'analytics', 'security', 'growth', 'ecommerce'],
          },
        ],
      },
      {
        id: 'has-website',
        category: 'context',
        title: 'Sua empresa possui website?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'no-website',
            label: 'Não, ainda não temos website',
            value: 2,
            verticals: ['performance', 'tech-stack'],
            nextQuestion: 'main-channel', // Pula pergunta sobre idade do site
          },
          {
            id: 'yes-new',
            label: 'Sim, há menos de 1 ano',
            value: 6,
            verticals: ['performance', 'marketing', 'analytics'],
          },
          {
            id: 'yes-established',
            label: 'Sim, há mais de 1 ano',
            value: 8,
            verticals: ['performance', 'marketing', 'analytics', 'security'],
          },
          {
            id: 'yes-old',
            label: 'Sim, há mais de 3 anos (precisa atualização)',
            value: 9,
            verticals: ['performance', 'tech-stack', 'security'],
          },
        ],
      },
      {
        id: 'main-channel',
        category: 'context',
        title: 'Qual seu principal canal de vendas atualmente?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'physical-store',
            label: 'Loja física',
            value: 5,
            verticals: ['ecommerce', 'marketing'],
          },
          {
            id: 'website',
            label: 'Website próprio',
            value: 8,
            verticals: ['performance', 'analytics', 'marketing'],
          },
          {
            id: 'marketplace',
            label: 'Marketplace (Mercado Livre, Amazon, etc)',
            value: 6,
            verticals: ['ecommerce', 'marketing'],
          },
          {
            id: 'social-media',
            label: 'Redes sociais (Instagram, WhatsApp, etc)',
            value: 7,
            verticals: ['marketing', 'ecommerce'],
          },
          {
            id: 'b2b-direct',
            label: 'Vendas B2B diretas',
            value: 8,
            verticals: ['analytics', 'growth', 'tech-stack'],
          },
        ],
      },
    ],
  },

  // Seção 2: Dores e Desafios
  {
    id: 'pain-points',
    title: 'Dores e Desafios',
    description: 'Identifique os principais obstáculos do seu negócio',
    icon: 'AlertTriangle',
    questions: [
      {
        id: 'main-challenges',
        category: 'pain-points',
        title: 'Quais são seus principais desafios atualmente? (Selecione até 3)',
        type: 'multiple-choice',
        required: true,
        options: [
          {
            id: 'slow-website',
            label: 'Website lento ou com problemas técnicos',
            value: 9,
            verticals: ['performance', 'tech-stack'],
          },
          {
            id: 'low-traffic',
            label: 'Pouco tráfego no website',
            value: 8,
            verticals: ['marketing', 'analytics'],
          },
          {
            id: 'low-conversion',
            label: 'Baixa taxa de conversão de visitantes em clientes',
            value: 9,
            verticals: ['performance', 'marketing', 'analytics'],
          },
          {
            id: 'high-cac',
            label: 'Custo de aquisição de cliente muito alto',
            value: 8,
            verticals: ['marketing', 'analytics', 'growth'],
          },
          {
            id: 'no-data',
            label: 'Falta de dados para tomar decisões',
            value: 9,
            verticals: ['analytics', 'tech-stack'],
          },
          {
            id: 'manual-processes',
            label: 'Processos manuais e repetitivos',
            value: 7,
            verticals: ['tech-stack', 'growth'],
          },
          {
            id: 'security-concerns',
            label: 'Preocupações com segurança e dados',
            value: 8,
            verticals: ['security', 'tech-stack'],
          },
          {
            id: 'competitors',
            label: 'Concorrentes crescendo mais rápido',
            value: 7,
            verticals: ['growth', 'marketing', 'analytics'],
          },
        ],
      },
      {
        id: 'website-performance',
        category: 'pain-points',
        title: 'Como você avalia a performance do seu website?',
        type: 'scale',
        required: true,
        options: [
          { id: 'perf-1', label: 'Muito lento', value: 10, verticals: ['performance'] },
          { id: 'perf-2', label: 'Lento', value: 8, verticals: ['performance'] },
          { id: 'perf-3', label: 'Razoável', value: 6, verticals: ['performance'] },
          { id: 'perf-4', label: 'Bom', value: 4, verticals: [] },
          { id: 'perf-5', label: 'Excelente', value: 2, verticals: [] },
        ],
      },
      {
        id: 'ads-investment',
        category: 'pain-points',
        title: 'Quanto investe mensalmente em anúncios digitais?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'ads-none',
            label: 'Não invisto em anúncios',
            value: 5,
            verticals: ['marketing'],
          },
          {
            id: 'ads-low',
            label: 'Até R$ 1.000',
            value: 6,
            verticals: ['marketing', 'analytics'],
          },
          {
            id: 'ads-medium',
            label: 'R$ 1.000 - R$ 5.000',
            value: 7,
            verticals: ['marketing', 'analytics'],
          },
          {
            id: 'ads-high',
            label: 'R$ 5.000 - R$ 20.000',
            value: 8,
            verticals: ['marketing', 'analytics', 'growth'],
          },
          {
            id: 'ads-very-high',
            label: 'Acima de R$ 20.000',
            value: 10,
            verticals: ['marketing', 'analytics', 'growth'],
          },
        ],
      },
    ],
  },

  // Seção 3: Recursos Atuais
  {
    id: 'resources',
    title: 'Recursos Atuais',
    description: 'Mapeie as ferramentas e processos existentes',
    icon: 'Layers',
    questions: [
      {
        id: 'has-analytics',
        category: 'resources',
        title: 'Possui ferramenta de analytics instalada? (Google Analytics, etc)',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'analytics-no',
            label: 'Não tenho',
            value: 8,
            verticals: ['analytics'],
          },
          {
            id: 'analytics-yes-not-use',
            label: 'Tenho mas não uso',
            value: 7,
            verticals: ['analytics'],
          },
          {
            id: 'analytics-yes-basic',
            label: 'Sim, uso básico (visualizo relatórios)',
            value: 5,
            verticals: ['analytics'],
          },
          {
            id: 'analytics-yes-advanced',
            label: 'Sim, uso avançado (tomo decisões baseadas em dados)',
            value: 3,
            verticals: [],
          },
        ],
      },
      {
        id: 'has-crm',
        category: 'resources',
        title: 'Utiliza algum CRM ou sistema de gestão de clientes?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'crm-no',
            label: 'Não uso CRM',
            value: 7,
            verticals: ['tech-stack', 'growth'],
          },
          {
            id: 'crm-spreadsheet',
            label: 'Uso planilhas (Excel/Google Sheets)',
            value: 6,
            verticals: ['tech-stack'],
          },
          {
            id: 'crm-basic',
            label: 'CRM simples (RD Station, HubSpot Free, etc)',
            value: 4,
            verticals: [],
          },
          {
            id: 'crm-advanced',
            label: 'CRM robusto (Salesforce, Pipedrive, etc)',
            value: 2,
            verticals: [],
          },
        ],
      },
      {
        id: 'tech-team',
        category: 'resources',
        title: 'Possui equipe técnica interna?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'tech-none',
            label: 'Não, terceirizo tudo',
            value: 8,
            verticals: ['tech-stack', 'performance'],
          },
          {
            id: 'tech-freelancer',
            label: 'Freelancers ocasionais',
            value: 7,
            verticals: ['tech-stack'],
          },
          {
            id: 'tech-junior',
            label: 'Sim, 1-2 pessoas (júnior)',
            value: 5,
            verticals: ['tech-stack'],
          },
          {
            id: 'tech-senior',
            label: 'Sim, equipe com seniores',
            value: 3,
            verticals: [],
          },
        ],
      },
    ],
  },

  // Seção 4: Objetivos
  {
    id: 'goals',
    title: 'Objetivos Estratégicos',
    description: 'Defina suas prioridades para os próximos meses',
    icon: 'Target',
    questions: [
      {
        id: 'priority-goals',
        category: 'goals',
        title: 'Quais são seus principais objetivos? (Selecione até 3)',
        type: 'multiple-choice',
        required: true,
        options: [
          {
            id: 'goal-traffic',
            label: 'Aumentar tráfego do website',
            value: 8,
            verticals: ['marketing', 'performance'],
          },
          {
            id: 'goal-conversion',
            label: 'Melhorar taxa de conversão',
            value: 9,
            verticals: ['performance', 'analytics', 'marketing'],
          },
          {
            id: 'goal-revenue',
            label: 'Aumentar faturamento',
            value: 10,
            verticals: ['growth', 'marketing', 'ecommerce'],
          },
          {
            id: 'goal-reduce-cac',
            label: 'Reduzir custo de aquisição (CAC)',
            value: 8,
            verticals: ['analytics', 'marketing'],
          },
          {
            id: 'goal-automation',
            label: 'Automatizar processos',
            value: 7,
            verticals: ['tech-stack', 'growth'],
          },
          {
            id: 'goal-security',
            label: 'Melhorar segurança e conformidade',
            value: 7,
            verticals: ['security', 'tech-stack'],
          },
          {
            id: 'goal-data',
            label: 'Tomar decisões baseadas em dados',
            value: 8,
            verticals: ['analytics', 'tech-stack'],
          },
          {
            id: 'goal-scale',
            label: 'Escalar operação rapidamente',
            value: 9,
            verticals: ['growth', 'tech-stack', 'analytics'],
          },
        ],
      },
      {
        id: 'growth-target',
        category: 'goals',
        title: 'Qual seu objetivo de crescimento para os próximos 12 meses?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'growth-maintain',
            label: 'Manter operação estável',
            value: 3,
            verticals: ['security'],
          },
          {
            id: 'growth-20',
            label: 'Crescer até 20%',
            value: 5,
            verticals: ['marketing', 'performance'],
          },
          {
            id: 'growth-50',
            label: 'Crescer 20-50%',
            value: 7,
            verticals: ['marketing', 'analytics', 'growth'],
          },
          {
            id: 'growth-100',
            label: 'Crescer 50-100%',
            value: 9,
            verticals: ['growth', 'tech-stack', 'analytics'],
          },
          {
            id: 'growth-100-plus',
            label: 'Crescer mais de 100%',
            value: 10,
            verticals: ['growth', 'tech-stack', 'analytics', 'marketing'],
          },
        ],
      },
    ],
  },

  // Seção 5: Urgência e Próximos Passos
  {
    id: 'urgency',
    title: 'Próximos Passos',
    description: 'Entenda o timing e prepare o encaminhamento',
    icon: 'Clock',
    questions: [
      {
        id: 'urgency-level',
        category: 'urgency',
        title: 'Qual a urgência para implementar melhorias?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'urgency-low',
            label: 'Estou pesquisando, sem urgência',
            value: 3,
            verticals: [],
          },
          {
            id: 'urgency-medium',
            label: 'Preciso nos próximos 3-6 meses',
            value: 6,
            verticals: [],
          },
          {
            id: 'urgency-high',
            label: 'Preciso iniciar em até 30 dias',
            value: 9,
            verticals: [],
          },
          {
            id: 'urgency-immediate',
            label: 'Preciso iniciar imediatamente',
            value: 10,
            verticals: [],
          },
        ],
      },
      {
        id: 'budget-range',
        category: 'urgency',
        title: 'Qual faixa de investimento mensal está considerando?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'budget-exploring',
            label: 'Ainda explorando opções',
            value: 3,
            verticals: [],
          },
          {
            id: 'budget-low',
            label: 'Até R$ 2.000/mês',
            value: 5,
            verticals: [],
          },
          {
            id: 'budget-medium',
            label: 'R$ 2.000 - R$ 5.000/mês',
            value: 7,
            verticals: [],
          },
          {
            id: 'budget-high',
            label: 'R$ 5.000 - R$ 10.000/mês',
            value: 9,
            verticals: [],
          },
          {
            id: 'budget-enterprise',
            label: 'Acima de R$ 10.000/mês',
            value: 10,
            verticals: [],
          },
        ],
      },
      {
        id: 'next-step-preference',
        category: 'urgency',
        title: 'Após o diagnóstico, como prefere prosseguir?',
        type: 'single-choice',
        required: true,
        options: [
          {
            id: 'next-email',
            label: 'Receber relatório por e-mail',
            value: 4,
            verticals: [],
          },
          {
            id: 'next-call',
            label: 'Agendar call de 15min para discutir resultados',
            value: 8,
            verticals: [],
          },
          {
            id: 'next-consultation',
            label: 'Agendar consultoria técnica completa (60min)',
            value: 10,
            verticals: [],
          },
        ],
      },
    ],
  },
]

// Mapeamento de verticais para recomendações
export const VERTICAL_RECOMMENDATIONS = {
  performance: {
    title: 'Performance Web',
    description: 'Otimização de velocidade, Core Web Vitals e experiência do usuário',
    services: ['Auditoria Lighthouse', 'Otimização de assets', 'CDN e caching', 'Mobile optimization'],
    estimatedImpact: '+30% conversão, -40% bounce rate',
  },
  marketing: {
    title: 'Marketing Digital',
    description: 'Estratégias de aquisição, retenção e otimização de campanhas',
    services: ['Google Ads', 'Meta Ads', 'SEO', 'Email marketing', 'Landing pages'],
    estimatedImpact: '-25% CAC, +50% ROAS',
  },
  analytics: {
    title: 'Analytics & BI',
    description: 'Coleta, análise e visualização de dados para decisões estratégicas',
    services: ['Google Analytics 4', 'Dashboards customizados', 'Relatórios automatizados', 'Tag Manager'],
    estimatedImpact: 'Decisões baseadas em dados reais',
  },
  ecommerce: {
    title: 'E-commerce',
    description: 'Plataformas de vendas online otimizadas para conversão',
    services: ['Shopify/WooCommerce', 'Gateway de pagamento', 'Checkout otimizado', 'Upsell/Cross-sell'],
    estimatedImpact: '+40% ticket médio, +25% conversão',
  },
  'tech-stack': {
    title: 'Tecnologia & Integrações',
    description: 'Arquitetura moderna, APIs e automações inteligentes',
    services: ['CRM integration', 'Webhooks', 'APIs RESTful', 'Automação de processos'],
    estimatedImpact: '-60% tempo manual, +200% produtividade',
  },
  security: {
    title: 'Segurança Digital',
    description: 'Proteção de dados, conformidade e infraestrutura resiliente',
    services: ['SSL/TLS', 'LGPD compliance', 'Firewall', 'Backup automático', 'Monitoring'],
    estimatedImpact: 'Conformidade total + zero downtime',
  },
  growth: {
    title: 'Growth Hacking',
    description: 'Experimentos, otimizações e aceleração de crescimento',
    services: ['A/B testing', 'Funis otimizados', 'Retenção', 'Lifetime Value optimization'],
    estimatedImpact: '+100% crescimento anual',
  },
}
