import { getUserAnalyses, getCurrentUser } from '@/app/dashboard/actions'
import { AnalysesList } from '@/components/dashboard/analyses-list'
import { EmptyState } from '@/components/dashboard/empty-states'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DiagnosticoPage() {
  const [user, analyses] = await Promise.all([
    getCurrentUser(),
    getUserAnalyses()
  ])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Por favor, faça login para continuar.</p>
      </div>
    )
  }

  // Calculate stats
  const completedAnalyses = analyses.filter(a => a.status === 'completed')
  const avgArcoIndex = completedAnalyses.length > 0
    ? Math.round(
        completedAnalyses.reduce((sum, a) => {
          const result = a.analysis_results?.[0]
          return sum + (a.arco_index || 0)
        }, 0) / completedAnalyses.length
      )
    : 0

  // Quota calculation (free tier: 3/month)
  const userTier = user.profile?.tier || 'free'
  const monthlyQuota = userTier === 'free' ? 3 : 999
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
  const usedThisMonth = analyses.filter(a => 
    a.created_at.startsWith(currentMonth)
  ).length
  const remainingQuota = Math.max(0, monthlyQuota - usedThisMonth)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diagnóstico Técnico</h1>
          <p className="text-muted-foreground">
            Histórico de análises técnicas do seu site
          </p>
        </div>
        <Link href="/assessment">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Análise
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Análises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyses.length}</div>
            {userTier === 'free' && (
              <p className="text-xs text-muted-foreground">
                {remainingQuota} restantes este mês
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ARCO Index Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgArcoIndex > 0 ? avgArcoIndex : '--'}
            </div>
            {completedAnalyses.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {completedAnalyses.length} análises concluídas
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sites Monitorados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userTier === 'paid' ? '1' : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {userTier === 'free' 
                ? 'Upgrade para monitoramento contínuo'
                : 'Monitoramento ativo 24/7'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analyses List */}
      <Card>
        <CardHeader>
          <CardTitle>Análises Recentes</CardTitle>
          <CardDescription>
            Gerencie e visualize seus relatórios de diagnóstico
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analyses.length === 0 ? (
            <EmptyState type="analyses" />
          ) : (
            <AnalysesList analyses={analyses} />
          )}
        </CardContent>
      </Card>

      {/* Upgrade CTA - only for free tier */}
      {userTier === 'free' && (
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle>Quer análises ilimitadas?</CardTitle>
            <CardDescription>
              Upgrade para o plano Pro e tenha acesso a análises ilimitadas + monitoramento
              contínuo 24/7
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pricing">
              <Button variant="default">Ver Planos</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
