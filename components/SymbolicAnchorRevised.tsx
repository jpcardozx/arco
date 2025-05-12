'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ArrowDown, AlertCircle, DollarSign, Eye } from 'lucide-react'
import Link from 'next/link'
import { Section, Heading2, Heading3, BodyLarge, Card, Grid, Button } from './ui/DesignSystem'

export default function PerceptionGapAnalyzerRevised() {
    // States for interactive analyzer
    const [industry, setIndustry] = useState('saas');
    const [revenue, setRevenue] = useState(500000);
    const [activeCase, setActiveCase] = useState(0);
    const [showFullAnalysis, setShowFullAnalysis] = useState(false);
    const analyzerRef = useRef<HTMLDivElement>(null);

    // Calculate perception gap and estimated monthly loss
    const getPerceptionGap = () => {
        const baseGap = {
            'saas': 34,
            'consulting': 41,
            'agency': 38,
            'ecommerce': 29,
        }[industry] || 35;

        // Scale gap based on revenue to make larger businesses have bigger gaps
        const revenueScale = Math.min(Math.log(revenue / 10000) / 10, 1.5);
        return Math.round(baseGap * revenueScale);
    };

    const getEstimatedLoss = () => {
        const percentLoss = getPerceptionGap() / 100;
        return Math.round(revenue * percentLoss);
    };

    const perceptionGap = getPerceptionGap();
    const estimatedLoss = getEstimatedLoss();

    // Case studies data
    const caseStudies = [
        {
            industry: "SaaS Platform",
            company: "TechStream Solutions",
            problem: "Premium pricing strategy being undercut by competitors with inferior solutions",
            perceptionIssue: "Technical language overshadowed value narrative; visual presence lacked premium signals",
            impact: "43% increase in enterprise deal size after perception correction",
            timeframe: "21 days",
        },
        {
            industry: "Consulting Firm",
            company: "Meridian Partners",
            problem: "High proposal rejection rate despite strong methodology and team expertise",
            perceptionIssue: "Digital presence communicated 'boutique' when they needed to convey 'established authority'",
            impact: "68% improvement in proposal acceptance rate after perception alignment",
            timeframe: "14 days",
        },
        {
            industry: "Digital Agency",
            company: "Prism Creative",
            problem: "Constant price pressure despite delivering superior results to clients",
            perceptionIssue: "Case studies emphasized execution over strategic value; missing premium positioning signals",
            impact: "52% reduction in price objections and 31% increase in average project value",
            timeframe: "30 days",
        }
    ];    // Common perception gaps by industry
    const perceptionGaps: Record<string, string[]> = {
        'saas': [
            "Technical expertise appears generic despite deep specialization",
            "Product value is diluted by feature-focused language",
            "Premium pricing seems unjustified due to visual perception issues"
        ],
        'consulting': [
            "Expertise is perceived as narrower than actual capabilities",
            "Thought leadership doesn't translate to perceived implementation ability",
            "Fee structure appears excessive without proper value framing"
        ],
        'agency': [
            "Creative quality is undercommunicated through poor portfolio presentation",
            "Strategic capability is hidden behind tactical execution emphasis",
            "Expertise appears commoditized despite unique methodologies"
        ],
        'ecommerce': [
            "Product quality perception doesn't match actual product excellence",
            "Premium positioning is undermined by visual trust factors",
            "Brand story fails to create emotional value alignment"
        ]
    };

    // Scroll to full analysis when shown
    useEffect(() => {
        if (showFullAnalysis && analyzerRef.current) {
            analyzerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showFullAnalysis]);

    return (
        <Section className="bg-white" maxWidth="xl">
            {/* Section Header */}
            <div className="text-center mb-16">
                <Heading2 className="text-neutral-900 leading-tight max-w-3xl mx-auto mb-6">
                    Symbolic misalignment creates a quantifiable revenue gap between your <span className="text-blue-600">actual value</span> and <span className="text-blue-600">conversion rates</span>
                </Heading2>
                <BodyLarge className="text-neutral-700 max-w-2xl mx-auto">
                    Our analysis of 200+ businesses reveals that 20-40% of potential revenue is lost due to
                    specific symbolic friction points that create cognitive dissonance during key decision moments.
                </BodyLarge>
            </div>

            {/* Interactive Analyzer Tool */}
            <Card variant="secondary" className="rounded-2xl overflow-hidden border border-neutral-200 shadow-lg mb-20">
                <div className="p-8 md:p-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-2xl font-medium text-neutral-900 mb-6">
                                Symbolic Revenue Gap Calculator™
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-neutral-700 mb-2">Your industry</label>
                                    <select
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    >
                                        <option value="saas">SaaS / Technology</option>
                                        <option value="consulting">Consulting / Professional Services</option>
                                        <option value="agency">Creative / Agency</option>
                                        <option value="ecommerce">E-commerce / Retail</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-neutral-700 mb-2">Monthly revenue ($)</label>
                                    <input
                                        type="range"
                                        min="50000"
                                        max="2000000"
                                        step="50000"
                                        value={revenue}
                                        onChange={(e) => setRevenue(parseInt(e.target.value))}
                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-neutral-500 text-sm mt-1">
                                        <span>$50K</span>
                                        <span>${revenue.toLocaleString()}</span>
                                        <span>$2M+</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                                        <div>
                                            <p className="text-neutral-500 mb-1">Your perception gap</p>
                                            <div className="relative h-5 bg-neutral-100 rounded-full overflow-hidden mb-1">
                                                <div
                                                    className={`absolute top-0 left-0 h-full ${perceptionGap > 30 ? 'bg-red-500' : perceptionGap > 20 ? 'bg-amber-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${perceptionGap}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-sm text-neutral-400">
                                                <span>0%</span>
                                                <span className={`font-medium ${perceptionGap > 30 ? 'text-red-600' : perceptionGap > 20 ? 'text-amber-600' : 'text-green-600'
                                                    }`}>
                                                    {perceptionGap}%
                                                </span>
                                                <span>50%</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-neutral-500 mb-1">Estimated monthly revenue loss</p>
                                            <p className="text-3xl font-bold text-red-600">${estimatedLoss.toLocaleString()}</p>
                                            <p className="text-neutral-400 text-sm mt-1">Due to perception misalignment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="shadow-sm">
                            <div className="p-6">
                                <h4 className="flex items-center text-lg font-medium text-neutral-900 mb-4">
                                    <AlertCircle className="text-blue-600 mr-2 h-5 w-5" />
                                    Common perception gaps in your industry
                                </h4>

                                <ul className="space-y-3 mb-6">
                                    {perceptionGaps[industry]?.map((gap, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <ArrowRight className="text-blue-600 mt-1 flex-shrink-0 h-4 w-4" />
                                            <span className="text-neutral-700">{gap}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 border-t border-neutral-100">
                                    <p className="text-neutral-700 mb-4">
                                        These perception gaps create invisible barriers between your real
                                        value and your target audience's willingness to pay premium rates.
                                    </p>

                                    <button
                                        onClick={() => setShowFullAnalysis(true)}
                                        className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                                    >
                                        Get your complete perception analysis
                                        <ArrowDown className="ml-1 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>

            {/* Case Study Carousel */}
            <div className="mb-20">
                <Heading3 className="text-neutral-900 mb-6">
                    How perception correction delivers financial impact
                </Heading3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {caseStudies.map((cs, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCase(index)}
                            className={`py-3 px-4 text-sm text-center font-medium rounded-lg transition-all ${activeCase === index
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            {cs.industry}
                        </button>
                    ))}
                </div>

                <Card className="overflow-hidden shadow-lg">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                    <div className="p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCase}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-5">
                                        <div>
                                            <p className="text-neutral-500 mb-1">{caseStudies[activeCase].industry}</p>
                                            <h4 className="text-xl font-medium text-neutral-900">
                                                {caseStudies[activeCase].company}
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-neutral-50 p-4 rounded-lg border-l-2 border-neutral-300">
                                                <h5 className="text-neutral-700 font-medium mb-1">The Problem:</h5>
                                                <p className="text-neutral-700">{caseStudies[activeCase].problem}</p>
                                            </div>

                                            <div className="bg-blue-50 p-4 rounded-lg border-l-2 border-blue-300">
                                                <h5 className="text-blue-800 font-medium mb-1">Perception Issue Identified:</h5>
                                                <p className="text-blue-800">{caseStudies[activeCase].perceptionIssue}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl mb-5">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                                    <DollarSign className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-blue-100 text-sm">Financial Impact</p>
                                                    <h4 className="text-xl font-bold">
                                                        {caseStudies[activeCase].impact}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="bg-white/10 p-3 rounded-lg inline-block">
                                                <div className="flex items-center gap-2">
                                                    <Check className="h-4 w-4" />
                                                    <span>Implemented in {caseStudies[activeCase].timeframe}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
                                            <h5 className="text-neutral-800 font-medium mb-3">How Perception Correction Works:</h5>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2">
                                                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-blue-700 text-xs font-medium">1</span>
                                                    </div>
                                                    <span className="text-neutral-700">Precision diagnosis of perception breakpoints</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-blue-700 text-xs font-medium">2</span>
                                                    </div>
                                                    <span className="text-neutral-700">Targeted symbolic realignment at key decision points</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-blue-700 text-xs font-medium">3</span>
                                                    </div>
                                                    <span className="text-neutral-700">Implementation without disrupting core operations</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-blue-700 text-xs font-medium">4</span>
                                                    </div>
                                                    <span className="text-neutral-700">Validation through financial impact measurement</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Card>
            </div>

            {/* Full Analysis Section */}
            <AnimatePresence>
                {showFullAnalysis && (
                    <motion.div
                        ref={analyzerRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-20"
                    >
                        <div className="bg-gradient-to-br from-neutral-900 to-blue-900 text-white rounded-2xl overflow-hidden shadow-xl">
                            <div className="p-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                            <Eye className="text-blue-300 h-4 w-4" />
                                            <span className="text-blue-100">Perception Analysis</span>
                                        </div>

                                        <h3 className="text-2xl font-medium mb-6">
                                            Your {industry.charAt(0).toUpperCase() + industry.slice(1)} business is losing an estimated
                                            <span className="text-blue-300"> ${estimatedLoss.toLocaleString()}</span> monthly due to perception gaps
                                        </h3>

                                        <p className="text-neutral-300 mb-6">
                                            Based on our analysis of 200+ similar businesses in your industry,
                                            here's what's likely causing your invisible revenue leaks:
                                        </p>

                                        <div className="space-y-5">
                                            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                                                <h4 className="text-lg font-medium mb-2 flex items-center">
                                                    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-red-500/20 text-red-300 inline-flex items-center justify-center mr-2 text-sm">
                                                        1
                                                    </span>
                                                    Value-Perception Misalignment
                                                </h4>
                                                <p className="text-neutral-300">
                                                    Your actual expertise and quality is likely significantly higher than
                                                    what your digital presence communicates, creating immediate friction in sales cycles.
                                                </p>
                                            </div>

                                            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                                                <h4 className="text-lg font-medium mb-2 flex items-center">
                                                    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-amber-500/20 text-amber-300 inline-flex items-center justify-center mr-2 text-sm">
                                                        2
                                                    </span>
                                                    Silent Credibility Gaps
                                                </h4>
                                                <p className="text-neutral-300">
                                                    Critical trust signals are likely either missing or improperly framed,
                                                    causing hesitation at key decision points in your customer journey.
                                                </p>
                                            </div>

                                            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                                                <h4 className="text-lg font-medium mb-2 flex items-center">
                                                    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500/20 text-blue-300 inline-flex items-center justify-center mr-2 text-sm">
                                                        3
                                                    </span>
                                                    Price-Perception Friction
                                                </h4>
                                                <p className="text-neutral-300">
                                                    Your pricing is being evaluated against the wrong symbolic benchmarks,
                                                    creating unnecessary friction when your rates should be perceived as justified.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                            <h4 className="text-lg font-medium mb-4">Your perception correction potential</h4>

                                            <div className="space-y-5">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-neutral-300">Revenue Recovery</span>
                                                        <span className="text-blue-300">${Math.round(estimatedLoss * 0.7).toLocaleString()} - ${estimatedLoss.toLocaleString()}/mo</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-neutral-300">Implementation Timeframe</span>
                                                        <span className="text-blue-300">14-21 days</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-neutral-300">Investment Required</span>
                                                        <span className="text-blue-300">Minimal compared to impact</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 shadow-lg">
                                            <h4 className="text-xl font-medium mb-4">Ready to close your perception gap?</h4>
                                            <p className="text-blue-100 mb-6">
                                                Get a precision analysis of your specific perception gaps and
                                                a roadmap to recover your lost revenue within 21 days.
                                            </p>

                                            <Link
                                                href="/diagnose"
                                                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow hover:shadow-lg transition-all group"
                                            >
                                                Get Your ArcSight Snapshot™
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>

                                            <p className="text-sm text-blue-200 mt-3">
                                                Limited to 3 companies per month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Value Proposition Closing */}
            <div className="text-center max-w-3xl mx-auto">
                <Heading3 className="text-neutral-900 mb-6">
                    Your expertise deserves to be perceived correctly
                </Heading3>
                <BodyLarge className="text-neutral-700 mb-8">
                    What would your business look like if every prospect accurately perceived
                    your true value from the first interaction? Stop losing deals you should be winning.
                </BodyLarge>

                <Button
                    href="/diagnose"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                    animate={true}
                >
                    Diagnose Your Perception Gaps
                </Button>
            </div>
        </Section>
    )
}
