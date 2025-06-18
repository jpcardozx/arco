'use client'

import { useEffect } from 'react'

export function SmoothScroll() {
    useEffect(() => {
        // Smooth scroll for anchor links
        const handleAnchorClick = (e: Event) => {
            const target = e.target as HTMLElement
            const href = target.getAttribute('href')

            if (href?.startsWith('#')) {
                e.preventDefault()
                const element = document.querySelector(href)
                if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    })
                }
            }
        }

        // Add event listeners to all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]')
        anchorLinks.forEach(link => {
            link.addEventListener('click', handleAnchorClick)
        })

        // Cleanup
        return () => {
            anchorLinks.forEach(link => {
                link.removeEventListener('click', handleAnchorClick)
            })
        }
    }, [])

    return null
}
