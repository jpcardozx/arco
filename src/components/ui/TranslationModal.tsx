'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Check } from 'lucide-react'

interface TranslationModalProps {
    isVisible: boolean
    onClose: () => void
    onAccept: (language: string) => void
}

const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
]

export function TranslationModal({ isVisible, onClose, onAccept }: TranslationModalProps) {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('')
    const [detectedLanguage, setDetectedLanguage] = useState<string>('')

    useEffect(() => {
        if (isVisible) {
            // Simulate language detection based on browser language
            const browserLang = navigator.language.split('-')[0]
            const supportedLang = languages.find(lang => lang.code === browserLang)
            if (supportedLang && browserLang !== 'en') {
                setDetectedLanguage(supportedLang.code)
                setSelectedLanguage(supportedLang.code)
            }
        }
    }, [isVisible])

    const handleAccept = () => {
        if (selectedLanguage) {
            onAccept(selectedLanguage)
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                    />                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Translate this page?
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            We detected you might prefer another language
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Language Selection */}
                            <div className="space-y-3 mb-6">
                                <p className="text-sm font-medium text-gray-700">
                                    Choose your preferred language:
                                </p>
                                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => setSelectedLanguage(language.code)}
                                            className={`
                                                flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 text-left
                                                ${selectedLanguage === language.code
                                                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            <span className="text-xl">{language.flag}</span>
                                            <span className="flex-1 font-medium text-gray-900">
                                                {language.name}
                                            </span>
                                            {selectedLanguage === language.code && (
                                                <Check className="w-4 h-4 text-blue-600" />
                                            )}
                                            {detectedLanguage === language.code && selectedLanguage !== language.code && (
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                    Detected
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Keep English
                                </button>
                                <button
                                    onClick={handleAccept}
                                    disabled={!selectedLanguage}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                                >
                                    Translate
                                </button>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Translation is provided automatically and may not be perfect
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
