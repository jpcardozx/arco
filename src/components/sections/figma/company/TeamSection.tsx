'use client';

/**
 * TeamSection - FOUNDER-FOCUSED REDESIGN
 * Agência solo profissional, sem fingir ter equipe
 * Split hero: Founder profile + Expertise showcase
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Target,
  TrendingUp,
  Zap,
  Users,
  CheckCircle2,
  BarChart3,
  Rocket,
  Shield,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { cn } from '@/design-system/tokens';

export function TeamSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // Dados reais do founder
  const founder = {
    name: "João Pedro Cardoso",
    title: "Founder & Growth Strategist",
    tagline: "Especialista em crescimento para prestadores de serviços locais",
    bio: "8+ anos otimizando campanhas de captação de leads. Metodologia testada em 200+ projetos com foco exclusivo em negócios locais de emergência, auto, reforma, saúde e serviços técnicos.",
    image: "https://placehold.co/600x600/1a1a1a/teal?text=JPC&font=montserrat",
    specialties: [
      { icon: Target, label: "Google Ads Specialist", level: "Avançado" },
      { icon: BarChart3, label: "Analytics & Data", level: "Avançado" },
      { icon: Rocket, label: "Landing Pages", level: "Avançado" },
      { icon: Shield, label: "CRO & A/B Testing", level: "Intermediário" }
    ],
    certifications: [
      "Google Ads Certified",
      "Google Analytics 4",
      "Meta Blueprint",
    ]
  };

  // Stats de experiência (não de equipe)
  const experienceStats = useMemo(() => [
    {
      icon: Award,
      value: "200+",
      label: "Projetos Executados",
      description: "Desde emergências 24h até reformas premium",
      color: "from-teal-500 to-teal-600",
      iconColor: "text-teal-400"
    },
    {
      icon: TrendingUp,
      value: "420%",
      label: "ROI Médio Alcançado",
      description: "Em 90 dias com metodologia padronizada",
      color: "from-green-500 to-green-600",
      iconColor: "text-green-400"
    },
    {
      icon: Users,
      value: "€2M+",
      label: "Budget Gerenciado",
      description: "Em campanhas Google Ads otimizadas",
      color: "from-orange-500 to-orange-600",
      iconColor: "text-orange-400"
    },
    {
      icon: Zap,
      value: "48h",
      label: "Setup Completo",
      description: "Landing page + campanhas + tracking",
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-400"
    }
  ], []);

  // Metodologia exclusiva
  const methodology = [
    {
      step: "1",
      title: "Auditoria Profunda",
      description: "Análise do mercado local, concorrentes e oportunidades não exploradas",
      duration: "2-3 dias"
    },
    {
      step: "2",
      title: "Setup Técnico",
      description: "Landing page otimizada + Google Ads + Analytics + Conversões",
      duration: "3-5 dias"
    },
    {
      step: "3",
      title: "Lançamento & Teste",
      description: "Primeira semana de otimização intensiva baseada em dados reais",
      duration: "7 dias"
    },
    {
      step: "4",
      title: "Otimização Contínua",
      description: "Análise semanal, ajustes de lance, criativos e segmentação",
      duration: "Ongoing"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[15%] top-[20%] h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[20%] right-[10%] h-[700px] w-[700px] rounded-full bg-orange-500/10 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="space-y-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <Badge className="border-transparent bg-gradient-to-r from-teal-500/20 to-orange-500/20 px-4 py-2 text-white backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Quem está por trás da ARCO
            </Badge>

            <h2 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
              Especialização{' '}
              <span className="bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                sem diluição
              </span>
            </h2>

            <p className="text-xl leading-relaxed text-white/80">
              Operação solo focada 100% em prestadores de serviços locais. Sem overhead de agência grande,
              com expertise profunda de quem já gerenciou €2M+ em campanhas.
            </p>
          </motion.div>

          {/* SPLIT LAYOUT - Founder Profile (Left) + Stats (Right) */}
          <div className="grid gap-12 lg:grid-cols-[450px_1fr]">
            {/* LEFT - Founder Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">
                <CardContent className="p-0">
                  {/* Founder Image */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                        <p className="text-sm font-medium text-teal-400">{founder.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-6 p-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-teal-400">{founder.tagline}</p>
                      <p className="text-sm leading-relaxed text-white/80">{founder.bio}</p>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-white">Especialidades</h4>
                      <div className="space-y-2">
                        {founder.specialties.map((specialty, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                          >
                            <div className="flex items-center gap-3">
                              <specialty.icon className="h-5 w-5 text-teal-400" />
                              <span className="text-sm font-medium text-white">{specialty.label}</span>
                            </div>
                            <Badge variant="outline" className="border-teal-400/30 bg-teal-500/10 text-xs text-teal-400">
                              {specialty.level}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-white">Certificações</h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.certifications.map((cert, idx) => (
                          <Badge key={idx} className="border-white/20 bg-white/10 text-xs text-white">
                            <CheckCircle2 className="mr-1 h-3 w-3 text-teal-400" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* RIGHT - Experience Stats Grid */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Experiência Comprovada</h3>
                <p className="text-white/70">
                  Números reais de 8 anos focado exclusivamente em prestadores de serviços locais
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {experienceStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                  >
                    <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <motion.div
                            animate={{
                              rotate: hoveredStat === index ? 360 : 0,
                              scale: hoveredStat === index ? 1.1 : 1
                            }}
                            transition={{ duration: 0.6 }}
                            className={cn(
                              "rounded-2xl p-3 bg-gradient-to-br",
                              stat.color
                            )}
                          >
                            <stat.icon className="h-6 w-6 text-white" />
                          </motion.div>
                        </div>

                        <div className="space-y-2">
                          <div className={cn("text-4xl font-black", stat.iconColor)}>
                            {stat.value}
                          </div>
                          <div className="text-sm font-bold text-white">{stat.label}</div>
                          <div className="text-xs text-white/60">{stat.description}</div>
                        </div>
                      </CardContent>

                      {/* Hover gradient */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Methodology Timeline - HORIZONTAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h3 className="text-3xl font-bold text-white">Metodologia de 4 Etapas</h3>
              <p className="text-white/70">
                Processo testado em 200+ projetos para maximizar ROI desde o primeiro dia
              </p>
            </div>

            {/* Timeline Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {methodology.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10">
                    <CardContent className="p-6">
                      {/* Step number */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-xl font-black text-white">
                          {phase.step}
                        </div>
                        <Badge className="border-teal-400/30 bg-teal-500/10 text-xs text-teal-400">
                          {phase.duration}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white">{phase.title}</h4>
                        <p className="text-sm leading-relaxed text-white/70">{phase.description}</p>
                      </div>

                      {/* Connector arrow */}
                      {index < methodology.length - 1 && (
                        <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20">
                            <div className="h-2 w-2 rounded-full bg-teal-400" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Solo Agency CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl lg:p-12"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Por que agência solo funciona melhor?</h3>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-4xl">🎯</div>
                  <h4 className="font-bold text-white">Foco Total</h4>
                  <p className="text-sm text-white/70">Seu projeto recebe 100% da atenção, não 10%</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">⚡</div>
                  <h4 className="font-bold text-white">Decisões Rápidas</h4>
                  <p className="text-sm text-white/70">Zero burocracia, ajustes em horas não semanas</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">💰</div>
                  <h4 className="font-bold text-white">ROI Superior</h4>
                  <p className="text-sm text-white/70">Sem overhead de equipe = mais budget no que importa</p>
                </div>
              </div>

              <p className="text-sm italic text-white/60">
                "Prefiro 8 anos de especialização profunda em um nicho do que 2 anos fazendo de tudo para todos."
                <br />
                <span className="font-medium text-teal-400">— João Pedro Cardoso</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
