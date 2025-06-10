'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';

// -----------------------------------------------------------------------------
// CORE STRATEGIC DATA
// -----------------------------------------------------------------------------

const ARCO_STRATEGIC_DATA = {
  // The three core services with strategic positioning
  SERVICES: [
    {
      id: 'perception_snapshot',
      name: 'Perception Snapshot™',
      price: '$147',
      description:
        'Diagnostic with identification of key perception gaps and one applied correction example.',
      strategic_purpose:
        'Identify the exact points where market perception fails to recognize your delivered value',
      economic_impact: 'Direct visibility into perception-value gaps that create financial leakage',
      time_investment: '3-5 days',
      ideal_for: 'Companies experiencing pricing pressure despite technical excellence',
      progression_level: 'Entry',
      priority: true,
    },
    {
      id: 'authority_realignment',
      name: 'Authority Realignment Plan™',
      price: '$1,197',
      description:
        'Expanded diagnosis + complete symbolic map + correction of 2 key assets + 30-min strategy session.',
      strategic_purpose:
        'Create a complete blueprint for perception correction with prioritized implementation path',
      economic_impact:
        '85% reduction in conversion friction and 65% improvement in value perception',
      time_investment: '10-14 days',
      ideal_for: 'Technical leaders whose expertise is undervalued in market positioning',
      progression_level: 'Strategic',
    },
    {
      id: 'modular_authority',
      name: 'Modular Authority Suite',
      price: '$6,000',
      description: 'Premium landing page + institutional deck + microsite + complete symbolic kit.',
      strategic_purpose:
        'Full implementation of your authority positioning with comprehensive symbolic alignment',
      economic_impact:
        '2.3× average pricing power increase and 47% reduction in sales cycle length',
      time_investment: '30-45 days',
      ideal_for: 'Organizations ready for comprehensive perception-value alignment',
      progression_level: 'Comprehensive',
    },
  ],

  // Economic problems that the services solve
  PERCEPTION_PROBLEMS: [
    {
      id: 'underpricing',
      title: 'Systematic Underpricing',
      description:
        'Technical excellence filtered through inadequate symbolic representation commands significantly lower prices than its actual value delivery warrants.',
      metrics: [
        { label: 'Premium Service Underpricing', value: '43%' },
        { label: 'Discount Request Frequency', value: '4.2×' },
      ],
      service_connection: 'perception_snapshot',
    },
    {
      id: 'decision_friction',
      title: 'Decision Friction',
      description:
        'Misaligned symbolism creates conversion barriers that extend sales cycles and introduce unnecessary decision hesitation.',
      metrics: [
        { label: 'Extended Decision Cycles', value: '3.7×' },
        { label: 'Conversion Rate Suppression', value: '62%' },
      ],
      service_connection: 'authority_realignment',
    },
    {
      id: 'market_misalignment',
      title: 'Market Misalignment',
      description:
        'Technical superiority is incorrectly positioned in lower market tiers due to inadequate symbolic transmission of value signals.',
      metrics: [
        { label: 'Incorrect Market Categorization', value: '78%' },
        { label: 'Brand Power Underutilization', value: '3.1×' },
      ],
      service_connection: 'modular_authority',
    },
  ],

  // Evidence of market transformation
  TRANSFORMATION_EVIDENCE: [
    {
      client: 'Nova Ipê',
      industry: 'Premium E-commerce',
      challenge: 'Technical excellence filtered through mid-tier visual signaling',
      transformation: 'Information hierarchy realignment and value signaling reconstruction',
      results: {
        'Conversion Rate': { before: '1.9%', after: '8.2%' },
        'Average Order Value': { before: '$67', after: '$110' },
        'Discount Requests': { before: '72%', after: '18%' },
      },
      service_used: 'authority_realignment',
    },
    {
      client: 'Project Xora',
      industry: 'Enterprise SaaS',
      challenge: 'Complex technical excellence obscuring strategic value',
      transformation: 'Narrative realignment and decision-path reconstruction',
      results: {
        'Executive Engagement': { before: '12%', after: '87%' },
        'Pricing Power': { before: 'Standard', after: '2.3× Premium' },
        'Technical Objections': { before: '63%', after: '7%' },
      },
      service_used: 'modular_authority',
    },
  ],

  // Intellectual foundation that positions partner as authority
  METHODOLOGY_FOUNDATION: {
    premise:
      'Technical excellence remains financially undervalued when filtered through inadequate symbolic representation.',
    approach: [
      {
        title: 'Perception Reading',
        description:
          'Precise diagnosis of gaps between delivered value and perceived value through systematic symbolic analysis.',
      },
      {
        title: 'Strategic Realignment',
        description: 'Correction of symbolic elements that create perception-value gaps.',
      },
      {
        title: 'Economic Measurement',
        description: 'Continuous quantification of financial impact through conversion metrics.',
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// TYPOGRAPHY SYSTEM
// -----------------------------------------------------------------------------

interface TypographyProps {
  children: React.ReactNode;
  element?: keyof React.JSX.IntrinsicElements;
  size?: string;
  className?: string;
  [key: string]: unknown;
}

const Typography = {
  Editorial: ({
    children,
    element = 'p',
    size = 'md',
    className = '',
    ...props
  }: TypographyProps) => {
    const Element = element as unknown;
    const sizes: { [key: string]: string } = {
      xs: 'text-sm leading-relaxed',
      sm: 'text-base leading-relaxed',
      md: 'text-lg leading-relaxed',
      lg: 'text-xl leading-relaxed',
      xl: 'text-2xl leading-relaxed',
      '2xl': 'text-3xl leading-snug',
      '3xl': 'text-4xl leading-snug',
    };

    return (
      <Element className={`font-serif ${sizes[size]} ${className}`} {...props}>
        {children}
      </Element>
    );
  },

  Technical: ({
    children,
    element = 'p',
    size = 'md',
    className = '',
    ...props
  }: TypographyProps) => {
    const Element = element as unknown;
    const sizes: { [key: string]: string } = {
      xs: 'text-sm leading-normal',
      sm: 'text-base leading-normal',
      md: 'text-lg leading-normal',
      lg: 'text-xl leading-normal',
      xl: 'text-2xl leading-normal',
    };

    return (
      <Element className={`font-sans ${sizes[size]} ${className}`} {...props}>
        {children}
      </Element>
    );
  },

  Data: ({
    children,
    element = 'span',
    size = 'md',
    className = '',
    ...props
  }: TypographyProps) => {
    const Element = element as unknown;
    const sizes: { [key: string]: string } = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    return (
      <Element
        className={`font-mono tabular-nums tracking-tight ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Element>
    );
  },
};

// Editorial section title that sets the intellectual framework
const SectionTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Typography.Editorial
    element="h2"
    size="2xl"
    className={`mb-10 max-w-3xl leading-snug text-gray-100 ${className}`}
  >
    {children}
  </Typography.Editorial>
);

// Label for adding context to sections
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography.Technical
    element="div"
    size="xs"
    className="mb-3 uppercase tracking-wider text-gray-500"
  >
    {children}
  </Typography.Technical>
);

// Subtle progress indicator
const ProgressIndicator = ({ steps, currentStep }: { steps: number; currentStep: number }) => (
  <div className="my-4 flex gap-1">
    {Array.from({ length: steps }).map((_, i) => (
      <div
        key={i}
        className={`h-0.5 w-6 transition-colors duration-300 ${
          i < currentStep ? 'bg-gray-400' : 'bg-gray-800'
        }`}
       />
    ))}
  </div>
);

// -----------------------------------------------------------------------------
// STRATEGIC COMPONENTS
// -----------------------------------------------------------------------------

// Problem component that connects to service
interface ProblemCardProps {
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  currentService: string;
  serviceConnection: string;
  index: number;
}

const ProblemCard = ({
  title,
  description,
  metrics,
  currentService,
  serviceConnection,
  index,
}: ProblemCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isActive = currentService === serviceConnection;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg border transition-all duration-300 ${
        isActive ? 'border-gray-700 bg-gray-800/90 shadow-lg' : 'border-gray-800 bg-gray-900/60'
      }`}
    >
      <div className="p-6">
        <Typography.Editorial
          element="h3"
          size="lg"
          className={`mb-3 ${isActive ? 'text-white' : 'text-gray-300'}`}
        >
          {title}
        </Typography.Editorial>

        <Typography.Technical
          element="p"
          size="md"
          className={`mb-6 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}
        >
          {description}
        </Typography.Technical>

        <div className="mb-2 flex flex-wrap gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <Typography.Data
                element="div"
                size="lg"
                className={isActive ? 'text-white' : 'text-gray-400'}
              >
                {metric.value}
              </Typography.Data>
              <Typography.Technical element="div" size="xs" className="text-gray-500">
                {metric.label}
              </Typography.Technical>
            </div>
          ))}
        </div>
      </div>

      {isActive && (
        <div className="rounded-b-lg border-t border-gray-700 bg-gray-800/50 px-6 py-3">
          <Typography.Technical element="div" size="sm" className="flex items-center text-gray-400">
            <span className="mr-2 h-2 w-2 rounded-full bg-gray-400" />
            Addressed by {ARCO_STRATEGIC_DATA.SERVICES.find(s => s.id === serviceConnection)?.name}
          </Typography.Technical>
        </div>
      )}
    </motion.div>
  );
};

// Service card with strategic positioning
interface ServiceCardProps {
  service: (typeof ARCO_STRATEGIC_DATA.SERVICES)[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const ServiceCard = ({ service, isActive, onClick, index }: ServiceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${
        isActive
          ? 'border-gray-700 bg-gray-800/90 shadow-lg ring-1 ring-gray-700/50'
          : 'border-gray-800 bg-gray-900/60 hover:bg-gray-900/90'
      } cursor-pointer rounded-lg border transition-all duration-300`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <Typography.Technical
            element="div"
            size="xs"
            className="uppercase tracking-wider text-gray-500"
          >
            {service.progression_level}
          </Typography.Technical>

          <Typography.Data
            element="div"
            size="lg"
            className={isActive ? 'text-white' : 'text-gray-400'}
          >
            {service.price}
          </Typography.Data>
        </div>

        <Typography.Editorial
          element="h3"
          size="lg"
          className={`mb-3 ${isActive ? 'text-white' : 'text-gray-300'}`}
        >
          {service.name}
        </Typography.Editorial>

        <Typography.Technical
          element="p"
          size="md"
          className={`mb-6 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}
        >
          {service.description}
        </Typography.Technical>

        {isActive && (
          <div className="mt-6 space-y-4 border-t border-gray-700/50 pt-6">
            <div>
              <Typography.Technical
                element="div"
                size="xs"
                className="mb-1 uppercase tracking-wider text-gray-500"
              >
                Strategic Purpose
              </Typography.Technical>
              <Typography.Technical element="div" size="sm" className="text-gray-300">
                {service.strategic_purpose}
              </Typography.Technical>
            </div>

            <div>
              <Typography.Technical
                element="div"
                size="xs"
                className="mb-1 uppercase tracking-wider text-gray-500"
              >
                Economic Impact
              </Typography.Technical>
              <Typography.Technical element="div" size="sm" className="text-gray-300">
                {service.economic_impact}
              </Typography.Technical>
            </div>

            <div className="flex items-center justify-between">
              <Typography.Technical element="div" size="xs" className="text-gray-500">
                {service.time_investment}
              </Typography.Technical>

              <Link
                href="/diagnose"
                className="rounded-md bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600"
              >
                Request assessment
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Evidence card that shows transformation
interface EvidenceCardProps {
  evidence: (typeof ARCO_STRATEGIC_DATA.TRANSFORMATION_EVIDENCE)[0];
  isActive: boolean;
}

const EvidenceCard = ({ evidence, isActive }: EvidenceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Get the service name for display
  const serviceName =
    ARCO_STRATEGIC_DATA.SERVICES.find(s => s.id === evidence.service_used)?.name || '';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20,
        scale: isActive ? 1 : 0.98,
      }}
      transition={{ duration: 0.5 }}
      className={`${
        isActive ? 'border-gray-700 bg-gray-800/90 shadow-lg' : 'border-gray-800 bg-gray-900/60'
      } rounded-lg border transition-all duration-300`}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <Typography.Technical element="div" size="xs" className="text-gray-500">
            {evidence.industry}
          </Typography.Technical>

          <div
            className={`rounded-full px-3 py-1 ${
              isActive ? 'bg-gray-700 text-gray-300' : 'bg-gray-800 text-gray-500'
            }`}
          >
            <Typography.Technical element="span" size="xs">
              {serviceName}
            </Typography.Technical>
          </div>
        </div>

        <Typography.Editorial
          element="h3"
          size="lg"
          className={`mb-4 ${isActive ? 'text-white' : 'text-gray-300'}`}
        >
          {evidence.client}
        </Typography.Editorial>

        <div className="mb-6">
          <Typography.Technical
            element="div"
            size="xs"
            className="mb-1 uppercase tracking-wider text-gray-500"
          >
            Challenge
          </Typography.Technical>
          <Typography.Technical
            element="p"
            size="sm"
            className={isActive ? 'text-gray-300' : 'text-gray-400'}
          >
            {evidence.challenge}
          </Typography.Technical>
        </div>

        <div className="mb-6">
          <Typography.Technical
            element="div"
            size="xs"
            className="mb-1 uppercase tracking-wider text-gray-500"
          >
            Transformation
          </Typography.Technical>
          <Typography.Technical
            element="p"
            size="sm"
            className={isActive ? 'text-gray-300' : 'text-gray-400'}
          >
            {evidence.transformation}
          </Typography.Technical>
        </div>

        {isActive && (
          <div className="mt-6 border-t border-gray-700/50 pt-6">
            <Typography.Technical
              element="div"
              size="xs"
              className="mb-3 uppercase tracking-wider text-gray-500"
            >
              Results
            </Typography.Technical>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Object.entries(evidence.results).map(([metric, values]) => (
                <div key={metric} className="rounded-md bg-gray-900/80 p-3">
                  <Typography.Technical element="div" size="xs" className="mb-2 text-gray-400">
                    {metric}
                  </Typography.Technical>

                  <div className="flex items-center gap-2">
                    <Typography.Data element="span" size="sm" className="text-gray-500">
                      {values.before}
                    </Typography.Data>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-700"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <Typography.Data element="span" size="sm" className="text-white">
                      {values.after}
                    </Typography.Data>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function SobreMim() {
  // Track active states for strategic storytelling
  const [activeService, setActiveService] = useState(ARCO_STRATEGIC_DATA.SERVICES[0].id);
  const [activeEvidence, setActiveEvidence] = useState(0);

  // Get the current service information
  const currentService = ARCO_STRATEGIC_DATA.SERVICES.find(s => s.id === activeService);

  // Cycle through evidence to demonstrate breadth
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEvidence(prev =>
        prev === ARCO_STRATEGIC_DATA.TRANSFORMATION_EVIDENCE.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300">
      <div className="relative px-6 py-24 md:px-12">
        {/* Editorial background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />

        <div className="absolute right-0 top-0 -z-10 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-gray-800/20 to-gray-900/20 opacity-20 blur-3xl" />

        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-gray-800/15 to-gray-900/15 opacity-15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          {/* Introduction Section */}
          <section className="mb-24">
            <Typography.Editorial
              element="h1"
              size="3xl"
              className="mb-6 max-w-3xl leading-snug text-gray-100"
            >
              Technical excellence remains financially undervalued when filtered through inadequate
              symbolic representation.
            </Typography.Editorial>

            <Typography.Technical element="p" size="lg" className="mb-12 max-w-2xl text-gray-400">
              This creates quantifiable gaps between actual value delivery and market perception,
              resulting in systematic underpricing and reduced conversion rates.
            </Typography.Technical>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {ARCO_STRATEGIC_DATA.PERCEPTION_PROBLEMS.map((problem, index) => (
                <ProblemCard
                  key={problem.id}
                  title={problem.title}
                  description={problem.description}
                  metrics={problem.metrics}
                  currentService={activeService}
                  serviceConnection={problem.service_connection}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-24">
            <SectionLabel>Structured Approach</SectionLabel>

            <SectionTitle>Strategic Services for Perception Alignment</SectionTitle>

            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {ARCO_STRATEGIC_DATA.SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActive={activeService === service.id}
                  onClick={() => setActiveService(service.id)}
                  index={index}
                />
              ))}
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
              <Typography.Editorial element="h3" size="lg" className="mb-4 text-gray-100">
                The Perception Correction Framework
              </Typography.Editorial>

              <Typography.Technical element="p" size="md" className="mb-6 text-gray-400">
                {ARCO_STRATEGIC_DATA.METHODOLOGY_FOUNDATION.premise}
              </Typography.Technical>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {ARCO_STRATEGIC_DATA.METHODOLOGY_FOUNDATION.approach.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800">
                      <Typography.Data className="text-gray-400">{index + 1}</Typography.Data>
                    </div>
                    <div>
                      <Typography.Editorial element="h4" size="md" className="mb-2 text-gray-200">
                        {step.title}
                      </Typography.Editorial>
                      <Typography.Technical element="p" size="sm" className="text-gray-500">
                        {step.description}
                      </Typography.Technical>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evidence Section */}
          <section className="mb-24">
            <SectionLabel>Transformation Evidence</SectionLabel>

            <SectionTitle>Documented Value-Perception Alignment</SectionTitle>

            <ProgressIndicator
              steps={ARCO_STRATEGIC_DATA.TRANSFORMATION_EVIDENCE.length}
              currentStep={activeEvidence + 1}
            />

            <div className="grid grid-cols-1 gap-8">
              {ARCO_STRATEGIC_DATA.TRANSFORMATION_EVIDENCE.map((evidence, index) => (
                <EvidenceCard
                  key={evidence.client}
                  evidence={evidence}
                  isActive={index === activeEvidence}
                />
              ))}
            </div>
          </section>

          {/* Call To Action Section */}
          <section>
            <div className="rounded-lg border border-gray-700 bg-gray-800/70 p-8 text-center">
              <Typography.Editorial element="h2" size="xl" className="mb-4 text-white">
                Begin with a Precise Diagnosis
              </Typography.Editorial>

              <Typography.Technical
                element="p"
                size="md"
                className="mx-auto mb-8 max-w-2xl text-gray-300"
              >
                Each day of perception-value misalignment represents quantifiable financial loss.
                The Perception Snapshot™ provides immediate visibility into specific gaps between
                your delivered value and market perception.
              </Typography.Technical>

              <div className="inline-flex flex-col items-center">
                <Link
                  href="/diagnose"
                  className="mb-3 rounded-md bg-gray-700 px-6 py-3 text-white transition-colors hover:bg-gray-600"
                >
                  Request Perception Snapshot™ ($147)
                </Link>
                <Typography.Technical element="span" size="xs" className="text-gray-500">
                  3-5 day diagnostic with economic impact assessment
                </Typography.Technical>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
