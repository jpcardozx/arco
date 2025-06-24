/**
 * ARCO PATCH 5: ROI Calculation Engine - ENTERPRISE
 * CFO-Grade Financial Modeling & Investment Justification
 * Conservative projections with risk-adjusted scenarios
 */

'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calculator,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Target,
    Shield,
    Calendar,
    FileText,
    Download,
    AlertTriangle,
    CheckCircle,
    PieChart,
    BarChart3,
    Zap,
    Clock,
    Users,
    Building,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    Star
} from 'lucide-react'
import {
    ExecutiveButton,
    ExecutiveCard,
    ExecutiveInput,
    ExecutiveMetric,
    designTokens
} from '../ui/design-system'

// ROI Calculation Interfaces
export interface CompanyProfile {
    industry: 'SaaS' | 'Manufacturing' | 'Financial' | 'Healthcare' | 'E-commerce' | 'Other'
    size: 'Series A/B' | 'Growth' | 'Enterprise'
    revenue: number // Annual revenue
    employees: number
    infrastructureMaturity: 'Legacy' | 'Hybrid' | 'Modern' | 'Optimized'
    currentITSpend: number // Monthly
    painPoints: string[]
}

interface InfrastructureAssessment {
    performanceIssues: {
        lighthouseScore: number
        averageLoadTime: number
        mobileFriendly: boolean
        uptimePercentage: number
    }
    costFactors: {
        cloudSpend: number
        maintenanceHours: number
        incidentResponse: number
        opportunityCost: number
    }
    riskFactors: {
        securityVulnerabilities: number
        complianceGaps: number
        scalabilityIssues: number
        technicalDebt: number
    }
}

interface ROIScenario {
    name: 'Conservative' | 'Realistic' | 'Optimistic'
    probability: number
    timeline: number // months
    costSavings: {
        monthly: number
        annual: number
        threeYear: number
    }
    revenueImpact: {
        conversionImprovement: number // %
        efficiencyGains: number // %
        competitiveAdvantage: number // %
    }
    implementation: {
        assessmentCost: number
        implementationCost: number
        timeline: number // weeks
        resourceRequirement: number // hours
    }
    paybackPeriod: number // months
    roi: number // %
    netPresentValue: number
}

export interface ROICalculationResult {
    companyProfile: CompanyProfile
    scenarios: ROIScenario[]
    riskAssessment: {
        implementationRisk: 'Low' | 'Medium' | 'High'
        businessRisk: 'Low' | 'Medium' | 'High'
        technicalRisk: 'Low' | 'Medium' | 'High'
        overallRisk: 'Low' | 'Medium' | 'High'
    }
    recommendations: {
        priority: 'High' | 'Medium' | 'Low'
        urgency: 'Immediate' | 'Within 3 months' | 'Within 6 months' | 'Within 12 months'
        nextSteps: string[]
        successFactors: string[]
    }
    competitiveAnalysis: {
        industryBenchmark: number
        peerComparison: string
        marketPosition: string
        differentiationOpportunity: string
    }
}

interface ROICalculatorProps {
    onScheduleAssessment?: (profile: CompanyProfile) => void
    onDownloadReport?: (results: ROICalculationResult) => void
    onRequestConsultation?: (results: ROICalculationResult) => void
}

