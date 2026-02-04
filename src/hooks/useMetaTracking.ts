/**
 * useMetaTracking Hook
 *
 * Hook React para tracking direto em Supabase Edge Function.
 *
 * Estratégia:
 * 1. Gera event_id no frontend (para dedup Pixel + CAPI)
 * 2. Coleta FBP/FBC (EMQ)
 * 3. POST direto para Supabase Edge Function
 * 4. Edge Function: valida, dedup, enriquece, envia Meta
 *
 * Zero fallback, zero complexidade. Simples e eficiente.
 */

import { useCallback, useRef } from 'react';
import type { MetaEventName } from '@/lib/tracking/meta-conversions-api';
import { generateEventId } from '@/lib/tracking/meta-conversions-api';
import { evaluateEMQ, trackEMQ } from '@/lib/analytics/emq-monitoring';

// ============================================================================
// TYPES
// ============================================================================

export interface MetaTrackingEventData {
  eventName: MetaEventName;
  userData: {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    [key: string]: any;
  };
  eventId?: string; // Se não fornecido, será gerado automaticamente
  isTest?: boolean;
}

export interface MetaTrackingResponse {
  success: boolean;
  eventId?: string; // ID único para correlação Pixel + CAPI
  requestId?: string; // ID único da requisição para debugging
  message?: string;
  error?: string;
  isDuplicate?: boolean;
  mode?: 'edge' | 'api'; // Qual endpoint foi usado
  duration?: number; // Tempo total em ms
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Obtém cookie por nome
 */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  
  return undefined;
}

/**
 * Obtém Facebook Click ID (fbc) da URL ou cookie
 */
function getFBC(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  // Tentar obter do cookie primeiro
  const fbcCookie = getCookie('_fbc');
  if (fbcCookie) return fbcCookie;

  // Tentar obter da URL (apenas no browser)
  if (typeof window === 'undefined') return undefined;
  
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const fbclid = urlParams?.get('fbclid');
  
  if (fbclid) {
    // Formato: fb.1.timestamp.fbclid
    return `fb.1.${Date.now()}.${fbclid}`;
  }

  return undefined;
}

/**
 * Obtém Facebook Browser ID (fbp) do cookie
 */
function getFBP(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const fbpCookie = getCookie('_fbp');
  if (fbpCookie) return fbpCookie;

  // Gerar FBP se não existir
  // Formato: fb.1.timestamp.randomnumber
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 2147483647);
  return `fb.1.${timestamp}.${random}`;
}

// ============================================================================
// HOOK
// ============================================================================

