
'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { UserMenu } from '@/components/dashboard/user-menu'
import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { getSupabaseClient } from '@/lib/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useCurrentUser()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const supabase = getSupabaseClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    redirect('/login')
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    redirect('/login')
  }

  // Get tier from user profile (default to free if not set)
  const tier = (user as any).tier || 'free'

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 
          lg:relative lg:z-auto
          ${sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
          transition-transform duration-300 ease-in-out
        `}
      >
        <Sidebar
          tier={tier}
          collapsed={false}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-600" />
            </Button>

            {/* User Menu */}
            <UserMenu user={{ ...user, tier } as any} onSignOut={handleSignOut} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}