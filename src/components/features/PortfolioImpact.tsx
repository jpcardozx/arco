'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUp, Clock, DollarSign, BarChart, TrendingUp, Users } from 'lucide-react';
import React, { useRef } from 'react';

// Impact metrics interface
interface ImpactMetric {
  id: string;
  title: string;
  icon: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
  change: string;
  positiveChange: boolean;
  description: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'conversion',
    title: 'Conversion Rate',
    icon: <Users className="h-6 w-6" />,
    beforeLabel: '5.3%',
    afterLabel: '14.7%',
    change: '+177%',
    positiveChange: true,
    description:
      'Higher conversion rates as value perception aligns with actual delivered quality.',
  },
  {
    id: 'pricing',
    title: 'Price Positioning',
    icon: <DollarSign className="h-6 w-6" />,
    beforeLabel: 'Market avg.',
    afterLabel: 'Premium tier',
    change: '+127%',
    positiveChange: true,
    description:
      'Increased pricing power as value is properly recognized before price consideration.',
  },
  {
    id: 'sales-cycle',
    title: 'Sales Cycle',
    icon: <Clock className="h-6 w-6" />,
    beforeLabel: '47 days',
    afterLabel: '19 days',
    change: '-60%',
    positiveChange: true,
    description:
      'Accelerated decision making as value is communicated more efficiently from the start.',
  },
  {
    id: 'objections',
    title: 'Pricing Objections',
    icon: <BarChart className="h-6 w-6" />,
    beforeLabel: '73% of leads',
    afterLabel: '18% of leads',
    change: '-75%',
    positiveChange: true,
    description: 'Fewer pricing objections as perception properly sets value expectations.',
  },
];

// Industry case study interface
interface IndustryImpact {
  id: string;
  industry: string;
  challenge: string;
  averageImprovement: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const INDUSTRY_IMPACTS: IndustryImpact[] = [
  {
    id: 'saas',
    industry: 'Enterprise SaaS',
    challenge: 'Technical excellence not translating to premium positioning',
    averageImprovement: '+118% conversion to premium tiers',
    metrics: [
      { label: 'Trial-to-paid conversion', value: '+83%' },
      { label: 'Enterprise deal size', value: '+67%' },
      { label: 'Sales objections', value: '-72%' },
    ],
  },
  {
    id: 'ecommerce',
    industry: 'Premium E-commerce',
    challenge: 'High-quality products undermined by perception barriers',
    averageImprovement: '-58% cart abandonment rate',
    metrics: [
      { label: 'Average order value', value: '+92%' },
      { label: 'Return rate', value: '-47%' },
      { label: 'Repeat purchases', value: '+76%' },
    ],
  },
  {
    id: 'consulting',
    industry: 'Professional Services',
    challenge: 'Expertise not fully recognized in market positioning',
    averageImprovement: '+143% premium client acquisition',
    metrics: [
      { label: 'Proposal acceptance rate', value: '+107%' },
      { label: 'Client retention', value: '+38%' },
      { label: 'Price positioning', value: '+87%' },
    ],
  },
  {
    id: 'fintech',
    industry: 'Financial Technology',
    challenge: 'Complex value propositions creating friction',
    averageImprovement: '+95% user activation',
    metrics: [
      { label: 'User upgrade rate', value: '+124%' },
      { label: 'Feature adoption', value: '+78%' },
      { label: 'Customer lifetime value', value: '+167%' },
    ],
  },
];

export default function PortfolioImpact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="impact" ref={containerRef} className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-blue-600">
            Measurable Results
          </span>
          <h2 className="mb-4 mt-2 font-serif text-4xl text-neutral-900">
            Economic Impact of Perception Engineering
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Perception-value alignment creates predictable economic outcomes across diverse
            industries and business models. These are the average results achieved for clients.
          </p>
        </motion.div>

        {/* Impact metrics */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {IMPACT_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-3 rounded-lg bg-blue-100 p-2 text-blue-600">{metric.icon}</div>
                <h3 className="text-xl font-medium text-neutral-900">{metric.title}</h3>
              </div>

              <div className="mb-4 flex items-end justify-between">
                <div className="text-center">
                  <span className="mb-1 block text-sm text-neutral-500">Before</span>
                  <span className="block font-mono text-lg text-neutral-700">
                    {metric.beforeLabel}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center px-4">
                  <div
                    className={`flex items-center ${
                      metric.positiveChange ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {metric.positiveChange ? (
                      <ArrowUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4" />
                    )}
                    <span className="font-mono font-bold">{metric.change}</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="mb-1 block text-sm text-neutral-500">After</span>
                  <span className="block font-mono text-lg font-medium text-neutral-900">
                    {metric.afterLabel}
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Industry impacts */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 text-center text-2xl font-medium text-neutral-900"
        >
          Industry-Specific Impacts
        </motion.h3>

        <div className="grid gap-6 md:grid-cols-2">
          {INDUSTRY_IMPACTS.map((impact, index) => (
            <motion.div
              key={impact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h4 className="mb-2 text-xl font-medium text-neutral-900">{impact.industry}</h4>
              <p className="mb-3 text-neutral-600">{impact.challenge}</p>

              <div className="mb-5 inline-flex items-center rounded-lg bg-green-50 px-4 py-2 text-green-800">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span className="font-medium">{impact.averageImprovement}</span>
              </div>

              <div className="space-y-3">
                {impact.metrics.map((metric, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-neutral-700">{metric.label}</span>
                    <span className="font-mono font-bold text-neutral-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Discuss Your Potential Impact
            <ArrowUp className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
