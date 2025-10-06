// Supabase Edge Function: AI Insights Generator
// File: supabase/functions/ai-insights/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InsightRequest {
  clientId: string
  dataPoints: {
    performance: {
      lcp: number
      fid: number
      cls: number
      ttfb: number
      speed: number
    }
    analytics: {
      pageviews: number
      bounce_rate: number
      avg_session: number
      conversion_rate: number
      traffic_sources: Record<string, number>
    }
    competition: {
      competitors: Array<{
        domain: string
        keywords: string[]
        traffic: number
        ranking: Record<string, number>
      }>
    }
  }
}

interface AIInsight {
  type: 'performance' | 'seo' | 'conversion' | 'content' | 'technical'
  priority: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  action: string
  impact: string
  effort: 'baixo (1-2 horas)' | 'médio (4-6 horas)' | 'alto (1-2 semanas)' | 'muito alto (1+ mês)'
  confidence: number // 0-100
  data_points: string[]
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { clientId, dataPoints }: InsightRequest = await req.json()

    // Generate insights based on data analysis
    const insights: AIInsight[] = []

    // 1. Performance Analysis
    if (dataPoints.performance.lcp > 2.5) {
      const impactEstimate = Math.round((dataPoints.performance.lcp - 2.5) * 8) // 8% per second
      insights.push({
        type: 'performance',
        priority: dataPoints.performance.lcp > 4 ? 'critical' : 'high',
        title: 'Oportunidade Crítica de Performance',
        description: `Seu LCP está em ${dataPoints.performance.lcp}s, muito acima do ideal de 2.5s. Isso afeta diretamente a experiência do usuário e rankings no Google.`,
        action: 'Otimizar carregamento de imagens, implementar lazy loading e usar formatos WebP/AVIF',
        impact: `+${impactEstimate}% de conversão estimada, melhoria no Core Web Vitals`,
        effort: dataPoints.performance.lcp > 4 ? 'alto (1-2 semanas)' : 'médio (4-6 horas)',
        confidence: 92,
        data_points: [`LCP: ${dataPoints.performance.lcp}s`, `Limite ideal: 2.5s`]
      })
    }

    if (dataPoints.performance.cls > 0.1) {
      insights.push({
        type: 'performance',
        priority: 'medium',
        title: 'Layout Shift Impactando UX',
        description: `CLS de ${dataPoints.performance.cls} causa instabilidade visual. Usuários abandonam sites com layout shifts.`,
        action: 'Definir dimensões fixas para imagens, reservar espaço para anúncios, evitar inserção dinâmica de conteúdo',
        impact: '+12% de engajamento, -23% de bounce rate',
        effort: 'médio (4-6 horas)',
        confidence: 87,
        data_points: [`CLS atual: ${dataPoints.performance.cls}`, `Limite ideal: 0.1`]
      })
    }

    // 2. Analytics Insights
    if (dataPoints.analytics.bounce_rate > 70) {
      insights.push({
        type: 'conversion',
        priority: 'high',
        title: 'Taxa de Rejeição Crítica',
        description: `${dataPoints.analytics.bounce_rate}% dos visitantes saem imediatamente. Isso indica problemas de relevância ou performance.`,
        action: 'Melhorar headlines, adicionar CTAs claros, otimizar above-the-fold, revisar copy das landing pages',
        impact: `Redução de ${Math.round((dataPoints.analytics.bounce_rate - 50) / 2)}% na taxa de rejeição`,
        effort: 'alto (1-2 semanas)',
        confidence: 89,
        data_points: [`Bounce rate: ${dataPoints.analytics.bounce_rate}%`, `Benchmark do setor: 40-50%`]
      })
    }

    if (dataPoints.analytics.conversion_rate < 2) {
      const conversionGap = 2 - dataPoints.analytics.conversion_rate
      insights.push({
        type: 'conversion',
        priority: 'critical',
        title: 'Conversão Abaixo do Mercado',
        description: `Taxa de conversão de ${dataPoints.analytics.conversion_rate}% está muito abaixo da média do setor (2-3%).`,
        action: 'A/B testing de CTAs, simplificar formulários, adicionar provas sociais, melhorar proposta de valor',
        impact: `+${Math.round(conversionGap * 100)}% de conversões com otimizações básicas`,
        effort: 'alto (1-2 semanas)',
        confidence: 94,
        data_points: [`Conversão atual: ${dataPoints.analytics.conversion_rate}%`, `Potencial: 2-3%`]
      })
    }

    // 3. Traffic Source Analysis
    const organicTraffic = dataPoints.analytics.traffic_sources.organic || 0
    const totalTraffic = Object.values(dataPoints.analytics.traffic_sources).reduce((a, b) => a + b, 0)
    const organicPercentage = (organicTraffic / totalTraffic) * 100

