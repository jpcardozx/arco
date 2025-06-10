'use client'

import React from 'react'
import Navbar from '@/components/layout/NavBar'
import FooterARCO from '@/components/layout/FooterARCO'
import HeroPartner from '@/components/partners/HeroPartner'
import { ContentSection } from '@/components/partners/ContentSection'
import SobreMim from '@/components/partners/SobreMim'
import FechamentoArco from '../../../components/partners/FechamentoArco'

const page = () => {
    return (
        <>
            <Navbar />
            <HeroPartner />
            <SobreMim />
            <ContentSection />
            <FechamentoArco />
            <FooterARCO />
        </>
    )
}

export default page