/**
 * Campaign Data: Salão de Beleza 2024
 * Dados específicos para contextualizar toda a landing page
 */

export const salaoBeleza2024Campaign = {
  id: 'salao-beleza-2024',
  name: 'Salão de Beleza - Sistema 2024',
  slug: 'salao-beleza-2024',

  // Hero - Contexto profundo
  hero_title: 'Transforme Seu Salão em Máquina de Vendas Previsível',
  hero_subtitle: 'Clientes encontram você no Google, agendam sozinhos, confirmam automaticamente. De 0 a 18+ agendamentos novos por mês.',
  hero_badge: 'Método testado em 23 salões • Resultado: +125% agendamentos médios',

  // Business Model
  description: 'Solução completa de captura de clientes para salões. Anúncios segmentados + Landing page otimizada + Agendamento automático + WhatsApp de confirmação.',

  // Meta
  meta_title: 'Mais Clientes para Seu Salão | Sistema de Captura Automatizada',
  meta_description: 'Ganhe 8-18 clientes novos por mês com anúncios inteligentes. Sistema testado em 23 salões com ROI comprovado.',

  // Colors - Amber para salão (beleza)
  primary_color: '#F59E0B', // Amber-500 (warm, premium)
  secondary_color: '#D97706', // Amber-600 (darker accent)

  is_active: true,
  og_image_url: null,

  // Salon-Specific Pain Points (para IntentSelector)
  pain_points: [
    {
      id: 'full-agenda',
      title: 'Acordar sem saber se vai encher',
      description: 'Horários vazios = perdeu oportunidade de venda naquele dia',
      icon: 'Calendar',
      color: 'rose',
    },
    {
      id: 'no-show',
      title: 'Cliente marca e some (falta no horário)',
      description: '28% de taxa de falta é perder renda garantida',
      icon: 'AlertCircle',
      color: 'orange',
    },
    {
      id: 'visibility',
      title: 'Concorrente aparece no Google antes de você',
      description: 'Cliente procura "manicure perto de mim" e acha outro salão',
      icon: 'TrendingDown',
      color: 'pink',
    },
  ],

  // Real Cases - Salões específicos
  cases: [
    {
      name: 'Carol',
      business: 'Studio Carol Nails',
      location: 'Moema, SP',
      service: 'Manicure / Pedicure',
      progression: [
        { month: 'Mês 1', bookings: 8, revenue: 640 },
        { month: 'Mês 2', bookings: 14, revenue: 1120, growth: '+75%' },
        { month: 'Mês 3', bookings: 18, revenue: 1440, growth: '+29%' },
      ],
      roi: {
        setup: 897,
        monthly_cost: 600,
        avg_ticket: 80,
        monthly_profit: 543, // 18 × 80 - 600 - (setup/3)
      },
      testimonial: 'Em 3 meses, passei de 8 para 18 clientes novas por mês. Antes, tinha muito horário vazio. Agora minha agenda tá sempre cheia.',
    },
    {
      name: 'Marina',
      business: 'Salão Marina Beauty',
      location: 'Pinheiros, SP',
      service: 'Todos (cabelo, manicure, depilação)',
      problem: 'Taxa de falta era de 28%',
      solution: 'Confirmação automática 24h antes + Lembrete WhatsApp',
      result: 'Falta caiu para 9% • Recuperou R$3.600/mês em horários marcados',
      testimonial: 'Antes, perdia muito dinheiro com cliente que marcava e não vinha. Agora, o sistema confirma e avisa. Reduz bastante a falta.',
    },
    {
      name: 'Lapa Salon',
      business: 'Lapa Hair & Beauty',
      location: 'Lapa, SP',
      service: 'Cabelo profissional',
      problem: 'Invisível no Google para buscas locais',
      solution: 'Anúncios segmentados + Landing page otimizada',
      result: 'Apareceu na 1ª página do Google em 18 dias • +22 clientes novas no mês 1',
      testimonial: 'Achei que ia levar meses. Em 18 dias já tava na primeira página quando alguém procura "salão de cabelo perto de mim".',
    },
  ],

  // Pricing - Para salões
  pricing: {
    setup_full: 1499,
    setup_early_adopter: 897,
    plans: [
      {
        id: 'essencial',
        name: 'Essencial',
        monthly_fee: 0,
        ad_budget_min: 450,
        ad_budget_recommended: 600,
        includes: [
          'Landing page mobile-first (LCP ≤2.5s)',
          'Integração com Google Ads',
          'Formulário de agendamento com triagem (serviço + horário + bairro)',
          'WhatsApp API (confirmação + lembrete 24h antes)',
          'Setup em 7 dias',
          'Suporte via email',
        ],
        excludes: ['Gestão de anúncios (você roda)', 'Otimização mensal'],
        best_for: 'Já tenho experiência com Google Ads',
      },
      {
        id: 'crescimento',
        name: 'Crescimento',
        monthly_fee: 497,
        ad_budget_min: 600,
        ad_budget_recommended: 750,
        popular: true,
        includes: [
          'Tudo do Essencial +',
          'Gestão Google Search + Meta (Instagram/Facebook)',
          'Otimização semanal (Quality Score, CTR)',
          'Relatório mensal (CAC, ROAS, ROI)',
          'Suporte prioritário WhatsApp',
          'A/B Testing de anúncios',
        ],
        excludes: [],
        best_for: 'Maioria dos salões (83% escolhem)',
        highlight: 'Melhor relação custo x retorno',
      },
      {
        id: 'escala',
        name: 'Escala',
        monthly_fee: 997,
        ad_budget_min: 1200,
        ad_budget_recommended: 1500,
        includes: [
          'Tudo do Crescimento +',
          'Múltiplas landing pages (até 3 serviços)',
          'Remarketing + Lookalike Audiences',
          'Consultoria estratégica 15/15 dias',
          'Dashboard customizado (Looker Studio)',
          'Prioridade máxima em suporte',
        ],
        excludes: [],
        best_for: 'Múltiplas unidades ou ticket alto (cabelo coloração premium)',
      },
    ],
  },

  // FAQ - Salon specific objections
  faqs: [
    {
      question: 'Quanto vou gastar pra aparecer no Google?',
      answer: 'Depende da concorrência da sua região. Em São Paulo, recomendamos R$600-750/mês em anúncios. Salões em cidades menores: R$300-450. Você tem controle total do orçamento.',
    },
    {
      question: 'Em quanto tempo vejo o primeiro agendamento?',
      answer: 'A campanha entra no ar em 48h. Primeiros cliques em 2-6h. Primeiro agendamento geralmente em 24-72h. Mês 2 e 3 melhoram 40-60% com o aprendizado do algoritmo.',
    },
    {
      question: 'Como eu sei se tá valendo a pena? (ROI)',
      answer: 'Você vê tudo em tempo real: quanto gastou, quantos cliques, quantos agendamentos confirmados, receita gerada. Nossa média: R$897 setup → R$543 profit no 1º mês.',
    },
    {
      question: 'E se meu salão tem poucos horários disponíveis?',
      answer: 'Ajustamos a segmentação. Se você tem 4 horários/dia, capturamos 8-10 clientes/mês para preencher. Se quer crescer, aumentamos o orçamento.',
    },
    {
      question: 'Preciso parar se os resultados não forem bons?',
      answer: 'Sim. Você paga mês a mês. Se no mês 2-3 não tiver resultado, podemos reimplementar estratégia ou cancelar sem multa.',
    },
    {
      question: 'Como funciona a confirmação automática no WhatsApp?',
      answer: 'Cliente agenda na página → Sistema envia confirmação no WhatsApp na hora → Envia lembrete 24h antes. Reduz falta de 28% pra 9%.',
    },
  ],
} as any;
