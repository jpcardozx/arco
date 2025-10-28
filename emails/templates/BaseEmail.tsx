import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Preview,
} from '@react-email/components'
import { emailTokens } from '../_tokens'

interface BaseEmailProps {
  preview: string
  children: React.ReactNode
}

/**
 * BaseEmail - Wrapper for all emails
 * Includes HTML structure, email CSS reset, and dark mode support
 * 
 * Email client compatibility:
 * - Outlook (Windows/Mac)
 * - Gmail (Web/Mobile/App)
 * - Apple Mail (iOS/macOS)
 * - Yahoo, AOL, Outlook.com
 */
export function BaseEmail({ preview, children }: BaseEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
        <meta name="x-apple-disable-message-reformatting" />
        
        {/* Email CSS Reset - Critical for cross-client rendering */}
        <style>{`
          /* CSS Reset for Email Clients */
          body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
          table {
            border-collapse: collapse !important;
          }
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          
          /* Gmail Blue Links Fix */
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          
          /* Prevent WebKit and Windows mobile changing default text sizes */
          div[style*="margin: 16px 0"] {
            margin: 0 !important;
          }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>

      <Body
        style={{
          backgroundColor: emailTokens.colors.bg,
          fontFamily: emailTokens.typography.font,
          margin: '0',
          padding: '0',
          width: '100%',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {/* Full-width wrapper for background color */}
        <table
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          border={0}
          width="100%"
          style={{
            width: '100%',
            backgroundColor: emailTokens.colors.bg,
          }}
          className="email-body-wrapper"
        >
          <tr>
            <td
              align="center"
              style={{
                padding: `${emailTokens.spacing[6]} 0`,
              }}
            >
              {/* Main content container */}
              <table
                role="presentation"
                cellSpacing="0"
                cellPadding="0"
                border={0}
                width={parseInt(emailTokens.layout.maxWidth)}
                style={{
                  maxWidth: emailTokens.layout.maxWidth,
                  width: '100%',
                  margin: '0 auto',
                  backgroundColor: emailTokens.colors.bg,
                }}
                className="email-container"
              >
                <tr>
                  <td
                    style={{
                      padding: `0 ${emailTokens.layout.padding}`,
                    }}
                  >
                    {children}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        {/* Global dark mode styles */}
        <style>{`
          @media (prefers-color-scheme: dark) {
            body,
            .email-body-wrapper,
            .email-container {
              background-color: ${emailTokens.colors.darkBg} !important;
            }
            .email-text {
              color: ${emailTokens.colors.darkText} !important;
            }
            .email-text-secondary {
              color: ${emailTokens.colors.darkText} !important;
            }
            .email-text-muted {
              color: ${emailTokens.colors.textMuted} !important;
            }
          }
          
          /* Outlook Dark Mode Support */
          [data-ogsc] body,
          [data-ogsc] .email-body-wrapper,
          [data-ogsc] .email-container {
            background-color: ${emailTokens.colors.darkBg} !important;
          }
          
          /* Mobile responsive */
          @media only screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              max-width: 100% !important;
            }
            td[style*="padding"] {
              padding-left: ${emailTokens.layout.paddingMobile} !important;
              padding-right: ${emailTokens.layout.paddingMobile} !important;
            }
          }
        `}</style>
      </Body>
    </Html>
  )
}
