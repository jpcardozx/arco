'use client'

import React from 'react'
import NavBarEnhanced from '../../../components/NavBarEnhanced'
import FooterARCORevised from '../../../components/FooterARCORevised'
import HeroIndex from '../../../components/diagnose/HeroIndex'
import IndexDefinition from '../../../components/diagnose/IndexDefinition'
import MisreadingSymptoms from '../../../components/diagnose/MisreadingSymptoms'
import DeliverablesandTiers from '../../../components/diagnose/DeliverablesandTiers'
import EligibilityFilter from '../../../components/diagnose/EligibilityFilter'
import InactionRisk from '../../../components/diagnose/InactionRisk'
import Submission from '../../../components/diagnose/Submission'
import { useEffect } from 'react'
import { trackPageView, trackFunnelStep } from '../../../lib/analytics'

const DiagnosePage = () => {
    useEffect(() => {
        // Track page view and funnel step
        trackPageView('diagnose-page', {
            version: 'enhanced',
            designSystem: 'arco-design-v3'
        });

        trackFunnelStep('diagnose', 'view', 1, {
            entryPoint: document.referrer || 'direct'
        });
    }, []);

    return (
        <>
            <NavBarEnhanced />
            <HeroIndex />
            <IndexDefinition />
            <MisreadingSymptoms />
            <DeliverablesandTiers />
            <EligibilityFilter />
            <InactionRisk />
            <Submission />
            <FooterARCORevised />
        </>
    )
}

export default DiagnosePage
