import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServer();
  
  const { data: campaign } = await supabase
    .from('campaigns')
    .select('meta_title, meta_description, og_image_url, name')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!campaign) {
    return {
      title: 'Página não encontrada | ARCO',
    };
  }

  return {
    title: campaign.meta_title || `${campaign.name} | ARCO`,
    description: campaign.meta_description || 'Landing page de captura de leads',
    openGraph: {
      title: campaign.meta_title || campaign.name,
      description: campaign.meta_description || '',
      images: campaign.og_image_url ? [campaign.og_image_url] : [],
      type: 'website',
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createSupabaseServer();
  
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !campaign) {
    notFound();
  }

  return <LandingPageTemplate campaign={campaign} />;
}
