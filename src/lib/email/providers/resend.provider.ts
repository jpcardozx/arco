/**
 * Resend Email Provider Implementation
 * SOLID: Single Responsibility - handles only Resend-specific logic
 */

import { Resend } from 'resend'
import { IEmailProvider } from '../interfaces'
import { EmailOptions, EmailResult, EmailRecipient } from '../types'
import { EMAIL_CONFIG } from '../config'

export class ResendProvider implements IEmailProvider {
  private client: Resend
  private static instance: ResendProvider | null = null

  private constructor(apiKey: string) {
    this.client = new Resend(apiKey)
  }

  /**
   * Singleton pattern with lazy initialization
   */
  static getInstance(): ResendProvider {
    if (!ResendProvider.instance) {
      const apiKey = process.env.RESEND_API_KEY
      
      if (!apiKey) {
        throw new Error('RESEND_API_KEY not configured')
      }
      
      ResendProvider.instance = new ResendProvider(apiKey)
    }
    
    return ResendProvider.instance
  }

  /**
   * Send single email
   */
  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      const response = await this.client.emails.send({
        from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
        to: this.formatRecipients(options.to),
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo || EMAIL_CONFIG.replyTo,
        cc: options.cc ? this.formatRecipients(options.cc) : undefined,
        bcc: options.bcc ? this.formatRecipients(options.bcc) : undefined,
        tags: options.tags,
        attachments: options.attachments
      })

      if (response.error) {
        return {
          success: false,
          error: { message: response.error.message }
        }
      }

      return {
        success: true,
        messageId: response.data?.id,
        data: response.data ? { id: response.data.id } : undefined
      }
    } catch (error) {
      return {
        success: false,
        error: { message: error instanceof Error ? error.message : 'Unknown error' }
      }
    }
  }

  /**
   * Send batch emails
   */
  async sendBatch(optionsArray: EmailOptions[]): Promise<EmailResult[]> {
    return Promise.all(optionsArray.map(options => this.send(options)))
  }

  /**
   * Verify connection to Resend API
   */
  async verifyConnection(): Promise<boolean> {
    try {
      const { error } = await this.client.emails.list({ limit: 1 })
      return !error
    } catch {
      return false
    }
  }

  /**
   * Format recipients for Resend API
   */
  private formatRecipients(
    recipients: EmailRecipient | EmailRecipient[]
  ): string | string[] {
    const recipientArray = Array.isArray(recipients) ? recipients : [recipients]
    
    return recipientArray.map(r => 
      r.name ? `${r.name} <${r.email}>` : r.email
    )
  }
}
