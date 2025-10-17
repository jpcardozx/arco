/**
 * Supabase Server Client
 * Server-side client for Server Actions and API Routes
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function createSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, environment variables may not be available
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ Supabase environment variables not configured in createSupabaseServer');
    }
    // Return a mock client for build time
    // This will never be actually used during static generation
    const { createClient } = await import('@supabase/supabase-js');
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    ) as any;
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
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
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Backward compatibility alias
export const createClient = createSupabaseServer

/**
 * Admin client for bypassing RLS
 * Use only for admin operations (impersonation, user management)
 */
export async function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // During build time, environment variables may not be available
  if (!supabaseUrl || !serviceRoleKey) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not configured in createSupabaseAdmin');
    }
    // Return a mock client for build time
    const { createClient } = await import('@supabase/supabase-js');
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-service-key'
    ) as any;
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseUrl,
    serviceRoleKey,
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
            // Ignore errors in Server Components
          }
        },
      },
    }
  )
}
