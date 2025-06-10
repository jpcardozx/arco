'use client';

import React from "react";

export default function SimpleHome() {
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-blue-900 text-white py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">ARCO</div>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
                        <a href="#process" className="hover:text-blue-200 transition-colors">Processo</a>
                        <a href="#cases" className="hover:text-blue-200 transition-colors">Cases</a>
                        <a href="#contact" className="hover:text-blue-200 transition-colors">Contato</a>
                    </nav>
                    <button className="md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>            <main>
                <section id="hero" className="pt-32 pb-24 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Transforme métricas em resultados financeiros
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Para empresas que perdem receita devido a problemas técnicos invisíveis,
                            oferecemos análises precisas e correções estratégicas que geram resultados imediatos.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a
                                href="#contato"
                                className="bg-white text-blue-900 px-8 py-3 rounded font-medium"
                            >
                                Start Your Journey
                            </a>
                            <a
                                href="#servicos"
                                className="border-2 border-white text-white px-8 py-3 rounded font-medium"
                            >
                                See More
                            </a>
                        </div>
                    </div>
                </section>                <section id="process" className="py-24 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10">Nosso Processo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="bg-gray-50 p-6 rounded shadow-sm">
                                <div className="text-4xl font-bold text-blue-600 mb-4">01</div>
                                <h3 className="text-xl font-semibold mb-2">Análise</h3>
                                <p className="text-gray-600">Identificamos problemas técnicos invisíveis</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded shadow-sm">
                                <div className="text-4xl font-bold text-blue-600 mb-4">02</div>
                                <h3 className="text-xl font-semibold mb-2">Estratégia</h3>
                                <p className="text-gray-600">Desenvolvemos planos de correção</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded shadow-sm">
                                <div className="text-4xl font-bold text-blue-600 mb-4">03</div>
                                <h3 className="text-xl font-semibold mb-2">Implementação</h3>
                                <p className="text-gray-600">Aplicamos as correções necessárias</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded shadow-sm">
                                <div className="text-4xl font-bold text-blue-600 mb-4">04</div>
                                <h3 className="text-xl font-semibold mb-2">Mensuração</h3>
                                <p className="text-gray-600">Monitoramos os resultados financeiros</p>
                            </div>                        </div>
                    </div>
                </section>

                <section id="cases" className="py-24 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Casos de Sucesso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded shadow-sm overflow-hidden">
                                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">E-commerce de Moda</h3>
                                    <p className="text-gray-600 mb-4">Aumento de 45% na taxa de conversão após otimizações de performance.</p>
                                    <a href="#" className="text-blue-600 font-medium flex items-center">
                                        Ver estudo de caso
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white rounded shadow-sm overflow-hidden">
                                <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Plataforma SaaS</h3>
                                    <p className="text-gray-600 mb-4">Redução de 60% na taxa de abandono após redesign baseado em dados.</p>
                                    <a href="#" className="text-blue-600 font-medium flex items-center">
                                        Ver estudo de caso
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white rounded shadow-sm overflow-hidden">
                                <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
                                    <p className="text-gray-600 mb-4">Aumento de 32% no valor médio de pedido após implementação de cross-selling.</p>
                                    <a href="#" className="text-blue-600 font-medium flex items-center">
                                        Ver estudo de caso
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-24 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Entre em contato</h2>
                            <p className="text-xl text-blue-100 mb-10 text-center">
                                Estamos prontos para ajudar sua empresa a alcançar melhores resultados
                            </p>
                            <form className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nome</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white/20 border border-blue-300/30 rounded text-white"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 bg-white/20 border border-blue-300/30 rounded text-white"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">Mensagem</label>
                                    <textarea
                                        className="w-full px-4 py-2 bg-white/20 border border-blue-300/30 rounded text-white h-32"
                                        placeholder="Como podemos ajudar?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-white text-blue-900 font-medium py-3 px-4 rounded hover:bg-blue-50 transition-colors"
                                >
                                    Enviar mensagem
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-neutral-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold mb-4">ARCO</div>
                            <p className="text-neutral-400">
                                Transformando métricas em resultados financeiros para empresas digitais.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Serviços</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Performance Audit</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Revenue Recovery</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Acceleration Projects</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Recursos</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Case Studies</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guias & Ebooks</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contato</h4>
                            <ul className="space-y-2">
                                <li className="text-neutral-400">contato@arco.com.br</li>
                                <li className="text-neutral-400">+55 11 9999-9999</li>
                            </ul>
                            <div className="mt-4 flex space-x-4">
                                <a href="#" className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Twitter</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-neutral-800 pt-8 text-center">
                        <p className="text-sm text-neutral-500">© {new Date().getFullYear()} ARCO Institute. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
