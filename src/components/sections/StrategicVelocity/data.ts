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
    title: 'Demora muito',
    stat: '45-90 dias',
    description: 'Da primeira conversa até fechar, passa quase 3 meses. Você perde clientes para quem age mais rápido.'
  },
  {
    icon: DollarSign,
    title: 'Preço incerto',
    stat: '70% desiste',
    description: 'Quando você diz "depende do projeto", o cliente pensa no pior cenário e desiste antes de começar.'
  },
  {
    icon: AlertCircle,
    title: 'Risco alto',
    stat: '80% não fecha',
    description: 'Cliente não sabe se você entrega antes de pagar R$ 10-50 mil. É muito dinheiro para apostar no desconhecido.'
  }
];

// ============================================================================
// 4 DEGRAUS (LINGUAGEM DO LEAD)
// ============================================================================

export const fourSteps = [
  {
    step: 'Passo 1',
    icon: FileText,
    title: 'Material Gratuito',
    color: 'teal' as const,
    description: 'Checklist ou guia que o cliente baixa e usa hoje mesmo. Sem compromisso.',
    example: 'Checklist: "15 erros que fazem você perder clientes no Google"',
    benefit: 'Cliente aprende algo útil e pensa: "Se o grátis é bom assim, imagina o pago"'
  },
  {
    step: 'Passo 2',
    icon: Calendar,
    title: 'Diagnóstico Barato',
    color: 'orange' as const,
    description: 'Análise paga de R$ 300-700 em 3-7 dias. Cliente paga pouco, você mostra resultado rápido.',
    example: 'Diagnóstico Express (R$ 497): Análise do site + plano de ação priorizado',
    benefit: 'Cliente qualifica: tem dinheiro, tem urgência, e vê que você entrega'
  },
  {
    step: 'Passo 3',
    icon: Target,
    title: 'Pacote Fechado',
    color: 'purple' as const,
    description: 'Escopo claro, prazo definido (14-60 dias), preço fixo. Sem "depende".',
    example: 'Pacote Performance (R$ 8.900): Site otimizado + campanhas Google em 21 dias',
    benefit: 'Cliente não tem medo de surpresa. Sabe exatamente o que vai pagar e receber'
  },
  {
    step: 'Passo 4',
    icon: TrendingUp,
    title: 'Manutenção Mensal',
    color: 'teal' as const,
    description: 'Depois que funciona, cliente quer manter. Valor mensal fixo para otimização contínua.',
    example: 'Retainer (R$ 2.500/mês): Manutenção + otimização baseada em dados reais',
    benefit: 'Cliente não quer perder o resultado conquistado. Mensalidade previsível'
  }
];

// ============================================================================
// MÉTRICAS (LINGUAGEM DO LEAD)
// ============================================================================

export const benchmarkMetrics = [
  {
    label: 'Baixam o checklist',
    value: '15-20%',
    description: 'De cada 100 visitantes, 15-20 baixam o material'
  },
  {
    label: 'Agendam diagnóstico',
    value: '30%',
    description: 'De cada 100 que baixaram, 30 agendam'
  },
  {
    label: 'Pagam diagnóstico',
    value: '20%',
    description: 'De cada 100 que agendaram, 20 pagam R$ 497'
  },
  {
    label: 'Fecham pacote',
    value: '40%',
    description: 'De cada 100 que pagaram, 40 fecham R$ 8-15k'
  }
];

// ============================================================================
// CTAs
// ============================================================================

export const ctaOptions = {
  free: {
    badge: '📄 Começar aprendendo',
    title: 'Checklist Gratuito',
    description: '15 pontos que fazem você perder clientes (e como corrigir cada um). Leitura de 8 minutos.',
    features: [
      'PDF de 1 página, direto ao ponto',
      'Pode aplicar hoje mesmo',
      'Sem pedir telefone ou reunião',
      'Zero spam depois'
    ],
    buttonText: 'Baixar Checklist Grátis',
    footer: 'Email instantâneo • Sem contato comercial'
  },
  paid: {
    badge: '🎯 Começar implementando',
    title: 'Diagnóstico Express',
    price: 'R$ 497',
    description: 'Análise completa do seu site + campanhas atuais. Plano de ação priorizado entregue em 7 dias úteis.',
    features: [
      'Análise técnica (site + Google Analytics + Ads)',
      'Relatório com 3-5 ações prioritárias',
      '30 min de reunião para tirar dúvidas',
      'Útil mesmo se não fechar pacote depois'
    ],
    buttonText: 'Agendar Diagnóstico',
    footer: 'Próxima vaga: 3 dias • Garantia de entrega'
  }
};

// ============================================================================
// PROGRESSÃO ESTRATÉGICA (GUIDE)
// ============================================================================

export const progressionGuide = {
  headline: 'Qual o seu momento?',
  description: 'Escolha o passo que faz sentido agora:',
  scenarios: [
    {
      situation: 'Ainda não sei se preciso',
      recommendation: 'free',
      reasoning: 'Baixe o checklist e veja se você está perdendo clientes por erros evitáveis'
    },
    {
      situation: 'Sei que preciso, mas quero testar',
      recommendation: 'paid',
      reasoning: 'Diagnóstico Express (R$ 497) prova se conseguimos aumentar seus resultados'
    },
    {
      situation: 'Já estou perdendo clientes agora',
      recommendation: 'paid',
      reasoning: 'Diagnóstico Express identifica o problema e cria plano de 14 dias'
    }
  ]
};

// ============================================================================
// TRANSPARÊNCIA (QUANDO NÃO FUNCIONA)
// ============================================================================

export const transparency = {
  title: 'Quando isso NÃO funciona',
  description: 'Seja honesto consigo mesmo:',
  criteria: [
    {
      condition: 'Você tem menos de 10 leads por mês',
      advice: 'Foque em SEO orgânico primeiro. Tráfego pago só funciona com volume mínimo.'
    },
    {
      condition: 'Orçamento de mídia abaixo de R$ 2 mil/mês',
      advice: 'Valor muito baixo para testar. Economize mais 2-3 meses antes de começar.'
    },
    {
      condition: 'Não consegue atender +50% de demanda',
      advice: 'Resolva capacidade interna primeiro. Mais leads sem estrutura só gera frustração.'
    }
  ]
};
