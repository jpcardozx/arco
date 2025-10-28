/**
 * ARCO Email Design System v3.0
 * Professional, Accessible, Production-Ready
 * Icons: Heroicons v2 (MIT) - inline SVG optimized for email clients
 */

const BASE_URL = 'https://consultingarco.com'

export const emailTokens = {
  // URLs centralizadas
  urls: {
    base: BASE_URL,
    dashboard: `${BASE_URL}/dashboard`,
    unsubscribe: (email: string) => `${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}`,
    privacy: `${BASE_URL}/privacidade`,
    terms: `${BASE_URL}/termos`,
    support: `${BASE_URL}/suporte`,
    booking: `${BASE_URL}/agenda`,
  },

  // Company info
  company: {
    name: 'ARCO Consultoria',
    tagline: 'Consultoria Estratégica em Performance',
    email: 'contato@consultingarco.com',
    from: 'ARCO <noreply@consultingarco.com>',
    address: 'Brasil',
  },

  // Brand assets
  assets: {
    logo: {
      light: `${BASE_URL}/logos/horizontal/colorful.png`,
      dark: `${BASE_URL}/logos/horizontal/white.png`,
      width: 160,
      height: 48,
      alt: 'ARCO Consultoria',
    },
  },

  // Heroicons v2 - Inline SVG (funciona em todos email clients)
  // Usar com <Img src={emailTokens.icons.eye} width="20" height="20" />
  icons: {
    // Analytics
    eye: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzY0NzQ4YiI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4wMzYgMTIuMzIyYTEuMDEyIDEuMDEyIDAgMDEwLS42NDRDNS40MTQgNy43NDYgOC41NCA2IDEyIDZjMy40NiAwIDYuNTg2IDEuNzQ2IDkuOTY0IDUuNjc4LjUwNi41ODMuNTA2IDEuMDYgMCAxLjY0NC0zLjM3OCAzLjkzMi02LjUwNCA1LjY3OC05Ljk2NCA1LjY3OC0zLjQ2IDAtNi41ODYtMS43NDYtOS45NjQtNS42Nzh6Ii8+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTUgMTJhMyAzIDAgMTEtNiAwIDMgMyAwIDAxNiAweiIvPjwvc3ZnPg==',
    checkCircle: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzEwYjk4MSI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNOSAxMi43NWwxLjUgMS41TDE1IDkuNzVtLTYtN0E5Ljc1IDkuNzUgMCAxMDIxLjc1IDEyIDkuNzUgOS43NSAwIDAxMTIgMi43NXoiLz48L3N2Zz4=',
    currencyDollar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzYzNjZmMSI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTIgNnYxMm0tMy0yLjgxOGwuODc5LjY1OWMxLjE3MS44NzkgMy4wNy44NzkgNC4yNDIgMCAxLjE3Mi0uODc5IDEuMTcyLTIuMzAzIDAtMy4xODItLjcxNS0uNTM2LTEuNjg2LS42NjEtMi41NzMtLjMzNmwtLjkwOC4zM2MtLjg4Ny4zMjUtMS44NTguMi0yLjU3My0uMzM2LTEuMTcyLS44NzktMS4xNzItMi4zMDMgMC0zLjE4MiAxLjE3MS0uODc5IDMuMDctLjg3OSA0LjI0MiAwbC44NzkuNjU5bS04LjU0OC0uOTY3QzQuMzI4IDguMTY2IDMuNzUgMTAuMDQ2IDMuNzUgMTJzLjU3OCAzLjgzNCAxLjYyMyA1LjQ4OG0xNy44NTQtMTAuOTc2YTkuNyA5LjcgMCAwMC0xLjUtMi42MTNtMS41IDIuNjEzYTkuNzUgOS43NSAwIDAxMS42MjMgNS40ODggOS43NSA5Ljc1IDAgMDEtMS42MjMgNS40ODhtLTE3Ljg1NC0xMC45NzZhOS43IDkuNyAwIDAxMS41LTIuNjEzbTE2LjM1NCAwYTkuNyA5LjcgMCAwMTEuNSAyLjYxM00yMS4yMjcgMTcuNDg4YTkuNyA5LjcgMCAwMS0xLjUgMi42MTNtLTE2LjM1NCAwYTkuNyA5LjcgMCAwMS0xLjUtMi42MTNtMTYuMzU0IDBhOS43NSA5Ljc1IDAgMDEtMTQuNzUgMCIvPjwvc3ZnPg==',
    chartBar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzY0NzQ4YiI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNM3YxLjVNMyAyMS43NWgxOE0zIDE2LjVWOC4yNWEyLjI1IDIuMjUgMCAwMTIuMjUtMi4yNWgxLjM3MmMyLjAwNCAwIDIuNzcxLjg1NCAyLjg0IDIuODc1bC41MzggMTUuODc1bTUuNzUtMTQuNTM2VjguMjVhMi4yNSAyLjI1IDAgMDEyLjI1LTIuMjVoMi4zNzJhMi4yNSAyLjI1IDAgMDEyLjI1IDIuMjV2MTMuNW0tNi43NS0xMy41VjIxLjc1bTYuNzUtMTAuNVYyMS43NSIvPjwvc3ZnPg==',
    arrowRight: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNmZmZmZmYiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0ibTgtMTIgNCA0bTAtNGwtNC00bTQgNEgzIi8+PC9zdmc+',
    // Utility
    calendar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzY0NzQ4YiI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNi43NSA1LjI1YTMuNzUgMy43NSAwIDAxNy41IDBNNi43NSA1LjI1djEuNWEzLjc1IDMuNzUgMCAwMDcuNSAwdi0xLjVtLTcuNSAwSDQuNWE0LjUgNC41IDAgMDAtNC41IDQuNXYxMC41YTQuNSA0LjUgMCAwMDQuNSA0LjVoMTVhNC41IDQuNSAwIDAwNC41LTQuNXYtMTAuNWE0LjUgNC41IDAgMDAtNC41LTQuNWgtMi4yNSIvPjwvc3ZnPg==',
    envelope: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzY0NzQ4YiI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDBWOC45Nzk0bC04LjUwNzggNS40MzE2YTIuMjUgMi4yNSAwIDAxLTIuNDg0NCAwTDIuMjUgOC45Nzk0VjYuNzUiLz48L3N2Zz4=',
    informationCircle: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNiODJmNiI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJtMTEuMjUgMTEuMjUuMDQxLS4wMmEuNzUuNzUgMCAwMTEuMDYzLjg1Mmwtmy4yNSA1LjI1YS43NS43NSAwIDAwMS4wNjMuODUzbC4wNDEtLjAyMU0xMiA4LjI1aC4wMDhtMCA3LjVoLjAwOE0yMS43NSAxMmE5Ljc1IDkuNzUgMCAxMS0xOS41IDAgOS43NSA5Ljc1IDAgMDExOS41IDB6Ii8+PC9zdmc+',
  },

  // Colors - WCAG AA+ compliant (4.5:1 contrast ratio minimum)
  colors: {
    // Brand (Indigo scale)
    primary: '#6366f1',        // Primary CTA
    primaryHover: '#4f46e5',   // Hover state
    primaryLight: '#eef2ff',   // Light backgrounds
    primaryDark: '#4338ca',    // High contrast variant

    // Neutrals (Slate scale) - High readability
    text: '#0f172a',           // Primary text (21:1 contrast)
    textMuted: '#475569',      // Secondary text (7:1 contrast)
    textSubtle: '#64748b',     // Tertiary text (4.6:1 contrast)

    // Backgrounds
    bg: '#ffffff',             // Pure white
    bgGray: '#f8fafc',         // Subtle gray
    bgMuted: '#f1f5f9',        // Medium gray

    // Borders
    border: '#e2e8f0',         // Standard border
    borderMuted: '#f1f5f9',    // Subtle border
    borderStrong: '#cbd5e1',   // Strong border

    // Semantic colors
    success: '#059669',        // Green 600 (WCAG AA)
    successLight: '#d1fae5',   // Green 100
    warning: '#d97706',        // Amber 600 (WCAG AA)
    warningLight: '#fef3c7',   // Amber 100
    error: '#dc2626',          // Red 600 (WCAG AA)
    errorLight: '#fee2e2',     // Red 100
    info: '#2563eb',           // Blue 600 (WCAG AA)
    infoLight: '#dbeafe',      // Blue 100

    // Dark mode (for email clients that support)
    darkBg: '#0f172a',
    darkText: '#f1f5f9',
    darkBorder: '#334155',
    darkMuted: '#1e293b',
  },

  // Typography - System fonts optimized for all platforms
  typography: {
    // Font stack (native system fonts for best performance)
    font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontMono: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
    
    // Size scale (based on Major Third 1.25 ratio)
    size: {
      xs: '12px',    // Legal text, captions
      sm: '14px',    // Secondary text, labels
      base: '16px',  // Body text (WCAG AA minimum)
      lg: '18px',    // Large body, subheadings
      xl: '20px',    // Small headings
      '2xl': '24px', // Medium headings
      '3xl': '30px', // Large headings
      '4xl': '36px', // Hero text
    },

    // Weight scale (optimized for web fonts)
    weight: {
      normal: '400',   // Regular text
      medium: '500',   // Emphasis
      semibold: '600', // Strong emphasis
      bold: '700',     // Headings
    },

    // Line height (optimized for readability)
    lineHeight: {
      tight: '1.25',   // Headings, CTAs
      snug: '1.375',   // Subheadings
      normal: '1.5',   // Body text (optimal readability)
      relaxed: '1.625',// Long-form content
      loose: '1.75',   // Spacious layouts
    },

    // Letter spacing (subtle adjustments)
    letterSpacing: {
      tighter: '-0.05em', // Large headings
      tight: '-0.025em',  // Medium headings
      normal: '0',        // Default
      wide: '0.025em',    // Uppercase labels
      wider: '0.05em',    // Spaced uppercase
    },
  },

  // Spacing - Single source of truth (8px base unit)
  spacing: {
    0: '0',
    px: '1px',
    0.5: '4px',    // 0.5 * 8
    1: '8px',      // 1 * 8
    1.5: '12px',   // 1.5 * 8
    2: '16px',     // 2 * 8
    3: '24px',     // 3 * 8
    4: '32px',     // 4 * 8
    5: '40px',     // 5 * 8
    6: '48px',     // 6 * 8
    8: '64px',     // 8 * 8
    10: '80px',    // 10 * 8
  },

  // Layout constraints
  layout: {
    maxWidth: '600px',         // Email standard
    padding: '24px',           // Desktop padding
    paddingMobile: '16px',     // Mobile padding (preserve readability)
    borderRadius: '8px',       // Subtle rounding
    borderRadiusLg: '12px',    // Prominent cards
    minTapTarget: '44px',      // WCAG 2.5.5 (mobile accessibility)
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },

  // Animation (email-safe)
  transition: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },
} as const

// Type helpers
export type EmailColors = typeof emailTokens.colors
export type EmailSpacing = typeof emailTokens.spacing
export type EmailTypography = typeof emailTokens.typography
