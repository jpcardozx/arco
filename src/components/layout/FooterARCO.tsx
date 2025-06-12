'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { type Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import React from "react";

interface FooterLink {
  label: string;
  href: Route;
}

const mainLinks: FooterLink[] = [
  { label: 'Methodology', href: '/methodology' as Route },
  { label: 'Case Studies', href: '/case-studies' as Route },
  { label: 'Solutions', href: '/solutions' as Route },
  { label: 'Contact', href: '/contact' as Route },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' as Route },
  { label: 'Terms of Service', href: '/terms' as Route },
  { label: 'Cookie Policy', href: '/cookies' as Route },
];

export default function FooterARCO() {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-800 bg-[#111827] text-[#DAD6CE]">
      {/* Background com textura e vinheta */}
      <div className="absolute inset-0">
        <Image
          src="/texture1.jpg"
          alt="Textured background"
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-6 pb-16 pt-20">
        {/* Frase simbólica de abertura */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-2xl text-pretty text-center font-serif italic tracking-tight text-white"
        >
          Every millisecond of technical debt accumulates into lost revenue. We turn performance
          metrics into profit.
        </motion.p>

        {/* Três colunas simbólicas */}
        <div className="grid grid-cols-1 gap-8 text-sm text-neutral-400 sm:grid-cols-4">
          <Image
            src="/logo-v2.png"
            alt="ARCO Performance Optimization"
            width={180}
            height={36}
            className="mx-auto mb-3 invert"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Performance
            </h4>
            <ul className="space-y-3">
              {mainLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Core Metrics
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-neutral-500">Load Time Optimization</span>
              </li>
              <li>
                <span className="text-neutral-500">Conversion Recovery</span>
              </li>
              <li>
                <span className="text-neutral-500">ROI Acceleration</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Começar
            </h4>
            <a
              href="/diagnose"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white shadow-md transition-all hover:bg-emerald-700"
            >
              Calculate Revenue Impact
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-neutral-500">
              For B2B platforms with $500K+ monthly revenue
            </p>
          </motion.div>
        </div>

        {/* Marca simbólica como selo de encerramento */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-xs italic text-neutral-500">
            © {year} ARCO • Interpretive Authority Consultancy
            <br />
            Formed for those whose signal deserves architecture — not amplification.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
