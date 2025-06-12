// ===================================
// 🌍 SISTEMA I18N ARCO - VERSÃO DEFINITIVA
// ===================================
// Sistema único, simples e profissional de internacionalização
// Criado para eliminar overengineering e duplicações

'use client';

// Tipos principais
export type SupportedLanguage = 'pt' | 'en' | 'es' | 'fr';

// Configuração centralizada
export const I18N_CONFIG = {
  defaultLanguage: 'pt' as SupportedLanguage,
  supportedLanguages: ['pt', 'en', 'es', 'fr'] as SupportedLanguage[],
  fallbackLanguage: 'pt' as SupportedLanguage,
  storageKey: 'arco-language'
} as const;

// Detecção de idioma do navegador
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return I18N_CONFIG.defaultLanguage;
  
  try {
    // Tenta recuperar do localStorage primeiro
    const stored = localStorage.getItem(I18N_CONFIG.storageKey) as SupportedLanguage;
    if (stored && I18N_CONFIG.supportedLanguages.includes(stored)) {
      return stored;
    }

    // Detecta do navegador
    const browserLang = window.navigator.language.split('-')[0] as SupportedLanguage;
    return I18N_CONFIG.supportedLanguages.includes(browserLang) 
      ? browserLang 
      : I18N_CONFIG.defaultLanguage;
  } catch {
    return I18N_CONFIG.defaultLanguage;
  }
}

// Salva idioma no localStorage
export function saveLanguage(language: SupportedLanguage): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(I18N_CONFIG.storageKey, language);
    document.documentElement.lang = language;
  } catch {
    // Falha silenciosa se localStorage não estiver disponível
  }
}

// Re-exporta componentes e hooks do contexto
export { I18nProvider, useTranslation, useT } from './context';
export { LanguageSwitcher } from './LanguageSwitcher';
export { translations, getTranslation } from './translations';
export type { TranslationObject } from './translations';

// Nomes dos idiomas
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  pt: 'Português',
  en: 'English', 
  es: 'Español',
  fr: 'Français'
};

// Bandeiras dos idiomas
export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸', 
  fr: '🇫🇷'
};
