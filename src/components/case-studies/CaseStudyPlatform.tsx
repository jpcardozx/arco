/**
 * ARCO PATCH 4: Case Study Platform - ENTERPRISE
 * Peer Validation System & Industry-Specific Credibility
 * Social proof architecture for executive decision-making
 */

'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp,
    DollarSign,
    Users,
    Clock,
    ArrowUpRight,
    Award,
    Shield,
    Zap,
    Target,
    ChevronRight,
    Play,
    Download,
    ExternalLink,
    Star,
    Quote,
    Building,
    MapPin,
    Calendar,
    BarChart3,
    AlertTriangle,
    CheckCircle
} from 'lucide-react'
import {
    ExecutiveButton,
    ExecutiveCard,
    ExecutiveMetric,
    designTokens
} from '../ui/design-system'

// Case Study Data Interfaces
interface CaseStudyResult {
    id: string
    title: string
    industry: 'SaaS' | 'Manufacturing' | 'Financial' | 'Healthcare' | 'E-commerce'
    companySize: 'Series A/B' | 'Growth' | 'Enterprise'
    location: string

    // Challenge & Context
    challenge: {
        description: string
        painPoints: string[]
        businessImpact: string
        urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
    }

    // ARCO Methodology Applied
    methodology: {
        assessmentDuration: number // days
        stakeholdersEngaged: string[]
        technicalScope: string[]
        deliverables: string[]
    }

    // Quantified Results
    results: {
        performanceImprovements: {
            lighthouseScore: { before: number; after: number }
            coreWebVitals: {
                lcp: { before: number; after: number }
                fid: { before: number; after: number }
                cls: { before: number; after: number }
            }
            pageLoadTime: { before: number; after: number }
        }
        businessOutcomes: {
            costSavings: {
                monthly: number
                annual: number
                projectedThreeYear: number
            }
            revenueImpact: {
                conversionImprovement: number // %
                trafficGrowth: number // %
                estimatedRevenueIncrease: number
            }
            operationalEfficiency: {
                teamProductivityGain: number // %
                incidentReduction: number // %
                deploymentFrequencyImprovement: number // %
            }
        }
        competitiveAdvantage: {
            marketPositionImprovement: string
            customerSatisfactionIncrease: number // %
            brandPerceptionEnhancement: string
        }
    }

    // Implementation Details
    implementation: {
        timelineWeeks: number
        investmentAmount: number
        roiAchievedMonths: number
        paybackPeriod: number

        phases: Array<{
            name: string
            duration: number
            keyActivities: string[]
            deliverables: string[]
        }>
    }

    // Testimonials & Validation
    testimonials: Array<{
        executive: {
            name: string
            title: string
            avatar?: string
        }
        quote: string
        context: string
        metrics: string[]
    }>

    // Media & Assets
    assets: {
        videoTestimonial?: string
        beforeAfterScreenshots: string[]
        performanceCharts: string[]
        downloadableReport?: string
        referenceContactAvailable: boolean
    }

    // Meta Information
    meta: {
        featured: boolean
        publishedDate: string
        lastUpdated: string
        tags: string[]
        relatedCaseStudies: string[]
    }
}

interface CaseStudyPlatformProps {
    onRequestReference?: (caseStudyId: string) => void
    onDownloadReport?: (caseStudyId: string) => void
    onScheduleAssessment?: () => void
}

