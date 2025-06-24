'use client'

/**
 * ARCO Offline Page
 * Graceful degradation for network failures
 */

import Link from 'next/link'
import { Wifi, RefreshCw, Home } from 'lucide-react'

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
            <div className="max-w-md mx-auto text-center">
                <div className="mb-8">
                    <Wifi className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <h1 className="text-2xl font-bold mb-2">You're offline</h1>
                    <p className="text-slate-400">
                        Check your internet connection and try again.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="w-full px-6 py-3 border border-slate-600 hover:bg-slate-800 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>

                <div className="mt-8 text-sm text-slate-500">
                    <p>Some features may still work offline thanks to our caching system.</p>
                </div>
            </div>
        </div>
    )
}
