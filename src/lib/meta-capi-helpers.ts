/**
 * Meta CAPI Helper Functions
 * Funções auxiliares reutilizáveis para tracking server-side
 */

import { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * Hash de dados usando SHA256 (obrigatório para PII)
 * @param data - Dado a ser hasheado (email, phone, etc)
 * @returns Hash SHA256 em hexadecimal
 */
export async function hashData(data: string): Promise<string> {
  if (!data) return '';
  
  // Normaliza (lowercase, trim)
  const normalized = data.toLowerCase().trim();
  
  // SHA256 hash
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normaliza telefone para formato internacional
 * @param phone - Telefone em qualquer formato
 * @returns Telefone no formato +5511999999999
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';
  
  // Remove tudo exceto números
  const digits = phone.replace(/\D/g, '');
  
  // Brasil: 11 dígitos (11 + 9 dígitos) ou 10 dígitos (11 + 8 dígitos)
  if (digits.length === 11 || digits.length === 10) {
    return `+55${digits}`;
  }
  
  // Se já tem código do país
  if (digits.length === 13 && digits.startsWith('55')) {
    return `+${digits}`;
  }
  
  return phone;
}

/**
 * Extrai IP real do cliente (considerando proxies)
 * @param request - NextRequest object
 * @returns IP do cliente
 */
export function getClientIp(request: NextRequest): string {
  // Vercel forwarding headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback headers
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Último fallback (pode ser IP do proxy)
  // Note: request.ip is not available in NextRequest, using fallback
  return '127.0.0.1';
}

/**
 * Gera event_id único para deduplicação
 * Mesmo event_id deve ser usado no Pixel client-side e CAPI server-side
 * @returns UUID v4
 */
export function generateEventId(): string {
  return crypto.randomUUID();
}

/**
 * Valida se evento Meta é válido
 */
export function isValidMetaEvent(
  eventName: string
): eventName is 'Lead' | 'ViewContent' | 'InitiateCheckout' | 'Purchase' {
  return ['Lead', 'ViewContent', 'InitiateCheckout', 'Purchase'].includes(eventName);
}
