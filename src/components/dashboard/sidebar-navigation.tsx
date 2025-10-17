'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  LineChart,
  Activity,
  TrendingUp,
  FolderKanban,
  CreditCard,
  Users,
  Plug,
  Settings,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Target,
  Sparkles,
  CheckSquare,
  Home,
  FileText,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive'

interface NavChild {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavLink {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  badgeVariant?: BadgeVariant
  children?: NavChild[]
}

interface NavSection {
  title: string
  items: NavLink[]
}

interface SidebarNavigationProps {
  tier: 'free' | 'paid' | 'admin'
  collapsed: boolean
}

const freeNavigation: NavSection[] = [
  {
    title: 'Principal',
    items: [
      {
        title: 'Início',
        href: '/dashboard',
        icon: Home,
      },
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
    ],
  },
  {
    title: 'Upgrade',
    items: [
      {
        title: 'Planos Pro',
        href: '/dashboard/planos',
        icon: Sparkles,
        badge: 'Pro',
        badgeVariant: 'default',
      },
    ],
  },
]

const paidNavigation: NavSection[] = [
  {
    title: 'Analytics',
    items: [
      {
        title: 'Visão Geral',
        href: '/dashboard/overview',
        icon: LayoutDashboard,
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
    ],
  },
  {
    title: 'Operações',
    items: [
      {
        title: 'Projetos',
        href: '/dashboard/operacoes',
        icon: FolderKanban,
        children: [
          { title: 'Todos', href: '/dashboard/operacoes?tab=projetos' },
          { title: 'Suporte', href: '/dashboard/operacoes?tab=suporte' },
          { title: 'Arquivos', href: '/dashboard/operacoes?tab=arquivos' },
        ],
      },
      {
        title: 'Equipe',
        href: '/dashboard/equipe',
        icon: Users,
      },
    ],
  },
  {
    title: 'Configurações',
    items: [
      {
        title: 'Integrações',
        href: '/dashboard/integracoes',
        icon: Plug,
      },
      {
        title: 'Faturamento',
        href: '/dashboard/faturamento',
        icon: CreditCard,
      },
      {
        title: 'Configurações',
        href: '/dashboard/settings',
        icon: Settings,
      },
    ],
  },
]

const adminNavigation: NavSection[] = [
  {
    title: 'Admin',
    items: [
      {
        title: 'Overview',
        href: '/dashboard/admin/overview',
        icon: LayoutDashboard,
      },
      {
        title: 'Clientes',
        href: '/dashboard/admin/clientes',
        icon: Users,
      },
    ],
  },
  {
    title: 'Vendas',
    items: [
      {
        title: 'Pipeline',
        href: '/dashboard/admin/vendas',
        icon: Target,
      },
      {
        title: 'Propostas',
        href: '/dashboard/admin/propostas',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Sistema',
    items: [
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
    ],
  },
]

function NavItem({ link, collapsed }: { link: NavLink; collapsed: boolean }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
  const hasChildren = link.children && link.children.length > 0

  if (hasChildren && !collapsed) {
    return (
      <Collapsible open={isOpen || isActive} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-between gap-3',
              isActive && 'bg-secondary font-medium'
            )}
          >
            <div className="flex items-center gap-3">
              <link.icon className="h-5 w-5 shrink-0" />
              <span className="text-left">{link.title}</span>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 transition-transform',
                (isOpen || isActive) && 'rotate-180'
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1">
          {link.children?.map((child) => {
            const isChildActive = pathname?.includes(child.href)
            return (
              <Link key={child.href} href={child.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 pl-11 text-muted-foreground',
                    isChildActive && 'bg-muted font-medium text-foreground'
                  )}
                >
                  {child.icon && <child.icon className="h-4 w-4" />}
                  <span>{child.title}</span>
                  {child.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {child.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link href={link.href}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start gap-3',
          collapsed && 'justify-center px-2',
          isActive && 'bg-secondary font-medium'
        )}
      >
        <link.icon className="h-5 w-5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{link.title}</span>
            {link.badge && (
              <Badge variant={link.badgeVariant || 'secondary'} className="ml-auto text-xs">
                {link.badge}
              </Badge>
            )}
          </>
        )}
      </Button>
    </Link>
  )
}

export function SidebarNavigation({ tier, collapsed }: SidebarNavigationProps) {
  const sections = tier === 'admin' ? adminNavigation : tier === 'paid' ? paidNavigation : freeNavigation

  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <nav className="space-y-6">
        {sections.map((section, idx) => (
          <div key={section.title} className="space-y-2">
            {!collapsed && (
              <>
                {idx > 0 && <Separator className="my-4" />}
                <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              </>
            )}
            <div className="space-y-1">
              {section.items.map((link) => (
                <NavItem key={link.href} link={link} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </ScrollArea>
  )
}
