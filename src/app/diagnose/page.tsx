'use client'

import React from 'react'
import Navbar from '../../components/layout/NavBar'
import FooterARCO from '../../components/layout/FooterARCO'
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
            <Navbar />
            <HeroIndex />
            <IndexDefinition />
            <MisreadingSymptoms />
            <DeliverablesandTiers />
            <EligibilityFilter />
            <InactionRisk />
            <Submission />
            <FooterARCO />
        </>
    )
}

export default page