/**
 * ARCO PATCH 4: Case Studies Page - ENHANCED
 * Systematic success documentation with peer validation
 */

'use client'

import React from 'react'
import PersonalNavigation from '../../components/layout/PersonalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { CaseStudyPlatform } from '../../components/case-studies/CaseStudyPlatform'

export default function CaseStudiesPage() {
    const handleRequestReference = (caseStudyId: string) => {
        // Integration with CRM/Sales system
        console.log('Reference request for:', caseStudyId)
        // Track analytics
        // Send to sales team
        // Schedule follow-up
        if (typeof window !== 'undefined') {
            // Track event for analytics
            window.gtag?.('event', 'reference_request', {
                case_study_id: caseStudyId,
                page_location: window.location.href
            })
        }
    }

    const handleDownloadReport = (caseStudyId: string) => {
        // Track download for lead scoring
        console.log('Report download for:', caseStudyId)
        // Progressive profiling opportunity
        // Email capture if anonymous
        // Analytics tracking
        if (typeof window !== 'undefined') {
            window.gtag?.('event', 'case_study_download', {
                case_study_id: caseStudyId,
                page_location: window.location.href
            })
        }
    }

    const handleScheduleAssessment = () => {
        // Direct to assessment scheduling
        console.log('Assessment scheduling from case studies')
        // Pre-fill form with case study context
        // Track conversion attribution
        // Sales handoff with context
        if (typeof window !== 'undefined') {
            window.gtag?.('event', 'assessment_schedule', {
                source: 'case_studies',
                page_location: window.location.href
            })
            // Redirect to domain intelligence with case study context
            window.location.href = '/domain-intelligence?source=case_studies'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <PersonalNavigation />

            <CaseStudyPlatform
                onRequestReference={handleRequestReference}
                onDownloadReport={handleDownloadReport}
                onScheduleAssessment={handleScheduleAssessment}
            />

            <ProfessionalFooter />
        </div>
    )
}
