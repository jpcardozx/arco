/**
 * ARCO Agendamentos Layout
 * Professional layout with navigation and footer
 */

'use client'

export const dynamic = 'force-dynamic'

import { MainLayout } from '@/components/layout/MainLayout'

export default function AgendamentosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout
      showHeader={true}
      showFooter={true}
      headerVariant="solid"
      footerVariant="default"
    >
      {children}
    </MainLayout>
  )
}
