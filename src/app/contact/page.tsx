'use client'

import React, { useEffect, useState } from 'react'
import NavBarEnhanced from '../../../components/NavBarEnhanced'
import FooterARCORevised from '../../../components/FooterARCORevised'
import { trackPageView, trackFunnelStep, trackEvent } from '../../../lib/analytics'
import { CheckCircle, ArrowRight, Mail, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
    useEffect(() => {
        // Track page view and funnel step
        trackPageView('contact-page', {
            version: 'enhanced',
            designSystem: 'arco-design-v3'
        });

        trackFunnelStep('contact', 'view', 1, {
            entryPoint: document.referrer || 'direct'
        });
    }, []);

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        website: '',
        message: '',
        budget: '',
        contactMethod: 'email',
        submitted: false,
        loading: false,
        error: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState(prev => ({ ...prev, loading: true }));

        // Track form submission event
        trackEvent('form_submit', 'contact', {
            formId: 'contact-form'
        });

        // Simulate form submission
        setTimeout(() => {
            setFormState(prev => ({
                ...prev,
                loading: false,
                submitted: true
            }));

            // Track success event
            trackEvent('form_success', 'contact', {
                formId: 'contact-form'
            });

            // Track conversion
            trackFunnelStep('contact', 'submit', 2, {
                formId: 'contact-form'
            });
        }, 1200);
    };

    return (
        <>
            <NavBarEnhanced />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-neutral-900 to-blue-900 text-white py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Vamos transformar sua performance em receita</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Nossa equipe está pronta para identificar os obstáculos técnicos que estão bloqueando seu crescimento.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Form */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-lg">
                            {formState.submitted ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                                        <CheckCircle className="h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Mensagem enviada com sucesso!</h2>                                    <p className="text-neutral-600 mb-8">
                                        We have received your message and will contact you within 24 business hours.
                                    </p>
                                    <div className="flex justify-center">
                                        <Link href="/diagnose" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                                            <span>Get free diagnostic while you wait</span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Entre em contato</h2>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Seu nome</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                placeholder="Nome completo"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Seu email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">Empresa</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formState.company}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                placeholder="Nome da empresa"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-1">Website</label>
                                            <input
                                                type="url"
                                                id="website"
                                                name="website"
                                                value={formState.website}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                placeholder="https://www.seusite.com.br"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-1">Orçamento mensal estimado</label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formState.budget}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        >
                                            <option value="" disabled>Selecione uma opção</option>
                                            <option value="até 5k">Até R$ 5.000</option>
                                            <option value="5k-15k">R$ 5.000 a R$ 15.000</option>
                                            <option value="15k-30k">R$ 15.000 a R$ 30.000</option>
                                            <option value="acima-30k">Acima de R$ 30.000</option>
                                        </select>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Como podemos ajudar?</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Descreva seu projeto ou desafio"
                                        />
                                    </div>

                                    <div className="mb-8">
                                        <p className="block text-sm font-medium text-neutral-700 mb-3">Como prefere ser contatado?</p>
                                        <div className="flex space-x-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="contactMethod"
                                                    value="email"
                                                    checked={formState.contactMethod === 'email'}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <span>Email</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="contactMethod"
                                                    value="phone"
                                                    checked={formState.contactMethod === 'phone'}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <span>Telefone</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="contactMethod"
                                                    value="meeting"
                                                    checked={formState.contactMethod === 'meeting'} onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <span>Schedule a meeting</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formState.loading}
                                        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        {formState.loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                Enviar mensagem
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact info */}
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Outras formas de contato</h2>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-neutral-900">Email</h3>
                                        <p className="text-neutral-600">contato@arco-performance.com.br</p>
                                        <a href="mailto:contato@arco-performance.com.br" className="text-blue-600 hover:text-blue-800 transition-colors">Enviar email</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-neutral-900">Telefone</h3>
                                        <p className="text-neutral-600">(11) 4321-8765</p>
                                        <a href="tel:+551143218765" className="text-blue-600 hover:text-blue-800 transition-colors">Ligar agora</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Calendar className="h-6 w-6 text-blue-600" />
                                    </div>                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-neutral-900">Schedule a meeting</h3>
                                        <p className="text-neutral-600">Choose a time in our calendar</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">View availability</a>
                                    </div>
                                </div>
                            </div>                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Why work with us?</h3>                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">Results in 2-3 weeks, not months</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">Payment only for measurable results</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">Revenue increase guarantee or your money back</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">Over 120 successfully completed projects</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterARCORevised />
        </>
    )
}
