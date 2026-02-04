import { URLAnalyzerSection } from '@/components/sections/URLAnalyzerSection';
import { TransitionBridge } from '@/components/sections/TransitionBridge';
import { ExecutionShowcase } from '@/components/sections/ExecutionShowcase';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ConsultoriaHighlightSection } from '@/components/sections/ConsultoriaHighlightSection';
import { ChatAnnouncementSection } from '@/components/sections/ChatAnnouncementSection';
import { HomepageHeroClient } from '@/components/sections/HomepageHeroClient';

export const dynamic = 'force-dynamic';

export default function HomePage() {
    return (
        <>
            <HomepageHeroClient />

            <URLAnalyzerSection />

            <TransitionBridge
                statement="Aplicações ativas em operações comerciais diversificadas"
                variant="minimal"
            />

            <ExecutionShowcase />

            <TechStackSection />

            <ConsultoriaHighlightSection />

            <ChatAnnouncementSection />
        </>
    );
}
