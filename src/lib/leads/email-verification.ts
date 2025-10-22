/**
 * Email Verification Utilities
 *
 * Validates email addresses and provides verification tracking:
 * - Token-based verification via email link
 * - Auto-verification for simple patterns
 * - Bounce handling
 * - Lead quality improvement
 */

import { createClient } from '@supabase/supabase-js';

export interface EmailVerification {
  id: string;
  lead_id: string;
  email: string;
  verification_token: string;
  verification_method: 'link' | 'code' | 'auto';
  status: 'pending' | 'sent' | 'verified' | 'failed' | 'expired';
  verified_at?: string;
  expires_at: string;
  attempt_count: number;
  smtp_valid?: boolean;
  is_deliverable?: boolean;
  validation_source?: string;
}

/**
 * Create email verification request for a lead
 */
export async function createEmailVerification(
  leadId: string,
  email: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<EmailVerification | null> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    const { data, error } = await supabase.rpc('create_email_verification', {
      p_lead_id: leadId,
      p_email: email
    });

    if (error) {
      console.error('[Email Verification] Error creating verification:', error);
      throw error;
    }

    // Fetch the created verification record
    const { data: verification, error: fetchError } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('verification_token', data[0].verification_token)
      .single();

    if (fetchError) {
      console.error('[Email Verification] Error fetching verification:', fetchError);
      return null;
    }

    console.log('[Email Verification] Created verification for lead:', leadId);
    return verification;
  } catch (error) {
    console.error('[Email Verification] Failed to create verification:', error);
    return null;
  }
}

/**
 * Verify email using token
 */
export async function verifyEmailToken(
  leadId: string,
  token: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<{ success: boolean; message: string }> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    const { data, error } = await supabase.rpc('verify_email_token', {
      p_lead_id: leadId,
      p_token: token
    });

    if (error) {
      console.error('[Email Verification] Error verifying token:', error);
      return {
        success: false,
        message: 'Erro ao verificar email'
      };
    }

    const result = data?.[0];
    console.log('[Email Verification] Token verification result:', result);

    return {
      success: result?.success || false,
      message: result?.message || 'Erro desconhecido'
    };
  } catch (error) {
    console.error('[Email Verification] Failed to verify token:', error);
    return {
      success: false,
      message: 'Erro ao processar verificação'
    };
  }
}

/**
 * Get verification status for a lead
 */
export async function getVerificationStatus(
  leadId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<EmailVerification | null> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    const { data, error } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('[Email Verification] Error fetching status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[Email Verification] Failed to get status:', error);
    return null;
  }
}

/**
 * Mark email as bounced
 */
export async function markEmailBounced(
  leadId: string,
  reason: string | null,
  supabaseUrl: string,
  supabaseKey: string
): Promise<boolean> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    const { error } = await supabase.rpc('mark_email_bounced', {
      p_lead_id: leadId,
      p_reason: reason
    });

    if (error) {
      console.error('[Email Verification] Error marking bounced:', error);
      return false;
    }

    console.log('[Email Verification] Marked email as bounced:', leadId);
    return true;
  } catch (error) {
    console.error('[Email Verification] Failed to mark bounced:', error);
    return false;
  }
}

/**
 * Simple email format validation
 * Use this for quick checks before sending verification emails
 */
export function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Generate verification email HTML content
 */
export function generateVerificationEmailHTML(
  firstName: string,
  verificationToken: string,
  baseUrl: string = 'https://consultingarco.com'
): string {
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Confirme seu Email</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Um último passo para começar</p>
        </div>

        <div style="background: #f8f9fa; padding: 40px 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Olá ${firstName},</p>

          <p style="font-size: 16px; margin-bottom: 20px;">
            Recebemos seu interesse em nossa solução. Para garantir que sua comunicação é segura, pedimos para confirmar seu endereço de email.
          </p>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 16px;">
              ✓ Confirmar Email
            </a>
          </div>

          <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
            Ou copie e cole este link no seu navegador:
          </p>
          <p style="font-size: 12px; color: #999; text-align: center; word-break: break-all; background: white; padding: 15px; border-radius: 5px;">
            ${verificationUrl}
          </p>

          <p style="font-size: 13px; color: #999; margin-top: 30px; text-align: center;">
            Este link expira em 24 horas.
          </p>

          <p style="font-size: 13px; color: #999; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
            Se você não solicitou esta confirmação, pode ignorar este email com segurança.
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
  `;
}

/**
 * Check if verification is expired
 */
export function isVerificationExpired(verification: EmailVerification): boolean {
  if (!verification.expires_at) return true;
  return new Date(verification.expires_at) < new Date();
}

/**
 * Check if verification attempts are exhausted
 */
export function isVerificationLocked(verification: EmailVerification): boolean {
  return verification.attempt_count >= 3; // max_attempts = 3
}

/**
 * Get verification details for dashboard
 */
export async function getVerificationStats(
  campaignId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<{
  total: number;
  verified: number;
  pending: number;
  failed: number;
  verification_rate: number;
}> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('email_verification_status')
      .eq('campaign_id', campaignId);

    if (error) {
      console.error('[Email Verification] Error fetching stats:', error);
      throw error;
    }

    const total = data?.length || 0;
    const verified = data?.filter(l => l.email_verification_status === 'verified').length || 0;
    const pending = data?.filter(l => l.email_verification_status === 'pending').length || 0;
    const failed = data?.filter(l => l.email_verification_status === 'failed').length || 0;

    return {
      total,
      verified,
      pending,
      failed,
      verification_rate: total > 0 ? Math.round((verified / total) * 100) : 0
    };
  } catch (error) {
    console.error('[Email Verification] Failed to get stats:', error);
    return {
      total: 0,
      verified: 0,
      pending: 0,
      failed: 0,
      verification_rate: 0
    };
  }
}
