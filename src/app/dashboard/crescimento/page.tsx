'use client';


import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  Eye,
  DollarSign,
  Target,
  Zap,
  ExternalLink,
  Calendar,
} from 'lucide-react';

// Real Analytics Data Hook - replaces mock
import { useAnalyticsData } from '@/lib/hooks/use-analytics-data';

// Fallback data for development/demo
const fallbackAnalyticsData = [
  { date: 'Dec 29', visitors: 1245, pageviews: 3890, bounceRate: 42.5, avgSession: 185 },
  { date: 'Dec 30', visitors: 1189, pageviews: 3654, bounceRate: 45.2, avgSession: 172 },
  { date: 'Dec 31', visitors: 892, pageviews: 2456, bounceRate: 38.9, avgSession: 198 },
  { date: 'Jan 1', visitors: 456, pageviews: 1234, bounceRate: 52.1, avgSession: 145 },
  { date: 'Jan 2', visitors: 1456, pageviews: 4234, bounceRate: 39.8, avgSession: 203 },
  { date: 'Jan 3', visitors: 1598, pageviews: 4789, bounceRate: 37.2, avgSession: 215 },
  { date: 'Jan 4', visitors: 1723, pageviews: 5123, bounceRate: 35.6, avgSession: 228 },
];

// Mock data - Top páginas
const mockTopPages = [
  { page: '/', views: 12456, avgTime: '3:24', bounceRate: 32.4 },
  { page: '/servicos', views: 8934, avgTime: '4:12', bounceRate: 28.7 },
  { page: '/blog/lighthouse-seo', views: 6782, avgTime: '6:45', bounceRate: 22.1 },
  { page: '/contato', views: 5621, avgTime: '2:15', bounceRate: 45.8 },
  { page: '/sobre', views: 4123, avgTime: '3:05', bounceRate: 38.2 },
];

// Mock data - Fontes de tráfego
const mockTrafficSources = [
  { source: 'Google Organic', visitors: 8456, percentage: 45.2, change: 12.5 },
  { source: 'Direct', visitors: 4234, percentage: 22.6, change: -3.2 },
  { source: 'Social Media', visitors: 3123, percentage: 16.7, change: 24.8 },
  { source: 'Referral', visitors: 1789, percentage: 9.6, change: 8.4 },
  { source: 'Email', visitors: 1098, percentage: 5.9, change: 15.3 },
];

// Mock data - Google Ads
const mockGoogleAdsData = [
  { date: 'Dec 29', impressions: 45234, clicks: 892, conversions: 23, cost: 285.4, cpc: 0.32 },
  { date: 'Dec 30', impressions: 48123, clicks: 945, conversions: 28, cost: 298.7, cpc: 0.32 },
  { date: 'Dec 31', impressions: 39876, clicks: 756, conversions: 19, cost: 245.8, cpc: 0.33 },
  { date: 'Jan 1', impressions: 28456, clicks: 534, conversions: 12, cost: 178.9, cpc: 0.34 },
  { date: 'Jan 2', impressions: 52345, clicks: 1023, conversions: 34, cost: 334.5, cpc: 0.33 },
  { date: 'Jan 3', impressions: 56789, clicks: 1134, conversions: 41, cost: 367.8, cpc: 0.32 },
  { date: 'Jan 4', impressions: 61234, clicks: 1245, conversions: 47, cost: 401.2, cpc: 0.32 },
];

// Mock data - Meta Ads
const mockMetaAdsData = [
  { date: 'Dec 29', impressions: 124567, clicks: 2345, conversions: 67, cost: 456.8, cpc: 0.19 },
  { date: 'Dec 30', impressions: 132456, clicks: 2534, conversions: 72, cost: 487.3, cpc: 0.19 },
  { date: 'Dec 31', impressions: 118923, clicks: 2123, conversions: 58, cost: 412.5, cpc: 0.19 },
  { date: 'Jan 1', impressions: 89234, clicks: 1567, conversions: 42, cost: 301.8, cpc: 0.19 },
  { date: 'Jan 2', impressions: 145678, clicks: 2789, conversions: 89, cost: 534.2, cpc: 0.19 },
  { date: 'Jan 3', impressions: 156789, clicks: 3012, conversions: 98, cost: 578.9, cpc: 0.19 },
  { date: 'Jan 4', impressions: 167890, clicks: 3234, conversions: 106, cost: 621.3, cpc: 0.19 },
];

