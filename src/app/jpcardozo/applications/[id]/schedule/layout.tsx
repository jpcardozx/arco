/**
 * APPLICATION SCHEDULING SYSTEM
 * Route: /jpcardozx/applications/[id]/schedule
 * 
 * Permite tech leads e recruiters agendarem entrevistas técnicas
 * Integra com sistema /agendamentos existente
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule Technical Interview | João Pedro Cardoso',
  description: 'Schedule a technical interview or consultation call',
  robots: 'noindex', // Não indexar páginas de aplicação
};

export default function ApplicationScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
