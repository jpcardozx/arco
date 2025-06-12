'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import React from "react";
import { trackEvent } from '@/lib/utils/analytics';

export default function DesignCompareRefined() {
  const [mode, setMode] = useState('refined');
  const [expanded, setExpanded] = useState(false);
  const [showVersionList, setShowVersionList] = useState(false);

  // Track which design version the user is viewing
  useEffect(() => {
    trackEvent('design_version_selected', { version: mode });
  }, [mode]);

  const toggleMode = (newMode: string) => {
    setMode(newMode);
    setShowVersionList(false);
  };

  const versions = [
    { id: 'refined', name: 'Design Refinado', path: '/page-refined' },
    { id: 'enhanced', name: 'Design Aprimorado', path: '/page-enhanced' },
    { id: 'revised', name: 'Design Revisado', path: '/page' },
    { id: 'original', name: 'Design Original', path: '/page?showRevised=false' },
  ];

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 transform flex-col items-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 overflow-hidden rounded-xl border border-neutral-200 bg-white/95 shadow-2xl backdrop-blur-md"
          >
            <div className="max-w-md p-4">
              <h3 className="mb-1 font-medium text-neutral-900">Estatísticas de página</h3>
              <p className="mb-3 text-sm text-neutral-600">
                Compare as métricas de performance entre as versões
              </p>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <div className="flex items-center text-sm font-medium text-blue-800">
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    Taxa de Conversão
                  </div>
                  <div className="mt-1.5 flex items-end">
                    <span className="text-2xl font-bold text-blue-900">3.8%</span>
                    <span className="mb-1 ml-2 flex items-center text-xs text-green-600">
                      +0.7%
                      <svg className="ml-0.5 h-3 w-3" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 12L12 8L16 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8L12 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-3">
                  <div className="flex items-center text-sm font-medium text-indigo-800">
                    <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
                    Engajamento
                  </div>
                  <div className="mt-1.5 flex items-end">
                    <span className="text-2xl font-bold text-indigo-900">2.4m</span>
                    <span className="mb-1 ml-2 flex items-center text-xs text-green-600">
                      +1.2m
                      <svg className="ml-0.5 h-3 w-3" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 12L12 8L16 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8L12 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setExpanded(false)}
                  className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800"
                >
                  <span>Fechar estatísticas</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showVersionList && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl"
            >
              <div className="p-1">
                {versions.map(version => (
                  <Link
                    key={version.id}
                    href={version.path}
                    className={`block rounded px-4 py-2.5 text-sm ${mode === version.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    onClick={() => toggleMode(version.id)}
                  >
                    {version.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center space-x-2 rounded-full border border-neutral-200 bg-white px-5 py-3 shadow-xl backdrop-blur-sm">
          <button
            onClick={() => setShowVersionList(!showVersionList)}
            className="flex items-center space-x-2 rounded-full bg-blue-600 px-4 py-1.5 text-white transition-all"
          >
            <span>Design Refinado</span>
            <svg
              className={`h-4 w-4 transition-transform ${showVersionList ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="h-6 w-px bg-neutral-200" />

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200"
            aria-label="Toggle statistics"
            title="Ver estatísticas"
          >
            <BarChart2 className="h-4 w-4 text-neutral-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
