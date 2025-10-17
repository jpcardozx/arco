'use client'

import { Button } from '@/components/ui/button'
import { Menu, Search, Command } from 'lucide-react'
import { UserMenu } from './user-menu'
import { BreadcrumbNav } from './breadcrumb-nav'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  LineChart,
  Activity,
  TrendingUp,
  Settings,
  Target,
  CheckSquare,
} from 'lucide-react'

interface DashboardHeaderProps {
  user: any
  onSignOut: () => void
  onMenuToggle: () => void
  className?: string
}

const quickActions = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Diagnóstico', href: '/dashboard/diagnostico', icon: LineChart },
  { label: 'Plano de Ação', href: '/dashboard/plano-de-acao', icon: Target },
  { label: 'Checklists', href: '/dashboard/checklist', icon: CheckSquare },
  { label: 'Saúde', href: '/dashboard/saude', icon: Activity },
  { label: 'Crescimento', href: '/dashboard/crescimento', icon: TrendingUp },
  { label: 'Configurações', href: '/dashboard/settings', icon: Settings },
]

export function DashboardHeader({
  user,
  onSignOut,
  onMenuToggle,
  className,
}: DashboardHeaderProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6',
          className
        )}
      >
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Breadcrumbs */}
        <div className="hidden md:block">
          <BreadcrumbNav />
        </div>

        <div className="flex-1" />

        {/* Command Palette Trigger */}
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Buscar...</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* User Menu */}
        <UserMenu user={user} onSignOut={onSignOut} />
      </header>

      {/* Command Palette Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite um comando ou busca..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Navegação Rápida">
            {quickActions.map((action) => (
              <CommandItem
                key={action.href}
                onSelect={() => {
                  router.push(action.href as any)
                  setOpen(false)
                }}
              >
                <action.icon className="mr-2 h-4 w-4" />
                <span>{action.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
