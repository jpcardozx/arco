'use client';

import { SupportedLanguage } from '@/lib/context/i18n-context';

export const DEFAULT_LANGUAGE: SupportedLanguage = 'pt';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['pt', 'en', 'es', 'fr'];

/**
 * Detects the user's preferred language from browser settings
 * Falls back to default language if no match
 */
export function detectUserLanguage(): SupportedLanguage {
  // Server-side has no window object
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  // Get browser language
  const browserLang = window.navigator.language.split('-')[0] as SupportedLanguage;

  // Check if browser language is supported
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }

  // Fall back to default language
  return DEFAULT_LANGUAGE;
}

/**
 * Returns the language name in its native form
 */
export function getLanguageName(code: SupportedLanguage): string {
  const languageNames: Record<SupportedLanguage, string> = {
    en: 'English',
    pt: 'Português',
    es: 'Español',
    fr: 'Français',
  };

  return languageNames[code] || languageNames[DEFAULT_LANGUAGE];
}

/**
 * Returns the language direction (ltr or rtl)
 */
export function getLanguageDirection(code: SupportedLanguage): 'ltr' | 'rtl' {
  // Add RTL languages as needed
  const rtlLanguages: SupportedLanguage[] = [];

  return rtlLanguages.includes(code) ? 'rtl' : 'ltr';
}
