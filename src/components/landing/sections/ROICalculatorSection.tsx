/**
 * ROI Calculator Section - Lightweight Stub
 */
'use client'

interface ROICalculatorSectionProps {
  campaignId: string
}

export function ROICalculatorSection({ campaignId }: ROICalculatorSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Calculadora de ROI</h2>
        <p className="text-center text-muted-foreground">Em breve</p>
      </div>
    </section>
  )
}

export default ROICalculatorSection
