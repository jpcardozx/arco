'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, BarChart2, TrendingUp, CheckCircle2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import React from "react";

interface IntegrationControllerProps {
  activeView: string;
  onChange: (view: string) => void;
}

export default function IntegrationController({
  activeView,
  onChange,
}: IntegrationControllerProps) {
  const [expanded, setExpanded] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Determine if we should show the controller
  // In production, this would check if user is admin or if URL parameter is set
  const shouldShow = () => {
    if (typeof window === 'undefined') return false;

    // Check for URL parameter that enables the controller for testing
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('view_control') || showAdmin;
  };

  if (!shouldShow()) return null;

  return (
    <div className="fixed right-6 top-20 z-50 flex flex-col items-end">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="mb-3 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl"
          >
            <div className="max-w-md p-4">
              <h3 className="mb-2 flex items-center font-semibold text-neutral-900">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                Controlador de Visualização
              </h3>

              <p className="mb-4 border-l-2 border-blue-500 bg-blue-50 py-1 pl-3 text-sm text-neutral-600">
                Este controle permite alternar entre diferentes abordagens de conteúdo para testes
                A/B.
              </p>

              <div className="mb-4 space-y-3">
                <button
                  onClick={() => onChange('market-focused')}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition ${activeView === 'market-focused'
                      ? 'border border-blue-300 bg-blue-100 shadow-sm'
                      : 'border border-neutral-200 bg-white hover:border-blue-200 hover:bg-blue-50'
                    }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-neutral-900">Posicionamento de Mercado</div>
                      <div className="text-xs text-neutral-500">
                        Foco em estratégia e posicionamento premium
                      </div>
                    </div>
                  </div>

                  {activeView === 'market-focused' && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      ATIVO
                    </span>
                  )}
                </button>

                <button
                  onClick={() => onChange('performance-focused')}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition ${activeView === 'performance-focused'
                      ? 'border border-indigo-300 bg-indigo-100 shadow-sm'
                      : 'border border-neutral-200 bg-white hover:border-indigo-200 hover:bg-indigo-50'
                    }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
                      <BarChart2 className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-neutral-900">Performance Técnica</div>
                      <div className="text-xs text-neutral-500">
                        Foco em métricas e otimização de performance
                      </div>
                    </div>
                  </div>

                  {activeView === 'performance-focused' && (
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                      ATIVO
                    </span>
                  )}
                </button>
              </div>

              <div className="border-t border-neutral-200 pt-3 text-center">
                <button
                  onClick={() => setExpanded(false)}
                  className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800"
                >
                  <span>Fechar controlador</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center space-x-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-lg transition-colors hover:bg-neutral-50"
      >
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <span>Controlador de Visão</span>
        <ArrowUpDown
          className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
}
