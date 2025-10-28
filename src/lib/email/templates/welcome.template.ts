/**
 * Welcome Email Template
 * Professional, impersonal, functional
 */

import { BaseEmailTemplate } from './base.template'

export class WelcomeEmailTemplate extends BaseEmailTemplate {
  render(data: Record<string, unknown>): string {
    const userName = String(data.userName || 'usuário')
    const dashboardUrl = String(data.dashboardUrl || 'https://arco.digital/dashboard')
    
    const content = `
${this.renderCard(`
  <h2 style="margin: 0 0 10px 0; font-size: 24px; color: white;">
    Conta criada com sucesso
  </h2>
  <p style="margin: 0; opacity: 0.95; line-height: 1.6;">
    Olá, ${this.escapeHtml(userName)}. Sua conta ARCO Digital está ativa.
  </p>
`, 'gradient')}

${this.renderCard(`
  <h3 style="color: ${this.defaults.textColor}; margin: 0 0 20px 0; font-size: 18px;">
    Próximos passos
  </h3>
  <ul style="color: ${this.defaults.mutedColor}; line-height: 1.8; padding-left: 20px; margin: 0;">
    <li>Complete seu perfil</li>
    <li>Configure preferências de notificação</li>
    <li>Explore recursos disponíveis</li>
  </ul>
`)}

${this.renderButton('Acessar dashboard', dashboardUrl)}
    `
    
    return this.wrapHtml(content, 'Bem-vindo - ARCO Digital')
  }

  renderPlainText(data: Record<string, unknown>): string {
    const userName = String(data.userName || 'usuário')
    const dashboardUrl = String(data.dashboardUrl || 'https://arco.digital/dashboard')
    
    return `
Conta criada com sucesso

Olá, ${userName}. Sua conta ARCO Digital está ativa.

Próximos passos:
- Complete seu perfil
- Configure preferências de notificação
- Explore recursos disponíveis

Acesse: ${dashboardUrl}

---
ARCO Digital © ${new Date().getFullYear()}
contato@arco.digital
    `.trim()
  }
}
