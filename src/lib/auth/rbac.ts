/**
 * RBAC - Role-Based Access Control
 * Sistema de controle de acesso por roles
 */

export type UserRole = 'admin' | 'user' | 'client'

export interface Permission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete' | 'manage')[]
}

export interface RoleConfig {
  name: string
  label: string
  permissions: Permission[]
  dashboardView: 'admin' | 'user' | 'client'
  canAccess: string[] // Lista de rotas permitidas
}

/**
 * Configuração de Roles e Permissões
 */
export const ROLES: Record<UserRole, RoleConfig> = {
  admin: {
    name: 'admin',
    label: 'Administrador',
    dashboardView: 'admin',
    permissions: [
      { resource: 'clients', actions: ['create', 'read', 'update', 'delete', 'manage'] },
      { resource: 'leads', actions: ['create', 'read', 'update', 'delete', 'manage'] },
      { resource: 'tasks', actions: ['create', 'read', 'update', 'delete', 'manage'] },
      { resource: 'users', actions: ['create', 'read', 'update', 'delete', 'manage'] },
      { resource: 'analytics', actions: ['read', 'manage'] },
      { resource: 'settings', actions: ['read', 'update', 'manage'] },
      { resource: 'campaigns', actions: ['create', 'read', 'update', 'delete', 'manage'] },
      { resource: 'whatsapp', actions: ['create', 'read', 'update', 'delete', 'manage'] },
      { resource: 'finance', actions: ['create', 'read', 'update', 'manage'] },
    ],
    canAccess: [
      '/dashboard',
      '/dashboard/clients',
      '/dashboard/leads',
      '/dashboard/tasks',
      '/dashboard/users',
      '/dashboard/analytics',
      '/dashboard/settings',
      '/dashboard/campaigns',
      '/dashboard/whatsapp',
      '/dashboard/finance',
      '/dashboard/appointments',
      '/dashboard/agenda',
      '/dashboard/documents',
      '/dashboard/cloud',
      '/dashboard/mail',
      '/dashboard/calculator',
      '/dashboard/funil',
      '/dashboard/aliquotas',
      '/dashboard/commissions',
    ]
  },

  user: {
    name: 'user',
    label: 'Usuário',
    dashboardView: 'user',
    permissions: [
      { resource: 'clients', actions: ['read', 'update'] },
      { resource: 'leads', actions: ['create', 'read', 'update'] },
      { resource: 'tasks', actions: ['create', 'read', 'update'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'appointments', actions: ['create', 'read', 'update'] },
      { resource: 'documents', actions: ['read'] },
    ],
    canAccess: [
      '/dashboard',
      '/dashboard/clients',
      '/dashboard/leads',
      '/dashboard/tasks',
      '/dashboard/appointments',
      '/dashboard/agenda',
      '/dashboard/documents',
      '/dashboard/calculator',
      '/dashboard/settings',
    ]
  },

  client: {
    name: 'client',
    label: 'Cliente',
    dashboardView: 'client',
    permissions: [
      { resource: 'projects', actions: ['read'] },
      { resource: 'documents', actions: ['read'] },
      { resource: 'appointments', actions: ['read'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'settings', actions: ['read', 'update'] }, // Apenas próprias configs
    ],
    canAccess: [
      '/dashboard',
      '/dashboard/analytics', // Suas métricas
      '/dashboard/documents', // Seus documentos
      '/dashboard/appointments', // Seus agendamentos
      '/dashboard/settings', // Configurações pessoais
    ]
  }
}

/**
 * Verifica se usuário tem permissão para acessar recurso
 */
export function hasPermission(
  userRole: UserRole,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
): boolean {
  const role = ROLES[userRole]
  const permission = role.permissions.find(p => p.resource === resource)

  if (!permission) return false

  return permission.actions.includes(action) || permission.actions.includes('manage')
}

/**
 * Verifica se usuário pode acessar rota
 */
export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const role = ROLES[userRole]

  // Exact match
  if (role.canAccess.includes(route)) return true

  // Partial match (para rotas dinâmicas)
  return role.canAccess.some(allowedRoute =>
    route.startsWith(allowedRoute)
  )
}

/**
 * Retorna dashboard view baseado no role
 */
export function getDashboardView(userRole: UserRole): 'admin' | 'user' | 'client' {
  return ROLES[userRole].dashboardView
}

/**
 * Filtra menu items baseado em permissões
 */
export function getAuthorizedMenuItems(userRole: UserRole) {
  const role = ROLES[userRole]

  return {
    canViewClients: hasPermission(userRole, 'clients', 'read'),
    canViewLeads: hasPermission(userRole, 'leads', 'read'),
    canViewTasks: hasPermission(userRole, 'tasks', 'read'),
    canViewUsers: hasPermission(userRole, 'users', 'read'),
    canViewAnalytics: hasPermission(userRole, 'analytics', 'read'),
    canViewCampaigns: hasPermission(userRole, 'campaigns', 'read'),
    canViewWhatsApp: hasPermission(userRole, 'whatsapp', 'read'),
    canViewFinance: hasPermission(userRole, 'finance', 'read'),
    canManageSettings: hasPermission(userRole, 'settings', 'manage'),
  }
}
