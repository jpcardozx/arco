import { NextRequest } from 'next/server'
import { z } from 'zod'
import { spawn } from 'child_process'
import { createClient } from '@supabase/supabase-js'
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse,
  rateLimitResponse
} from '@/lib/api/api-response'

/**
 * API ROUTE: /api/domain/validate
 *
 * Validates domain and returns REAL analysis (NO MOCKS)
 * - DNS records check (via Python script)
 * - WHOIS data (real lookup)
 * - SSL certificate validation (real check)
 * - Database cache lookup
 * - Domain suggestions if unavailable
 *
 * Phase 3: Backend Integration - PRODUCTION READY
 */

const domainSchema = z.object({
  domain: z
    .string()
    .min(3, 'Domínio muito curto')
    .max(253, 'Domínio muito longo')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/,
      'Formato de domínio inválido'
    )
    .transform(val => val.toLowerCase().trim())
})

interface DomainValidationResult {
  domain: string
  isValid: boolean
  isAvailable: boolean
  dnsRecords: {
    a: string[]
    mx: string[]
    txt: string[]
  }
  sslValid: boolean
  suggestions: string[]
  cachedUntil: string
  performanceScore?: number
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }) // 1 minute window
    return true
  }

  if (limit.count >= 10) { // Max 10 requests per minute
    return false
  }

  limit.count++
  return true
}

/**
 * Execute Python domain validator script
 * Returns REAL domain validation data (NO MOCKS)
 */
async function validateDomainWithPython(domain: string): Promise<DomainValidationResult> {
  return new Promise((resolve, reject) => {
    // Use Python from virtual environment if available
    const pythonPath = process.env.PYTHON_PATH || '.venv/bin/python3'
    const pythonProcess = spawn(pythonPath, [
      'scripts/domain_validator.py',
      domain
    ])

    let output = ''
    let errorOutput = ''

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString()
    })

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('[Domain Validator] Python script error:', errorOutput)
        reject(new Error(`Python script exited with code ${code}: ${errorOutput}`))
        return
      }

      try {
        const result = JSON.parse(output)
        
        // Transform Python output to API format
        const validationResult: DomainValidationResult = {
          domain: result.domain,
          isValid: result.isValid,
          isAvailable: result.isAvailable,
          dnsRecords: {
            a: result.dnsRecords.a || [],
            mx: result.dnsRecords.mx || [],
            txt: result.dnsRecords.txt || []
          },
          sslValid: result.sslValid,
          suggestions: result.suggestions || [],
          cachedUntil: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Cache for 1 hour
          performanceScore: result.performanceScore
        }

        resolve(validationResult)
      } catch (error) {
        console.error('[Domain Validator] Failed to parse Python output:', output)
        reject(new Error('Failed to parse validation results'))
      }
    })

    // Timeout after 30 seconds
    setTimeout(() => {
      pythonProcess.kill()
      reject(new Error('Domain validation timeout (30s)'))
    }, 30000)
  })
}

/**
 * Check cache in database before calling Python
 */
async function getCachedValidation(domain: string): Promise<DomainValidationResult | null> {
  try {
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

    const { data, error } = await supabase
      .from('domain_validations')
      .select('*')
      .eq('domain', domain)
      .gt('cached_until', new Date().toISOString())
      .single()

    if (error || !data) {
      return null
    }

    return {
      domain: data.domain,
      isValid: data.dns_valid,
      isAvailable: data.is_available,
      dnsRecords: data.dns_records || { a: [], mx: [], txt: [] },
      sslValid: data.ssl_valid,
      suggestions: data.suggestions || [],
      cachedUntil: data.cached_until,
      performanceScore: data.lighthouse_score
    }
  } catch (error) {
    console.error('[Domain Validator] Cache lookup error:', error)
    return null
  }
}

/**
 * Save validation to database cache
 */
async function cacheValidation(result: DomainValidationResult): Promise<void> {
  try {
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

    await supabase
      .from('domain_validations')
      .upsert({
        domain: result.domain,
        is_available: result.isAvailable,
        dns_valid: result.isValid,
        ssl_valid: result.sslValid,
        dns_records: result.dnsRecords,
        suggestions: result.suggestions,
        lighthouse_score: result.performanceScore || null,
        cached_until: result.cachedUntil,
        updated_at: new Date().toISOString()
      })
  } catch (error) {
    console.error('[Domain Validator] Failed to cache results:', error)
    // Non-critical error, don't throw
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return rateLimitResponse()
    }

    // Parse body
    const body = await req.json()

    // Validate input
    const validation = domainSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error, 'Formato de domínio inválido')
    }

    const { domain } = validation.data

    console.log('[API] Domain validation requested:', domain)

    // 1. Check cache first
    const cached = await getCachedValidation(domain)
    if (cached) {
      console.log('[API] Returning cached validation:', domain)
      return successResponse(
        cached,
        'Domínio validado com sucesso (cache)',
        {
          cached: true,
          provider: 'database'
        }
      )
    }

    // 2. Call Python script for REAL validation
    console.log('[API] Running Python validation for:', domain)
    const result = await validateDomainWithPython(domain)

    // 3. Cache the result
    await cacheValidation(result)

    console.log('[API] Domain validation completed:', domain, result)

    return successResponse(
      result,
      'Domínio validado com sucesso',
      {
        cached: false,
        provider: 'python-validator'
      }
    )
  } catch (error) {
    console.error('[API] Domain validation error:', error)
    return internalErrorResponse(error, 'Erro ao validar domínio')
  }
}

// NOTE: Removed Edge Runtime because we need Node.js APIs (child_process)
// Edge Runtime doesn't support spawning processes
