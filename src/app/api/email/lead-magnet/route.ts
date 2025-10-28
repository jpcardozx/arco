/**
 * Lead Magnet Email API Route
 *
 * Sends personalized analysis email with:
 * - PDF with benchmark data
 * - Link to tripwire offer (R$39 videocall)
 */

import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, campaign_id } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const firstName = name.split(' ')[0];
    const tripwireUrl = `${process.env.NEXT_PUBLIC_APP_URL}/tripwire?email=${encodeURIComponent(email)}&name=${encodeURIComponent(firstName)}`;

    // Send lead magnet email
    const result = await emailService.send({
      to: { email, name },
      subject: `${firstName}, aqui está sua análise personalizada 📊`,
      html: renderLeadMagnetHtml(firstName, tripwireUrl),
      text: renderLeadMagnetText(firstName, tripwireUrl),
      templateType: 'lead-magnet',
      tags: [
        { name: 'type', value: 'lead-magnet' },
        { name: 'campaign_id', value: campaign_id || 'unknown' },
        { name: 'funnel_stage', value: 'consideration' }
      ]
    });

    // Also send internal notification
    await emailService.sendLeadNotification({
      name,
      email,
      phone,
      source: 'lead_magnet',
      message: `Campaign: ${campaign_id || 'N/A'}`
    });

    if (!result.success) {
      throw new Error(result.error?.message || 'Erro ao enviar email');
    }

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso',
      emailId: result.data?.id || result.messageId
    });

  } catch (error) {
    console.error('Lead magnet email error:', error);
    return NextResponse.json(
      {
        error: 'Erro ao enviar email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// HTML Email Template
function renderLeadMagnetHtml(firstName: string, tripwireUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sua Análise Personalizada</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px; text-align: center;">
                    <h1 style="color: #14b8a6; font-size: 28px; margin: 0 0 12px 0; font-weight: 800;">
                      ARCO Digital
                    </h1>
                    <p style="color: #cbd5e1; font-size: 16px; margin: 0;">
                      Sistema de Captação para Salões
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="color: #0f172a; font-size: 24px; margin: 0 0 16px 0; font-weight: 700;">
                      Oi ${firstName}! 👋
                    </h2>

                    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                      Como prometido, aqui está sua <strong style="color: #0f172a;">análise personalizada</strong> com dados reais do mercado de salões de beleza.
                    </p>

                    <!-- PDF Section -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                      <tr>
                        <td>
                          <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                            <div style="background-color: #14b8a6; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                              <span style="font-size: 20px;">📊</span>
                            </div>
                            <div>
                              <h3 style="color: #0f172a; font-size: 18px; margin: 0 0 8px 0; font-weight: 600;">
                                Benchmarks do Setor (PDF)
                              </h3>
                              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0;">
                                Dados agregados de 23 salões: CAC médio por região, ticket por serviço, taxa de conversão por canal, distribuição de resultados (4 tiers). Compare com seu negócio.
                              </p>
                            </div>
                          </div>
                          <div style="text-align: center; margin-top: 16px; padding: 12px; background-color: #e0f2fe; border-radius: 8px;">
                            <p style="color: #0369a1; font-size: 14px; font-weight: 600; margin: 0;">
                              ⬇️ Baixar PDF anexo
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                      Depois de ver os benchmarks, <strong style="color: #0f172a;">você decide</strong> se faz sentido avançar.
                    </p>

                    <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0 0 24px 0; padding: 12px; background-color: #f8fafc; border-left: 3px solid #14b8a6; border-radius: 4px;">
                      <strong style="color: #0f172a;">Sem pressão:</strong> Se os dados indicarem que seu salão está em condições parecidas com os que tiveram bons resultados (orçamento consistente, mercado receptivo, ticket médio adequado), aí sim vale conversar. Se não, melhor ser honesto.
                    </p>

                    <!-- Tripwire Offer -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 12px; padding: 32px; margin-bottom: 24px;">
                      <tr>
                        <td>
                          <h3 style="color: #ffffff; font-size: 22px; margin: 0 0 12px 0; font-weight: 700; text-align: center;">
                            Se fizer sentido para você
                          </h3>
                          <p style="color: #f0fdfa; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                            Caso os benchmarks indiquem fit (orçamento, ticket, região), você pode solicitar:<br/>
                            • Orçamento personalizado detalhado<br/>
                            • Projeto de implementação com cronograma<br/>
                            • Lista completa de entregáveis técnicos
                          </p>
                          <div style="text-align: center;">
                            <p style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 4px 0;">
                              R$ 149
                            </p>
                            <p style="color: #ccfbf1; font-size: 14px; margin: 0 0 8px 0;">
                              Investimento único • Documento profissional
                            </p>
                            <p style="color: #f0fdfa; font-size: 13px; margin: 0 0 24px 0; font-style: italic;">
                              (Só solicite se os dados indicarem fit — honestidade economiza tempo de ambos)
                            </p>
                            <a href="${tripwireUrl}" style="display: inline-block; background-color: #ffffff; color: #0d9488; font-size: 16px; font-weight: 700; padding: 16px 32px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                              Solicitar Proposta (se fizer sentido) →
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
                      Não se preocupe se não puder agora. Você pode agendar quando quiser através do link acima.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px 0;">
                      ARCO Digital • Sistema de Captação para Salões
                    </p>
                    <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
                      Dúvidas? Responda este email ou entre em contato via WhatsApp.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// Plain Text Version
function renderLeadMagnetText(firstName: string, tripwireUrl: string): string {
  return `
Oi ${firstName}! 👋

Como prometido, aqui está sua análise personalizada com dados reais do mercado de salões de beleza.

ANÁLISE COMPLETA (PDF)
Benchmarks do setor, projeções realistas e próximos passos recomendados para o seu salão.
[PDF será anexado na versão final]

Agora que você viu os dados, que tal conversarmos sobre o seu caso específico?

✨ RECEBA SUA PROPOSTA COMPLETA

Documento profissional com tudo que você precisa saber:
• Orçamento personalizado detalhado
• Projeto de implementação com cronograma
• Lista completa de entregáveis

R$ 149
Investimento único • Documento profissional

Solicitar: ${tripwireUrl}

Não se preocupe se não puder agora. Você pode agendar quando quiser através do link acima.

---
ARCO Digital • Sistema de Captação para Salões
Dúvidas? Responda este email ou entre em contato via WhatsApp.
  `.trim();
}
