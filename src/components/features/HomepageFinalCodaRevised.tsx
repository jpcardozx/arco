'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import React from "react";
import {
  Section,
  Heading2,
  Heading3,
  BodyLarge,
  BodyRegular,
  Caption,
  Card,
  Button,
  Grid,
  Stat,
} from '../features/DesignSystem';

export default function HomepageFinalCodaRevised() {
  return (
    <Section className="border-t border-neutral-100 bg-white">
      {/* Clear value statement */}
      <div className="mb-16 text-center">
        <Heading2 className="mb-4 text-neutral-900">
          Converting expertise into{' '}
          <span className="relative inline-block">
            revenue outcomes
            <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-blue-600" />
          </span>{' '}
          through symbolic alignment
        </Heading2>

        <BodyLarge className="mx-auto max-w-2xl text-neutral-700">
          Our proven Immediate Revenue Framework™ transforms how your digital presence communicates
          your true value, removing invisible barriers to conversion at key decision points.
        </BodyLarge>
      </div>

      {/* Concrete results */}
      <Grid cols={3} gap="md" className="mb-16">
        {[
          {
            outcome: 'Higher proposal acceptance rates',
            description:
              'When your expertise is correctly perceived, price objections diminish and proposal acceptance increases.',
            metric: '43%',
            metricLabel: 'average increase',
          },
          {
            outcome: 'Premium positioning at current rates',
            description:
              'Clients suddenly see your current rates as reasonable or even underpriced for the value delivered.',
            metric: '73%',
            metricLabel: 'reduction in price objections',
          },
          {
            outcome: 'Faster decision cycles with less friction',
            description:
              'When perception matches reality, decisions accelerate and sales cycles shorten significantly.',
            metric: '58%',
            metricLabel: 'faster closing times',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="p-8">
                <div className="mb-6">
                  <div className="mb-1 text-3xl font-medium text-blue-600">{item.metric}</div>
                  <Caption className="text-neutral-500">{item.metricLabel}</Caption>
                </div>

                <Heading3 className="mb-3 text-lg font-medium text-neutral-900">
                  {item.outcome}
                </Heading3>

                <BodyRegular className="text-neutral-600">{item.description}</BodyRegular>
              </div>
            </Card>
          </motion.div>
        ))}
      </Grid>

      {/* Clear product feature */}
      <Card variant="dark" className="mb-16 overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10">
            <div className="mb-6 border-b border-neutral-700 pb-6">
              <Heading3 className="mb-2 text-white">ArcSight Snapshot™ — Your First Step</Heading3>
              <BodyRegular className="text-neutral-300">
                The essential diagnostic that reveals exactly where symbolic misalignment is costing
                you revenue
              </BodyRegular>
            </div>

            <ul className="mb-8 space-y-4">
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-white">
                  Identification of 3 critical symbolic friction points in your customer journey
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-white">
                  Detailed video analysis with prioritized correction recommendations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-white">
                  Estimated revenue impact quantification for each issue
                </span>
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <div>
                <Caption className="text-neutral-400">One-time investment</Caption>
                <p className="text-2xl font-medium text-white">$147</p>
              </div>

              <Button
                href="/diagnose"
                variant="secondary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Get your assessment
              </Button>
            </div>
          </div>

          <div className="bg-neutral-800 p-8 md:p-10">
            <h4 className="mb-5 font-medium text-white">The ArcSight Process:</h4>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm text-neutral-300">
                  1
                </div>
                <div>
                  <p className="mb-1 font-medium text-white">Submit your information</p>
                  <p className="text-neutral-400">
                    Complete a brief asset submission form (5 minutes)
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm text-neutral-300">
                  2
                </div>
                <div>
                  <p className="mb-1 font-medium text-white">
                    Receive your analysis within 48 hours
                  </p>
                  <p className="text-neutral-400">
                    Get your comprehensive video walkthrough and action plan
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm text-neutral-300">
                  3
                </div>
                <div>
                  <p className="mb-1 font-medium text-white">Upgrade opportunity (optional)</p>
                  <p className="text-neutral-400">
                    48-hour window to apply your $147 to a premium tier implementation
                  </p>
                </div>
              </li>
            </ul>

            <Card variant="dark" className="mt-8 border-t border-neutral-700 bg-transparent pt-6">
              <div className="px-0">
                <p className="text-sm text-neutral-300">
                  "The ArcSight Snapshot™ revealed three major symbolic friction points we never
                  would have found. Implementing just the first correction increased our conversion
                  rate by 18% within a week."
                </p>
                <p className="mt-2 text-sm text-neutral-400">— CMO, Enterprise SaaS Company</p>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Simple action-focused closing */}
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div className="mb-6 md:mb-0">
          <BodyLarge className="font-medium text-neutral-900">
            Stop losing revenue to perception gaps.
          </BodyLarge>
          <BodyRegular className="text-neutral-500">
            Correct how your expertise is perceived in days, not months.
          </BodyRegular>
        </div>

        <div className="flex items-center gap-10">
          <Button href="/diagnose" variant="link" icon={<ArrowRight className="h-4 w-4" />}>
            Explore how we correct this
          </Button>

          <Caption className="hidden text-neutral-500 md:block">
            Limited to 2–3 projects per cycle
          </Caption>
        </div>
      </div>
    </Section>
  );
}
