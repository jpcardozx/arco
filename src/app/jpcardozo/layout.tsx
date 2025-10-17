import { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/sections/PortfolioNavigation';

export const metadata: Metadata = {
  title: 'Pedro Cardozo - Desenvolvedor Full-Stack',
  description: 'Desenvolvedor especializado em aplicações web de alta performance, arquitetura técnica e otimização de conversão. Disponível para projetos selecionados.',
  openGraph: {
    title: 'Pedro Cardozo - Desenvolvedor Full-Stack',
    description: 'Desenvolvedor especializado em aplicações web de alta performance. Disponível para projetos selecionados.',
    type: 'website',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PortfolioNavigation />
      {children}
    </>
  );
}
