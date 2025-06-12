'use client';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, BookOpen, BarChart2, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { useState } from 'react';
import React from "react";

export default function ConversionPath() {
  // Animation refs
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Form state
  const [email, setEmail] = useState('');
  const [resourceType, setResourceType] = useState('guide');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');

      // Track conversion in analytics
      if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'resource_download', {
          resource_type: resourceType,
        });
      }
    }, 1500);
  };

  // Conversion path options
  const conversionOptions = [
    {
      title: 'Free Strategy Guide',
      description:
        'Download our comprehensive guide to market perception engineering and financial decision architecture.',
      icon: <BookOpen className="h-5 w-5" />,
      value: 'guide',
      cta: 'Get Instant Access',
    },
    {
      title: 'Revenue Gap Calculator',
      description:
        'Use our interactive tool to calculate the financial impact of your perception gap.',
      icon: <BarChart2 className="h-5 w-5" />,
      value: 'calculator',
      cta: 'Calculate My Gap',
    },
    {
      title: 'Strategy Consultation',
      description:
        'Schedule a 30-minute call with our team to discuss your specific challenges and opportunities.',
      icon: <Calendar className="h-5 w-5" />,
      value: 'consultation',
      cta: 'Book My Session',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-neutral-50 py-24 text-neutral-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              NEXT STEPS
            </h2>
            <h3 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Start Your Perception Transformation
            </h3>
            <p className="portfolio-text-balance text-lg text-neutral-600">
              Choose the path that best fits your current needs and start recovering the revenue
              you're losing to perception gaps.
            </p>
          </motion.div>
        </div>

        {/* Conversion options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {conversionOptions.map((option, index) => (
            <div
              key={index}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white"
              >
                {option.icon}
              </div>

              <h4 className="mb-3 text-xl font-medium">{option.title}</h4>

              <p className="mb-6 text-neutral-600">{option.description}</p>

              <button
                onClick={() => setResourceType(option.value)}
                className={`w-full rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors ${resourceType === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
              >
                {option.cta}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Dynamic conversion form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-xl border border-blue-100 bg-white p-8 shadow-md">
            {!isSubmitted ? (
              <>
                <div className="mb-6 flex items-start">
                  <div className="mr-4 mt-1">
                    {resourceType === 'guide' && <BookOpen className="h-6 w-6 text-blue-500" />}
                    {resourceType === 'calculator' && (
                      <BarChart2 className="h-6 w-6 text-blue-500" />
                    )}
                    {resourceType === 'consultation' && (
                      <Calendar className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-medium">
                      {resourceType === 'guide' && 'Get Your Free Strategy Guide'}
                      {resourceType === 'calculator' && 'Access the Revenue Gap Calculator'}
                      {resourceType === 'consultation' && 'Book Your Strategy Session'}
                    </h4>
                    <p className="text-neutral-600">
                      {resourceType === 'guide' &&
                        'Enter your email to receive immediate access to our comprehensive guide on perception engineering.'}
                      {resourceType === 'calculator' &&
                        'Enter your email to access our interactive calculator and discover your potential revenue gap.'}
                      {resourceType === 'consultation' &&
                        'Enter your email to schedule your complimentary 30-minute strategy session with our team.'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your business email"
                        required
                        className="portfolio-input w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="portfolio-button portfolio-button-primary group h-full w-full"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Começar
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="mb-3 text-2xl font-medium">Success!</h4>
                <p className="mb-6 text-neutral-600">
                  {resourceType === 'guide' &&
                    'Your strategy guide has been sent to your email. Check your inbox in the next few minutes.'}
                  {resourceType === 'calculator' &&
                    "You'll receive access to the calculator in your email inbox shortly."}
                  {resourceType === 'consultation' &&
                    "We've received your request. Check your email for available scheduling times."}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Request another resource
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional support option */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center border-t border-neutral-200 pt-6 text-neutral-600">
            <PhoneCall className="mr-2 h-4 w-4" />
            <span>Prefer to speak directly with a specialist? Call us at </span>
            <a href="tel:+15551234567" className="ml-1 font-medium text-blue-600 hover:underline">
              +1 (555) 123-4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
