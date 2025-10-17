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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, environment variables may not be available
  // Return placeholder client that won't be used during static generation
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Only throw in production when actually running in browser
      throw new Error('Supabase environment variables are not configured');
    }
    // During build/SSR, return a dummy client
    return createSupabaseClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    );
  }

  if (typeof window === 'undefined') {
    // SSR fallback
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, environment variables may not be available
  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ Supabase environment variables not configured');
    }
    // Return a dummy client for build time that won't actually be used
    return createSupabaseClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    );
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // During build time, environment variables may not be available
  // Throw error only at runtime when client is actually used
  if (!supabaseUrl || !supabaseServiceKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY não está configurado');
    }
    // During development/build, allow initialization to proceed
    console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not set - admin features will be disabled');
    // Return a dummy client for build time
    return createSupabaseClient<Database>(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseServiceKey || 'placeholder-key'
    );
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
