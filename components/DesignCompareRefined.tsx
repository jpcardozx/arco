'use client'

import { useState, useEffect } from 'react'
import { ArrowUpDown, ExternalLink, BarChart2, Eye } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '../lib/analytics'

export default function DesignCompareRefined() {
    const [mode, setMode] = useState('refined')
    const [expanded, setExpanded] = useState(false)
    const [showVersionList, setShowVersionList] = useState(false)

    // Track which design version the user is viewing
    useEffect(() => {
        trackEvent('design_version_selected', { version: mode });
    }, [mode])

    const toggleMode = (newMode: string) => {
        setMode(newMode)
        setShowVersionList(false)
    }

    const versions = [
        { id: 'refined', name: 'Design Refinado', path: '/page-refined' },
        { id: 'enhanced', name: 'Design Aprimorado', path: '/page-enhanced' },
        { id: 'revised', name: 'Design Revisado', path: '/page' },
        { id: 'original', name: 'Design Original', path: '/page?showRevised=false' }
    ]

    return (
        <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 overflow-hidden"
                    >
                        <div className="p-4 max-w-md">
                            <h3 className="text-neutral-900 font-medium mb-1">Estatísticas de página</h3>
                            <p className="text-sm text-neutral-600 mb-3">
                                Compare as métricas de performance entre as versões
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                                    <div className="text-sm text-blue-800 font-medium flex items-center">
                                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                                        Taxa de Conversão
                                    </div>
                                    <div className="mt-1.5 flex items-end">
                                        <span className="text-2xl font-bold text-blue-900">3.8%</span>
                                        <span className="text-xs text-green-600 ml-2 mb-1 flex items-center">
                                            +0.7%
                                            <svg className="h-3 w-3 ml-0.5" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 12L12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                                    <div className="text-sm text-indigo-800 font-medium flex items-center">
                                        <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
                                        Engajamento
                                    </div>
                                    <div className="mt-1.5 flex items-end">
                                        <span className="text-2xl font-bold text-indigo-900">2.4m</span>
                                        <span className="text-xs text-green-600 ml-2 mb-1 flex items-center">
                                            +1.2m
                                            <svg className="h-3 w-3 ml-0.5" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 12L12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => setExpanded(false)}
                                    className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800"
                                >
                                    <span>Fechar estatísticas</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                <AnimatePresence>
                    {showVersionList && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full mb-2 w-full bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden"
                        >
                            <div className="p-1">
                                {versions.map((version) => (
                                    <Link
                                        key={version.id}
                                        href={version.path}
                                        className={`block px-4 py-2.5 rounded text-sm ${mode === version.id
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'hover:bg-neutral-50 text-neutral-700'
                                            }`}
                                        onClick={() => toggleMode(version.id)}
                                    >
                                        {version.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white shadow-xl backdrop-blur-sm border border-neutral-200"
                >
                    <button
                        onClick={() => setShowVersionList(!showVersionList)}
                        className="px-4 py-1.5 rounded-full transition-all flex items-center space-x-2 bg-blue-600 text-white"
                    >
                        <span>Design Refinado</span>
                        <svg className={`h-4 w-4 transition-transform ${showVersionList ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="h-6 w-px bg-neutral-200" />

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                        aria-label="Toggle statistics"
                        title="Ver estatísticas"
                    >
                        <BarChart2 className="h-4 w-4 text-neutral-600" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
