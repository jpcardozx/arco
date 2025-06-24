/**
 * ARCO Design System - Type Definitions
 * 
 * Types for the design system tokens
 */

import { tokens } from './index';

// Helper type for nested objects with string values
type StringValueObject = {
  [key: string]: string | StringValueObject;
};

// Custom token types
export interface ColorScale {
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

export interface FontSize {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
}

export interface FontWeight {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
}

export interface Shadow {
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface Radius {
  DEFAULT: string;
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface Breakpoint {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Main design tokens type
export interface DesignTokens {
  colors: {
    primary: ColorScale;
    semantic: {
      success: Record<string, string>;
      warning: Record<string, string>;
      error: Record<string, string>;
    };
    // Add other color groups as needed
  };
  spacing: SpacingScale;
  fontSize: FontSize;
  fontWeight: FontWeight;
  shadows: Shadow;
  radii: Radius;
  breakpoints: Breakpoint;
}

/**
 * Helper function to retrieve token values
 */
export function getToken(path: string): string {
  const parts = path.split('.');
  let result: any = tokens;
  
  for (const part of parts) {
    if (result && result[part] !== undefined) {
      result = result[part];
    } else {
      return '';
    }
  }
  
  return typeof result === 'string' ? result : '';
}
