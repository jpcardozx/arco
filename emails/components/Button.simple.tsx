import * as React from 'react'
import { emailTokens } from '../_tokens'

interface ButtonProps {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large'
  fullWidth?: boolean
}

/**
 * Button - CTA profissional com visual polido
 * Subtle shadows, proper sizing (WCAG), hover states
 */
export function Button({
  children,
  href,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
}: ButtonProps) {
  const height = size === 'large' ? '54px' : '48px'
  const fontSize = size === 'large' ? emailTokens.typography.size.lg : emailTokens.typography.size.base
  const paddingX = size === 'large' ? '32px' : '28px'

  // Variant styles
  const variants = {
    primary: {
      bg: emailTokens.colors.primary,
      color: '#ffffff',
      border: 'none',
      shadow: '0 2px 8px rgba(99, 102, 241, 0.25), 0 1px 3px rgba(99, 102, 241, 0.15)',
      hoverBg: emailTokens.colors.primaryHover,
    },
    secondary: {
      bg: emailTokens.colors.bg,
      color: emailTokens.colors.primary,
      border: `2px solid ${emailTokens.colors.primary}`,
      shadow: 'none',
      hoverBg: emailTokens.colors.primaryLight,
    },
    ghost: {
      bg: 'transparent',
      color: emailTokens.colors.primary,
      border: 'none',
      shadow: 'none',
      hoverBg: emailTokens.colors.primaryLight,
    },
  }
  const style = variants[variant]

  return (
    <>
      <table 
        role="presentation" 
        cellSpacing="0" 
        cellPadding="0" 
        border={0}
        style={{
          width: fullWidth ? '100%' : 'auto',
          margin: '8px 0',
        }}
      >
        <tbody>
          <tr>
            <td
              align="center"
              className={`btn-${variant}`}
              style={{
                borderRadius: emailTokens.layout.borderRadius,
                backgroundColor: style.bg,
                border: style.border,
                boxShadow: style.shadow,
              } as React.CSSProperties}
            >
              <a
                href={href}
                className={`btn-link-${variant}`}
                style={{
                  display: 'inline-block',
                  padding: `0 ${paddingX}`,
                  height,
                  lineHeight: height,
                  fontFamily: emailTokens.typography.font,
                  fontSize,
                  fontWeight: emailTokens.typography.weight.semibold,
                  color: style.color,
                  textDecoration: 'none',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                } as React.CSSProperties}
              >
                {children}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Hover states (email clients que suportam) */}
      <style>{`
        .btn-link-primary:hover {
          background-color: ${style.hoverBg} !important;
        }
        .btn-link-secondary:hover {
          background-color: ${style.hoverBg} !important;
        }
        .btn-link-ghost:hover {
          background-color: ${style.hoverBg} !important;
        }
      `}</style>
    </>
  )
}