// Industry benchmarks and formulas
const industryBenchmarks: Record<CompanyProfile['industry'], {
    itSpendPercentage: { min: number; max: number; optimal: number }
    performanceImpact: { revenue: number; conversion: number; efficiency: number }
    riskFactors: { security: number; compliance: number; scalability: number }
}> = {
    'SaaS': {
        itSpendPercentage: { min: 12, max: 18, optimal: 15 },
        performanceImpact: { revenue: 0.15, conversion: 0.25, efficiency: 0.35 },
        riskFactors: { security: 0.8, compliance: 0.9, scalability: 0.7 }
    },
    'Manufacturing': {
        itSpendPercentage: { min: 6, max: 10, optimal: 8 },
        performanceImpact: { revenue: 0.08, conversion: 0.12, efficiency: 0.45 },
        riskFactors: { security: 0.6, compliance: 0.7, scalability: 0.5 }
    },
    'Financial': {
        itSpendPercentage: { min: 15, max: 25, optimal: 20 },
        performanceImpact: { revenue: 0.12, conversion: 0.20, efficiency: 0.30 },
        riskFactors: { security: 0.9, compliance: 0.95, scalability: 0.6 }
    },
    'Healthcare': {
        itSpendPercentage: { min: 10, max: 16, optimal: 13 },
        performanceImpact: { revenue: 0.10, conversion: 0.15, efficiency: 0.40 },
        riskFactors: { security: 0.85, compliance: 0.90, scalability: 0.6 }
    },
    'E-commerce': {
        itSpendPercentage: { min: 8, max: 14, optimal: 11 },
        performanceImpact: { revenue: 0.20, conversion: 0.35, efficiency: 0.25 },
        riskFactors: { security: 0.7, compliance: 0.6, scalability: 0.8 }
    },
    'Other': {
        itSpendPercentage: { min: 8, max: 15, optimal: 12 },
        performanceImpact: { revenue: 0.12, conversion: 0.18, efficiency: 0.30 },
        riskFactors: { security: 0.7, compliance: 0.7, scalability: 0.6 }
    }
}

