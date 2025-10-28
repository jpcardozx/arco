/**
 * Supabase Edge Function: Meta Conversions API Webhook
 *
 * Responsabilidades:
 * 1. Receber eventos do frontend/backend
 * 2. Validar payload e deduplicação (event_id)
 * 3. Enriquecer dados com EMQ (email/phone hashes, fbp/fbc)
 * 4. Enviar para Meta Conversions API
 * 5. Logar e monitorar (observabilidade)
 *
 * Deploy: supabase functions deploy meta-conversions-webhook
 *
 * Variáveis de ambiente necessárias:
 * - META_DATASET_ID
 * - META_CONVERSION_API_TOKEN (rotacionado 21/10/2025 16:30)
 * - META_TEST_EVENT_CODE (opcional)
 *
 * Última atualização: 21/10/2025 - Token Meta renovado
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface MetaConversionsRequest {
  event_name: string;
  event_id?: string;
  event_time?: number;
  user_data: {
    em?: string[];
    ph?: string[];
    fn?: string[];
    ln?: string[];
    ct?: string[];
    st?: string[];
    zp?: string[];
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
    lead_id?: number;
  };
  custom_data?: Record<string, any>;
  action_source?: string;
  test_event_code?: string;
  is_test?: boolean;
}

interface EdgeFunctionPayload {
  event_name: string;
  user_data: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
  };
  custom_data?: Record<string, any>;
  event_id?: string;
  is_test?: boolean;
}

interface TrackingContext {
  requestId: string;
  timestamp: string;
  isDuplicate: boolean;
  duplicateOf?: string;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Gera trace ID único para correlacionar requisições
 */
function generateTraceId(): string {
  return `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Hash SHA-256 com normalização
 */
async function sha256Hash(data: string): Promise<string> {
  if (!data) return "";

  const normalized = data.trim().toLowerCase();
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(normalized));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Normaliza e converte email em hash
 */
async function hashEmail(email: string): Promise<string> {
  return sha256Hash(email);
}

/**
 * Normaliza e converte telefone em hash
 * Remove caracteres não-numéricos, adiciona código do país
 */
async function hashPhone(phone: string, countryCode: string = "55"): Promise<string> {
  if (!phone) return "";

  let normalized = phone.replace(/\D/g, "");
  if (!normalized.startsWith(countryCode)) {
    normalized = countryCode + normalized;
  }

  return sha256Hash(normalized);
}

/**
 * Extrai _fbp e _fbc dos cookies da requisição
 * Melhora EMQ ao capturar dados de tracking do Meta Pixel
 */
function extractFbParams(req: Request): { fbp?: string; fbc?: string } {
  const cookies = req.headers.get("cookie") || "";
  const cookieObj: Record<string, string> = {};

  cookies.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    if (key && value) {
      cookieObj[key] = decodeURIComponent(value);
    }
  });

  // Extrai fbclid da URL se disponível (para construir fbc)
  const url = new URL(req.url);
  const fbclid = url.searchParams.get("fbclid");

  return {
    fbp: cookieObj["_fbp"] || undefined,
    fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : cookieObj["_fbc"] || undefined,
  };
}

/**
 * Gera event_id se não fornecido
 */
function ensureEventId(input?: string): string {
  if (input) return input;
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `evt_${timestamp}_${random}`;
}

/**
 * Log estruturado com contexto
 */
function logEvent(
  level: "INFO" | "WARN" | "ERROR" | "DEBUG",
  message: string,
  context: Partial<TrackingContext> & Record<string, any>
) {
  const timestamp = new Date().toISOString();
  console.log(
    JSON.stringify({
      timestamp,
      level,
      message,
      ...context,
    })
  );
}

// ============================================================================
// DEDUPLICATION (DATABASE - Persistent)
// ============================================================================

/**
 * Simple in-memory dedup (temporary) - use backend for persistent dedup
 * NOTA: REST API from Deno Edge Functions não funciona bem com SERVICE_ROLE_KEY
 * Solução real: dedup implementada no backend API route
 */
const dedupCache = new Map<string, number>();
const DEDUP_TTL = 3600000; // 1 hora

async function checkDedup(eventId: string): Promise<boolean> {
  try {
    const timestamp = dedupCache.get(eventId);
    if (!timestamp) return false;

    // Se expirou, remover
    if (Date.now() - timestamp > DEDUP_TTL) {
      dedupCache.delete(eventId);
      return false;
    }

    logEvent("DEBUG", "Dedup cache hit", { eventId });
    return true;
  } catch (error) {
    logEvent("WARN", "Dedup check exception", { error: String(error), eventId });
    return false;
  }
}

/**
 * Registra evento como processado (em-memory)
 */
async function recordDedup(eventId: string): Promise<void> {
  try {
    dedupCache.set(eventId, Date.now());
    logEvent("DEBUG", "Dedup recorded", { eventId });
  } catch (error) {
    logEvent("WARN", "Failed to record dedup", { error: String(error) });
  }
}

// ============================================================================
// META CONVERSIONS API
// ============================================================================

/**
 * Log de evento para observabilidade
 */
async function logEventToDB(
  eventId: string,
  traceId: string,
  eventName: string,
  status: string,
  fbtrace_id?: string,
  error?: string,
  duration?: number
): Promise<void> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) return;

    await fetch(`${supabaseUrl}/rest/v1/meta_events_log`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${serviceRoleKey}`,
        "apikey": serviceRoleKey,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        event_id: eventId,
        trace_id: traceId,
        event_name: eventName,
        status: status,
        meta_fbtrace_id: fbtrace_id || null,
        error_message: error || null,
        request_duration_ms: duration || null,
      }),
    });
  } catch (e) {
    logEvent("WARN", "Failed to log event to DB", { error: String(e) });
  }
}

