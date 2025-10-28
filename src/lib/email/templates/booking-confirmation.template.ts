/**
 * Booking Confirmation Email Template
 * Professional confirmation email for scheduled appointments
 */

import { BaseEmailTemplate } from './base.template'
import type { EmailOptions, EmailRecipient } from '../types'

export interface BookingData extends Record<string, unknown> {
  customerName: string
  serviceName: string
  date: Date | string
  time?: string
  duration?: number
  location?: string
  professionalName?: string
  confirmationCode?: string
  calendarLink?: string
  cancelLink?: string
}

export class BookingConfirmationTemplate extends BaseEmailTemplate {
  render(data: Record<string, unknown>): string {
    const {
      customerName,
      serviceName,
      date,
      time,
      duration = 60,
      location,
      professionalName,
      confirmationCode,
      calendarLink,
      cancelLink
    } = data as BookingData

    const formattedDate = this.formatDate(date)
    const formattedTime = time || this.formatTime(date)

    const content = `
      ${this.renderCard(`
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="text-align: center; margin-bottom: 24px;">
              <div style="display: inline-block; background: #10b981; color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; font-family: ${this.defaults.fontFamily};">
                <span aria-hidden="true">✓</span> Agendamento confirmado
              </div>
            </td>
          </tr>
        </table>

        <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: ${this.defaults.textColor}; text-align: center; font-family: ${this.defaults.fontFamily};" class="dark-mode-text">
          ${this.escapeHtml(serviceName)}
        </h2>
        
        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: ${this.defaults.textSecondary}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text">
          Olá, ${this.escapeHtml(customerName)}!
        </p>
        
        <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 24px; color: ${this.defaults.textSecondary}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text">
          Seu agendamento foi confirmado com sucesso. Seguem os detalhes:
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: ${this.defaults.backgroundColor}; border-radius: 8px; padding: 24px; margin-bottom: 24px; font-family: ${this.defaults.fontFamily};">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.mutedColor};" class="dark-mode-text-muted dark-mode-border">
              <span aria-label="Data" role="img">📅</span> Data
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.textColor}; font-weight: 500; text-align: right;" class="dark-mode-text dark-mode-border">
              ${formattedDate}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.mutedColor};" class="dark-mode-text-muted dark-mode-border">
              <span aria-label="Horário" role="img">🕐</span> Horário
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.textColor}; font-weight: 500; text-align: right;" class="dark-mode-text dark-mode-border">
              ${formattedTime}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.mutedColor};" class="dark-mode-text-muted dark-mode-border">
              <span aria-label="Duração" role="img">⏱️</span> Duração
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.textColor}; font-weight: 500; text-align: right;" class="dark-mode-text dark-mode-border">
              ${duration} minutos
            </td>
          </tr>
          ${professionalName ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.mutedColor};" class="dark-mode-text-muted dark-mode-border">
              <span aria-label="Profissional" role="img">👤</span> Profissional
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid ${this.defaults.borderColor}; font-size: 14px; color: ${this.defaults.textColor}; font-weight: 500; text-align: right;" class="dark-mode-text dark-mode-border">
              ${this.escapeHtml(professionalName)}
            </td>
          </tr>
          ` : ''}
          ${location ? `
          <tr>
            <td style="padding: 12px 0; font-size: 14px; color: ${this.defaults.mutedColor};" class="dark-mode-text-muted">
              <span aria-label="Local" role="img">📍</span> Local
            </td>
            <td style="padding: 12px 0; font-size: 14px; color: ${this.defaults.textColor}; font-weight: 500; text-align: right;" class="dark-mode-text">
              ${this.escapeHtml(location)}
            </td>
          </tr>
          ` : ''}
        </table>

        ${confirmationCode ? `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
          <tr>
            <td style="padding: 16px; background: #f8fafc; border-radius: 8px; text-align: center;" class="dark-mode-card">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: ${this.defaults.mutedColor}; text-transform: uppercase; letter-spacing: 0.5px; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
                Código de confirmação
              </p>
              <p style="margin: 0; font-size: 20px; font-weight: 600; color: ${this.defaults.textColor}; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px;" class="dark-mode-text">
                ${this.escapeHtml(confirmationCode)}
              </p>
            </td>
          </tr>
        </table>
        ` : ''}

        ${calendarLink ? this.renderButton('Adicionar ao calendário', calendarLink) : ''}

        <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 20px; color: ${this.defaults.mutedColor}; text-align: center; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
          Você receberá um lembrete 24 horas antes do agendamento.
        </p>
      `)}

      ${cancelLink ? `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
        <tr>
          <td style="text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 20px; color: ${this.defaults.mutedColor}; font-family: ${this.defaults.fontFamily};" class="dark-mode-text-muted">
              Precisa cancelar ou reagendar?
            </p>
            <a href="${this.escapeHtml(cancelLink)}" style="color: ${this.defaults.primaryColor}; text-decoration: underline; font-size: 14px; font-family: ${this.defaults.fontFamily};" aria-label="Gerenciar agendamento">
              Gerenciar agendamento
            </a>
          </td>
        </tr>
      </table>
      ` : ''}
    `

    return this.wrapHtml(content, 'Agendamento confirmado - ARCO')
  }

  renderPlainText(data: Record<string, unknown>): string {
    const {
      customerName,
      serviceName,
      date,
      time,
      duration = 60,
      location,
      professionalName,
      confirmationCode
    } = data as BookingData

    const formattedDate = this.formatDate(date)
    const formattedTime = time || this.formatTime(date)

    return `
✓ AGENDAMENTO CONFIRMADO

${serviceName}

Olá, ${customerName}!

Seu agendamento foi confirmado com sucesso. Seguem os detalhes:

Data: ${formattedDate}
Horário: ${formattedTime}
Duração: ${duration} minutos
${professionalName ? `Profissional: ${professionalName}` : ''}
${location ? `Local: ${location}` : ''}
${confirmationCode ? `\nCódigo de confirmação: ${confirmationCode}` : ''}

Você receberá um lembrete 24 horas antes do agendamento.

---
ARCO Digital © ${new Date().getFullYear()}
contato@arco.digital
    `.trim()
  }
}

/**
 * Factory function for type-safe template creation
 */
export function createBookingConfirmationEmail(
  to: EmailRecipient | EmailRecipient[],
  data: BookingData
): EmailOptions {
  const template = new BookingConfirmationTemplate()
  
  return {
    to,
    subject: `Agendamento confirmado: ${data.serviceName}`,
    html: template.render(data),
    text: template.renderPlainText(data)
  }
}
