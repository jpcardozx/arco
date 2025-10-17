/**
 * STRATEGIC VELOCITY - DATA
 * Conteúdo em linguagem do lead (dentista, advogado, arquiteto)
 * SEM jargão técnico ou referências internas
 */

import {
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';

// ============================================================================
// PROBLEMAS DO LEAD
// ============================================================================

export const leadProblems = [
  {
    icon: Clock,
    title: 'Ciclos Longos de Vendas',
    stat: '50% de abandono',
    description: 'Processos de venda extensos criam fricção. Cada etapa é uma oportunidade para o cliente desistir ou buscar alternativas mais ágeis.',
    impact: 'Quanto mais longo o processo, maior a taxa de desistência. Clientes perdem contexto, encontram alternativas, ou simplesmente deixam de priorizar.',
    consequence: 'O lead hoje pode ser lead perdido em 2-3 semanas sem validação tangível de progresso.'
  },
  {
    icon: DollarSign,
    title: 'Investimento sem Escopo Claro',
    stat: '73% não seguem adiante',
    description: 'Orçamentos flutuantes ou sem detalhamento geram insegurança. Clientes imaginam cenários desfavoráveis na ausência de especificação clara.',
    impact: 'Sem escopo definido, cliente não consegue avaliar ROI potencial. O investimento parece arriscado e indefinido.',
    consequence: 'A indecisão se transforma em rejeição. Clientes buscam fornecedores com propostas mais claras.'
  },
  {
    icon: AlertCircle,
    title: 'Falta de Prova Tangível',
    stat: '68% exigem validação',
    description: 'Investimentos significativos sem demonstração anterior de qualidade ou resultados dificultam fundamentalmente a decisão de compra.',
    impact: 'Cliente não consegue diferenciar entre fornecedores baseado em promessas. Todas parecem iguais até haver evidência concreta.',
    consequence: 'Decisão recua ou é cancelada. Sem prova de trabalho, a confiança não é construída.'
  }
];

// ============================================================================
// 4 DEGRAUS (LINGUAGEM DO LEAD)
// ============================================================================

export const fourSteps = [
  {
    step: 'Etapa 1',
    icon: FileText,
    title: 'Conteúdo Educativo',
    color: 'teal' as const,
    description: 'Material de valor que demonstra conhecimento técnico e abordagem profissional.',
    example: 'Guias práticos ou checklists aplicáveis ao negócio do cliente',
    benefit: 'Estabelece credibilidade inicial sem solicitar investimento'
  },
  {
    step: 'Etapa 2',
    icon: Calendar,
    title: 'Análise Pontual',
    color: 'orange' as const,
    description: 'Avaliação específica com escopo e preço definidos. Permite validação mútua.',
    example: 'Diagnóstico técnico com recomendações priorizadas',
    benefit: 'Cliente avalia qualidade do trabalho com investimento controlado'
  },
  {
    step: 'Etapa 3',
    icon: Target,
    title: 'Projeto Estruturado',
    color: 'purple' as const,
    description: 'Escopo detalhado, cronograma estabelecido, investimento transparente.',
    example: 'Implementação completa com entregas e prazos acordados',
    benefit: 'Clareza total sobre expectativas, custos e resultados esperados'
  },
  {
    step: 'Etapa 4',
    icon: TrendingUp,
    title: 'Parceria Contínua',
    color: 'teal' as const,
    description: 'Manutenção e otimização após validação dos resultados iniciais.',
    example: 'Suporte recorrente com foco em melhorias incrementais',
    benefit: 'Relacionamento de longo prazo baseado em resultados comprovados'
  }
];

// ============================================================================
// MÉTRICAS (LINGUAGEM DO LEAD)
// ============================================================================

export const benchmarkMetrics = [
  {
    label: 'Engajamento inicial',
    value: 'Maior',
    description: 'Conteúdo de valor atrai leads mais qualificados'
  },
  {
    label: 'Qualificação',
    value: 'Melhor',
    description: 'Análise pontual identifica clientes com fit real'
  },
  {
    label: 'Redução de atrito',
    value: 'Evidente',
    description: 'Projetos com escopo claro reduzem idas-e-vindas'
  },
  {
    label: 'Previsibilidade',
    value: 'Maior',
    description: 'Etapas definidas facilitam planejamento de ambos'
  }
];

// ============================================================================
// CTAs
// ============================================================================

export const ctaOptions = {
  free: {
    badge: 'Material de referência',
    title: 'Conteúdo Educativo',
    description: 'Recursos práticos para avaliar e melhorar sua presença digital.',
    features: [
      'Guias aplicáveis ao seu contexto',
      'Baseado em implementações reais',
      'Sem solicitar dados de contato',
      'Sem compromisso ou follow-up comercial'
    ],
    buttonText: 'Acessar Material',
    footer: 'Acesso imediato • Privacidade respeitada'
  },
  paid: {
    badge: 'Avaliação profissional',
    title: 'Análise Técnica',
    price: 'Sob consulta',
    description: 'Diagnóstico detalhado da sua presença digital com recomendações prioritizadas.',
    features: [
      'Análise de performance e oportunidades',
      'Documento com ações recomendadas',
      'Sessão de alinhamento incluída',
      'Útil independente de continuação'
    ],
    buttonText: 'Consultar Disponibilidade',
    footer: 'Agendamento sujeito à capacidade atual'
  }
};

// ============================================================================
// PROGRESSÃO ESTRATÉGICA (GUIDE)
// ============================================================================

export const progressionGuide = {
  headline: 'Como começar',
  description: 'Escolha o ponto de entrada adequado:',
  scenarios: [
    {
      situation: 'Estou explorando opções',
      recommendation: 'free',
      reasoning: 'Materiais educativos permitem avaliação inicial sem compromisso'
    },
    {
      situation: 'Preciso de uma avaliação especializada',
      recommendation: 'paid',
      reasoning: 'Análise técnica oferece visão clara de oportunidades e esforço necessário'
    },
    {
      situation: 'Tenho urgência em melhorar resultados',
      recommendation: 'paid',
      reasoning: 'Diagnóstico identifica prioridades e viabiliza planejamento objetivo'
    }
  ]
};

// ============================================================================
// TRANSPARÊNCIA (QUANDO NÃO FUNCIONA)
// ============================================================================

export const transparency = {
  title: 'Considerações importantes',
  description: 'Avalie se este momento é adequado:',
  criteria: [
    {
      condition: 'Volume de leads atual muito limitado',
      advice: 'Pode ser mais estratégico focar primeiro em canais orgânicos antes de investir em automação e conversão.'
    },
    {
      condition: 'Orçamento de marketing restrito',
      advice: 'Implementações efetivas requerem investimento mínimo viável. Considere acumular recursos antes de iniciar.'
    },
    {
      condition: 'Capacidade operacional já no limite',
      advice: 'Aumentar conversão sem capacidade de atendimento gera insatisfação. Estruturação interna é pré-requisito.'
    }
  ]
};
