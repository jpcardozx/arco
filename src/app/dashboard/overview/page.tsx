import { getCurrentUser, getUserAnalyses } from '@/app/dashboard/actions'
import { EmptyState } from '@/components/dashboard/empty-states'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Zap, Shield, Globe, Target, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 70) return 'text-amber-600'
  return 'text-red-600'
}

const getScoreBgColor = (score: number) => {
  if (score >= 90) return 'bg-green-50 border-green-200'
  if (score >= 70) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

export default async function OverviewPage() {
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

  // Filter completed analyses with results
  const completedAnalyses = analyses
    .filter(a => a.status === 'completed' && a.analysis_results?.length > 0)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // If no data, show empty state
  if (completedAnalyses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Painel Estratégico</h1>
            <p className="text-muted-foreground">
              Acompanhe a evolução do seu ARCO Index
            </p>
          </div>
          <Button asChild>
            <Link href="/assessment">
              <Target className="mr-2 h-4 w-4" />
              Nova Análise
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <EmptyState type="analyses" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get current and previous scores
  const currentAnalysis = completedAnalyses[0]
  const currentResult = currentAnalysis.analysis_results[0]
  const currentScore = currentAnalysis.arco_index || 0

  const previousAnalysis = completedAnalyses[1]
  const previousScore = previousAnalysis?.arco_index || currentScore

  const scoreDiff = currentScore - previousScore
  const percentChange = previousScore > 0 
    ? ((scoreDiff / previousScore) * 100).toFixed(1)
    : '0.0'

  // Extract individual scores from latest result
  const performanceScore = currentResult?.lighthouse_performance || 0
  const securityScore = currentResult?.security_score || 0
  const seoScore = currentResult?.lighthouse_seo || 0
  const accessibilityScore = currentResult?.lighthouse_accessibility || 0

  // Prepare historical data for charts
  const historyData = completedAnalyses.slice(0, 7).reverse().map(analysis => {
    const result = analysis.analysis_results[0]
    return {
      date: format(new Date(analysis.created_at), 'dd MMM', { locale: ptBR }),
      arco_index: analysis.arco_index || 0,
      performance: result?.lighthouse_performance || 0,
      security: result?.security_score || 0,
      seo: result?.lighthouse_seo || 0,
      accessibility: result?.lighthouse_accessibility || 0,
    }
  })

  const userTier = user.profile?.tier || 'free'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel Estratégico</h1>
          <p className="text-muted-foreground">
            Acompanhe a evolução do seu ARCO Index e progresso
          </p>
        </div>
        <Button asChild>
          <Link href="/assessment">
            <Target className="mr-2 h-4 w-4" />
            Nova Análise
          </Link>
        </Button>
      </div>

      {/* ARCO Index Hero */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className={`border-2 ${getScoreBgColor(currentScore)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ARCO Index Atual
              </CardTitle>
              {scoreDiff > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <span className={`text-5xl font-bold ${getScoreColor(currentScore)}`}>
                {currentScore}
              </span>
              <span className="text-xl text-muted-foreground">/100</span>
            </div>
            {completedAnalyses.length > 1 && (
              <div className="mt-2 flex items-center gap-2">
                <Badge 
                  variant={scoreDiff > 0 ? 'default' : scoreDiff < 0 ? 'destructive' : 'secondary'} 
                  className="gap-1"
                >
                  {scoreDiff > 0 && <ArrowUpRight className="h-3 w-3" />}
                  {scoreDiff > 0 ? '+' : ''}{scoreDiff} pontos ({percentChange}%)
                </Badge>
                <span className="text-xs text-muted-foreground">vs análise anterior</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Última análise: {format(new Date(currentAnalysis.created_at), "dd MMM 'às' HH:mm", { locale: ptBR })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scores por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Performance</p>
                  <p className={`text-lg font-bold ${getScoreColor(performanceScore)}`}>
                    {performanceScore}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Segurança</p>
                  <p className={`text-lg font-bold ${getScoreColor(securityScore)}`}>
                    {securityScore}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">SEO</p>
                  <p className={`text-lg font-bold ${getScoreColor(seoScore)}`}>
                    {seoScore}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Acessibilidade</p>
                  <p className={`text-lg font-bold ${getScoreColor(accessibilityScore)}`}>
                    {accessibilityScore}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts serão adicionados na próxima iteração */}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Análises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAnalyses.length}</div>
            <p className="text-xs text-muted-foreground">Análises completas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Melhor Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...completedAnalyses.map(a => a.arco_index || 0))}
            </div>
            <p className="text-xs text-muted-foreground">Maior ARCO Index</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scoreDiff > 0 ? '+' : ''}{scoreDiff}
            </div>
            <p className="text-xs text-muted-foreground">Pontos de evolução</p>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade CTA for free users */}
      {userTier === 'free' && (
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle>Quer histórico completo e insights avançados?</CardTitle>
            <p className="text-sm text-muted-foreground">
              Upgrade para o plano Pro e tenha acesso a análises ilimitadas, histórico completo
              e monitoramento 24/7.
            </p>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/pricing">Ver Planos</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
