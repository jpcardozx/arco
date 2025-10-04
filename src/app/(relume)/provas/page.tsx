import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Provas & Casos de Sucesso | ARCO',
  description: 'Resultados reais de clientes que transformaram seus negócios com ARCO',
};

export default function ProvasPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            Provas & Resultados
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Casos reais, métricas reais, transformação real
          </p>
        </div>
      </section>

      {/* Content será importado do Figma */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-neutral-600">
            Conteúdo em desenvolvimento - Importação do Relume em andamento
          </p>
        </div>
      </section>
    </main>
  );
}
