'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { I18N_CONFIG, LANGUAGE_NAMES, SupportedLanguage } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
      className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm"
    >      {I18N_CONFIG.supportedLanguages.map((lang: SupportedLanguage) => (
      <option key={lang} value={lang}>
        {LANGUAGE_NAMES[lang]}
      </option>
    ))}
    </select>
  );
}