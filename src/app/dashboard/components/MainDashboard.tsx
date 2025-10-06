/**
 * Main Dashboard - Role-Based Routing
 * Renderiza dashboard específico baseado no role do usuário
 */

'use client'

import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { getDashboardView } from '@/lib/auth/rbac'
import { DashboardSkeleton } from '@/components/ui/enhanced-loading'

// Role-specific dashboards
import { AdminDashboard } from './AdminDashboard'
import { UserDashboard } from './UserDashboard'
import { ClientDashboard } from './ClientDashboard'

export default function MainDashboard() {
  const { user, loading: userLoading } = useCurrentUser()

  if (userLoading) {
    return <DashboardSkeleton />
  }

  if (!user) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <p className="text-slate-400">Usuário não autenticado</p>
      </div>
    )
  }

  // Determine which dashboard to show based on user role
  // Type assertion segura - user já foi validado acima
  type UserWithRole = { role?: 'admin' | 'user' | 'client' }
  const userRole = (user as UserWithRole).role || 'client'
  const dashboardView = getDashboardView(userRole)

  // Render appropriate dashboard
  const userName = (user as { full_name?: string; email?: string }).full_name || 
                   (user as { email?: string }).email?.split('@')[0] || 
                   'Usuário'
  
  switch (dashboardView) {
    case 'admin':
      return <AdminDashboard userName={userName} />
    case 'user':
      return <UserDashboard userName={userName} />
    case 'client':
      return <ClientDashboard userName={userName} />
    default:
      return <ClientDashboard userName={userName} />
  }
}
