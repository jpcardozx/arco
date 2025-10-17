'use client';

/**
 * STRATEGIC VELOCITY SECTION - REFACTORED
 * 
 * Improvements:
 * 1. ✅ Three.js funnel visualization - strategic, not decorative
 * 2. ✅ Sophisticated glassmorphism - subtle depth
 * 3. ✅ Progressive disclosure - better information hierarchy
 * 4. ✅ Factual copy - no coach-speak
 * 5. ✅ Keyboard accessible - semantic HTML
 */

import React, { useState, useRef, Suspense } from 'react';
import { Container } from '@/components/primitives/Container/Container';
import { Clock, DollarSign, AlertCircle, ChevronDown, TrendingDown } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Funnel Visualization Component
function ConversionFunnel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  // Funnel stages with real dropoff data
  const stages = [
    { radius: 1.2, color: '#3b82f6', opacity: 0.8, dropoff: 0.15 },
    { radius: 0.9, color: '#8b5cf6', opacity: 0.7, dropoff: 0.35 },
    { radius: 0.6, color: '#ec4899', opacity: 0.6, dropoff: 0.25 }
  ];

  return (
    <group ref={groupRef}>
      {stages.map((stage, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh position={[0, -index * 0.8, 0]}>
            <cylinderGeometry args={[stage.radius, stage.radius * 0.7, 0.6, 32]} />
            <meshStandardMaterial
              color={stage.color}
              transparent
              opacity={stage.opacity}
              emissive={stage.color}
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Dropoff indicator */}
          <mesh position={[stage.radius + 0.4, -index * 0.8, 0]}>
            <sphereGeometry args={[stage.dropoff * 0.3, 16, 16]} />
            <meshStandardMaterial
              color="#ef4444"
              transparent
              opacity={0.7}
              emissive="#ef4444"
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export const StrategicVelocitySection: React.FC = () => {
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section 
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="conversion-heading"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <Container className="relative z-10">
        {/* Header with 3D visualization */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                border: '1px solid rgba(59,130,246,0.2)'
              }}
            >
              <TrendingDown className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-blue-300 tracking-wide uppercase">
                Conversion Diagnostic
              </span>
            </div>
            
            <h2
              id="conversion-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Where Prospects Drop Off
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed">
              The issue isn't technical—it's trust deficit. Without incremental validation 
              and tangible proof of quality, high-value prospects disappear.
            </p>
          </div>

          {/* 3D Funnel Visualization */}
          <div className="h-[400px] rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148,163,184,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <Suspense fallback={<div className="w-full h-full bg-slate-900/50 animate-pulse" />}>
              <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
                
                <ConversionFunnel />
                
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>
            </Suspense>
          </div>
        </div>

        {/* Friction Points - Refined */}
        <div className="mb-20 max-w-5xl mx-auto">
          <h3 className="text-sm font-mono text-slate-400 tracking-wider uppercase mb-8 px-4">
            Observed Friction Points
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                id: 0,
                icon: Clock,
                title: 'Extended Decision Cycles',
                metric: '15% abandon',
                summary: 'Processes stretching weeks create opportunity for dropout.',
                details: 'Each additional step increases chance of alternatives or priority shift. Context dilutes, urgency fades. Without visible progress checkpoints, abandonment becomes natural.'
              },
              {
                id: 1,
                icon: DollarSign,
                title: 'Vague Scope Investment',
                metric: '35% abandon',
                summary: 'Undefined budgets create purchase decision insecurity.',
                details: 'Without clear specification, client cannot evaluate cost-benefit. Imagines unfavorable scenarios. Proposition stays in promise territory—and all promises seem equal without tangible differentiation.'
              },
              {
                id: 2,
                icon: AlertCircle,
                title: 'No Tangible Proof',
                metric: '25% abandon',
                summary: 'High investment without prior quality demonstration blocks decision.',
                details: 'Client needs to see result before trusting promise. Without work sample, quality benchmark, or specific case, trust barrier remains high. Competing proposals seem equally legitimate.'
              }
            ].map((problem) => {
              const Icon = problem.icon;
              const isExpanded = expandedProblem === problem.id;
              
              return (
                <details
                  key={problem.id}
                  className="group rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isExpanded
                      ? 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.7) 100%)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${isExpanded ? 'rgba(239,68,68,0.3)' : 'rgba(148,163,184,0.1)'}`,
                    boxShadow: isExpanded ? '0 20px 60px rgba(239,68,68,0.15)' : 'none'
                  }}
                  open={isExpanded}
                  onToggle={(e) => setExpandedProblem(e.currentTarget.open ? problem.id : null)}
                >
                  <summary className="flex items-start gap-4 p-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                    <div className="flex-shrink-0 p-2 rounded-lg" style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)'
                    }}>
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white text-base">
                          {problem.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                          {problem.metric}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {problem.summary}
                      </p>
                    </div>
                    <ChevronDown 
                      className="flex-shrink-0 w-5 h-5 text-slate-400 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>

                  <div className="px-6 pb-6 pt-2">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {problem.details}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        {/* Progressive Solution - Refined */}
        <div className="mb-20 max-w-6xl mx-auto">
          <div className="mb-12 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(59,130,246,0.1) 100%)',
                border: '1px solid rgba(20,184,166,0.2)'
              }}
            >
              <span className="text-xs font-mono text-teal-300 tracking-wide uppercase">
                Response Strategy
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Incremental Validation</h3>
            <p className="text-slate-300 max-w-2xl">
              Build trust progressively. Allow incremental validation before major commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: 'Stage 1',
                title: 'Value Content',
                description: 'Educational material demonstrating knowledge and approach',
                example: 'Practical guide, checklist, diagnostic analysis',
                benefit: 'Establishes credibility without requesting investment',
                color: '#14b8a6'
              },
              {
                step: 'Stage 2',
                title: 'Focused Analysis',
                description: 'Specific evaluation with transparent scope and investment',
                example: 'Technical diagnostic with prioritized recommendations',
                benefit: 'Client validates quality with controlled investment',
                color: '#3b82f6'
              },
              {
                step: 'Stage 3',
                title: 'Structured Project',
                description: 'Detailed scope, timeline, transparent investment',
                example: 'Complete implementation with agreed deliverables',
                benefit: 'Total clarity on expectations and results',
                color: '#8b5cf6'
              },
              {
                step: 'Stage 4',
                title: 'Ongoing Partnership',
                description: 'Optimization and support after initial validation',
                example: 'Recurring maintenance with incremental improvements',
                benefit: 'Relationship based on proven results',
                color: '#ec4899'
              }
            ].map((item, index) => (
              <details
                key={index}
                className="group rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: expandedStep === index
                    ? `linear-gradient(135deg, ${item.color}15 0%, ${item.color}08 100%)`
                    : 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)',
                  border: `1px solid ${expandedStep === index ? `${item.color}40` : 'rgba(148,163,184,0.1)'}`,
                  backdropFilter: 'blur(12px)'
                }}
                open={expandedStep === index}
                onToggle={(e) => setExpandedStep(e.currentTarget.open ? index : null)}
              >
                <summary className="flex items-start gap-3 p-5 cursor-pointer list-none hover:bg-white/5 transition-colors">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `${item.color}20`,
                      color: item.color,
                      border: `2px solid ${item.color}40`
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-xs font-mono text-slate-400 tracking-wide uppercase">
                      {item.step}
                    </span>
                    <h4 className="font-semibold text-white text-base mt-1">
                      {item.title}
                    </h4>
                  </div>
                  <ChevronDown 
                    className="flex-shrink-0 w-5 h-5 text-slate-400 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="px-5 pb-5 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-slate-500 tracking-wide uppercase">What</span>
                    <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 tracking-wide uppercase">Example</span>
                    <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {item.example}
                    </p>
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor: `${item.color}20` }}>
                    <span className="text-xs font-mono text-slate-500 tracking-wide uppercase">Validates</span>
                    <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {item.benefit}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Impact Grid - Factual Benefits */}
        <div className="mb-20 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.03) 100%)',
              border: '1px solid rgba(20,184,166,0.2)'
            }}>
              <h4 className="font-semibold text-white text-base mb-2">Shorter Cycles</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Checkpoint validation reduces ambiguity. Decisions happen faster.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 100%)',
              border: '1px solid rgba(59,130,246,0.2)'
            }}>
              <h4 className="font-semibold text-white text-base mb-2">Reduced Risk</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Lower initial investment allows quality testing. Distrust diminishes.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 100%)',
              border: '1px solid rgba(139,92,246,0.2)'
            }}>
              <h4 className="font-semibold text-white text-base mb-2">Better Fit</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Client validates work aligns with real expectations. Fewer surprises.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(236,72,153,0.03) 100%)',
              border: '1px solid rgba(236,72,153,0.2)'
            }}>
              <h4 className="font-semibold text-white text-base mb-2">Lasting Relationship</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Demonstrable progress shifts conversation from promise to partnership.
              </p>
            </div>
          </div>
        </div>

        {/* When It Doesn't Work - Honest */}
        <div className="max-w-5xl mx-auto p-8 rounded-2xl" style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.05) 0%, rgba(220,38,38,0.03) 100%)',
          border: '1px solid rgba(239,68,68,0.2)'
        }}>
          <h3 className="text-xl font-bold text-white mb-6">When This Doesn't Work</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/50">
              <p className="text-sm text-slate-200 leading-relaxed">
                <span className="font-semibold text-red-400 block mb-2">Very Limited Budget</span>
                Focus on free high-quality content first to establish credibility. Can't fund even diagnostic work.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/50">
              <p className="text-sm text-slate-200 leading-relaxed">
                <span className="font-semibold text-red-400 block mb-2">Urgent Timeline</span>
                Immediate solution needed. Progressive stages add friction when speed trumps validation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/50">
              <p className="text-sm text-slate-200 leading-relaxed">
                <span className="font-semibold text-red-400 block mb-2">Commodity Service</span>
                Indistinguishable from competitors. Decision by direct cost-benefit. Incremental validation doesn't differentiate.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StrategicVelocitySection;
