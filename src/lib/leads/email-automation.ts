/**
 * Email Automation Utilities
 *
 * Manages automated follow-up sequences based on lead qualification:
 * - Hot leads: Immediate follow-up (5 mins)
 * - Warm leads: Nurture sequence (24h, 48h, 72h)
 * - Cold leads: Re-engagement campaign (7d, 14d)
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export interface EmailTemplate {
  id: string;
  campaign_id: string;
  template_name: string;
  template_type: 'hot' | 'warm' | 'cold' | 'verification';
  sequence_order: number;
  subject: string;
  preview_text?: string;
  html_content: string;
  delay_hours: number;
  is_active: boolean;
}

export interface EmailQueue {
  id: string;
  lead_id: string;
  campaign_id: string;
  template_id: string;
  to_email: string;
  to_name?: string;
  subject: string;
  html_content: string;
  status: 'pending' | 'scheduled' | 'sent' | 'failed' | 'bounced' | 'opened' | 'clicked';
  scheduled_at?: string;
  sent_at?: string;
  resend_message_id?: string;
}

export interface EmailSequence {
  id: string;
  lead_id: string;
  campaign_id: string;
  qualification_status: 'hot' | 'warm' | 'cold';
  current_step: number;
  total_steps: number;
  status: 'active' | 'completed' | 'paused' | 'unsubscribed';
  started_at: string;
  completed_at?: string;
}

/**
 * Create default email templates for a campaign
 * Should be called when campaign is created
 */
