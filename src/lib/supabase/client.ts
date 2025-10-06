/**
 * Supabase Browser Client
 * Client-side Supabase instance for React components
 */

'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  return client
}

export function getSupabaseClient() {
  return createSupabaseBrowserClient()
}

// Default export for backward compatibility
export const createClient = createSupabaseBrowserClient
export default createSupabaseBrowserClient
