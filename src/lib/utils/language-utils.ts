'use client';

// import { SupportedLanguage } from '@/lib/i18n';
type SupportedLanguage = 'en' | 'pt' | 'es' | 'fr';

/**
 * Maps a path to its localized version based on language
 * This helps create proper URL structures for multilingual SEO
 *
 * @param path The base path (without language prefix)
 * @param language The language code
 * @param defaultLanguage The default language that doesn't get a prefix
 * @returns The localized path
 */
export function getLocalizedPath(
  path: string,
  language: SupportedLanguage,
  defaultLanguage: SupportedLanguage = 'pt'
): string {
  // Clean up path to ensure it starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Default language doesn't get a prefix in the URL
  if (language === defaultLanguage) {
    return cleanPath;
  }

  // Other languages get a prefix
  return `/${language}${cleanPath}`;
}

/**
 * Creates an object with alternate paths for all supported languages
 * Used for proper SEO with alternate language links
 *
 * @param path Base path without language prefix
 * @param currentLanguage Current active language
 * @param supportedLanguages List of all supported languages
 * @param defaultLanguage The default language that doesn't get a prefix
 * @returns Object with language codes as keys and corresponding paths as values
 */
export function getAlternateLanguagePaths(
  path: string,
  currentLanguage: SupportedLanguage,
  supportedLanguages: SupportedLanguage[] = ['en', 'pt', 'es', 'fr'],
  defaultLanguage: SupportedLanguage = 'en'
): Record<SupportedLanguage, string> {
  const result = {} as Record<SupportedLanguage, string>;

  supportedLanguages.forEach(lang => {
    result[lang] = getLocalizedPath(path, lang, defaultLanguage);
  });

  return result;
}

/**
 * Extracts language from URL path
 * Used to detect language from URL for server-side rendering
 *
 * @param path URL path
 * @param supportedLanguages List of all supported languages
 * @param defaultLanguage Default language to return if no match
 * @returns Detected language code and path without language prefix
 */
export function extractLanguageFromPath(
  path: string,
  supportedLanguages: SupportedLanguage[] = ['en', 'pt', 'es', 'fr'],
  defaultLanguage: SupportedLanguage = 'en'
): { language: SupportedLanguage; pathWithoutLanguage: string } {
  // Ensure path starts with a slash and split into segments
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const segments = normalizedPath.split('/').filter(Boolean);

  // Check if the first segment is a language code
  if (segments.length > 0) {
    const potentialLang = segments[0] as SupportedLanguage;

    if (supportedLanguages.includes(potentialLang)) {
      // Remove language segment and rejoin path
      const remainingPath = '/' + segments.slice(1).join('/');
      return {
        language: potentialLang,
        pathWithoutLanguage: remainingPath || '/',
      };
    }
  }

  // No language in path, return default
  return {
    language: defaultLanguage,
    pathWithoutLanguage: normalizedPath,
  };
}
