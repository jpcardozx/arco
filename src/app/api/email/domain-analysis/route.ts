import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { EmailService } from '@/lib/email';

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

    // Send internal notification using EmailService
    const emailService = new EmailService();
    const result = await emailService.sendNotification(
      { email: 'leads@arco.digital', name: 'Equipe ARCO' },
      'Equipe ARCO',
      {
        title: `🔍 Nova Análise de Domínio: ${domain}`,
        message: `
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Domínio:</strong> ${domain}</p>
            <p style="margin: 0 0 10px 0;"><strong>Request ID:</strong> ${requestId}</p>
            <p style="margin: 0 0 10px 0;"><strong>Session ID:</strong> ${sessionId}</p>
            <p style="margin: 0 0 10px 0;"><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            ${metadata?.utmSource ? `<p style="margin: 0 0 10px 0;"><strong>UTM Source:</strong> ${metadata.utmSource}</p>` : ''}
            ${metadata?.utmMedium ? `<p style="margin: 0 0 10px 0;"><strong>UTM Medium:</strong> ${metadata.utmMedium}</p>` : ''}
            ${metadata?.utmCampaign ? `<p style="margin: 0 0 10px 0;"><strong>UTM Campaign:</strong> ${metadata.utmCampaign}</p>` : ''}
          </div>
        `,
        actionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads?filter=domain_analyzer`,
        actionLabel: 'Ver no Dashboard'
      }
    );

    if (!result.success) {
      console.error('[Email API] Send error:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email',
          message: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        emailId: result.messageId,
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
