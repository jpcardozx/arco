/**
 * Generic Lead Capture API Route
 * Handles form submission from landing pages with campaign tracking
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse
} from '@/lib/api/api-response';

// Helper to get Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured');
  }
  
  return new Resend(apiKey);
}

// Validation schema for lead capture
const leadCaptureSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido').max(15),
  campaign_slug: z.string().optional(),
  campaign_id: z.string().uuid().optional(),
  source: z.string().default('landing_page'),
  
  // UTM parameters
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  
  // Additional fields
  message: z.string().optional(),
  company: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = leadCaptureSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error, 'Dados do formulário inválidos');
    }

    const validatedData = validation.data;

    console.log('[Lead Capture] Processing submission:', validatedData.email);

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
    );

    // Get campaign info if provided
    let campaign = null;
    if (validatedData.campaign_id || validatedData.campaign_slug) {
      const { data } = await supabase
        .from('campaigns')
        .select('*')
        .or(
          validatedData.campaign_id 
            ? `id.eq.${validatedData.campaign_id}` 
            : `slug.eq.${validatedData.campaign_slug}`
        )
        .single();
      
      campaign = data;
    }

    // Insert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        full_name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company_name: validatedData.company || null,
        source: validatedData.source,
        status: 'new',
        
        // Campaign tracking
        campaign_id: campaign?.id || null,
        
        // UTM tracking
        utm_source: validatedData.utm_source || null,
        utm_medium: validatedData.utm_medium || null,
        utm_campaign: validatedData.utm_campaign || null,
        utm_term: validatedData.utm_term || null,
        utm_content: validatedData.utm_content || null,
        
        metadata: {
          campaign_slug: validatedData.campaign_slug,
          message: validatedData.message,
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          user_agent: request.headers.get('user-agent'),
          submitted_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (leadError) {
      console.error('[Lead Capture] Failed to save lead:', leadError);
      throw new Error('Failed to save lead to database');
    }

    console.log('[Lead Capture] Lead saved to database:', lead.id);

    // 2. Update campaign stats
    if (campaign) {
      await supabase
        .from('campaigns')
        .update({
          total_leads: (campaign.total_leads || 0) + 1
        })
        .eq('id', campaign.id);
    }

    // 3. Send confirmation email via Resend
    try {
      const resend = getResendClient();
      const firstName = validatedData.name.split(' ')[0];
      const campaignName = campaign?.name || 'ARCO';

      await resend.emails.send({
        from: 'ARCO <arco@consultingarco.com>',
        to: [validatedData.email],
        subject: `${firstName}, recebemos seu interesse! 🚀`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Bem-vindo, ${firstName}! 🎉</h1>
              </div>
              
              <div style="background: #f8f9fa; padding: 40px 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Obrigado pelo seu interesse em <strong>${campaignName}</strong>!
                </p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Nossa equipe já recebeu suas informações e entrará em contato via <strong>WhatsApp</strong> em até <strong>5 minutos</strong>.
                </p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 30px 0;">
                  <h3 style="margin-top: 0; color: #667eea;">📱 Próximos Passos:</h3>
                  <ol style="margin: 0; padding-left: 20px;">
                    <li>Aguarde mensagem no WhatsApp</li>
                    <li>Salve nosso contato</li>
                    <li>Tire todas as suas dúvidas com nosso especialista</li>
                  </ol>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  Enquanto isso, aproveite para conhecer mais sobre nossas soluções em 
                  <a href="https://consultingarco.com" style="color: #667eea; text-decoration: none;">consultingarco.com</a>
                </p>
              </div>
              
              <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                <p>ARCO Consulting • Transformando Negócios Digitalmente</p>
                <p>
                  <a href="https://consultingarco.com" style="color: #999; text-decoration: none;">Site</a> •
                  <a href="https://www.instagram.com/arcoconsulting" style="color: #999; text-decoration: none;">Instagram</a> •
                  <a href="https://wa.me/5511999999999" style="color: #999; text-decoration: none;">WhatsApp</a>
                </p>
              </div>
            </body>
          </html>
        `,
      });

      console.log('[Lead Capture] Confirmation email sent');
    } catch (emailError) {
      console.error('[Lead Capture] Failed to send email:', emailError);
      // Don't throw - lead is saved, email is not critical
    }

    // 4. Send internal notification (optional)
    try {
      const resend = getResendClient();
      
      await resend.emails.send({
        from: 'ARCO Notifications <arco@consultingarco.com>',
        to: ['contato@consultingarco.com'],
        subject: `🔔 Novo Lead: ${validatedData.name} (${campaign?.name || 'Sem campanha'})`,
        html: `
          <h2>Novo Lead Capturado</h2>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Telefone:</strong> ${validatedData.phone}</p>
          ${validatedData.company ? `<p><strong>Empresa:</strong> ${validatedData.company}</p>` : ''}
          ${campaign ? `<p><strong>Campanha:</strong> ${campaign.name} (${campaign.slug})</p>` : ''}
          ${validatedData.utm_source ? `<p><strong>UTM Source:</strong> ${validatedData.utm_source}</p>` : ''}
          ${validatedData.utm_campaign ? `<p><strong>UTM Campaign:</strong> ${validatedData.utm_campaign}</p>` : ''}
          <p><strong>Lead ID:</strong> ${lead.id}</p>
          <p><strong>Criado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        `,
      });
    } catch (notificationError) {
      console.error('[Lead Capture] Failed to send notification:', notificationError);
    }

    return successResponse(
      {
        leadId: lead.id,
        message: 'Lead capturado com sucesso! Verifique seu email e WhatsApp.'
      },
      undefined,
      undefined,
      201
    );

  } catch (error) {
    console.error('[Lead Capture] Error:', error);
    return internalErrorResponse(
      error instanceof Error ? error.message : 'Erro ao processar lead'
    );
  }
}
