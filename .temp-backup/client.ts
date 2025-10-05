import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

interface CookieAdapter {
	get: (name: string) => string | undefined
	set: (name: string, value: string, options: CookieOptions) => void
	remove: (name: string, options: CookieOptions) => void
}

const SUPABASE_URL = (() => {
	const value = process.env.NEXT_PUBLIC_SUPABASE_URL
	if (!value) {
		throw new Error('NEXT_PUBLIC_SUPABASE_URL não foi definido nas variáveis de ambiente.')
	}
	return value
})()

let adminClient: SupabaseClient | undefined

/**
 * Cliente de administração (service role).
 * Use apenas em rotas server-side seguras (API routes, edge functions).
 */
export function getSupabaseAdminClient(): SupabaseClient {
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

	if (!serviceRoleKey) {
		throw new Error('SUPABASE_SERVICE_ROLE_KEY não foi definido nas variáveis de ambiente.')
	}

	if (!adminClient) {
		adminClient = createClient(SUPABASE_URL, serviceRoleKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false
			}
		})
	}

	return adminClient
}

/**
 * Cria cliente Supabase para uso em Server Components/Route Handlers com cookies mutáveis.
 */
export function createSupabaseServerClient(cookieAdapter: CookieAdapter): SupabaseClient {
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!anonKey) {
		throw new Error(
			'NEXT_PUBLIC_SUPABASE_ANON_KEY não foi definido. Cadastre a anon key do projeto para habilitar requisições autenticadas no servidor.'
		)
	}

		return createServerClient(SUPABASE_URL, anonKey, {
		cookies: cookieAdapter
	})
}

/**
 * Cliente Supabase para uso no browser (SSR ou client components).
 */
export function createSupabaseBrowserClient(): SupabaseClient {
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!anonKey) {
		throw new Error(
			'NEXT_PUBLIC_SUPABASE_ANON_KEY não foi definido. Cadastre a anon key do projeto para habilitar o cliente no browser.'
		)
	}

		return createBrowserClient(SUPABASE_URL, anonKey)
}

