'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useTranslation, type Locale } from '../../hooks/useTranslation'

const localeNames: Record<Locale, { name: string; flag: string }> = {
    en: { name: 'English', flag: '🇺🇸' },
    pt: { name: 'Português', flag: '🇧🇷' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' }
}

export function LanguageSelector() {
    const { locale, setLocale, availableLocales } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-lg hover:bg-white hover:border-slate-300 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Globe className="w-4 h-4 text-slate-600" />
                <span className="text-slate-700 font-medium">
                    {localeNames[locale].flag} {localeNames[locale].name}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-900/10 overflow-hidden z-50"
                    >
                        {availableLocales.map((localeOption) => (
                            <motion.button
                                key={localeOption}
                                onClick={() => {
                                    setLocale(localeOption)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-slate-50 transition-colors duration-150 ${locale === localeOption ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                                    }`}
                                whileHover={{ backgroundColor: locale === localeOption ? 'rgb(239 246 255)' : 'rgb(248 250 252)' }}
                            >
                                <span className="text-lg">{localeNames[localeOption].flag}</span>
                                <span className="font-medium">{localeNames[localeOption].name}</span>
                                {locale === localeOption && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}
