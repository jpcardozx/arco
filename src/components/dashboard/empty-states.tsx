import { FileQuestion, FolderOpen, ListChecks, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  type: 'analyses' | 'projects' | 'tickets' | 'files' | 'playbooks'
  onAction?: () => void
}

const emptyStateConfig = {
  analyses: {
    icon: FileQuestion,
    title: 'Nenhuma análise ainda',
    description: 'Comece analisando seu primeiro site para descobrir oportunidades de melhoria.',
    action: 'Nova Análise',
    href: '/dashboard/diagnostico'
  },
  projects: {
    icon: FolderOpen,
    title: 'Nenhum projeto criado',
    description: 'Organize suas análises e tarefas criando projetos.',
    action: 'Criar Projeto',
    href: '/dashboard/operacoes?tab=projetos'
  },
  tickets: {
    icon: Ticket,
    title: 'Sem tickets abertos',
    description: 'Precisa de ajuda? Abra um ticket e nossa equipe responde em até 24h.',
    action: 'Novo Ticket',
    href: '/dashboard/operacoes?tab=suporte'
  },
  files: {
    icon: FolderOpen,
    title: 'Nenhum arquivo enviado',
    description: 'Faça upload de documentos, imagens ou relatórios.',
    action: 'Enviar Arquivo',
    href: '/dashboard/operacoes?tab=arquivos'
  },
  playbooks: {
    icon: ListChecks,
    title: 'Nenhum playbook disponível',
    description: 'Execute análises para gerar planos de ação personalizados.',
    action: 'Ver Diagnóstico',
    href: '/dashboard/diagnostico'
  }
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const config = emptyStateConfig[type]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">
        {config.title}
      </h3>
      
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {config.description}
      </p>

      {onAction ? (
        <Button onClick={onAction}>
          {config.action}
        </Button>
      ) : (
        <Button asChild>
          <Link href={config.href}>
            {config.action}
          </Link>
        </Button>
      )}
    </div>
  )
}
