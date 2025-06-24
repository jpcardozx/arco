'use client'

import { useState, useEffect } from 'react'
import {
    TrendingUp,
    Clock,
    DollarSign,
    Target,
    ArrowRight,
    Shield,
    Award,
    Globe
} from 'lucide-react'

interface StatItem {
    value: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    description: string
}

export function SimplifiedHero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const stats: StatItem[] = [
        {
            value: "300%",
            label: "Average conversion increase",
            icon: TrendingUp,
            description: "Typical improvement in 90 days"
        },
        {
            value: "47 days",
            label: "Average time to positive ROI",
            icon: Clock,
            description: "From project start to measurable returns"
        },
        {
            value: "$2.4M",
            label: "Average savings identified",
            icon: DollarSign,
            description: "In wasted digital spending"
        },
        {
            value: "94%",
            label: "Project success rate",
            icon: Target,
            description: "Exceeding projected ROI targets"
        }
    ]

    const trustIndicators = [
        { icon: Shield, text: "100% Guaranteed Results" },
        { icon: Award, text: "Fortune 500 Trusted" },
        { icon: Globe, text: "Global Expertise" }
    ]

    return (
        <section className="hero-gradient min-h-screen flex items-center">
            <div className="container mx-auto px-6 py-20">
                {/* Hero Content */}
                <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                        Stop Wasting on
                        <span className="text-primary-600"> Failed Digital Projects</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 text-balance max-w-3xl mx-auto">
                        ARCO delivers self-funding transformations with guaranteed ROI.
                        94% of projects pay for themselves within 47 days. Emergency intervention available.
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {trustIndicators.map((indicator, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 text-gray-700 transition-all duration-500 delay-${index * 100}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <indicator.icon className="w-5 h-5 text-primary-600" />
                                <span className="font-medium">{indicator.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button className="btn btn-primary flex items-center gap-2 px-8 py-4 text-lg">
                            Get Emergency Intervention
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="btn btn-secondary px-8 py-4 text-lg">
                            Calculate Your ROI
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`card text-center group hover:shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 group-hover:bg-primary-200 transition-colors">
                                <stat.icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                            <div className="font-semibold text-gray-800 mb-2">{stat.label}</div>
                            <div className="text-sm text-gray-600">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
