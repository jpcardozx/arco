'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import * as React from 'react';

/**
 * Theme Provider Component that combines NextThemesProvider and NextUIProvider
 * to provide consistent theming across the application.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}