    if (organicPercentage < 40) {
      insights.push({
        type: 'seo',
        priority: 'high',
        title: 'Dependência Excessiva de Tráfego Pago',
        description: `Apenas ${Math.round(organicPercentage)}% do seu tráfego é orgânico. Isso indica oportunidades perdidas em SEO.`,
        action: 'Auditoria SEO completa, otimização on-page, criação de conteúdo, link building estratégico',
        impact: `+${Math.round((40 - organicPercentage) * 50)} visitantes orgânicos/mês`,
        effort: 'muito alto (1+ mês)',
        confidence: 85,
        data_points: [`Tráfego orgânico: ${Math.round(organicPercentage)}%`, `Benchmark: 40-60%`]
      })
    }

    // 4. Competitor Analysis
    if (dataPoints.competition.competitors.length > 0) {
      const topCompetitor = dataPoints.competition.competitors[0]
      const keywordGaps = topCompetitor.keywords.length
      
      insights.push({
        type: 'seo',
        priority: 'medium',
        title: 'Gap de Palavras-chave Identificado',
        description: `${topCompetitor.domain} rankeia para ${keywordGaps} palavras-chave que você não está aproveitando.`,
        action: `Análise detalhada das keywords de ${topCompetitor.domain}, criação de conteúdo target, otimização de páginas existentes`,
        impact: `+${Math.round(keywordGaps * 15)} visitantes orgânicos/mês potencial`,
        effort: 'alto (1-2 semanas)',
        confidence: 78,
        data_points: [`Keywords do competidor: ${keywordGaps}`, `Sua cobertura: análise necessária`]
      })
    }

    // 5. Technical SEO Check
    if (dataPoints.performance.ttfb > 600) {
      insights.push({
        type: 'technical',
        priority: 'medium',
        title: 'Servidor Lento Impactando SEO',
        description: `TTFB de ${dataPoints.performance.ttfb}ms está acima do recomendado (200ms). Isso afeta crawling e user experience.`,
        action: 'Otimizar server response time, implementar CDN, cache agressivo, otimizar queries do banco',
        impact: '+8% no ranking de SEO, melhor crawlability',
        effort: 'médio (4-6 horas)',
        confidence: 83,
        data_points: [`TTFB atual: ${dataPoints.performance.ttfb}ms`, `Ideal: <200ms`]
      })
    }

    // Sort insights by priority and confidence
    const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 }
    insights.sort((a, b) => {
      const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return b.confidence - a.confidence
    })

    // Store insights in database
    const { data: savedInsights, error: saveError } = await supabase
      .from('ai_insights')
      .insert({
        client_id: clientId,
        insights: insights,
        status: 'ready',
        generated_at: new Date().toISOString(),
        total_insights: insights.length,
        critical_insights: insights.filter(i => i.priority === 'critical').length,
        high_priority_insights: insights.filter(i => i.priority === 'high').length
      })
      .select()
      .single()

    if (saveError) {
      throw saveError
    }

    // Trigger real-time notification
    await supabase
      .from('notifications')
      .insert({
        user_id: clientId,
        type: 'ai_insights_ready',
        title: '🧠 Novos Insights de IA Disponíveis',
        message: `${insights.length} oportunidades identificadas (${insights.filter(i => i.priority === 'critical' || i.priority === 'high').length} prioridade alta)`,
        data: { 
          insight_id: savedInsights.id,
          total: insights.length,
          critical: insights.filter(i => i.priority === 'critical').length
        },
        read: false,
        created_at: new Date().toISOString()
      })

    // Log activity
    await supabase
      .from('activity_logs')
      .insert({
        client_id: clientId,
        action: 'ai_insights_generated',
        details: {
          insights_count: insights.length,
          critical_count: insights.filter(i => i.priority === 'critical').length,
          categories: [...new Set(insights.map(i => i.type))],
          avg_confidence: Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)
        },
        created_at: new Date().toISOString()
      })

    return new Response(
      JSON.stringify({
        success: true,
        insights: insights,
        summary: {
          total: insights.length,
          critical: insights.filter(i => i.priority === 'critical').length,
          high: insights.filter(i => i.priority === 'high').length,
          avg_confidence: Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length),
          estimated_impact: `+${Math.round(insights.reduce((sum, insight) => {
            const impactMatch = insight.impact.match(/\+(\d+)%/)
            return sum + (impactMatch ? parseInt(impactMatch[1]) : 0)
          }, 0) / insights.length)}% composite improvement`
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('AI Insights Error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})