/**
 * CONVERSION DIAGNOSTIC SECTION
 * 
 * Three.js funnel visualization showing actual friction points
 * Interactive data visualization - no coach-speak
 */

'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Real friction data - not aspirational nonsense
const frictionData = [
  {
    stage: 'Initial Contact',
    dropoff: 0.15,
    reason: 'Vague scope, unclear deliverables',
    metric: '15% abandon before quote'
  },
  {
    stage: 'Proposal Review',
    dropoff: 0.35,
    reason: 'High upfront investment, no validation',
    metric: '35% abandon at proposal'
  },
  {
    stage: 'Decision Point',
    dropoff: 0.25,
    reason: 'Extended cycles, competitive pressure',
    metric: '25% abandon during decision'
  }
]

// 3D Funnel visualization component
function FunnelVisualization() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  const funnelSegments = useMemo(() => {
    return frictionData.map((data, index) => {
      const topRadius = 2 - index * 0.5
      const bottomRadius = 1.5 - index * 0.5
      const height = 2

      return (
        <group key={index} position={[0, -index * 2.2, 0]}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh>
              <cylinderGeometry args={[topRadius, bottomRadius, height, 32]} />
              <meshStandardMaterial
                color={new THREE.Color().setHSL(0.6 - index * 0.15, 0.7, 0.5)}
                transparent
                opacity={0.7}
                wireframe={false}
              />
            </mesh>
            
            {/* Dropout visualization */}
            <mesh position={[topRadius + 0.5, 0, 0]}>
              <sphereGeometry args={[data.dropoff * 0.8, 16, 16]} />
              <meshStandardMaterial
                color="#ff6b6b"
                transparent
                opacity={0.6}
                emissive="#ff6b6b"
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        </group>
      )
    })
  }, [])

  return (
    <group ref={groupRef}>
      {funnelSegments}
    </group>
  )
}

export function ConversionDiagnostic() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - factual, not grandiose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Where Prospects Drop Off
          </h2>
          <p className="text-xl text-slate-400">
            The issue isn't technical capability—it's trust deficit.
            Without incremental validation, high-value prospects disappear.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[600px] rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148,163,184,0.1)'
            }}
          >
            <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
              
              <FunnelVisualization />
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
              />
            </Canvas>
          </motion.div>

          {/* Friction Points - data-driven */}
          <div className="space-y-6">
            {frictionData.map((friction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.7) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(148,163,184,0.1)'
                }}
              >
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(168,85,247,0.05) 100%)',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      {friction.stage}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                      {friction.metric}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {friction.reason}
                  </p>

                  {/* Progress bar showing dropoff */}
                  <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${friction.dropoff * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Solution preview - factual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(59,130,246,0.1) 100%)',
                border: '1px solid rgba(20,184,166,0.3)'
              }}
            >
              <h4 className="text-white font-semibold mb-2">Response</h4>
              <p className="text-slate-300 text-sm">
                Incremental validation path. Low-friction checkpoints. 
                Demonstrate quality before requesting commitment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
