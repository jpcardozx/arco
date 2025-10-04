'use client';

/**
 * OPTIMIZED CLIENT STORIES - v2.1 S-Tier
 * Background: Starfield sutil para profundidade espacial
 * Social proof otimizado para conversão
 */

import React, { useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load Canvas para performance
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);
const Points = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Points),
  { ssr: false }
);
const PointMaterial = dynamic(
  () => import('@react-three/drei').then((mod) => mod.PointMaterial),
  { ssr: false }
);
import { Container } from '../primitives/Container/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, TrendingUp, Zap, Shield, ArrowRight, ExternalLink, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Background Component: Subtle Starfield ---

const Starfield: React.FC = () => {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => {
    const numPoints = 2000; // Menos pontos para sutil
    const positions = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const r = 40 + Math.random() * 40;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }} className="absolute inset-0 opacity-20">
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#14b8a6"
            size={0.08}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </Canvas>
    </Suspense>
  );
};

// --- Data Structure ---

interface Metric {
    label: string;
    value: string;
    icon: React.ElementType;
    color: 'green' | 'blue' | 'purple';
}

interface CaseStudy {
    id: string;
    company: string;
    logo: React.FC<LucideProps>;
    industry: string;
    testimonial: {
        quote: string;
        author: string;
        role: string;
    };
    challenge: string;
    solution: string;
    metrics: Metric[];
}

const caseStudies: CaseStudy[] = [
    {
        id: "techcommerce",
        company: "TechCommerce",
        logo: (props) => <TrendingUp {...props} />,
        industry: "E-commerce de Alta Performance",
        testimonial: {
            quote: "O ROI foi de 3.2x no primeiro mês. A receita de mobile deixou de ser um pesadelo para se tornar nosso maior motor de crescimento.",
            author: "Sarah Chen",
            role: "VP de Crescimento, TechCommerce"
        },
        challenge: "Com 67% de abandono no checkout devido a 4.2s de LCP em mobile, a empresa perdia cerca de $48K mensais.",
        solution: "Otimizamos o caminho crítico de renderização, implementamos otimizações de imagem de ponta e simplificamos o fluxo de checkout.",
        metrics: [
            { label: "Recuperação de Receita", value: "+$43K/mês", icon: TrendingUp, color: "green" },
            { label: "Conversão Mobile", value: "+75%", icon: Zap, color: "blue" },
            { label: "Velocidade (LCP)", value: "-62%", icon: Shield, color: "purple" }
        ]
    },
    {
        id: "financeflow",
        company: "FinanceFlow",
        logo: (props) => <Shield {...props} />,
        industry: "SaaS Financeiro",
        testimonial: {
            quote: "Saímos de penalidades de SEO para o ranking #1 em nossas palavras-chave alvo. A otimização de performance salvou nossa trajetória de crescimento.",
            author: "Marcus Rodriguez",
            role: "CTO, FinanceFlow"
        },
        challenge: "Páginas de geração de leads com 72% de bounce rate e penalidades do Google Core Web Vitals estavam minando o tráfego orgânico.",
        solution: "Realizamos otimizações server-side, implementamos lazy loading de forma inteligente e garantimos conformidade total com os Core Web Vitals.",
        metrics: [
            { label: "Leads Qualificados", value: "+127%", icon: TrendingUp, color: "green" },
            { label: "Tráfego Orgânico", value: "+89%", icon: Zap, color: "blue" },
            { label: "Engajamento", value: "+164%", icon: Shield, color: "purple" }
        ]
    },
    {
        id: "retailmax",
        company: "RetailMax",
        logo: (props) => <Zap {...props} />,
        industry: "Varejo Omnichannel",
        testimonial: {
            quote: "A Black Friday passou de um desastre anunciado para um recorde de vendas. A otimização mobile se pagou 10x.",
            author: "Jennifer Walsh",
            role: "Head de Digital, RetailMax"
        },
        challenge: "A performance mobile causava perdas de 45% da receita em picos sazonais, com páginas de produto lentas afastando clientes.",
        solution: "Adotamos uma estratégia mobile-first agressiva, implementamos uma CDN global e otimizamos queries do banco de dados.",
        metrics: [
            { label: "Receita Mobile", value: "+$67K/mês", icon: TrendingUp, color: "green" },
            { label: "Performance em Picos", value: "0 Downtime", icon: Zap, color: "blue" },
            { label: "Satisfação do Cliente", value: "+94%", icon: Shield, color: "purple" }
        ]
    }
];

