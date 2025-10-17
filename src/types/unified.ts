// Unified Type System - Centralizada e Consistente
// File: /src/types/unified.ts

import { Database } from './database.types'

// ==========================================
// PROBLEMA IDENTIFICADO E SOLUÇÃO
// ==========================================
/*
PROBLEMAS:
1. Tipos gerados automaticamente não cobrem relacionamentos complexos
2. Componentes fazem inferências sobre estrutura de dados
3. Falta de tipos intermediários para UI/lógica de negócio
4. Inconsistências entre schema do banco e expectativas do código

SOLUÇÃO:
- Tipos base do Supabase (gerados)
- Tipos estendidos para UI/negócio (manuais)
- Adaptadores para transformação
- Validação em runtime quando necessário
*/

// ==========================================
// TIPOS BASE (do Supabase - gerados)
// ==========================================
export type SupabaseRow<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export type SupabaseInsert<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert']

export type SupabaseUpdate<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update']

// ==========================================
// TIPOS ESTENDIDOS PARA NEGÓCIO
// ==========================================

// Client Profile - Versão estendida para UI
export interface ClientProfile extends SupabaseRow<'client_profiles'> {
  // Campos calculados/virtuais para UI (opcionais)
  display_name?: string
  contact_info?: {
    name: string
    email: string | null
    phone: string | null
  }
  business_info?: {
    type: string | null
    industry: string | null
    size: string | null
    website: string | null
  }
  project_summary?: {
    total_projects: number
    budget_range: string | null
    satisfaction_score: number | null
  }
}

// Interactive Checklist - Versão estendida com relacionamentos
export interface InteractiveChecklist extends SupabaseRow<'interactive_checklists'> {
  // Relacionamentos carregados (opcionais pois podem não vir do banco)
  checklist_items?: ChecklistItem[]
  client_profile?: ClientProfile | null

  // Campos calculados (opcionais pois são computados na UI)
  completion_stats?: {
    completed: number
    total: number
    percentage: number
  }
  time_stats?: {
    estimated_minutes: number
    actual_minutes: number | null
  }
  category_distribution?: Record<string, number>
  priority_distribution?: Record<string, number>
}

// Checklist Item - Versão estendida
export interface ChecklistItem extends SupabaseRow<'checklist_items'> {
  // Relacionamentos (opcionais)
  verifications?: ChecklistVerification[]

  // Campos calculados/normalizados (opcionais)
  status?: 'pending' | 'completed' | 'verified' | 'failed'
  time_info?: {
    estimated: number | null
    actual: number | null
    created: string
    completed: string | null
  }
}

// Other extended types
export interface ChecklistVerification extends SupabaseRow<'checklist_verifications'> {
  verification_status: 'pending' | 'passed' | 'failed' | 'verified'
}

export interface ClientInteraction extends SupabaseRow<'client_interactions'> {
  formatted_date: string
  interaction_summary: string
}

// ==========================================
// TIPOS PARA DASHBOARD/ANALYTICS
// ==========================================
export interface DashboardStats {
  clients: {
    total: number
    active: number
    new_this_month: number
    growth_rate: number
  }
  checklists: {
    total: number
    active: number
    completed: number
    average_completion_rate: number
  }
  performance: {
    average_completion_time: number
    most_common_categories: Array<{ name: string; count: number }>
    priority_distribution: Record<string, number>
  }
  recent_activity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'client_created' | 'checklist_completed' | 'item_verified' | 'interaction_added'
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, any>
}

// ==========================================
// ADAPTADORES - TRANSFORMAÇÃO DE DADOS
// ==========================================

export class DataAdapters {
  
  /**
   * Converte ClientProfile do Supabase para versão estendida da UI
   */
  static adaptClientProfile(raw: SupabaseRow<'client_profiles'>): ClientProfile {
    return {
      ...raw,
      display_name: raw.primary_contact_name || 'Cliente Sem Nome',
      contact_info: {
        name: raw.primary_contact_name || '',
        email: raw.primary_contact_email,
        phone: raw.primary_contact_phone
      },
      business_info: {
        type: raw.business_type,
        industry: raw.industry,
        size: raw.company_size,
        website: raw.current_website
      },
      project_summary: {
        total_projects: raw.total_projects || 0,
        budget_range: raw.budget_range,
        satisfaction_score: raw.satisfaction_score
      }
    }
  }

  /**
   * Converte InteractiveChecklist do Supabase para versão estendida
   */
  static adaptInteractiveChecklist(
    raw: SupabaseRow<'interactive_checklists'>, 
    items: SupabaseRow<'checklist_items'>[] = [],
    clientProfile?: SupabaseRow<'client_profiles'>
  ): InteractiveChecklist {
    const completedItems = items.filter(item => item.is_completed).length
    const totalItems = items.length || raw.total_items
    
    return {
      ...raw,
      checklist_items: items.map(item => this.adaptChecklistItem(item)),
      client_profile: clientProfile ? this.adaptClientProfile(clientProfile) : null,
      completion_stats: {
        completed: completedItems,
        total: totalItems,
        percentage: totalItems > 0 ? (completedItems / totalItems) * 100 : 0
      },
      time_stats: {
        estimated_minutes: raw.estimated_time_minutes || 0,
        actual_minutes: raw.actual_time_minutes
      },
      category_distribution: this.calculateCategoryDistribution(items),
      priority_distribution: this.calculatePriorityDistribution(items)
    }
  }

