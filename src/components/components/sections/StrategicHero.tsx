'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function StrategicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/texture3.png')] opacity-20 mix-blend-soft-light" />

        {/* Grid pattern */}
        <div className="grid-pattern absolute inset-0 opacity-10" />

        {/* Subtle gradient orbs */}
        <div className="animated-bg" />

        {/* Top and bottom borders */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
      </div>

      <motion.div
        style={{
          opacity: opacityParallax,
          y: yParallax,
          scale: scaleParallax,
        }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      >
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center rounded-full border border-blue-800/30 bg-blue-900/30 px-4 py-1.5 text-sm text-blue-400 backdrop-blur-sm"
          >
            <span className="font-mono text-xs tracking-wide">
              ARQUITETURA DE DECISÃO FINANCEIRA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 font-serif text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            <span className="block">Transformando</span>
            <span className="text-blue-400">percepção de valor</span>
            <span className="block">em receita mensurável</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mb-10 max-w-3xl text-xl text-neutral-400 md:text-2xl"
          >
            Especialista em identificar e corrigir os desalinhamentos simbólicos que causam perdas
            de receita invisíveis em empresas de tecnologia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col justify-center gap-4 md:flex-row"
          >
            <a
              href="#diagnostic"
              className="premium-button group bg-blue-600 text-white hover:bg-blue-700"
            >
              <span>Descubra quanto você está perdendo</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#case-studies"
              className="premium-button border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            >
              <span>Ver casos de sucesso</span>
            </a>
          </motion.div>
        </div>

        {/* Metrics section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3"
        >
          {[
            {
              value: '+37%',
              label: 'Aumento médio em conversão em 21 dias',
              color: 'from-blue-500 to-blue-700',
            },
            {
              value: '-82%',
              label: 'Redução em objeções de preço',
              color: 'from-purple-500 to-blue-500',
            },
            {
              value: '+68%',
              label: 'Aumento em retenção premium',
              color: 'from-blue-500 to-green-500',
            },
          ].map((metric, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
            >
              <div
                className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${metric.color}`}
              />
              <h3 className="mb-2 text-4xl font-bold text-white">{metric.value}</h3>
              <p className="text-neutral-400">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 transform flex-col items-center transition-opacity duration-500 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="mb-2 text-sm text-neutral-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800"
        >
          <ChevronDown className="h-5 w-5 text-neutral-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}
