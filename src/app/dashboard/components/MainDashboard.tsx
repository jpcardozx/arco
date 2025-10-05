/**
 * Main Dashboard - Role-Based Routing
 * Renderiza dashboard específico baseado no role do usuário
 */

'use client'

import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { getDashboardView } from '@/lib/auth/rbac'
import { LoadingSpinner } from '@/components/ui/enhanced-loading'

// Role-specific dashboards
import { AdminDashboard } from './AdminDashboard'
import { UserDashboard } from './UserDashboard'
import { ClientDashboard } from './ClientDashboard'

export default function MainDashboard() {
  const { user, loading: userLoading } = useCurrentUser()

  if (userLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <p className="text-slate-400">Usuário não autenticado</p>
      </div>
    )
  }

  // Determine which dashboard to show based on user role
  const dashboardView = getDashboardView((user as any).role)

  // Render appropriate dashboard
  const userName = user.full_name || user.email?.split('@')[0] || 'Usuário'
  
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
