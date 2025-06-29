'use client'

import React from 'react'
import PersonalNavigation from '../../components/layout/PersonalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
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
            <PersonalNavigation />
            <HeroIndex />
            <IndexDefinition />
            <MisreadingSymptoms />
            <DeliverablesandTiers />
            <EligibilityFilter />
            <InactionRisk />
            <Submission />
            <ProfessionalFooter />
        </>
    )
}

export default page
