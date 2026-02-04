/**
 * Supabase Auth Helpers
 * Utilities for authentication flow and session management
 */

import { createSupabaseBrowserClient } from './client'
import type { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  role?: string
  full_name?: string
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends SignInCredentials {
  full_name?: string
  metadata?: Record<string, unknown>
}

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials) {
  const supabase = createSupabaseBrowserClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    console.error('[Auth] Sign in error:', error)
    throw error
  }

  return data
}

/**
 * Sign up new user
 */
export async function signUp(credentials: SignUpCredentials) {
  const supabase = createSupabaseBrowserClient()

  // Validate email domain (disposable check)
  const { isDisposableEmail } = await import('@/lib/email/disposable-domains')

  if (isDisposableEmail(credentials.email)) {
    throw new Error('Emails temporários não são permitidos. Use um email permanente.')
  }

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        full_name: credentials.full_name,
        ...credentials.metadata,
      },
      emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
    },
  })

  if (error) {
    console.error('[Auth] Sign up error:', error)
    throw error
  }

  return data
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = createSupabaseBrowserClient()
  
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('[Auth] Sign out error:', error)
    throw error
  }
}

/**
 * Get current session
 */
export async function getSession() {
  const supabase = createSupabaseBrowserClient()
  
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('[Auth] Get session error:', error)
    throw error
  }

  return data.session
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createSupabaseBrowserClient()
  
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('[Auth] Get user error:', error)
    return null
  }

  return data.user as AuthUser
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const supabase = createSupabaseBrowserClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/reset-password` : undefined,
  })

  if (error) {
    console.error('[Auth] Password reset error:', error)
    throw error
  }
}

/**
 * Update password (for reset flow)
 */
export async function updatePassword(newPassword: string) {
  const supabase = createSupabaseBrowserClient()
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    console.error('[Auth] Update password error:', error)
    throw error
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const supabase = createSupabaseBrowserClient()
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user as AuthUser || null)
    }
  )

  return subscription
}
