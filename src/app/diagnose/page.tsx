'use client'

import React from 'react'
import { PremiumNavigation } from '../../components/layout/PremiumNavigation'
import { PremiumFooter } from '../../components/layout/PremiumFooter'
import HeroIndex from '../../components/diagnose/HeroIndex'
import IndexDefinition from '../../components/diagnose/IndexDefinition'
import MisreadingSymptoms from '../../components/diagnose/MisreadingSymptoms'
import DeliverablesandTiers from '../../components/diagnose/DeliverablesandTiers'
import EligibilityFilter from '../../components/diagnose/EligibilityFilter'
import InactionRisk from '../../components/diagnose/InactionRisk'
import Submission from '../../components/diagnose/Submission'

const page = () => {
    return (
        <>
            <PremiumNavigation />
            <HeroIndex />
            <IndexDefinition />
            <MisreadingSymptoms />
            <DeliverablesandTiers />
            <EligibilityFilter />
            <InactionRisk />
            <Submission />
            <PremiumFooter />
        </>
    )
}

export default page