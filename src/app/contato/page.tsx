/**
 * Contact Page - Cliente-Centric Design
 * Focus: Facilitate contact, break objections, build trust
 * NOT about us, but about serving YOU
 */

import { MainLayout } from '@/components/layout/MainLayout';
import { ModernContactSection } from '@/components/sections/contact/ModernContactSection';
import { ClientSupportSection } from '@/components/sections/contact/ClientSupportSection';

export default function ContactPage() {
    return (
        <MainLayout>
            {/* Hero Form - Primary CTA */}
            <ModernContactSection />

            {/* How to reach us - Channel options */}
            <ClientSupportSection />
        </MainLayout>
  );
}
