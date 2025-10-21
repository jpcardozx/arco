/**
 * ARCO Landing Page - Icon Mapping System
 * 
 * Mapeamento centralizado de ícones do Lucide React para cada seção
 * Garante consistência visual e facilita manutenção
 */

import {
  // Core Actions
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Zap,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Check,
  X,
  
  // Business & Analytics
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  DollarSign,
  Target,
  Activity,
  
  // Communication
  MessageCircle,
  MessageSquare,
  Phone,
  Mail,
  Bell,
  
  // Status & Alerts
  AlertCircle,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Clock,
  Timer,
  
  // Features
  Sparkles,
  Star,
  Crown,
  Award,
  
  // Tech & Process
  Globe,
  Smartphone,
  Monitor,
  Users,
  User,
  UserPlus,
  
  // Navigation & UI
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Settings,
  HelpCircle,
  
  // Three-step process icons
  MousePointerClick,
  FormInput,
  CheckSquare,
  
  type LucideIcon
} from 'lucide-react';

/**
 * Icon Categories por Seção da Landing Page
 */
export const LANDING_ICONS = {
  // HeroSection - Primeira impressão
  hero: {
    main: Calendar, // Calendário como símbolo principal
    action: Zap, // Ação rápida/automação
    benefit: CheckCircle2, // Confirmação de benefício
    cta: ArrowRight, // Call to action
    badge: Sparkles, // Destaque premium
  },

  // SolutionArchitecture - Fluxo do sistema
  solution: {
    google: Globe, // Google Ads
    landing: Smartphone, // Landing page mobile
    booking: CalendarCheck, // Sistema de agendamento
    whatsapp: MessageCircle, // Confirmação WhatsApp
    analytics: BarChart3, // Métricas
  },

  // MarketContext - Comportamento do consumidor
  market: {
    search: Search, // Busca local
    trend: TrendingUp, // Tendência crescente
    competition: Users, // Concorrência
    opportunity: Target, // Oportunidade
  },

  // ProcessBreakdown - 5 etapas
  process: {
    step1: MousePointerClick, // Click no anúncio
    step2: Smartphone, // Acessa landing page
    step3: FormInput, // Preenche formulário
    step4: MessageSquare, // Recebe confirmação
    step5: CheckSquare, // Agendamento confirmado
  },

  // ProofSection - Social proof e resultados
  proof: {
    growth: TrendingUp,
    revenue: DollarSign,
    rating: Star,
    success: CheckCircle2,
    warning: AlertCircle,
  },

  // ImplementationGuide - Timeline 90 dias
  implementation: {
    setup: Settings, // Configuração inicial
    launch: Zap, // Lançamento
    optimize: Activity, // Otimização
    scale: TrendingUp, // Crescimento
    milestone: Award, // Marco conquistado
  },

  // PricingSection - Planos
  pricing: {
    check: CheckCircle2,
    x: X,
    popular: Crown,
    premium: Sparkles,
    time: Clock,
    support: MessageCircle,
  },

  // CaptureSection - Formulário final
  capture: {
    form: FormInput,
    security: ShieldCheck,
    fast: Zap,
    success: CheckCircle2,
    contact: Phone,
  },

  // Policies - Garantias e políticas
  policies: {
    guarantee: Shield,
    refund: DollarSign,
    alert: AlertCircle,
    support: MessageCircle,
  },

  // Shared - Ícones comuns
  shared: {
    chevronDown: ChevronDown,
    chevronRight: ChevronRight,
    arrowRight: ArrowRight,
    arrowDown: ArrowDown,
    check: Check,
    help: HelpCircle,
  },
} as const;

/**
 * Helper type para autocomplete
 */
export type LandingIconCategory = keyof typeof LANDING_ICONS;
export type LandingIconName<T extends LandingIconCategory> = keyof typeof LANDING_ICONS[T];

/**
 * Helper function para pegar ícone com type safety
 */
export function getLandingIcon<T extends LandingIconCategory>(
  category: T,
  name: LandingIconName<T>
): LucideIcon {
  return LANDING_ICONS[category][name] as LucideIcon;
}

/**
 * Palette de cores por tipo de ícone
 */
export const ICON_COLORS = {
  primary: 'text-amber-500', // Amber-500 - cor principal da campanha
  secondary: 'text-amber-600', // Amber-600 - accent
  success: 'text-green-500', // Confirmações, ROI positivo
  warning: 'text-orange-500', // Alertas, atenção
  error: 'text-red-500', // Erros, problemas
  neutral: 'text-slate-400', // Neutro, backgrounds
  white: 'text-white', // Contraste alto
} as const;

/**
 * Tamanhos padronizados
 */
export const ICON_SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
} as const;
