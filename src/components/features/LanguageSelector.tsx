import React from 'react';

import { useTranslation, SupportedLanguage } from '../../../lib/context/i18n-context';

const LanguageSelector = () => {
  const { language, setLanguage } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as SupportedLanguage);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Select Language:</label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="rounded border p-2"
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
