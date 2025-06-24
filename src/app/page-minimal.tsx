'use client'

import { EnhancedHero } from "../components/sections/EnhancedHero";

export default function Home() {
    return (
        <main className="min-h-screen">
            <EnhancedHero />

            {/* Simple additional section to show the design system */}
            <section className="section bg-neutral-50">
                <div className="container-custom text-center">
                    <h2 className="heading-lg text-neutral-900 mb-8">
                        Why Choose <span className="text-gradient">ARCO</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card-feature">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Guaranteed Results</h3>
                            <p className="text-neutral-600">No results, no payment. We put our money where our mouth is.</p>
                        </div>

                        <div className="card-feature">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Rapid Implementation</h3>
                            <p className="text-neutral-600">See results in 47 days or less. No lengthy enterprise delays.</p>
                        </div>

                        <div className="card-feature">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Self-Funding Projects</h3>
                            <p className="text-neutral-600">Every project pays for itself through identified savings and improvements.</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="btn btn-primary btn-lg">
                            Schedule Emergency Consultation
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
