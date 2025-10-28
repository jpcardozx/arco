import * as React from 'react'
import { Img } from '@react-email/components'
import { emailTokens } from '../_tokens'

interface HeaderProps {
  tagline?: string
  showTagline?: boolean
}

/**
 * Header - Professional logo with proper asset handling
 * Logo must be served from public folder or CDN
 */
export function Header({ 
  tagline = emailTokens.company.tagline, 
  showTagline = true 
}: HeaderProps) {
  const { logo } = emailTokens.assets
  const { colors, typography, spacing } = emailTokens

  return (
    <>
      <table
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        style={{ 
          width: '100%', 
          marginBottom: showTagline ? spacing[4] : spacing[3],
        }}
      >
        <tbody>
          <tr>
            <td align="center">
              {/* Logo - ensure this file exists at public/logo.svg */}
              <Img
                src={logo.light}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{ 
                  display: 'block', 
                  margin: '0 auto',
                  maxWidth: `${logo.width}px`,
                  height: 'auto',
                }}
              />

              {/* Tagline */}
              {showTagline && tagline && (
                <p
                  style={{
                    margin: `${spacing[1.5]} 0 0 0`,
                    fontSize: typography.size.sm,
                    color: colors.textMuted,
                    fontWeight: typography.weight.medium,
                    textAlign: 'center',
                    letterSpacing: typography.letterSpacing.wide,
                    lineHeight: typography.lineHeight.snug,
                  }}
                >
                  {tagline}
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
