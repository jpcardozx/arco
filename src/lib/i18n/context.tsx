'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, I18N_CONFIG, detectBrowserLanguage, saveLanguage } from './index';
import { translations, getTranslation } from './translations';

// Interface do contexto
interface I18nContextType {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
    t: (key: string, replacements?: Record<string, string>) => any; // Changed from string to any
    isLoading: boolean;
}

// Contexto
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider
interface I18nProviderProps {
    children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
    const [language, setLanguageState] = useState<SupportedLanguage>(I18N_CONFIG.defaultLanguage);
    const [isLoading, setIsLoading] = useState(true);

    // Inicialização do idioma
    useEffect(() => {
        const detected = detectBrowserLanguage();
        setLanguageState(detected);
        setIsLoading(false);
    }, []);    // Função de tradução
    const t = (key: string, replacements?: Record<string, string>): any => { // Changed return type
        const dictionary = translations[language];
        if (!dictionary) {
            console.warn(`🔥 Dictionary not found for language: ${language}`);
            return key;
        }
        return getTranslation(dictionary, key, replacements);
    };

    // Função para mudar idioma
    const setLanguage = (lang: SupportedLanguage) => {
        if (!I18N_CONFIG.supportedLanguages.includes(lang)) {
            console.warn(`🔥 Unsupported language: ${lang}`);
            return;
        }

        setLanguageState(lang);
        saveLanguage(lang);
    };

    const value: I18nContextType = {
        language,
        setLanguage,
        t,
        isLoading
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

// Hook para usar o contexto
export function useTranslation() {
    const context = useContext(I18nContext);

    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }

    return context;
}

// Hook simplificado que retorna apenas a função t
export function useT() {
    const { t } = useTranslation();
    return t;
}
