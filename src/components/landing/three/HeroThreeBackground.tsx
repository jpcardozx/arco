'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Campo de partículas para o Hero
 * Otimizado para performance: 800 partículas, movimento sutil
 */
function ParticleField() {
  const ref = useRef<any>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const t = Math.random() * 2 * Math.PI;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 2;
      
      temp[i * 3] = r * Math.sin(p) * Math.cos(t);
      temp[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      temp[i * 3 + 2] = r * Math.cos(p);
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#93c5fd"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/**
 * Geometria abstrata central
 * Wireframe icosaedro com rotação lenta
 */
function GeometricCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#60a5fa"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

/**
 * Componente exportado: Background Three.js do Hero
 * Lazy loaded para não impactar LCP
 */
export default function HeroThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField />
        <GeometricCore />
      </Canvas>
    </div>
  );
}
