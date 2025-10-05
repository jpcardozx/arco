/**
 * Auth Middleware
 * Middleware para validação de autenticação em API routes
 */

import { NextRequest } from 'next/server'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { unauthorizedResponse, forbiddenResponse } from './api-response'
import type { UserRole } from '@/lib/auth/types'
import { hasPermission } from '@/lib/auth/rbac'

export interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
  name?: string
}

/**
 * Valida se o usuário está autenticado
 */
export async function requireAuth(req: NextRequest): Promise<AuthenticatedUser | Response> {
  try {
    const supabase = createSupabaseBrowserClient()

    // Tentar pegar token do header
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return unauthorizedResponse('Token de autenticação não fornecido')
    }

    const token = authHeader.substring(7)

    // Validar token com Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return unauthorizedResponse('Token inválido ou expirado')
    }

    // Retornar usuário autenticado
    return {
      id: user.id,
      email: user.email || '',
      role: (user.user_metadata?.role || 'client') as UserRole,
      name: user.user_metadata?.name
    }
  } catch (error) {
    console.error('[Auth Middleware] Error:', error)
    return unauthorizedResponse('Erro ao validar autenticação')
  }
}

/**
 * Valida se o usuário tem permissão para acessar recurso
 */
export function requirePermission(
  user: AuthenticatedUser,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
): Response | null {
  const allowed = hasPermission(user.role, resource, action)

  if (!allowed) {
    return forbiddenResponse(`Você não tem permissão para ${action} em ${resource}`)
  }

  return null
}

/**
 * Valida se o usuário tem role específico
 */
export function requireRole(user: AuthenticatedUser, allowedRoles: UserRole[]): Response | null {
  if (!allowedRoles.includes(user.role)) {
    return forbiddenResponse('Acesso restrito para seu tipo de usuário')
  }

  return null
}

/**
 * Helper para criar API route protegida
 */
export async function withAuth<T = any>(
  req: NextRequest,
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<Response>
): Promise<Response> {
  const authResult = await requireAuth(req)

  // Se retornou Response, é um erro
  if (authResult instanceof Response) {
    return authResult
  }

  // Usuário autenticado, executar handler
  return handler(req, authResult)
}

/**
 * Helper para criar API route com validação de permissão
 */
export async function withPermission(
  req: NextRequest,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage',
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<Response>
): Promise<Response> {
  const authResult = await requireAuth(req)

  if (authResult instanceof Response) {
    return authResult
  }

  const permissionCheck = requirePermission(authResult, resource, action)
  if (permissionCheck) {
    return permissionCheck
  }

  return handler(req, authResult)
}

/**
 * Helper para criar API route com validação de role
 */
export async function withRole(
  req: NextRequest,
  allowedRoles: UserRole[],
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<Response>
): Promise<Response> {
  const authResult = await requireAuth(req)

  if (authResult instanceof Response) {
    return authResult
  }

  const roleCheck = requireRole(authResult, allowedRoles)
  if (roleCheck) {
    return roleCheck
  }

  return handler(req, authResult)
}