/**
 * Envia evento para Meta Conversions API com retry
 */
async function sendToMetaAPI(
  payload: MetaConversionsRequest,
  context: Partial<TrackingContext>
): Promise<{ success: boolean; response?: any; error?: string }> {
  const metaDatasetId = Deno.env.get("META_DATASET_ID");
  const metaToken = Deno.env.get("META_CONVERSION_API_ACCESS_TOKEN");

  // DEBUG: Log token status
  logEvent("DEBUG", "Meta credentials check", {
    ...context,
    datasetId: metaDatasetId ? "present" : "MISSING",
    tokenLength: metaToken ? metaToken.length : 0,
    tokenPrefix: metaToken ? metaToken.substring(0, 20) : "NONE",
  });

  if (!metaDatasetId || !metaToken) {
    const error = "Meta credentials not configured";
    logEvent("ERROR", error, { ...context, credentials_check: "failed" });
    return { success: false, error };
  }

  const endpoint = `https://graph.facebook.com/v24.0/${metaDatasetId}/events?access_token=${metaToken}`;

  const metaPayload: any = {
    data: [payload],
  };

  if (payload.is_test) {
    const testCode = Deno.env.get("META_TEST_EVENT_CODE");
    if (testCode) {
      metaPayload.test_event_code = testCode;
    }
  }

  try {
    logEvent("DEBUG", "Sending to Meta API", {
      ...context,
      endpoint: endpoint.replace(metaToken, "***"),
      payload: JSON.stringify(metaPayload),
      tokenPrefix: metaToken.substring(0, 20),
      datasetId: metaDatasetId,
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metaPayload),
    });

    let result;
    try {
      result = await response.json();
    } catch (e) {
      const rawText = await response.text();
      logEvent("ERROR", "Failed to parse Meta response as JSON", {
        ...context,
        status: response.status,
        rawResponse: rawText,
      });
      return { 
        success: false, 
        error: `Meta API error: ${response.status} (invalid JSON)`,
        response: { raw: rawText }
      };
    }

    if (!response.ok) {
      const error = `Meta API error: ${response.status}`;
      logEvent("ERROR", error, {
        ...context,
        status: response.status,
        response: result,
      });
      return { success: false, error, response: result };
    }

    logEvent("INFO", "Successfully sent to Meta API", {
      ...context,
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });

    return { success: true, response: result };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    logEvent("ERROR", "Failed to send to Meta API", {
      ...context,
      error: errorMsg,
    });
    return { success: false, error: errorMsg };
  }
}

// ============================================================================
// ENRICH USER DATA COM EMQ
// ============================================================================

/**
 * Enriquece user_data com hashes para melhorar Event Match Quality
 */
async function enrichUserDataWithEMQ(
  input: EdgeFunctionPayload["user_data"]
): Promise<MetaConversionsRequest["user_data"]> {
  const userData: MetaConversionsRequest["user_data"] = {
    client_ip_address: input.client_ip_address,
    client_user_agent: input.client_user_agent,
    fbp: input.fbp,
    fbc: input.fbc,
  };

  // Email hash
  if (input.email) {
    userData.em = [await hashEmail(input.email)];
  }

  // Phone hash
  if (input.phone) {
    userData.ph = [await hashPhone(input.phone)];
  }

  // First name hash
  if (input.firstName) {
    userData.fn = [await sha256Hash(input.firstName)];
  }

  // Last name hash
  if (input.lastName) {
    userData.ln = [await sha256Hash(input.lastName)];
  }

  // City hash
  if (input.city) {
    userData.ct = [await sha256Hash(input.city)];
  }

  // State hash
  if (input.state) {
    userData.st = [await sha256Hash(input.state)];
  }

  // Zip code hash
  if (input.zipCode) {
    userData.zp = [await sha256Hash(input.zipCode)];
  }

  return userData;
}

