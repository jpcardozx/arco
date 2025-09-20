import { MainLayout } from '../components/layout/MainLayout';
import { UnifiedHeroSection } from '../components/sections/UnifiedHeroSection';
import { UnifiedValueProposition } from '../components/sections/UnifiedValueProposition';
import { OptimizedClientStories } from '../components/sections/OptimizedClientStories';
import { ROICalculator } from '../components/sections/ROICalculator';
import { WebVitalsMonitor } from '../components/performance/WebVitalsMonitor';

export default function HomePage() {
    return (
        <MainLayout>
            <UnifiedHeroSection />
            <UnifiedValueProposition />
            <OptimizedClientStories />
            <ROICalculator />
            <WebVitalsMonitor />
        </MainLayout>
    );
}
