'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from './button';
import { useTranslation } from '@/lib/i18n/context';
import { useUserPreferences } from '@/lib/hooks/useUserPreferences';
import { cn } from '@/lib/utils/ui-utils';


interface Language {
  code: 'en' | 'pt' | 'es' | 'fr';
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

interface LanguageSwitcherProps {
  className?: string;
  displayStyle?: 'minimal' | 'compact' | 'full';
  position?: 'dropdown' | 'horizontal' | 'grid';
  variant?: 'default' | 'buttons' | 'menu';
  showFlags?: boolean;
  showNativeNames?: boolean;
  onLanguageChange?: (lang: Language['code']) => void;
}

/**
 * Language Switcher Component for internationalization support
 */
export function LanguageSwitcher({
  className,
  displayStyle = 'minimal',
  position = 'dropdown',
  variant = 'default',
  showFlags = true,
  showNativeNames = false,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { preferences, updatePreferences } = useUserPreferences();
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Find current language
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Handle language selection
  const handleSelectLanguage = (langCode: Language['code']) => {
    updatePreferences({ language: langCode });
    setLanguage(langCode);
    setIsOpen(false);

    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  // Button styles for different display styles
  const buttonStyles = {
    minimal:
      'p-2 text-neutral-700 hover:bg-neutral-100 rounded-full dark:text-neutral-300 dark:hover:bg-neutral-800',
    compact:
      'px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg dark:text-neutral-300 dark:hover:bg-neutral-800',
    full: 'px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg dark:text-neutral-300 dark:hover:bg-neutral-800',
  };

  // Menu position variants
  const menuPos = position === 'dropdown' ? 'right-0 top-full mt-1' : 'left-0 top-full mt-1';

  // Render buttons variant
  if (variant === 'buttons') {
    return (
      <div className={cn('flex gap-2', className)}>
        {languages.map(lang => (
          <Button
            key={lang.code}
            size="sm"
            variant={language === lang.code ? 'default' : 'outline'}
            onClick={() => handleSelectLanguage(lang.code)}
            className={cn(language === lang.code && 'border-2 border-blue-500')}
          >
            {showFlags && <span className="mr-2">{lang.flag}</span>}
            {showNativeNames ? lang.nativeName : lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }

  // Default dropdown style
  return (
    <div className={cn('relative', className)}>
      {/* Current language button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn('flex items-center gap-2 transition-colors', buttonStyles[displayStyle])}
        aria-label="Change language"
      >
        {displayStyle === 'minimal' && <Globe size={18} />}

        {displayStyle !== 'minimal' && showFlags && (
          <span className="text-lg">{currentLanguage.flag}</span>
        )}

        {displayStyle === 'full' && (
          <span className="text-sm font-medium">
            {showNativeNames ? currentLanguage.nativeName : currentLanguage.name}
          </span>
        )}

        {displayStyle !== 'minimal' && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Language menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside handler */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 min-w-[180px] rounded-lg border border-neutral-200 bg-white p-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-800',
                position !== 'dropdown' && 'w-full',
                menuPos
              )}
            >
              <div
                className={position === 'grid' ? 'grid grid-cols-2 gap-1' : 'flex flex-col gap-1'}
              >
                {languages.map(language => (
                  <button
                    key={language.code}
                    onClick={() => handleSelectLanguage(language.code)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm',
                      preferences.language === language.code
                        ? 'bg-neutral-100 font-medium dark:bg-neutral-700'
                        : 'dark:hover:bg-neutral-750 hover:bg-neutral-50'
                    )}
                  >
                    {showFlags && <span className="text-base">{language.flag}</span>}

                    <span className="flex-grow">
                      {showNativeNames ? language.nativeName : language.name}
                    </span>

                    {preferences.language === language.code && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
