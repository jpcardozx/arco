/**
 * ARCO Partner Components - Missing Components Implementation
 * Evita retrabalho através de componentes reutilizáveis
 */

import React from 'react';
import { GlassCard, GlassText, GlassBadge, GlassButton } from '../sections/glass-components';
import { MapPin, Calendar, Users, Trophy, ExternalLink, Github, Mail } from 'lucide-react';

// PartnerHero Component
interface PartnerHeroProps {
    data: {
        name: string;
        role: string;
        location: string;
        experience: string;
        specializations: string[];
        metrics: {
            clientsServed: string;
            avgPerformanceImprovement: string;
            avgCostSavings: string;
            avgROI: string;
        };
    };
}

export const PartnerHero: React.FC<PartnerHeroProps> = ({ data }) => {
    return (
        <GlassCard variant="hero" className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Profile Image */}
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                            {data.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                        <GlassBadge variant="success" className="text-xs">
                            ✓ Verified
                        </GlassBadge>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                    <GlassText variant="h1" className="mb-2">
                        {data.name}
                    </GlassText>
                    <GlassText variant="h3" className="mb-4 text-blue-300">
                        {data.role}
                    </GlassText>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-white/60" />
                            <GlassText variant="body">{data.location}</GlassText>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-white/60" />
                            <GlassText variant="body">{data.experience}</GlassText>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {data.specializations.slice(0, 3).map((spec, index) => (
                            <GlassBadge key={index} variant="info" className="text-xs">
                                {spec}
                            </GlassBadge>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="hidden lg:block">
                    <GlassCard className="p-4 space-y-3">
                        <div className="text-center">
                            <GlassText variant="h3" className="text-emerald-400">
                                {data.metrics.avgROI}
                            </GlassText>
                            <GlassText variant="caption">Average ROI</GlassText>
                        </div>
                        <div className="text-center">
                            <GlassText variant="h3" className="text-blue-400">
                                {data.metrics.clientsServed}
                            </GlassText>
                            <GlassText variant="caption">Clients Served</GlassText>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </GlassCard>
    );
};

// TechnicalExpertise Component
export const TechnicalExpertise: React.FC = () => {
    const expertiseAreas = [
        {
            category: "Performance Engineering",
            skills: [
                "Core Web Vitals Optimization (LCP <2.5s)",
                "Bundle Size Reduction (avg. 60%)",
                "Critical Rendering Path Optimization",
                "Progressive Web App Implementation"
            ]
        },
        {
            category: "Revenue Optimization",
            skills: [
                "Conversion Rate Engineering (+25% avg)",
                "SaaS Cost Audit & Optimization",
                "Financial Leak Detection",
                "Legal-Tech Compliance"
            ]
        },
        {
            category: "E-commerce Specialization",
            skills: [
                "Shopify Performance Optimization",
                "Checkout Flow Engineering",
                "Mobile-First Implementation",
                "A/B Testing & Analytics"
            ]
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
                <GlassCard key={index} className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <GlassText variant="h3">{area.category}</GlassText>
                    </div>
                    <div className="space-y-3">
                        {area.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <GlassText variant="body" className="text-sm">
                                    {skill}
                                </GlassText>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};

// ProjectPortfolio Component
export const ProjectPortfolio: React.FC = () => {
    const projects = [
        {
            title: "E-commerce Platform Optimization",
            client: "Fashion Retailer ($800K revenue)",
            challenge: "4.2s LCP, 23% mobile bounce rate",
            solution: "Bundle optimization, critical CSS, lazy loading",
            results: [
                "LCP: 4.2s → 2.1s (50% improvement)",
                "Mobile conversions: +28%",
                "SaaS costs: -$180/month"
            ],
            technologies: ["Next.js", "Shopify", "Core Web Vitals"]
        },
        {
            title: "SaaS Cost Optimization Audit",
            client: "Home & Garden Store ($1.2M revenue)",
            challenge: "$420/month in redundant tools",
            solution: "Tool consolidation, workflow optimization",
            results: [
                "Monthly savings: $290",
                "Workflow efficiency: +40%",
                "Team productivity: +25%"
            ],
            technologies: ["HubSpot", "Klaviyo", "Shopify Apps"]
        },
        {
            title: "Checkout Flow Engineering",
            client: "Electronics Retailer ($600K revenue)",
            challenge: "67% checkout abandonment rate",
            solution: "Flow optimization, trust signals, mobile UX",
            results: [
                "Abandonment: 67% → 41%",
                "Mobile conversions: +35%",
                "Revenue increase: +$2,400/month"
            ],
            technologies: ["React", "Stripe", "Analytics"]
        }
    ];

    return (
        <div className="space-y-6">
            {projects.map((project, index) => (
                <GlassCard key={index} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                        {/* Project Info */}
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                                <GlassText variant="h3">{project.title}</GlassText>
                                <GlassBadge variant="purple" className="text-xs">
                                    {project.client}
                                </GlassBadge>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <GlassText variant="caption" className="text-red-300 font-medium">
                                        Challenge:
                                    </GlassText>
                                    <GlassText variant="body" className="text-sm">
                                        {project.challenge}
                                    </GlassText>
                                </div>

                                <div>
                                    <GlassText variant="caption" className="text-blue-300 font-medium">
                                        Solution:
                                    </GlassText>
                                    <GlassText variant="body" className="text-sm">
                                        {project.solution}
                                    </GlassText>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="lg:w-80">
                            <GlassText variant="caption" className="text-emerald-300 font-medium mb-2">
                                Results:
                            </GlassText>
                            <div className="space-y-2">
                                {project.results.map((result, resultIndex) => (
                                    <div key={resultIndex} className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                        <GlassText variant="body" className="text-sm">
                                            {result}
                                        </GlassText>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.technologies.map((tech, techIndex) => (
                                    <GlassBadge key={techIndex} variant="info" className="text-xs">
                                        {tech}
                                    </GlassBadge>
                                ))}
                            </div>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};

// Contact CTA Component
export const ContactCTA: React.FC = () => {
    return (
        <GlassCard variant="section" className="p-8 text-center">
            <GlassText variant="h2" className="mb-4">
                Ready to Optimize Your Revenue?
            </GlassText>
            <GlassText variant="body" className="mb-8 max-w-2xl mx-auto">
                Get a free 30-minute technical assessment to identify exactly where
                your e-commerce store is losing money and how to fix it in 72 hours.
            </GlassText>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={() => window.open('mailto:joao@arco.com', '_blank')}
                >
                    <Mail className="w-5 h-5 mr-2" />
                    Schedule Free Assessment
                </GlassButton>
                <GlassButton
                    variant="secondary"
                    size="lg"
                    onClick={() => window.open('https://calendly.com/arco-jpcardozx', '_blank')}
                >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Discovery Call
                </GlassButton>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
                <a href="https://github.com/jpcardozx" target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 text-white/60 hover:text-white transition-colors" />
                </a>
                <a href="https://linkedin.com/in/jpcardozx" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-6 h-6 text-white/60 hover:text-white transition-colors" />
                </a>
            </div>
        </GlassCard>
    );
};
