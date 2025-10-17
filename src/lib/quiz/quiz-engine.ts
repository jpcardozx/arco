import {
  QuizResponse,
  LeadProfile,
  LeadScore,
  BusinessVertical,
  QuizResult,
} from '@/types/quiz'
import { QUIZ_SECTIONS, VERTICAL_RECOMMENDATIONS } from './quiz-config'

/**
 * Quiz Engine - Lógica de processamento e qualificação
 */

export class QuizEngine {
  /**
   * Calcula score de qualificação do lead (0-100)
   */
  static calculateLeadScore(responses: QuizResponse[]): number {
    let totalScore = 0
    let maxPossibleScore = 0

    for (const response of responses) {
      const question = this.findQuestion(response.questionId)
      if (!question || !question.options) continue

      if (Array.isArray(response.value)) {
        // Multiple choice - soma valores
        for (const val of response.value) {
          const option = question.options.find(opt => opt.id === val)
          if (option) {
            totalScore += option.value
            maxPossibleScore += 10 // Máximo por opção
          }
        }
      } else {
        // Single choice
        const option = question.options.find(opt => opt.id === response.value)
        if (option) {
          totalScore += option.value
          maxPossibleScore += 10
        }
      }
    }

    return maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0
  }

  /**
   * Classifica lead em categorias
   */
  static classifyLead(score: number): LeadScore {
    if (score >= 80) return 'qualified'
    if (score >= 60) return 'hot'
    if (score >= 40) return 'warm'
    return 'cold'
  }

  /**
   * Identifica verticais prioritárias
   */
  static identifyVerticals(responses: QuizResponse[]): BusinessVertical[] {
    const verticalScores = new Map<BusinessVertical, number>()

    for (const response of responses) {
      const question = this.findQuestion(response.questionId)
      if (!question || !question.options) continue

      const selectedOptions = Array.isArray(response.value)
        ? question.options.filter(opt => (response.value as string[]).includes(opt.id))
        : question.options.filter(opt => opt.id === response.value)

      for (const option of selectedOptions) {
        for (const vertical of option.verticals) {
          verticalScores.set(vertical, (verticalScores.get(vertical) || 0) + option.value)
        }
      }
    }

    // Ordena por score e retorna top 3-5
    return Array.from(verticalScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([vertical]) => vertical)
  }

  /**
   * Extrai informações do perfil das respostas
   */
  static buildLeadProfile(responses: QuizResponse[], contactInfo: Partial<LeadProfile>): LeadProfile {
    const score = this.calculateLeadScore(responses)
    const verticals = this.identifyVerticals(responses)
    const leadScore = this.classifyLead(score)

    // Extrai informações específicas
    const mainChallenges = this.extractMultipleChoice(responses, 'main-challenges')
    const priorityGoals = this.extractMultipleChoice(responses, 'priority-goals')
    const urgencyResponse = this.extractSingleChoice(responses, 'urgency-level')
    const budgetResponse = this.extractSingleChoice(responses, 'budget-range')

    const urgencyLevel = urgencyResponse?.includes('immediate') || urgencyResponse?.includes('high')
      ? 'high'
      : urgencyResponse?.includes('medium')
      ? 'medium'
      : 'low'

    return {
      // Contact info
      name: contactInfo.name || '',
      email: contactInfo.email || '',
      company: contactInfo.company,
      role: contactInfo.role,
      phone: contactInfo.phone,
      website: contactInfo.website,

      // Context
      companySize: this.extractSingleChoice(responses, 'company-size'),
      monthlyRevenue: this.extractSingleChoice(responses, 'monthly-revenue'),
      industry: contactInfo.industry,

      // Challenges & Goals
      mainChallenges,
      priorityGoals,

      // Digital maturity
      hasWebsite: this.extractSingleChoice(responses, 'has-website') !== 'no-website',
      websiteAge: this.extractSingleChoice(responses, 'has-website'),
      hasCRM: this.extractSingleChoice(responses, 'has-crm') !== 'crm-no',
      hasAnalytics: this.extractSingleChoice(responses, 'has-analytics') !== 'analytics-no',
      hasAds: this.extractSingleChoice(responses, 'ads-investment') !== 'ads-none',
      adsMonthlyBudget: this.extractSingleChoice(responses, 'ads-investment'),

      // Qualification
      verticals,
      score,
      leadScore,
      urgencyLevel,

      // Metadata
      quizResponses: responses,
      completedAt: new Date(),
      source: 'quiz-diagnostico-estrategico',
    }
  }

