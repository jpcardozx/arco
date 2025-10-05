/**
 * API Response Utilities
 * Padronização de respostas de API
 */

import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    [key: string]: any
  }
}

export interface ApiErrorResponse {
  success: false
  error: string
  message?: string
  details?: any
  code?: string
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Cria resposta de sucesso padronizada
 */
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: ApiSuccessResponse['meta'],
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
      ...(meta && { meta })
    },
    { status }
  )
}

/**
 * Cria resposta de erro padronizada
 */
export function errorResponse(
  error: string,
  message?: string,
  details?: any,
  status: number = 400,
  code?: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(message && { message }),
      ...(details && { details }),
      ...(code && { code })
    },
    { status }
  )
}

/**
 * Trata erros de validação Zod
 */
export function validationErrorResponse(
  zodError: ZodError,
  message: string = 'Dados inválidos'
): NextResponse<ApiErrorResponse> {
  return errorResponse(
    'VALIDATION_ERROR',
    message,
    zodError.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code
    })),
    400,
    'VALIDATION_ERROR'
  )
}

/**
 * Trata erros não esperados
 */
export function internalErrorResponse(
  error: unknown,
  message: string = 'Erro interno do servidor'
): NextResponse<ApiErrorResponse> {
  console.error('[API Error]', error)

  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  return errorResponse(
    'INTERNAL_ERROR',
    message,
    process.env.NODE_ENV === 'development' ? { error: errorMessage } : undefined,
    500,
    'INTERNAL_ERROR'
  )
}

/**
 * Trata erros de autenticação
 */
export function unauthorizedResponse(
  message: string = 'Não autorizado'
): NextResponse<ApiErrorResponse> {
  return errorResponse('UNAUTHORIZED', message, undefined, 401, 'UNAUTHORIZED')
}

/**
 * Trata erros de permissão
 */
export function forbiddenResponse(
  message: string = 'Acesso negado'
): NextResponse<ApiErrorResponse> {
  return errorResponse('FORBIDDEN', message, undefined, 403, 'FORBIDDEN')
}

/**
 * Trata erros de recurso não encontrado
 */
export function notFoundResponse(
  resource: string = 'Recurso',
  message?: string
): NextResponse<ApiErrorResponse> {
  return errorResponse(
    'NOT_FOUND',
    message || `${resource} não encontrado`,
    undefined,
    404,
    'NOT_FOUND'
  )
}

/**
 * Trata erros de rate limit
 */
export function rateLimitResponse(
  message: string = 'Muitas requisições. Tente novamente mais tarde.'
): NextResponse<ApiErrorResponse> {
  return errorResponse('RATE_LIMIT', message, undefined, 429, 'RATE_LIMIT')
}