// Mock data - Campanhas ativas
const mockActiveCampaigns = [
  {
    id: 1,
    name: 'ARCO Index - Busca Brand',
    platform: 'Google Ads',
    status: 'active',
    budget: 500,
    spent: 387.45,
    clicks: 1245,
    conversions: 43,
    ctr: 4.82,
    conversionRate: 3.45,
  },
  {
    id: 2,
    name: 'Lighthouse Performance - Generic',
    platform: 'Google Ads',
    status: 'active',
    budget: 800,
    spent: 654.32,
    clicks: 2103,
    conversions: 58,
    ctr: 3.21,
    conversionRate: 2.76,
  },
  {
    id: 3,
    name: 'Instagram - Awareness',
    platform: 'Meta Ads',
    status: 'active',
    budget: 600,
    spent: 578.90,
    clicks: 3012,
    conversions: 98,
    ctr: 2.87,
    conversionRate: 3.25,
  },
  {
    id: 4,
    name: 'Facebook - Retargeting',
    platform: 'Meta Ads',
    status: 'paused',
    budget: 400,
    spent: 198.45,
    clicks: 892,
    conversions: 34,
    ctr: 3.54,
    conversionRate: 3.81,
  },
];

export default function CrescimentoPage() {
  const [activeTab, setActiveTab] = useState('website');

  // Cálculos para Website
  // Use real analytics data with fallback
  const { data: analyticsData, isLoading: analyticsLoading, error: analyticsError } = useAnalyticsData();
  const displayData = analyticsData || fallbackAnalyticsData;
  
  const totalVisitors = displayData.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageviews = displayData.reduce((sum, day) => sum + day.pageviews, 0);
  const avgBounceRate = (
    displayData.reduce((sum, day) => sum + day.bounceRate, 0) / displayData.length
  ).toFixed(1);
  const avgSessionDuration = Math.round(
    (analyticsData || []).reduce((sum: number, day: any) => sum + (day.avgSession || 0), 0) / (analyticsData?.length || 1) || 0
  );

  // Cálculos para Ads
  const totalImpressions =
    mockGoogleAdsData.reduce((sum, day) => sum + day.impressions, 0) +
    mockMetaAdsData.reduce((sum, day) => sum + day.impressions, 0);
  const totalClicks =
    mockGoogleAdsData.reduce((sum, day) => sum + day.clicks, 0) +
    mockMetaAdsData.reduce((sum, day) => sum + day.clicks, 0);
  const totalConversions =
    mockGoogleAdsData.reduce((sum, day) => sum + day.conversions, 0) +
    mockMetaAdsData.reduce((sum, day) => sum + day.conversions, 0);
  const totalCost =
    mockGoogleAdsData.reduce((sum, day) => sum + day.cost, 0) +
    mockMetaAdsData.reduce((sum, day) => sum + day.cost, 0);
  const avgCTR = ((totalClicks / totalImpressions) * 100).toFixed(2);
  const avgConversionRate = ((totalConversions / totalClicks) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Crescimento</h1>
        <p className="text-muted-foreground">
          Monitore o crescimento do seu site e campanhas de anúncios
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="website">
            <Eye className="mr-2 h-4 w-4" />
            Website
          </TabsTrigger>
          <TabsTrigger value="ads">
            <Target className="mr-2 h-4 w-4" />
            Anúncios
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: WEBSITE */}
        <TabsContent value="website" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+12.5%</span> vs semana passada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPageviews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+8.3%</span> vs semana passada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgBounceRate}%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">-2.4%</span> vs semana passada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(avgSessionDuration / 60)}:{(avgSessionDuration % 60).toString().padStart(2, '0')}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+15s</span> vs semana passada
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visitors Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Visitantes e Visualizações (Últimos 7 dias)</CardTitle>
              <CardDescription>Comparação entre visitantes únicos e pageviews</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Visitantes"
                  />
                  <Line
                    type="monotone"
                    dataKey="pageviews"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Visualizações"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Pages & Traffic Sources */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Páginas Mais Visitadas</CardTitle>
                <CardDescription>Top 5 páginas por visualizações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{page.page}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {page.views.toLocaleString()} views
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ⏱️ {page.avgTime}
                          </span>
                          <span
                            className={`text-xs ${
                              page.bounceRate < 40 ? 'text-green-600' : 'text-amber-600'
                            }`}
                          >
                            {page.bounceRate}% bounce
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>De onde vêm seus visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrafficSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{source.source}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {source.visitors.toLocaleString()}
                          </span>
                          <Badge
                            variant={source.change > 0 ? 'default' : 'destructive'}
                            className={`text-xs ${source.change > 0 ? 'bg-green-100 text-green-700' : ''}`}
                          >
                            {source.change > 0 ? '+' : ''}
                            {source.change}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bounce Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Rejeição</CardTitle>
              <CardDescription>Percentual de visitantes que saem sem interagir</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analyticsData || []}>
                  <defs>
                    <linearGradient id="colorBounce" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="bounceRate"
                    stroke="#ef4444"
                    fill="url(#colorBounce)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: ADS */}
        <TabsContent value="ads" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impressões</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(totalImpressions / 1000).toFixed(1)}K</div>
                <p className="text-xs text-muted-foreground">
                  Últimos 7 dias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cliques</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  CTR: {avgCTR}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalConversions}</div>
                <p className="text-xs text-muted-foreground">
                  Taxa: {avgConversionRate}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investimento</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalCost.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  CPA: R$ {(totalCost / totalConversions).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ads Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance de Anúncios (Últimos 7 dias)</CardTitle>
              <CardDescription>Comparação entre Google Ads e Meta Ads</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={mockGoogleAdsData.map((google, index) => ({
                    date: google.date,
                    googleClicks: google.clicks,
                    metaClicks: mockMetaAdsData[index]?.clicks || 0,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="googleClicks" fill="#4285f4" name="Google Ads" />
                  <Bar dataKey="metaClicks" fill="#0668e1" name="Meta Ads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversions Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Conversões por Plataforma</CardTitle>
              <CardDescription>Resultados de vendas/leads por canal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={mockGoogleAdsData.map((google, index) => ({
                    date: google.date,
                    googleConversions: google.conversions,
                    metaConversions: mockMetaAdsData[index]?.conversions || 0,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="googleConversions"
                    stroke="#4285f4"
                    strokeWidth={2}
                    name="Google Ads"
                  />
                  <Line
                    type="monotone"
                    dataKey="metaConversions"
                    stroke="#0668e1"
                    strokeWidth={2}
                    name="Meta Ads"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campanhas Ativas</CardTitle>
                  <CardDescription>Gerenciamento de anúncios em andamento</CardDescription>
                </div>
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Nova Campanha
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActiveCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge
                          variant={campaign.status === 'active' ? 'default' : 'secondary'}
                          className={campaign.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {campaign.platform}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Budget:</span>
                          <p className="font-medium">
                            R$ {campaign.spent.toFixed(2)} / R$ {campaign.budget}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cliques:</span>
                          <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CTR:</span>
                          <p className="font-medium">{campaign.ctr}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conversões:</span>
                          <p className="font-medium">
                            {campaign.conversions} ({campaign.conversionRate}%)
                          </p>
                        </div>
                      </div>
                      {/* Budget Progress */}
                      <div className="mt-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              (campaign.spent / campaign.budget) * 100 > 90
                                ? 'bg-red-600'
                                : 'bg-blue-600'
                            }`}
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      Gerenciar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ROI Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de ROI</CardTitle>
              <CardDescription>Análise de retorno sobre investimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Investimento Total</label>
                  <div className="text-3xl font-bold text-blue-600">
                    R$ {totalCost.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Conversões Totais</label>
                  <div className="text-3xl font-bold text-green-600">{totalConversions}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custo por Conversão</label>
                  <div className="text-3xl font-bold text-amber-600">
                    R$ {(totalCost / totalConversions).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  💡 <strong>Insight:</strong> Suas campanhas Meta Ads têm CTR 25% superior ao
                  Google Ads. Considere realocar orçamento para maximizar resultados.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
