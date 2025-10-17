/**
 * Quiz Interativo - Tipos e Interfaces
 * 
 * Sistema de qualificação de leads através de diagnóstico estratégico
 */

export type QuizQuestionType = 
  | 'single-choice'
  | 'multiple-choice'
  | 'scale'
  | 'text'

export type BusinessVertical =
  | 'performance'
  | 'marketing'
  | 'ecommerce'
  | 'tech-stack'
  | 'analytics'
  | 'security'
  | 'growth'

export type LeadScore = 'cold' | 'warm' | 'hot' | 'qualified'

export interface QuizOption {
  id: string
  label: string
  value: number // Pontos de qualificação (0-10)
  verticals: BusinessVertical[] // Verticais relacionadas
  nextQuestion?: string // Lógica condicional
}

export interface QuizQuestion {
  id: string
  category: 'context' | 'pain-points' | 'resources' | 'goals' | 'urgency'
  title: string
  description?: string
  type: QuizQuestionType
  required: boolean
  options?: QuizOption[]
  placeholder?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface QuizSection {
  id: string
  title: string
  description: string
  icon: string
  questions: QuizQuestion[]
}

export interface QuizResponse {
  questionId: string
  value: string | string[] | number
  timestamp: Date
}

export interface LeadProfile {
  // Informações básicas
  name: string
  email: string
  company?: string
  role?: string
  phone?: string
  website?: string

  // Contexto do negócio
  industry?: string
  companySize?: string
  monthlyRevenue?: string
  
  // Dores e necessidades
  mainChallenges: string[]
  priorityGoals: string[]
  
  // Maturidade digital
  hasWebsite: boolean
  websiteAge?: string
  hasCRM: boolean
  hasAnalytics: boolean
  hasAds: boolean
  adsMonthlyBudget?: string
  
  // Verticais identificadas
  verticals: BusinessVertical[]
  
  // Qualificação
  score: number // 0-100
  leadScore: LeadScore
  urgencyLevel: 'low' | 'medium' | 'high'
  
  // Metadata
  quizResponses: QuizResponse[]
  completedAt: Date
  source: string
}

export interface QuizResult {
  profile: LeadProfile
  recommendations: {
    vertical: BusinessVertical
    priority: 'high' | 'medium' | 'low'
    title: string
    description: string
    estimatedImpact: string
    services: string[]
  }[]
  nextSteps: {
    title: string
    description: string
    cta: string
    href: string
  }[]
}

export interface QuizState {
  currentSection: number
  currentQuestion: number
  responses: QuizResponse[]
  profile: Partial<LeadProfile>
  isComplete: boolean
  startedAt: Date
  completedAt?: Date
}
