'use client';

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
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Durante o build, retorna um mock se as variáveis não estiverem disponíveis
  if (!supabaseUrl || !supabaseKey) {
    if (typeof window === 'undefined') {
      // SSR/Build time: retorna um mock seguro
      console.warn('[Supabase] Variáveis de ambiente não disponíveis durante o build. Usando mock.');
      return createSupabaseClient<Database>(
        'https://placeholder.supabase.co',
        'placeholder-anon-key'
      );
    }
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY devem estar definidas'
    );
  }

  if (typeof window === 'undefined') {
    // SSR fallback
    return createSupabaseClient<Database>(supabaseUrl, supabaseKey);
  }

  if (browserClient) {
    return browserClient;
  }

  browserClient = createBrowserClient<Database>(supabaseUrl, supabaseKey);

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

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variáveis de ambiente Supabase não configuradas');
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
