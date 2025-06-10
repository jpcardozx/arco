'use client';

import React from "react";

export default function FooterARCORevised() {
    return (
        <footer className="bg-neutral-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">ARCO</h3>
                        <p className="text-neutral-400">
                            Transformando métricas em resultados financeiros para empresas digitais.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Serviços</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-neutral-400 hover:text-white">Performance Audit</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-white">Revenue Recovery</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-white">Acceleration Projects</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Recursos</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-neutral-400 hover:text-white">Blog</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-white">Case Studies</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-white">Guias & Ebooks</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contato</h4>
                        <ul className="space-y-2">
                            <li className="text-neutral-400">contato@arco.com.br</li>
                            <li className="text-neutral-400">+55 11 9999-9999</li>
                        </ul>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="text-neutral-400 hover:text-white">LinkedIn</a>
                            <a href="#" className="text-neutral-400 hover:text-white">Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-800 text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} ARCO Institute. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
