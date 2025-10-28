/**
 * Email System - Type Definitions
 * Centralized types following DRY principle
 */

export type EmailProvider = 'resend'

export type EmailStatus = 
  | 'pending' 
  | 'scheduled' 
  | 'sent' 
  | 'failed' 
  | 'bounced' 
  | 'opened' 
  | 'clicked'

export type EmailTemplateType =
  | 'welcome'
  | 'password-reset'
  | 'notification'
  | 'lead-hot'
  | 'lead-warm'
  | 'lead-cold'
  | 'lead-magnet'
  | 'booking-confirmation'
  | 'booking-reminder'
  | 'booking-cancellation'
  | 'booking-reschedule'
  | 'booking-followup'
  | 'domain-analysis'

export type LeadQualification = 'hot' | 'warm' | 'cold'

export interface EmailConfig {
  from: string
  fromName: string
  replyTo: string
  domain: string
}

export interface EmailRecipient {
  email: string
  name?: string
}

export interface EmailContent {
  subject: string
  html: string
  text?: string
  previewText?: string
}

export interface EmailMetadata {
  templateType?: EmailTemplateType
  campaignId?: string
  leadId?: string
  tags?: EmailTag[]
}

export interface EmailTag {
  name: string
  value: string
}

export interface EmailOptions extends EmailContent, EmailMetadata {
  to: EmailRecipient | EmailRecipient[]
  replyTo?: string
  cc?: EmailRecipient[]
  bcc?: EmailRecipient[]
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename: string
  content: string | Buffer
  contentType?: string
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: {
    message: string
  }
  data?: {
    id: string
  }
}

export interface EmailTemplate {
  id: string
  type: EmailTemplateType
  subject: string
  html: string
  text?: string
  metadata?: Record<string, unknown>
}

export interface EmailQueueItem {
  id: string
  leadId?: string
  campaignId?: string
  templateId?: string
  to: string
  toName?: string
  subject: string
  htmlContent: string
  status: EmailStatus
  scheduledAt?: string
  sentAt?: string
  resendMessageId?: string
  failedReason?: string
}

export interface EmailSequence {
  id: string
  leadId: string
  campaignId: string
  qualificationStatus: LeadQualification
  currentStep: number
  totalSteps: number
  status: 'active' | 'completed' | 'paused' | 'unsubscribed'
  startedAt: string
  completedAt?: string
}

export interface NotificationData {
  title: string
  message: string
  actionUrl?: string
  actionLabel?: string
}

export interface LeadData {
  name: string
  email: string
  phone?: string
  source: string
  message?: string
  company?: string
}
