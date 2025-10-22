
'use client'

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { SidebarRefactored } from '@/components/dashboard/sidebar-refactored'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardUser } from '@/hooks/useDashboardUser'
import { getSupabaseClient } from '@/lib/supabase/client'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useDashboardUser()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const supabase = getSupabaseClient()

  // Log page views
  useEffect(() => {
    if (pathname) {
      console.log('[Dashboard] Page view:', pathname)
    }
  }, [pathname])

  const handleSignOut = async () => {
    try {
      console.log('[Dashboard] Logging out...')
      await supabase.auth.signOut()
      redirect('/login')
    } catch (error) {
      console.error('[Dashboard] Logout failed:', error)
    }
  }

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    console.log('[Dashboard] Mobile menu toggled')
  }

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    console.log('[Dashboard] Sidebar toggled')
  }

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block">
          <Skeleton className="h-screen w-64" />
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex flex-1 flex-col">
          <Skeleton className="h-16 w-full" />
          <div className="flex-1 space-y-6 p-6">
            <Skeleton className="h-10 w-1/3" />
            <div className="grid gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
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
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto lg:translate-x-0',
          'transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarRefactored
          tier={tier}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          user={{ ...user, tier } as any}
          onSignOut={handleSignOut}
          onMenuToggle={handleMenuToggle}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}