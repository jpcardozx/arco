/**
 * Auth Callback Handler
 * Handles email confirmation redirects from Supabase
 */

import { createSupabaseServer } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createSupabaseServer()

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[Auth Callback] Error:', error)
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Falha na confirmação de email')}`, requestUrl.origin)
      )
    }

    // Successful confirmation
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  }

  // No code provided
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
