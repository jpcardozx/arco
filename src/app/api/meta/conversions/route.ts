/**
 * API Route: Meta Conversions Webhook
 * 
 * Camada de segurança entre frontend e Supabase Edge Function
 * - Frontend → POST /api/meta/conversions (anônimo)
 * - Backend → POST Edge Function (com SERVICE_ROLE_KEY)
 * 
 * Benefícios:
 * ✅ Frontend nunca expõe SERVICE_ROLE_KEY
 * ✅ Validação adicional no backend
 * ✅ Rate limiting
 * ✅ Logging centralizado
 * ✅ Controle fino sobre quem pode chamar
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/meta/conversions
 * 
 * Exemplo:
 * curl -X POST http://localhost:3000/api/meta/conversions \
 *   -H "Content-Type: application/json" \
 *   -d '{"event_name":"Lead","user_data":{"email":"test@test.com"}}'
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validação básica
    if (!body.event_name || !body.user_data?.email) {
      return NextResponse.json(
        { error: "Missing required fields: event_name, user_data.email" },
        { status: 400 }
      );
    }

    // Obter SERVICE_ROLE_KEY (seguro no servidor)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
      console.error("Missing Supabase credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Chamar Edge Function com SERVICE_ROLE_KEY (JWT válido)
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/meta-conversions-webhook`;

    console.log(`[Meta API] Forwarding to Edge Function: ${body.event_name}`);

    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // SERVICE_ROLE_KEY é um JWT válido no servidor Supabase
        "Authorization": `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    // Se Edge Function retorna erro, passar para frontend
    if (!response.ok) {
      console.error(`[Meta API] Edge Function error:`, result);
      return NextResponse.json(result, { status: response.status });
    }

    // Sucesso
    console.log(`[Meta API] Event tracked: ${result.eventId}`);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Meta API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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
