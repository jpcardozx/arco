import * as React from 'react'
import { emailTokens } from '../_tokens'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'primary'
  padding?: 'default' | 'comfortable' | 'spacious'
}

/**
 * Card - Clean unified component with professional styling
 * Use children to compose icon + title + content with full flexibility
 */
export function Card({
  children,
  variant = 'default',
  padding = 'default',
}: CardProps) {
  const { colors, layout } = emailTokens
  
  // Responsive spacing (mobile → desktop)
  const spacingMap = {
    default: { mobile: '20px', desktop: '24px' },
    comfortable: { mobile: '24px', desktop: '32px' },
    spacious: { mobile: '32px', desktop: '40px' },
  }
  const spacing = spacingMap[padding]
  
  // Variant styles
  const variants = {
    default: {
      bg: colors.bg,
      border: `1px solid ${colors.border}`,
      shadow: 'none',
    },
    elevated: {
      bg: colors.bg,
      border: 'none',
      shadow: layout.shadowMd,
    },
    primary: {
      bg: colors.primaryLight,
      border: `2px solid ${colors.primary}`,
      shadow: `0 4px 12px rgba(99, 102, 241, 0.12)`,
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
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          <tr>
            <td
              className={`card-${padding}`}
              style={{
                backgroundColor: style.bg,
                padding: spacing.mobile,
                borderRadius: layout.borderRadius,
                border: style.border,
                boxShadow: style.shadow,
              }}
            >
              {children}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Responsive spacing for desktop */}
      <style>{`
        @media only screen and (min-width: 600px) {
          .card-default { padding: ${spacing.desktop} !important; }
          .card-comfortable { padding: ${spacingMap.comfortable.desktop} !important; }
          .card-spacious { padding: ${spacingMap.spacious.desktop} !important; }
        }
      `}</style>
    </>
  )
}
