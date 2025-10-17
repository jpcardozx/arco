/**
 * Supabase Clients - Tipados e Centralizados
 * 
 * IMPORTANTE: Este arquivo é a única fonte de clientes Supabase no projeto.
 * Sempre use estes clientes para garantir tipagem correta.
 * 
 * - Browser Client: Para uso em componentes React (client-side)
 * - Server Client: Para uso em Server Components, API Routes, etc.
 * - Admin Client: Para operações administrativas (ignora RLS)
 */

import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// =============================================================================
// BROWSER CLIENT (Client Components)
// =============================================================================

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Cliente Supabase para componentes React (client-side)
 * Singleton com cache automático
 * 
 * @example
 * 'use client'
 * const supabase = createSupabaseBrowserClient()
 * const { data } = await supabase.from('webhook_events').select('*')
 */
export function createSupabaseBrowserClient() {
  // Use placeholder values during build if env vars are not set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder-key-for-build-time';

  if (typeof window === 'undefined') {
    // SSR fallback - use regular client for build time
    return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  if (browserClient) {
    return browserClient;
  }

  browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

  return browserClient;
}

// =============================================================================
// SERVER CLIENT (API Routes, Server Components)
// =============================================================================

/**
 * Cliente Supabase para uso em servidor (API Routes, Server Components)
 * Respeita RLS (Row Level Security)
 * 
 * @example
 * // Em API Route ou Server Component
 * const supabase = createSupabaseServerClient()
 * const { data } = await supabase.from('webhook_events').select('*')
 */
export function createSupabaseServerClient() {
  // Use placeholder values during build if env vars are not set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder-key-for-build-time';

  // Only warn in development, not during build
  if ((!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) && 
      process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.warn('⚠️ Supabase environment variables not set - using placeholder values');
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey);
}

// =============================================================================
// ADMIN CLIENT (Operações Privilegiadas - Ignora RLS)
// =============================================================================

/**
 * Cliente Supabase com privilégios administrativos
 * ATENÇÃO: Ignora todas as políticas RLS!
 * Use APENAS em operações de backend que precisam de acesso total
 * 
 * @example
 * // Apenas em webhooks, migrations, scripts admin
 * const supabase = getSupabaseAdmin()
 * const { data } = await supabase.from('webhook_events').select('*')
 */
export function getSupabaseAdmin() {
  // Use placeholder values during build if env vars are not set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NTE5MjgwMCwiZXhwIjoxOTYwNzY4ODAwfQ.placeholder-service-key-for-build-time';

  // Only warn during runtime when variables are actually missing
  if ((!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) && 
      process.env.NODE_ENV !== 'test' && typeof window !== 'undefined') {
    console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not set - admin features will be disabled');
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// =============================================================================
// TIPOS AUXILIARES EXPORTADOS
// =============================================================================

/**
 * Tipo para uma linha de qualquer tabela
 * @example type WebhookEvent = Tables<'webhook_events'>
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

/**
 * Tipo para inserção em qualquer tabela
 * @example type WebhookEventInsert = TablesInsert<'webhook_events'>
 */
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

/**
 * Tipo para atualização de qualquer tabela
 * @example type WebhookEventUpdate = TablesUpdate<'webhook_events'>
 */
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Tipos específicos mais usados (para conveniência)
export type WebhookEvent = Tables<'webhook_events'>;
export type WebhookEventInsert = TablesInsert<'webhook_events'>;

export type PaymentTransaction = Tables<'payment_transactions'>;
export type PaymentTransactionInsert = TablesInsert<'payment_transactions'>;

export type Subscription = Tables<'subscriptions'>;
export type SubscriptionInsert = TablesInsert<'subscriptions'>;

export type SubscriptionPlan = Tables<'subscription_plans'>;
export type PaymentMethod = Tables<'payment_methods'>;

// =============================================================================
// EXPORTS PARA COMPATIBILIDADE
// =============================================================================

export const getSupabaseClient = createSupabaseBrowserClient;
export const createClient = createSupabaseBrowserClient;
export default createSupabaseBrowserClient;