// --- Sub-components for the Redesign ---

interface MetricDisplayProps {
    metric: Metric;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({ metric }) => {
    const IconComponent = metric.icon as any;
    return (
      <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <div className={cn("absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center", {
              "bg-green-500/10 text-green-300": metric.color === 'green',
              "bg-blue-500/10 text-blue-300": metric.color === 'blue',
              "bg-purple-500/10 text-purple-300": metric.color === 'purple',
          })}>
              <IconComponent className="w-5 h-5" />
          </div>
          <p className="text-4xl lg:text-5xl font-bold text-white" style={{ textShadow: '0 0 12px var(--tw-shadow-color)' }}>
              {metric.value}
          </p>
          <p className="text-sm text-white/70 mt-1">{metric.label}</p>
      </div>
    );
};

// --- Main Component ---

export const OptimizedClientStories: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Starfield Background - Subtle */}
            <Starfield />
            
            {/* Background Effects: Glow & Grid */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-60 -left-60 w-[40rem] h-[40rem] bg-gradient-to-br from-teal-500/20 to-transparent rounded-full filter blur-3xl opacity-40 animate-pulse" />
                <div className="absolute -bottom-60 -right-60 w-[40rem] h-[40rem] bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-3000" />
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
                />
            </div>

            <Container>
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 relative z-10 space-y-4 max-w-3xl mx-auto"
                >
                    <Badge variant="outline" className="border-teal-400/30 bg-teal-900/30 text-teal-300 px-5 py-2 text-sm font-bold shadow-lg">
                        <Star className="w-4 h-4 mr-2" style={{ filter: 'drop-shadow(0 0 8px var(--tw-color-teal-500))' }}/>
                        Prova Social Documentada
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        Resultados Reais, Não Promessas.
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Analisamos problemas complexos de performance e os transformamos em crescimento de receita mensurável. Veja como.
                    </p>
                </motion.div>

                {/* Interactive Case Study Showcase */}
                <Tabs defaultValue={caseStudies[0].id} className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <TabsList className="grid w-full grid-cols-3 gap-4 h-auto bg-transparent p-0">
                            {caseStudies.map((study) => (
                                <TabsTrigger key={study.id} value={study.id} className="h-auto p-4 bg-white/5 border border-white/10 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:border-teal-400/50 data-[state=active]:shadow-2xl data-[state=active]:shadow-teal-900/50 transition-all duration-300">
                                    <div className="flex items-center justify-center gap-3">
                                        <study.logo className="w-6 h-6 text-white/80" />
                                        <span className="text-lg font-bold text-white/90">{study.company}</span>
                                    </div>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </motion.div>

                    {caseStudies.map((study) => (
                        <TabsContent key={study.id} value={study.id} className="mt-8">
                            <motion.div
                                initial={{ opacity: 0.5, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 lg:p-12"
                            >
                                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                                    {/* Left Column: Narrative */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-white/10">
                                            <blockquote className="text-lg text-white/90 italic mb-4 leading-relaxed">
                                                <span className="text-4xl text-teal-400/50 absolute -left-2 -top-2">“</span>
                                                {study.testimonial.quote}
                                            </blockquote>
                                            <footer className="text-right">
                                                <p className="font-bold text-white">{study.testimonial.author}</p>
                                                <p className="text-sm text-white/60">{study.testimonial.role}</p>
                                            </footer>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-teal-300 mb-2">O Desafio</h4>
                                                <p className="text-slate-300">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-orange-300 mb-2">A Solução</h4>
                                                <p className="text-slate-300">{study.solution}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Data */}
                                    <div className="lg:col-span-3 space-y-4">
                                        {study.metrics.map((metric) => (
                                            <MetricDisplay key={metric.label} metric={metric} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>
                    ))}
                </Tabs>
            </Container>
        </section>
    );
};

export default OptimizedClientStories;