/**
 * Supabase Services - Central Export
 *
 * Exportação centralizada de todos os serviços Supabase
 * Facilita imports e mantém organização
 */

// Client exports
export {
  createSupabaseBrowserClient,
  getSupabaseClient,
} from './client';

// Type exports
export type {
  Lead,
  LeadInput,
  LeadUpdate,
  User,
  UseCurrentUserReturn,
} from '@/lib/types/supabase-helpers';
