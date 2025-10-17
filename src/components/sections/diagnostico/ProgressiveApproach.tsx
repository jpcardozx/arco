/**
 * PROGRESSIVE APPROACH TIMELINE
 * 
 * Interactive 3D timeline showing validation stages
 * Strategic progression - not inspirational fluff
 */

'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { CheckCircle2, ArrowRight } from 'lucide-react'

// Real stages - with actual deliverables
const stages = [
  {
    number: 1,
    title: 'Public Content',
    deliverable: 'Technical articles, case studies, documented work',
    investment: 'Zero cost',
    validation: 'Expertise signal',
    outcome: 'Initial credibility established',
    color: '#14b8a6'
  },
  {
    number: 2,
    title: 'Diagnostic Session',
    deliverable: 'Detailed audit, actionable recommendations',
    investment: 'Low fixed fee',
    validation: 'Quality of analysis',
    outcome: 'Clear problem identification',
    color: '#3b82f6'
  },
  {
    number: 3,
    title: 'Scoped Project',
    deliverable: 'Defined deliverables, timeline, success metrics',
    investment: 'Medium fixed scope',
    validation: 'Execution quality',
    outcome: 'Measurable results',
    color: '#8b5cf6'
  },
  {
    number: 4,
    title: 'Ongoing Partnership',
    deliverable: 'Continuous optimization, strategic guidance',
    investment: 'Retained engagement',
    validation: 'Long-term impact',
    outcome: 'Compound growth',
    color: '#ec4899'
  }
]

// 3D Stage Node Component
function StageNode({ 
  position, 
  color, 
  isActive, 
  number 
}: { 
  position: [number, number, number]
  color: string
  isActive: boolean
  number: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.2}
          transparent
          opacity={isActive ? 1 : 0.6}
        />
      </Sphere>
      
      {/* Ring effect when active */}
      {isActive && (
        <Sphere args={[0.5, 32, 32]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            wireframe
          />
        </Sphere>
      )}
    </group>
  )
}

// 3D Timeline Scene
function TimelineScene({ activeStage }: { activeStage: number }) {
  const positions: [number, number, number][] = [
    [-3, 0, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [3, 0, 0]
  ]

  const linePoints = positions.map(pos => new THREE.Vector3(...pos))

  return (
    <>
      {/* Connection line */}
      <Line
        points={linePoints}
        color="rgba(148,163,184,0.3)"
        lineWidth={2}
      />

      {/* Stage nodes */}
      {stages.map((stage, index) => (
        <StageNode
          key={index}
          position={positions[index]}
          color={stage.color}
          isActive={activeStage === index}
          number={stage.number}
        />
      ))}
    </>
  )
}

export function ProgressiveApproach() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <section className="relative py-32 bg-slate-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Validation Before Investment
          </h2>
          <p className="text-xl text-slate-400">
            Progressive checkpoints. Each stage validates quality before next commitment.
          </p>
        </motion.div>

        {/* 3D Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[300px] mb-16 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30,41,59,0.3) 0%, rgba(15,23,42,0.5) 100%)',
            border: '1px solid rgba(148,163,184,0.1)'
          }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            
            <TimelineScene activeStage={activeStage} />
          </Canvas>
        </motion.div>

        {/* Stage Details - Interactive */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setActiveStage(index)}
              className="group relative p-6 rounded-xl cursor-pointer transition-all duration-300"
              style={{
                background: activeStage === index
                  ? `linear-gradient(135deg, ${stage.color}15 0%, ${stage.color}08 100%)`
                  : 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)',
                border: `1px solid ${activeStage === index ? `${stage.color}40` : 'rgba(148,163,184,0.1)'}`,
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Stage number indicator */}
              <div 
                className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 font-bold"
                style={{
                  background: `${stage.color}20`,
                  color: stage.color,
                  border: `2px solid ${stage.color}40`
                }}
              >
                {stage.number}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {stage.title}
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">Deliverable</span>
                  <p className="text-slate-300 mt-1">{stage.deliverable}</p>
                </div>

                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">Investment</span>
                  <p className="text-slate-300 mt-1">{stage.investment}</p>
                </div>

                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">Validates</span>
                  <p className="text-slate-300 mt-1">{stage.validation}</p>
                </div>
              </div>

              {/* Outcome badge */}
              <div 
                className="mt-4 pt-4 border-t flex items-center gap-2"
                style={{ borderColor: `${stage.color}20` }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: stage.color }} />
                <span className="text-xs text-slate-400">{stage.outcome}</span>
              </div>

              {/* Arrow to next stage */}
              {index < stages.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-slate-600" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits grid - factual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          <div className="p-8 rounded-xl" style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.03) 100%)',
            border: '1px solid rgba(20,184,166,0.2)'
          }}>
            <h4 className="text-xl font-semibold text-white mb-3">When This Works</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• High-consideration purchases requiring trust</li>
              <li>• Complex services with unclear quality signals</li>
              <li>• Buyers who value demonstrated expertise</li>
              <li>• Projects where scope discovery is critical</li>
            </ul>
          </div>

          <div className="p-8 rounded-xl" style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.03) 100%)',
            border: '1px solid rgba(239,68,68,0.2)'
          }}>
            <h4 className="text-xl font-semibold text-white mb-3">When It Doesn't</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Urgent needs requiring immediate execution</li>
              <li>• Commodity services differentiated only by price</li>
              <li>• Very limited budgets unable to fund even diagnostics</li>
              <li>• Buyers who've already decided on solution</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
