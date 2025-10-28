/**
 * Phone Mockup 3D - Stub
 */
'use client'

interface PhoneMockup3DProps {
  businessName?: string
}

export function PhoneMockup3D({ businessName }: PhoneMockup3DProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-muted-foreground">3D Preview: {businessName}</div>
    </div>
  )
}

export default PhoneMockup3D
