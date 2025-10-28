/**
 * Email Provider Interface (SOLID - Dependency Inversion Principle)
 * Allows easy switching between email providers
 */

import { EmailOptions, EmailResult } from './types'

export interface IEmailProvider {
  send(options: EmailOptions): Promise<EmailResult>
  sendBatch(options: EmailOptions[]): Promise<EmailResult[]>
  verifyConnection(): Promise<boolean>
}

export interface IEmailTemplate {
  render(data: Record<string, unknown>): string
  renderPlainText(data: Record<string, unknown>): string
}
