'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname } from 'next/navigation'
import { 
  ChevronLeft, 
  Sparkles,
  LineChart,
  Target,
  CheckSquare,
  LayoutDashboard,
  Activity,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  BarChart3,
  FolderKanban,
  CreditCard,
  Users,
  Plug,
  FileText,
  MessageSquare,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { SidebarNavigation } from './sidebar-navigation'
import { useEffect } from 'react'

interface SidebarProps {
  tier: 'free' | 'paid' | 'admin'
  collapsed: boolean
  onToggle: () => void
}

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive'

interface NavChild {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavLink {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | null
  badgeVariant?: BadgeVariant
  children?: NavChild[]
}

const freeLinks: NavLink[] = [
  {
    title: 'Diagnóstico',
    href: '/dashboard/diagnostico',
    icon: LineChart,
  },
  {
    title: 'Plano de Ação',
    href: '/dashboard/plano-de-acao',
    icon: Target,
  },
  {
    title: 'Checklists',
    href: '/dashboard/checklist',
    icon: CheckSquare,
    badge: 'Novo',
    badgeVariant: 'secondary',
  },
  {
    title: 'Upgrade',
    href: '/dashboard/planos',
    icon: Sparkles,
    badge: 'Pro',
    badgeVariant: 'default',
  },
]

const paidLinks: NavLink[] = [
  {
    title: 'Painel Estratégico',
    href: '/dashboard/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Checklists',
    href: '/dashboard/checklist',
    icon: CheckSquare,
    badge: 'Novo',
    badgeVariant: 'secondary',
  },
  {
    title: 'Saúde',
    href: '/dashboard/saude',
    icon: Activity,
    children: [
      { title: 'Performance', href: '/dashboard/saude?tab=performance', icon: Zap },
      { title: 'Segurança', href: '/dashboard/saude?tab=seguranca', icon: Shield },
      { title: 'Domínio', href: '/dashboard/saude?tab=dominio', icon: Globe },
    ],
  },
  {
    title: 'Crescimento',
    href: '/dashboard/crescimento',
    icon: TrendingUp,
    children: [
      { title: 'Website', href: '/dashboard/crescimento?tab=website', icon: BarChart3 },
      { title: 'Ads', href: '/dashboard/crescimento?tab=ads', icon: Target },
    ],
  },
  {
    title: 'Operações',
    href: '/dashboard/operacoes',
    icon: FolderKanban,
    children: [
      { title: 'Projetos', href: '/dashboard/operacoes?tab=projetos' },
      { title: 'Suporte', href: '/dashboard/operacoes?tab=suporte' },
      { title: 'Arquivos', href: '/dashboard/operacoes?tab=arquivos' },
    ],
  },
  {
    title: 'Faturamento',
    href: '/dashboard/faturamento',
    icon: CreditCard,
  },
  {
    title: 'Equipe',
    href: '/dashboard/equipe',
    icon: Users,
  },
  {
    title: 'Integrações',
    href: '/dashboard/integracoes',
    icon: Plug,
  },
]

const adminLinks: NavLink[] = [
  {
    title: 'Admin Overview',
    href: '/dashboard/admin/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Clientes',
    href: '/dashboard/admin/clientes',
    icon: Users,
  },
  {
    title: 'Vendas',
    href: '/dashboard/admin/vendas',
    icon: Target,
  },
  {
    title: 'Propostas',
    href: '/dashboard/admin/propostas',
    icon: FileText,
  },
  {
    title: 'Operações',
    href: '/dashboard/admin/operacoes',
    icon: FolderKanban,
  },
  {
    title: 'Conteúdo',
    href: '/dashboard/admin/conteudo',
    icon: MessageSquare,
  },
  {
    title: 'Configurações',
    href: '/dashboard/admin/configuracoes',
    icon: Settings,
  },
]

export function Sidebar({ tier, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname() || '/dashboard'

  const links = tier === 'admin' ? adminLinks : tier === 'paid' ? paidLinks : freeLinks

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">ARCO</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn('h-8 w-8', collapsed && 'mx-auto')}
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-2">
          {links.map((link, index) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            
            return (
              <div key={link.href}>
                <Link href={link.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-3',
                      collapsed && 'justify-center px-2'
                    )}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{link.title}</span>
                        {'badge' in link && link.badge && (
                          <Badge variant={link.badgeVariant || 'secondary'} className="ml-auto">
                            {link.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                </Link>
                
                {/* Submenu */}
                {'children' in link && link.children && !collapsed && isActive && (
                  <div className="ml-6 mt-2 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            'w-full justify-start gap-2 text-muted-foreground',
                            pathname.includes(child.href) && 'text-foreground bg-muted'
                          )}
                        >
                          {child.icon && <child.icon className="h-4 w-4" />}
                          <span>{child.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t p-4">
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
