/**
 * Navigation Tokens - Design System
 */

export type NavigationVariant = 'default' | 'transparent' | 'solid'
export type NavigationTheme = 'light' | 'dark' | 'auto'

export const navigationTokens = {
  height: {
    desktop: '64px',
    mobile: '56px',
  },
  mobileHeight: '56px',
  zIndex: 1000,
  colors: {
    light: {
      background: 'rgba(255, 255, 255, 0.8)',
      text: '#000000',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.8)',
      text: '#ffffff',
    },
    auto: {
      background: 'rgba(255, 255, 255, 0.8)',
      text: '#000000',
    },
  },
  glassmorphism: {
    blur: {
      default: '10px',
      scrolled: '20px',
    },
    saturation: {
      default: '100%',
      scrolled: '180%',
    },
  },
  shadow: {
    default: '0 2px 8px rgba(0, 0, 0, 0.05)',
    scrolled: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}

export default navigationTokens
