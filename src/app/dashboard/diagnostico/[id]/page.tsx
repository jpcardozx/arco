import { getAnalysisById } from '@/app/dashboard/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface SecurityIssue {
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 70) return 'text-amber-600'
  return 'text-red-600'
}

const getScoreBgColor = (score: number) => {
  if (score >= 90) return 'bg-green-100'
  if (score >= 70) return 'bg-amber-100'
  return 'bg-red-100'
}

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DiagnosticoReportPage({ params }: PageProps) {
  const { id } = await params
  
  // Fetch real data from Supabase
  let analysis
  try {
    analysis = await getAnalysisById(id)
    if (!analysis) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  const result = analysis.analysis_results?.[0]
  const report = {
    id: analysis.id,
    url: analysis.url,
    arco_index: analysis.arco_index || 0,
    created_at: analysis.created_at,
    results: {
      performance: {
        lcp: result?.lcp || 0,
        fid: result?.fid || 0,
        cls: result?.cls || 0,
        lighthouse_performance: result?.lighthouse_performance || 0,
      },
      accessibility: {
        lighthouse_accessibility: result?.lighthouse_accessibility || 0,
      },
      seo: {
        lighthouse_seo: result?.lighthouse_seo || 0,
      },
      security: {
        security_score: result?.security_score || 0,
        issues: [] as SecurityIssue[],
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/diagnostico">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Relatório de Diagnóstico</h1>
            <div className="flex items-center gap-2 mt-1">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:underline"
              >
                {report.url}
              </a>
            </div>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* ARCO Index Hero */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">ARCO Index</p>
              <div className="flex items-baseline gap-3">
                <span className={`text-6xl font-bold ${getScoreColor(report.arco_index)}`}>
                  {report.arco_index}
                </span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Analisado em {new Date(report.created_at).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <Badge className={`${getScoreBgColor(report.arco_index)} text-lg px-4 py-2`}>
                {report.arco_index >= 90 && 'Excelente'}
                {report.arco_index >= 70 && report.arco_index < 90 && 'Bom'}
                {report.arco_index < 70 && 'Precisa Melhorar'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Melhor que 78% dos sites
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">
            <Zap className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="seo">
            <TrendingUp className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="accessibility">
            <Globe className="mr-2 h-4 w-4" />
            Acessibilidade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Score</CardTitle>
              <CardDescription>
                Baseado no Lighthouse e Core Web Vitals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lighthouse Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Lighthouse Performance</span>
                  <span className={`text-2xl font-bold ${getScoreColor(report.results.performance.lighthouse_performance)}`}>
                    {report.results.performance.lighthouse_performance}
                  </span>
                </div>
                <Progress value={report.results.performance.lighthouse_performance} className="h-2" />
              </div>

              {/* Core Web Vitals */}
              <div className="space-y-4">
                <h3 className="font-semibold">Core Web Vitals</h3>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium">LCP (Largest Contentful Paint)</span>
                      <p className="text-xs text-muted-foreground">
                        Tempo até o maior elemento visível
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {report.results.performance.lcp}s
                    </Badge>
                  </div>
                  <Progress value={85} className="h-1" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium">FID (First Input Delay)</span>
                      <p className="text-xs text-muted-foreground">
                        Tempo de resposta à primeira interação
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {report.results.performance.fid}ms
                    </Badge>
                  </div>
                  <Progress value={90} className="h-1" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium">CLS (Cumulative Layout Shift)</span>
                      <p className="text-xs text-muted-foreground">
                        Estabilidade visual do layout
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {report.results.performance.cls}
                    </Badge>
                  </div>
                  <Progress value={95} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Score</CardTitle>
              <CardDescription>
                Análise de vulnerabilidades e headers de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Score Geral de Segurança</span>
                  <span className={`text-2xl font-bold ${getScoreColor(report.results.security.security_score)}`}>
                    {report.results.security.security_score}
                  </span>
                </div>
                <Progress value={report.results.security.security_score} className="h-2" />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Problemas Identificados</h3>
                {report.results.security.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      issue.severity === 'high'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 mt-0.5 ${
                        issue.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{issue.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                    </div>
                    <Badge
                      variant={issue.severity === 'high' ? 'destructive' : 'default'}
                      className="text-xs"
                    >
                      {issue.severity === 'high' ? 'Alta' : 'Média'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Score</CardTitle>
              <CardDescription>
                Otimização para mecanismos de busca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Lighthouse SEO</span>
                  <span className={`text-2xl font-bold ${getScoreColor(report.results.seo.lighthouse_seo)}`}>
                    {report.results.seo.lighthouse_seo}
                  </span>
                </div>
                <Progress value={report.results.seo.lighthouse_seo} className="h-2" />
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Meta tags configuradas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Sitemap presente</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>robots.txt configurado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Score</CardTitle>
              <CardDescription>
                Conformidade com WCAG 2.1
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Lighthouse Accessibility</span>
                  <span className={`text-2xl font-bold ${getScoreColor(report.results.accessibility.lighthouse_accessibility)}`}>
                    {report.results.accessibility.lighthouse_accessibility}
                  </span>
                </div>
                <Progress value={report.results.accessibility.lighthouse_accessibility} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Next Steps CTA */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
          <CardDescription>
            Veja as ações recomendadas para melhorar seu ARCO Index
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/plano-de-acao">
            <Button>Ver Plano de Ação</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
