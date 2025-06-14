'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  AlertTriangle,
  DollarSign,
  BarChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import React from "react";

export default function PerceptionGapAnalyzer() {
  // Animation refs
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Interactive analyzer state
  const [industry, setIndustry] = useState('saas');
  const [revenue, setRevenue] = useState(500000);
  const [stage, setStage] = useState(1);
  const [animatedGap, setAnimatedGap] = useState(0);
  const [animatedLoss, setAnimatedLoss] = useState(0);

  // Industry options
  const industries = [
    { id: 'saas', label: 'SaaS / Tech' },
    { id: 'consulting', label: 'Professional Services' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'agency', label: 'Agency / Creative' },
    { id: 'finance', label: 'Financial Services' },
  ];

  // Revenue slider options
  const revenueOptions = [
    { value: 100000, label: '$100K' },
    { value: 500000, label: '$500K' },
    { value: 1000000, label: '$1M' },
    { value: 5000000, label: '$5M' },
    { value: 10000000, label: '$10M+' },
  ];

  // Calculate perception gap based on industry and revenue
  const calculatePerceptionGap = () => {
    const baseGap =
      {
        saas: 34,
        consulting: 41,
        agency: 38,
        ecommerce: 29,
        finance: 32,
      }[industry] || 35;

    // Scale gap based on revenue (higher revenue = potentially bigger gap)
    const revenueScale = Math.min(Math.log(revenue / 10000) / 10, 1.5);
    return Math.round(baseGap * revenueScale);
  };

  // Calculate estimated monthly revenue loss
  const calculateRevenueGap = () => {
    const percentLoss = calculatePerceptionGap() / 100;
    return Math.round(revenue * percentLoss);
  };

  // Animate gap and loss values when calculating
  useEffect(() => {
    if (stage === 2) {
      const targetGap = calculatePerceptionGap();
      const targetLoss = calculateRevenueGap();

      let gapCounter = 0;
      let lossCounter = 0;

      // Gap animation
      const gapInterval = setInterval(() => {
        if (gapCounter >= targetGap) {
          clearInterval(gapInterval);
          return;
        }
        gapCounter += 1;
        setAnimatedGap(gapCounter);
      }, 30);

      // Loss animation (slower to create dramatic effect)
      const lossInterval = setInterval(() => {
        const increment = Math.max(Math.round(targetLoss / 50), 1000);
        lossCounter = Math.min(lossCounter + increment, targetLoss);
        setAnimatedLoss(lossCounter);

        if (lossCounter >= targetLoss) {
          clearInterval(lossInterval);
        }
      }, 40);

      return () => {
        clearInterval(gapInterval);
        clearInterval(lossInterval);
      };
    }
  }, [stage]);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
              PERCEPTION GAP ANALYSIS
            </h2>
            <h3 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Discover How Much Revenue You're Losing to Perception Issues
            </h3>
            <p className="portfolio-text-balance text-lg text-neutral-400">
              Our proprietary diagnostic tool quickly estimates the revenue gap caused by perception
              misalignment in your specific industry and company size.
            </p>
          </motion.div>
        </div>

        {/* Interactive analyzer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl md:p-12">
            {/* Stage indicator */}
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1">
                <span
                  className={`mr-2 h-2.5 w-2.5 rounded-full ${stage >= 1 ? 'bg-blue-500' : 'bg-neutral-700'}`}
                 />
                <span
                  className={`mr-2 h-2.5 w-2.5 rounded-full ${stage >= 2 ? 'bg-blue-500' : 'bg-neutral-700'}`}
                 />
                <span
                  className={`h-2.5 w-2.5 rounded-full ${stage >= 3 ? 'bg-blue-500' : 'bg-neutral-700'}`}
                 />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Stage 1: Input form */}
              {stage === 1 && (
                <motion.div
                  key="stage1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="mb-6 text-xl font-medium">Tell us about your business</h4>

                  <div className="mb-8">
                    <label className="mb-2 block text-sm font-medium text-neutral-300">
                      Your industry
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {industries.map(ind => (
                        <button
                          key={ind.id}
                          onClick={() => setIndustry(ind.id)}
                          className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${industry === ind.id
                              ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                              : 'border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:border-neutral-600'
                            }`}
                        >
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="mb-2 block text-sm font-medium text-neutral-300">
                      Monthly revenue
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {revenueOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setRevenue(opt.value)}
                          className={`rounded-lg border px-3 py-2 text-sm transition-all ${revenue === opt.value
                              ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                              : 'border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:border-neutral-600'
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStage(2)}
                      className="portfolio-button portfolio-button-primary group"
                    >
                      Calculate My Gap
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Stage 2: Results */}
              {stage === 2 && (
                <motion.div
                  key="stage2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <h4 className="mb-6 text-xl font-medium">Your Perception Gap Analysis</h4>

                  <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-800 bg-neutral-800/30 p-6">
                      <BarChart className="mx-auto mb-4 h-8 w-8 text-blue-400" />
                      <div className="mb-2 text-sm text-neutral-400">Estimated Perception Gap</div>
                      <div className="text-4xl font-bold">{animatedGap}%</div>
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-800/30 p-6">
                      <DollarSign className="mx-auto mb-4 h-8 w-8 text-blue-400" />
                      <div className="mb-2 text-sm text-neutral-400">Monthly Revenue Loss</div>
                      <div className="text-4xl font-bold">{formatCurrency(animatedLoss)}</div>
                    </div>
                  </div>

                  <div className="mb-8 rounded-xl border border-red-900/30 bg-red-950/20 p-6">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-3 mt-1 h-5 w-5 shrink-0 text-red-400" />
                      <p className="text-left text-neutral-300">
                        Based on our database of{' '}
                        {industry === 'saas'
                          ? 'SaaS companies'
                          : industry === 'consulting'
                            ? 'consulting firms'
                            : industry === 'agency'
                              ? 'agencies'
                              : industry === 'ecommerce'
                                ? 'e-commerce businesses'
                                : 'financial services companies'}{' '}
                        with similar revenue profiles, you're likely losing{' '}
                        <span className="font-medium text-white">
                          {formatCurrency(animatedLoss)} per month
                        </span>{' '}
                        due to perception misalignment issues. This translates to{' '}
                        <span className="font-medium text-white">
                          {formatCurrency(animatedLoss * 12)} annually
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setStage(1)}
                      className="portfolio-button portfolio-button-secondary"
                    >
                      Recalculate
                    </button>
                    <button
                      onClick={() => setStage(3)}
                      className="portfolio-button portfolio-button-primary group"
                    >
                      See Recovery Strategy
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Stage 3: Recovery recommendations */}
              {stage === 3 && (
                <motion.div
                  key="stage3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="mb-6 text-xl font-medium">Your Perception Recovery Strategy</h4>

                  <div className="mb-8">
                    <p className="mb-6 text-neutral-300">
                      Based on our analysis of your{' '}
                      {industry === 'saas'
                        ? 'SaaS'
                        : industry === 'consulting'
                          ? 'consulting'
                          : industry === 'agency'
                            ? 'agency'
                            : industry === 'ecommerce'
                              ? 'e-commerce'
                              : 'financial services'}{' '}
                      business with {formatCurrency(revenue)} monthly revenue, here's how we
                      recommend recovering the{' '}
                      <span className="font-medium text-white">
                        {formatCurrency(calculateRevenueGap())}
                      </span>{' '}
                      you're losing each month:
                    </p>

                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-500 text-blue-500">
                            <span className="text-xs font-medium">1</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="mb-1 font-medium text-white">Perception Gap Audit</h5>
                          <p className="text-sm text-neutral-400">
                            A comprehensive analysis of where your value perception is misaligned
                            with your actual value delivery, specifically focusing on{' '}
                            {industry === 'saas'
                              ? 'user interface and pricing structure'
                              : industry === 'consulting'
                                ? 'expertise signaling and outcome communication'
                                : industry === 'agency'
                                  ? 'creative positioning and case study presentation'
                                  : industry === 'ecommerce'
                                    ? 'product presentation and trust indicators'
                                    : 'service tangibility and trust mechanisms'}
                            .
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-500 text-blue-500">
                            <span className="text-xs font-medium">2</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="mb-1 font-medium text-white">
                            Decision Architecture Redesign
                          </h5>
                          <p className="text-sm text-neutral-400">
                            Strategic restructuring of how your value is communicated throughout the
                            customer journey, correcting the symbolic misalignments that are causing
                            the {animatedGap}% perception gap.
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-500 text-blue-500">
                            <span className="text-xs font-medium">3</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="mb-1 font-medium text-white">
                            Implementation & Revenue Recovery
                          </h5>
                          <p className="text-sm text-neutral-400">
                            Targeted implementation of the new perception framework, typically
                            recovering 60-80% of the lost revenue within 60 days and achieving full
                            recovery within 90 days.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 sm:flex-row">
                    <div className="text-sm text-neutral-400">
                      Schedule a 30-minute strategy call to explore your specific situation.
                    </div>
                    <Link
                      href="/contact"
                      className="portfolio-button portfolio-button-primary group"
                    >
                      Book Free Strategy Session
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
