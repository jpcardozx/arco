import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_CONFIG } from '@/lib/email/resend-service';

/**
 * API Route: Send Domain Analysis Confirmation Email
 * Triggered after domain capture to notify internal team
 */

const emailSchema = z.object({
  domain: z.string().min(3),
  sessionId: z.string().uuid(),
  requestId: z.string().uuid(),
  metadata: z.object({
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { domain, sessionId, requestId, metadata } = validation.data;

    // Send internal notification
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: 'leads@arco.digital', // Internal team email
      subject: `🔍 Nova Análise de Domínio: ${domain}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #6366f1; margin: 0 0 30px 0;">🔍 Nova Solicitação de Análise</h2>
          
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Domínio:</strong> ${domain}</p>
            <p style="margin: 0 0 10px 0;"><strong>Request ID:</strong> ${requestId}</p>
            <p style="margin: 0 0 10px 0;"><strong>Session ID:</strong> ${sessionId}</p>
            <p style="margin: 0 0 10px 0;"><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            ${
              metadata?.utmSource
                ? `<p style="margin: 0 0 10px 0;"><strong>UTM Source:</strong> ${metadata.utmSource}</p>`
                : ''
            }
            ${
              metadata?.utmMedium
                ? `<p style="margin: 0 0 10px 0;"><strong>UTM Medium:</strong> ${metadata.utmMedium}</p>`
                : ''
            }
            ${
              metadata?.utmCampaign
                ? `<p style="margin: 0 0 10px 0;"><strong>UTM Campaign:</strong> ${metadata.utmCampaign}</p>`
                : ''
            }
          </div>
          
          <div style="text-align: center; padding: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads?filter=domain_analyzer" 
               style="display: inline-block; background: #6366f1; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 500;">
              Ver no Dashboard
            </a>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
              ARCO Digital - Sistema de Captura de Leads
            </p>
          </div>
        </div>
      `,
      text: `
Nova Solicitação de Análise de Domínio

Domínio: ${domain}
Request ID: ${requestId}
Session ID: ${sessionId}
Data/Hora: ${new Date().toLocaleString('pt-BR')}
${metadata?.utmSource ? `UTM Source: ${metadata.utmSource}` : ''}
${metadata?.utmMedium ? `UTM Medium: ${metadata.utmMedium}` : ''}
${metadata?.utmCampaign ? `UTM Campaign: ${metadata.utmCampaign}` : ''}

Ver no Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads
      `,
    });

    if (error) {
      console.error('[Email API] Send error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email',
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        emailId: data?.id,
        domain,
      },
      message: 'Email enviado com sucesso',
    });
  } catch (error: any) {
    console.error('[Email API] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
