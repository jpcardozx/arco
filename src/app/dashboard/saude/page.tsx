import { getCurrentUser, getPerformanceMetrics, getUptimeData } from '@/app/dashboard/actions'
import { TierGate } from '@/components/dashboard/tier-gate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Zap, Clock } from 'lucide-react'


export default async function SaudePage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Por favor, faça login para continuar.</p>
      </div>
    )
  }

  const userTier = user.profile?.tier || 'free'

  // Free users see tier gate
  if (userTier === 'free') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoramento de Saúde</h1>
          <p className="text-muted-foreground">
            Acompanhe performance, segurança e disponibilidade em tempo real
          </p>
        </div>

        <TierGate
          requiredTier="pro"
          userTier={userTier}
          feature="Monitoramento 24/7"
          description="Monitoramento contínuo de performance, uptime e segurança está disponível apenas no plano Pro"
        />
      </div>
    )
  }

  // Paid users see actual monitoring (placeholder for now)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Monitoramento de Saúde</h1>
        <p className="text-muted-foreground">
          Acompanhe performance, segurança e disponibilidade em tempo real
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Uptime
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Performance
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">Lighthouse Score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Response Time
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-muted-foreground">Média</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-2">Monitoramento será ativado após configurar seu site</p>
            <p className="text-sm">Edge Functions de monitoramento estão em implementação</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