  /**
   * Converte ChecklistItem do Supabase para versão estendida
   */
  static adaptChecklistItem(
    raw: SupabaseRow<'checklist_items'>,
    verifications: SupabaseRow<'checklist_verifications'>[] = []
  ): ChecklistItem {
    return {
      ...raw,
      verifications: verifications.map(v => ({
        ...v,
        verification_status: this.normalizeVerificationStatus(v.status)
      })),
      status: this.calculateItemStatus(raw, verifications),
      time_info: {
        estimated: raw.estimated_minutes,
        actual: raw.actual_minutes,
        created: raw.created_at,
        completed: raw.completed_at
      }
    }
  }

  // Helpers privados
  private static calculateCategoryDistribution(items: SupabaseRow<'checklist_items'>[]): Record<string, number> {
    return items.reduce((acc, item) => {
      const category = item.category || 'Sem Categoria'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  private static calculatePriorityDistribution(items: SupabaseRow<'checklist_items'>[]): Record<string, number> {
    return items.reduce((acc, item) => {
      const priority = item.priority || 'medium'
      acc[priority] = (acc[priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  private static normalizeVerificationStatus(status: string | null): 'pending' | 'passed' | 'failed' | 'verified' {
    switch (status) {
      case 'passed': return 'passed'
      case 'failed': return 'failed'
      case 'verified': return 'verified'
      default: return 'pending'
    }
  }

  private static calculateItemStatus(
    item: SupabaseRow<'checklist_items'>,
    verifications: SupabaseRow<'checklist_verifications'>[]
  ): 'pending' | 'completed' | 'verified' | 'failed' {
    if (!item.is_completed) return 'pending'
    
    const latestVerification = verifications
      .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())[0]
    
    if (!latestVerification) return 'completed'
    
    switch (latestVerification.status) {
      case 'passed':
      case 'verified':
        return 'verified'
      case 'failed':
        return 'failed'
      default:
        return 'completed'
    }
  }
}

// ==========================================
// CONSTANTES E ENUMS
// ==========================================

export const BUSINESS_TYPES = [
  'E-commerce',
  'Serviços',
  'SaaS',
  'Marketplace',
  'Blog/Conteúdo',
  'Corporativo',
  'Portfolio',
  'Landing Page',
  'Aplicativo Web',
  'Outro'
] as const

export const INDUSTRIES = [
  'Tecnologia',
  'Saúde',
  'Educação',
  'Finanças',
  'Varejo',
  'Imobiliário',
  'Alimentação',
  'Turismo',
  'Consultoria',
  'Marketing',
  'Design',
  'Outro'
] as const

export const COMPANY_SIZES = [
  'Freelancer',
  'Startup (1-10)',
  'Pequena (11-50)',
  'Média (51-200)',
  'Grande (201-1000)',
  'Corporação (1000+)'
] as const

export const BUDGET_RANGES = [
  '1000-5000',
  '5000-15000',
  '15000-50000',
  '50000+'
] as const

export const CHECKLIST_PRIORITIES = [
  { value: 'low', label: 'Baixa', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  { value: 'medium', label: 'Média', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  { value: 'high', label: 'Alta', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  { value: 'critical', label: 'Crítica', color: 'text-red-400 bg-red-500/10 border-red-500/30' }
] as const

export const CHECKLIST_CATEGORIES = [
  'Performance',
  'SEO',
  'UX',
  'Security',
  'Analytics',
  'Content',
  'Mobile',
  'Conversion',
  'General'
] as const

// ==========================================
// VALIDADORES RUNTIME
// ==========================================

export class DataValidators {
  
  static isValidClientProfile(data: any): data is ClientProfile {
    return (
      data &&
      typeof data.id === 'string' &&
      typeof data.client_id === 'string' &&
      typeof data.display_name === 'string'
    )
  }

  static isValidInteractiveChecklist(data: any): data is InteractiveChecklist {
    return (
      data &&
      typeof data.id === 'string' &&
      typeof data.title === 'string' &&
      Array.isArray(data.checklist_items) &&
      typeof data.completion_stats === 'object'
    )
  }

  static isValidChecklistItem(data: any): data is ChecklistItem {
    return (
      data &&
      typeof data.id === 'string' &&
      typeof data.title === 'string' &&
      typeof data.is_completed === 'boolean'
    )
  }
}

// ==========================================
// HOOKS DE VALIDAÇÃO PARA DESENVOLVIMENTO
// ==========================================

export const useTypeValidation = (data: any, validator: (data: any) => boolean, errorMessage: string) => {
  if (process.env.NODE_ENV === 'development') {
    if (!validator(data)) {
      console.error(`Type Validation Error: ${errorMessage}`, data)
    }
  }
}

// ==========================================
// EXPORT UNIFICADO
// ==========================================

// Types já exportados acima individualmente