  /**
   * Gera recomendações personalizadas
   */
  static generateRecommendations(profile: LeadProfile): QuizResult['recommendations'] {
    const recommendations: QuizResult['recommendations'] = []

    // Mapeia verticais identificadas
    for (const vertical of profile.verticals) {
      const config = VERTICAL_RECOMMENDATIONS[vertical]
      if (!config) continue

      // Define prioridade baseada no score e urgência
      let priority: 'high' | 'medium' | 'low' = 'medium'
      
      if (profile.urgencyLevel === 'high' && profile.score >= 70) {
        priority = 'high'
      } else if (profile.urgencyLevel === 'low' || profile.score < 40) {
        priority = 'low'
      }

      recommendations.push({
        vertical,
        priority,
        title: config.title,
        description: config.description,
        estimatedImpact: config.estimatedImpact,
        services: config.services,
      })
    }

    // Ordena por prioridade
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }

  /**
   * Define próximos passos baseados no perfil
   */
  static defineNextSteps(profile: LeadProfile): QuizResult['nextSteps'] {
    const steps: QuizResult['nextSteps'] = []

    // Lead Qualificado + Alta urgência = Call imediata
    if (profile.leadScore === 'qualified' && profile.urgencyLevel === 'high') {
      steps.push({
        title: 'Consultoria Estratégica Imediata',
        description: 'Agende uma sessão de 60 minutos para análise detalhada e plano de ação personalizado.',
        cta: 'Agendar Consultoria',
        href: '/agendamentos',
      })
    }

    // Hot Lead = Call de qualificação
    if (profile.leadScore === 'hot' || profile.leadScore === 'qualified') {
      steps.push({
        title: 'Call de Qualificação (15min)',
        description: 'Conversa rápida para entender suas necessidades e alinhar expectativas.',
        cta: 'Agendar Call',
        href: '/agendamentos?tipo=qualificacao',
      })
    }

    // Warm/Cold = Nurturing
    if (profile.leadScore === 'warm' || profile.leadScore === 'cold') {
      steps.push({
        title: 'Receba Conteúdo Personalizado',
        description: 'Materiais educativos e cases de sucesso relevantes para seu estágio.',
        cta: 'Acessar Recursos',
        href: '/resources',
      })
    }

    // Sempre oferece diagnóstico completo
    steps.push({
      title: 'Diagnóstico Técnico Completo',
      description: 'Análise profunda de performance, SEO, segurança e oportunidades de otimização.',
      cta: 'Solicitar Diagnóstico',
      href: '/dashboard/diagnostico',
    })

    return steps
  }

  /**
   * Processa quiz completo e gera resultado
   */
  static processQuizResult(
    responses: QuizResponse[],
    contactInfo: Partial<LeadProfile>
  ): QuizResult {
    const profile = this.buildLeadProfile(responses, contactInfo)
    const recommendations = this.generateRecommendations(profile)
    const nextSteps = this.defineNextSteps(profile)

    return {
      profile,
      recommendations,
      nextSteps,
    }
  }

  // Helper methods
  private static findQuestion(questionId: string) {
    for (const section of QUIZ_SECTIONS) {
      const question = section.questions.find(q => q.id === questionId)
      if (question) return question
    }
    return null
  }

  private static extractSingleChoice(responses: QuizResponse[], questionId: string): string | undefined {
    const response = responses.find(r => r.questionId === questionId)
    return response && typeof response.value === 'string' ? response.value : undefined
  }

  private static extractMultipleChoice(responses: QuizResponse[], questionId: string): string[] {
    const response = responses.find(r => r.questionId === questionId)
    return response && Array.isArray(response.value) ? response.value : []
  }
}
