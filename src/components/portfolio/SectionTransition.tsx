/**
 * SECTION TRANSITION COMPONENT
 *
 * Transição Three.js sofisticada entre seções
 * Cria efeito de "morph" geométrico elegante baseado em scroll
 *
 * Features:
 * - Mesh morphing entre seções
 * - Color transition fluida
 * - Performance otimizada
 * - Integração com Framer Motion scroll
 */

'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform, motion } from 'framer-motion';
import * as THREE from 'three';

// Geometria mutável
function TransitionGeometry({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotação contínua
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08 + scrollProgress * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12 + scrollProgress * 0.3;

      // Scale pulsante baseado em scroll
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 1.5 + scrollProgress * Math.PI) * 0.1;
      meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Alterna entre geometrias com base em scroll */}
      {scrollProgress < 0.5 ? (
        <icosahedronGeometry args={[1.2, 2]} />
      ) : (
        <octahedronGeometry args={[1.2, 2]} />
      )}
      <meshStandardMaterial
        color={new THREE.Color().setHSL(scrollProgress * 0.2 + 0.4, 1, 0.5)}
        wireframe
        transparent
        opacity={0.3}
        emissive={new THREE.Color().setHSL(scrollProgress * 0.2 + 0.4, 1, 0.3)}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

interface SectionTransitionProps {
  sectionRef: React.RefObject<HTMLElement>;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  sectionRef,
  className = ''
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const scrollValue = scrollYProgress.get();

  return (
    <div className={`absolute inset-0 pointer-events-none opacity-40 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <TransitionGeometry scrollProgress={scrollValue} />
      </Canvas>
    </div>
  );
};

export default SectionTransition;
