import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { SuccessPageClient } from './success-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Obrigado! | ARCO`,
    description: 'Recebemos suas informações. Confira seu WhatsApp!',
    robots: 'noindex',
  };
}

export default async function SuccessPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createSupabaseServer();

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('slug, name, thank_you_page_url, lead_magnet_title, lead_magnet_description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!campaign) {
    notFound();
  }

  // Default values
  const whatsappNumber = '5511999999999';
  const primaryColor = '#3b82f6';

  return (
    <SuccessPageClient
      campaign={campaign}
      whatsappNumber={whatsappNumber}
      primaryColor={primaryColor}
    />
  );
}
