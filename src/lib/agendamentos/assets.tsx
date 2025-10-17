/**
 * Agendamentos Assets
 * Professional images from Unsplash + Custom icons
 */

import { 
  Search, Code, Target, Crown, TrendingUp, 
  Zap, Sparkles, CheckCircle2, Clock, DollarSign,
  Users, Building2, Rocket, BarChart3, MessageSquare,
  Shield, Award, Briefcase, Lightbulb, HeartHandshake,
  ArrowRight, Calendar, Mail, Phone, Globe,
  Star, ThumbsUp, TrendingDown, AlertCircle
} from 'lucide-react'

// ============================================
// HERO BACKGROUND IMAGES
// ============================================

export const heroImages = {
  // Modern office collaboration
  collaboration: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop',
  // Professional meeting
  meeting: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=1080&fit=crop',
  // Digital workspace
  workspace: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop'
}

// ============================================
// TESTIMONIAL CLIENT AVATARS
// ============================================

export const clientAvatars = {
  client1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
  client2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
  client3: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces',
  client4: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
  client5: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
}

// ============================================
// ICONS BY CONTEXT
// ============================================

export const consultoriaIcons = {
  diagnostico: Search,
  tecnica: Code,
  trafego: Target,
  mentoria: Crown,
  growth: TrendingUp,
  branding: Sparkles
}

export const featureIcons = {
  included: CheckCircle2,
  time: Clock,
  price: DollarSign,
  people: Users,
  company: Building2,
  rocket: Rocket,
  chart: BarChart3,
  message: MessageSquare,
  shield: Shield,
  award: Award,
  briefcase: Briefcase,
  idea: Lightbulb,
  handshake: HeartHandshake
}

export const actionIcons = {
  next: ArrowRight,
  calendar: Calendar,
  email: Mail,
  phone: Phone,
  website: Globe,
  star: Star,
  thumbsUp: ThumbsUp
}

export const statusIcons = {
  success: CheckCircle2,
  warning: AlertCircle,
  trending: TrendingUp,
  decline: TrendingDown,
  fast: Zap
}

// ============================================
// CUSTOM SVG ICONS (Inline for performance)
// ============================================

export const customIcons = {
  // Logo ARCO (simplified)
  arcoLogo: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path 
        d="M16 4L4 12L16 20L28 12L16 4Z" 
        fill="currentColor" 
        opacity="0.2"
      />
      <path 
        d="M4 20L16 28L28 20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  ),
  
  // Consultoria badge
  badge: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.1"/>
      <path 
        d="M6 10L9 13L14 7" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  ),
  
  // AI sparkle
  aiSparkle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" 
        fill="currentColor"
      />
      <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  
  // Payment security
  securePayment: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="15" r="2" fill="currentColor"/>
    </svg>
  )
}

// ============================================
// PLACEHOLDER GENERATORS
// ============================================

export const generateAvatar = (name: string, size: number = 100): string => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=3B82F6&color=fff&bold=true`
}

export const generatePlaceholder = (width: number, height: number, text?: string): string => {
  return `https://placehold.co/${width}x${height}/EEE/999?text=${encodeURIComponent(text || `${width}×${height}`)}`
}

// ============================================
// ICON MAPPING BY CONSULTORIA TYPE
// ============================================

export const getConsultoriaIcon = (slug: string) => {
  const iconMap: Record<string, any> = {
    'diagnostico-estrategico': Search,
    'consultoria-tecnica': Code,
    'estrategia-trafego': Target,
    'planejamento-trafego': Target,
    'mentoria-executiva': Crown,
    'growth-hacking': TrendingUp,
    'branding': Sparkles
  }
  
  return iconMap[slug] || Briefcase
}

export const getConsultoriaColor = (slug: string): string => {
  const colorMap: Record<string, string> = {
    'diagnostico-estrategico': '#3B82F6', // Blue
    'consultoria-tecnica': '#10B981',     // Green
    'estrategia-trafego': '#F59E0B',      // Orange
    'planejamento-trafego': '#F59E0B',
    'mentoria-executiva': '#8B5CF6',      // Purple
    'growth-hacking': '#EC4899',          // Pink
    'branding': '#6366F1'                 // Indigo
  }
  
  return colorMap[slug] || '#64748B' // Gray fallback
}

// ============================================
// MOCK DATA FOR DEVELOPMENT
// ============================================

// Testimonials removidos - sem dados reais ainda
// Substituídos por "friction reducers" na UI (tangible deliverables)
export const mockTestimonials: any[] = []


export default {
  heroImages,
  clientAvatars,
  consultoriaIcons,
  featureIcons,
  actionIcons,
  statusIcons,
  customIcons,
  generateAvatar,
  generatePlaceholder,
  getConsultoriaIcon,
  getConsultoriaColor,
  mockTestimonials,
}
