'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowRight, FiCheck, FiFileText, FiBarChart2 } from 'react-icons/fi';
import { HiOutlineCurrencyDollar, HiOutlineScale, HiOutlineLightningBolt } from 'react-icons/hi';
import React from "react";

export default function HeroARCO() {
  const [activeTab, setActiveTab] = useState(0);

  const businessCases = [
    {
      title: 'E-commerce Revenue Unlock',
      industry: 'Fashion & Accessories',
      problem: 'Mobile conversion rate 63% lower than desktop despite modern responsive design',
      approach:
        'Identified symbolic friction in product visualization and trust signals that created cognitive dissonance',
      impact: '$172,500 additional monthly revenue',
      timeframe: '30 days',
      roi: '417%',
      color: 'from-emerald-500 to-blue-500',
    },
    {
      title: 'SaaS Conversion Breakthrough',
      industry: 'B2B Software',
      problem: 'High-quality demos consistently failing to convert to paid accounts',
      approach:
        'Corrected symbolic misalignment between pricing presentation and value perception hierarchy',
      impact: '$83,250 monthly recurring revenue added',
      timeframe: '45 days',
      roi: '325%',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Retail Chain Transaction Lift',
      industry: 'Multi-location Retail',
      problem: 'Mobile traffic up 55% but in-store visit conversion declining',
      approach: 'Realigned symbolic elements to create location-based value perception and urgency',
      impact: '$215,400 quarterly revenue increase',
      timeframe: '60 days',
      roi: '290%',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="min-h-screen overflow-hidden bg-neutral-950">
      {/* Hero Section */}
      <div className="relative pb-16 pt-20 md:pb-24 md:pt-28">
        {/* Abstract background elements */}
        <div className="absolute inset-0 bg-[url('/subtle-grid.png')] opacity-5" />
        <div className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 to-blue-500/10 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-6xl px-6">
          {/* Impact statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <span className="mb-5 inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm">
              Immediate Revenue Framework™ for Digital Businesses
            </span>

            <h1 className="mx-auto mb-5 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              Your business is losing{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                $100,000+
              </span>{' '}
              monthly to symbolic misalignment
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl">
              When customers experience a gap between your actual value and their perception of it,
              they don't convert. We identify and close these symbolic gaps for immediate revenue
              impact.
            </p>
          </motion.div>

          {/* Primary action */}
          <div className="mb-24 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mb-3"
            >
              <Link
                href="/diagnose"
                className="group inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/30"
              >
                Get your ArcSight Snapshot™ ($147)
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm text-neutral-400"
            >
              48-hour delivery • Guaranteed revenue insights or your money back
            </motion.p>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="relative bg-neutral-900/50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">
              When symbolic elements align, revenue follows
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-300">
              These businesses fixed specific symbolic friction points—not redesigned their
              sites—and experienced immediate revenue growth as perception barriers disappeared.
            </p>
          </motion.div>

          {/* Tab navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {businessCases.map((bcase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400'
                      : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {bcase.title}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Case study card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-neutral-700/50 bg-neutral-800/50 shadow-xl backdrop-blur-sm"
          >
            {/* Header with gradient */}
            <div className={`h-3 bg-gradient-to-r ${businessCases[activeTab].color}`} />

            <div className="p-8 md:p-10">
              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <p className="mb-1 text-sm text-neutral-400">
                      {businessCases[activeTab].industry}
                    </p>
                    <h3 className="text-2xl font-medium text-white">
                      {businessCases[activeTab].title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl bg-neutral-900/50 p-4">
                      <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-neutral-300">
                        The Problem
                      </h4>
                      <p className="text-white">{businessCases[activeTab].problem}</p>
                    </div>

                    <div className="rounded-xl bg-neutral-900/50 p-4">
                      <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-neutral-300">
                        Our Approach
                      </h4>
                      <p className="text-white">{businessCases[activeTab].approach}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div
                    className={`bg-gradient-to-br ${businessCases[activeTab].color} rounded-xl p-6 text-white`}
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <HiOutlineCurrencyDollar className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium uppercase tracking-wider text-white/80">
                          Revenue Impact
                        </h4>
                        <p className="text-2xl font-bold">{businessCases[activeTab].impact}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-white/10 p-3">
                        <p className="mb-1 text-sm text-white/70">Timeline</p>
                        <p className="font-medium">{businessCases[activeTab].timeframe}</p>
                      </div>
                      <div className="rounded-lg bg-white/10 p-3">
                        <p className="mb-1 text-sm text-white/70">ROI</p>
                        <p className="font-medium">{businessCases[activeTab].roi}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                    <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-neutral-300">
                      How We Measured
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-white">
                          Isolated test vs. control customer segments
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-white">
                          Precise attribution through conversion path analysis
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-white">
                          Verified results through financial reconciliation
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="relative py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">
              The Immediate Revenue Framework™
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-300">
              Our systematic approach translates symbolic corrections into measurable revenue
              metrics, revealing opportunities hidden within your existing customer journey.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: <HiOutlineLightningBolt className="h-6 w-6" />,
                title: 'Symbolic Friction Analysis™',
                description:
                  'We identify exact points where perception gaps create conversion friction, measuring the precise financial impact of each symbolic misalignment.',
              },
              {
                icon: <HiOutlineScale className="h-6 w-6" />,
                title: 'Value Alignment System™',
                description:
                  'We implement targeted symbolic corrections at key decision points in your customer journey, prioritized by revenue impact potential.',
              },
              {
                icon: <FiBarChart2 className="h-6 w-6" />,
                title: 'Revenue Impact Verification',
                description:
                  'We measure results through controlled A/B tests with conversion tracking, proving the ROI of symbolic alignment in actual dollars gained.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
                className="rounded-xl border border-neutral-700/30 bg-gradient-to-b from-neutral-800/70 to-neutral-900/70 p-6 backdrop-blur-sm md:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-medium text-white">{item.title}</h3>
                <p className="leading-relaxed text-neutral-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative bg-gradient-to-b from-neutral-900/50 to-blue-900/20 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">
              Begin with an ArcSight Snapshot™ today
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-neutral-300">
              For $147, discover exactly where your business leaks $3,000+ daily in potential
              revenue. Our diagnostic reveals the specific symbolic misalignments preventing
              conversions and provides a prioritized correction roadmap.
            </p>

            <div className="mb-10 flex flex-col items-center justify-center gap-4 md:flex-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/diagnose"
                  className="group inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/30 md:w-auto"
                >
                  Get your ArcSight Snapshot™ — $147
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <span className="text-neutral-400">
                48-hour delivery • 100% satisfaction guarantee
              </span>
            </div>

            <div className="inline-block rounded-xl border border-neutral-700/50 bg-neutral-800/50 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <FiFileText className="h-5 w-5 text-blue-400" />
                <p className="text-white">
                  Limited to 3 new clients per week • Includes upgrade path to implementation tiers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
