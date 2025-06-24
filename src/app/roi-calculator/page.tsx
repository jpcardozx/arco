/**
 * ARCO PATCH 5: ROI Calculator Page - ENTERPRISE
 * CFO-Grade Investment Justification Tool
 * Executive-ready business case automation
 */

'use client'

import React from 'react'
import ProfessionalNavigation from '../../components/layout/ProfessionalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { ROICalculator } from '../../components/roi/ROICalculator'
import type { CompanyProfile, ROICalculationResult } from '../../components/roi/ROICalculator'

export default function ROICalculatorPage() {
    const handleScheduleAssessment = (profile: CompanyProfile) => {
        // Integration with assessment booking system
        console.log('Assessment scheduling for:', profile)

        // Track conversion event
        if (typeof window !== 'undefined') {
            window.gtag?.('event', 'assessment_schedule', {
                source: 'roi_calculator',
                industry: profile.industry,
                company_size: profile.size,
                revenue: profile.revenue,
                page_location: window.location.href
            })
        }

        // Pre-fill assessment form with company profile
        const assessmentUrl = new URL('/domain-intelligence', window.location.origin)
        assessmentUrl.searchParams.set('source', 'roi_calculator')
        assessmentUrl.searchParams.set('industry', profile.industry)
        assessmentUrl.searchParams.set('size', profile.size)
        assessmentUrl.searchParams.set('revenue', profile.revenue.toString())

        window.location.href = assessmentUrl.toString()
    }

    const handleDownloadReport = (results: ROICalculationResult) => {
        // Track download for lead scoring
        console.log('ROI report download:', results)

        if (typeof window !== 'undefined') {
            window.gtag?.('event', 'roi_report_download', {
                industry: results.companyProfile.industry,
                company_size: results.companyProfile.size,
                conservative_savings: results.scenarios[0]?.costSavings.annual,
                realistic_savings: results.scenarios[1]?.costSavings.annual,
                optimistic_savings: results.scenarios[2]?.costSavings.annual,
                page_location: window.location.href
            })
        }

        // Generate PDF report (placeholder - would integrate with PDF generation service)
        // For now, trigger browser download of JSON data
        const reportData = {
            title: 'Infrastructure Optimization ROI Analysis',
            company: results.companyProfile,
            scenarios: results.scenarios,
            recommendations: results.recommendations,
            competitiveAnalysis: results.competitiveAnalysis,
            generatedAt: new Date().toISOString()
        }

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `roi-analysis-${results.companyProfile.industry.toLowerCase()}-${Date.now()}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handleRequestConsultation = (results: ROICalculationResult) => {
        // Track consultation request
        console.log('Consultation request:', results)

        if (typeof window !== 'undefined') {
            window.gtag?.('event', 'consultation_request', {
                source: 'roi_calculator',
                industry: results.companyProfile.industry,
                company_size: results.companyProfile.size,
                potential_savings: results.scenarios[1]?.costSavings.annual,
                page_location: window.location.href
            })
        }

        // Integration with CRM/Sales system
        // Pre-fill contact form with ROI context
        const contactUrl = new URL('/contact', window.location.origin)
        contactUrl.searchParams.set('source', 'roi_calculator')
        contactUrl.searchParams.set('interest', 'consultation')
        contactUrl.searchParams.set('industry', results.companyProfile.industry)
        contactUrl.searchParams.set('context', 'roi_analysis_completed')

        window.location.href = contactUrl.toString()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <ProfessionalNavigation />

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        CFO-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ROI Calculator</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Conservative financial modeling with risk-adjusted scenarios for infrastructure optimization investment decisions
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Industry Benchmarks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>Conservative Projections</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span>Risk Assessment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>Board-Ready Reports</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator Component */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <ROICalculator
                        onScheduleAssessment={handleScheduleAssessment}
                        onDownloadReport={handleDownloadReport}
                        onRequestConsultation={handleRequestConsultation}
                    />
                </div>
            </section>

            <ProfessionalFooter />
        </div>
    )
}
