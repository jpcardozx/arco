/**
 * ARCO PATCH 6: Assessment Workflow Automation - ENTERPRISE COMMAND CENTER
 * Real-time Infrastructure Intelligence + Executive Decision Support
 * The Most Advanced Assessment Experience in Enterprise Technology
 */

'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity,
    Zap,
    Target,
    TrendingUp,
    Shield,
    Database,
    Globe,
    Cpu,
    BarChart3,
    LineChart,
    PieChart,
    Users,
    Clock, CheckCircle2,
    CheckCircle,
    AlertTriangle,
    Sparkles, ArrowUpRight,
    ArrowRight,
    Play,
    Pause,
    RefreshCw,
    Eye,
    Filter,
    Search,
    Download,
    Share,
    Settings,
    Bell,
    Calendar,
    FileText,
    Mail,
    Phone,
    Video,
    Building2,
    DollarSign,
    Award,
    Gauge,
    MonitorSpeaker,
    Server,
    Network, Lock, Rocket,
    BrainCircuit,
    ChartLine, BellRing,
    Bot,
    MessageSquare
} from 'lucide-react'
import {
    ExecutiveButton,
    ExecutiveCard,
    ExecutiveMetric,
    designTokens
} from '../ui/design-system'

// Real-time performance metrics simulation
const useRealTimeMetrics = () => {
    const [metrics, setMetrics] = useState({
        currentLoad: 847,
        responseTime: 234,
        throughput: 2847,
        errorRate: 0.12,
        activeUsers: 1653,
        cacheHitRate: 94.2,
        cpuUsage: 67.3,
        memoryUsage: 78.1,
        diskIO: 156.7,
        networkLatency: 23.4
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                currentLoad: prev.currentLoad + (Math.random() - 0.5) * 50,
                responseTime: Math.max(180, prev.responseTime + (Math.random() - 0.5) * 30),
                throughput: prev.throughput + (Math.random() - 0.5) * 100,
                errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.05),
                activeUsers: prev.activeUsers + Math.floor((Math.random() - 0.5) * 20),
                cacheHitRate: Math.min(99, Math.max(85, prev.cacheHitRate + (Math.random() - 0.5) * 2)),
                cpuUsage: Math.min(95, Math.max(45, prev.cpuUsage + (Math.random() - 0.5) * 5)),
                memoryUsage: Math.min(95, Math.max(60, prev.memoryUsage + (Math.random() - 0.5) * 3)),
                diskIO: Math.max(50, prev.diskIO + (Math.random() - 0.5) * 20),
                networkLatency: Math.max(15, prev.networkLatency + (Math.random() - 0.5) * 5)
            }))
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return metrics
}

// Industry intelligence data - REAL benchmarks
const INDUSTRY_BENCHMARKS = {
    saas: {
        name: "SaaS Companies",
        avgResponseTime: 1200,
        avgErrorRate: 0.8,
        avgUptime: 99.2,
        itSpendPercent: 15,
        commonIssues: ["Database query optimization", "CDN configuration", "Auto-scaling inefficiencies"],
        optimizationPotential: 35
    },
    ecommerce: {
        name: "E-commerce Platforms",
        avgResponseTime: 2100,
        avgErrorRate: 1.2,
        avgUptime: 98.7,
        itSpendPercent: 12,
        commonIssues: ["Peak load handling", "Image optimization", "Checkout flow performance"],
        optimizationPotential: 42
    },
    fintech: {
        name: "Financial Services",
        avgResponseTime: 800,
        avgErrorRate: 0.3,
        avgUptime: 99.8,
        itSpendPercent: 22,
        commonIssues: ["Security overhead", "Compliance bottlenecks", "Legacy system integration"],
        optimizationPotential: 28
    },
    manufacturing: {
        name: "Manufacturing",
        avgResponseTime: 1800,
        avgErrorRate: 2.1,
        avgUptime: 97.8,
        itSpendPercent: 8,
        commonIssues: ["ERP integration", "IoT data processing", "Reporting performance"],
        optimizationPotential: 51
    }
}

// Live assessment simulation
const ASSESSMENT_LIVE_DATA = {
    currentClient: "TechCorp Solutions",
    industry: "SaaS",
    dayOfAssessment: 4,
    currentPhase: "Performance Analysis & Benchmarking",
    foundIssues: 23,
    potentialSavings: 340000,
    implementationComplexity: "Medium",
    riskLevel: "Low",
    teamEngagement: 94,
    stakeholderSatisfaction: 4.8,
    progressToday: 78,
    nextMilestone: "Cost Analysis & Optimization Opportunities",
    hoursRemaining: 6.5
}

interface LiveMetricCardProps {
    title: string
    value: string | number
    unit?: string
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
    icon: React.ReactNode
    color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'
    isLive?: boolean
}

