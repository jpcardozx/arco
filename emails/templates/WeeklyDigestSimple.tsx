import * as React from 'react'
import { Img } from '@react-email/components'
import { BaseEmail } from './BaseEmail'
import { Header } from '../components/Header.simple'
import { Container } from '../components/Container.simple'
import { Card } from '../components/Card.simple'
import { Button } from '../components/Button.simple'
import { Footer } from '../components/Footer.simple'
import { emailTokens } from '../_tokens'

interface WeeklyDigestSimpleProps {
  userName: string
  userEmail: string
  metrics: {
    visits: string
    conversions: string
    revenue: string
  }
  weekRange: string
}

/**
 * Weekly Digest - Professional analytics summary
 * Clean design, Heroicons, semantic colors, clear hierarchy
 */
export function WeeklyDigestSimple({
  userName,
  userEmail,
  metrics,
  weekRange,
}: WeeklyDigestSimpleProps) {
  const firstName = userName.split(' ')[0]
  const { colors, typography, spacing, icons } = emailTokens

  return (
    <BaseEmail preview={`${firstName}, seu resumo semanal: ${metrics.conversions} conversões, ${metrics.revenue} em receita`}>
      {/* Header */}
      <Container size="compact">
        <Header />
      </Container>

      {/* Hero Section */}
      <Container size="comfortable" align="center">
        <h1
          style={{
            margin: `0 0 ${spacing[1.5]} 0`,
            fontSize: typography.size['4xl'],
            fontWeight: typography.weight.bold,
            color: colors.text,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: typography.letterSpacing.tighter,
          }}
        >
          Resumo Semanal
        </h1>
        <p
          style={{
            margin: `0 0 ${spacing[2]} 0`,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wider,
          }}
        >
          {weekRange}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: typography.size.lg,
            color: colors.textMuted,
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          Olá, <strong style={{ color: colors.text }}>{firstName}</strong>. Aqui estão suas principais métricas dos últimos 7 dias.
        </p>
      </Container>

      {/* Metrics Grid */}
      <Container size="default" background="gray">
        <table role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%">
          <tbody>
            {/* Row 1: Visits + Conversions */}
            <tr>
              <td width="50%" style={{ padding: `0 ${spacing[2]} ${spacing[3]} 0` }} valign="top">
                <Card variant="elevated" padding="comfortable">
                  <table role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%">
                    <tbody>
                      <tr>
                        <td align="center">
                          <Img 
                            src={icons.eye} 
                            width="24" 
                            height="24" 
                            alt=""
                            style={{ display: 'block', margin: `0 auto ${spacing[2]} auto` }}
                          />
                          <p style={{
                            margin: `0 0 ${spacing[1]} 0`,
                            fontSize: typography.size.sm,
                            fontWeight: typography.weight.medium,
                            color: colors.textMuted,
                            textTransform: 'uppercase',
                            letterSpacing: typography.letterSpacing.wide,
                          }}>
                            Visitas
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: typography.size['4xl'],
                            fontWeight: typography.weight.bold,
                            color: colors.text,
                            lineHeight: typography.lineHeight.tight,
                          }}>
                            {metrics.visits}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </td>
              <td width="50%" style={{ padding: `0 0 ${spacing[3]} ${spacing[2]}` }} valign="top">
                <Card variant="elevated" padding="comfortable">
                  <table role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%">
                    <tbody>
                      <tr>
                        <td align="center">
                          <Img 
                            src={icons.checkCircle} 
                            width="24" 
                            height="24" 
                            alt=""
                            style={{ display: 'block', margin: `0 auto ${spacing[2]} auto` }}
                          />
                          <p style={{
                            margin: `0 0 ${spacing[1]} 0`,
                            fontSize: typography.size.sm,
                            fontWeight: typography.weight.medium,
                            color: colors.textMuted,
                            textTransform: 'uppercase',
                            letterSpacing: typography.letterSpacing.wide,
                          }}>
                            Conversões
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: typography.size['4xl'],
                            fontWeight: typography.weight.bold,
                            color: colors.success,
                            lineHeight: typography.lineHeight.tight,
                          }}>
                            {metrics.conversions}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </td>
            </tr>
            
            {/* Row 2: Revenue (full width, highlighted) */}
            <tr>
              <td colSpan={2} style={{ padding: '0' }}>
                <Card variant="primary" padding="spacious">
                  <table role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%">
                    <tbody>
                      <tr>
                        <td align="center">
                          <Img 
                            src={icons.currencyDollar} 
                            width="28" 
                            height="28" 
                            alt=""
                            style={{ display: 'block', margin: `0 auto ${spacing[2]} auto` }}
                          />
                          <p style={{
                            margin: `0 0 ${spacing[1.5]} 0`,
                            fontSize: typography.size.base,
                            fontWeight: typography.weight.semibold,
                            color: colors.primaryDark,
                            textTransform: 'uppercase',
                            letterSpacing: typography.letterSpacing.wider,
                          }}>
                            Receita Gerada
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '44px',
                            fontWeight: typography.weight.bold,
                            color: colors.primary,
                            lineHeight: typography.lineHeight.tight,
                            letterSpacing: typography.letterSpacing.tight,
                          }}>
                            {metrics.revenue}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>

      {/* CTA Section */}
      <Container size="comfortable" align="center">
        <p
          style={{
            margin: `0 0 ${spacing[3]} 0`,
            fontSize: typography.size.lg,
            color: colors.textMuted,
            textAlign: 'center',
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          Acesse seu dashboard para visualizar análises detalhadas, tendências e recomendações personalizadas.
        </p>
        <Button
          href={`${emailTokens.urls.dashboard}/reports?week=${encodeURIComponent(weekRange)}&utm_source=email&utm_medium=weekly_digest&utm_campaign=analytics`}
          variant="primary"
          size="large"
        >
          Ver Relatório Completo
        </Button>
      </Container>

      {/* Footer */}
      <Container size="default">
        <Footer unsubscribeUrl={emailTokens.urls.unsubscribe(userEmail)} />
      </Container>
    </BaseEmail>
  )
}
