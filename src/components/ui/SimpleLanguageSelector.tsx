'use client'

import { Globe } from 'lucide-react'
import { useState } from 'react'

export function SimpleLanguageSelector() {
    const [currentLang, setCurrentLang] = useState('EN')
    const [isOpen, setIsOpen] = useState(false)

    const languages = [
        { code: 'EN', label: 'English' },
        { code: 'PT', label: 'Português' },
        { code: 'ES', label: 'Español' }
    ]

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
                <Globe className="w-4 h-4" />
                {currentLang}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setCurrentLang(lang.code)
                                setIsOpen(false)
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
