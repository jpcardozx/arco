'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export default function DesignCompare() {
    const [mode, setMode] = useState('enhanced')

    const toggleMode = () => {
        setMode(mode === 'enhanced' ? 'original' : 'enhanced')
    }

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
            <div
                className="flex items-center space-x-2 px-5 py-3 rounded-full bg-neutral-900/90 text-white shadow-xl backdrop-blur-md border border-white/10 mb-2"
            >
                <button
                    onClick={toggleMode}
                    className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-2 ${mode === 'enhanced' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
                        }`}
                >
                    <span>Design Aprimorado</span>
                </button>

                <div className="h-6 w-px bg-white/20" />

                <button
                    onClick={toggleMode}
                    className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-2 ${mode === 'original' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
                        }`}
                >
                    <span>Design Original</span>
                </button>

                <button
                    onClick={toggleMode}
                    className="ml-2 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            </div>

            <div className="text-xs text-white/70 bg-neutral-900/80 px-3 py-1 rounded-full">
                {mode === 'enhanced' ? (
                    <Link href="/page" className="underline">Ver design original</Link>
                ) : (
                    <Link href="/page-enhanced" className="underline">Ver design aprimorado</Link>
                )}
            </div>
        </div>
    )
}
