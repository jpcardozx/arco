'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneMockup3DProps {
  businessName: string;
}

function PhoneModel({ businessName }: { businessName: string }) {
  const meshRef = useRef<THREE.Group>(null);

  // Rotação suave baseada no mouse
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        state.mouse.x * 0.3,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -state.mouse.y * 0.2,
        0.1
      );
    }
  });

  return (
    <group ref={meshRef}>
      {/* Corpo do celular */}
      <RoundedBox
        args={[1, 2, 0.1]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Tela do celular */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[0.88, 1.88]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Simulação de conteúdo da página */}
      <mesh position={[0, 0.6, 0.052]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* Botão CTA simulado */}
      <mesh position={[0, -0.5, 0.052]}>
        <planeGeometry args={[0.6, 0.15]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Brilho da tela */}
      <mesh position={[0, 0, 0.053]}>
        <planeGeometry args={[0.88, 1.88]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export default function PhoneMockup3D({ businessName }: PhoneMockup3DProps) {
  return (
    <div className="w-full aspect-[9/16] max-w-sm mx-auto">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} />
        <PhoneModel businessName={businessName} />
      </Canvas>
    </div>
  );
}
