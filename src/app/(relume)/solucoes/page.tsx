import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluções | ARCO',
  description: 'Soluções integradas de tecnologia e estratégia para seu negócio',
};

export default function SolucoesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            Nossas Soluções
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Tecnologia e estratégia sob medida para seu crescimento
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
