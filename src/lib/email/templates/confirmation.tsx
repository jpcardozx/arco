/**
 * Email Confirmation Template
 * Professional template for Resend with ARCO branding
 */

interface ConfirmationEmailProps {
  confirmationUrl: string
  userEmail: string
}

export function ConfirmationEmailHTML({
  confirmationUrl,
  userEmail,
}: ConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirme seu Email - ARCO</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  color: #1a1a1a;
">
  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        ">
          <!-- Header with Gradient -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 32px;
                font-weight: 700;
                letter-spacing: -0.5px;
              ">ARCO</h1>
              <p style="
                margin: 8px 0 0;
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
                font-weight: 500;
              ">Consulting & Analytics</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h2 style="
                margin: 0 0 12px;
                font-size: 26px;
                font-weight: 700;
                color: #0f172a;
                letter-spacing: -0.5px;
              ">Confirme sua conta</h2>

              <p style="
                margin: 0 0 32px;
                font-size: 15px;
                line-height: 1.7;
                color: #475569;
              ">
                Você está a um passo de acessar a plataforma ARCO.
                Para ativar sua conta e começar a otimizar sua operação digital,
                confirme seu endereço de email.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 40px;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${confirmationUrl}" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="15%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:600;">Ativar Conta Agora →</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${confirmationUrl}" style="
                      display: inline-block;
                      padding: 18px 48px;
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 10px;
                      font-size: 15px;
                      font-weight: 600;
                      letter-spacing: 0.3px;
                      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    ">
                      Ativar Conta Agora →
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Value Proposition -->
              <div style="
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 32px;
              ">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding-right: 12px; vertical-align: top;">
                      <div style="
                        background-color: white;
                        border-radius: 8px;
                        padding: 16px;
                        text-align: center;
                        height: 100%;
                      ">
                        <div style="
                          font-size: 24px;
                          margin-bottom: 8px;
                        ">⚡</div>
                        <div style="
                          font-size: 13px;
                          font-weight: 600;
                          color: #0f172a;
                          margin-bottom: 4px;
                        ">Análise Instantânea</div>
                        <div style="
                          font-size: 12px;
                          color: #64748b;
                          line-height: 1.4;
                        ">Performance em segundos</div>
                      </div>
                    </td>
                    <td width="50%" style="padding-left: 12px; vertical-align: top;">
                      <div style="
                        background-color: white;
                        border-radius: 8px;
                        padding: 16px;
                        text-align: center;
                        height: 100%;
                      ">
                        <div style="
                          font-size: 24px;
                          margin-bottom: 8px;
                        ">📊</div>
                        <div style="
                          font-size: 13px;
                          font-weight: 600;
                          color: #0f172a;
                          margin-bottom: 4px;
                        ">Insights Acionáveis</div>
                        <div style="
                          font-size: 12px;
                          color: #64748b;
                          line-height: 1.4;
                        ">Decisões baseadas em dados</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Alternative Link -->
              <div style="
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 32px;
              ">
                <p style="
                  margin: 0 0 12px;
                  font-size: 13px;
                  font-weight: 600;
                  color: #475569;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">Link alternativo</p>
                <p style="
                  margin: 0;
                  font-size: 12px;
                  line-height: 1.6;
                  color: #64748b;
                  word-break: break-all;
                ">
                  <a href="${confirmationUrl}" style="
                    color: #667eea;
                    text-decoration: underline;
                  ">${confirmationUrl}</a>
                </p>
              </div>

              <!-- Security Notice -->
              <div style="
                border-top: 1px solid #e2e8f0;
                padding-top: 24px;
              ">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="24" valign="top" style="padding-top: 2px;">
                      <div style="
                        width: 20px;
                        height: 20px;
                        background-color: #fef3c7;
                        border-radius: 4px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                      ">🔒</div>
                    </td>
                    <td style="padding-left: 12px;">
                      <p style="
                        margin: 0 0 8px;
                        font-size: 13px;
                        font-weight: 600;
                        color: #0f172a;
                      ">Informações de Segurança</p>
                      <ul style="
                        margin: 0;
                        padding-left: 18px;
                        font-size: 12px;
                        line-height: 1.7;
                        color: #64748b;
                      ">
                        <li>Link válido por 24 horas</li>
                        <li>Não compartilhe este email</li>
                        <li>Não solicitou? Ignore esta mensagem</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background-color: #f7fafc;
              padding: 32px 40px;
              border-top: 1px solid #e2e8f0;
            ">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="
                      margin: 0 0 16px;
                      font-size: 14px;
                      color: #718096;
                    ">
                      Conta criada para: <strong>${userEmail}</strong>
                    </p>

                    <div style="margin: 0 0 16px;">
                      <a href="https://consultingarco.com" style="
                        color: #667eea;
                        text-decoration: none;
                        font-size: 13px;
                        margin: 0 12px;
                      ">Website</a>
                      <span style="color: #cbd5e0;">•</span>
                      <a href="mailto:arco@consultingarco.com" style="
                        color: #667eea;
                        text-decoration: none;
                        font-size: 13px;
                        margin: 0 12px;
                      ">Suporte</a>
                      <span style="color: #cbd5e0;">•</span>
                      <a href="https://consultingarco.com/privacy" style="
                        color: #667eea;
                        text-decoration: none;
                        font-size: 13px;
                        margin: 0 12px;
                      ">Privacidade</a>
                    </div>

                    <p style="
                      margin: 0;
                      font-size: 12px;
                      color: #a0aec0;
                    ">
                      © 2025 ARCO Consulting. Todos os direitos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Plain text version (fallback)
 */
export function ConfirmationEmailText({
  confirmationUrl,
  userEmail,
}: ConfirmationEmailProps): string {
  return `
ARCO - Confirme seu Email

Bem-vindo à ARCO!

Obrigado por se cadastrar. Para ativar sua conta, clique no link abaixo:

${confirmationUrl}

Este link expira em 24 horas.

---
Conta criada para: ${userEmail}

Se você não criou esta conta, ignore este email.

© 2025 ARCO Consulting
Website: https://consultingarco.com
Suporte: arco@consultingarco.com
  `.trim()
}
