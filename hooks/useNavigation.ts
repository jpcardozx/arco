import { useState, useEffect } from 'react'

export function useScrollDetection(threshold = 10) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > threshold)
        }

        // Throttle scroll events
        let ticking = false
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', throttledScroll, { passive: true })
        return () => window.removeEventListener('scroll', throttledScroll)
    }, [threshold])

    return scrolled
}

export function useSectionDetection(sections: string[]) {
    const [currentSection, setCurrentSection] = useState('')

    useEffect(() => {
        const handleSectionDetection = () => {
            let ticking = false

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    for (const section of sections) {
                        const element = document.getElementById(section)
                        if (element) {
                            const rect = element.getBoundingClientRect()
                            if (rect.top <= 100 && rect.bottom >= 100) {
                                setCurrentSection(section)
                                break
                            }
                        }
                    }
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleSectionDetection, { passive: true })
        return () => window.removeEventListener('scroll', handleSectionDetection)
    }, [sections])

    return currentSection
}
