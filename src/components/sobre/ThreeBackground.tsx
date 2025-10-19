/**
 * Three.js Background - Sobre Page
 *
 * Background abstrato representando arquitetura de sistemas
 * Grid ondulante + Partículas fluindo
 * Visual coerente com conteúdo técnico
 */

'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Flowing Grid - Grid 3D ondulante
 */
function FlowingGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const size = 40;
    const divisions = 40;
    const geo = new THREE.PlaneGeometry(size, size, divisions, divisions);
    
    const positions = geo.attributes.position.array;
    const originalZ = new Float32Array(positions.length / 3);
    
    for (let i = 0; i < positions.length; i += 3) {
      originalZ[i / 3] = positions[i + 2];
    }
    
    geo.userData.originalZ = originalZ;
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const originalZ = meshRef.current.geometry.userData.originalZ as Float32Array;
    const time = state.clock.elapsedTime * 0.3;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      const wave1 = Math.sin(x * 0.2 + time) * 0.5;
      const wave2 = Math.sin(y * 0.2 + time * 1.3) * 0.3;
      const wave3 = Math.sin((x + y) * 0.15 + time * 0.7) * 0.4;
      
      positions[i + 2] = originalZ[i / 3] + wave1 + wave2 + wave3;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.x = -Math.PI / 3;
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, -5, -10]} geometry={geometry}>
      <meshBasicMaterial
        color="#0d9488"
        wireframe
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Data Particles - Fluxo de dados
 */
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const count = 80;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: number[] = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.userData.velocities = velocities;
    
    return geo;
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particlesRef.current.geometry.userData.velocities as number[];
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];
      
      if (Math.abs(positions[i]) > 15) positions[i] *= -0.9;
      if (Math.abs(positions[i + 1]) > 10) positions[i + 1] *= -0.9;
      if (Math.abs(positions[i + 2]) > 10) positions[i + 2] *= -0.9;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#14b8a6"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Camera Controller - Parallax sutil
 */
function CameraController() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 0.3,
        y: -(event.clientY / window.innerHeight - 0.5) * 0.3,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mousePosition.current.x - camera.position.x) * 0.05;
    camera.position.y += (mousePosition.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, -10);
  });

  return null;
}

/**
 * Scene
 */
function Scene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#14b8a6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0d9488" />
      <FlowingGrid />
      <DataParticles />
    </>
  );
}

/**
 * Main Component
 */
export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 opacity-40 dark:opacity-30">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
