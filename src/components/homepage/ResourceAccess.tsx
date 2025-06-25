'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  Code, 
  BarChart3, 
  Settings,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Eye,
  Calendar
} from 'lucide-react'

/**
 * RESOURCE ACCESS - Free Tools and Templates
 * 
 * STRATEGY: Give away valuable resources to build trust and demonstrate expertise
 * PSYCHOLOGY: Reciprocity principle - free value creates obligation and trust
 * POSITIONING: "Tools we actually use" vs "marketing materials"
 */

export function ResourceAccess() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof resourceCategories>('frameworks')

  const resourceCategories = {
    frameworks: {
      name: 'Frameworks & Methodologies',
      icon: Settings,
      description: 'Complete frameworks we use internally',
      resources: [
        {
          name: 'R.E.V.E.N.U.E Framework Complete',
          description: 'Framework completo com 127 páginas de documentação, templates e checklists',
          type: 'PDF + Templates',
          size: '12.3 MB',
          downloads: '2.1k',
          rating: 4.9,
          features: [
            '7 metodologias detalhadas',
            '47 templates prontos',
            '23 checklists de validação',
            'Calculadoras de ROI'
          ],
          preview: 'Mesmo framework usado em projetos $50k+',
          badge: 'Mais Popular'
        },
        {
          name: 'Performance Optimization Playbook',
          description: 'Metodologia step-by-step para otimização de performance web',
          type: 'PDF + Scripts',
          size: '8.7 MB', 
          downloads: '1.8k',
          rating: 4.8,
          features: [
            'Auditoria completa de performance',
            'Scripts de automação inclusos',
            'Métricas e KPIs específicos',
            'Casos reais de aplicação'
          ],
          preview: 'Usado para reduzir LCP de 4.2s para 1.9s',
          badge: null
        },
        {
          name: 'Architecture Decision Framework',
          description: 'Framework para tomada de decisões arquiteturais complexas',
          type: 'Templates',
          size: '3.4 MB',
          downloads: '1.2k', 
          rating: 4.7,
          features: [
            'Decision trees interativos',
            'Risk assessment matrices',
            'Cost-benefit templates',
            'Implementation roadmaps'
          ],
          preview: 'Validado em 43 projetos enterprise',
          badge: null
        }
      ]
    },
    tools: {
      name: 'Tools & Scripts',
      icon: Code,
      description: 'Proprietary tools we develop',
      resources: [
        {
          name: 'MCP Server Template',
          description: 'Template completo para criar servidores MCP com TypeScript',
          type: 'GitHub Repo',
          size: 'Open Source',
          downloads: '890',
          rating: 4.9,
          features: [
            'TypeScript setup completo',
            'Testes automatizados',
            'Docker configuration',
            'CI/CD pipeline'
          ],
          preview: 'Base para todos nossos servidores MCP',
          badge: 'Novo'
        },
        {
          name: 'Web Vitals Monitor',
          description: 'Sistema de monitoramento contínuo de Core Web Vitals',
          type: 'Scripts + Dashboard',
          size: '15.2 MB',
          downloads: '1.5k',
          rating: 4.8,
          features: [
            'Real-time monitoring',
            'Alertas automáticos',
            'Dashboard interativo', 
            'API de integração'
          ],
          preview: 'Detecta degradação em 30 segundos',
          badge: null
        },
        {
          name: 'ROI Calculator Suite',
          description: 'Calculadoras para quantificar impacto técnico em revenue',
          type: 'Excel + Web App',
          size: '4.1 MB',
          downloads: '2.3k',
          rating: 4.6,
          features: [
            'Performance ROI calculator',
            'Technical debt quantifier',
            'Feature impact estimator',
            'Resource optimization tool'
          ],
          preview: 'Usado para justificar 340% ROI médio',
          badge: null
        }
      ]
    },
    analytics: {
      name: 'Analytics & Insights',
      icon: BarChart3,
      description: 'Dashboards e relatórios que usamos',
      resources: [
        {
          name: 'Technical Metrics Dashboard',
          description: 'Dashboard completo para métricas técnicas e business impact',
          type: 'Grafana + Queries',
          size: '6.8 MB',
          downloads: '780',
          rating: 4.9,
          features: [
            '47 métricas pré-configuradas',
            'Alertas inteligentes',
            'Correlação técnica-business',
            'Histórico de 12 meses'
          ],
          preview: 'Dashboard usado em todos nossos projetos',
          badge: 'Exclusivo'
        },
        {
          name: 'Performance Audit Template',
          description: 'Template completo para auditoria de performance técnica',
          type: 'Spreadsheet + Scripts',
          size: '2.9 MB',
          downloads: '1.9k',
          rating: 4.7,
          features: [
            'Checklist de 89 pontos',
            'Scoring automático',
            'Relatório executivo',
            'Action items priorizados'
          ],
          preview: 'Base para auditorias de R$25k+',
          badge: null
        }
      ]
    }
  }

  const handleDownload = (resourceName: string) => {
    // Track download
    console.log(`Download initiated: ${resourceName}`)
    // In real implementation, this would trigger actual download
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Free
            <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Resources
            </span>
            <span className="block text-2xl md:text-3xl font-normal text-slate-600 mt-2">
              Tools We Use Internally
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Free access to the same frameworks, tools, and templates we apply in paid projects
            <span className="block text-lg text-slate-500 mt-2">
              No email required • Immediate download • Commercial use allowed
            </span>
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-slate-100 rounded-2xl p-2">
            {Object.entries(resourceCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as keyof typeof resourceCategories)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {resourceCategories[selectedCategory].name}
            </h3>
            <p className="text-slate-600">
              {resourceCategories[selectedCategory].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories[selectedCategory].resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300 group"
              >
                {/* Resource Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {resource.name}
                      </h4>
                      {resource.badge && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                          {resource.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span>{resource.type}</span>
                      <span>•</span>
                      <span>{resource.size}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(resource.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {resource.rating}
                  </span>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {resource.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 font-medium">
                      {resource.preview}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(resource.name)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Free Download
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Why Do We Provide This for Free?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">Transparency</h4>
              <p className="text-slate-600">
                We show exactly how we work. No mystery, no "black box".
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">Trust</h4>
              <p className="text-slate-600">
                You can test our methods before any commitment.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">Quality</h4>
              <p className="text-slate-600">
                If they work for us, they'll work for you. Proven results.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Resultado:</strong> Mais de 89% dos usuários destes recursos acabam nos procurando para implementação completa.
              <span className="block text-slate-600 mt-2">
                Não por pressão, mas por confiança nos resultados.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Download Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">8.7k+</div>
            <div className="text-slate-600">Total Downloads</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">4.8/5</div>
            <div className="text-slate-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">127</div>
            <div className="text-slate-600">Companies Using</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
            <div className="text-slate-600">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
