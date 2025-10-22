/**
 * Supabase Edge Function: Meta Retry Queue
 *
 * Processa eventos falhados com retry exponencial
 * Executado a cada 10 segundos (cron job)
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface RetryEvent {
  id: number;
  event_id: string;
  trace_id: string;
  payload: Record<string, any>;
  retry_count: number;
  max_retries: number;
  next_retry_at: string;
  last_error: string | null;
}

interface CircuitBreaker {
  is_open: boolean;
  error_count: number;
  opened_at: string | null;
}

// Exponential backoff: 1s, 5s, 30s
const BACKOFF_MS = [1000, 5000, 30000];

function logEvent(level: string, msg: string, data: Record<string, any>) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message: msg,
      ...data,
    })
  );
}

async function getCircuitBreakerStatus(
  supabaseUrl: string,
  serviceKey: string
): Promise<CircuitBreaker> {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/meta_circuit_breaker?id=eq.1&select=is_open,error_count,opened_at`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      }
    );

    const data = await response.json();
    return data[0] || { is_open: false, error_count: 0, opened_at: null };
  } catch (e) {
    logEvent("WARN", "Failed to get circuit breaker status", { error: String(e) });
    return { is_open: false, error_count: 0, opened_at: null };
  }
}

async function getRetryQueue(
  supabaseUrl: string,
  serviceKey: string
): Promise<RetryEvent[]> {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/meta_retry_queue?status=eq.pending&next_retry_at=lte.${new Date().toISOString()}&order=next_retry_at.asc&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      }
    );

    if (!response.ok) {
      logEvent("WARN", "Failed to fetch retry queue", {
        status: response.status,
      });
      return [];
    }

    return await response.json();
  } catch (e) {
    logEvent("WARN", "Failed to get retry queue", { error: String(e) });
    return [];
  }
}

async function updateRetryEvent(
  supabaseUrl: string,
  serviceKey: string,
  id: number,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/meta_retry_queue?id=eq.${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(data),
      }
    );

    return response.ok;
  } catch (e) {
    logEvent("WARN", "Failed to update retry event", { error: String(e) });
    return false;
  }
}

async function retryEventToMeta(
  payload: Record<string, any>,
  supabaseUrl: string,
  metaDatasetId: string,
  metaToken: string
): Promise<{ success: boolean; error?: string; fbtrace_id?: string }> {
  try {
    const endpoint = `https://graph.facebook.com/v24.0/${metaDatasetId}/events?access_token=${metaToken}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [payload],
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error?.message || "Unknown error" };
    }

    const data = await response.json();
    return {
      success: true,
      fbtrace_id: data.fbtrace_id,
    };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

serve(async (req: Request) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const metaDatasetId = Deno.env.get("META_DATASET_ID");
  const metaToken = Deno.env.get("META_CONVERSION_API_TOKEN");

  if (!supabaseUrl || !serviceKey || !metaDatasetId || !metaToken) {
    return new Response(
      JSON.stringify({ error: "Missing configuration" }),
      { status: 500 }
    );
  }

  const startTime = Date.now();

  try {
    logEvent("INFO", "Retry queue processing started", {});

    // Check circuit breaker
    const breaker = await getCircuitBreakerStatus(supabaseUrl, serviceKey);
    if (breaker.is_open) {
      logEvent("WARN", "Circuit breaker is open, skipping retry", {
        opened_at: breaker.opened_at,
      });
      return new Response(
        JSON.stringify({
          message: "Circuit breaker open",
          skipped: true,
        }),
        { status: 200 }
      );
    }

    // Get pending retries
    const retries = await getRetryQueue(supabaseUrl, serviceKey);
    logEvent("INFO", "Fetched retry queue", { count: retries.length });

    let successCount = 0;
    let failureCount = 0;

    // Process each retry
    for (const retry of retries) {
      logEvent("INFO", "Processing retry", {
        event_id: retry.event_id,
        retry_count: retry.retry_count,
      });

      // Mark as processing
      await updateRetryEvent(supabaseUrl, serviceKey, retry.id, {
        status: "processing",
      });

      // Send to Meta
      const result = await retryEventToMeta(
        retry.payload,
        supabaseUrl,
        metaDatasetId,
        metaToken
      );

      if (result.success) {
        // Mark as success
        await updateRetryEvent(supabaseUrl, serviceKey, retry.id, {
          status: "success",
          updated_at: new Date().toISOString(),
        });

        logEvent("INFO", "Retry succeeded", {
          event_id: retry.event_id,
          fbtrace_id: result.fbtrace_id,
        });

        successCount++;
      } else {
        // Schedule next retry or mark as failed
        if (retry.retry_count < retry.max_retries) {
          const nextBackoff = BACKOFF_MS[retry.retry_count] || 30000;
          const nextRetryAt = new Date(
            Date.now() + nextBackoff
          ).toISOString();

          await updateRetryEvent(supabaseUrl, serviceKey, retry.id, {
            status: "pending",
            retry_count: retry.retry_count + 1,
            next_retry_at: nextRetryAt,
            last_error: result.error,
            updated_at: new Date().toISOString(),
          });

          logEvent("WARN", "Retry scheduled", {
            event_id: retry.event_id,
            next_retry_in_ms: nextBackoff,
            error: result.error,
          });
        } else {
          // Max retries exceeded
          await updateRetryEvent(supabaseUrl, serviceKey, retry.id, {
            status: "failed",
            last_error: result.error,
            updated_at: new Date().toISOString(),
          });

          logEvent("ERROR", "Retry max attempts exceeded", {
            event_id: retry.event_id,
            error: result.error,
          });

          failureCount++;
        }
      }
    }

    const duration = Date.now() - startTime;

    logEvent("INFO", "Retry queue processing completed", {
      success_count: successCount,
      failure_count: failureCount,
      duration_ms: duration,
    });

    return new Response(
      JSON.stringify({
        processed: retries.length,
        succeeded: successCount,
        failed: failureCount,
        duration_ms: duration,
      }),
      { status: 200 }
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : String(error);
    const duration = Date.now() - startTime;

    logEvent("ERROR", "Retry queue processing failed", {
      error: errorMsg,
      duration_ms: duration,
    });

    return new Response(
      JSON.stringify({ error: errorMsg }),
      { status: 500 }
    );
  }
});
