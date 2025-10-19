/**
 * Sobre - Capacidade Técnica - PARALLAX REFINADO
 *
 * Reveal progressivo com depth layers
 * Cards surgem conforme você rola
 * Movimento sutil que adiciona profundidade
 */

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Code2, Database, Layers, Zap } from 'lucide-react';

const capacidades = [
  {
    icon: Code2,
    title: 'Frontend Moderno',
    description: 'Next.js 14+, React 18+, TypeScript. Server Components, Streaming SSR e otimização de Core Web Vitals (LCP, FID, CLS).',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    icon: Database,
    title: 'Backend Escalável',
    description: 'PostgreSQL com Row-Level Security, APIs RESTful e GraphQL. Supabase para autenticação JWT e real-time subscriptions.',
    stack: ['PostgreSQL', 'Supabase', 'Node.js', 'Prisma']
  },
  {
    icon: Layers,
    title: 'Arquitetura',
    description: 'Design systems componentizados, arquitetura modular e padrões de código. Documentação técnica e review process.',
    stack: ['Design Systems', 'Component Libraries', 'Storybook', 'Testing']
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Otimização de bundle, lazy loading, code splitting. Monitoramento com Lighthouse CI e Core Web Vitals tracking.',
    stack: ['Lighthouse', 'Web Vitals', 'Bundle Analysis', 'CDN']
  }
];

export function SobreCapacidadeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 px-6 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-orange-500/5 dark:from-teal-500/10 dark:via-transparent dark:to-orange-500/10"
        style={{ 
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-block px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 dark:border-teal-500/30 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
              Stack & Especialização
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Capacidade técnica
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Stack moderno, processos documentados e foco em entrega de valor mensurável.
            Especialização em aplicações web de alta performance e arquitetura escalável.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {capacidades.map((item, index) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: '-50px' });
            
            return (
              <motion.div
                key={item.title}
                ref={cardRef}
                className="group relative p-8 rounded-2xl border border-slate-200 dark:border-white/10 transition-all duration-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/20 overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={cardInView ? { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformPerspective: 1000,
                }}
              >
                {/* Hover effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={false}
                />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div 
                      className="p-3 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 group-hover:bg-teal-500/20 dark:group-hover:bg-teal-500/30 transition-colors duration-300"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 rounded-full border border-slate-200 dark:border-white/10 group-hover:border-teal-500/30 transition-colors duration-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.15 + techIndex * 0.05 + 0.3 
                            }}
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: 'rgba(20, 184, 166, 0.15)' 
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-teal-500/5 via-slate-100/50 to-orange-500/5 dark:from-teal-500/10 dark:via-slate-900/50 dark:to-orange-500/10 border border-slate-200 dark:border-white/10 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2
            }}
          />

          <div className="relative grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'Next.js 14', label: 'Framework' },
              { value: 'TypeScript', label: 'Type safety' },
              { value: 'PostgreSQL', label: 'Database' },
              { value: 'Vercel Edge', label: 'Deploy' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="cursor-default"
              >
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
