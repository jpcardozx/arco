/**
 * Lead Scoring Utilities
 * 
 * Algoritmos para calcular lead score e probabilidade de conversão
 */

export interface LeadData {
  name?: string
  email?: string
  phone?: string
  company?: string
  source?: string
  interactions?: number
  created_at?: string
}

/**
 * Calcula o Lead Score baseado em múltiplos fatores
 * 
 * @param lead - Dados do lead
 * @returns Score de 0-100
 */
export function calculateLeadScore(lead: LeadData): number {
  let score = 0
  
  // Email corporativo (+20 pontos)
  if (lead.email) {
    const emailDomain = lead.email.split('@')[1]
    if (emailDomain && !['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'].includes(emailDomain)) {
      score += 20
    }
  }
  
  // Empresa informada (+15 pontos)
  if (lead.company && lead.company.trim().length > 0) {
    score += 15
  }
  
  // Telefone informado (+10 pontos)
  if (lead.phone && lead.phone.trim().length > 0) {
    score += 10
  }
  
  // Nome completo (+10 pontos)
  if (lead.name && lead.name.split(' ').length >= 2) {
    score += 10
  }
  
  // Número de interações (+5 pontos por interação, max 25)
  if (lead.interactions) {
    score += Math.min(lead.interactions * 5, 25)
  }
  
  // Lead recente (+10 pontos se criado nos últimos 7 dias)
  if (lead.created_at) {
    const createdAt = new Date(lead.created_at)
    const now = new Date()
    const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
    if (daysSinceCreation <= 7) {
      score += 10
    }
  }
  
  // Fonte orgânica (+10 pontos)
  if (lead.source === 'organic' || lead.source === 'website') {
    score += 10
  }
  
  return Math.min(100, score)
}

/**
 * Calcula a probabilidade de conversão baseada no Lead Score
 * 
 * @param score - Lead score (0-100)
 * @returns Probabilidade em % (0-100)
 */
export function calculateConversionProbability(score: number): number {
  // Conversão não-linear baseada em faixas
  if (score >= 80) return 85 + (score - 80) * 0.75      // 85-100%
  if (score >= 60) return 60 + (score - 60) * 1.25      // 60-85%
  if (score >= 40) return 30 + (score - 40) * 1.5       // 30-60%
  if (score >= 20) return 10 + (score - 20) * 1         // 10-30%
  return score * 0.5                                      // 0-10%
}

/**
 * Classifica lead por qualidade
 * 
 * @param score - Lead score
 * @returns Classificação do lead
 */
export function classifyLead(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 70) return 'hot'
  if (score >= 40) return 'warm'
  return 'cold'
}
