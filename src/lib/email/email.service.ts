/**
 * Email Service - Facade Pattern
 * SOLID: Single Responsibility, provides clean API for sending emails
 */

import { ResendProvider } from './providers/resend.provider'
import { WelcomeEmailTemplate } from './templates/welcome.template'
import { EmailOptions, EmailResult, EmailRecipient, NotificationData, LeadData } from './types'
import { EMAIL_CONFIG } from './config'

export class EmailService {
  private provider = ResendProvider.getInstance()
  private welcomeTemplate = new WelcomeEmailTemplate()

  /**
   * Send welcome email
   */
  async sendWelcome(to: EmailRecipient, userName: string): Promise<EmailResult> {
    const html = this.welcomeTemplate.render({ userName })
    const text = this.welcomeTemplate.renderPlainText({ userName })

    return this.provider.send({
      to,
      subject: 'Bem-vindo à ARCO Digital',
      html,
      text,
      templateType: 'welcome',
      tags: [
        { name: 'type', value: 'welcome' },
        { name: 'category', value: 'onboarding' }
      ]
    })
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(
    to: EmailRecipient, 
    resetToken: string
  ): Promise<EmailResult> {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

    return this.provider.send({
      to,
      subject: 'Redefinição de senha - ARCO Digital',
      html: this.renderPasswordResetHtml(resetUrl),
      text: this.renderPasswordResetText(resetUrl),
      templateType: 'password-reset',
      tags: [
        { name: 'type', value: 'password-reset' },
        { name: 'category', value: 'security' }
      ]
    })
  }

  /**
   * Send notification email
   */
  async sendNotification(
    to: EmailRecipient,
    userName: string,
    notification: NotificationData
  ): Promise<EmailResult> {
    return this.provider.send({
      to,
      subject: notification.title,
      html: this.renderNotificationHtml(userName, notification),
      text: this.renderNotificationText(userName, notification),
      templateType: 'notification',
      tags: [
        { name: 'type', value: 'notification' },
        { name: 'category', value: 'alert' }
      ]
    })
  }

  /**
   * Send internal lead notification
   */
  async sendLeadNotification(leadData: LeadData): Promise<EmailResult> {
    return this.provider.send({
      to: { email: 'leads@arco.digital', name: 'ARCO Leads' },
      subject: `Novo lead: ${leadData.name}`,
      html: this.renderLeadNotificationHtml(leadData),
      text: this.renderLeadNotificationText(leadData),
      replyTo: leadData.email,
      templateType: 'notification',
      tags: [
        { name: 'type', value: 'lead-notification' },
        { name: 'source', value: leadData.source }
      ]
    })
  }

  /**
   * Send custom email
   */
  async send(options: EmailOptions): Promise<EmailResult> {
    return this.provider.send(options)
  }

  /**
   * Send batch emails
   */
  async sendBatch(optionsArray: EmailOptions[]): Promise<EmailResult[]> {
    return this.provider.sendBatch(optionsArray)
  }

  /**
   * Verify provider connection
   */
  async verifyConnection(): Promise<boolean> {
    return this.provider.verifyConnection()
  }

  // ============================================
  // Private Template Rendering Methods
  // ============================================

  private renderPasswordResetHtml(resetUrl: string): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: system-ui, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #6366f1; font-size: 32px; margin: 0;">ARCO Digital</h1>
    </div>
    
    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
      <h2 style="color: #991b1b; margin: 0 0 15px 0; font-size: 20px;">
        Redefinição de senha
      </h2>
      <p style="color: #7f1d1d; margin: 0; line-height: 1.6;">
        Solicitação de redefinição recebida. Se não foi você, ignore este email.
      </p>
    </div>
    
    <div style="text-align: center; padding: 30px 0;">
      <a href="${resetUrl}" 
         style="display: inline-block; background: #6366f1; color: white; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 500;">
        Redefinir senha
      </a>
    </div>
    
    <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 15px;">
      <p style="color: #9a3412; margin: 0; font-size: 14px;">
        ⚠️ Este link expira em 1 hora por segurança.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim()
  }

  private renderPasswordResetText(resetUrl: string): string {
    return `
Redefinição de senha - ARCO Digital

Solicitação de redefinição recebida.

Use este link: ${resetUrl}

Este link expira em 1 hora.

Se não foi você, ignore este email.
    `.trim()
  }

  private renderNotificationHtml(userName: string, data: NotificationData): string {
    const actionButton = data.actionUrl ? `
<div style="text-align: center; padding: 30px 0;">
  <a href="${data.actionUrl}" 
     style="display: inline-block; background: #6366f1; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 500;">
    ${data.actionLabel || 'Ver detalhes'}
  </a>
</div>
    ` : ''

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
</head>
<body style="margin: 0; padding: 0; font-family: system-ui, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; padding: 30px; color: white; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 16px; font-weight: 500;">
        ${data.title}
      </p>
    </div>
    
    <div style="padding: 30px; background: #f8fafc; border-radius: 12px;">
      <p style="color: #475569; line-height: 1.8; margin: 0;">
        ${data.message}
      </p>
    </div>
    
    ${actionButton}
  </div>
</body>
</html>
    `.trim()
  }

  private renderNotificationText(userName: string, data: NotificationData): string {
    return `
${data.title}

${data.message}

${data.actionUrl ? `Ver: ${data.actionUrl}` : ''}
    `.trim()
  }

  private renderLeadNotificationHtml(lead: LeadData): string {
    const phoneRow = lead.phone ? `<p style="margin: 0 0 10px 0;"><strong>Telefone:</strong> ${lead.phone}</p>` : ''
    const messageRow = lead.message ? `<p style="margin: 10px 0 0 0;"><strong>Mensagem:</strong><br/>${lead.message}</p>` : ''

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: system-ui, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <h2 style="color: #6366f1; margin: 0 0 30px 0;">Novo lead recebido</h2>
    
    <div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
      <p style="margin: 0 0 10px 0;"><strong>Nome:</strong> ${lead.name}</p>
      <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${lead.email}</p>
      ${phoneRow}
      <p style="margin: 0 0 10px 0;"><strong>Origem:</strong> ${lead.source}</p>
      ${messageRow}
    </div>
  </div>
</body>
</html>
    `.trim()
  }

  private renderLeadNotificationText(lead: LeadData): string {
    return `
Novo lead recebido

Nome: ${lead.name}
Email: ${lead.email}
${lead.phone ? `Telefone: ${lead.phone}` : ''}
Origem: ${lead.source}
${lead.message ? `\nMensagem: ${lead.message}` : ''}
    `.trim()
  }
}

// Export singleton instance
export const emailService = new EmailService()
