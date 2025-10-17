/**
 * Performance Analysis API
 * Analyzes website performance using PageSpeed Insights + CrUX
 * NO MOCKS - Real Google APIs
 */

import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse
} from '@/lib/api/api-response'

const analyzeSchema = z.object({
  url: z.string().url('URL inválida'),
  user_id: z.string().uuid().optional(),
  strategy: z.enum(['mobile', 'desktop']).default('mobile'),
  save_history: z.boolean().default(true)
})

// Rate limiting (reuse from domain validator)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT = 5 // 5 análises por minuto
const RATE_WINDOW = 60000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []
  
  // Remove requests older than window
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW)
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: `Limite de ${RATE_LIMIT} análises por minuto excedido. Aguarde um momento.`
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validate input
    const body = await request.json()
    const validation = analyzeSchema.safeParse(body)
    
    if (!validation.success) {
      return validationErrorResponse(validation.error, 'Dados inválidos')
    }

    const { url, user_id, strategy, save_history } = validation.data

    console.log('[Performance] Analyzing:', url, 'strategy:', strategy)

    // Call PageSpeed Insights API
    const PSI_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY
    
    // Build URL (API key is optional for public API, but has rate limits)
    let psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=seo&category=best-practices`
    
    if (PSI_API_KEY) {
      psiUrl += `&key=${PSI_API_KEY}`
      console.log('[Performance] Using authenticated API (higher limits)')
    } else {
      console.warn('[Performance] Using public API (limited to 25 req/day per IP)')
    }

    const psiResponse = await fetch(psiUrl, {
      signal: AbortSignal.timeout(30000) // 30s timeout
    })

    if (!psiResponse.ok) {
      const errorText = await psiResponse.text()
      console.error('[Performance] PageSpeed API error:', psiResponse.status, errorText)
      throw new Error(`PageSpeed API error: ${psiResponse.status}`)
    }

    const psiData = await psiResponse.json()
    
    // Check for errors in response
    if (psiData.error) {
      throw new Error(psiData.error.message || 'PageSpeed API error')
    }

    const lighthouse = psiData.lighthouseResult
    const crux = psiData.loadingExperience // Real user data (28 days)

    if (!lighthouse) {
      throw new Error('No lighthouse data in response')
    }

    // Extract Lighthouse scores
    const scores = {
      performance: Math.round((lighthouse.categories.performance?.score || 0) * 100),
      accessibility: Math.round((lighthouse.categories.accessibility?.score || 0) * 100),
      seo: Math.round((lighthouse.categories.seo?.score || 0) * 100),
      best_practices: Math.round((lighthouse.categories['best-practices']?.score || 0) * 100)
    }

    // Extract Core Web Vitals
    const core_web_vitals = {
      lcp: lighthouse.audits['largest-contentful-paint']?.numericValue || 0,
      fid: lighthouse.audits['max-potential-fid']?.numericValue || 0,
      cls: lighthouse.audits['cumulative-layout-shift']?.numericValue || 0,
      fcp: lighthouse.audits['first-contentful-paint']?.numericValue || 0,
      ttfb: lighthouse.audits['server-response-time']?.numericValue || 0
    }

    // Calculate ARCO Index (weighted average)
    const arco_index = Math.round(
      scores.performance * 0.40 +
      scores.seo * 0.25 +
      scores.accessibility * 0.20 +
      scores.best_practices * 0.15
    )

    console.log('[Performance] ARCO Index:', arco_index, 'Scores:', scores)

    // Extract opportunities (top 10 by savings)
    const opportunities = Object.entries(lighthouse.audits)
      .filter(([_, audit]: [string, any]) => 
        audit.score !== null &&
        audit.score < 1 &&
        audit.details?.overallSavingsMs > 0
      )
      .map(([id, audit]: [string, any]) => ({
        id,
        title: audit.title,
        description: audit.description,
        savings_ms: Math.round(audit.details.overallSavingsMs || 0),
        impact: audit.details.overallSavingsMs > 1000 ? 'high' as const : 
                audit.details.overallSavingsMs > 500 ? 'medium' as const : 'low' as const
      }))
      .sort((a, b) => b.savings_ms - a.savings_ms)
      .slice(0, 10)

    console.log('[Performance] Found', opportunities.length, 'optimization opportunities')

    // Extract CrUX data (if available)
    let crux_data = null
    if (crux?.metrics) {
      crux_data = {
        lcp_p75: crux.metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile || null,
        fid_p75: crux.metrics.FIRST_INPUT_DELAY_MS?.percentile || null,
        cls_p75: crux.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile || null,
        fcp_p75: crux.metrics.FIRST_CONTENTFUL_PAINT_MS?.percentile || null,
        overall_category: crux.overall_category || null
      }
      console.log('[Performance] CrUX data available:', crux_data.overall_category)
    } else {
      console.log('[Performance] No CrUX data (not enough traffic)')
    }

    // Save to database
    let analysis_id = null
    
    if (save_history) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )

      try {
        // 1. Create analysis request
        const { data: analysisRequest, error: requestError } = await supabase
          .from('analysis_requests')
          .insert({
            user_id: user_id || null,
            url,
            status: 'completed',
            arco_index
          })
          .select()
          .single()

        if (requestError) {
          console.error('[Performance] Failed to save request:', requestError)
        } else {
          analysis_id = analysisRequest.id
          console.log('[Performance] Saved analysis request:', analysis_id)

          // 2. Save analysis results
          const { error: resultsError } = await supabase
            .from('analysis_results')
            .insert({
              analysis_id,
              lcp: core_web_vitals.lcp,
              fid: core_web_vitals.fid,
              cls: core_web_vitals.cls,
              lighthouse_performance: scores.performance,
              lighthouse_accessibility: scores.accessibility,
              lighthouse_seo: scores.seo,
              lighthouse_best_practices: scores.best_practices,
              security_score: scores.best_practices, // Use best practices as proxy
              raw_data: {
                lighthouse: {
                  categories: lighthouse.categories,
                  audits: lighthouse.audits
                },
                crux: crux || null,
                opportunities,
                strategy,
                fetch_time: lighthouse.fetchTime
              }
            })

          if (resultsError) {
            console.error('[Performance] Failed to save results:', resultsError)
          } else {
            console.log('[Performance] Saved analysis results')
          }
        }
      } catch (dbError) {
        console.error('[Performance] Database error:', dbError)
        // Continue without failing the request
      }
    }

    const responseData = {
      arco_index,
      lighthouse: scores,
      core_web_vitals,
      crux_data,
      opportunities,
      analysis_id,
      strategy,
      analyzed_url: url,
      fetch_time: lighthouse.fetchTime
    }

    return successResponse(
      responseData,
      'Análise de performance concluída com sucesso'
    )

  } catch (error: any) {
    console.error('[Performance] Error:', error)
    
    // Friendly error messages
    if (error.message?.includes('timeout')) {
      return internalErrorResponse(error, 'Análise demorou muito tempo. Tente novamente com um site mais rápido.')
    }
    
    if (error.message?.includes('429')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Limite diário da API do Google PageSpeed Insights atingido. Configure GOOGLE_PAGESPEED_API_KEY para aumentar o limite.',
        details: process.env.NODE_ENV === 'development' ? {
          info: 'API pública: 25 requisições/dia. Com API key: 25k requisições/dia',
          docs: 'https://developers.google.com/speed/docs/insights/v5/get-started'
        } : undefined
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    if (error.message?.includes('404') || error.message?.includes('not found')) {
      return internalErrorResponse(error, 'URL não encontrada ou inacessível')
    }
    
    return internalErrorResponse(
      error,
      'Erro ao analisar performance. Tente novamente.'
    )
  }
}
