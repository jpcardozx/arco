'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TranslationModal } from '../ui/TranslationModal'

interface TranslationContextType {
    currentLanguage: string
    isModalVisible: boolean
    showTranslationModal: () => void
    hideTranslationModal: () => void
    changeLanguage: (language: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function useTranslation() {
    const context = useContext(TranslationContext)
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider')
    }
    return context
}

interface TranslationProviderProps {
    children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
    const [currentLanguage, setCurrentLanguage] = useState<string>('en')
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [hasSeenModal, setHasSeenModal] = useState<boolean>(false)

    useEffect(() => {
        // Check if user has already seen the modal
        const hasSeenTranslationModal = localStorage.getItem('hasSeenTranslationModal')
        const savedLanguage = localStorage.getItem('preferredLanguage')

        if (savedLanguage) {
            setCurrentLanguage(savedLanguage)
        }

        if (!hasSeenTranslationModal && !savedLanguage) {
            // Detect if user's browser language is not English
            const browserLang = navigator.language.split('-')[0]
            if (browserLang !== 'en') {
                // Show modal after a short delay for better UX
                setTimeout(() => {
                    setIsModalVisible(true)
                }, 1000) // Reduced delay for demo
            } else {
                // For demo purposes, show modal even for English users after longer delay
                setTimeout(() => {
                    setIsModalVisible(true)
                }, 3000)
            }
        }

        setHasSeenModal(!!hasSeenTranslationModal)
    }, [])

    const showTranslationModal = () => {
        setIsModalVisible(true)
    }

    const hideTranslationModal = () => {
        setIsModalVisible(false)
        if (!hasSeenModal) {
            localStorage.setItem('hasSeenTranslationModal', 'true')
            setHasSeenModal(true)
        }
    }

    const changeLanguage = (language: string) => {
        setCurrentLanguage(language)
        localStorage.setItem('preferredLanguage', language)
        localStorage.setItem('hasSeenTranslationModal', 'true')

        // Here you would integrate with your translation service
        // For now, we'll just simulate translation by adding a class to body
        document.body.setAttribute('data-language', language)

        console.log(`Language changed to: ${language}`)
        // In a real implementation, you would:
        // 1. Load translation files
        // 2. Update all text content
        // 3. Possibly redirect to a localized version
    }

    return (
        <TranslationContext.Provider
            value={{
                currentLanguage,
                isModalVisible,
                showTranslationModal,
                hideTranslationModal,
                changeLanguage
            }}
        >
            {children}
            <TranslationModal
                isVisible={isModalVisible}
                onClose={hideTranslationModal}
                onAccept={changeLanguage}
            />
        </TranslationContext.Provider>
    )
}
