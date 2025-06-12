'use client';

import { motion, useInView } from 'framer-motion';
import { Shield, Zap, Target, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import React from "react";

export default function CompetitiveAdvantage() {
  // Animation refs
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Tab state for competitive comparison
  const [activeTab, setActiveTab] = useState(0);

  // Comparison data
  const competitors = [
    {
      type: 'Traditional Design Agencies',
      description:
        'Focus on visual aesthetics without addressing the underlying perception mechanics that drive market behavior and financial decisions.',
      limitations: [
        'Create beautiful designs that fail to convert',
        'Rely on subjective creative direction rather than strategic perception principles',
        'Unable to quantify ROI or financial impact',
        'Treat symptoms (poor design) rather than causes (perception gaps)',
      ],
    },
    {
      type: 'Marketing Consultants',
      description:
        'Provide general marketing advice and tactical execution but lack specialized understanding of perception engineering and its financial impact.',
      limitations: [
        'Generalist approach to market positioning',
        'Rely on outdated positioning frameworks',
        'Superficial understanding of financial decision psychology',
        'Fragmented services without cohesive perception strategy',
      ],
    },
    {
      type: 'Branding Firms',
      description:
        'Create brand identities and guidelines but often miss the critical connection between symbolic elements and financial decision architecture.',
      limitations: [
        'Focus on abstract brand concepts rather than conversion mechanics',
        'Lengthy implementation timeframes (6-12 months)',
        'Inability to measure direct revenue impact',
        'Disconnect between brand assets and purchase psychology',
      ],
    },
  ];

  // ARCO advantage data
  const arcoAdvantages = [
    {
      title: 'Perception Engineering Framework',
      description:
        "Our proprietary methodology that systematically aligns market perception with actual value, creating a premium position that competitors can't easily replicate.",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Financial Decision Architecture',
      description:
        'Strategic design of all touchpoints to optimize the financial decision process, accelerating conversions and reducing friction.',
      icon: <Zap className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Revenue-Focused Implementation',
      description:
        'Rapid 30-60 day implementation framework that delivers measurable revenue impact within the first financial quarter.',
      icon: <Target className="h-5 w-5 text-blue-500" />,
    },
  ];

  return (
    <section ref={sectionRef} className="bg-neutral-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
              DIFERENCIAÇÃO DE MERCADO
            </h2>
            <h3 className="portfolio-text-balance mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Uma abordagem fundamentalmente diferente para percepção de mercado e crescimento de receita
            </h3>
            <p className="portfolio-prose text-lg text-neutral-400">
              Enquanto outros focam em aspectos superficiais da presença de mercado, fomos pioneiros em uma
              metodologia sistemática que conecta diretamente engenharia de percepção a resultados financeiros.
            </p>
          </motion.div>
        </div>

        {/* Competitive comparison tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          {/* Tab buttons */}
          <div className="mb-8 flex flex-wrap gap-2 border-b border-neutral-800">
            {competitors.map((competitor, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 py-3 text-sm font-medium transition-colors ${activeTab === index ? 'text-blue-400' : 'text-neutral-400 hover:text-neutral-300'}`}
              >
                {competitor.type}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left column: Competitor limitations */}
            <div className="rounded-xl border border-neutral-700/50 bg-neutral-800/50 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800">
                  <span className="text-sm font-medium text-neutral-300">{activeTab + 1}</span>
                </div>
                <h4 className="text-xl font-medium">{competitors[activeTab].type}</h4>
              </div>

              <p className="mb-6 text-neutral-400">{competitors[activeTab].description}</p>

              <div className="border-t border-neutral-700/50 pt-6">
                <h5 className="mb-4 text-sm uppercase tracking-wider text-neutral-500">
                  KEY LIMITATIONS
                </h5>

                <ul className="space-y-3">
                  {competitors[activeTab].limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-500/30">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                      </span>
                      <span className="text-sm text-neutral-400">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column: ARCO advantages */}
            <div className="rounded-xl border border-blue-900/20 bg-gradient-to-br from-blue-950/30 to-neutral-900 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-800/50 bg-blue-900/50">
                  <span className="text-blue-400">A</span>
                </div>
                <h4 className="text-xl font-medium text-blue-300">The ARCO Advantage</h4>
              </div>

              <p className="mb-6 text-neutral-400">
                Our approach is fundamentally different, focusing on the strategic alignment of
                perception and value through a proprietary methodology that delivers predictable
                financial results.
              </p>

              <div className="border-t border-blue-900/30 pt-6">
                <h5 className="mb-4 text-sm uppercase tracking-wider text-blue-400">
                  COMPETITIVE ADVANTAGES
                </h5>

                <ul className="space-y-6">
                  {arcoAdvantages.map((advantage, i) => (
                    <li key={i}>
                      <div className="mb-2 flex items-center">
                        <span className="mr-2">{advantage.icon}</span>
                        <h6 className="font-medium text-white">{advantage.title}</h6>
                      </div>
                      <p className="pl-7 text-sm text-neutral-400">{advantage.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center justify-between gap-8 border-t border-neutral-800 pt-10 md:flex-row"
        >
          <div className="max-w-xl">
            <h4 className="mb-2 text-xl font-medium">Pronto para transformar sua percepção de mercado?</h4>
            <p className="text-neutral-400">
              Agende uma consulta sem compromisso para descobrir como nosso framework de engenharia de percepção
              pode desbloquear seu potencial de receita.
            </p>
          </div>

          <Link
            href="/contact"
            className="portfolio-button portfolio-button-primary group min-w-[200px] text-center"
          >
            <span>Agendar Consulta</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
