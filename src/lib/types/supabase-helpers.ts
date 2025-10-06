/**
 * Supabase Type Helpers
 * Simplifica o uso dos tipos gerados automaticamente
 * 
 * Uso:
 * import type { Client, TypedSupabaseClient } from '@/lib/types/supabase-helpers'
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// ============================================
// TABELAS - ROW TYPES (leitura)
// ============================================

export type Lead = Database['public']['Tables']['leads']['Row']

// ============================================
// INSERT TYPES (criação)
// ============================================

export type LeadInsert = Database['public']['Tables']['leads']['Insert']

// ============================================
// UPDATE TYPES (atualização)
// ============================================

export type LeadUpdate = Database['public']['Tables']['leads']['Update']

// ============================================
// SUPABASE CLIENT TIPADO
// ============================================

/**
 * Cliente Supabase com tipos completos do Database
 * Fornece autocomplete e validação de tipos em queries
 * 
 * Uso:
 * async function getClients(supabase: TypedSupabaseClient) {
 *   const { data } = await supabase.from('clients').select('*')
 *   // data agora tem autocomplete completo! ✅
 * }
 */
export type TypedSupabaseClient = SupabaseClient<Database>

// ============================================
// ENUMS & STATUS TYPES
// ============================================

// Extrair enums do schema gerado (se existirem)
export type LeadStatus = Lead['status']

// Se forem strings literais, adicionar fallback
export type Priority = 'low' | 'medium' | 'high'

// ============================================
// AUTH & USER TYPES
// ============================================

export interface User {
  id: string;
  name: string;
  full_name?: string;
  email: string;
  role: string;
  avatar?: string;
  company?: any;
  phone?: any;
  created_at?: string;
}

export interface UseCurrentUserReturn {
  user: User | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  isAuthenticated: boolean
  updateUser: (updates: Partial<User>) => Promise<void>
  signOut: () => Promise<void>
}

export interface useUpdateLead {
  (leadId: string, data: Partial<Lead>): Promise<void>
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Tipo para queries com select específico
 * Uso: SelectLead<'id' | 'full_name' | 'email'>
 */
export type SelectLead<T extends keyof Lead> = Pick<Lead, T>

/**
 * Tipo para campos opcionais em updates
 */
export type PartialLead = Partial<Lead>

/**
 * Tipo sem campos de sistema (id, timestamps)
 */
export type LeadInput = Omit<Lead, 'id' | 'created_at' | 'updated_at'>

/**
 * Lead com campo 'name' para compatibilidade com código legado
 * Mapeia full_name -> name para uso em componentes
 */
export type LeadWithName = Omit<Lead, 'full_name'> & { name: string | null }

// ============================================
// TYPE GUARDS
// ============================================

export function isLead(obj: any): obj is Lead {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string'
  )
}

// ============================================
// COMPATIBILIDADE COM CÓDIGO EXISTENTE
// ============================================

/**
 * Aliases para manter compatibilidade com código antigo
 * Permite migração gradual sem quebrar tudo de uma vez
 */

// Tipos legados (deprecated - use os principais acima)
/** @deprecated Use Lead from supabase-helpers */
export type LegacyLead = Lead

// ============================================
// RE-EXPORTS ÚTEIS
// ============================================

// Re-exportar o tipo Database para casos avançados
export type { Database }

// Re-exportar Json type do Supabase
export type Json = Record<string, any> | null

// ============================================
// EXEMPLO DE USO
// ============================================

/**
 * EXEMPLO: Como usar esses tipos
 *
 * // 1. Importar
 * import type { Lead, TypedSupabaseClient } from '@/lib/types/supabase-helpers'
 *
 * // 2. Usar em funções
 * async function getLead(supabase: TypedSupabaseClient, id: string): Promise<Lead | null> {
 *   const { data } = await supabase
 *     .from('leads')     // ✅ Autocomplete de tabelas
 *     .select('*')       // ✅ Autocomplete de campos
 *     .eq('id', id)      // ✅ Validação de tipos
 *     .single()
 *
 *   return data
 * }
 *
 * // 3. Usar em componentes
 * interface LeadCardProps {
 *   lead: Lead  // ✅ Tipo gerado automaticamente
 * }
 *
 * // 4. Criar novos registros
 * const newLead: LeadInsert = {
 *   full_name: 'João Silva',
 *   email: 'joao@example.com',
 *   // ✅ TypeScript valida todos os campos obrigatórios
 * }
 */