export function ROICalculator({
    onScheduleAssessment,
    onDownloadReport,
    onRequestConsultation
}: ROICalculatorProps) {
    const [step, setStep] = useState<'profile' | 'assessment' | 'results'>('profile')
    const [companyProfile, setCompanyProfile] = useState<Partial<CompanyProfile>>({})
    const [assessment, setAssessment] = useState<Partial<InfrastructureAssessment>>({})
    const [results, setResults] = useState<ROICalculationResult | null>(null)
    const [selectedScenario, setSelectedScenario] = useState<'Conservative' | 'Realistic' | 'Optimistic'>('Realistic')

    // Calculate ROI scenarios
    const calculateROI = useCallback((profile: CompanyProfile, assess: InfrastructureAssessment): ROICalculationResult => {
        const benchmark = industryBenchmarks[profile.industry]
        const currentSpendPercentage = (profile.currentITSpend * 12) / profile.revenue * 100
        const potentialSavings = Math.max(0, currentSpendPercentage - benchmark.itSpendPercentage.optimal) / 100 * profile.revenue

        // Conservative scenario (80% confidence)
        const conservativeScenario: ROIScenario = {
            name: 'Conservative',
            probability: 80,
            timeline: 12,
            costSavings: {
                monthly: potentialSavings * 0.15 / 12,
                annual: potentialSavings * 0.15,
                threeYear: potentialSavings * 0.15 * 2.8 // Compounding effect
            },
            revenueImpact: {
                conversionImprovement: 8,
                efficiencyGains: 15,
                competitiveAdvantage: 5
            },
            implementation: {
                assessmentCost: 15000,
                implementationCost: profile.revenue < 10000000 ? 75000 : 150000,
                timeline: 12,
                resourceRequirement: 240
            },
            paybackPeriod: 0,
            roi: 0,
            netPresentValue: 0
        }

        // Realistic scenario (60% confidence)  
        const realisticScenario: ROIScenario = {
            name: 'Realistic',
            probability: 60,
            timeline: 9,
            costSavings: {
                monthly: potentialSavings * 0.25 / 12,
                annual: potentialSavings * 0.25,
                threeYear: potentialSavings * 0.25 * 2.8
            },
            revenueImpact: {
                conversionImprovement: 15,
                efficiencyGains: 25,
                competitiveAdvantage: 12
            },
            implementation: {
                assessmentCost: 15000,
                implementationCost: profile.revenue < 10000000 ? 75000 : 150000,
                timeline: 10,
                resourceRequirement: 200
            },
            paybackPeriod: 0,
            roi: 0,
            netPresentValue: 0
        }

        // Optimistic scenario (30% confidence)
        const optimisticScenario: ROIScenario = {
            name: 'Optimistic',
            probability: 30,
            timeline: 6,
            costSavings: {
                monthly: potentialSavings * 0.40 / 12,
                annual: potentialSavings * 0.40,
                threeYear: potentialSavings * 0.40 * 2.8
            },
            revenueImpact: {
                conversionImprovement: 25,
                efficiencyGains: 40,
                competitiveAdvantage: 20
            },
            implementation: {
                assessmentCost: 15000,
                implementationCost: profile.revenue < 10000000 ? 75000 : 150000,
                timeline: 8,
                resourceRequirement: 160
            },
            paybackPeriod: 0,
            roi: 0,
            netPresentValue: 0
        }

        // Calculate payback periods and ROI
        const scenarios = [conservativeScenario, realisticScenario, optimisticScenario].map(scenario => {
            const totalInvestment = scenario.implementation.assessmentCost + scenario.implementation.implementationCost
            const monthlyBenefit = scenario.costSavings.monthly + (profile.revenue * scenario.revenueImpact.conversionImprovement / 100 / 12)

            scenario.paybackPeriod = totalInvestment / monthlyBenefit
            scenario.roi = ((scenario.costSavings.threeYear + profile.revenue * scenario.revenueImpact.conversionImprovement / 100 * 3) / totalInvestment - 1) * 100
            scenario.netPresentValue = (scenario.costSavings.threeYear * 0.85) - totalInvestment // 7% discount rate

            return scenario
        })

        // Risk assessment
        const riskFactors = {
            implementationRisk: profile.infrastructureMaturity === 'Legacy' ? 'High' as const :
                profile.infrastructureMaturity === 'Hybrid' ? 'Medium' as const : 'Low' as const,
            businessRisk: profile.size === 'Series A/B' ? 'Medium' as const : 'Low' as const,
            technicalRisk: assess.riskFactors?.technicalDebt > 7 ? 'High' as const :
                assess.riskFactors?.technicalDebt > 4 ? 'Medium' as const : 'Low' as const,
            overallRisk: 'Medium' as const
        }

        return {
            companyProfile: profile,
            scenarios,
            riskAssessment: riskFactors,
            recommendations: {
                priority: potentialSavings > profile.revenue * 0.05 ? 'High' : 'Medium',
                urgency: assess.riskFactors?.securityVulnerabilities > 7 ? 'Immediate' : 'Within 3 months',
                nextSteps: [
                    'Schedule comprehensive infrastructure assessment',
                    'Engage stakeholders for buy-in alignment',
                    'Develop detailed implementation roadmap',
                    'Establish success metrics and KPIs'
                ],
                successFactors: [
                    'Executive sponsorship and commitment',
                    'Cross-functional team collaboration',
                    'Systematic methodology adherence',
                    'Continuous monitoring and optimization'
                ]
            }, competitiveAnalysis: {
                industryBenchmark: benchmark.itSpendPercentage.optimal,
                peerComparison: currentSpendPercentage > benchmark.itSpendPercentage.optimal ? 'Above industry average' : 'Below industry average',
                marketPosition: 'Optimization opportunity identified',
                differentiationOpportunity: 'Technical excellence as competitive moat'
            }
        }
    }, [])

    const handleProfileSubmit = useCallback(() => {
        if (companyProfile.industry && companyProfile.revenue && companyProfile.currentITSpend) {
            setStep('assessment')
        }
    }, [companyProfile])

    const handleAssessmentSubmit = useCallback(() => {
        if (companyProfile.industry && assessment.performanceIssues) {
            const fullProfile = companyProfile as CompanyProfile
            const fullAssessment = assessment as InfrastructureAssessment
            const calculatedResults = calculateROI(fullProfile, fullAssessment)
            setResults(calculatedResults)
            setStep('results')
        }
    }, [companyProfile, assessment, calculateROI])

    const formatCurrency = useCallback((amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount)
    }, [])

    const formatPercent = useCallback((value: number) => {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
    }, [])

    if (step === 'profile') {
        return <CompanyProfileForm
            profile={companyProfile}
            onProfileChange={setCompanyProfile}
            onSubmit={handleProfileSubmit}
            formatCurrency={formatCurrency}
        />
    }

    if (step === 'assessment') {
        return <InfrastructureAssessmentForm
            assessment={assessment}
            onAssessmentChange={setAssessment}
            onSubmit={handleAssessmentSubmit}
            onBack={() => setStep('profile')}
        />
    }

    if (step === 'results' && results) {
        return <ROIResultsView
            results={results}
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
            onDownloadReport={() => onDownloadReport?.(results)}
            onScheduleAssessment={() => onScheduleAssessment?.(results.companyProfile)}
            onRequestConsultation={() => onRequestConsultation?.(results)}
            onBack={() => setStep('assessment')}
            formatCurrency={formatCurrency}
            formatPercent={formatPercent}
        />
    }

    return null
}

