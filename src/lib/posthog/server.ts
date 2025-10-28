/**
 * PostHog Server-Side Analytics
 * 
 * Wrapper para tracking server-side via PostHog Node SDK.
 * 
 * @module lib/posthog/server
 * 
 * Quando usar:
 * - API routes (tracking backend)
 * - Webhooks (pagamentos, eventos externos)
 * - Actions/mutations (depois de DB writes)
 * - Server Components (com cache cuidadoso)
 * 
 * Vantagens vs Client-Side:
 * - 100% delivery (sem ad blockers)
 * - Dados sensíveis (user_id, email) seguros
 * - Eventos backend (webhooks, cron jobs)
 * - Deduplicação com client (via distinct_id)
 * 
 * Deduplicação:
 * - Client: window.posthog.get_distinct_id()
 * - Server: same distinct_id para mesmo user
 * - PostHog auto-merge eventos
 * 
 * @example Basic Event
 * ```ts
 * import { trackEvent } from '@/lib/posthog/server';
 * 
 * // Em API route
 * await trackEvent({
 *   distinctId: userId,
 *   event: 'tripwire_purchased',
 *   properties: {
 *     amount: 147,
 *     payment_method: 'pix',
 *   },
 * });
 * ```
 * 
 * @example Identify User
 * ```ts
 * import { identifyUser } from '@/lib/posthog/server';
 * 
 * // Depois de cadastro
 * await identifyUser({
 *   distinctId: userId,
 *   properties: {
 *     email: 'cliente@example.com',
 *     name: 'João Silva',
 *     segment: 'ecommerce',
 *     created_at: new Date().toISOString(),
 *   },
 * });
 * ```
 * 
 * @example Alias (Anonymous → Known)
 * ```ts
 * import { aliasUser } from '@/lib/posthog/server';
 * 
 * // Quando user anônimo vira conhecido
 * await aliasUser({
 *   distinctId: userId, // ID permanente
 *   alias: anonymousId, // ID temporário (cookie)
 * });
 * ```
 */

import { PostHog } from 'posthog-node';

/**
 * Singleton PostHog client
 * Reutiliza mesma instância entre requests
 */
let posthogClient: PostHog | null = null;

/**
 * Get or create PostHog client
 * 
 * @returns PostHog client instance
 * @throws Error if POSTHOG_API_KEY not set
 * 
 * @example
 * ```ts
 * const client = getPostHogClient();
 * await client.capture({ ... });
 * ```
 */
export function getPostHogClient(): PostHog {
  if (posthogClient) {
    return posthogClient;
  }

  const apiKey = process.env.POSTHOG_API_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey) {
    throw new Error(
      'POSTHOG_API_KEY not set. Obtenha em PostHog → Settings → Project Settings → API Keys (Personal API Key)'
    );
  }

  posthogClient = new PostHog(apiKey, {
    host,
    // Flush events a cada 10s ou 20 eventos (menor latência)
    flushAt: 20,
    flushInterval: 10000,
  });

  return posthogClient;
}

/**
 * Track event properties
 */
export interface TrackEventParams {
  /** User unique identifier (user_id, email, phone, etc) */
  distinctId: string;
  
  /** Event name (snake_case recomendado) */
  event: string;
  
  /** Event properties (any JSON-serializable data) */
  properties?: Record<string, any>;
  
  /** Timestamp (default: now) */
  timestamp?: Date;
  
  /** Send immediately (default: false - batched) */
  sendNow?: boolean;
}

/**
 * Track server-side event
 * 
 * @param params - Event parameters
 * @returns Promise<void>
 * 
 * @example Lead capture
 * ```ts
 * await trackEvent({
 *   distinctId: email,
 *   event: 'lead_captured',
 *   properties: {
 *     source: 'lead_magnet',
 *     segment: 'ecommerce',
 *     url: '/lead-magnet',
 *   },
 * });
 * ```
 * 
 * @example Purchase
 * ```ts
 * await trackEvent({
 *   distinctId: userId,
 *   event: 'purchase',
 *   properties: {
 *     product: 'tripwire_diagnosis',
 *     amount: 147,
 *     payment_status: 'approved',
 *     payment_id: 'mp_123456',
 *   },
 *   sendNow: true, // Flush imediato (webhooks)
 * });
 * ```
 */
