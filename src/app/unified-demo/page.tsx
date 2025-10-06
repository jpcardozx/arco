// Demo page para testar o sistema unificado
'use client'

import React, { useState } from 'react'
import EnhancedChecklistInterface from '@/components/checklist/EnhancedChecklistInterface'
import { LeadCaptureModal } from '@/components/modals/LeadCaptureModal'
import { Button } from '@/components/ui/button'

export default function UnifiedDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Sistema ARCO - Demo Unificado
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Sistema completo de armazenamento persistente com ficha do cliente, 
            checklist interativo em tempo real e conexões com estruturas de dados relacionadas
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              ✅ Tipagem Unificada
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              🔄 Real-time Updates
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              🎯 Type-safe
            </span>
          </div>
        </div>

        {/* Sistema de Checklist Interativo */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Checklist Interativo em Tempo Real
            </h2>
            <p className="text-slate-600 mt-2">
              Interface aprimorada com verificações, conexões entre tabelas e sistema de dados persistente
            </p>
          </div>
          
          <div className="p-8">
            <EnhancedChecklistInterface checklistId="01234567-89ab-cdef-0123-456789abcdef" />
          </div>
        </div>

        {/* Status do Sistema */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">🔧 Sistema Unificado</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✅ Types gerados via Supabase</li>
              <li>✅ DataAdapters implementados</li>
              <li>✅ Validação type-safe</li>
              <li>✅ Hooks unificados</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">💾 Armazenamento</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✅ Client profiles</li>
              <li>✅ Interaction history</li>
              <li>✅ Checklist templates</li>
              <li>✅ Verification system</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">🚀 UI/UX Aprimorado</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✅ Interface responsiva</li>
              <li>✅ Filtros inteligentes</li>
              <li>✅ Progress tracking</li>
              <li>✅ Real-time updates</li>
            </ul>
          </div>
        </div>

        {/* Modal de Captura de Lead - Teste */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">🎯 Teste do Modal de Captura</h3>
          <p className="text-slate-600 text-sm mb-4">
            Clique para testar o modal de captura de lead com copy otimizado e UX aprimorado
          </p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Abrir Modal de Captura
          </Button>
        </div>
      </div>

      {/* Modal de Captura de Lead */}
      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trigger="manual"
        offer={{
          title: "Checklist Completo: 50 Pontos de Otimização",
          description: "O mesmo checklist que aumentou conversões em +127% para nossos clientes",
          benefits: [
            "🚀 12 otimizações de Performance críticas",
            "🎯 12 melhorias de SEO prioritárias", 
            "💡 13 ajustes de UX que convertem mais",
            "📊 8 configurações de Analytics essenciais",
            "🔐 5 implementações de Segurança obrigatórias"
          ]
        }}
      />
    </div>
  )
}