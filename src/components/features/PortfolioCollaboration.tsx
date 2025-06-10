'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, Mail, MessageCircle, Shield, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

// Collaboration process steps
interface CollaborationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const COLLABORATION_STEPS: CollaborationStep[] = [
  {
    id: 'initial-consultation',
    title: 'Initial Consultation',
    description:
      'A focused 30-minute discussion to understand your current perception challenges and business goals.',
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    id: 'perception-diagnosis',
    title: 'Perception Diagnosis',
    description:
      'In-depth analysis of your current perception-value gaps and their economic impact.',
    icon: <Shield className="h-6 w-6" />,
  },
  {
    id: 'strategic-proposal',
    title: 'Strategic Proposal',
    description:
      'Custom perception engineering plan with specific deliverables, timeline, and expected outcomes.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 'implementation',
    title: 'Collaborative Implementation',
    description:
      'Systematic execution of the perception alignment strategy with regular progress reviews.',
    icon: <Calendar className="h-6 w-6" />,
  },
];

// FAQ items
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How is this different from standard marketing or design services?',
    answer:
      'Traditional marketing focuses on creating attractive assets or general messaging. Perception engineering specifically identifies and corrects the misalignment between your actual value delivery and how that value is perceived in the market. This systematic approach creates measurable economic outcomes by ensuring your expertise and quality are properly recognized before pricing considerations.',
  },
  {
    question: 'What types of businesses benefit most from perception engineering?',
    answer:
      "Companies with high-value, premium offerings that are struggling with price resistance, excessive sales cycles, or lower-than-expected conversion rates benefit most. This is particularly effective for businesses whose technical excellence or quality isn't properly reflected in their market positioning.",
  },
  {
    question: 'How long does it take to see results?',
    answer:
      'Initial perception improvements can be measured within 2-4 weeks of implementation. More comprehensive economic impacts typically become clearly measurable within 60-90 days as new perception systems fully engage with your market.',
  },
  {
    question: 'Do you guarantee results?',
    answer:
      "While specific metrics vary by industry and business model, I offer a concrete performance guarantee on all premium engagements: if we don't achieve at least a 30% improvement in our primary target metric within the agreed timeframe, you receive additional optimization at no extra cost until we reach that threshold.",
  },
];

export default function PortfolioCollaboration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="bg-neutral-50 py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-blue-600">
            Work Together
          </span>
          <h2 className="mb-4 mt-2 font-serif text-4xl text-neutral-900">Collaborative Approach</h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            My approach emphasizes transparency, strategic alignment, and measurable outcomes.
            Here's how we'll work together to transform your market perception.
          </p>
        </motion.div>

        {/* Collaboration process */}
        <div className="mb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COLLABORATION_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
              >
                <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-medium text-white">
                  {index + 1}
                </div>

                <div className="mb-4 inline-block rounded-lg bg-blue-50 p-3 text-blue-600">
                  {step.icon}
                </div>

                <h3 className="mb-3 text-xl font-medium text-neutral-900">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            <div className="bg-neutral-900 p-10 text-white md:p-12">
              <h3 className="mb-6 text-2xl font-medium text-white">
                Begin with a Diagnostic Conversation
              </h3>
              <p className="mb-8 text-neutral-300">
                Start with a focused consultation to determine if there's a meaningful
                perception-value gap impacting your business outcomes.
              </p>

              <div className="mb-10 space-y-4">
                {[
                  'No-obligation initial assessment',
                  'Specific perception gap identification',
                  'Preliminary economic impact estimate',
                  'Transparent collaboration approach',
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0 rounded-full bg-green-500 p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                <Mail className="mr-2 h-5 w-5" />
                Schedule Consultation
              </a>
            </div>

            <div className="p-10 md:p-12">
              <h3 className="mb-6 text-2xl font-medium text-neutral-900">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border border-neutral-200">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span className="font-medium text-neutral-900">{item.question}</span>
                      <ArrowRight
                        className={`h-5 w-5 text-neutral-500 transition-transform ${
                          expandedFAQ === index ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {expandedFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-neutral-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-medium text-neutral-900">
            Ready to Transform Your Market Perception?
          </h3>
          <p className="mx-auto mb-8 max-w-xl text-neutral-600">
            Each day your value isn't properly perceived represents quantifiable financial loss.
            Let's correct that misalignment.
          </p>

          <Link
            href="/diagnose"
            className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Start with a Perception Snapshot™
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