export async function trackEvent({
  distinctId,
  event,
  properties = {},
  timestamp,
  sendNow = false,
}: TrackEventParams): Promise<void> {
  try {
    const client = getPostHogClient();

    client.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        // Tag para diferenciar server vs client
        $lib: 'posthog-node',
        $lib_version: '5.10.4',
      },
      timestamp,
      sendFeatureFlags: false, // Não precisa enviar flags (economiza API calls)
    });

    if (sendNow) {
      await client.flush();
    }

    console.log('[PostHog Server] Event tracked:', {
      event,
      distinctId,
      properties,
    });
  } catch (error) {
    console.error('[PostHog Server] Error tracking event:', error);
    // Não throw - tracking nunca deve quebrar request
  }
}

/**
 * Identify user properties
 */
export interface IdentifyUserParams {
  /** User unique identifier */
  distinctId: string;
  
  /** User properties (email, name, etc) */
  properties: Record<string, any>;
  
  /** Send immediately (default: false) */
  sendNow?: boolean;
}

/**
 * Identify user with properties
 * 
 * Atualiza/cria profile do user no PostHog.
 * Properties ficam disponíveis para segmentação, cohorts, etc.
 * 
 * @param params - User identification parameters
 * @returns Promise<void>
 * 
 * @example After signup
 * ```ts
 * await identifyUser({
 *   distinctId: userId,
 *   properties: {
 *     email: 'cliente@example.com',
 *     name: 'João Silva',
 *     segment: 'ecommerce',
 *     phone: '+5511999999999',
 *     created_at: new Date().toISOString(),
 *   },
 * });
 * ```
 * 
 * @example Update properties
 * ```ts
 * await identifyUser({
 *   distinctId: userId,
 *   properties: {
 *     tripwire_purchased: true,
 *     last_purchase_date: new Date().toISOString(),
 *     ltv: 147,
 *   },
 * });
 * ```
 */
export async function identifyUser({
  distinctId,
  properties,
  sendNow = false,
}: IdentifyUserParams): Promise<void> {
  try {
    const client = getPostHogClient();

    client.identify({
      distinctId,
      properties,
    });

    if (sendNow) {
      await client.flush();
    }

    console.log('[PostHog Server] User identified:', {
      distinctId,
      properties,
    });
  } catch (error) {
    console.error('[PostHog Server] Error identifying user:', error);
    // Não throw - tracking nunca deve quebrar request
  }
}

/**
 * Alias user parameters
 */
export interface AliasUserParams {
  /** Permanent user ID (known user) */
  distinctId: string;
  
  /** Temporary ID to alias (anonymous ID) */
  alias: string;
  
  /** Send immediately (default: true - alias é crítico) */
  sendNow?: boolean;
}

/**
 * Alias anonymous user to known user
 * 
 * Usa quando user anônimo (cookie) vira conhecido (login/signup).
 * PostHog merge histórico de eventos do alias para distinctId.
 * 
 * @param params - Alias parameters
 * @returns Promise<void>
 * 
 * @example Login/Signup
 * ```ts
 * // Client tinha distinct_id anônimo (cookie)
 * const anonymousId = cookies.get('posthog_distinct_id');
 * 
 * // User fez login/signup, agora temos ID permanente
 * await aliasUser({
 *   distinctId: user.id, // ID permanente
 *   alias: anonymousId,  // ID temporário
 * });
 * ```
 */
export async function aliasUser({
  distinctId,
  alias,
  sendNow = true, // Default true - alias é operação crítica
}: AliasUserParams): Promise<void> {
  try {
    const client = getPostHogClient();

    client.alias({
      distinctId,
      alias,
    });

    if (sendNow) {
      await client.flush();
    }

    console.log('[PostHog Server] User aliased:', {
      distinctId,
      alias,
    });
  } catch (error) {
    console.error('[PostHog Server] Error aliasing user:', error);
    // Não throw - tracking nunca deve quebrar request
  }
}

/**
 * Flush all pending events
 * 
 * Força envio imediato de todos eventos no buffer.
 * Use antes de process.exit() ou em webhooks.
 * 
 * @returns Promise<void>
 * 
 * @example
 * ```ts
 * // No final de webhook
 * await trackEvent({ ... });
 * await flushEvents(); // Garante envio antes de response
 * ```
 */
export async function flushEvents(): Promise<void> {
  try {
    const client = getPostHogClient();
    await client.flush();
    console.log('[PostHog Server] Events flushed');
  } catch (error) {
    console.error('[PostHog Server] Error flushing events:', error);
  }
}

