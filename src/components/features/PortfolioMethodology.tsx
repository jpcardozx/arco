'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Code, Lightbulb, LineChart, Target, Waves } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

// Methodology steps interface
interface MethodologyStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  outcomes: string[];
  accentColor: string;
}

const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: 'analysis',
    title: 'Perception Gap Analysis',
    icon: <Lightbulb className="h-6 w-6" />,
    description:
      'Comprehensive audit of your current perception signals, comparing them to your actual value delivery capabilities.',
    outcomes: [
      'Identification of specific perception-value gaps',
      'Prioritization of high-impact correction opportunities',
      'Market positioning benchmark comparison',
    ],
    accentColor: 'bg-blue-500',
  },
  {
    id: 'framework',
    title: 'Strategic Framework Development',
    icon: <Code className="h-6 w-6" />,
    description:
      'Creation of a custom perception alignment strategy tailored to your specific market position and business objectives.',
    outcomes: [
      'Comprehensive symbolic alignment blueprint',
      'Value transmission sequence mapping',
      'Decision pathway optimization plan',
    ],
    accentColor: 'bg-indigo-500',
  },
  {
    id: 'implementation',
    title: 'Precision Implementation',
    icon: <Target className="h-6 w-6" />,
    description:
      'Systematic deployment of perception-correcting elements across key customer touchpoints.',
    outcomes: [
      'Strategic narrative reconstruction',
      'Visual hierarchy realignment',
      'Decision architecture optimization',
      'Objection preemption systems',
    ],
    accentColor: 'bg-purple-500',
  },
  {
    id: 'measurement',
    title: 'Impact Measurement',
    icon: <LineChart className="h-6 w-6" />,
    description:
      'Rigorous tracking of key metrics to quantify the economic impact of perception alignment.',
    outcomes: [
      'Conversion rate improvement tracking',
      'Sales cycle acceleration measurement',
      'Price position enhancement analysis',
      'Economic impact calculation',
    ],
    accentColor: 'bg-rose-500',
  },
];

export default function PortfolioMethodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      id="methodology"
      ref={containerRef}
      className="relative overflow-hidden bg-neutral-900 py-24 text-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/texture2-bg.png')] opacity-10 mix-blend-soft-light" />
        <div className="grid-pattern absolute inset-0 opacity-5" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:max-w-3xl"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-blue-400">
            Proprietary Process
          </span>
          <h2 className="mb-4 mt-2 font-serif text-4xl text-white">
            Perception Engineering Methodology
          </h2>
          <p className="text-lg text-neutral-300">
            Unlike conventional marketing approaches that focus on general aesthetics or brand
            messaging, my methodology systematically identifies and corrects specific
            perception-value gaps that directly impact your commercial performance.
          </p>
        </motion.div>

        {/* Methodology steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500 opacity-30 md:left-1/2 md:-translate-x-px md:transform" />

          <div className="relative space-y-16 md:space-y-32">
            {METHODOLOGY_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'md:pl-1/2 md:pr-0' : 'md:pr-1/2 md:pl-0'}`}
              >
                {/* Step indicator */}
                <div
                  className={`absolute left-6 top-0 h-12 w-12 rounded-full md:left-1/2 ${step.accentColor} flex -translate-x-1/2 transform items-center justify-center`}
                >
                  <span className="font-mono font-bold text-white">{index + 1}</span>
                </div>

                {/* Content */}
                <div
                  className={`ml-16 pl-8 md:ml-0 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  } rounded-xl border border-neutral-700 bg-neutral-800/50 p-8 backdrop-blur-sm`}
                >
                  <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center">
                    <div
                      className={`rounded-lg p-3 ${step.accentColor.replace('bg-', 'bg-').replace('500', '900')} ${step.accentColor.replace('bg-', 'text-')}`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-medium text-white">{step.title}</h3>
                  </div>

                  <p className="mb-6 text-neutral-300">{step.description}</p>

                  <div>
                    <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-400">
                      Deliverables
                    </h4>
                    <div className="space-y-3">
                      {step.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start">
                          <div className={`${step.accentColor} mr-3 mt-1 rounded-full p-1`}>
                            <ArrowRight className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-neutral-200">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Methodology differentiator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid gap-8 md:mt-32 md:grid-cols-2"
        >
          <div className="rounded-xl border border-neutral-700 bg-neutral-800/70 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-2xl font-medium text-white">Why This Approach Works</h3>
            <p className="mb-6 text-neutral-300">
              Most businesses focus on improving their actual value delivery while neglecting how
              that value is being perceived in the market. This creates increasingly costly
              perception gaps.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-amber-500/20 p-1">
                  <Waves className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg text-white">Systems-Based Approach</h4>
                  <p className="text-sm text-neutral-400">
                    Treats perception as an engineered system rather than creative guesswork
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-amber-500/20 p-1">
                  <Waves className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg text-white">Measurable Outcomes</h4>
                  <p className="text-sm text-neutral-400">
                    Every perception element is connected to specific economic metrics
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-amber-500/20 p-1">
                  <Waves className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg text-white">Decision Science Based</h4>
                  <p className="text-sm text-neutral-400">
                    Leverages cognitive science and decision-making research rather than trends
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64 overflow-hidden rounded-xl border border-neutral-700 md:h-auto">
            <Image
              src="/hero-funnel-heatmap-arco.png"
              alt="Perception engineering visualization"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/30">
              <div className="p-8">
                <h4 className="mb-3 text-xl font-medium text-white">Precision Diagnosis First</h4>
                <p className="mb-6 text-sm text-neutral-300">
                  Every engagement begins with a thorough perception-value gap analysis to identify
                  specific areas where your expertise is not being properly recognized.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20"
                >
                  Request Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
