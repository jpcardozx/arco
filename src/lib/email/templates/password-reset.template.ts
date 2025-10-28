/**
 * Password Reset Email Template
 * Professional, clear, and functional password reset email
 */

import { BaseEmailTemplate } from './base.template'
import type { EmailOptions, EmailRecipient } from '../types'

export interface PasswordResetData extends Record<string, unknown> {
  userName?: string
  resetLink: string
  expiryHours?: number
}

export class PasswordResetTemplate extends BaseEmailTemplate {
  render(data: Record<string, unknown>): string {
    const { userName, resetLink, expiryHours = 24 } = data as PasswordResetData

    const content = `
      ${this.renderCard(`
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td>
              <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: ${this.defaults.textColor}; line-height: 1.3; font-family: ${this.defaults.fontFamily};" class="dark-mode-text">
                Redefinição de senha
              </h2>
              
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: ${this.defaults.textSecondary}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text">
                Olá${userName ? `, ${this.escapeHtml(userName)}` : ''},
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 24px; color: ${this.defaults.textSecondary}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text">
                Recebemos uma solicitação para redefinir a senha da sua conta ARCO.
                Se você não fez esta solicitação, ignore este e-mail.
              </p>

              ${this.renderButton('Redefinir senha', resetLink)}

              <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 20px; color: ${this.defaults.mutedColor}; text-align: center; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
                Este link expira em ${expiryHours} horas por motivos de segurança.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid ${this.defaults.borderColor};" class="dark-mode-border">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 20px; color: ${this.defaults.mutedColor}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
                      Se o botão não funcionar, copie e cole este link no navegador:
                    </p>
                    <p style="margin: 0; font-size: 13px; line-height: 20px; color: ${this.defaults.mutedColor}; word-break: break-all; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
                      ${this.escapeHtml(resetLink)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `)}

      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 32px;">
        <tr>
          <td style="text-align: center;">
            <p style="margin: 0; font-size: 14px; line-height: 20px; color: ${this.defaults.mutedColor}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
              Por segurança, nunca compartilhe este link com outras pessoas.
            </p>
          </td>
        </tr>
      </table>
    `

    return this.wrapHtml(
      content, 
      'Redefinição de senha - ARCO',
      'Redefinir sua senha - Link expira em ' + expiryHours + ' horas'
    )
  }

  renderPlainText(data: Record<string, unknown>): string {
    const { userName, resetLink, expiryHours = 24 } = data as PasswordResetData

    return `
Redefinição de senha - ARCO

Olá${userName ? `, ${userName}` : ''},

Recebemos uma solicitação para redefinir a senha da sua conta ARCO.
Se você não fez esta solicitação, ignore este e-mail.

Para redefinir sua senha, acesse:
${resetLink}

Este link expira em ${expiryHours} horas por motivos de segurança.

Por segurança, nunca compartilhe este link com outras pessoas.

---
ARCO Digital © ${new Date().getFullYear()}
contato@arco.digital
    `.trim()
  }
}

/**
 * Factory function for type-safe template creation
 */
export function createPasswordResetEmail(
  to: EmailRecipient | EmailRecipient[],
  data: PasswordResetData
): EmailOptions {
  const template = new PasswordResetTemplate()
  
  return {
    to,
    subject: 'Redefinição de senha - ARCO',
    html: template.render(data),
    text: template.renderPlainText(data)
  }
}
