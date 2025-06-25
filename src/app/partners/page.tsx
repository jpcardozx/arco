'use client'

import React from 'react'
import ProfessionalNavigation from '../../components/layout/ProfessionalNavigation'
import { PremiumFooter } from '../../components/layout/PremiumFooter'

const page = () => {
    return (
        <>
            <ProfessionalNavigation />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">
                        Partner Directory
                    </h1>
                    <p className="text-xl text-slate-600 mb-8">
                        Discover our network of strategic partners and efficiency catalysts.
                    </p>
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <p className="text-slate-700">
                            Partner pages are available at specific routes.
                            Visit <span className="font-mono bg-slate-100 px-2 py-1 rounded">/partners/jpcardozx</span> for an example.
                        </p>
                    </div>
                </div>
            </div>
            <PremiumFooter />
        </>
    )
}

export default page