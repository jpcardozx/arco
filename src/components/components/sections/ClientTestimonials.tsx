'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

// Depoimentos dos clientes
const testimonials = [
    {
        id: 1,
        content: 'A equipe do ARCO transformou completamente a performance do nosso site, resultando em um aumento de 40% nas conversões em apenas 3 meses.',
        author: 'Mariana Silva',
        role: 'CEO, TechSolutions',
        avatar: '/images/avatars/avatar-1.jpg',
    },
    {
        id: 2,
        content: 'Trabalhamos com o ARCO para otimizar nossa infraestrutura de e-commerce e vimos um retorno sobre o investimento de 300% no primeiro ano.',
        author: 'Carlos Mendes',
        role: 'CTO, E-Shop Brasil',
        avatar: '/images/avatars/avatar-2.jpg',
    },
    {
        id: 3,
        content: 'A abordagem estratégica do ARCO nos permitiu identificar pontos de ineficiência em nossos sistemas que estavam nos custando milhares de reais mensalmente.',
        author: 'Ana Ferreira',
        role: 'Diretora de Marketing, Grupo Norte',
        avatar: '/images/avatars/avatar-3.jpg',
    },
];

export default function ClientTestimonials() {
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
                    O que nossos clientes dizem
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    Empresas que transformaram desafios tecnológicos em resultados financeiros reais
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                            "bg-white p-6 rounded-xl shadow-lg",
                            "border border-gray-100",
                            "hover:shadow-xl transition-shadow duration-300"
                        )}
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                                </svg>
                            </div>

                            <p className="text-gray-700 flex-grow mb-6">{testimonial.content}</p>

                            <div className="flex items-center mt-auto">
                                <div className="flex-shrink-0 mr-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
