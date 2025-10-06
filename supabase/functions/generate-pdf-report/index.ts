// Supabase Edge Function - PDF Report Generator
// Generates professional PDF reports from analysis results

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ============================================================================
// TYPES
// ============================================================================

interface PDFRequest {
  analysisId: string
  userId: string
}

interface AnalysisData {
  id: string
  analysis_id: string
  arco_index: number
  performance_score: number
  security_score: number
  seo_score: number
  accessibility_score: number
  core_web_vitals: {
    lcp: number
    fid: number
    cls: number
    fcp: number
    ttfb: number
  }
  lighthouse_data: any
  created_at: string
  analysis_requests: {
    url: string
    created_at: string
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

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

/**
 * Generate PDF using Puppeteer Cloud API or similar service
 * Alternative: Use jsPDF library for client-side generation
 */
async function generatePDFFromHTML(html: string): Promise<Uint8Array> {
  // Option 1: Use Puppeteer/Browserless for server-side rendering
  const browserlessApiKey = Deno.env.get('BROWSERLESS_API_KEY')

  if (browserlessApiKey) {
    const response = await fetch('https://chrome.browserless.io/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${browserlessApiKey}`,
      },
      body: JSON.stringify({
        html,
        options: {
          format: 'A4',
          printBackground: true,
          margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px',
          },
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Browserless API error: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  }

  // Option 2: Use HTML-to-PDF API (free tier available)
  const htmlToPdfApiKey = Deno.env.get('HTML_TO_PDF_API_KEY')

  if (htmlToPdfApiKey) {
    const response = await fetch('https://api.html2pdf.app/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': htmlToPdfApiKey,
      },
      body: JSON.stringify({
        html,
        format: 'A4',
        printBackground: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTML2PDF API error: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  }

  throw new Error('No PDF generation service configured (BROWSERLESS_API_KEY or HTML_TO_PDF_API_KEY required)')
}

/**
 * Generate score badge color
 */
function getScoreColor(score: number): string {
  if (score >= 90) return '#10b981' // green
  if (score >= 50) return '#f59e0b' // amber
  return '#ef4444' // red
}

/**
 * Generate CWV status
 */
function getCWVStatus(metric: string, value: number): { label: string; color: string } {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1800, needsImprovement: 3000 },
    ttfb: { good: 800, needsImprovement: 1800 },
  }

  const threshold = thresholds[metric]
  if (!threshold) return { label: 'Unknown', color: '#64748b' }

  if (value <= threshold.good) return { label: 'Good', color: '#10b981' }
  if (value <= threshold.needsImprovement) return { label: 'Needs Improvement', color: '#f59e0b' }
  return { label: 'Poor', color: '#ef4444' }
}

/**
 * Format milliseconds to seconds
 */
function formatMs(ms: number): string {
  return (ms / 1000).toFixed(2) + 's'
}

/**
 * Generate HTML template for PDF
 */
function generateReportHTML(analysis: AnalysisData): string {
  const cwv = analysis.core_web_vitals
  const url = analysis.analysis_requests.url
  const date = new Date(analysis.created_at).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório ARCO - ${url}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: white;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }

    .header h1 {
      font-size: 36px;
      margin-bottom: 8px;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px;
    }

    .section {
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #0f172a;
      border-bottom: 3px solid #667eea;
      padding-bottom: 8px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .info-item {
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .info-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 4px;
    }

    .info-value {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
    }

    .arco-index {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 16px;
      margin-bottom: 40px;
    }

    .arco-index-score {
      font-size: 72px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }

    .arco-index-label {
      font-size: 18px;
      font-weight: 600;
      color: #64748b;
    }

    .scores-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }

    .score-card {
      text-align: center;
      padding: 24px;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
    }

    .score-value {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .score-label {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
    }

    .cwv-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }

    .cwv-card {
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
      text-align: center;
    }

    .cwv-value {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .cwv-metric {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 8px;
    }

    .cwv-status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      color: white;
    }

    .footer {
      margin-top: 60px;
      padding-top: 24px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }

    .footer-logo {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ARCO</h1>
    <p>Consulting & Analytics</p>
  </div>

  <div class="container">
    <!-- Analysis Info -->
    <div class="section">
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Website Analisado</div>
          <div class="info-value">${url}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Data da Análise</div>
          <div class="info-value">${date}</div>
        </div>
      </div>
    </div>

    <!-- ARCO Index -->
    <div class="arco-index">
      <div class="arco-index-score">${analysis.arco_index}</div>
      <div class="arco-index-label">ARCO Index</div>
    </div>

    <!-- Lighthouse Scores -->
    <div class="section">
      <h2 class="section-title">Lighthouse Scores</h2>
      <div class="scores-grid">
        <div class="score-card">
          <div class="score-value" style="color: ${getScoreColor(analysis.performance_score)}">${analysis.performance_score}</div>
          <div class="score-label">Performance</div>
        </div>
        <div class="score-card">
          <div class="score-value" style="color: ${getScoreColor(analysis.accessibility_score)}">${analysis.accessibility_score}</div>
          <div class="score-label">Accessibility</div>
        </div>
        <div class="score-card">
          <div class="score-value" style="color: ${getScoreColor(analysis.seo_score)}">${analysis.seo_score}</div>
          <div class="score-label">SEO</div>
        </div>
        <div class="score-card">
          <div class="score-value" style="color: ${getScoreColor(analysis.security_score)}">${analysis.security_score}</div>
          <div class="score-label">Security</div>
        </div>
      </div>
    </div>

    <!-- Core Web Vitals -->
    <div class="section">
      <h2 class="section-title">Core Web Vitals</h2>
      <div class="cwv-grid">
        <div class="cwv-card">
          <div class="cwv-metric">LCP</div>
          <div class="cwv-value">${formatMs(cwv.lcp)}</div>
          <span class="cwv-status" style="background: ${getCWVStatus('lcp', cwv.lcp).color}">
            ${getCWVStatus('lcp', cwv.lcp).label}
          </span>
        </div>
        <div class="cwv-card">
          <div class="cwv-metric">FID</div>
          <div class="cwv-value">${formatMs(cwv.fid)}</div>
          <span class="cwv-status" style="background: ${getCWVStatus('fid', cwv.fid).color}">
            ${getCWVStatus('fid', cwv.fid).label}
          </span>
        </div>
        <div class="cwv-card">
          <div class="cwv-metric">CLS</div>
          <div class="cwv-value">${cwv.cls.toFixed(3)}</div>
          <span class="cwv-status" style="background: ${getCWVStatus('cls', cwv.cls).color}">
            ${getCWVStatus('cls', cwv.cls).label}
          </span>
        </div>
        <div class="cwv-card">
          <div class="cwv-metric">FCP</div>
          <div class="cwv-value">${formatMs(cwv.fcp)}</div>
          <span class="cwv-status" style="background: ${getCWVStatus('fcp', cwv.fcp).color}">
            ${getCWVStatus('fcp', cwv.fcp).label}
          </span>
        </div>
        <div class="cwv-card">
          <div class="cwv-metric">TTFB</div>
          <div class="cwv-value">${formatMs(cwv.ttfb)}</div>
          <span class="cwv-status" style="background: ${getCWVStatus('ttfb', cwv.ttfb).color}">
            ${getCWVStatus('ttfb', cwv.ttfb).label}
          </span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">ARCO</div>
      <p>Este relatório foi gerado automaticamente pela plataforma ARCO.</p>
      <p>© 2025 ARCO Consulting. Todos os direitos reservados.</p>
      <p style="margin-top: 8px;">https://consultingarco.com</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { analysisId, userId }: PDFRequest = await req.json()

    if (!analysisId || !userId) {
      throw new Error('Missing required fields: analysisId, userId')
    }

    console.log(`[PDF] Generating report for analysis ${analysisId}`)

    const supabase = createSupabaseClient()

    // Fetch analysis data
    const { data: analysis, error: fetchError } = await supabase
      .from('analysis_results')
      .select(`
        *,
        analysis_requests (
          url,
          created_at,
          user_id
        )
      `)
      .eq('analysis_id', analysisId)
      .single()

    if (fetchError || !analysis) {
      throw new Error(`Analysis not found: ${fetchError?.message}`)
    }

    // Verify user owns this analysis
    if (analysis.analysis_requests.user_id !== userId) {
      throw new Error('Unauthorized: You do not own this analysis')
    }

    // Generate HTML
    const html = generateReportHTML(analysis as AnalysisData)

    // Generate PDF
    const pdfBytes = await generatePDFFromHTML(html)

    // Upload to Supabase Storage
    const fileName = `report-${analysisId}-${Date.now()}.pdf`
    const { data: upload, error: uploadError } = await supabase.storage
      .from('reports')
      .upload(`${userId}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Failed to upload PDF: ${uploadError.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('reports')
      .getPublicUrl(`${userId}/${fileName}`)

    console.log(`[PDF] Report generated: ${fileName}`)

    // Track in audit log
    await supabase.from('audit_log').insert({
      user_id: userId,
      action: 'pdf_generated',
      resource_type: 'analysis_results',
      resource_id: analysisId,
      details: {
        file_name: fileName,
        file_size: pdfBytes.length,
      },
    })

    return new Response(
      JSON.stringify({
        success: true,
        pdf_url: urlData.publicUrl,
        file_name: fileName,
        file_size: pdfBytes.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[PDF] Error:', errorMessage)

    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
