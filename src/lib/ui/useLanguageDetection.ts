'use client';

import { useEffect, useState } from 'react';

// import { SupportedLanguage } from '@/lib/i18n';
type SupportedLanguage = 'en' | 'pt' | 'es' | 'fr';

/**
 * Hook to detect the user's preferred language from browser settings
 * @param supportedLanguages - Array of language codes that the app supports
 * @param defaultLanguage - Fallback language if detection fails
 * @returns The detected language code
 */
export function useLanguageDetection(
  supportedLanguages: SupportedLanguage[] = ['en', 'pt', 'es', 'fr'],
  defaultLanguage: SupportedLanguage = 'en'
): {
  detectedLanguage: SupportedLanguage;
  isDetecting: boolean;
} {
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') {
      return;
    }

    // Function to get the best matching language
    const detectLanguage = (): SupportedLanguage => {
      try {
        // Try to get language from navigator
        if (navigator.languages && navigator.languages.length) {
          // Loop through browser's preferred languages
          for (const browserLang of navigator.languages) {
            // Extract the language code (e.g., 'en' from 'en-US')
            const langCode = browserLang.split('-')[0].toLowerCase();

            // Check if it's in our supported languages
            if (supportedLanguages.includes(langCode as SupportedLanguage)) {
              return langCode as SupportedLanguage;
            }
          }
        }

        // Fallback to navigator.language if navigator.languages is not available
        if (navigator.language) {
          const langCode = navigator.language.split('-')[0].toLowerCase();
          if (supportedLanguages.includes(langCode as SupportedLanguage)) {
            return langCode as SupportedLanguage;
          }
        }

        // If no match is found, return the default language
        return defaultLanguage;
      } catch (error) {
        console.warn('Failed to detect browser language:', error);
        return defaultLanguage;
      }
    };

    // Detect and set the language
    const detected = detectLanguage();
    setDetectedLanguage(detected);
    setIsDetecting(false);
  }, [defaultLanguage, supportedLanguages]);

  return { detectedLanguage, isDetecting };
}