// Mock Data for Development
const mockCaseStudies: CaseStudyResult[] = [
    {
        id: 'saas-scaling-success',
        title: 'SaaS Platform Optimization: 67% Cost Reduction at Scale',
        industry: 'SaaS',
        companySize: 'Growth',
        location: 'Austin, TX',

        challenge: {
            description: 'High-growth SaaS platform experiencing infrastructure costs growing faster than revenue, with performance degradation affecting customer satisfaction.',
            painPoints: [
                'Infrastructure costs at 22% of revenue (industry benchmark: 12-15%)',
                'Page load times averaging 4.2 seconds (target: <2s)',
                'Customer churn increasing due to performance issues',
                'Engineering team spending 60% time on maintenance vs features'
            ],
            businessImpact: 'Monthly infrastructure spend of $180K with declining performance metrics threatening customer retention and growth trajectory.',
            urgencyLevel: 'critical'
        },

        methodology: {
            assessmentDuration: 10,
            stakeholdersEngaged: ['CTO', 'VP Engineering', 'CFO', 'Head of DevOps'],
            technicalScope: [
                'Infrastructure architecture analysis',
                'Database performance optimization',
                'CDN and caching strategy',
                'Application performance profiling'
            ],
            deliverables: [
                'Comprehensive technical audit',
                'Cost optimization roadmap',
                'Performance improvement plan',
                'Implementation timeline'
            ]
        },

        results: {
            performanceImprovements: {
                lighthouseScore: { before: 67, after: 94 },
                coreWebVitals: {
                    lcp: { before: 4200, after: 1400 },
                    fid: { before: 180, after: 45 },
                    cls: { before: 0.18, after: 0.03 }
                },
                pageLoadTime: { before: 4200, after: 1400 }
            },
            businessOutcomes: {
                costSavings: {
                    monthly: 120000,
                    annual: 1440000,
                    projectedThreeYear: 4680000
                },
                revenueImpact: {
                    conversionImprovement: 28,
                    trafficGrowth: 45,
                    estimatedRevenueIncrease: 2400000
                },
                operationalEfficiency: {
                    teamProductivityGain: 75,
                    incidentReduction: 85,
                    deploymentFrequencyImprovement: 300
                }
            },
            competitiveAdvantage: {
                marketPositionImprovement: 'Moved from performance laggard to industry leader',
                customerSatisfactionIncrease: 42,
                brandPerceptionEnhancement: 'Technical excellence now key differentiator'
            }
        },

        implementation: {
            timelineWeeks: 12,
            investmentAmount: 150000,
            roiAchievedMonths: 3,
            paybackPeriod: 1.2,

            phases: [
                {
                    name: 'Infrastructure Audit & Planning',
                    duration: 2,
                    keyActivities: ['Performance analysis', 'Cost modeling', 'Architecture review'],
                    deliverables: ['Technical assessment', 'Optimization roadmap']
                },
                {
                    name: 'Core Optimization Implementation',
                    duration: 6,
                    keyActivities: ['Database optimization', 'CDN implementation', 'Caching strategy'],
                    deliverables: ['Performance improvements', 'Cost reductions']
                },
                {
                    name: 'Advanced Optimization & Monitoring',
                    duration: 4,
                    keyActivities: ['Advanced caching', 'Real-time monitoring', 'Team training'],
                    deliverables: ['Sustained performance', 'Team capability']
                }
            ]
        },

        testimonials: [
            {
                executive: {
                    name: 'Sarah Chen',
                    title: 'CTO & Co-founder'
                },
                quote: 'ARCO transformed our infrastructure from a cost center into a competitive advantage. The systematic approach and conservative projections built immediate trust.',
                context: 'Lead technical decision maker',
                metrics: ['67% cost reduction', '94 Lighthouse score', '3-month ROI']
            },
            {
                executive: {
                    name: 'Marcus Rodriguez',
                    title: 'CFO'
                },
                quote: 'The ROI exceeded conservative projections by 40%. Infrastructure costs dropped from 22% to 8% of revenue while performance dramatically improved.',
                context: 'Financial oversight and budget approval',
                metrics: ['$120K monthly savings', '1.2 month payback', '40% ROI uplift']
            }
        ],

        assets: {
            beforeAfterScreenshots: ['/case-studies/saas/before-performance.png', '/case-studies/saas/after-performance.png'],
            performanceCharts: ['/case-studies/saas/lighthouse-improvement.png', '/case-studies/saas/cost-reduction.png'],
            downloadableReport: '/case-studies/saas/full-case-study.pdf',
            referenceContactAvailable: true
        },

        meta: {
            featured: true,
            publishedDate: '2024-12-15',
            lastUpdated: '2025-01-15',
            tags: ['SaaS', 'Cost Optimization', 'Performance', 'Scale'],
            relatedCaseStudies: ['manufacturing-efficiency', 'ecommerce-conversion']
        }
    }
    // Additional case studies would be added here
]

