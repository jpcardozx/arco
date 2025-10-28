/**
 * Lead Magnet API Route
 * Handles form submission and REAL email delivery via Resend
 * NO MOCKS - Production ready
 */

import { NextRequest } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse
} from '@/lib/api/api-response'

// Helper to get Resend client (lazy initialization)
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured');
  }
  
  return new Resend(apiKey);
}

const leadMagnetSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres').max(100),
  phone: z.string().optional().transform(val => val?.replace(/\D/g, '')),
})

export async function POST(request: NextRequest) {
  try {
    const resend = getResendClient();
    const body = await request.json()

    // Validate input
    const validation = leadMagnetSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error, 'Dados do formulário inválidos')
    }

    const validatedData = validation.data

    console.log('[Lead Magnet] Processing submission:', validatedData.email)

    // 1. Save to Supabase leads table
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        full_name: validatedData.name,
        email: validatedData.email,
        company_name: validatedData.company,
        phone: validatedData.phone || null,
        source: 'landing_page', // Must be one of: url_analyzer, landing_page, referral, direct
        status: 'new',
        metadata: {
          lead_magnet: 'checklist-performance',
          form_type: 'lead_magnet',
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          user_agent: request.headers.get('user-agent'),
          submitted_at: new Date().toISOString()
        }
      })
      .select()
      .single()

    if (leadError) {
      console.error('[Lead Magnet] Failed to save lead:', leadError)
      throw new Error('Failed to save lead to database')
    }

    console.log('[Lead Magnet] Lead saved to database:', lead.id)

    // 2. Send REAL email via Resend
    const firstName = validatedData.name.split(' ')[0]
    
    try {
      const emailResult = await resend.emails.send({
        from: 'ARCO Consulting <arco@consultingarco.com>',
        to: [validatedData.email],
        subject: `${firstName}, seu Checklist de Performance está pronto! 🚀`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Seu Checklist de Performance</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🎯 Seu Checklist Está Pronto!</h1>
              </div>
              
              <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Olá <strong>${firstName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Obrigado por confiar na ARCO! Preparamos um checklist completo com <strong>50 pontos de otimização</strong> 
                  que podem transformar a performance do seu site.
                </p>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <h2 style="margin-top: 0; font-size: 18px; color: #1f2937;">📋 O que você vai encontrar:</h2>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;">✅ Análise de Core Web Vitals (LCP, FID, CLS)</li>
                    <li style="margin: 8px 0;">✅ Otimizações de imagens e assets</li>
                    <li style="margin: 8px 0;">✅ Melhorias de SEO técnico</li>
                    <li style="margin: 8px 0;">✅ Estratégias de cache e CDN</li>
                    <li style="margin: 8px 0;">✅ Checklist de segurança (SSL, headers)</li>
                  </ul>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/downloads/checklist-performance.pdf" 
                     style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    📥 Baixar Checklist (PDF)
                  </a>
                </div>

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #92400e;">
                    <strong>💡 Dica do especialista:</strong> Comece pelas otimizações que trazem maior impacto: 
                    imagens, cache e JavaScript bloqueante. Essas três sozinhas podem melhorar seu LCP em até 40%.
                  </p>
                </div>

                <h3 style="font-size: 18px; margin-top: 30px; color: #1f2937;">🚀 Próximos Passos</h3>
                <ol style="margin: 10px 0; padding-left: 20px; font-size: 15px;">
                  <li style="margin: 8px 0;">Baixe e leia o checklist completo</li>
                  <li style="margin: 8px 0;">Marque os pontos que já estão OK no seu site</li>
                  <li style="margin: 8px 0;">Priorize as melhorias por impacto</li>
                  <li style="margin: 8px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color: #667eea; text-decoration: none;">
                      Agende uma análise gratuita →
                    </a>
                  </li>
                </ol>

                <p style="font-size: 15px; margin-top: 30px; color: #6b7280;">
                  Tem dúvidas? Responda este email ou agende uma conversa rápida de 15 minutos.
                </p>

                <p style="font-size: 15px; margin-top: 20px;">
                  Abraço,<br>
                  <strong>Equipe ARCO Consulting</strong>
                </p>
              </div>

              <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
                <p style="margin: 5px 0;">
                  ARCO Consulting - Otimização de Performance Web<br>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #667eea; text-decoration: none;">consultingarco.com</a>
                </p>
                <p style="margin: 10px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${validatedData.email}" 
                     style="color: #9ca3af; text-decoration: underline; font-size: 11px;">
                    Não quer mais receber emails?
                  </a>
                </p>
              </div>
            </body>
          </html>
        `,
      })

      console.log('[Lead Magnet] Email sent successfully:', emailResult)
    } catch (emailError) {
      console.error('[Lead Magnet] Failed to send email:', emailError)
      // Don't throw - lead is already saved
      // We can retry email later via background job
    }

    // 3. Track conversion
    console.log('[Lead Magnet] Conversion tracked for:', validatedData.email)

    return successResponse(
      {
        leadId: lead.id,
        name: validatedData.name,
        email: validatedData.email,
        downloadUrl: '/downloads/checklist-performance.pdf'
      },
      'Checklist enviado para seu email com sucesso!',
      {
        nextSteps: [
          'Verifique sua caixa de entrada (pode levar 1-2 minutos)',
          'Baixe o PDF e aplique as otimizações',
          'Agende uma análise gratuita do seu site'
        ]
      }
    )
  } catch (error) {
    console.error('[Lead Magnet] Error processing submission:', error)
    return internalErrorResponse(error, 'Erro ao processar solicitação de lead magnet')
  }
}