export function useMetaTracking() {
  const eventIdCacheRef = useRef<Map<string, string>>(new Map());

  /**
   * Gera ou recupera event_id para garantir deduplicação
   * Necessário para correlacionar eventos do Pixel + CAPI
   */
  const getOrGenerateEventId = useCallback((
    eventName: string,
    email: string,
    providedEventId?: string
  ): string => {
    if (providedEventId) {
      return providedEventId;
    }

    // Cache local para evitar regeneração do event_id no mesmo evento
    const cacheKey = `${eventName}_${email}`;
    const cached = eventIdCacheRef.current.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Gerar novo event_id
    const eventId = generateEventId(eventName.toLowerCase());
    eventIdCacheRef.current.set(cacheKey, eventId);

    // Limpar cache após 1 hora (TTL)
    setTimeout(() => {
      eventIdCacheRef.current.delete(cacheKey);
    }, 3600000);

    return eventId;
  }, []);

  /**
   * Envia evento para API local (backend)
   *
   * Fluxo SEGURO:
   * 1. Frontend gera event_id (dedup cache 1h)
   * 2. POST para /api/meta/conversions (local, sem credenciais)
   * 3. Backend usa SERVICE_ROLE_KEY para chamar Edge Function
   * 4. Edge Function valida + dedup + hash + enriquece + Meta API
   * 5. Resposta volta ao frontend
   */
  const trackEvent = useCallback(
    async (data: MetaTrackingEventData): Promise<MetaTrackingResponse> => {
      const startTime = Date.now();
      const eventId = getOrGenerateEventId(
        data.eventName,
        data.userData.email,
        data.eventId
      );

      try {
        // Coletar FBP/FBC (EMQ)
        const fbp = getFBP();
        const fbc = getFBC();

        const logContext = {
          eventName: data.eventName,
          eventId,
          email: data.userData.email,
          fbp,
          fbc,
        };

        // Extra.10: Avaliar e trackear EMQ (Event Match Quality)
        const emqData = evaluateEMQ({
          event_name: data.eventName,
          user_data: {
            fbp,
            fbc,
            em: data.userData.email, // Will be hashed server-side
            ph: data.userData.phone,
            external_id: undefined, // Could add user ID if available
            client_ip_address: undefined, // Collected server-side
            client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          },
        });
        trackEMQ('conversion', emqData);

        console.log("📤 [Meta Tracking] Enviando para API local", {
          ...logContext,
          emq: emqData,
        });

        // POST para API local (backend)
        // Backend cuida da autenticação com Supabase
        const apiUrl = `/api/meta/conversions`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_name: data.eventName,
            user_data: {
              email: data.userData.email,
              phone: data.userData.phone,
              firstName: data.userData.firstName,
              lastName: data.userData.lastName,
              city: data.userData.city,
              state: data.userData.state,
              zipCode: data.userData.zipCode,
              fbp,
              fbc,
            },
            custom_data: data.customData,
            event_id: eventId,
            is_test: data.isTest,
          }),
        });

        const result = await response.json();
        const duration = Date.now() - startTime;

        if (!response.ok) {
          const isDuplicate = response.status === 409;
          console.error("❌ [Meta Tracking] Erro", {
            ...logContext,
            error: result.error,
            status: response.status,
            isDuplicate,
            duration,
          });

          return {
            success: false,
            eventId,
            error: result.error || "Failed to track event",
            isDuplicate,
            duration,
          };
        }

        console.log("✅ [Meta Tracking] Evento rastreado", {
          ...logContext,
          requestId: result.requestId,
          duration,
        });

        return {
          success: true,
          eventId,
          requestId: result.requestId,
          message: "Event tracked successfully",
          isDuplicate: false,
          duration,
        };
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMsg = error instanceof Error ? error.message : "Unknown error";

        console.error("❌ [Meta Tracking] Erro crítico", {
          eventName: data.eventName,
          eventId,
          error: errorMsg,
          duration,
        });

        return {
          success: false,
          eventId,
          error: errorMsg,
          duration,
        };
      }
    },
    [getOrGenerateEventId]
  );

  /**
   * Helper: Track Lead
   * Retorna eventId para passar ao Pixel
   */
  const trackLead = useCallback(async (data: {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    value?: number;
    source?: string;
  }): Promise<MetaTrackingResponse> => {
    const response = await trackEvent({
      eventName: 'Lead',
      userData: {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
      customData: {
        value: data.value,
        currency: 'BRL',
        source: data.source,
      },
    });

    // Disparar Pixel com MESMO event_id (dedup)
    if (response.success && typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          eventID: response.eventId,
          value: data.value,
          currency: 'BRL',
        });
        console.log('📊 [Pixel] Lead disparado com eventId:', response.eventId);
      } catch (error) {
        console.error('❌ Erro ao disparar Lead no Pixel:', error);
      }
    }

    return response;
  }, [trackEvent]);

  /**
   * Helper: Track Schedule
   */
  const trackSchedule = useCallback(async (data: {
    email: string;
    phone?: string;
    value?: number;
    serviceType?: string;
    scheduledDate?: string;
  }): Promise<MetaTrackingResponse> => {
    return trackEvent({
      eventName: 'Schedule',
      userData: {
        email: data.email,
        phone: data.phone,
      },
      customData: {
        value: data.value,
        currency: 'BRL',
        serviceType: data.serviceType,
        scheduledDate: data.scheduledDate,
      },
    });
  }, [trackEvent]);

  /**
   * Helper: Track Purchase
   */
  const trackPurchase = useCallback(async (data: {
    email: string;
    phone?: string;
    value: number;
    currency?: string;
    orderId?: string;
  }): Promise<MetaTrackingResponse> => {
    return trackEvent({
      eventName: 'Purchase',
      userData: {
        email: data.email,
        phone: data.phone,
      },
      customData: {
        value: data.value,
        currency: data.currency || 'BRL',
        orderId: data.orderId,
      },
    });
  }, [trackEvent]);

  /**
   * Helper: Track Contact
   */
  const trackContact = useCallback(async (data: {
    email: string;
    phone?: string;
    message?: string;
  }): Promise<MetaTrackingResponse> => {
    return trackEvent({
      eventName: 'Contact',
      userData: {
        email: data.email,
        phone: data.phone,
      },
      customData: {
        message: data.message,
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLead,
    trackSchedule,
    trackPurchase,
    trackContact,
  };
}
