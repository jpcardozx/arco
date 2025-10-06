// Supabase Edge Function - Lighthouse Scan
// Executes Lighthouse audit and calculates ARCO Index
// Triggered by: Database webhook on analysis_requests INSERT

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ============================================================================
// TYPES
// ============================================================================

interface LighthouseRequest {
  analysisId: string
  url: string
}

interface LighthouseCategory {
  score: number | null
  title: string
}

interface LighthouseAudit {
  numericValue?: number
  score?: number | null
  displayValue?: string
}

interface LighthouseResult {
  categories: {
    performance: LighthouseCategory
    accessibility: LighthouseCategory
    'best-practices': LighthouseCategory
    seo: LighthouseCategory
  }
  audits: Record<string, LighthouseAudit>
}

interface PageSpeedResponse {
  lighthouseResult: LighthouseResult
  loadingExperience?: {
    metrics: {
      FIRST_CONTENTFUL_PAINT_MS?: { percentile: number; category: string }
      FIRST_INPUT_DELAY_MS?: { percentile: number; category: string }
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile: number; category: string }
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile: number; category: string }
    }
    overall_category: string
  }
  error?: {
    code: number
    message: string
  }
}

interface CoreWebVitals {
  lcp: number
  fid: number
  cls: number
  fcp: number
  ttfb: number
}

interface AnalysisScores {
  performance: number
  security: number
  seo: number
  accessibility: number
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Calculate ARCO Index from Lighthouse scores
 * ARCO = (Performance + Security + SEO + Accessibility) / 4
 */
function calculateARCOIndex(lighthouse: LighthouseResult): number {
  const performance = (lighthouse.categories.performance?.score ?? 0) * 100
  const accessibility = (lighthouse.categories.accessibility?.score ?? 0) * 100
  const seo = (lighthouse.categories.seo?.score ?? 0) * 100
  const security = (lighthouse.categories['best-practices']?.score ?? 0) * 100

  return Math.round((performance + accessibility + seo + security) / 4)
}

/**
 * Extract Core Web Vitals from Lighthouse audits
 */
function extractCoreWebVitals(lighthouse: LighthouseResult): CoreWebVitals {
  return {
    lcp: lighthouse.audits['largest-contentful-paint']?.numericValue ?? 0,
    fid: lighthouse.audits['max-potential-fid']?.numericValue ?? 0,
    cls: lighthouse.audits['cumulative-layout-shift']?.numericValue ?? 0,
    fcp: lighthouse.audits['first-contentful-paint']?.numericValue ?? 0,
    ttfb: lighthouse.audits['server-response-time']?.numericValue ?? 0,
  }
}

/**
 * Extract individual scores
 */
function extractScores(lighthouse: LighthouseResult): AnalysisScores {
  return {
    performance: Math.round((lighthouse.categories.performance?.score ?? 0) * 100),
    security: Math.round((lighthouse.categories['best-practices']?.score ?? 0) * 100),
    seo: Math.round((lighthouse.categories.seo?.score ?? 0) * 100),
    accessibility: Math.round((lighthouse.categories.accessibility?.score ?? 0) * 100),
  }
}

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Retry with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i)
        console.log(`[Lighthouse] Retry ${i + 1}/${maxRetries} after ${delay}ms`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

/**
 * Create Supabase client
 */
function createSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let analysisId: string | undefined

  try {
    // Parse and validate request
    const body: LighthouseRequest = await req.json()
    analysisId = body.analysisId
    const url = body.url

    if (!analysisId || !url) {
      throw new Error('Missing required fields: analysisId, url')
    }

    if (!isValidUrl(url)) {
      throw new Error(`Invalid URL format: ${url}`)
    }

    // Verify API key (basic security)
    const authHeader = req.headers.get('authorization')
    const apiKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!authHeader || !authHeader.includes(apiKey ?? '')) {
      throw new Error('Unauthorized: Invalid API key')
    }

    console.log(`[Lighthouse] Starting scan for ${url} (analysis: ${analysisId})`)

    // Initialize Supabase client
    const supabase = createSupabaseClient()

    // Update status to 'running'
    await supabase
      .from('analysis_requests')
      .update({ status: 'running' })
      .eq('id', analysisId)

    // Run Lighthouse via PageSpeed Insights API with retry
    const pagespeedUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`

    const result: PageSpeedResponse = await retryWithBackoff(async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

      try {
        const response = await fetch(pagespeedUrl, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`PageSpeed API error: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(`PageSpeed API error: ${data.error.message}`)
        }

        return data
      } finally {
        clearTimeout(timeoutId)
      }
    })

    const lighthouse = result.lighthouseResult
    const cruxData = result.loadingExperience // Real user metrics (28 days)

    // Calculate metrics
    const arcoIndex = calculateARCOIndex(lighthouse)
    const cwv = extractCoreWebVitals(lighthouse)
    const scores = extractScores(lighthouse)

    console.log(`[Lighthouse] ARCO Index: ${arcoIndex}`, scores)
    if (cruxData) {
      console.log(`[CrUX] Real user data available - Overall: ${cruxData.overall_category}`)
    }

    // Save analysis result
    const { error: resultError } = await supabase.from('analysis_results').insert({
      analysis_id: analysisId,
      arco_index: arcoIndex,
      performance_score: scores.performance,
      security_score: scores.security,
      seo_score: scores.seo,
      accessibility_score: scores.accessibility,
      lighthouse_data: lighthouse,
      core_web_vitals: cwv,
      crux_data: cruxData || null, // Real user metrics from Chrome UX Report
    })

    if (resultError) {
      console.error('[Lighthouse] Error saving result:', resultError)
      throw resultError
    }

    // Update analysis_requests with ARCO Index and status
    const { error: updateError } = await supabase
      .from('analysis_requests')
      .update({
        arco_index: arcoIndex,
        status: 'completed',
      })
      .eq('id', analysisId)

    if (updateError) {
      console.error('[Lighthouse] Error updating request:', updateError)
      throw updateError
    }

    console.log(`[Lighthouse] Scan completed for ${url}`)

    return new Response(
      JSON.stringify({
        success: true,
        analysisId,
        arcoIndex,
        scores,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Lighthouse] Error:', errorMessage)

    // Try to update analysis status to 'failed' if we have analysisId
    if (analysisId) {
      try {
        const supabase = createSupabaseClient()

        await supabase
          .from('analysis_requests')
          .update({
            status: 'failed',
            error_message: errorMessage,
          })
          .eq('id', analysisId)
      } catch (updateError) {
        console.error('[Lighthouse] Failed to update error status:', updateError)
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        analysisId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
