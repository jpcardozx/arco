/**
 * THREE.JS CANVAS - SSR SAFE
 * Componente isolado apenas para canvas
 * Importado dinamicamente com ssr: false
 */
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Malha geométrica em rotação
function GeometricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#14b8a6"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Campo de partículas
function ParticleField() {
  const ref = useRef<any>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ThreeSceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <GeometricMesh />
      <ParticleField />
    </Canvas>
  );
}
