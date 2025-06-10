import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo e descrição */}
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <div className="mb-4">
                            <Link href="/" className="text-2xl font-bold">ARCO</Link>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Uma abordagem estratégica para transformar problemas técnicos em ganhos financeiros
                        </p>
                    </div>

                    {/* Links rápidos */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link href="/diagnose" className="text-gray-400 hover:text-white">Diagnose</Link></li>
                            <li><Link href="/solutions" className="text-gray-400 hover:text-white">Solutions</Link></li>
                            <li><Link href="/case-studies" className="text-gray-400 hover:text-white">Case Studies</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4">Contato</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center">
                                <span>contact@arco.com</span>
                            </li>
                            <li className="flex items-center">
                                <span>São Paulo, Brasil</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">© 2025 ARCO. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
