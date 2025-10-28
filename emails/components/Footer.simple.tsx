import * as React from 'react'
import { emailTokens } from '../_tokens'

interface FooterProps {
  unsubscribeUrl: string
  companyName?: string
  address?: string
}

/**
 * Footer - Legal links + compliance (CAN-SPAM, GDPR)
 * Professional, complete information
 */
export function Footer({
  unsubscribeUrl,
  companyName = 'ARCO Consultoria',
  address = 'Brasil',
}: FooterProps) {
  const { urls } = emailTokens
  const currentYear = new Date().getFullYear()

  const linkStyle = {
    color: emailTokens.colors.textMuted,
    textDecoration: 'underline',
    fontSize: emailTokens.typography.size.sm,
  }

  const textStyle = {
    margin: '8px 0',
    fontSize: emailTokens.typography.size.sm,
    color: emailTokens.colors.textMuted,
    lineHeight: emailTokens.typography.lineHeight.relaxed,
    textAlign: 'center' as const,
  }

  return (
    <table
      role="presentation"
      cellSpacing="0"
      cellPadding="0"
      border={0}
      style={{
        width: '100%',
        marginTop: '48px',
        borderTop: `1px solid ${emailTokens.colors.border}`,
        paddingTop: '32px',
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            {/* Company info */}
            <p style={textStyle}>
              <strong>{companyName}</strong>
              <br />
              {address}
            </p>

            {/* Links */}
            <p style={textStyle}>
              <a href={urls.privacy} style={linkStyle}>
                Política de Privacidade
              </a>
              {' · '}
              <a href={urls.terms} style={linkStyle}>
                Termos de Uso
              </a>
              {' · '}
              <a href={urls.support} style={linkStyle}>
                Suporte
              </a>
            </p>

            {/* Unsubscribe */}
            <p style={textStyle}>
              <a href={unsubscribeUrl} style={linkStyle}>
                Cancelar inscrição
              </a>
            </p>

            {/* Copyright */}
            <p style={{ ...textStyle, marginTop: '16px', fontSize: emailTokens.typography.size.xs }}>
              © {currentYear} {companyName}. Todos os direitos reservados.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