/**
 * Shutdown PostHog client
 * 
 * Flush e close client. Use em process.exit() ou testes.
 * 
 * @returns Promise<void>
 * 
 * @example
 * ```ts
 * process.on('SIGTERM', async () => {
 *   await shutdownPostHog();
 *   process.exit(0);
 * });
 * ```
 */
export async function shutdownPostHog(): Promise<void> {
  try {
    if (posthogClient) {
      await posthogClient.shutdown();
      posthogClient = null;
      console.log('[PostHog Server] Client shutdown');
    }
  } catch (error) {
    console.error('[PostHog Server] Error shutting down:', error);
  }
}

/**
 * Group analytics (empresas, organizações)
 * 
 * Agrupa users por empresa/organização.
 * Útil para B2B, mas não necessário para tripwire.
 * 
 * @param params - Group parameters
 * @returns Promise<void>
 */
export interface GroupAnalyticsParams {
  /** User distinct ID */
  distinctId: string;
  
  /** Group type (ex: 'company', 'organization') */
  groupType: string;
  
  /** Group key (ex: company_id) */
  groupKey: string;
  
  /** Group properties */
  groupProperties?: Record<string, any>;
  
  /** Send immediately */
  sendNow?: boolean;
}

/**
 * Group user to organization
 * 
 * NÃO IMPLEMENTADO AGORA - não necessário para tripwire.
 * Deixar para quando tivermos B2B ou multi-empresa.
 * 
 * @example Future use
 * ```ts
 * await groupUser({
 *   distinctId: userId,
 *   groupType: 'company',
 *   groupKey: companyId,
 *   groupProperties: {
 *     name: 'Empresa XPTO',
 *     plan: 'enterprise',
 *   },
 * });
 * ```
 */
export async function groupUser({
  distinctId,
  groupType,
  groupKey,
  groupProperties = {},
  sendNow = false,
}: GroupAnalyticsParams): Promise<void> {
  try {
    const client = getPostHogClient();

    client.groupIdentify({
      groupType,
      groupKey,
      properties: groupProperties,
    });

    // Associa user ao group
    client.capture({
      distinctId,
      event: '$group',
      properties: {
        $group_type: groupType,
        $group_key: groupKey,
      },
    });

    if (sendNow) {
      await client.flush();
    }

    console.log('[PostHog Server] User grouped:', {
      distinctId,
      groupType,
      groupKey,
    });
  } catch (error) {
    console.error('[PostHog Server] Error grouping user:', error);
  }
}

/**
 * Feature flags server-side
 * 
 * Verifica feature flags no backend (sem client-side).
 * Útil para A/B tests, rollouts progressivos.
 * 
 * @param distinctId - User ID
 * @param flagKey - Flag key
 * @param defaultValue - Default if flag not found
 * @returns Promise<boolean | string>
 * 
 * @example
 * ```ts
 * const showNewCheckout = await getFeatureFlag(
 *   userId,
 *   'new-checkout-flow',
 *   false
 * );
 * 
 * if (showNewCheckout) {
 *   // Redirect para novo checkout
 * }
 * ```
 */
export async function getFeatureFlag(
  distinctId: string,
  flagKey: string,
  defaultValue: boolean | string = false
): Promise<boolean | string> {
  try {
    const client = getPostHogClient();
    
    const flagValue = await client.getFeatureFlag(flagKey, distinctId);
    
    return flagValue ?? defaultValue;
  } catch (error) {
    console.error('[PostHog Server] Error getting feature flag:', error);
    return defaultValue;
  }
}

/**
 * Batch track multiple events
 * 
 * Útil para imports, migrações, processamento batch.
 * 
 * @param events - Array de eventos
 * @returns Promise<void>
 * 
 * @example Migration
 * ```ts
 * const events = users.map(user => ({
 *   distinctId: user.id,
 *   event: 'user_migrated',
 *   properties: {
 *     source: 'old_system',
 *     created_at: user.createdAt,
 *   },
 * }));
 * 
 * await batchTrackEvents(events);
 * ```
 */
export async function batchTrackEvents(
  events: TrackEventParams[]
): Promise<void> {
  try {
    for (const event of events) {
      await trackEvent({ ...event, sendNow: false });
    }
    
    // Flush tudo de uma vez
    await flushEvents();
    
    console.log(`[PostHog Server] ${events.length} events tracked in batch`);
  } catch (error) {
    console.error('[PostHog Server] Error batch tracking:', error);
  }
}
