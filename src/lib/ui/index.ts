import { financeContent } from './finance-content';

type TranslationMap = {
  [key: string]: any;
};

const translations: TranslationMap = {
  financeContent
};

export function useTranslation() {
  const t = (key: string): any => {
    return translations[key] || null;
  };

  return { t };
}
