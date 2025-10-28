/**
 * Email System - Public API
 * Clean exports following Single Responsibility Principle
 */

// Main service (recommended usage)
export { emailService, EmailService } from './email.service'

// Types
export type {
  EmailProvider,
  EmailStatus,
  EmailTemplateType,
  LeadQualification,
  EmailConfig,
  EmailRecipient,
  EmailContent,
  EmailMetadata,
  EmailTag,
  EmailOptions,
  EmailAttachment,
  EmailResult,
  EmailTemplate,
  EmailQueueItem,
  EmailSequence,
  NotificationData,
  LeadData
} from './types'

// Configuration
export { EMAIL_CONFIG, EMAIL_SETTINGS, TEMPLATE_DEFAULTS } from './config'

// Interfaces (for advanced usage/mocking)
export type { IEmailProvider, IEmailTemplate } from './interfaces'

// Provider (for direct usage if needed)
export { ResendProvider } from './providers/resend.provider'

// Templates (for custom template development)
export { BaseEmailTemplate } from './templates/base.template'
export { WelcomeEmailTemplate } from './templates/welcome.template'