export async function createDefaultEmailTemplates(
  campaignId: string,
  campaignName: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<EmailTemplate[]> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const templates = [
    // Hot lead - immediate follow-up (5 minutes)
    {
      campaign_id: campaignId,
      template_name: 'hot_immediate',
      template_type: 'hot' as const,
      sequence_order: 0,
      subject: `${campaignName}: Sua pré-análise está pronta! 🚀`,
      preview_text: 'Temos uma solução específica para seu desafio',
      delay_hours: 0,
      is_active: true,
      html_content: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px;">
              <h1 style="color: white; margin: 0;">Análise Pronta!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Temos uma solução específica para você</p>
            </div>
            <div style="background: #f8f9fa; padding: 40px 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px;">Olá,</p>
              <p style="font-size: 16px;">Baseado nas informações que você compartilhou, nossa equipe analisou sua situação e tem uma abordagem específica para resolver seu desafio.</p>
              <p style="font-size: 16px;">Para conversar com um especialista que entende profundamente seu mercado:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://wa.me/5511999999999?text=Quero%20saber%20mais%20sobre%20a%20solução" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Conversar no WhatsApp</a>
              </div>
              <p style="font-size: 14px; color: #666;">Tempo de resposta: menos de 2 minutos</p>
            </div>
          </body>
        </html>
      `
    },

    // Warm lead - nurture sequence (24h)
    {
      campaign_id: campaignId,
      template_name: 'warm_24h',
      template_type: 'warm' as const,
      sequence_order: 0,
      subject: `${campaignName}: Veja como outros resolveram 📊`,
      preview_text: 'Histórias de implementação bem-sucedidas',
      delay_hours: 24,
      is_active: true,
      html_content: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Histórias de Sucesso</h2>
            <p style="font-size: 16px;">Enquanto você considera, veja como empresas como a sua já estão gerando resultados:</p>
            <ul style="font-size: 15px; line-height: 1.8;">
              <li>Agência reduziu CAC em 40% em 90 dias</li>
              <li>E-commerce aumentou conversão em 25%</li>
              <li>SaaS conquistou 500 leads qualificados/mês</li>
            </ul>
            <p style="font-size: 14px; color: #666; margin-top: 30px;">Quer conhecer a estratégia que eles usaram?</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://wa.me/5511999999999?text=Quero%20saber%20a%20estratégia" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Conversar com Especialista</a>
            </div>
          </body>
        </html>
      `
    },

    // Warm lead - nurture sequence (48h)
    {
      campaign_id: campaignId,
      template_name: 'warm_48h',
      template_type: 'warm' as const,
      sequence_order: 1,
      subject: `${campaignName}: Responda 3 perguntas, descubra seu potencial 🎯`,
      preview_text: 'Quiz rápido de oportunidade',
      delay_hours: 48,
      is_active: true,
      html_content: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Teste Seu Potencial em 2 Minutos</h2>
            <p style="font-size: 16px;">Responda 3 perguntas simples e descubra onde você está deixando oportunidades na mesa:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://consultingarco.com/quiz" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Fazer Quiz Agora</a>
            </div>
            <p style="font-size: 14px; color: #666;">Você receberá um diagnóstico personalizado em seu email.</p>
          </body>
        </html>
      `
    },

    // Warm lead - nurture sequence (72h)
    {
      campaign_id: campaignId,
      template_name: 'warm_72h',
      template_type: 'warm' as const,
      sequence_order: 2,
      subject: `${campaignName}: Última chance de conversa sem compromisso ⏰`,
      preview_text: 'Agenda uma conversa descoberta',
      delay_hours: 72,
      is_active: true,
      html_content: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Vamos Conversar?</h2>
            <p style="font-size: 16px;">Percebi que você não respondeu ainda. Sem problema! Prefere uma conversa rápida para tirar dúvidas?</p>
            <p style="font-size: 16px;">Nossa conversa descoberta é 100% sem compromisso. Apenas queremos entender melhor seu desafio e confirmar se temos uma solução para você.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5511999999999?text=Agendar%20conversa%20descoberta" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Agendar Conversa</a>
            </div>
            <p style="font-size: 13px; color: #999;">Se não conseguir se comunicar, nosso especialista entra em contato direto.</p>
          </body>
        </html>
      `
    },

    // Cold lead - re-engagement (7 days)
    {
      campaign_id: campaignId,
      template_name: 'cold_7d',
      template_type: 'cold' as const,
      sequence_order: 0,
      subject: `${campaignName}: Você desistiu cedo demais 😅`,
      preview_text: 'Pode ser que você tenha perdido um detalhe importante',
      delay_hours: 168, // 7 days
      is_active: true,
      html_content: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Tá certo, mas e se...</h2>
            <p style="font-size: 16px;">Você rejeitou, achando que não era para sua empresa. Pode ser que você tenha visto só a superfície.</p>
            <p style="font-size: 16px;">Deixa eu ser honesto: nem todo desafio precisa de uma solução complexa. Às vezes, a resposta é mais simples do que parece.</p>
            <p style="font-size: 16px;">Quer conversar de novo, só pra ter certeza?</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5511999999999?text=Quero%20reavaliar" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600;">Reavaliar Solução</a>
            </div>
          </body>
        </html>
      `
    }
  ];

  const { data, error } = await supabase
    .from('email_templates')
    .insert(templates)
    .select();

  if (error) {
    console.error('[Email Automation] Failed to create templates:', error);
    throw error;
  }

  return data || [];
}

/**
 * Send pending emails via Resend
 */
export async function sendPendingEmails(
  resendApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 50
): Promise<{ sent: number; failed: number }> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const resend = new Resend(resendApiKey);

  // Get pending emails
  const { data: queue, error } = await supabase
    .from('email_queue')
    .select('*')
    .in('status', ['pending', 'scheduled'])
    .lt('scheduled_at', new Date().toISOString())
    .limit(limit);

  if (error) {
    console.error('[Email Automation] Failed to fetch queue:', error);
    throw error;
  }

  let sent = 0;
  let failed = 0;

  for (const email of queue || []) {
    try {
      const response = await resend.emails.send({
        from: 'ARCO <arco@consultingarco.com>',
        to: [email.to_email],
        subject: email.subject,
        html: email.html_content,
      });

      if (response.error) {
        console.error('[Email Automation] Failed to send email:', response.error);
        await supabase
          .from('email_queue')
          .update({
            status: 'failed',
            failed_reason: response.error.message
          })
          .eq('id', email.id);
        failed++;
      } else {
        console.log('[Email Automation] Email sent:', email.id);
        await supabase
          .from('email_queue')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            resend_message_id: response.data?.id
          })
          .eq('id', email.id);
        sent++;
      }
    } catch (err) {
      console.error('[Email Automation] Error sending email:', err);
      await supabase
        .from('email_queue')
        .update({
          status: 'failed',
          failed_reason: err instanceof Error ? err.message : 'Unknown error'
        })
        .eq('id', email.id);
      failed++;
    }
  }

  console.log(`[Email Automation] Batch complete: ${sent} sent, ${failed} failed`);
  return { sent, failed };
}

/**
 * Get email sequence for a lead
 */
export async function getEmailSequence(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<EmailSequence | null> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('email_sequences')
    .select('*')
    .eq('lead_id', leadId)
    .single();

  if (error) {
    console.error('[Email Automation] Error fetching sequence:', error);
    return null;
  }

  return data;
}

/**
 * Get queued emails for a lead
 */
export async function getLeadEmails(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<EmailQueue[]> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('email_queue')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Email Automation] Error fetching emails:', error);
    return [];
  }

  return data || [];
}

/**
 * Unsubscribe a lead from email sequences
 */
export async function unsubscribeLead(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<boolean> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { error } = await supabase
    .from('email_sequences')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString()
    })
    .eq('lead_id', leadId);

  if (error) {
    console.error('[Email Automation] Error unsubscribing:', error);
    return false;
  }

  return true;
}

/**
 * Track email opening
 */
export async function trackEmailOpen(
  emailId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  await supabase
    .from('email_queue')
    .update({
      status: 'opened',
      open_tracked_at: new Date().toISOString()
    })
    .eq('id', emailId);
}

/**
 * Track email click
 */
export async function trackEmailClick(
  emailId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  await supabase
    .from('email_queue')
    .update({
      status: 'clicked',
      click_tracked_at: new Date().toISOString()
    })
    .eq('id', emailId);
}
