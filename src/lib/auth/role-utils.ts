/**
 * Role Utilities
 * Helpers para trabalhar com roles e permissões
 */

import type { UserRole } from './rbac'
import { ROLES, hasPermission, canAccessRoute, getDashboardView } from './rbac'

/**
 * PARETO FIX: Export isAdmin standalone function
 */
export function isAdmin(user: any): boolean {
  return user?.role === 'admin'
}

/**
 * Hook para verificar role do usuário
 */
export function useUserRole(userRole?: UserRole | null) {
  const role = userRole || 'client' // Default to client if no role

  return {
    role,
    isAdmin: role === 'admin',
    isUser: role === 'user',
    isClient: role === 'client',
    can: (resource: string, action: 'create' | 'read' | 'update' | 'delete' | 'manage') =>
      hasPermission(role, resource, action),
    canAccess: (route: string) => canAccessRoute(role, route),
    dashboardView: getDashboardView(role),
    config: ROLES[role]
  }
}

/**
 * Retorna label do role
 */
export function getRoleLabel(role: UserRole): string {
  return ROLES[role].label
}

/**
 * Retorna cor do badge do role
 */
export function getRoleBadgeColor(role: UserRole): string {
  const colors = {
    admin: 'bg-red-500/10 text-red-500 border-red-500/30',
    user: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    client: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
  }
  return colors[role]
}

/**
 * Hierarchy levels para comparação
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  user: 2,
  client: 1
}

/**
 * Verifica se role1 tem nível maior que role2
 */
export function hasHigherRole(role1: UserRole, role2: UserRole): boolean {
  return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2]
}
