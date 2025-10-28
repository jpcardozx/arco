/**
 * ParticleField - Three.js Particle System
 * 
 * Componente reutilizável de partículas 3D
 * Otimizado para performance e SSR safety
 */

'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  speed?: number
  spread?: number
  color?: string
  size?: number
  opacity?: number
}

function Particles({ 
  count = 3000, 
  speed = 0.0005, 
  spread = 3,
  color = '#ffffff',
  size = 0.003,
  opacity = 0.7
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!)
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * spread
      positions[i3 + 1] = (Math.random() - 0.5) * spread
      positions[i3 + 2] = (Math.random() - 0.5) * spread
      
      colors[i3] = 1
      colors[i3 + 1] = 1
      colors[i3 + 2] = 1
    }
    
    return [positions, colors]
  }, [count, spread])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speed
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  )
}

export function ParticleField({
  count = 3000,
  speed = 0.0005,
  spread = 3,
  color = '#ffffff',
  size = 0.003,
  opacity = 0.7,
  className = '',
}: ParticleFieldProps & { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <Particles 
          count={count}
          speed={speed}
          spread={spread}
          color={color}
          size={size}
          opacity={opacity}
        />
      </Canvas>
    </div>
  )
}
