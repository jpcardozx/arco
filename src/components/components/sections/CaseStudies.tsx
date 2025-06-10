'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { cn } from '@/lib/utils/cn';

// Dados dos estudos de caso
const caseStudies = [
    {
        id: 1,
        title: 'Otimização de performance para e-commerce',
        description: 'Como reduzimos o tempo de carregamento em 70% e aumentamos as conversões em 35%',
        category: 'E-commerce',
        image: '/images/case-studies/ecommerce-optimization.jpg',
        slug: 'ecommerce-optimization',
        metrics: [
            { value: '70%', label: 'Redução no tempo de carregamento' },
            { value: '35%', label: 'Aumento nas taxas de conversão' },
            { value: '25%', label: 'Redução na taxa de abandono' }
        ]
    },
    {
        id: 2,
        title: 'Reestruturação de infraestrutura de SaaS',
        description: 'Modernizamos a infraestrutura reduzindo custos operacionais em 40%',
        category: 'SaaS',
        image: '/images/case-studies/saas-infrastructure.jpg',
        slug: 'saas-infrastructure-restructuring',
        metrics: [
            { value: '40%', label: 'Redução em custos operacionais' },
            { value: '60%', label: 'Aumento na velocidade de deployment' },
            { value: '99.99%', label: 'Uptime após otimização' }
        ]
    },
    {
        id: 3,
        title: 'Reescrita de aplicativo mobile legado',
        description: 'Transformamos um aplicativo problemático em uma solução moderna e escalável',
        category: 'Mobile',
        image: '/images/case-studies/mobile-rewrite.jpg',
        slug: 'legacy-mobile-app-rewrite',
        metrics: [
            { value: '4.8', label: 'Nova avaliação na app store' },
            { value: '80%', label: 'Redução em crashes reportados' },
            { value: '150%', label: 'Aumento em usuários ativos' }
        ]
    },
];

export default function CaseStudies() {
    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    Casos de Sucesso
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    Conheça os resultados reais que entregamos para empresas como a sua
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((caseStudy, index) => (
                    <motion.div
                        key={caseStudy.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                            "bg-white rounded-xl overflow-hidden shadow-lg",
                            "border border-gray-100",
                            "hover:shadow-xl transition-all duration-300"
                        )}
                    >
                        <div className="relative h-48">
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">Imagem do Projeto</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-2">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                    {caseStudy.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                            <p className="text-gray-600 mb-6 text-sm">{caseStudy.description}</p>

                            <div className="grid grid-cols-3 gap-2 mb-6">
                                {caseStudy.metrics.map((metric, i) => (
                                    <div key={i} className="text-center">
                                        <p className="text-blue-600 font-bold">{metric.value}</p>
                                        <p className="text-xs text-gray-500">{metric.label}</p>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={`/case-studies/${caseStudy.slug}`}
                                className={cn(
                                    "inline-flex items-center text-blue-600 text-sm font-medium",
                                    "hover:text-blue-800 transition-colors duration-200"
                                )}
                            >
                                Ver estudo de caso
                                <HiOutlineArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link
                    href="/case-studies"
                    className={cn(
                        "inline-flex items-center px-6 py-3 rounded-lg",
                        "bg-white text-gray-800 font-medium border border-gray-200",
                        "hover:bg-gray-50 transition duration-200"
                    )}
                >
                    Ver todos os casos
                    <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </div>
    );
}
