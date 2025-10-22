/**
 * Supabase Client - Unified and Simplified
 * Single source of truth for all Supabase clients
 */

import { createBrowserClient } from '@supabase/ssr'
import { createServerClient as createSSRServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

// =============================================================================
// ENVIRONMENT VALIDATION
// =============================================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

// =============================================================================
// BROWSER CLIENT (Client Components)
// =============================================================================

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

/**
 * Browser client for use in Client Components
 * Singleton pattern with automatic caching
 */
export function createSupabaseBrowserClient() {
  if (typeof window === 'undefined') {
    return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
  }

  if (browserClient) {
    return browserClient
  }

  browserClient = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
  return browserClient
}

// Alias for backwards compatibility
export const getSupabaseClient = createSupabaseBrowserClient
export const createClient = createSupabaseBrowserClient

// =============================================================================
// SERVER CLIENT (Server Components & API Routes)
// =============================================================================

/**
 * Server client for use in Server Components and API Routes
 * Respects RLS (Row Level Security)
 */
export async function createSupabaseServer() {
  const cookieStore = await cookies()

  return createSSRServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore errors from Server Components
          }
        },
      },
    }
  )
}

// =============================================================================
// ADMIN CLIENT (Bypasses RLS)
// =============================================================================

/**
 * Admin client that bypasses Row Level Security
 * ⚠️ WARNING: Use ONLY in server-side code (API routes, webhooks)
 * ❌ NEVER use in client-side code
 */
export function getSupabaseAdmin() {
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client')
  }

  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Alias for backwards compatibility
export const supabaseAdmin = getSupabaseAdmin()

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type { Database }
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