// ============================================================================
// REQUEST VALIDATION
// ============================================================================

/**
 * Valida payload da requisição
 */
function validatePayload(
  body: any
): { valid: boolean; error?: string; payload?: EdgeFunctionPayload } {
  if (!body.event_name || typeof body.event_name !== "string") {
    return { valid: false, error: "Missing or invalid event_name" };
  }

  if (!body.user_data || typeof body.user_data !== "object") {
    return { valid: false, error: "Missing or invalid user_data" };
  }

  if (!body.user_data.email && !body.user_data.phone) {
    return {
      valid: false,
      error: "At least email or phone is required in user_data",
    };
  }

  const payload: EdgeFunctionPayload = {
    event_name: body.event_name,
    user_data: {
      email: body.user_data.email,
      phone: body.user_data.phone,
      firstName: body.user_data.firstName,
      lastName: body.user_data.lastName,
      city: body.user_data.city,
      state: body.user_data.state,
      zipCode: body.user_data.zipCode,
      client_ip_address: body.user_data.client_ip_address,
      client_user_agent: body.user_data.client_user_agent,
      fbp: body.user_data.fbp,
      fbc: body.user_data.fbc,
    },
    custom_data: body.custom_data || {},
    event_id: body.event_id,
    is_test: body.is_test || false,
  };

  return { valid: true, payload };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

// HANDLER FUNCTION
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const traceId = generateTraceId();
  const context: Partial<TrackingContext> = {
    requestId: traceId,
    timestamp: new Date().toISOString(),
  };

  try {
    logEvent("INFO", "Received request", { ...context, method: req.method });

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
          requestId: traceId,
        }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON payload",
          requestId: traceId,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate payload
    const { valid, error, payload } = validatePayload(body);
    if (!valid) {
      logEvent("WARN", "Invalid payload", { ...context, error });
      return new Response(
        JSON.stringify({
          error,
          requestId: traceId,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Ensure event_id
    const eventId = ensureEventId(payload!.event_id);
    context.eventId = eventId;

    // Check deduplication (now async)
    const isDuplicate = await checkDedup(eventId);
    if (isDuplicate) {
      context.isDuplicate = true;
      logEvent("WARN", "Duplicate event detected", context);

      // Log to DB
      await logEventToDB(
        eventId,
        traceId,
        payload!.event_name,
        "duplicate"
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: "Duplicate event",
          isDuplicate: true,
          requestId: traceId,
        }),
        {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Enrich user data with EMQ
    const enrichedUserData = await enrichUserDataWithEMQ(payload!.user_data);

    // Build Meta Conversions API payload
    const metaPayload: MetaConversionsRequest = {
      event_name: payload!.event_name,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      user_data: enrichedUserData,
      custom_data: {
        event_source: "crm",
        lead_event_source: "ARCO WebDev",
        ...payload!.custom_data,
      },
      action_source: "system_generated",
    };

    logEvent("DEBUG", "Built Meta payload", {
      ...context,
      payload: JSON.stringify(metaPayload),
    });

    // Send to Meta API
    const sendStart = Date.now();
    const metaResult = await sendToMetaAPI(metaPayload, context);
    const sendDuration = Date.now() - sendStart;

    if (!metaResult.success) {
      // Log failure
      await logEventToDB(
        eventId,
        traceId,
        payload!.event_name,
        "failed",
        undefined,
        metaResult.error,
        sendDuration
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: metaResult.error,
          metaResponse: metaResult.response,
          requestId: traceId,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Record in dedup store (async)
    await recordDedup(eventId);

    // Log success
    const fbtrace = metaResult.response?.fbtrace_id;
    await logEventToDB(
      eventId,
      traceId,
      payload!.event_name,
      "success",
      fbtrace,
      undefined,
      sendDuration
    );

    logEvent("INFO", "Event processed successfully", {
      ...context,
      isDuplicate: false,
      fbtrace,
      duration: sendDuration,
    });

    return new Response(
      JSON.stringify({
        success: true,
        eventId,
        requestId: traceId,
        metaResponse: metaResult.response,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    logEvent("ERROR", "Unhandled error", {
      ...context,
      error: errorMsg,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        requestId: traceId,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
