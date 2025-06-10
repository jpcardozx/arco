'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Clock, BarChart } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

// Case study interface
interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  approach: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
    timeframe: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  imageBefore: string;
  imageAfter: string;
}

// Case studies data
const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'saas-premium-positioning',
    client: 'TechVantage',
    industry: 'Enterprise SaaS',
    challenge:
      'Despite superior features and technology, the company struggled with lower pricing power and longer sales cycles compared to less capable competitors.',
    approach:
      'Restructured the perception framework by realigning symbolic elements that signal premium positioning and crafted a strategic narrative that highlighted their unique value proposition.',
    results: [
      {
        metric: 'Premium Tier Adoption',
        before: '12%',
        after: '47%',
        improvement: '+292%',
        timeframe: '90 days',
      },
      {
        metric: 'Sales Cycle Length',
        before: '68 days',
        after: '31 days',
        improvement: '-54%',
        timeframe: '60 days',
      },
      {
        metric: 'Price Point',
        before: '$1,200/mo',
        after: '$2,750/mo',
        improvement: '+129%',
        timeframe: '6 months',
      },
    ],
    testimonial: {
      quote:
        "Our technical excellence was finally recognized in the market. We're now positioned as the premium solution we've always been, with pricing that reflects our true value.",
      author: 'Michael Torres',
      position: 'CRO, TechVantage',
    },
    imageBefore: '/case-xora-before.jpg',
    imageAfter: '/case-xora-after.jpg',
  },
  {
    id: 'ecommerce-premium-conversion',
    client: 'Artisana',
    industry: 'Premium E-commerce',
    challenge:
      'High-quality products were being perceived as overpriced, resulting in excessive discount requests and abandoned carts despite superior craftsmanship.',
    approach:
      'Implemented perception-value alignment through visual hierarchy reconstruction and strategic information sequencing to properly signal quality justification.',
    results: [
      {
        metric: 'Average Order Value',
        before: '$89',
        after: '$157',
        improvement: '+76%',
        timeframe: '45 days',
      },
      {
        metric: 'Discount Requests',
        before: '47% of carts',
        after: '8% of carts',
        improvement: '-83%',
        timeframe: '30 days',
      },
      {
        metric: 'Cart Abandonment',
        before: '78%',
        after: '42%',
        improvement: '-46%',
        timeframe: '60 days',
      },
    ],
    testimonial: {
      quote:
        "We've finally solved our pricing perception problem. Customers now recognize our quality before seeing the price, completely changing their purchasing behavior.",
      author: 'Elena Kim',
      position: 'Founder, Artisana',
    },
    imageBefore: '/case-ipe-before.jpg',
    imageAfter: '/case-ipe-after.jpg',
  },
  {
    id: 'consulting-authority-positioning',
    client: 'StratCore Advisors',
    industry: 'Management Consulting',
    challenge:
      'Despite deep expertise and exceptional client outcomes, the firm struggled to differentiate from competitors and command premium rates.',
    approach:
      'Developed a comprehensive authority positioning framework that properly signaled their intellectual capital and restructured their client journey.',
    results: [
      {
        metric: 'Proposal Acceptance Rate',
        before: '23%',
        after: '64%',
        improvement: '+178%',
        timeframe: '90 days',
      },
      {
        metric: 'Average Project Value',
        before: '$45K',
        after: '$87K',
        improvement: '+93%',
        timeframe: '6 months',
      },
      {
        metric: 'Inbound Lead Quality',
        before: '17% qualified',
        after: '58% qualified',
        improvement: '+241%',
        timeframe: '4 months',
      },
    ],
    testimonial: {
      quote:
        "The transformation in how prospects perceive us has been remarkable. We're no longer competing on price but instead are sought out specifically for our expertise.",
      author: 'Jonathan Mercer',
      position: 'Managing Partner, StratCore',
    },
    imageBefore: '/case-thumb-api.png',
    imageAfter: '/case-thumb-xora.png',
  },
];

export default function PortfolioCaseStudies() {
  const [activeCase, setActiveCase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const currentCase = CASE_STUDIES[activeCase];

  return (
    <section id="case-studies" ref={containerRef} className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-blue-600">
            Proven Results
          </span>
          <h2 className="mb-4 mt-2 font-serif text-4xl text-neutral-900">
            Perception-Value Alignment in Action
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            These case studies demonstrate how aligning market perception with actual value creates
            measurable financial impact across different industries.
          </p>
        </motion.div>

        {/* Case study navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {CASE_STUDIES.map((study, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeCase === index
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-600 shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {study.client}
              </button>
            ))}
          </div>
        </div>

        {/* Case study content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="grid gap-0 md:grid-cols-2">
              {/* Visual transformation */}
              <div className="relative h-[400px] md:h-auto">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={currentCase.imageBefore}
                    alt={`${currentCase.client} - Before`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-900/80 to-transparent">
                    <div className="max-w-xs px-6 py-3">
                      <span className="mb-2 inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-500">
                        BEFORE
                      </span>
                      <h3 className="mb-2 text-xl font-medium text-white">Perception Issue</h3>
                      <p className="text-sm text-neutral-300">
                        Value not properly represented through symbolic elements
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] md:h-auto">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={currentCase.imageAfter}
                    alt={`${currentCase.client} - After`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-900/80 to-transparent">
                    <div className="max-w-xs px-6 py-3">
                      <span className="mb-2 inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-500">
                        AFTER
                      </span>
                      <h3 className="mb-2 text-xl font-medium text-white">Value Alignment</h3>
                      <p className="text-sm text-neutral-300">
                        Proper perception signaling of actual delivered value
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10">
              <div className="flex flex-col gap-10 md:flex-row">
                {/* Case details */}
                <div className="md:w-1/2">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <span className="text-sm text-neutral-500">{currentCase.industry}</span>
                      <h3 className="font-serif text-3xl text-neutral-900">{currentCase.client}</h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-3 text-lg font-medium text-neutral-900">The Challenge</h4>
                    <p className="text-neutral-700">{currentCase.challenge}</p>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-medium text-neutral-900">
                      Strategic Approach
                    </h4>
                    <p className="text-neutral-700">{currentCase.approach}</p>
                  </div>

                  {currentCase.testimonial && (
                    <div className="mt-8 rounded-lg border border-neutral-100 bg-neutral-50 p-6">
                      <p className="mb-4 italic text-neutral-700">
                        "{currentCase.testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium text-neutral-900">
                            {currentCase.testimonial.author}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {currentCase.testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div className="md:w-1/2">
                  <h4 className="mb-6 text-lg font-medium text-neutral-900">Measured Impact</h4>
                  <div className="space-y-6">
                    {currentCase.results.map((result, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-neutral-100 bg-neutral-50 p-6"
                      >
                        <h5 className="mb-4 font-medium text-neutral-900">{result.metric}</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="mb-1 block text-sm text-neutral-500">Before</span>
                            <span className="font-mono text-xl text-neutral-700">
                              {result.before}
                            </span>
                          </div>
                          <div>
                            <span className="mb-1 block text-sm text-neutral-500">After</span>
                            <span className="font-mono text-xl text-neutral-700">
                              {result.after}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
                          <div className="flex items-center">
                            <BarChart className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-600">{result.improvement}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-neutral-500" />
                            <span className="text-sm text-neutral-500">{result.timeframe}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            Discuss your project
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
