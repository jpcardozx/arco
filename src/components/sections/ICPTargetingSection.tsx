'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, TrendingUp, Clock, DollarSign, ArrowRight, Smartphone, Globe } from 'lucide-react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ICPTargetingSection() {
    const targetMarkets = [
        {
            industry: 'Dental Clinics',
            location: 'Canada',
            icon: '🦷',
            color: 'blue',
            painPoints: [
                'Emergency calls lost due to slow mobile sites',
                'High Google Ads cost with poor landing page speed',
                'Patients abandon booking forms on mobile',
                'Wix/Squarespace costing $200+ annually'
            ],
            specificResults: {
                avgImprovement: '2.8s → 1.1s LCP',
                businessImpact: '+40% mobile bookings',
                costSavings: '$480/year saved',
                timeline: '7-14 days delivery'
            },
            caseStudy: {
                client: 'Toronto Dental Wellness',
                problem: 'Slow Wix site losing emergency calls',
                solution: 'Mobile-first optimization + booking flow',
                result: '40% increase in after-hours bookings'
            },
            whyNow: [
                'Q1 2025: Peak season for dental procedures',
                'Insurance renewals drive higher search volume',
                'Tax deductible business expense timing'
            ]
        },
        {
            industry: 'Boutique Hotels',
            location: 'Portugal',
            icon: '🏨',
            color: 'purple',
            painPoints: [
                'Losing direct bookings to Booking.com fees',
                'High mobile abandonment on booking pages',
                'WordPress plugins slowing site to 3.5s+',
                'OTA dependency costing 15% commission'
            ],
            specificResults: {
                avgImprovement: '3.5s → 1.3s LCP',
                businessImpact: '+15% direct bookings',
                costSavings: '$600/year + commission',
                timeline: '10-14 days delivery'
            },
            caseStudy: {
                client: 'Quinta do Sol, Porto',
                problem: 'WordPress site, high OTA dependency',
                solution: 'Performance + direct booking optimization',
                result: '$3,200 annual commission savings'
            },
            whyNow: [
                'Pre-summer optimization for peak season',
                'EU Digital Services Act compliance benefits',
                'Post-pandemic recovery momentum'
            ]
        }
    ]

    const marketData = {
        dental: {
            marketSize: '11,000+ clinics in Canada',
            avgRevenue: '$800K annually',
            digitalSpend: '$15K/year on ads',
            mobileTraffic: '68%'
        },
        hotel: {
            marketSize: '2,400+ boutique hotels in PT',
            avgRevenue: '$1.2M annually',
            otaCommission: '15% on bookings',
            mobileTraffic: '75%'
        }
    }

    const getColorClasses = (color: string) => {
        const colors = {
            blue: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-900',
                accent: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700'
            },
            purple: {
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-900',
                accent: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700'
            }
        }
        return colors[color as keyof typeof colors] || colors.blue
    }

    return (
        <SectionWrapper background="gray" spacing="normal" id="target-markets">
            <SectionHeader
                eyebrow="Target Market Focus"
                title="Purpose-built for hotels & dental practices"
                description="We specialize in two high-impact industries where speed optimization delivers immediate ROI"
                align="center"
                size="md"
            />

            {/* Market Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
            >
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">🦷 Canadian Dental Market</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-blue-700">Market Size:</span>
                            <span className="font-semibold text-blue-900">{marketData.dental.marketSize}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-blue-700">Avg Revenue:</span>
                            <span className="font-semibold text-blue-900">{marketData.dental.avgRevenue}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-blue-700">Digital Spend:</span>
                            <span className="font-semibold text-blue-900">{marketData.dental.digitalSpend}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-blue-700">Mobile Traffic:</span>
                            <span className="font-semibold text-blue-900">{marketData.dental.mobileTraffic}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">🏨 Portuguese Hotel Market</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-purple-700">Market Size:</span>
                            <span className="font-semibold text-purple-900">{marketData.hotel.marketSize}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-purple-700">Avg Revenue:</span>
                            <span className="font-semibold text-purple-900">{marketData.hotel.avgRevenue}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-purple-700">OTA Commission:</span>
                            <span className="font-semibold text-purple-900">{marketData.hotel.otaCommission}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-purple-700">Mobile Traffic:</span>
                            <span className="font-semibold text-purple-900">{marketData.hotel.mobileTraffic}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Detailed Target Profiles */}
            <div className="space-y-12">
                {targetMarkets.map((market, index) => {
                    const colors = getColorClasses(market.color)

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`${colors.bg} ${colors.border} border rounded-2xl p-8`}
                        >
                            <div className="grid lg:grid-cols-2 gap-8">

                                {/* Left: Problems & Solutions */}
                                <div>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="text-3xl">{market.icon}</span>
                                        <div>
                                            <h3 className={`text-2xl font-bold ${colors.text}`}>
                                                {market.industry}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className={`w-4 h-4 ${colors.accent}`} />
                                                <span className={`text-sm ${colors.accent}`}>{market.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pain Points */}
                                    <div className="mb-6">
                                        <h4 className={`font-bold ${colors.text} mb-3`}>Common Pain Points:</h4>
                                        <ul className="space-y-2">
                                            {market.painPoints.map((pain, idx) => (
                                                <li key={idx} className="flex items-start space-x-2">
                                                    <Clock className={`w-4 h-4 ${colors.accent} mt-0.5 flex-shrink-0`} />
                                                    <span className="text-sm text-gray-700">{pain}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Why Now */}
                                    <div className="mb-6">
                                        <h4 className={`font-bold ${colors.text} mb-3`}>Why Act Now:</h4>
                                        <ul className="space-y-2">
                                            {market.whyNow.map((reason, idx) => (
                                                <li key={idx} className="flex items-start space-x-2">
                                                    <TrendingUp className={`w-4 h-4 ${colors.accent} mt-0.5 flex-shrink-0`} />
                                                    <span className="text-sm text-gray-700">{reason}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right: Results & Case Study */}
                                <div>
                                    {/* Results */}
                                    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
                                        <h4 className={`font-bold ${colors.text} mb-4`}>Typical Results:</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className={`text-xl font-bold ${colors.accent}`}>
                                                    {market.specificResults.avgImprovement.split(' → ')[1]}
                                                </div>
                                                <div className="text-xs text-gray-600">Target LCP</div>
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-xl font-bold ${colors.accent}`}>
                                                    {market.specificResults.businessImpact.split(' ')[0]}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {market.specificResults.businessImpact.split(' ').slice(1).join(' ')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-700">Annual Savings:</span>
                                                <span className={`font-bold ${colors.accent}`}>
                                                    {market.specificResults.costSavings}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-700">Delivery Time:</span>
                                                <span className={`font-bold ${colors.accent}`}>
                                                    {market.specificResults.timeline}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Case Study */}
                                    <div className="bg-white rounded-xl p-6 shadow-lg">
                                        <h4 className={`font-bold ${colors.text} mb-3`}>Recent Success:</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-sm font-semibold text-gray-900">Client: </span>
                                                <span className="text-sm text-gray-700">{market.caseStudy.client}</span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-semibold text-gray-900">Problem: </span>
                                                <span className="text-sm text-gray-700">{market.caseStudy.problem}</span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-semibold text-gray-900">Solution: </span>
                                                <span className="text-sm text-gray-700">{market.caseStudy.solution}</span>
                                            </div>
                                            <div className={`p-3 ${colors.bg} rounded-lg`}>
                                                <span className="text-sm font-semibold text-gray-900">Result: </span>
                                                <span className={`text-sm font-bold ${colors.accent}`}>
                                                    {market.caseStudy.result}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6">
                                        <Link
                                            href="#calculator"
                                            className={`w-full ${colors.button} text-white py-3 rounded-xl font-semibold text-center transition-colors flex items-center justify-center space-x-2`}
                                        >
                                            <span>Calculate Your {market.industry} ROI</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Dual Market Strategy */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Why We Focus on These Two Markets
                    </h3>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Our dual-market strategy allows us to perfect our optimization techniques across
                        different platforms, timezones, and business models while maintaining focused expertise.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <Globe className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">Global Coverage</h4>
                        <p className="text-sm text-gray-600">
                            UTC-3/UTC+1 timezone split enables 24/7 development cycle
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">Mobile-Critical</h4>
                        <p className="text-sm text-gray-600">
                            Both industries suffer heavily from mobile speed issues
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">High ROI Potential</h4>
                        <p className="text-sm text-gray-600">
                            Immediate revenue impact from conversion improvements
                        </p>
                    </div>
                </div>
            </motion.div>
        </SectionWrapper>
    )
}
