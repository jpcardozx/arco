/**
 * Figma Resources Section - Tools & Materials for Local Service Providers
 * Educational content and actionable resources
 */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/primitives/Container/Container';
import { Download, Play, FileText, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';

export function FigmaResources() {
  const resources = [
    {
      type: 'Checklist',
      icon: CheckCircle,
      title: 'Checklist: 15 pontos para landing page que converte',
      description: 'Lista completa para otimizar sua página de captura e aumentar conversões em 40%.',
      format: 'PDF',
      pages: '3 páginas',
      downloads: '2.3k+',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      type: 'Template',
      icon: FileText,
      title: 'Templates: Scripts de atendimento WhatsApp',
      description: '5 templates testados para qualificar leads e reduzir no-shows em 60%.',
      format: 'DOCX',
      pages: '8 templates',
      downloads: '1.8k+',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-arco-700',
    },
    {
      type: 'Vídeo',
      icon: Play,
      title: 'Masterclass: Como configurar campanhas no Google Ads',
      description: 'Passo a passo completo para criar campanhas lucrativas para prestadores de serviços.',
      format: 'MP4',
      pages: '45 min',
      downloads: '3.1k+',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      type: 'Guia',
      icon: Lightbulb,
      title: 'Guia: Palavras-chave para serviços locais',
      description: 'Lista com 200+ palavras-chave testadas por segmento, com volume e competição.',
      format: 'XLSX',
      pages: '12 segmentos',
      downloads: '4.2k+',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  const categories = [
    'Reformas e Construção',
    'Beleza e Estética',
    'Serviços Automotivos',
    'Saúde e Bem-estar',
    'Limpeza e Conservação',
    'Tecnologia e Informática',
    'Educação e Consultoria',
    'Alimentação e Delivery',
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container size="xl" className="max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700">
            Recursos Gratuitos
          </Badge>

          <h2 className="font-arsenal mb-6 text-4xl font-normal uppercase leading-tight text-neutral-900 sm:text-5xl">
            Materiais exclusivos
          </h2>

          <p className="font-barlow text-lg leading-relaxed text-neutral-600">
            Templates, checklists e guias práticos para acelerar seus resultados.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {resources.map((resource, index) => {
            const Icon = resource.icon;

            return (
              <Card
                key={index}
                className="group relative -translate-y-1 overflow-hidden border-0 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
              >
                {/* Subtle animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <CardContent className="relative z-10 p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${resource.bgColor}`}
                    >
                      <Icon className={`h-7 w-7 ${resource.textColor}`} />
                    </div>

                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>

                  {/* Title */}
                                    <h3 className="font-barlow mb-3 text-xl font-medium leading-tight text-neutral-900">{resource.title}</h3>
                  
                  {/* Description */}
                  <p className="font-barlow mb-6 leading-relaxed text-neutral-600">{resource.description}</p>
                  
                  {/* Metadata */}
                  <div className="font-barlow mb-6 flex items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {resource.format}
                    </span>
                    <span>•</span>
                    <span>{resource.pages}</span>
                    <span>•</span>
                    <span>{resource.downloads} downloads</span>
                  </div>

                  {/* CTA */}
                  <Button
                    className={`font-barlow w-full bg-gradient-to-r text-white transition-all group-hover:scale-105 hover:shadow-lg ${resource.color}`}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Gratuito
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h3 className="font-arsenal mb-4 text-2xl font-normal uppercase text-gray-900">Segmentos atendidos</h3>
            <p className="font-barlow text-gray-600">Estratégias específicas para cada tipo de serviço local</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer border-0 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <span className="font-barlow text-sm font-medium text-gray-700 transition-colors group-hover:text-blue-600">
                    {category}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mx-auto mt-16 max-w-2xl">
          <Card className="border-0 bg-gradient-to-r from-gray-50 to-blue-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="font-arsenal mb-4 text-2xl font-normal uppercase text-gray-900">Receba novos materiais</h3>

              <p className="font-barlow mb-6 text-gray-600">
                Toda semana enviamos templates e estratégias exclusivas para prestadores de serviços
              </p>

              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="font-barlow flex-1 rounded-lg border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="font-barlow bg-blue-600 px-6 text-white hover:bg-blue-700">
                  Quero receber
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="font-barlow mt-3 text-xs text-gray-500">
                🔒 Seus dados estão protegidos. Sem spam.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
