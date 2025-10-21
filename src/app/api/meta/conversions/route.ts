/**
 * API Route: Meta Conversions Webhook
 * 
 * Camada de segurança entre frontend e Supabase Edge Function
 * - Frontend → POST /api/meta/conversions (anônimo)
 * - Backend → POST Edge Function (com SERVICE_ROLE_KEY)
 * 
 * 🔒 Segurança:
 * ✅ Frontend nunca vê SERVICE_ROLE_KEY ou META_CONVERSION_API_TOKEN
 * ✅ Backend valida payload antes de encaminhar
 * ✅ Todos os tokens mantêm-se em variáveis de ambiente (nunca em logs)
 * ✅ Requests são correlacionadas com X-Request-ID para auditoria
 * ✅ Rate limiting possível nesta camada
 */

import { NextRequest, NextResponse } from "next/server";

interface MetaConversionPayload {
  event_name: string;
  event_id?: string;
  user_data?: {
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  custom_data?: Record<string, any>;
  is_test?: boolean;
}

/**
 * Valida payload de entrada
 */
function validatePayload(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid payload format" };
  }

  if (!body.event_name || typeof body.event_name !== "string") {
    return { valid: false, error: "Missing or invalid event_name" };
  }

  if (!body.user_data || typeof body.user_data !== "object") {
    return { valid: false, error: "Missing or invalid user_data" };
  }

  // Pelo menos email ou phone deve estar presente
  if (!body.user_data.email && !body.user_data.phone) {
    return { valid: false, error: "user_data must have email or phone" };
  }

  return { valid: true };
}

/**
 * Gera trace ID para correlação de requests
 */
function generateTraceId(): string {
  return `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * POST /api/meta/conversions
 * 
 * Exemplo:
 * curl -X POST http://localhost:3001/api/meta/conversions \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "event_name": "Lead",
 *     "user_data": {
 *       "email": "test@example.com",
 *       "phone": "5511999999999"
 *     },
 *     "custom_data": {
 *       "value": 150,
 *       "currency": "BRL"
 *     }
 *   }'
 */
export async function POST(req: NextRequest) {
  const traceId = generateTraceId();
  const startTime = Date.now();

  try {
    // Parse request body
    const body: MetaConversionPayload = await req.json();

    // Validar payload
    const validation = validatePayload(body);
    if (!validation.valid) {
      console.warn(`[Meta API] ${traceId} - Invalid payload: ${validation.error}`);
      return NextResponse.json(
        { 
          error: validation.error,
          traceId 
        },
        { status: 400 }
      );
    }

    // Obter SERVICE_ROLE_KEY (seguro no servidor, NUNCA exposto ao frontend)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
      console.error(`[Meta API] ${traceId} - Missing Supabase credentials`);
      return NextResponse.json(
        { 
          error: "Server configuration error",
          traceId 
        },
        { status: 500 }
      );
    }

    // Log de entrada (sem expor dados sensíveis)
    console.log(`[Meta API] ${traceId} - Received ${body.event_name} event`);

    // Chamar Edge Function com SERVICE_ROLE_KEY (JWT válido)
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/meta-conversions-webhook`;

    console.log(`[Meta API] ${traceId} - Forwarding to Edge Function`);

    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // SERVICE_ROLE_KEY é um JWT válido no servidor Supabase
        "Authorization": `Bearer ${serviceRoleKey}`,
        // Adicionar X-Request-ID para correlação
        "X-Request-ID": traceId,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    const duration = Date.now() - startTime;

    // Se Edge Function retorna erro
    if (!response.ok) {
      console.error(
        `[Meta API] ${traceId} - Edge Function error (${duration}ms):`,
        result.error || result.message
      );
      return NextResponse.json(
        { 
          ...result,
          traceId 
        }, 
        { status: response.status }
      );
    }

    // Sucesso
    console.log(
      `[Meta API] ${traceId} - Success (${duration}ms):`,
      result.success ? "Event tracked" : "Warning"
    );
    
    return NextResponse.json(
      { 
        ...result,
        traceId 
      }, 
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    console.error(`[Meta API] ${traceId} - Exception (${duration}ms):`, errorMsg);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        traceId 
      },
      { status: 500 }
    );
  }
}

/**
 * CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
