'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export function BreadcrumbNav() {
  const pathname = usePathname()

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (!pathname) return [{ label: 'Dashboard', href: '/dashboard', icon: Home }]

    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', href: '/dashboard', icon: Home }
    ]

    // Map of path segments to readable labels
    const labelMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'diagnostico': 'Diagnóstico',
      'plano-de-acao': 'Plano de Ação',
      'checklist': 'Checklists',
      'saude': 'Saúde',
      'crescimento': 'Crescimento',
      'operacoes': 'Operações',
      'faturamento': 'Faturamento',
      'equipe': 'Equipe',
      'integracoes': 'Integrações',
      'settings': 'Configurações',
      'overview': 'Visão Geral',
      'admin': 'Admin',
      'clientes': 'Clientes',
      'vendas': 'Vendas',
      'propostas': 'Propostas',
      'conteudo': 'Conteúdo',
      'configuracoes': 'Configurações',
    }

    let currentPath = ''
    for (let i = 1; i < paths.length; i++) {
      currentPath += `/${paths[i]}`
      const segment = paths[i]
      const label = labelMap[segment] || segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        label,
        href: `/dashboard${currentPath}`,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        const Icon = crumb.icon

        return (
          <Fragment key={crumb.href}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
            {isLast ? (
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className={cn(
                  "flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground",
                  index === 0 && "hover:underline"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.label}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
