'use client';

import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from './context';
import { I18N_CONFIG, LANGUAGE_NAMES, LANGUAGE_FLAGS, SupportedLanguage } from './index';

interface LanguageSwitcherProps {
    variant?: 'minimal' | 'compact' | 'full';
    showFlag?: boolean;
    className?: string;
}

export function LanguageSwitcher({
    variant = 'minimal',
    showFlag = true,
    className = ''
}: LanguageSwitcherProps) {
    const { language, setLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLang: SupportedLanguage) => {
        setLanguage(newLang);
        setIsOpen(false);
    };

    const currentFlag = LANGUAGE_FLAGS[language];
    const currentName = LANGUAGE_NAMES[language];

    if (variant === 'minimal') {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    aria-label="Mudar idioma"
                >
                    {showFlag ? (
                        <span className="text-lg">{currentFlag}</span>
                    ) : (
                        <Globe size={18} />
                    )}
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] bg-white border border-neutral-200 rounded-lg shadow-lg py-1">
                            {I18N_CONFIG.supportedLanguages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`flex items-center gap-3 w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-colors ${language === lang ? 'bg-neutral-100 font-medium' : ''
                                        }`}
                                >
                                    <span className="text-base">{LANGUAGE_FLAGS[lang]}</span>
                                    <span>{LANGUAGE_NAMES[lang]}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                    {showFlag && <span className="text-base">{currentFlag}</span>}
                    <span className="font-medium">{language.toUpperCase()}</span>
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 z-50 min-w-[180px] bg-white border border-neutral-200 rounded-lg shadow-lg py-1">
                            {I18N_CONFIG.supportedLanguages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`flex items-center gap-3 w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-colors ${language === lang ? 'bg-neutral-100 font-medium' : ''
                                        }`}
                                >
                                    <span className="text-base">{LANGUAGE_FLAGS[lang]}</span>
                                    <span>{LANGUAGE_NAMES[lang]}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Variant 'full'
    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
            >
                {showFlag && <span className="text-lg">{currentFlag}</span>}
                <span className="font-medium">{currentName}</span>
                <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-50 min-w-[200px] bg-white border border-neutral-200 rounded-lg shadow-lg py-1">
                        {I18N_CONFIG.supportedLanguages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors ${language === lang ? 'bg-neutral-100 font-medium' : ''
                                    }`}
                            >
                                <span className="text-lg">{LANGUAGE_FLAGS[lang]}</span>
                                <div className="flex flex-col">
                                    <span className="font-medium">{LANGUAGE_NAMES[lang]}</span>
                                    <span className="text-xs text-neutral-500">{lang.toUpperCase()}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
