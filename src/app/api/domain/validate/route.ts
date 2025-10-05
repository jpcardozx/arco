import { NextRequest } from 'next/server'
import { z } from 'zod'
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse,
  rateLimitResponse
} from '@/lib/api/api-response'

/**
 * API ROUTE: /api/domain/validate
 *
 * Validates domain and returns analysis
 * - DNS records check
 * - WHOIS data
 * - SSL certificate validation
 * - Check if already in database
 * - Return suggestions if unavailable
 *
 * Phase 3: Backend Integration
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

    // TODO Phase 3: Call Python script for real validation
    // For now, mock response with realistic data
    const mockResponse: DomainValidationResult = {
      domain,
      isValid: true,
      isAvailable: !domain.includes('test'), // Mock: "test" domains are unavailable
      dnsRecords: {
        a: ['192.0.2.1', '192.0.2.2'],
        mx: ['mail.example.com', 'mail2.example.com'],
        txt: ['v=spf1 include:_spf.example.com ~all'],
      },
      sslValid: !domain.includes('invalid'),
      suggestions: domain.includes('test')
        ? [
            domain.replace('test', 'demo'),
            domain.replace('test', 'prod'),
            `new-${domain}`,
          ]
        : [],
      cachedUntil: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour cache
      performanceScore: Math.floor(Math.random() * 30) + 70 // Mock: 70-100
    }

    // TODO Phase 3: Save to database (domain_validations table)
    console.log('[API] Domain validation:', mockResponse)

    return successResponse(
      mockResponse,
      'Domínio validado com sucesso',
      {
        cached: false,
        provider: 'mock'
      }
    )
  } catch (error) {
    return internalErrorResponse(error, 'Erro ao validar domínio')
  }
}

// Rate limiting (TODO Phase 3: implement with Redis/Upstash)
export const config = {
  runtime: 'edge', // Use Edge Runtime for better performance
};
