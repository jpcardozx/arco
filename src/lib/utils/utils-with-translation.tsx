import React from 'react';
import { useContent } from '../core/content';

/**
 * Type for props that need translation
 */
export interface TranslatableProps {
  locale?: 'en';
}

/**
 * HOC that provides translation context to components
 */
export function withTranslation<P extends TranslatableProps>(
  Component: React.ComponentType<P>
) {
  return function TranslatedComponent(props: P) {
    const content = useContent(props.locale || 'en');

    return <Component {...props} content={content} />;
  };
}

/**
 * Hook for accessing translations in functional components
 */
export function useTranslations(locale: 'en' = 'en') {
  const content = useContent(locale);

  return {
    t: (key: string) => {
      // Simple fallback for any missed translations
      return key;
    },
    content,
    locale
  };
}
