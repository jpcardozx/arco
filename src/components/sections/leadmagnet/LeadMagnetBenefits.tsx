'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { 
  CheckCircle2, 
  BarChart3, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Users,
  FileText,
  Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/primitives/Container/Container';
import { cn, designTokens } from '@/design-system/tokens';

function AnimatedStat({ valueString }: { valueString: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseFloat(valueString.replace(/[^0-9.,]/g, '').replace(',', '.'));
  const prefix = valueString.match(/^[^0-9]*/)?.[0] || '';
  const suffix = valueString.match(/[^0-9.,]*$/)?.[0] || '';

  useEffect(() => {
    if (inView && !isNaN(numericValue)) {
      const node = ref.current;
      if (!node) return;
      const controls = animate(0, numericValue, { duration: 2, ease: 'easeOut', onUpdate: v => { node.textContent = v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }); } });
      return () => controls.stop();
    }
  }, [inView, numericValue]);

  if (isNaN(numericValue)) return <div className="text-3xl font-bold text-teal-400">{valueString}</div>;
  return <div className="text-3xl font-bold text-teal-400">{prefix}<span ref={ref}>0</span>{suffix}</div>;
}

const benefits = [
  { icon: CheckCircle2, title: '15 Pontos de Verificação', description: 'Checklist completo cobrindo desde SEO técnico até experiência do usuário.', color: 'teal' },
  { icon: BarChart3, title: 'Benchmarks do Setor', description: 'Compare suas métricas com médias de 200+ empresas similares.', color: 'orange' },
  { icon: Target, title: 'Priorização Clara', description: 'Matriz de impacto vs esforço para saber por onde começar.', color: 'purple' },
  { icon: Lightbulb, title: 'Exemplos Práticos', description: 'Antes e depois de implementações reais em diferentes segmentos.', color: 'blue' },
  { icon: TrendingUp, title: 'Planilha de ROI', description: 'Calcule o impacto financeiro potencial de cada melhoria.', color: 'emerald' },
  { icon: Users, title: 'Acesso à Comunidade', description: 'Entre para grupo exclusivo com outros gestores de marketing.', color: 'pink' },
];

const stats = [
  { value: '2.4K+', label: 'Profissionais já baixaram' },
  { value: '4.8/5', label: 'Avaliação média' },
  { value: '3.8x', label: 'Melhoria média reportada' },
  { value: '100%', label: 'Grátis, sem pegadinhas' },
];

export function LeadMagnetBenefits() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: (e.clientX - window.innerWidth / 2) / 50, y: (e.clientY - window.innerHeight / 2) / 50 });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 15%, #1a1a1a 35%, #1f1f1f 55%, #171717 75%, #0a0a0a 100%)` }} />
        <motion.div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(700px circle at ${mousePosition.x * 8 + 50}% ${mousePosition.y * 8 + 50}%, rgba(20, 184, 166, 0.12) 0%, transparent 65%)`, transition: 'background 0.3s ease-out' }} />
        <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)` }} />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="space-y-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              O que está incluído no{' '}
              <span className="bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">Checklist Completo</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">Material profissional desenvolvido com base em 200+ projetos de otimização de funil.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const color = designTokens.colors[benefit.color as keyof typeof designTokens.colors] || designTokens.colors.teal;
              // @ts-ignore - Color palette structure is correct
              const colorValue = typeof color === 'string' ? color : (color[400] || '#14b8a6');
              // @ts-ignore - Color palette structure is correct
              const bgColorValue = typeof color === 'string' ? `${color}15` : `${color[500] || '#14b8a6'}15`;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  <Card className="group relative h-full overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex rounded-xl p-3" style={{ background: bgColorValue }}>
                        <benefit.icon className="h-6 w-6" style={{ color: colorValue }} />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
                      <p className="text-slate-400">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <AnimatedStat valueString={stat.value} />
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="mx-auto max-w-3xl border border-white/10 bg-slate-800/50 backdrop-blur-lg">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-white">Preview: Alguns dos 15 Pontos</h3>
                    <p className="text-slate-400">Aqui está uma amostra do que você vai encontrar no checklist completo.</p>
                  </div>
                </div>
                <div className="space-y-3 border-t border-white/10 pt-6">
                  {[
                    'Velocidade de carregamento < 3s (impacto: 35% nas conversões)',
                    'Call-to-action acima da dobra com contraste adequado',
                    'Formulários com no máximo 5 campos obrigatórios',
                    'Prova social visível nas primeiras 2 telas',
                    'Mobile-first: 60%+ do tráfego vem de dispositivos móveis',
                    'Pixel de rastreamento configurado corretamente',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                  <div className="mt-6 rounded-lg border-2 border-teal-500/20 bg-teal-500/10 p-4">
                    <p className="text-center text-sm font-semibold text-teal-300">+ 9 pontos adicionais no material completo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}