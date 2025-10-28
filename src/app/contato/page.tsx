/**
 * Contact Page - Cliente-Centric Design
 * Focus: Facilitate contact, break objections, build trust
 * NOT about us, but about serving YOU
 */

export const dynamic = 'force-dynamic';

import { MainLayout } from '@/components/layout/MainLayout';
import { ModernContactSection } from '@/components/sections/contact/ModernContactSection';
import { ClientSupportSection } from '@/components/sections/contact/ClientSupportSection';
import { ChatAnnouncementSection } from '@/components/sections/ChatAnnouncementSection';
import { WhatsAppButton } from '@/components/primitives/WhatsAppButton';

export default function ContactPage() {
    return (
        <MainLayout>
            {/* Hero Form - Primary CTA */}
            <ModernContactSection />

            {/* How to reach us - Channel options */}
            <ClientSupportSection />

            {/* Chat Announcement - Before footer */}
            <ChatAnnouncementSection />

            {/* WhatsApp Button - Floating */}
            <WhatsAppButton 
                phoneNumber="21967277533"
                message="Olá! Gostaria de entrar em contato."
                variant="floating"
                size="md"
            />
        </MainLayout>
  );
}