// Company Profile Form Component
interface CompanyProfileFormProps {
    profile: Partial<CompanyProfile>
    onProfileChange: (profile: Partial<CompanyProfile>) => void
    onSubmit: () => void
    formatCurrency: (amount: number) => string
}

function CompanyProfileForm({ profile, onProfileChange, onSubmit, formatCurrency }: CompanyProfileFormProps) {
    const industries = ['SaaS', 'Manufacturing', 'Financial', 'Healthcare', 'E-commerce', 'Other']
    const sizes = ['Series A/B', 'Growth', 'Enterprise']
    const maturityLevels = ['Legacy', 'Hybrid', 'Modern', 'Optimized']

    const isComplete = profile.industry && profile.revenue && profile.currentITSpend && profile.size

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">ROI Calculator</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Discover your infrastructure optimization potential with CFO-grade financial modeling
                </p>
            </div>

            <ExecutiveCard variant="executive" padding="xl">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-white">Company Profile</h2>
                        <p className="text-slate-400">Tell us about your company to customize ROI projections</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Industry Selection */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-300">Industry</label>
                            <div className="grid grid-cols-2 gap-2">
                                {industries.map(industry => (
                                    <ExecutiveButton
                                        key={industry}
                                        onClick={() => onProfileChange({ ...profile, industry: industry as any })}
                                        variant={profile.industry === industry ? 'primary' : 'ghost'}
                                        size="sm"
                                        className="justify-start"
                                    >
                                        {industry}
                                    </ExecutiveButton>
                                ))}
                            </div>
                        </div>

                        {/* Company Size */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-300">Company Size</label>
                            <div className="space-y-2">
                                {sizes.map(size => (
                                    <ExecutiveButton
                                        key={size}
                                        onClick={() => onProfileChange({ ...profile, size: size as any })}
                                        variant={profile.size === size ? 'primary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start"
                                    >
                                        {size}
                                    </ExecutiveButton>
                                ))}
                            </div>
                        </div>

                        {/* Annual Revenue */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-300">Annual Revenue</label>                            <ExecutiveInput
                                type="number"
                                placeholder="10000000"
                                value={profile.revenue || ''}
                                onChange={(e) => onProfileChange({ ...profile, revenue: Number(e.target.value) })}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                className="w-full"
                            />
                            {profile.revenue && (
                                <div className="text-sm text-slate-400">
                                    {formatCurrency(profile.revenue)} annually
                                </div>
                            )}
                        </div>

                        {/* Current IT Spend */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-300">Monthly IT Spend</label>                            <ExecutiveInput
                                type="number"
                                placeholder="25000"
                                value={profile.currentITSpend || ''}
                                onChange={(e) => onProfileChange({ ...profile, currentITSpend: Number(e.target.value) })}
                                leftIcon={<Calculator className="w-4 h-4" />}
                                className="w-full"
                            />
                            {profile.currentITSpend && profile.revenue && (
                                <div className="text-sm text-slate-400">
                                    {((profile.currentITSpend * 12) / profile.revenue * 100).toFixed(1)}% of revenue
                                </div>
                            )}
                        </div>

                        {/* Infrastructure Maturity */}
                        <div className="space-y-3 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300">Infrastructure Maturity</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {maturityLevels.map(level => (
                                    <ExecutiveButton
                                        key={level}
                                        onClick={() => onProfileChange({ ...profile, infrastructureMaturity: level as any })}
                                        variant={profile.infrastructureMaturity === level ? 'primary' : 'ghost'}
                                        size="sm"
                                    >
                                        {level}
                                    </ExecutiveButton>
                                ))}
                            </div>
                        </div>

                        {/* Employees */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-300">Number of Employees</label>                            <ExecutiveInput
                                type="number"
                                placeholder="150"
                                value={profile.employees || ''}
                                onChange={(e) => onProfileChange({ ...profile, employees: Number(e.target.value) })}
                                leftIcon={<Users className="w-4 h-4" />}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <ExecutiveButton
                            onClick={onSubmit}
                            disabled={!isComplete}
                            variant="primary"
                            size="lg"
                            icon={<ArrowUpRight className="w-5 h-5" />}
                        >
                            Continue to Assessment
                        </ExecutiveButton>
                    </div>
                </div>
            </ExecutiveCard>
        </div>
    )
}

// Infrastructure Assessment Form Component  
interface InfrastructureAssessmentFormProps {
    assessment: Partial<InfrastructureAssessment>
    onAssessmentChange: (assessment: Partial<InfrastructureAssessment>) => void
    onSubmit: () => void
    onBack: () => void
}

function InfrastructureAssessmentForm({
    assessment,
    onAssessmentChange,
    onSubmit,
    onBack
}: InfrastructureAssessmentFormProps) {
    const updatePerformance = (field: string, value: any) => {
        onAssessmentChange({
            ...assessment,
            performanceIssues: {
                ...assessment.performanceIssues,
                [field]: value
            } as any
        })
    }

    const updateCosts = (field: string, value: any) => {
        onAssessmentChange({
            ...assessment,
            costFactors: {
                ...assessment.costFactors,
                [field]: value
            } as any
        })
    }

    const updateRisks = (field: string, value: any) => {
        onAssessmentChange({
            ...assessment,
            riskFactors: {
                ...assessment.riskFactors,
                [field]: value
            } as any
        })
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="space-y-4">
                <ExecutiveButton
                    onClick={onBack}
                    variant="ghost"
                    size="sm"
                    icon={<ArrowUpRight className="w-4 h-4 rotate-180" />}
                >
                    Back to Profile
                </ExecutiveButton>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Infrastructure Assessment</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Provide current infrastructure metrics for accurate ROI calculation
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Performance Metrics */}
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            Performance Metrics
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Lighthouse Score (0-100)
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="67"
                                    value={assessment.performanceIssues?.lighthouseScore || ''}
                                    onChange={(e) => updatePerformance('lighthouseScore', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Average Load Time (seconds)
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    step="0.1"
                                    placeholder="3.2"
                                    value={assessment.performanceIssues?.averageLoadTime || ''}
                                    onChange={(e) => updatePerformance('averageLoadTime', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Uptime Percentage
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    placeholder="99.2"
                                    value={assessment.performanceIssues?.uptimePercentage || ''}
                                    onChange={(e) => updatePerformance('uptimePercentage', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Mobile Friendly
                                </label>
                                <div className="flex gap-2">
                                    <ExecutiveButton
                                        onClick={() => updatePerformance('mobileFriendly', true)}
                                        variant={assessment.performanceIssues?.mobileFriendly === true ? 'success' : 'ghost'}
                                        size="sm"
                                    >
                                        Yes
                                    </ExecutiveButton>
                                    <ExecutiveButton
                                        onClick={() => updatePerformance('mobileFriendly', false)}
                                        variant={assessment.performanceIssues?.mobileFriendly === false ? 'danger' : 'ghost'}
                                        size="sm"
                                    >
                                        No
                                    </ExecutiveButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </ExecutiveCard>

                {/* Cost Factors */}
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            Cost Factors
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Monthly Cloud Spend ($)
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    placeholder="15000"
                                    value={assessment.costFactors?.cloudSpend || ''}
                                    onChange={(e) => updateCosts('cloudSpend', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Monthly Maintenance Hours
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    placeholder="120"
                                    value={assessment.costFactors?.maintenanceHours || ''}
                                    onChange={(e) => updateCosts('maintenanceHours', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Monthly Incident Response Hours
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    placeholder="40"
                                    value={assessment.costFactors?.incidentResponse || ''}
                                    onChange={(e) => updateCosts('incidentResponse', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Estimated Monthly Opportunity Cost ($)
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    placeholder="8000"
                                    value={assessment.costFactors?.opportunityCost || ''}
                                    onChange={(e) => updateCosts('opportunityCost', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </ExecutiveCard>

                {/* Risk Factors */}
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-400" />
                            Risk Assessment (1-10 scale)
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Security Vulnerabilities
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    min="1"
                                    max="10"
                                    placeholder="6"
                                    value={assessment.riskFactors?.securityVulnerabilities || ''}
                                    onChange={(e) => updateRisks('securityVulnerabilities', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Compliance Gaps
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    min="1"
                                    max="10"
                                    placeholder="4"
                                    value={assessment.riskFactors?.complianceGaps || ''}
                                    onChange={(e) => updateRisks('complianceGaps', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Scalability Issues
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    min="1"
                                    max="10"
                                    placeholder="7"
                                    value={assessment.riskFactors?.scalabilityIssues || ''}
                                    onChange={(e) => updateRisks('scalabilityIssues', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                    Technical Debt
                                </label>
                                <ExecutiveInput
                                    type="number"
                                    min="1"
                                    max="10"
                                    placeholder="8"
                                    value={assessment.riskFactors?.technicalDebt || ''}
                                    onChange={(e) => updateRisks('technicalDebt', Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </ExecutiveCard>

                <div className="flex justify-between">
                    <ExecutiveButton
                        onClick={onBack}
                        variant="ghost"
                        size="lg"
                    >
                        Back
                    </ExecutiveButton>

                    <ExecutiveButton
                        onClick={onSubmit}
                        variant="primary"
                        size="lg"
                        icon={<Calculator className="w-5 h-5" />}
                    >
                        Calculate ROI
                    </ExecutiveButton>
                </div>
            </div>
        </div>
    )
}

// ROI Results View Component
interface ROIResultsViewProps {
    results: ROICalculationResult
    selectedScenario: 'Conservative' | 'Realistic' | 'Optimistic'
    onScenarioChange: (scenario: 'Conservative' | 'Realistic' | 'Optimistic') => void
    onDownloadReport: () => void
    onScheduleAssessment: () => void
    onRequestConsultation: () => void
    onBack: () => void
    formatCurrency: (amount: number) => string
    formatPercent: (value: number) => string
}

function ROIResultsView({
    results,
    selectedScenario,
    onScenarioChange,
    onDownloadReport,
    onScheduleAssessment,
    onRequestConsultation,
    onBack,
    formatCurrency,
    formatPercent
}: ROIResultsViewProps) {
    const scenario = results.scenarios.find(s => s.name === selectedScenario)!

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <ExecutiveButton
                    onClick={onBack}
                    variant="ghost"
                    size="sm"
                    icon={<ArrowUpRight className="w-4 h-4 rotate-180" />}
                >
                    Back to Assessment
                </ExecutiveButton>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">ROI Analysis Results</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Conservative financial projections based on your infrastructure assessment
                    </p>
                </div>
            </div>

            {/* Scenario Selection */}
            <ExecutiveCard variant="dark" padding="lg">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Select Scenario</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {results.scenarios.map((s) => (
                            <ExecutiveButton
                                key={s.name}
                                onClick={() => onScenarioChange(s.name)}
                                variant={selectedScenario === s.name ? 'primary' : 'ghost'}
                                size="lg"
                                className="h-auto p-4 flex-col space-y-2"
                            >
                                <div className="font-semibold">{s.name}</div>
                                <div className="text-xs opacity-75">{s.probability}% Probability</div>
                                <div className="text-lg font-bold">{formatCurrency(s.costSavings.annual)}</div>
                                <div className="text-xs">Annual Savings</div>
                            </ExecutiveButton>
                        ))}
                    </div>
                </div>
            </ExecutiveCard>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ExecutiveMetric
                    label="Annual Savings"
                    value={formatCurrency(scenario.costSavings.annual)}
                    trend="up"
                    change={25}
                    icon={<DollarSign className="w-6 h-6" />}
                    color="success"
                    size="lg"
                    animated
                />

                <ExecutiveMetric
                    label="Payback Period"
                    value={`${scenario.paybackPeriod.toFixed(1)} months`}
                    trend="down"
                    icon={<Clock className="w-6 h-6" />}
                    color="primary"
                    size="lg"
                    animated
                />

                <ExecutiveMetric
                    label="3-Year ROI"
                    value={formatPercent(scenario.roi)}
                    trend="up"
                    change={scenario.roi}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="success"
                    size="lg"
                    animated
                />

                <ExecutiveMetric
                    label="Net Present Value"
                    value={formatCurrency(scenario.netPresentValue)}
                    trend="up"
                    icon={<Target className="w-6 h-6" />}
                    color="primary"
                    size="lg"
                    animated
                />
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Financial Projection */}
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-400" />
                            Financial Projection
                        </h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-sm text-slate-400">Investment</div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span>Assessment</span>
                                            <span>{formatCurrency(scenario.implementation.assessmentCost)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Implementation</span>
                                            <span>{formatCurrency(scenario.implementation.implementationCost)}</span>
                                        </div>
                                        <div className="flex justify-between font-medium border-t border-slate-600 pt-1">
                                            <span>Total Investment</span>
                                            <span>{formatCurrency(scenario.implementation.assessmentCost + scenario.implementation.implementationCost)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm text-slate-400">Returns</div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span>Year 1</span>
                                            <span className="text-green-400">{formatCurrency(scenario.costSavings.annual)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Year 2</span>
                                            <span className="text-green-400">{formatCurrency(scenario.costSavings.annual * 1.1)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Year 3</span>
                                            <span className="text-green-400">{formatCurrency(scenario.costSavings.annual * 1.2)}</span>
                                        </div>
                                        <div className="flex justify-between font-medium border-t border-slate-600 pt-1">
                                            <span>3-Year Total</span>
                                            <span className="text-green-400">{formatCurrency(scenario.costSavings.threeYear)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ExecutiveCard>

                {/* Risk Assessment */}
                <ExecutiveCard variant="executive" padding="lg">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-orange-400" />
                            Risk Assessment
                        </h3>

                        <div className="space-y-4">
                            {Object.entries(results.riskAssessment).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-slate-300 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${value === 'Low' ? 'bg-green-500/20 text-green-400' :
                                        value === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <div className="text-sm font-medium text-blue-400 mb-2">Confidence Level</div>
                            <div className="text-slate-300">{scenario.probability}% probability of achieving projected results</div>
                        </div>
                    </div>
                </ExecutiveCard>
            </div>

            {/* Recommendations */}
            <ExecutiveCard variant="executive" padding="lg">
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-400" />
                        Recommendations & Next Steps
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-medium text-white">Priority: {results.recommendations.priority}</h4>
                            <div className="space-y-2">
                                <div className="text-sm text-slate-400">Recommended Action Timeline</div>
                                <div className="text-lg text-blue-400">{results.recommendations.urgency}</div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm font-medium text-slate-300">Next Steps:</div>
                                <ul className="space-y-2">
                                    {results.recommendations.nextSteps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium text-white">Success Factors</h4>
                            <ul className="space-y-2">
                                {results.recommendations.successFactors.map((factor, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                        <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        {factor}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </ExecutiveCard>

            {/* Call to Action */}
            <ExecutiveCard variant="executive" padding="xl">
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold text-white">
                        Ready to Realize These Savings?
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Schedule a comprehensive assessment to validate these projections and develop a detailed implementation roadmap.
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
                            onClick={onDownloadReport}
                            variant="secondary"
                            size="lg"
                            icon={<Download className="w-5 h-5" />}
                        >
                            Download Full Report
                        </ExecutiveButton>
                        <ExecutiveButton
                            onClick={onRequestConsultation}
                            variant="ghost"
                            size="lg"
                            icon={<Users className="w-5 h-5" />}
                        >
                            Request Consultation
                        </ExecutiveButton>
                    </div>
                </div>
            </ExecutiveCard>
        </div>
    )
}