export function CaseStudyPlatform({
    onRequestReference,
    onDownloadReport,
    onScheduleAssessment
}: CaseStudyPlatformProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<string>('All')
    const [selectedSize, setSelectedSize] = useState<string>('All')
    const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyResult | null>(null)
    const [activeTab, setActiveTab] = useState<'overview' | 'methodology' | 'results' | 'implementation'>('overview')

    // Filtered case studies based on selection
    const filteredCaseStudies = useMemo(() => {
        return mockCaseStudies.filter(caseStudy => {
            const industryMatch = selectedIndustry === 'All' || caseStudy.industry === selectedIndustry
            const sizeMatch = selectedSize === 'All' || caseStudy.companySize === selectedSize
            return industryMatch && sizeMatch
        })
    }, [selectedIndustry, selectedSize])

    // Industry and size options
    const industries = ['All', 'SaaS', 'Manufacturing', 'Financial', 'Healthcare', 'E-commerce']
    const companySizes = ['All', 'Series A/B', 'Growth', 'Enterprise']

    const handleCaseStudySelect = useCallback((caseStudy: CaseStudyResult) => {
        setSelectedCaseStudy(caseStudy)
        setActiveTab('overview')
    }, [])

    const formatCurrency = useCallback((amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount)
    }, [])

    const formatPercent = useCallback((value: number) => {
        return `${value > 0 ? '+' : ''}${value}%`
    }, [])

    if (selectedCaseStudy) {
        return (
            <CaseStudyDetailView
                caseStudy={selectedCaseStudy}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onBack={() => setSelectedCaseStudy(null)}
                onRequestReference={onRequestReference}
                onDownloadReport={onDownloadReport}
                onScheduleAssessment={onScheduleAssessment}
                formatCurrency={formatCurrency}
                formatPercent={formatPercent}
            />
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">
                    Proven Infrastructure Optimization Results
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                    Real outcomes from systematic infrastructure optimization across industries.
                    Conservative projections, measurable results, peer validation.
                </p>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ExecutiveMetric
                    label="Average Cost Reduction"
                    value="67%"
                    trend="up"
                    change={67}
                    icon={<DollarSign className="w-6 h-6" />}
                    color="success"
                    size="lg"
                    animated
                    aria-label="Average cost reduction across all case studies is 67%"
                />

                <ExecutiveMetric
                    label="Typical Payback Period"
                    value="1.8 months"
                    trend="up"
                    icon={<Clock className="w-6 h-6" />}
                    color="primary"
                    size="lg"
                    animated
                    aria-label="Typical payback period is 1.8 months"
                />

                <ExecutiveMetric
                    label="Performance Improvement"
                    value="+340%"
                    trend="up"
                    change={340}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="success"
                    size="lg"
                    animated
                    aria-label="Average performance improvement is 340%"
                />

                <ExecutiveMetric
                    label="Client Satisfaction"
                    value="96%"
                    trend="up"
                    icon={<Award className="w-6 h-6" />}
                    color="primary"
                    size="lg"
                    animated
                    aria-label="Client satisfaction rate is 96%"
                />
            </div>

            {/* Filters */}
            <ExecutiveCard variant="dark" padding="lg">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Filter Case Studies</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                            <div className="flex flex-wrap gap-2">
                                {industries.map(industry => (
                                    <ExecutiveButton
                                        key={industry}
                                        onClick={() => setSelectedIndustry(industry)}
                                        variant={selectedIndustry === industry ? 'primary' : 'ghost'}
                                        size="sm"
                                        aria-pressed={selectedIndustry === industry}
                                    >
                                        {industry}
                                    </ExecutiveButton>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Size</label>
                            <div className="flex flex-wrap gap-2">
                                {companySizes.map(size => (
                                    <ExecutiveButton
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        variant={selectedSize === size ? 'primary' : 'ghost'}
                                        size="sm"
                                        aria-pressed={selectedSize === size}
                                    >
                                        {size}
                                    </ExecutiveButton>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ExecutiveCard>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCaseStudies.map((caseStudy) => (
                    <CaseStudyCard
                        key={caseStudy.id}
                        caseStudy={caseStudy}
                        onSelect={handleCaseStudySelect}
                        formatCurrency={formatCurrency}
                        formatPercent={formatPercent}
                    />
                ))}
            </div>

            {/* Call to Action */}
            <ExecutiveCard variant="executive" padding="xl">
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold text-white">
                        Ready to Achieve Similar Results?
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Start with a systematic 10-day infrastructure assessment.
                        Conservative projections, measurable outcomes, risk-free guarantee.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <ExecutiveButton
                            onClick={onScheduleAssessment}
                            variant="primary"
                            size="lg"
                            gradient
                            icon={<Calendar className="w-5 h-5" />}
                        >
                            Schedule Assessment
                        </ExecutiveButton>
                        <ExecutiveButton
                            variant="ghost"
                            size="lg"
                            icon={<Download className="w-5 h-5" />}
                        >
                            Download Case Study Report
                        </ExecutiveButton>
                    </div>
                </div>
            </ExecutiveCard>
        </div>
    )
}

// Case Study Card Component
interface CaseStudyCardProps {
    caseStudy: CaseStudyResult
    onSelect: (caseStudy: CaseStudyResult) => void
    formatCurrency: (amount: number) => string
    formatPercent: (value: number) => string
}

function CaseStudyCard({ caseStudy, onSelect, formatCurrency, formatPercent }: CaseStudyCardProps) {
    const { results, meta, industry, companySize, location } = caseStudy

    return (
        <ExecutiveCard
            variant="executive"
            padding="lg"
            hover="executive"
            interactive
            onClick={() => onSelect(caseStudy)}
            className="cursor-pointer group"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-400" />
                            <span className="text-sm text-slate-400">{industry} • {companySize}</span>
                            {meta.featured && (
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {caseStudy.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {location}
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <div className="text-sm text-slate-400">Cost Savings</div>
                        <div className="text-lg font-bold text-green-400">
                            {formatCurrency(results.businessOutcomes.costSavings.monthly)}/mo
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-slate-400">ROI Period</div>
                        <div className="text-lg font-bold text-blue-400">
                            {caseStudy.implementation.paybackPeriod} months
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-slate-400">Performance</div>
                        <div className="text-lg font-bold text-purple-400">
                            {results.performanceImprovements.lighthouseScore.after} Lighthouse
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-slate-400">Conversion</div>
                        <div className="text-lg font-bold text-green-400">
                            {formatPercent(results.businessOutcomes.revenueImpact.conversionImprovement)}
                        </div>
                    </div>
                </div>

                {/* Challenge Preview */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300">Challenge:</div>
                    <p className="text-sm text-slate-400 line-clamp-2">
                        {caseStudy.challenge.description}
                    </p>
                </div>

                {/* Assets */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                        {caseStudy.assets.videoTestimonial && (
                            <div className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                Video
                            </div>
                        )}
                        {caseStudy.assets.referenceContactAvailable && (
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                Reference
                            </div>
                        )}
                        {caseStudy.assets.downloadableReport && (
                            <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                PDF
                            </div>
                        )}
                    </div>
                    <div className="text-xs text-slate-500">
                        Updated {new Date(meta.lastUpdated).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </ExecutiveCard>
    )
}

// Case Study Detail View Component
interface CaseStudyDetailViewProps {
    caseStudy: CaseStudyResult
    activeTab: 'overview' | 'methodology' | 'results' | 'implementation'
    onTabChange: (tab: 'overview' | 'methodology' | 'results' | 'implementation') => void
    onBack: () => void
    onRequestReference?: (caseStudyId: string) => void
    onDownloadReport?: (caseStudyId: string) => void
    onScheduleAssessment?: () => void
    formatCurrency: (amount: number) => string
    formatPercent: (value: number) => string
}

function CaseStudyDetailView({
    caseStudy,
    activeTab,
    onTabChange,
    onBack,
    onRequestReference,
    onDownloadReport,
    onScheduleAssessment,
    formatCurrency,
    formatPercent
}: CaseStudyDetailViewProps) {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'methodology', label: 'Methodology', icon: Target },
        { id: 'results', label: 'Results', icon: TrendingUp },
        { id: 'implementation', label: 'Implementation', icon: Zap }
    ]

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="space-y-6">
                <ExecutiveButton
                    onClick={onBack}
                    variant="ghost"
                    size="sm"
                    icon={<ChevronRight className="w-4 h-4 rotate-180" />}
                >
                    Back to Case Studies
                </ExecutiveButton>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Building className="w-6 h-6 text-blue-400" />
                        <span className="text-slate-400">{caseStudy.industry} • {caseStudy.companySize}</span>
                        {caseStudy.meta.featured && (
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        {caseStudy.title}
                    </h1>

                    <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {caseStudy.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(caseStudy.meta.lastUpdated).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    {caseStudy.assets.downloadableReport && (
                        <ExecutiveButton
                            onClick={() => onDownloadReport?.(caseStudy.id)}
                            variant="primary"
                            size="md"
                            icon={<Download className="w-4 h-4" />}
                        >
                            Download Full Report
                        </ExecutiveButton>
                    )}

                    {caseStudy.assets.referenceContactAvailable && (
                        <ExecutiveButton
                            onClick={() => onRequestReference?.(caseStudy.id)}
                            variant="secondary"
                            size="md"
                            icon={<Users className="w-4 h-4" />}
                        >
                            Connect with Reference
                        </ExecutiveButton>
                    )}

                    <ExecutiveButton
                        onClick={onScheduleAssessment}
                        variant="success"
                        size="md"
                        icon={<Calendar className="w-4 h-4" />}
                    >
                        Schedule Similar Assessment
                    </ExecutiveButton>
                </div>
            </div>

            {/* Navigation Tabs */}
            <ExecutiveCard variant="dark" padding="sm">
                <div className="flex space-x-1" role="tablist" aria-label="Case study sections">
                    {tabs.map((tab) => (
                        <ExecutiveButton
                            key={tab.id}
                            onClick={() => onTabChange(tab.id as any)}
                            variant={activeTab === tab.id ? 'primary' : 'ghost'}
                            size="md"
                            icon={<tab.icon className="w-4 h-4" />}
                            className="flex-1"
                            ariaLabel={`Switch to ${tab.label} section`}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                        >
                            {tab.label}
                        </ExecutiveButton>
                    ))}
                </div>
            </ExecutiveCard>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <OverviewTab caseStudy={caseStudy} formatCurrency={formatCurrency} formatPercent={formatPercent} />
                )}
                {activeTab === 'methodology' && (
                    <MethodologyTab caseStudy={caseStudy} />
                )}
                {activeTab === 'results' && (
                    <ResultsTab caseStudy={caseStudy} formatCurrency={formatCurrency} formatPercent={formatPercent} />
                )}
                {activeTab === 'implementation' && (
                    <ImplementationTab caseStudy={caseStudy} formatCurrency={formatCurrency} />
                )}
            </AnimatePresence>
        </div>
    )
}

// Tab Components
function OverviewTab({ caseStudy, formatCurrency, formatPercent }: {
    caseStudy: CaseStudyResult
    formatCurrency: (amount: number) => string
    formatPercent: (value: number) => string
}) {
    return (
        <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Challenge */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        The Challenge
                    </h3>
                    <p className="text-slate-300 text-lg">{caseStudy.challenge.description}</p>

                    <div className="space-y-3">
                        <h4 className="font-medium text-white">Key Pain Points:</h4>
                        <ul className="space-y-2">
                            {caseStudy.challenge.painPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-2 text-slate-300">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-sm font-medium text-red-400 mb-1">Business Impact</div>
                        <div className="text-slate-300">{caseStudy.challenge.businessImpact}</div>
                    </div>
                </div>
            </ExecutiveCard>

            {/* Quick Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-3">
                        <DollarSign className="w-8 h-8 text-green-400 mx-auto" />
                        <div className="text-2xl font-bold text-green-400">
                            {formatCurrency(caseStudy.results.businessOutcomes.costSavings.monthly)}
                        </div>
                        <div className="text-sm text-slate-400">Monthly Savings</div>
                    </div>
                </ExecutiveCard>

                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-3">
                        <Clock className="w-8 h-8 text-blue-400 mx-auto" />
                        <div className="text-2xl font-bold text-blue-400">
                            {caseStudy.implementation.paybackPeriod} months
                        </div>
                        <div className="text-sm text-slate-400">Payback Period</div>
                    </div>
                </ExecutiveCard>

                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-3">
                        <TrendingUp className="w-8 h-8 text-purple-400 mx-auto" />
                        <div className="text-2xl font-bold text-purple-400">
                            {formatPercent(caseStudy.results.businessOutcomes.revenueImpact.conversionImprovement)}
                        </div>
                        <div className="text-sm text-slate-400">Conversion Improvement</div>
                    </div>
                </ExecutiveCard>
            </div>

            {/* Testimonials */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Quote className="w-5 h-5 text-blue-400" />
                        Executive Testimonials
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {caseStudy.testimonials.map((testimonial, index) => (
                            <div key={index} className="space-y-4">
                                <blockquote className="text-slate-300 italic">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium text-white">{testimonial.executive.name}</div>
                                        <div className="text-sm text-slate-400">{testimonial.executive.title}</div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {testimonial.metrics.map((metric, metricIndex) => (
                                            <span
                                                key={metricIndex}
                                                className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded"
                                            >
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ExecutiveCard>
        </motion.div>
    )
}

function MethodologyTab({ caseStudy }: { caseStudy: CaseStudyResult }) {
    return (
        <motion.div
            key="methodology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Assessment Overview */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">ARCO Systematic Assessment</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-slate-400">Duration</div>
                                <div className="text-lg text-white">{caseStudy.methodology.assessmentDuration} days</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-slate-400">Stakeholders Engaged</div>
                                <div className="space-y-1">
                                    {caseStudy.methodology.stakeholdersEngaged.map((stakeholder, index) => (
                                        <div key={index} className="text-white">{stakeholder}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-slate-400">Technical Scope</div>
                                <div className="space-y-1">
                                    {caseStudy.methodology.technicalScope.map((scope, index) => (
                                        <div key={index} className="text-white">{scope}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ExecutiveCard>

            {/* Deliverables */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Assessment Deliverables</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {caseStudy.methodology.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="text-white">{deliverable}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ExecutiveCard>
        </motion.div>
    )
}

function ResultsTab({ caseStudy, formatCurrency, formatPercent }: {
    caseStudy: CaseStudyResult
    formatCurrency: (amount: number) => string
    formatPercent: (value: number) => string
}) {
    return (
        <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Performance Improvements */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Performance Improvements</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-medium text-white">Lighthouse Score</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Before</span>
                                    <span className="text-red-400">{caseStudy.results.performanceImprovements.lighthouseScore.before}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">After</span>
                                    <span className="text-green-400">{caseStudy.results.performanceImprovements.lighthouseScore.after}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <span className="text-white">Improvement</span>
                                    <span className="text-blue-400">
                                        +{caseStudy.results.performanceImprovements.lighthouseScore.after - caseStudy.results.performanceImprovements.lighthouseScore.before}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium text-white">Core Web Vitals</h4>
                            <div className="space-y-3">
                                {Object.entries(caseStudy.results.performanceImprovements.coreWebVitals).map(([metric, values]) => (
                                    <div key={metric} className="space-y-1">
                                        <div className="text-sm text-slate-400 uppercase">{metric}</div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-red-400">{values.before}ms</span>
                                            <span className="text-green-400">{values.after}ms</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ExecutiveCard>

            {/* Business Outcomes */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Business Outcomes</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-medium text-white text-center">Cost Savings</h4>
                            <div className="space-y-2 text-center">
                                <div className="text-2xl font-bold text-green-400">
                                    {formatCurrency(caseStudy.results.businessOutcomes.costSavings.monthly)}
                                </div>
                                <div className="text-sm text-slate-400">Monthly</div>

                                <div className="text-lg text-green-300">
                                    {formatCurrency(caseStudy.results.businessOutcomes.costSavings.annual)}
                                </div>
                                <div className="text-sm text-slate-400">Annual</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium text-white text-center">Revenue Impact</h4>
                            <div className="space-y-2 text-center">
                                <div className="text-2xl font-bold text-blue-400">
                                    {formatPercent(caseStudy.results.businessOutcomes.revenueImpact.conversionImprovement)}
                                </div>
                                <div className="text-sm text-slate-400">Conversion</div>

                                <div className="text-lg text-blue-300">
                                    {formatPercent(caseStudy.results.businessOutcomes.revenueImpact.trafficGrowth)}
                                </div>
                                <div className="text-sm text-slate-400">Traffic Growth</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium text-white text-center">Operational Efficiency</h4>
                            <div className="space-y-2 text-center">
                                <div className="text-2xl font-bold text-purple-400">
                                    {formatPercent(caseStudy.results.businessOutcomes.operationalEfficiency.teamProductivityGain)}
                                </div>
                                <div className="text-sm text-slate-400">Productivity</div>

                                <div className="text-lg text-purple-300">
                                    {formatPercent(caseStudy.results.businessOutcomes.operationalEfficiency.incidentReduction)}
                                </div>
                                <div className="text-sm text-slate-400">Incidents Reduced</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ExecutiveCard>
        </motion.div>
    )
}

function ImplementationTab({ caseStudy, formatCurrency }: {
    caseStudy: CaseStudyResult
    formatCurrency: (amount: number) => string
}) {
    return (
        <motion.div
            key="implementation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Implementation Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-2">
                        <Clock className="w-6 h-6 text-blue-400 mx-auto" />
                        <div className="text-lg font-bold text-white">{caseStudy.implementation.timelineWeeks} weeks</div>
                        <div className="text-sm text-slate-400">Timeline</div>
                    </div>
                </ExecutiveCard>

                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-2">
                        <DollarSign className="w-6 h-6 text-green-400 mx-auto" />
                        <div className="text-lg font-bold text-white">{formatCurrency(caseStudy.implementation.investmentAmount)}</div>
                        <div className="text-sm text-slate-400">Investment</div>
                    </div>
                </ExecutiveCard>

                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-2">
                        <TrendingUp className="w-6 h-6 text-purple-400 mx-auto" />
                        <div className="text-lg font-bold text-white">{caseStudy.implementation.roiAchievedMonths} months</div>
                        <div className="text-sm text-slate-400">ROI Achieved</div>
                    </div>
                </ExecutiveCard>

                <ExecutiveCard variant="executive" padding="lg">
                    <div className="text-center space-y-2">
                        <Target className="w-6 h-6 text-orange-400 mx-auto" />
                        <div className="text-lg font-bold text-white">{caseStudy.implementation.paybackPeriod}x</div>
                        <div className="text-sm text-slate-400">ROI Multiple</div>
                    </div>
                </ExecutiveCard>
            </div>

            {/* Implementation Phases */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Implementation Phases</h3>

                    <div className="space-y-6">
                        {caseStudy.implementation.phases.map((phase, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{phase.name}</h4>
                                        <div className="text-sm text-slate-400">{phase.duration} weeks</div>
                                    </div>
                                </div>

                                <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-sm font-medium text-slate-400 mb-2">Key Activities</div>
                                        <ul className="space-y-1">
                                            {phase.keyActivities.map((activity, activityIndex) => (
                                                <li key={activityIndex} className="text-sm text-slate-300 flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-slate-400 mb-2">Deliverables</div>
                                        <ul className="space-y-1">
                                            {phase.deliverables.map((deliverable, deliverableIndex) => (
                                                <li key={deliverableIndex} className="text-sm text-slate-300 flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                    {deliverable}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ExecutiveCard>
        </motion.div>
    )
}
