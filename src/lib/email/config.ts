/**
 * Email Configuration
 * Single source of truth for email settings
 */

import { EmailConfig } from './types'

export const EMAIL_CONFIG: EmailConfig = {
  from: process.env.RESEND_FROM_EMAIL || 'arco@consultingarco.com',
  fromName: process.env.RESEND_FROM_NAME || 'ARCO Consulting',
  replyTo: process.env.RESEND_REPLY_TO || 'arco@consultingarco.com',
  domain: 'consultingarco.com'
}

export const EMAIL_SETTINGS = {
  defaultTimeout: 10000, // 10s
  maxRetries: 3,
  batchSize: 50,
  // Professional emojis only (functional, not marketing)
  allowedEmojis: ['✅', '📧', '📊', '🔐', '⚠️', '📋', '📅'] as const
} as const

export const TEMPLATE_DEFAULTS = {
  // Font stack with comprehensive fallbacks
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  maxWidth: '600px',
  padding: '40px 20px',
  
  // Colors - WCAG AA compliant (4.5:1 contrast minimum)
  primaryColor: '#6366f1',      // Indigo-500
  secondaryColor: '#8b5cf6',    // Purple-500
  textColor: '#0f172a',         // Slate-900 (19.07:1 contrast on white)
  textSecondary: '#334155',     // Slate-700 (10.74:1 contrast)
  mutedColor: '#475569',        // Slate-600 (7.07:1 contrast) - WCAG AA compliant
  backgroundColor: '#ffffff',
  borderColor: '#e2e8f0',       // Slate-200
  borderRadius: '12px',
  
  // Dark mode colors
  darkBackground: '#0f172a',    // Slate-900
  darkCard: '#1e293b',          // Slate-800
  darkText: '#f1f5f9',          // Slate-100 (16.71:1 contrast on dark)
  darkMuted: '#cbd5e1',         // Slate-300 (9.34:1 contrast on dark)
  darkBorder: '#334155'         // Slate-700
} as const
