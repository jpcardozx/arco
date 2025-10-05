/**
 * Resend Email Service - Professional Configuration
 * Serviço de email transacional vinculado ao domínio ARCO
 */

import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// ============================================
// EMAIL TEMPLATES
// ============================================

interface EmailTemplate {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || 'arco@consultingarco.com',
  fromName: process.env.RESEND_FROM_NAME || 'ARCO Consulting',
  replyTo: process.env.RESEND_REPLY_TO || 'arco@consultingarco.com',
  domain: 'consultingarco.com'
}

// ============================================
// WELCOME EMAIL
// ============================================

export async function sendWelcomeEmail(to: string, userName: string) {
  return await resend.emails.send({
    from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
    to,
    subject: '🎉 Bem-vindo à ARCO Digital!',
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #6366f1; font-size: 32px; margin: 0;">ARCO Digital</h1>
          <p style="color: #64748b; font-size: 14px;">Marketing Digital de Alta Performance</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; padding: 30px; color: white; margin-bottom: 30px;">
          <h2 style="margin: 0 0 10px 0; font-size: 24px;">Olá, ${userName}! 👋</h2>
          <p style="margin: 0; opacity: 0.95; line-height: 1.6;">
            Sua conta foi criada com sucesso. Estamos empolgados em tê-lo como parte da nossa plataforma.
          </p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
          <h3 style="color: #1e293b; margin: 0 0 20px 0;">🚀 Próximos Passos</h3>
          <ul style="color: #475569; line-height: 1.8; padding-left: 20px;">
            <li>Complete seu perfil no dashboard</li>
            <li>Configure suas preferências de notificação</li>
            <li>Explore os recursos disponíveis</li>
            <li>Entre em contato se precisar de ajuda</li>
          </ul>
        </div>
        
        <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0;">
          <a href="https://arco.digital/dashboard" style="display: inline-block; background: #6366f1; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 500;">
            Acessar Dashboard
          </a>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0 0 10px 0;">
            ARCO Digital © 2025 • Marketing Digital de Alta Performance
          </p>
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            Dúvidas? <a href="mailto:contato@arco.digital" style="color: #6366f1; text-decoration: none;">contato@arco.digital</a>
          </p>
        </div>
      </div>
    `,
    text: `
      Olá, ${userName}!
      
      Sua conta foi criada com sucesso na ARCO Digital.
      
      Próximos passos:
      - Complete seu perfil no dashboard
      - Configure suas preferências
      - Explore os recursos disponíveis
      
      Acesse: https://arco.digital/dashboard
      
      Dúvidas? contato@arco.digital
    `,
    replyTo: EMAIL_CONFIG.replyTo
  })
}

// ============================================
// PASSWORD RESET EMAIL
// ============================================

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://arco.digital'}/auth/reset-password?token=${resetToken}`
  
  return await resend.emails.send({
    from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
    to,
    subject: '🔐 Redefinição de Senha - ARCO Digital',
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #6366f1; font-size: 32px; margin: 0;">ARCO Digital</h1>
        </div>
        
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
          <h2 style="color: #991b1b; margin: 0 0 15px 0; font-size: 20px;">🔐 Redefinição de Senha</h2>
          <p style="color: #7f1d1d; margin: 0; line-height: 1.6;">
            Recebemos uma solicitação para redefinir sua senha. Se você não fez esta solicitação, ignore este email.
          </p>
        </div>
        
        <div style="text-align: center; padding: 30px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px;">
            Redefinir Senha
          </a>
          <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
            Ou copie este link:<br/>
            <code style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; display: inline-block; margin-top: 10px; font-size: 12px; color: #475569;">
              ${resetUrl}
            </code>
          </p>
        </div>
        
        <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 15px; margin-top: 30px;">
          <p style="color: #9a3412; margin: 0; font-size: 14px;">
            ⚠️ <strong>Este link expira em 1 hora</strong> por segurança.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            ARCO Digital © 2025 • <a href="mailto:contato@arco.digital" style="color: #6366f1; text-decoration: none;">contato@arco.digital</a>
          </p>
        </div>
      </div>
    `,
    text: `
      Redefinição de Senha - ARCO Digital
      
      Recebemos uma solicitação para redefinir sua senha.
      
      Use este link para redefinir: ${resetUrl}
      
      Este link expira em 1 hora.
      
      Se você não fez esta solicitação, ignore este email.
      
      Dúvidas? contato@arco.digital
    `,
    replyTo: EMAIL_CONFIG.replyTo
  })
}

// ============================================
// NOTIFICATION EMAIL
// ============================================

export async function sendNotificationEmail(
  to: string,
  userName: string,
  notification: {
    title: string
    message: string
    actionUrl?: string
    actionLabel?: string
  }
) {
  return await resend.emails.send({
    from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
    to,
    subject: `🔔 ${notification.title}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #6366f1; font-size: 32px; margin: 0;">ARCO Digital</h1>
        </div>
        
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; padding: 30px; color: white; margin-bottom: 30px;">
          <h2 style="margin: 0 0 10px 0; font-size: 20px;">Olá, ${userName}!</h2>
          <p style="margin: 0; opacity: 0.95; font-size: 16px; font-weight: 500;">
            ${notification.title}
          </p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 12px;">
          <p style="color: #475569; line-height: 1.8; margin: 0;">
            ${notification.message}
          </p>
        </div>
        
        ${notification.actionUrl ? `
          <div style="text-align: center; padding: 30px 0;">
            <a href="${notification.actionUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 500;">
              ${notification.actionLabel || 'Ver Detalhes'}
            </a>
          </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            ARCO Digital © 2025 • <a href="mailto:contato@arco.digital" style="color: #6366f1; text-decoration: none;">contato@arco.digital</a>
          </p>
        </div>
      </div>
    `,
    text: `
      ${notification.title}
      
      Olá, ${userName}!
      
      ${notification.message}
      
      ${notification.actionUrl ? `Ver detalhes: ${notification.actionUrl}` : ''}
      
      ARCO Digital © 2025
      contato@arco.digital
    `,
    replyTo: EMAIL_CONFIG.replyTo
  })
}

// ============================================
// LEAD NOTIFICATION (Internal)
// ============================================

export async function sendLeadNotification(leadData: {
  name: string
  email: string
  phone?: string
  source: string
  message?: string
}) {
  return await resend.emails.send({
    from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
    to: 'leads@arco.digital', // Email interno da equipe
    subject: `🎯 Novo Lead: ${leadData.name}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #6366f1; margin: 0 0 30px 0;">🎯 Novo Lead Recebido</h2>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>Nome:</strong> ${leadData.name}</p>
          <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
          ${leadData.phone ? `<p style="margin: 0 0 10px 0;"><strong>Telefone:</strong> <a href="tel:${leadData.phone}">${leadData.phone}</a></p>` : ''}
          <p style="margin: 0 0 10px 0;"><strong>Origem:</strong> ${leadData.source}</p>
          ${leadData.message ? `<p style="margin: 10px 0 0 0;"><strong>Mensagem:</strong><br/>${leadData.message}</p>` : ''}
        </div>
        
        <div style="text-align: center; padding: 20px 0;">
          <a href="https://arco.digital/dashboard/leads" style="display: inline-block; background: #6366f1; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 500;">
            Ver no Dashboard
          </a>
        </div>
      </div>
    `,
    replyTo: leadData.email
  })
}
