'use client';

export const dynamic = 'force-dynamic'

/**
 * ASSESSMENT PAGE - PROFESSIONAL S-TIER
 * Modular, clean, and organized
 */

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AssessmentHero, AssessmentForm, TrustSection } from '@/components/assessment';

export default function AssessmentPage() {
  const [showForm, setShowForm] = useState(false);

  const handleStartAssessment = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('assessment-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <MainLayout>
      <AssessmentHero onStartAssessment={handleStartAssessment} />
      <div id="assessment-form">
        {showForm && <AssessmentForm />}
      </div>
      <TrustSection />
    </MainLayout>
  );
}