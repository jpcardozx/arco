'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';
import React from "react";

export default function ProblemSolution() {
  return (
    <section className="border-t border-neutral-100 bg-white py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left column: The Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-serif text-3xl text-neutral-900 md:text-4xl">
              The gap between expertise and perception
              <br />
              is costing you premium conversions
            </h2>

            <div className="mb-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-red-600">31%</p>
                  <p className="text-sm text-neutral-600">Visitors leave too soon</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">48%</p>
                  <p className="text-sm text-neutral-600">Price objections rise</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">$147K</p>
                  <p className="text-sm text-neutral-600">Monthly revenue gap</p>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-medium text-neutral-900">
              Common symbolic misalignments we correct:
            </h3>

            <ul className="mb-8 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <span className="block h-2 w-2 rounded-full bg-red-600" />
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Value-perception disconnects</p>
                  <p className="text-neutral-600">
                    When your expertise isn't visibly matched in your presentation
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <span className="block h-2 w-2 rounded-full bg-red-600" />
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Trust signal misplacement</p>
                  <p className="text-neutral-600">
                    When critical validation appears too late in decision processes
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <span className="block h-2 w-2 rounded-full bg-red-600" />
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Price-value dissonance</p>
                  <p className="text-neutral-600">
                    When your pricing appears disconnected from perceived value
                  </p>
                </div>
              </li>
            </ul>

            <blockquote className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-5 italic text-blue-900">
              "Every symbolic misalignment in your customer journey is costing you $10,000-50,000
              monthly. Fixing them doesn't require redesign—just precise correction."
            </blockquote>
          </motion.div>

          {/* Right column: Our Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8">
              <h3 className="mb-6 text-2xl font-medium text-neutral-900">
                Our Strategic Correction Process
              </h3>

              <div className="mb-8 space-y-6">
                <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      1
                    </div>
                    <h4 className="text-lg font-medium text-neutral-900">
                      ArcSight Snapshot™ ($147)
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-14">
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Complete symbolic friction point identification</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Revenue impact quantification for each issue</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Prioritized correction roadmap</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      2
                    </div>
                    <h4 className="text-lg font-medium text-neutral-900">
                      Friction Removal Kit™ ($897)
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-14">
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Implementation of 3 highest-impact corrections</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>A/B testing of symbolic alignments</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Detailed implementation guidelines</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      3
                    </div>
                    <h4 className="text-lg font-medium text-neutral-900">
                      Strategic Repositioning™ ($1,497)
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-14">
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Complete symbolic architecture overhaul</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>End-to-end customer journey correction</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-700">
                      <FiCheckCircle className="flex-shrink-0 text-green-500" />
                      <span>Comprehensive conversion tracking system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Case Study Preview */}
        <div className="mt-20">
          <h3 className="mb-6 text-center font-serif text-2xl text-neutral-900">
            Recent client results
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                client: 'QuickCommerce',
                industry: 'E-Commerce',
                improvement: '46% faster mobile experience',
                result: '$178,500 monthly revenue increase',
                timeframe: '3 weeks',
              },
              {
                client: 'TechSolutions SaaS',
                industry: 'Software',
                improvement: '52% Core Web Vitals improvement',
                result: '37% higher trial conversions',
                timeframe: '2 weeks',
              },
              {
                client: 'GlobalRetail',
                industry: 'Retail Chain',
                improvement: '39% checkout performance boost',
                result: '$215,000 quarterly revenue lift',
                timeframe: '4 weeks',
              },
            ].map((case_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
              >
                <div className="h-2 bg-blue-600" />
                <div className="p-6">
                  <p className="text-sm text-neutral-500">{case_.industry}</p>
                  <h4 className="mb-4 text-xl font-medium text-neutral-900">{case_.client}</h4>

                  <div className="mb-4 space-y-4">
                    <div className="flex items-start gap-2">
                      <FiCheckCircle className="mt-1 flex-shrink-0 text-green-500" />
                      <p className="text-neutral-700">{case_.improvement}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheckCircle className="mt-1 flex-shrink-0 text-green-500" />
                      <p className="text-neutral-700">Implementation: {case_.timeframe}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border-l-2 border-green-500 bg-green-50 p-4">
                    <p className="font-medium text-green-800">{case_.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
