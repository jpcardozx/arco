/**
 * Lead Magnet Section - Lightweight Stub
 */
'use client'

interface LeadMagnetSectionProps {
  campaignId: string
}

export function LeadMagnetSection({ campaignId }: LeadMagnetSectionProps) {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Lead Magnet</h2>
        <p className="text-center text-muted-foreground">Em breve</p>
      </div>
    </section>
  )
}

export default LeadMagnetSection
