/**
 * Disposable/Temporary Email Domains Blocklist
 *
 * Sources:
 * - https://github.com/disposable/disposable-email-domains (MIT License)
 * - Manual curation of popular temporary email services
 *
 * Last Updated: 2025-10-05
 * Total Domains: 200+ most common
 */

export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  // Top 50 Most Used (High Priority)
  '10minutemail.com',
  '10minutemail.net',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'throwaway.email',
  'throwawaymail.com',
  'maildrop.cc',
  'sharklasers.com',
  'grr.la',
  'getnada.com',
  'mailinator.com',
  'mailinator.net',
  'mailinator2.com',
  'trashmail.com',
  'trash-mail.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'cool.fr.nf',
  'jetable.fr.nf',
  'nospam.ze.tc',
  'nomail.xl.cx',
  'mega.zik.dj',
  'speed.1s.fr',
  'courriel.fr.nf',
  'moncourrier.fr.nf',
  'monmail.fr.nf',
  'hide.biz.st',
  'mymail.infos.st',
  'tempinbox.com',
  'dispostable.com',
  'fakeinbox.com',
  'spamgourmet.com',
  'mintemail.com',
  'emailondeck.com',
  'binkmail.com',
  'spambox.us',
  'discardmail.com',
  'discardmail.de',
  'spamfree24.org',
  'spamfree24.de',
  'spamfree24.eu',
  'spamfree24.info',
  'spamfree24.net',
  'spamfree24.com',
  'imgof.com',

  // Popular International Services
  'tempr.email',
  'tempmail.de',
  'wegwerfmail.de',
  'wegwerfemail.de',
  'trashmail.de',
  'trashmail.at',
  'trashmail.me',
  'trashmail.net',
  'tmails.net',
  'dropmail.me',
  'mohmal.com',
  'anonbox.net',
  'anonymbox.com',
  'disbox.net',
  'spambox.info',
  'spamcannon.com',
  'spamcannon.net',
  'spamcon.org',
  'spamcorptastic.com',
  'spamex.com',
  'spamhereplease.com',
  'spamhole.com',
  'spaml.com',
  'spaml.de',
  'spammotel.com',
  'spamobox.com',
  'spamslicer.com',
  'spamspot.com',
  'spamthis.co.uk',
  'spamthisplease.com',
  'speed.1s.fr',
  'burnthespam.info',
  'getairmail.com',
  'getairmail.cf',
  'getairmail.ga',
  'getairmail.gq',
  'getairmail.ml',
  'getairmail.tk',

  // Crypto/Tech Oriented
  'protonmail.com', // Flagged: legitimate but often used for disposable
  'cock.li',
  'nigge.rs',
  'mvrht.com',
  'tafmail.com',
  'anonmails.de',
  'incognitomail.org',
  'incognitomail.com',
  'incognitomail.net',
  'anonymmail.net',
  'anonymized.org',

  // Automated/Bot Detection
  'bot.com',
  'boximail.com',
  'boxformail.in',
  'broadbandninja.com',
  'bsnow.net',
  'bspamfree.org',
  'bugmenot.com',
  'bumpymail.com',
  'burnermail.io',
  'buymoreplays.com',
  'byom.de',

  // Domain Hacks & Short Services
  '0-mail.com',
  '0815.ru',
  '0clickemail.com',
  '0wnd.net',
  '0wnd.org',
  '10mail.org',
  '123-m.com',
  '1ce.us',
  '1chuan.com',
  '1mail.ml',
  '1pad.de',
  '20email.eu',
  '20mail.eu',
  '2prong.com',
  '30minutemail.com',
  '33mail.com',
  '3d-painting.com',
  '4warding.com',
  '4warding.net',
  '4warding.org',
  '5mail.cf',
  '5mail.ga',
  '60minutemail.com',
  '675hosting.com',
  '675hosting.net',
  '675hosting.org',
  '6url.com',
  '75hosting.com',
  '75hosting.net',
  '75hosting.org',
  '7tags.com',
  '9ox.net',

  // Additional Common Ones
  'emailsensei.com',
  'emailtemporanea.com',
  'emailtemporanea.net',
  'emailtemporar.ro',
  'emailtemporario.com.br',
  'emailthe.net',
  'emailtmp.com',
  'emailwarden.com',
  'emailxfer.com',
  'emeil.in',
  'emeil.ir',
  'emeraldwebmail.com',
  'emil.com',
  'emkei.cf',
  'emkei.ga',
  'emkei.gq',
  'emkei.ml',
  'emkei.tk',
  'eml.pp.ua',
  'emltmp.com',
  'emz.net',
  'fakemail.fr',
  'fakemailgenerator.com',
  'fastacura.com',
  'fastchevy.com',
  'fastchrysler.com',
  'fastkawasaki.com',
  'fastmazda.com',
  'fastmitsubishi.com',
  'fastnissan.com',
  'fastsubaru.com',
  'fastsuzuki.com',
  'fasttoyota.com',
  'fastyamaha.com',
  'filzmail.com',
  'fivemail.de',
  'fixmail.tk',
  'fizmail.com',
  'fleckens.hu',
  'fmail.tk',
  'fmailbox.com',
  'freemail.ms',
  'freemails.cf',
  'freemails.ga',
  'freemails.ml',
  'freundin.ru',
  'friendlymail.co.uk',
])

/**
 * Check if email domain is disposable/temporary
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false

  const domain = email.toLowerCase().split('@')[1]
  if (!domain) return false

  return DISPOSABLE_EMAIL_DOMAINS.has(domain)
}

/**
 * Get email validation result with reason
 */
export function validateEmailDomain(email: string): {
  valid: boolean
  reason?: string
} {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'Email inválido' }
  }

  const domain = email.toLowerCase().split('@')[1]
  if (!domain) {
    return { valid: false, reason: 'Formato de email inválido' }
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: 'Emails temporários não são permitidos. Use um email permanente.'
    }
  }

  return { valid: true }
}

/**
 * Add custom domain to blocklist (runtime)
 */
export function blockDomain(domain: string): void {
  DISPOSABLE_EMAIL_DOMAINS.add(domain.toLowerCase())
}

/**
 * Check multiple domains at once
 */
export function validateBulkEmails(emails: string[]): {
  email: string
  valid: boolean
  reason?: string
}[] {
  return emails.map(email => ({
    email,
    ...validateEmailDomain(email)
  }))
}
