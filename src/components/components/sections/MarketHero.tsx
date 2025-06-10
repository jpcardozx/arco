'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart2, DollarSign, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import React from "react";

export default function MarketHero() {
  // Scroll animation setup
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Market metrics with animated counters
  const [marketMetrics, setMarketMetrics] = useState([
    { value: 0, target: 127, unit: '%', label: 'Average Revenue Growth' },
    { value: 0, target: 63, unit: '%', label: 'Reduction in Decision Cycles' },
    { value: 0, target: 4.7, decimals: 1, unit: 'x', label: 'Average ROI' },
  ]);

  // Animated counter effect
  useEffect(() => {
    const timers = marketMetrics.map((stat, index) => {
      return setInterval(
        () => {
          setMarketMetrics(prev =>
            prev.map((s, i) => {
              if (i === index) {
                const increment = s.decimals ? 0.1 : 1;
                const newValue = Math.min(s.value + increment, s.target);
                return { ...s, value: newValue };
              }
              return s;
            })
          );
        },
        30 + index * 10
      );
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [marketMetrics]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="portfolio-grid-pattern absolute inset-0 opacity-20" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
        <div className="absolute inset-0 bg-[url('/texture3.png')] opacity-10 mix-blend-soft-light" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center rounded-full border border-blue-800/30 bg-blue-900/30 px-4 py-1.5 text-sm text-blue-400 backdrop-blur-sm"
          >
            <span className="font-mono text-xs tracking-wide">STRATEGIC MARKET PERCEPTION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="portfolio-font-serif mb-8 text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            <span className="block">Transform how your</span>
            <span className="text-blue-400">market perceives value</span>
            <span className="block">into measurable growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="portfolio-text-balance mx-auto mb-10 max-w-3xl text-xl text-neutral-400 md:text-2xl"
          >
            Pioneering a systematic approach that realigns perception with actual value, helping
            companies unlock significant untapped revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col justify-center gap-4 md:flex-row"
          >
            <Link href="/diagnose" className="portfolio-button portfolio-button-primary group">
              <span>Diagnose Your Perception Gap</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#case-studies"
              className="portfolio-button portfolio-button-secondary group"
            >
              <span>Explore Our Methodology</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Market metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 md:mt-20"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {marketMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl border border-neutral-700/50 bg-neutral-800/30 p-6 backdrop-blur-sm"
              >
                <div className="mb-3">
                  {index === 0 ? (
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  ) : index === 1 ? (
                    <BarChart2 className="h-6 w-6 text-blue-400" />
                  ) : (
                    <DollarSign className="h-6 w-6 text-blue-400" />
                  )}
                </div>
                <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                  {metric.decimals ? metric.value.toFixed(1) : Math.floor(metric.value)}
                  <span className="ml-1 text-blue-400">{metric.unit}</span>
                </div>
                <div className="text-center text-sm text-neutral-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
