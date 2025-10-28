import * as React from 'react'
import { emailTokens } from '../_tokens'

interface ContainerProps {
  children: React.ReactNode
  size?: 'compact' | 'default' | 'comfortable' | 'spacious'
  background?: 'white' | 'gray'
  align?: 'left' | 'center' | 'right'
}

/**
 * Container - Layout profissional com spacing otimizado
 * Mobile-first com responsive scaling
 */
export function Container({
  children,
  size = 'default',
  background = 'white',
  align = 'left',
}: ContainerProps) {
  // Spacing mobile → desktop (1.5x multiplier)
  const spacing = {
    compact: { mobile: '12px', desktop: '16px' },
    default: { mobile: '16px', desktop: '24px' },
    comfortable: { mobile: '24px', desktop: '32px' },
    spacious: { mobile: '32px', desktop: '48px' },
  }[size]

  const bg = background === 'gray' ? emailTokens.colors.bgGray : emailTokens.colors.bg

  return (
    <>
      <table
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        style={{
          width: '100%',
          maxWidth: emailTokens.layout.maxWidth,
          margin: '0 auto',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          <tr>
            <td
              align={align}
              className={`container-${size}`}
              style={{
                padding: spacing.mobile,
                backgroundColor: bg,
                fontFamily: emailTokens.typography.font,
                fontSize: emailTokens.typography.size.base,
                color: emailTokens.colors.text,
                lineHeight: emailTokens.typography.lineHeight.normal,
              } as React.CSSProperties}
            >
              {children}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Responsive + Dark Mode */}
      <style>{`
        /* Desktop spacing (1.5x) */
        @media only screen and (min-width: 600px) {
          .container-compact { padding: ${spacing.desktop} !important; }
          .container-default { padding: 24px !important; }
          .container-comfortable { padding: 32px !important; }
          .container-spacious { padding: 48px !important; }
        }
        
        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .container-dark-bg { 
            background-color: ${emailTokens.colors.darkBg} !important; 
            color: ${emailTokens.colors.darkText} !important;
          }
        }
        
        /* Outlook dark mode */
        [data-ogsc] .container-dark-bg { 
          background-color: ${emailTokens.colors.darkBg} !important; 
          color: ${emailTokens.colors.darkText} !important;
        }
      `}</style>
    </>
  )
}
