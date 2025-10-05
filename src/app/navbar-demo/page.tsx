/**
 * Demo Page - Glassmorphic Navbar
 * 
 * Página de demonstração da navbar premium com glassmorfismo
 */

import { GlassmorphicNavbar } from '@/components/navigation/GlassmorphicNavbar';

export default function NavbarDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <GlassmorphicNavbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
              Glassmorphic Navbar Demo
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Role a página para ver o efeito de blur dinâmico. Passe o mouse sobre a logo para ver as partículas em ação.
            </p>
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Glassmorfismo Avançado',
                description: '5 camadas de profundidade visual com blur dinâmico baseado no scroll',
                icon: '🌟'
              },
              {
                title: 'Partículas Elegantes',
                description: '25 partículas sutis ao redor da logo com interação hover',
                icon: '✨'
              },
              {
                title: 'Texturas Sutis',
                description: 'SVG noise patterns para adicionar profundidade sem peso',
                icon: '🎨'
              },
              {
                title: 'Performance Otimizada',
                description: 'tsparticles-slim + GPU acceleration para 60fps garantido',
                icon: '⚡'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl backdrop-blur-xl bg-white/50 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </section>

          {/* Scroll Demo */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Role para Ver o Efeito
            </h2>
            <div className="h-[200vh] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">👇</div>
                <p className="text-xl text-slate-600">
                  Continue rolando...
                </p>
              </div>
            </div>
          </section>

          {/* Code Example */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Como Usar
            </h2>
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/90 p-6 overflow-x-auto">
              <pre className="text-sm text-slate-100">
                <code>{`import { GlassmorphicNavbar } from '@/components/navigation';

export default function MyPage() {
  return (
    <>
      <GlassmorphicNavbar />
      {/* Your content here */}
    </>
  );
}`}</code>
              </pre>
            </div>
          </section>

          {/* Specs */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Especificações Técnicas
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Bundle Size', value: '~55KB' },
                { label: 'Partículas', value: '25' },
                { label: 'FPS Target', value: '120' },
                { label: 'Blur Range', value: '8-20px' },
                { label: 'Camadas', value: '5' },
                { label: 'Transitions', value: '300ms' }
              ].map((spec, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl backdrop-blur-xl bg-white/40 border border-white/50"
                >
                  <div className="text-2xl font-bold text-teal-600">
                    {spec.value}
                  </div>
                  <div className="text-sm text-slate-600">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
