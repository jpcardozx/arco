'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SidebarNavigation } from './sidebar-navigation'
import { useEffect } from 'react'

interface SidebarProps {
  tier: 'free' | 'paid' | 'admin'
  collapsed: boolean
  onToggle: () => void
  onClose?: () => void
}

export function SidebarRefactored({ tier, collapsed, onToggle, onClose }: SidebarProps) {
  // Persist collapse state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed')
    if (savedState !== null && window.innerWidth >= 1024) {
      const isCollapsed = savedState === 'true'
      if (isCollapsed !== collapsed) {
        onToggle()
      }
    }
  }, [])

  const handleToggle = () => {
    const newState = !collapsed
    localStorage.setItem('sidebar-collapsed', String(newState))
    onToggle()
  }

  return (
    <aside
      className={cn(
        'relative flex h-full flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        'lg:h-screen'
      )}
      onClick={(e) => {
        // Close on mobile when clicking navigation items
        if (window.innerWidth < 1024 && e.target instanceof HTMLAnchorElement) {
          onClose?.()
        }
      }}
    >
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">ARCO</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className={cn(
            'h-8 w-8 transition-transform hover:bg-accent',
            collapsed && 'mx-auto'
          )}
          aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              collapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <SidebarNavigation tier={tier} collapsed={collapsed} />
    </aside>
  )
}
