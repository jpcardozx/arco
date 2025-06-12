'use client';

import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import React from "react";
import { useTranslation } from '@/lib/i18n/context';

export default function EnhancedCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-cta)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Main CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t('homepage.cta.title')}</h2>

              <p className="mb-8 max-w-lg text-xl text-blue-100">{t('homepage.cta.subtitle')}</p>

              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/diagnose"
                  className="group inline-flex items-center rounded-lg bg-white px-8 py-4 font-medium text-blue-900 shadow-xl shadow-blue-900/20 transition-colors hover:bg-blue-50"
                >
                  <span>{t('homepage.cta.buttonText')}</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/process"
                  className="inline-flex items-center rounded-lg border-2 border-white/30 px-8 py-4 transition-colors hover:bg-white/10"
                >
                  <span>{t('common.buttons.learnMore')}</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-300">
                    <CheckCircleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Fast Implementation</h4>
                    <p className="text-sm text-blue-200">Ready within 5 business days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-300">
                    <CheckCircleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Guaranteed Results</h4>
                    <p className="text-sm text-blue-200">Or your money back</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Sales Alert */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center">
                <div className="mr-4 rounded-lg bg-red-500/20 p-3">
                  <AlertTriangle className="h-6 w-6 text-red-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sales Funnel Alert</h3>
                  <p className="text-sm text-blue-200">Significant drop-off detected at checkout</p>
                </div>
              </div>

              <div className="mb-6 space-y-6">
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-200">Cart Abandonment</span>
                    <span className="font-semibold text-red-300">73.4%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-red-400" style={{ width: '73.4%' }} />
                  </div>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-200">
                      Lost Revenue (Monthly)
                    </span>
                    <span className="font-semibold text-red-300">$46,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-300">Previous: $32,800</span>
                    <span className="text-xs text-red-300">+41% ↑</span>
                  </div>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-200">Recovery Potential</span>
                    <span className="font-semibold text-green-300">$31,400</span>
                  </div>
                  <div className="h-8 w-full overflow-hidden rounded-lg bg-white/10">
                    <div className="h-full bg-green-400/20" style={{ width: '68%' }}>
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                        style={{ width: '80%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-center font-medium text-white transition-all hover:from-indigo-600 hover:to-blue-700 hover:shadow-lg">
                Start Recovery Process
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for the check icon
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
