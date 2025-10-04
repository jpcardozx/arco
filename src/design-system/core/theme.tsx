/**
 * ARCO Theme Provider
 * Professional theme context using ARCO design tokens
 */

'use client';

import React from 'react';
import { designTokens } from '../tokens';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children 
}) => {
  return <div className="arco-theme">{children}</div>;
};

export const useTheme = () => {
  return { theme: designTokens, isDark: false, toggleTheme: () => {} };
};