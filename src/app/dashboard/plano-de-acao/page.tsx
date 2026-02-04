export const dynamic = 'force-dynamic';

import { getPlaybooks } from '@/app/dashboard/actions'
import { PlaybooksList } from '@/components/dashboard/playbooks-list'
import { EmptyState } from '@/components/dashboard/empty-states'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


export default async function PlanoDeAcaoPage() {
  const playbooks = await getPlaybooks()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plano de Ação</h1>
        <p className="text-muted-foreground">
          Playbooks recomendados para melhorar seu ARCO Index
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Playbooks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{playbooks.length}</div>
          <p className="text-xs text-muted-foreground">
            {playbooks.filter(p => p.is_published).length} publicados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Playbooks Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          {playbooks.length === 0 ? (
            <EmptyState type="playbooks" />
          ) : (
            <PlaybooksList playbooks={playbooks} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
