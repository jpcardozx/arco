'use client';

/**
 * S-Tier Background Variations Showcase v2.0
 * 
 * A complete, enhanced, and performant collection of 5 distinct and customizable
 * animated background components, built with different libraries.
 */

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useSpring, animated } from '@react-spring/web';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

// --- Wrapper Component for Showcasing ---

const ShowcaseWrapper: React.FC<{ title: string; children: React.ReactNode; description: string; }> = ({ title, children, description }) => (
  <div className="relative w-full h-[450px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
    <div className="absolute inset-0 z-0">{children}</div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
      <h3 className="text-3xl font-bold text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">{title}</h3>
      <p className="mt-2 text-sm text-slate-300 max-w-md">{description}</p>
    </div>
  </div>
);

// --- 1. StarfieldBackground (React Three Fiber) ---

const Starfield: React.FC<{ starCount?: number; speed?: number; starSize?: number; }> = (props) => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const numPoints = props.starCount || 5000;
    const positions = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const r = 40 + Math.random() * 60;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (props.speed || 20);
      ref.current.rotation.y -= delta / (props.speed || 25);
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={props.starSize || 0.15}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const StarfieldBackground: React.FC<{ starCount?: number; speed?: number; starSize?: number; }> = (props) => (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <Starfield {...props} />
    </Canvas>
);

// --- 2. AuroraBackground (Framer Motion) ---

const AuroraBackground: React.FC<{ colors?: string[]; speed?: number; }> = ({ colors, speed = 20 }) => {
    const defaultColors = ['#1e40af', '#be185d', '#581c87', '#047857'];
    const auroraColors = colors || defaultColors;

    return (
        <div className="relative w-full h-full overflow-hidden bg-slate-950">
            {auroraColors.map((color, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full filter blur-3xl opacity-40"
                    style={{ backgroundColor: color }}
                    initial={{ 
                        width: Math.random() * 400 + 200,
                        height: Math.random() * 400 + 200,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        x: '-50%',
                        y: '-50%',
                    }}
                    animate={{
                        x: [`-50%`, `${Math.random() * 40 - 20}%`, '-50%'],
                        y: [`-50%`, `${Math.random() * 40 - 20}%`, '-50%'],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * speed + speed,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: index * 2,
                    }}
                />
            ))}
        </div>
    );
};

// --- 3. VectorizedPatternBackground (Lottie) ---

const VectorizedPatternBackground: React.FC<{ speed?: number; }> = ({ speed = 1 }) => {
    const [animationData, setAnimationData] = useState(null);
    const lottieRef = useRef<any>(null);

    useEffect(() => {
        fetch('https://lottie.host/c8f4b5e1-1f27-4a8e-9de0-3b82a2b3a573/3sX0h2kG0X.json')
            .then(res => res.json())
            .then(data => setAnimationData(data));
    }, []);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(speed);
        }
    }, [speed, animationData]);

    return (
        <div className="w-full h-full opacity-10 scale-150">
            {animationData && <Lottie lottieRef={lottieRef} animationData={animationData} loop={true} />}
        </div>
    );
};

// --- 4. FloatingShapesBackground (React Spring) ---

const FloatingShapesBackground: React.FC<{ shapeCount?: number; colors?: string[]; }> = ({ shapeCount = 10, colors }) => {
    const defaultColors = ['#14b8a6', '#f97316', '#8b5cf6'];
    const shapeColors = colors || defaultColors;

    const shapes = useMemo(() => 
        Array.from({ length: shapeCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 80 + 40,
            color: shapeColors[i % shapeColors.length],
        })), [shapeCount, shapeColors]);

    const [props, set] = useSpring(() => ({ 
        xy: [0, 0],
        config: { mass: 20, tension: 100, friction: 100 }
    }));

    return (
        <div className="w-full h-full relative overflow-hidden" onMouseMove={({ clientX, clientY }) => {
            const x = (clientX - window.innerWidth / 2) / 40;
            const y = (clientY - window.innerHeight / 2) / 40;
            set({ xy: [x, y] });
        }}>
            {shapes.map(shape => (
                <animated.div
                    key={shape.id}
                    style={{
                        position: 'absolute',
                        top: `${shape.y}%`,
                        left: `${shape.x}%`,
                        width: shape.size,
                        height: shape.size,
                        backgroundColor: shape.color,
                        borderRadius: '50%',
                        filter: 'blur(24px)',
                        opacity: 0.3,
                        transform: props.xy.to((x, y) => `translate3d(${x * (shape.size / 100)}px, ${y * (shape.size / 100)}px, 0)`),
                        willChange: 'transform'
                    }}
                />
            ))}
        </div>
    );
};

// --- 5. GridAndGlowBackground (Pure CSS/JS) ---

const GridAndGlowBackground: React.FC<{ gridColor?: string; glowColor?: string; }> = ({ gridColor = 'rgba(20, 184, 166, 0.1)', glowColor = 'rgba(14, 165, 233, 0.5)' }) => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <style jsx>{`
                .grid-glow-bg {
                    width: 100%;
                    height: 100%;
                    background-image: 
                        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
                        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px);
                    background-size: 50px 50px;
                    position: relative;
                }
                .grid-glow-bg::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent);
                    opacity: 0.3;
                    transition: background 0.2s ease-out;
                }
            `}</style>
            <div className="grid-glow-bg" />
        </>
    );
};


// --- Main Exported Component ---

export const BackgroundVariations = () => {
  return (
    <div className="p-4 md:p-8 bg-slate-950 space-y-8">
        <div className="text-center py-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">S-Tier Background Showcase</h2>
            <p className="text-lg text-slate-400 mt-2">5 exemplos de fundos performáticos e customizáveis</p>
        </div>
        <ShowcaseWrapper 
            title="1. Starfield (React Three Fiber)"
            description="Milhares de partículas renderizadas com R3F e Drei para um efeito de campo estelar 3D performático. Customizável via props (starCount, starSize, speed)."
        >
            <StarfieldBackground starCount={7000} starSize={0.1} speed={15} />
        </ShowcaseWrapper>
        <ShowcaseWrapper 
            title="2. Aurora (Framer Motion)"
            description="Múltiplas camadas de gradientes desfocados se movem de forma independente para criar um efeito de aurora boreal. Customizável via props (colors, speed)."
        >
            <AuroraBackground />
        </ShowcaseWrapper>
        <ShowcaseWrapper 
            title="3. Vector Pattern (Lottie)"
            description="Renderiza uma animação vetorial leve (JSON) para um fundo de padrão geométrico. Ideal para designs sutis e profissionais. Customizável via props (speed)."
        >
            <VectorizedPatternBackground speed={0.5} />
        </ShowcaseWrapper>
        <ShowcaseWrapper 
            title="4. Floating Shapes (React Spring)"
            description="Formas flutuantes com animação baseada em física que reagem à posição do mouse. Customizável via props (shapeCount, colors)."
        >
            <FloatingShapesBackground shapeCount={8} />
        </ShowcaseWrapper>
        <ShowcaseWrapper 
            title="5. Grid & Glow (CSS + JS)"
            description="Um holofote segue o cursor sobre uma grade animada. Feito com CSS puro e uma pequena quantidade de JS para performance máxima. Customizável via props (gridColor, glowColor)."
        >
            <GridAndGlowBackground />
        </ShowcaseWrapper>
    </div>
  );
};

export default BackgroundVariations;
