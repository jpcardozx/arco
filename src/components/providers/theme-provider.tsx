/**
 * Theme Provider - Elegant Dark Mode System
 * 
 * Supports:
 * - Light/Dark/Auto modes with system preference detection
 * - Smooth transitions between themes
 * - LocalStorage persistence
 * - SSR-safe implementation
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'arco-theme';
const THEME_ATTRIBUTE = 'data-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'auto';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return 'auto';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'auto' ? getSystemTheme() : theme;
}

function applyTheme(resolvedTheme: ResolvedTheme) {
  const root = document.documentElement;
  
  // Add transition class temporarily
  root.classList.add('theme-transition');
  
  // Apply theme
  root.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
  
  // Remove transition class after animation completes
  setTimeout(() => {
    root.classList.remove('theme-transition');
  }, 300);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const stored = getStoredTheme();
    const resolved = resolveTheme(stored);
    
    setThemeState(stored);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  // Listen to system theme changes when in auto mode
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        const newResolved = e.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        applyTheme(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    const newResolved = resolveTheme(newTheme);
    
    setThemeState(newTheme);
    setResolvedTheme(newResolved);
    applyTheme(newResolved);
    
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme,
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

/**
 * Inline script to prevent FOUC (Flash of Unstyled Content)
 * Must be placed in document <head> before any content renders
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('${STORAGE_KEY}') || 'auto';
        var resolvedTheme = theme === 'auto'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;
        document.documentElement.setAttribute('${THEME_ATTRIBUTE}', resolvedTheme);
      } catch (e) {
        console.warn('Theme initialization failed:', e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
