/**
 * Resend Email Service - LEGACY COMPATIBILITY LAYER
 * 
 * @deprecated Use emailService from './email.service' instead
 * This file maintains backward compatibility with existing code
 * 
 * New code should use:
 * import { emailService } from '@/lib/email'
 * await emailService.sendWelcome({ email: 'user@example.com' }, 'John')
 */

import { emailService } from './email.service'
import { EMAIL_CONFIG } from './config'

// Re-export config for backward compatibility
export { EMAIL_CONFIG }

/**
 * @deprecated Use emailService.sendWelcome()
 */
export async function sendWelcomeEmail(to: string, userName: string) {
  return emailService.sendWelcome({ email: to }, userName)
}

/**
 * @deprecated Use emailService.sendPasswordReset()
 */
export async function sendPasswordResetEmail(to: string, resetToken: string) {
  return emailService.sendPasswordReset({ email: to }, resetToken)
}

/**
 * @deprecated Use emailService.sendNotification()
 */
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
  return emailService.sendNotification({ email: to }, userName, notification)
}

/**
 * @deprecated Use emailService.sendLeadNotification()
 */
export async function sendLeadNotification(leadData: {
  name: string
  email: string
  phone?: string
  source: string
  message?: string
}) {
  return emailService.sendLeadNotification(leadData)
}

// Legacy proxy export for direct resend access (not recommended)
import { ResendProvider } from './providers/resend.provider'
const provider = ResendProvider.getInstance()

/**
 * @deprecated Direct provider access - use emailService instead
 */
export const resend = {
  emails: {
    send: (options: any) => provider.send(options as any),
    list: () => Promise.resolve({ data: [], error: null })
  }
}