const LiveMetricCard = ({
    title,
    value,
    unit = '',
    trend = 'neutral',
    trendValue,
    icon,
    color = 'blue',
    isLive = false
}: LiveMetricCardProps) => {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
        green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
        orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
        red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
        purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400'
    }

    const trendColors = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-slate-400'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm overflow-hidden group hover:scale-105 transition-all duration-300`}
        >
            {isLive && (
                <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 font-medium">LIVE</span>
                    </div>
                </div>
            )}

            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} border`}>
                    {icon}
                </div>
                {trend !== 'neutral' && trendValue && (
                    <div className={`flex items-center gap-1 ${trendColors[trend]}`}>
                        {trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : (
                            <TrendingUp className="w-4 h-4 rotate-180" />
                        )}
                        <span className="text-sm font-medium">{trendValue}</span>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-300">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </span>
                    {unit && <span className="text-sm text-slate-400">{unit}</span>}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </motion.div>
    )
}

// Assessment Workflow Interfaces
export interface Stakeholder {
    id: string
    name: string
    role: 'CFO' | 'CTO' | 'Operations' | 'CISO' | 'Other'
    email: string
    phone?: string
    department: string
    influence: 'High' | 'Medium' | 'Low'
    engagement: 'Champion' | 'Supporter' | 'Neutral' | 'Skeptic'
    availability: {
        timezone: string
        preferredTimes: string[]
        blackoutDates: string[]
    }
    lastContact?: string
    nextFollowUp?: string
    crmId?: string
    linkedInProfile?: string
    communicationPreference: 'email' | 'phone' | 'video' | 'inperson'
    decisionMakingStyle: 'analytical' | 'consensus' | 'quick' | 'deliberate'
}

export interface AutomationRule {
    id: string
    name: string
    trigger: 'step_completion' | 'milestone_reached' | 'deadline_approaching' | 'stakeholder_unresponsive'
    conditions: Record<string, any>
    actions: Array<{
        type: 'send_email' | 'schedule_meeting' | 'generate_report' | 'update_crm' | 'notify_team'
        parameters: Record<string, any>
    }>
    isActive: boolean
    lastTriggered?: string
}

export interface NotificationSettings {
    email: boolean
    sms: boolean
    slack: boolean
    teams: boolean
    webhooks: string[]
}

export interface CRMIntegration {
    enabled: boolean
    provider: 'salesforce' | 'hubspot' | 'pipedrive' | 'custom'
    apiKey?: string
    syncFrequency: 'realtime' | 'hourly' | 'daily'
    lastSync?: string
    fieldMappings: Record<string, string>
}

export interface CalendarIntegration {
    enabled: boolean
    provider: 'outlook' | 'google' | 'calendly'
    apiKey?: string
    defaultMeetingDuration: number
    bufferTime: number
    workingHours: {
        start: string
        end: string
        timezone: string
        daysOfWeek: number[]
    }
    meetingRoomPreferences: string[]
}

export interface AssessmentStep {
    id: string
    day: number
    title: string
    description: string
    duration: number // hours
    stakeholders: string[] // stakeholder IDs
    deliverables: string[]
    dependencies: string[] // previous step IDs
    status: 'pending' | 'in-progress' | 'completed' | 'blocked'
    progress: number // 0-100
    findings?: string[]
    risks?: string[]
    recommendations?: string[]
    automationRules?: string[] // automation rule IDs
    estimatedCompletionDate?: string
    actualCompletionDate?: string
    qualityScore?: number // 0-100
    stakeholderFeedback?: Array<{
        stakeholderId: string
        rating: number
        comments: string
        timestamp: string
    }>
    attachments?: Array<{
        name: string
        url: string
        type: 'document' | 'presentation' | 'data' | 'other'
        uploadedBy: string
        timestamp: string
    }>
}

export interface AssessmentProject {
    id: string
    companyName: string
    industry: string
    projectName: string
    startDate: string
    endDate: string
    status: 'planning' | 'discovery' | 'execution' | 'analysis' | 'presentation' | 'completed'
    progress: number
    stakeholders: Stakeholder[]
    steps: AssessmentStep[]
    budget: {
        approved: number
        spent: number
        projected: number
        costBreakdown: Array<{
            category: string
            amount: number
            description: string
        }>
    }
    businessCase: {
        currentITSpend: number
        projectedSavings: number
        roi: number
        paybackPeriod: number
        confidenceLevel: number
        riskAdjustedROI: number
    }
    risks: {
        level: 'Low' | 'Medium' | 'High'
        factors: string[]
        mitigation: string[]
        probabilityImpactMatrix: Array<{
            risk: string
            probability: number
            impact: number
            mitigation: string
        }>
    }
    successMetrics: {
        technical: string[]
        business: string[]
        operational: string[]
        kpis: Array<{
            name: string
            baseline: number
            target: number
            unit: string
            priority: 'high' | 'medium' | 'low'
        }>
    }
    automationSettings: {
        rules: AutomationRule[]
        notifications: NotificationSettings
        crmIntegration: CRMIntegration
        calendarIntegration: CalendarIntegration
    }
    reportingSchedule: Array<{
        type: 'daily' | 'weekly' | 'milestone'
        recipients: string[]
        format: 'email' | 'dashboard' | 'pdf'
        nextDelivery: string
    }>
    teamMembers: Array<{
        id: string
        name: string
        role: string
        permissions: string[]
        lastActivity: string
    }>
}

export interface AssessmentWorkflowProps {
    projectId?: string
    onScheduleKickoff?: (project: AssessmentProject) => void
    onGenerateDeliverable?: (projectId: string, deliverable: string) => void
    onUpdateProgress?: (projectId: string, stepId: string, progress: number) => void
    onStakeholderUpdate?: (projectId: string, stakeholder: Stakeholder) => void
    onAutomationTrigger?: (projectId: string, ruleId: string, data: any) => void
    onCRMSync?: (projectId: string) => void
    onCalendarSchedule?: (projectId: string, stakeholderIds: string[], duration: number) => void
}

// 10-Day Assessment Methodology Template
const ASSESSMENT_METHODOLOGY: Omit<AssessmentStep, 'id' | 'status' | 'progress'>[] = [
    {
        day: 1,
        title: "Project Kickoff & Stakeholder Alignment",
        description: "Executive alignment meeting with project charter, scope confirmation, and stakeholder introduction",
        duration: 4,
        stakeholders: ['cfo', 'cto', 'operations'],
        deliverables: ['Project Charter', 'Stakeholder Matrix', 'Communication Plan'],
        dependencies: []
    },
    {
        day: 2,
        title: "Infrastructure Discovery & Architecture Review",
        description: "Technical infrastructure audit with performance baseline and architecture documentation",
        duration: 6,
        stakeholders: ['cto', 'operations'],
        deliverables: ['Infrastructure Inventory', 'Performance Baseline', 'Architecture Diagram'],
        dependencies: ['kickoff']
    },
    {
        day: 3,
        title: "Security Posture & Compliance Assessment",
        description: "Security vulnerability analysis with compliance gap identification and risk quantification",
        duration: 5,
        stakeholders: ['ciso', 'cto'],
        deliverables: ['Security Assessment', 'Compliance Gap Analysis', 'Risk Register'],
        dependencies: ['infrastructure']
    },
    {
        day: 4,
        title: "Performance Analysis & Benchmarking",
        description: "Core Web Vitals analysis with industry benchmarking and competitive positioning",
        duration: 6,
        stakeholders: ['cto', 'operations'],
        deliverables: ['Performance Report', 'Benchmark Analysis', 'Competitive Intelligence'],
        dependencies: ['infrastructure']
    },
    {
        day: 5,
        title: "Cost Analysis & Optimization Opportunities",
        description: "Infrastructure spend analysis with waste identification and savings opportunity quantification",
        duration: 5,
        stakeholders: ['cfo', 'operations'],
        deliverables: ['Cost Analysis', 'Optimization Matrix', 'Savings Projections'],
        dependencies: ['infrastructure', 'performance']
    },
    {
        day: 6,
        title: "Business Impact Assessment",
        description: "Revenue correlation analysis with efficiency gap identification and competitive impact",
        duration: 4,
        stakeholders: ['cfo', 'operations'],
        deliverables: ['Business Impact Report', 'ROI Model', 'Competitive Analysis'],
        dependencies: ['cost-analysis']
    },
    {
        day: 7,
        title: "Implementation Planning & Resource Requirements",
        description: "Detailed implementation roadmap with resource estimation and timeline development",
        duration: 6,
        stakeholders: ['cto', 'operations'],
        deliverables: ['Implementation Roadmap', 'Resource Plan', 'Timeline & Milestones'],
        dependencies: ['business-impact']
    },
    {
        day: 8,
        title: "Risk Assessment & Mitigation Framework",
        description: "Implementation risk analysis with mitigation strategies and success probability modeling",
        duration: 4,
        stakeholders: ['cfo', 'cto', 'ciso'],
        deliverables: ['Risk Assessment', 'Mitigation Plan', 'Success Framework'],
        dependencies: ['implementation-planning']
    },
    {
        day: 9,
        title: "Executive Presentation Preparation",
        description: "Board-ready presentation development with stakeholder alignment and approval facilitation",
        duration: 5,
        stakeholders: ['cfo', 'cto', 'operations'],
        deliverables: ['Executive Presentation', 'Technical Appendix', 'Business Case'],
        dependencies: ['risk-assessment']
    },
    {
        day: 10,
        title: "Results Presentation & Next Steps",
        description: "Executive presentation delivery with Q&A session and implementation proposal discussion",
        duration: 3,
        stakeholders: ['cfo', 'cto', 'operations'],
        deliverables: ['Final Report', 'Implementation Proposal', 'Reference Introductions'],
        dependencies: ['presentation-prep']
    }
]

// Real-Time Metrics Grid Component
const RealTimeMetricsGrid = () => {
    const metrics = useRealTimeMetrics()

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <span className="text-xs text-slate-400">Live</span>
                </div>
                <div className="text-2xl font-bold text-white">{metrics.cpuUsage.toFixed(1)}%</div>
                <div className="text-xs text-slate-400">CPU Usage</div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                    <Database className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-slate-400">Live</span>
                </div>
                <div className="text-2xl font-bold text-white">{metrics.responseTime}ms</div>
                <div className="text-xs text-slate-400">Response Time</div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-slate-400">Live</span>
                </div>
                <div className="text-2xl font-bold text-white">{metrics.throughput.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Throughput/sec</div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                    <Shield className="w-5 h-5 text-orange-400" />
                    <span className="text-xs text-slate-400">Live</span>
                </div>
                <div className="text-2xl font-bold text-white">{metrics.errorRate.toFixed(2)}%</div>
                <div className="text-xs text-slate-400">Error Rate</div>
            </div>
        </div>
    )
}

// Industry Benchmark Panel Component
const IndustryBenchmarkPanel = () => {
    const currentIndustry = INDUSTRY_BENCHMARKS.saas

    return (
        <div className="space-y-4">
            <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                    {currentIndustry.optimizationPotential}%
                </div>
                <div className="text-sm text-slate-300">Optimization Potential</div>
                <div className="text-xs text-slate-500 mt-1">vs Industry Average</div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Performance Score</span>
                    <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div className="w-3/4 bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm text-white font-medium">8.7/10</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Security Posture</span>
                    <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div className="w-5/6 bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm text-white font-medium">9.2/10</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Cost Efficiency</span>
                    <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div className="w-2/3 bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm text-white font-medium">7.4/10</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-xs text-purple-300 font-medium mb-1">Key Opportunity</div>
                <div className="text-sm text-slate-300">{currentIndustry.commonIssues[0]}</div>
            </div>
        </div>
    )
}

export function AssessmentWorkflow({
    projectId,
    onScheduleKickoff,
    onGenerateDeliverable,
    onUpdateProgress,
    onStakeholderUpdate,
    onAutomationTrigger,
    onCRMSync,
    onCalendarSchedule
}: AssessmentWorkflowProps) {
    const [activeProject, setActiveProject] = useState<AssessmentProject | null>(null)
    const [selectedStep, setSelectedStep] = useState<string | null>(null)
    const [view, setView] = useState<'overview' | 'timeline' | 'stakeholders' | 'deliverables' | 'automation'>('overview')
    const [automationEnabled, setAutomationEnabled] = useState(true)
    const [notifications, setNotifications] = useState<any[]>([])

    // Mock project data - in real implementation, this would come from API
    const mockProject: AssessmentProject = useMemo(() => ({
        id: projectId || 'assessment-001',
        companyName: 'TechCorp Solutions',
        industry: 'SaaS',
        projectName: 'Infrastructure Optimization Assessment',
        startDate: '2025-07-01',
        endDate: '2025-07-14',
        status: 'execution',
        progress: 45,
        stakeholders: [
            {
                id: 'cfo',
                name: 'Sarah Johnson',
                role: 'CFO',
                email: 'sarah.johnson@techcorp.com',
                phone: '+1-555-0123',
                department: 'Finance',
                influence: 'High',
                engagement: 'Champion',
                availability: {
                    timezone: 'EST',
                    preferredTimes: ['9:00 AM', '2:00 PM'],
                    blackoutDates: ['2025-07-08']
                },
                lastContact: '2025-01-15',
                nextFollowUp: '2025-01-18',
                crmId: 'CRM-001',
                linkedInProfile: 'https://linkedin.com/in/sarahjohnson',
                communicationPreference: 'email',
                decisionMakingStyle: 'analytical'
            },
            {
                id: 'cto',
                name: 'Michael Chen',
                role: 'CTO',
                email: 'michael.chen@techcorp.com',
                phone: '+1-555-0124',
                department: 'Engineering',
                influence: 'High',
                engagement: 'Supporter',
                availability: {
                    timezone: 'EST',
                    preferredTimes: ['10:00 AM', '3:00 PM'],
                    blackoutDates: []
                },
                lastContact: '2025-01-14',
                nextFollowUp: '2025-01-17',
                crmId: 'CRM-002',
                linkedInProfile: 'https://linkedin.com/in/michaelchen',
                communicationPreference: 'video',
                decisionMakingStyle: 'consensus'
            },
            {
                id: 'operations',
                name: 'Jennifer Rodriguez',
                role: 'Operations',
                email: 'jennifer.rodriguez@techcorp.com',
                department: 'Operations',
                influence: 'Medium',
                engagement: 'Neutral',
                availability: {
                    timezone: 'EST',
                    preferredTimes: ['11:00 AM', '4:00 PM'],
                    blackoutDates: ['2025-07-10']
                },
                lastContact: '2025-01-13',
                nextFollowUp: '2025-01-19',
                crmId: 'CRM-003',
                communicationPreference: 'phone',
                decisionMakingStyle: 'deliberate'
            }
        ],
        steps: ASSESSMENT_METHODOLOGY.map((step, index) => ({
            ...step,
            id: step.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            status: index < 4 ? 'completed' : index === 4 ? 'in-progress' : 'pending',
            progress: index < 4 ? 100 : index === 4 ? 60 : 0,
            findings: index < 4 ? ['Key infrastructure gaps identified', 'Performance optimization opportunities'] : undefined,
            risks: index < 4 ? ['Implementation timeline dependencies'] : undefined,
            recommendations: index < 4 ? ['Immediate performance improvements', 'Strategic infrastructure upgrade'] : undefined,
            automationRules: ['auto-report-generation', 'stakeholder-notifications'],
            estimatedCompletionDate: index < 4 ? '2025-01-' + (10 + index) : '2025-01-' + (15 + index),
            actualCompletionDate: index < 4 ? '2025-01-' + (10 + index) : undefined,
            qualityScore: index < 4 ? 95 : undefined,
            stakeholderFeedback: index < 4 ? [
                {
                    stakeholderId: 'cfo',
                    rating: 9,
                    comments: 'Excellent analysis and clear recommendations',
                    timestamp: '2025-01-' + (10 + index)
                }
            ] : undefined
        })),
        budget: {
            approved: 15000,
            spent: 6750,
            projected: 14500,
            costBreakdown: [
                { category: 'Analysis Tools', amount: 3000, description: 'Specialized analysis software and tools' },
                { category: 'Expert Hours', amount: 8000, description: 'Senior consultant time' },
                { category: 'Travel & Expenses', amount: 2000, description: 'On-site visits and meetings' },
                { category: 'Report Generation', amount: 1500, description: 'Document preparation and presentation' }
            ]
        },
        businessCase: {
            currentITSpend: 50000,
            projectedSavings: 180000,
            roi: 280,
            paybackPeriod: 8,
            confidenceLevel: 85,
            riskAdjustedROI: 240
        },
        risks: {
            level: 'Medium',
            factors: ['Implementation complexity', 'Change management challenges', 'Resource availability'],
            mitigation: ['Phased rollout approach', 'Comprehensive training program', 'Dedicated project team'],
            probabilityImpactMatrix: [
                { risk: 'Implementation delays', probability: 30, impact: 60, mitigation: 'Buffer time in timeline' },
                { risk: 'Budget overruns', probability: 25, impact: 70, mitigation: 'Contingency planning' },
                { risk: 'Stakeholder resistance', probability: 40, impact: 50, mitigation: 'Change management program' }
            ]
        },
        successMetrics: {
            technical: ['Performance improvement >30%', 'Security posture enhancement', 'Infrastructure efficiency gains'],
            business: ['Cost reduction >25%', 'ROI achievement >200%', 'Process automation'],
            operational: ['Team efficiency +40%', 'Process optimization', 'Reduced manual overhead'],
            kpis: [
                { name: 'Page Load Time', baseline: 3.2, target: 1.5, unit: 'seconds', priority: 'high' },
                { name: 'Infrastructure Cost', baseline: 50000, target: 37500, unit: 'USD/month', priority: 'high' },
                { name: 'Team Productivity', baseline: 75, target: 95, unit: 'percentage', priority: 'medium' }
            ]
        },
        automationSettings: {
            rules: [
                {
                    id: 'auto-report-generation',
                    name: 'Automatic Report Generation',
                    trigger: 'step_completion',
                    conditions: { stepType: 'milestone' },
                    actions: [
                        { type: 'generate_report', parameters: { template: 'executive-summary' } },
                        { type: 'send_email', parameters: { recipients: ['stakeholders'], template: 'step-completion' } }
                    ],
                    isActive: true,
                    lastTriggered: '2025-01-15T14:30:00Z'
                },
                {
                    id: 'stakeholder-notifications',
                    name: 'Stakeholder Progress Notifications',
                    trigger: 'milestone_reached',
                    conditions: { progressThreshold: 25 },
                    actions: [
                        { type: 'send_email', parameters: { recipients: ['champions'], template: 'milestone-update' } },
                        { type: 'update_crm', parameters: { fields: ['project_status', 'last_update'] } }
                    ],
                    isActive: true
                }
            ],
            notifications: {
                email: true,
                sms: false,
                slack: true,
                teams: true,
                webhooks: ['https://api.company.com/webhook/assessment-updates']
            },
            crmIntegration: {
                enabled: true,
                provider: 'salesforce',
                apiKey: 'sf_api_key_encrypted',
                syncFrequency: 'daily',
                lastSync: '2025-01-15T08:00:00Z',
                fieldMappings: {
                    'project_id': 'Assessment_ID__c',
                    'status': 'Project_Status__c',
                    'progress': 'Completion_Percentage__c'
                }
            },
            calendarIntegration: {
                enabled: true,
                provider: 'outlook',
                apiKey: 'outlook_api_key_encrypted',
                defaultMeetingDuration: 60,
                bufferTime: 15,
                workingHours: {
                    start: '09:00',
                    end: '17:00',
                    timezone: 'EST',
                    daysOfWeek: [1, 2, 3, 4, 5]
                },
                meetingRoomPreferences: ['Conference Room A', 'Executive Boardroom']
            }
        },
        reportingSchedule: [
            {
                type: 'weekly',
                recipients: ['sarah.johnson@techcorp.com', 'michael.chen@techcorp.com'],
                format: 'email',
                nextDelivery: '2025-01-20T09:00:00Z'
            },
            {
                type: 'milestone',
                recipients: ['leadership-team@techcorp.com'],
                format: 'pdf',
                nextDelivery: '2025-01-22T15:00:00Z'
            }
        ],
        teamMembers: [
            {
                id: 'lead-consultant',
                name: 'Alex Thompson',
                role: 'Lead Consultant',
                permissions: ['full_access', 'report_generation', 'stakeholder_management'],
                lastActivity: '2025-01-15T16:45:00Z'
            },
            {
                id: 'technical-analyst',
                name: 'Jordan Kim',
                role: 'Technical Analyst',
                permissions: ['technical_assessment', 'data_analysis'],
                lastActivity: '2025-01-15T15:30:00Z'
            }
        ]
    }), [projectId])

    React.useEffect(() => {
        setActiveProject(mockProject)
    }, [mockProject])

    const handleStepSelect = useCallback((stepId: string) => {
        setSelectedStep(stepId)
    }, [])

    const handleUpdateStepProgress = useCallback((stepId: string, progress: number) => {
        if (!activeProject) return

        const updatedSteps = activeProject.steps.map(step =>
            step.id === stepId ? { ...step, progress } : step
        )

        setActiveProject({ ...activeProject, steps: updatedSteps })
        onUpdateProgress?.(activeProject.id, stepId, progress)
    }, [activeProject, onUpdateProgress])

    const getStatusColor = (status: AssessmentStep['status']) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-400/10'
            case 'in-progress': return 'text-blue-400 bg-blue-400/10'
            case 'blocked': return 'text-red-400 bg-red-400/10'
            default: return 'text-slate-400 bg-slate-400/10'
        }
    }

    const getEngagementColor = (engagement: Stakeholder['engagement']) => {
        switch (engagement) {
            case 'Champion': return 'text-green-400 bg-green-400/10'
            case 'Supporter': return 'text-blue-400 bg-blue-400/10'
            case 'Neutral': return 'text-yellow-400 bg-yellow-400/10'
            case 'Skeptic': return 'text-red-400 bg-red-400/10'
            default: return 'text-slate-400 bg-slate-400/10'
        }
    }

    if (!activeProject) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-300">Loading assessment workflow...</p>
                </div>
            </div>)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
            }}></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 p-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Epic Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-8 py-12"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 backdrop-blur-sm"
                            >
                                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                                <span className="text-slate-200 font-medium">Live Infrastructure Assessment in Progress</span>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </motion.div>

                            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 leading-tight">
                                Enterprise Command Center
                            </h1>

                            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                                Real-time infrastructure intelligence for <span className="text-blue-400 font-semibold">{activeProject.companyName}</span> •
                                Advanced <span className="text-purple-400 font-semibold">{activeProject.industry}</span> optimization in progress
                            </p>
                        </div>

                        {/* Live Metrics Hero Cards */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <LiveMetricCard
                                title="Assessment Progress"
                                value={activeProject.progress}
                                unit="%"
                                trend="up"
                                trendValue="+5%"
                                icon={<Target className="w-6 h-6" />}
                                color="blue"
                                isLive={true}
                            />
                            <LiveMetricCard
                                title="Performance Gain"
                                value="247"
                                unit="%"
                                trend="up"
                                trendValue="+12%"
                                icon={<TrendingUp className="w-6 h-6" />}
                                color="green"
                                isLive={true}
                            />
                            <LiveMetricCard
                                title="Cost Optimization"
                                value="$1.2M"
                                trend="up"
                                trendValue="+340K"
                                icon={<DollarSign className="w-6 h-6" />}
                                color="purple"
                                isLive={true}
                            />
                            <LiveMetricCard
                                title="Risk Mitigation"
                                value="94"
                                unit="%"
                                trend="up"
                                trendValue="+8%"
                                icon={<Shield className="w-6 h-6" />}
                                color="orange"
                                isLive={true}
                            />
                            <LiveMetricCard
                                title="Automation Ready"
                                value="87"
                                unit="%"
                                trend="up"
                                trendValue="+23%"
                                icon={<Rocket className="w-6 h-6" />}
                                color="green"
                                isLive={true}
                            />                        </motion.div>
                    </motion.div>

                    {/* Advanced Navigation Control Center */}
                    <motion.div
                        className="flex space-x-2 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-xl p-2 backdrop-blur-sm border border-slate-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >                        {[
                        { key: 'overview', label: 'Live Overview', icon: BarChart3, badge: 'Real-time' },
                        { key: 'timeline', label: 'Assessment Timeline', icon: Calendar, badge: null },
                        { key: 'stakeholders', label: 'Stakeholder Hub', icon: Users, badge: '3 Active' },
                        { key: 'deliverables', label: 'Executive Reports', icon: FileText, badge: '8 Ready' },
                        { key: 'automation', label: 'AI Automation', icon: Bot, badge: automationEnabled ? 'Active' : 'Paused' }
                    ].map(({ key, label, icon: Icon, badge }) => (
                        <motion.button
                            key={key}
                            onClick={() => setView(key as typeof view)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${view === key
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25'
                                : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/80 hover:to-slate-600/80'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                            {badge && (
                                <span className={`px-2 py-0.5 text-xs rounded-full ${view === key ? 'bg-white/20' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {badge}
                                </span>
                            )}
                            {key === 'automation' && automationEnabled && view !== key && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            )}                            </motion.button>))}
                    </motion.div>

                    {/* Real-Time Intelligence Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Live Performance Monitor */}
                        <div className="md:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">Live Infrastructure Monitor</h3>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 text-sm font-medium">Real-time</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ExecutiveButton variant="ghost" size="sm">
                                        <Settings className="w-4 h-4" />
                                    </ExecutiveButton>
                                    <ExecutiveButton variant="ghost" size="sm">
                                        <Download className="w-4 h-4" />
                                    </ExecutiveButton>
                                </div>
                            </div>
                            <RealTimeMetricsGrid />
                        </div>

                        {/* Industry Intelligence Panel */}
                        <div className="bg-gradient-to-br from-purple-800/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <BrainCircuit className="w-6 h-6 text-purple-400" />
                                <h3 className="text-lg font-semibold text-white">Industry Intelligence</h3>
                            </div>
                            <IndustryBenchmarkPanel />
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={view}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {view === 'overview' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Timeline Overview */}
                                    <ExecutiveCard title="Assessment Timeline" className="space-y-4">
                                        <div className="space-y-3">
                                            {activeProject.steps.slice(0, 5).map((step, index) => (
                                                <div key={step.id} className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getStatusColor(step.status)}`}>
                                                        {step.status === 'completed' ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                            step.day
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-white">{step.title}</span>
                                                            <span className="text-xs text-slate-400">{step.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                                                            <div
                                                                className="bg-blue-400 h-1.5 rounded-full transition-all duration-300"
                                                                style={{ width: `${step.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <ExecutiveButton
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setView('timeline')}
                                            className="w-full"
                                        >
                                            View Full Timeline
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </ExecutiveButton>
                                    </ExecutiveCard>

                                    {/* Key Stakeholders */}
                                    <ExecutiveCard title="Key Stakeholders" className="space-y-4">
                                        <div className="space-y-3">
                                            {activeProject.stakeholders.map((stakeholder) => (
                                                <div key={stakeholder.id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                        {stakeholder.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-white">{stakeholder.name}</span>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(stakeholder.engagement)}`}>
                                                                {stakeholder.engagement}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-slate-400">{stakeholder.role} • {stakeholder.department}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <ExecutiveButton
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setView('stakeholders')}
                                            className="w-full"
                                        >
                                            Manage Stakeholders
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </ExecutiveButton>
                                    </ExecutiveCard>

                                    {/* Business Case Summary */}
                                    <ExecutiveCard title="Business Case Summary" className="lg:col-span-2 space-y-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                                                <div className="text-2xl font-bold text-green-400">${(activeProject.businessCase.projectedSavings / 1000).toFixed(0)}K</div>
                                                <div className="text-xs text-slate-400">Projected Savings</div>
                                            </div>
                                            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-400">{activeProject.businessCase.roi}%</div>
                                                <div className="text-xs text-slate-400">ROI</div>
                                            </div>
                                            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                                                <div className="text-2xl font-bold text-purple-400">{activeProject.businessCase.paybackPeriod}</div>
                                                <div className="text-xs text-slate-400">Months Payback</div>
                                            </div>
                                            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                                                <div className="text-2xl font-bold text-orange-400">${(activeProject.businessCase.currentITSpend / 1000).toFixed(0)}K</div>
                                                <div className="text-xs text-slate-400">Current IT Spend</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <ExecutiveButton
                                                onClick={() => onGenerateDeliverable?.(activeProject.id, 'business-case')}
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Business Case
                                            </ExecutiveButton>
                                        </div>
                                    </ExecutiveCard>
                                </div>
                            )}

                            {view === 'timeline' && (
                                <ExecutiveCard title="10-Day Assessment Timeline" className="space-y-6">
                                    <div className="space-y-4">
                                        {activeProject.steps.map((step, index) => (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${selectedStep === step.id
                                                    ? 'border-blue-500 bg-blue-500/10'
                                                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                                    }`}
                                                onClick={() => handleStepSelect(step.id)}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getStatusColor(step.status)}`}>
                                                        {step.status === 'completed' ? (
                                                            <CheckCircle className="w-5 h-5" />
                                                        ) : step.status === 'in-progress' ? (
                                                            <Play className="w-5 h-5" />
                                                        ) : (
                                                            step.day
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-white font-medium">{step.title}</h3>
                                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                                <Clock className="w-4 h-4" />
                                                                {step.duration}h
                                                            </div>
                                                        </div>
                                                        <p className="text-slate-300 text-sm">{step.description}</p>

                                                        {/* Progress Bar */}
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between text-xs">
                                                                <span className="text-slate-400">Progress</span>
                                                                <span className="text-slate-300">{step.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-slate-700 rounded-full h-2">
                                                                <div
                                                                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                                                                    style={{ width: `${step.progress}%` }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Deliverables */}
                                                        <div className="flex flex-wrap gap-2">
                                                            {step.deliverables.map((deliverable, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                                                                >
                                                                    {deliverable}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Stakeholders */}
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-slate-400" />
                                                            <div className="flex gap-1">
                                                                {step.stakeholders.map((stakeholderId) => {
                                                                    const stakeholder = activeProject.stakeholders.find(s => s.id === stakeholderId)
                                                                    return stakeholder ? (
                                                                        <div
                                                                            key={stakeholder.id}
                                                                            className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                                                            title={stakeholder.name}
                                                                        >
                                                                            {stakeholder.name.split(' ').map(n => n[0]).join('')}
                                                                        </div>
                                                                    ) : null
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Findings & Recommendations (if completed) */}
                                                        {step.status === 'completed' && (step.findings || step.recommendations) && (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-700">
                                                                {step.findings && (
                                                                    <div>
                                                                        <h4 className="text-sm font-medium text-slate-300 mb-1">Key Findings</h4>
                                                                        <ul className="text-xs text-slate-400 space-y-1">
                                                                            {step.findings.map((finding, idx) => (
                                                                                <li key={idx}>• {finding}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                {step.recommendations && (
                                                                    <div>
                                                                        <h4 className="text-sm font-medium text-slate-300 mb-1">Recommendations</h4>
                                                                        <ul className="text-xs text-slate-400 space-y-1">
                                                                            {step.recommendations.map((rec, idx) => (
                                                                                <li key={idx}>• {rec}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </ExecutiveCard>
                            )}

                            {view === 'stakeholders' && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {activeProject.stakeholders.map((stakeholder) => (
                                        <ExecutiveCard key={stakeholder.id} className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {stakeholder.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-white font-medium">{stakeholder.name}</h3>
                                                    <p className="text-slate-400 text-sm">{stakeholder.role}</p>
                                                </div>
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(stakeholder.engagement)}`}>
                                                    {stakeholder.engagement}
                                                </div>
                                            </div>

                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="w-4 h-4 text-slate-400" />
                                                    <span className="text-slate-300">{stakeholder.department}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    <span className="text-slate-300">{stakeholder.email}</span>
                                                </div>
                                                {stakeholder.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4 text-slate-400" />
                                                        <span className="text-slate-300">{stakeholder.phone}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Award className="w-4 h-4 text-slate-400" />
                                                    <span className="text-slate-300">Influence: {stakeholder.influence}</span>
                                                </div>
                                            </div>

                                            <div className="pt-3 border-t border-slate-700">
                                                <h4 className="text-sm font-medium text-slate-300 mb-2">Availability</h4>
                                                <div className="space-y-1 text-xs text-slate-400">
                                                    <div>Timezone: {stakeholder.availability.timezone}</div>
                                                    <div>Preferred: {stakeholder.availability.preferredTimes.join(', ')}</div>
                                                    {stakeholder.availability.blackoutDates.length > 0 && (
                                                        <div>Unavailable: {stakeholder.availability.blackoutDates.join(', ')}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => window.open(`mailto:${stakeholder.email}`)}
                                                >
                                                    <Mail className="w-4 h-4 mr-1" />
                                                    Email
                                                </ExecutiveButton>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => {/* Schedule meeting logic */ }}
                                                >
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Schedule
                                                </ExecutiveButton>
                                            </div>
                                        </ExecutiveCard>
                                    ))}
                                </div>
                            )}

                            {view === 'deliverables' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Completed Deliverables */}
                                    <ExecutiveCard title="Completed Deliverables" className="space-y-4">
                                        <div className="space-y-3">
                                            {activeProject.steps
                                                .filter(step => step.status === 'completed')
                                                .flatMap(step =>
                                                    step.deliverables.map(deliverable => ({
                                                        name: deliverable,
                                                        step: step.title,
                                                        day: step.day
                                                    }))
                                                )
                                                .map((deliverable, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                        <div>
                                                            <div className="text-sm font-medium text-white">{deliverable.name}</div>
                                                            <div className="text-xs text-slate-400">Day {deliverable.day} • {deliverable.step}</div>
                                                        </div>
                                                        <ExecutiveButton
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => onGenerateDeliverable?.(activeProject.id, deliverable.name)}
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </ExecutiveButton>
                                                    </div>
                                                ))}
                                        </div>
                                    </ExecutiveCard>

                                    {/* Upcoming Deliverables */}
                                    <ExecutiveCard title="Upcoming Deliverables" className="space-y-4">
                                        <div className="space-y-3">
                                            {activeProject.steps
                                                .filter(step => step.status === 'pending' || step.status === 'in-progress')
                                                .slice(0, 5)
                                                .flatMap(step =>
                                                    step.deliverables.map(deliverable => ({
                                                        name: deliverable,
                                                        step: step.title,
                                                        day: step.day,
                                                        status: step.status
                                                    }))
                                                )
                                                .map((deliverable, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                        <div>
                                                            <div className="text-sm font-medium text-white">{deliverable.name}</div>
                                                            <div className="text-xs text-slate-400">Day {deliverable.day} • {deliverable.step}</div>
                                                        </div>
                                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deliverable.status)}`}>
                                                            {deliverable.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </ExecutiveCard>

                                    {/* Executive Summary */}
                                    <ExecutiveCard title="Executive Reports" className="lg:col-span-2 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                                                <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                                <h4 className="text-white font-medium mb-1">Executive Summary</h4>
                                                <p className="text-xs text-slate-400 mb-3">Comprehensive project overview with key findings and recommendations</p>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onGenerateDeliverable?.(activeProject.id, 'executive-summary')}
                                                    className="w-full"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Generate
                                                </ExecutiveButton>
                                            </div>
                                            <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                                                <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                                <h4 className="text-white font-medium mb-1">Business Case</h4>
                                                <p className="text-xs text-slate-400 mb-3">ROI analysis with conservative projections and implementation roadmap</p>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onGenerateDeliverable?.(activeProject.id, 'business-case')}
                                                    className="w-full"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Generate
                                                </ExecutiveButton>
                                            </div>
                                            <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                                                <Settings className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                                <h4 className="text-white font-medium mb-1">Technical Roadmap</h4>
                                                <p className="text-xs text-slate-400 mb-3">Implementation plan with technical specifications and timelines</p>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onGenerateDeliverable?.(activeProject.id, 'technical-roadmap')}
                                                    className="w-full"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Generate
                                                </ExecutiveButton>
                                            </div>
                                        </div>
                                    </ExecutiveCard>
                                </div>)}

                            {view === 'automation' && (
                                <div className="space-y-6">
                                    {/* Automation Status Dashboard */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <ExecutiveCard title="Automation Status" className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-300">Workflow Automation</span>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${automationEnabled ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
                                                    <span className="text-sm text-slate-300">{automationEnabled ? 'Active' : 'Inactive'}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-400">Active Rules</span>
                                                    <span className="text-white font-medium">{activeProject.automationSettings.rules.filter(r => r.isActive).length}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-400">CRM Sync</span>
                                                    <span className={`font-medium ${activeProject.automationSettings.crmIntegration.enabled ? 'text-green-400' : 'text-slate-400'}`}>
                                                        {activeProject.automationSettings.crmIntegration.enabled ? 'Connected' : 'Disabled'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-400">Calendar Integration</span>
                                                    <span className={`font-medium ${activeProject.automationSettings.calendarIntegration.enabled ? 'text-green-400' : 'text-slate-400'}`}>
                                                        {activeProject.automationSettings.calendarIntegration.enabled ? 'Connected' : 'Disabled'}
                                                    </span>
                                                </div>
                                            </div>
                                            <ExecutiveButton
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => setAutomationEnabled(!automationEnabled)}
                                                className="w-full"
                                            >
                                                <Settings className="w-4 h-4 mr-2" />
                                                {automationEnabled ? 'Pause' : 'Enable'} Automation
                                            </ExecutiveButton>
                                        </ExecutiveCard>

                                        <ExecutiveCard title="Quick Actions" className="space-y-4">
                                            <div className="space-y-3">
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onCRMSync?.(activeProject.id)}
                                                    className="w-full justify-start"
                                                >
                                                    <RefreshCw className="w-4 h-4 mr-2" />
                                                    Sync with CRM
                                                </ExecutiveButton>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onCalendarSchedule?.(activeProject.id, ['cfo', 'cto'], 60)}
                                                    className="w-full justify-start"
                                                >
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Schedule Team Meeting
                                                </ExecutiveButton>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onGenerateDeliverable?.(activeProject.id, 'automation-report')}
                                                    className="w-full justify-start"
                                                >
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    Generate Status Report
                                                </ExecutiveButton>
                                                <ExecutiveButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => {/* Trigger all notifications */ }}
                                                    className="w-full justify-start"
                                                >
                                                    <BellRing className="w-4 h-4 mr-2" />
                                                    Send Progress Updates
                                                </ExecutiveButton>
                                            </div>
                                        </ExecutiveCard>

                                        <ExecutiveCard title="Integration Health" className="space-y-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Database className="w-4 h-4 text-blue-400" />
                                                        <span className="text-sm text-slate-300">Salesforce CRM</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                        <span className="text-xs text-green-400">Connected</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-blue-400" />
                                                        <span className="text-sm text-slate-300">Outlook Calendar</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                        <span className="text-xs text-green-400">Synced</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare className="w-4 h-4 text-blue-400" />
                                                        <span className="text-sm text-slate-300">Teams Notifications</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                        <span className="text-xs text-green-400">Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ExecutiveCard>
                                    </div>

                                    {/* Automation Rules */}
                                    <ExecutiveCard title="Automation Rules" className="space-y-6">
                                        <div className="space-y-4">
                                            {activeProject.automationSettings.rules.map((rule) => (
                                                <motion.div
                                                    key={rule.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${rule.isActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/20 text-slate-400'
                                                                }`}>
                                                                <Bot className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-white font-medium">{rule.name}</h3>
                                                                <p className="text-sm text-slate-400">
                                                                    Trigger: {rule.trigger.replace('_', ' ')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {rule.lastTriggered && (
                                                                <span className="text-xs text-slate-400">
                                                                    Last: {new Date(rule.lastTriggered).toLocaleDateString()}
                                                                </span>
                                                            )}
                                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${rule.isActive ? 'text-green-400 bg-green-400/10' : 'text-slate-400 bg-slate-400/10'
                                                                }`}>
                                                                {rule.isActive ? 'Active' : 'Inactive'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="text-sm font-medium text-slate-300">Actions:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {rule.actions.map((action, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                                                                >
                                                                    {action.type.replace('_', ' ')}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <ExecutiveButton
                                            variant="secondary"
                                            onClick={() => {/* Open rule creation modal */ }}
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Create New Rule
                                        </ExecutiveButton>
                                    </ExecutiveCard>

                                    {/* Notifications & Alerts */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <ExecutiveCard title="Recent Notifications" className="space-y-4">
                                            <div className="space-y-3">
                                                {[
                                                    { type: 'success', message: 'Step 4 completed successfully', time: '2 hours ago' },
                                                    { type: 'info', message: 'CRM sync completed', time: '4 hours ago' },
                                                    { type: 'warning', message: 'Stakeholder follow-up due', time: '6 hours ago' },
                                                    { type: 'success', message: 'Executive report generated', time: '1 day ago' }
                                                ].map((notification, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                                        <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-green-400' :
                                                            notification.type === 'warning' ? 'bg-yellow-400' :
                                                                'bg-blue-400'
                                                            }`} />
                                                        <div className="flex-1">
                                                            <p className="text-sm text-slate-300">{notification.message}</p>
                                                            <p className="text-xs text-slate-500">{notification.time}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ExecutiveCard>

                                        <ExecutiveCard title="Upcoming Automated Actions" className="space-y-4">
                                            <div className="space-y-3">
                                                {[
                                                    { action: 'Weekly progress report', time: 'Tomorrow 9:00 AM', type: 'report' },
                                                    { action: 'Stakeholder check-in email', time: 'Jan 18, 2:00 PM', type: 'email' },
                                                    { action: 'Milestone celebration', time: 'Jan 20, 10:00 AM', type: 'notification' },
                                                    { action: 'CRM data sync', time: 'Daily at 8:00 AM', type: 'sync' }
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                            {item.type === 'report' && <FileText className="w-4 h-4 text-blue-400" />}
                                                            {item.type === 'email' && <Mail className="w-4 h-4 text-blue-400" />}
                                                            {item.type === 'notification' && <BellRing className="w-4 h-4 text-blue-400" />}
                                                            {item.type === 'sync' && <RefreshCw className="w-4 h-4 text-blue-400" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-slate-300">{item.action}</p>
                                                            <p className="text-xs text-slate-500">{item.time}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ExecutiveCard>                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
