'use client';

export default function TailwindTest() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Teste do Tailwind CSS v4</h1>
            <p className="text-gray-700 mb-2">Este é um teste para verificar se o Tailwind CSS está funcionando corretamente.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Card {item}</h2>
                        <p className="text-gray-600">Este elemento usa várias classes do Tailwind para estilização.</p>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                            Botão de Teste
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Componentes estilizados com Tailwind</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                        <span className="text-green-700 font-medium">Componente Verde</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                        <span className="text-red-700 font-medium">Componente Vermelho</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
                        <span className="text-blue-700 font-medium">Componente Azul</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
