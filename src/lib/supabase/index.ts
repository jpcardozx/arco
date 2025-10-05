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

// Service exports
export { ClientsService } from './clients-service';
export { TasksService } from './tasks-service';

// Type exports
export type {
  Client,
  ClientInput,
  ClientUpdate,
  Task,
  TaskInput,
  TaskUpdate,
  User,
  UseCurrentUserReturn,
} from '@/lib/types/supabase-helpers';
