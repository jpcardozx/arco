/**
 * Email Verification Handler
 *
 * Handles POST requests to verify email tokens
 * Called when user clicks the verification link in their email
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse
} from '@/lib/api/api-response';

const verifySchema = z.object({
  lead_id: z.string().uuid('Lead ID inválido'),
  token: z.string().min(32, 'Token inválido')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = verifySchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error, 'Dados inválidos');
    }

    const { lead_id, token } = validation.data;

    console.log('[Email Verification] Processing verification for lead:', lead_id);

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Call database function to verify token
    const { data, error } = await supabase.rpc('verify_email_token', {
      p_lead_id: lead_id,
      p_token: token
    });

    if (error) {
      console.error('[Email Verification] Error verifying token:', error);
      return internalErrorResponse('Erro ao verificar email');
    }

    const result = data?.[0];

    if (!result?.success) {
      return successResponse(
        {
          verified: false,
          message: result?.message || 'Token inválido ou expirado'
        },
        undefined,
        undefined,
        400
      );
    }

    console.log('[Email Verification] Email verified successfully for lead:', lead_id);

    return successResponse({
      verified: true,
      message: 'Email verificado com sucesso! 🎉'
    });
  } catch (error) {
    console.error('[Email Verification] Error:', error);
    return internalErrorResponse(
      error instanceof Error ? error.message : 'Erro ao processar verificação'
    );
  }
}

/**
 * GET handler for verification link (redirect/page)
 * Used when user clicks email link: /api/emails/verify?token=xxx&lead_id=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const leadId = searchParams.get('lead_id');

    if (!token || !leadId) {
      return new Response('Token ou Lead ID faltando', { status: 400 });
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Call database function to verify token
    const { data, error } = await supabase.rpc('verify_email_token', {
      p_lead_id: leadId,
      p_token: token
    });

    if (error) {
      console.error('[Email Verification] Error verifying token:', error);
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Erro na Verificação</title></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f5;">
            <div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h1 style="color: #d32f2f; margin-bottom: 20px;">❌ Erro na Verificação</h1>
              <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Ocorreu um erro ao verificar seu email. O link pode estar expirado ou inválido.</p>
              <a href="/" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Voltar ao Site</a>
            </div>
          </body>
        </html>`,
        { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    const result = data?.[0];

    if (!result?.success) {
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Verificação Falhou</title></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f5;">
            <div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h1 style="color: #d32f2f; margin-bottom: 20px;">⚠️ ${result?.message || 'Verificação Falhou'}</h1>
              <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Não conseguimos verificar seu email. Tente novamente ou solicite um novo link.</p>
              <a href="/" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Voltar ao Site</a>
            </div>
          </body>
        </html>`,
        { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // Success page
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><title>Email Verificado</title></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #4caf50; margin-bottom: 20px; font-size: 48px;">✓ Email Verificado!</h1>
            <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Seu email foi confirmado com sucesso. Agora nossa equipe pode entrar em contato com você.</p>
            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <p style="color: #667eea; font-weight: 600; margin: 0;">Próximos Passos:</p>
              <ul style="color: #666; text-align: left; margin: 15px 0 0 0; padding: 0 20px;">
                <li style="margin: 8px 0;">Aguarde contato no WhatsApp</li>
                <li style="margin: 8px 0;">Nosso especialista responde em até 5 minutos</li>
                <li style="margin: 8px 0;">Fique à vontade para fazer todas as perguntas</li>
              </ul>
            </div>
            <a href="/" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Voltar ao Site</a>
          </div>
        </body>
      </html>`,
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (error) {
    console.error('[Email Verification] GET Error:', error);
    return new Response('Erro ao processar verificação', { status: 500 });
  }
}
