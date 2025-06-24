'use client'

import { createContext, useContext, ReactNode } from 'react'

interface TranslationContextType {
    currentLanguage: string
    changeLanguage: (language: string) => void
}

const TranslationContext = createContext<TranslationContextType>({
    currentLanguage: 'en',
    changeLanguage: () => { },
})

export function useTranslation() {
    const context = useContext(TranslationContext)
    return context
}

interface TranslationProviderProps {
    children: ReactNode
}

export function SimpleTranslationProvider({ children }: TranslationProviderProps) {
    const value = {
        currentLanguage: 'en',
        changeLanguage: () => { },
    }

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    )
}
