/**
 * Campaign Data: Salão de Beleza 2024
 * Dados específicos para contextualizar toda a landing page
 */

export const salaoBeleza2024Campaign = {
  id: 'salao-beleza-2024',
  name: 'Salão de Beleza - Sistema 2024',
  slug: 'salao-beleza-2024',

  // Hero - Consultivo, honesto, sem promessas específicas
  hero_title: 'Seu salão merece clientes previsíveis',
  hero_subtitle: 'Sistema de captura testado em 23 salões. Cada resultado é diferente — vamos calcular uma projeção realista para o seu caso.',
  hero_badge: '23 salões ativos • Dados reais, transparentes',

  // Business Model
  description: 'Solução completa de captura de clientes para salões. Anúncios segmentados + Landing page otimizada + Agendamento automático + WhatsApp de confirmação.',

  // Meta
  meta_title: 'Sistema de Captura para Salões | Resultados Transparentes',
  meta_description: 'Sistema testado em 23 salões com dados reais. Cada resultado varia — veja se faz sentido para o seu caso.',

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

  // Real Cases - Contextualizados, sem números exatos de resultado
  cases: [
    {
      name: 'Carol',
      business: 'Studio Carol Nails',
      location: 'Moema, SP',
      service: 'Manicure / Pedicure',
      context: 'Profissional com marca estabelecida em região densa. Orçamento consistente.',
      progression: 'crescimento-gradual', // não mostrar números específicos
      roi: {
        setup: 897,
        monthly_cost: 600,
        avg_ticket: 80,
      },
      testimonial: 'O sistema trouxe previsibilidade. Antes ficava na expectativa de encher a agenda. Agora consigo planejar o mês sabendo quantos horários vou ter ocupados.',
    },
    {
      name: 'Marina',
      business: 'Salão Marina Beauty',
      location: 'Pinheiros, SP',
      service: 'Todos (cabelo, manicure, depilação)',
      context: 'Salão completo com problema de no-show (faltas prejudicavam receita).',
      problem: 'Taxa de falta estava impactando a operação',
      solution: 'Confirmação automática 24h antes + Lembrete WhatsApp',
      result: 'Redução significativa de faltas',
      testimonial: 'Perdia muito com cliente que marcava e não aparecia. O lembrete automático mudou isso. Continua tendo alguma falta, mas bem menos.',
    },
    {
      name: 'Lapa Salon',
      business: 'Lapa Hair & Beauty',
      location: 'Lapa, SP',
      service: 'Cabelo profissional',
      context: 'Salão com boa qualidade mas sem presença digital estruturada.',
      problem: 'Baixa visibilidade em buscas locais',
      solution: 'Anúncios segmentados + Landing page otimizada',
      result: 'Passou a aparecer em buscas relevantes na região',
      testimonial: 'Antes, quem procurava "salão perto de mim" não me achava. Agora apareço nos resultados. Faz diferença.',
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
