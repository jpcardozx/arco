import { PremiumHeroSection } from '../components/sections/PremiumHeroSection';
import { URLAnalyzerSection } from '../components/sections/URLAnalyzerSection';
import { TransitionBridge } from '../components/sections/TransitionBridge';
import { ExecutionShowcase } from '../components/sections/ExecutionShowcase';
import { TechStackSection } from '../components/sections/TechStackSection';
import { ConsultoriaHighlightSection } from '../components/sections/ConsultoriaHighlightSection';
import { ChatAnnouncementSection } from '../components/sections/ChatAnnouncementSection';

/**
 * HOMEPAGE - Hero premium original + funil otimizado + storytelling
 * Navbar e Footer são renderizados no layout global
 */

export default function HomePage() {
    return (
        <>
            {/* Hero Premium com macOS window */}
            <PremiumHeroSection
                badge={{
                    text: "Consultoria Técnica & Performance"
                }}
                title="Arquitetura e Otimização de Aplicações Web"
                subtitle="Desenvolvimento full-stack, migração de sistemas legados e implementação de design systems escaláveis. Especialização em Next.js, React, TypeScript e PostgreSQL com foco em Core Web Vitals e experiência de usuário."
                primaryCta={{
                    text: "Ver Portfolio",
                    href: "/jpcardozo"
                }}
                showParticles={true}
                variant="premium"
            />

            {/* URL Analyzer - Lead magnet com redirect para /mydomain */}
            <URLAnalyzerSection />

            {/* Transition: Analyzer → Cases */}
            <TransitionBridge
                statement="Aplicações práticas em operações comerciais diversificadas"
                variant="minimal"
            />

            {/* Execution Showcase - Technical excellence demonstration */}
            <ExecutionShowcase />

            {/* Tech Stack - Modern stack presentation */}
            <TechStackSection />

            {/* Consultoria Highlight - Link to booking system */}
            <ConsultoriaHighlightSection />

            {/* Chat Announcement - Before footer */}
            <ChatAnnouncementSection />
        </>
    );
}
